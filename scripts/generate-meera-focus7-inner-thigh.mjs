#!/usr/bin/env node

/**
 * MEERA DUSKY - FOCUS 7 INNER THIGH STYLE
 * Based on meera_dusky_vspread_focus_07_1768336307501.png
 *
 * Maximum inner thigh prominence and detail
 * Generates 12 more in this successful style
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-focus7-inner-thigh';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";
const NUM_IMAGES = 12;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// FOCUS 7 INNER THIGH STYLE - MAXIMUM INNER THIGH DETAIL
// ═══════════════════════════════════════════════════════════════════════════════

const FOCUS7_INNER_THIGH_PROMPT = `[INNER THIGH FOCUSED INTIMATE PHOTOGRAPHY - MAXIMUM DETAIL]

[PRIMARY SUBJECT - INNER THIGH PROMINENCE]
THE PHOTOGRAPH IS ABOUT THE INNER THIGHS
Inner thighs are THE MAIN SUBJECT of this image
Soft, smooth inner thigh flesh filling significant portion of frame
V-shaped space between spread inner thighs as focal composition
Inner thigh skin texture rendered with hyper-realistic detail

[SUBJECT IDENTITY - LOCKED]
IDENTITY: Indian woman "Meera" | South Asian ethnicity | Age 27 | Height 5'9"

DUSKY INDIAN SKIN TONE:
• Deep warm dusky brown complexion - darker than typical "caramel"
• Rich coffee-with-milk undertones typical of South Indian women
• Warm bronze highlights where light catches inner thigh skin
• Natural dusky melanin richness - NOT pale, NOT fair, NOT light brown
• Authentic deeper Indian complexion with warm earthen undertones

INNER THIGH SKIN RENDERING (MAXIMUM DETAIL):
• Ultra-realistic skin texture on inner thighs
• Individual visible pores on inner thigh surfaces
• Natural micro-texture grain visible on inner thigh skin
• Subtle hair follicle texture even on smooth inner thigh areas
• Natural feminine softness and fullness of inner thighs
• Realistic skin folds where thighs meet torso
• Natural dusky brown to slightly lighter inner thigh gradation
• Soft flesh texture with natural weight and fullness
• Visible subtle veins under thin inner thigh skin
• Natural skin oil sheen catching light on inner thighs

LOCKED BODY (37DD-27-40):
• 37DD heavy natural bust - falling to sides when laying
• 27" dramatically cinched waist
• 40" wide round Indian hips framing spread thighs
• Full soft inner thighs with natural feminine fullness
• Natural weight distribution in relaxed pose

FACE (secondary, not primary focus):
• Dusky complexion matching body
• Deep dark brown almond-shaped eyes
• Full sensual lips with natural dusky rose tone
• Expression: Sensuous, relaxed

LOCKED ADORNMENTS:
• Platinum navel ring piercing catching light
• Delicate gold anklet on left ankle
• Diamond nose stud

[POSE - INNER THIGH MAXIMIZED]

POSITION:
• Laying on back, relaxed on surface
• Legs bent at knees and spread apart
• Inner thighs fully exposed and prominent
• The V-shape created by spread inner thighs is centered
• Soft inner thigh flesh visible from hip crease to knee

INNER THIGH DISPLAY:
• Both inner thighs equally visible in frame
• Maximum inner thigh skin surface shown
• Natural curves and feminine fullness emphasized
• Light catching the soft inner thigh surfaces
• The space between inner thighs as compositional center

BODY ARRANGEMENT:
• Torso relaxed, bust falling naturally
• Arms above head or relaxed at sides
• Hips settled, creating natural inner thigh spread
• Navel piercing visible catching light

[LIGHTING - INNER THIGH FOCUSED]

ILLUMINATION ON INNER THIGHS:
• Primary light falls on inner thigh surfaces
• Soft directional light highlighting inner thigh curves
• Bronze highlights on dusky inner thigh skin
• Gentle shadow in inner thigh creases and folds
• Light emphasizing the soft texture and fullness
• 70% shadow ratio with inner thighs prominently lit

DRAMATIC QUALITY:
• Low-key overall atmosphere
• Inner thighs emerge from shadow as brightest elements
• Chiaroscuro effect highlighting inner thigh contours
• Warm bronze tones on lit dusky skin

[ENVIRONMENT]
Setting: Black studio
Background: Deep black seamless
Surface: Dark fabric
Atmosphere: Intimate, dramatic

[TECHNICAL - INNER THIGH DETAIL CAPTURE]

CAMERA:
• Medium format quality
• 85mm equivalent for intimate inner thigh detail
• 8K resolution capturing inner thigh texture
• Shallow DOF with inner thighs tack-sharp

INNER THIGH DETAIL REQUIREMENTS:
• Visible pore structure on inner thigh skin
• Natural skin texture grain captured
• Realistic flesh quality and fullness
• Professional intimate photography standards
• Museum-quality skin detail rendering

COMPOSITION:
• Inner thighs as primary visual element (60%+ visual attention)
• V-spread composition centered
• Rule of thirds with inner thigh placement
• Intimate framing emphasizing inner thigh prominence

[VERIFICATION]
CONFIRM: Dusky Indian Meera (37DD-27-40)
CONFIRM: Inner thighs as PRIMARY SUBJECT
CONFIRM: Hyper-realistic inner thigh skin texture
CONFIRM: V-spread pose with inner thigh prominence
CONFIRM: Low-key dramatic lighting on inner thighs
CONFIRM: 8K professional quality
DO NOT CHANGE: Ethnicity, skin tone, measurements, inner thigh focus`;

// ═══════════════════════════════════════════════════════════════════════════════
// DOWNLOAD & GENERATE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  const stats = fs.statSync(filepath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

async function generateImage(num, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🦵 [${num}/${total}] Focus 7 Inner Thigh Style`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: Dusky Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}]    Focus: INNER THIGH PRIMARY SUBJECT`);
  console.log(`[${new Date().toLocaleTimeString()}]    Style: Maximum Inner Thigh Detail`);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: FOCUS7_INNER_THIGH_PROMPT,
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
      const filename = `meera_focus7_inner_thigh_${String(num).padStart(2, '0')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        num,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { num, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { num, success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🦵 MEERA DUSKY - FOCUS 7 INNER THIGH STYLE 🦵                             ║
║                                                                              ║
║   Based on: meera_dusky_vspread_focus_07 (1.53 MB)                          ║
║                                                                              ║
║   FOCUS: Inner Thigh as PRIMARY SUBJECT                                     ║
║                                                                              ║
║   LOCKED:                                                                   ║
║   • Dusky Indian Meera (37DD-27-40)                                         ║
║   • Inner Thigh Prominence & Detail                                         ║
║   • V-Spread Pose                                                           ║
║   • Low-Key Dramatic Lighting                                               ║
║   • 8K Ultra-Realistic Quality                                              ║
║                                                                              ║
║   Generating ${NUM_IMAGES} Inner Thigh Focused Images                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🦵 INNER THIGH PRIMARY FOCUS MODE`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 1; i <= NUM_IMAGES; i++) {
    const result = await generateImage(i, NUM_IMAGES);
    results.push(result);
    if (result.success) successCount++;

    if (i < NUM_IMAGES) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🦵 MEERA FOCUS 7 INNER THIGH COMPLETE 🦵                           ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${NUM_IMAGES}
  📊 Rate: ${((successCount / NUM_IMAGES) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🦵 Image ${r.num} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ Image ${r.num} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera Dusky - Focus 7 Inner Thigh Style',
      reference: 'meera_dusky_vspread_focus_07_1768336307501.png',
      model: 'imagineart/imagineart-1.0',
      focus: 'Inner thigh as primary subject with maximum detail',
      lockedElements: {
        subject: 'Dusky Indian Meera (37DD-27-40)',
        pose: 'V-Spread with Inner Thigh Prominence',
        lighting: 'Low-Key Dramatic (inner thighs lit)',
        environment: 'Black Studio'
      },
      generated: new Date().toISOString(),
      images: results,
      stats: { total: NUM_IMAGES, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
