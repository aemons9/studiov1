#!/usr/bin/env node
/**
 * Publish Reel via Proxy Server
 */
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';

// Get GitHub token from gh CLI
import { execSync } from 'child_process';

function getGitHubToken() {
  try {
    // Try gh CLI first
    const token = execSync('gh auth token 2>/dev/null').toString().trim();
    if (token && token.startsWith('gho_')) {
      // OAuth token - might not have repo scope, try PAT from env
      console.log('   Note: gh CLI has OAuth token, checking env for PAT...');
    }
  } catch (e) {}

  // Use environment variable
  return process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN || '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';
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function main() {
  const videoPath = '/home/ecolex/version1/generated-reels/neon-chiaroscuro-fusion/fusion_cyberpunk_noir_fusion_1767734932305.mp4';
  const thumbPath = '/home/ecolex/version1/generated-reels/neon-chiaroscuro-fusion/fusion_cyberpunk_noir_fusion_1767734932305_thumb.jpg';
  const caption = `Electric shadows dance on skin 💙⚡

Where neon meets noir. Where future meets forbidden. The city breathes blue light into intimate spaces.

Cyberpunk dreams made flesh.

Electric Shadows | VERALABS Fusion

#VERALABS #CyberpunkAesthetic #NeonNoir #ElectricBlue #IntimateArt #FuturisticBoudoir #NeonLights #DarkAesthetic #SensualArt #UrbanIntimate #BlueNeon #CyberBeauty #NightVibes #ArtisticPhotography #MuseumQuality`;
  const reelId = 'cyberpunk_noir_fusion';

  log(`\n${'═'.repeat(60)}`);
  log(`🎬 PUBLISHING VIA PROXY SERVER`);
  log(`${'═'.repeat(60)}\n`);
  log(`📹 Video: ${path.basename(videoPath)}`);
  log(`🖼️  Thumbnail: ${path.basename(thumbPath)}`);

  const GITHUB_TOKEN = getGitHubToken();
  log(`🔑 Using GitHub token: ${GITHUB_TOKEN.slice(0, 10)}...`);

  // Step 1: Upload video to GitHub via proxy
  log('\n📤 Step 1: Uploading video to GitHub...');
  const videoBuffer = fs.readFileSync(videoPath);
  const videoBase64 = videoBuffer.toString('base64');
  const videoFilename = `veralabs_${reelId}_${Date.now()}.mp4`;

  const videoUploadRes = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: videoBase64,
      filename: videoFilename,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/reels'
    })
  });

  if (!videoUploadRes.ok) {
    const error = await videoUploadRes.text();
    console.error('❌ Video upload failed:', error);
    process.exit(1);
  }

  const videoData = await videoUploadRes.json();
  const videoUrl = videoData.publicUrl || videoData.url;
  log(`   ✅ Video uploaded: ${videoUrl}`);

  // Step 2: Upload thumbnail to GitHub via proxy
  log('\n📤 Step 2: Uploading thumbnail...');
  const thumbBuffer = fs.readFileSync(thumbPath);
  const thumbBase64 = thumbBuffer.toString('base64');
  const thumbFilename = `veralabs_${reelId}_thumb_${Date.now()}.jpg`;

  const thumbUploadRes = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: thumbBase64,
      filename: thumbFilename,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/reels'
    })
  });

  const thumbData = await thumbUploadRes.json();
  const coverUrl = thumbData.publicUrl || thumbData.url;
  log(`   ✅ Thumbnail uploaded: ${coverUrl}`);

  // Step 3: Wait for CDN propagation
  log('\n⏳ Step 3: Waiting for CDN (3s)...');
  await new Promise(r => setTimeout(r, 3000));

  // Step 4: Publish reel via proxy
  log('\n🚀 Step 4: Publishing to Instagram (2-5 min)...');
  const publishRes = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      videoUrl: videoUrl,
      caption: caption,
      coverUrl: coverUrl,
      shareToFeed: true,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID
    })
  });

  if (!publishRes.ok) {
    const error = await publishRes.text();
    console.error('❌ Publish failed:', error);
    process.exit(1);
  }

  const publishData = await publishRes.json();
  log(`\n${'═'.repeat(60)}`);
  log(`✅ REEL PUBLISHED SUCCESSFULLY!`);
  log(`${'═'.repeat(60)}`);
  log(`   📱 Media ID: ${publishData.id}`);
  log(`   🔗 Video URL: ${videoUrl}`);
  log(`${'═'.repeat(60)}\n`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
