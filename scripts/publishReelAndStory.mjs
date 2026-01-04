#!/usr/bin/env node

/**
 * VERALABS REEL + STORY PUBLISHER
 * Publishes content as both Reels and Stories to Instagram
 */

import { readFileSync, existsSync, unlinkSync } from 'fs';
import { basename } from 'path';
import { execSync } from 'child_process';

// Config - Tokens from environment variables
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_BRANCH = 'main';
const GITHUB_PATH = 'photo/reels';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable required');
if (!INSTAGRAM_TOKEN) throw new Error('INSTAGRAM_TOKEN environment variable required');

// Creative captions
const CAPTIONS = {
  reel: [
    '✨ Golden hour dreams...\n\nWhere light meets shadow, beauty emerges.\n\n#veralabs #goldenhour #sensual #artistic #fashion #boudoir #elegance #luxurylifestyle #cinematicvideo #aesthetic #fashionphotography #intimatemoments',
    '🌅 Chasing the warmth...\n\nEvery frame tells a story of elegance.\n\n#veralabs #intimatephotography #artisticnude #sensual #elegance #feminine #boudoirphotography #luxuryboudoir #fashionphotography #goldenlight',
  ],
  story: '✨ New content dropping... Tap to see full reel 🎬',
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract thumbnail at good frame
function extractThumbnail(videoPath, outputPath, timeOffset = 8) {
  try {
    execSync(`${FFMPEG} -y -i "${videoPath}" -ss ${timeOffset} -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`);
    return existsSync(outputPath);
  } catch {
    return false;
  }
}

// Upload to GitHub
async function uploadToGitHub(filePath) {
  const filename = `${GITHUB_PATH}/${Date.now()}_${basename(filePath)}`;
  const content = readFileSync(filePath).toString('base64');

  console.log(`   📤 Uploading: ${basename(filePath)}`);

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${filename}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload: ${basename(filePath)}`,
        content: content,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message}`);
  }

  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
  console.log(`   ✅ Uploaded: ${rawUrl.substring(0, 70)}...`);
  return rawUrl;
}

// Create Instagram media container
async function createMediaContainer(type, videoUrl, caption, coverUrl = null) {
  const params = new URLSearchParams({
    media_type: type === 'story' ? 'STORIES' : 'REELS',
    video_url: videoUrl,
    caption: type === 'story' ? '' : caption,
    access_token: INSTAGRAM_TOKEN,
  });

  if (type === 'reel') {
    params.append('share_to_feed', 'true');
  }

  if (coverUrl && type === 'reel') {
    params.append('cover_url', coverUrl);
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

// Check container status
async function waitForProcessing(containerId) {
  let status = 'IN_PROGRESS';
  let attempts = 0;

  while (status === 'IN_PROGRESS' && attempts < 30) {
    await sleep(5000);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${containerId}?fields=status_code,status&access_token=${INSTAGRAM_TOKEN}`
    );
    const data = await response.json();
    status = data.status_code || data.status || 'IN_PROGRESS';

    process.stdout.write(`\r   ⏳ Processing: ${status} (${attempts + 1}/30)`);
    attempts++;

    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Processing failed: ${status}`);
    }

    if (status === 'FINISHED' || (typeof status === 'string' && status.toLowerCase().includes('finished'))) {
      break;
    }
  }
  console.log('');
  return status;
}

// Publish container
async function publishContainer(containerId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${containerId}&access_token=${INSTAGRAM_TOKEN}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

// Main publish function
async function publishContent(reelPath, storyPath, captionIndex = 0) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`   🎬 Publishing: ${basename(reelPath)}`);
  console.log(`${'═'.repeat(70)}\n`);

  const caption = CAPTIONS.reel[captionIndex % CAPTIONS.reel.length];

  // Extract thumbnail
  const thumbPath = `/tmp/thumb_${Date.now()}.jpg`;
  console.log('   🖼️  Extracting thumbnail...');
  extractThumbnail(reelPath, thumbPath, 10);

  // Upload all files to GitHub
  console.log('\n   📤 UPLOADING TO CDN');
  console.log('   ' + '─'.repeat(40));

  const reelUrl = await uploadToGitHub(reelPath);
  const storyUrl = await uploadToGitHub(storyPath);
  let coverUrl = null;
  if (existsSync(thumbPath)) {
    coverUrl = await uploadToGitHub(thumbPath);
    unlinkSync(thumbPath);
  }

  // Wait for CDN
  console.log('\n   ⏳ Waiting for CDN propagation...');
  await sleep(5000);

  // Publish REEL
  console.log('\n   🎬 PUBLISHING REEL');
  console.log('   ' + '─'.repeat(40));
  console.log(`   📝 Caption: ${caption.substring(0, 50)}...`);

  const reelContainerId = await createMediaContainer('reel', reelUrl, caption, coverUrl);
  console.log(`   📦 Container: ${reelContainerId}`);

  await waitForProcessing(reelContainerId);

  const reelMediaId = await publishContainer(reelContainerId);
  console.log(`   ✅ REEL PUBLISHED! Media ID: ${reelMediaId}`);

  // Wait before story
  await sleep(3000);

  // Publish STORY
  console.log('\n   📱 PUBLISHING STORY');
  console.log('   ' + '─'.repeat(40));

  const storyContainerId = await createMediaContainer('story', storyUrl, CAPTIONS.story);
  console.log(`   📦 Container: ${storyContainerId}`);

  await waitForProcessing(storyContainerId);

  const storyMediaId = await publishContainer(storyContainerId);
  console.log(`   ✅ STORY PUBLISHED! Media ID: ${storyMediaId}`);

  return { reelMediaId, storyMediaId };
}

// Main
async function main() {
  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN not set');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node publishReelAndStory.mjs <reel-path> <story-path> [caption-index]');
    process.exit(1);
  }

  const [reelPath, storyPath, captionIndex = '0'] = args;

  if (!existsSync(reelPath) || !existsSync(storyPath)) {
    console.error('❌ Files not found');
    process.exit(1);
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║           ✨ VERALABS REEL + STORY PUBLISHER ✨                      ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  try {
    const result = await publishContent(reelPath, storyPath, parseInt(captionIndex));

    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ✅ PUBLISHING COMPLETE!                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  🎬 Reel ID:  ${result.reelMediaId.padEnd(52)}║
║  📱 Story ID: ${result.storyMediaId.padEnd(52)}║
╚══════════════════════════════════════════════════════════════════════╝
`);
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
