#!/usr/bin/env node
/**
 * Carousel Scheduler - Auto-publishes carousels at intervals
 *
 * Usage: node scripts/carouselScheduler.mjs [--interval <minutes>] [--start <carousel-num>]
 *
 * Default: 60 minutes interval, starts from carousel-03
 */

import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';

const CONFIG = {
  CAROUSELS_DIR: path.join(process.cwd(), 'preview-output', 'carousels'),
  LOG_FILE: path.join(process.cwd(), 'data', 'scheduler-log.json'),
  DEFAULT_INTERVAL: 60, // minutes
  DEFAULT_START: 3,
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadLog() {
  if (!fs.existsSync(CONFIG.LOG_FILE)) {
    return { runs: [], lastPublished: null };
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG.LOG_FILE, 'utf8'));
  } catch {
    return { runs: [], lastPublished: null };
  }
}

function saveLog(log) {
  ensureDir(path.dirname(CONFIG.LOG_FILE));
  fs.writeFileSync(CONFIG.LOG_FILE, JSON.stringify(log, null, 2));
}

function getUnpublishedCarousels(startFrom = 3) {
  const dirs = fs.readdirSync(CONFIG.CAROUSELS_DIR)
    .filter(d => {
      const dirPath = path.join(CONFIG.CAROUSELS_DIR, d);
      if (!fs.statSync(dirPath).isDirectory()) return false;

      // Check if already published
      const metadataPath = path.join(dirPath, 'metadata.json');
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        if (metadata.status === 'published') return false;
      }

      // Check carousel number
      const match = d.match(/carousel-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        return num >= startFrom;
      }
      return false;
    })
    .sort();

  return dirs;
}

async function publishCarousel(carouselId) {
  return new Promise((resolve, reject) => {
    console.log(`\n📤 Publishing: ${carouselId}`);

    const child = spawn('node', ['scripts/publishCarousel.mjs', carouselId], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, carouselId });
      } else {
        reject(new Error(`Publish failed with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

function formatTime(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}m ${secs}s`;
}

async function main() {
  // Parse args
  const args = process.argv.slice(2);
  let interval = CONFIG.DEFAULT_INTERVAL;
  let startFrom = CONFIG.DEFAULT_START;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--interval' || args[i] === '-i') {
      interval = parseInt(args[++i], 10) || CONFIG.DEFAULT_INTERVAL;
    }
    if (args[i] === '--start' || args[i] === '-s') {
      startFrom = parseInt(args[++i], 10) || CONFIG.DEFAULT_START;
    }
    if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Carousel Scheduler

Usage: node scripts/carouselScheduler.mjs [options]

Options:
  -i, --interval <min>  Interval between posts in minutes (default: 60)
  -s, --start <num>     Start from carousel number (default: 3)
  -h, --help            Show this help

Example:
  node scripts/carouselScheduler.mjs --interval 60 --start 3
      `);
      return;
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('🤖 CAROUSEL AUTO-SCHEDULER');
  console.log('═'.repeat(60));
  console.log(`   Interval: ${interval} minutes`);
  console.log(`   Starting from: carousel-${String(startFrom).padStart(2, '0')}`);
  console.log(`   Press Ctrl+C to stop`);
  console.log('═'.repeat(60) + '\n');

  const log = loadLog();
  log.schedulerStarted = new Date().toISOString();
  log.interval = interval;
  saveLog(log);

  // Get carousels to publish
  let carousels = getUnpublishedCarousels(startFrom);
  console.log(`📋 Carousels queued: ${carousels.length}`);
  carousels.forEach(c => console.log(`   - ${c}`));

  if (carousels.length === 0) {
    console.log('\n✅ No carousels to publish!');
    return;
  }

  // Publish loop
  let published = 0;

  while (carousels.length > 0) {
    const carousel = carousels.shift();

    try {
      console.log('\n' + '─'.repeat(60));
      console.log(`⏰ ${new Date().toLocaleString()}`);

      await publishCarousel(carousel);

      published++;

      // Log success
      log.runs.push({
        carouselId: carousel,
        publishedAt: new Date().toISOString(),
        success: true,
      });
      log.lastPublished = carousel;
      saveLog(log);

      // Refresh list
      carousels = getUnpublishedCarousels(startFrom);

      if (carousels.length > 0) {
        console.log(`\n⏳ Next publish in ${interval} minutes...`);
        console.log(`   Remaining: ${carousels.length} carousels`);

        // Wait for interval
        const intervalMs = interval * 60 * 1000;
        const startWait = Date.now();

        while (Date.now() - startWait < intervalMs) {
          const remaining = intervalMs - (Date.now() - startWait);
          process.stdout.write(`\r   ⏱️ Next in: ${formatTime(remaining)}    `);
          await new Promise(r => setTimeout(r, 1000));
        }
        console.log('\n');
      }
    } catch (error) {
      console.error(`\n❌ Failed to publish ${carousel}: ${error.message}`);

      log.runs.push({
        carouselId: carousel,
        attemptedAt: new Date().toISOString(),
        success: false,
        error: error.message,
      });
      saveLog(log);

      // Continue with next carousel
      console.log('   Continuing with next carousel...');
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ SCHEDULER COMPLETE');
  console.log('═'.repeat(60));
  console.log(`   Total published: ${published}`);
  console.log(`   Log saved to: ${CONFIG.LOG_FILE}`);
  console.log('═'.repeat(60) + '\n');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⛔ Scheduler stopped by user');
  process.exit(0);
});

main().catch(err => {
  console.error('❌ Scheduler error:', err.message);
  process.exit(1);
});
