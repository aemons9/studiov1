#!/usr/bin/env node
/**
 * VERALABS Meta Ads Campaign Setup
 *
 * Uses Meta Marketing API to create:
 * - Campaign with Messages objective
 * - Ad Sets with targeting
 * - Ads with creative
 */

import fs from 'fs';
import path from 'path';

// Configuration
const ACCESS_TOKEN = process.env.INSTAGRAM_TOKEN;
const AD_ACCOUNT_ID = process.env.AD_ACCOUNT_ID || 'act_17841478517688462'; // Usually act_ + account ID
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const PAGE_ID = process.env.PAGE_ID; // Facebook Page ID linked to Instagram

const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';
const ADS_DIR = '/home/ecolex/version1/instagram-ads';

// Campaign configuration
const CAMPAIGN_CONFIG = {
  name: 'VERALABS_Messaging_Campaign_Jan2026',
  objective: 'OUTCOME_ENGAGEMENT', // For messages
  special_ad_categories: [],
  status: 'PAUSED', // Start paused for review
};

// Ad Set configurations
const AD_SETS = [
  {
    name: 'VERALABS_LeadGen_Exclusive_Access',
    daily_budget: 3000, // $30 in cents
    optimization_goal: 'CONVERSATIONS',
    billing_event: 'IMPRESSIONS',
    targeting: {
      age_min: 25,
      age_max: 54,
      genders: [1, 2], // All
      geo_locations: {
        countries: ['US', 'CA', 'GB', 'AU'],
      },
      interests: [
        { id: '6003384248805', name: 'Fine art photography' },
        { id: '6003397425735', name: 'Boudoir photography' },
        { id: '6003139266461', name: 'Luxury goods' },
        { id: '6003107902433', name: 'Fashion' },
        { id: '6003384285451', name: 'Art' },
      ],
      publisher_platforms: ['instagram'],
      instagram_positions: ['stream', 'story', 'reels', 'explore'],
    },
    ads: ['shadow_exclusive', 'lace_vip', 'silk_insider'],
  },
  {
    name: 'VERALABS_Engagement_Poll',
    daily_budget: 2000, // $20 in cents
    optimization_goal: 'CONVERSATIONS',
    billing_event: 'IMPRESSIONS',
    targeting: {
      age_min: 25,
      age_max: 54,
      genders: [1, 2],
      geo_locations: {
        countries: ['US', 'CA', 'GB', 'AU'],
      },
      interests: [
        { id: '6003384248805', name: 'Fine art photography' },
        { id: '6003107902433', name: 'Fashion' },
        { id: '6003384285451', name: 'Art' },
      ],
      publisher_platforms: ['instagram'],
      instagram_positions: ['stream', 'story', 'reels', 'explore'],
    },
    ads: ['which_speaks', 'art_or_fashion'],
  },
  {
    name: 'VERALABS_Conversion_LimitedDrop',
    daily_budget: 4000, // $40 in cents
    optimization_goal: 'CONVERSATIONS',
    billing_event: 'IMPRESSIONS',
    targeting: {
      age_min: 25,
      age_max: 54,
      genders: [1, 2],
      geo_locations: {
        countries: ['US', 'CA', 'GB', 'AU'],
      },
      interests: [
        { id: '6003384248805', name: 'Fine art photography' },
        { id: '6003397425735', name: 'Boudoir photography' },
        { id: '6003139266461', name: 'Luxury goods' },
      ],
      publisher_platforms: ['instagram'],
      instagram_positions: ['stream', 'story', 'reels', 'explore'],
    },
    ads: ['limited_drop', 'free_guide'],
  },
];

// Ad creative content
const AD_CREATIVES = {
  shadow_exclusive: {
    name: 'VERALABS_Ad_Shadow_Exclusive',
    primary_text: `Shadow speaks where words dare not venture.

Unlock exclusive access to the complete VERALABS collection.

✨ DM "SHADOW" for the Shadow Symphony gallery
✨ Free styling guide for first 100

Limited spots available.`,
    headline: 'Exclusive Collection Access',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_shadow_exclusive_feed.jpg',
    story_image: 'ad_shadow_exclusive_story.jpg',
  },
  lace_vip: {
    name: 'VERALABS_Ad_Lace_VIP',
    primary_text: `Geometry meets desire.

Architecture for the body. Poetry for the soul.

✨ DM "LACE" for VIP preview access
✨ Early access to newest collection

Join the inner circle.`,
    headline: 'VIP Preview Access',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_lace_vip_feed.jpg',
    story_image: 'ad_lace_vip_story.jpg',
  },
  silk_insider: {
    name: 'VERALABS_Ad_Silk_Insider',
    primary_text: `Silk confessions.

Some truths are only told in textures.

✨ DM "SILK" for insider access
✨ Join our private collector circle

Exclusive drops only.`,
    headline: 'Insider Access',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_silk_insider_feed.jpg',
    story_image: 'ad_silk_insider_story.jpg',
  },
  which_speaks: {
    name: 'VERALABS_Ad_Which_Speaks',
    primary_text: `Shadow. Lace. Silk.

Three collections. Three stories. One question:

Which speaks to YOUR soul?

Drop your answer in the DMs. We read every message.
Best answers featured in our stories ✨`,
    headline: 'Which Collection Speaks to You?',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_which_speaks_feed.jpg',
    story_image: 'ad_which_speaks_story.jpg',
  },
  art_or_fashion: {
    name: 'VERALABS_Ad_Art_Or_Fashion',
    primary_text: `Art or Fashion?

The eternal question.

Where do you draw the line?

DM your answer - best responses get featured.`,
    headline: 'Join the Debate',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_art_or_fashion_feed.jpg',
    story_image: 'ad_art_or_fashion_story.jpg',
  },
  limited_drop: {
    name: 'VERALABS_Ad_Limited_Drop',
    primary_text: `🔥 48-HOUR DROP 🔥

The Mesh Moderne collection is here.

Only 50 pieces available.
No restock planned.
Early access for DM subscribers only.

DM "DROP" now before it's gone.`,
    headline: 'Limited Drop - 48 Hours Only',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_limited_drop_feed.jpg',
    story_image: 'ad_limited_drop_story.jpg',
  },
  free_guide: {
    name: 'VERALABS_Ad_Free_Guide',
    primary_text: `STYLING SECRETS Revealed

Our complete intimate styling guide.
Normally $47 - Free today.

✨ DM "STYLE" for instant access

Limited time offer.`,
    headline: 'Free Styling Guide',
    call_to_action: 'SEND_MESSAGE',
    feed_image: 'ad_free_guide_feed.jpg',
    story_image: 'ad_free_guide_story.jpg',
  },
};

// API helper functions
async function graphApiCall(endpoint, method = 'GET', data = null) {
  const url = `${GRAPH_API_BASE}${endpoint}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST' && data) {
    options.body = JSON.stringify({
      ...data,
      access_token: ACCESS_TOKEN,
    });
  }

  const response = await fetch(
    method === 'GET' ? `${url}?access_token=${ACCESS_TOKEN}` : url,
    options
  );

  const result = await response.json();

  if (result.error) {
    throw new Error(`API Error: ${result.error.message}`);
  }

  return result;
}

// Step 1: Check permissions and account info
async function checkAccountAccess() {
  console.log('🔍 Checking account access...\n');

  try {
    // Check token permissions
    const debugToken = await fetch(
      `${GRAPH_API_BASE}/debug_token?input_token=${ACCESS_TOKEN}&access_token=${ACCESS_TOKEN}`
    ).then(r => r.json());

    console.log('   Token Info:');
    console.log(`   - App ID: ${debugToken.data?.app_id || 'N/A'}`);
    console.log(`   - Expires: ${debugToken.data?.expires_at ? new Date(debugToken.data.expires_at * 1000).toISOString() : 'Never'}`);
    console.log(`   - Scopes: ${debugToken.data?.scopes?.join(', ') || 'N/A'}`);

    // Check if we have ads_management permission
    const hasAdsPermission = debugToken.data?.scopes?.includes('ads_management');

    if (!hasAdsPermission) {
      console.log('\n   ⚠️  Missing ads_management permission');
      console.log('   You need to add this permission to create ads.');
      return { hasAdsPermission: false, debugToken };
    }

    console.log('\n   ✅ Has ads_management permission');

    // Get ad accounts
    const adAccounts = await fetch(
      `${GRAPH_API_BASE}/me/adaccounts?access_token=${ACCESS_TOKEN}&fields=id,name,account_status`
    ).then(r => r.json());

    console.log('\n   Ad Accounts:');
    if (adAccounts.data?.length > 0) {
      adAccounts.data.forEach(acc => {
        console.log(`   - ${acc.id}: ${acc.name} (Status: ${acc.account_status})`);
      });
    } else {
      console.log('   - No ad accounts found');
    }

    return { hasAdsPermission: true, adAccounts: adAccounts.data, debugToken };

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { error: error.message };
  }
}

// Step 2: Upload ad images
async function uploadAdImage(adAccountId, imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const formData = new URLSearchParams();
  formData.append('bytes', base64Image);
  formData.append('access_token', ACCESS_TOKEN);

  const response = await fetch(`${GRAPH_API_BASE}/${adAccountId}/adimages`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`Image upload failed: ${result.error.message}`);
  }

  // Return the image hash
  const imageKey = Object.keys(result.images)[0];
  return result.images[imageKey].hash;
}

// Step 3: Create campaign
async function createCampaign(adAccountId) {
  console.log('\n📢 Creating campaign...');

  const response = await fetch(`${GRAPH_API_BASE}/${adAccountId}/campaigns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...CAMPAIGN_CONFIG,
      access_token: ACCESS_TOKEN,
    }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`Campaign creation failed: ${result.error.message}`);
  }

  console.log(`   ✅ Campaign created: ${result.id}`);
  return result.id;
}

// Step 4: Create ad set
async function createAdSet(adAccountId, campaignId, adSetConfig) {
  console.log(`\n📋 Creating ad set: ${adSetConfig.name}`);

  const response = await fetch(`${GRAPH_API_BASE}/${adAccountId}/adsets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: adSetConfig.name,
      campaign_id: campaignId,
      daily_budget: adSetConfig.daily_budget,
      optimization_goal: adSetConfig.optimization_goal,
      billing_event: adSetConfig.billing_event,
      targeting: JSON.stringify(adSetConfig.targeting),
      status: 'PAUSED',
      destination_type: 'INSTAGRAM_DIRECT',
      access_token: ACCESS_TOKEN,
    }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`Ad set creation failed: ${result.error.message}`);
  }

  console.log(`   ✅ Ad set created: ${result.id}`);
  return result.id;
}

// Step 5: Create ad creative
async function createAdCreative(adAccountId, creative, imageHash, pageId, instagramAccountId) {
  console.log(`   🎨 Creating creative: ${creative.name}`);

  const objectStorySpec = {
    instagram_actor_id: instagramAccountId,
    link_data: {
      message: creative.primary_text,
      name: creative.headline,
      call_to_action: {
        type: creative.call_to_action,
      },
      image_hash: imageHash,
    },
  };

  const response = await fetch(`${GRAPH_API_BASE}/${adAccountId}/adcreatives`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: creative.name,
      object_story_spec: JSON.stringify(objectStorySpec),
      access_token: ACCESS_TOKEN,
    }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`Creative creation failed: ${result.error.message}`);
  }

  return result.id;
}

// Step 6: Create ad
async function createAd(adAccountId, adSetId, creativeId, adName) {
  console.log(`   📢 Creating ad: ${adName}`);

  const response = await fetch(`${GRAPH_API_BASE}/${adAccountId}/ads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: adName,
      adset_id: adSetId,
      creative: JSON.stringify({ creative_id: creativeId }),
      status: 'PAUSED',
      access_token: ACCESS_TOKEN,
    }),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(`Ad creation failed: ${result.error.message}`);
  }

  console.log(`   ✅ Ad created: ${result.id}`);
  return result.id;
}

// Main execution
async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   V E R A L A B S                                          ║
║   Meta Ads Campaign Setup                                  ║
║                                                            ║
║   Creating:                                                ║
║   • 1 Campaign (Messages objective)                        ║
║   • 3 Ad Sets (Lead Gen, Engagement, Conversion)           ║
║   • 7 Ads with branded creatives                           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  if (!ACCESS_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    console.log('\nUsage:');
    console.log('  INSTAGRAM_TOKEN="your_token" AD_ACCOUNT_ID="act_123" node scripts/setup-meta-ads-campaign.mjs');
    process.exit(1);
  }

  // Check account access first
  const accessCheck = await checkAccountAccess();

  if (accessCheck.error) {
    console.log('\n❌ Cannot proceed - account access check failed');
    process.exit(1);
  }

  if (!accessCheck.hasAdsPermission) {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ⚠️  ADS PERMISSION REQUIRED                              ║
║                                                            ║
║   Your token needs the 'ads_management' permission.        ║
║                                                            ║
║   To add this permission:                                  ║
║   1. Go to developers.facebook.com                         ║
║   2. Select your app                                       ║
║   3. Add 'Marketing API' product                           ║
║   4. Request 'ads_management' permission                   ║
║   5. Generate new access token                             ║
║                                                            ║
║   Alternative: Use Meta Ads Manager UI                     ║
║   See: META_ADS_SETUP_GUIDE.md                             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

    // Still output useful info
    console.log('\n📁 Ad creatives are ready at:');
    console.log(`   ${ADS_DIR}/`);
    console.log('\n📋 Setup guide created at:');
    console.log('   scripts/META_ADS_SETUP_GUIDE.md');

    process.exit(0);
  }

  // Get ad account ID
  let adAccountId = AD_ACCOUNT_ID;
  if (accessCheck.adAccounts?.length > 0) {
    adAccountId = accessCheck.adAccounts[0].id;
    console.log(`\n   Using ad account: ${adAccountId}`);
  }

  try {
    // Create campaign
    const campaignId = await createCampaign(adAccountId);

    // Process each ad set
    for (const adSetConfig of AD_SETS) {
      const adSetId = await createAdSet(adAccountId, campaignId, adSetConfig);

      // Create ads for this ad set
      for (const adKey of adSetConfig.ads) {
        const creative = AD_CREATIVES[adKey];

        // Upload image
        console.log(`   📤 Uploading image: ${creative.feed_image}`);
        const imagePath = path.join(ADS_DIR, creative.feed_image);
        const imageHash = await uploadAdImage(adAccountId, imagePath);

        // Create creative
        const creativeId = await createAdCreative(
          adAccountId,
          creative,
          imageHash,
          PAGE_ID,
          INSTAGRAM_ACCOUNT_ID
        );

        // Create ad
        await createAd(adAccountId, adSetId, creativeId, creative.name);
      }
    }

    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✅ CAMPAIGN CREATED SUCCESSFULLY!                        ║
║                                                            ║
║   Campaign ID: ${campaignId.padEnd(37)}║
║                                                            ║
║   Status: PAUSED (Review before activating)                ║
║                                                            ║
║   Next Steps:                                              ║
║   1. Go to Meta Ads Manager                                ║
║   2. Review campaign settings                              ║
║   3. Set up automated responses                            ║
║   4. Activate when ready                                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.log('\n📋 Manual setup guide available at:');
    console.log('   scripts/META_ADS_SETUP_GUIDE.md');
  }
}

main().catch(console.error);
