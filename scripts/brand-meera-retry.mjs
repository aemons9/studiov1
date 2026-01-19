#!/usr/bin/env node
/**
 * Brand Meera Retry Editorial Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-retry';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_retry_editorial';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║         ✨ BRANDING MEERA RETRY EDITORIAL COLLECTION ✨                      ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images to brand\n`);

function createBrandingOverlay(variantName) {
  const width = 1080;
  const height = 1350;
  const overlayY = Math.floor(height * 0.72);
  const overlayHeight = Math.floor(height * 0.28);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="30%" style="stop-color:rgba(0,0,0,0.6)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.85)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.77) + 20}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="24"
            fill="#c9a962"
            text-anchor="middle">EDITORIAL MASTERCLASS</text>

      <text x="${width/2}" y="${Math.floor(height * 0.83) + 30}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="40"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 15}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="26"
            font-style="italic"
            fill="#c9a962"
            text-anchor="middle">Fashion meets artistry...</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 10}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="18"
            fill="rgba(201,169,98,0.7)"
            text-anchor="middle">VERALABS</text>
    </svg>
  `);
}

async function brandImage(srcPath, outPath, variantName) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createBrandingOverlay(variantName);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 92 })
      .toFile(outPath);

    return true;
  } catch (err) {
    console.error(`   Error: ${err.message}`);
    return false;
  }
}

function getVariantName(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('recline')) return 'AMBER RECLINE';
  if (lower.includes('arch')) return 'ARTISTIC ARCH';
  if (lower.includes('kneeling')) return 'FASHION POSE';
  if (lower.includes('floor')) return 'FLOOR ARTISTIC';
  if (lower.includes('serpentine')) return 'SERPENTINE FLOW';
  if (lower.includes('throne')) return 'VELVET THRONE';
  if (lower.includes('stretch')) return 'ARTISTIC STRETCH';
  if (lower.includes('languid')) return 'INDUSTRIAL EDGE';
  return 'EDITORIAL';
}

async function main() {
  const branded = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const srcPath = path.join(SRC_DIR, img);
    const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(OUT_DIR, outName);

    const variantName = getVariantName(img);
    const success = await brandImage(srcPath, outPath, variantName);

    if (success) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ [${i + 1}/${images.length}] ${variantName} → ${outName}`);
      branded.push({ src: img, out: outName, variant: variantName });
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ❌ [${i + 1}/${images.length}] Failed: ${img}`);
    }
  }

  const caption = `MEERA | Editorial Masterclass Collection

Where fashion meets fine art. Eight editorial masterworks exploring amber warmth, velvet elegance, and industrial edge through the lens of haute couture photography.

Museum-quality artistry with contemporary fashion sensibility.

This is editorial excellence.

#VERALABS #Meera #EditorialMasterclass #FashionArt #HauteCouture #AmberGlow #VelvetElegance #IndustrialEdge #FineArtFashion #MuseumQuality #IndianGlamour #EditorialPhotography #FashionEditorial`;

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
