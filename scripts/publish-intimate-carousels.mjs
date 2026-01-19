#!/usr/bin/env node
/**
 * VERALABS Intimate Collection Carousel Publisher
 * Publishes branded intimate collection carousels to Instagram
 */

import fs from 'fs';
import path from 'path';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const IG_ACCOUNT_ID = '17841478517688462';
const GRAPH_API = 'https://graph.facebook.com/v21.0';
const PROXY_URL = 'http://localhost:3001';
const BRANDED_DIR = '/home/ecolex/version1/instagram-intimate-branded';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function uploadToGitHub(imagePath, filename) {
  const buffer = fs.readFileSync(imagePath);
  const base64 = buffer.toString('base64');

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64,
      filename: `intimate_${filename}_${Date.now()}.jpg`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/intimate-collection'
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub upload failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.publicUrl || data.url;
}

async function waitForContainer(containerId, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(3000);

    const url = `${GRAPH_API}/${containerId}?fields=status,status_code&access_token=${INSTAGRAM_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    const status = (data.status || '').toUpperCase();

    if (status === 'FINISHED' || status.includes('FINISHED')) {
      return true;
    }

    if (status === 'ERROR' || status.includes('ERROR')) {
      throw new Error(`Container error: ${data.status_code || status}`);
    }

    process.stdout.write('.');
  }

  throw new Error('Timeout waiting for container');
}

async function publishCarousel(imageUrls, caption) {
  log(`   Creating ${imageUrls.length} child containers...`);

  const childIds = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const params = new URLSearchParams({
      image_url: imageUrls[i],
      is_carousel_item: 'true',
      access_token: INSTAGRAM_TOKEN
    });

    const response = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      log(`   ❌ Child ${i + 1} failed: ${data.error?.message}`);
      continue;
    }

    childIds.push(data.id);
    log(`   ✅ Child ${i + 1}: ${data.id}`);
    await sleep(1000);
  }

  if (childIds.length < 2) {
    throw new Error('Need at least 2 carousel items');
  }

  // Wait for all children to process
  log('   ⏳ Processing images');
  for (const childId of childIds) {
    await waitForContainer(childId);
  }
  console.log(' Done');

  // Create carousel container
  log('   📦 Creating carousel container...');
  const carouselParams = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption: caption,
    access_token: INSTAGRAM_TOKEN
  });

  const carouselResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: carouselParams.toString()
  });

  const carouselData = await carouselResponse.json();

  if (!carouselResponse.ok) {
    throw new Error(carouselData.error?.message || 'Carousel creation failed');
  }

  const containerId = carouselData.id;
  log(`   📦 Container ID: ${containerId}`);

  // Wait for carousel to process
  process.stdout.write('   ⏳ Processing carousel');
  await waitForContainer(containerId);
  console.log(' Done');

  // Publish
  log('   🚀 Publishing...');
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: INSTAGRAM_TOKEN
  });

  const publishResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    throw new Error(publishData.error?.message || 'Publish failed');
  }

  return publishData.id;
}

async function publishStory(imageUrl) {
  const params = new URLSearchParams({
    image_url: imageUrl,
    media_type: 'STORIES',
    access_token: INSTAGRAM_TOKEN
  });

  const response = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Story container failed');
  }

  await waitForContainer(data.id);

  const publishParams = new URLSearchParams({
    creation_id: data.id,
    access_token: INSTAGRAM_TOKEN
  });

  const publishResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const publishData = await publishResponse.json();
  return publishData.id;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║        📸 INTIMATE COLLECTION INSTAGRAM PUBLISHER 📸                     ║
║                                                                          ║
║     Publishing Branded Carousels • Stories • Masterclass Quality         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ Missing INSTAGRAM_TOKEN');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const specificCollection = args[0];
  const publishStories = args.includes('--stories');

  // Get all collection folders
  const folders = fs.readdirSync(BRANDED_DIR).filter(f => {
    const stat = fs.statSync(path.join(BRANDED_DIR, f));
    return stat.isDirectory();
  });

  const collectionsToPublish = specificCollection
    ? folders.filter(f => f === specificCollection)
    : folders;

  if (collectionsToPublish.length === 0) {
    console.error(`❌ Collection not found: ${specificCollection}`);
    console.log('Available collections:', folders.join(', '));
    process.exit(1);
  }

  const results = [];

  for (const folder of collectionsToPublish) {
    const folderPath = path.join(BRANDED_DIR, folder);
    const metaPath = path.join(folderPath, 'collection.json');

    if (!fs.existsSync(metaPath)) {
      log(`   ⏭️ Skipping ${folder} - no metadata`);
      continue;
    }

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    console.log(`\n${'═'.repeat(70)}`);
    log(`📸 PUBLISHING: ${meta.name}`);
    console.log(`${'═'.repeat(70)}`);
    log(`   Collection: ${meta.collection}`);

    // Get all slides
    const slides = fs.readdirSync(folderPath)
      .filter(f => f.startsWith('slide_') && f.endsWith('.jpg'))
      .sort();

    log(`   📷 Found ${slides.length} slides`);

    if (slides.length < 2) {
      log(`   ⏭️ Skipping - need at least 2 slides for carousel`);
      continue;
    }

    // Upload to GitHub CDN
    log('   📤 Uploading to GitHub CDN...');
    const imageUrls = [];

    for (const slide of slides) {
      const slidePath = path.join(folderPath, slide);
      try {
        const url = await uploadToGitHub(slidePath, `${folder}_${slide}`);
        imageUrls.push(url);
        log(`      ✅ ${slide}`);
        await sleep(1500);
      } catch (err) {
        log(`      ❌ ${slide}: ${err.message}`);
      }
    }

    if (imageUrls.length < 2) {
      log('   ❌ Not enough images uploaded');
      continue;
    }

    // Wait for CDN propagation
    log('   ⏳ Waiting for CDN propagation (5s)...');
    await sleep(5000);

    // Publish carousel
    try {
      const mediaId = await publishCarousel(imageUrls, meta.caption);
      log(`   ✅ PUBLISHED! Media ID: ${mediaId}`);
      results.push({ collection: meta.name, mediaId, status: 'success' });

      // Publish first slide as story
      if (publishStories) {
        log('   📱 Publishing story...');
        try {
          const storyId = await publishStory(imageUrls[0]);
          log(`   ✅ Story published: ${storyId}`);
        } catch (err) {
          log(`   ⚠️ Story failed: ${err.message}`);
        }
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({ collection: meta.name, error: err.message, status: 'failed' });
    }

    // Wait between carousels to avoid rate limits
    if (collectionsToPublish.indexOf(folder) < collectionsToPublish.length - 1) {
      log('   ⏳ Waiting 30s before next carousel...');
      await sleep(30000);
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    PUBLISHING COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  for (const r of results) {
    if (r.status === 'success') {
      console.log(`  ✅ ${r.collection}: ${r.mediaId}`);
    } else {
      console.log(`  ❌ ${r.collection}: ${r.error}`);
    }
  }

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
