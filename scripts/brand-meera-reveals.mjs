#!/usr/bin/env node
/**
 * Brand Meera Reveals - Chiaroscuro Velvet Intimacy Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-reveals';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_reveals';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA REVEALS - CHIAROSCURO COLLECTION ✨                      ║
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
          <stop offset="40%" style="stop-color:rgba(0,0,0,0.7)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.9)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.77) + 20}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="22"
            fill="#d4af37"
            text-anchor="middle">CHIAROSCURO INTIMACY</text>

      <text x="${width/2}" y="${Math.floor(height * 0.83) + 30}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="38"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 15}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="24"
            font-style="italic"
            fill="#d4af37"
            text-anchor="middle">Shadow reveals truth...</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 10}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="16"
            fill="rgba(212,175,55,0.7)"
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
  if (lower.includes('emergence')) return 'SHADOW EMERGENCE';
  if (lower.includes('recline_reveal')) return 'VELVET RECLINE';
  if (lower.includes('seated')) return 'CHIAROSCURO SEATED';
  if (lower.includes('standing')) return 'LACE SHADOW';
  if (lower.includes('drape_profile')) return 'SHADOW DRAPE';
  if (lower.includes('twist')) return 'SCULPTURAL TWIST';
  if (lower.includes('stretch')) return 'ARTISTIC STRETCH';
  if (lower.includes('arch')) return 'SHADOW ARCH';
  if (lower.includes('mirror')) return 'INTIMATE MIRROR';
  if (lower.includes('venus')) return 'VELVET VENUS';
  if (lower.includes('finale')) return 'SHADOW FINALE';
  return 'MEERA REVEALS';
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

  const caption = `MEERA REVEALS | Chiaroscuro Velvet Intimacy

Where shadow meets skin, truth emerges. Eleven supreme masterworks exploring dramatic Caravaggio-inspired lighting against midnight velvet.

Delicate lace and strategic shadow create an artistic dance of revelation and mystery. Form emerges from darkness like Old Master paintings brought to life.

This is intimate artistry at its absolute peak.

Private exclusive collection.

#VERALABS #MeeraReveals #Chiaroscuro #VelvetIntimacy #ShadowArt #DramaticLighting #OldMasterStyle #FineArtBoudoir #IndianGlamour #MuseumQuality #CaravaggioInspired #LaceAndShadow #ArtisticNude #PrivateCollection`;

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
