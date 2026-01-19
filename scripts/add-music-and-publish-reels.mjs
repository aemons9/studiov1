#!/usr/bin/env node
/**
 * Generate music with Lyria2, add to reels, and publish to Instagram
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { generateMusic, MUSIC_THEMES } from './lyria-music-service.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '..', '.env.local') });

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const PROXY_URL = 'http://localhost:3001';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

const REELS_DIR = '/home/ecolex/version1/generated-reels';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/with-music';

// Ensure output directory exists
import { execSync } from 'child_process';
execSync(`mkdir -p ${OUTPUT_DIR}`);

const REELS = [
  {
    id: 'reel_combo_1',
    videoPath: join(REELS_DIR, 'reel_combo_1_1767587476430.mp4'),
    theme: 'bigNudes',
    duration: 56
  },
  {
    id: 'reel_combo_2',
    videoPath: join(REELS_DIR, 'reel_combo_2_1767587594417.mp4'),
    theme: 'champagneLuxury',
    duration: 56
  },
  {
    id: 'reel_combo_3',
    videoPath: join(REELS_DIR, 'reel_combo_3_1767587679324.mp4'),
    theme: 'goldenSensual',
    duration: 56
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

/**
 * Add music to video using FFmpeg
 */
function addMusicToVideo(videoPath, audioPath, outputPath) {
  log(`🎬 Merging video and audio...`);

  const cmd = `${FFMPEG} -i "${videoPath}" -i "${audioPath}" \
    -c:v copy \
    -c:a aac \
    -b:a 192k \
    -shortest \
    -y "${outputPath}" 2>&1`;

  try {
    execSync(cmd);
    log(`   ✅ Video with music: ${basename(outputPath)}\n`);
    return outputPath;
  } catch (error) {
    throw new Error(`FFmpeg failed: ${error.message}`);
  }
}

/**
 * Publish reel to Instagram
 */
async function publishReel(videoPath, caption) {
  log(`📤 Uploading to GitHub CDN...`);

  // Upload to GitHub
  const videoBuffer = readFileSync(videoPath);
  const videoBase64 = videoBuffer.toString('base64');
  const timestamp = Date.now();
  const filename = `veralabs_${basename(videoPath, '.mp4')}_${timestamp}.mp4`;

  const uploadRes = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
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

  if (!uploadRes.ok) {
    throw new Error(`GitHub upload failed: ${await uploadRes.text()}`);
  }

  const uploadData = await uploadRes.json();
  const videoUrl = uploadData.publicUrl;
  log(`   ✅ Uploaded: ${videoUrl}\n`);

  log(`🎬 Publishing to Instagram...`);
  log(`   ⏳ This may take 2-6 minutes...\n`);

  const publishRes = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
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

  if (!publishRes.ok) {
    throw new Error(`Instagram publish failed: ${await publishRes.text()}`);
  }

  const publishData = await publishRes.json();
  log(`   ✅ Published! Instagram ID: ${publishData.id}\n`);
  return publishData.id;
}

// Main execution
(async () => {
  console.log('🎵 VERALABS Reel Music Generator & Publisher\n');
  console.log('Using Lyria2 AI Music Generation via Vertex AI\n');
  console.log('='.repeat(60) + '\n');

  for (const reel of REELS) {
    try {
      console.log(`\n${'='.repeat(60)}`);
      log(`🎨 Processing: ${reel.id}`);
      log(`   Theme: ${MUSIC_THEMES[reel.theme].name}`);
      console.log('='.repeat(60) + '\n');

      // Check if video file exists
      if (!existsSync(reel.videoPath)) {
        log(`❌ Video file not found: ${reel.videoPath}`);
        continue;
      }

      // Step 1: Generate music with Lyria2
      const musicPath = join(MUSIC_DIR, `${reel.id}_lyria2.wav`);

      if (!existsSync(musicPath)) {
        log(`🎵 Step 1: Generating music with Lyria2...`);
        await generateMusic(
          MUSIC_THEMES[reel.theme].prompt,
          reel.duration,
          musicPath
        );
      } else {
        log(`🎵 Step 1: Using existing music: ${basename(musicPath)}\n`);
      }

      // Step 2: Add music to video
      log(`🎬 Step 2: Adding music to video...`);
      const outputPath = join(OUTPUT_DIR, `${reel.id}_with_music.mp4`);
      addMusicToVideo(reel.videoPath, musicPath, outputPath);

      // Step 3: Publish to Instagram
      log(`📱 Step 3: Publishing to Instagram...`);
      const caption = MUSIC_THEMES[reel.theme].caption;

      // Add a small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));

      const instagramId = await publishReel(outputPath, caption);

      log(`✅ SUCCESS! Reel published: ${instagramId}\n`);
      log(`🎉 Check your Instagram account!\n`);

      // Wait between reels to avoid rate limiting
      if (REELS.indexOf(reel) < REELS.length - 1) {
        log(`⏳ Waiting 30 seconds before next reel...\n`);
        await new Promise(r => setTimeout(r, 30000));
      }

    } catch (error) {
      log(`❌ Error processing ${reel.id}: ${error.message}\n`);
      // Continue with next reel
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ All reels processed!');
  console.log('='.repeat(60) + '\n');
})();
