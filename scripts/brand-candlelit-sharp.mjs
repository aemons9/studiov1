#!/usr/bin/env node
/**
 * Brand Candlelit Chamber Extended Images using Sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-candlelit-chamber-extended';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/candlelit_chamber_extended';

// Create output directory
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Get all PNG images
const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║         ✨ BRANDING CANDLELIT CHAMBER EXTENDED (Sharp) ✨                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images to brand\n`);

// Create SVG overlay for branding
function createBrandingOverlay(variantName) {
  const width = 1080;
  const height = 1350;
  const overlayHeight = Math.floor(height * 0.28);
  const overlayY = Math.floor(height * 0.72);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <!-- Gradient overlay at bottom -->
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="rgba(0,0,0,0.55)"/>

      <!-- Collection label -->
      <text x="${width/2}" y="${Math.floor(height * 0.77) + 20}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="26"
            fill="#c9a962"
            text-anchor="middle">INTIMATE DEVOTION</text>

      <!-- Variant name -->
      <text x="${width/2}" y="${Math.floor(height * 0.83) + 30}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="44"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <!-- Invocation -->
      <text x="${width/2}" y="${Math.floor(height * 0.90) + 20}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="28"
            font-style="italic"
            fill="#c9a962"
            text-anchor="middle">Flames whisper secrets...</text>

      <!-- VERALABS watermark -->
      <text x="${width/2}" y="${Math.floor(height * 0.96) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="20"
            fill="rgba(201,169,98,0.8)"
            text-anchor="middle">VERALABS</text>
    </svg>
  `);
}

async function brandImage(srcPath, outPath, variantName) {
  try {
    // Get image metadata
    const metadata = await sharp(srcPath).metadata();

    // Calculate crop dimensions for 4:5 aspect ratio
    const targetWidth = 1080;
    const targetHeight = 1350;

    // Process image: resize and crop to 4:5
    const baseImage = await sharp(srcPath)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();

    // Create branding overlay
    const overlay = createBrandingOverlay(variantName);

    // Composite the overlay onto the image
    await sharp(baseImage)
      .composite([{
        input: overlay,
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toFile(outPath);

    return true;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return false;
  }
}

async function main() {
  const branded = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const srcPath = path.join(SRC_DIR, img);
    const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(OUT_DIR, outName);

    // Determine variant name from filename - check platinum before amber
    let variantName = 'CANDLELIT CHAMBER';
    if (img.includes('platinum')) variantName = 'PLATINUM ELEGANCE';
    else if (img.includes('silver')) variantName = 'SILVER CHAMBER';
    else if (img.includes('industrial')) variantName = 'INDUSTRIAL GLAMOUR';
    else if (img.includes('velvet')) variantName = 'VELVET CANDLELIT';
    else if (img.includes('amber')) variantName = 'AMBER GLOW';

    const success = await brandImage(srcPath, outPath, variantName);

    if (success) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ [${i + 1}/${images.length}] ${variantName} → ${outName}`);
      branded.push({ src: img, out: outName, variant: variantName });
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ❌ [${i + 1}/${images.length}] Failed: ${img}`);
    }
  }

  // Create caption
  const caption = `CANDLELIT CHAMBER EXTENDED | Intimate Devotion

By candlelight, form becomes sacred. Seven new variants exploring silver chambers, industrial glamour, velvet warmth, amber glow, and platinum elegance.

Bronze candelabras cast dancing shadows on silk and skin. This is worship through artistry.

Surrender to the glow.

#VERALABS #CandlelitChamber #IntimateDevtion #ExtendedCollection #Candlelight #BronzeCandelabra #SilkAndShadow #FineArtBoudoir #SacredArt #WarmGlow #DevotionalBeauty #SilverChamber #IndustrialGlamour #VelvetWarmth #AmberGlow #PlatinumElegance`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
              BRANDING COMPLETE
══════════════════════════════════════════════════════════════════════════════

  ✅ Branded: ${branded.length} images
  📂 Output: ${OUT_DIR}
  📝 Caption saved

  Variants branded:
${branded.map(b => `     📸 ${b.variant}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
