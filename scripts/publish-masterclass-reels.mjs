#!/usr/bin/env node
/**
 * VERALABS Masterclass Reels Publisher
 * Publishes branded reels to Instagram
 */

import fs from 'fs';
import path from 'path';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const IG_ACCOUNT_ID = '17841478517688462';
const GRAPH_API = 'https://graph.facebook.com/v21.0';
const PROXY_URL = 'http://localhost:3001';
const REELS_DIR = '/home/ecolex/version1/instagram-masterclass-reels';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function uploadToGitHub(filePath, filename) {
  const buffer = fs.readFileSync(filePath);
  const base64 = buffer.toString('base64');

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64,
      filename: `masterclass_reel_${filename}_${Date.now()}.mp4`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/masterclass-reels'
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub upload failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.publicUrl || data.url;
}

async function waitForContainer(containerId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5000);

    const url = `${GRAPH_API}/${containerId}?fields=status,status_code&access_token=${INSTAGRAM_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    const status = (data.status || '').toUpperCase();

    if (status === 'FINISHED' || status.includes('FINISHED')) {
      return true;
    }

    if (status === 'ERROR' || status.includes('ERROR')) {
      throw new Error(`Container error: ${data.status_code || status}`);
    }

    process.stdout.write('.');
  }

  throw new Error('Timeout waiting for container');
}

async function publishReel(videoUrl, thumbUrl, caption) {
  log('   📦 Creating reel container...');

  // Create reel container
  const params = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: INSTAGRAM_TOKEN
  });

  // Add cover URL if available
  if (thumbUrl) {
    params.append('cover_url', thumbUrl);
  }

  const response = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Reel container creation failed');
  }

  const containerId = data.id;
  log(`   📦 Container ID: ${containerId}`);

  // Wait for processing
  process.stdout.write('   ⏳ Processing reel');
  await waitForContainer(containerId);
  console.log(' Done');

  // Publish
  log('   🚀 Publishing...');
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: INSTAGRAM_TOKEN
  });

  const publishResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    throw new Error(publishData.error?.message || 'Publish failed');
  }

  return publishData.id;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║           🎬 MASTERCLASS REELS INSTAGRAM PUBLISHER 🎬                    ║
║                                                                          ║
║     Publishing 3 Branded Reels • Original Music • Signature Style        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ Missing INSTAGRAM_TOKEN');
    process.exit(1);
  }

  // Load manifest
  const manifestPath = path.join(REELS_DIR, 'reels-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ Manifest not found. Run create-masterclass-reels.mjs first.');
    process.exit(1);
  }

  const reels = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const args = process.argv.slice(2);
  const specificReel = args[0];

  const reelsToPublish = specificReel
    ? reels.filter(r => r.id === specificReel)
    : reels;

  if (reelsToPublish.length === 0) {
    console.error(`❌ Reel not found: ${specificReel}`);
    console.log('Available reels:', reels.map(r => r.id).join(', '));
    process.exit(1);
  }

  const results = [];

  for (const reel of reelsToPublish) {
    console.log(`\n${'═'.repeat(70)}`);
    log(`🎬 PUBLISHING: ${reel.name}`);
    console.log(`${'═'.repeat(70)}`);

    if (!fs.existsSync(reel.path)) {
      log(`   ❌ Video not found: ${reel.path}`);
      continue;
    }

    try {
      // Upload video to GitHub CDN
      log('   📤 Uploading video to GitHub CDN...');
      const videoUrl = await uploadToGitHub(reel.path, reel.id);
      log(`   ✅ Video uploaded`);

      // Upload thumbnail if exists
      let thumbUrl = null;
      if (reel.thumb && fs.existsSync(reel.thumb)) {
        log('   📤 Uploading thumbnail...');
        thumbUrl = await uploadToGitHub(reel.thumb, `${reel.id}_thumb`);
        log(`   ✅ Thumbnail uploaded`);
      }

      // Wait for CDN propagation
      log('   ⏳ Waiting for CDN propagation (10s)...');
      await sleep(10000);

      // Publish reel
      const mediaId = await publishReel(videoUrl, thumbUrl, reel.caption);
      log(`   ✅ PUBLISHED! Media ID: ${mediaId}`);
      results.push({ reel: reel.name, mediaId, status: 'success' });

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({ reel: reel.name, error: err.message, status: 'failed' });
    }

    // Wait between reels to avoid rate limits
    if (reelsToPublish.indexOf(reel) < reelsToPublish.length - 1) {
      log('   ⏳ Waiting 60s before next reel...');
      await sleep(60000);
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    PUBLISHING COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  for (const r of results) {
    if (r.status === 'success') {
      console.log(`  ✅ ${r.reel}: ${r.mediaId}`);
    } else {
      console.log(`  ❌ ${r.reel}: ${r.error}`);
    }
  }

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
