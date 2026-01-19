#!/usr/bin/env node
/**
 * MEERA RAW PROMPT VARIATIONS - Lucid Origin Auto-Adaptive
 * Based on successful raw prompt transformation
 * Multiple pose/environment/coverage variations
 */

import Replicate from "replicate";
import fs from "fs";

const OUTPUT_DIR = './generated-meera-lucidorigin-hyperreal';
const replicate = new Replicate({ auth: 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL' });

// Base Meera - locked hyper-realistic description
const MEERA_BASE = `stunning 27-year-old Indian woman, 5'9" tall, deep warm dusky brown complexion with coffee undertones, sculptural feminine proportions with elegant hourglass curves. Deep dark brown almond-shaped eyes with thick lashes, full natural lips with dusky rose tone, high cheekbones, diamond nose stud. Long flowing jet-black hair with natural shine. Platinum navel jewelry with diamond, gold anklet`;

// Pose variations
const POSES = [
  { id: 'recline_classical', desc: 'reclining in classical artistic pose, arms above head, hair spread flowing across surface, elegant S-curve body positioning' },
  { id: 'side_curve', desc: 'laying on side showing dramatic S-curve silhouette, one arm supporting head, legs in elegant arrangement' },
  { id: 'arch_profile', desc: 'kneeling with back arched gracefully in profile view, arms raised behind head creating sculptural line' },
  { id: 'floor_artistic', desc: 'artistic floor pose, body creating elegant curves, one knee bent, torso slightly lifted' },
  { id: 'chaise_languid', desc: 'languid recline on velvet chaise, one leg extended, other bent, arm draped over edge' },
  { id: 'mirror_gaze', desc: 'seated before vintage mirror, three-quarter view, contemplative pose, natural body positioning' },
  { id: 'window_silhouette', desc: 'standing in window light creating silhouette, weight on one hip, looking over shoulder' },
  { id: 'pillow_nest', desc: 'nestled among silk pillows, relaxed intimate positioning, vulnerable authentic expression' },
  { id: 'stretch_morning', desc: 'morning stretch pose on white sheets, arms above head, back slightly arched, authentic waking moment' },
  { id: 'venus_pose', desc: 'Venus-inspired classical pose, one arm across torso, other supporting, soft vulnerable expression' }
];

// Environment variations
const ENVIRONMENTS = [
  { id: 'black_velvet', desc: 'fine art studio with deep black seamless velvet backdrop, classical artistic atmosphere' },
  { id: 'chiaroscuro', desc: 'Renaissance chiaroscuro setting, single concentrated light source, 70% dramatic shadows, bronze highlights on skin' },
  { id: 'fireplace', desc: 'rustic wooden cabin, warm fireplace glow dancing on skin, cream sheepskin throw' },
  { id: 'penthouse_night', desc: 'modern penthouse at night, floor-to-ceiling windows with city lights, sophisticated ambiance' },
  { id: 'boudoir_candle', desc: 'Victorian boudoir with burgundy velvet, warm candlelight flickering, ornate gold mirror' },
  { id: 'morning_bedroom', desc: 'sunlit bedroom with white linen, soft morning light through sheer curtains' },
  { id: 'marble_spa', desc: 'luxury spa with white marble surfaces, steam and candles, tranquil atmosphere' },
  { id: 'golden_hour', desc: 'rooftop terrace at golden hour, warm sunset light, city skyline backdrop' }
];

// Coverage variations (ultra-minimal artistic)
const COVERAGE = [
  { id: 'gossamer_thread', desc: 'ultra-minimal single gossamer thread draping across form, catching light at edges' },
  { id: 'gold_chains', desc: 'fine 18k gold body chain jewelry as sole adornment, delicate chains catching light' },
  { id: 'pearl_strands', desc: 'cascading freshwater pearl strands draped artistically, lustrous pearls against warm skin' },
  { id: 'crystal_web', desc: 'crystalline micro-mesh in silver catching light, spider-web fine threads' },
  { id: 'silk_whisper', desc: 'single whisper-thin ivory silk panel draped strategically, translucent fabric' },
  { id: 'smoke_tulle', desc: 'smoke-grey tulle wrap like morning mist, ethereal weightless coverage' }
];

// Generate 12 unique combinations
const VARIATIONS = [
  { pose: 0, env: 0, cov: 0, style: 'moody' },      // recline + black velvet + gossamer
  { pose: 1, env: 1, cov: 1, style: 'fashion' },    // side curve + chiaroscuro + gold
  { pose: 2, env: 2, cov: 0, style: 'cinematic' },  // arch + fireplace + gossamer
  { pose: 3, env: 3, cov: 2, style: 'fashion' },    // floor + penthouse + pearls
  { pose: 4, env: 4, cov: 3, style: 'moody' },      // chaise + boudoir + crystal
  { pose: 5, env: 5, cov: 4, style: 'portrait' },   // mirror + morning + silk
  { pose: 6, env: 6, cov: 5, style: 'cinematic' },  // window + spa + tulle
  { pose: 7, env: 7, cov: 1, style: 'fashion' },    // pillow + golden hour + gold
  { pose: 8, env: 5, cov: 0, style: 'fashion' },    // stretch + morning + gossamer
  { pose: 9, env: 1, cov: 2, style: 'moody' },      // venus + chiaroscuro + pearls
  { pose: 0, env: 4, cov: 3, style: 'cinematic' },  // recline + boudoir + crystal
  { pose: 3, env: 0, cov: 4, style: 'fashion' }     // floor + black velvet + silk
];

function buildPrompt(v) {
  const pose = POSES[v.pose];
  const env = ENVIRONMENTS[v.env];
  const cov = COVERAGE[v.cov];

  return `Fine art museum photography of ${MEERA_BASE}. POSE: ${pose.desc}. ENVIRONMENT: ${env.desc}. WARDROBE: ${cov.desc}, platinum navel jewelry visible. SKIN: Hyper-realistic deep warm dusky brown with visible pores, natural micro-texture, bronze highlights where light catches skin, authentic dusky melanin richness. Shot on Hasselblad X2D 100C, 85mm f/1.4, 8K museum exhibition quality.`;
}

async function generate(v, idx) {
  const pose = POSES[v.pose];
  const env = ENVIRONMENTS[v.env];
  const cov = COVERAGE[v.cov];

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`[${idx + 1}/${VARIATIONS.length}] ${pose.id} + ${env.id} + ${cov.id}`);

  const prompt = buildPrompt(v);
  const styles = [v.style, 'fashion', 'moody', 'cinematic', 'portrait'].filter((s,i,a) => a.indexOf(s) === i).slice(0,4);

  for (const style of styles) {
    console.log(`  🎭 ${style}...`);
    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: { prompt, style, contrast: 'high', aspect_ratio: '3:4', generation_mode: 'ultra', prompt_enhance: false, num_images: 1 }
      });

      if (output?.[0]) {
        const url = String(output[0]);
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());
        const filename = `${OUTPUT_DIR}/meera_raw_${pose.id}_${env.id}_${style}_${Date.now()}.png`;
        fs.writeFileSync(filename, buffer);
        console.log(`  ✅ ${filename.split('/').pop()} (${(buffer.length/1024/1024).toFixed(2)} MB)`);
        return { id: `${pose.id}_${env.id}`, filename, style, success: true };
      }
    } catch (e) {
      console.log(`  ❌ ${e.message.substring(0, 50)}`);
      if (e.message.includes('429') || e.message.includes('flagged')) {
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    await new Promise(r => setTimeout(r, 2500));
  }
  return { id: `${pose.id}_${env.id}`, success: false };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 MEERA RAW PROMPT VARIATIONS - Lucid Origin Auto-Adaptive               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Based on: Successful raw prompt transformation                             ║
║   Variations: ${VARIATIONS.length} unique pose/environment/coverage combinations              ║
║   Focus: Deep dusky Indian skin, hyper-realistic, museum fine art            ║
╚══════════════════════════════════════════════════════════════════════════════╝`);

  const results = [];
  for (let i = 0; i < VARIATIONS.length; i++) {
    results.push(await generate(VARIATIONS[i], i));
    if (i < VARIATIONS.length - 1) await new Promise(r => setTimeout(r, 4000));
  }

  const ok = results.filter(r => r.success);
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ ${ok.length}/${VARIATIONS.length} (${((ok.length/VARIATIONS.length)*100).toFixed(0)}%)`);
  ok.forEach(r => console.log(`  📸 ${r.filename.split('/').pop()}`));
  console.log(`📁 ${OUTPUT_DIR}`);
}

main().catch(console.error);
