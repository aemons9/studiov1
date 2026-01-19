#!/usr/bin/env node
/**
 * PARALLEL BRANDING - All Recent Unbranded Images
 *
 * Brands all generated images since Monday (2025-01-13) with:
 * - VERALabs signature gradient overlay
 * - Collection name from folder
 * - Elegant typography
 * - Instagram-optimized 4:5 format (1080x1350)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BASE_DIR = '/home/ecolex/version1';
const OUT_BASE = '/home/ecolex/version1/instagram-branded-recent';
const SINCE_DATE = '2025-01-13';

// VERALabs branding quotes
const QUOTES = [
  'Where art meets desire',
  'The poetry of form',
  'Unveiled beauty',
  'Intimate artistry',
  'Beyond the veil',
  'Sculptural grace',
  'Light and shadow dance',
  'The muse speaks',
  'Timeless elegance',
  'Private collection',
  'Sensual geometry',
  'Golden hour magic',
  'Curves and light',
  'The art of intimacy',
  'Masterclass vision'
];

// Get collection name from folder path
function getCollectionName(folderPath) {
  const basename = path.basename(folderPath);
  const parent = path.basename(path.dirname(folderPath));

  // Clean up folder name to collection title
  let name = basename
    .replace(/^generated-/, '')
    .replace(/^meera-/, 'MEERA ')
    .replace(/-/g, ' ')
    .replace(/cycle \d+/i, '')
    .toUpperCase()
    .trim();

  // If it's a subfolder, include parent
  if (parent.startsWith('generated-')) {
    const parentName = parent.replace(/^generated-/, '').replace(/-/g, ' ').toUpperCase();
    name = `${parentName} | ${name}`;
  }

  return name || 'PRIVATE COLLECTION';
}

// Create branded image with VERALabs overlay
async function brandImage(inputPath, outputPath, collectionName) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Target Instagram 4:5 ratio
    const targetWidth = 1080;
    const targetHeight = 1350;

    // Calculate crop/resize
    const inputRatio = metadata.width / metadata.height;
    const targetRatio = targetWidth / targetHeight;

    let resizeWidth, resizeHeight;
    if (inputRatio > targetRatio) {
      resizeHeight = targetHeight;
      resizeWidth = Math.round(targetHeight * inputRatio);
    } else {
      resizeWidth = targetWidth;
      resizeHeight = Math.round(targetWidth / inputRatio);
    }

    // Random quote
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    // Create gradient overlay SVG
    const overlaySvg = `
      <svg width="${targetWidth}" height="${targetHeight}">
        <defs>
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0.7"/>
            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>
          </linearGradient>
          <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>
            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.8"/>
          </linearGradient>
        </defs>

        <!-- Top gradient -->
        <rect x="0" y="0" width="${targetWidth}" height="200" fill="url(#topGrad)"/>

        <!-- Bottom gradient -->
        <rect x="0" y="${targetHeight - 280}" width="${targetWidth}" height="280" fill="url(#bottomGrad)"/>

        <!-- VERALabs logo text -->
        <text x="540" y="60" font-family="Georgia, serif" font-size="28" font-weight="bold"
              fill="white" text-anchor="middle" letter-spacing="8">VERALABS</text>
        <text x="540" y="85" font-family="Georgia, serif" font-size="12"
              fill="rgba(255,255,255,0.7)" text-anchor="middle" letter-spacing="4">STUDIO</text>

        <!-- Collection name -->
        <text x="540" y="${targetHeight - 100}" font-family="Georgia, serif" font-size="20"
              fill="white" text-anchor="middle" letter-spacing="3">${collectionName}</text>

        <!-- Quote -->
        <text x="540" y="${targetHeight - 65}" font-family="Georgia, serif" font-size="14" font-style="italic"
              fill="rgba(255,255,255,0.8)" text-anchor="middle">"${quote}"</text>

        <!-- Decorative line -->
        <line x1="340" y1="${targetHeight - 130}" x2="740" y2="${targetHeight - 130}"
              stroke="rgba(255,255,255,0.3)" stroke-width="1"/>

        <!-- Bottom signature -->
        <text x="540" y="${targetHeight - 30}" font-family="Georgia, serif" font-size="10"
              fill="rgba(255,255,255,0.5)" text-anchor="middle" letter-spacing="2">PRIVATE COLLECTION • MEERA</text>
      </svg>
    `;

    // Process image
    await image
      .resize(resizeWidth, resizeHeight, { fit: 'cover' })
      .extract({
        left: Math.round((resizeWidth - targetWidth) / 2),
        top: Math.round((resizeHeight - targetHeight) / 2),
        width: targetWidth,
        height: targetHeight
      })
      .composite([{
        input: Buffer.from(overlaySvg),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    return true;
  } catch (err) {
    console.log(`    ❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 PARALLEL BRANDING - All Recent Unbranded Images                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   • VERALabs signature overlay                                               ║
║   • Instagram 4:5 optimized (1080x1350)                                      ║
║   • Collection names & elegant quotes                                        ║
║   • Images since: ${SINCE_DATE}                                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  // Create output directory
  if (!fs.existsSync(OUT_BASE)) fs.mkdirSync(OUT_BASE, { recursive: true });

  // Find all recent images
  console.log('🔍 Finding unbranded images...\n');
  const findCmd = `find ${BASE_DIR}/generated-* -name "*.png" -newermt "${SINCE_DATE}" -type f 2>/dev/null`;
  const allImages = execSync(findCmd, { encoding: 'utf-8' }).trim().split('\n').filter(Boolean);

  console.log(`📊 Found ${allImages.length} images to brand\n`);

  // Group by folder
  const folders = {};
  for (const img of allImages) {
    const folder = path.dirname(img);
    if (!folders[folder]) folders[folder] = [];
    folders[folder].push(img);
  }

  console.log(`📁 Across ${Object.keys(folders).length} collections\n`);

  let totalBranded = 0;
  let totalFailed = 0;
  let folderNum = 0;

  for (const [folder, images] of Object.entries(folders)) {
    folderNum++;
    const collectionName = getCollectionName(folder);
    const outFolder = path.join(OUT_BASE, path.basename(folder));

    if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

    console.log(`\n[${folderNum}/${Object.keys(folders).length}] ${collectionName}`);
    console.log(`   Source: ${folder}`);
    console.log(`   Images: ${images.length}`);

    let folderSuccess = 0;
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const filename = path.basename(img, '.png') + '_branded.jpg';
      const outPath = path.join(outFolder, filename);

      // Skip if already branded
      if (fs.existsSync(outPath)) {
        folderSuccess++;
        continue;
      }

      const success = await brandImage(img, outPath, collectionName);
      if (success) {
        folderSuccess++;
        totalBranded++;
        process.stdout.write(`   ✅ ${i + 1}/${images.length}\r`);
      } else {
        totalFailed++;
      }

      // Small delay to avoid overwhelming system
      await new Promise(r => setTimeout(r, 50));
    }

    console.log(`   ✅ Branded: ${folderSuccess}/${images.length}`);
  }

  console.log(`
════════════════════════════════════════════════════════════════════════════════
🎨 BRANDING COMPLETE
   Total Branded: ${totalBranded}
   Failed: ${totalFailed}
   Output: ${OUT_BASE}
════════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
