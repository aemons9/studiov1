#!/usr/bin/env node

/**
 * VERALABS HELMUT NEWTON REEL MASTER
 *
 * Ultra-professional reel creation combining:
 * - Ken Burns sophisticated motion (zoom, pan, parallax)
 * - Helmut Newton aesthetic (high contrast, dramatic shadows, fashion-forward)
 * - Mathematical precision in timing and transitions
 * - Futuristic computational artistry
 *
 * Features:
 * - Custom thumbnail extraction (no black screens)
 * - VERALABS signature branding
 * - Professional color grading per theme
 * - Story clip generation
 * - Unique captivating captions
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join, basename, extname } from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const INPUT_DIR = '/home/ecolex/version1/tempimages/new1';
const OUTPUT_DIR = '/home/ecolex/version1/veralabs-newton-reels';
const STORY_DIR = '/home/ecolex/version1/veralabs-newton-stories';
const THUMB_DIR = '/home/ecolex/version1/veralabs-newton-thumbnails';
const TEMP_DIR = '/tmp/newton-reel-temp';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;
const CLIP_DURATION = 4; // seconds per image
const TRANSITION_DURATION = 0.5;

// ═══════════════════════════════════════════════════════════════════════════
// HELMUT NEWTON AESTHETIC THEMES
// ═══════════════════════════════════════════════════════════════════════════

const NEWTON_THEMES = {
  bigNudes: {
    name: 'Big Nudes',
    description: 'Classic Newton - High contrast B&W with stark shadows',
    colorGrade: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.4:brightness=-0.05:saturation=0',
    vignette: 'vignette=PI/3:1.2',
    overlay: 'VERALABS | NEWTON SERIES',
  },
  sleepwalker: {
    name: 'Sleepwalker',
    description: 'Moody blue-toned with cinematic mystery',
    colorGrade: 'eq=contrast=1.25:brightness=-0.02:saturation=0.8,colorbalance=rs=-0.05:gs=0:bs=0.12,curves=b=0/0.05 0.5/0.55 1/0.95',
    vignette: 'vignette=PI/3.5:1.3',
    overlay: 'VERALABS | MIDNIGHT',
  },
  domesticNude: {
    name: 'Domestic Nude',
    description: 'Warm golden tones with intimate softness',
    colorGrade: 'eq=contrast=1.15:brightness=0.03:saturation=1.1,colorbalance=rs=0.1:gs=0.06:bs=-0.04',
    vignette: 'vignette=PI/4:1.0',
    overlay: 'VERALABS | INTIMATE',
  },
  polaroid: {
    name: 'Polaroid',
    description: 'Vintage fashion editorial with subtle grain',
    colorGrade: 'eq=contrast=1.1:brightness=0.02:saturation=1.15,colorbalance=rs=0.08:gs=0.04:bs=0.02,noise=alls=8:allf=t',
    vignette: 'vignette=PI/4.5:0.8',
    overlay: 'VERALABS | POLAROID',
  },
  theyrecoming: {
    name: 'They Are Coming',
    description: 'Bold power stance - High saturation dramatic',
    colorGrade: 'eq=contrast=1.3:brightness=0:saturation=1.25,curves=r=0/0 0.3/0.25 0.7/0.75 1/1:g=0/0 0.5/0.5 1/1:b=0/0 0.3/0.35 0.7/0.65 1/1',
    vignette: 'vignette=PI/3:1.4',
    overlay: 'VERALABS | POWER',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// KEN BURNS MOTION PRESETS (Mathematical Precision)
// ═══════════════════════════════════════════════════════════════════════════

const KEN_BURNS_PRESETS = [
  {
    name: 'slowZoomIn',
    // Slow zoom from 1.0 to 1.15 centered
    getFilter: (duration) => `zoompan=z='1.0+0.15*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
  {
    name: 'slowZoomOut',
    // Slow zoom from 1.2 to 1.0 centered
    getFilter: (duration) => `zoompan=z='1.2-0.2*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
  {
    name: 'panLeftToRight',
    // Pan from left to right with slight zoom
    getFilter: (duration) => `zoompan=z='1.1':x='(iw-iw/zoom)*on/${duration}/25':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
  {
    name: 'panRightToLeft',
    // Pan from right to left
    getFilter: (duration) => `zoompan=z='1.1':x='(iw-iw/zoom)*(1-on/${duration}/25)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
  {
    name: 'diagonalDrift',
    // Diagonal movement with zoom
    getFilter: (duration) => `zoompan=z='1.05+0.1*(on/${duration}/25)':x='(iw-iw/zoom)*0.3*(on/${duration}/25)':y='(ih-ih/zoom)*0.2*(on/${duration}/25)':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
  {
    name: 'faceZoom',
    // Zoom into upper third (face area)
    getFilter: (duration) => `zoompan=z='1.0+0.25*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih*0.2':d=${duration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// UNIQUE CAPTIVATING CAPTIONS
// ═══════════════════════════════════════════════════════════════════════════

const CAPTIONS = [
  {
    text: `Shadows don't lie. They reveal what light cannot.\n\n✨ Where elegance meets edge.\n\n#VERALABS #HelmutNewton #HighFashion #ArtisticPhotography #ShadowPlay #Elegance #FashionEditorial #BoldBeauty`,
    mood: 'dramatic',
  },
  {
    text: `Power isn't given.\nIt's taken.\n\n💫 Commanding every frame.\n\n#VERALABS #PowerPose #FashionArt #EditorialPhotography #Confidence #BoldWomen #ArtisticVision #Luxury`,
    mood: 'power',
  },
  {
    text: `Between light and shadow,\nthere's a story waiting to be told.\n\n🖤 The art of seeing.\n\n#VERALABS #ChiaroscuroArt #VisualStorytelling #FineArtPhotography #LightAndShadow #ArtisticExpression`,
    mood: 'mysterious',
  },
  {
    text: `Silence speaks volumes\nwhen the composition is perfect.\n\n✨ Frozen elegance.\n\n#VERALABS #FashionPhotography #TimelessBeauty #ArtDirection #EditorialStyle #VisualArt #Sophistication`,
    mood: 'elegant',
  },
  {
    text: `Some moments are meant\nto be immortalized.\n\n💎 This is one of them.\n\n#VERALABS #IconicMoments #LuxuryFashion #ArtisticVision #Photography #Timeless #MasterpieceInMotion`,
    mood: 'iconic',
  },
  {
    text: `The body is architecture.\nLight is the architect.\n\n🏛️ Form follows function.\n\n#VERALABS #BodyAsArt #ArchitecturalBeauty #FineArt #FormAndFunction #ArtisticPhotography #Sculptural`,
    mood: 'architectural',
  },
  {
    text: `Bold choices.\nBolder results.\n\n🔥 No compromises.\n\n#VERALABS #BoldBeauty #FearlessFashion #EditorialPower #NoLimits #ArtisticFreedom #HighFashion`,
    mood: 'bold',
  },
  {
    text: `In the stillness,\nfind the storm.\n\n⚡ Quiet intensity.\n\n#VERALABS #IntenseBeauty #QuietPower #FashionArt #DramaticLighting #VisualImpact #Captivating`,
    mood: 'intense',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function exec(cmd, silent = true) {
  try {
    execSync(cmd, { stdio: silent ? 'pipe' : 'inherit', maxBuffer: 200 * 1024 * 1024 });
    return true;
  } catch (e) {
    if (!silent) console.error('Exec error:', e.message);
    return false;
  }
}

function getAssets() {
  const images = [];
  const videos = [];

  const files = readdirSync(INPUT_DIR).sort();

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const path = join(INPUT_DIR, file);

    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      images.push(path);
    } else if (['.mp4', '.mov', '.webm'].includes(ext)) {
      videos.push(path);
    }
  }

  return { images, videos };
}

function getMusicTrack() {
  if (!existsSync(MUSIC_DIR)) return null;
  const tracks = readdirSync(MUSIC_DIR).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
  if (tracks.length === 0) return null;
  return join(MUSIC_DIR, tracks[Math.floor(Math.random() * tracks.length)]);
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE PROCESSING WITH KEN BURNS + HELMUT NEWTON
// ═══════════════════════════════════════════════════════════════════════════

function processImageClip(imagePath, outputPath, theme, motionPreset, clipIndex) {
  const t = NEWTON_THEMES[theme];
  const motion = KEN_BURNS_PRESETS[motionPreset % KEN_BURNS_PRESETS.length];

  // Complex filter chain: Scale → Ken Burns → Color Grade → Vignette
  const filterChain = [
    // First scale to larger size for Ken Burns room
    `scale=${REEL_WIDTH * 2}:${REEL_HEIGHT * 2}:force_original_aspect_ratio=increase`,
    `crop=${REEL_WIDTH * 2}:${REEL_HEIGHT * 2}`,
    // Apply Ken Burns motion
    motion.getFilter(CLIP_DURATION),
    // Helmut Newton color grading
    t.colorGrade,
    // Vignette for drama
    t.vignette,
  ].join(',');

  const cmd = `${FFMPEG} -y -loop 1 -i "${imagePath}" -vf "${filterChain}" -t ${CLIP_DURATION} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

function processVideoClip(videoPath, outputPath, theme, maxDuration = 8) {
  const t = NEWTON_THEMES[theme];

  // Get video duration
  let duration = maxDuration;
  try {
    const probe = execSync(`${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`, { encoding: 'utf8' });
    const parts = probe.trim().split(':');
    if (parts.length === 3) {
      duration = Math.min(parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]), maxDuration);
    }
  } catch {}

  const filterChain = [
    `scale=${REEL_WIDTH}:${REEL_HEIGHT}:force_original_aspect_ratio=increase`,
    `crop=${REEL_WIDTH}:${REEL_HEIGHT}`,
    t.colorGrade,
    t.vignette,
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${videoPath}" -vf "${filterChain}" -t ${duration} -c:v libx264 -preset fast -crf 18 -an -pix_fmt yuv420p "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// BRANDING OVERLAY
// ═══════════════════════════════════════════════════════════════════════════

function addBranding(inputPath, outputPath, theme) {
  const t = NEWTON_THEMES[theme];

  // Elegant VERALABS watermark with theme subtitle
  const filter = [
    // Main VERALABS text
    `drawtext=text='VERALABS':fontsize=42:fontcolor=white@0.85:x=(w-text_w)/2:y=h-100:font=sans-serif:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf`,
    // Subtle line
    `drawtext=text='━━━━━━━━━━━━━━━━━':fontsize=24:fontcolor=white@0.4:x=(w-text_w)/2:y=h-65:font=sans-serif`,
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filter}" -c:v libx264 -preset fast -crf 18 -c:a copy "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// THUMBNAIL GENERATION (Avoid black screens)
// ═══════════════════════════════════════════════════════════════════════════

function extractThumbnail(videoPath, outputPath) {
  // Extract frame at 2 seconds (after any fade-in)
  const cmd = `${FFMPEG} -y -i "${videoPath}" -ss 2 -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`;
  if (exec(cmd) && existsSync(outputPath)) {
    return true;
  }

  // Fallback: try at 1 second
  const cmd2 = `${FFMPEG} -y -i "${videoPath}" -ss 1 -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`;
  return exec(cmd2);
}

// ═══════════════════════════════════════════════════════════════════════════
// STORY CLIP GENERATION (15-second teaser)
// ═══════════════════════════════════════════════════════════════════════════

function createStoryClip(videoPath, outputPath) {
  // Extract 15-second clip from middle of video with fade effects
  const cmd = `${FFMPEG} -y -i "${videoPath}" -ss 5 -t 15 -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=14.5:d=0.5" -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 128k "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONCATENATE WITH CROSSFADE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

function concatenateWithTransitions(clipPaths, outputPath) {
  if (clipPaths.length === 0) return false;
  if (clipPaths.length === 1) {
    execSync(`cp "${clipPaths[0]}" "${outputPath}"`);
    return true;
  }

  // For simplicity, use concat demuxer (crossfade adds complexity)
  const listPath = join(TEMP_DIR, 'concat_list.txt');
  const listContent = clipPaths.map(p => `file '${p}'`).join('\n');
  writeFileSync(listPath, listContent);

  const cmd = `${FFMPEG} -y -f concat -safe 0 -i "${listPath}" -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// ADD MUSIC
// ═══════════════════════════════════════════════════════════════════════════

function addMusic(videoPath, musicPath, outputPath) {
  if (!musicPath || !existsSync(musicPath)) {
    execSync(`cp "${videoPath}" "${outputPath}"`);
    return true;
  }

  const cmd = `${FFMPEG} -y -i "${videoPath}" -i "${musicPath}" -c:v copy -c:a aac -b:a 192k -map 0:v -map 1:a -shortest "${outputPath}" 2>/dev/null`;

  return exec(cmd);
}

// ═══════════════════════════════════════════════════════════════════════════
// CREATE SINGLE PROFESSIONAL REEL
// ═══════════════════════════════════════════════════════════════════════════

async function createProfessionalReel(assets, reelNum, themeName) {
  const t = NEWTON_THEMES[themeName];

  console.log(`\n   📹 REEL ${reelNum}: ${t.name.toUpperCase()}`);
  console.log(`   ─────────────────────────────────────────`);
  console.log(`   Theme: ${t.description}`);

  const clipPaths = [];

  // Process images with Ken Burns
  for (let i = 0; i < assets.images.length; i++) {
    const clipPath = join(TEMP_DIR, `clip_${reelNum}_img_${i}.mp4`);
    console.log(`      Processing image ${i + 1}/${assets.images.length}...`);

    if (processImageClip(assets.images[i], clipPath, themeName, i, i)) {
      clipPaths.push(clipPath);
    }
  }

  // Process videos
  for (let i = 0; i < assets.videos.length; i++) {
    const clipPath = join(TEMP_DIR, `clip_${reelNum}_vid_${i}.mp4`);
    console.log(`      Processing video ${i + 1}/${assets.videos.length}...`);

    if (processVideoClip(assets.videos[i], clipPath, themeName)) {
      clipPaths.push(clipPath);
    }
  }

  if (clipPaths.length === 0) {
    console.log(`      ❌ No clips created`);
    return null;
  }

  // Concatenate
  const concatPath = join(TEMP_DIR, `concat_${reelNum}.mp4`);
  console.log(`      Concatenating ${clipPaths.length} clips...`);

  if (!concatenateWithTransitions(clipPaths, concatPath)) {
    console.log(`      ❌ Concatenation failed`);
    return null;
  }

  // Add branding
  const brandedPath = join(TEMP_DIR, `branded_${reelNum}.mp4`);
  console.log(`      Adding VERALABS branding...`);
  addBranding(concatPath, brandedPath, themeName);

  // Add music
  const musicPath = getMusicTrack();
  const timestamp = Date.now();
  const finalPath = join(OUTPUT_DIR, `newton_${String(reelNum).padStart(2, '0')}_${themeName}_${timestamp}.mp4`);

  console.log(`      Adding music...`);
  const videoWithBrand = existsSync(brandedPath) ? brandedPath : concatPath;

  if (musicPath) {
    addMusic(videoWithBrand, musicPath, finalPath);
  } else {
    execSync(`cp "${videoWithBrand}" "${finalPath}"`);
  }

  // Extract thumbnail
  const thumbPath = join(THUMB_DIR, `thumb_${String(reelNum).padStart(2, '0')}_${themeName}_${timestamp}.jpg`);
  console.log(`      Extracting thumbnail...`);
  extractThumbnail(finalPath, thumbPath);

  // Create story teaser
  const storyPath = join(STORY_DIR, `story_${String(reelNum).padStart(2, '0')}_${themeName}_${timestamp}.mp4`);
  console.log(`      Creating story teaser...`);
  createStoryClip(finalPath, storyPath);

  console.log(`      ✅ Reel saved: ${basename(finalPath)}`);
  console.log(`      ✅ Thumbnail: ${basename(thumbPath)}`);
  console.log(`      ✅ Story: ${basename(storyPath)}`);

  return {
    reel: finalPath,
    thumbnail: thumbPath,
    story: storyPath,
    theme: themeName,
    caption: CAPTIONS[reelNum % CAPTIONS.length],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║       ✨ VERALABS HELMUT NEWTON REEL MASTER ✨                       ║
║       Ken Burns Motion | Newton Aesthetic | Mathematical Precision   ║
║       Futuristic Computational Artistry                              ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  ensureDir(OUTPUT_DIR);
  ensureDir(STORY_DIR);
  ensureDir(THUMB_DIR);
  ensureDir(TEMP_DIR);

  // Get assets
  const { images, videos } = getAssets();
  console.log(`📸 Found ${images.length} images`);
  console.log(`🎬 Found ${videos.length} videos`);

  if (images.length === 0 && videos.length === 0) {
    console.log('❌ No assets found in', INPUT_DIR);
    return;
  }

  const themes = Object.keys(NEWTON_THEMES);
  const results = [];

  // Distribute assets across themes (6-8 images per reel)
  const imagesPerReel = Math.ceil(images.length / themes.length);
  const videosPerReel = Math.ceil(videos.length / themes.length);

  console.log(`\n═══════════════════════════════════════════════════════════════`);
  console.log(`🎨 CREATING ${themes.length} PROFESSIONAL REELS`);
  console.log(`═══════════════════════════════════════════════════════════════`);

  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    const startImgIdx = i * imagesPerReel;
    const startVidIdx = i * videosPerReel;

    const reelAssets = {
      images: images.slice(startImgIdx, startImgIdx + imagesPerReel),
      videos: videos.slice(startVidIdx, startVidIdx + videosPerReel),
    };

    if (reelAssets.images.length === 0 && reelAssets.videos.length === 0) continue;

    const result = await createProfessionalReel(reelAssets, i + 1, theme);
    if (result) results.push(result);
  }

  // Cleanup temp
  try {
    execSync(`rm -rf ${TEMP_DIR}/*`);
  } catch {}

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                 ✨ CREATION COMPLETE ✨                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  Reels Created: ${String(results.length).padEnd(52)}║
║  Stories Created: ${String(results.length).padEnd(50)}║
║  Thumbnails: ${String(results.length).padEnd(55)}║
╚══════════════════════════════════════════════════════════════════════╝

📁 OUTPUT LOCATIONS:
   Reels: ${OUTPUT_DIR}
   Stories: ${STORY_DIR}
   Thumbnails: ${THUMB_DIR}

📹 CREATED REELS:
${results.map((r, i) => `   ${i + 1}. ${basename(r.reel)} [${NEWTON_THEMES[r.theme].name}]`).join('\n')}

📝 SUGGESTED CAPTIONS:
${results.map((r, i) => `\n   ═══ REEL ${i + 1}: ${NEWTON_THEMES[r.theme].name.toUpperCase()} ═══\n${r.caption.text}\n`).join('')}
`);

  // Save caption file
  const captionFile = join(OUTPUT_DIR, 'captions.json');
  writeFileSync(captionFile, JSON.stringify(results.map(r => ({
    reel: basename(r.reel),
    theme: r.theme,
    caption: r.caption.text,
    thumbnail: basename(r.thumbnail),
    story: basename(r.story),
  })), null, 2));

  console.log(`\n💾 Captions saved to: ${captionFile}`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
