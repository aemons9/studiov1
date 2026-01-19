#!/usr/bin/env node
import fs from 'fs';

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';
const PROXY_URL = 'http://localhost:3001';

async function publishReel(videoPath, thumbPath, caption, reelId) {
  console.log('📱 Publishing reel: ' + reelId);
  console.log('   Video: ' + videoPath);

  // Read video file
  const videoBuffer = fs.readFileSync(videoPath);
  const videoBase64 = videoBuffer.toString('base64');
  const filename = 'veralabs_' + reelId + '_' + Date.now() + '.mp4';

  console.log('   Step 1: Uploading video to GitHub CDN...');

  // Upload video to GitHub
  const uploadRes = await fetch(PROXY_URL + '/api/instagram/upload-to-github', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: videoBase64,
      filename: filename,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/reels'
    })
  });

  if (!uploadRes.ok) {
    throw new Error('GitHub upload failed: ' + await uploadRes.text());
  }

  const uploadData = await uploadRes.json();
  const videoUrl = uploadData.publicUrl || uploadData.url;
  console.log('   ✅ Video uploaded: ' + videoUrl);

  // Upload thumbnail
  console.log('   Step 2: Uploading thumbnail...');
  const thumbBuffer = fs.readFileSync(thumbPath);
  const thumbBase64 = thumbBuffer.toString('base64');
  const thumbFilename = 'veralabs_' + reelId + '_thumb_' + Date.now() + '.jpg';

  const thumbRes = await fetch(PROXY_URL + '/api/instagram/upload-to-github', {
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

  const thumbData = await thumbRes.json();
  const coverUrl = thumbData.publicUrl || thumbData.url;
  console.log('   ✅ Thumbnail uploaded: ' + coverUrl);

  // Wait for CDN
  console.log('   Step 3: Waiting for CDN propagation (3s)...');
  await new Promise(r => setTimeout(r, 3000));

  console.log('   Step 4: Publishing to Instagram (this takes 2-5 min)...');

  // Publish reel
  const publishRes = await fetch(PROXY_URL + '/api/instagram/publish-reel', {
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
    throw new Error('Publish failed: ' + await publishRes.text());
  }

  const publishData = await publishRes.json();
  console.log('   ✅ Published! Media ID: ' + publishData.id);
  return publishData;
}

const caption = `Electric shadows dance on skin 💙⚡

Where neon meets noir. Where future meets forbidden. The city breathes blue light into intimate spaces.

Cyberpunk dreams made flesh.

Electric Shadows | VERALABS Fusion

#VERALABS #CyberpunkAesthetic #NeonNoir #ElectricBlue #IntimateArt #FuturisticBoudoir #NeonLights #DarkAesthetic #SensualArt #UrbanIntimate #BlueNeon #CyberBeauty #NightVibes #ArtisticPhotography #MuseumQuality`;

publishReel(
  '/home/ecolex/version1/generated-reels/neon-chiaroscuro-fusion/fusion_cyberpunk_noir_fusion_1767734932305.mp4',
  '/home/ecolex/version1/generated-reels/neon-chiaroscuro-fusion/fusion_cyberpunk_noir_fusion_1767734932305_thumb.jpg',
  caption,
  'cyberpunk_noir_fusion'
).then(result => {
  console.log('\n✅ SUCCESS! Media ID: ' + result.id);
}).catch(err => {
  console.error('\n❌ ERROR: ' + err.message);
});
