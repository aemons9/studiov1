#!/usr/bin/env node
/**
 * PRUNA AI P-IMAGE - MEERA (FIXED OUTPUT HANDLING)
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

const LOCKED_MEERA = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips. Warm caramel bronze skin with natural golden-amber undertones. Captivating deep brown magnetic eyes with thick dark lashes, full sensual lips, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair. Platinum navel piercing. Confident sensual expression`;

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'single delicate thread only as lower coverage', pose: 'laying on fur throw near fireplace', env: 'cozy mountain cabin' },
  { id: 'bed_chains', coverage: 'gold body chain jewelry only', pose: 'laying on silk bed sheets', env: 'private bedroom' },
  { id: 'penthouse_gossamer', coverage: 'ultra-sheer gossamer mesh bodysuit', pose: 'reclined on velvet chaise', env: 'penthouse at night' },
  { id: 'studio_lace', coverage: 'delicate black lace micro-bralette only', pose: 'artistic floor pose', env: 'fine art studio' },
  { id: 'spa_string', coverage: 'minimal string bikini bottom only', pose: 'laying on side showing curves', env: 'luxury spa' },
  { id: 'boudoir_robe', coverage: 'open silk robe untied', pose: 'back arched on bed', env: 'elegant boudoir' }
];

async function generateImage(variant, index, total) {
  const prompt = `Award-winning fine art boudoir photography. ${LOCKED_MEERA}. ${variant.pose}, ${variant.coverage}, ${variant.env}. Hasselblad medium format, 8K, hyper-realistic, professional lighting.`;

  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        disable_safety_checker: true
      }
    });

    const filename = `meera_prunaai_${variant.id}_${Date.now()}.jpeg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Direct write - P-Image returns FileOutput directly
    await writeFile(filepath, output);

    const size = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
    console.log(`[${new Date().toLocaleTimeString()}]    ✅ ${filename} (${size} MB)`);
    return { variant: variant.id, filename, size, success: true };
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message.substring(0, 80)}`);
    return { variant: variant.id, success: false, error: error.message };
  }
}

async function main() {
  console.log(`\n🎨 PRUNA AI P-IMAGE - MEERA (${VARIANTS.length} variants)\n`);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  const results = [];
  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);
    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ 10s...`);
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  const successful = results.filter(r => r.success);
  console.log(`\n✅ Success: ${successful.length}/${VARIANTS.length} (${((successful.length / VARIANTS.length) * 100).toFixed(0)}%)`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
