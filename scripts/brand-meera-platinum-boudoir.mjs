#!/usr/bin/env node
/**
 * Brand Meera Platinum String Boudoir - Private Intimate Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-platinum-boudoir';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_platinum_boudoir';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA PLATINUM BOUDOIR - PRIVATE INTIMATE COLLECTION ✨        ║
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
          <stop offset="35%" style="stop-color:rgba(0,0,0,0.68)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.88)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.78) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="15"
            fill="#c4a87c"
            text-anchor="middle">PLATINUM BOUDOIR COLLECTION</text>

      <text x="${width/2}" y="${Math.floor(height * 0.84) + 25}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="30"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 12}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="17"
            font-style="italic"
            fill="#c4a87c"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="13"
            fill="rgba(196,168,124,0.55)"
            text-anchor="middle">VERALABS • PRIVATE COLLECTION</text>
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
  'spa_venus_rising': { name: 'SPA VENUS RISING', subtitle: 'Divine emergence, private sanctuary' },
  'spa_contemplation': { name: 'SPA CONTEMPLATION', subtitle: 'Intimate reflection, vulnerable trust' },
  'balinese_goddess': { name: 'BALINESE GODDESS', subtitle: 'Tropical goddess, petal sanctuary' },
  'onsen_emergence': { name: 'ONSEN EMERGENCE', subtitle: 'Graceful emergence, quiet strength' },
  'hammam_floor': { name: 'HAMMAM FLOOR', subtitle: 'Tile mosaic, languid heat' },
  'urban_reflection': { name: 'URBAN REFLECTION', subtitle: 'Urban goddess, city sanctuary' },
  'modern_recline': { name: 'MODERN RECLINE', subtitle: 'Minimalist luxury, contemporary intimacy' },
  'grotto_secret': { name: 'GROTTO SECRET', subtitle: 'Hidden sanctuary, primal trust' },
  'sunset_silhouette': { name: 'SUNSET SILHOUETTE', subtitle: 'Golden hour goddess, urban twilight' },
  'rooftop_reverie': { name: 'ROOFTOP REVERIE', subtitle: 'Rooftop escape, evening intimacy' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'PLATINUM BOUDOIR', subtitle: 'Private intimate artistry' };
}

async function main() {
  let branded = 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const info = getVariantInfo(img);
    const outPath = path.join(OUT_DIR, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

    console.log(`[${i + 1}/${images.length}] ${info.name}...`);

    const success = await brandImage(path.join(SRC_DIR, img), outPath, info.name, info.subtitle);

    if (success) {
      branded++;
      console.log(`   ✅ Branded: slide_${String(i + 1).padStart(2, '0')}.jpg`);
    }
  }

  const caption = `MEERA | Platinum Boudoir Collection

Ten private masterworks where water becomes lower sanctuary, shadow becomes upper veil, and platinum threads whisper across skin.

From private spa emergence to rooftop twilight reverie. From Balinese goddess petals to urban reflection pools. Each frame a study in triple-element intimacy.

Water pooling at curves. Shadow mesh draping form. Single platinum strand catching light.

This is personal boudoir as transcendent artistry.

#VERALABS #Meera #PlatinumBoudoir #PrivateCollection #WaterShadowPlatinum #BoudoirArt #IntimatePortraiture #SpaGoddess #FineArtNude #PersonalCollection #TripleElement`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
