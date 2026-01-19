#!/usr/bin/env node
/**
 * Direct Fusion Reel Publisher
 * Uploads directly to GitHub, then uses proxy for Instagram
 */
import fs from 'fs';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';
const PROXY_URL = 'http://localhost:3001';

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function uploadToGitHub(filePath, prefix) {
  const content = fs.readFileSync(filePath).toString('base64');
  const ext = filePath.split('.').pop();
  const filename = `${prefix}_${Date.now()}.${ext}`;
  const apiUrl = `https://api.github.com/repos/aemons9/studiov1/contents/photo/reels/${filename}`;

  log(`   Uploading: ${filename} (${Math.round(content.length/1024/1024)}MB base64)`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload: ${filename}`,
      content: content,
      branch: 'main',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub upload failed: ${response.status} - ${text.substring(0, 200)}`);
  }

  const data = await response.json();
  const rawUrl = `https://raw.githubusercontent.com/aemons9/studiov1/main/photo/reels/${filename}`;
  log(`   Done: ${rawUrl}`);
  return rawUrl;
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

  log('');
  log('═'.repeat(60));
  log('🎬 VERALABS FUSION REEL PUBLISHER');
  log('═'.repeat(60));
  log(`📹 Video: ${videoPath.split('/').pop()}`);
  log(`🖼️ Thumb: ${thumbPath.split('/').pop()}`);
  log('');

  // Step 1: Upload video
  log('📤 Step 1: Uploading video to GitHub...');
  const videoUrl = await uploadToGitHub(videoPath, `veralabs_${reelId}`);

  // Step 2: Upload thumbnail
  log('');
  log('📤 Step 2: Uploading thumbnail...');
  const coverUrl = await uploadToGitHub(thumbPath, `veralabs_${reelId}_thumb`);

  // Step 3: Wait for CDN
  log('');
  log('⏳ Step 3: Waiting for CDN propagation (3s)...');
  await new Promise(r => setTimeout(r, 3000));

  // Step 4: Publish via proxy
  log('');
  log('🚀 Step 4: Publishing to Instagram (2-5 min)...');
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
    throw new Error(`Publish failed: ${await publishRes.text()}`);
  }

  const result = await publishRes.json();
  log('');
  log('═'.repeat(60));
  log(`✅ REEL PUBLISHED SUCCESSFULLY!`);
  log('═'.repeat(60));
  log(`   📱 Media ID: ${result.id}`);
  log(`   🔗 Video: ${videoUrl}`);
  log('═'.repeat(60));
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
