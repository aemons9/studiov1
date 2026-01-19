#!/usr/bin/env node
/**
 * Publish Meera Collections to Instagram - Direct URL Method
 * Uses already-uploaded GitHub URLs
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';

if (!INSTAGRAM_TOKEN) {
  console.error('❌ INSTAGRAM_TOKEN environment variable required');
  process.exit(1);
}

// Images already uploaded to GitHub
const COLLECTIONS = [
  {
    name: 'MEERA CANDLELIT PREMIUM',
    urls: [
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_01.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_02.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_03.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_04.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_05.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_06.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_07.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_08.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_09.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_candlelit_premium_slide_10.jpg',
    ],
    caption: `MEERA | Candlelit Premium Exclusive

Sacred flames illuminate divine form. Ten masterworks exploring silver chambers, velvet warmth, industrial glamour, amber intimacy, and platinum elegance.

Bronze candelabras cast shadows on silk and skin. Meera embodies the eternal dance between light and shadow.

This is devotion through artistry.

#VERALABS #Meera #CandlelitChamber #PremiumExclusive #IndianGlamour #IntimateArt #SilverChamber #VelvetWarmth #AmberGlow #PlatinumElegance #FineArtBoudoir #DevotionalBeauty`
  },
  {
    name: 'MEERA PLATINUM AMBER ELITE',
    urls: [
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_01.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_02.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_03.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_04.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_05.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_06.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_07.jpg',
      'https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram/meera_platinum_amber_elite_slide_08.jpg',
    ],
    caption: `MEERA | Platinum Amber Elite Private Collection

Platinum chainmail meets amber candlelight in this ultra-exclusive series. Eight elite masterworks of recline closeups, intimate detail studies, and sensual framing.

Mercury shimmer against honey-gold warmth. The ultimate expression of luxury intimacy.

For discerning collectors only.

#VERALABS #Meera #PlatinumChainmail #AmberIntimate #EliteCollection #PrivateExclusive #IndianGlamour #ChainmailLuxury #UltraExclusive #MasterclassPhotography #ReclineCloseup #IntimateDetail`
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    if (status.status_code === 'ERROR') {
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

  const childIds = [];

  // Step 1: Create carousel items from URLs
  for (let i = 0; i < collection.urls.length; i++) {
    const url = collection.urls[i];
    log(`[${i + 1}/${collection.urls.length}] Creating carousel item...`);

    const result = await createCarouselItem(url);

    if (result.id || result.success) {
      const id = result.id || result.containerId;
      childIds.push(id);
      log(`   ✅ Item created: ${id}`);
    } else {
      log(`   ❌ Failed: ${JSON.stringify(result)}`);
    }

    await sleep(2000);
  }

  if (childIds.length < 2) {
    log('❌ Need at least 2 items for carousel');
    return false;
  }

  // Step 2: Create carousel container
  log(`\n📦 Creating carousel with ${childIds.length} items...`);
  const carouselResult = await createCarousel(childIds, collection.caption);

  if (!carouselResult.id && !carouselResult.success) {
    log(`❌ Carousel creation failed: ${JSON.stringify(carouselResult)}`);
    return false;
  }

  const carouselId = carouselResult.id;
  log(`✅ Carousel container: ${carouselId}`);

  // Step 3: Wait for processing
  log('⏳ Waiting for processing...');
  await waitForContainer(carouselId);

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
║   ✨ PUBLISH MEERA CAROUSELS (Direct URL) ✨                                 ║
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
║                       MEERA PUBLISH COMPLETE                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

${results.map(r => `  ${r.success ? '✅' : '❌'} ${r.name}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
