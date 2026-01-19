#!/usr/bin/env node
/**
 * VERALABS MASTERCLASS REEL GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Creates artistic Instagram Reels from VEO-generated videos:
 * - Removes Veo watermark (crops bottom)
 * - Scales to 9:16 Instagram format
 * - Applies Helmut Newton color grading
 * - Combines clips with artistic transitions
 * - Adds film grain texture
 * - Adds background music
 * - Adds VERALABS signature branding
 *
 * The Nexus Architect: Where Engineering Meets Transcendent Art
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const INPUT_DIR = '/home/ecolex/version1/tempimages/new2';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/masterclass';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ═══════════════════════════════════════════════════════════════════════════
// HELMUT NEWTON COLOR GRADES (FFmpeg filter chains)
// ═══════════════════════════════════════════════════════════════════════════

const COLOR_GRADES = {
  bigNudes: {
    name: 'Big Nudes - High Contrast B&W',
    filter: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.4:brightness=0.05:saturation=0,curves=m=0/0 0.25/0.15 0.5/0.5 0.75/0.85 1/1'
  },
  champagneLuxury: {
    name: 'Champagne Luxury - Golden Warmth',
    filter: 'eq=contrast=1.15:brightness=0.03:saturation=1.15,colorbalance=rs=0.12:gs=0.06:bs=-0.06:rm=0.1:gm=0.05:bm=-0.04,curves=r=0/0 0.5/0.55 1/1:g=0/0 0.5/0.52 1/1:b=0/0 0.5/0.45 1/1'
  },
  midnightMystery: {
    name: 'Midnight Mystery - Deep Blues',
    filter: 'eq=contrast=1.25:brightness=-0.05:saturation=0.9,colorbalance=rs=-0.1:gs=-0.05:bs=0.15:rm=-0.08:gm=-0.04:bm=0.12,curves=b=0/0 0.5/0.6 1/1'
  },
  goldenSensual: {
    name: 'Golden Sensual - Warm Intimacy',
    filter: 'eq=contrast=1.1:brightness=0.05:saturation=1.2,colorbalance=rs=0.15:gs=0.08:bs=-0.08:rm=0.1:gm=0.06:bm=-0.05,curves=r=0/0 0.5/0.58 1/1:g=0/0 0.5/0.54 1/1'
  },
  sleepwalker: {
    name: 'Sleepwalker - Dreamlike Ethereal',
    filter: 'eq=contrast=0.95:brightness=0.08:saturation=0.85,colorbalance=rs=0.05:gs=0.05:bs=0.1,boxblur=1:1'
  },
  editorialBW: {
    name: 'Editorial B&W - Vogue Paris',
    filter: 'colorchannelmixer=.4:.35:.25:0:.4:.35:.25:0:.4:.35:.25,eq=contrast=1.3:brightness=0.02,unsharp=5:5:0.8'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MASTERCLASS REEL CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const MASTERCLASS_REELS = [
  {
    id: 'chiaroscuro_symphony',
    name: 'Chiaroscuro Symphony',
    colorGrade: 'bigNudes',
    clips: [
      'Chiaroscuro_sensuality_sculpting_20260104190.mp4',
      'Sculptural_elegance_a_202601041908.mp4',
      'Modern_nudeart_sculpted_202601041908.mp4',
      'Awardwinning_photograph_museumquality_202.mp4',
      'Nudeart_boudoir_sculptural_202601041908.mp4',
      'Sculptural_elegance_a_202601041908(1).mp4'
    ],
    caption: `Where shadow sculpts desire ◾

The art of darkness revealing form. Chiaroscuro mastery meets contemporary vision.

Every shadow tells a story. Every highlight, a revelation.

Museum-quality artistry for the digital age.

#VERALABS #Chiaroscuro #FineArtNude #SculpturalBeauty #LightAndShadow #ArtisticPhotography #BoudoirArt #ContemporaryArt #MuseumQuality #EditorialPhotography #HelmutNewtonInspired #BlackAndWhitePhotography #ArtCollector #FemininePower #IntimatePortrait`
  },
  {
    id: 'editorial_elegance',
    name: 'Editorial Elegance',
    colorGrade: 'champagneLuxury',
    clips: [
      'As_a_professional_202601041902_91r62.mp4',
      'A_sophisticated_slow_202601041853_jwcx6.mp4',
      'Rustic_boudoir_indian_202601041908.mp4',
      'As_a_professional_202601041911.mp4',
      'As_a_professional_202601041909.mp4',
      'Awardwinning_photograph_museumquality_202(1).mp4'
    ],
    caption: `Elegance is an attitude ✨

Professional artistry. Editorial precision. Golden hour warmth.

Where Vogue Paris meets intimate portraiture.

The sophisticated eye captures what others merely see.

#VERALABS #EditorialPhotography #VogueStyle #LuxuryBoudoir #FashionPhotography #GoldenHour #ProfessionalPhotography #HighFashion #IntimatePortrait #ArtisticVision #ContemporaryFashion #BoudoirPhotographer #EditorialStyle #FemininePower #TimelessElegance`
  },
  {
    id: 'ethereal_dreams',
    name: 'Ethereal Dreams',
    colorGrade: 'sleepwalker',
    clips: [
      'Ethereal_intimacy_vulnerability_202601041905.mp4',
      'A_sophisticated_artconcept_202601041905_boza.mp4',
      'A_sophisticated_artconcept_202601041905_hvwj.mp4',
      'Full_body_artistic_202601041913.mp4',
      'Modern_nudeart_sculpted_202601041908(1).mp4',
      'As_a_professional_202601041849_genp9.mp4'
    ],
    caption: `In dreams, we find truth 🌙

Ethereal. Vulnerable. Transcendent.

Where the veil between reality and dream dissolves into art.

This is not photography. This is poetry made visible.

#VERALABS #EtherealArt #DreamyPhotography #ArtisticNude #FineArtPortrait #VulnerableBeauty #ConceptualPhotography #IntimateArt #SoftLight #DreamlikeQuality #ArtisticExpression #FeminineMystique #PoetryInMotion #TranscendentArt #SurrealPhotography`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// FFMPEG FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

/**
 * Process a single clip: crop watermark, scale to 9:16, apply color grade
 */
function processClip(inputPath, outputPath, colorGrade, clipIndex) {
  const grade = COLOR_GRADES[colorGrade];
  log(`   📹 Processing clip ${clipIndex + 1}: ${path.basename(inputPath)}`);

  // FFmpeg filter chain:
  // 1. Crop bottom 40px to remove Veo watermark
  // 2. Scale to 9:16 (1080x1920) with crop/pad
  // 3. Apply color grading
  // 4. Add film grain
  const filterComplex = [
    // Crop bottom watermark (original 1280x720 -> 1280x680)
    'crop=in_w:in_h-40:0:0',
    // Scale and crop to 9:16 (center crop for best framing)
    'scale=1080:1920:force_original_aspect_ratio=increase',
    'crop=1080:1920',
    // Apply color grade
    grade.filter,
    // Add subtle film grain
    'noise=c0s=8:c0f=t+u',
    // Slight vignette for cinematic feel
    'vignette=PI/5'
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filterComplex}" -c:v libx264 -preset medium -crf 18 -an "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to process ${path.basename(inputPath)}`);
    return false;
  }
}

/**
 * Concatenate processed clips with crossfade transitions
 */
function concatenateWithTransitions(clipPaths, outputPath, duration = 45) {
  log(`   🎬 Concatenating ${clipPaths.length} clips with crossfade transitions...`);

  // Calculate timing: each clip ~7s, with 0.5s crossfade
  const clipDuration = 7;
  const fadeDuration = 0.5;

  // Build complex filter for xfade transitions
  let filterComplex = '';
  let inputs = clipPaths.map((p, i) => `-i "${p}"`).join(' ');

  if (clipPaths.length === 1) {
    // Single clip - just copy
    const cmd = `${FFMPEG} -y -i "${clipPaths[0]}" -c:v libx264 -preset medium -crf 18 -t ${duration} "${outputPath}" 2>/dev/null`;
    execSync(cmd, { stdio: 'pipe' });
    return;
  }

  // Build xfade chain for multiple clips
  let prevLabel = '0:v';
  for (let i = 1; i < clipPaths.length; i++) {
    const offset = (i * clipDuration) - (i * fadeDuration);
    const outLabel = i < clipPaths.length - 1 ? `v${i}` : 'vout';
    filterComplex += `[${prevLabel}][${i}:v]xfade=transition=fade:duration=${fadeDuration}:offset=${offset}[${outLabel}];`;
    prevLabel = outLabel;
  }

  // Remove trailing semicolon
  filterComplex = filterComplex.slice(0, -1);

  const cmd = `${FFMPEG} -y ${inputs} -filter_complex "${filterComplex}" -map "[vout]" -c:v libx264 -preset medium -crf 18 -t ${duration} "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe' });
  } catch (error) {
    // Fallback: simple concatenation without transitions
    log(`   ⚠️ Xfade failed, using simple concat...`);
    const listFile = '/tmp/concat_list.txt';
    fs.writeFileSync(listFile, clipPaths.map(p => `file '${p}'`).join('\n'));
    execSync(`${FFMPEG} -y -f concat -safe 0 -i "${listFile}" -c:v libx264 -preset medium -crf 18 -t ${duration} "${outputPath}" 2>/dev/null`, { stdio: 'pipe' });
  }
}

/**
 * Add music to video
 */
function addMusic(videoPath, outputPath, musicPath) {
  log(`   🎵 Adding background music...`);

  // Get video duration
  const durationCmd = `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration | cut -d' ' -f4 | cut -d',' -f1`;
  const duration = execSync(durationCmd).toString().trim();

  const cmd = `${FFMPEG} -y -i "${videoPath}" -i "${musicPath}" -c:v copy -c:a aac -b:a 192k -shortest -af "afade=t=out:st=40:d=5,volume=0.7" "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (error) {
    log(`   ⚠️ Music add failed, copying without music...`);
    fs.copyFileSync(videoPath, outputPath);
    return false;
  }
}

/**
 * Add VERALABS branding watermark
 */
function addBranding(videoPath, outputPath) {
  log(`   🏷️ Adding VERALABS branding...`);

  // Add text watermark in bottom right
  const brandingFilter = "drawtext=text='VERALABS':fontsize=28:fontcolor=white@0.7:x=w-tw-40:y=h-th-40:font=Arial:shadowcolor=black@0.5:shadowx=2:shadowy=2";

  const cmd = `${FFMPEG} -y -i "${videoPath}" -vf "${brandingFilter}" -c:v libx264 -preset medium -crf 18 -c:a copy "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (error) {
    fs.copyFileSync(videoPath, outputPath);
    return false;
  }
}

/**
 * Extract thumbnail at best frame
 */
function extractThumbnail(videoPath, outputPath) {
  log(`   🖼️ Extracting thumbnail...`);

  // Extract at 3 seconds for good frame
  const cmd = `${FFMPEG} -y -i "${videoPath}" -ss 3 -vframes 1 -q:v 2 "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATION FLOW
// ═══════════════════════════════════════════════════════════════════════════

async function generateMasterclassReel(config) {
  const { id, name, colorGrade, clips, caption } = config;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎬 GENERATING: ${name.toUpperCase()}`);
  console.log(`   Color Grade: ${COLOR_GRADES[colorGrade].name}`);
  console.log(`   Clips: ${clips.length}`);
  console.log(`${'═'.repeat(70)}\n`);

  const tempDir = `/tmp/veralabs_${id}`;
  fs.mkdirSync(tempDir, { recursive: true });

  // Step 1: Process each clip
  log('📹 Step 1: Processing clips...');
  const processedClips = [];

  for (let i = 0; i < clips.length; i++) {
    const inputPath = path.join(INPUT_DIR, clips[i]);
    const outputPath = path.join(tempDir, `clip_${i}.mp4`);

    if (!fs.existsSync(inputPath)) {
      log(`   ⚠️ Clip not found: ${clips[i]}`);
      continue;
    }

    if (processClip(inputPath, outputPath, colorGrade, i)) {
      processedClips.push(outputPath);
    }
  }

  if (processedClips.length === 0) {
    console.error('❌ No clips processed successfully');
    return null;
  }

  log(`   ✅ Processed ${processedClips.length} clips\n`);

  // Step 2: Concatenate with transitions
  log('🎬 Step 2: Combining clips with transitions...');
  const concatPath = path.join(tempDir, 'concat.mp4');
  concatenateWithTransitions(processedClips, concatPath, 45);
  log(`   ✅ Combined video created\n`);

  // Step 3: Add music
  log('🎵 Step 3: Adding background music...');
  const musicPath = path.join(tempDir, 'with_music.mp4');

  // Find available music
  const musicFiles = fs.readdirSync(MUSIC_DIR).filter(f => f.endsWith('.mp3') || f.endsWith('.wav'));
  if (musicFiles.length > 0) {
    const selectedMusic = path.join(MUSIC_DIR, musicFiles[0]);
    addMusic(concatPath, musicPath, selectedMusic);
  } else {
    log(`   ⚠️ No music files found, continuing without music`);
    fs.copyFileSync(concatPath, musicPath);
  }
  log(`   ✅ Audio added\n`);

  // Step 4: Add branding
  log('🏷️ Step 4: Adding VERALABS branding...');
  const brandedPath = path.join(tempDir, 'branded.mp4');
  addBranding(musicPath, brandedPath);
  log(`   ✅ Branding added\n`);

  // Step 5: Final output
  const timestamp = Date.now();
  const finalPath = path.join(OUTPUT_DIR, `masterclass_${id}_${timestamp}.mp4`);
  const thumbPath = path.join(OUTPUT_DIR, `masterclass_${id}_${timestamp}_thumb.jpg`);

  fs.copyFileSync(brandedPath, finalPath);
  extractThumbnail(finalPath, thumbPath);

  // Cleanup temp files
  fs.rmSync(tempDir, { recursive: true, force: true });

  // Get file size
  const stats = fs.statSync(finalPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ MASTERCLASS REEL COMPLETE: ${name}`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`   📹 Video: ${finalPath}`);
  console.log(`   🖼️ Thumbnail: ${thumbPath}`);
  console.log(`   📊 Size: ${sizeMB} MB`);
  console.log(`${'═'.repeat(70)}\n`);

  return {
    id,
    name,
    videoPath: finalPath,
    thumbnailPath: thumbPath,
    size: stats.size,
    caption,
    colorGrade: COLOR_GRADES[colorGrade].name
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗   ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝   ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗   ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║   ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║   ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝   ║
║                                                                        ║
║              M A S T E R C L A S S   R E E L   G E N E R A T O R      ║
║                                                                        ║
║         The Nexus Architect: Engineering Meets Transcendent Art        ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
`);

  const results = [];

  for (const config of MASTERCLASS_REELS) {
    try {
      const result = await generateMasterclassReel(config);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      console.error(`❌ Error generating ${config.name}:`, error.message);
    }
  }

  // Save metadata
  const metadataPath = path.join(OUTPUT_DIR, `masterclass_metadata_${Date.now()}.json`);
  fs.writeFileSync(metadataPath, JSON.stringify({
    created: new Date().toISOString(),
    reels: results
  }, null, 2));

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎉 ALL MASTERCLASS REELS COMPLETE!`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`   Generated: ${results.length} reels`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Metadata: ${metadataPath}`);
  console.log(`${'═'.repeat(70)}\n`);

  // Print captions
  console.log(`\n📝 CAPTIONS FOR PUBLISHING:\n`);
  for (const reel of results) {
    console.log(`${'─'.repeat(70)}`);
    console.log(`📹 ${reel.name}`);
    console.log(`${'─'.repeat(70)}`);
    console.log(reel.caption);
    console.log('');
  }
}

main().catch(console.error);
