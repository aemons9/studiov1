#!/usr/bin/env node

/**
 * VERALABS REEL PUBLISHER
 * Publishes MP4 reels to Instagram via Graph API
 */

import { readFileSync, existsSync, unlinkSync } from 'fs';
import { basename, dirname, join } from 'path';
import { execSync } from 'child_process';
import { config } from 'dotenv';

// Load .env.local for local development
config({ path: '.env.local' });

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_BRANCH = 'main';
const GITHUB_PATH = 'photo/reels';

// Get tokens from environment or command line
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN || process.argv[3];
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN || !INSTAGRAM_TOKEN) {
  console.error('Missing tokens. Ensure .env.local exists with GITHUB_TOKEN and INSTAGRAM_TOKEN');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// CAPTIONS AND HASHTAGS
// ═══════════════════════════════════════════════════════════════════════════

const CAPTIONS = {
  boudoir: [
    '✨ Whispers of silk and shadow...',
    '🌹 Where intimacy meets artistry',
    '💫 Captured moments of pure elegance',
  ],
  midnightMuse: [
    '🌙 When the stars whisper secrets...',
    '✨ Dancing with shadows after midnight',
    '🔮 Moonlit dreams and velvet darkness',
  ],
  goldenHour: [
    '☀️ Chasing the golden light...',
    '✨ Sun-kissed dreams in amber glow',
    '🌅 The magic of golden hour',
  ],
};

const HASHTAGS = {
  boudoir: '#boudoir #intimatephotography #artisticnude #sensual #elegance #feminine #boudoirphotography #luxuryboudoir #womensempowerment #selflovephotography #bodypositivity #artisticphotography #fashionphotography #veralabs',
  midnightMuse: '#darkphotography #moody #artistic #mysterious #nightphotography #cinematic #editorial #fashionphotography #conceptualphotography #creativephotography #veralabs #midnightmuse #darkelegance',
  goldenHour: '#goldenhour #sunsetphotography #warmlight #ethereal #dreamy #fashionphotography #portraitphotography #naturallight #magichour #goldenlight #veralabs #cinematicphotography',
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function getAesthetic(filename) {
  if (filename.includes('boudoir')) return 'boudoir';
  if (filename.includes('midnightMuse')) return 'midnightMuse';
  if (filename.includes('goldenHour')) return 'goldenHour';
  return 'boudoir';
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════════════════
// THUMBNAIL EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════

function extractThumbnail(videoPath, outputPath, timeOffset = 5) {
  console.log(`🖼️  Extracting thumbnail at ${timeOffset}s...`);

  try {
    // Extract a frame at the specified time offset (after fade-in)
    execSync(
      `${FFMPEG} -y -i "${videoPath}" -ss ${timeOffset} -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`,
      { stdio: 'pipe' }
    );

    if (existsSync(outputPath)) {
      console.log(`   ✅ Thumbnail extracted`);
      return true;
    }
  } catch (error) {
    console.error(`   ⚠️  Thumbnail extraction failed`);
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// GITHUB UPLOAD (for public URL)
// ═══════════════════════════════════════════════════════════════════════════

async function uploadToGitHub(filePath, githubToken) {
  const filename = `${GITHUB_PATH}/${Date.now()}_${basename(filePath)}`;
  const content = readFileSync(filePath).toString('base64');

  console.log(`📤 Uploading to GitHub: ${filename}`);

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${filename}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Upload reel: ${basename(filePath)}`,
        content: content,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message || JSON.stringify(error)}`);
  }

  const data = await response.json();
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;

  console.log(`✅ Uploaded: ${rawUrl}`);
  return rawUrl;
}

// ═══════════════════════════════════════════════════════════════════════════
// INSTAGRAM REEL PUBLISHING
// ═══════════════════════════════════════════════════════════════════════════

async function createReelContainer(videoUrl, caption, accessToken, coverUrl = null) {
  console.log('📱 Creating Instagram Reel container...');

  const params = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: accessToken,
  });

  // Add cover image if provided
  if (coverUrl) {
    params.append('cover_url', coverUrl);
    console.log(`   🖼️  Cover image: ${coverUrl.substring(0, 60)}...`);
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`Container creation failed: ${data.error.message}`);
  }

  console.log(`✅ Container created: ${data.id}`);
  return data.id;
}

async function checkContainerStatus(containerId, accessToken) {
  const params = new URLSearchParams({
    fields: 'status_code,status',
    access_token: accessToken,
  });

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${containerId}?${params}`
  );

  return response.json();
}

async function publishContainer(containerId, accessToken) {
  console.log('🚀 Publishing Reel...');

  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: accessToken,
  });

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`Publish failed: ${data.error.message}`);
  }

  return data.id;
}

async function publishReelToInstagram(videoUrl, caption, accessToken, coverUrl = null) {
  // Step 1: Create container
  const containerId = await createReelContainer(videoUrl, caption, accessToken, coverUrl);

  // Step 2: Wait for video processing
  console.log('⏳ Waiting for video processing...');
  let status = 'IN_PROGRESS';
  let attempts = 0;
  const maxAttempts = 30;

  while (status === 'IN_PROGRESS' && attempts < maxAttempts) {
    await sleep(5000);
    const statusData = await checkContainerStatus(containerId, accessToken);
    status = statusData.status_code || statusData.status;
    console.log(`   Status: ${status} (attempt ${attempts + 1}/${maxAttempts})`);
    attempts++;

    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Video processing failed: ${status}`);
    }
  }

  if (status !== 'FINISHED') {
    throw new Error(`Video processing timeout. Last status: ${status}`);
  }

  // Step 3: Publish
  const mediaId = await publishContainer(containerId, accessToken);
  console.log(`✅ Reel published! Media ID: ${mediaId}`);

  return mediaId;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const reelPath = process.argv[2];

  if (!reelPath) {
    console.log(`
Usage: node scripts/publishReel.mjs <reel-path> [instagram-token] [github-token]

Environment variables:
  INSTAGRAM_TOKEN - Instagram Graph API access token
  GITHUB_TOKEN    - GitHub personal access token

Example:
  node scripts/publishReel.mjs veralabs-music/reels-with-music/reel_01_boudoir.mp4
`);
    process.exit(1);
  }

  if (!existsSync(reelPath)) {
    console.error(`❌ File not found: ${reelPath}`);
    process.exit(1);
  }

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN not set');
    process.exit(1);
  }

  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN not set');
    process.exit(1);
  }

  console.log(`
══════════════════════════════════════════════════════════════════════
   🎬 VERALABS REEL PUBLISHER
══════════════════════════════════════════════════════════════════════

   📹 Reel: ${basename(reelPath)}
`);

  try {
    // Determine aesthetic and get caption
    const aesthetic = getAesthetic(reelPath);
    const caption = randomFrom(CAPTIONS[aesthetic]) + '\n\n' + HASHTAGS[aesthetic];

    console.log(`   🎭 Aesthetic: ${aesthetic}`);
    console.log(`   📝 Caption: ${caption.substring(0, 50)}...`);
    console.log('');

    // Extract thumbnail (at 5 seconds to avoid black fade-in frame)
    const thumbnailPath = `/tmp/thumbnail_${Date.now()}.jpg`;
    extractThumbnail(reelPath, thumbnailPath, 5);

    // Upload video to GitHub for public URL
    const videoUrl = await uploadToGitHub(reelPath, GITHUB_TOKEN);

    // Upload thumbnail to GitHub
    let coverUrl = null;
    if (existsSync(thumbnailPath)) {
      coverUrl = await uploadToGitHub(thumbnailPath, GITHUB_TOKEN);
      unlinkSync(thumbnailPath); // Cleanup temp file
    }

    // Wait a moment for GitHub CDN
    console.log('⏳ Waiting for CDN propagation...');
    await sleep(3000);

    // Publish to Instagram with cover image
    const mediaId = await publishReelToInstagram(videoUrl, caption, INSTAGRAM_TOKEN, coverUrl);

    console.log(`
══════════════════════════════════════════════════════════════════════
   ✅ REEL PUBLISHED SUCCESSFULLY!
══════════════════════════════════════════════════════════════════════

   📱 Media ID: ${mediaId}
   🔗 Video URL: ${videoUrl}
   📝 Caption: ${caption.substring(0, 80)}...

══════════════════════════════════════════════════════════════════════
`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
