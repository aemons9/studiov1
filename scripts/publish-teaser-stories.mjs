#!/usr/bin/env node
/**
 * VERALABS STRATEGIC TEASER STORIES
 * Max-mode engagement teasers for upcoming collections
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

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

const TEMP_DIR = '/home/ecolex/version1/temp-stories';
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ✨ VERALABS STRATEGIC TEASER STORIES - MAX ENGAGEMENT ✨                   ║
║                                                                              ║
║   Building Anticipation • Creating Urgency • Driving Engagement              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

// Strategic teaser configurations for each collection
const TEASER_COLLECTIONS = [
  {
    id: 'platinum_boudoir',
    name: 'Platinum Boudoir',
    source: '/home/ecolex/version1/instagram_branded_new/meera_platinum_boudoir',
    slide: 'slide_08.jpg', // Spa Venus Rising - most striking
    teaser: {
      headline: 'COMING SOON',
      title: 'PLATINUM BOUDOIR',
      subtitle: 'Water • Shadow • Thread',
      cta: 'Full collection dropping soon',
      accentColor: '#c4a87c',
    }
  },
  {
    id: 'watery_shadow',
    name: 'Watery Shadow Mesh',
    source: '/home/ecolex/version1/instagram_branded_new/meera_watery_shadow_mesh',
    slide: 'slide_01.jpg', // Rainfall Venus
    teaser: {
      headline: 'EXCLUSIVE',
      title: 'WATERY SHADOW MESH',
      subtitle: 'Droplets • Shadows • Artistry',
      cta: 'Premium collection incoming',
      accentColor: '#7eb8da',
    }
  },
  {
    id: 'candlelit_bath',
    name: 'Candlelit Bath',
    source: '/home/ecolex/version1/instagram_branded_new/meera_candlelit_bath',
    slide: 'slide_01.jpg', // Emerging Venus
    teaser: {
      headline: 'NEW SERIES',
      title: 'CANDLELIT BATH',
      subtitle: 'Water as Wardrobe',
      cta: 'Masterworks arriving soon',
      accentColor: '#d4af8a',
    }
  },
  {
    id: 'shadow_intimacy',
    name: 'Shadow Intimacy',
    source: '/home/ecolex/version1/instagram_branded_new/meera_shadow_intimacy',
    slide: 'slide_02.jpg', // Strong shadow variant
    teaser: {
      headline: 'PRIVATE PREVIEW',
      title: 'SHADOW INTIMACY',
      subtitle: 'Chiaroscuro Conceptual Art',
      cta: 'Exclusive drop coming',
      accentColor: '#a8927c',
    }
  }
];

// Create 9:16 story image with teaser overlay
async function createStoryTeaser(collection) {
  const srcPath = path.join(collection.source, collection.slide);
  if (!fs.existsSync(srcPath)) {
    console.log(`   ❌ Source not found: ${srcPath}`);
    return null;
  }

  const outputPath = path.join(TEMP_DIR, `story_${collection.id}.jpg`);
  const t = collection.teaser;

  // Story dimensions: 1080x1920 (9:16)
  const width = 1080;
  const height = 1920;

  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.75)"/>
          <stop offset="50%" style="stop-color:rgba(0,0,0,0)"/>
        </linearGradient>
        <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="40%" style="stop-color:rgba(0,0,0,0.65)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.90)"/>
        </linearGradient>
      </defs>

      <!-- Top gradient for headline -->
      <rect x="0" y="0" width="${width}" height="400" fill="url(#topFade)"/>

      <!-- Bottom gradient for text -->
      <rect x="0" y="1200" width="${width}" height="720" fill="url(#bottomFade)"/>

      <!-- Headline badge -->
      <rect x="${width/2 - 120}" y="100" width="240" height="45" rx="22" fill="${t.accentColor}" opacity="0.9"/>
      <text x="${width/2}" y="132"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="18"
            font-weight="bold"
            fill="black"
            text-anchor="middle">${t.headline}</text>

      <!-- Collection title -->
      <text x="${width/2}" y="1500"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="52"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${t.title}</text>

      <!-- Subtitle -->
      <text x="${width/2}" y="1570"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="26"
            font-style="italic"
            fill="${t.accentColor}"
            text-anchor="middle">${t.subtitle}</text>

      <!-- CTA -->
      <text x="${width/2}" y="1680"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="20"
            fill="rgba(255,255,255,0.8)"
            text-anchor="middle">${t.cta}</text>

      <!-- Swipe up hint -->
      <text x="${width/2}" y="1820"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="16"
            fill="rgba(255,255,255,0.5)"
            text-anchor="middle">VERALABS</text>

      <!-- Decorative line -->
      <line x1="${width/2 - 60}" y1="1620" x2="${width/2 + 60}" y2="1620"
            stroke="${t.accentColor}" stroke-width="2" opacity="0.7"/>
    </svg>
  `);

  try {
    // Load and resize source image to story format
    const baseImage = await sharp(srcPath)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .toBuffer();

    // Composite with overlay
    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 92 })
      .toFile(outputPath);

    console.log(`   ✅ Created story: ${collection.name}`);
    return outputPath;
  } catch (err) {
    console.error(`   ❌ Error creating story: ${err.message}`);
    return null;
  }
}

// Upload to GitHub CDN
async function uploadToGitHub(filePath, filename) {
  const content = fs.readFileSync(filePath).toString('base64');
  const githubPath = `photo/stories/${Date.now()}_${filename}`;

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${githubPath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Story: ${filename}`,
        content: content,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message}`);
  }

  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${githubPath}`;
  return rawUrl;
}

// Create Instagram story container (image)
async function createStoryContainer(imageUrl) {
  const params = new URLSearchParams({
    media_type: 'STORIES',
    image_url: imageUrl,
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

  while (status === 'IN_PROGRESS' && attempts < 20) {
    await new Promise(r => setTimeout(r, 3000));

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${containerId}?fields=status_code&access_token=${INSTAGRAM_TOKEN}`
    );
    const data = await response.json();
    status = data.status_code || 'IN_PROGRESS';

    process.stdout.write(`\r   ⏳ Processing: ${status} (${attempts + 1}/20)`);
    attempts++;

    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Processing failed: ${status}`);
    }
  }
  console.log('');
  return status;
}

// Publish story
async function publishStory(containerId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${containerId}&access_token=${INSTAGRAM_TOKEN}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const results = [];

  for (let i = 0; i < TEASER_COLLECTIONS.length; i++) {
    const collection = TEASER_COLLECTIONS[i];
    console.log(`\n══════════════════════════════════════════════════════════════════════════════`);
    console.log(`[${i + 1}/${TEASER_COLLECTIONS.length}] ${collection.name.toUpperCase()}`);
    console.log(`══════════════════════════════════════════════════════════════════════════════`);

    try {
      // Create story image
      const storyPath = await createStoryTeaser(collection);
      if (!storyPath) {
        results.push({ collection: collection.name, status: 'failed', reason: 'Story creation failed' });
        continue;
      }

      // Upload to GitHub
      console.log(`   📤 Uploading to CDN...`);
      const imageUrl = await uploadToGitHub(storyPath, `teaser_${collection.id}.jpg`);
      console.log(`   ✅ CDN URL ready`);

      // Create story container
      console.log(`   📱 Creating story container...`);
      const containerId = await createStoryContainer(imageUrl);
      console.log(`   ✅ Container: ${containerId}`);

      // Wait for processing
      await waitForProcessing(containerId);

      // Publish
      console.log(`   🚀 Publishing story...`);
      const mediaId = await publishStory(containerId);
      console.log(`   ✅ PUBLISHED: ${mediaId}`);

      results.push({ collection: collection.name, status: 'success', mediaId });

      // Delay between stories for strategic timing
      if (i < TEASER_COLLECTIONS.length - 1) {
        console.log(`   ⏳ Waiting 15s before next story...`);
        await sleep(15000);
      }

    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      results.push({ collection: collection.name, status: 'failed', reason: err.message });
    }
  }

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                         TEASER STORIES SUMMARY                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`  ✅ Published: ${successful.length}/${results.length} stories`);

  if (successful.length > 0) {
    console.log(`\n  SUCCESSFUL:`);
    successful.forEach(r => console.log(`     📸 ${r.collection} - Media ID: ${r.mediaId}`));
  }

  if (failed.length > 0) {
    console.log(`\n  FAILED:`);
    failed.forEach(r => console.log(`     ❌ ${r.collection} - ${r.reason}`));
  }

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  Teaser stories create 24-hour urgency for upcoming carousel posts.
  Full collections ready for publishing on your command.
══════════════════════════════════════════════════════════════════════════════
`);

  // Cleanup temp files
  fs.readdirSync(TEMP_DIR).forEach(f => fs.unlinkSync(path.join(TEMP_DIR, f)));
}

main().catch(console.error);
