#!/usr/bin/env node
/**
 * Brand Meera Masterclass - Wardrobe Showcase Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-masterclass';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_masterclass';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA MASTERCLASS - WARDROBE SHOWCASE ✨                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images to brand\n`);

function createBrandingOverlay(variantName, subtitle) {
  const width = 1080;
  const height = 1350;
  const overlayY = Math.floor(height * 0.73);
  const overlayHeight = Math.floor(height * 0.27);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="35%" style="stop-color:rgba(0,0,0,0.65)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.88)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.78) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="20"
            fill="#e8d5b7"
            text-anchor="middle">MASTERCLASS COLLECTION</text>

      <text x="${width/2}" y="${Math.floor(height * 0.84) + 25}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="36"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 12}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="22"
            font-style="italic"
            fill="#e8d5b7"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="15"
            fill="rgba(232,213,183,0.65)"
            text-anchor="middle">VERALABS</text>
    </svg>
  `);
}

async function brandImage(srcPath, outPath, variantName, subtitle) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createBrandingOverlay(variantName, subtitle);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 93 })
      .toFile(outPath);

    return true;
  } catch (err) {
    console.error(`   Error: ${err.message}`);
    return false;
  }
}

const VARIANT_INFO = {
  'morning_silk': { name: 'MORNING SILK', subtitle: 'Luxury bedroom elegance' },
  'bath_elegance': { name: 'BATH ELEGANCE', subtitle: 'Marble sanctuary' },
  'city_nights': { name: 'CITY NIGHTS', subtitle: 'Penthouse sophistication' },
  'garden_dream': { name: 'GARDEN DREAM', subtitle: 'Bohemian paradise' },
  'parisian_afternoon': { name: 'PARISIAN AFTERNOON', subtitle: 'French romance' },
  'beach_goddess': { name: 'BEACH GODDESS', subtitle: 'Tropical luxury' },
  'studio_artistic': { name: 'STUDIO ARTISTIC', subtitle: 'Body as art' },
  'cozy_evening': { name: 'COZY EVENING', subtitle: 'Fireside warmth' },
  'golden_hour': { name: 'GOLDEN HOUR', subtitle: 'Sunset beauty' },
  'vintage_glamour': { name: 'VINTAGE GLAMOUR', subtitle: 'Old Hollywood' },
  'spa_serenity': { name: 'SPA SERENITY', subtitle: 'Zen tranquility' },
  'yacht_luxury': { name: 'YACHT LUXURY', subtitle: 'Nautical elegance' },
  'hollywood_nights': { name: 'HOLLYWOOD NIGHTS', subtitle: 'Dramatic glamour' },
  'botanical_beauty': { name: 'BOTANICAL BEAUTY', subtitle: 'Natural luxury' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.toLowerCase().includes(key)) {
      return info;
    }
  }
  return { name: 'MEERA', subtitle: 'Masterclass collection' };
}

async function main() {
  const branded = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const srcPath = path.join(SRC_DIR, img);
    const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(OUT_DIR, outName);

    const info = getVariantInfo(img);
    const success = await brandImage(srcPath, outPath, info.name, info.subtitle);

    if (success) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ [${i + 1}/${images.length}] ${info.name} → ${outName}`);
      branded.push({ src: img, out: outName, variant: info.name });
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ❌ [${i + 1}/${images.length}] Failed: ${img}`);
    }
  }

  const caption = `MEERA | Masterclass Wardrobe Collection

Fourteen stunning environments. Fourteen exquisite wardrobes. One unforgettable muse.

From morning silk in luxury bedrooms to golden hour on rooftop lounges. From Parisian boutique hotels to tropical beach villas. Each frame a masterwork of realistic photography celebrating natural beauty.

This is the definitive Meera collection.

#VERALABS #Meera #MasterclassPhotography #WardrobeShowcase #LuxuryLifestyle #RealisticBeauty #IndianGlamour #FashionEditorial #NaturalBeauty #IntimatePortrait #LifestylePhotography #LuxuryFashion`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
              BRANDING COMPLETE
══════════════════════════════════════════════════════════════════════════════

  ✅ Branded: ${branded.length} images
  📂 Output: ${OUT_DIR}
  📝 Caption saved

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
