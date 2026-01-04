#!/usr/bin/env node
/**
 * Publish a specific carousel from the carousels folder
 *
 * Usage: node scripts/publishCarousel.mjs <carousel-id>
 * Example: node scripts/publishCarousel.mjs carousel-02-shadow_artistic
 */

import fs from 'fs';
import path from 'path';

// Validate required environment variables
if (!process.env.INSTAGRAM_TOKEN) throw new Error('INSTAGRAM_TOKEN environment variable required');
if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable required');

const CONFIG = {
  CAROUSELS_DIR: path.join(process.cwd(), 'preview-output', 'carousels'),
  IG_ACCOUNT_ID: process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462',
  PAGE_ACCESS_TOKEN: process.env.INSTAGRAM_TOKEN,
  GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  GITHUB_OWNER: process.env.GITHUB_USER || 'aemons9',
  GITHUB_REPO: process.env.GITHUB_REPO || 'studiov1',
  GITHUB_BRANCH: 'main',
  GITHUB_PATH: 'photo/instagram',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToGitHub(base64Data, filename) {
  const filePath = `${CONFIG.GITHUB_PATH}/${filename}`;
  const apiUrl = `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/${filePath}`;

  console.log(`   📤 Uploading: ${filename}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `[Auto] Add carousel image: ${filename}`,
      content: base64Data,
      branch: CONFIG.GITHUB_BRANCH,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'GitHub upload failed');
  }

  await sleep(2000);
  return `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.GITHUB_BRANCH}/${filePath}`;
}

async function waitForContainer(containerId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000);

    const statusUrl = `${CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${CONFIG.PAGE_ACCESS_TOKEN}`;
    const response = await fetch(statusUrl);
    const data = await response.json();

    const status = (data.status || '').toUpperCase();

    if (status === 'FINISHED' || status.startsWith('FINISHED')) {
      return true;
    }

    if (status === 'ERROR' || status.startsWith('ERROR')) {
      throw new Error(`Container failed: ${data.status_code || data.status}`);
    }
  }

  throw new Error('Timeout waiting for container');
}

async function publishCarousel(imageUrls, caption) {
  console.log(`\n📚 Publishing carousel with ${imageUrls.length} images...`);

  // Create child containers
  const childIds = [];

  for (const imageUrl of imageUrls) {
    const containerUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media`;
    const containerParams = new URLSearchParams({
      image_url: imageUrl,
      is_carousel_item: 'true',
      access_token: CONFIG.PAGE_ACCESS_TOKEN,
    });

    const response = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`   ❌ Child container failed:`, data.error);
      continue;
    }

    childIds.push(data.id);
    console.log(`   ✅ Child container: ${data.id}`);
  }

  if (childIds.length < 2) {
    throw new Error('Need at least 2 carousel items');
  }

  // Wait for children
  console.log('   ⏳ Processing images...');
  for (const childId of childIds) {
    await waitForContainer(childId);
  }

  // Create carousel container
  const carouselUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media`;
  const carouselParams = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const carouselResponse = await fetch(carouselUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: carouselParams.toString(),
  });

  const carouselData = await carouselResponse.json();

  if (!carouselResponse.ok) {
    throw new Error(carouselData.error?.message || 'Carousel creation failed');
  }

  const containerId = carouselData.id;
  console.log(`   📦 Carousel container: ${containerId}`);

  await waitForContainer(containerId);

  // Publish
  const publishUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media_publish`;
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const publishResponse = await fetch(publishUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString(),
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    throw new Error(publishData.error?.message || 'Publish failed');
  }

  return { success: true, mediaId: publishData.id };
}

async function main() {
  const carouselId = process.argv[2];

  if (!carouselId) {
    console.log('Usage: node scripts/publishCarousel.mjs <carousel-id>');
    console.log('Example: node scripts/publishCarousel.mjs carousel-02-shadow_artistic');

    // List available carousels
    const dirs = fs.readdirSync(CONFIG.CAROUSELS_DIR).filter(d =>
      fs.statSync(path.join(CONFIG.CAROUSELS_DIR, d)).isDirectory()
    );
    console.log('\nAvailable carousels:');
    dirs.forEach(d => console.log(`  - ${d}`));
    return;
  }

  const carouselDir = path.join(CONFIG.CAROUSELS_DIR, carouselId);

  if (!fs.existsSync(carouselDir)) {
    console.error(`❌ Carousel not found: ${carouselId}`);
    return;
  }

  // Load metadata
  const metadataPath = path.join(carouselDir, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    console.error(`❌ No metadata.json found in ${carouselId}`);
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  console.log('\n' + '═'.repeat(60));
  console.log(`📚 PUBLISHING: ${carouselId}`);
  console.log('═'.repeat(60));
  console.log(`   Category: ${metadata.category}`);
  console.log(`   Images: ${metadata.imageCount}`);
  console.log(`   Caption: "${metadata.caption}"`);
  console.log();

  // Upload images to GitHub
  console.log('📤 Step 1: Uploading images to GitHub...');
  const imageUrls = [];

  for (const img of metadata.images) {
    try {
      const buffer = fs.readFileSync(img.processedPath);
      const base64 = buffer.toString('base64');
      const filename = `carousel-${Date.now()}-${img.index}-${Math.random().toString(36).substring(2, 6)}.jpg`;
      const url = await uploadToGitHub(base64, filename);
      imageUrls.push(url);
      console.log(`      ✅ Image ${img.index} uploaded`);
    } catch (error) {
      console.error(`      ❌ Image ${img.index} failed: ${error.message}`);
    }
  }

  if (imageUrls.length < 2) {
    console.error('\n❌ Not enough images uploaded');
    return;
  }

  // Publish to Instagram
  console.log('\n📸 Step 2: Publishing to Instagram...');
  const result = await publishCarousel(imageUrls, metadata.fullCaption);

  // Update metadata
  metadata.status = 'published';
  metadata.publishedAt = new Date().toISOString();
  metadata.instagramMediaId = result.mediaId;
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log('\n' + '═'.repeat(60));
  console.log('✅ CAROUSEL PUBLISHED!');
  console.log('═'.repeat(60));
  console.log(`   Media ID: ${result.mediaId}`);
  console.log(`   Images: ${imageUrls.length}`);
  console.log('═'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
