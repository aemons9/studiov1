#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *  VERALABS PREMIUM BRANDING V2 - Instagram Optimized
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *  Improved design matching reference style with enhancements:
 *    - Refined typography hierarchy (italic+regular title split)
 *    - Premium gradient overlays
 *    - Elegant blush/champagne accent colors
 *    - Slide indicators
 *    - Instagram-optimized 4:5 format
 *    - Teaser stories in 9:16 format
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE_DIR = '/home/ecolex/version1';
const OUT_BASE = '/home/ecolex/version1/veralabs-premium-carousels';
const STORIES_DIR = '/home/ecolex/version1/veralabs-premium-carousels/teaser-stories';
const SINCE_DATE = '2025-01-13';
const MAX_CAROUSEL_SIZE = 5;

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM THEME DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const THEMES = {
  golden_hour: {
    keywords: ['golden', 'sunset', 'warm', 'amber', 'hour', 'sunlight'],
    category: 'GOLDEN HOUR',
    titles: [
      { first: 'golden', second: 'radiance', sub: 'light becomes art' },
      { first: 'amber', second: 'glow', sub: 'warmth unveiled' },
      { first: 'sunset', second: 'muse', sub: 'magic hour beauty' },
      { first: 'golden', second: 'dreams', sub: 'bathed in light' }
    ],
    accent: '#e8d5c4'
  },
  mirror_intimate: {
    keywords: ['mirror', 'reflection', 'selfie', 'bedroom', 'influencer'],
    category: 'INTIMATE REFLECTIONS',
    titles: [
      { first: 'mirror', second: 'whispers', sub: 'private moments' },
      { first: 'reflected', second: 'beauty', sub: 'doubled elegance' },
      { first: 'self', second: 'portrait', sub: 'intimate visions' },
      { first: 'bedroom', second: 'muse', sub: 'personal sanctuary' }
    ],
    accent: '#d4c4b8'
  },
  noir_mesh: {
    keywords: ['noir', 'mesh', 'black', 'dark', 'shadow', 'obsidian', 'ebony', 'lace'],
    category: 'TEXTILE ARTISTRY',
    titles: [
      { first: 'lace', second: 'renaissance', sub: 'rebirth of beauty' },
      { first: 'french', second: 'elegance', sub: 'timeless sophistication' },
      { first: 'noir', second: 'poetry', sub: 'shadows speak' },
      { first: 'dark', second: 'romance', sub: 'mystery unveiled' },
      { first: 'mesh', second: 'artistry', sub: 'woven dreams' }
    ],
    accent: '#e8d5d5'
  },
  bathing_ritual: {
    keywords: ['bath', 'water', 'wet', 'steam', 'shower', 'spa', 'ritual'],
    category: 'WATER SANCTUARY',
    titles: [
      { first: 'bathing', second: 'ritual', sub: 'sacred waters' },
      { first: 'aqua', second: 'goddess', sub: 'liquid elegance' },
      { first: 'steam', second: 'dreams', sub: 'veiled beauty' },
      { first: 'water', second: 'nymph', sub: 'ethereal grace' }
    ],
    accent: '#c4d5e8'
  },
  boudoir_luxury: {
    keywords: ['boudoir', 'velvet', 'silk', 'luxury', 'lingerie', 'intimate', 'platinum'],
    category: 'PRIVATE COLLECTION',
    titles: [
      { first: 'velvet', second: 'dreams', sub: 'luxury unveiled' },
      { first: 'silk', second: 'whispers', sub: 'intimate luxury' },
      { first: 'boudoir', second: 'muse', sub: 'private sanctuary' },
      { first: 'platinum', second: 'elegance', sub: 'refined beauty' }
    ],
    accent: '#d5c4d8'
  },
  candlelit: {
    keywords: ['candle', 'candlelit', 'flame', 'flicker', 'firelight', 'fire'],
    category: 'FLAME & SHADOW',
    titles: [
      { first: 'candle', second: 'lit', sub: 'dancing shadows' },
      { first: 'flame', second: 'kissed', sub: 'warm embrace' },
      { first: 'golden', second: 'flicker', sub: 'intimate glow' },
      { first: 'fire', second: 'light', sub: 'primal warmth' }
    ],
    accent: '#e8d4b8'
  },
  masterclass: {
    keywords: ['masterclass', 'master', 'classical', 'renaissance', 'venus', 'artistic'],
    category: 'FINE ART SERIES',
    titles: [
      { first: 'classical', second: 'beauty', sub: 'timeless artistry' },
      { first: 'venus', second: 'rising', sub: 'goddess unveiled' },
      { first: 'master', second: 'work', sub: 'artistic vision' },
      { first: 'renaissance', second: 'muse', sub: 'eternal beauty' }
    ],
    accent: '#d8d4c4'
  },
  default: {
    category: 'EXCLUSIVE SERIES',
    titles: [
      { first: 'private', second: 'collection', sub: 'exclusive artistry' },
      { first: 'intimate', second: 'visions', sub: 'unveiled beauty' },
      { first: 'sensual', second: 'art', sub: 'pure elegance' },
      { first: 'muse', second: 'unveiled', sub: 'artistic expression' }
    ],
    accent: '#e0d5c8'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM BRANDING OVERLAY - Matching Reference Style
// ═══════════════════════════════════════════════════════════════════════════════

function createPremiumOverlay(category, titleFirst, titleSecond, subtitle, slideNum, totalSlides, accentColor) {
  const width = 1080;
  const height = 1350;

  // Premium gradient with stronger bottom fade
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Top gradient - subtle -->
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.35)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0)"/>
        </linearGradient>

        <!-- Bottom gradient - stronger for text readability -->
        <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="40%" style="stop-color:rgba(0,0,0,0.25)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.75)"/>
        </linearGradient>
      </defs>

      <!-- Top gradient overlay -->
      <rect x="0" y="0" width="${width}" height="180" fill="url(#topGrad)"/>

      <!-- Bottom gradient overlay -->
      <rect x="0" y="${height - 400}" width="${width}" height="400" fill="url(#bottomGrad)"/>

      <!-- Category header (top center) -->
      <text x="${width/2}" y="65"
            font-family="Arial, Helvetica, sans-serif"
            font-size="14"
            font-weight="300"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="6">${category}</text>

      <!-- Decorative line under category -->
      <line x1="${width/2 - 60}" y1="85" x2="${width/2 + 60}" y2="85"
            stroke="${accentColor}" stroke-width="0.5" opacity="0.6"/>

      <!-- Main title - two-part styling -->
      <!-- First word: italic serif -->
      <text x="60" y="${height - 165}"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="52"
            font-style="italic"
            font-weight="400"
            fill="${accentColor}">${titleFirst}</text>

      <!-- Second word: regular sans-serif, positioned after first -->
      <text x="${60 + titleFirst.length * 28}" y="${height - 165}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="52"
            font-weight="300"
            fill="white">${titleSecond}</text>

      <!-- Subtitle -->
      <text x="60" y="${height - 115}"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="18"
            font-style="italic"
            font-weight="300"
            fill="rgba(255,255,255,0.75)">${subtitle}</text>

      <!-- Slide indicator (bottom left) -->
      <text x="60" y="${height - 45}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="13"
            font-weight="300"
            fill="rgba(255,255,255,0.5)">${slideNum}/${totalSlides}</text>

      <!-- VERALABS branding (bottom right) -->
      <text x="${width - 60}" y="${height - 45}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="14"
            font-weight="400"
            fill="rgba(255,255,255,0.7)"
            text-anchor="end"
            letter-spacing="3">VERALABS</text>
    </svg>
  `);
}

// Story overlay (9:16 format) - Premium version
function createPremiumStoryOverlay(category, titleFirst, titleSecond, subtitle, accentColor) {
  const width = 1080;
  const height = 1920;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="storyTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.5)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0)"/>
        </linearGradient>
        <linearGradient id="storyBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="50%" style="stop-color:rgba(0,0,0,0.4)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.85)"/>
        </linearGradient>
      </defs>

      <!-- Gradients -->
      <rect x="0" y="0" width="${width}" height="300" fill="url(#storyTopGrad)"/>
      <rect x="0" y="${height - 500}" width="${width}" height="500" fill="url(#storyBottomGrad)"/>

      <!-- Top branding -->
      <text x="${width/2}" y="80"
            font-family="Arial, Helvetica, sans-serif"
            font-size="16"
            font-weight="300"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="8">VERALABS</text>

      <text x="${width/2}" y="105"
            font-family="Arial, Helvetica, sans-serif"
            font-size="11"
            font-weight="300"
            fill="rgba(255,255,255,0.5)"
            text-anchor="middle"
            letter-spacing="4">STUDIO</text>

      <!-- Category -->
      <text x="${width/2}" y="${height - 280}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="13"
            font-weight="300"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="5">${category}</text>

      <!-- Main title -->
      <text x="${width/2}" y="${height - 210}"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="42"
            font-style="italic"
            fill="${accentColor}"
            text-anchor="middle">${titleFirst}<tspan font-style="normal" font-family="Arial, Helvetica, sans-serif" font-weight="300" fill="white">${titleSecond}</tspan></text>

      <!-- Subtitle -->
      <text x="${width/2}" y="${height - 160}"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="18"
            font-style="italic"
            fill="rgba(255,255,255,0.7)"
            text-anchor="middle">${subtitle}</text>

      <!-- CTA -->
      <text x="${width/2}" y="${height - 90}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="14"
            font-weight="400"
            fill="white"
            text-anchor="middle"
            letter-spacing="2">NEW COLLECTION</text>

      <!-- Swipe indicator -->
      <text x="${width/2}" y="${height - 55}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="11"
            fill="rgba(255,255,255,0.5)"
            text-anchor="middle">TAP TO VIEW</text>
    </svg>
  `);
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE PROCESSING
// ═══════════════════════════════════════════════════════════════════════════════

async function brandImage(srcPath, outPath, category, titleFirst, titleSecond, subtitle, slideNum, totalSlides, accentColor) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createPremiumOverlay(category, titleFirst, titleSecond, subtitle, slideNum, totalSlides, accentColor);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 94 })
      .toFile(outPath);

    return true;
  } catch (err) {
    return false;
  }
}

async function createStory(srcPath, outPath, category, titleFirst, titleSecond, subtitle, accentColor) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1920, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createPremiumStoryOverlay(category, titleFirst, titleSecond, subtitle, accentColor);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 92 })
      .toFile(outPath);

    return true;
  } catch (err) {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME DETECTION & HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function detectTheme(folderPath, filename) {
  const combined = (folderPath + ' ' + filename).toLowerCase();

  for (const [themeKey, themeInfo] of Object.entries(THEMES)) {
    if (themeKey === 'default') continue;
    if (themeInfo.keywords && themeInfo.keywords.some(kw => combined.includes(kw))) {
      return themeKey;
    }
  }
  return 'default';
}

function getRandomTitle(theme) {
  const themeInfo = THEMES[theme] || THEMES.default;
  return themeInfo.titles[Math.floor(Math.random() * themeInfo.titles.length)];
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAPTION GENERATION - Max Engagement
// ═══════════════════════════════════════════════════════════════════════════════

function generateCaption(theme, titleInfo, imageCount) {
  const themeInfo = THEMES[theme] || THEMES.default;

  const hashtags = [
    '#VERALABS', '#FineArtPhotography', '#BoudoirArt', '#IntimatePortraiture',
    '#ArtisticNude', '#SensualArt', '#LuxuryBoudoir', '#PrivateCollection',
    '#Meera', '#IndianBeauty', '#GoldenHour', '#ChiaroscuroArt',
    '#BodyPositivity', '#FormAndLight', '#ArtOfSeduction', '#ModernMuse'
  ].sort(() => 0.5 - Math.random()).slice(0, 12);

  return `${titleInfo.first}${titleInfo.second}
${themeInfo.category}

"${titleInfo.sub}"

${imageCount} frames of pure artistry. Swipe through the complete collection.

Where light meets form. Where shadow becomes poetry.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${hashtags.join(' ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Link in bio for full collection
@veralabs.studio`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PROCESSING
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ VERALABS PREMIUM BRANDING V2 - Instagram Optimized                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   • Premium typography (italic+regular title style)                          ║
║   • Enhanced gradient overlays                                               ║
║   • Slide indicators & VERALABS branding                                     ║
║   • Carousel organization (max 5 per set)                                    ║
║   • Teaser stories (9:16 format)                                             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  // Create output directories
  if (!fs.existsSync(OUT_BASE)) fs.mkdirSync(OUT_BASE, { recursive: true });
  if (!fs.existsSync(STORIES_DIR)) fs.mkdirSync(STORIES_DIR, { recursive: true });

  // Find all recent images
  console.log('🔍 Finding images since', SINCE_DATE, '...\n');
  const findCmd = `find ${BASE_DIR}/generated-* -name "*.png" -newermt "${SINCE_DATE}" -type f 2>/dev/null`;
  const allImages = execSync(findCmd, { encoding: 'utf-8' }).trim().split('\n').filter(Boolean);

  console.log(`📊 Found ${allImages.length} images to process\n`);

  // Group by theme
  const themeGroups = {};
  for (const img of allImages) {
    const folder = path.dirname(img);
    const filename = path.basename(img);
    const theme = detectTheme(folder, filename);

    if (!themeGroups[theme]) themeGroups[theme] = [];
    themeGroups[theme].push({ path: img, folder, filename });
  }

  console.log(`📁 Detected ${Object.keys(themeGroups).length} theme categories\n`);

  let carouselCount = 0;
  let totalBranded = 0;
  let storiesCreated = 0;

  for (const [theme, images] of Object.entries(themeGroups)) {
    const themeInfo = THEMES[theme] || THEMES.default;
    const themeDir = path.join(OUT_BASE, theme);
    if (!fs.existsSync(themeDir)) fs.mkdirSync(themeDir, { recursive: true });

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📂 ${themeInfo.category} - ${images.length} images`);
    console.log(`${'═'.repeat(60)}`);

    // Split into carousels
    const carousels = [];
    for (let i = 0; i < images.length; i += MAX_CAROUSEL_SIZE) {
      carousels.push(images.slice(i, i + MAX_CAROUSEL_SIZE));
    }

    for (let c = 0; c < carousels.length; c++) {
      const carousel = carousels[c];
      carouselCount++;
      const titleInfo = getRandomTitle(theme);
      const carouselName = `${titleInfo.first}_${titleInfo.second}_${String(carouselCount).padStart(3, '0')}`;
      const carouselDir = path.join(themeDir, carouselName);
      if (!fs.existsSync(carouselDir)) fs.mkdirSync(carouselDir, { recursive: true });

      console.log(`\n  [${carouselCount}] ${titleInfo.first}${titleInfo.second} - ${carousel.length} slides`);

      // Brand each image
      for (let i = 0; i < carousel.length; i++) {
        const img = carousel[i];
        const outPath = path.join(carouselDir, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

        const success = await brandImage(
          img.path,
          outPath,
          themeInfo.category,
          titleInfo.first,
          titleInfo.second,
          titleInfo.sub,
          i + 1,
          carousel.length,
          themeInfo.accent
        );

        if (success) {
          totalBranded++;
          process.stdout.write(`    ✅ ${i + 1}/${carousel.length}\r`);
        }
      }
      console.log(`    ✅ Branded ${carousel.length} slides`);

      // Generate caption
      const caption = generateCaption(theme, titleInfo, carousel.length);
      fs.writeFileSync(path.join(carouselDir, 'caption.txt'), caption);

      // Create teaser story
      const storyPath = path.join(STORIES_DIR, `story_${carouselName}.jpg`);
      const storySuccess = await createStory(
        carousel[0].path,
        storyPath,
        themeInfo.category,
        titleInfo.first,
        titleInfo.second,
        titleInfo.sub,
        themeInfo.accent
      );
      if (storySuccess) storiesCreated++;
    }
  }

  console.log(`

════════════════════════════════════════════════════════════════════════════════
✨ VERALABS PREMIUM BRANDING COMPLETE
════════════════════════════════════════════════════════════════════════════════

   📊 Total Branded: ${totalBranded} images
   📁 Carousels: ${carouselCount}
   📱 Stories: ${storiesCreated}

   📂 Output: ${OUT_BASE}
   📱 Stories: ${STORIES_DIR}

════════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
