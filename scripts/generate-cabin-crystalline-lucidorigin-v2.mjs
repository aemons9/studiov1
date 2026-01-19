#!/usr/bin/env node
/**
 * CABIN CRYSTALLINE EXCLUSIVE - LUCID ORIGIN V2
 * Simplified prompts optimized for Lucid Origin's format requirements
 * Short, direct, photorealistic descriptions that work
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = './generated-cabin-crystalline';
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL';

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// SIMPLIFIED PROMPTS - Short, direct format that works with Lucid Origin
// Each prompt under 400 characters
// ═══════════════════════════════════════════════════════════════════════════════

const CABIN_SCENES = [
  // WOODEN FLOOR SERIES
  {
    name: 'Golden Floor Recline',
    style: 'fashion',
    prompt: `photorealistic fashion photography of stunning Indian woman (age 27, elegant hourglass silhouette, golden-bronze skin, flowing black hair) wearing honey gold silk two-piece, reclining on cream sheepskin rug in warm wooden cabin, firelight creating golden glow on skin, shot on Hasselblad X2D`
  },
  {
    name: 'Cream Lace Morning',
    style: 'portrait',
    prompt: `photorealistic portrait of beautiful Indian model (age 26, graceful figure, warm bronze complexion, long dark hair) wearing delicate cream French lace, stretching on wooden cabin floor in soft morning light, intimate private atmosphere, shot on Phase One IQ4`
  },

  // BED CHAMBER SERIES
  {
    name: 'White Crystalline Bed',
    style: 'moody',
    prompt: `photorealistic fine art photo of Indian fashion model (age 27, elegant proportions, luminous golden skin, jet-black hair) in white crystalline mesh on white linen bed in wooden cabin, soft ambient Edison bulb lighting, dreamy intimate mood, Hasselblad medium format`
  },
  {
    name: 'Ivory Silk Whisper',
    style: 'cinematic',
    prompt: `cinematic photography of stunning Indian woman (age 26, classical silhouette, bronze complexion, flowing black hair) wearing ivory silk slip on cabin bed with cream pillows, soft window light, intimate private chamber atmosphere, shot on Leica SL2`
  },

  // LEATHER SOFA SERIES
  {
    name: 'Cognac Sofa Elegance',
    style: 'fashion',
    prompt: `high fashion photography of beautiful Indian model (age 27, graceful figure, warm golden skin, dark wavy hair) wearing cognac brown lace set matching leather Chesterfield sofa in cabin, warm firelight glow, luxurious intimate setting, Phase One camera`
  },
  {
    name: 'Cashmere Lounge',
    style: 'portrait',
    prompt: `photorealistic portrait of Indian fashion model (age 26, elegant form, bronze complexion, long black hair) draped in cream cashmere on leather sofa in wooden cabin, warm ambient lighting, sophisticated private lounge atmosphere, Hasselblad X2D`
  },

  // WOODEN TABLE SERIES
  {
    name: 'Natural Table Scene',
    style: 'creative',
    prompt: `creative fashion photography of stunning Indian woman (age 27, classical proportions, golden-bronze skin, flowing dark hair) in nude tone mesh bodysuit seated on rustic wooden table in cabin, morning window light, natural intimate breakfast scene, medium format`
  },
  {
    name: 'Caramel Silk Table',
    style: 'cinematic',
    prompt: `cinematic fine art photo of beautiful Indian model (age 26, graceful silhouette, warm bronze skin, jet-black hair) wearing caramel silk slip perched on wooden table in cabin, candlelight and window light, warm golden atmosphere, Leica camera`
  },

  // COPPER TUB SERIES
  {
    name: 'Copper Tub Steam',
    style: 'moody',
    prompt: `moody fine art photography of Indian fashion model (age 27, elegant form, luminous bronze skin, dark wet hair) in freestanding copper bathtub in wooden cabin, steam rising, candlelight creating warm glow, private bathing ritual atmosphere, Hasselblad`
  },
  {
    name: 'Copper Silk Bath',
    style: 'vibrant',
    prompt: `vibrant photography of stunning Indian woman (age 26, classical proportions, golden skin with water droplets, black hair) with copper-rose silk draped over copper tub edge in cabin, warm sunset light through window, luxurious spa atmosphere, Phase One`
  },

  // ARTISTIC SERIES
  {
    name: 'Firelight Silhouette',
    style: 'monochrome',
    prompt: `dramatic black and white photography of Indian model (age 27, elegant silhouette, bronze skin, flowing hair) standing before fireplace in cabin wearing sheer black robe, dramatic rim lighting from flames, artistic fine art portrait, medium format camera`
  },
  {
    name: 'Window Morning Light',
    style: 'portrait',
    prompt: `photorealistic portrait of beautiful Indian woman (age 26, graceful figure, warm golden complexion, tousled black hair) in white cotton shirt on cabin bed facing large window, soft natural morning light wrapping around form, contemplative intimate mood, Hasselblad`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

async function generateScene(scene, index) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✦ [${index + 1}/${CABIN_SCENES.length}] ${scene.name}`);
  console.log(`  Style: ${scene.style}`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`\n📝 Prompt (${scene.prompt.length} chars):`);
  console.log(scene.prompt.substring(0, 200) + '...\n');

  // Style cascade
  const styles = [scene.style, 'fashion', 'portrait', 'cinematic'].filter((s, i, a) => a.indexOf(s) === i).slice(0, 3);

  for (const style of styles) {
    console.log(`🎭 Trying style: ${style}`);

    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: {
          prompt: scene.prompt,
          style: style,
          contrast: 'medium',
          aspect_ratio: '3:4',
          generation_mode: 'ultra',
          prompt_enhance: false,
          num_images: 1
        }
      });

      if (output && output[0]) {
        const safeName = scene.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const filename = `cabin-${safeName}-${style}-${Date.now()}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        await writeFile(filepath, output[0]);
        console.log(`✅ SUCCESS: ${filename}`);

        return { success: true, filename, scene: scene.name, style };
      }
    } catch (error) {
      console.log(`❌ Style "${style}" failed: ${error.message.substring(0, 80)}`);

      if (error.message.includes('429')) {
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    await new Promise(r => setTimeout(r, 2000));
  }

  return { success: false, scene: scene.name };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   CABIN CRYSTALLINE EXCLUSIVE - LUCID ORIGIN V2 (SIMPLIFIED)                 ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Model: leonardoai/lucid-origin                                             ║
║   Format: Short direct prompts (<400 chars) optimized for success            ║
║   Scenes: ${CABIN_SCENES.length} Unique Compositions                                             ║
║   Surfaces: Floor, Bed, Sofa, Table, Copper Tub                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < CABIN_SCENES.length; i++) {
    const result = await generateScene(CABIN_SCENES[i], i);
    results.push(result);

    if (i < CABIN_SCENES.length - 1) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n${'═'.repeat(70)}`);
  console.log('✦ GENERATION COMPLETE ✦');
  console.log(`${'═'.repeat(70)}`);
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  console.log(`📈 Success Rate: ${((successful.length / results.length) * 100).toFixed(0)}%`);

  if (successful.length > 0) {
    console.log('\n✅ Generated:');
    successful.forEach(s => console.log(`   - ${s.filename}`));
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
