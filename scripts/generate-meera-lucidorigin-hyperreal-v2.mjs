#!/usr/bin/env node
/**
 * LUCID ORIGIN - MEERA HYPER-REALISTIC v2
 * Correct FileOutput handling + Maximum photorealism
 */

import Replicate from "replicate";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-lucidorigin-hyperreal';
const replicate = new Replicate({ auth: 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL' });

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Hyper-realistic Meera
const MEERA = `photorealistic portrait of stunning 27-year-old Indian woman, 5'9" tall, athletic toned physique with elegant feminine curves, natural hourglass silhouette. Warm caramel bronze skin with visible pores and natural skin texture. Deep brown almond-shaped eyes, full natural lips, high cheekbones, elegant nose with small gold nose stud. Long jet-black hair with natural shine. Authentic confident expression`;

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'ultra-delicate single-thread avant-garde foundation in nude', pose: 'laying on cream sheepskin near fireplace', env: 'rustic wooden cabin with crackling fire', style: 'moody', int: 10 },
  { id: 'bed_chains', coverage: 'fine 18k gold body chain jewelry draped across torso', pose: 'morning stretch on rumpled white sheets', env: 'sunlit bedroom with sheer curtains', style: 'fashion', int: '10+' },
  { id: 'penthouse_mesh', coverage: 'sheer champagne mesh bodysuit with visible weave', pose: 'standing at floor-to-ceiling window', env: 'modern penthouse at night with city lights', style: 'cinematic', int: 10 },
  { id: 'boudoir_velvet', coverage: 'deep burgundy velvet micro-bralette', pose: 'seated before vintage ornate mirror', env: 'Victorian boudoir with candlelight', style: 'moody', int: 9 },
  { id: 'studio_crystal', coverage: 'crystalline micro-mesh slip catching light', pose: 'artistic floor pose creating elegant curves', env: 'professional studio with soft diffused light', style: 'fashion', int: 10 },
  { id: 'loft_ivory', coverage: 'single ivory sheer silk panel draped artistically', pose: 'reclining on velvet chaise', env: 'industrial loft with warm afternoon light', style: 'portrait', int: 9 },
  { id: 'bedroom_lace', coverage: 'black French Chantilly lace bodice', pose: 'laying on white linen bed', env: 'private bedroom with soft lamp glow', style: 'fashion', int: '10+' },
  { id: 'spa_tulle', coverage: 'smoke-grey silk tulle wrap', pose: 'lounging on marble bench', env: 'luxury spa with candles and steam', style: 'cinematic', int: 9 },
  { id: 'terrace_robe', coverage: 'untied champagne silk robe falling off shoulders', pose: 'standing on balcony at dawn', env: 'rooftop terrace with golden hour light', style: 'cinematic', int: 10 },
  { id: 'boudoir_pearls', coverage: 'cascading freshwater pearl strands as body jewelry', pose: 'reclining on velvet settee', env: 'elegant boudoir with burgundy drapes', style: 'fashion', int: '10+' }
];

async function downloadImage(fileOutput) {
  // FileOutput converts to URL via String()
  const url = String(fileOutput);
  if (!url.startsWith('http')) return null;
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

async function generate(v, idx) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`[${idx + 1}/${VARIANTS.length}] ${v.id} | Int ${v.int}`);

  const prompt = `${MEERA}, ${v.pose}, in ${v.env}, wearing ${v.coverage}. Professional photography with natural light, authentic skin texture with visible pores, realistic fabric texture. Shot on Hasselblad X2D 100C, 85mm f/1.4, 8K photorealistic fine art.`;

  const styles = [v.style, 'fashion', 'moody', 'cinematic', 'portrait'].filter((s,i,a) => a.indexOf(s) === i).slice(0,4);

  for (const style of styles) {
    console.log(`  🎭 ${style}...`);
    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: { prompt, style, contrast: 'medium', aspect_ratio: '3:4', generation_mode: 'ultra', prompt_enhance: false, num_images: 1 }
      });

      if (output?.[0]) {
        const imageData = await downloadImage(output[0]);
        if (imageData) {
          const filename = `meera_hyperreal_${v.id}_${style}_${Date.now()}.png`;
          fs.writeFileSync(path.join(OUTPUT_DIR, filename), imageData);
          const size = (imageData.length / 1024 / 1024).toFixed(2);
          console.log(`  ✅ ${filename} (${size} MB)`);
          return { ...v, filename, size, style, success: true };
        }
      }
    } catch (e) {
      console.log(`  ❌ ${e.message.substring(0, 50)}`);
      if (e.message.includes('429')) await new Promise(r => setTimeout(r, 6000));
    }
    await new Promise(r => setTimeout(r, 2500));
  }
  return { ...v, success: false };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 LUCID ORIGIN - MEERA HYPER-REALISTIC v2                                ║
║   Maximum Photorealism • Correct Detail Optimization                         ║
║   ${VARIANTS.length} Variants (Intimacy 9 to 10+)                                            ║
╚══════════════════════════════════════════════════════════════════════════════╝`);

  const results = [];
  for (let i = 0; i < VARIANTS.length; i++) {
    results.push(await generate(VARIANTS[i], i));
    if (i < VARIANTS.length - 1) await new Promise(r => setTimeout(r, 4000));
  }

  const ok = results.filter(r => r.success);
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ ${ok.length}/${VARIANTS.length} (${((ok.length/VARIANTS.length)*100).toFixed(0)}%)`);
  ok.forEach(r => console.log(`  📸 ${r.filename}`));
  console.log(`📁 ${OUTPUT_DIR}`);

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify({ results, generated: new Date().toISOString() }, null, 2));
}

main().catch(console.error);
