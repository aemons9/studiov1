#!/usr/bin/env node
/**
 * Publish MEERA PLATINUM X Carousel to Instagram
 */

import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const SRC_DIR = '/home/ecolex/version1/instagram_branded_new/meera_platinum_x';
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_BRANCH = 'main';

if (!INSTAGRAM_TOKEN || !GITHUB_TOKEN) {
  console.error('Missing tokens in .env.local');
  process.exit(1);
}

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ✨ PUBLISHING MEERA PLATINUM X CAROUSEL ✨                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Upload to GitHub CDN
async function uploadToGitHub(filePath, filename) {
  const content = fs.readFileSync(filePath).toString('base64');
  const githubPath = `photo/platinum-x/${Date.now()}_${filename}`;

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${githubPath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Platinum X: ${filename}`,
        content: content,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message}`);
  }

  return `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${githubPath}`;
}

// Create carousel item container
async function createItemContainer(imageUrl) {
  const params = new URLSearchParams({
    image_url: imageUrl,
    is_carousel_item: 'true',
    access_token: INSTAGRAM_TOKEN,
  });

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

// Create carousel container
async function createCarouselContainer(childIds, caption) {
  const params = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption: caption,
    access_token: INSTAGRAM_TOKEN,
  });

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

// Wait for processing
async function waitForProcessing(containerId) {
  let status = 'IN_PROGRESS';
  let attempts = 0;

  while (status === 'IN_PROGRESS' && attempts < 30) {
    await sleep(5000);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${containerId}?fields=status_code&access_token=${INSTAGRAM_TOKEN}`
    );
    const data = await response.json();
    status = data.status_code || 'IN_PROGRESS';

    process.stdout.write(`\r   ⏳ Processing: ${status} (${attempts + 1}/30)`);
    attempts++;

    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Processing failed: ${status}`);
    }
  }
  console.log('');
  return status;
}

// Publish carousel
async function publishCarousel(containerId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${containerId}&access_token=${INSTAGRAM_TOKEN}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

async function main() {
  // Get images (max 10 for carousel)
  const images = fs.readdirSync(SRC_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10);

  console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images\n`);

  // Read caption
  const captionPath = path.join(SRC_DIR, 'caption.txt');
  const caption = fs.existsSync(captionPath)
    ? fs.readFileSync(captionPath, 'utf-8')
    : 'MEERA | PLATINUM X\n\n#VERALABS #PlatinumX';

  // Upload images to GitHub and create item containers
  const childIds = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    console.log(`[${i + 1}/${images.length}] Uploading ${img}...`);

    try {
      // Upload to GitHub
      const imageUrl = await uploadToGitHub(path.join(SRC_DIR, img), img);
      console.log(`   ✅ CDN ready`);

      // Create item container
      const itemId = await createItemContainer(imageUrl);
      childIds.push(itemId);
      console.log(`   ✅ Container: ${itemId}`);

      await sleep(1000);
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
    }
  }

  if (childIds.length < 2) {
    console.error('Need at least 2 images for carousel');
    process.exit(1);
  }

  console.log(`\n══════════════════════════════════════════════════════════════════════════════`);
  console.log(`Creating carousel with ${childIds.length} images...`);
  console.log(`══════════════════════════════════════════════════════════════════════════════\n`);

  // Create carousel container
  console.log(`   📦 Creating carousel container...`);
  const carouselId = await createCarouselContainer(childIds, caption);
  console.log(`   ✅ Carousel container: ${carouselId}`);

  // Wait for processing
  await waitForProcessing(carouselId);

  // Publish
  console.log(`   🚀 Publishing carousel...`);
  const mediaId = await publishCarousel(carouselId);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ✅ PLATINUM X CAROUSEL PUBLISHED                                           ║
║                                                                              ║
║   Media ID: ${mediaId.padEnd(52)}║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);
}

main().catch(console.error);
