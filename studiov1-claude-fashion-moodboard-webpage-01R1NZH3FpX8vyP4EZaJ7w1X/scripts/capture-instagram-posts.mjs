#!/usr/bin/env node
/**
 * VERALABS Instagram Post Capture Script
 * Captures all HTML posts as 1080x1080 PNG images for Instagram
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT_DIR, 'instagram-posts');
const OUTPUT_DIR = path.join(ROOT_DIR, 'instagram-exports');

// Instagram dimensions
const INSTAGRAM_SQUARE = { width: 1080, height: 1080 };

// Strategic publishing order
const PUBLISHING_ORDER = [
  // Phase 1: Launch Week
  { file: '01-brand-intro.html', category: 'launch', day: 1 },
  { file: '17-carousel-welcome-1.html', category: 'carousel-welcome', day: 2, carousel: 1 },
  { file: '18-carousel-welcome-2.html', category: 'carousel-welcome', day: 2, carousel: 2 },
  { file: '19-carousel-welcome-3.html', category: 'carousel-welcome', day: 2, carousel: 3 },
  { file: '20-carousel-welcome-4.html', category: 'carousel-welcome', day: 2, carousel: 4 },
  { file: '21-carousel-welcome-5.html', category: 'carousel-welcome', day: 2, carousel: 5 },
  { file: '02-silk-shadow-moodboard.html', category: 'moodboard', day: 3 },
  { file: '08-philosophy-minimalist-luxe.html', category: 'philosophy', day: 4 },
  { file: '11-color-palette-signature.html', category: 'color', day: 5 },
  { file: '24-couture-feature-1.html', category: 'couture', day: 6 },
  { file: '22-ai-meets-couture.html', category: 'special', day: 7 },

  // Phase 2: Build Authority (Days 8-21)
  { file: '14-concept-geometric-harmony.html', category: 'concept', day: 8 },
  { file: '03-urban-poetry-moodboard.html', category: 'moodboard', day: 9 },
  { file: '26-editorial-spread-1.html', category: 'editorial', day: 10 },
  { file: '09-philosophy-editorial-narrative.html', category: 'philosophy', day: 11 },
  { file: '12-quote-elegance.html', category: 'quote', day: 12 },
  { file: '25-couture-feature-2.html', category: 'couture', day: 13 },
  { file: '04-gilded-dreams-moodboard.html', category: 'moodboard', day: 14 },
  { file: '15-concept-digital-dystopia.html', category: 'concept', day: 15 },
  { file: '36-couture-grid.html', category: 'couture', day: 16 },
  { file: '10-philosophy-cultural-fusion.html', category: 'philosophy', day: 17 },
  { file: '28-minimal-portrait-1.html', category: 'minimalist', day: 18 },
  { file: '29-silk-concept.html', category: 'concept-photo', day: 19 },
  { file: '13-quote-simplicity.html', category: 'quote', day: 20 },
  { file: '41-couture-look-08.html', category: 'couture-look', day: 21 },

  // Phase 3: Engagement Peak (Days 22-42)
  { file: '05-fluid-architecture-moodboard.html', category: 'moodboard', day: 22 },
  { file: '27-editorial-spread-2.html', category: 'editorial', day: 23 },
  { file: '30-gilded-concept.html', category: 'concept-photo', day: 24 },
  { file: '37-minimalist-series.html', category: 'minimalist', day: 25 },
  { file: '42-couture-look-09.html', category: 'couture-look', day: 26 },
  { file: '06-quiet-luxury-moodboard.html', category: 'moodboard', day: 27 },
  { file: '38-editorial-diptych.html', category: 'editorial', day: 28 },
  { file: '31-monsoon-concept.html', category: 'concept-photo', day: 29 },
  { file: '39-model-spotlight.html', category: 'couture', day: 30 },
  { file: '43-couture-look-10.html', category: 'couture-look', day: 31 },
  { file: '07-monsoon-reverie-moodboard.html', category: 'moodboard', day: 32 },
  { file: '44-couture-gallery-1.html', category: 'gallery', day: 33, boost: true },
  { file: '16-concept-baroque-renaissance.html', category: 'concept', day: 34 },
  { file: '33-quiet-concept.html', category: 'concept-photo', day: 35 },
  { file: '45-couture-gallery-2.html', category: 'gallery', day: 36 },
  { file: '32-urban-style-1.html', category: 'urban', day: 37 },
  { file: '40-portrait-feature.html', category: 'portrait', day: 38 },
  { file: '34-fluid-concept.html', category: 'concept-photo', day: 39 },
  { file: '46-urban-collection.html', category: 'urban', day: 40 },
  { file: '35-contemporary-urban-feature.html', category: 'urban', day: 41 },
  { file: '47-street-luxe.html', category: 'urban', day: 42 },

  // Phase 4: Premium Content (Days 43-63)
  { file: '48-minimalist-essence.html', category: 'minimalist', day: 43 },
  { file: '49-minimalist-triptych.html', category: 'minimalist', day: 44 },
  { file: '50-editorial-finale.html', category: 'editorial', day: 45 },
  { file: '51-editorial-last-look.html', category: 'editorial', day: 46 },
  { file: '52-minimal-portraits.html', category: 'portrait', day: 47 },
  { file: '53-couture-showcase.html', category: 'couture', day: 48, boost: true },

  // Intimate Art Collection (Premium - Days 49-58)
  { file: '54-intimate-split-11.html', category: 'intimate', day: 49, boost: true },
  { file: '55-sensual-diptych-12.html', category: 'intimate', day: 50, boost: true },
  { file: '56-art-collage-13.html', category: 'intimate', day: 51 },
  { file: '57-asymmetric-14.html', category: 'intimate', day: 52 },
  { file: '58-intimate-overlay-15.html', category: 'intimate', day: 53 },
  { file: '59-circular-frame-16.html', category: 'intimate', day: 54 },
  { file: '60-diagonal-split-17.html', category: 'intimate', day: 55 },
  { file: '61-stacked-frames-18.html', category: 'intimate', day: 56 },
  { file: '62-intimate-mosaic-19.html', category: 'intimate', day: 57 },
  { file: '63-magazine-spread-20.html', category: 'intimate', day: 58, boost: true },

  // Teaser (use strategically)
  { file: '23-coming-soon.html', category: 'teaser', day: 59 },
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function capturePost(browser, htmlFile, outputPath) {
  const page = await browser.newPage();

  try {
    // Set viewport to Instagram square size
    await page.setViewport(INSTAGRAM_SQUARE);

    // Navigate to the HTML file
    const filePath = `file://${path.join(POSTS_DIR, htmlFile)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 500));

    // Take screenshot
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: INSTAGRAM_SQUARE.width,
        height: INSTAGRAM_SQUARE.height,
      },
    });

    return true;
  } catch (error) {
    log(`   Error: ${error.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  log('');
  log('═'.repeat(60));
  log('VERALABS Instagram Post Capture');
  log('═'.repeat(60));
  log('');

  // Create output directory structure
  const categories = ['launch', 'carousel-welcome', 'moodboard', 'philosophy',
                     'color', 'couture', 'special', 'concept', 'editorial',
                     'quote', 'minimalist', 'concept-photo', 'couture-look',
                     'gallery', 'urban', 'portrait', 'intimate', 'teaser'];

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Create category folders
  for (const cat of categories) {
    const catDir = path.join(OUTPUT_DIR, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
  }

  // Create boost folder
  const boostDir = path.join(OUTPUT_DIR, '_AD_BOOST');
  if (!fs.existsSync(boostDir)) {
    fs.mkdirSync(boostDir, { recursive: true });
  }

  log(`Output directory: ${OUTPUT_DIR}`);
  log(`Total posts to capture: ${PUBLISHING_ORDER.length}`);
  log('');

  // Launch browser
  log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  for (let i = 0; i < PUBLISHING_ORDER.length; i++) {
    const post = PUBLISHING_ORDER[i];
    const dayStr = String(post.day).padStart(2, '0');
    const carouselStr = post.carousel ? `_slide${post.carousel}` : '';
    const baseName = post.file.replace('.html', '');
    const outputName = `day${dayStr}_${baseName}${carouselStr}.png`;
    const outputPath = path.join(OUTPUT_DIR, post.category, outputName);

    log(`[${i + 1}/${PUBLISHING_ORDER.length}] Capturing: ${post.file}`);

    const result = await capturePost(browser, post.file, outputPath);

    if (result) {
      log(`   ✓ Saved: ${post.category}/${outputName}`);
      success++;

      // Copy boost-worthy posts
      if (post.boost) {
        const boostPath = path.join(boostDir, outputName);
        fs.copyFileSync(outputPath, boostPath);
        log(`   ⭐ Copied to AD_BOOST folder`);
      }
    } else {
      failed++;
    }
  }

  await browser.close();

  log('');
  log('═'.repeat(60));
  log('CAPTURE COMPLETE');
  log('═'.repeat(60));
  log(`✓ Success: ${success}`);
  log(`✗ Failed: ${failed}`);
  log(`📁 Output: ${OUTPUT_DIR}`);
  log('═'.repeat(60));

  // Generate manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalPosts: PUBLISHING_ORDER.length,
    success,
    failed,
    posts: PUBLISHING_ORDER.map((p, i) => ({
      order: i + 1,
      day: p.day,
      file: p.file,
      category: p.category,
      carousel: p.carousel || null,
      boost: p.boost || false,
    })),
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'publishing-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  log(`📄 Manifest saved: publishing-manifest.json`);
}

main().catch(console.error);
