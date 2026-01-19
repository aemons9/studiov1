#!/usr/bin/env node
/**
 * RENAISSANCE ODALISQUE - Pose Variations with Increased Intimacy
 * Based on successful manual generation - auto-adaptive multi-pose system
 * Target: 6 pose variations at intimacy 9-10+
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const OUTPUT_DIR = './generated-cabin-crystalline';
const REPLICATE_API_TOKEN = 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL';

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// BASE TEMPLATE (from successful manual generation)
// ═══════════════════════════════════════════════════════════════════════════════

const BASE_SUBJECT = `Stunning Indian fashion muse, 5'8" tall, fit athletic sculptural feminine classical proportions with dramatic sculptural natural contours, sun-kissed bronze complexion with natural matte finish, visible form pores and authentic texture, striking Indian features with captivating dark magnetic gaze, full evocative lips, dramatic high cheekbones, long flowing jet-black hair in natural waves, age 26, commanding presence`;

const BASE_LOCATION = `Renaissance-inspired setting with rich velvet draping, dark luxurious backdrop, timeless classical atmosphere`;

const BASE_LIGHTING = `Classical painting lighting with warm golden tones, Rembrandt-style shadows, museum-quality illumination`;

const BASE_WARDROBE_TEMPLATE = (variation) => {
  const wardrobes = {
    minimal: 'Ultra-minimal open-weave textile foundation with delicate gold chain accents, strategic shadow coverage, artistic fabric draping',
    thread: 'Single gossamer thread mesh foundation with gold filigree details, ethereal minimal coverage, artistic shadow play',
    chain: 'Delicate gold body chain lattice as sole adornment, strategic placement creating artistic coverage, sculptural jewelry-as-garment',
    lace: 'Singular French lace thread-work piece with strategic minimal coverage, gossamer transparency, artistic positioning',
    mesh: 'Avant-garde open-mesh foundation in champagne, architectural minimal construction, artistic shadow integration',
    drape: 'Single silk drape in burgundy with strategic minimal coverage, classical sculpture aesthetic, artistic fabric tension'
  };
  return wardrobes[variation] || wardrobes.minimal;
};

// ═══════════════════════════════════════════════════════════════════════════════
// POSE VARIATIONS - Increased intimacy with classical art references
// ═══════════════════════════════════════════════════════════════════════════════

const POSE_VARIATIONS = [
  {
    name: 'Odalisque Recline',
    intimacy: 9,
    pose: 'Classical odalisque-inspired recline, showing full silhouette from side, one arm supporting head, rounded natural contours prominently displayed, elegant S-curve',
    wardrobe: 'minimal',
    style: 'fashion'
  },
  {
    name: 'Venus Awakening',
    intimacy: 10,
    pose: 'Venus-inspired awakening pose, reclining with one knee raised, arms framing face, classical sculpture aesthetic, soft vulnerable expression',
    wardrobe: 'thread',
    style: 'moody'
  },
  {
    name: 'Titian Muse',
    intimacy: '10+',
    pose: 'Titian Venus pose recreation, full recline with gentle twist, one hand near heart, other arm extended, gazing directly at viewer with intimate confidence',
    wardrobe: 'chain',
    style: 'cinematic'
  },
  {
    name: 'Maja Moderne',
    intimacy: 10,
    pose: 'Goya Maja-inspired pose, reclining with both arms behind head, confident direct gaze, elegant body line creating dramatic silhouette',
    wardrobe: 'lace',
    style: 'fashion'
  },
  {
    name: 'Klimt Embrace',
    intimacy: '10+',
    pose: 'Klimt-inspired sensuous curl, body in artistic spiral, arms creating flowing lines, gold accents catching light, intimate private moment',
    wardrobe: 'mesh',
    style: 'moody'
  },
  {
    name: 'Bouguereau Grace',
    intimacy: 9,
    pose: 'Bouguereau nymph pose, seated with gentle twist, one leg extended, classical grace and poise, soft contemplative expression',
    wardrobe: 'drape',
    style: 'portrait'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variation) {
  const wardrobe = BASE_WARDROBE_TEMPLATE(variation.wardrobe);

  return `Professional Fine Art Photography featuring ${BASE_SUBJECT}. LOCATION: ${BASE_LOCATION}. LIGHTING: ${BASE_LIGHTING}. WARDROBE: ${wardrobe}. POSE: ${variation.pose}. MOOD: Intimate artistic atmosphere, evocative and captivating, private fine art session. PHOTOGRAPHY STYLE: Richard Avedon elegance meets classical painting. Shot with Hasselblad X2D 100C, 85mm portrait lens, f/1.4, natural color science, professional retouching maintaining natural texture. 8K museum-quality fine art photography.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-ADAPTIVE GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

async function generatePose(variation, index) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✦ [${index + 1}/${POSE_VARIATIONS.length}] ${variation.name}`);
  console.log(`   Intimacy: ${variation.intimacy} | Wardrobe: ${variation.wardrobe}`);
  console.log(`${'═'.repeat(70)}`);

  const prompt = buildPrompt(variation);
  console.log(`📝 Prompt length: ${prompt.length} chars`);

  // Style cascade based on primary style
  const styles = [variation.style, 'fashion', 'moody', 'cinematic', 'portrait']
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, 4);

  for (const style of styles) {
    console.log(`   🎨 Trying style: ${style}`);

    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: {
          prompt: prompt,
          style: style,
          contrast: 'medium',
          aspect_ratio: '3:4',
          generation_mode: 'ultra',
          prompt_enhance: false,
          num_images: 1
        }
      });

      if (output && output[0]) {
        const safeName = variation.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const filename = `renaissance-${safeName}-int${variation.intimacy}-${style}-${Date.now()}.png`;
        const filepath = `${OUTPUT_DIR}/${filename}`;

        await writeFile(filepath, output[0]);
        console.log(`   ✅ SUCCESS: ${filename}`);

        return {
          success: true,
          filename,
          name: variation.name,
          intimacy: variation.intimacy,
          style
        };
      }
    } catch (error) {
      console.log(`   ❌ ${style}: ${error.message.substring(0, 60)}`);

      if (error.message.includes('429')) {
        console.log('      Rate limited, waiting 6s...');
        await new Promise(r => setTimeout(r, 6000));
      }
    }

    await new Promise(r => setTimeout(r, 2500));
  }

  return { success: false, name: variation.name, intimacy: variation.intimacy };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   RENAISSANCE ODALISQUE - Pose Variations (Auto-Adaptive)                   ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Base: Successful manual generation template                                ║
║   Poses: 6 classical art-inspired variations                                 ║
║   Intimacy: 9 to 10+ with minimal artistic coverage                          ║
║   Wardrobes: minimal, thread, chain, lace, mesh, drape                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < POSE_VARIATIONS.length; i++) {
    const result = await generatePose(POSE_VARIATIONS[i], i);
    results.push(result);

    if (i < POSE_VARIATIONS.length - 1) {
      console.log(`\n   ⏳ Next pose in 4s...`);
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n${'═'.repeat(70)}`);
  console.log('✦ RENAISSANCE POSE VARIATIONS COMPLETE ✦');
  console.log(`${'═'.repeat(70)}`);
  console.log(`✅ Generated: ${successful.length}/${results.length}`);
  console.log(`📈 Success Rate: ${((successful.length / results.length) * 100).toFixed(0)}%`);

  if (successful.length > 0) {
    console.log('\n📸 Generated Images:');
    successful.forEach(s => {
      console.log(`   ${s.name} (Int ${s.intimacy}): ${s.filename}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed:');
    failed.forEach(f => console.log(`   ${f.name} (Int ${f.intimacy})`));
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
