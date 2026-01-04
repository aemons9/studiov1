#!/usr/bin/env node

/**
 * PUBLISH NEWTON REEL 1 NOW
 * With custom thumbnail and caption
 */

import { readFileSync, existsSync, unlinkSync } from 'fs';
import { basename, join } from 'path';
import { execSync } from 'child_process';

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_BRANCH = 'main';
const GITHUB_PATH = 'photo/reels';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable required');
if (!INSTAGRAM_TOKEN) throw new Error('INSTAGRAM_TOKEN environment variable required');

const REEL_PATH = '/home/ecolex/version1/veralabs-newton-reels/newton_01_bigNudes_1767515674466.mp4';
const THUMB_PATH = '/home/ecolex/version1/veralabs-newton-thumbnails/thumb_01_bigNudes_1767515674466.jpg';
const STORY_PATH = '/home/ecolex/version1/veralabs-newton-stories/story_01_bigNudes_1767515674466.mp4';

const CAPTION = `Power isn't given.
It's taken.

💫 Commanding every frame.

#VERALABS #PowerPose #FashionArt #EditorialPhotography #Confidence #BoldWomen #ArtisticVision #Luxury #HelmutNewton #HighFashion #ShadowPlay`;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function uploadToGitHub(filePath) {
  const filename = `${GITHUB_PATH}/${Date.now()}_${basename(filePath)}`;
  const content = readFileSync(filePath).toString('base64');

  log(`   Uploading to GitHub: ${basename(filePath)}`);

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
    const err = await response.json().catch(() => ({}));
    throw new Error(`GitHub upload failed: ${err.message || response.status}`);
  }

  return `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
}

async function createMediaContainer(type, videoUrl, caption, coverUrl = null) {
  const params = new URLSearchParams({
    media_type: type === 'story' ? 'STORIES' : 'REELS',
    video_url: videoUrl,
    caption: type === 'story' ? '' : caption,
    access_token: INSTAGRAM_TOKEN,
  });

  if (type === 'reel') params.append('share_to_feed', 'true');
  if (coverUrl && type === 'reel') params.append('cover_url', coverUrl);

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media?${params}`,
    { method: 'POST' }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

async function waitForProcessing(containerId) {
  for (let i = 0; i < 30; i++) {
    await sleep(5000);
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${containerId}?fields=status_code&access_token=${INSTAGRAM_TOKEN}`
    );
    const data = await response.json();
    const status = data.status_code || 'IN_PROGRESS';

    log(`   Processing status: ${status}`);

    if (status === 'FINISHED' || status.toLowerCase().includes('finished')) return true;
    if (status === 'ERROR' || status === 'EXPIRED') throw new Error(`Processing failed: ${status}`);
  }
  throw new Error('Processing timeout');
}

async function publishContainer(containerId) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${containerId}&access_token=${INSTAGRAM_TOKEN}`,
    { method: 'POST' }
  );
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.id;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║       🎬 PUBLISHING NEWTON REEL #1: BIG NUDES                        ║
║       With Custom Thumbnail & Caption                                ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  if (!INSTAGRAM_TOKEN) {
    log('❌ INSTAGRAM_TOKEN not set');
    process.exit(1);
  }

  // Upload assets to GitHub
  log('📤 Uploading assets to GitHub CDN...');
  const reelUrl = await uploadToGitHub(REEL_PATH);
  log(`   ✅ Reel uploaded`);

  let coverUrl = null;
  if (existsSync(THUMB_PATH)) {
    coverUrl = await uploadToGitHub(THUMB_PATH);
    log(`   ✅ Thumbnail uploaded`);
  }

  let storyUrl = null;
  if (existsSync(STORY_PATH)) {
    storyUrl = await uploadToGitHub(STORY_PATH);
    log(`   ✅ Story clip uploaded`);
  }

  // Wait for CDN propagation
  log('⏳ Waiting for CDN propagation...');
  await sleep(5000);

  // Publish Reel
  log('🎬 Publishing reel to Instagram...');
  const reelContainerId = await createMediaContainer('reel', reelUrl, CAPTION, coverUrl);
  log(`   Container created: ${reelContainerId}`);

  await waitForProcessing(reelContainerId);
  const reelMediaId = await publishContainer(reelContainerId);
  log(`✅ REEL PUBLISHED: ${reelMediaId}`);

  // Publish Story
  if (storyUrl) {
    await sleep(3000);
    log('📱 Publishing story...');
    const storyContainerId = await createMediaContainer('story', storyUrl, '');
    await waitForProcessing(storyContainerId);
    const storyMediaId = await publishContainer(storyContainerId);
    log(`✅ STORY PUBLISHED: ${storyMediaId}`);
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ✅ PUBLICATION COMPLETE                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  Reel ID: ${String(reelMediaId).padEnd(56)}║
║  Theme: Big Nudes (Helmut Newton B&W High Contrast)                  ║
║  Caption: Power isn't given. It's taken.                             ║
╚══════════════════════════════════════════════════════════════════════╝
`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
