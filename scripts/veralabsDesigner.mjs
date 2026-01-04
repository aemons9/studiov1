#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * VERALABS DESIGNER POST GENERATOR
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Creates premium Instagram posts with VeraLabs branding, elegant typography,
 * custom frames, and moodboard-inspired designs.
 *
 * Post Styles:
 * 1. THE COLLECTION - Multi-image grid/collage with numbered images
 * 2. GILDED DREAMS - Single hero image with ornate gold frame
 * 3. SCATTERED BEAUTY - Polaroid-style scattered images
 * 4. EDITORIAL SPREAD - Magazine-style layout
 * 5. MINIMAL ELEGANCE - Clean single image with subtle branding
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ═══════════════════════════════════════════════════════════════════════════════
// VERALABS DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const DESIGN = {
  // Color Palette
  colors: {
    primaryDark: '#0a0a0a',
    secondaryDark: '#1a1a1a',
    cream: '#F5F0E8',
    warmCream: '#EDE5D8',
    accentGold: '#D4AF37',
    accentRose: '#E8B4B8',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    burgundy: '#722F37',
    deepBurgundy: '#4A1C23',
  },

  // Fonts (using available system fonts)
  fonts: {
    elegant: 'Georgia',
    script: 'Times-Italic',
    sans: 'Helvetica',
    sansBold: 'Helvetica-Bold',
  },

  // Instagram Dimensions
  sizes: {
    square: { w: 1080, h: 1080 },
    portrait: { w: 1080, h: 1350 },
    story: { w: 1080, h: 1920 },
  },
};

// Collection Names and Quotes
const COLLECTIONS = {
  gilded_dreams: {
    title: 'Gilded Dreams',
    subtitle: 'HAUTE COUTURE COLLECTION',
    quote: 'Where luxury meets artistry',
  },
  scattered_beauty: {
    title: 'Scattered Beauty',
    subtitle: 'LOOK BOOK',
    quote: 'Beauty in every angle',
  },
  the_collection: {
    title: 'The Collection',
    subtitle: 'EDITORIAL SERIES',
    quote: 'Curated elegance',
  },
  midnight_muse: {
    title: 'Midnight Muse',
    subtitle: 'AFTER DARK SERIES',
    quote: 'When night falls, beauty rises',
  },
  velvet_whispers: {
    title: 'Velvet Whispers',
    subtitle: 'INTIMATE COLLECTION',
    quote: 'Softness speaks volumes',
  },
  golden_hour: {
    title: 'Golden Hour',
    subtitle: 'LUXE EDITORIAL',
    quote: 'Captured in perfect light',
  },
  silk_and_shadow: {
    title: 'Silk & Shadow',
    subtitle: 'ARTISTIC VISION',
    quote: 'Where light meets mystery',
  },
  eternal_elegance: {
    title: 'Eternal Elegance',
    subtitle: 'TIMELESS SERIES',
    quote: 'Beauty that transcends time',
  },
  noir_romance: {
    title: 'Noir Romance',
    subtitle: 'CINEMATIC COLLECTION',
    quote: 'Drama in every frame',
  },
  divine_feminine: {
    title: 'Divine Feminine',
    subtitle: 'EMPOWERMENT SERIES',
    quote: 'Strength in softness',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getImages(dirPath, limit = 10) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, limit)
    .map(f => path.join(dirPath, f));
}

function exec(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (e) {
    console.error(`   Command failed: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST STYLE 1: THE COLLECTION (Multi-image grid)
// Like post1.png - cream background, numbered images, elegant script title
// ═══════════════════════════════════════════════════════════════════════════════

function createTheCollection(images, outputPath, collectionName = 'the_collection') {
  if (images.length < 3) return false;

  const collection = COLLECTIONS[collectionName] || COLLECTIONS.the_collection;
  const { w, h } = DESIGN.sizes.square;
  const tempDir = path.dirname(outputPath);

  console.log(`   Creating: The Collection style...`);

  try {
    // Create cream background
    exec(`convert -size ${w}x${h} xc:"${DESIGN.colors.cream}" "${tempDir}/temp_bg.png"`);

    // Main large image (left side) - 500x700
    exec(`convert "${images[0]}" -resize 500x700^ -gravity center -extent 500x700 "${tempDir}/temp_main.jpg"`);

    // Top right image - 450x340
    exec(`convert "${images[1]}" -resize 450x340^ -gravity center -extent 450x340 "${tempDir}/temp_top.jpg"`);

    // Bottom right image - 450x340
    exec(`convert "${images[2]}" -resize 450x340^ -gravity center -extent 450x340 "${tempDir}/temp_bottom.jpg"`);

    // Composite images onto background
    exec(`convert "${tempDir}/temp_bg.png" \\
      "${tempDir}/temp_main.jpg" -geometry +50+180 -composite \\
      "${tempDir}/temp_top.jpg" -geometry +580+50 -composite \\
      "${tempDir}/temp_bottom.jpg" -geometry +580+420 -composite \\
      "${tempDir}/temp_composite.png"`);

    // Add numbered labels on images
    exec(`convert "${tempDir}/temp_composite.png" \\
      -font ${DESIGN.fonts.sans} -pointsize 24 -fill "${DESIGN.colors.textSecondary}" \\
      -gravity NorthWest -annotate +600+70 "02" \\
      -annotate +600+440 "03" \\
      "${tempDir}/temp_numbered.png"`);

    // Add elegant script title at bottom left
    exec(`convert "${tempDir}/temp_numbered.png" \\
      -font ${DESIGN.fonts.script} -pointsize 42 -fill "${DESIGN.colors.secondaryDark}" \\
      -gravity SouthWest -annotate +50+30 "${collection.title}" \\
      "${outputPath}"`);

    // Cleanup
    ['temp_bg.png', 'temp_main.jpg', 'temp_top.jpg', 'temp_bottom.jpg', 'temp_composite.png', 'temp_numbered.png']
      .forEach(f => { try { fs.unlinkSync(path.join(tempDir, f)); } catch {} });

    return true;
  } catch (e) {
    console.error(`   Error: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST STYLE 2: GILDED DREAMS (Single image with ornate gold frame)
// Like post2.png - hero image with gold decorative border and elegant typography
// ═══════════════════════════════════════════════════════════════════════════════

function createGildedDreams(imagePath, outputPath, collectionName = 'gilded_dreams') {
  const collection = COLLECTIONS[collectionName] || COLLECTIONS.gilded_dreams;
  const { w, h } = DESIGN.sizes.square;
  const tempDir = path.dirname(outputPath);

  console.log(`   Creating: Gilded Dreams style...`);

  try {
    // Resize image to fit with border space
    exec(`convert "${imagePath}" -resize 1000x850^ -gravity center -extent 1000x850 "${tempDir}/temp_hero.jpg"`);

    // Create dark background with gradient
    exec(`convert -size ${w}x${h} \\
      gradient:"${DESIGN.colors.deepBurgundy}-${DESIGN.colors.primaryDark}" \\
      "${tempDir}/temp_bg.png"`);

    // Add gold decorative border frame
    exec(`convert "${tempDir}/temp_hero.jpg" \\
      -bordercolor "${DESIGN.colors.accentGold}" -border 3x3 \\
      -bordercolor "${DESIGN.colors.primaryDark}" -border 8x8 \\
      -bordercolor "${DESIGN.colors.accentGold}" -border 2x2 \\
      "${tempDir}/temp_framed.jpg"`);

    // Composite onto background
    exec(`convert "${tempDir}/temp_bg.png" \\
      "${tempDir}/temp_framed.jpg" -gravity center -geometry +0-60 -composite \\
      "${tempDir}/temp_composite.png"`);

    // Add elegant title
    exec(`convert "${tempDir}/temp_composite.png" \\
      -font ${DESIGN.fonts.script} -pointsize 72 -fill "${DESIGN.colors.accentGold}" \\
      -gravity South -annotate +0+120 "${collection.title}" \\
      "${tempDir}/temp_titled.png"`);

    // Add subtitle
    exec(`convert "${tempDir}/temp_titled.png" \\
      -font ${DESIGN.fonts.sans} -pointsize 18 -fill "${DESIGN.colors.textSecondary}" \\
      -kerning 8 \\
      -gravity South -annotate +0+80 "${collection.subtitle}" \\
      "${tempDir}/temp_subtitled.png"`);

    // Add decorative gold line
    exec(`convert "${tempDir}/temp_subtitled.png" \\
      -fill "${DESIGN.colors.accentGold}" \\
      -draw "rectangle 390,950 690,952" \\
      "${outputPath}"`);

    // Cleanup
    ['temp_hero.jpg', 'temp_bg.png', 'temp_framed.jpg', 'temp_composite.png', 'temp_titled.png', 'temp_subtitled.png']
      .forEach(f => { try { fs.unlinkSync(path.join(tempDir, f)); } catch {} });

    return true;
  } catch (e) {
    console.error(`   Error: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST STYLE 3: SCATTERED BEAUTY (Polaroid-style scattered images)
// Like post3.png - dark background, multiple images with slight rotation
// ═══════════════════════════════════════════════════════════════════════════════

function createScatteredBeauty(images, outputPath, collectionName = 'scattered_beauty') {
  if (images.length < 3) return false;

  const collection = COLLECTIONS[collectionName] || COLLECTIONS.scattered_beauty;
  const { w, h } = DESIGN.sizes.square;
  const tempDir = path.dirname(outputPath);

  console.log(`   Creating: Scattered Beauty style...`);

  try {
    // Create dark background
    exec(`convert -size ${w}x${h} xc:"${DESIGN.colors.primaryDark}" "${tempDir}/temp_bg.png"`);

    // Create polaroid-style images with white borders
    // Image 1 - large, slightly rotated left
    exec(`convert "${images[0]}" -resize 420x520^ -gravity center -extent 420x520 \\
      -bordercolor white -border 10x10 \\
      -bordercolor white -border 0x30 \\
      -background none -rotate -5 \\
      "${tempDir}/temp_pol1.png"`);

    // Image 2 - medium, top right, rotated right
    exec(`convert "${images[1]}" -resize 350x430^ -gravity center -extent 350x430 \\
      -bordercolor white -border 8x8 \\
      -bordercolor white -border 0x25 \\
      -background none -rotate 8 \\
      "${tempDir}/temp_pol2.png"`);

    // Image 3 - medium, bottom right, slight rotation
    exec(`convert "${images[2]}" -resize 380x470^ -gravity center -extent 380x470 \\
      -bordercolor white -border 8x8 \\
      -bordercolor white -border 0x25 \\
      -background none -rotate 3 \\
      "${tempDir}/temp_pol3.png"`);

    // Composite all polaroids
    exec(`convert "${tempDir}/temp_bg.png" \\
      "${tempDir}/temp_pol1.png" -geometry +30+120 -composite \\
      "${tempDir}/temp_pol2.png" -geometry +600+30 -composite \\
      "${tempDir}/temp_pol3.png" -geometry +580+480 -composite \\
      "${tempDir}/temp_composite.png"`);

    // Add VERALABS branding top right
    exec(`convert "${tempDir}/temp_composite.png" \\
      -font ${DESIGN.fonts.sans} -pointsize 16 -fill "${DESIGN.colors.textSecondary}" \\
      -kerning 5 \\
      -gravity NorthEast -annotate +30+30 "VERALABS" \\
      "${tempDir}/temp_branded.png"`);

    // Add "LOOK 02" label
    exec(`convert "${tempDir}/temp_branded.png" \\
      -font ${DESIGN.fonts.sans} -pointsize 14 -fill "${DESIGN.colors.textSecondary}" \\
      -gravity SouthEast -annotate +220+150 "LOOK 02" \\
      "${tempDir}/temp_labeled.png"`);

    // Add collection title
    exec(`convert "${tempDir}/temp_labeled.png" \\
      -font ${DESIGN.fonts.script} -pointsize 56 -fill "${DESIGN.colors.textPrimary}" \\
      -gravity SouthEast -annotate +50+60 "${collection.title}" \\
      "${outputPath}"`);

    // Cleanup
    ['temp_bg.png', 'temp_pol1.png', 'temp_pol2.png', 'temp_pol3.png', 'temp_composite.png', 'temp_branded.png', 'temp_labeled.png']
      .forEach(f => { try { fs.unlinkSync(path.join(tempDir, f)); } catch {} });

    return true;
  } catch (e) {
    console.error(`   Error: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST STYLE 4: MINIMAL ELEGANCE (Single image with subtle branding)
// ═══════════════════════════════════════════════════════════════════════════════

function createMinimalElegance(imagePath, outputPath, collectionName = 'eternal_elegance') {
  const collection = COLLECTIONS[collectionName] || COLLECTIONS.eternal_elegance;
  const { w, h } = DESIGN.sizes.portrait;
  const tempDir = path.dirname(outputPath);

  console.log(`   Creating: Minimal Elegance style...`);

  try {
    // Resize image to portrait
    exec(`convert "${imagePath}" -resize ${w}x${h}^ -gravity center -extent ${w}x${h} "${tempDir}/temp_base.jpg"`);

    // Add subtle vignette
    exec(`convert "${tempDir}/temp_base.jpg" \\
      \\( +clone -fill black -colorize 100% -fill white -draw "rectangle 100,100 980,1250" -blur 0x80 \\) \\
      -compose multiply -composite \\
      "${tempDir}/temp_vignette.jpg"`);

    // Add bottom gradient for text
    exec(`convert "${tempDir}/temp_vignette.jpg" \\
      \\( -size ${w}x400 gradient:"rgba(0,0,0,0)-rgba(0,0,0,0.7)" \\) \\
      -gravity south -composite \\
      "${tempDir}/temp_gradient.jpg"`);

    // Add VERALABS branding
    exec(`convert "${tempDir}/temp_gradient.jpg" \\
      -font ${DESIGN.fonts.sans} -pointsize 14 -fill "${DESIGN.colors.textSecondary}" \\
      -kerning 8 \\
      -gravity NorthEast -annotate +30+30 "VERALABS" \\
      "${tempDir}/temp_branded.jpg"`);

    // Add collection title
    exec(`convert "${tempDir}/temp_branded.jpg" \\
      -font ${DESIGN.fonts.script} -pointsize 48 -fill "${DESIGN.colors.textPrimary}" \\
      -gravity South -annotate +0+80 "${collection.title}" \\
      "${tempDir}/temp_titled.jpg"`);

    // Add quote
    exec(`convert "${tempDir}/temp_titled.jpg" \\
      -font ${DESIGN.fonts.sans} -pointsize 16 -fill "${DESIGN.colors.accentGold}" \\
      -gravity South -annotate +0+40 "${collection.quote}" \\
      "${outputPath}"`);

    // Cleanup
    ['temp_base.jpg', 'temp_vignette.jpg', 'temp_gradient.jpg', 'temp_branded.jpg', 'temp_titled.jpg']
      .forEach(f => { try { fs.unlinkSync(path.join(tempDir, f)); } catch {} });

    return true;
  } catch (e) {
    console.error(`   Error: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST STYLE 5: EDITORIAL SPREAD (Magazine-style with 4 images)
// ═══════════════════════════════════════════════════════════════════════════════

function createEditorialSpread(images, outputPath, collectionName = 'silk_and_shadow') {
  if (images.length < 4) return false;

  const collection = COLLECTIONS[collectionName] || COLLECTIONS.silk_and_shadow;
  const { w, h } = DESIGN.sizes.square;
  const tempDir = path.dirname(outputPath);

  console.log(`   Creating: Editorial Spread style...`);

  try {
    // Create dark background
    exec(`convert -size ${w}x${h} xc:"${DESIGN.colors.secondaryDark}" "${tempDir}/temp_bg.png"`);

    // Create 4 equal panels (530x530 each with 10px gaps)
    for (let i = 0; i < 4; i++) {
      exec(`convert "${images[i]}" -resize 525x525^ -gravity center -extent 525x525 "${tempDir}/temp_panel_${i}.jpg"`);
    }

    // Composite into 2x2 grid
    exec(`convert "${tempDir}/temp_bg.png" \\
      "${tempDir}/temp_panel_0.jpg" -geometry +10+10 -composite \\
      "${tempDir}/temp_panel_1.jpg" -geometry +545+10 -composite \\
      "${tempDir}/temp_panel_2.jpg" -geometry +10+545 -composite \\
      "${tempDir}/temp_panel_3.jpg" -geometry +545+545 -composite \\
      "${tempDir}/temp_grid.png"`);

    // Add center overlay with collection name
    exec(`convert "${tempDir}/temp_grid.png" \\
      -fill "rgba(10,10,10,0.85)" -draw "rectangle 340,440 740,640" \\
      "${tempDir}/temp_overlay.png"`);

    // Add title
    exec(`convert "${tempDir}/temp_overlay.png" \\
      -font ${DESIGN.fonts.script} -pointsize 52 -fill "${DESIGN.colors.accentGold}" \\
      -gravity Center -annotate +0-20 "${collection.title}" \\
      "${tempDir}/temp_titled.png"`);

    // Add subtitle
    exec(`convert "${tempDir}/temp_titled.png" \\
      -font ${DESIGN.fonts.sans} -pointsize 14 -fill "${DESIGN.colors.textSecondary}" \\
      -kerning 5 \\
      -gravity Center -annotate +0+30 "${collection.subtitle}" \\
      "${outputPath}"`);

    // Cleanup
    ['temp_bg.png', 'temp_panel_0.jpg', 'temp_panel_1.jpg', 'temp_panel_2.jpg', 'temp_panel_3.jpg',
     'temp_grid.png', 'temp_overlay.png', 'temp_titled.png']
      .forEach(f => { try { fs.unlinkSync(path.join(tempDir, f)); } catch {} });

    return true;
  } catch (e) {
    console.error(`   Error: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('\n' + '═'.repeat(70));
  console.log('   ✨ VERALABS DESIGNER POST GENERATOR');
  console.log('   Creating Premium Instagram Content');
  console.log('═'.repeat(70) + '\n');

  const outputDir = path.join(process.cwd(), 'veralabs-posts');
  ensureDir(outputDir);

  // Source directories
  const sources = [
    'tempimages/asset1.1',
    'tempimages/asset2',
    'tempimages/pimages',
    'tempimages/23images',
    'tempimages/kimages',
    'tempimages/fimages',
    'tempimages/limages',
  ];

  // Collect all images
  let allImages = [];
  for (const source of sources) {
    const imgs = getImages(source, 50);
    if (imgs.length > 0) {
      allImages.push(...imgs);
      console.log(`   📂 ${source}: ${imgs.length} images`);
    }
  }

  // Shuffle images
  allImages = allImages.sort(() => Math.random() - 0.5);

  console.log(`\n   📊 Total images: ${allImages.length}\n`);

  if (allImages.length < 10) {
    console.log('❌ Not enough images!');
    return;
  }

  const results = {
    collection: [],
    gilded: [],
    scattered: [],
    minimal: [],
    editorial: [],
  };

  const collectionKeys = Object.keys(COLLECTIONS);
  let postNum = 0;

  console.log('─'.repeat(70));
  console.log('🎨 GENERATING DESIGNER POSTS');
  console.log('─'.repeat(70) + '\n');

  // Generate THE COLLECTION style posts
  for (let i = 0; i < 5 && (i * 3 + 3) <= allImages.length; i++) {
    postNum++;
    const collection = collectionKeys[i % collectionKeys.length];
    const outPath = path.join(outputDir, `post_${String(postNum).padStart(2, '0')}_collection_${collection}.jpg`);

    if (createTheCollection(allImages.slice(i * 3, i * 3 + 3), outPath, collection)) {
      results.collection.push(outPath);
      console.log(`   ✅ Collection #${i + 1}: ${collection}`);
    }
  }

  // Generate GILDED DREAMS style posts
  for (let i = 0; i < 5 && (15 + i) < allImages.length; i++) {
    postNum++;
    const collection = collectionKeys[(i + 3) % collectionKeys.length];
    const outPath = path.join(outputDir, `post_${String(postNum).padStart(2, '0')}_gilded_${collection}.jpg`);

    if (createGildedDreams(allImages[15 + i], outPath, collection)) {
      results.gilded.push(outPath);
      console.log(`   ✅ Gilded #${i + 1}: ${collection}`);
    }
  }

  // Generate SCATTERED BEAUTY style posts
  for (let i = 0; i < 5 && (20 + i * 3 + 3) <= allImages.length; i++) {
    postNum++;
    const collection = collectionKeys[(i + 5) % collectionKeys.length];
    const outPath = path.join(outputDir, `post_${String(postNum).padStart(2, '0')}_scattered_${collection}.jpg`);

    if (createScatteredBeauty(allImages.slice(20 + i * 3, 20 + i * 3 + 3), outPath, collection)) {
      results.scattered.push(outPath);
      console.log(`   ✅ Scattered #${i + 1}: ${collection}`);
    }
  }

  // Generate MINIMAL ELEGANCE style posts
  for (let i = 0; i < 5 && (35 + i) < allImages.length; i++) {
    postNum++;
    const collection = collectionKeys[(i + 7) % collectionKeys.length];
    const outPath = path.join(outputDir, `post_${String(postNum).padStart(2, '0')}_minimal_${collection}.jpg`);

    if (createMinimalElegance(allImages[35 + i], outPath, collection)) {
      results.minimal.push(outPath);
      console.log(`   ✅ Minimal #${i + 1}: ${collection}`);
    }
  }

  // Generate EDITORIAL SPREAD style posts
  for (let i = 0; i < 5 && (40 + i * 4 + 4) <= allImages.length; i++) {
    postNum++;
    const collection = collectionKeys[(i + 2) % collectionKeys.length];
    const outPath = path.join(outputDir, `post_${String(postNum).padStart(2, '0')}_editorial_${collection}.jpg`);

    if (createEditorialSpread(allImages.slice(40 + i * 4, 40 + i * 4 + 4), outPath, collection)) {
      results.editorial.push(outPath);
      console.log(`   ✅ Editorial #${i + 1}: ${collection}`);
    }
  }

  // Summary
  const totalPosts = Object.values(results).flat().length;

  console.log('\n' + '═'.repeat(70));
  console.log('   ✨ VERALABS POSTS GENERATED');
  console.log('═'.repeat(70));
  console.log(`
   📊 SUMMARY
   ─────────────────────────────────────────
   The Collection:    ${results.collection.length} posts
   Gilded Dreams:     ${results.gilded.length} posts
   Scattered Beauty:  ${results.scattered.length} posts
   Minimal Elegance:  ${results.minimal.length} posts
   Editorial Spread:  ${results.editorial.length} posts
   ─────────────────────────────────────────
   TOTAL:             ${totalPosts} designer posts

   📁 Output: ${outputDir}

   🎨 Each post includes:
      • VeraLabs branding
      • Collection name typography
      • Premium frames & layouts
      • Moodboard-inspired design
`);
  console.log('═'.repeat(70) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
