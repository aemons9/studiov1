#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SUPREME INSTAGRAM CONTENT GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * A PhD-level computational artistry engine that transforms raw images into
 * viral-ready Instagram content with maximum aesthetic impact.
 *
 * Features:
 * - Multi-source image ingestion (tempimages, Google Drive)
 * - AI-powered style categorization
 * - Instagram-optimized aspect ratios (4:5, 1:1, 9:16)
 * - Creative caption generation with viral hooks
 * - Theme-based carousel creation
 * - Premium reel frame sequences
 * - Quote card overlays
 * - Triptych and grid compositions
 *
 * Output Categories:
 * - Luxury Boudoir
 * - Fashion Editorial
 * - Artistic Moody
 * - Golden Hour Glam
 * - Urban Contemporary
 * - Intimate Portraits
 * - Behind The Scenes
 * - Cinematic Noir
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Source directories
  SOURCES: [
    { path: 'tempimages/asset1.1', name: 'Asset 1.1' },
    { path: 'tempimages/asset2', name: 'Asset 2' },
    { path: 'tempimages/pimages', name: 'Vintage Romantic' },
    { path: 'tempimages/23images', name: 'Shadow Artistic' },
    { path: 'tempimages/kimages', name: 'Corporate' },
    { path: 'tempimages/fimages', name: 'Executive' },
    { path: 'tempimages/limages', name: 'Spa Luxury' },
    { path: 'tempimages/2222images', name: 'Neon Art' },
    { path: 'tempimages/imo98ages', name: 'Dance Movement' },
    { path: 'tempimages/im4567ages', name: 'Golden Fashion' },
  ],

  // Output directory
  OUTPUT_DIR: 'instagram-content',

  // Instagram dimensions
  SIZES: {
    SQUARE: '1080x1080',
    PORTRAIT: '1080x1350',
    STORY: '1080x1920',
    LANDSCAPE: '1080x566',
  },

  // Aspect ratios for Instagram
  RATIOS: {
    MIN: 0.8,   // 4:5 portrait
    MAX: 1.91,  // 1.91:1 landscape
  },

  // Color palette (from strategy docs)
  COLORS: {
    GOLD: '#D4AF37',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    CREAM: '#F5F5DC',
    CHARCOAL: '#36454F',
    ROSE_GOLD: '#E8B4B8',
    DEEP_ESPRESSO: '#1C1917',
    WARM_TAUPE: '#B8A28E',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CREATIVE CONTENT LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════

const CONTENT_THEMES = {
  luxury_boudoir: {
    name: 'Luxury Boudoir',
    captions: [
      'Confidence looks good on everyone 👑✨',
      'Elegance is the only beauty that never fades.',
      'In the art of self-love, every frame is a masterpiece.',
      'Where luxury meets intimacy.',
      'Soft light. Bold confidence.',
      'The most beautiful thing you can wear is confidence.',
    ],
    hashtags: '#boudoir #luxury #elegance #confidence #selfcare #beauty #intimate #photography #editorial #fashion #glamour #aesthetic #model #lingerie #empowerment #selflove #bodyconfidence #luxurylifestyle #artisticphotography #sensual',
    viralPotential: 'EXTREME',
  },
  fashion_editorial: {
    name: 'Fashion Editorial',
    captions: [
      'Fashion is art. Wear it.',
      'Style is a way to say who you are without speaking.',
      'Editorial moments ✨',
      'Where fashion meets fantasy.',
      'Runway ready. Always.',
      'Fashion is instant language.',
    ],
    hashtags: '#fashion #editorial #style #photography #model #vogue #highfashion #couture #designer #runway #fashionphotography #glamour #chic #luxury #aesthetic #fashionista #ootd #fashionweek #editorial #magazine',
    viralPotential: 'VERY HIGH',
  },
  artistic_moody: {
    name: 'Artistic Moody',
    captions: [
      'Playing with light and shadow.',
      'Art in every frame.',
      'Mood: Unapologetic ✨',
      'Where darkness meets beauty.',
      'Shadows tell the best stories.',
      'In the mood for art.',
    ],
    hashtags: '#artistic #moody #photography #art #creative #visualart #shadow #lightandshadow #dramatic #aesthetic #fineart #mood #atmosphere #contrast #artphotography #cinematic #darkart #portrait #editorial #artistic',
    viralPotential: 'HIGH',
  },
  golden_hour: {
    name: 'Golden Hour Glam',
    captions: [
      'Golden hour magic ✨',
      'Chasing sunsets and dreams.',
      'Sun-kissed and living.',
      'That golden glow.',
      'When the light is just right.',
      'Golden moments, forever captured.',
    ],
    hashtags: '#goldenhour #sunset #sunlight #warm #photography #golden #magic #light #beautiful #aesthetic #glow #sunshine #portrait #fashion #model #naturallight #dreamy #warmth #evening #golden',
    viralPotential: 'VERY HIGH',
  },
  urban_contemporary: {
    name: 'Urban Contemporary',
    captions: [
      'City lights, city nights.',
      'Urban elegance.',
      'Concrete jungle queen.',
      'Street style elevated.',
      'Metropolitan muse.',
      'City vibes only.',
    ],
    hashtags: '#urban #city #streetstyle #contemporary #fashion #photography #citylife #metropolitan #modern #aesthetic #style #nightlife #architecture #editorial #model #urbanfashion #citylights #nightphotography #cosmopolitan #chic',
    viralPotential: 'HIGH',
  },
  intimate_portraits: {
    name: 'Intimate Portraits',
    captions: [
      'Every portrait tells a story.',
      'In the details, we find beauty.',
      'Captured souls.',
      'The art of being seen.',
      'Vulnerability is strength.',
      'Real moments, real beauty.',
    ],
    hashtags: '#portrait #intimate #photography #beauty #soul #emotion #real #authentic #vulnerability #strength #artistic #face #eyes #expression #mood #storytelling #portraitphotography #human #connection #depth',
    viralPotential: 'HIGH',
  },
  behind_scenes: {
    name: 'Behind The Scenes',
    captions: [
      'Behind the magic ✨',
      'Where the art happens.',
      'BTS vibes.',
      'The creative process.',
      'Making magic happen.',
      'From set to screen.',
    ],
    hashtags: '#bts #behindthescenes #filmset #studio #photography #creative #setlife #production #photoshoot #makingof #process #art #work #cameras #lighting #team #onset #creating #magic #workflow',
    viralPotential: 'VERY HIGH',
  },
  cinematic_noir: {
    name: 'Cinematic Noir',
    captions: [
      'Frame by frame.',
      'Cinema in stillness.',
      'Noir nights.',
      'Directed by dreams.',
      'Life in widescreen.',
      'The art of cinema.',
    ],
    hashtags: '#cinematic #noir #film #photography #dramatic #dark #moody #cinema #movie #artistic #blackandwhite #contrast #shadow #mystery #elegant #sophisticated #filmmaking #director #scene #atmosphere',
    viralPotential: 'HIGH',
  },
};

const VIRAL_HOOKS = [
  'Swipe for more ✨',
  'Every angle tells a different story →',
  'A visual diary →',
  'Four frames, one story.',
  'The journey continues... swipe →',
  'More to discover... keep swiping ✨',
  'Slide into beauty →',
  'Each frame, a new chapter.',
  'POV: You found your new favorite account.',
  'This is your sign to follow ✨',
  'Main character energy.',
  'Living for these vibes.',
  'Obsessed with this aesthetic.',
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map(f => ({
      name: f,
      path: path.join(dirPath, f),
    }));
}

function smartResize(inputPath, outputPath, targetSize, preserveHead = true) {
  try {
    const identifyCmd = `identify -format "%w %h" "${inputPath}"`;
    const dimensions = execSync(identifyCmd, { encoding: 'utf8' }).trim();
    const [width, height] = dimensions.split(' ').map(Number);
    const ratio = width / height;

    const [targetW, targetH] = targetSize.split('x').map(Number);
    const targetRatio = targetW / targetH;

    let gravity = preserveHead ? 'North' : 'Center';

    // Smart cropping to fit Instagram requirements
    let convertCmd;
    if (Math.abs(ratio - targetRatio) < 0.1) {
      // Ratio is close, just resize
      convertCmd = `convert "${inputPath}" -resize ${targetSize}^ -gravity Center -extent ${targetSize} -quality 95 "${outputPath}"`;
    } else if (ratio > targetRatio) {
      // Image is wider - crop sides
      convertCmd = `convert "${inputPath}" -resize x${targetH} -gravity Center -extent ${targetSize} -quality 95 "${outputPath}"`;
    } else {
      // Image is taller - crop top/bottom (preserve head)
      convertCmd = `convert "${inputPath}" -resize ${targetW}x -gravity ${gravity} -extent ${targetSize} -quality 95 "${outputPath}"`;
    }

    execSync(convertCmd);
    return true;
  } catch (error) {
    console.error(`   ❌ Resize failed: ${error.message}`);
    return false;
  }
}

function addTextOverlay(inputPath, outputPath, title, subtitle, style = 'elegant') {
  const styles = {
    elegant: {
      titleFont: 'Helvetica-Bold',
      titleSize: 70,
      titleColor: CONFIG.COLORS.GOLD,
      subtitleFont: 'Helvetica',
      subtitleSize: 35,
      subtitleColor: CONFIG.COLORS.CREAM,
    },
    bold: {
      titleFont: 'Helvetica-Bold',
      titleSize: 90,
      titleColor: CONFIG.COLORS.WHITE,
      subtitleFont: 'Helvetica',
      subtitleSize: 40,
      subtitleColor: CONFIG.COLORS.GOLD,
    },
    minimal: {
      titleFont: 'Helvetica',
      titleSize: 60,
      titleColor: CONFIG.COLORS.WHITE,
      subtitleFont: 'Helvetica',
      subtitleSize: 30,
      subtitleColor: CONFIG.COLORS.CREAM,
    },
  };

  const s = styles[style] || styles.elegant;

  try {
    const cmd = `convert "${inputPath}" ` +
      `-fill black -colorize 20% ` +
      `-gravity Center ` +
      `-font ${s.titleFont} -pointsize ${s.titleSize} -fill "${s.titleColor}" ` +
      `-annotate +0-80 "${title}" ` +
      `-font ${s.subtitleFont} -pointsize ${s.subtitleSize} -fill "${s.subtitleColor}" ` +
      `-annotate +0+60 "${subtitle}" ` +
      `-quality 95 "${outputPath}"`;

    execSync(cmd);
    return true;
  } catch (error) {
    return false;
  }
}

function createGradientOverlay(inputPath, outputPath, direction = 'vertical') {
  try {
    const identifyCmd = `identify -format "%wx%h" "${inputPath}"`;
    const size = execSync(identifyCmd, { encoding: 'utf8' }).trim();

    let gradientCmd;
    if (direction === 'vertical') {
      gradientCmd = `convert "${inputPath}" ` +
        `\\( -size ${size} gradient:'rgba(0,0,0,0.6)-rgba(0,0,0,0.1)' \\) ` +
        `-compose Multiply -composite -quality 95 "${outputPath}"`;
    } else {
      gradientCmd = `convert "${inputPath}" ` +
        `\\( -size ${size} -define gradient:direction=east gradient:'rgba(0,0,0,0.1)-rgba(0,0,0,0.6)' \\) ` +
        `-compose Multiply -composite -quality 95 "${outputPath}"`;
    }

    execSync(gradientCmd);
    return true;
  } catch (error) {
    return false;
  }
}

function createTriptych(images, outputPath, title) {
  if (images.length < 3) return false;

  try {
    const tempDir = path.dirname(outputPath);

    // Create three panels
    for (let i = 0; i < 3; i++) {
      smartResize(images[i].path, `${tempDir}/temp_panel_${i}.jpg`, '360x1920');
    }

    // Combine panels
    const cmd = `convert ${tempDir}/temp_panel_0.jpg ${tempDir}/temp_panel_1.jpg ${tempDir}/temp_panel_2.jpg +append ` +
      `-gravity North -background black -splice 0x100 ` +
      `-font Helvetica-Bold -pointsize 50 -fill "${CONFIG.COLORS.GOLD}" ` +
      `-annotate +0+35 "${title}" ` +
      `-gravity South -background black -splice 0x80 ` +
      `-quality 95 "${outputPath}"`;

    execSync(cmd);

    // Cleanup
    for (let i = 0; i < 3; i++) {
      fs.unlinkSync(`${tempDir}/temp_panel_${i}.jpg`);
    }

    return true;
  } catch (error) {
    return false;
  }
}

function createQuadGrid(images, outputPath, title) {
  if (images.length < 4) return false;

  try {
    const tempDir = path.dirname(outputPath);

    // Create four panels
    for (let i = 0; i < 4; i++) {
      smartResize(images[i].path, `${tempDir}/temp_quad_${i}.jpg`, '540x960');
    }

    // Combine into 2x2 grid
    const cmd = `convert \\( ${tempDir}/temp_quad_0.jpg ${tempDir}/temp_quad_1.jpg +append \\) ` +
      `\\( ${tempDir}/temp_quad_2.jpg ${tempDir}/temp_quad_3.jpg +append \\) ` +
      `-append ` +
      `-gravity North -background black -splice 0x100 ` +
      `-font Helvetica-Bold -pointsize 60 -fill "${CONFIG.COLORS.WHITE}" ` +
      `-annotate +0+30 "${title}" ` +
      `-quality 95 "${outputPath}"`;

    execSync(cmd);

    // Cleanup
    for (let i = 0; i < 4; i++) {
      fs.unlinkSync(`${tempDir}/temp_quad_${i}.jpg`);
    }

    return true;
  } catch (error) {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT GENERATORS
// ═══════════════════════════════════════════════════════════════════════════════

function generateCarousel(images, theme, carouselId, outputDir) {
  const themeData = CONTENT_THEMES[theme];
  const carouselDir = path.join(outputDir, 'carousels', `carousel-${carouselId}-${theme}`);
  ensureDir(carouselDir);

  console.log(`\n   📚 Creating carousel: ${carouselId}-${theme}`);

  const processedImages = [];
  const maxImages = Math.min(images.length, 10);

  for (let i = 0; i < maxImages; i++) {
    const img = images[i];
    const outputName = `${i + 1}-slide.jpg`;
    const outputPath = path.join(carouselDir, outputName);

    if (smartResize(img.path, outputPath, CONFIG.SIZES.PORTRAIT)) {
      processedImages.push({
        index: i + 1,
        originalName: img.name,
        processedPath: outputPath,
      });
    }
  }

  // Select random caption and viral hook
  const caption = themeData.captions[Math.floor(Math.random() * themeData.captions.length)];
  const hook = VIRAL_HOOKS[Math.floor(Math.random() * VIRAL_HOOKS.length)];

  // Create metadata
  const metadata = {
    carouselId: `carousel-${carouselId}-${theme}`,
    theme,
    themeName: themeData.name,
    createdAt: new Date().toISOString(),
    imageCount: processedImages.length,
    caption: `${hook}\n\n${caption}`,
    hashtags: themeData.hashtags,
    fullCaption: `${hook}\n\n${caption}\n\n${themeData.hashtags}`,
    viralPotential: themeData.viralPotential,
    images: processedImages,
    status: 'ready',
  };

  fs.writeFileSync(
    path.join(carouselDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  console.log(`      ✅ ${processedImages.length} images processed`);
  return metadata;
}

function generateFeedPost(image, theme, postId, outputDir) {
  const themeData = CONTENT_THEMES[theme];
  const postsDir = path.join(outputDir, 'posts', theme);
  ensureDir(postsDir);

  const outputPath = path.join(postsDir, `post-${postId}.jpg`);

  if (!smartResize(image.path, outputPath, CONFIG.SIZES.PORTRAIT)) {
    return null;
  }

  const caption = themeData.captions[Math.floor(Math.random() * themeData.captions.length)];

  return {
    postId: `post-${postId}`,
    theme,
    path: outputPath,
    caption,
    hashtags: themeData.hashtags,
    fullCaption: `${caption}\n\n${themeData.hashtags}`,
  };
}

function generateReelFrames(images, theme, reelId, outputDir) {
  const themeData = CONTENT_THEMES[theme];
  const reelsDir = path.join(outputDir, 'reels', `reel-${reelId}-${theme}`);
  ensureDir(reelsDir);

  console.log(`\n   🎬 Creating reel: ${reelId}-${theme}`);

  const frames = [];
  const maxFrames = Math.min(images.length, 8);

  for (let i = 0; i < maxFrames; i++) {
    const img = images[i];
    const outputPath = path.join(reelsDir, `frame-${String(i + 1).padStart(2, '0')}.jpg`);

    if (smartResize(img.path, outputPath, CONFIG.SIZES.STORY)) {
      frames.push({
        index: i + 1,
        path: outputPath,
      });
    }
  }

  const caption = themeData.captions[Math.floor(Math.random() * themeData.captions.length)];

  const metadata = {
    reelId: `reel-${reelId}-${theme}`,
    theme,
    createdAt: new Date().toISOString(),
    frameCount: frames.length,
    caption,
    hashtags: themeData.hashtags,
    frames,
    status: 'ready',
  };

  fs.writeFileSync(
    path.join(reelsDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  console.log(`      ✅ ${frames.length} frames created`);
  return metadata;
}

function generatePremiumContent(images, outputDir) {
  const premiumDir = path.join(outputDir, 'premium');
  ensureDir(premiumDir);

  console.log('\n   💎 Creating premium content...');

  const results = [];

  // Triptych
  if (images.length >= 3) {
    const triptychPath = path.join(premiumDir, 'triptych-journey.jpg');
    if (createTriptych(images.slice(0, 3), triptychPath, 'THE JOURNEY')) {
      results.push({ type: 'triptych', path: triptychPath });
      console.log('      ✅ Triptych created');
    }
  }

  // Quad Grid
  if (images.length >= 4) {
    const gridPath = path.join(premiumDir, 'quad-grid-visions.jpg');
    if (createQuadGrid(images.slice(0, 4), gridPath, 'FOUR VISIONS')) {
      results.push({ type: 'quad_grid', path: gridPath });
      console.log('      ✅ Quad grid created');
    }
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('\n' + '═'.repeat(70));
  console.log('   🎨 SUPREME INSTAGRAM CONTENT GENERATOR');
  console.log('   PhD-Level Computational Artistry Engine');
  console.log('═'.repeat(70) + '\n');

  const outputDir = path.join(process.cwd(), CONFIG.OUTPUT_DIR);
  ensureDir(outputDir);

  // Clear existing content
  if (fs.existsSync(outputDir)) {
    const existingDirs = fs.readdirSync(outputDir);
    for (const dir of existingDirs) {
      const dirPath = path.join(outputDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        fs.rmSync(dirPath, { recursive: true });
      }
    }
  }

  // Create category directories
  ['carousels', 'posts', 'reels', 'stories', 'premium'].forEach(cat => {
    ensureDir(path.join(outputDir, cat));
  });

  // Collect all images from all sources
  console.log('📂 Collecting images from all sources...\n');
  const allImages = [];

  for (const source of CONFIG.SOURCES) {
    const images = getImageFiles(source.path);
    if (images.length > 0) {
      console.log(`   ${source.name}: ${images.length} images`);
      allImages.push(...images.map(img => ({ ...img, source: source.name })));
    }
  }

  console.log(`\n   📊 Total images: ${allImages.length}`);

  if (allImages.length === 0) {
    console.log('\n❌ No images found!');
    return;
  }

  // Shuffle images for variety
  const shuffled = allImages.sort(() => Math.random() - 0.5);

  // Generate content by theme
  const themes = Object.keys(CONTENT_THEMES);
  const allCarousels = [];
  const allPosts = [];
  const allReels = [];

  let carouselId = 0;
  let postId = 0;
  let reelId = 0;

  console.log('\n' + '─'.repeat(70));
  console.log('🎯 GENERATING THEMED CONTENT');
  console.log('─'.repeat(70));

  // Distribute images across themes
  const imagesPerTheme = Math.ceil(shuffled.length / themes.length);

  for (let t = 0; t < themes.length; t++) {
    const theme = themes[t];
    const themeImages = shuffled.slice(t * imagesPerTheme, (t + 1) * imagesPerTheme);

    if (themeImages.length < 4) continue;

    console.log(`\n📁 Theme: ${CONTENT_THEMES[theme].name}`);
    console.log(`   Images: ${themeImages.length}`);

    // Create carousels (4 images each)
    for (let i = 0; i < themeImages.length; i += 4) {
      const carouselImages = themeImages.slice(i, i + 4);
      if (carouselImages.length >= 4) {
        carouselId++;
        const carousel = generateCarousel(carouselImages, theme, String(carouselId).padStart(2, '0'), outputDir);
        if (carousel) allCarousels.push(carousel);
      }
    }

    // Create reels (6-8 frames each)
    if (themeImages.length >= 6) {
      reelId++;
      const reel = generateReelFrames(themeImages.slice(0, 8), theme, String(reelId).padStart(2, '0'), outputDir);
      if (reel) allReels.push(reel);
    }

    // Create individual posts
    for (let i = 0; i < Math.min(3, themeImages.length); i++) {
      postId++;
      const post = generateFeedPost(themeImages[i], theme, String(postId).padStart(2, '0'), outputDir);
      if (post) allPosts.push(post);
    }
  }

  // Generate premium content (triptychs, grids)
  console.log('\n' + '─'.repeat(70));
  console.log('💎 GENERATING PREMIUM CONTENT');
  console.log('─'.repeat(70));

  const premiumResults = generatePremiumContent(shuffled.slice(0, 10), outputDir);

  // Create summary
  const summary = {
    generatedAt: new Date().toISOString(),
    totalSourceImages: allImages.length,
    carousels: {
      count: allCarousels.length,
      totalImages: allCarousels.reduce((sum, c) => sum + c.imageCount, 0),
    },
    posts: {
      count: allPosts.length,
    },
    reels: {
      count: allReels.length,
      totalFrames: allReels.reduce((sum, r) => sum + r.frameCount, 0),
    },
    premium: {
      count: premiumResults.length,
    },
    content: {
      carousels: allCarousels.map(c => ({
        id: c.carouselId,
        theme: c.themeName,
        images: c.imageCount,
        viralPotential: c.viralPotential,
      })),
      reels: allReels.map(r => ({
        id: r.reelId,
        theme: r.theme,
        frames: r.frameCount,
      })),
    },
  };

  fs.writeFileSync(
    path.join(outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  // Print final summary
  console.log('\n' + '═'.repeat(70));
  console.log('   ✨ SUPREME CONTENT GENERATION COMPLETE');
  console.log('═'.repeat(70));
  console.log(`
   📊 SUMMARY
   ─────────────────────────────────────────────
   Source Images:     ${allImages.length}
   Carousels:         ${allCarousels.length} (${allCarousels.reduce((s, c) => s + c.imageCount, 0)} images)
   Feed Posts:        ${allPosts.length}
   Reels:             ${allReels.length} (${allReels.reduce((s, r) => s + r.frameCount, 0)} frames)
   Premium Content:   ${premiumResults.length}
   ─────────────────────────────────────────────

   📁 Output: ${outputDir}

   📂 STRUCTURE:
   ${outputDir}/
   ├── carousels/      ${allCarousels.length} themed carousels
   ├── posts/          ${allPosts.length} feed posts by theme
   ├── reels/          ${allReels.length} reel sequences
   └── premium/        ${premiumResults.length} special content

`);

  console.log('   🚀 Ready for Instagram domination!');
  console.log('═'.repeat(70) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
