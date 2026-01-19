#!/usr/bin/env node

/**
 * MEERA DUSKY - FRONT VIEW V-SHAPE INNER THIGH
 * No coverage - Front view camera angle
 * V-shaped inner thigh focused poses ONLY
 * 12 variants
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-front-view-vshape';
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
// FRONT VIEW V-SHAPE INNER THIGH - NO COVERAGE
// ═══════════════════════════════════════════════════════════════════════════════

const FRONT_VIEW_VSHAPE_PROMPT = `[FRONT VIEW V-SHAPE INNER THIGH PHOTOGRAPHY]

[CAMERA ANGLE - CRITICAL]
FRONT VIEW CAMERA POSITION
Camera positioned at foot of bed/surface facing directly toward subject
Direct frontal view of V-shaped spread legs
Looking straight at inner thighs from feet toward head
The V-shape is perfectly centered and symmetrical in frame
Both inner thighs equally visible from front angle

[PRIMARY SUBJECT - V-SHAPE INNER THIGH]
THE PHOTOGRAPH CAPTURES:
• V-SHAPE created by spread bent legs as central composition
• Inner thighs are THE PRIMARY SUBJECT
• Camera looking directly at the V-shape from front
• Both inner thighs equally visible creating symmetrical V
• The space between spread inner thighs centered in frame

[SUBJECT - MEERA - NO COVERAGE]
IDENTITY: Indian woman "Meera" | South Asian | Age 27 | Height 5'9"

DUSKY INDIAN SKIN TONE:
• Deep warm dusky brown complexion
• Rich coffee-with-milk undertones
• Warm bronze highlights on skin
• Natural dusky melanin richness - NOT pale, NOT fair
• Authentic deeper Indian complexion

BODY - COMPLETELY UNCLOTHED:
• NO COVERAGE - completely natural unclothed form
• No lingerie, no underwear, no fabric
• 37DD natural bust visible above
• 27" narrow waist
• 40" wide round hips framing the V-spread
• Full soft inner thighs fully exposed
• Natural feminine form without any garments

SKIN TEXTURE:
• Hyper-realistic skin detail
• Visible pores on inner thigh surfaces
• Natural micro-texture grain
• Natural skin oil sheen
• Realistic skin folds where thighs meet

FACE (visible above body):
• Dusky complexion
• Deep dark brown eyes
• Full lips
• Sensuous expression

ADORNMENTS:
• Platinum navel piercing
• Gold anklet on left ankle
• Diamond nose stud

[POSE - FRONT VIEW V-SHAPE SPECIFIC]

POSITION FOR FRONT VIEW:
• Laying on back, head away from camera
• Knees bent and spread apart forming V-SHAPE
• Legs spread wide creating symmetrical V
• Feet toward camera or to sides
• Inner thighs the widest part of composition
• Camera captures direct front view of V-spread

V-SHAPE REQUIREMENTS:
• Both inner thighs equally visible
• Symmetrical V-shape formation
• The V opens toward the camera
• Inner thigh flesh prominently displayed
• Clear V-shape silhouette from front angle

COMPOSITION:
• V-shape as absolute center of frame
• Camera at foot level looking toward head
• Inner thighs take 60%+ of visual frame
• Torso and bust visible beyond the V-shape
• Face visible at top of frame

[LIGHTING - FRONT LIT V-SHAPE]

ILLUMINATION:
• Light falling on inner thigh surfaces
• Front lighting illuminating the V-spread
• Soft directional light on dusky skin
• Bronze highlights on lit inner thighs
• 60-70% shadow ratio with V-shape well lit

QUALITY:
• Low-key dramatic atmosphere
• Inner thighs as brightest elements
• Chiaroscuro effect on body curves

[ENVIRONMENT]
Setting: Dark studio
Background: Black seamless
Surface: Dark fabric/bed
Atmosphere: Intimate, dramatic

[TECHNICAL]

CAMERA:
• Medium format quality
• 50-85mm for front view composition
• 8K resolution
• V-shape tack-sharp in focus

FRONT VIEW REQUIREMENTS:
• Direct frontal camera angle
• Symmetrical V-shape composition
• Inner thighs as primary visual focus
• Professional intimate photography

COMPOSITION:
• V-shape centered and symmetrical
• Both inner thighs equal in frame
• Front perspective looking down V-shape
• Rule of thirds with V centered

[VERIFICATION]
CONFIRM: Dusky Indian Meera (37DD-27-40)
CONFIRM: NO COVERAGE - completely unclothed
CONFIRM: FRONT VIEW camera angle
CONFIRM: V-SHAPE inner thigh as PRIMARY SUBJECT
CONFIRM: Symmetrical V-spread composition
CONFIRM: Inner thighs prominently lit
CONFIRM: 8K professional quality
DO NOT CHANGE: Front view angle, V-shape focus, no coverage`;

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
  console.log(`[${new Date().toLocaleTimeString()}] 🔺 [${num}/${total}] Front View V-Shape`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: Dusky Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}]    Angle: FRONT VIEW`);
  console.log(`[${new Date().toLocaleTimeString()}]    Focus: V-SHAPE INNER THIGH`);
  console.log(`[${new Date().toLocaleTimeString()}]    Coverage: NONE`);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: FRONT_VIEW_VSHAPE_PROMPT,
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
      const filename = `meera_front_view_vshape_${String(num).padStart(2, '0')}_${Date.now()}.png`;
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
║   🔺 MEERA DUSKY - FRONT VIEW V-SHAPE INNER THIGH 🔺                        ║
║                                                                              ║
║   CAMERA: Front View - Direct frontal angle                                 ║
║   FOCUS: V-Shape Inner Thigh ONLY                                           ║
║   COVERAGE: None - Completely unclothed                                     ║
║                                                                              ║
║   LOCKED:                                                                   ║
║   • Dusky Indian Meera (37DD-27-40)                                         ║
║   • Front View Camera Angle                                                 ║
║   • Symmetrical V-Shape Composition                                         ║
║   • Inner Thigh Primary Subject                                             ║
║   • 8K Ultra-Realistic Quality                                              ║
║                                                                              ║
║   Generating ${NUM_IMAGES} Front View V-Shape Images                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔺 FRONT VIEW V-SHAPE MODE`);
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
║          🔺 MEERA FRONT VIEW V-SHAPE COMPLETE 🔺                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${NUM_IMAGES}
  📊 Rate: ${((successCount / NUM_IMAGES) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🔺 Image ${r.num} (${r.size} MB)`);
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
      collection: 'Meera Dusky - Front View V-Shape Inner Thigh',
      model: 'imagineart/imagineart-1.0',
      angle: 'Front View - Direct Frontal',
      focus: 'V-Shape Inner Thigh Primary Subject',
      coverage: 'None - Completely Unclothed',
      lockedElements: {
        subject: 'Dusky Indian Meera (37DD-27-40)',
        camera: 'Front View Angle',
        pose: 'V-Shape Inner Thigh Spread',
        coverage: 'None',
        lighting: 'Dramatic Front Lit'
      },
      generated: new Date().toISOString(),
      images: results,
      stats: { total: NUM_IMAGES, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
