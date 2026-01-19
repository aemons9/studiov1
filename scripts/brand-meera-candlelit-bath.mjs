#!/usr/bin/env node
/**
 * Brand Meera Candlelit Bath - Water & Shadow Artistry Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-candlelit-bath';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_candlelit_bath';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA CANDLELIT BATH - WATER & SHADOW ARTISTRY ✨              ║
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
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.90)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <text x="${width/2}" y="${Math.floor(height * 0.78) + 15}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="16"
            fill="#d4af8a"
            text-anchor="middle">CANDLELIT BATH COLLECTION</text>

      <text x="${width/2}" y="${Math.floor(height * 0.84) + 25}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 12}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="18"
            font-style="italic"
            fill="#d4af8a"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="14"
            fill="rgba(212,175,138,0.60)"
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
  'emerging_venus': { name: 'EMERGING VENUS', subtitle: 'Divine emergence from water' },
  'surfacing_serenity': { name: 'SURFACING SERENITY', subtitle: 'Zen meditative stillness' },
  'reclining_goddess': { name: 'RECLINING GODDESS', subtitle: 'Victorian languid luxury' },
  'floating_reverie': { name: 'FLOATING REVERIE', subtitle: 'Urban sanctuary weightlessness' },
  'seated_contemplation': { name: 'SEATED CONTEMPLATION', subtitle: 'Hammam exotic intimacy' },
  'bathing_ritual': { name: 'BATHING RITUAL', subtitle: 'Sacred water worship' },
  'tub_edge_portrait': { name: 'TUB EDGE PORTRAIT', subtitle: 'Paradise intimate escape' },
  'side_emergence': { name: 'SIDE EMERGENCE', subtitle: 'Romantic copper glow' },
  'underwater_silhouette': { name: 'UNDERWATER SILHOUETTE', subtitle: 'Liquid suspension beauty' },
  'steam_shroud': { name: 'STEAM SHROUD', subtitle: 'Ethereal steam goddess' },
  'candlelit_full_form': { name: 'CANDLELIT FULL FORM', subtitle: 'Classical painterly mastery' },
  'reflection_study': { name: 'REFLECTION STUDY', subtitle: 'Narcissus reimagined' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'BATH MASTERY', subtitle: 'Water and shadow artistry' };
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

  // Create Instagram caption
  const caption = `MEERA | Candlelit Bath Collection

Eleven masterworks where water becomes wardrobe and shadow becomes art. Full body elegance captured through ultimate camera systems.

From Hasselblad to RED Monstro. From marble sanctuaries to Japanese onsens. Each frame a study in water coverage, candlelit shadow, and cinematic sensuality.

Venus emerging. Goddess reclining. Steam shrouding. Reflection doubling.

This is bathing ritual as high art.

#VERALABS #Meera #CandlelitBath #WaterArtistry #CinematicSensuality #BathingBeauty #ChiaroscuroLighting #FullBodyArt #MediumFormat #FineArtPhotography #IntimatePortraiture #LuxuryBathing`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
