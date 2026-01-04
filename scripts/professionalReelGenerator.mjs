#!/usr/bin/env node

/**
 * VERALABS PROFESSIONAL REEL GENERATOR
 * Creates cinematic 60-90 second Instagram reels with:
 * - Professional color grading
 * - Smooth transitions (crossfade, zoom, pan)
 * - VERALABS branding overlays
 * - Artistic text overlays
 * - Multiple aesthetic themes
 */

import { execSync, spawn } from 'child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join, basename } from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/veralabs-reels';
const TEMP_DIR = '/tmp/veralabs-reels-temp';
const VIDEO_SOURCES = [
  '/home/ecolex/version1/tempimages/asset1.1',
  '/home/ecolex/version1/tempimages/asset2',
];
const IMAGE_SOURCES = [
  '/home/ecolex/version1/veralabs-stories',
  '/home/ecolex/version1/veralabs-posts',
];

// Instagram Reel specs
const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;
const TARGET_DURATION = 75; // 60-90 seconds, targeting 75

// ═══════════════════════════════════════════════════════════════════════════
// AESTHETIC THEMES
// ═══════════════════════════════════════════════════════════════════════════

const AESTHETICS = {
  boudoir: {
    name: 'Boudoir',
    tagline: 'Intimate & Dreamy',
    colorGrade: {
      contrast: 1.1,
      saturation: 1.15,
      brightness: 0.95,
      warmth: 0.05, // Slight warm tint
      vignette: 0.3,
    },
    textColor: '#E8B4B8',
    accentColor: '#D4A574',
    quotes: [
      'Whispers of silk...',
      'Where shadows dance',
      'Softly unveiled',
      'A moment suspended',
      'Tender & bold',
    ],
  },

  midnightMuse: {
    name: 'Midnight Muse',
    tagline: 'Mysterious & Enchanting',
    colorGrade: {
      contrast: 1.2,
      saturation: 0.9,
      brightness: 0.85,
      coolness: 0.08, // Blue tint
      vignette: 0.4,
    },
    textColor: '#C9B8FF',
    accentColor: '#FFD700',
    quotes: [
      'When stars whisper...',
      'Moonlit secrets',
      'Dancing with shadows',
      'Cosmic dreams',
      'After midnight',
    ],
  },

  goldenHour: {
    name: 'Golden Hour',
    tagline: 'Warm & Ethereal',
    colorGrade: {
      contrast: 1.05,
      saturation: 1.2,
      brightness: 1.05,
      warmth: 0.12, // Strong warm tint
      vignette: 0.25,
    },
    textColor: '#FFD89B',
    accentColor: '#FFB347',
    quotes: [
      'Chasing the light...',
      'Sun-kissed dreams',
      'Liquid gold',
      'Golden whispers',
      'The magic hour',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function getVideos(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter(f => /\.(mp4|mov|webm)$/i.test(f))
    .map(f => join(folder, f));
}

function getImages(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => join(folder, f));
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function exec(cmd, silent = false) {
  try {
    const result = execSync(cmd, {
      stdio: silent ? 'pipe' : 'inherit',
      maxBuffer: 50 * 1024 * 1024
    });
    return result ? result.toString() : '';
  } catch (e) {
    if (!silent) console.error(`   ⚠️  Command failed`);
    return null;
  }
}

function getVideoDuration(videoPath) {
  try {
    const result = execSync(
      `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`,
      { stdio: 'pipe' }
    ).toString().trim();

    if (!result) return 8; // Default

    const parts = result.split(':');
    if (parts.length === 3) {
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    }
    return 8;
  } catch {
    return 8;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO PROCESSING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function createColorGradeFilter(aesthetic) {
  const cg = AESTHETICS[aesthetic].colorGrade;
  const filters = [];

  // Contrast and brightness
  filters.push(`eq=contrast=${cg.contrast}:brightness=${cg.brightness - 1}`);

  // Saturation
  filters.push(`eq=saturation=${cg.saturation}`);

  // Color temperature (warmth/coolness)
  if (cg.warmth) {
    // Warm: boost red/yellow
    filters.push(`colorbalance=rs=${cg.warmth}:gs=${cg.warmth * 0.5}:bs=-${cg.warmth * 0.3}`);
  }
  if (cg.coolness) {
    // Cool: boost blue
    filters.push(`colorbalance=rs=-${cg.coolness * 0.3}:gs=0:bs=${cg.coolness}`);
  }

  // Vignette
  if (cg.vignette) {
    filters.push(`vignette=PI/${3 / cg.vignette}`);
  }

  return filters.join(',');
}

function createTextOverlay(text, position, aesthetic, fontSize = 48) {
  const theme = AESTHETICS[aesthetic];
  const fontFile = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

  // Position mapping
  const positions = {
    'top': `x=(w-text_w)/2:y=100`,
    'center': `x=(w-text_w)/2:y=(h-text_h)/2`,
    'bottom': `x=(w-text_w)/2:y=h-text_h-150`,
    'topLeft': `x=80:y=100`,
    'topRight': `x=w-text_w-80:y=100`,
    'bottomLeft': `x=80:y=h-text_h-150`,
    'bottomRight': `x=w-text_w-80:y=h-text_h-150`,
  };

  const pos = positions[position] || positions['bottom'];

  return `drawtext=text='${text}':fontfile=${fontFile}:fontsize=${fontSize}:fontcolor=${theme.textColor}:${pos}:shadowcolor=black@0.7:shadowx=3:shadowy=3`;
}

function createBrandingOverlay(aesthetic) {
  const theme = AESTHETICS[aesthetic];
  const fontFile = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

  // VERALABS branding in corner
  return `drawtext=text='VERALABS':fontfile=${fontFile}:fontsize=28:fontcolor=${theme.accentColor}:x=w-text_w-60:y=60:shadowcolor=black@0.5:shadowx=2:shadowy=2`;
}

// ═══════════════════════════════════════════════════════════════════════════
// REEL CREATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

async function createVideoReel(videos, aesthetic, outputPath, reelNum) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const tempFiles = [];

  console.log(`   Processing ${videos.length} clips...`);

  // Step 1: Process each video clip with effects
  const processedClips = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const duration = getVideoDuration(video);
    const clipDuration = Math.min(duration, 12); // Max 12 seconds per clip
    const processedPath = `${TEMP_DIR}/clip_${reelNum}_${i}.mp4`;
    tempFiles.push(processedPath);

    // Calculate fade times
    const fadeIn = i === 0 ? 1 : 0.5;
    const fadeOut = i === videos.length - 1 ? 1.5 : 0.5;

    // Color grade filter
    const colorGrade = createColorGradeFilter(aesthetic);

    // Build filter complex
    const filters = [
      // Scale to reel dimensions
      `scale=${REEL_WIDTH}:${REEL_HEIGHT}:force_original_aspect_ratio=increase`,
      `crop=${REEL_WIDTH}:${REEL_HEIGHT}`,
      // Apply color grading
      colorGrade,
      // Fade in/out
      `fade=t=in:st=0:d=${fadeIn}`,
      `fade=t=out:st=${clipDuration - fadeOut}:d=${fadeOut}`,
    ].join(',');

    const cmd = `${FFMPEG} -y -i "${video}" -t ${clipDuration} -vf "${filters}" -c:v libx264 -preset fast -crf 23 -an "${processedPath}" 2>/dev/null`;

    exec(cmd, true);

    if (existsSync(processedPath)) {
      processedClips.push(processedPath);
    }
  }

  if (processedClips.length === 0) {
    console.log(`   ⚠️  No clips processed`);
    return false;
  }

  console.log(`   Concatenating ${processedClips.length} clips...`);

  // Step 2: Create concat file
  const concatFile = `${TEMP_DIR}/concat_${reelNum}.txt`;
  const concatContent = processedClips.map(p => `file '${p}'`).join('\n');
  writeFileSync(concatFile, concatContent);
  tempFiles.push(concatFile);

  // Step 3: Concatenate clips
  const concatOutput = `${TEMP_DIR}/concat_${reelNum}.mp4`;
  tempFiles.push(concatOutput);

  const concatCmd = `${FFMPEG} -y -f concat -safe 0 -i "${concatFile}" -c copy "${concatOutput}" 2>/dev/null`;
  exec(concatCmd, true);

  if (!existsSync(concatOutput)) {
    console.log(`   ⚠️  Concat failed`);
    return false;
  }

  console.log(`   Adding branding and text...`);

  // Step 4: Add branding and text overlays
  const brandingFilter = createBrandingOverlay(aesthetic);
  const quoteFilter = createTextOverlay(quote, 'bottom', aesthetic, 42);
  const taglineFilter = createTextOverlay(theme.tagline, 'bottomLeft', aesthetic, 24);

  // Get final duration
  const finalDuration = getVideoDuration(concatOutput);

  // Add intro text (first 3 seconds)
  const introFilter = createTextOverlay(theme.name, 'center', aesthetic, 72);

  const finalFilters = [
    // Branding (always visible)
    brandingFilter,
    // Intro text (first 3 seconds)
    `${introFilter}:enable='between(t,0.5,3)'`,
    // Quote (last 5 seconds)
    `${quoteFilter}:enable='gte(t,${finalDuration - 6})'`,
    // Tagline
    `${taglineFilter}:enable='gte(t,${finalDuration - 5})'`,
  ].join(',');

  const finalCmd = `${FFMPEG} -y -i "${concatOutput}" -vf "${finalFilters}" -c:v libx264 -preset medium -crf 22 -c:a copy "${outputPath}" 2>/dev/null`;

  exec(finalCmd, true);

  // Cleanup temp files
  tempFiles.forEach(f => {
    try { unlinkSync(f); } catch {}
  });

  return existsSync(outputPath);
}

async function createImageSlideshow(images, aesthetic, outputPath, reelNum) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const tempFiles = [];

  // Duration per image (to hit ~75 seconds with transitions)
  const durationPerImage = Math.max(4, Math.floor(TARGET_DURATION / images.length));

  console.log(`   Creating slideshow from ${images.length} images (${durationPerImage}s each)...`);

  // Step 1: Process each image into video clip with Ken Burns effect
  const processedClips = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const clipPath = `${TEMP_DIR}/img_${reelNum}_${i}.mp4`;
    tempFiles.push(clipPath);

    // Alternate between zoom in and zoom out (Ken Burns)
    const zoomDirection = i % 2 === 0 ? 'in' : 'out';
    const startScale = zoomDirection === 'in' ? 1.0 : 1.15;
    const endScale = zoomDirection === 'in' ? 1.15 : 1.0;

    // Random pan direction
    const panX = (Math.random() - 0.5) * 0.1;
    const panY = (Math.random() - 0.5) * 0.1;

    // Color grade
    const colorGrade = createColorGradeFilter(aesthetic);

    // Zoompan filter for Ken Burns effect
    const zoompan = `zoompan=z='${startScale}+${(endScale - startScale) / (durationPerImage * 25)}*on':x='iw/2-(iw/zoom/2)+${panX}*on':y='ih/2-(ih/zoom/2)+${panY}*on':d=${durationPerImage * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`;

    // Fade in/out
    const fadeIn = i === 0 ? 1 : 0.5;
    const fadeOut = i === images.length - 1 ? 1.5 : 0.5;
    const fades = `fade=t=in:st=0:d=${fadeIn},fade=t=out:st=${durationPerImage - fadeOut}:d=${fadeOut}`;

    const cmd = `${FFMPEG} -y -loop 1 -i "${image}" -vf "${zoompan},${colorGrade},${fades}" -t ${durationPerImage} -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p "${clipPath}" 2>/dev/null`;

    exec(cmd, true);

    if (existsSync(clipPath)) {
      processedClips.push(clipPath);
    }
  }

  if (processedClips.length === 0) {
    console.log(`   ⚠️  No images processed`);
    return false;
  }

  console.log(`   Concatenating ${processedClips.length} clips...`);

  // Step 2: Create concat file
  const concatFile = `${TEMP_DIR}/img_concat_${reelNum}.txt`;
  const concatContent = processedClips.map(p => `file '${p}'`).join('\n');
  writeFileSync(concatFile, concatContent);
  tempFiles.push(concatFile);

  // Step 3: Concatenate
  const concatOutput = `${TEMP_DIR}/img_concat_${reelNum}.mp4`;
  tempFiles.push(concatOutput);

  exec(`${FFMPEG} -y -f concat -safe 0 -i "${concatFile}" -c copy "${concatOutput}" 2>/dev/null`, true);

  if (!existsSync(concatOutput)) {
    console.log(`   ⚠️  Concat failed`);
    return false;
  }

  console.log(`   Adding branding...`);

  // Step 4: Add overlays
  const finalDuration = getVideoDuration(concatOutput);
  const brandingFilter = createBrandingOverlay(aesthetic);
  const introFilter = createTextOverlay(theme.name, 'center', aesthetic, 72);
  const quoteFilter = createTextOverlay(quote, 'bottom', aesthetic, 42);

  const finalFilters = [
    brandingFilter,
    `${introFilter}:enable='between(t,0.5,3.5)'`,
    `${quoteFilter}:enable='gte(t,${finalDuration - 5})'`,
  ].join(',');

  exec(`${FFMPEG} -y -i "${concatOutput}" -vf "${finalFilters}" -c:v libx264 -preset medium -crf 22 "${outputPath}" 2>/dev/null`, true);

  // Cleanup
  tempFiles.forEach(f => {
    try { unlinkSync(f); } catch {}
  });

  return existsSync(outputPath);
}

async function createHybridReel(videos, images, aesthetic, outputPath, reelNum) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const tempFiles = [];

  console.log(`   Creating hybrid reel: ${videos.length} videos + ${images.length} images...`);

  // Interleave videos and images
  const segments = [];
  const maxSegments = Math.max(videos.length, images.length);

  for (let i = 0; i < maxSegments; i++) {
    if (i < videos.length) segments.push({ type: 'video', path: videos[i] });
    if (i < images.length) segments.push({ type: 'image', path: images[i] });
  }

  // Process segments
  const processedClips = [];
  const segmentDuration = Math.max(5, Math.floor(TARGET_DURATION / segments.length));

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const clipPath = `${TEMP_DIR}/hybrid_${reelNum}_${i}.mp4`;
    tempFiles.push(clipPath);

    const colorGrade = createColorGradeFilter(aesthetic);
    const fadeIn = i === 0 ? 1 : 0.5;
    const fadeOut = i === segments.length - 1 ? 1.5 : 0.5;

    if (seg.type === 'video') {
      const duration = Math.min(getVideoDuration(seg.path), segmentDuration);
      const filters = [
        `scale=${REEL_WIDTH}:${REEL_HEIGHT}:force_original_aspect_ratio=increase`,
        `crop=${REEL_WIDTH}:${REEL_HEIGHT}`,
        colorGrade,
        `fade=t=in:st=0:d=${fadeIn}`,
        `fade=t=out:st=${duration - fadeOut}:d=${fadeOut}`,
      ].join(',');

      exec(`${FFMPEG} -y -i "${seg.path}" -t ${duration} -vf "${filters}" -c:v libx264 -preset fast -crf 23 -an "${clipPath}" 2>/dev/null`, true);
    } else {
      // Image with Ken Burns
      const zoompan = `zoompan=z='1.0+0.002*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${segmentDuration * 25}:s=${REEL_WIDTH}x${REEL_HEIGHT}:fps=25`;
      const fades = `fade=t=in:st=0:d=${fadeIn},fade=t=out:st=${segmentDuration - fadeOut}:d=${fadeOut}`;

      exec(`${FFMPEG} -y -loop 1 -i "${seg.path}" -vf "${zoompan},${colorGrade},${fades}" -t ${segmentDuration} -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p "${clipPath}" 2>/dev/null`, true);
    }

    if (existsSync(clipPath)) {
      processedClips.push(clipPath);
    }
  }

  if (processedClips.length === 0) return false;

  // Concatenate
  const concatFile = `${TEMP_DIR}/hybrid_concat_${reelNum}.txt`;
  writeFileSync(concatFile, processedClips.map(p => `file '${p}'`).join('\n'));
  tempFiles.push(concatFile);

  const concatOutput = `${TEMP_DIR}/hybrid_concat_${reelNum}.mp4`;
  tempFiles.push(concatOutput);

  exec(`${FFMPEG} -y -f concat -safe 0 -i "${concatFile}" -c copy "${concatOutput}" 2>/dev/null`, true);

  if (!existsSync(concatOutput)) return false;

  // Add overlays
  const finalDuration = getVideoDuration(concatOutput);
  const filters = [
    createBrandingOverlay(aesthetic),
    `${createTextOverlay(theme.name, 'center', aesthetic, 72)}:enable='between(t,0.5,3.5)'`,
    `${createTextOverlay(quote, 'bottom', aesthetic, 42)}:enable='gte(t,${finalDuration - 5})'`,
  ].join(',');

  exec(`${FFMPEG} -y -i "${concatOutput}" -vf "${filters}" -c:v libx264 -preset medium -crf 22 "${outputPath}" 2>/dev/null`, true);

  // Cleanup
  tempFiles.forEach(f => {
    try { unlinkSync(f); } catch {}
  });

  return existsSync(outputPath);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

async function generate() {
  console.log(`
══════════════════════════════════════════════════════════════════════
   🎬 VERALABS PROFESSIONAL REEL GENERATOR
   Creating Cinematic Instagram Reels
══════════════════════════════════════════════════════════════════════
`);

  ensureDir(OUTPUT_DIR);
  ensureDir(TEMP_DIR);

  // Collect videos
  let allVideos = [];
  for (const source of VIDEO_SOURCES) {
    const vids = getVideos(source);
    allVideos.push(...vids);
    console.log(`   📹 ${basename(source)}: ${vids.length} videos`);
  }

  // Collect designer images
  let allImages = [];
  for (const source of IMAGE_SOURCES) {
    const imgs = getImages(source);
    allImages.push(...imgs);
    console.log(`   🖼️  ${basename(source)}: ${imgs.length} images`);
  }

  console.log(`
   📊 Total: ${allVideos.length} videos, ${allImages.length} images
`);

  if (allVideos.length < 3 && allImages.length < 5) {
    console.log('   ❌ Need more source content');
    return;
  }

  // Shuffle for variety
  allVideos = shuffleArray(allVideos);
  allImages = shuffleArray(allImages);

  console.log('──────────────────────────────────────────────────────────────────────');
  console.log('🎬 GENERATING PROFESSIONAL REELS');
  console.log('──────────────────────────────────────────────────────────────────────\n');

  const aesthetics = ['boudoir', 'midnightMuse', 'goldenHour'];
  let reelNum = 1;
  let videoIndex = 0;
  let imageIndex = 0;

  const results = { boudoir: 0, midnightMuse: 0, goldenHour: 0 };

  for (const aesthetic of aesthetics) {
    const theme = AESTHETICS[aesthetic];
    console.log(`\n   🎭 ${theme.name.toUpperCase()} - ${theme.tagline}`);
    console.log('   ─────────────────────────────────────────────');

    // Create 3 reels per aesthetic
    for (let i = 0; i < 3; i++) {
      const outputPath = join(OUTPUT_DIR,
        `reel_${String(reelNum).padStart(2, '0')}_${aesthetic}_${Date.now()}.mp4`
      );

      // Decide reel type
      const reelType = i % 3; // Rotate through types
      let success = false;

      if (reelType === 0 && allVideos.length >= videoIndex + 8) {
        // Pure video reel (8-10 clips)
        console.log(`\n   📹 Creating Video Reel #${i + 1}...`);
        const clips = allVideos.slice(videoIndex, videoIndex + 8);
        videoIndex += 8;
        success = await createVideoReel(clips, aesthetic, outputPath, reelNum);
      }
      else if (reelType === 1 && allImages.length >= imageIndex + 15) {
        // Image slideshow reel (15-20 images)
        console.log(`\n   🖼️  Creating Slideshow Reel #${i + 1}...`);
        const imgs = allImages.slice(imageIndex, imageIndex + 15);
        imageIndex += 15;
        success = await createImageSlideshow(imgs, aesthetic, outputPath, reelNum);
      }
      else if (allVideos.length >= videoIndex + 4 && allImages.length >= imageIndex + 6) {
        // Hybrid reel
        console.log(`\n   🎞️  Creating Hybrid Reel #${i + 1}...`);
        const vids = allVideos.slice(videoIndex, videoIndex + 4);
        const imgs = allImages.slice(imageIndex, imageIndex + 6);
        videoIndex += 4;
        imageIndex += 6;
        success = await createHybridReel(vids, imgs, aesthetic, outputPath, reelNum);
      }
      else {
        // Fallback to whatever we have
        console.log(`\n   🎬 Creating Mixed Reel #${i + 1}...`);
        if (allVideos.length > videoIndex + 3) {
          const clips = allVideos.slice(videoIndex, videoIndex + 5);
          videoIndex += 5;
          success = await createVideoReel(clips, aesthetic, outputPath, reelNum);
        }
      }

      if (success) {
        console.log(`   ✅ Reel ${reelNum}: ${theme.name}`);
        results[aesthetic]++;
        reelNum++;
      } else {
        console.log(`   ⚠️  Reel ${reelNum} failed`);
      }
    }
  }

  // Cleanup temp directory
  exec(`rm -rf ${TEMP_DIR}`, true);

  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ PROFESSIONAL REELS GENERATED
══════════════════════════════════════════════════════════════════════

   📊 SUMMARY BY AESTHETIC
   ─────────────────────────────────────────
   Boudoir:        ${results.boudoir} reels
   Midnight Muse:  ${results.midnightMuse} reels
   Golden Hour:    ${results.goldenHour} reels
   ─────────────────────────────────────────
   TOTAL:          ${reelNum - 1} professional reels

   📁 Output: ${OUTPUT_DIR}

   🎬 REEL FEATURES:
      • 60-90 second duration
      • ${REEL_WIDTH}x${REEL_HEIGHT} Instagram optimized
      • Professional color grading per aesthetic
      • Ken Burns effect on images
      • Smooth crossfade transitions
      • VERALABS branding overlay
      • Artistic text overlays
      • Vignette effects

══════════════════════════════════════════════════════════════════════
`);
}

generate().catch(console.error);
