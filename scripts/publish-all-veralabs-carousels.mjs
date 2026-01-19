#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  VERALABS INSTAGRAM CAROUSEL PUBLISHING MASTERCLASS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Publishes ALL branded carousels from instagram_branded_new to Instagram
 *  Each collection gets:
 *    - Carousel post (up to 10 images)
 *    - Story teaser (first image)
 *
 *  Features:
 *    - Automatic GitHub CDN upload
 *    - Rate limiting between posts
 *    - Progress tracking
 *    - Resume capability
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';

const BRANDED_DIR = '/home/ecolex/version1/instagram_branded_new';
const STATE_FILE = path.join(BRANDED_DIR, 'publish-state.json');

// Collection publishing order (strategic sequence)
const COLLECTION_ORDER = [
  // Meera Collections (Primary)
  'meera_masterclass',
  'meera_platinum_x',
  'meera_platinum_boudoir',
  'meera_candlelit_bath',
  'meera_shadow_intimacy',
  'meera_candlelit_extended',
  'meera_watery_shadow_mesh',
  'meera_reveals',
  'meera_platinum_amber_elite',
  'meera_candlelit_premium',
  'meera_retry_editorial',

  // Original Collections
  'bronze_mesh_masterclass',
  'meshminimal_muse',
  'crystalline_exclusive',
  'wooden_cabin_crystalline',
  'indian_hourglass_amalgamative',
  'vip_underground',
  'velvet_intimacy',
  'masterpiece_ii',
  'premium_editorial',
  'candlelit_chamber',
  'candlelit_chamber_extended',
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }
  return { published: [], failed: [], inProgress: null };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
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
      pathPrefix: 'photo/veralabs-carousels',
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

async function publishCollection(collectionId, state) {
  const collectionDir = path.join(BRANDED_DIR, collectionId);

  if (!fs.existsSync(collectionDir)) {
    log(`   ⏭️ Directory not found: ${collectionId}`);
    return null;
  }

  // Read caption
  const captionFile = path.join(collectionDir, 'caption.txt');
  let caption = `VERALABS | ${collectionId.replace(/_/g, ' ').toUpperCase()}\n\n#VERALABS #FineArtPhotography`;
  if (fs.existsSync(captionFile)) {
    caption = fs.readFileSync(captionFile, 'utf-8').trim();
  }

  // Get images
  const images = fs.readdirSync(collectionDir)
    .filter(f => f.startsWith('slide_') && f.endsWith('.jpg'))
    .sort()
    .slice(0, 10);

  if (images.length < 2) {
    log(`   ⏭️ Not enough images (need 2+): ${images.length}`);
    return null;
  }

  log(`   📷 Found ${images.length} branded slides`);

  // Upload images to GitHub CDN
  log(`   📤 Uploading to GitHub CDN...`);
  const imageUrls = [];

  for (let i = 0; i < images.length; i++) {
    const imagePath = path.join(collectionDir, images[i]);
    try {
      const url = await uploadToGitHub(imagePath, `${collectionId}_${images[i]}`);
      imageUrls.push(url);
      log(`   ✅ [${i + 1}/${images.length}] ${images[i]}`);
    } catch (err) {
      log(`   ⚠️ Upload failed for ${images[i]}: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  if (imageUrls.length < 2) {
    throw new Error('Not enough images uploaded to CDN');
  }

  // Save URLs for reference
  fs.writeFileSync(
    path.join(collectionDir, 'cdn-urls.json'),
    JSON.stringify({ urls: imageUrls, timestamp: new Date().toISOString() }, null, 2)
  );

  // Wait for CDN propagation
  log(`   ⏳ CDN propagation (10s)...`);
  await new Promise(r => setTimeout(r, 10000));

  // Create carousel items
  log(`   📦 Creating carousel items...`);
  const childIds = [];

  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const result = await createCarouselItem(imageUrls[i]);
      if (result.id) {
        childIds.push(result.id);
        log(`   ✅ [${i + 1}/${imageUrls.length}] Item: ${result.id}`);
      } else {
        log(`   ⚠️ Item ${i + 1} failed: ${JSON.stringify(result).slice(0, 100)}`);
      }
    } catch (err) {
      log(`   ⚠️ Item ${i + 1} error: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  if (childIds.length < 2) {
    throw new Error(`Not enough carousel items (got ${childIds.length}, need 2+)`);
  }

  // Create carousel container
  log(`   📦 Creating carousel (${childIds.length} items)...`);
  const carousel = await createCarousel(childIds, caption);

  if (!carousel.id) {
    throw new Error(`Carousel creation failed: ${JSON.stringify(carousel).slice(0, 200)}`);
  }

  log(`   ✅ Carousel container: ${carousel.id}`);

  // Wait for processing
  log(`   ⏳ Instagram processing...`);
  await waitForContainer(carousel.id);

  // Publish carousel
  log(`   📱 Publishing carousel...`);
  const publishResult = await publishContainer(carousel.id);

  if (!publishResult.id) {
    throw new Error(`Publish failed: ${JSON.stringify(publishResult).slice(0, 200)}`);
  }

  log(`   ✅ CAROUSEL PUBLISHED! ID: ${publishResult.id}`);

  // Publish story teaser
  let storyId = null;
  try {
    log(`   📱 Publishing story teaser...`);
    await new Promise(r => setTimeout(r, 3000));
    const storyResult = await publishStory(imageUrls[0]);
    if (storyResult.id) {
      storyId = storyResult.id;
      log(`   ✅ Story: ${storyId}`);
    }
  } catch (err) {
    log(`   ⚠️ Story failed: ${err.message}`);
  }

  return {
    carouselId: publishResult.id,
    storyId,
    images: imageUrls.length,
    caption: caption.split('\n')[0]
  };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗          ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝          ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗          ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╝╚════██║          ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║          ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝          ║
║                                                                              ║
║    📱 INSTAGRAM CAROUSEL PUBLISHING MASTERCLASS 📱                           ║
║                                                                              ║
║    ${COLLECTION_ORDER.length} Collections • CDN Upload • Carousel + Story                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    console.log('   Set it: export INSTAGRAM_TOKEN="your_token_here"');
    process.exit(1);
  }

  const state = loadState();
  log(`📊 State: ${state.published.length} published, ${state.failed.length} failed`);

  // Filter collections to publish
  const toPublish = COLLECTION_ORDER.filter(c =>
    !state.published.includes(c) &&
    fs.existsSync(path.join(BRANDED_DIR, c))
  );

  log(`📋 Collections to publish: ${toPublish.length}`);

  if (toPublish.length === 0) {
    log('✅ All collections already published!');
    return;
  }

  const results = [];

  for (let i = 0; i < toPublish.length; i++) {
    const collectionId = toPublish[i];

    console.log(`\n${'═'.repeat(76)}`);
    log(`📱 [${i + 1}/${toPublish.length}] ${collectionId.toUpperCase()}`);
    console.log(`${'═'.repeat(76)}`);

    state.inProgress = collectionId;
    saveState(state);

    try {
      const result = await publishCollection(collectionId, state);

      if (result) {
        state.published.push(collectionId);
        results.push({ collection: collectionId, ...result, status: 'success' });
        log(`\n   🎉 SUCCESS: ${result.caption}`);
      } else {
        state.failed.push(collectionId);
        results.push({ collection: collectionId, status: 'skipped' });
      }
    } catch (err) {
      log(`   ❌ ERROR: ${err.message}`);
      state.failed.push(collectionId);
      results.push({ collection: collectionId, error: err.message, status: 'failed' });
    }

    state.inProgress = null;
    saveState(state);

    // Rate limiting between collections
    if (i < toPublish.length - 1) {
      const waitTime = 60; // 60 seconds between carousels
      log(`\n   ⏳ Rate limit pause: ${waitTime}s...`);
      await new Promise(r => setTimeout(r, waitTime * 1000));
    }
  }

  // Final summary
  console.log(`\n${'═'.repeat(76)}`);
  console.log(`                    PUBLISHING SUMMARY`);
  console.log(`${'═'.repeat(76)}`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');
  const skipped = results.filter(r => r.status === 'skipped');

  console.log(`\n  ✅ Published: ${successful.length}`);
  successful.forEach(r => {
    console.log(`     📱 ${r.collection}: ${r.images} images (ID: ${r.carouselId})`);
  });

  if (failed.length > 0) {
    console.log(`\n  ❌ Failed: ${failed.length}`);
    failed.forEach(r => {
      console.log(`     ⚠️ ${r.collection}: ${r.error}`);
    });
  }

  if (skipped.length > 0) {
    console.log(`\n  ⏭️ Skipped: ${skipped.length}`);
    skipped.forEach(r => {
      console.log(`     ○ ${r.collection}`);
    });
  }

  // Save final manifest
  const manifestPath = path.join(BRANDED_DIR, 'final-carousel-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      published: successful.length,
      failed: failed.length,
      skipped: skipped.length
    }
  }, null, 2));

  console.log(`\n  📋 Manifest: ${manifestPath}`);
  console.log(`${'═'.repeat(76)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
