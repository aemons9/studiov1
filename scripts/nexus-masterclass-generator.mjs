#!/usr/bin/env node
/**
 * VERALABS NEXUS MASTERCLASS GENERATOR
 *
 * Ultra-creative content generation that surpasses all previous work
 * 5 Series: Obsidian Temple, Monsoon Noir, Crystalline Dreams, Velvet Underground, Ethereal Bloom
 *
 * Usage: node scripts/nexus-masterclass-generator.mjs [series] [count]
 * Example: node scripts/nexus-masterclass-generator.mjs obsidian 5
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/nexus-masterclass';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════
// NEXUS COLOR GRADES - Museum Quality Artistic Treatments
// ═══════════════════════════════════════════════════════════════════

const NEXUS_GRADES = {
  // OBSIDIAN TEMPLE - Sacred shadows with terracotta warmth
  obsidianTemple: {
    name: 'Obsidian Temple - Sacred Shadows',
    filter: 'colorchannelmixer=.35:.38:.27:0:.32:.40:.28:0:.28:.34:.38,eq=contrast=1.65:brightness=-0.06:saturation=0.35,colorbalance=rs=0.12:gs=0.06:bs=-0.05:rm=0.08:gm=0.03:bm=-0.03,curves=m=0/0 0.12/0.03 0.5/0.48 0.88/0.96 1/1',
    vignette: 'vignette=PI/2.8',
    grain: 'noise=c0s=14:c0f=t+u',
    mood: 'sacred',
    musicStyle: 'ambient'
  },

  // MONSOON NOIR - Rain shadows with blue-steel tones
  monsoonNoir: {
    name: 'Monsoon Noir - Rain Shadows',
    filter: 'colorchannelmixer=.28:.32:.40:0:.25:.35:.40:0:.22:.30:.48,eq=contrast=1.55:brightness=-0.04:saturation=0.25,colorbalance=rs=-0.08:gs=-0.04:bs=0.12:rm=-0.06:gm=-0.02:bm=0.10,curves=m=0/0 0.15/0.06 0.5/0.52 0.85/0.94 1/1',
    vignette: 'vignette=PI/3.2',
    grain: 'noise=c0s=11:c0f=t+u',
    mood: 'mysterious',
    musicStyle: 'midnight'
  },

  // CRYSTALLINE DREAMS - Luminous whites with champagne warmth
  crystallineDreams: {
    name: 'Crystalline Dreams - Luminous',
    filter: 'eq=contrast=1.25:brightness=0.08:saturation=0.15,curves=m=0/0.05 0.3/0.35 0.5/0.55 0.7/0.78 1/1,colorbalance=rs=0.02:gs=0.01:bs=-0.02:rh=0.03:gh=0.02:bh=-0.01',
    vignette: 'vignette=PI/6',
    grain: 'noise=c0s=4:c0f=t+u',
    mood: 'ethereal',
    musicStyle: 'golden'
  },

  // VELVET UNDERGROUND - Deep burgundy with gold accents
  velvetUnderground: {
    name: 'Velvet Underground - Burgundy Noir',
    filter: 'colorchannelmixer=.45:.30:.25:0:.35:.40:.25:0:.28:.32:.40,eq=contrast=1.5:brightness=-0.03:saturation=0.55,colorbalance=rs=0.18:gs=-0.02:bs=-0.06:rm=0.12:gm=-0.01:bm=-0.04,curves=r=0/0 0.5/0.55 1/1',
    vignette: 'vignette=PI/3.5',
    grain: 'noise=c0s=9:c0f=t+u',
    mood: 'sultry',
    musicStyle: 'boudoir'
  },

  // ETHEREAL BLOOM - Natural gold with organic warmth
  etherealBloom: {
    name: 'Ethereal Bloom - Natural Gold',
    filter: 'eq=contrast=1.2:brightness=0.05:saturation=0.45,colorbalance=rs=0.08:gs=0.06:bs=-0.06:rm=0.06:gm=0.04:bm=-0.04:rh=0.04:gh=0.03:bh=-0.02,curves=m=0/0.03 0.35/0.38 0.5/0.53 0.75/0.8 1/0.98',
    vignette: 'vignette=PI/5',
    grain: 'noise=c0s=5:c0f=t+u',
    mood: 'natural',
    musicStyle: 'golden'
  }
};

// ═══════════════════════════════════════════════════════════════════
// NEXUS SERIES DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

const NEXUS_SERIES = {
  obsidian: {
    id: 'obsidian_temple',
    name: 'Obsidian Temple',
    grade: 'obsidianTemple',
    caption: `Ancient shadows whisper sacred truths 🕉️

Where temple stone meets mortal form. Where darkness becomes divine. The sacred feminine emerges from obsidian depths.

This is not photography. This is pilgrimage.

Obsidian Temple | VERALABS NEXUS

#VERALABS #ObsidianTemple #IndianAesthetic #TempleArt #FineArtNude #ChiaroscuroMaster #AncientModern #SacredFeminine #MuseumQuality #ContemporaryArt`,
    firstComment: `Sacred geometry meets contemporary vision.

#IndianHeritage #BoudoirArt #ShadowPlay #GoldenHour #BodyAsCanvas #ArtisticNude #FineArtNude #SensualArt #PhotographyArt #VisualPoetry`
  },

  monsoon: {
    id: 'monsoon_noir',
    name: 'Monsoon Noir',
    grade: 'monsoonNoir',
    caption: `Rain washes truth onto skin 🌧️

In the monsoon's embrace, pretense dissolves. Water reveals what clothes conceal. The city drowns in desire.

Every drop a confession.

Monsoon Noir | VERALABS NEXUS

#VERALABS #MonsoonNoir #RainPhotography #WetAesthetic #NoirPhotography #CinematicArt #UrbanIntimate #MonsoonMagic #DarkBeauty #ArtisticPhotography`,
    firstComment: `Where rain becomes revelation.

#WetLook #StormyNight #CinematicPortrait #MoodyPhotography #WaterAesthetic #IntimateArt #RainDance #UrbanNoir #Petrichor #SensualArt`
  },

  crystalline: {
    id: 'crystalline_dreams',
    name: 'Crystalline Dreams',
    grade: 'crystallineDreams',
    caption: `Infinite reflections of desire ✨

Mirror upon mirror. Light upon light. In the crystalline realm, one becomes many. Many become eternal.

Luxury is a state of being.

Crystalline Dreams | VERALABS NEXUS

#VERALABS #CrystallineDreams #LuxuryBoudoir #MirrorArt #HighEndArt #ReflectionPhotography #WhiteAesthetic #HotelLuxury #EditorialPhotography #FineArtPortrait`,
    firstComment: `Where reflection meets perfection.

#InfinityMirror #CrystalLight #PureBeauty #LuxuryLife #MinimalistArt #WhiteOnWhite #ElegantArt #FiveStarLuxury #PrismLight #ContemporaryBeauty`
  },

  velvet: {
    id: 'velvet_underground',
    name: 'Velvet Underground',
    grade: 'velvetUnderground',
    caption: `Burgundy secrets, golden whispers 🍷

In the velvet darkness, queens are crowned. Every shadow hides a throne. Every curve demands worship.

Power wears burgundy.

Velvet Underground | VERALABS NEXUS

#VERALABS #VelvetUnderground #BurgundyAesthetic #DarkLuxury #BoudoirPhotography #SensualArt #VelvetDreams #IntimatePortrait #OldHollywood #ClassicGlamour`,
    firstComment: `Where velvet meets vision.

#RedVelvet #LuxuryIntimate #DarkRomance #SpeakeasyVibes #VintageGlamour #WineAesthetic #RoyalBeauty #NightQueen #SultryArt #GoldAccents`
  },

  ethereal: {
    id: 'ethereal_bloom',
    name: 'Ethereal Bloom',
    grade: 'etherealBloom',
    caption: `Nature reclaims what was always hers 🌸

Petals and skin share the same softness. Sunlight and desire the same warmth. In the garden, we remember what we are.

Organic. Eternal. Beautiful.

Ethereal Bloom | VERALABS NEXUS

#VERALABS #EtherealBloom #BotanicalArt #NaturalBeauty #GardenAesthetic #FloralPortrait #OrganicArt #GoldenHour #NaturalLight #EdenAesthetic`,
    firstComment: `Where nature meets human nature.

#GardenOfEden #FloralFantasy #NaturalGlow #BotanicalBeauty #SunKissed #GreenhouseVibes #WildBeauty #EarthGoddess #OrganicSensuality #BloomingArt`
  }
};

// ═══════════════════════════════════════════════════════════════════
// VIDEO SOURCES - Curated for NEXUS Treatment
// ═══════════════════════════════════════════════════════════════════

const VIDEO_SOURCES = [
  '/home/ecolex/version1/tempimages/new2/Chiaroscuro_sensuality_sculpting_20260104190.mp4',
  '/home/ecolex/version1/tempimages/new2/Sculptural_elegance_a_202601041908.mp4',
  '/home/ecolex/version1/tempimages/new2/Modern_nudeart_sculpted_202601041908.mp4',
  '/home/ecolex/version1/tempimages/new2/Ethereal_intimacy_vulnerability_202601041905.mp4',
  '/home/ecolex/version1/tempimages/new2/A_sophisticated_artconcept_202601041905_boza.mp4',
  '/home/ecolex/version1/tempimages/new2/A_sophisticated_slow_202601041853_jwcx6.mp4',
  '/home/ecolex/version1/tempimages/new2/Awardwinning_photograph_museumquality_202.mp4',
  '/home/ecolex/version1/tempimages/new2/Rustic_boudoir_indian_202601041908.mp4',
];

const IMAGE_SOURCES = [
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732449364-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732549548-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732646728-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767732880009-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767733066718-1.png',
  '/home/ecolex/version1/tempimages/new3/ai-image-studio-1767733215086-1.png',
];

// Music tracks
const MUSIC_TRACKS = {
  midnight: [`${MUSIC_DIR}/midnightMuse_track_1.wav`, `${MUSIC_DIR}/midnightMuse_track_2.wav`],
  boudoir: [`${MUSIC_DIR}/boudoir_track_1.wav`, `${MUSIC_DIR}/boudoir_track_2.wav`],
  golden: [`${MUSIC_DIR}/goldenHour_track_1.wav`, `${MUSIC_DIR}/goldenHour_track_2.wav`],
  ambient: [`${MUSIC_DIR}/midnightMuse_track_3.wav`], // Using midnight for ambient
};

// ═══════════════════════════════════════════════════════════════════
// PROCESSING FUNCTIONS
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
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg failed: ${stderr.slice(-500)}`));
    });
  });
}

/**
 * Convert image to video with NEXUS Ken Burns effect
 */
async function imageToNexusVideo(imagePath, outputPath, duration, grade) {
  const gradeConfig = NEXUS_GRADES[grade];

  // NEXUS Ken Burns: subtle zoom with organic drift
  const filters = [
    'scale=8000:-1',
    `zoompan=z='min(zoom+0.0003,1.06)':d=${duration * 24}:x='iw/2-(iw/zoom/2)+sin(on/90)*15':y='ih/2-(ih/zoom/2)+cos(on/70)*12':s=1080x1920:fps=24`,
    gradeConfig.filter,
    gradeConfig.grain,
    gradeConfig.vignette,
  ].join(',');

  const args = [
    '-y', '-loop', '1', '-i', imagePath,
    '-vf', filters,
    '-t', String(duration),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    outputPath
  ];

  await runFFmpeg(args, `NEXUS Ken Burns (${duration}s)`);
}

/**
 * Process video clip with NEXUS grade
 */
async function processNexusClip(inputPath, outputPath, duration, grade) {
  const gradeConfig = NEXUS_GRADES[grade];

  const filters = [
    'crop=in_w:in_h-40:0:0',
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    gradeConfig.filter,
    gradeConfig.grain,
    gradeConfig.vignette,
  ].join(',');

  const args = [
    '-y', '-i', inputPath,
    '-t', String(duration),
    '-vf', filters,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-an',
    outputPath
  ];

  await runFFmpeg(args, `NEXUS grade: ${gradeConfig.name}`);
}

/**
 * Concatenate clips with smooth crossfade
 */
async function concatenateNexusClips(clipPaths, outputPath) {
  const concatFile = '/tmp/veralabs_nexus_concat.txt';
  fs.writeFileSync(concatFile, clipPaths.map(p => `file '${p}'`).join('\n'));

  const args = [
    '-y', '-f', 'concat', '-safe', '0', '-i', concatFile,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    outputPath
  ];

  await runFFmpeg(args, 'Concatenating NEXUS clips');
}

/**
 * Add NEXUS animated signature with glow
 */
async function addNexusSignature(inputPath, outputPath, seriesName) {
  // NEXUS signature: elegant fade with subtle glow
  const drawtext = `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=38:fontcolor=white@0.92:shadowcolor=gold@0.35:shadowx=2:shadowy=2:x=w-tw-45:y=h-th-45:enable='gte(t,0.8)',drawtext=text='${seriesName.toUpperCase()}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=18:fontcolor=white@0.7:x=w-tw-45:y=h-85:enable='gte(t,1.2)'`;

  const args = [
    '-y', '-i', inputPath,
    '-vf', drawtext,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'copy',
    outputPath
  ];

  await runFFmpeg(args, 'Adding NEXUS signature');
}

/**
 * Add music with professional mixing
 */
async function addNexusMusic(videoPath, musicPath, outputPath) {
  const durationCmd = `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ','`;
  const durationStr = execSync(durationCmd).toString().trim();
  const parts = durationStr.split(':');
  const duration = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
  const fadeOutStart = Math.max(0, duration - 4);

  const audioFilter = `[1:a]afade=t=in:st=0:d=3,afade=t=out:st=${fadeOutStart}:d=4,volume=0.38,acompressor=threshold=-18dB:ratio=4:attack=5:release=50[a]`;

  const args = [
    '-y', '-i', videoPath, '-i', musicPath,
    '-filter_complex', audioFilter,
    '-map', '0:v', '-map', '[a]',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest',
    outputPath
  ];

  await runFFmpeg(args, 'NEXUS audio mixing');
}

/**
 * Extract cinematic thumbnail
 */
async function extractNexusThumbnail(videoPath, outputPath) {
  const args = [
    '-y', '-i', videoPath,
    '-ss', '5', '-vframes', '1', '-q:v', '2',
    outputPath
  ];
  await runFFmpeg(args, 'NEXUS thumbnail extraction');
}

/**
 * Generate a complete NEXUS masterclass reel
 */
async function generateNexusReel(seriesKey) {
  const series = NEXUS_SERIES[seriesKey];
  const gradeKey = series.grade;
  const gradeConfig = NEXUS_GRADES[gradeKey];
  const timestamp = Date.now();
  const reelId = `nexus_${series.id}_${timestamp}`;

  log(`\n${'═'.repeat(70)}`);
  log(`🔮 NEXUS MASTERCLASS: ${series.name}`);
  log(`${'═'.repeat(70)}`);
  log(`   Grade: ${gradeConfig.name}`);
  log(`   Mood: ${gradeConfig.mood}`);

  const tempDir = `/tmp/veralabs_nexus_${reelId}`;
  fs.mkdirSync(tempDir, { recursive: true });

  // Find available sources
  const availableVideos = VIDEO_SOURCES.filter(p => fs.existsSync(p));
  const availableImages = IMAGE_SOURCES.filter(p => fs.existsSync(p));

  if (availableVideos.length < 2 && availableImages.length < 2) {
    throw new Error('Insufficient source media');
  }

  // Build sequence: Image + Video + Image + Video + Image pattern
  const processedClips = [];
  const sequence = [
    { type: 'image', index: 0, duration: 5 },
    { type: 'video', index: 0, duration: 6 },
    { type: 'image', index: 1, duration: 5 },
    { type: 'video', index: 1, duration: 6 },
    { type: 'image', index: 2, duration: 5 },
  ];

  for (let i = 0; i < sequence.length; i++) {
    const seg = sequence[i];
    const clipOutput = `${tempDir}/clip_${i}.mp4`;

    if (seg.type === 'image' && availableImages[seg.index]) {
      log(`   🖼️  Processing image ${i + 1}`);
      await imageToNexusVideo(availableImages[seg.index], clipOutput, seg.duration, gradeKey);
      processedClips.push(clipOutput);
    } else if (seg.type === 'video' && availableVideos[seg.index]) {
      log(`   📹 Processing video ${i + 1}`);
      await processNexusClip(availableVideos[seg.index], clipOutput, seg.duration, gradeKey);
      processedClips.push(clipOutput);
    }
  }

  if (processedClips.length === 0) {
    throw new Error('No clips processed');
  }

  // Concatenate
  const concatenatedPath = `${tempDir}/concatenated.mp4`;
  log(`   🔗 Concatenating ${processedClips.length} clips`);
  await concatenateNexusClips(processedClips, concatenatedPath);

  // Add signature
  const signedPath = `${tempDir}/signed.mp4`;
  await addNexusSignature(concatenatedPath, signedPath, series.name);

  // Add music
  const musicStyle = gradeConfig.musicStyle;
  const musicTracks = MUSIC_TRACKS[musicStyle] || MUSIC_TRACKS.midnight;
  const selectedMusic = musicTracks[Math.floor(Math.random() * musicTracks.length)];
  const finalPath = `${OUTPUT_DIR}/${reelId}.mp4`;

  if (fs.existsSync(selectedMusic)) {
    log(`   🎵 Adding ${musicStyle} music`);
    await addNexusMusic(signedPath, selectedMusic, finalPath);
  } else {
    fs.copyFileSync(signedPath, finalPath);
  }

  // Thumbnail
  const thumbPath = `${OUTPUT_DIR}/${reelId}_thumb.jpg`;
  await extractNexusThumbnail(finalPath, thumbPath);

  // Stats
  const stats = fs.statSync(finalPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  // Cleanup
  fs.rmSync(tempDir, { recursive: true, force: true });

  log(`\n   ✅ COMPLETE: ${reelId}`);
  log(`   📁 Size: ${sizeMB} MB`);

  return {
    id: reelId,
    series: series.name,
    grade: gradeConfig.name,
    videoPath: finalPath,
    thumbnailPath: thumbPath,
    caption: series.caption,
    firstComment: series.firstComment,
    sizeMB
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
║             🔮 N E X U S   M A S T E R C L A S S 🔮                       ║
║                                                                          ║
║     Ultra-Creative Content Generation Beyond Previous Boundaries         ║
║                                                                          ║
║     Series: Obsidian Temple | Monsoon Noir | Crystalline Dreams          ║
║             Velvet Underground | Ethereal Bloom                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Parse arguments
  const args = process.argv.slice(2);
  const targetSeries = args[0] || 'all';
  const count = parseInt(args[1]) || 1;

  const seriesToGenerate = targetSeries === 'all'
    ? Object.keys(NEXUS_SERIES)
    : [targetSeries];

  const results = [];

  for (const seriesKey of seriesToGenerate) {
    if (!NEXUS_SERIES[seriesKey]) {
      log(`❌ Unknown series: ${seriesKey}`);
      continue;
    }

    for (let i = 0; i < count; i++) {
      try {
        const result = await generateNexusReel(seriesKey);
        results.push(result);
      } catch (error) {
        log(`❌ Error: ${error.message}`);
      }
    }
  }

  // Save metadata
  const metadataPath = `${OUTPUT_DIR}/nexus_metadata_${Date.now()}.json`;
  fs.writeFileSync(metadataPath, JSON.stringify({
    created: new Date().toISOString(),
    series: 'VERALABS NEXUS MASTERCLASS',
    reels: results
  }, null, 2));

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                    NEXUS GENERATION COMPLETE                              ║
╠══════════════════════════════════════════════════════════════════════════╣`);

  results.forEach((r, i) => {
    console.log(`║  ${i + 1}. ${r.series.padEnd(25)} │ ${r.sizeMB.padStart(6)} MB`);
  });

  console.log(`╠══════════════════════════════════════════════════════════════════════════╣
║  Total: ${results.length} NEXUS Masterclass Reels                                   ║
║  Output: ${OUTPUT_DIR.slice(-55).padEnd(55)}     ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);
}

main().catch(console.error);
