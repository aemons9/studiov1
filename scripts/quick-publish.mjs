#!/usr/bin/env node
/**
 * Quick Publish Reel to Instagram with proper cover image
 * Usage: node quick-publish.mjs <videoPath> <thumbnailPath> <caption> [reelId]
 */
import fs from 'fs';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const PROXY_URL = 'http://localhost:3001';

const videoPath = process.argv[2];
const thumbnailPath = process.argv[3];
const caption = process.argv[4];
const reelId = process.argv[5] || 'reel';

if (!videoPath || !thumbnailPath || !caption) {
  console.error('Usage: node quick-publish.mjs <videoPath> <thumbnailPath> <caption> [reelId]');
  process.exit(1);
}

if (!INSTAGRAM_TOKEN) {
  console.error('Missing INSTAGRAM_TOKEN env var');
  process.exit(1);
}

console.log('📱 Publishing reel:', reelId);
console.log('   Video:', videoPath);
console.log('   Thumbnail:', thumbnailPath);

// Step 1: Upload video to GitHub
console.log('\n   Step 1: Uploading video to GitHub CDN...');
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
  throw new Error('Video upload failed: ' + await videoUploadRes.text());
}

const videoData = await videoUploadRes.json();
const videoUrl = videoData.publicUrl || videoData.url;
console.log('   ✅ Video uploaded:', videoUrl);

// Step 2: Upload thumbnail to GitHub
console.log('\n   Step 2: Uploading thumbnail to GitHub CDN...');
const thumbBuffer = fs.readFileSync(thumbnailPath);
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

if (!thumbUploadRes.ok) {
  throw new Error('Thumbnail upload failed: ' + await thumbUploadRes.text());
}

const thumbData = await thumbUploadRes.json();
const coverUrl = thumbData.publicUrl || thumbData.url;
console.log('   ✅ Thumbnail uploaded:', coverUrl);

// Wait for CDN propagation
console.log('\n   ⏳ Waiting for CDN propagation...');
await new Promise(r => setTimeout(r, 3000));

// Step 3: Publish to Instagram with cover image
console.log('\n   Step 3: Publishing to Instagram (this takes 2-5 min)...');

const publishRes = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    accessToken: INSTAGRAM_TOKEN,
    videoUrl: videoUrl,
    coverUrl: coverUrl,
    caption: caption,
    shareToFeed: true,
    instagramAccountId: INSTAGRAM_ACCOUNT_ID
  })
});

if (!publishRes.ok) {
  throw new Error('Publish failed: ' + await publishRes.text());
}

const publishData = await publishRes.json();
console.log('   ✅ Published! Media ID:', publishData.id);
console.log('\n✨ Success!');
