#!/usr/bin/env node

/**
 * VERALABS HOURGLASS REEL MAKER
 * Creates artistic reels from hourglass muse images
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/veralabs-hourglass-reels';
const TEMP_DIR = '/tmp/hourglass-reel-temp';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Image sources (all AI-generated images)
const IMAGE_SOURCES = [
  '/home/ecolex/version1/generated-vera-sensual',
  '/home/ecolex/version1/generated-hourglass-muse',
  '/home/ecolex/version1/generated-sensual',
];

const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;

const THEMES = {
  champagneLuxury: {
    name: 'Champagne Luxury',
    colorGrade: 'eq=contrast=1.1:brightness=0.03:saturation=1.15,colorbalance=rs=0.08:gs=0.05:bs=-0.02',
    vignette: 'vignette=PI/4',
  },
  boudoirGlow: {
    name: 'Boudoir Glow',
    colorGrade: 'eq=contrast=1.08:brightness=0.02:saturation=1.2,colorbalance=rs=0.1:gs=0.06:bs=0.02',
    vignette: 'vignette=PI/4.5',
  },
  midnightMystery: {
    name: 'Midnight Mystery',
    colorGrade: 'eq=contrast=1.15:brightness=-0.02:saturation=0.95,colorbalance=rs=-0.02:gs=0:bs=0.08',
    vignette: 'vignette=PI/3.5',
  },
  goldenSensual: {
    name: 'Golden Sensual',
    colorGrade: 'eq=contrast=1.05:brightness=0.04:saturation=1.25,colorbalance=rs=0.12:gs=0.08:bs=-0.04',
    vignette: 'vignette=PI/5',
  },
};

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function exec(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe', maxBuffer: 100 * 1024 * 1024 });
    return true;
  } catch (e) {
    console.log('    Error:', e.message.substring(0, 100));
    return false;
  }
}

function getImages() {
  const images = [];
  for (const folder of IMAGE_SOURCES) {
    if (!existsSync(folder)) continue;
    const files = readdirSync(folder)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .map(f => join(folder, f));
    images.push(...files);
  }
  return images;
}

function getMusicTrack() {
  const tracks = readdirSync(MUSIC_DIR).filter(f => f.endsWith('.wav'));
  if (tracks.length === 0) return null;
  return join(MUSIC_DIR, tracks[Math.floor(Math.random() * tracks.length)]);
}

function createImageClip(imagePath, outputPath, duration, theme) {
  const t = THEMES[theme];

  // Ken Burns zoom-in effect
  const startScale = 1.0;
  const endScale = 1.15;

  const filter = [
    `scale=${REEL_WIDTH * 2}:${REEL_HEIGHT * 2}`,
    `zoompan=z='${startScale}+(${endScale}-${startScale})*(on/25/${duration})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
    t.colorGrade,
    t.vignette,
  ].join(',');

  const cmd = `${FFMPEG} -y -loop 1 -i "${imagePath}" -vf "${filter}" -t ${duration} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${outputPath}" 2>/dev/null`;
  return exec(cmd);
}

function addVERALABSBranding(inputPath, outputPath) {
  // Add VERALABS watermark
  const filter = `drawtext=text='VERALABS':fontsize=36:fontcolor=white@0.7:x=(w-text_w)/2:y=h-60:font=sans-serif`;
  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filter}" -c:v libx264 -preset fast -crf 18 -c:a copy "${outputPath}" 2>/dev/null`;
  return exec(cmd);
}

function concatenateClips(clipPaths, outputPath) {
  const listPath = join(TEMP_DIR, 'concat_list.txt');
  const listContent = clipPaths.map(p => `file '${p}'`).join('\n');
  writeFileSync(listPath, listContent);

  const cmd = `${FFMPEG} -y -f concat -safe 0 -i "${listPath}" -c:v libx264 -preset fast -crf 18 "${outputPath}" 2>/dev/null`;
  return exec(cmd);
}

function addMusic(videoPath, musicPath, outputPath) {
  const cmd = `${FFMPEG} -y -i "${videoPath}" -i "${musicPath}" -c:v copy -c:a aac -b:a 128k -map 0:v -map 1:a -shortest "${outputPath}" 2>/dev/null`;
  return exec(cmd);
}

async function createReel(images, reelNum, themeName) {
  console.log(`\n   📹 Creating Reel ${reelNum}: ${THEMES[themeName].name}`);

  const clipPaths = [];
  const clipDuration = 10; // 10 seconds per image

  for (let i = 0; i < images.length; i++) {
    const clipPath = join(TEMP_DIR, `clip_${reelNum}_${i}.mp4`);
    console.log(`      Processing: ${basename(images[i])}`);

    if (createImageClip(images[i], clipPath, clipDuration, themeName)) {
      clipPaths.push(clipPath);
    }
  }

  if (clipPaths.length === 0) {
    console.log('      ❌ No clips created');
    return null;
  }

  // Concatenate clips
  const concatPath = join(TEMP_DIR, `concat_${reelNum}.mp4`);
  console.log('      Concatenating clips...');
  if (!concatenateClips(clipPaths, concatPath)) {
    console.log('      ❌ Concatenation failed');
    return null;
  }

  // Add branding
  const brandedPath = join(TEMP_DIR, `branded_${reelNum}.mp4`);
  console.log('      Adding VERALABS branding...');
  addVERALABSBranding(concatPath, brandedPath);

  // Add music
  const musicPath = getMusicTrack();
  const timestamp = Date.now();
  const finalPath = join(OUTPUT_DIR, `hourglass_${String(reelNum).padStart(2, '0')}_${themeName}_${timestamp}.mp4`);

  if (musicPath) {
    console.log('      Adding music...');
    if (addMusic(existsSync(brandedPath) ? brandedPath : concatPath, musicPath, finalPath)) {
      console.log(`      ✅ Saved: ${basename(finalPath)}`);
      return finalPath;
    }
  }

  // Fallback - copy without music
  execSync(`cp "${existsSync(brandedPath) ? brandedPath : concatPath}" "${finalPath}"`);
  console.log(`      ✅ Saved (no music): ${basename(finalPath)}`);
  return finalPath;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║       ✨ VERALABS HOURGLASS REEL MAKER ✨                            ║
║       Creating reels from AI-generated hourglass images              ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  ensureDir(OUTPUT_DIR);
  ensureDir(TEMP_DIR);

  const allImages = getImages();
  console.log(`📸 Found ${allImages.length} images`);

  if (allImages.length === 0) {
    console.log('❌ No images found!');
    return;
  }

  // Show images
  allImages.forEach((img, i) => console.log(`   ${i + 1}. ${basename(img)}`));

  const themes = Object.keys(THEMES);
  const reels = [];

  // Create reels - 2-3 images per reel, one reel per theme
  const imagesPerReel = Math.ceil(allImages.length / themes.length);

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    const startIdx = i * imagesPerReel;
    const reelImages = allImages.slice(startIdx, startIdx + imagesPerReel);

    if (reelImages.length > 0) {
      const reel = await createReel(reelImages, i + 1, theme);
      if (reel) reels.push(reel);
    }
  }

  // Cleanup temp
  try {
    execSync(`rm -rf ${TEMP_DIR}/*`);
  } catch {}

  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ✨ REEL CREATION COMPLETE ✨                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Total Reels Created: ${String(reels.length).padEnd(46)}║
║  Output: ${OUTPUT_DIR.padEnd(57)}║
╚══════════════════════════════════════════════════════════════════════╝
`);

  reels.forEach((r, i) => console.log(`   ${i + 1}. ${basename(r)}`));
}

main().catch(console.error);
