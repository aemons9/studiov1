#!/usr/bin/env node
/**
 * Wait for Instagram API rate limit to reset, then publish one test reel
 */

import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462';
const GITHUB_USER = process.env.GITHUB_USER || 'aemons9';
const GITHUB_REPO = process.env.GITHUB_REPO || 'studiov1';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PROXY_URL = 'http://localhost:3001';

const REEL_PATH = '/home/ecolex/version1/generated-reels/reel_combo_1_1767587476430.mp4';
const CAPTION = `The art of light and shadow 🌓

Where fine art meets intimate expression. Every frame tells a story of confidence, beauty, and artistic vision.

Tap ❤️ if this speaks to you

#BoudoirPhotography #FineArtNude #ArtisticNude #BoudoirArt #SensualArt #FemininePower #BodyPositive #ArtisticPhotography #BoudoirInspiration #WomenEmpowerment #IntimatePortrait #FineArtPhotography #NudeArtPhotography #ArtisticExpression #ConfidenceIsSexy #SelfLove #FemaleForm #BoudoirShoot #ArtPhotography #VERALABS`;

async function checkRateLimit() {
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${INSTAGRAM_TOKEN}`);
    const data = await res.json();

    if (data.error && data.error.code === 4) {
      return false; // Still rate limited
    }
    return true; // Rate limit reset
  } catch (error) {
    console.error(`Error checking rate limit: ${error.message}`);
    return false;
  }
}

async function publishReel() {
  console.log('\n📹 Publishing reel to Instagram...\n');

  try {
    // Step 1: Upload to GitHub
    console.log('Step 1: Uploading to GitHub CDN...');
    const videoBuffer = readFileSync(REEL_PATH);
    const videoBase64 = videoBuffer.toString('base64');

    const timestamp = Date.now();
    const filename = `veralabs_test_reel_${timestamp}.mp4`;

    const uploadRes = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        githubToken: GITHUB_TOKEN,
        imageData: videoBase64,
        filename,
        owner: GITHUB_USER,
        repo: GITHUB_REPO,
        pathPrefix: 'photo/reels'
      })
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      throw new Error(`GitHub upload failed: ${errorText}`);
    }

    const uploadData = await uploadRes.json();
    const videoUrl = uploadData.publicUrl;
    console.log(`   ✅ Uploaded: ${videoUrl}\n`);

    // Step 2: Publish to Instagram
    console.log('Step 2: Publishing to Instagram...');
    console.log('   ⏳ This may take 2-6 minutes for Instagram to process the video...\n');

    const publishRes = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: INSTAGRAM_TOKEN,
        videoUrl,
        caption: CAPTION,
        shareToFeed: true,
        instagramAccountId: INSTAGRAM_ACCOUNT_ID
      })
    });

    if (!publishRes.ok) {
      const errorText = await publishRes.text();
      throw new Error(`Instagram publish failed: ${errorText}`);
    }

    const publishData = await publishRes.json();
    console.log('\n✅ SUCCESS! Reel published to Instagram!\n');
    console.log(`📱 Instagram Post ID: ${publishData.id}`);
    console.log(`🎉 Check your Instagram account for the new reel!\n`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

// Main execution
(async () => {
  console.log('🕐 Waiting for Instagram API rate limit to reset...\n');
  console.log('Checking every 2 minutes...\n');

  let attempts = 0;
  const maxAttempts = 30; // Check for up to 1 hour

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`[${new Date().toLocaleTimeString()}] Check ${attempts}/${maxAttempts}...`);

    const isReady = await checkRateLimit();

    if (isReady) {
      console.log('\n✅ Rate limit has reset! Starting publish...\n');
      await publishReel();
      process.exit(0);
    }

    if (attempts < maxAttempts) {
      console.log('   Still rate limited. Waiting 2 minutes...\n');
      await new Promise(r => setTimeout(r, 120000)); // Wait 2 minutes
    }
  }

  console.log('\n⏱️  Rate limit did not reset within 1 hour. Please try again later.\n');
  process.exit(1);
})();
