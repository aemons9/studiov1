#!/usr/bin/env node
/**
 * Publish ALL remaining scheduled reels immediately
 * Bypasses the scheduler's 2-hour wait
 */

import { readFileSync, existsSync, readdirSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { config } from 'dotenv';
import { execSync } from 'child_process';

config({ path: '.env.local' });

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const STATE_FILE = '/home/ecolex/version1/scheduler-state.json';

const REELS_DIRS = [
  '/home/ecolex/version1/veralabs-sensual-reels',
  '/home/ecolex/version1/veralabs-hourglass-reels',
  '/home/ecolex/version1/veralabs-newton-reels',
];

const CAPTIONS = [
  '✨ Embracing the golden light...\\n\\nWhere shadows meet elegance.\\n\\n#veralabs #sensual #artistic #boudoir #fashion #intimatephotography #goldenhour #elegance #feminine #luxurylifestyle #aesthetic',
  '🌙 Midnight whispers...\\n\\nMystery in every frame.\\n\\n#veralabs #midnightmuse #darkphotography #artistic #sensual #mysterious #boudoirphotography #cinematic #moody #fashionphotography',
  '🌹 Soft & dreamy...\\n\\nRose-tinted moments of beauty.\\n\\n#veralabs #roseglow #dreamy #softaesthetic #boudoir #intimatemoments #artisticnude #feminine #elegance #fashioneditorial',
  '💫 The art of allure...\\n\\nConfidence captured beautifully.\\n\\n#veralabs #allure #sensual #artisticphotography #boudoir #confidence #feminine #luxuryboudoir #fashionphotography #aesthetic',
  '🔥 Bold & beautiful...\\n\\nCelebrating the feminine form.\\n\\n#veralabs #bold #beautiful #artistic #boudoirphotography #sensual #womenempowerment #fashionphotography #intimacy #elegance',
  '✨ Ethereal moments...\\n\\nLight, shadow, and beauty.\\n\\n#veralabs #ethereal #artistic #boudoir #sensual #lightandshadow #feminine #luxurylifestyle #fashioneditorial #aesthetic',
  '🖤 Shadows don\'t lie. They reveal what light cannot.\\n\\nWhere elegance meets edge.\\n\\n#VERALABS #HelmutNewton #HighFashion #ArtisticPhotography #ShadowPlay #Elegance #FashionEditorial #BoldBeauty',
  '💫 Power isn\'t given. It\'s taken.\\n\\nCommanding every frame.\\n\\n#VERALABS #PowerPose #FashionArt #EditorialPhotography #Confidence #BoldWomen #ArtisticVision #Luxury',
];

function log(msg) {
  console.log(`[${new Date().toLocaleString()}] ${msg}`);
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

async function publishReelViaProxy(videoPath, caption, coverImagePath = null) {
  const filename = basename(videoPath);

  log(`📤 Uploading to GitHub: ${filename}`);
  const videoBuffer = readFileSync(videoPath);
  const videoBase64 = videoBuffer.toString('base64');

  // Upload to GitHub
  const uploadRes = await fetch('http://localhost:3001/api/instagram/upload-to-github', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: videoBase64,
      filename,
      owner: GITHUB_USER,
      repo: GITHUB_REPO,
      pathPrefix: 'photo/reels'
    })
  });

  if (!uploadRes.ok) throw new Error(`GitHub upload failed: ${await uploadRes.text()}`);

  const uploadData = await uploadRes.json();
  const videoUrl = uploadData.publicUrl;

  log(`🎬 Publishing to Instagram: ${videoUrl}`);

  // Publish reel
  const publishRes = await fetch('http://localhost:3001/api/instagram/publish-reel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      videoUrl,
      caption,
      shareToFeed: true,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID
    })
  });

  if (!publishRes.ok) throw new Error(`Publish failed: ${await publishRes.text()}`);

  const publishData = await publishRes.json();
  log(`✅ Reel published: ${publishData.id}`);

  return publishData.id;
}

// Main execution
(async () => {
  log('🚀 Publishing ALL remaining scheduled reels immediately\\n');

  const state = loadState();
  const allReels = [];

  // Collect all reels
  for (const dir of REELS_DIRS) {
    if (existsSync(dir)) {
      const files = readdirSync(dir).filter(f => f.endsWith('.mp4'));
      files.forEach(f => allReels.push(join(dir, f)));
    }
  }

  // Filter out already published
  const remaining = allReels.filter(reel => {
    const filename = basename(reel);
    return !state.publishedReels.includes(filename);
  });

  log(`📊 Total reels: ${allReels.length}`);
  log(`✅ Already published: ${state.publishedReels.length}`);
  log(`🔄 Remaining to publish: ${remaining.length}\\n`);

  if (remaining.length === 0) {
    log('✨ All reels already published!');
    process.exit(0);
  }

  let published = 0;
  for (const reel of remaining) {
    const filename = basename(reel);

    try {
      log(`\\n${'='.repeat(60)}`);
      log(`📸 Publishing ${published + 1}/${remaining.length}: ${filename}`);
      log('='.repeat(60));

      const caption = CAPTIONS[published % CAPTIONS.length];
      await publishReelViaProxy(reel, caption);

      state.publishedReels.push(filename);
      state.lastPublish = new Date().toISOString();
      saveState(state);

      published++;
      log(`✅ Successfully published ${published}/${remaining.length}`);

      // Brief delay between publishes
      if (published < remaining.length) {
        log('⏳ Waiting 30 seconds before next publish...');
        await new Promise(r => setTimeout(r, 30000));
      }

    } catch (error) {
      log(`❌ Error publishing ${filename}: ${error.message}`);
    }
  }

  log(`\\n\\n✨ Publishing complete! Published ${published}/${remaining.length} reels`);
})();
