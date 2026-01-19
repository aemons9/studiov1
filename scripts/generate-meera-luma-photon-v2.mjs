#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 LUMA PHOTON V2 - MEERA ULTRA REALISTIC PHOTOGRAPHY 🎨                   ║
 * ║                                                                              ║
 * ║   Model: luma/photon (Replicate)                                             ║
 * ║   Format: Simple Direct Prompts (Photorealistic Style)                       ║
 * ║   LOCKED MUSE: Meera - Max Intimate Sensuous                                ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-luma-photon-v2';
const MODEL = "luma/photon";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// SIMPLE DIRECT PROMPTS (Following Luma Photon format)
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  {
    id: 'boudoir_velvet_recline',
    prompt: 'photorealistic stunning Indian woman Meera age 27 full body shot 38D-27-40 hourglass figure wearing only delicate gold body chains reclining on velvet chaise in luxury boudoir warm candlelight',
    aspect: '3:4'
  },
  {
    id: 'cabin_firelight_fur',
    prompt: 'photorealistic beautiful curvy Indian woman full body shot laying on fur throw near fireplace wearing sheer gossamer wrap warm firelight on caramel skin intimate cabin setting',
    aspect: '3:4'
  },
  {
    id: 'bedroom_silk_morning',
    prompt: 'photorealistic gorgeous Indian woman Meera full body shot 38D bust 27 inch waist 40 inch hips wearing open silk robe untied on bed with silk sheets morning light private bedroom',
    aspect: '3:4'
  },
  {
    id: 'studio_artistic_kneeling',
    prompt: 'photorealistic stunning Indian model full body shot kneeling pose back arched wearing minimal string coverage fine art photography studio soft diffused lighting',
    aspect: '3:4'
  },
  {
    id: 'spa_marble_pearls',
    prompt: 'photorealistic beautiful Indian woman full body shot laying on marble surface adorned with pearl strands only luxury spa setting warm ambient lighting',
    aspect: '3:4'
  },
  {
    id: 'penthouse_night_gossamer',
    prompt: 'photorealistic stunning curvy Indian woman Meera full body shot standing by window wearing ultra-sheer gossamer bodysuit city lights at night penthouse bedroom',
    aspect: '3:4'
  },
  {
    id: 'pool_sunset_minimal',
    prompt: 'photorealistic gorgeous Indian woman full body shot standing at infinity pool edge wearing minimal string bikini bottom only golden hour sunset backlighting',
    aspect: '3:4'
  },
  {
    id: 'boudoir_lace_seated',
    prompt: 'photorealistic beautiful Indian woman Meera full body shot seated on velvet daybed wearing delicate black lace bralette only warm candlelight boudoir',
    aspect: '3:4'
  },
  {
    id: 'bed_chains_laying',
    prompt: 'photorealistic stunning Indian woman full body shot 38D-27-40 figure laying on silk bed sheets wearing gold chain jewelry only soft lamp glow intimate bedroom',
    aspect: '3:4'
  },
  {
    id: 'studio_thread_standing',
    prompt: 'photorealistic gorgeous curvy Indian model full body shot standing profile view wearing single thread avant-garde coverage professional photography studio clean backdrop',
    aspect: '3:4'
  },
  {
    id: 'terrace_robe_moonlight',
    prompt: 'photorealistic beautiful Indian woman Meera full body shot standing on terrace wearing open flowing robe moonlight on skin city skyline night',
    aspect: '3:4'
  },
  {
    id: 'floor_artistic_crystal',
    prompt: 'photorealistic stunning Indian woman full body shot artistic floor pose wearing crystalline mesh bodysuit soft natural lighting fine art photography',
    aspect: '3:4'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATE
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Prompt: ${variant.prompt.substring(0, 70)}...`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        prompt: variant.prompt,
        aspect_ratio: variant.aspect,
        image_reference_weight: 0.85,
        style_reference_weight: 0.85
      }
    });

    const filename = `meera_photon_v2_${variant.id}_${Date.now()}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    await writeFile(filepath, output);

    const size = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
    console.log(`[${new Date().toLocaleTimeString()}]    ✅ ${filename} (${size} MB)`);
    return { variant: variant.id, filename, size, success: true };
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
║   🎨 LUMA PHOTON V2 - MEERA ULTRA REALISTIC PHOTOGRAPHY 🎨                   ║
║                                                                              ║
║   Model: luma/photon • Format: Simple Direct Prompts                         ║
║   Style: Photorealistic • Full Body Shots                                    ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera (38D-27-40)                                   ║
║   ${VARIANTS.length} Max Intimate Sensuous Variants                                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: Luma Photon (Simple Prompts)\n`);

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
║          🎨 LUMA PHOTON V2 COMPLETE 🎨                                       ║
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
      collection: 'Luma Photon V2 - Meera Ultra Realistic',
      model: MODEL,
      format: 'Simple Direct Prompts',
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
