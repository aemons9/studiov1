#!/usr/bin/env node
/**
 * Brand and Publish Meera Collections to Instagram
 *
 * Collections:
 * 1. Meera Candlelit Premium (10 images)
 * 2. Meera Platinum Amber Elite (8 images)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '/home/ecolex/version1/.env.local' });

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN || process.env.VITE_INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || process.env.VITE_INSTAGRAM_ACCOUNT_ID;
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

const COLLECTIONS = [
  {
    name: 'Meera Candlelit Premium',
    srcDir: '/home/ecolex/version1/generated-meera-candlelit-premium',
    outDir: '/home/ecolex/version1/instagram_branded_new/meera_candlelit_premium',
    collectionLabel: 'CANDLELIT DEVOTION',
    tagline: 'Where flame meets form...',
    caption: `MEERA | Candlelit Premium Exclusive

Sacred flames illuminate divine form. Ten masterworks exploring silver chambers, velvet warmth, industrial glamour, amber intimacy, and platinum elegance.

Bronze candelabras cast shadows on silk and skin. Meera embodies the eternal dance between light and shadow.

This is devotion through artistry.

#VERALABS #Meera #CandlelitChamber #PremiumExclusive #IndianGlamour #IntimateArt #SilverChamber #VelvetWarmth #AmberGlow #PlatinumElegance #FineArtBoudoir #DevotionalBeauty`,
    variantMap: {
      'silver': 'SILVER CHAMBER',
      'velvet': 'VELVET DEVOTION',
      'industrial': 'INDUSTRIAL GLAMOUR',
      'amber': 'AMBER GLOW',
      'platinum': 'PLATINUM ELEGANCE',
      'noir': 'NOIR LUXURY'
    }
  },
  {
    name: 'Meera Platinum Amber Elite',
    srcDir: '/home/ecolex/version1/generated-meera-platinum-amber-elite',
    outDir: '/home/ecolex/version1/instagram_branded_new/meera_platinum_amber_elite',
    collectionLabel: 'PLATINUM AMBER ELITE',
    tagline: 'Chainmail meets amber glow...',
    caption: `MEERA | Platinum Amber Elite Private Collection

Platinum chainmail meets amber candlelight in this ultra-exclusive series. Eight elite masterworks of recline closeups, intimate detail studies, and sensual framing.

Mercury shimmer against honey-gold warmth. The ultimate expression of luxury intimacy.

For discerning collectors only.

#VERALABS #Meera #PlatinumChainmail #AmberIntimate #EliteCollection #PrivateExclusive #IndianGlamour #ChainmailLuxury #UltraExclusive #MasterclassPhotography #ReclineCloseup #IntimateDetail`,
    variantMap: {
      'recline': 'AMBER RECLINE',
      'torso': 'INTIMATE DETAIL',
      'face': 'PORTRAIT STUDY',
      'hip': 'CURVE STUDY',
      'serpentine': 'SERPENTINE FLOW',
      'venus': 'VENUS CLASSIC',
      'seated': 'SEATED INTIMATE',
      'overhead': 'OVERHEAD VIEW'
    }
  }
];

const PROXY_BASE = 'http://localhost:3001';

// Helper functions
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const lib = isHttps ? https : http;

    const req = lib.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function proxyPost(endpoint, payload) {
  const data = JSON.stringify(payload);
  return makeRequest(`${PROXY_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  }, data);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create branding overlay with Sharp
function createBrandingOverlay(collectionLabel, variantName, tagline) {
  const width = 1080;
  const height = 1350;
  const overlayY = Math.floor(height * 0.72);
  const overlayHeight = Math.floor(height * 0.28);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <!-- Gradient overlay at bottom -->
      <defs>
        <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="30%" style="stop-color:rgba(0,0,0,0.6)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.85)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <!-- Collection label -->
      <text x="${width/2}" y="${Math.floor(height * 0.77) + 20}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="24"
            fill="#c9a962"
            text-anchor="middle">${collectionLabel}</text>

      <!-- Variant name -->
      <text x="${width/2}" y="${Math.floor(height * 0.83) + 30}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="42"
            font-weight="bold"
            fill="white"
            text-anchor="middle">${variantName}</text>

      <!-- Tagline -->
      <text x="${width/2}" y="${Math.floor(height * 0.90) + 15}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="26"
            font-style="italic"
            fill="#c9a962"
            text-anchor="middle">${tagline}</text>

      <!-- VERALABS watermark -->
      <text x="${width/2}" y="${Math.floor(height * 0.96) + 10}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="18"
            fill="rgba(201,169,98,0.7)"
            text-anchor="middle">VERALABS</text>
    </svg>
  `);
}

async function brandImage(srcPath, outPath, collectionLabel, variantName, tagline) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createBrandingOverlay(collectionLabel, variantName, tagline);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 92 })
      .toFile(outPath);

    return true;
  } catch (err) {
    console.error(`   Error branding: ${err.message}`);
    return false;
  }
}

function getVariantName(filename, variantMap) {
  const lowerName = filename.toLowerCase();

  // Check variant map for matches
  for (const [key, name] of Object.entries(variantMap)) {
    if (lowerName.includes(key)) return name;
  }

  return 'PREMIUM EXCLUSIVE';
}

async function brandCollection(collection) {
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`   BRANDING: ${collection.name}`);
  console.log(`${'═'.repeat(78)}\n`);

  // Create output directory
  if (!fs.existsSync(collection.outDir)) {
    fs.mkdirSync(collection.outDir, { recursive: true });
  }

  // Get images
  const images = fs.readdirSync(collection.srcDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images\n`);

  const branded = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const srcPath = path.join(collection.srcDir, img);
    const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(collection.outDir, outName);

    const variantName = getVariantName(img, collection.variantMap);

    const success = await brandImage(
      srcPath,
      outPath,
      collection.collectionLabel,
      variantName,
      collection.tagline
    );

    if (success) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ [${i + 1}/${images.length}] ${variantName} → ${outName}`);
      branded.push({ src: img, out: outName, variant: variantName });
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ❌ [${i + 1}/${images.length}] Failed: ${img}`);
    }
  }

  // Save caption
  fs.writeFileSync(path.join(collection.outDir, 'caption.txt'), collection.caption);

  console.log(`\n   ✅ Branded: ${branded.length}/${images.length} images`);
  console.log(`   📂 Output: ${collection.outDir}`);

  return branded;
}

async function publishCarousel(collection) {
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`   PUBLISHING: ${collection.name}`);
  console.log(`${'═'.repeat(78)}\n`);

  // Get branded images
  const images = fs.readdirSync(collection.outDir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10); // Instagram carousel max 10 images

  if (images.length === 0) {
    console.log('   ❌ No branded images found');
    return false;
  }

  console.log(`[${new Date().toLocaleTimeString()}] Publishing ${images.length} images as carousel\n`);

  // Read image files and convert to base64
  const imagePaths = images.map(img => path.join(collection.outDir, img));
  const base64Images = imagePaths.map(p => fs.readFileSync(p).toString('base64'));

  try {
    // For carousel, we need to upload each image separately first
    // Then create the carousel container
    const response = await proxyPost('/api/instagram/publish-carousel', {
      accessToken: INSTAGRAM_TOKEN,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
      githubToken: GITHUB_TOKEN,
      images: base64Images,
      caption: collection.caption
    });

    if (response.status === 200 && response.data.success) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ Carousel published!`);
      console.log(`   Media ID: ${response.data.mediaId}`);
      return true;
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ❌ Publish failed:`, response.data);
      return false;
    }
  } catch (err) {
    console.log(`[${new Date().toLocaleTimeString()}] ❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ BRAND & PUBLISH MEERA COLLECTIONS ✨                                    ║
║                                                                              ║
║   Candlelit Premium • Platinum Amber Elite                                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  const results = {
    branded: [],
    published: []
  };

  // Phase 1: Brand all collections
  console.log('\n' + '▓'.repeat(78));
  console.log('   PHASE 1: BRANDING');
  console.log('▓'.repeat(78));

  for (const collection of COLLECTIONS) {
    const branded = await brandCollection(collection);
    results.branded.push({ name: collection.name, count: branded.length });
  }

  // Phase 2: Publish to Instagram
  console.log('\n' + '▓'.repeat(78));
  console.log('   PHASE 2: INSTAGRAM PUBLISHING');
  console.log('▓'.repeat(78));

  for (const collection of COLLECTIONS) {
    console.log(`\n[${new Date().toLocaleTimeString()}] Publishing ${collection.name}...`);
    const success = await publishCarousel(collection);
    results.published.push({ name: collection.name, success });

    if (success) {
      // Wait between carousel publishes
      console.log(`[${new Date().toLocaleTimeString()}] Waiting 30s before next publish...`);
      await sleep(30000);
    }
  }

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║              MEERA BRAND & PUBLISH COMPLETE                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  BRANDING RESULTS:
${results.branded.map(r => `     ✅ ${r.name}: ${r.count} images`).join('\n')}

  PUBLISHING RESULTS:
${results.published.map(r => `     ${r.success ? '✅' : '❌'} ${r.name}: ${r.success ? 'Published' : 'Failed'}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
