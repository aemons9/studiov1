#!/usr/bin/env node
/**
 * Publish VERALABS Reels to Instagram
 * Uploads to GitHub CDN and publishes via Instagram Graph API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
  console.log('✅ Loaded credentials from .env.local\n');
}

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const PROXY_URL = 'http://localhost:3001';

if (!INSTAGRAM_TOKEN || !GITHUB_TOKEN) {
  console.error('❌ Missing credentials! Please check .env.local file.');
  process.exit(1);
}

const METADATA_PATH = process.argv[2] || '/home/ecolex/version1/generated-reels/reels_metadata_1767587709037.json';

console.log('📱 VERALABS Instagram Reels Publisher\n');
console.log('======================================\n');

// Read metadata
const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'));
console.log(`Found ${metadata.reels.length} reels to publish\n`);

// Publish function
async function publishReelToInstagram(reel, index) {
  console.log(`\n[${index + 1}] Publishing: ${reel.id}`);
  console.log(`   Theme: ${reel.theme}`);
  console.log(`   Size: ${(reel.size / 1024 / 1024).toFixed(2)} MB\n`);

  try {
    // Step 1: Upload video to GitHub CDN
    console.log('   Step 1: Uploading to GitHub CDN...');
    const videoBuffer = fs.readFileSync(reel.videoPath);
    const videoBase64 = videoBuffer.toString('base64');
    // Use unique filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const originalExt = path.extname(reel.videoPath);
    const filename = `veralabs_reel_${reel.id}_${timestamp}${originalExt}`;

    const uploadResponse = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        githubToken: GITHUB_TOKEN,
        imageData: videoBase64,
        filename: filename,
        owner: GITHUB_USER,
        repo: GITHUB_REPO,
        pathPrefix: 'photo/reels'
      })
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      throw new Error(`GitHub upload failed: ${error}`);
    }

    const uploadData = await uploadResponse.json();
    const videoUrl = uploadData.publicUrl || uploadData.url || uploadData.download_url;

    if (!videoUrl) {
      console.log('Upload response:', JSON.stringify(uploadData, null, 2));
      throw new Error('No video URL in GitHub upload response');
    }

    console.log(`      ✅ Video uploaded: ${videoUrl}\n`);

    // Step 2: Publish Reel using dedicated endpoint (handles container creation, polling, and publishing)
    console.log('   Step 2: Publishing Reel to Instagram (this may take 2-5 minutes)...');
    const publishResponse = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: INSTAGRAM_TOKEN,
        videoUrl: videoUrl,
        caption: reel.caption.text,
        shareToFeed: true,
        instagramAccountId: INSTAGRAM_ACCOUNT_ID
      })
    });

    if (!publishResponse.ok) {
      const error = await publishResponse.text();
      throw new Error(`Publish failed: ${error}`);
    }

    const publishData = await publishResponse.json();
    console.log(`      ✅ Published! Media ID: ${publishData.id}\n`);

    return {
      success: true,
      reelId: reel.id,
      mediaId: publishData.id,
      videoUrl: videoUrl
    };

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    return {
      success: false,
      reelId: reel.id,
      error: error.message
    };
  }
}

// Publish first 2 reels
const results = [];
const reelsToPublish = metadata.reels.slice(0, 2);

for (let i = 0; i < reelsToPublish.length; i++) {
  const result = await publishReelToInstagram(reelsToPublish[i], i);
  results.push(result);

  // Wait between publishes to avoid rate limits
  if (i < reelsToPublish.length - 1) {
    console.log('⏳ Waiting 30 seconds before next publish...\n');
    await new Promise(r => setTimeout(r, 30000));
  }
}

// Summary
console.log('\n\n📊 PUBLISHING SUMMARY\n');
console.log('=====================\n');

const successful = results.filter(r => r.success);
const failed = results.filter(r => !r.success);

console.log(`✅ Successfully published: ${successful.length}`);
console.log(`❌ Failed: ${failed.length}\n`);

if (successful.length > 0) {
  console.log('Published reels:');
  successful.forEach(r => {
    console.log(`  - ${r.reelId} → Media ID: ${r.mediaId}`);
  });
}

if (failed.length > 0) {
  console.log('\nFailed reels:');
  failed.forEach(r => {
    console.log(`  - ${r.reelId}: ${r.error}`);
  });
}

console.log('\n\n📅 SCHEDULING INFO\n');
console.log('==================\n');
console.log(`Remaining reels to schedule: ${metadata.reels.length - 2}`);
console.log('\nRecommended posting schedule (for maximum reach):');
console.log('  - Best times: 11 AM - 2 PM, 7 PM - 9 PM (local time)');
console.log('  - Best days: Tuesday, Wednesday, Thursday');
console.log('  - Post frequency: 1-2 reels per day, spaced 4-6 hours apart\n');

if (metadata.reels.length > 2) {
  console.log('Remaining reel:');
  metadata.reels.slice(2).forEach((reel, idx) => {
    console.log(`  ${idx + 1}. ${reel.id} - ${reel.theme}`);
    console.log(`     Caption: ${reel.caption.hook}`);
  });
}

console.log('\n✨ Publishing complete!\n');
