#!/usr/bin/env node
/**
 * Brand Meera Shadow Intimacy - Chiaroscuro Conceptual Art Collection
 * With Premium+ Teaser Overlay
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-shadow-intimacy';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_shadow_intimacy';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA SHADOW INTIMACY - CHIAROSCURO COLLECTION ✨              ║
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
            font-size="16"
            fill="#b8a88a"
            text-anchor="middle">SHADOW INTIMACY COLLECTION</text>

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
            fill="#b8a88a"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="14"
            fill="rgba(184,168,138,0.60)"
            text-anchor="middle">VERALABS • PREMIUM+</text>
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
  'moonlit_sanctuary': { name: 'MOONLIT SANCTUARY', subtitle: 'Penthouse silhouette at midnight' },
  'venetian_shadows': { name: 'VENETIAN SHADOWS', subtitle: 'Light stripes as living art' },
  'jungle_waterfall': { name: 'JUNGLE WATERFALL', subtitle: 'Hidden paradise embrace' },
  'candlelit_bath': { name: 'CANDLELIT BATH', subtitle: 'Steam and sacred secrets' },
  'silk_sheets_dawn': { name: 'SILK SHEETS DAWN', subtitle: 'Vulnerable awakening' },
  'piano_noir': { name: 'PIANO NOIR', subtitle: 'Private performance' },
  'desert_dusk': { name: 'DESERT DUSK', subtitle: 'Edge of the world' },
  'forest_pool': { name: 'FOREST POOL', subtitle: 'Secret forest bathing' },
  'cliffside_sunset': { name: 'CLIFFSIDE SUNSET', subtitle: 'Where land meets infinite' },
  'brutalist_light': { name: 'BRUTALIST LIGHT', subtitle: 'Geometry embraces form' },
  'moroccan_riad': { name: 'MOROCCAN RIAD', subtitle: 'Light becomes lace' },
  'japanese_shoji': { name: 'JAPANESE SHOJI', subtitle: 'Between seen and unseen' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'SHADOW INTIMACY', subtitle: 'Chiaroscuro artistry' };
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
  const caption = `MEERA | Shadow Intimacy Collection

Where light reveals only what she allows. Twelve breathtaking moments across sanctuary, nature, and architecture.

Chiaroscuro as coverage. Shadow as second skin. The interplay of darkness and dawn creating art from atmosphere.

From moonlit penthouses to hidden waterfalls. From Moroccan riads to Japanese screens. Each frame a private moment of vulnerability.

This is just a glimpse. Premium+ sees everything.

#VERALABS #Meera #ShadowIntimacy #Chiaroscuro #ConceptualArt #PremiumContent #IntimateArtistry #FineArtPhotography #ShadowPlay #ExclusiveContent #MuseumQuality #PremiumSubscription`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  // Copy teaser stories
  const teaserSrc = path.join(SRC_DIR, 'teaser_stories.txt');
  if (fs.existsSync(teaserSrc)) {
    fs.copyFileSync(teaserSrc, path.join(OUT_DIR, 'teaser_stories.txt'));
  }

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
  📝 Teaser stories copied
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
