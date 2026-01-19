#!/usr/bin/env node
/**
 * Publish Meera Candlelit Extended to Instagram
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

const COLLECTION = {
  dir: '/home/ecolex/version1/instagram_branded_new/meera_candlelit_extended',
  caption: `MEERA | Candlelit Extended Collection

Avant-garde intimate artistry in warm candlelight. Twelve exclusive masterworks exploring architectural design and sensuous form.

From decolletage portraits to floor intimacy. From kneeling worship to reclining Venus. Each frame a celebration of conceptual fashion and natural beauty.

Museum-quality photography with editorial sophistication.

#VERALABS #Meera #CandlelitCollection #AvantGarde #IntimateArtistry #FashionEditorial #MuseumQuality #ConceptualFashion #LuxuryPhotography #IndianGlamour #ExclusiveContent`
};

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToGitHub(base64, filename) {
  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageData: base64,
      filename: `meera_candlelit_ext_${filename}`,
      githubToken: GITHUB_TOKEN,
      githubOwner: 'aemons9',
      githubRepo: 'studiov1',
      branch: 'main',
      directory: 'photo/candlelit_extended'
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

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ PUBLISH MEERA CANDLELIT EXTENDED TO INSTAGRAM ✨                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const images = fs.readdirSync(COLLECTION.dir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10); // Instagram max 10

  log(`Found ${images.length} images (max 10 for carousel)\n`);

  // Upload to GitHub CDN
  const uploadedUrls = [];
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const imgPath = path.join(COLLECTION.dir, img);
    const base64 = fs.readFileSync(imgPath).toString('base64');

    log(`[${i + 1}/${images.length}] Uploading ${img}...`);
    const result = await uploadToGitHub(base64, img);
    const url = result.publicUrl || result.rawUrl;

    if (url) {
      uploadedUrls.push(url);
      log(`   ✅ Uploaded`);
    } else {
      const fallback = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/candlelit_extended/meera_candlelit_ext_${img}`;
      uploadedUrls.push(fallback);
      log(`   ⚠️ Using fallback URL`);
    }
    await sleep(1500);
  }

  // Create carousel items
  log(`\n📦 Creating ${uploadedUrls.length} carousel items...`);
  const childIds = [];

  for (let i = 0; i < uploadedUrls.length; i++) {
    log(`   [${i + 1}/${uploadedUrls.length}] Creating item...`);
    const result = await createCarouselItem(uploadedUrls[i]);
    const itemId = result.id || result.containerId;

    if (itemId) {
      childIds.push(itemId);
      log(`   ✅ Item: ${itemId}`);
    } else {
      log(`   ❌ Failed: ${JSON.stringify(result)}`);
    }
    await sleep(2000);
  }

  if (childIds.length < 2) {
    log('❌ Need at least 2 carousel items');
    return;
  }

  // Create carousel
  log(`\n📦 Creating carousel with ${childIds.length} items...`);
  const carouselResult = await createCarousel(childIds, COLLECTION.caption);
  const carouselId = carouselResult.id;

  if (!carouselId) {
    log(`❌ Carousel creation failed: ${JSON.stringify(carouselResult)}`);
    return;
  }

  log(`✅ Carousel container: ${carouselId}`);
  log('⏳ Waiting for processing...');

  const ready = await waitForContainer(carouselId);

  if (!ready) {
    log('⏳ Container still processing, attempting publish anyway...');
  }

  log('📱 Publishing to Instagram...');
  const publishResult = await publishContainer(carouselId);

  if (publishResult.id || publishResult.success) {
    const mediaId = publishResult.id || publishResult.mediaId;
    log(`\n✅ MEERA CANDLELIT EXTENDED PUBLISHED!`);
    log(`   Media ID: ${mediaId}`);
  } else {
    log(`❌ Publish failed: ${JSON.stringify(publishResult)}`);
  }

  console.log(`
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
