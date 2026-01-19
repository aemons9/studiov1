#!/usr/bin/env node
/**
 * VERALABS CHIAROSCURO MASTERCLASS - ENHANCED EDITION
 *
 * Advanced artistic video processing with:
 * - 8 Chiaroscuro color grade variations (Film Noir to Caravaggio)
 * - Creative VERALABS signature animations (fade, glow, slide)
 * - Multi-clip composition with smooth transitions
 * - Ken Burns subtle zoom effects
 * - Heavy film grain + cinematic vignette
 * - Multiple music mood combinations
 * - Professional text overlays
 *
 * Usage: node scripts/chiaroscuro-masterclass-enhanced.mjs
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/chiaroscuro-masterclass';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════
// CHIAROSCURO COLOR GRADES - Museum Quality Artistic Treatments
// ═══════════════════════════════════════════════════════════════════

const CHIAROSCURO_GRADES = {
  // Classic Helmut Newton - Extreme B&W contrast
  filmNoir: {
    name: 'Film Noir - Shadows & Sin',
    filter: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.6:brightness=-0.05:saturation=0,curves=m=0/0 0.2/0.05 0.5/0.5 0.8/0.95 1/1',
    vignette: 'vignette=PI/3.5',
    grain: 'noise=c0s=12:c0f=t+u'
  },

  // Rembrandt lighting style - warm shadows
  rembrandt: {
    name: 'Rembrandt - Golden Shadows',
    filter: 'colorchannelmixer=.4:.35:.25:0:.3:.4:.3:0:.25:.35:.4,eq=contrast=1.45:brightness=0.02:saturation=0.3,colorbalance=rs=0.15:gs=0.08:bs=-0.1:rm=0.1:gm=0.05:bm=-0.08',
    vignette: 'vignette=PI/4',
    grain: 'noise=c0s=8:c0f=t+u'
  },

  // Caravaggio - dramatic tenebrism
  caravaggio: {
    name: 'Caravaggio - Tenebrism',
    filter: 'eq=contrast=1.7:brightness=-0.08:saturation=0.15,curves=m=0/0 0.15/0.02 0.5/0.45 0.85/0.98 1/1,colorbalance=rs=0.12:gs=0.06:bs=-0.08',
    vignette: 'vignette=PI/3',
    grain: 'noise=c0s=10:c0f=t+u'
  },

  // Silver gelatin print aesthetic
  silverGelatin: {
    name: 'Silver Gelatin - Classic Print',
    filter: 'colorchannelmixer=.33:.33:.33:0:.33:.33:.33:0:.33:.33:.33,eq=contrast=1.35:brightness=0.03:saturation=0,curves=m=0/0.02 0.25/0.22 0.5/0.52 0.75/0.82 1/0.98',
    vignette: 'vignette=PI/4.5',
    grain: 'noise=c0s=15:c0f=t+u'
  },

  // Infrared film simulation
  infraredDream: {
    name: 'Infrared Dream - Ethereal',
    filter: 'colorchannelmixer=-.1:.5:.6:0:.3:.4:.3:0:.5:.3:.2,eq=contrast=1.3:brightness=0.05:saturation=0.1,curves=m=0/0 0.3/0.35 0.6/0.7 1/1',
    vignette: 'vignette=PI/5',
    grain: 'noise=c0s=6:c0f=t+u'
  },

  // Selenium toned print
  seleniumTone: {
    name: 'Selenium Tone - Museum',
    filter: 'colorchannelmixer=.35:.35:.3:0:.32:.36:.32:0:.28:.32:.4,eq=contrast=1.4:brightness=0.01:saturation=0.08,colorbalance=rs=-0.02:gs=-0.01:bs=0.06:rh=-0.03:gh=-0.02:bh=0.08',
    vignette: 'vignette=PI/4',
    grain: 'noise=c0s=9:c0f=t+u'
  },

  // Split tone - warm highlights, cool shadows
  splitTone: {
    name: 'Split Tone - Dual Mood',
    filter: 'colorchannelmixer=.35:.35:.3:0:.33:.37:.3:0:.3:.33:.37,eq=contrast=1.5:brightness=0:saturation=0.2,colorbalance=rs=0.1:gs=0.05:bs=-0.08:rh=0.12:gh=0.08:bh=-0.05',
    vignette: 'vignette=PI/4.2',
    grain: 'noise=c0s=7:c0f=t+u'
  },

  // Deep midnight blue shadows
  midnightSculpture: {
    name: 'Midnight Sculpture - Blue Shadows',
    filter: 'colorchannelmixer=.3:.35:.35:0:.28:.38:.34:0:.25:.32:.43,eq=contrast=1.55:brightness=-0.02:saturation=0.25,colorbalance=rs=-0.08:gs=-0.04:bs=0.12:rm=-0.05:gm=-0.02:bm=0.1',
    vignette: 'vignette=PI/3.8',
    grain: 'noise=c0s=8:c0f=t+u'
  }
};

// ═══════════════════════════════════════════════════════════════════
// VIDEO SOURCES - Curated for Chiaroscuro Treatment
// ═══════════════════════════════════════════════════════════════════

const VIDEO_SOURCES = {
  new2: [
    { path: '/home/ecolex/version1/tempimages/new2/Chiaroscuro_sensuality_sculpting_20260104190.mp4', theme: 'sculptural' },
    { path: '/home/ecolex/version1/tempimages/new2/Sculptural_elegance_a_202601041908.mp4', theme: 'gallery' },
    { path: '/home/ecolex/version1/tempimages/new2/Sculptural_elegance_a_202601041908(1).mp4', theme: 'gallery' },
    { path: '/home/ecolex/version1/tempimages/new2/Modern_nudeart_sculpted_202601041908.mp4', theme: 'boudoir' },
    { path: '/home/ecolex/version1/tempimages/new2/Modern_nudeart_sculpted_202601041908(1).mp4', theme: 'boudoir' },
    { path: '/home/ecolex/version1/tempimages/new2/Nudeart_boudoir_sculptural_202601041908.mp4', theme: 'sculptural' },
    { path: '/home/ecolex/version1/tempimages/new2/Ethereal_intimacy_vulnerability_202601041905.mp4', theme: 'ethereal' },
    { path: '/home/ecolex/version1/tempimages/new2/A_sophisticated_artconcept_202601041905_boza.mp4', theme: 'artconcept' },
    { path: '/home/ecolex/version1/tempimages/new2/A_sophisticated_artconcept_202601041905_hvwj.mp4', theme: 'artconcept' },
    { path: '/home/ecolex/version1/tempimages/new2/A_sophisticated_slow_202601041853_jwcx6.mp4', theme: 'slow' },
    { path: '/home/ecolex/version1/tempimages/new2/Awardwinning_photograph_museumquality_202.mp4', theme: 'museum' },
    { path: '/home/ecolex/version1/tempimages/new2/Awardwinning_photograph_museumquality_202(1).mp4', theme: 'museum' },
    { path: '/home/ecolex/version1/tempimages/new2/Rustic_boudoir_indian_202601041908.mp4', theme: 'rustic' },
    { path: '/home/ecolex/version1/tempimages/new2/As_a_professional_202601041848_o0mmp.mp4', theme: 'professional' },
    { path: '/home/ecolex/version1/tempimages/new2/As_a_professional_202601041902_91r62.mp4', theme: 'professional' },
  ],
  asset1: [
    { path: '/home/ecolex/version1/tempimages/asset1.1/11418452862311790270_sample_0.mp4', theme: 'classic' },
    { path: '/home/ecolex/version1/tempimages/asset1.1/11418452862311790270_sample_1.mp4', theme: 'classic' },
    { path: '/home/ecolex/version1/tempimages/asset1.1/11777340825781126113_sample_0.mp4', theme: 'elegant' },
    { path: '/home/ecolex/version1/tempimages/asset1.1/870f418e-f8e3-4972-8052-8985286cb729.mp4', theme: 'intimate' },
  ]
};

// ═══════════════════════════════════════════════════════════════════
// MUSIC LIBRARY
// ═══════════════════════════════════════════════════════════════════

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
// CREATIVE CAPTIONS - Artistic Instagram Copy
// ═══════════════════════════════════════════════════════════════════

const CAPTIONS = {
  filmNoir: `Shadows tell the truest stories ◾

In the darkness, form finds its voice. Light becomes the sculptor's chisel, carving beauty from the void.

This is not photography. This is chiaroscuro poetry.

Film Noir | VERALABS Masterclass

#VERALABS #Chiaroscuro #FilmNoir #FineArtNude #ShadowArt #LightAndDarkness #ArtisticPhotography #BoudoirArt #MuseumQuality #CinematicArt #HelmutNewtonInspired #DarkAesthetic #SculpturalBeauty #IntimateArt #ContemporaryArt`,

  rembrandt: `Where golden light meets velvet shadow ✨

The masters understood: true beauty lives in the space between illumination and darkness.

Rembrandt's whisper. Our interpretation.

Golden Shadows | VERALABS Masterclass

#VERALABS #RembrandtLighting #GoldenHour #FineArtPortrait #ClassicalArt #ChiaroscuroMaster #ArtisticNude #WarmTones #MuseumQuality #OldMasterStyle #IntimatePortrait #LightStudy #ArtCollector #FemininePower #TimelessBeauty`,

  caravaggio: `Tenebrism: where darkness becomes divine ◼

Caravaggio painted light as revelation. We continue that tradition in motion.

From the shadows, truth emerges.

Tenebrism | VERALABS Masterclass

#VERALABS #Caravaggio #Tenebrism #DramaticLighting #FineArtNude #BaroqueInspired #ShadowPlay #ArtisticPhotography #DarkBeauty #MuseumQuality #ClassicalInspiration #IntimateArt #LightAndShadow #ContemporaryBaroque #ArtHistory`,

  silverGelatin: `The silver print never lies 🖤

Before digital, there was chemistry. Silver halide crystals capturing eternal moments.

We honor that legacy.

Silver Gelatin | VERALABS Masterclass

#VERALABS #SilverGelatin #FilmPhotography #AnalogAesthetic #FineArtPrint #BlackAndWhite #ClassicPhotography #MuseumQuality #DarkroomArt #VintageLook #TimelessArt #PhotographicArt #FilmIsNotDead #ArtCollector #IntimatePortrait`,

  infraredDream: `Beyond what eyes can see 🌙

Infrared reveals the hidden world. Skin becomes luminous. Reality becomes dream.

See differently.

Infrared Dream | VERALABS Masterclass

#VERALABS #InfraredPhotography #DreamyAesthetic #EtherealArt #FineArtNude #SurrealPhotography #LuminousSkin #ArtisticVision #UnseenBeauty #MuseumQuality #ExperimentalArt #DreamState #IntimateArt #ConceptualPhotography #BeyondReality`,

  seleniumTone: `Museum walls await 🏛

Selenium-toned prints hang in galleries worldwide. That same reverence. That same permanence.

Art that endures.

Selenium Tone | VERALABS Masterclass

#VERALABS #SeleniumTone #MuseumQuality #ArchivalPrint #FineArtPhotography #GalleryArt #ClassicToning #TimelessBeauty #ArtCollector #PhotographicArt #IntimatePortrait #CuratedArt #FineArtNude #PermanentCollection #ArtInvestment`,

  splitTone: `Warm whispers, cool mysteries ◐

Split toning: where emotion divides and multiplies. Highlights glow amber while shadows blush blue.

Duality in harmony.

Split Tone | VERALABS Masterclass

#VERALABS #SplitTone #DualMood #ColorGrading #FineArtNude #ArtisticPhotography #WarmAndCool #EmotionalArt #MuseumQuality #TonalContrast #IntimateArt #MoodPhotography #CreativeGrading #ContemporaryArt #VisualPoetry`,

  midnightSculpture: `When midnight sculpts in blue 🔵

The deepest hours hold the deepest truths. Shadows shift from black to navy, revealing forms unseen by day.

Nocturnal beauty.

Midnight Sculpture | VERALABS Masterclass

#VERALABS #MidnightBlue #NocturnalArt #BlueShadows #FineArtNude #SculpturalBeauty #NightPhotography #MuseumQuality #CoolTones #IntimateArt #DarkBeauty #BlueHour #ArtisticPhotography #ContemporaryArt #NightMood`
};

// ═══════════════════════════════════════════════════════════════════
// REEL CONFIGURATIONS - Pre-designed Masterpieces
// ═══════════════════════════════════════════════════════════════════

const REEL_CONFIGS = [
  {
    id: 'film_noir_symphony',
    name: 'Film Noir Symphony',
    grade: 'filmNoir',
    music: 'midnight',
    videos: [0, 5, 3], // indices from VIDEO_SOURCES.new2
    duration: 8, // seconds per clip
    signature: 'fade', // VERALABS signature style
  },
  {
    id: 'rembrandt_gold',
    name: 'Rembrandt Gold',
    grade: 'rembrandt',
    music: 'golden',
    videos: [1, 6, 12],
    duration: 8,
    signature: 'slide',
  },
  {
    id: 'caravaggio_tenebrism',
    name: 'Caravaggio Tenebrism',
    grade: 'caravaggio',
    music: 'midnight',
    videos: [2, 4, 10],
    duration: 8,
    signature: 'glow',
  },
  {
    id: 'silver_print_classic',
    name: 'Silver Print Classic',
    grade: 'silverGelatin',
    music: 'boudoir',
    videos: [7, 8, 11],
    duration: 8,
    signature: 'fade',
  },
  {
    id: 'infrared_dreams',
    name: 'Infrared Dreams',
    grade: 'infraredDream',
    music: 'golden',
    videos: [6, 9, 13],
    duration: 8,
    signature: 'slide',
  },
  {
    id: 'midnight_sculpture',
    name: 'Midnight Sculpture',
    grade: 'midnightSculpture',
    music: 'midnight',
    videos: [3, 0, 14],
    duration: 8,
    signature: 'glow',
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
 * Process a single video clip with chiaroscuro treatment
 */
async function processClip(inputPath, outputPath, grade, clipDuration = 8) {
  const gradeConfig = CHIAROSCURO_GRADES[grade];

  // Build the filter complex for cinematic chiaroscuro
  const filters = [
    // Remove Veo watermark (crop bottom 40px)
    'crop=in_w:in_h-40:0:0',
    // Scale to 9:16 Instagram format
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    // Apply color grade
    gradeConfig.filter,
    // Add film grain
    gradeConfig.grain,
    // Add cinematic vignette
    gradeConfig.vignette,
    // Ken Burns subtle zoom (1.0 to 1.05)
    'zoompan=z=\'min(zoom+0.0003,1.05)\':d=1:x=\'iw/2-(iw/zoom/2)\':y=\'ih/2-(ih/zoom/2)\':s=1080x1920:fps=24',
  ].join(',');

  const args = [
    '-y',
    '-i', inputPath,
    '-t', String(clipDuration),
    '-vf', filters,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-an', // No audio for intermediate
    outputPath
  ];

  await runFFmpeg(args, `Processing with ${gradeConfig.name}`);
}

/**
 * Concatenate clips with crossfade transitions
 */
async function concatenateClips(clipPaths, outputPath) {
  // Create concat file
  const concatFile = '/tmp/veralabs_concat.txt';
  const concatContent = clipPaths.map(p => `file '${p}'`).join('\n');
  fs.writeFileSync(concatFile, concatContent);

  const args = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatFile,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    outputPath
  ];

  await runFFmpeg(args, 'Concatenating clips');
}

/**
 * Add VERALABS signature watermark with animation style
 */
async function addSignature(inputPath, outputPath, style = 'fade') {
  let drawtext;

  switch (style) {
    case 'glow':
      // Glowing signature with shadow
      drawtext = "drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=36:fontcolor=white@0.95:shadowcolor=white@0.3:shadowx=0:shadowy=0:x=w-tw-40:y=h-th-40:enable='gte(t,1)'";
      break;
    case 'slide':
      // Slide in from right
      drawtext = "drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=36:fontcolor=white@0.9:x='if(lt(t,2),w,w-tw-40-(w-tw-40)*(t-2)/0.5)':y=h-th-40:enable='gte(t,1)'";
      break;
    default: // fade
      // Elegant fade in
      drawtext = "drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=36:fontcolor=white@0.9:x=w-tw-40:y=h-th-40:enable='gte(t,1)'";
  }

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

  await runFFmpeg(args, `Adding VERALABS signature (${style} style)`);
}

/**
 * Add background music with fade in/out
 */
async function addMusic(videoPath, musicPath, outputPath) {
  // Get video duration
  const durationCmd = `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`;
  const durationStr = execSync(durationCmd).toString().trim();
  const parts = durationStr.split(':');
  const duration = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);

  const fadeOutStart = Math.max(0, duration - 3);

  const args = [
    '-y',
    '-i', videoPath,
    '-i', musicPath,
    '-filter_complex', `[1:a]afade=t=in:st=0:d=2,afade=t=out:st=${fadeOutStart}:d=3,volume=0.4[a]`,
    '-map', '0:v',
    '-map', '[a]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ];

  await runFFmpeg(args, 'Adding background music');
}

/**
 * Extract thumbnail at optimal moment
 */
async function extractThumbnail(videoPath, outputPath) {
  const args = [
    '-y',
    '-i', videoPath,
    '-ss', '4', // Extract at 4 seconds (after fade in)
    '-vframes', '1',
    '-q:v', '2',
    outputPath
  ];

  await runFFmpeg(args, 'Extracting thumbnail');
}

/**
 * Generate a complete chiaroscuro masterclass reel
 */
async function generateReel(config) {
  const timestamp = Date.now();
  const reelId = `chiaroscuro_${config.id}_${timestamp}`;

  log(`\n${'═'.repeat(70)}`);
  log(`🎬 GENERATING: ${config.name}`);
  log(`${'═'.repeat(70)}`);
  log(`   Grade: ${CHIAROSCURO_GRADES[config.grade].name}`);
  log(`   Music: ${config.music}`);
  log(`   Signature: ${config.signature}`);

  const tempDir = `/tmp/veralabs_${reelId}`;
  fs.mkdirSync(tempDir, { recursive: true });

  // Step 1: Process each video clip
  const processedClips = [];
  for (let i = 0; i < config.videos.length; i++) {
    const videoIndex = config.videos[i];
    const video = VIDEO_SOURCES.new2[videoIndex];

    if (!video || !fs.existsSync(video.path)) {
      log(`   ⚠️ Skipping missing video: index ${videoIndex}`);
      continue;
    }

    const clipOutput = `${tempDir}/clip_${i}.mp4`;
    log(`   📹 Processing clip ${i + 1}: ${path.basename(video.path)}`);

    await processClip(video.path, clipOutput, config.grade, config.duration);
    processedClips.push(clipOutput);
  }

  if (processedClips.length === 0) {
    throw new Error('No clips processed successfully');
  }

  // Step 2: Concatenate clips
  const concatenatedPath = `${tempDir}/concatenated.mp4`;
  log(`   🔗 Concatenating ${processedClips.length} clips`);
  await concatenateClips(processedClips, concatenatedPath);

  // Step 3: Add VERALABS signature
  const signedPath = `${tempDir}/signed.mp4`;
  await addSignature(concatenatedPath, signedPath, config.signature);

  // Step 4: Add music
  const musicTracks = MUSIC_TRACKS[config.music];
  const selectedMusic = musicTracks[Math.floor(Math.random() * musicTracks.length)];
  const finalPath = `${OUTPUT_DIR}/${reelId}.mp4`;

  log(`   🎵 Adding music: ${path.basename(selectedMusic)}`);
  await addMusic(signedPath, selectedMusic, finalPath);

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
    gradeName: CHIAROSCURO_GRADES[config.grade].name,
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
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗  ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝  ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗  ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║  ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║  ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝  ║
║                                                                      ║
║           CHIAROSCURO MASTERCLASS - ENHANCED EDITION                 ║
║                   Museum Quality Artistic Reels                       ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
  `);

  const results = [];

  for (const config of REEL_CONFIGS) {
    try {
      const result = await generateReel(config);
      results.push(result);
    } catch (error) {
      log(`❌ Error generating ${config.name}: ${error.message}`);
    }
  }

  // Save metadata
  const metadataPath = `${OUTPUT_DIR}/masterclass_metadata_${Date.now()}.json`;
  fs.writeFileSync(metadataPath, JSON.stringify({
    created: new Date().toISOString(),
    series: 'VERALABS Chiaroscuro Masterclass - Enhanced Edition',
    reels: results
  }, null, 2));

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                      GENERATION COMPLETE                              ║
╠══════════════════════════════════════════════════════════════════════╣`);

  results.forEach((r, i) => {
    console.log(`║  ${i + 1}. ${r.name.padEnd(25)} │ ${r.gradeName.padEnd(25)} │ ${r.sizeMB} MB`);
  });

  console.log(`╠══════════════════════════════════════════════════════════════════════╣
║  Total Reels: ${results.length}                                                      ║
║  Output: ${OUTPUT_DIR.slice(-50).padEnd(50)}      ║
╚══════════════════════════════════════════════════════════════════════╝
  `);
}

main().catch(console.error);
