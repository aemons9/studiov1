#!/usr/bin/env node
/**
 * Publish Meera Masterclass to Instagram
 * 14 images - publishes first 10 as carousel (Instagram max)
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
  id: 'meera_masterclass',
  name: 'MEERA MASTERCLASS',
  dir: '/home/ecolex/version1/instagram_branded_new/meera_masterclass',
  caption: `MEERA | Masterclass Wardrobe Collection

Fourteen stunning environments. Fourteen exquisite wardrobes. One unforgettable muse.

From morning silk in luxury bedrooms to golden hour on rooftop lounges. From Parisian boutique hotels to tropical beach villas. Each frame a masterwork of realistic photography celebrating natural beauty.

This is the definitive Meera collection.

#VERALABS #Meera #MasterclassPhotography #WardrobeShowcase #LuxuryLifestyle #RealisticBeauty #IndianGlamour #FashionEditorial #NaturalBeauty #IntimatePortrait #LifestylePhotography #LuxuryFashion`
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
      filename: `meera_masterclass_${filename}`,
      githubToken: GITHUB_TOKEN,
      githubOwner: 'aemons9',
      githubRepo: 'studiov1',
      branch: 'main',
      directory: 'photo/masterclass'
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
    if (status.status_code === 'ERROR') throw new Error(`Container error: ${JSON.stringify(status)}`);
    await sleep(5000);
  }
  return false;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ PUBLISH MEERA MASTERCLASS TO INSTAGRAM ✨                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const images = fs.readdirSync(COLLECTION.dir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10); // Instagram max 10 per carousel

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
      log(`   ✅ Uploaded: ${url.substring(0, 60)}...`);
    } else {
      const fallback = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/masterclass/meera_masterclass_${img}`;
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

  // Create and publish carousel
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
    log('❌ Container processing timeout');
    return;
  }

  log('📱 Publishing to Instagram...');
  const publishResult = await publishContainer(carouselId);

  if (publishResult.id || publishResult.success) {
    const mediaId = publishResult.id || publishResult.mediaId;
    log(`\n✅ MEERA MASTERCLASS PUBLISHED!`);
    log(`   Media ID: ${mediaId}`);
    log(`   View: https://www.instagram.com/p/${mediaId}/`);
  } else {
    log(`❌ Publish failed: ${JSON.stringify(publishResult)}`);
  }

  console.log(`
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
