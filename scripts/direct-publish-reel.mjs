#!/usr/bin/env node
/**
 * Direct Instagram Reel Publisher
 * Uses a public file hosting approach
 */
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { execSync } from 'child_process';

// Load .env.local
config({ path: path.join(process.cwd(), '.env.local') });

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN || process.env.VITE_INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GRAPH_API_BASE = 'https://graph.facebook.com/v18.0';

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Try to get a fresh GitHub token from gh CLI
function getGitHubToken() {
  try {
    const token = execSync('gh auth token 2>/dev/null').toString().trim();
    if (token) {
      log('   Using fresh GitHub token from gh CLI');
      return token;
    }
  } catch (e) {
    // gh CLI not available or not authenticated
  }

  // Fall back to env
  return process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
}

async function uploadToGitHub(filePath, prefix = 'reel') {
  const token = getGitHubToken();
  if (!token) {
    throw new Error('No GitHub token available');
  }

  const filename = `${prefix}_${Date.now()}${path.extname(filePath)}`;
  const content = fs.readFileSync(filePath).toString('base64');
  const apiUrl = `https://api.github.com/repos/aemons9/studiov1/contents/photo/reels/${filename}`;

  log(`   Uploading: ${filename}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Upload: ${filename}`,
      content: content,
      branch: 'main',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message}`);
  }

  const rawUrl = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/reels/${filename}`;
  log(`   ✅ Uploaded: ${rawUrl}`);
  return rawUrl;
}

async function createContainer(videoUrl, caption, coverUrl = null) {
  log('📱 Creating Instagram Reel container...');

  const params = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: INSTAGRAM_TOKEN,
  });

  if (coverUrl) {
    params.append('cover_url', coverUrl);
    log(`   🖼️ Cover image set`);
  }

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Container creation failed: ${data.error.message}`);
  }

  log(`   ✅ Container created: ${data.id}`);
  return data.id;
}

async function waitForProcessing(containerId) {
  log('⏳ Waiting for video processing...');

  let attempts = 0;
  const maxAttempts = 40;
  let delay = 5000;
  const maxDelay = 15000;

  while (attempts < maxAttempts) {
    await sleep(delay);

    const response = await fetch(
      `${GRAPH_API_BASE}/${containerId}?fields=status_code,status&access_token=${INSTAGRAM_TOKEN}`
    );
    const data = await response.json();

    const status = data.status_code || data.status;
    log(`   Status: ${status} (attempt ${attempts + 1}/${maxAttempts})`);

    if (status === 'FINISHED') {
      log('   ✅ Processing complete!');
      return true;
    }

    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Video processing failed: ${status}`);
    }

    attempts++;
    delay = Math.min(delay * 1.2, maxDelay);
  }

  throw new Error('Processing timeout');
}

async function publishContainer(containerId) {
  log('🚀 Publishing to Instagram...');

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      creation_id: containerId,
      access_token: INSTAGRAM_TOKEN,
    }).toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Publish failed: ${data.error.message}`);
  }

  log(`   ✅ Published! Media ID: ${data.id}`);
  return data.id;
}

async function main() {
  const videoPath = process.argv[2];
  const thumbPath = process.argv[3];
  const caption = process.argv[4];
  const reelId = process.argv[5] || 'reel';

  if (!videoPath || !thumbPath || !caption) {
    console.log(`
Usage: node scripts/direct-publish-reel.mjs <videoPath> <thumbPath> <caption> [reelId]
`);
    process.exit(1);
  }

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ Missing INSTAGRAM_TOKEN');
    process.exit(1);
  }

  log(`\n${'═'.repeat(60)}`);
  log(`🎬 VERALABS DIRECT REEL PUBLISHER`);
  log(`${'═'.repeat(60)}\n`);
  log(`📹 Video: ${path.basename(videoPath)}`);
  log(`🖼️ Thumbnail: ${path.basename(thumbPath)}`);

  try {
    // Upload to GitHub
    const videoUrl = await uploadToGitHub(videoPath, `veralabs_${reelId}`);
    const coverUrl = await uploadToGitHub(thumbPath, `veralabs_${reelId}_thumb`);

    // Wait for CDN
    log('\n⏳ Waiting for CDN propagation (3s)...\n');
    await sleep(3000);

    // Create container
    const containerId = await createContainer(videoUrl, caption, coverUrl);

    // Wait for processing
    await waitForProcessing(containerId);

    // Publish
    const mediaId = await publishContainer(containerId);

    log(`\n${'═'.repeat(60)}`);
    log(`✅ REEL PUBLISHED SUCCESSFULLY!`);
    log(`${'═'.repeat(60)}`);
    log(`   📱 Media ID: ${mediaId}`);
    log(`${'═'.repeat(60)}\n`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
