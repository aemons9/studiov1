#!/usr/bin/env node

/**
 * VERALabs Ultimate Branding System
 * Matches exact moodboard HTML/CSS design specifications
 *
 * Design System Reference:
 * - Colors: cream-white #FAF8F5, champagne #E8DFD3, pale-gold #D4AF37, deep-espresso #1C1917
 * - Fonts: Playfair Display (italic titles), Inter (300 body), Bodoni Moda (uppercase luxury)
 * - Gradient: rgba(28,25,23, 0.1→0.2→0.85→0.95)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// VERALABS DESIGN SYSTEM (from styles.css)
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  creamWhite: '#FAF8F5',
  ivory: '#F7F3ED',
  champagne: '#E8DFD3',
  nudeBeige: '#D4C4B0',
  warmTaupe: '#B8A28E',
  softCharcoal: '#3E3A37',
  deepEspresso: '#1C1917',
  roseGold: '#E8B4B8',
  paleGold: '#D4AF37',
  dustyMauve: '#C8A2B8',
};

// Carousel themes with artistic naming
const CAROUSEL_THEMES = [
  {
    name: 'velvet_shadows',
    tag: 'BOUDOIR',
    title: ['Velvet', 'Shadows'],
    subtitle: 'Where light whispers secrets to silk',
    sideText: 'Intimate Collection'
  },
  {
    name: 'golden_hour_muse',
    tag: 'EDITORIAL',
    title: ['Golden Hour', 'Muse'],
    subtitle: 'Capturing the ephemeral glow of dusk',
    sideText: 'Signature Series'
  },
  {
    name: 'silk_reverie',
    tag: 'COUTURE',
    title: ['Silk', 'Reverie'],
    subtitle: 'Dreams woven in threads of light',
    sideText: 'Haute Couture'
  },
  {
    name: 'midnight_lace',
    tag: 'NOIR',
    title: ['Midnight', 'Lace'],
    subtitle: 'The poetry of shadow and form',
    sideText: 'Noir Collection'
  },
  {
    name: 'ethereal_glow',
    tag: 'LUMINOUS',
    title: ['Ethereal', 'Glow'],
    subtitle: 'When skin becomes canvas',
    sideText: 'Artistry Series'
  },
  {
    name: 'sensual_geometry',
    tag: 'AVANT-GARDE',
    title: ['Sensual', 'Geometry'],
    subtitle: 'The architecture of desire',
    sideText: 'Modern Vision'
  },
  {
    name: 'amber_intimacy',
    tag: 'WARMTH',
    title: ['Amber', 'Intimacy'],
    subtitle: 'Bathed in golden tenderness',
    sideText: 'Warmth Series'
  },
  {
    name: 'chiaroscuro_dreams',
    tag: 'CONTRAST',
    title: ['Chiaroscuro', 'Dreams'],
    subtitle: 'Light sculpts the divine feminine',
    sideText: 'Contrast Study'
  },
  {
    name: 'rose_petal_dusk',
    tag: 'ROMANCE',
    title: ['Rose Petal', 'Dusk'],
    subtitle: 'Softness in its purest form',
    sideText: 'Romance Collection'
  },
  {
    name: 'obsidian_elegance',
    tag: 'MYSTERY',
    title: ['Obsidian', 'Elegance'],
    subtitle: 'Beauty in the depths of night',
    sideText: 'Mystery Series'
  },
  {
    name: 'crystalline_dawn',
    tag: 'PRISTINE',
    title: ['Crystalline', 'Dawn'],
    subtitle: 'First light on flawless form',
    sideText: 'Dawn Collection'
  },
  {
    name: 'ember_whispers',
    tag: 'PASSION',
    title: ['Ember', 'Whispers'],
    subtitle: 'Heat that lingers in shadows',
    sideText: 'Passion Series'
  },
];

// Trending hashtags for maximum reach
const HASHTAG_SETS = {
  boudoir: '#boudoirphotography #intimateportraits #sensualart #fineart #editorialphotography #fashionphotography #luxurylifestyle #artisticnude #bodypositive #beautyphotography',
  editorial: '#editorialshoot #fashioneditorial #voguestyle #highfashion #luxuryfashion #modellife #fashionart #couturephotography #fashionmagazine #stylephotography',
  artistic: '#artphotography #visualart #contemporaryart #fineartphotography #artmodel #artisticexpression #creativeportrait #photoart #artgallery #visualstorytelling',
  luxury: '#luxuryaesthetics #opulence #elegance #sophistication #premiumcontent #exclusivecontent #highendphotography #luxurybrands #elitelifestyle #premiumphotography',
};

// ═══════════════════════════════════════════════════════════════════════════
// SVG OVERLAY GENERATOR (Moodboard-accurate design)
// ═══════════════════════════════════════════════════════════════════════════

function createBrandingOverlay(width, height, theme, slideNum, totalSlides) {
  // Calculate dimensions for 4:5 portrait Instagram format
  const padding = Math.round(width * 0.055); // ~60px at 1080
  const titleSize = Math.round(height * 0.036); // 48px at 1350
  const subtitleSize = Math.round(height * 0.0104); // 14px at 1350
  const tagSize = Math.round(height * 0.0082); // 11px at 1350
  const brandSize = Math.round(height * 0.009); // 12px at 1350
  const sideTextSize = Math.round(height * 0.0074); // 10px at 1350
  const goldLineWidth = Math.round(width * 0.056); // 60px at 1080

  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient overlay matching moodboard: 0.1→0.2→0.85→0.95 -->
    <linearGradient id="gradientOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(28,25,23);stop-opacity:0.1"/>
      <stop offset="50%" style="stop-color:rgb(28,25,23);stop-opacity:0.2"/>
      <stop offset="85%" style="stop-color:rgb(28,25,23);stop-opacity:0.85"/>
      <stop offset="100%" style="stop-color:rgb(28,25,23);stop-opacity:0.95"/>
    </linearGradient>

    <!-- Vignette effect -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>
      <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.3"/>
    </radialGradient>

    <!-- Corner accent filter -->
    <filter id="cornerGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Full gradient overlay -->
  <rect width="${width}" height="${height}" fill="url(#gradientOverlay)"/>

  <!-- Subtle vignette -->
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>

  <!-- Top-left corner accent (champagne border) -->
  <path d="M ${padding} ${padding + 100} L ${padding} ${padding} L ${padding + 100} ${padding}"
        fill="none" stroke="${COLORS.champagne}" stroke-width="1" opacity="0.6"/>

  <!-- Bottom-right corner accent -->
  <path d="M ${width - padding} ${height - padding - 180} L ${width - padding} ${height - padding - 80} L ${width - padding - 100} ${height - padding - 80}"
        fill="none" stroke="${COLORS.champagne}" stroke-width="1" opacity="0.6"/>

  <!-- Brand mark - top right (Bodoni Moda style) -->
  <text x="${width - padding}" y="${padding + 20}"
        font-family="'Bodoni MT', 'Bodoni 72', 'Didot', Georgia, serif"
        font-size="${brandSize}px"
        fill="${COLORS.creamWhite}"
        text-anchor="end"
        letter-spacing="0.25em"
        font-weight="400">VERALABS</text>

  <!-- Side text - left side, rotated (Inter style) -->
  <text x="${padding - 10}" y="${height / 2}"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="${sideTextSize}px"
        fill="rgba(250, 248, 245, 0.5)"
        text-anchor="middle"
        letter-spacing="0.2em"
        font-weight="300"
        transform="rotate(-90, ${padding - 10}, ${height / 2})">${theme.sideText.toUpperCase()}</text>

  <!-- Content wrapper - bottom section -->

  <!-- Collection tag with border (Bodoni Moda style) -->
  <rect x="${padding}" y="${height - padding - 160}"
        width="${theme.tag.length * 10 + 28}" height="28"
        fill="none" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1" rx="0"/>
  <text x="${padding + 14}" y="${height - padding - 140}"
        font-family="'Bodoni MT', 'Bodoni 72', 'Didot', Georgia, serif"
        font-size="${tagSize}px"
        fill="${COLORS.paleGold}"
        letter-spacing="0.3em"
        font-weight="400">${theme.tag}</text>

  <!-- Title line 1 (Playfair Display italic style) -->
  <text x="${padding}" y="${height - padding - 95}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${titleSize}px"
        fill="${COLORS.creamWhite}"
        font-style="italic"
        font-weight="400">${theme.title[0]}</text>

  <!-- Title line 2 -->
  <text x="${padding}" y="${height - padding - 50}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${titleSize}px"
        fill="${COLORS.creamWhite}"
        font-style="italic"
        font-weight="400">${theme.title[1]}</text>

  <!-- Subtitle (Inter 300 style) -->
  <text x="${padding}" y="${height - padding - 18}"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="${subtitleSize}px"
        fill="${COLORS.champagne}"
        font-weight="300"
        letter-spacing="0.05em">${theme.subtitle}</text>

  <!-- Slide indicator - bottom right -->
  <text x="${width - padding}" y="${height - padding - 18}"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="${subtitleSize}px"
        fill="${COLORS.warmTaupe}"
        text-anchor="end"
        font-weight="300"
        letter-spacing="0.1em">${slideNum}/${totalSlides}</text>

  <!-- Gold accent line -->
  <rect x="${padding}" y="${height - padding - 8}"
        width="${goldLineWidth}" height="1"
        fill="${COLORS.paleGold}" opacity="0.8"/>
</svg>`;

  return Buffer.from(svg);
}

// Story format (9:16) overlay
function createStoryOverlay(width, height, theme, imageCount) {
  const padding = Math.round(width * 0.07);
  const titleSize = Math.round(height * 0.028);
  const subtitleSize = Math.round(height * 0.012);
  const tagSize = Math.round(height * 0.008);
  const brandSize = Math.round(height * 0.008);

  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="storyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(28,25,23);stop-opacity:0.15"/>
      <stop offset="40%" style="stop-color:rgb(28,25,23);stop-opacity:0.1"/>
      <stop offset="75%" style="stop-color:rgb(28,25,23);stop-opacity:0.7"/>
      <stop offset="100%" style="stop-color:rgb(28,25,23);stop-opacity:0.92"/>
    </linearGradient>
  </defs>

  <!-- Gradient overlay -->
  <rect width="${width}" height="${height}" fill="url(#storyGradient)"/>

  <!-- Top brand mark -->
  <text x="${width / 2}" y="${padding + 20}"
        font-family="'Bodoni MT', 'Bodoni 72', 'Didot', Georgia, serif"
        font-size="${brandSize + 4}px"
        fill="${COLORS.creamWhite}"
        text-anchor="middle"
        letter-spacing="0.4em"
        font-weight="400">VERALABS</text>

  <!-- Gold line under brand -->
  <rect x="${width / 2 - 40}" y="${padding + 40}"
        width="80" height="1"
        fill="${COLORS.paleGold}" opacity="0.7"/>

  <!-- Corner accents -->
  <path d="M ${padding} ${padding + 80} L ${padding} ${padding} L ${padding + 80} ${padding}"
        fill="none" stroke="${COLORS.champagne}" stroke-width="1" opacity="0.5"/>
  <path d="M ${width - padding} ${padding + 80} L ${width - padding} ${padding} L ${width - padding - 80} ${padding}"
        fill="none" stroke="${COLORS.champagne}" stroke-width="1" opacity="0.5"/>

  <!-- Bottom content -->
  <text x="${width / 2}" y="${height - padding - 130}"
        font-family="'Bodoni MT', 'Bodoni 72', 'Didot', Georgia, serif"
        font-size="${tagSize}px"
        fill="${COLORS.paleGold}"
        text-anchor="middle"
        letter-spacing="0.3em">NEW COLLECTION</text>

  <text x="${width / 2}" y="${height - padding - 80}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${titleSize}px"
        fill="${COLORS.creamWhite}"
        text-anchor="middle"
        font-style="italic">${theme.title.join(' ')}</text>

  <text x="${width / 2}" y="${height - padding - 40}"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="${subtitleSize}px"
        fill="${COLORS.champagne}"
        text-anchor="middle"
        font-weight="300">${imageCount} exclusive images • Swipe up</text>

  <!-- Swipe up indicator -->
  <path d="M ${width / 2} ${height - padding - 10} L ${width / 2 - 8} ${height - padding} L ${width / 2 + 8} ${height - padding}"
        fill="none" stroke="${COLORS.warmTaupe}" stroke-width="1.5"/>
</svg>`;

  return Buffer.from(svg);
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

async function brandImage(inputPath, outputPath, theme, slideNum, totalSlides) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Target 4:5 portrait format (1080x1350)
    const targetWidth = 1080;
    const targetHeight = 1350;

    // Resize and crop to 4:5
    const processedImage = await image
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();

    // Create branding overlay
    const overlay = createBrandingOverlay(targetWidth, targetHeight, theme, slideNum, totalSlides);

    // Composite overlay on image
    await sharp(processedImage)
      .composite([{
        input: overlay,
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    return true;
  } catch (error) {
    console.error(`Error branding ${inputPath}: ${error.message}`);
    return false;
  }
}

async function createStoryTeaser(inputPath, outputPath, theme, imageCount) {
  try {
    const image = sharp(inputPath);

    // Target 9:16 story format (1080x1920)
    const targetWidth = 1080;
    const targetHeight = 1920;

    // Resize and crop for story
    const processedImage = await image
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'top' // Keep faces visible
      })
      .toBuffer();

    // Create story overlay
    const overlay = createStoryOverlay(targetWidth, targetHeight, theme, imageCount);

    // Composite
    await sharp(processedImage)
      .composite([{
        input: overlay,
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    return true;
  } catch (error) {
    console.error(`Error creating story ${inputPath}: ${error.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FILE DISCOVERY AND ORGANIZATION
// ═══════════════════════════════════════════════════════════════════════════

function findUnbrandedImages(baseDir) {
  const images = [];
  const generatedDirs = fs.readdirSync(baseDir)
    .filter(dir => dir.startsWith('generated-'))
    .map(dir => path.join(baseDir, dir));

  // Get last Monday's date (or 7 days ago if that's further back)
  const today = new Date();
  const daysSinceMonday = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysSinceMonday);
  monday.setHours(0, 0, 0, 0);

  // Also allow 10 days back to catch more content
  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(today.getDate() - 10);
  const cutoffDate = tenDaysAgo < monday ? tenDaysAgo : monday;

  console.log(`\n📅 Searching for images since: ${cutoffDate.toDateString()}`);

  // Recursive function to find all images
  function findImagesRecursively(dirPath, depth = 0) {
    if (depth > 3) return; // Limit recursion depth

    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          findImagesRecursively(fullPath, depth + 1);
        } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
          try {
            const stat = fs.statSync(fullPath);
            if (stat.mtime >= cutoffDate) {
              images.push(fullPath);
            }
          } catch (e) {
            // Skip files we can't stat
          }
        }
      }
    } catch (e) {
      // Skip directories we can't read
    }
  }

  for (const dir of generatedDirs) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    findImagesRecursively(dir);
  }

  return images;
}

function categorizeImages(images) {
  // Group images by source folder and characteristics
  const categories = {};

  for (const img of images) {
    const folder = path.basename(path.dirname(img));
    const category = folder.replace('generated-', '').replace(/-/g, '_');

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(img);
  }

  return categories;
}

function createCarousels(images, maxPerCarousel = 5) {
  const carousels = [];

  for (let i = 0; i < images.length; i += maxPerCarousel) {
    carousels.push(images.slice(i, i + maxPerCarousel));
  }

  return carousels;
}

// ═══════════════════════════════════════════════════════════════════════════
// CAPTION GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

function generateCaption(theme, carouselNum, category) {
  const openings = [
    `${theme.title.join(' ')} ✨`,
    `Unveiling: ${theme.title.join(' ')}`,
    `${theme.tag} | ${theme.title[0]} ${theme.title[1]}`,
    `New drop: ${theme.title.join(' ')}`
  ];

  const bodies = [
    theme.subtitle,
    `${theme.subtitle}. Every frame tells a story.`,
    `${theme.subtitle}. Art meets intimacy.`,
    `Where ${theme.title[0].toLowerCase()} meets ${theme.title[1].toLowerCase()}.`
  ];

  const ctas = [
    'Save for later. Share with someone who appreciates art.',
    'Double tap if this speaks to you.',
    'Comment your favorite slide 👇',
    'Which frame is your favorite?'
  ];

  const hashtagSet = HASHTAG_SETS[
    category.includes('boudoir') ? 'boudoir' :
    category.includes('editorial') ? 'editorial' :
    category.includes('artistic') ? 'artistic' : 'luxury'
  ];

  const opening = openings[carouselNum % openings.length];
  const body = bodies[carouselNum % bodies.length];
  const cta = ctas[carouselNum % ctas.length];

  return `${opening}\n\n${body}\n\n${cta}\n\n${hashtagSet}\n\n#veralabs #exclusive`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const baseDir = '/home/ecolex/version1';
  const outputBase = path.join(baseDir, 'veralabs-ultimate-carousels');
  const storiesBase = path.join(outputBase, 'stories');

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('   VERALABS ULTIMATE BRANDING SYSTEM');
  console.log('   Moodboard-Accurate Design Implementation');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Create output directories
  fs.mkdirSync(outputBase, { recursive: true });
  fs.mkdirSync(storiesBase, { recursive: true });

  // Find unbranded images
  console.log('🔍 Scanning for unbranded images...');
  const images = findUnbrandedImages(baseDir);
  console.log(`   Found ${images.length} images since Monday\n`);

  if (images.length === 0) {
    console.log('No unbranded images found. Exiting.');
    return;
  }

  // Categorize by source
  const categories = categorizeImages(images);
  console.log(`📂 Organized into ${Object.keys(categories).length} categories:\n`);

  for (const [cat, imgs] of Object.entries(categories)) {
    console.log(`   • ${cat}: ${imgs.length} images`);
  }

  // Process each category
  let themeIndex = 0;
  let totalProcessed = 0;
  const captionsFile = path.join(outputBase, 'captions.txt');
  let captionsContent = '# VERALABS CAROUSEL CAPTIONS\n\n';

  for (const [category, categoryImages] of Object.entries(categories)) {
    console.log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📸 Processing: ${category}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Create carousels (max 5 images each)
    const carousels = createCarousels(categoryImages, 5);

    for (let carouselNum = 0; carouselNum < carousels.length; carouselNum++) {
      const carousel = carousels[carouselNum];
      const theme = CAROUSEL_THEMES[themeIndex % CAROUSEL_THEMES.length];
      themeIndex++;

      // Create carousel folder
      const carouselFolder = path.join(outputBase, category, `${theme.name}_${String(carouselNum + 1).padStart(3, '0')}`);
      fs.mkdirSync(carouselFolder, { recursive: true });

      console.log(`\n   🎨 Carousel ${carouselNum + 1}: ${theme.title.join(' ')} (${carousel.length} slides)`);

      // Process each slide
      for (let slideNum = 0; slideNum < carousel.length; slideNum++) {
        const inputPath = carousel[slideNum];
        const outputPath = path.join(carouselFolder, `slide_${String(slideNum + 1).padStart(2, '0')}.jpg`);

        const success = await brandImage(inputPath, outputPath, theme, slideNum + 1, carousel.length);
        if (success) {
          process.stdout.write(`      ✓ Slide ${slideNum + 1} `);
          totalProcessed++;
        } else {
          process.stdout.write(`      ✗ Slide ${slideNum + 1} failed `);
        }
      }
      console.log('');

      // Create teaser story using first image
      const storyPath = path.join(storiesBase, `${category}_${theme.name}_story.jpg`);
      await createStoryTeaser(carousel[0], storyPath, theme, carousel.length);
      console.log(`      📱 Story teaser created`);

      // Generate caption
      const caption = generateCaption(theme, carouselNum, category);
      captionsContent += `\n## ${category} - ${theme.title.join(' ')}\n`;
      captionsContent += `Folder: ${carouselFolder}\n\n`;
      captionsContent += `${caption}\n\n`;
      captionsContent += `---\n`;
    }
  }

  // Save captions
  fs.writeFileSync(captionsFile, captionsContent);

  console.log('\n\n═══════════════════════════════════════════════════════════════');
  console.log('   BRANDING COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`   ✓ Total images branded: ${totalProcessed}`);
  console.log(`   ✓ Output folder: ${outputBase}`);
  console.log(`   ✓ Stories folder: ${storiesBase}`);
  console.log(`   ✓ Captions saved: ${captionsFile}`);
  console.log('\n');
}

main().catch(console.error);
