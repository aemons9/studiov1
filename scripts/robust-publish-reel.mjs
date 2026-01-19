#!/usr/bin/env node
/**
 * ROBUST REEL PUBLISHER
 *
 * Handles rate limits gracefully with exponential backoff.
 * Can resume publishing pending containers.
 * Properly sets cover images for Instagram grid.
 *
 * Usage:
 *   node scripts/robust-publish-reel.mjs <videoPath> <thumbnailPath> <caption> [reelId]
 *   node scripts/robust-publish-reel.mjs --resume <containerId>
 */

import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load .env.local
config({ path: path.join(process.cwd(), '.env.local') });

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN || process.env.VITE_INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';

// Use v18.0 which works reliably (same as original working scripts)
const GRAPH_API_BASE = 'https://graph.facebook.com/v18.0';

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Make API call with rate limit retry
 */
async function apiCall(url, options = {}, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const response = await fetch(url, options);
    const data = await response.json();

    // Check for rate limit
    if (data.error?.code === 4) {
      const waitTime = 60000 * (attempt + 1); // 1 min, 2 min, 3 min
      log(`⚠️  Rate limited. Waiting ${waitTime/1000}s before retry...`);
      await sleep(waitTime);
      continue;
    }

    return { response, data };
  }

  throw new Error('Rate limit exceeded after all retries');
}

/**
 * Upload file to GitHub for public URL
 */
async function uploadToGitHub(filePath, prefix = 'reel') {
  const filename = `${prefix}_${Date.now()}${path.extname(filePath)}`;
  const content = fs.readFileSync(filePath).toString('base64');
  const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/photo/reels/${filename}`;

  log(`📤 Uploading to GitHub: ${filename}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
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

  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/photo/reels/${filename}`;
  log(`   ✅ Uploaded: ${rawUrl}`);
  return rawUrl;
}

/**
 * Create Instagram Reel container
 */
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
    log(`   🖼️  Cover image set`);
  }

  const { data } = await apiCall(
    `${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    }
  );

  if (data.error) {
    throw new Error(`Container creation failed: ${data.error.message}`);
  }

  log(`   ✅ Container created: ${data.id}`);
  return data.id;
}

/**
 * Check container status with exponential backoff
 */
async function waitForProcessing(containerId) {
  log('⏳ Waiting for video processing...');

  let attempts = 0;
  const maxAttempts = 40;
  let delay = 5000; // Start with 5 seconds
  const maxDelay = 20000;

  while (attempts < maxAttempts) {
    await sleep(delay);

    const { data } = await apiCall(
      `${GRAPH_API_BASE}/${containerId}?fields=status_code,status&access_token=${INSTAGRAM_TOKEN}`
    );

    const status = data.status_code || data.status;
    log(`   Status: ${status} (attempt ${attempts + 1}/${maxAttempts})`);

    if (status === 'FINISHED') {
      log('   ✅ Processing complete!');
      return true;
    }

    if (status === 'ERROR') {
      throw new Error(`Video processing failed: ${data.status_code}`);
    }

    if (status === 'EXPIRED') {
      throw new Error('Container expired before publishing');
    }

    attempts++;
    delay = Math.min(delay * 1.2, maxDelay); // Exponential backoff
  }

  throw new Error('Processing timeout');
}

/**
 * Publish container to Instagram
 */
async function publishContainer(containerId) {
  log('🚀 Publishing to Instagram...');

  const { data } = await apiCall(
    `${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        creation_id: containerId,
        access_token: INSTAGRAM_TOKEN,
      }).toString(),
    }
  );

  if (data.error) {
    throw new Error(`Publish failed: ${data.error.message}`);
  }

  log(`   ✅ Published! Media ID: ${data.id}`);
  return data.id;
}

/**
 * Resume publishing a pending container
 */
async function resumePublish(containerId) {
  log(`\n📱 Resuming publish for container: ${containerId}\n`);

  // Check status first
  const { data } = await apiCall(
    `${GRAPH_API_BASE}/${containerId}?fields=status_code,status&access_token=${INSTAGRAM_TOKEN}`
  );

  const status = data.status_code || data.status;
  log(`   Current status: ${status}`);

  if (status === 'FINISHED') {
    // Ready to publish
    return await publishContainer(containerId);
  } else if (status === 'IN_PROGRESS') {
    // Wait for processing
    await waitForProcessing(containerId);
    return await publishContainer(containerId);
  } else if (status === 'ERROR' || status === 'EXPIRED') {
    throw new Error(`Container is ${status}, cannot resume`);
  } else {
    throw new Error(`Unknown status: ${status}`);
  }
}

/**
 * Full publish flow
 */
async function fullPublish(videoPath, thumbnailPath, caption, reelId) {
  log(`\n${'═'.repeat(60)}`);
  log(`🎬 VERALABS ROBUST REEL PUBLISHER`);
  log(`${'═'.repeat(60)}\n`);
  log(`📹 Video: ${path.basename(videoPath)}`);
  log(`🖼️  Thumbnail: ${path.basename(thumbnailPath)}`);
  log(`📝 Caption: ${caption.substring(0, 50)}...\n`);

  // Step 1: Upload video to GitHub
  const videoUrl = await uploadToGitHub(videoPath, `veralabs_${reelId}`);

  // Step 2: Upload thumbnail to GitHub
  const coverUrl = await uploadToGitHub(thumbnailPath, `veralabs_${reelId}_thumb`);

  // Wait for CDN propagation
  log('\n⏳ Waiting for CDN propagation (3s)...\n');
  await sleep(3000);

  // Step 3: Create container
  const containerId = await createContainer(videoUrl, caption, coverUrl);

  // Save container ID in case we need to resume
  const stateFile = `/tmp/veralabs_publish_${reelId}.json`;
  fs.writeFileSync(stateFile, JSON.stringify({
    containerId,
    videoUrl,
    coverUrl,
    caption,
    createdAt: new Date().toISOString()
  }, null, 2));
  log(`   💾 State saved to: ${stateFile}`);

  // Step 4: Wait for processing
  await waitForProcessing(containerId);

  // Step 5: Publish
  const mediaId = await publishContainer(containerId);

  // Cleanup state file
  fs.unlinkSync(stateFile);

  log(`\n${'═'.repeat(60)}`);
  log(`✅ REEL PUBLISHED SUCCESSFULLY!`);
  log(`${'═'.repeat(60)}`);
  log(`   📱 Media ID: ${mediaId}`);
  log(`   🔗 Video URL: ${videoUrl}`);
  log(`${'═'.repeat(60)}\n`);

  return mediaId;
}

// Main
async function main() {
  if (!INSTAGRAM_TOKEN) {
    console.error('❌ Missing INSTAGRAM_TOKEN in .env.local');
    process.exit(1);
  }

  if (!GITHUB_TOKEN) {
    console.error('❌ Missing GITHUB_TOKEN in .env.local');
    process.exit(1);
  }

  const args = process.argv.slice(2);

  // Resume mode
  if (args[0] === '--resume' && args[1]) {
    try {
      const mediaId = await resumePublish(args[1]);
      console.log(`\n✅ Successfully published! Media ID: ${mediaId}\n`);
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}\n`);
      process.exit(1);
    }
    return;
  }

  // Full publish mode
  if (args.length < 3) {
    console.log(`
Usage:
  node scripts/robust-publish-reel.mjs <videoPath> <thumbnailPath> <caption> [reelId]
  node scripts/robust-publish-reel.mjs --resume <containerId>

Example:
  node scripts/robust-publish-reel.mjs \\
    "/home/ecolex/version1/generated-reels/compressed/reel-1767533225370_final.mp4" \\
    "/home/ecolex/version1/generated-reels/compressed/thumbnails/thumb_reel1.jpg" \\
    "Beautiful caption here #hashtags" \\
    "reel1"
`);
    process.exit(1);
  }

  const [videoPath, thumbnailPath, caption, reelId = 'reel'] = args;

  if (!fs.existsSync(videoPath)) {
    console.error(`❌ Video file not found: ${videoPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(thumbnailPath)) {
    console.error(`❌ Thumbnail file not found: ${thumbnailPath}`);
    process.exit(1);
  }

  try {
    await fullPublish(videoPath, thumbnailPath, caption, reelId);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
