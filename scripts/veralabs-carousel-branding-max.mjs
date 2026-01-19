#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *  VERALABS MAX-MODE CAROUSEL BRANDING SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 *  Premium Instagram carousel branding with:
 *    - VERALabs signature gradient overlay (matching reference style)
 *    - Intelligent carousel grouping (max 5 per carousel by theme/mood)
 *    - Max-reach captions with trending hashtags
 *    - Teaser stories for upcoming posts
 *    - Category-wise folder organization
 *
 *  Output: /home/ecolex/version1/veralabs-carousels/
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE_DIR = '/home/ecolex/version1';
const OUT_BASE = '/home/ecolex/version1/veralabs-carousels';
const STORIES_DIR = '/home/ecolex/version1/veralabs-carousels/teaser-stories';
const SINCE_DATE = '2025-01-13';
const MAX_CAROUSEL_SIZE = 5;

// ═══════════════════════════════════════════════════════════════════════════════
// THEME DEFINITIONS - For intelligent categorization
// ═══════════════════════════════════════════════════════════════════════════════

const THEMES = {
  golden_hour: {
    keywords: ['golden', 'sunset', 'warm', 'amber', 'hour', 'sunlight'],
    name: 'GOLDEN HOUR',
    collection: 'Light & Shadow Series',
    accent: '#d4a574',
    quotes: [
      'Where light becomes poetry',
      'Golden moments, eternal beauty',
      'Bathed in amber warmth',
      'The magic hour speaks'
    ]
  },
  mirror_intimate: {
    keywords: ['mirror', 'reflection', 'selfie', 'bedroom'],
    name: 'MIRROR INTIMATE',
    collection: 'Reflection Series',
    accent: '#c9b896',
    quotes: [
      'Reflections of desire',
      'The mirror remembers',
      'Double the beauty',
      'Private reflections'
    ]
  },
  noir_mesh: {
    keywords: ['noir', 'mesh', 'black', 'dark', 'shadow', 'obsidian', 'ebony'],
    name: 'NOIR MESH',
    collection: 'Dark Elegance Series',
    accent: '#a89078',
    quotes: [
      'Shadows embrace form',
      'Darkness reveals beauty',
      'Noir elegance',
      'Where shadows dance'
    ]
  },
  bathing_ritual: {
    keywords: ['bath', 'water', 'wet', 'steam', 'shower', 'spa', 'ritual'],
    name: 'BATHING RITUAL',
    collection: 'Water & Shadow Series',
    accent: '#8fb8c9',
    quotes: [
      'Water becomes art',
      'Sacred bathing ritual',
      'Liquid elegance',
      'Steam and serenity'
    ]
  },
  boudoir_luxury: {
    keywords: ['boudoir', 'velvet', 'silk', 'luxury', 'lace', 'lingerie', 'intimate'],
    name: 'BOUDOIR LUXURY',
    collection: 'Private Collection',
    accent: '#c9a8b8',
    quotes: [
      'Intimate luxury',
      'Private sanctuary',
      'Velvet dreams',
      'Whispers of silk'
    ]
  },
  artistic_form: {
    keywords: ['artistic', 'sculpture', 'form', 'curves', 'nude', 'figure'],
    name: 'ARTISTIC FORM',
    collection: 'Fine Art Series',
    accent: '#b8a890',
    quotes: [
      'The art of form',
      'Sculptural beauty',
      'Body as canvas',
      'Curves speak volumes'
    ]
  },
  candlelit: {
    keywords: ['candle', 'candlelit', 'flame', 'flicker', 'firelight'],
    name: 'CANDLELIT',
    collection: 'Flame & Shadow Series',
    accent: '#d4af8a',
    quotes: [
      'Candlelit whispers',
      'Flame and form',
      'Dancing shadows',
      'Warm glow intimacy'
    ]
  },
  masterclass: {
    keywords: ['masterclass', 'master', 'classical', 'renaissance', 'venus'],
    name: 'MASTERCLASS',
    collection: 'Classical Beauty Series',
    accent: '#c4b89a',
    quotes: [
      'Timeless artistry',
      'Classical reimagined',
      'Masters would approve',
      'Renaissance soul'
    ]
  },
  influencer: {
    keywords: ['influencer', 'instagram', 'content', 'ring light', 'creator'],
    name: 'CREATOR INTIMATE',
    collection: 'Digital Muse Series',
    accent: '#d4c4a8',
    quotes: [
      'For your eyes only',
      'Private content',
      'Behind the lens',
      'Exclusive access'
    ]
  },
  default: {
    name: 'PRIVATE COLLECTION',
    collection: 'Exclusive Series',
    accent: '#d4c4a8',
    quotes: [
      'Art meets desire',
      'Unveiled beauty',
      'Intimate artistry',
      'Private moments'
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRENDING HASHTAGS - Max engagement strategy
// ═══════════════════════════════════════════════════════════════════════════════

const CORE_HASHTAGS = [
  '#VERALABS', '#Meera', '#FineArtNude', '#BoudoirArt', '#IntimatePortraiture',
  '#ArtisticNude', '#BodyPositivity', '#SensualArt', '#PrivateCollection'
];

const TRENDING_HASHTAGS = [
  '#ArtOfSeduction', '#GoldenHourMagic', '#ChiaroscuroArt', '#FormAndLight',
  '#CurvesAndConfidence', '#IntimateArt', '#BoudoirPhotography', '#SensualBeauty',
  '#ArtisticExpression', '#BodyArt', '#FigureStudy', '#MoodyPortrait',
  '#DarkAesthetic', '#GoldenGlow', '#ShadowPlay', '#LuxuryBoudoir',
  '#PrivateMoments', '#ExclusiveContent', '#ArtistryUnveiled', '#BeautyInShadow',
  '#SculpturalForm', '#ModernMuse', '#DigitalMuse', '#ContentCreator2025'
];

const NICHE_HASHTAGS = {
  golden_hour: ['#GoldenHourPortrait', '#SunsetVibes', '#WarmTones', '#AmberGlow'],
  mirror_intimate: ['#MirrorSelfie', '#ReflectionArt', '#BedroomAesthetic', '#IntimateReflection'],
  noir_mesh: ['#DarkBeauty', '#NoirAesthetic', '#MeshFashion', '#ShadowArt'],
  bathing_ritual: ['#BathArt', '#WaterNymph', '#SpaVibes', '#BathingBeauty'],
  boudoir_luxury: ['#LuxuryLingerie', '#SilkAndLace', '#BoudoirGoddess', '#IntimateStyle'],
  artistic_form: ['#FigureArt', '#BodySculpture', '#ArtNude', '#FormStudy'],
  candlelit: ['#CandlelitMood', '#FlameAndShadow', '#WarmLight', '#RomanticGlow'],
  masterclass: ['#ClassicalArt', '#RenaissanceBeauty', '#TimelessElegance', '#MasterworkQuality'],
  influencer: ['#CreatorLife', '#ExclusiveAccess', '#BehindTheScenes', '#DigitalArt']
};

// ═══════════════════════════════════════════════════════════════════════════════
// CAPTION TEMPLATES - Max engagement strategy
// ═══════════════════════════════════════════════════════════════════════════════

function generateCaption(theme, carouselName, imageCount) {
  const themeInfo = THEMES[theme] || THEMES.default;
  const quote = themeInfo.quotes[Math.floor(Math.random() * themeInfo.quotes.length)];

  const nicheHashtags = NICHE_HASHTAGS[theme] || [];
  const trendingSelection = TRENDING_HASHTAGS.sort(() => 0.5 - Math.random()).slice(0, 8);
  const allHashtags = [...CORE_HASHTAGS, ...nicheHashtags, ...trendingSelection];

  return `MEERA | ${themeInfo.name}
${themeInfo.collection}

"${quote}"

${imageCount} exclusive frames. Each a masterwork of light, shadow, and form.

This is where artistry meets intimacy.

Swipe through for the complete collection →

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${allHashtags.join(' ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 Full collection: Link in bio
📸 @veralabs.studio`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BRANDING OVERLAY - VERALabs signature style (matching reference)
// ═══════════════════════════════════════════════════════════════════════════════

function createBrandingOverlay(collectionName, variantName, subtitle, accentColor) {
  const width = 1080;
  const height = 1350;
  const overlayY = Math.floor(height * 0.73);
  const overlayHeight = Math.floor(height * 0.27);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="35%" style="stop-color:rgba(0,0,0,0.70)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.92)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.78) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="15"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="2">${collectionName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.84) + 25}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 12}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="17"
            font-style="italic"
            fill="${accentColor}"
            text-anchor="middle">"${subtitle}"</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="13"
            fill="rgba(212,196,168,0.55)"
            text-anchor="middle"
            letter-spacing="3">VERALABS • MEERA</text>
    </svg>
  `);
}

// Story overlay (9:16 format)
function createStoryOverlay(collectionName, text, accentColor) {
  const width = 1080;
  const height = 1920;

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="storyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.6)"/>
          <stop offset="30%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="70%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.8)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#storyGrad)"/>

      <!-- Top branding -->
      <text x="${width/2}" y="80"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="24"
            font-weight="bold"
            fill="white"
            text-anchor="middle"
            letter-spacing="6">VERALABS</text>

      <text x="${width/2}" y="110"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="14"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="3">STUDIO</text>

      <!-- Bottom info -->
      <text x="${width/2}" y="${height - 180}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="18"
            fill="${accentColor}"
            text-anchor="middle"
            letter-spacing="2">${collectionName}</text>

      <text x="${width/2}" y="${height - 130}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="28"
            font-style="italic"
            fill="white"
            text-anchor="middle">"${text}"</text>

      <text x="${width/2}" y="${height - 70}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="16"
            fill="white"
            text-anchor="middle">SWIPE UP • NEW COLLECTION</text>

      <text x="${width/2}" y="${height - 40}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="12"
            fill="rgba(255,255,255,0.6)"
            text-anchor="middle">@veralabs.studio</text>
    </svg>
  `);
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE PROCESSING
// ═══════════════════════════════════════════════════════════════════════════════

async function brandImage(srcPath, outPath, collectionName, variantName, subtitle, accentColor) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createBrandingOverlay(collectionName, variantName, subtitle, accentColor);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 93 })
      .toFile(outPath);

    return true;
  } catch (err) {
    return false;
  }
}

async function createStory(srcPath, outPath, collectionName, quote, accentColor) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1920, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createStoryOverlay(collectionName, quote, accentColor);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toFile(outPath);

    return true;
  } catch (err) {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME DETECTION
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

function getVariantName(filename) {
  // Extract meaningful name from filename
  const clean = filename
    .replace(/\.png$/i, '')
    .replace(/^\d+_/, '')
    .replace(/_\d{10,}$/, '')
    .replace(/meera_\w+_c\d+_/, '')
    .replace(/_/g, ' ')
    .split(' ')
    .slice(0, 3)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return clean || 'Exclusive Frame';
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PROCESSING
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 VERALABS MAX-MODE CAROUSEL BRANDING SYSTEM                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   • VERALabs signature overlay (matching reference style)                    ║
║   • Intelligent carousel grouping (max 5 per carousel)                       ║
║   • Max-reach captions with trending hashtags                                ║
║   • Teaser stories for engagement                                            ║
║   • Category-wise organization                                               ║
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

  // Group images by theme
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

  // Process each theme
  for (const [theme, images] of Object.entries(themeGroups)) {
    const themeInfo = THEMES[theme] || THEMES.default;
    const themeDir = path.join(OUT_BASE, theme);
    if (!fs.existsSync(themeDir)) fs.mkdirSync(themeDir, { recursive: true });

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📂 ${themeInfo.name} - ${images.length} images`);
    console.log(`${'═'.repeat(60)}`);

    // Split into carousels of max 5
    const carousels = [];
    for (let i = 0; i < images.length; i += MAX_CAROUSEL_SIZE) {
      carousels.push(images.slice(i, i + MAX_CAROUSEL_SIZE));
    }

    for (let c = 0; c < carousels.length; c++) {
      const carousel = carousels[c];
      carouselCount++;
      const carouselName = `carousel_${String(carouselCount).padStart(3, '0')}`;
      const carouselDir = path.join(themeDir, carouselName);
      if (!fs.existsSync(carouselDir)) fs.mkdirSync(carouselDir, { recursive: true });

      console.log(`\n  [Carousel ${carouselCount}] ${carouselName} - ${carousel.length} slides`);

      // Brand each image in carousel
      for (let i = 0; i < carousel.length; i++) {
        const img = carousel[i];
        const variantName = getVariantName(img.filename);
        const quote = themeInfo.quotes[i % themeInfo.quotes.length];
        const outPath = path.join(carouselDir, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

        const success = await brandImage(
          img.path,
          outPath,
          themeInfo.collection.toUpperCase(),
          variantName.toUpperCase(),
          quote,
          themeInfo.accent
        );

        if (success) {
          totalBranded++;
          process.stdout.write(`    ✅ Slide ${i + 1}/${carousel.length}\r`);
        }
      }
      console.log(`    ✅ Branded ${carousel.length} slides`);

      // Generate caption
      const caption = generateCaption(theme, carouselName, carousel.length);
      fs.writeFileSync(path.join(carouselDir, 'caption.txt'), caption);

      // Create teaser story for this carousel (using first image)
      const storyPath = path.join(STORIES_DIR, `story_${carouselName}.jpg`);
      const storyQuote = themeInfo.quotes[Math.floor(Math.random() * themeInfo.quotes.length)];
      const storySuccess = await createStory(
        carousel[0].path,
        storyPath,
        themeInfo.name,
        storyQuote,
        themeInfo.accent
      );
      if (storySuccess) {
        storiesCreated++;
      }
    }
  }

  // Create stories manifest
  const storiesManifest = {
    created: new Date().toISOString(),
    totalStories: storiesCreated,
    usage: 'Post these as teaser stories before each carousel goes live',
    schedule: 'Best times: 9AM, 12PM, 6PM, 9PM local time',
    cta: 'Use "New Post" or "Swipe Up" stickers'
  };
  fs.writeFileSync(path.join(STORIES_DIR, 'manifest.json'), JSON.stringify(storiesManifest, null, 2));

  console.log(`

════════════════════════════════════════════════════════════════════════════════
🎨 VERALABS CAROUSEL BRANDING COMPLETE
════════════════════════════════════════════════════════════════════════════════

   📊 Total Images Branded: ${totalBranded}
   📁 Carousels Created: ${carouselCount}
   📱 Teaser Stories: ${storiesCreated}

   📂 Output:
      Carousels: ${OUT_BASE}
      Stories:   ${STORIES_DIR}

   📋 Each carousel folder contains:
      • slide_01.jpg - slide_05.jpg (branded images)
      • caption.txt (ready-to-post caption with hashtags)

   📱 Teaser stories ready for pre-launch engagement

════════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
