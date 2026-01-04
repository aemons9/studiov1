#!/usr/bin/env node

/**
 * VERALABS REEL SCHEDULER
 * Auto-posts reels at specified intervals
 */

import { readFileSync, existsSync, readdirSync, writeFileSync, unlinkSync } from 'fs';
import { basename, join } from 'path';
import { execSync } from 'child_process';
import { config } from 'dotenv';

// Load .env.local for local development
config({ path: '.env.local' });

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_BRANCH = 'main';
const GITHUB_PATH = 'photo/reels';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

if (!GITHUB_TOKEN || !INSTAGRAM_TOKEN) {
  console.error('Missing tokens. Ensure .env.local exists with GITHUB_TOKEN and INSTAGRAM_TOKEN');
  process.exit(1);
}
const INTERVAL_HOURS = parseInt(process.env.INTERVAL_HOURS || '2');
const REELS_DIRS = [
  '/home/ecolex/version1/veralabs-sensual-reels',
  '/home/ecolex/version1/veralabs-hourglass-reels',
  '/home/ecolex/version1/veralabs-newton-reels',
];
const STATE_FILE = '/home/ecolex/version1/scheduler-state.json';

// ═══════════════════════════════════════════════════════════════════════════
// CAPTIONS
// ═══════════════════════════════════════════════════════════════════════════

const CAPTIONS = [
  '✨ Embracing the golden light...\n\nWhere shadows meet elegance.\n\n#veralabs #sensual #artistic #boudoir #fashion #intimatephotography #goldenhour #elegance #feminine #luxurylifestyle #aesthetic',
  '🌙 Midnight whispers...\n\nMystery in every frame.\n\n#veralabs #midnightmuse #darkphotography #artistic #sensual #mysterious #boudoirphotography #cinematic #moody #fashionphotography',
  '🌹 Soft & dreamy...\n\nRose-tinted moments of beauty.\n\n#veralabs #roseglow #dreamy #softaesthetic #boudoir #intimatemoments #artisticnude #feminine #elegance #fashioneditorial',
  '💫 The art of allure...\n\nConfidence captured beautifully.\n\n#veralabs #allure #sensual #artisticphotography #boudoir #confidence #feminine #luxuryboudoir #fashionphotography #aesthetic',
  '🔥 Bold & beautiful...\n\nCelebrating the feminine form.\n\n#veralabs #bold #beautiful #artistic #boudoirphotography #sensual #womenempowerment #fashionphotography #intimacy #elegance',
  '✨ Ethereal moments...\n\nLight, shadow, and beauty.\n\n#veralabs #ethereal #artistic #boudoir #sensual #lightandshadow #feminine #luxurylifestyle #fashioneditorial #aesthetic',
  // Newton Series Captions
  '🖤 Shadows don\'t lie. They reveal what light cannot.\n\nWhere elegance meets edge.\n\n#VERALABS #HelmutNewton #HighFashion #ArtisticPhotography #ShadowPlay #Elegance #FashionEditorial #BoldBeauty',
  '💫 Power isn\'t given. It\'s taken.\n\nCommanding every frame.\n\n#VERALABS #PowerPose #FashionArt #EditorialPhotography #Confidence #BoldWomen #ArtisticVision #Luxury',
  '🏛️ The body is architecture. Light is the architect.\n\nForm follows function.\n\n#VERALABS #BodyAsArt #ArchitecturalBeauty #FineArt #FormAndFunction #ArtisticPhotography #Sculptural',
  '⚡ In the stillness, find the storm.\n\nQuiet intensity.\n\n#VERALABS #IntenseBeauty #QuietPower #FashionArt #DramaticLighting #VisualImpact #Captivating',
  '💎 Some moments are meant to be immortalized.\n\nThis is one of them.\n\n#VERALABS #IconicMoments #LuxuryFashion #ArtisticVision #Photography #Timeless #MasterpieceInMotion',
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function log(msg) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${msg}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  }
  return { publishedReels: [], lastPublish: null };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function extractThumbnail(videoPath, outputPath) {
  try {
    execSync(`${FFMPEG} -y -i "${videoPath}" -ss 10 -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`);
    return existsSync(outputPath);
  } catch {
    return false;
  }
}

function createStoryClip(videoPath, outputPath) {
  try {
    execSync(`${FFMPEG} -y -i "${videoPath}" -ss 15 -t 15 -c:v libx264 -preset fast -crf 23 -c:a aac "${outputPath}" 2>/dev/null`);
    return existsSync(outputPath);
  } catch {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GITHUB UPLOAD
// ═══════════════════════════════════════════════════════════════════════════

async function uploadToGitHub(filePath) {
  const filename = `${GITHUB_PATH}/${Date.now()}_${basename(filePath)}`;
  const content = readFileSync(filePath).toString('base64');

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

  if (!response.ok) throw new Error('GitHub upload failed');
  return `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// INSTAGRAM PUBLISHING
// ═══════════════════════════════════════════════════════════════════════════

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

async function publishReelAndStory(reelPath, caption) {
  log(`📤 Uploading: ${basename(reelPath)}`);

  // Create temp files
  const thumbPath = `/tmp/thumb_${Date.now()}.jpg`;
  const storyPath = `/tmp/story_${Date.now()}.mp4`;

  extractThumbnail(reelPath, thumbPath);
  createStoryClip(reelPath, storyPath);

  // Upload to GitHub
  const reelUrl = await uploadToGitHub(reelPath);
  let coverUrl = null;
  let storyUrl = null;

  if (existsSync(thumbPath)) {
    coverUrl = await uploadToGitHub(thumbPath);
    unlinkSync(thumbPath);
  }
  if (existsSync(storyPath)) {
    storyUrl = await uploadToGitHub(storyPath);
    unlinkSync(storyPath);
  }

  await sleep(5000); // CDN propagation

  // Publish Reel
  log('🎬 Publishing reel...');
  const reelContainerId = await createMediaContainer('reel', reelUrl, caption, coverUrl);
  await waitForProcessing(reelContainerId);
  const reelMediaId = await publishContainer(reelContainerId);
  log(`✅ Reel published: ${reelMediaId}`);

  // Publish Story
  if (storyUrl) {
    await sleep(3000);
    log('📱 Publishing story...');
    const storyContainerId = await createMediaContainer('story', storyUrl, '');
    await waitForProcessing(storyContainerId);
    const storyMediaId = await publishContainer(storyContainerId);
    log(`✅ Story published: ${storyMediaId}`);
  }

  return reelMediaId;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SCHEDULER
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  log(`
╔══════════════════════════════════════════════════════════════════════╗
║           🗓️  VERALABS REEL SCHEDULER                                ║
║           Posting every ${INTERVAL_HOURS} hours                                      ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  if (!INSTAGRAM_TOKEN) {
    log('❌ INSTAGRAM_TOKEN not set');
    process.exit(1);
  }

  // Get all reels from all directories
  // EXCLUDE sensual_06_roseGlow - contains unsafe content
  const allReels = [];
  for (const dir of REELS_DIRS) {
    if (!existsSync(dir)) continue;
    const reels = readdirSync(dir)
      .filter(f => f.endsWith('.mp4'))
      .filter(f => !f.includes('sensual_06_roseGlow')) // Exclude unsafe reel
      .map(f => join(dir, f));
    allReels.push(...reels);
  }
  allReels.sort();

  log(`📹 Found ${allReels.length} new reels to schedule`);

  // Load state
  const state = loadState();
  const unpublished = allReels.filter(r => !state.publishedReels.includes(basename(r)));

  log(`📊 Already published: ${state.publishedReels.length}`);
  log(`📊 Remaining to publish: ${unpublished.length}`);

  if (unpublished.length === 0) {
    log('✅ All reels already published!');
    return;
  }

  // Schedule publishing
  for (let i = 0; i < unpublished.length; i++) {
    const reelPath = unpublished[i];
    const caption = CAPTIONS[i % CAPTIONS.length];

    if (i > 0) {
      const waitMs = INTERVAL_HOURS * 60 * 60 * 1000;
      log(`⏳ Waiting ${INTERVAL_HOURS} hours until next post...`);
      log(`   Next post at: ${new Date(Date.now() + waitMs).toLocaleString()}`);
      await sleep(waitMs);
    }

    log(`\n${'═'.repeat(60)}`);
    log(`📸 Publishing reel ${i + 1}/${unpublished.length}: ${basename(reelPath)}`);
    log(`${'═'.repeat(60)}`);

    try {
      await publishReelAndStory(reelPath, caption);

      // Update state
      state.publishedReels.push(basename(reelPath));
      state.lastPublish = new Date().toISOString();
      saveState(state);

      log(`✅ Successfully published ${i + 1}/${unpublished.length}`);
    } catch (error) {
      log(`❌ Failed to publish: ${error.message}`);
      // Continue with next reel
    }
  }

  log(`\n${'═'.repeat(60)}`);
  log('🎉 SCHEDULING COMPLETE!');
  log(`${'═'.repeat(60)}`);
}

main().catch(err => {
  log(`❌ Scheduler error: ${err.message}`);
  process.exit(1);
});
