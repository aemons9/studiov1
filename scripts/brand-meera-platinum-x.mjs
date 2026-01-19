#!/usr/bin/env node
/**
 * Brand Meera PLATINUM X - Rebranded Private Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-platinum-boudoir';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_platinum_x';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA PLATINUM X - EXCLUSIVE COLLECTION ✨                     ║
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
          <stop offset="35%" style="stop-color:rgba(0,0,0,0.70)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.92)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.78) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="15"
            fill="#d4c4a8"
            text-anchor="middle">PLATINUM X COLLECTION</text>

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
            fill="#d4c4a8"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="13"
            fill="rgba(212,196,168,0.55)"
            text-anchor="middle">VERALABS • PLATINUM X</text>
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
  'spa_venus_rising': { name: 'VENUS RISING', subtitle: 'Divine emergence' },
  'spa_contemplation': { name: 'CONTEMPLATION', subtitle: 'Intimate reflection' },
  'balinese_goddess': { name: 'GODDESS', subtitle: 'Tropical sanctuary' },
  'onsen_emergence': { name: 'EMERGENCE', subtitle: 'Graceful strength' },
  'hammam_floor': { name: 'HAMMAM', subtitle: 'Mosaic heat' },
  'urban_reflection': { name: 'URBAN', subtitle: 'City sanctuary' },
  'modern_recline': { name: 'MODERN', subtitle: 'Contemporary luxury' },
  'grotto_secret': { name: 'GROTTO', subtitle: 'Hidden sanctuary' },
  'sunset_silhouette': { name: 'SUNSET', subtitle: 'Golden hour' },
  'rooftop_reverie': { name: 'ROOFTOP', subtitle: 'Evening intimacy' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'PLATINUM X', subtitle: 'Exclusive artistry' };
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

  const caption = `MEERA | PLATINUM X

Ten exclusive masterworks. Water becomes sanctuary. Shadow becomes veil. Platinum threads whisper across skin.

From spa emergence to rooftop twilight. From tropical goddess to urban reflection. Each frame a study in triple-element artistry.

This is where intimacy meets transcendence.

#VERALABS #Meera #PlatinumX #ExclusiveCollection #WaterShadowPlatinum #FineArtNude #BoudoirArt #IntimatePortraiture #SpaGoddess #PersonalCollection #LuxuryArt`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
