#!/usr/bin/env node
/**
 * Publish Remaining Carousels:
 * 1. Meera Retry Editorial (8 images)
 * 2. Candlelit Chamber Extended (7 images)
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

if (!INSTAGRAM_TOKEN) {
  console.error('❌ INSTAGRAM_TOKEN required');
  process.exit(1);
}

const COLLECTIONS = [
  {
    id: 'meera_retry_editorial',
    name: 'MEERA RETRY EDITORIAL',
    dir: '/home/ecolex/version1/instagram_branded_new/meera_retry_editorial',
    caption: `MEERA | Editorial Masterclass Collection

Where fashion meets fine art. Eight editorial masterworks exploring amber warmth, velvet elegance, and industrial edge through the lens of haute couture photography.

Museum-quality artistry with contemporary fashion sensibility.

This is editorial excellence.

#VERALABS #Meera #EditorialMasterclass #FashionArt #HauteCouture #AmberGlow #VelvetElegance #IndustrialEdge #FineArtFashion #MuseumQuality #IndianGlamour #EditorialPhotography`
  },
  {
    id: 'candlelit_chamber_extended',
    name: 'CANDLELIT CHAMBER EXTENDED',
    dir: '/home/ecolex/version1/instagram_branded_new/candlelit_chamber_extended',
    caption: `CANDLELIT CHAMBER EXTENDED | Intimate Devotion

By candlelight, form becomes sacred. Seven new variants exploring silver chambers, industrial glamour, velvet warmth, amber glow, and platinum elegance.

Bronze candelabras cast dancing shadows on silk and skin. This is worship through artistry.

Surrender to the glow.

#VERALABS #CandlelitChamber #IntimateDevtion #ExtendedCollection #Candlelight #BronzeCandelabra #SilkAndShadow #FineArtBoudoir #SacredArt #WarmGlow #DevotionalBeauty`
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToGitHub(base64, filename, collection) {
  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageData: base64,
      filename: `${collection}_${filename}`,
      githubToken: GITHUB_TOKEN,
      githubOwner: 'aemons9',
      githubRepo: 'studiov1',
      branch: 'main',
      directory: 'photo/carousels'
    })
  });
  return await response.json();
}

async function createCarouselItem(imageUrl) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-carousel-item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      imageUrl,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
}

async function createCarousel(childIds, caption) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-carousel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      childrenIds: childIds,
      caption,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
}

async function getContainerStatus(containerId) {
  const response = await fetch(
    `${PROXY_URL}/api/instagram/container-status/${containerId}?accessToken=${INSTAGRAM_TOKEN}`
  );
  return await response.json();
}

async function publishContainer(containerId) {
  const response = await fetch(`${PROXY_URL}/api/instagram/publish-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      containerId,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
}

async function waitForContainer(containerId, maxWait = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const status = await getContainerStatus(containerId);
    log(`   Status: ${status.status_code || 'PENDING'}`);
    if (status.status_code === 'FINISHED') return true;
    if (status.status_code === 'ERROR') throw new Error(`Container error`);
    await sleep(5000);
  }
  return false;
}

async function publishCollection(collection) {
  log(`\n${'═'.repeat(60)}`);
  log(`   PUBLISHING: ${collection.name}`);
  log(`${'═'.repeat(60)}\n`);

  const images = fs.readdirSync(collection.dir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10);

  if (images.length < 2) {
    log('❌ Need at least 2 images');
    return false;
  }

  log(`Found ${images.length} images\n`);

  // Step 1: Upload to GitHub and create carousel items
  const childIds = [];
  const uploadedUrls = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imgPath = path.join(collection.dir, img);
    const base64 = fs.readFileSync(imgPath).toString('base64');

    log(`[${i + 1}/${images.length}] ${img}`);

    // Upload to GitHub
    log(`   📤 Uploading to GitHub...`);
    const uploadResult = await uploadToGitHub(base64, img, collection.id);
    const publicUrl = uploadResult.publicUrl || uploadResult.rawUrl;

    if (!publicUrl) {
      // Try using existing URL if already uploaded
      const existingUrl = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/carousels/${collection.id}_${img}`;
      log(`   ⚠️  Using existing URL: ${existingUrl.slice(0, 50)}...`);
      uploadedUrls.push(existingUrl);
    } else {
      log(`   ✅ Uploaded`);
      uploadedUrls.push(publicUrl);
    }

    await sleep(1000);
  }

  // Step 2: Create carousel items from URLs
  log(`\n📦 Creating ${uploadedUrls.length} carousel items...`);

  for (let i = 0; i < uploadedUrls.length; i++) {
    const url = uploadedUrls[i];
    log(`   [${i + 1}/${uploadedUrls.length}] Creating item...`);

    const result = await createCarouselItem(url);
    const itemId = result.id || result.containerId;

    if (itemId) {
      childIds.push(itemId);
      log(`   ✅ Item: ${itemId}`);
    } else {
      log(`   ❌ Failed: ${JSON.stringify(result).slice(0, 80)}`);
    }

    await sleep(2000);
  }

  if (childIds.length < 2) {
    log('❌ Need at least 2 items for carousel');
    return false;
  }

  // Step 3: Create carousel
  log(`\n📦 Creating carousel with ${childIds.length} items...`);
  const carouselResult = await createCarousel(childIds, collection.caption);
  const carouselId = carouselResult.id;

  if (!carouselId) {
    log(`❌ Carousel failed: ${JSON.stringify(carouselResult)}`);
    return false;
  }

  log(`✅ Carousel: ${carouselId}`);

  // Step 4: Wait and publish
  log('⏳ Waiting for processing...');
  await waitForContainer(carouselId);

  log('📱 Publishing...');
  const publishResult = await publishContainer(carouselId);

  if (publishResult.id || publishResult.success) {
    log(`✅ PUBLISHED! Media ID: ${publishResult.id || publishResult.mediaId}`);
    return true;
  } else {
    log(`❌ Publish failed: ${JSON.stringify(publishResult)}`);
    return false;
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ✨ PUBLISH REMAINING CAROUSELS ✨                                          ║
║                                                                              ║
║   1. Meera Retry Editorial (8 images)                                        ║
║   2. Candlelit Chamber Extended (7 images)                                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const results = [];

  for (const collection of COLLECTIONS) {
    const success = await publishCollection(collection);
    results.push({ name: collection.name, success });

    if (success) {
      log('\n⏳ Waiting 60s before next...');
      await sleep(60000);
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                       PUBLISH COMPLETE                                       ║
╚══════════════════════════════════════════════════════════════════════════════╝

${results.map(r => `  ${r.success ? '✅' : '❌'} ${r.name}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
