#!/usr/bin/env node
/**
 * VERALABS NEON-CHIAROSCURO INTIMATE FUSION
 *
 * Ultimate artistic fusion blending:
 * - Neon club aesthetics with classical chiaroscuro
 * - Still images (Ken Burns) with video clips
 * - Smooth crossfade transitions
 * - Captivating sensual musical arrangements
 * - Cinematic boudoir teleportation experience
 *
 * Usage: node scripts/neon-chiaroscuro-fusion.mjs
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/neon-chiaroscuro-fusion';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════
// NEON-CHIAROSCURO FUSION COLOR GRADES
// Where electric neon meets classical shadow mastery
// ═══════════════════════════════════════════════════════════════════

const FUSION_GRADES = {
  // Cyberpunk Noir - Blue neon with deep blacks
  cyberpunkNoir: {
    name: 'Cyberpunk Noir - Electric Shadows',
    filter: 'eq=contrast=1.5:brightness=-0.03:saturation=1.2,colorbalance=rs=-0.1:gs=-0.05:bs=0.2:rm=-0.08:gm=-0.04:bm=0.15:rh=-0.05:gh=0:bh=0.12,curves=m=0/0 0.15/0.05 0.5/0.5 0.85/0.95 1/1',
    vignette: 'vignette=PI/3.5',
    grain: 'noise=c0s=6:c0f=t+u'
  },

  // Neon Velvet - Pink/magenta neon with warm shadows
  neonVelvet: {
    name: 'Neon Velvet - Magenta Dreams',
    filter: 'eq=contrast=1.4:brightness=0:saturation=1.3,colorbalance=rs=0.15:gs=-0.05:bs=0.1:rm=0.12:gm=-0.03:bm=0.08:rh=0.1:gh=-0.02:bh=0.05,curves=r=0/0 0.5/0.55 1/1:b=0/0 0.5/0.52 1/1',
    vignette: 'vignette=PI/4',
    grain: 'noise=c0s=5:c0f=t+u'
  },

  // Midnight Electric - Deep blue with electric highlights
  midnightElectric: {
    name: 'Midnight Electric - Azure Glow',
    filter: 'eq=contrast=1.55:brightness=-0.02:saturation=1.15,colorbalance=rs=-0.12:gs=-0.02:bs=0.18:rm=-0.1:gm=0:bm=0.14:rh=-0.08:gh=0.02:bh=0.16,curves=m=0/0 0.2/0.08 0.5/0.5 0.8/0.92 1/1',
    vignette: 'vignette=PI/3.8',
    grain: 'noise=c0s=7:c0f=t+u'
  },

  // Golden Neon - Warm amber with cool neon accents
  goldenNeon: {
    name: 'Golden Neon - Champagne Electric',
    filter: 'eq=contrast=1.35:brightness=0.02:saturation=1.25,colorbalance=rs=0.12:gs=0.08:bs=-0.05:rm=0.1:gm=0.06:bm=-0.02:rh=0.08:gh=0.04:bh=0.02,curves=r=0/0 0.5/0.55 1/1:g=0/0 0.5/0.52 1/1',
    vignette: 'vignette=PI/4.2',
    grain: 'noise=c0s=5:c0f=t+u'
  },

  // Obsidian Glow - Near black with subtle color highlights
  obsidianGlow: {
    name: 'Obsidian Glow - Shadow Fire',
    filter: 'eq=contrast=1.7:brightness=-0.08:saturation=0.9,colorbalance=rs=0.05:gs=-0.02:bs=0.08:rm=0.03:gm=-0.01:bm=0.05,curves=m=0/0 0.1/0.02 0.5/0.45 0.9/0.95 1/1',
    vignette: 'vignette=PI/3',
    grain: 'noise=c0s=10:c0f=t+u'
  },

  // Holographic Dream - Iridescent color shifts
  holographicDream: {
    name: 'Holographic Dream - Prismatic',
    filter: 'eq=contrast=1.3:brightness=0.03:saturation=1.4,colorbalance=rs=0.08:gs=-0.08:bs=0.12:rm=-0.05:gm=0.08:bm=0.05:rh=0.1:gh=0.05:bh=-0.05,hue=h=5',
    vignette: 'vignette=PI/5',
    grain: 'noise=c0s=4:c0f=t+u'
  }
};

// ═══════════════════════════════════════════════════════════════════
// ASSET SOURCES
// ═══════════════════════════════════════════════════════════════════

const NEW3_IMAGES = [
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732449364-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732449611-2.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732449852-3.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732549548-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732549789-2.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732550043-3.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732646728-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732880009-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732929914-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767733066718-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767733215086-1.png',
];

const NEW2_VIDEOS = [
  '/home/ecolex/version1/tempimages/new2/Chiaroscuro_sensuality_sculpting_20260104190.mp4',
  '/home/ecolex/version1/tempimages/new2/Sculptural_elegance_a_202601041908.mp4',
  '/home/ecolex/version1/tempimages/new2/Modern_nudeart_sculpted_202601041908.mp4',
  '/home/ecolex/version1/tempimages/new2/Ethereal_intimacy_vulnerability_202601041905.mp4',
  '/home/ecolex/version1/tempimages/new2/A_sophisticated_artconcept_202601041905_boza.mp4',
  '/home/ecolex/version1/tempimages/new2/A_sophisticated_slow_202601041853_jwcx6.mp4',
  '/home/ecolex/version1/tempimages/new2/Awardwinning_photograph_museumquality_202.mp4',
  '/home/ecolex/version1/tempimages/new2/Rustic_boudoir_indian_202601041908.mp4',
];

const MUSIC_TRACKS = {
  midnight: [
    `${MUSIC_DIR}/midnightMuse_track_1.wav`,
    `${MUSIC_DIR}/midnightMuse_track_2.wav`,
    `${MUSIC_DIR}/midnightMuse_track_3.wav`,
  ],
  boudoir: [
    `${MUSIC_DIR}/boudoir_track_1.wav`,
    `${MUSIC_DIR}/boudoir_track_2.wav`,
    `${MUSIC_DIR}/boudoir_track_3.wav`,
  ],
  golden: [
    `${MUSIC_DIR}/goldenHour_track_1.wav`,
    `${MUSIC_DIR}/goldenHour_track_2.wav`,
    `${MUSIC_DIR}/goldenHour_track_3.wav`,
  ]
};

// ═══════════════════════════════════════════════════════════════════
// ARTISTIC CAPTIONS - Intimate Sensual Poetry
// ═══════════════════════════════════════════════════════════════════

const CAPTIONS = {
  cyberpunkNoir: `Electric shadows dance on skin 💙⚡

Where neon meets noir. Where future meets forbidden. The city breathes blue light into intimate spaces.

Cyberpunk dreams made flesh.

Electric Shadows | VERALABS Fusion

#VERALABS #CyberpunkAesthetic #NeonNoir #ElectricBlue #IntimateArt #FuturisticBoudoir #NeonLights #DarkAesthetic #SensualArt #UrbanIntimate #BlueNeon #CyberBeauty #NightVibes #ArtisticPhotography #MuseumQuality`,

  neonVelvet: `Velvet nights glow magenta 💜✨

Touch becomes color. Skin becomes canvas. In the neon haze, intimacy finds new wavelengths.

Soft. Electric. Unforgettable.

Magenta Dreams | VERALABS Fusion

#VERALABS #NeonVelvet #MagentaMood #SensualNeon #IntimatePortrait #VelvetNights #NeonAesthetic #BoudoirArt #PinkNeon #DreamyVibes #SoftGlow #ElectricBeauty #NightAesthetic #ArtisticNude #ContemporaryArt`,

  midnightElectric: `Midnight pulses azure 🔵⚡

The deepest hour wears electric blue. Shadows deepen. Highlights electrify. Bodies become light sculptures.

Midnight's electric embrace.

Azure Glow | VERALABS Fusion

#VERALABS #MidnightElectric #AzureGlow #BlueHour #NeonBoudoir #ElectricIntimacy #SensualShadows #NightPhotography #BlueAesthetic #IntimateArt #GlowingBeauty #MuseumQuality #CinematicArt #DarkBeauty #ArtCollector`,

  goldenNeon: `Gold meets glow 🥂⚡

Champagne warmth kissed by electric cool. The perfect temperature for intimate revelations.

Luxe. Luminous. Legendary.

Champagne Electric | VERALABS Fusion

#VERALABS #GoldenNeon #ChampagneVibes #LuxuryBoudoir #WarmGlow #ElectricGold #IntimatePortrait #SensualArt #GoldenHour #NeonAccents #HighEndArt #BoudoirPhotography #ArtisticExpression #FemininePower #EditorialArt`,

  obsidianGlow: `From darkness, desire emerges 🖤🔥

Obsidian depths. Ember highlights. Where shadow reigns supreme and light is sacred revelation.

The art of almost invisible.

Shadow Fire | VERALABS Fusion

#VERALABS #ObsidianGlow #DarkAesthetic #ShadowArt #IntimateNoir #SensualDarkness #DeepShadows #ArtisticNude #BlackAesthetic #MysteriousBeauty #MuseumQuality #DramaticLighting #ContemporaryArt #FineArtNude #IntimateArt`,

  holographicDream: `Reality shifts prismatic 🌈✨

Colors that don't exist in nature. Beauty that transcends dimension. Holographic intimacy for digital dreamers.

See beyond the spectrum.

Prismatic | VERALABS Fusion

#VERALABS #HolographicDream #PrismaticBeauty #IridescentArt #DreamyAesthetic #ColorShift #SensualSurreal #FuturisticArt #RainbowGlow #IntimateFantasy #ArtisticVision #ConceptualArt #BeyondReality #MuseumQuality #DigitalAge`
};

// ═══════════════════════════════════════════════════════════════════
// REEL CONFIGURATIONS - Curated Fusion Experiences
// ═══════════════════════════════════════════════════════════════════

const REEL_CONFIGS = [
  {
    id: 'cyberpunk_noir_fusion',
    name: 'Cyberpunk Noir Fusion',
    grade: 'cyberpunkNoir',
    music: 'midnight',
    // Alternate between images and videos
    sequence: [
      { type: 'image', index: 0, duration: 5 },  // Neon bar
      { type: 'video', index: 0, duration: 6 },  // Chiaroscuro sensuality
      { type: 'image', index: 3, duration: 5 },  // Crystal jewelry neon
      { type: 'video', index: 3, duration: 6 },  // Ethereal intimacy
      { type: 'image', index: 9, duration: 5 },  // Neon bedroom
    ],
    transitionDuration: 1,
  },
  {
    id: 'neon_velvet_dreams',
    name: 'Neon Velvet Dreams',
    grade: 'neonVelvet',
    music: 'boudoir',
    sequence: [
      { type: 'image', index: 3, duration: 5 },
      { type: 'video', index: 1, duration: 6 },
      { type: 'image', index: 4, duration: 5 },
      { type: 'video', index: 4, duration: 6 },
      { type: 'image', index: 6, duration: 5 },
    ],
    transitionDuration: 1.2,
  },
  {
    id: 'midnight_electric_pulse',
    name: 'Midnight Electric Pulse',
    grade: 'midnightElectric',
    music: 'midnight',
    sequence: [
      { type: 'image', index: 9, duration: 5 },
      { type: 'video', index: 2, duration: 6 },
      { type: 'image', index: 0, duration: 5 },
      { type: 'video', index: 6, duration: 6 },
      { type: 'image', index: 5, duration: 5 },
    ],
    transitionDuration: 1,
  },
  {
    id: 'golden_neon_luxe',
    name: 'Golden Neon Luxe',
    grade: 'goldenNeon',
    music: 'golden',
    sequence: [
      { type: 'image', index: 10, duration: 5 }, // Luxury bathroom
      { type: 'video', index: 7, duration: 6 },  // Rustic boudoir
      { type: 'image', index: 7, duration: 5 },
      { type: 'video', index: 5, duration: 6 },
      { type: 'image', index: 8, duration: 5 },
    ],
    transitionDuration: 1.2,
  },
  {
    id: 'obsidian_glow_intimate',
    name: 'Obsidian Glow Intimate',
    grade: 'obsidianGlow',
    music: 'midnight',
    sequence: [
      { type: 'video', index: 0, duration: 6 },
      { type: 'image', index: 1, duration: 5 },
      { type: 'video', index: 2, duration: 6 },
      { type: 'image', index: 2, duration: 5 },
      { type: 'video', index: 3, duration: 6 },
    ],
    transitionDuration: 0.8,
  },
  {
    id: 'holographic_sensual_dream',
    name: 'Holographic Sensual Dream',
    grade: 'holographicDream',
    music: 'golden',
    sequence: [
      { type: 'image', index: 4, duration: 5 },
      { type: 'image', index: 5, duration: 5 },
      { type: 'video', index: 4, duration: 6 },
      { type: 'image', index: 3, duration: 5 },
      { type: 'video', index: 1, duration: 6 },
    ],
    transitionDuration: 1.5,
  },
];

// ═══════════════════════════════════════════════════════════════════
// VIDEO PROCESSING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function log(msg) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${msg}`);
}

function runFFmpeg(args, description) {
  return new Promise((resolve, reject) => {
    log(`   → ${description}`);
    const proc = spawn(FFMPEG, args, { stdio: ['pipe', 'pipe', 'pipe'] });

    let stderr = '';
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg failed: ${stderr.slice(-500)}`));
      }
    });
  });
}

/**
 * Convert image to video with Ken Burns zoom effect
 */
async function imageToVideo(imagePath, outputPath, duration, grade) {
  const gradeConfig = FUSION_GRADES[grade];

  // Ken Burns: subtle zoom from 1.0 to 1.08 with slight pan
  const zoomSpeed = 0.0004;
  const filters = [
    `scale=8000:-1`,
    `zoompan=z='min(zoom+${zoomSpeed},1.08)':d=${duration * 24}:x='iw/2-(iw/zoom/2)+sin(on/80)*20':y='ih/2-(ih/zoom/2)+cos(on/60)*15':s=1080x1920:fps=24`,
    gradeConfig.filter,
    gradeConfig.grain,
    gradeConfig.vignette,
  ].join(',');

  const args = [
    '-y',
    '-loop', '1',
    '-i', imagePath,
    '-vf', filters,
    '-t', String(duration),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    outputPath
  ];

  await runFFmpeg(args, `Image → Video (Ken Burns ${duration}s)`);
}

/**
 * Process video clip with fusion grade
 */
async function processVideoClip(inputPath, outputPath, duration, grade) {
  const gradeConfig = FUSION_GRADES[grade];

  const filters = [
    'crop=in_w:in_h-40:0:0',  // Remove Veo watermark
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    gradeConfig.filter,
    gradeConfig.grain,
    gradeConfig.vignette,
  ].join(',');

  const args = [
    '-y',
    '-i', inputPath,
    '-t', String(duration),
    '-vf', filters,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-an',
    outputPath
  ];

  await runFFmpeg(args, `Video clip (${duration}s)`);
}

/**
 * Concatenate clips with crossfade transitions
 */
async function concatenateWithTransitions(clipPaths, outputPath, transitionDuration) {
  if (clipPaths.length === 1) {
    fs.copyFileSync(clipPaths[0], outputPath);
    return;
  }

  // Build complex filter for xfade transitions
  let filterComplex = '';
  let lastOutput = '0:v';

  for (let i = 1; i < clipPaths.length; i++) {
    const offset = i * 5 - transitionDuration * (i - 1) - transitionDuration;
    const outputLabel = i === clipPaths.length - 1 ? 'outv' : `v${i}`;
    filterComplex += `[${lastOutput}][${i}:v]xfade=transition=fade:duration=${transitionDuration}:offset=${Math.max(0, offset)}[${outputLabel}];`;
    lastOutput = outputLabel;
  }

  // Remove trailing semicolon
  filterComplex = filterComplex.slice(0, -1);

  const inputArgs = clipPaths.flatMap(p => ['-i', p]);

  const args = [
    '-y',
    ...inputArgs,
    '-filter_complex', filterComplex,
    '-map', '[outv]',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    outputPath
  ];

  try {
    await runFFmpeg(args, `Crossfade transitions (${transitionDuration}s)`);
  } catch (error) {
    // Fallback to simple concat if xfade fails
    log(`   ⚠️ Xfade failed, using simple concat`);
    const concatFile = '/tmp/veralabs_concat.txt';
    fs.writeFileSync(concatFile, clipPaths.map(p => `file '${p}'`).join('\n'));

    const fallbackArgs = [
      '-y',
      '-f', 'concat',
      '-safe', '0',
      '-i', concatFile,
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '18',
      outputPath
    ];

    await runFFmpeg(fallbackArgs, 'Simple concatenation');
  }
}

/**
 * Add VERALABS animated signature
 */
async function addAnimatedSignature(inputPath, outputPath) {
  // Fade in signature with glow effect
  const drawtext = "drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=38:fontcolor=white@0.92:shadowcolor=cyan@0.4:shadowx=2:shadowy=2:x=w-tw-45:y=h-th-45:enable='gte(t,0.5)'";

  const args = [
    '-y',
    '-i', inputPath,
    '-vf', drawtext,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-c:a', 'copy',
    outputPath
  ];

  await runFFmpeg(args, 'Adding VERALABS animated signature');
}

/**
 * Add sensual music with professional audio mixing
 */
async function addSensualMusic(videoPath, musicPath, outputPath) {
  // Get video duration
  const durationCmd = `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`;
  const durationStr = execSync(durationCmd).toString().trim();
  const parts = durationStr.split(':');
  const duration = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);

  const fadeOutStart = Math.max(0, duration - 4);

  // Professional audio: fade in, sustain, fade out with subtle volume
  const audioFilter = `[1:a]afade=t=in:st=0:d=3,afade=t=out:st=${fadeOutStart}:d=4,volume=0.35,acompressor=threshold=-20dB:ratio=4:attack=5:release=50[a]`;

  const args = [
    '-y',
    '-i', videoPath,
    '-i', musicPath,
    '-filter_complex', audioFilter,
    '-map', '0:v',
    '-map', '[a]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ];

  await runFFmpeg(args, 'Adding sensual music with pro mixing');
}

/**
 * Extract cinematic thumbnail
 */
async function extractThumbnail(videoPath, outputPath) {
  const args = [
    '-y',
    '-i', videoPath,
    '-ss', '6',  // Extract at 6 seconds for best composition
    '-vframes', '1',
    '-q:v', '2',
    outputPath
  ];

  await runFFmpeg(args, 'Extracting cinematic thumbnail');
}

/**
 * Generate a complete Neon-Chiaroscuro Fusion reel
 */
async function generateFusionReel(config) {
  const timestamp = Date.now();
  const reelId = `fusion_${config.id}_${timestamp}`;

  log(`\n${'═'.repeat(70)}`);
  log(`🎬 GENERATING: ${config.name}`);
  log(`${'═'.repeat(70)}`);
  log(`   Grade: ${FUSION_GRADES[config.grade].name}`);
  log(`   Music: ${config.music}`);
  log(`   Sequences: ${config.sequence.length} segments`);

  const tempDir = `/tmp/veralabs_fusion_${reelId}`;
  fs.mkdirSync(tempDir, { recursive: true });

  // Step 1: Process each segment
  const processedClips = [];
  for (let i = 0; i < config.sequence.length; i++) {
    const segment = config.sequence[i];
    const clipOutput = `${tempDir}/segment_${i}.mp4`;

    if (segment.type === 'image') {
      const imagePath = NEW3_IMAGES[segment.index];
      if (!imagePath || !fs.existsSync(imagePath)) {
        log(`   ⚠️ Skipping missing image: index ${segment.index}`);
        continue;
      }
      log(`   🖼️  Processing image ${i + 1}: ${path.basename(imagePath)}`);
      await imageToVideo(imagePath, clipOutput, segment.duration, config.grade);
    } else {
      const videoPath = NEW2_VIDEOS[segment.index];
      if (!videoPath || !fs.existsSync(videoPath)) {
        log(`   ⚠️ Skipping missing video: index ${segment.index}`);
        continue;
      }
      log(`   📹 Processing video ${i + 1}: ${path.basename(videoPath)}`);
      await processVideoClip(videoPath, clipOutput, segment.duration, config.grade);
    }

    processedClips.push(clipOutput);
  }

  if (processedClips.length === 0) {
    throw new Error('No clips processed successfully');
  }

  // Step 2: Concatenate with smooth transitions
  const concatenatedPath = `${tempDir}/concatenated.mp4`;
  log(`   🔗 Creating smooth transitions (${config.transitionDuration}s crossfade)`);
  await concatenateWithTransitions(processedClips, concatenatedPath, config.transitionDuration);

  // Step 3: Add animated signature
  const signedPath = `${tempDir}/signed.mp4`;
  await addAnimatedSignature(concatenatedPath, signedPath);

  // Step 4: Add sensual music
  const musicTracks = MUSIC_TRACKS[config.music];
  const selectedMusic = musicTracks[Math.floor(Math.random() * musicTracks.length)];
  const finalPath = `${OUTPUT_DIR}/${reelId}.mp4`;

  log(`   🎵 Adding: ${path.basename(selectedMusic)}`);
  await addSensualMusic(signedPath, selectedMusic, finalPath);

  // Step 5: Extract thumbnail
  const thumbPath = `${OUTPUT_DIR}/${reelId}_thumb.jpg`;
  await extractThumbnail(finalPath, thumbPath);

  // Get file size
  const stats = fs.statSync(finalPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  // Cleanup temp files
  fs.rmSync(tempDir, { recursive: true, force: true });

  log(`\n   ✅ COMPLETE: ${reelId}`);
  log(`   📁 Size: ${sizeMB} MB`);
  log(`   🖼️  Thumbnail: ${path.basename(thumbPath)}`);

  return {
    id: reelId,
    name: config.name,
    grade: config.grade,
    gradeName: FUSION_GRADES[config.grade].name,
    videoPath: finalPath,
    thumbnailPath: thumbPath,
    caption: CAPTIONS[config.grade],
    size: stats.size,
    sizeMB: sizeMB
  };
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║          ⚡ NEON-CHIAROSCURO INTIMATE FUSION ⚡                          ║
║                                                                          ║
║     Blending Electric Neon with Classical Shadow Mastery                 ║
║     Images + Videos | Smooth Transitions | Sensual Music                 ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  const results = [];

  for (const config of REEL_CONFIGS) {
    try {
      const result = await generateFusionReel(config);
      results.push(result);
    } catch (error) {
      log(`❌ Error generating ${config.name}: ${error.message}`);
    }
  }

  // Save metadata
  const metadataPath = `${OUTPUT_DIR}/fusion_metadata_${Date.now()}.json`;
  fs.writeFileSync(metadataPath, JSON.stringify({
    created: new Date().toISOString(),
    series: 'VERALABS Neon-Chiaroscuro Intimate Fusion',
    reels: results
  }, null, 2));

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                        FUSION GENERATION COMPLETE                         ║
╠══════════════════════════════════════════════════════════════════════════╣`);

  results.forEach((r, i) => {
    console.log(`║  ${i + 1}. ${r.name.padEnd(30)} │ ${r.sizeMB.padStart(6)} MB`);
  });

  console.log(`╠══════════════════════════════════════════════════════════════════════════╣
║  Total Reels: ${results.length}                                                          ║
║  Output: ${OUTPUT_DIR.slice(-55).padEnd(55)}     ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);
}

main().catch(console.error);
