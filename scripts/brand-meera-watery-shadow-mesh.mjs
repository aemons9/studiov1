#!/usr/bin/env node
/**
 * Brand Meera Watery Shadow Mesh - Super Exclusive Artistry
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-meera-watery-shadow-mesh';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/meera_watery_shadow_mesh';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ BRANDING MEERA WATERY SHADOW MESH - SUPER EXCLUSIVE ✨                  ║
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
            fill="#7eb8da"
            text-anchor="middle">WATERY SHADOW MESH COLLECTION</text>

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
            fill="#7eb8da"
            text-anchor="middle">${subtitle}</text>

      <text x="${width/2}" y="${Math.floor(height * 0.96) + 8}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="13"
            fill="rgba(126,184,218,0.55)"
            text-anchor="middle">VERALABS • SUPER EXCLUSIVE</text>
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
  'rainfall_venus': { name: 'RAINFALL VENUS', subtitle: 'Stripe shadow goddess' },
  'shower_silhouette': { name: 'SHOWER SILHOUETTE', subtitle: 'Crystal droplet grid' },
  'poolside_emergence': { name: 'POOLSIDE EMERGENCE', subtitle: 'Diamond shadow mesh' },
  'pool_recline': { name: 'POOL RECLINE', subtitle: 'Tropical shadow weave' },
  'bathhouse_steam': { name: 'BATHHOUSE STEAM', subtitle: 'Lace shadow veil' },
  'bathhouse_floor': { name: 'BATHHOUSE FLOOR', subtitle: 'Geometric shadow blanket' },
  'greenhouse_mist': { name: 'GREENHOUSE MIST', subtitle: 'Botanical shadow weave' },
  'greenhouse_floor': { name: 'GREENHOUSE FLOOR', subtitle: 'Delicate shadow lace' },
  'cave_pool': { name: 'CAVE POOL', subtitle: 'Natural shadow diamonds' },
  'cave_recline': { name: 'CAVE RECLINE', subtitle: 'Sea shadow veil' },
  'studio_reflection': { name: 'STUDIO REFLECTION', subtitle: 'Editorial double vision' },
  'studio_puddle': { name: 'STUDIO PUDDLE', subtitle: 'Shadow grid artistry' }
};

function getVariantInfo(filename) {
  for (const [key, info] of Object.entries(VARIANT_INFO)) {
    if (filename.includes(key)) {
      return info;
    }
  }
  return { name: 'WATERY MESH', subtitle: 'Shadow artistry' };
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

  const caption = `MEERA | Watery Shadow Mesh Collection

Twelve super exclusive masterworks where water droplets become diamonds and shadow becomes mesh wardrobe.

From rainfall showers to hidden sea caves. From greenhouse mist to studio reflections. Each frame a study in wet skin artistry with architectural shadow coverage.

Water beading on curves. Shadow stripes and grids. Wet floor reflections doubling beauty.

This is super exclusive content for premium subscribers.

#VERALABS #Meera #WateryShadowMesh #SuperExclusive #WetSkinArt #ShadowMesh #DropletArtistry #PremiumContent #FullBodyArt #WetFloor #ShadowCoverage #ExclusiveCollection`;

  fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

  console.log(`
══════════════════════════════════════════════════════════════════════════════
  ✅ Branded: ${branded}/${images.length} images
  📁 Output: ${OUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
