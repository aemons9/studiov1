#!/usr/bin/env node
/**
 * Compress large reels, add music, and create preview with captions
 */

import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const TEMP_DIR = '/home/ecolex/version1/temp';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';
const OUTPUT_DIR = '/home/ecolex/version1/generated-reels/compressed';
const PREVIEW_DIR = '/home/ecolex/version1/generated-reels/previews';

// Ensure output directories exist
execSync(`mkdir -p ${OUTPUT_DIR}`);
execSync(`mkdir -p ${PREVIEW_DIR}`);

const TARGET_BITRATE = '4000k'; // 4 Mbps for high quality, under 100MB for 60s
const MAX_SIZE_MB = 100;

// Creative captions for different themes
const CAPTION_TEMPLATES = {
  sensual: [
    {
      hook: "Desire painted in shadows and light ✨",
      body: "Every frame, a whisper. Every movement, poetry. This is where art transcends the canvas and becomes pure emotion.",
      cta: "Save this if it speaks to your soul",
      hashtags: "#SensualArt #ArtisticExpression #VisualPoetry #IntimateArt #FineArtPhotography #BoudoirInspiration #ArtisticNude #EmotionalArt #ModernArt #ContemporaryArt #ArtCollector #FemininePower #SensualPhotography #ArtisticVision #BodyArt #IntimatePortrait #VERALABS"
    },
    {
      hook: "When vulnerability becomes power 💫",
      body: "In the space between light and shadow, we find truth. Raw, unfiltered, unapologetically beautiful.",
      cta: "Follow for more artistic explorations",
      hashtags: "#BoudoirArt #ArtisticPhotography #IntimateExpression #FineArt #SensualImagery #VulnerableBeauty #ArtisticSoul #ModernBoudoir #ContemporaryPhotography #EmotionalDepth #FeminineMystique #ArtisticNude #BodyPositive #IntimateArt #VERALABS"
    }
  ],
  dramatic: [
    {
      hook: "The darkest nights birth the brightest stars 🌑",
      body: "High contrast. High stakes. High art. This is the Helmut Newton aesthetic—bold, uncompromising, eternally powerful.",
      cta: "Double tap if this moves you",
      hashtags: "#HelmutNewtonInspired #BlackAndWhitePhotography #HighContrast #DramaticLighting #FashionPhotography #EditorialPhotography #FineArtNude #ArtisticPhotography #BoldArt #PowerfulImagery #FilmNoir #ModernArt #ArtisticVision #VERALABS"
    }
  ],
  luxury: [
    {
      hook: "Champagne dreams in golden frames 🥂",
      body: "Opulence isn't just seen—it's felt. Silk, shadow, and sophistication converge in this visual symphony of luxury.",
      cta: "Tag someone who appreciates the finer things",
      hashtags: "#LuxuryLifestyle #OpulentArt #ChampagneAesthetic #HighEndPhotography #LuxuryBoudoir #ElegantPhotography #SophisticatedStyle #FineArt #EditorialFashion #LuxuryArt #GlamourPhotography #ElegantAesthetic #ArtisticLuxury #VERALABS"
    }
  ],
  intimate: [
    {
      hook: "Intimacy is an art form, and this is the masterpiece 🎨",
      body: "Soft focus. Soft light. Powerful emotions. Where tenderness meets artistic vision.",
      cta: "Save for creative inspiration",
      hashtags: "#IntimatePhotography #BoudoirArt #SoftAesthetic #ArtisticBoudoir #TenderMoments #IntimateExpression #FineArtPhotography #EmotionalArt #VulnerableBeauty #ArtisticVision #BoudoirInspiration #FeminineEnergy #VERALABS"
    }
  ]
};

// Music themes
const MUSIC_TRACKS = {
  sensual: 'boudoir_track_1.wav',
  dramatic: 'midnightMuse_track_2.wav',
  luxury: 'goldenHour_track_2.wav',
  intimate: 'boudoir_track_3.wav'
};

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

/**
 * Get video info
 */
function getVideoInfo(videoPath) {
  try {
    const output = execSync(`${FFMPEG} -i "${videoPath}" 2>&1`, { encoding: 'utf8' });
    const durationMatch = output.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
    const bitrateMatch = output.match(/bitrate: (\d+) kb\/s/);

    if (durationMatch) {
      const hours = parseInt(durationMatch[1]);
      const minutes = parseInt(durationMatch[2]);
      const seconds = parseFloat(durationMatch[3]);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      return {
        duration: totalSeconds,
        bitrate: bitrateMatch ? parseInt(bitrateMatch[1]) : 0
      };
    }
  } catch (error) {
    // FFmpeg sends info to stderr, so "error" is expected
  }
  return { duration: 0, bitrate: 0 };
}

/**
 * Compress video with aggressive settings for file size
 */
function compressVideo(inputPath, outputPath) {
  log(`🗜️  Compressing video...`);
  log(`   Input: ${basename(inputPath)}`);

  const info = getVideoInfo(inputPath);
  log(`   Original: ${info.duration.toFixed(1)}s @ ${info.bitrate} kb/s`);

  // Calculate target bitrate to stay under 100MB
  // Formula: (target_size_MB * 8 * 1024) / duration_seconds
  const targetSizeMB = 95; // Leave 5MB margin
  const calculatedBitrate = Math.floor((targetSizeMB * 8 * 1024) / info.duration);
  const finalBitrate = Math.min(calculatedBitrate, 5000); // Cap at 5 Mbps

  log(`   Target bitrate: ${finalBitrate} kb/s`);

  // Two-pass encoding for best quality at target size
  const pass1 = `${FFMPEG} -y -i "${inputPath}" \
    -c:v libx264 -preset slow -b:v ${finalBitrate}k -maxrate ${finalBitrate}k -bufsize ${finalBitrate * 2}k \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
    -an -pass 1 -f mp4 /dev/null 2>&1`;

  const pass2 = `${FFMPEG} -y -i "${inputPath}" \
    -c:v libx264 -preset slow -b:v ${finalBitrate}k -maxrate ${finalBitrate}k -bufsize ${finalBitrate * 2}k \
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
    -c:a aac -b:a 128k -ar 44100 -pass 2 "${outputPath}" 2>&1`;

  try {
    log(`   Pass 1/2...`);
    execSync(pass1, { stdio: 'pipe' });

    log(`   Pass 2/2...`);
    execSync(pass2, { stdio: 'pipe' });

    const stats = statSync(outputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    log(`   ✅ Compressed: ${sizeMB} MB\n`);

    return { success: true, sizeMB: parseFloat(sizeMB) };
  } catch (error) {
    log(`   ❌ Compression failed: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

/**
 * Add music to compressed video
 */
function addMusic(videoPath, musicPath, outputPath) {
  log(`🎵 Adding music...`);

  const cmd = `${FFMPEG} -i "${videoPath}" -i "${musicPath}" \
    -filter_complex "[1:a]volume=-18dB,apad[music];[0:a][music]amix=inputs=2:duration=shortest[a]" \
    -map 0:v -map "[a]" \
    -c:v copy \
    -c:a aac \
    -b:a 128k \
    -shortest \
    -y "${outputPath}" 2>&1`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    const stats = statSync(outputPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    log(`   ✅ Music added: ${sizeMB} MB\n`);
    return { success: true, sizeMB: parseFloat(sizeMB) };
  } catch (error) {
    log(`   ❌ Failed: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

/**
 * Generate thumbnail for preview
 */
function generateThumbnail(videoPath, thumbnailPath) {
  const cmd = `${FFMPEG} -i "${videoPath}" -ss 00:00:03 -vframes 1 -vf "scale=540:960" -y "${thumbnailPath}" 2>&1`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Detect theme from filename or content
 */
function detectTheme(reelDir) {
  const dirName = basename(reelDir).toLowerCase();

  if (dirName.includes('sensual') || dirName.includes('intimate')) return 'sensual';
  if (dirName.includes('dramatic') || dirName.includes('noir')) return 'dramatic';
  if (dirName.includes('luxury') || dirName.includes('champagne')) return 'luxury';

  // Default to intimate
  return 'intimate';
}

// Main execution
(async () => {
  console.log('🎬 VERALABS Reel Compressor & Music Mixer\n');
  console.log('='.repeat(60) + '\n');

  // Find all reel directories
  const reelDirs = readdirSync(TEMP_DIR)
    .filter(name => name.startsWith('reel-'))
    .map(name => join(TEMP_DIR, name))
    .filter(path => {
      const finalPath = join(path, 'final.mp4');
      return existsSync(finalPath);
    });

  log(`Found ${reelDirs.length} reels to process\n`);

  const results = [];

  for (const reelDir of reelDirs) {
    const reelId = basename(reelDir);
    const finalPath = join(reelDir, 'final.mp4');
    const stats = statSync(finalPath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n' + '='.repeat(60));
    log(`Processing: ${reelId}`);
    log(`Original size: ${originalSizeMB} MB`);
    console.log('='.repeat(60) + '\n');

    // Detect theme
    const theme = detectTheme(reelDir);
    const captionOptions = CAPTION_TEMPLATES[theme] || CAPTION_TEMPLATES.intimate;
    const caption = captionOptions[0];
    const musicTrack = MUSIC_TRACKS[theme];
    const musicPath = join(MUSIC_DIR, musicTrack);

    log(`Theme: ${theme}`);
    log(`Music: ${musicTrack}\n`);

    try {
      // Step 1: Compress
      const compressedPath = join(OUTPUT_DIR, `${reelId}_compressed.mp4`);
      const compressionResult = compressVideo(finalPath, compressedPath);

      if (!compressionResult.success) {
        results.push({ reelId, error: 'Compression failed', originalSizeMB });
        continue;
      }

      // Step 2: Add music
      const finalOutputPath = join(OUTPUT_DIR, `${reelId}_final.mp4`);
      const musicResult = addMusic(compressedPath, musicPath, finalOutputPath);

      if (!musicResult.success) {
        results.push({ reelId, error: 'Music addition failed', originalSizeMB });
        continue;
      }

      // Step 3: Generate thumbnail
      const thumbnailPath = join(PREVIEW_DIR, `${reelId}_thumb.jpg`);
      generateThumbnail(finalOutputPath, thumbnailPath);

      // Save caption
      const captionPath = join(PREVIEW_DIR, `${reelId}_caption.txt`);
      const fullCaption = `${caption.hook}\n\n${caption.body}\n\n${caption.cta}\n\n${caption.hashtags}`;
      writeFileSync(captionPath, fullCaption);

      results.push({
        reelId,
        originalSizeMB,
        finalSizeMB: musicResult.sizeMB,
        theme,
        videoPath: finalOutputPath,
        thumbnailPath,
        captionPath,
        caption: fullCaption,
        musicTrack
      });

      log(`✅ SUCCESS!\n`);

    } catch (error) {
      log(`❌ Error: ${error.message}\n`);
      results.push({ reelId, error: error.message, originalSizeMB });
    }
  }

  // Generate preview summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 PROCESSING COMPLETE - PREVIEW');
  console.log('='.repeat(60) + '\n');

  const successfulReels = results.filter(r => !r.error);
  const failedReels = results.filter(r => r.error);

  console.log(`✅ Successful: ${successfulReels.length}`);
  console.log(`❌ Failed: ${failedReels.length}\n`);

  if (successfulReels.length > 0) {
    console.log('📹 READY FOR PREVIEW:\n');

    successfulReels.forEach((reel, index) => {
      console.log(`${index + 1}. ${reel.reelId}`);
      console.log(`   Original: ${reel.originalSizeMB} MB → Compressed: ${reel.finalSizeMB} MB`);
      console.log(`   Theme: ${reel.theme} | Music: ${reel.musicTrack}`);
      console.log(`   Video: ${reel.videoPath}`);
      console.log(`   Thumbnail: ${reel.thumbnailPath}`);
      console.log(`   Caption Preview:`);
      console.log(`   "${reel.caption.split('\\n')[0]}..."`);
      console.log('');
    });
  }

  if (failedReels.length > 0) {
    console.log('\n❌ FAILED:\n');
    failedReels.forEach(reel => {
      console.log(`   ${reel.reelId}: ${reel.error}`);
    });
  }

  // Save preview metadata
  const previewPath = join(PREVIEW_DIR, 'preview_metadata.json');
  writeFileSync(previewPath, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log(`✨ Preview saved: ${previewPath}`);
  console.log('='.repeat(60) + '\n');
})();
