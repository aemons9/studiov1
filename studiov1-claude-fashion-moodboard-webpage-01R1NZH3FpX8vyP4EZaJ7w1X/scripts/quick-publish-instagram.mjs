#!/usr/bin/env node
/**
 * VERALABS Instagram Quick Publisher
 * Publishes captured posts to Instagram via Graph API
 *
 * Usage:
 *   node scripts/quick-publish-instagram.mjs                    # Interactive mode
 *   node scripts/quick-publish-instagram.mjs --day 1            # Publish day 1
 *   node scripts/quick-publish-instagram.mjs --carousel welcome # Publish welcome carousel
 *   node scripts/quick-publish-instagram.mjs --next             # Publish next unpublished
 *   node scripts/quick-publish-instagram.mjs --preview          # Preview next 5
 *   node scripts/quick-publish-instagram.mjs --status           # Show publish status
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const EXPORTS_DIR = path.join(ROOT_DIR, 'instagram-exports');
const DATA_FILE = path.join(ROOT_DIR, 'instagram-publishing-data.json');
const STATE_FILE = path.join(ROOT_DIR, 'instagram-publish-state.json');
const CAROUSEL_SCHEDULE_FILE = path.join(ROOT_DIR, 'carousel-schedule.json');

// Configuration
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN || process.env.VITE_INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const GRAPH_API_BASE = 'https://graph.facebook.com/v18.0';

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(msg, color = '') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${msg}${colors.reset}`);
}

function logSuccess(msg) { log(msg, colors.green); }
function logError(msg) { log(msg, colors.red); }
function logInfo(msg) { log(msg, colors.cyan); }
function logWarn(msg) { log(msg, colors.yellow); }

// Load publishing data
function loadPublishingData() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error('Publishing data not found. Run capture script first.');
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// Load carousel schedule
function loadCarouselSchedule() {
  if (!fs.existsSync(CAROUSEL_SCHEDULE_FILE)) {
    throw new Error('Carousel schedule not found.');
  }
  return JSON.parse(fs.readFileSync(CAROUSEL_SCHEDULE_FILE, 'utf-8'));
}

// Find image file by HTML filename
function findImageByHtml(htmlFile) {
  const baseName = htmlFile.replace('.html', '');

  // Search all category folders
  const categories = fs.readdirSync(EXPORTS_DIR).filter(f =>
    fs.statSync(path.join(EXPORTS_DIR, f)).isDirectory() && !f.startsWith('_')
  );

  for (const cat of categories) {
    const catDir = path.join(EXPORTS_DIR, cat);
    const files = fs.readdirSync(catDir);
    const match = files.find(f => f.includes(baseName) && f.endsWith('.png'));
    if (match) {
      return path.join(catDir, match);
    }
  }
  return null;
}

// Load/save publish state
function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }
  return { published: [], lastPublish: null, mediaIds: {} };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Upload image to GitHub CDN
async function uploadToGitHub(imagePath, prefix = 'veralabs') {
  const content = fs.readFileSync(imagePath).toString('base64');
  const filename = `${prefix}_${Date.now()}.png`;
  const apiUrl = `https://api.github.com/repos/aemons9/studiov1/contents/photo/instagram-posts/${filename}`;

  log(`   Uploading: ${path.basename(imagePath)}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `[Instagram] ${filename}`,
      content: content,
      branch: 'main',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub upload failed: ${response.status} - ${error.substring(0, 200)}`);
  }

  const rawUrl = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/instagram-posts/${filename}`;
  log(`   ✓ Uploaded: ${rawUrl}`, colors.green);
  return rawUrl;
}

// Create single image container
async function createImageContainer(imageUrl, caption) {
  log('   Creating container...');

  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: INSTAGRAM_TOKEN,
  });

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Container failed: ${data.error.message}`);
  }

  log(`   ✓ Container: ${data.id}`, colors.green);
  return data.id;
}

// Create carousel item container
async function createCarouselItem(imageUrl) {
  const params = new URLSearchParams({
    image_url: imageUrl,
    is_carousel_item: 'true',
    access_token: INSTAGRAM_TOKEN,
  });

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Carousel item failed: ${data.error.message}`);
  }

  return data.id;
}

// Create carousel container
async function createCarouselContainer(itemIds, caption) {
  log('   Creating carousel container...');

  const params = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: itemIds.join(','),
    caption: caption,
    access_token: INSTAGRAM_TOKEN,
  });

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Carousel container failed: ${data.error.message}`);
  }

  log(`   ✓ Carousel container: ${data.id}`, colors.green);
  return data.id;
}

// Check container status
async function checkContainerStatus(containerId) {
  const response = await fetch(
    `${GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${INSTAGRAM_TOKEN}`
  );
  return response.json();
}

// Wait for container to be ready
async function waitForContainerReady(containerId, maxWait = 30000) {
  const startTime = Date.now();
  let lastStatus = '';

  while (Date.now() - startTime < maxWait) {
    const status = await checkContainerStatus(containerId);

    if (status.status_code === 'FINISHED') {
      return true;
    }

    if (status.status_code === 'ERROR') {
      throw new Error(`Container processing failed: ${status.status}`);
    }

    if (status.status !== lastStatus) {
      log(`   Status: ${status.status_code || 'processing'}...`, colors.dim);
      lastStatus = status.status;
    }

    await new Promise(r => setTimeout(r, 2000));
  }

  throw new Error('Container not ready after max wait time');
}

// Publish container
async function publishContainer(containerId) {
  log('   Waiting for container to be ready...');
  await waitForContainerReady(containerId);

  log('   Publishing to Instagram...');

  const response = await fetch(`${GRAPH_API_BASE}/${INSTAGRAM_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      creation_id: containerId,
      access_token: INSTAGRAM_TOKEN,
    }).toString(),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Publish failed: ${data.error.message}`);
  }

  if (!data.id) {
    throw new Error(`Publish failed: No media ID returned`);
  }

  return data.id;
}

// Find image file for a post
function findImageFile(post) {
  const dayStr = String(post.day).padStart(2, '0');
  const baseName = post.file.replace('.html', '');

  // Check various naming patterns
  const patterns = [
    `day${dayStr}_${baseName}.png`,
    `day${dayStr}_${baseName}_slide${post.carouselPosition}.png`,
  ];

  for (const pattern of patterns) {
    const filePath = path.join(EXPORTS_DIR, post.category, pattern);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  // Search in category folder
  const categoryDir = path.join(EXPORTS_DIR, post.category);
  if (fs.existsSync(categoryDir)) {
    const files = fs.readdirSync(categoryDir);
    const match = files.find(f => f.includes(baseName));
    if (match) {
      return path.join(categoryDir, match);
    }
  }

  return null;
}

// Publish single post
async function publishSinglePost(post, data) {
  log('');
  log(`${'═'.repeat(60)}`, colors.bright);
  log(`📸 Publishing: ${post.title}`, colors.bright);
  log(`${'═'.repeat(60)}`, colors.bright);
  log(`   Day: ${post.day} | Category: ${post.category}`);

  const imagePath = findImageFile(post);
  if (!imagePath) {
    throw new Error(`Image not found for: ${post.file}`);
  }

  // Upload to GitHub
  log('');
  log('📤 Step 1: Upload to GitHub CDN');
  const imageUrl = await uploadToGitHub(imagePath, `veralabs_day${post.day}`);

  // Wait for CDN
  log('');
  log('⏳ Step 2: Waiting for CDN (2s)...');
  await new Promise(r => setTimeout(r, 2000));

  // Create container
  log('');
  log('📱 Step 3: Create Instagram container');
  const caption = post.caption || `${post.title}\n\n#VERALABS #FashionAI #DigitalCouture`;
  const containerId = await createImageContainer(imageUrl, caption);

  // Publish
  log('');
  log('🚀 Step 4: Publish to Instagram');
  const mediaId = await publishContainer(containerId);

  return { mediaId, imageUrl };
}

// Publish carousel
async function publishCarousel(posts, carouselCaption) {
  log('');
  log(`${'═'.repeat(60)}`, colors.bright);
  log(`🎠 Publishing Carousel: ${posts.length} slides`, colors.bright);
  log(`${'═'.repeat(60)}`, colors.bright);

  // Upload all images
  log('');
  log('📤 Step 1: Upload all slides to GitHub CDN');
  const imageUrls = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const imagePath = findImageFile(post);
    if (!imagePath) {
      throw new Error(`Image not found for slide ${i + 1}: ${post.file}`);
    }
    log(`   Slide ${i + 1}/${posts.length}`);
    const url = await uploadToGitHub(imagePath, `veralabs_carousel_slide${i + 1}`);
    imageUrls.push(url);
  }

  // Wait for CDN
  log('');
  log('⏳ Step 2: Waiting for CDN (3s)...');
  await new Promise(r => setTimeout(r, 3000));

  // Create carousel items
  log('');
  log('📱 Step 3: Create carousel items');
  const itemIds = [];
  for (let i = 0; i < imageUrls.length; i++) {
    log(`   Creating item ${i + 1}/${imageUrls.length}`);
    const itemId = await createCarouselItem(imageUrls[i]);
    itemIds.push(itemId);
    await new Promise(r => setTimeout(r, 500)); // Rate limit
  }

  // Create carousel container
  log('');
  log('📱 Step 4: Create carousel container');
  const containerId = await createCarouselContainer(itemIds, carouselCaption);

  // Publish
  log('');
  log('🚀 Step 5: Publish to Instagram');
  const mediaId = await publishContainer(containerId);

  return { mediaId, imageUrls };
}

// Publish scheduled carousel from carousel-schedule.json
async function publishScheduledCarousel(carousel) {
  log('');
  log(`${'═'.repeat(60)}`, colors.bright);
  log(`🎠 Publishing: ${carousel.name}`, colors.bright);
  log(`${'═'.repeat(60)}`, colors.bright);
  log(`   Carousel Day: ${carousel.day} | Category: ${carousel.category}`);
  log(`   Slides: ${carousel.slides.length}`);
  log('');

  // Find all slide images
  log('📤 Step 1: Upload all slides to GitHub CDN');
  const imageUrls = [];
  for (let i = 0; i < carousel.slides.length; i++) {
    const htmlFile = carousel.slides[i];
    const imagePath = findImageByHtml(htmlFile);
    if (!imagePath) {
      throw new Error(`Image not found for slide ${i + 1}: ${htmlFile}`);
    }
    log(`   Slide ${i + 1}/${carousel.slides.length}: ${htmlFile}`);
    const url = await uploadToGitHub(imagePath, `veralabs_${carousel.id}_slide${i + 1}`);
    imageUrls.push(url);
  }

  // Wait for CDN
  log('');
  log('⏳ Step 2: Waiting for CDN (3s)...');
  await new Promise(r => setTimeout(r, 3000));

  // Create carousel items
  log('');
  log('📱 Step 3: Create carousel items');
  const itemIds = [];
  for (let i = 0; i < imageUrls.length; i++) {
    log(`   Creating item ${i + 1}/${imageUrls.length}`);
    const itemId = await createCarouselItem(imageUrls[i]);
    itemIds.push(itemId);
    await new Promise(r => setTimeout(r, 500)); // Rate limit
  }

  // Create carousel container
  log('');
  log('📱 Step 4: Create carousel container');
  const containerId = await createCarouselContainer(itemIds, carousel.caption);

  // Publish
  log('');
  log('🚀 Step 5: Publish to Instagram');
  const mediaId = await publishContainer(containerId);

  return { mediaId, imageUrls, carouselId: carousel.id };
}

// Show carousel schedule status
function showCarouselSchedule(schedule, state) {
  console.log('');
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}VERALABS Carousel Schedule${colors.reset}`);
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log('');
  console.log(`📊 Total Carousels: ${schedule.carousels.length}`);
  console.log('');

  const publishedCarousels = state.publishedCarousels || [];

  schedule.carousels.forEach((c, i) => {
    const published = publishedCarousels.includes(c.id);
    const status = published ? `${colors.green}✓ Published${colors.reset}` : `${colors.yellow}○ Pending${colors.reset}`;
    const boost = c.boost ? ' ⭐' : '';
    console.log(`${i + 1}. ${status} Day ${c.day}: ${c.name} (${c.slides.length} slides)${boost}`);
  });
  console.log('');
}

// Get posts for a specific day
function getPostsForDay(data, day) {
  return data.posts.filter(p => p.day === day);
}

// Get carousel posts
function getCarouselPosts(data, carouselName) {
  const carousel = data.carousels.find(c =>
    c.name.toLowerCase().includes(carouselName.toLowerCase())
  );
  if (!carousel) return null;

  return carousel.slides.map(slide =>
    data.posts.find(p => p.file === slide)
  ).filter(Boolean);
}

// Show publish status
function showStatus(data, state) {
  console.log('');
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}VERALABS Instagram Publish Status${colors.reset}`);
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log('');

  const totalPosts = data.posts.length;
  const published = state.published.length;
  const remaining = totalPosts - published;

  console.log(`📊 Progress: ${published}/${totalPosts} posts published`);
  console.log(`   Remaining: ${remaining}`);
  console.log('');

  if (state.lastPublish) {
    console.log(`📅 Last publish: ${new Date(state.lastPublish).toLocaleString()}`);
  }

  console.log('');
  console.log(`${colors.cyan}Published:${colors.reset}`);
  if (state.published.length === 0) {
    console.log('   None yet');
  } else {
    state.published.slice(-10).forEach(id => {
      const post = data.posts.find(p => p.id === id);
      if (post) {
        console.log(`   ✓ Day ${post.day}: ${post.title}`);
      }
    });
    if (state.published.length > 10) {
      console.log(`   ... and ${state.published.length - 10} more`);
    }
  }

  console.log('');
  console.log(`${colors.yellow}Next up:${colors.reset}`);
  const nextPosts = data.posts
    .filter(p => !state.published.includes(p.id))
    .slice(0, 5);
  nextPosts.forEach(p => {
    console.log(`   → Day ${p.day}: ${p.title} (${p.category})`);
  });

  console.log('');
}

// Preview next posts
function showPreview(data, state) {
  console.log('');
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}Next 5 Posts Preview${colors.reset}`);
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log('');

  const nextPosts = data.posts
    .filter(p => !state.published.includes(p.id))
    .slice(0, 5);

  nextPosts.forEach((p, i) => {
    console.log(`${colors.cyan}${i + 1}. Day ${p.day}: ${p.title}${colors.reset}`);
    console.log(`   Category: ${p.category}`);
    console.log(`   File: ${p.file}`);
    console.log(`   Boost: ${p.boost ? '⭐ Yes' : 'No'}`);
    if (p.caption) {
      const preview = p.caption.split('\n')[0].substring(0, 60);
      console.log(`   Caption: "${preview}..."`);
    }
    console.log('');
  });
}

// Interactive mode
async function interactiveMode(data, state) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q) => new Promise(resolve => rl.question(q, resolve));

  console.log('');
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}VERALABS Instagram Quick Publisher${colors.reset}`);
  console.log(`${colors.bright}${'═'.repeat(60)}${colors.reset}`);
  console.log('');

  showStatus(data, state);

  console.log(`${colors.bright}Options:${colors.reset}`);
  console.log('  1. Publish next post');
  console.log('  2. Publish specific day');
  console.log('  3. Publish Welcome Carousel');
  console.log('  4. Preview next 5');
  console.log('  5. Show status');
  console.log('  6. Exit');
  console.log('');

  const choice = await question('Select option (1-6): ');

  switch (choice.trim()) {
    case '1': {
      const nextPost = data.posts.find(p => !state.published.includes(p.id));
      if (nextPost) {
        console.log('');
        const confirm = await question(`Publish "${nextPost.title}" (Day ${nextPost.day})? (y/n): `);
        if (confirm.toLowerCase() === 'y') {
          rl.close();
          const result = await publishSinglePost(nextPost, data);
          state.published.push(nextPost.id);
          state.lastPublish = new Date().toISOString();
          state.mediaIds[nextPost.file] = result.mediaId;
          saveState(state);
          logSuccess(`\n✅ Published! Media ID: ${result.mediaId}`);
        }
      } else {
        console.log('All posts published!');
      }
      break;
    }
    case '2': {
      const dayNum = await question('Enter day number (1-59): ');
      const day = parseInt(dayNum);
      const posts = getPostsForDay(data, day);
      if (posts.length > 0) {
        console.log(`Found ${posts.length} post(s) for day ${day}`);
        const confirm = await question('Publish? (y/n): ');
        if (confirm.toLowerCase() === 'y') {
          rl.close();
          for (const post of posts) {
            if (!state.published.includes(post.id)) {
              const result = await publishSinglePost(post, data);
              state.published.push(post.id);
              state.lastPublish = new Date().toISOString();
              state.mediaIds[post.file] = result.mediaId;
              saveState(state);
              logSuccess(`✅ Published! Media ID: ${result.mediaId}`);
            }
          }
        }
      } else {
        console.log('No posts found for that day');
      }
      break;
    }
    case '3': {
      const carouselPosts = getCarouselPosts(data, 'welcome');
      if (carouselPosts) {
        console.log(`\nWelcome Carousel: ${carouselPosts.length} slides`);
        const confirm = await question('Publish carousel? (y/n): ');
        if (confirm.toLowerCase() === 'y') {
          rl.close();
          const caption = data.posts.find(p => p.carouselPosition === 1)?.caption ||
            'Welcome to VERALABS\n\nSwipe to discover our world →\n\n#VERALABS #FashionAI';
          const result = await publishCarousel(carouselPosts, caption);
          carouselPosts.forEach(p => {
            state.published.push(p.id);
          });
          state.lastPublish = new Date().toISOString();
          state.mediaIds['welcome-carousel'] = result.mediaId;
          saveState(state);
          logSuccess(`\n✅ Carousel published! Media ID: ${result.mediaId}`);
        }
      }
      break;
    }
    case '4':
      showPreview(data, state);
      rl.close();
      break;
    case '5':
      showStatus(data, state);
      rl.close();
      break;
    case '6':
      console.log('Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid option');
      rl.close();
  }
}

// Main
async function main() {
  // Check token
  if (!INSTAGRAM_TOKEN) {
    logError('❌ INSTAGRAM_TOKEN not set');
    logInfo('Set it with: export INSTAGRAM_TOKEN="your_token"');
    process.exit(1);
  }

  const data = loadPublishingData();
  const state = loadState();
  const args = process.argv.slice(2);

  if (args.includes('--status')) {
    showStatus(data, state);
    return;
  }

  if (args.includes('--preview')) {
    showPreview(data, state);
    return;
  }

  if (args.includes('--next')) {
    const nextPost = data.posts.find(p => !state.published.includes(p.id));
    if (!nextPost) {
      logInfo('All posts published!');
      return;
    }
    const result = await publishSinglePost(nextPost, data);
    state.published.push(nextPost.id);
    state.lastPublish = new Date().toISOString();
    state.mediaIds[nextPost.file] = result.mediaId;
    saveState(state);
    logSuccess(`\n✅ Published! Media ID: ${result.mediaId}`);
    return;
  }

  if (args.includes('--day')) {
    const dayIndex = args.indexOf('--day') + 1;
    const day = parseInt(args[dayIndex]);
    const posts = getPostsForDay(data, day);
    if (posts.length === 0) {
      logError(`No posts found for day ${day}`);
      return;
    }
    for (const post of posts) {
      if (!state.published.includes(post.id)) {
        const result = await publishSinglePost(post, data);
        state.published.push(post.id);
        state.lastPublish = new Date().toISOString();
        state.mediaIds[post.file] = result.mediaId;
        saveState(state);
        logSuccess(`\n✅ Published! Media ID: ${result.mediaId}`);
      }
    }
    return;
  }

  if (args.includes('--carousel')) {
    const carouselIndex = args.indexOf('--carousel') + 1;
    const carouselName = args[carouselIndex];
    const carouselPosts = getCarouselPosts(data, carouselName);
    if (!carouselPosts) {
      logError(`Carousel not found: ${carouselName}`);
      logInfo('Available: welcome, philosophy, moodboard, intimate');
      return;
    }
    const caption = data.posts.find(p => p.file === carouselPosts[0].file)?.caption ||
      `#VERALABS #FashionAI`;
    const result = await publishCarousel(carouselPosts, caption);
    carouselPosts.forEach(p => {
      state.published.push(p.id);
    });
    state.lastPublish = new Date().toISOString();
    state.mediaIds[`${carouselName}-carousel`] = result.mediaId;
    saveState(state);
    logSuccess(`\n✅ Carousel published! Media ID: ${result.mediaId}`);
    return;
  }

  // --batch: Show carousel schedule
  if (args.includes('--batch')) {
    const schedule = loadCarouselSchedule();
    showCarouselSchedule(schedule, state);
    return;
  }

  // --batch-publish: Publish a specific carousel by ID or number
  if (args.includes('--batch-publish')) {
    const schedule = loadCarouselSchedule();
    const idx = args.indexOf('--batch-publish') + 1;
    const target = args[idx];

    let carousel;
    if (target.startsWith('carousel-')) {
      carousel = schedule.carousels.find(c => c.id === target);
    } else {
      const num = parseInt(target);
      carousel = schedule.carousels[num - 1];
    }

    if (!carousel) {
      logError(`Carousel not found: ${target}`);
      logInfo('Use --batch to see available carousels');
      return;
    }

    // Check if already published
    const publishedCarousels = state.publishedCarousels || [];
    if (publishedCarousels.includes(carousel.id)) {
      logWarn(`Carousel ${carousel.id} already published`);
      return;
    }

    const result = await publishScheduledCarousel(carousel);

    // Update state
    state.publishedCarousels = state.publishedCarousels || [];
    state.publishedCarousels.push(carousel.id);
    state.lastPublish = new Date().toISOString();
    state.mediaIds[carousel.id] = result.mediaId;
    saveState(state);

    logSuccess(`\n✅ Carousel published! Media ID: ${result.mediaId}`);
    return;
  }

  // --batch-next: Publish next unpublished carousel
  if (args.includes('--batch-next')) {
    const schedule = loadCarouselSchedule();
    const publishedCarousels = state.publishedCarousels || [];

    const nextCarousel = schedule.carousels.find(c => !publishedCarousels.includes(c.id));
    if (!nextCarousel) {
      logInfo('All carousels published!');
      return;
    }

    log(`Next carousel: ${nextCarousel.name} (${nextCarousel.slides.length} slides)`);

    const result = await publishScheduledCarousel(nextCarousel);

    state.publishedCarousels = state.publishedCarousels || [];
    state.publishedCarousels.push(nextCarousel.id);
    state.lastPublish = new Date().toISOString();
    state.mediaIds[nextCarousel.id] = result.mediaId;
    saveState(state);

    logSuccess(`\n✅ Carousel published! Media ID: ${result.mediaId}`);
    return;
  }

  // --batch-all: Publish all remaining carousels (with delay between each)
  if (args.includes('--batch-all')) {
    const schedule = loadCarouselSchedule();
    const publishedCarousels = state.publishedCarousels || [];

    const remaining = schedule.carousels.filter(c => !publishedCarousels.includes(c.id));
    if (remaining.length === 0) {
      logInfo('All carousels published!');
      return;
    }

    log(`Publishing ${remaining.length} remaining carousels...`);
    log('');

    for (let i = 0; i < remaining.length; i++) {
      const carousel = remaining[i];
      log(`\n[${i + 1}/${remaining.length}] Publishing: ${carousel.name}`);

      try {
        const result = await publishScheduledCarousel(carousel);

        state.publishedCarousels = state.publishedCarousels || [];
        state.publishedCarousels.push(carousel.id);
        state.lastPublish = new Date().toISOString();
        state.mediaIds[carousel.id] = result.mediaId;
        saveState(state);

        logSuccess(`✅ Published: ${carousel.name} (Media ID: ${result.mediaId})`);

        // Delay between carousels to avoid rate limits
        if (i < remaining.length - 1) {
          log('⏳ Waiting 10 seconds before next carousel...');
          await new Promise(r => setTimeout(r, 10000));
        }
      } catch (err) {
        logError(`Failed to publish ${carousel.name}: ${err.message}`);
        logInfo('Stopping batch. Resume with --batch-next');
        break;
      }
    }
    return;
  }

  // Interactive mode
  await interactiveMode(data, state);
}

main().catch(err => {
  logError(`\n❌ Error: ${err.message}`);
  process.exit(1);
});
