#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 HUNYUAN IMAGE 3 - MEERA MORE POSES (PNG MAX QUALITY) 🎨                 ║
 * ║                                                                              ║
 * ║   Model: tencent/hunyuan-image-3 (Replicate)                                 ║
 * ║   Output: PNG • Quality: 100 • Safety Checker: DISABLED                      ║
 * ║   LOCKED MUSE: Meera (38D-27-40) - New Pose Variants                        ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-hunyuan3-moreposes';
const MODEL = "tencent/hunyuan-image-3";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 LOCKED MEERA MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_MEERA = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips creating perfect sculptural hourglass silhouette. Warm caramel bronze skin with natural golden-amber undertones, authentic skin texture with visible natural pores. Captivating deep brown magnetic eyes with thick dark lashes, full sensual lips, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural waves. Platinum navel piercing. Confident sensual expression with authentic natural beauty`;

// ═══════════════════════════════════════════════════════════════════════════════
// MINIMAL COVERAGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  singleThread: `wearing ultra-transparent avant-garde lower foundation framework made of a single delicate thread only, barely-there geometric structure, maximum skin visibility`,
  goldenChains: `wearing only delicate gold body chain jewelry draped sensuously across curves, thin golden chains as sole coverage`,
  gossamerMesh: `wearing ultra-sheer gossamer micro-mesh bodysuit in champagne, fabric so delicate it appears as second skin`,
  laceMicro: `wearing delicate black lace micro-bralette only, intricate lacework barely covering bust, lower body completely bare`,
  stringBikini: `wearing minimal string bikini bottom only in black, thin strings as sole coverage, bust completely bare`,
  silkRobeOpen: `wearing open champagne silk robe untied and falling off shoulders, revealing complete natural form beneath`,
  pearlStrands: `adorned with only multiple pearl strands draped across body, lustrous pearls as artistic coverage`,
  crystalWeb: `wearing crystalline spider-web mesh in silver, ultra-fine threads creating diamond pattern, complete transparency`
};

// ═══════════════════════════════════════════════════════════════════════════════
// NEW POSE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const NEW_POSES = {
  // Kneeling poses
  kneelingProfile: `Kneeling on soft surface in profile view, back elegantly arched, arms raised behind head, sculptural silhouette`,
  kneelingFront: `Kneeling facing camera, knees slightly apart, hands resting on thighs, confident direct gaze`,

  // Standing poses
  standingContrapposto: `Standing in classical contrapposto pose, weight on one hip creating dramatic curve, one arm raised`,
  standingBackView: `Standing with back to camera, looking over shoulder sensuously, full posterior silhouette visible`,
  standingProfile: `Standing in profile showing complete silhouette, one leg slightly forward, elegant posture`,

  // Lying poses
  lyingStomach: `Lying on stomach on soft surface, propped on elbows, legs bent up behind, looking forward`,
  lyingBackArched: `Lying on back with dramatic spine arch, arms overhead, full body curve emphasized`,
  lyingSideHips: `Lying on side with top leg bent forward, hips tilted to emphasize hourglass curves`,

  // Seated poses
  seatedSpread: `Seated on edge of surface, legs slightly parted, leaning back on hands, confident pose`,
  seatedFloor: `Seated on floor with one leg extended, one bent, torso turned creating elegant lines`,

  // Dynamic poses
  stretchingArms: `Standing with arms stretched overhead, body elongated, showcasing full figure length`,
  bendingForward: `Bending forward slightly at waist, hands on knees, looking up at camera seductively`
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  cabin: `cozy wooden mountain cabin interior, warm fireplace glow, soft fur throws`,
  penthouse: `luxury penthouse bedroom at night, floor-to-ceiling windows with city lights`,
  boudoir: `elegant Victorian boudoir with burgundy velvet furnishings, warm candlelight`,
  bedroom: `private master bedroom, soft warm lamp glow, rumpled ivory silk sheets`,
  studio: `professional fine art photography studio, soft diffused natural light, clean backdrop`,
  spa: `luxury private spa suite, warm ambient lighting, white marble, ethereal steam`,
  poolside: `private infinity pool at sunset, golden hour light, luxurious loungers`,
  terrace: `penthouse terrace at golden hour, city skyline backdrop, warm sunset light`
};

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANTS - NEW POSES
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'kneeling_profile_thread', coverage: 'singleThread', pose: 'kneelingProfile', env: 'studio' },
  { id: 'kneeling_front_chains', coverage: 'goldenChains', pose: 'kneelingFront', env: 'boudoir' },
  { id: 'standing_back_gossamer', coverage: 'gossamerMesh', pose: 'standingBackView', env: 'penthouse' },
  { id: 'standing_profile_lace', coverage: 'laceMicro', pose: 'standingProfile', env: 'studio' },
  { id: 'lying_stomach_string', coverage: 'stringBikini', pose: 'lyingStomach', env: 'bedroom' },
  { id: 'lying_arched_robe', coverage: 'silkRobeOpen', pose: 'lyingBackArched', env: 'cabin' },
  { id: 'lying_side_pearls', coverage: 'pearlStrands', pose: 'lyingSideHips', env: 'spa' },
  { id: 'seated_spread_crystal', coverage: 'crystalWeb', pose: 'seatedSpread', env: 'boudoir' },
  { id: 'seated_floor_thread', coverage: 'singleThread', pose: 'seatedFloor', env: 'studio' },
  { id: 'stretching_chains', coverage: 'goldenChains', pose: 'stretchingArms', env: 'terrace' },
  { id: 'bending_gossamer', coverage: 'gossamerMesh', pose: 'bendingForward', env: 'poolside' },
  { id: 'contrapposto_lace', coverage: 'laceMicro', pose: 'standingContrapposto', env: 'penthouse' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = NEW_POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  return `Award-winning fine art boudoir photography. Museum exhibition quality.

${LOCKED_MEERA}.

POSE: ${pose}

ENVIRONMENT: ${env}

WARDROBE: ${coverage}

LIGHTING: Professional studio lighting with soft key light, warm fill, dramatic yet flattering shadows enhancing curves and skin texture.

CAMERA: Hasselblad H6D-100c medium format, 85mm lens, f/2.8 aperture, shallow depth of field.

Full body composition showing complete figure. 8K ultra high resolution. Hyper-realistic photography with authentic skin texture, visible pores. Masterpiece fine art photography.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATE
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Pose: ${variant.pose} | Coverage: ${variant.coverage}`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        width: 768,
        height: 1024,
        output_format: "png",
        output_quality: 100,
        disable_safety_checker: true
      }
    });

    if (Array.isArray(output) && output.length > 0) {
      const fileOutput = output[0];
      const filename = `meera_hunyuan3_${variant.id}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      await writeFile(filepath, fileOutput);
      const size = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
      console.log(`[${new Date().toLocaleTimeString()}]    ✅ ${filename} (${size} MB)`);
      return { variant: variant.id, filename, size, success: true };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output received`);
      return { variant: variant.id, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message.substring(0, 80)}`);
    return { variant: variant.id, success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎨 HUNYUAN IMAGE 3 - MEERA MORE POSES (PNG MAX QUALITY) 🎨                 ║
║                                                                              ║
║   Model: tencent/hunyuan-image-3 • Output: PNG • Quality: 100                ║
║   Resolution: 768x1024 • Safety Checker: DISABLED                            ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera (38D-27-40)                                   ║
║   ${VARIANTS.length} New Pose Variants                                                     ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Output: PNG @ Quality 100\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 15s...`);
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 HUNYUAN IMAGE 3 MORE POSES COMPLETE 🎨                           ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successful.length}/${VARIANTS.length}
  📊 Rate: ${((successful.length / VARIANTS.length) * 100).toFixed(0)}%
`);

  if (successful.length > 0) {
    console.log(`  GENERATED:`);
    successful.forEach(r => console.log(`     🎨 ${r.variant} (${r.size} MB)`));
  }

  if (failed.length > 0) {
    console.log(`\n  FAILED:`);
    failed.forEach(r => console.log(`     ❌ ${r.variant}: ${r.error?.substring(0, 40) || 'Unknown'}`));
  }

  console.log(`\n  📁 Output: ${OUTPUT_DIR}\n`);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Hunyuan Image 3 - Meera More Poses',
      model: MODEL,
      format: 'PNG',
      quality: 100,
      resolution: '768x1024',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: VARIANTS.length, successful: successful.length }
    }, null, 2)
  );
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
