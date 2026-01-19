#!/usr/bin/env node

/**
 * MEERA - INNER THIGH DETAILED CLOSEUP COLLECTION
 * ImagineArt 1.0 • Fine Art Macro Photography
 *
 * Detailed Close-up Shots of Inner Thigh Curves
 * Artistic Macro Photography • Intimate Detail Study
 * STRICTLY LOCKED INDIAN MUSE: Meera (38D-27-40)
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-inner-thigh-closeup';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// LOCKED INDIAN MEERA - INNER THIGH FOCUS
const LOCKED_MEERA_THIGH = `SUBJECT (LOCKED): Indian woman Meera, South Asian Indian ethnicity.
Golden-brown caramel Indian skin complexion with natural luminous glow.
Curvaceous Indian hourglass figure - 40" wide rounded hips, smooth toned inner thighs.
Platinum navel ring piercing visible when midriff in frame.
Authentic golden-brown Indian skin - NOT pale/white.`;

// Inner Thigh Closeup Focus Descriptions
const THIGH_CLOSEUP_FOCUS = {
  vShape: `EXTREME CLOSEUP: V-shaped intimate area where inner thighs meet. Ultra-detailed golden-brown Indian skin texture. Soft feminine curves where thighs converge. Natural shadows in intimate V-formation. Smooth toned inner thigh skin with natural pores visible.`,

  singleThigh: `CLOSEUP: Single inner thigh detail. Smooth golden-brown Indian skin from hip to knee area. Soft feminine curve of inner thigh. Natural skin texture with subtle highlights. Intimate shadowing along inner edge.`,

  partedThighs: `MEDIUM CLOSEUP: Both inner thighs parted naturally. Golden-brown skin catching warm light. V-shaped negative space between thighs. Soft shadows defining inner curves. Full inner thigh detail from hips to knees.`,

  upperInner: `CLOSEUP: Upper inner thigh area near hip junction. Soft transition from 40" hip curve to inner thigh. Golden-brown Indian skin with natural texture. Intimate shadowing at hip-thigh junction.`,

  thighGap: `DETAILED VIEW: Inner thigh gap study. Space between toned thighs. Golden-brown skin on both inner thigh surfaces. Light passing through thigh gap. Natural feminine curves framing negative space.`,

  lowAngle: `LOW ANGLE CLOSEUP: Inner thighs viewed from below. Golden-brown Indian skin stretching upward. Dramatic perspective on inner thigh curves. Intimate shadowing between thighs visible.`,

  sideProfile: `SIDE PROFILE CLOSEUP: Inner thigh curve from side angle. S-curve silhouette of thigh. Golden-brown skin catching side light. Soft feminine fullness of inner thigh muscle.`,

  reclinedView: `RECLINED VIEW CLOSEUP: Inner thighs in reclined position. Natural parting showing both inner thigh surfaces. Golden-brown skin on soft bed surface. Relaxed intimate positioning.`
};

// Artistic Lighting for Closeups
const CLOSEUP_LIGHTING = {
  softDiffused: `Soft diffused studio light, even illumination on golden-brown skin, minimal shadows, beauty photography lighting`,

  sideRim: `Side rim lighting creating edge definition on inner thigh curves, dramatic shadows, sculptural emphasis`,

  goldenWarm: `Golden hour warm light, amber tones on golden-brown Indian skin, soft shadows, intimate atmosphere`,

  highKey: `High-key bright lighting, minimal shadows, clean detail on skin texture, studio closeup style`,

  chiaroscuro: `Dramatic chiaroscuro lighting, deep shadows defining curves, Renaissance painting influence`,

  backlit: `Backlighting creating silhouette edge, light wrapping around thigh curves, ethereal glow`,

  candleGlow: `Warm candle glow, flickering light on inner thigh skin, intimate romantic lighting`,

  windowNatural: `Natural window light, soft shadows, realistic indoor lighting, intimate bedroom atmosphere`
};

// Private Indoor Settings
const CLOSEUP_SETTINGS = {
  silkBed: `On cream silk bedsheets, intimate bedroom setting, soft fabric contrast against golden-brown skin`,

  velvetChaise: `On burgundy velvet chaise lounge, luxurious texture, vintage boudoir atmosphere`,

  whiteStudio: `Clean white studio background, professional closeup photography, focused on skin detail`,

  furRug: `On soft white fur rug, textural contrast with smooth skin, cozy intimate floor setting`,

  marbleSurface: `Against cool marble surface, temperature contrast with warm skin, elegant setting`,

  bathEdge: `At edge of vintage bathtub, wet glistening skin, intimate bathing moment`,

  windowSeat: `On cushioned window seat, natural light flooding in, private moment captured`,

  floorCushions: `Among scattered silk cushions on floor, relaxed intimate environment`
};

// 16 Inner Thigh Closeup Variants
const CLOSEUP_VARIANTS = [
  // V-SHAPE SERIES
  {
    name: 'Intimate V',
    focus: THIGH_CLOSEUP_FOCUS.vShape,
    light: CLOSEUP_LIGHTING.softDiffused,
    setting: CLOSEUP_SETTINGS.silkBed,
    mood: 'Detailed V-shape where thighs meet'
  },
  {
    name: 'Golden V',
    focus: THIGH_CLOSEUP_FOCUS.vShape,
    light: CLOSEUP_LIGHTING.goldenWarm,
    setting: CLOSEUP_SETTINGS.velvetChaise,
    mood: 'Golden light on inner thigh V-formation'
  },
  {
    name: 'Shadow V',
    focus: THIGH_CLOSEUP_FOCUS.vShape,
    light: CLOSEUP_LIGHTING.chiaroscuro,
    setting: CLOSEUP_SETTINGS.whiteStudio,
    mood: 'Dramatic shadows in intimate V-area'
  },

  // PARTED THIGHS SERIES
  {
    name: 'Silk Parting',
    focus: THIGH_CLOSEUP_FOCUS.partedThighs,
    light: CLOSEUP_LIGHTING.softDiffused,
    setting: CLOSEUP_SETTINGS.silkBed,
    mood: 'Parted inner thighs on silk sheets'
  },
  {
    name: 'Candlelit Spread',
    focus: THIGH_CLOSEUP_FOCUS.partedThighs,
    light: CLOSEUP_LIGHTING.candleGlow,
    setting: CLOSEUP_SETTINGS.furRug,
    mood: 'Candlelit inner thigh spread detail'
  },
  {
    name: 'Window Spread',
    focus: THIGH_CLOSEUP_FOCUS.partedThighs,
    light: CLOSEUP_LIGHTING.windowNatural,
    setting: CLOSEUP_SETTINGS.windowSeat,
    mood: 'Natural light inner thigh parting'
  },

  // THIGH GAP SERIES
  {
    name: 'Gap Study',
    focus: THIGH_CLOSEUP_FOCUS.thighGap,
    light: CLOSEUP_LIGHTING.backlit,
    setting: CLOSEUP_SETTINGS.whiteStudio,
    mood: 'Backlit thigh gap artistic study'
  },
  {
    name: 'Standing Gap',
    focus: THIGH_CLOSEUP_FOCUS.thighGap,
    light: CLOSEUP_LIGHTING.sideRim,
    setting: CLOSEUP_SETTINGS.whiteStudio,
    mood: 'Standing inner thigh gap detail'
  },

  // SINGLE THIGH DETAIL
  {
    name: 'Single Curve',
    focus: THIGH_CLOSEUP_FOCUS.singleThigh,
    light: CLOSEUP_LIGHTING.highKey,
    setting: CLOSEUP_SETTINGS.whiteStudio,
    mood: 'Single inner thigh curve macro'
  },
  {
    name: 'Velvet Touch',
    focus: THIGH_CLOSEUP_FOCUS.singleThigh,
    light: CLOSEUP_LIGHTING.goldenWarm,
    setting: CLOSEUP_SETTINGS.velvetChaise,
    mood: 'Single thigh on velvet texture'
  },

  // UPPER INNER SERIES
  {
    name: 'Hip Junction',
    focus: THIGH_CLOSEUP_FOCUS.upperInner,
    light: CLOSEUP_LIGHTING.softDiffused,
    setting: CLOSEUP_SETTINGS.silkBed,
    mood: 'Upper inner thigh at hip junction'
  },
  {
    name: 'Upper Curves',
    focus: THIGH_CLOSEUP_FOCUS.upperInner,
    light: CLOSEUP_LIGHTING.chiaroscuro,
    setting: CLOSEUP_SETTINGS.floorCushions,
    mood: 'Dramatic upper inner thigh detail'
  },

  // ANGLE SERIES
  {
    name: 'Low Perspective',
    focus: THIGH_CLOSEUP_FOCUS.lowAngle,
    light: CLOSEUP_LIGHTING.sideRim,
    setting: CLOSEUP_SETTINGS.whiteStudio,
    mood: 'Low angle inner thigh perspective'
  },
  {
    name: 'Side Silhouette',
    focus: THIGH_CLOSEUP_FOCUS.sideProfile,
    light: CLOSEUP_LIGHTING.backlit,
    setting: CLOSEUP_SETTINGS.windowSeat,
    mood: 'Side profile inner thigh silhouette'
  },

  // RECLINED SERIES
  {
    name: 'Reclined Detail',
    focus: THIGH_CLOSEUP_FOCUS.reclinedView,
    light: CLOSEUP_LIGHTING.windowNatural,
    setting: CLOSEUP_SETTINGS.silkBed,
    mood: 'Reclined inner thigh intimate detail'
  },
  {
    name: 'Ultimate Closeup',
    focus: THIGH_CLOSEUP_FOCUS.vShape,
    light: CLOSEUP_LIGHTING.goldenWarm,
    setting: CLOSEUP_SETTINGS.silkBed,
    mood: 'Peak inner thigh closeup masterpiece'
  }
];

// Build Inner Thigh Closeup prompt
function buildCloseupPrompt(variant) {
  return `FINE ART MACRO PHOTOGRAPHY - Inner Thigh Detailed Closeup Study.
Professional intimate detail photography of Indian woman's inner thighs.

${LOCKED_MEERA_THIGH}

${variant.focus}

SETTING: ${variant.setting}

LIGHTING: ${variant.light}

CAMERA SPECIFICATIONS:
- Shot with macro lens for extreme detail
- 8K ultra-high resolution capturing skin texture
- Closeup framing focused on inner thigh area
- Professional intimate detail photography

SKIN DETAIL RENDERING:
- Hyper-realistic golden-brown Indian skin texture
- Visible natural pores and subtle skin variations
- Warm caramel undertones typical of South Asian women
- Natural skin luminosity catching light
- Smooth feminine inner thigh curves
- No airbrushing - authentic natural skin detail

ARTISTIC MOOD: ${variant.mood}

CRITICAL: Subject must have golden-brown Indian skin (NOT pale/white). Inner thigh closeup focus. Fine art intimate photography. Adults only artistic collection.`;
}

// Download and save image
async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  const stats = fs.statSync(filepath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

// Generate single image
async function generateImage(variant, index, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔍 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Mood: ${variant.mood}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Type: Inner Thigh Closeup`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: LOCKED Indian Meera`);

  const prompt = buildCloseupPrompt(variant);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: prompt,
      aspect_ratio: "3:4"
    };

    const output = await replicate.run(MODEL, { input });

    let imageUrl;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (output && output.url) {
      imageUrl = output.url;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = typeof output[0] === 'string' ? output[0] : output[0].url?.() || output[0].url;
    }

    if (imageUrl) {
      const filename = `meera_thigh_closeup_${variant.name.toLowerCase().replace(/\\s+/g, '_')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        variant: variant.name,
        mood: variant.mood,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { variant: variant.name, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { variant: variant.name, success: false, error: error.message };
  }
}

// Main
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🔍 MEERA - INNER THIGH DETAILED CLOSEUP COLLECTION 🔍                     ║
║                                                                              ║
║   Fine Art Macro Photography • Intimate Detail Study                        ║
║   STRICTLY LOCKED: Indian Woman Meera • Golden-Brown Skin                  ║
║                                                                              ║
║   16 Inner Thigh Closeup Variants                                           ║
║   Focus: V-Shape • Parted Thighs • Thigh Gap • Single Curve                ║
║   Lighting: Soft • Golden • Dramatic • Backlit • Candlelit                  ║
║   Adults Only Patreon Collection • Artistic Intimate Detail                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 MUSE LOCKED: Indian Meera (Golden-Brown Skin)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔍 Focus: Inner Thigh Detailed Closeup`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < CLOSEUP_VARIANTS.length; i++) {
    const result = await generateImage(CLOSEUP_VARIANTS[i], i, CLOSEUP_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < CLOSEUP_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🔍 MEERA INNER THIGH CLOSEUP COMPLETE 🔍                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${CLOSEUP_VARIANTS.length}
  📊 Rate: ${((successCount / CLOSEUP_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🔍 ${r.variant} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ ${r.variant} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera - Inner Thigh Detailed Closeup',
      model: 'imagineart/imagineart-1.0',
      focus: 'Inner Thigh Macro Photography',
      lockedMuse: 'Indian Meera (Golden-Brown Skin)',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: CLOSEUP_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
