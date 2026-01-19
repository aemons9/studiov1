#!/usr/bin/env node
/**
 * Add pre-generated music to reels and publish with captivating captions
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { execSync } from 'child_process';

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
execSync(`mkdir -p ${OUTPUT_DIR}`);

const REELS = [
  {
    id: 'reel_combo_1',
    videoPath: join(REELS_DIR, 'reel_combo_1_1767587476430.mp4'),
    musicPath: join(MUSIC_DIR, 'midnightMuse_track_1.wav'), // Dark, dramatic
    theme: 'Big Nudes - High Contrast B&W',
    caption: `Shadows speak louder than light 🖤

In the language of contrast, every curve becomes a story. High art meets raw emotion in this Helmut Newton-inspired visual symphony.

Where darkness defines beauty.

#BoudoirPhotography #FineArtNude #ArtisticNude #HelmutNewtonInspired #BlackAndWhitePhotography #HighContrast #NudeArtPhotography #ArtisticExpression #FashionPhotography #EditorialPhotography #BoldBeauty #ShadowPlay #ModernArt #ContemporaryArt #ArtCollector #MuseumQuality #FemininePower #ArtisticVision #VERALABS`
  },
  {
    id: 'reel_combo_2',
    videoPath: join(REELS_DIR, 'reel_combo_2_1767587594417.mp4'),
    musicPath: join(MUSIC_DIR, 'goldenHour_track_1.wav'), // Warm, luxurious
    theme: 'Champagne Luxury',
    caption: `Golden hour never looked so divine ✨

Champagne whispers and silk shadows. This is luxury redefined—where every frame drips with timeless elegance and sophisticated allure.

Indulge in the art of the exquisite.

#LuxuryBoudoir #BoudoirPhotography #FineArt #ChampagneAesthetic #GoldenHour #HighEndPhotography #SensualArt #ElegantPhotography #LuxuryLifestyle #FashionEditorial #OpulentStyle #ArtisticPhotography #IntimatePortrait #BoudoirInspiration #WomenEmpowerment #FeminineElegance #GlamourPhotography #VERALABS`
  },
  {
    id: 'reel_combo_3',
    videoPath: join(REELS_DIR, 'reel_combo_3_1767587679324.mp4'),
    musicPath: join(MUSIC_DIR, 'boudoir_track_1.wav'), // Intimate, sensual
    theme: 'Golden Sensual',
    caption: `Where light touches skin, magic happens 🌅

Bathed in golden whispers, each moment suspended in amber warmth. This is intimacy elevated to fine art—tender, powerful, unapologetically beautiful.

Feel the warmth.

#GoldenHourPhotography #BoudoirArt #SensualPhotography #IntimateArt #ArtisticBoudoir #FineArtPhotography #BoudoirInspiration #FeminineBeauty #GoldenLight #NaturalLight #EmotionalPhotography #VulnerableBeauty #ArtisticExpression #BoudoirSession #WomenEmpowerment #BodyPositive #IntimatePortrait #VERALABS`
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

/**
 * Add music to video using FFmpeg with audio normalization
 */
function addMusicToVideo(videoPath, audioPath, outputPath) {
  log(`🎬 Merging video and audio with normalization...`);

  // Normalize audio to -18dB and mix with video
  const cmd = `${FFMPEG} -i "${videoPath}" -i "${audioPath}" \
    -filter_complex "[1:a]volume=-18dB,apad[a]" \
    -map 0:v -map "[a]" \
    -c:v copy \
    -c:a aac \
    -b:a 192k \
    -shortest \
    -y "${outputPath}" 2>&1 | grep -E "(Duration|Output|error)" || true`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    log(`   ✅ Video with music created\n`);
    return outputPath;
  } catch (error) {
    throw new Error(`FFmpeg failed: ${error.message}`);
  }
}

/**
 * Publish reel to Instagram via proxy with manual container publish
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

  log(`🎬 Creating Instagram container...`);

  // Create container directly via Instagram API
  const containerUrl = `https://graph.facebook.com/v21.0/${INSTAGRAM_ACCOUNT_ID}/media`;
  const containerParams = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: INSTAGRAM_TOKEN
  });

  const containerRes = await fetch(`${containerUrl}?${containerParams.toString()}`, {
    method: 'POST'
  });

  if (!containerRes.ok) {
    const errorText = await containerRes.text();
    throw new Error(`Container creation failed: ${errorText}`);
  }

  const containerData = await containerRes.json();
  const containerId = containerData.id;
  log(`   ✅ Container created: ${containerId}\n`);

  // Poll for container to be ready
  log(`⏳ Waiting for Instagram to process video (2-6 minutes)...\n`);

  let attempts = 0;
  const maxAttempts = 90; // 3 minutes at 2 second intervals
  let containerReady = false;

  while (attempts < maxAttempts && !containerReady) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;

    const statusUrl = `https://graph.facebook.com/v21.0/${containerId}?fields=status,status_code&access_token=${INSTAGRAM_TOKEN}`;
    const statusRes = await fetch(statusUrl);

    if (statusRes.ok) {
      const statusData = await statusRes.json();
      if (statusData.status === 'FINISHED') {
        containerReady = true;
        log(`   ✅ Container ready after ${attempts} checks\n`);
      } else if (statusData.status === 'ERROR') {
        throw new Error(`Container processing error: ${JSON.stringify(statusData)}`);
      } else if (attempts % 15 === 0) {
        log(`   📊 Still processing... (${Math.round((attempts/maxAttempts)*100)}%)`);
      }
    }
  }

  if (!containerReady) {
    log(`   ⚠️  Timeout, but container may still be processing: ${containerId}`);
    log(`   You can manually publish it later if needed\n`);
    return { containerId, published: false };
  }

  // Publish container
  log(`📱 Publishing container...`);
  const publishUrl = `https://graph.facebook.com/v21.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`;
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: INSTAGRAM_TOKEN
  });

  const publishRes = await fetch(`${publishUrl}?${publishParams.toString()}`, {
    method: 'POST'
  });

  if (!publishRes.ok) {
    const errorText = await publishRes.text();
    throw new Error(`Publish failed: ${errorText}`);
  }

  const publishData = await publishRes.json();
  log(`   ✅ Published! Instagram ID: ${publishData.id}\n`);
  return { instagramId: publishData.id, containerId, published: true };
}

// Main execution
(async () => {
  console.log('🎵 VERALABS Reel Music Mixer & Publisher\n');
  console.log('='.repeat(60) + '\n');

  const results = [];

  for (const reel of REELS) {
    try {
      console.log(`\n${'='.repeat(60)}`);
      log(`🎨 Processing: ${reel.id}`);
      log(`   Theme: ${reel.theme}`);
      console.log('='.repeat(60) + '\n');

      // Check files exist
      if (!existsSync(reel.videoPath)) {
        log(`❌ Video not found: ${reel.videoPath}\n`);
        continue;
      }

      if (!existsSync(reel.musicPath)) {
        log(`❌ Music not found: ${reel.musicPath}\n`);
        continue;
      }

      // Step 1: Add music
      log(`🎵 Step 1: Adding music to video...`);
      const outputPath = join(OUTPUT_DIR, `${reel.id}_with_music.mp4`);

      if (!existsSync(outputPath)) {
        addMusicToVideo(reel.videoPath, reel.musicPath, outputPath);
      } else {
        log(`   ✅ Using existing: ${basename(outputPath)}\n`);
      }

      // Step 2: Publish
      log(`📱 Step 2: Publishing to Instagram...`);
      const result = await publishReel(outputPath, reel.caption);

      results.push({
        reel: reel.id,
        ...result
      });

      log(`✅ SUCCESS!\n`);

      // Wait between reels
      if (REELS.indexOf(reel) < REELS.length - 1) {
        log(`⏳ Waiting 60 seconds before next reel...\n`);
        await new Promise(r => setTimeout(r, 60000));
      }

    } catch (error) {
      log(`❌ Error: ${error.message}\n`);
      results.push({
        reel: reel.id,
        error: error.message
      });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(60) + '\n');
  console.log(JSON.stringify(results, null, 2));
  console.log('\n' + '='.repeat(60));
  console.log('✨ Process complete!');
  console.log('='.repeat(60) + '\n');
})();
