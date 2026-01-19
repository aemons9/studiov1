#!/usr/bin/env node
/**
 * VERALABS Instagram Messaging Ads Creator
 *
 * Creates high-impact messaging ads optimized for:
 * - DM lead generation
 * - Engagement maximization
 * - Brand awareness
 *
 * Ad Formats:
 * - Feed Ads (1:1 - 1080x1080)
 * - Story/Reel Ads (9:16 - 1080x1920)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Brand Colors
const COLORS = {
  gold: '#c9a962',
  goldLight: '#d4b978',
  cream: '#f5f0e8',
  black: '#0a0a0a',
  charcoal: '#1a1a1a',
  rose: '#E8B4B8',
  white: '#ffffff',
};

const SOURCE_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/generated-vera-variants';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-ads';

// Messaging Ad Configurations
const MESSAGING_ADS = {
  // LEAD GENERATION ADS - DM keyword triggers
  lead_gen: [
    {
      id: 'shadow_exclusive',
      image: 'vera_godmode_recline_abandon_1767888908992.png',
      collection: 'SHADOW SYMPHONY',
      headline: 'EXCLUSIVE ACCESS',
      subhead: 'Behind the Shadows',
      body: 'Unlock the full Shadow Symphony collection',
      cta: 'DM "SHADOW" for access',
      ctaButton: 'SEND MESSAGE',
      hook: 'Limited to first 100',
    },
    {
      id: 'lace_vip',
      image: 'vera_sculptural_lace_1767888493536.png',
      collection: 'LACE POETRY',
      headline: 'VIP PREVIEW',
      subhead: 'Geometry of Desire',
      body: 'Get early access to our newest collection',
      cta: 'DM "LACE" to join',
      ctaButton: 'MESSAGE US',
      hook: 'Free styling guide included',
    },
    {
      id: 'silk_insider',
      image: 'vera_silk_intimacy_1767888208820.png',
      collection: 'MESH AND SILK',
      headline: 'INSIDER ACCESS',
      subhead: 'Silk Confessions',
      body: 'Join our private collector circle',
      cta: 'DM "SILK" to enter',
      ctaButton: 'START CHAT',
      hook: 'Exclusive drops only',
    },
  ],

  // ENGAGEMENT ADS - Questions and polls
  engagement: [
    {
      id: 'which_speaks',
      image: 'vera_godmode_sprawl_divine_1767888969527.png',
      collection: 'VERALABS',
      headline: 'WHICH SPEAKS',
      subhead: 'to your soul?',
      body: 'Shadow, Lace, or Silk?',
      cta: 'Tell us in DMs',
      ctaButton: 'SHARE YOUR PICK',
      hook: 'We want to hear from you',
    },
    {
      id: 'art_or_fashion',
      image: 'vera_lace_renaissance_1767888233122.png',
      collection: 'FINE ART',
      headline: 'ART OR FASHION?',
      subhead: 'The eternal question',
      body: 'Where do you draw the line?',
      cta: 'DM your answer',
      ctaButton: 'JOIN THE DEBATE',
      hook: 'Best answers featured',
    },
  ],

  // BRAND STORY ADS - Emotional connection
  brand_story: [
    {
      id: 'shadow_speaks',
      image: 'vera_godmode_floor_intimate_1767889332364.png',
      collection: 'SHADOW SYMPHONY',
      headline: 'SHADOW',
      subhead: 'speaks',
      body: 'Where words dare not venture',
      cta: 'Discover the story',
      ctaButton: 'LEARN MORE',
      hook: 'Light sculpts. Darkness embraces.',
    },
    {
      id: 'poetry_in_lace',
      image: 'vera_chantilly_dream_1767888280802.png',
      collection: 'LACE POETRY',
      headline: 'POETRY',
      subhead: 'in lace',
      body: 'Architecture for the body',
      cta: 'Experience the collection',
      ctaButton: 'SEE MORE',
      hook: 'Mathematics of attraction',
    },
  ],

  // CONVERSION ADS - Strong CTAs
  conversion: [
    {
      id: 'limited_drop',
      image: 'vera_mesh_moderne_1767888257912.png',
      collection: 'LIMITED DROP',
      headline: 'DROPPING NOW',
      subhead: '48 Hours Only',
      body: 'Mesh Moderne Collection',
      cta: 'DM "DROP" for early access',
      ctaButton: 'GET ACCESS',
      hook: 'Only 50 pieces available',
    },
    {
      id: 'free_guide',
      image: 'vera_satin_noir_1767888303700.png',
      collection: 'FREE GUIDE',
      headline: 'STYLING SECRETS',
      subhead: 'Revealed',
      body: 'Our complete intimate styling guide',
      cta: 'DM "STYLE" for free PDF',
      ctaButton: 'GET FREE GUIDE',
      hook: 'Normally $47 - Free today',
    },
  ],
};

// Create Feed Ad SVG (1:1 - 1080x1080)
function createFeedAdOverlay(config) {
  const { collection, headline, subhead, body, cta, ctaButton, hook } = config;

  return `
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dramatic gradient overlay -->
    <linearGradient id="adGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.black};stop-opacity:0.3" />
      <stop offset="30%" style="stop-color:${COLORS.black};stop-opacity:0.1" />
      <stop offset="60%" style="stop-color:${COLORS.black};stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:${COLORS.black};stop-opacity:0.95" />
    </linearGradient>

    <!-- Gold gradient for CTA -->
    <linearGradient id="ctaGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.gold}" />
      <stop offset="50%" style="stop-color:${COLORS.goldLight}" />
      <stop offset="100%" style="stop-color:${COLORS.gold}" />
    </linearGradient>

    <!-- Glow effect -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Full gradient overlay -->
  <rect width="1080" height="1080" fill="url(#adGradient)" />

  <!-- Corner accents -->
  <path d="M30 30 L30 100 M30 30 L100 30" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.7" />
  <path d="M1050 30 L1050 100 M1050 30 L980 30" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.7" />
  <path d="M30 1050 L30 980 M30 1050 L100 1050" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.7" />
  <path d="M1050 1050 L1050 980 M1050 1050 L980 1050" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.7" />

  <!-- Top: Collection label -->
  <text x="540" y="70"
        font-family="Montserrat, Arial, sans-serif"
        font-size="13"
        font-weight="300"
        letter-spacing="8"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${collection}
  </text>

  <!-- Decorative line under collection -->
  <line x1="440" y1="90" x2="640" y2="90" stroke="${COLORS.gold}" stroke-width="1" opacity="0.5" />

  <!-- Hook text (top area) -->
  <text x="540" y="200"
        font-family="Montserrat, Arial, sans-serif"
        font-size="14"
        font-weight="400"
        letter-spacing="4"
        fill="${COLORS.cream}"
        opacity="0.8"
        text-anchor="middle">
    ${hook.toUpperCase()}
  </text>

  <!-- Main headline -->
  <text x="540" y="750"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="72"
        font-weight="400"
        fill="${COLORS.cream}"
        text-anchor="middle"
        filter="url(#glow)">
    ${headline}
  </text>

  <!-- Subhead in gold -->
  <text x="540" y="820"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="48"
        font-style="italic"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${subhead}
  </text>

  <!-- Body text -->
  <text x="540" y="880"
        font-family="Montserrat, Arial, sans-serif"
        font-size="18"
        font-weight="300"
        fill="${COLORS.cream}"
        opacity="0.9"
        text-anchor="middle">
    ${body}
  </text>

  <!-- CTA Box -->
  <rect x="290" y="920" width="500" height="60" rx="4" fill="url(#ctaGold)" />
  <text x="540" y="960"
        font-family="Montserrat, Arial, sans-serif"
        font-size="16"
        font-weight="600"
        letter-spacing="3"
        fill="${COLORS.black}"
        text-anchor="middle">
    ${ctaButton}
  </text>

  <!-- CTA instruction -->
  <text x="540" y="1020"
        font-family="Montserrat, Arial, sans-serif"
        font-size="14"
        font-weight="400"
        letter-spacing="2"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${cta}
  </text>

  <!-- Brand mark -->
  <text x="540" y="1060"
        font-family="Montserrat, Arial, sans-serif"
        font-size="11"
        font-weight="300"
        letter-spacing="6"
        fill="${COLORS.gold}"
        opacity="0.7"
        text-anchor="middle">
    VERALABS
  </text>
</svg>`;
}

// Create Story/Reel Ad SVG (9:16 - 1080x1920)
function createStoryAdOverlay(config) {
  const { collection, headline, subhead, body, cta, ctaButton, hook } = config;

  return `
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Story gradient - more dramatic -->
    <linearGradient id="storyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.black};stop-opacity:0.5" />
      <stop offset="20%" style="stop-color:${COLORS.black};stop-opacity:0.1" />
      <stop offset="50%" style="stop-color:${COLORS.black};stop-opacity:0" />
      <stop offset="75%" style="stop-color:${COLORS.black};stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:${COLORS.black};stop-opacity:0.98" />
    </linearGradient>

    <!-- CTA gradient -->
    <linearGradient id="storyCtaGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.gold}" />
      <stop offset="50%" style="stop-color:${COLORS.goldLight}" />
      <stop offset="100%" style="stop-color:${COLORS.gold}" />
    </linearGradient>

    <!-- Glow -->
    <filter id="storyGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Full gradient -->
  <rect width="1080" height="1920" fill="url(#storyGrad)" />

  <!-- Elegant frame -->
  <rect x="40" y="120" width="1000" height="1680" fill="none" stroke="${COLORS.gold}" stroke-width="1" opacity="0.4" />

  <!-- Corner flourishes -->
  <path d="M60 140 L60 240 M60 140 L160 140" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M1020 140 L1020 240 M1020 140 L920 140" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M60 1780 L60 1680 M60 1780 L160 1780" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M1020 1780 L1020 1680 M1020 1780 L920 1780" stroke="${COLORS.gold}" stroke-width="2" fill="none" opacity="0.8" />

  <!-- Top brand mark -->
  <text x="540" y="100"
        font-family="Montserrat, Arial, sans-serif"
        font-size="12"
        font-weight="300"
        letter-spacing="8"
        fill="${COLORS.gold}"
        text-anchor="middle">
    VERALABS
  </text>

  <!-- Collection label -->
  <text x="540" y="200"
        font-family="Montserrat, Arial, sans-serif"
        font-size="14"
        font-weight="300"
        letter-spacing="10"
        fill="${COLORS.gold}"
        opacity="0.8"
        text-anchor="middle">
    ${collection}
  </text>

  <!-- Hook (upper middle) -->
  <text x="540" y="400"
        font-family="Montserrat, Arial, sans-serif"
        font-size="16"
        font-weight="400"
        letter-spacing="4"
        fill="${COLORS.cream}"
        opacity="0.9"
        text-anchor="middle">
    ${hook.toUpperCase()}
  </text>

  <!-- Main content area (bottom) -->

  <!-- Headline -->
  <text x="540" y="1450"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="96"
        font-weight="400"
        fill="${COLORS.cream}"
        text-anchor="middle"
        filter="url(#storyGlow)">
    ${headline}
  </text>

  <!-- Subhead -->
  <text x="540" y="1540"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="64"
        font-style="italic"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${subhead}
  </text>

  <!-- Decorative line -->
  <line x1="390" y1="1580" x2="690" y2="1580" stroke="${COLORS.gold}" stroke-width="1" opacity="0.6" />

  <!-- Body -->
  <text x="540" y="1630"
        font-family="Montserrat, Arial, sans-serif"
        font-size="20"
        font-weight="300"
        fill="${COLORS.cream}"
        opacity="0.9"
        text-anchor="middle">
    ${body}
  </text>

  <!-- CTA Button -->
  <rect x="240" y="1680" width="600" height="70" rx="6" fill="url(#storyCtaGold)" />
  <text x="540" y="1728"
        font-family="Montserrat, Arial, sans-serif"
        font-size="18"
        font-weight="600"
        letter-spacing="4"
        fill="${COLORS.black}"
        text-anchor="middle">
    ${ctaButton}
  </text>

  <!-- CTA instruction -->
  <text x="540" y="1800"
        font-family="Montserrat, Arial, sans-serif"
        font-size="16"
        font-weight="400"
        letter-spacing="2"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${cta}
  </text>

  <!-- Swipe up indicator -->
  <path d="M540 1850 L520 1870 M540 1850 L560 1870" stroke="${COLORS.cream}" stroke-width="2" fill="none" opacity="0.6" />
</svg>`;
}

// Process image with overlay
async function createAd(config, format) {
  const inputPath = path.join(SOURCE_DIR, config.image);

  if (!fs.existsSync(inputPath)) {
    console.log(`   ⚠️  Missing: ${config.image}`);
    return null;
  }

  const isStory = format === 'story';
  const width = isStory ? 1080 : 1080;
  const height = isStory ? 1920 : 1080;
  const suffix = isStory ? '_story' : '_feed';
  const outputPath = path.join(OUTPUT_DIR, `ad_${config.id}${suffix}.jpg`);

  try {
    // Resize source image
    const resizedImage = await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .toBuffer();

    // Create overlay
    const overlay = isStory
      ? createStoryAdOverlay(config)
      : createFeedAdOverlay(config);
    const svgBuffer = Buffer.from(overlay);

    // Composite
    await sharp(resizedImage)
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   V E R A L A B S                                          ║
║   Instagram Messaging Ads Creator                          ║
║                                                            ║
║   Creating High-Impact Ads:                                ║
║   • Lead Generation (DM keyword triggers)                  ║
║   • Engagement (Questions and polls)                       ║
║   • Brand Story (Emotional connection)                     ║
║   • Conversion (Strong CTAs)                               ║
║                                                            ║
║   Formats: Feed (1:1) + Story/Reel (9:16)                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const createdAds = {
    feed: [],
    story: [],
  };

  // Process all ad categories
  for (const [category, ads] of Object.entries(MESSAGING_ADS)) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📢 ${category.toUpperCase().replace('_', ' ')} ADS`);
    console.log(`${'═'.repeat(60)}\n`);

    for (const ad of ads) {
      console.log(`   🎨 ${ad.id}`);

      // Create feed version
      const feedPath = await createAd(ad, 'feed');
      if (feedPath) {
        createdAds.feed.push({ ...ad, path: feedPath });
        console.log(`      ✅ Feed (1:1)`);
      }

      // Create story version
      const storyPath = await createAd(ad, 'story');
      if (storyPath) {
        createdAds.story.push({ ...ad, path: storyPath });
        console.log(`      ✅ Story (9:16)`);
      }
    }
  }

  // Save manifest
  const manifest = {
    created: new Date().toISOString(),
    ads: createdAds,
    adCopy: generateAdCopy(),
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'ads-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  // Generate ad copy file
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'AD_COPY.md'),
    generateAdCopyMarkdown()
  );

  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✅ MESSAGING ADS CREATED                                 ║
║                                                            ║
║   Output: ${OUTPUT_DIR}
║                                                            ║
║   Created:                                                 ║
║   • ${createdAds.feed.length} Feed Ads (1080x1080)                            ║
║   • ${createdAds.story.length} Story/Reel Ads (1080x1920)                      ║
║   • Ad copy and targeting guide                            ║
║                                                            ║
║   Next Steps:                                              ║
║   1. Upload to Meta Ads Manager                            ║
║   2. Set up messaging objective campaign                   ║
║   3. Configure automated responses                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);
}

function generateAdCopy() {
  return {
    lead_gen: {
      primary_text: `Shadow speaks where words dare not venture.

Unlock exclusive access to the complete VERALABS collection.

DM "SHADOW" for instant access to:
✨ Full Shadow Symphony gallery
✨ Styling inspiration guide
✨ Early access to new drops

Limited spots available.`,
      headline: 'Exclusive Collection Access',
      description: 'DM the keyword for instant access',
    },
    engagement: {
      primary_text: `Shadow. Lace. Silk.

Three collections. Three stories. One question:

Which speaks to YOUR soul?

Tell us in the DMs - we genuinely want to know. Best answers get featured in our stories.

#VERALABS #IntimateArt #FineArtBoudoir`,
      headline: 'Which Collection Speaks to You?',
      description: 'Share your pick in the DMs',
    },
    conversion: {
      primary_text: `🔥 48-HOUR DROP 🔥

The Mesh Moderne collection is here.

Only 50 pieces available.
No restock planned.

DM "DROP" for early access before it sells out.

#VERALABS #LimitedEdition #MeshModerne`,
      headline: 'Limited Drop - 48 Hours Only',
      description: 'DM for early access',
    },
  };
}

function generateAdCopyMarkdown() {
  return `# VERALABS Messaging Ads - Copy & Strategy

## Campaign Objective: Messages

### Ad Set 1: Lead Generation

**Primary Text:**
\`\`\`
Shadow speaks where words dare not venture.

Unlock exclusive access to the complete VERALABS collection.

✨ DM "SHADOW" for the Shadow Symphony gallery
✨ DM "LACE" for the Lace Poetry collection
✨ DM "SILK" for Mesh & Silk exclusives

Limited spots available. First 100 get a free styling guide.
\`\`\`

**Headline:** Exclusive Collection Access
**CTA:** Send Message

---

### Ad Set 2: Engagement

**Primary Text:**
\`\`\`
Shadow. Lace. Silk.

Three collections. Three stories. One question:

Which speaks to YOUR soul?

Drop your answer in the DMs. We read every message.
Best answers featured in our stories ✨
\`\`\`

**Headline:** Which Collection Speaks to You?
**CTA:** Send Message

---

### Ad Set 3: Conversion (Limited Drop)

**Primary Text:**
\`\`\`
🔥 48-HOUR DROP 🔥

The Mesh Moderne collection is here.

Only 50 pieces available.
No restock planned.
Early access for DM subscribers only.

DM "DROP" now before it's gone.
\`\`\`

**Headline:** Limited Drop - 48 Hours Only
**CTA:** Send Message

---

## Targeting Recommendations

### Interest Targeting:
- Fine art photography
- Boudoir photography
- Luxury fashion
- Haute couture
- Art collectors
- Editorial photography
- Intimate apparel
- Self-expression

### Demographics:
- Age: 25-54
- Gender: All (skew female 70%)
- Income: Top 25%

### Placements:
- Instagram Feed
- Instagram Stories
- Instagram Reels
- Instagram Explore

### Budget Recommendations:
- Daily: $20-50 for testing
- Scale: $100-200/day for winning ads

---

## Automated Response Setup

### Keyword Triggers:

**"SHADOW"** →
"Welcome to the shadows ✨ Here's your exclusive access to the Shadow Symphony collection: [LINK]. Reply with any questions!"

**"LACE"** →
"Poetry in lace, just for you 🖤 Explore the full Lace Poetry collection here: [LINK]. Which piece caught your eye?"

**"SILK"** →
"Silk confessions unlocked 💫 Your exclusive Mesh & Silk access: [LINK]. Let us know if you need styling tips!"

**"DROP"** →
"You're in! 🔥 The Mesh Moderne drop goes live in [TIME]. You'll get first access. Stay tuned for the link!"

---

## Performance Metrics to Track

1. **Cost per Message Initiated** (target: <$2)
2. **Message Response Rate** (target: >50%)
3. **Click-through Rate** from DMs (target: >20%)
4. **Conversion Rate** (target: >5%)

---

*Created by VERALABS AI Studio*
`;
}

main().catch(console.error);
