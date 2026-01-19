#!/usr/bin/env node
/**
 * MEERA MAX INTIMACY POSES - Lucid Origin
 * New poses, maximum intimacy, focus on anatomical correctness
 * No disfigurement - quality-focused prompts
 */

import Replicate from "replicate";
import fs from "fs";

const OUTPUT_DIR = './generated-meera-lucidorigin-hyperreal';
const replicate = new Replicate({ auth: 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL' });

// Anatomically correct Meera - emphasis on proper proportions
const MEERA = `photorealistic portrait of beautiful 27-year-old Indian woman, 5'9" tall with naturally proportioned athletic feminine figure, deep warm dusky brown skin with coffee undertones and visible pores, deep brown almond eyes with natural catchlights, full natural lips, high cheekbones, small diamond nose stud, long flowing jet-black hair with natural shine, platinum navel piercing with diamond, gold anklet, anatomically correct proportions, natural human body`;

// New intimate poses - anatomically focused
const POSES = [
  { id: 'odalisque_full', desc: 'classical odalisque full recline on side, head propped on hand, natural body curve, legs slightly bent, relaxed authentic positioning' },
  { id: 'supine_arms_up', desc: 'laying supine with both arms stretched above head, natural body line, legs together slightly angled, vulnerable open pose' },
  { id: 'seated_twist', desc: 'seated with gentle torso twist looking over shoulder, one leg extended other bent, natural spine curve, elegant positioning' },
  { id: 'prone_gaze', desc: 'laying prone propped on elbows, looking directly at camera, natural back curve, legs bent at knees, intimate eye contact' },
  { id: 'fetal_artistic', desc: 'artistic fetal curl on side, knees drawn up, arms wrapped naturally, vulnerable intimate positioning, hair spread' },
  { id: 'kneeling_back', desc: 'kneeling viewed from behind, head turned in profile, natural spine visible, arms at sides, sculptural back view' },
  { id: 'stretch_diagonal', desc: 'diagonal stretch across surface, one arm extended overhead, opposite leg extended, natural body elongation' },
  { id: 'seated_floor', desc: 'seated on floor with legs to one side, leaning on one arm, other hand in hair, natural relaxed positioning' },
  { id: 'recline_bent_knee', desc: 'reclining on back, one knee bent and raised, arms relaxed at sides, natural intimate positioning' },
  { id: 'side_embrace', desc: 'laying on side in self-embrace, arms crossed over torso, knees slightly bent, introspective intimate pose' },
  { id: 'arch_dramatic', desc: 'dramatic back arch kneeling, head tilted back, arms behind supporting, theatrical artistic pose' },
  { id: 'lotus_modified', desc: 'modified lotus seated pose, hands resting on knees, straight spine, meditative serene expression' }
];

// Max intimacy environments
const ENVIRONMENTS = [
  { id: 'velvet_dark', desc: 'deep black velvet backdrop, single dramatic spotlight, museum fine art atmosphere' },
  { id: 'silk_bed', desc: 'luxurious bed with ivory silk sheets, soft diffused morning light, intimate bedroom' },
  { id: 'fire_glow', desc: 'wooden cabin floor near fireplace, warm orange firelight dancing on skin, cozy intimate' },
  { id: 'marble_bath', desc: 'white marble bathroom, soft steam, warm ambient candlelight, spa luxury' },
  { id: 'penthouse_glass', desc: 'penthouse with floor-to-ceiling windows, nighttime city lights, sophisticated' },
  { id: 'boudoir_rouge', desc: 'Victorian boudoir with deep red velvet, candlelit warm glow, romantic atmosphere' }
];

// Ultra-minimal coverage
const COVERAGE = [
  { id: 'thread_single', desc: 'single gossamer thread draped minimally across form, barely visible, artistic' },
  { id: 'chains_gold', desc: 'delicate 18k gold body chains as sole adornment, catching light beautifully' },
  { id: 'pearls_cascade', desc: 'cascading pearl strands draped artistically across curves' },
  { id: 'mesh_crystal', desc: 'crystalline micro-mesh catching light, spider-web delicate threads' },
  { id: 'nothing_artistic', desc: 'artistic fine art presentation, platinum navel jewelry only, classical nude aesthetic' },
  { id: 'silk_strand', desc: 'single silk strand in champagne draped strategically, ethereal minimal' }
];

// 12 max intimacy combinations
const VARIATIONS = [
  { pose: 0, env: 0, cov: 4, style: 'moody' },      // odalisque + velvet + artistic nude
  { pose: 1, env: 1, cov: 0, style: 'fashion' },    // supine + silk bed + thread
  { pose: 2, env: 2, cov: 1, style: 'cinematic' },  // seated twist + fire + gold chains
  { pose: 3, env: 3, cov: 4, style: 'portrait' },   // prone + marble + artistic
  { pose: 4, env: 0, cov: 2, style: 'moody' },      // fetal + velvet + pearls
  { pose: 5, env: 4, cov: 4, style: 'fashion' },    // kneeling back + penthouse + artistic
  { pose: 6, env: 1, cov: 3, style: 'fashion' },    // stretch + silk bed + crystal mesh
  { pose: 7, env: 5, cov: 1, style: 'cinematic' },  // seated floor + boudoir + gold
  { pose: 8, env: 2, cov: 5, style: 'moody' },      // bent knee + fire + silk strand
  { pose: 9, env: 0, cov: 4, style: 'portrait' },   // side embrace + velvet + artistic
  { pose: 10, env: 5, cov: 0, style: 'cinematic' }, // arch + boudoir + thread
  { pose: 11, env: 3, cov: 2, style: 'fashion' }    // lotus + marble + pearls
];

function buildPrompt(v) {
  const pose = POSES[v.pose];
  const env = ENVIRONMENTS[v.env];
  const cov = COVERAGE[v.cov];

  // Quality-focused prompt with anatomical correctness emphasis
  return `Award-winning fine art photography of ${MEERA}. POSE: ${pose.desc}. ENVIRONMENT: ${env.desc}. COVERAGE: ${cov.desc}. QUALITY: Perfect anatomical proportions, no distortion, correct number of fingers and limbs, natural human anatomy, hyper-realistic skin with visible pores and texture, professional retouching. Shot on Hasselblad X2D 100C, 85mm f/1.4, 8K resolution, museum exhibition quality fine art.`;
}

async function generate(v, idx) {
  const pose = POSES[v.pose];
  const env = ENVIRONMENTS[v.env];
  const cov = COVERAGE[v.cov];

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`[${idx + 1}/${VARIATIONS.length}] ${pose.id} | ${env.id} | ${cov.id}`);

  const prompt = buildPrompt(v);
  const styles = [v.style, 'fashion', 'moody', 'cinematic', 'portrait'].filter((s,i,a) => a.indexOf(s) === i).slice(0,4);

  for (const style of styles) {
    console.log(`  🎭 ${style}...`);
    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: {
          prompt,
          style,
          contrast: 'medium',
          aspect_ratio: '3:4',
          generation_mode: 'ultra',
          prompt_enhance: false,
          num_images: 1
        }
      });

      if (output?.[0]) {
        const url = String(output[0]);
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());
        const filename = `${OUTPUT_DIR}/meera_maxint_${pose.id}_${cov.id}_${style}_${Date.now()}.png`;
        fs.writeFileSync(filename, buffer);
        console.log(`  ✅ ${filename.split('/').pop()} (${(buffer.length/1024/1024).toFixed(2)} MB)`);
        return { id: `${pose.id}_${cov.id}`, filename, style, success: true };
      }
    } catch (e) {
      console.log(`  ❌ ${e.message.substring(0, 50)}`);
      if (e.message.includes('429') || e.message.includes('flagged')) {
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    await new Promise(r => setTimeout(r, 2500));
  }
  return { id: `${pose.id}_${cov.id}`, success: false };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 MEERA MAX INTIMACY POSES - Lucid Origin                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Focus: Maximum intimacy, anatomical correctness, no disfigurement          ║
║   Poses: 12 new intimate variations                                          ║
║   Quality: Perfect proportions, correct anatomy, museum fine art             ║
╚══════════════════════════════════════════════════════════════════════════════╝`);

  const results = [];
  for (let i = 0; i < VARIATIONS.length; i++) {
    results.push(await generate(VARIATIONS[i], i));
    if (i < VARIATIONS.length - 1) await new Promise(r => setTimeout(r, 4000));
  }

  const ok = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ ${ok.length}/${VARIATIONS.length} (${((ok.length/VARIATIONS.length)*100).toFixed(0)}%)`);

  if (ok.length > 0) {
    console.log('\n📸 Generated:');
    ok.forEach(r => console.log(`   ${r.filename.split('/').pop()}`));
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed:');
    failed.forEach(r => console.log(`   ${r.id}`));
  }

  console.log(`\n📁 ${OUTPUT_DIR}`);
}

main().catch(console.error);
