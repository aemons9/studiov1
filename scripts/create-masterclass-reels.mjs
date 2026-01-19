#!/usr/bin/env node
/**
 * VERALABS Masterclass Reels Generator
 * Creates branded reels with signature gold/black aesthetic
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const VIDEO_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/instagram-campaign2/videoasset';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-masterclass-reels';

// VERALABS brand colors
const GOLD = '#c9a962';
const BLACK = '#0a0a0a';

// Reel definitions
const REELS = [
  {
    id: 'surrender_to_shadow',
    name: 'Surrender to Shadow',
    collection: 'CHIAROSCURO COLLECTION',
    videos: ['style1.mp4', 'style3.mp4', 'style5.mp4'],
    music: 'goldenHour_track_1.wav',
    invocation: 'surrender to shadow',
    subtitle: 'where light meets desire',
    caption: `Surrender to shadow.

Where light becomes the artist and darkness becomes the canvas. This is the language of chiaroscuro - spoken in gold and silence.

New Masterclass Collection available now. Link in bio.

#VERALABS #ChiaroscuroArt #SurrenderToShadow #FineArtBoudoir #LightAndShadow #IntimateArt #GoldenHour #MuseumQuality #ArtisticPhotography #SensualArt`
  },
  {
    id: 'liquid_luxury',
    name: 'Liquid Luxury',
    collection: 'SILK AND SATIN SERIES',
    videos: ['style2.mp4', 'style4.mp4', 'style1.mp4'],
    music: 'midnightMuse_track_1.wav',
    invocation: 'liquid luxury',
    subtitle: 'silk confessions',
    caption: `Some fabrics do not just drape - they cascade.

Silk moves like water. Satin catches light like liquid gold. This series celebrates textiles that feel as good as they look.

Close your eyes. Imagine the touch.

#VERALABS #LiquidLuxury #SilkAndSatin #FineArtPhotography #TextureArt #SensualFabrics #IntimatePhotography #LuxuryAesthetic #MuseumQuality #ArtCollector`
  },
  {
    id: 'gallery_worthy',
    name: 'Gallery Worthy',
    collection: 'MUSEUM QUALITY',
    videos: ['style5.mp4', 'style3.mp4', 'style2.mp4', 'style4.mp4'],
    music: 'boudoir_track_1.wav',
    invocation: 'gallery worthy',
    subtitle: 'museum quality',
    caption: `Gallery-worthy. Museum-quality.

Each frame crafted with the precision of a master painter, the eye of a sculptor. This is not photography - this is fine art.

Would you hang this on your wall?

#VERALABS #GalleryArt #MuseumQuality #FineArtPhotography #ArtCollector #CuratedBeauty #IntimatePortrait #ContemporaryArt #ArtisticVision #EditorialArt`
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function createBrandedReel(reel) {
  const timestamp = Date.now();
  const outputPath = path.join(OUTPUT_DIR, `reel_${reel.id}_${timestamp}.mp4`);
  const tempConcat = path.join(OUTPUT_DIR, `temp_concat_${timestamp}.txt`);
  const tempVideo = path.join(OUTPUT_DIR, `temp_video_${timestamp}.mp4`);

  log(`Creating reel: ${reel.name}`);
  log(`  Videos: ${reel.videos.join(', ')}`);
  log(`  Music: ${reel.music}`);

  // Create concat file for videos
  const concatContent = reel.videos
    .map(v => `file '${path.join(VIDEO_DIR, v)}'`)
    .join('\n');
  fs.writeFileSync(tempConcat, concatContent);

  // Step 1: Concatenate videos, scale to 1080x1920, remove original audio
  log('  Step 1: Concatenating and scaling videos...');
  const concatCmd = `${FFMPEG} -y -f concat -safe 0 -i "${tempConcat}" ` +
    `-vf "scale=1080:1920:force_original_aspect_ratio=decrease,` +
    `pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=${BLACK},` +
    `setsar=1" ` +
    `-an -c:v libx264 -preset fast -crf 23 "${tempVideo}"`;

  try {
    execSync(concatCmd, { stdio: 'pipe' });
  } catch (err) {
    console.error('Concat error:', err.message);
    return null;
  }

  // Get video duration
  const probeCmd = `${FFMPEG} -i "${tempVideo}" 2>&1 | grep Duration | awk '{print $2}' | tr -d ,`;
  let duration;
  try {
    duration = execSync(probeCmd, { encoding: 'utf8' }).trim();
    log(`  Video duration: ${duration}`);
  } catch (err) {
    duration = '00:00:18';
  }

  // Step 2: Add branding overlays and music
  log('  Step 2: Adding branding and music...');

  // Complex filter for VERALABS branding
  const musicPath = path.join(MUSIC_DIR, reel.music);

  // Calculate text positions for 1080x1920 canvas
  // Top: Collection name (small, gold)
  // Center: Main invocation (large, elegant)
  // Bottom: Subtitle + VERALABS logo

  const filterComplex = [
    // Fade in/out
    `[0:v]fade=t=in:st=0:d=1,fade=t=out:st=${reel.videos.length * 6 - 1}:d=1[faded]`,

    // Top collection label (small caps, gold)
    `[faded]drawtext=text='${reel.collection}':` +
    `fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:` +
    `fontsize=28:fontcolor=${GOLD}:` +
    `x=(w-text_w)/2:y=180:` +
    `enable='between(t,1,${reel.videos.length * 6 - 2})'[t1]`,

    // Main invocation text (large, elegant, animated)
    `[t1]drawtext=text='${reel.invocation}':` +
    `fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf:` +
    `fontsize=72:fontcolor=white:` +
    `x=(w-text_w)/2:y=(h-text_h)/2:` +
    `enable='between(t,2,${reel.videos.length * 6 - 2})'[t2]`,

    // Gold accent line
    `[t2]drawtext=text='${reel.subtitle}':` +
    `fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:` +
    `fontsize=36:fontcolor=${GOLD}:` +
    `x=(w-text_w)/2:y=(h/2)+60:` +
    `enable='between(t,2.5,${reel.videos.length * 6 - 2})'[t3]`,

    // VERALABS logo text at bottom
    `[t3]drawtext=text='VERALABS':` +
    `fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:` +
    `fontsize=32:fontcolor=${GOLD}:` +
    `x=(w-text_w)/2:y=h-150:` +
    `enable='between(t,1,${reel.videos.length * 6 - 1})'[t4]`,

    // Decorative line under VERALABS
    `[t4]drawtext=text='━━━━━━━━━━━━━':` +
    `fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:` +
    `fontsize=20:fontcolor=${GOLD}@0.5:` +
    `x=(w-text_w)/2:y=h-110:` +
    `enable='between(t,1,${reel.videos.length * 6 - 1})'[branded]`
  ].join(';');

  // Final command with music
  const brandCmd = `${FFMPEG} -y -i "${tempVideo}" -i "${musicPath}" ` +
    `-filter_complex "${filterComplex}" ` +
    `-map "[branded]" -map 1:a:0 ` +
    `-c:v libx264 -preset medium -crf 20 ` +
    `-c:a aac -b:a 192k ` +
    `-shortest ` +
    `-t ${reel.videos.length * 6} ` +
    `"${outputPath}"`;

  try {
    execSync(brandCmd, { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
    log(`  ✅ Created: ${outputPath}`);
  } catch (err) {
    console.error('Branding error:', err.stderr?.toString() || err.message);

    // Fallback: simpler branding approach
    log('  Trying simplified branding...');
    const simpleCmd = `${FFMPEG} -y -i "${tempVideo}" -i "${musicPath}" ` +
      `-vf "drawtext=text='VERALABS':fontsize=40:fontcolor=${GOLD}:x=(w-text_w)/2:y=h-100,` +
      `drawtext=text='${reel.invocation.toUpperCase()}':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2,` +
      `drawtext=text='${reel.collection}':fontsize=24:fontcolor=${GOLD}:x=(w-text_w)/2:y=150" ` +
      `-map 0:v -map 1:a ` +
      `-c:v libx264 -preset medium -crf 20 ` +
      `-c:a aac -b:a 192k ` +
      `-shortest -t ${reel.videos.length * 6} ` +
      `"${outputPath}"`;

    try {
      execSync(simpleCmd, { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
      log(`  ✅ Created (simple): ${outputPath}`);
    } catch (err2) {
      console.error('Simple branding also failed:', err2.message);
      return null;
    }
  }

  // Cleanup temp files
  try {
    fs.unlinkSync(tempConcat);
    fs.unlinkSync(tempVideo);
  } catch (e) {}

  // Create thumbnail
  const thumbPath = outputPath.replace('.mp4', '_thumb.jpg');
  const thumbCmd = `${FFMPEG} -y -i "${outputPath}" -ss 3 -vframes 1 -q:v 2 "${thumbPath}"`;
  try {
    execSync(thumbCmd, { stdio: 'pipe' });
    log(`  📸 Thumbnail: ${thumbPath}`);
  } catch (e) {}

  return {
    path: outputPath,
    thumb: thumbPath,
    caption: reel.caption,
    id: reel.id,
    name: reel.name
  };
}

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
║            🎬 MASTERCLASS REELS GENERATOR 🎬                              ║
║                                                                          ║
║     Creating 3 Branded Reels • Original Music • Signature Style          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const reel of REELS) {
    console.log(`\n${'═'.repeat(70)}`);
    const result = createBrandedReel(reel);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    GENERATION COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  for (const r of results) {
    console.log(`  ✅ ${r.name}: ${r.path}`);
  }

  // Save results for publishing
  const resultsPath = path.join(OUTPUT_DIR, 'reels-manifest.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n  📋 Manifest saved: ${resultsPath}`);

  console.log(`${'═'.repeat(70)}\n`);

  return results;
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
