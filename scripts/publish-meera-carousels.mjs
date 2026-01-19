#!/usr/bin/env node
/**
 * Publish Meera Collections to Instagram
 * Full workflow: Upload to GitHub → Create carousel items → Publish
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const GITHUB_USER = 'aemons9';
const GITHUB_REPO = 'studiov1';

if (!INSTAGRAM_TOKEN) {
  console.error('❌ INSTAGRAM_TOKEN environment variable required');
  console.log('Set it with: export INSTAGRAM_TOKEN=your_token');
  process.exit(1);
}

const COLLECTIONS = [
  {
    id: 'meera_candlelit_premium',
    name: 'MEERA CANDLELIT PREMIUM',
    dir: '/home/ecolex/version1/instagram_branded_new/meera_candlelit_premium',
    caption: `MEERA | Candlelit Premium Exclusive

Sacred flames illuminate divine form. Ten masterworks exploring silver chambers, velvet warmth, industrial glamour, amber intimacy, and platinum elegance.

Bronze candelabras cast shadows on silk and skin. Meera embodies the eternal dance between light and shadow.

This is devotion through artistry.

#VERALABS #Meera #CandlelitChamber #PremiumExclusive #IndianGlamour #IntimateArt #SilverChamber #VelvetWarmth #AmberGlow #PlatinumElegance #FineArtBoudoir #DevotionalBeauty`
  },
  {
    id: 'meera_platinum_amber_elite',
    name: 'MEERA PLATINUM AMBER ELITE',
    dir: '/home/ecolex/version1/instagram_branded_new/meera_platinum_amber_elite',
    caption: `MEERA | Platinum Amber Elite Private Collection

Platinum chainmail meets amber candlelight in this ultra-exclusive series. Eight elite masterworks of recline closeups, intimate detail studies, and sensual framing.

Mercury shimmer against honey-gold warmth. The ultimate expression of luxury intimacy.

For discerning collectors only.

#VERALABS #Meera #PlatinumChainmail #AmberIntimate #EliteCollection #PrivateExclusive #IndianGlamour #ChainmailLuxury #UltraExclusive #MasterclassPhotography #ReclineCloseup #IntimateDetail`
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToGitHub(imageData, filename) {
  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageData,
      filename,
      githubToken: GITHUB_TOKEN,
      githubOwner: GITHUB_USER,
      githubRepo: GITHUB_REPO,
      branch: 'main',
      directory: 'photo/meera'
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

    if (status.status_code === 'FINISHED') {
      return true;
    } else if (status.status_code === 'ERROR') {
      throw new Error(`Container error: ${JSON.stringify(status)}`);
    }

    await sleep(5000);
  }
  return false;
}

async function publishCollection(collection) {
  log(`\n${'═'.repeat(60)}`);
  log(`   PUBLISHING: ${collection.name}`);
  log(`${'═'.repeat(60)}\n`);

  // Get images
  const images = fs.readdirSync(collection.dir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10);

  if (images.length === 0) {
    log('❌ No images found');
    return false;
  }

  log(`Found ${images.length} images\n`);

  // Step 1: Upload images to GitHub and create carousel items
  const childIds = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imgPath = path.join(collection.dir, img);
    const base64 = fs.readFileSync(imgPath).toString('base64');

    log(`[${i + 1}/${images.length}] ${img}`);

    // Upload to GitHub
    const filename = `${collection.id}_${img}`;
    log(`   📤 Uploading to GitHub...`);
    const uploadResult = await uploadToGitHub(base64, filename);

    const publicUrl = uploadResult.publicUrl || uploadResult.url || uploadResult.rawUrl;
    if (!publicUrl) {
      log(`   ❌ Upload failed: ${JSON.stringify(uploadResult)}`);
      continue;
    }

    log(`   ✅ Uploaded: ${publicUrl.substring(0, 60)}...`);

    // Create carousel item
    log(`   📦 Creating carousel item...`);
    const itemResult = await createCarouselItem(publicUrl);

    if (!itemResult.id && !itemResult.success) {
      log(`   ❌ Carousel item failed: ${JSON.stringify(itemResult)}`);
      continue;
    }

    const itemId = itemResult.id || itemResult.containerId;
    childIds.push(itemId);
    log(`   ✅ Item created: ${itemId}`);

    // Brief pause between uploads
    await sleep(2000);
  }

  if (childIds.length < 2) {
    log('❌ Need at least 2 images for carousel');
    return false;
  }

  log(`\n📦 Creating carousel with ${childIds.length} items...`);

  // Step 2: Create carousel container
  const carouselResult = await createCarousel(childIds, collection.caption);

  if (!carouselResult.id && !carouselResult.success) {
    log(`❌ Carousel creation failed: ${JSON.stringify(carouselResult)}`);
    return false;
  }

  const carouselId = carouselResult.id;
  log(`✅ Carousel container: ${carouselId}`);

  // Step 3: Wait for processing
  log('⏳ Waiting for carousel processing...');
  const ready = await waitForContainer(carouselId);

  if (!ready) {
    log('⚠️  Container still processing, attempting publish anyway...');
  }

  // Step 4: Publish
  log('📱 Publishing to Instagram...');
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
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ PUBLISH MEERA CAROUSELS TO INSTAGRAM ✨                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const results = [];

  for (const collection of COLLECTIONS) {
    const success = await publishCollection(collection);
    results.push({ name: collection.name, success });

    if (success) {
      log('\n⏳ Waiting 60s before next carousel...');
      await sleep(60000);
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                       MEERA INSTAGRAM PUBLISH COMPLETE                       ║
╚══════════════════════════════════════════════════════════════════════════════╝

  RESULTS:
${results.map(r => `     ${r.success ? '✅' : '❌'} ${r.name}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
