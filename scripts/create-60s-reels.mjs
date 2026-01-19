#!/usr/bin/env node
/**
 * Create Professional 60-Second Instagram Reels
 * With VERALABS branding, artistic layouts, and max-reach captions
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const SOURCE_DIR = '/home/ecolex/version1/tempimages/new2';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get video durations
function getVideoDuration(videoPath) {
  try {
    const cmd = `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration`;
    const output = execSync(cmd, { encoding: 'utf8' });
    const match = output.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = parseFloat(match[3]);
      return hours * 3600 + minutes * 60 + seconds;
    }
  } catch (error) {
    console.error(`Error getting duration for ${videoPath}:`, error.message);
  }
  return 0;
}

// Helmut Newton color grading presets
const COLOR_THEMES = {
  bigNudes: {
    name: 'Big Nudes - High Contrast B&W',
    filter: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.4:brightness=-0.05:saturation=0',
    vignette: 'vignette=PI/3:1.2'
  },
  champagneLuxury: {
    name: 'Champagne Luxury',
    filter: 'eq=contrast=1.1:brightness=0.03:saturation=1.15,colorbalance=rs=0.08:gs=0.05:bs=-0.02',
    vignette: 'vignette=PI/4'
  },
  goldenSensual: {
    name: 'Golden Sensual',
    filter: 'eq=contrast=1.05:brightness=0.02:saturation=1.1,colorbalance=rs=0.15:gs=0.08:bs=-0.05',
    vignette: 'vignette=PI/5'
  },
  midnightMystery: {
    name: 'Midnight Mystery',
    filter: 'eq=contrast=1.2:brightness=-0.1:saturation=0.8,colorbalance=rs=-0.05:gs=0:bs=0.08',
    vignette: 'vignette=PI/3.5:1.1'
  }
};

// Instagram-optimized captions with max reach strategy
const CAPTION_TEMPLATES = [
  {
    hook: "The art of light and shadow 🌓",
    body: "Where fine art meets intimate expression. Every frame tells a story of confidence, beauty, and artistic vision.",
    cta: "Tap ❤️ if this speaks to you",
    hashtags: "#BoudoirPhotography #FineArtNude #ArtisticNude #BoudoirArt #SensualArt #FemininePower #BodyPositive #ArtisticPhotography #BoudoirInspiration #WomenEmpowerment #IntimatePortrait #FineArtPhotography #NudeArtPhotography #ArtisticExpression #ConfidenceIsSexy #SelfLove #FemaleForm #BoudoirShoot #ArtPhotography #VERALABS"
  },
  {
    hook: "Sculptural beauty, cinematic moments ✨",
    body: "High-end boudoir artistry celebrating the human form. Museum-quality fine art meets editorial sophistication.",
    cta: "Follow for daily artistic inspiration",
    hashtags: "#BoudoirPhotographer #ArtisticBoudoir #FineArtBoudoir #BoudoirSession #IntimatePhotography #EmpoweringWomen #BoudoirPortrait #ArtisticVision #FemininEnergy #BoudoirExperience #BodyArt #SensualPhotography #ArtisticSoul #BoudoirLove #FineArt #ContemporaryArt #BoudoirMagazine #ArtCollector #EditorialPhotography #VERALABS"
  },
  {
    hook: "Timeless elegance, modern artistry 🎭",
    body: "Inspired by masters like Helmut Newton. Bold, sophisticated, empowering. This is boudoir elevated to fine art.",
    cta: "Save this for inspiration ✨",
    hashtags: "#HelmutNewtonInspired #FashionPhotography #EditorialBoudoir #LuxuryBoudoir #HighEndBoudoir #BoudoirPhotography #FineArtPortrait #BlackAndWhitePhotography #ClassicBoudoir #TimelessBeauty #ArtisticNudePhotography #BoudoirArtist #IntimateArt #FemalePhotographer #BoudoirEmpowerment #ArtisticPhotographer #MuseumQuality #ConceptualPhotography #VintageInspired #VERALABS"
  },
  {
    hook: "Confidence captured, beauty celebrated 👑",
    body: "Every woman deserves to feel powerful, beautiful, and free. This is more than photography—it's transformation.",
    cta: "Tag someone who needs to see this",
    hashtags: "#EmpoweredWomen #BoudoirConfidence #SelfLoveJourney #BodyPositivity #WomenSupportingWomen #BoudoirMagic #FeelingMyself #ConfidentWomen #BoudoirGoals #BoudoirVibes #ArtisticExpression #IntimatePortraits #BoudoirInspiration #FemininePower #BoudoirStyle #WomenInArt #EmpowermentThroughArt #BoudoirCommunity #BodyLove #VERALABS"
  }
];

console.log('🎬 VERALABS 60-Second Reels Creator\n');
console.log('====================================\n');

// Get all videos
const videos = fs.readdirSync(SOURCE_DIR)
  .filter(f => f.endsWith('.mp4'))
  .map(f => ({
    path: path.join(SOURCE_DIR, f),
    name: f
  }));

console.log(`Found ${videos.length} videos in ${SOURCE_DIR}\n`);

// Get video durations
console.log('📊 Analyzing video durations...');
const videosWithDuration = videos.map(v => ({
  ...v,
  duration: getVideoDuration(v.path)
})).filter(v => v.duration > 0);

console.log(`✅ ${videosWithDuration.length} videos analyzed\n`);

// Create combinations for 60-second reels
function createReelCombinations(videos, targetDuration = 60) {
  const combinations = [];
  const themes = Object.keys(COLOR_THEMES);

  // Strategy 1: Use longest videos and trim to 60s
  const longVideos = videos.filter(v => v.duration >= 50).slice(0, 5);
  longVideos.forEach((video, idx) => {
    combinations.push({
      id: `reel_long_${idx + 1}`,
      videos: [video],
      theme: themes[idx % themes.length],
      strategy: 'single_long',
      caption: CAPTION_TEMPLATES[idx % CAPTION_TEMPLATES.length]
    });
  });

  // Strategy 2: Combine shorter videos
  const shortVideos = videos.filter(v => v.duration < 50 && v.duration > 5).slice(0, 15);
  let currentCombo = [];
  let currentDuration = 0;
  let comboIdx = 0;

  shortVideos.forEach((video, idx) => {
    if (currentDuration + video.duration <= targetDuration) {
      currentCombo.push(video);
      currentDuration += video.duration;
    } else {
      if (currentCombo.length > 0) {
        combinations.push({
          id: `reel_combo_${comboIdx + 1}`,
          videos: [...currentCombo],
          theme: themes[comboIdx % themes.length],
          strategy: 'multi_clip',
          caption: CAPTION_TEMPLATES[comboIdx % CAPTION_TEMPLATES.length]
        });
        comboIdx++;
      }
      currentCombo = [video];
      currentDuration = video.duration;
    }
  });

  // Add last combination
  if (currentCombo.length > 0) {
    combinations.push({
      id: `reel_combo_${comboIdx + 1}`,
      videos: [...currentCombo],
      theme: themes[comboIdx % themes.length],
      strategy: 'multi_clip',
      caption: CAPTION_TEMPLATES[comboIdx % CAPTION_TEMPLATES.length]
    });
  }

  return combinations;
}

const reelCombinations = createReelCombinations(videosWithDuration);
console.log(`\n🎯 Created ${reelCombinations.length} reel combinations:\n`);
reelCombinations.forEach((reel, idx) => {
  console.log(`${idx + 1}. ${reel.id}`);
  console.log(`   Videos: ${reel.videos.length}`);
  console.log(`   Theme: ${COLOR_THEMES[reel.theme].name}`);
  console.log(`   Caption: ${reel.caption.hook}`);
  console.log('');
});

// Create professional reels
console.log('\n🎨 Creating professional 60-second reels...\n');

async function createProfessionalReel(reelConfig, index) {
  const { id, videos, theme, caption } = reelConfig;
  const themeConfig = COLOR_THEMES[theme];

  console.log(`\n[${index + 1}/${reelCombinations.length}] Creating ${id}...`);
  console.log(`   Theme: ${themeConfig.name}`);
  console.log(`   Videos: ${videos.length}`);

  const timestamp = Date.now();
  const tempDir = path.join(OUTPUT_DIR, `temp_${timestamp}`);
  fs.mkdirSync(tempDir, { recursive: true });

  try {
    // Step 1: Process each video with color grading and resize to 1080x1920
    console.log('   Step 1: Processing clips with color grading...');
    const processedClips = [];

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const outputClip = path.join(tempDir, `clip_${i}.mp4`);

      // Calculate duration for this clip (max 60s total)
      const maxDuration = videos.length === 1 ? 60 : Math.min(video.duration, 60 / videos.length);

      // Crop to remove VEO watermark from bottom-right corner
      // Standard approach: crop bottom 10% and right 15% to remove watermark, then scale back up
      const filterComplex = `[0:v]crop=iw*0.85:ih*0.90:0:0,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,${themeConfig.filter},${themeConfig.vignette}[v]`;

      const cmd = `${FFMPEG} -y -i "${video.path}" -filter_complex "${filterComplex}" -map "[v]" -t ${maxDuration} -c:v libx264 -preset fast -crf 23 "${outputClip}" 2>/dev/null`;

      execSync(cmd);
      processedClips.push(outputClip);
      console.log(`      ✅ Clip ${i + 1}/${videos.length} processed`);
    }

    // Step 2: Concatenate clips if multiple
    let finalVideo;
    if (processedClips.length === 1) {
      finalVideo = processedClips[0];
    } else {
      console.log('   Step 2: Concatenating clips...');
      const concatFile = path.join(tempDir, 'concat.txt');
      fs.writeFileSync(concatFile, processedClips.map(c => `file '${c}'`).join('\n'));

      finalVideo = path.join(tempDir, 'concatenated.mp4');
      const concatCmd = `${FFMPEG} -y -f concat -safe 0 -i "${concatFile}" -c copy "${finalVideo}" 2>/dev/null`;
      execSync(concatCmd);
      console.log('      ✅ Clips concatenated');
    }

    // Step 3: Add VERALABS branding
    console.log('   Step 3: Adding VERALABS branding...');
    const brandedVideo = path.join(tempDir, 'branded.mp4');
    const brandingFilter = `drawtext=text='VERALABS':fontsize=40:fontcolor=white@0.7:x=(w-text_w-30):y=(h-text_h-30):shadowcolor=black@0.5:shadowx=2:shadowy=2`;

    const brandCmd = `${FFMPEG} -y -i "${finalVideo}" -vf "${brandingFilter}" -c:v libx264 -preset fast -crf 23 -c:a copy "${brandedVideo}" 2>/dev/null`;
    execSync(brandCmd);

    // Step 4: Add music if available
    console.log('   Step 4: Adding music...');
    let outputVideo = path.join(OUTPUT_DIR, `${id}_${timestamp}.mp4`);

    // Find music file
    let musicPath = null;
    if (fs.existsSync(MUSIC_DIR)) {
      const musicFiles = fs.readdirSync(MUSIC_DIR).filter(f => f.endsWith('.mp3'));
      if (musicFiles.length > 0) {
        musicPath = path.join(MUSIC_DIR, musicFiles[index % musicFiles.length]);
      }
    }

    if (musicPath && fs.existsSync(musicPath)) {
      const musicCmd = `${FFMPEG} -y -i "${brandedVideo}" -i "${musicPath}" -filter_complex "[1:a]afade=t=in:st=0:d=2,afade=t=out:st=58:d=2,volume=0.3[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest "${outputVideo}" 2>/dev/null`;
      execSync(musicCmd);
      console.log('      ✅ Music added');
    } else {
      fs.copyFileSync(brandedVideo, outputVideo);
      console.log('      ⚠️ No music available');
    }

    // Step 5: Create thumbnail
    console.log('   Step 5: Creating thumbnail...');
    const thumbnailPath = path.join(OUTPUT_DIR, `${id}_${timestamp}_thumb.jpg`);
    const thumbCmd = `${FFMPEG} -y -i "${outputVideo}" -ss 2 -vframes 1 -q:v 2 "${thumbnailPath}" 2>/dev/null`;
    execSync(thumbCmd);

    // Get final file size
    const stats = fs.statSync(outputVideo);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`   ✅ Reel created: ${sizeMB} MB`);
    console.log(`      Video: ${outputVideo}`);
    console.log(`      Thumbnail: ${thumbnailPath}`);

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true });

    return {
      id,
      videoPath: outputVideo,
      thumbnailPath,
      size: stats.size,
      caption: caption,
      theme: themeConfig.name
    };

  } catch (error) {
    console.error(`   ❌ Error creating reel: ${error.message}`);
    fs.rmSync(tempDir, { recursive: true, force: true });
    return null;
  }
}

// Create all reels
const createdReels = [];
for (let i = 0; i < Math.min(reelCombinations.length, 8); i++) {
  const reel = await createProfessionalReel(reelCombinations[i], i);
  if (reel) {
    createdReels.push(reel);
  }
}

// Save reel metadata with captions
const metadataPath = path.join(OUTPUT_DIR, `reels_metadata_${Date.now()}.json`);
fs.writeFileSync(metadataPath, JSON.stringify({
  created: new Date().toISOString(),
  reels: createdReels.map(r => ({
    id: r.id,
    videoPath: r.videoPath,
    thumbnailPath: r.thumbnailPath,
    size: r.size,
    theme: r.theme,
    caption: {
      text: `${r.caption.hook}\n\n${r.caption.body}\n\n${r.caption.cta}\n\n${r.caption.hashtags}`,
      hook: r.caption.hook,
      hashtags: r.caption.hashtags
    }
  }))
}, null, 2));

console.log(`\n\n✅ Created ${createdReels.length} professional 60-second reels!`);
console.log(`📄 Metadata saved to: ${metadataPath}\n`);
console.log('Next steps:');
console.log('1. Review the reels');
console.log('2. Publish the first 2 to Instagram');
console.log('3. Schedule the remaining reels\n');

// Output summary
console.log('\n📋 REELS SUMMARY:\n');
createdReels.forEach((reel, idx) => {
  console.log(`${idx + 1}. ${reel.id}`);
  console.log(`   Path: ${reel.videoPath}`);
  console.log(`   Theme: ${reel.theme}`);
  console.log(`   Size: ${(reel.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Caption: ${reel.caption.hook}`);
  console.log('');
});
