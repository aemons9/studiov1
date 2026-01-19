#!/usr/bin/env node
/**
 * Brand Meera Candlelit Extended - Avant-Garde Intimacy Collection
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-candlelit-extended';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_candlelit_extended';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA CANDLELIT EXTENDED - AVANT-GARDE INTIMACY ✨             ║
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
            font-size="18"
            fill="#e8d5b7"
            text-anchor="middle">CANDLELIT EXTENDED COLLECTION</text>

      <text x="${width/2}" y="${Math.floor(height * 0.84) + 25}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="34"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.90) + 12}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="20"
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
  'decolletage_candlelit_portrait': { name: 'CANDLELIT PORTRAIT', subtitle: 'Decolletage in golden light' },
  'decolletage_mirror_reflection': { name: 'MIRROR STUDY', subtitle: 'Double reflection elegance' },
  'hip_curves_standing': { name: 'STANDING ARCHITECTURE', subtitle: 'Hip curves in warm light' },
  'glutes_reclined_profile': { name: 'RECLINED PROFILE', subtitle: 'Dramatic side curves' },
  'kneeling_worship_pose': { name: 'KNEELING WORSHIP', subtitle: 'Contemplative serenity' },
  'kneeling_back_arch': { name: 'BACK ARCH', subtitle: 'Dramatic kneeling curves' },
  'reclined_venus_pose': { name: 'RECLINING VENUS', subtitle: 'Classic intimate beauty' },
  'reclined_twist': { name: 'TORSO TWIST', subtitle: 'Multi-angle artistry' },
  'floor_prone_curves': { name: 'PRONE CURVES', subtitle: 'Floor intimacy study' },
  'floor_stretch_extended': { name: 'EXTENDED STRETCH', subtitle: 'Full body elegance' },
  'artistic_shadow_play': { name: 'SHADOW PLAY', subtitle: 'Candlelight artistry' },
  'sensuous_embrace': { name: 'SELF-EMBRACE', subtitle: 'Intimate vulnerability' },
  'mirror_portrait_elegant': { name: 'MIRROR PORTRAIT', subtitle: 'Elegant reflection' },
  'vanity_decolletage_study': { name: 'VANITY STUDY', subtitle: 'Hollywood glamour' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'EXCLUSIVE', subtitle: 'Avant-garde intimacy' };
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

  // Create caption
  const caption = `MEERA | Candlelit Extended Collection

Avant-garde intimate artistry in warm candlelight. Thirteen exclusive masterworks exploring architectural design and sensuous form.

From decolletage portraits to floor intimacy. From kneeling worship to reclining Venus. Each frame a celebration of conceptual fashion and natural beauty.

Museum-quality photography with editorial sophistication.

#VERALABS #Meera #CandlelitCollection #AvantGarde #IntimateArtistry #FashionEditorial #MuseumQuality #ConceptualFashion #LuxuryPhotography #IndianGlamour #ExclusiveContent`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
