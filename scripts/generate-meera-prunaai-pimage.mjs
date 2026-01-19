#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 PRUNA AI P-IMAGE - MEERA MAX INTIMATE COLLECTION 🎨                     ║
 * ║                                                                              ║
 * ║   Model: prunaai/p-image (Replicate)                                         ║
 * ║   Safety Filter: DISABLED                                                    ║
 * ║   LOCKED MUSE: Meera (38D-27-40) - Minimalist Coverage Sensuous             ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-prunaai';
const MODEL = "prunaai/p-image";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 LOCKED MEERA MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_MEERA = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips creating perfect sculptural hourglass silhouette. Warm caramel bronze skin with natural golden-amber undertones, authentic skin texture with visible natural pores. Captivating deep brown magnetic eyes with thick dark lashes, full sensual lips, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural waves. Platinum navel piercing. Confident sensual expression`;

// ═══════════════════════════════════════════════════════════════════════════════
// MINIMALIST COVERAGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  singleThread: `wearing ultra-transparent avant-garde lower foundation made of a single delicate thread only, maximum skin visibility, artistic body adornment`,
  goldenChains: `wearing only delicate gold body chain jewelry draped across curves, thin golden chains as sole coverage, metallic adornment`,
  gossamerMesh: `wearing ultra-sheer gossamer micro-mesh in champagne, fabric so delicate it appears as second skin, complete transparency`,
  smokeVeil: `wearing smoke-grey ultra-transparent tulle wrap, fabric like morning mist, ethereal minimal coverage`,
  crystalWeb: `wearing crystalline spider-web mesh in silver, ultra-fine threads creating diamond pattern, complete transparency`,
  laceMicro: `wearing delicate black lace micro-bralette only, intricate lacework, lower body completely bare`,
  stringBikini: `wearing minimal string bikini bottom only, thin strings as sole coverage, bust completely bare`,
  silkRobeOpen: `wearing open champagne silk robe untied falling off shoulders, revealing natural form beneath`,
  pearlStrands: `adorned with only multiple pearl strands draped across body, lustrous pearls as artistic coverage`,
  bareArtistic: `completely natural form, artistic fine art nude study, museum quality figure photography`
};

// ═══════════════════════════════════════════════════════════════════════════════
// SENSUOUS POSES
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = {
  velvetRecline: `Fully reclined on velvet chaise, body in languid sensual S-curve, one arm behind head, legs naturally positioned`,
  bedSpread: `Laying on luxurious bed with silk sheets, body in relaxed intimate positioning, vulnerable confident expression`,
  fireside: `Laying on soft fur throw near crackling fireplace, warm firelight on skin, relaxed sensual pose`,
  kneelingProfile: `Kneeling in profile view, back elegantly arched, arms raised behind head, sculptural silhouette`,
  standingBack: `Standing with back to camera, looking over shoulder sensuously, full posterior silhouette visible`,
  lyingStomach: `Lying on stomach on soft surface, propped on elbows, legs bent up behind, looking forward`,
  seatedSpread: `Seated on edge of surface, legs slightly apart, leaning back on hands, confident pose`,
  sideCurve: `Laying on side showing dramatic S-curve silhouette, hourglass proportions emphasized, intimate profile`,
  backArch: `Laying with dramatic spine arch, arms overhead, full body curve emphasized beautifully`,
  floorArtistic: `Artistic floor pose, body creating elegant sculptural curves, fine art aesthetic`
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
  spa: `luxury private spa suite, warm ambient lighting, white marble, ethereal steam`
};

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'singleThread', pose: 'fireside', env: 'cabin' },
  { id: 'bed_chains', coverage: 'goldenChains', pose: 'bedSpread', env: 'bedroom' },
  { id: 'penthouse_gossamer', coverage: 'gossamerMesh', pose: 'velvetRecline', env: 'penthouse' },
  { id: 'boudoir_smoke', coverage: 'smokeVeil', pose: 'sideCurve', env: 'boudoir' },
  { id: 'studio_crystal', coverage: 'crystalWeb', pose: 'floorArtistic', env: 'studio' },
  { id: 'spa_lace', coverage: 'laceMicro', pose: 'kneelingProfile', env: 'spa' },
  { id: 'bedroom_string', coverage: 'stringBikini', pose: 'lyingStomach', env: 'bedroom' },
  { id: 'cabin_robe', coverage: 'silkRobeOpen', pose: 'backArch', env: 'cabin' },
  { id: 'penthouse_pearls', coverage: 'pearlStrands', pose: 'standingBack', env: 'penthouse' },
  { id: 'studio_artistic', coverage: 'bareArtistic', pose: 'seatedSpread', env: 'studio' },
  { id: 'boudoir_thread', coverage: 'singleThread', pose: 'velvetRecline', env: 'boudoir' },
  { id: 'spa_chains', coverage: 'goldenChains', pose: 'floorArtistic', env: 'spa' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  return `Award-winning fine art boudoir photography. Museum exhibition quality.

${LOCKED_MEERA}.

POSE: ${pose}

ENVIRONMENT: ${env}

WARDROBE: ${coverage}

LIGHTING: Professional studio lighting with soft key light, warm fill, dramatic shadows enhancing curves and skin texture.

CAMERA: Hasselblad H6D-100c medium format, 85mm lens, f/2.8, shallow depth of field.

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
        disable_safety_checker: true
      }
    });

    // P-Image returns FileOutput object directly
    if (output) {
      const filename = `meera_prunaai_${variant.id}_${Date.now()}.jpeg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      // Try to get URL first, then direct write
      let imageUrl;
      if (typeof output.url === 'function') {
        imageUrl = output.url();
      } else if (typeof output === 'string') {
        imageUrl = output;
      }

      if (imageUrl && imageUrl.startsWith('http')) {
        const response = await fetch(imageUrl);
        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(filepath, buffer);
      } else {
        await writeFile(filepath, output);
      }

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
║   🎨 PRUNA AI P-IMAGE - MEERA MAX INTIMATE COLLECTION 🎨                     ║
║                                                                              ║
║   Model: prunaai/p-image (Replicate)                                         ║
║   Safety Filter: DISABLED                                                    ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera (38D-27-40)                                   ║
║   ${VARIANTS.length} Minimalist Coverage Sensuous Variants                               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: Pruna AI P-Image\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 12s...`);
      await new Promise(r => setTimeout(r, 12000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 PRUNA AI P-IMAGE COLLECTION COMPLETE 🎨                          ║
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
      collection: 'Pruna AI P-Image - Meera Max Intimate',
      model: MODEL,
      safetyFilter: 'disabled',
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
