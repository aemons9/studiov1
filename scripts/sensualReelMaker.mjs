#!/usr/bin/env node

/**
 * VERALABS SENSUAL REEL MAKER
 * Creates artistic, sensual reels from videos and images
 * With professional effects, transitions, and branding
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join, basename, extname } from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/veralabs-sensual-reels';
const TEMP_DIR = '/tmp/sensual-reel-temp';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Sources
const VIDEO_SOURCES = [
  '/home/ecolex/version1/tempimages/asset1.1',
  '/home/ecolex/version1/tempimages/asset2',
];

const IMAGE_SOURCES = [
  '/home/ecolex/version1/tempimages/asset1.1',
  '/home/ecolex/version1/tempimages/asset2',
  '/home/ecolex/version1/veralabs-stories',
  '/home/ecolex/version1/veralabs-posts',
];

// Reel specs
const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;
const TARGET_DURATION = 60; // 60 seconds

// ═══════════════════════════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════════════════════════

const THEMES = {
  goldenIntimate: {
    name: 'Golden Intimate',
    colorGrade: 'eq=contrast=1.1:brightness=0.02:saturation=1.2,colorbalance=rs=0.1:gs=0.05:bs=-0.05',
    vignette: 'vignette=PI/4',
    textColor: '#FFD700',
    mood: 'Warm & Sensual',
  },
  midnightSilk: {
    name: 'Midnight Silk',
    colorGrade: 'eq=contrast=1.15:brightness=-0.05:saturation=0.95,colorbalance=rs=-0.05:gs=0:bs=0.1',
    vignette: 'vignette=PI/3.5',
    textColor: '#C9B8FF',
    mood: 'Mysterious & Alluring',
  },
  roseGlow: {
    name: 'Rose Glow',
    colorGrade: 'eq=contrast=1.05:brightness=0.03:saturation=1.1,colorbalance=rs=0.08:gs=0.02:bs=0.04',
    vignette: 'vignette=PI/4.5',
    textColor: '#E8B4B8',
    mood: 'Soft & Dreamy',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function exec(cmd, silent = true) {
  try {
    execSync(cmd, { stdio: silent ? 'pipe' : 'inherit', maxBuffer: 100 * 1024 * 1024 });
    return true;
  } catch (e) {
    return false;
  }
}

function getVideos(folders) {
  const videos = [];
  for (const folder of folders) {
    if (!existsSync(folder)) continue;
    const files = readdirSync(folder)
      .filter(f => /\.(mp4|mov|webm)$/i.test(f))
      .map(f => join(folder, f));
    videos.push(...files);
  }
  return videos;
}

function getImages(folders) {
  const images = [];
  for (const folder of folders) {
    if (!existsSync(folder)) continue;
    const files = readdirSync(folder)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .filter(f => !f.startsWith('.'))
      .map(f => join(folder, f));
    images.push(...files);
  }
  return images;
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getVideoDuration(path) {
  try {
    const result = execSync(
      `${FFMPEG} -i "${path}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`,
      { stdio: 'pipe' }
    ).toString().trim();
    const parts = result.split(':');
    if (parts.length === 3) {
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    }
  } catch {}
  return 5;
}

function getMusicTrack(theme) {
  const tracks = {
    goldenIntimate: 'goldenHour_track_1.wav',
    midnightSilk: 'midnightMuse_track_1.wav',
    roseGlow: 'boudoir_track_1.wav',
  };
  const trackName = tracks[theme] || 'boudoir_track_1.wav';
  const trackPath = join(MUSIC_DIR, trackName);
  return existsSync(trackPath) ? trackPath : null;
}

// ═══════════════════════════════════════════════════════════════════════════
// CLIP PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

function processVideoClip(inputPath, outputPath, duration, theme, clipIndex, totalClips) {
  const t = THEMES[theme];
  const clipDuration = Math.min(duration, 8); // Max 8 seconds per clip

  // Calculate fades
  const fadeIn = clipIndex === 0 ? 1.5 : 0.5;
  const fadeOut = clipIndex === totalClips - 1 ? 2 : 0.5;

  const filters = [
    // Scale to reel format
    `scale=${REEL_WIDTH}:${REEL_HEIGHT}:force_original_aspect_ratio=increase`,
    `crop=${REEL_WIDTH}:${REEL_HEIGHT}`,
    // Color grading
    t.colorGrade,
    // Vignette
    t.vignette,
    // Fades
    `fade=t=in:st=0:d=${fadeIn}`,
    `fade=t=out:st=${clipDuration - fadeOut}:d=${fadeOut}`,
  ].join(',');

  return exec(`${FFMPEG} -y -i "${inputPath}" -t ${clipDuration} -vf "${filters}" -c:v libx264 -preset fast -crf 23 -an "${outputPath}"`);
}

function processImageClip(inputPath, outputPath, duration, theme, clipIndex, totalClips) {
  const t = THEMES[theme];

  // Ken Burns effect parameters
  const zoomStart = 1.0 + Math.random() * 0.1;
  const zoomEnd = zoomStart + (Math.random() > 0.5 ? 0.15 : -0.1);
  const panX = (Math.random() - 0.5) * 0.1;
  const panY = (Math.random() - 0.5) * 0.1;

  const fps = 30;
  const frames = duration * fps;

  // Calculate fades
  const fadeIn = clipIndex === 0 ? 1.5 : 0.5;
  const fadeOut = clipIndex === totalClips - 1 ? 2 : 0.5;

  // Zoompan for Ken Burns effect
  const zoompan = `zoompan=z='${zoomStart}+(${zoomEnd}-${zoomStart})*on/${frames}':x='iw/2-(iw/zoom/2)+${panX}*on':y='ih/2-(ih/zoom/2)+${panY}*on':d=${frames}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=${fps}`;

  const filters = [
    zoompan,
    // Color grading
    t.colorGrade,
    // Vignette
    t.vignette,
    // Fades
    `fade=t=in:st=0:d=${fadeIn}`,
    `fade=t=out:st=${duration - fadeOut}:d=${fadeOut}`,
  ].join(',');

  return exec(`${FFMPEG} -y -loop 1 -i "${inputPath}" -vf "${filters}" -t ${duration} -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p "${outputPath}"`);
}

// ═══════════════════════════════════════════════════════════════════════════
// REEL ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════════

function createReel(clips, theme, outputPath, reelNum) {
  const t = THEMES[theme];
  console.log(`\n   🎬 Creating ${t.name} reel...`);

  ensureDir(TEMP_DIR);
  const processedClips = [];
  let totalDuration = 0;
  const targetDuration = TARGET_DURATION;

  // Process clips until we reach target duration
  for (let i = 0; i < clips.length && totalDuration < targetDuration; i++) {
    const clip = clips[i];
    const isVideo = /\.(mp4|mov|webm)$/i.test(clip);
    const clipPath = `${TEMP_DIR}/clip_${reelNum}_${i}.mp4`;

    let clipDuration;
    if (isVideo) {
      clipDuration = Math.min(getVideoDuration(clip), 8);
      console.log(`   📹 Processing video: ${basename(clip)} (${clipDuration.toFixed(1)}s)`);
      if (processVideoClip(clip, clipPath, clipDuration, theme, i, clips.length)) {
        processedClips.push(clipPath);
        totalDuration += clipDuration;
      }
    } else {
      clipDuration = 4 + Math.random() * 2; // 4-6 seconds for images
      if (totalDuration + clipDuration > targetDuration) {
        clipDuration = targetDuration - totalDuration;
      }
      console.log(`   🖼️  Processing image: ${basename(clip)} (${clipDuration.toFixed(1)}s)`);
      if (processImageClip(clip, clipPath, clipDuration, theme, i, clips.length)) {
        processedClips.push(clipPath);
        totalDuration += clipDuration;
      }
    }
  }

  if (processedClips.length < 3) {
    console.log('   ⚠️  Not enough clips processed');
    return false;
  }

  console.log(`   📊 Total duration: ${totalDuration.toFixed(1)}s from ${processedClips.length} clips`);

  // Create concat file
  const concatFile = `${TEMP_DIR}/concat_${reelNum}.txt`;
  writeFileSync(concatFile, processedClips.map(p => `file '${p}'`).join('\n'));

  // Concatenate clips
  const concatOutput = `${TEMP_DIR}/concat_${reelNum}.mp4`;
  console.log('   🔗 Concatenating clips...');
  if (!exec(`${FFMPEG} -y -f concat -safe 0 -i "${concatFile}" -c copy "${concatOutput}"`)) {
    console.log('   ⚠️  Concat failed');
    return false;
  }

  // Add branding overlay
  console.log('   ✨ Adding VERALABS branding...');
  const fontFile = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
  const brandingFilter = `drawtext=text='VERALABS':fontfile=${fontFile}:fontsize=32:fontcolor=${t.textColor}:x=w-text_w-50:y=50:shadowcolor=black@0.5:shadowx=2:shadowy=2`;

  // Add intro text
  const introFilter = `drawtext=text='${t.name}':fontfile=${fontFile}:fontsize=56:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black@0.7:shadowx=3:shadowy=3:enable='between(t,0.5,3)'`;

  // Add mood text at end
  const outroFilter = `drawtext=text='${t.mood}':fontfile=${fontFile}:fontsize=36:fontcolor=${t.textColor}:x=(w-text_w)/2:y=h-150:shadowcolor=black@0.5:shadowx=2:shadowy=2:enable='gte(t,${totalDuration - 4})'`;

  const finalFilters = `${brandingFilter},${introFilter},${outroFilter}`;

  const brandedOutput = `${TEMP_DIR}/branded_${reelNum}.mp4`;
  if (!exec(`${FFMPEG} -y -i "${concatOutput}" -vf "${finalFilters}" -c:v libx264 -preset medium -crf 22 "${brandedOutput}"`)) {
    console.log('   ⚠️  Branding failed, using unbranded');
    exec(`cp "${concatOutput}" "${brandedOutput}"`);
  }

  // Add music
  const musicPath = getMusicTrack(theme);
  if (musicPath) {
    console.log('   🎵 Adding music...');
    const loopCount = Math.ceil(totalDuration / 30);
    exec(`${FFMPEG} -y -i "${brandedOutput}" -stream_loop ${loopCount} -i "${musicPath}" -filter_complex "[1:a]volume=0.35,afade=t=in:st=0:d=2,afade=t=out:st=${totalDuration - 2}:d=2[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t ${totalDuration} "${outputPath}"`);
  } else {
    exec(`cp "${brandedOutput}" "${outputPath}"`);
  }

  // Cleanup
  processedClips.forEach(p => { try { unlinkSync(p); } catch {} });
  try { unlinkSync(concatFile); } catch {}
  try { unlinkSync(concatOutput); } catch {}
  try { unlinkSync(brandedOutput); } catch {}

  return existsSync(outputPath);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ VERALABS SENSUAL REEL MAKER
   Creating Artistic, Sensual Content
══════════════════════════════════════════════════════════════════════
`);

  ensureDir(OUTPUT_DIR);
  ensureDir(TEMP_DIR);

  // Gather assets
  const videos = getVideos(VIDEO_SOURCES);
  const images = getImages(IMAGE_SOURCES);

  console.log(`   📹 Found ${videos.length} videos`);
  console.log(`   🖼️  Found ${images.length} images`);

  if (videos.length + images.length < 10) {
    console.log('   ❌ Not enough content');
    return;
  }

  // Shuffle and prepare clips
  const shuffledVideos = shuffleArray(videos);
  const shuffledImages = shuffleArray(images);

  // Create mixed clips array (interleave videos and images)
  const allClips = [];
  const maxLen = Math.max(shuffledVideos.length, shuffledImages.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < shuffledVideos.length) allClips.push(shuffledVideos[i]);
    if (i < shuffledImages.length) allClips.push(shuffledImages[i]);
  }

  console.log(`\n   📊 Total clips available: ${allClips.length}`);

  console.log('\n──────────────────────────────────────────────────────────────────────');
  console.log('🎬 GENERATING SENSUAL REELS');
  console.log('──────────────────────────────────────────────────────────────────────');

  const themes = Object.keys(THEMES);
  const reelsPerTheme = 2;
  let reelNum = 1;
  let clipIndex = 0;
  const results = [];

  for (const theme of themes) {
    const t = THEMES[theme];
    console.log(`\n   🎭 ${t.name.toUpperCase()} - ${t.mood}`);
    console.log('   ─────────────────────────────────────────────');

    for (let i = 0; i < reelsPerTheme; i++) {
      // Get clips for this reel (15-20 clips)
      const reelClips = allClips.slice(clipIndex, clipIndex + 15);
      clipIndex += 15;

      if (reelClips.length < 5) {
        console.log('   ⚠️  Not enough clips remaining');
        break;
      }

      const outputPath = join(OUTPUT_DIR, `sensual_${String(reelNum).padStart(2, '0')}_${theme}_${Date.now()}.mp4`);

      if (createReel(reelClips, theme, outputPath, reelNum)) {
        console.log(`   ✅ Reel ${reelNum} created: ${basename(outputPath)}`);
        results.push({ reel: reelNum, theme: t.name, path: outputPath });
        reelNum++;
      }
    }
  }

  // Cleanup temp dir
  exec(`rm -rf ${TEMP_DIR}`);

  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ SENSUAL REELS COMPLETE
══════════════════════════════════════════════════════════════════════

   📊 SUMMARY
   ─────────────────────────────────────────
   Total Reels Created: ${results.length}

   🎭 THEMES:
${results.map(r => `      • Reel ${r.reel}: ${r.theme}`).join('\n')}

   📁 Output: ${OUTPUT_DIR}

   ✨ FEATURES:
      • Mixed video + image content
      • Ken Burns effect on images
      • Professional color grading
      • Smooth crossfade transitions
      • VERALABS branding
      • AI-generated background music
      • 60-second optimal duration

══════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
