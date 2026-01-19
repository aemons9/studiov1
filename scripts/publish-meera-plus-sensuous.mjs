#!/usr/bin/env node
/**
 * Publish Meera Plus Sensuous - Carousel + Stories
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';

const COLLECTION_DIR = '/home/ecolex/version1/instagram_branded_new/meera_plus_sensuous';

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function uploadToGitHub(filePath, filename) {
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const timestamp = Date.now();

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64Data,
      filename: `${timestamp}_${filename}`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/meera-plus-sensuous',
    }),
  });

  const data = await response.json();
  if (!data.publicUrl && !data.url) {
    throw new Error(`GitHub upload failed: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data.publicUrl || data.url;
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

async function publishStory(imageUrl) {
  const response = await fetch(`${PROXY_URL}/api/instagram/publish-story`, {
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

async function getContainerStatus(containerId) {
  const response = await fetch(
    `${PROXY_URL}/api/instagram/container-status/${containerId}?accessToken=${INSTAGRAM_TOKEN}`
  );
  return await response.json();
}

async function waitForContainer(containerId, maxWait = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const status = await getContainerStatus(containerId);
    log(`   📊 Status: ${status.status_code || 'checking...'}`);

    if (status.status_code === 'FINISHED') {
      return true;
    } else if (status.status_code === 'ERROR') {
      throw new Error(`Container error: ${JSON.stringify(status)}`);
    }

    await new Promise(r => setTimeout(r, 5000));
  }
  throw new Error('Container processing timeout');
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ✨ PUBLISHING MEERA PLUS SENSUOUS ✨                                      ║
║                                                                              ║
║    Carousel (10 slides) + Stories (all 14 slides)                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    console.log('   Set it: export INSTAGRAM_TOKEN="your_token_here"');
    process.exit(1);
  }

  // Get all slides
  const slides = fs.readdirSync(COLLECTION_DIR)
    .filter(f => f.startsWith('slide_') && f.endsWith('.jpg'))
    .sort();

  log(`📷 Found ${slides.length} branded slides`);

  // Read caption
  const caption = fs.readFileSync(path.join(COLLECTION_DIR, 'caption.txt'), 'utf-8').trim();

  // === STEP 1: Upload all images to GitHub CDN ===
  console.log(`\n${'═'.repeat(70)}`);
  log(`📤 UPLOADING TO GITHUB CDN`);
  console.log(`${'═'.repeat(70)}`);

  const imageUrls = [];
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const filePath = path.join(COLLECTION_DIR, slide);
    try {
      const url = await uploadToGitHub(filePath, slide);
      imageUrls.push(url);
      log(`   ✅ [${i + 1}/${slides.length}] ${slide}`);
    } catch (err) {
      log(`   ❌ [${i + 1}/${slides.length}] Failed: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  // Save URLs
  fs.writeFileSync(
    path.join(COLLECTION_DIR, 'cdn-urls.json'),
    JSON.stringify({ urls: imageUrls, timestamp: new Date().toISOString() }, null, 2)
  );

  log(`\n   ⏳ CDN propagation (12s)...`);
  await new Promise(r => setTimeout(r, 12000));

  // === STEP 2: Publish Carousel (first 10 images) ===
  console.log(`\n${'═'.repeat(70)}`);
  log(`📱 PUBLISHING CAROUSEL`);
  console.log(`${'═'.repeat(70)}`);

  const carouselUrls = imageUrls.slice(0, 10);
  const childIds = [];

  for (let i = 0; i < carouselUrls.length; i++) {
    try {
      const result = await createCarouselItem(carouselUrls[i]);
      if (result.id) {
        childIds.push(result.id);
        log(`   ✅ [${i + 1}/${carouselUrls.length}] Item: ${result.id}`);
      } else {
        log(`   ⚠️ [${i + 1}] Failed: ${JSON.stringify(result).slice(0, 100)}`);
      }
    } catch (err) {
      log(`   ⚠️ [${i + 1}] Error: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  if (childIds.length >= 2) {
    log(`\n   📦 Creating carousel container (${childIds.length} items)...`);
    const carousel = await createCarousel(childIds, caption);

    if (carousel.id) {
      log(`   ✅ Container: ${carousel.id}`);
      log(`   ⏳ Instagram processing...`);

      await waitForContainer(carousel.id);

      log(`   📱 Publishing...`);
      const publishResult = await publishContainer(carousel.id);

      if (publishResult.id) {
        log(`   🎉 CAROUSEL PUBLISHED! ID: ${publishResult.id}`);
      } else {
        log(`   ❌ Publish failed: ${JSON.stringify(publishResult).slice(0, 150)}`);
      }
    } else {
      log(`   ❌ Carousel creation failed: ${JSON.stringify(carousel).slice(0, 150)}`);
    }
  } else {
    log(`   ❌ Not enough items for carousel (got ${childIds.length})`);
  }

  // === STEP 3: Publish Stories (all images) ===
  console.log(`\n${'═'.repeat(70)}`);
  log(`📱 PUBLISHING STORIES`);
  console.log(`${'═'.repeat(70)}`);

  const storyResults = [];
  for (let i = 0; i < imageUrls.length; i++) {
    try {
      log(`   📱 Story ${i + 1}/${imageUrls.length}...`);
      const result = await publishStory(imageUrls[i]);
      if (result.id) {
        storyResults.push(result.id);
        log(`   ✅ Story ${i + 1}: ${result.id}`);
      } else {
        log(`   ⚠️ Story ${i + 1} failed: ${JSON.stringify(result).slice(0, 100)}`);
      }
    } catch (err) {
      log(`   ⚠️ Story ${i + 1} error: ${err.message}`);
    }
    // Wait between stories to avoid rate limits
    await new Promise(r => setTimeout(r, 8000));
  }

  // === SUMMARY ===
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`                    PUBLISHING COMPLETE`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`
  📱 Carousel: ${childIds.length >= 2 ? '✅ Published' : '❌ Failed'}
  📱 Stories: ${storyResults.length}/${imageUrls.length} published

  Collection: MEERA | Plus Sensuous
  `);
  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
