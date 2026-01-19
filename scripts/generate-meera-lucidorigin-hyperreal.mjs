#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 LUCID ORIGIN - MEERA HYPER-REALISTIC COLLECTION 🎨                      ║
 * ║                                                                              ║
 * ║   Model: leonardoai/lucid-origin (Replicate)                                 ║
 * ║   ENHANCED REALISM + CORRECT DETAIL OPTIMIZATION                             ║
 * ║   Auto-Adaptive Max-Skilled Engine v2                                        ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-lucidorigin-hyperreal';
const REPLICATE_API_TOKEN = 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 HYPER-REALISTIC MEERA - OPTIMIZED FOR MAXIMUM PHOTOREALISM
// ═══════════════════════════════════════════════════════════════════════════════

const HYPERREAL_MEERA = `photorealistic portrait of stunning 27-year-old Indian woman, 5'9" tall, athletic toned physique with elegant feminine curves, natural hourglass silhouette. Warm caramel bronze skin with visible pores and natural skin texture, subtle freckles on shoulders. Deep brown almond-shaped eyes with natural eye reflections, full natural lips, high cheekbones, straight elegant nose with small gold nose stud. Long jet-black hair with natural shine and flyaway strands. Natural beauty with minimal makeup, authentic confident expression`;

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-REALISTIC COVERAGE OPTIONS - FASHION EDITORIAL LANGUAGE
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  threadFoundation: `wearing ultra-delicate single-thread avant-garde foundation piece in nude tone, architectural minimal construction, designer haute couture`,

  goldChainJewelry: `adorned with fine 18k gold body chain jewelry, delicate chains draped across collarbones and torso, luxury jewelry as artistic adornment`,

  sheerMeshBodysuit: `wearing sheer champagne mesh bodysuit with visible weave texture, second-skin fit, fashion editorial minimalism`,

  silkTulleWrap: `wrapped in smoke-grey silk tulle, semi-transparent fabric with natural drape and folds, ethereal coverage`,

  crystalMeshGown: `wearing crystalline micro-mesh slip in silver, delicate threads catching light, runway fashion minimal`,

  ivorySheerPanel: `draped with single ivory sheer silk panel, flowing translucent fabric, renaissance art reference`,

  blackLaceBodice: `wearing delicate black French Chantilly lace bodice, intricate floral lacework, luxury lingerie editorial`,

  champagneSilkRobe: `wearing untied champagne silk robe falling off shoulders, luxurious fabric with natural sheen, intimate morning aesthetic`,

  pearlBodyDrape: `adorned with cascading freshwater pearl strands, lustrous pearls as artistic body jewelry, elegant fine art aesthetic`,

  velvetBralette: `wearing deep burgundy velvet micro-bralette, rich fabric texture, intimate luxury aesthetic`
};

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-REALISTIC POSES - NATURAL BODY LANGUAGE
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = {
  chaiseRecline: `reclining on velvet chaise longue, natural relaxed S-curve, one arm resting on hip, legs slightly bent, authentic lounging pose`,

  bedMorning: `laying on rumpled white linen bed, morning stretch pose, arms above head, natural body positioning, authentic waking moment`,

  firesideRelax: `laying on cream sheepskin near fireplace, warm golden light on skin, relaxed side pose, contemplative expression`,

  windowGaze: `standing near floor-to-ceiling window, natural light silhouette, weight on one hip, looking over shoulder`,

  floorArt: `artistic floor pose on white backdrop, body creating natural curves, one knee bent, arm supporting torso`,

  mirrorReflection: `seated before vintage mirror, three-quarter view, natural posture, introspective moment captured`,

  sofaLounge: `lounging on leather sofa arm, legs crossed, leaning back, confident relaxed posture`,

  balconyDawn: `standing on balcony at dawn, golden hour light, wind in hair, natural standing pose`
};

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-REALISTIC ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  cabin: `rustic wooden cabin with exposed beams, crackling fireplace, warm pine walls, soft fur throws, cozy mountain retreat`,

  penthouse: `modern penthouse with floor-to-ceiling windows, nighttime city skyline, minimalist luxury interior`,

  boudoir: `Victorian boudoir with burgundy velvet drapes, ornate gold mirror, candlelit warm ambiance`,

  bedroom: `sunlit bedroom with white linen bedding, morning light through sheer curtains, peaceful sanctuary`,

  studio: `professional photography studio, large softbox lighting, clean white cyclorama backdrop`,

  loft: `industrial loft with exposed brick, large windows, warm afternoon light, bohemian aesthetic`,

  spa: `luxury spa suite with white marble, steam rising, candles, tranquil wellness atmosphere`,

  terrace: `rooftop terrace at golden hour, city views, warm sunset light, sophisticated outdoor setting`
};

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-REALISTIC VARIANTS - 10 OPTIMIZED COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'threadFoundation', pose: 'firesideRelax', env: 'cabin', intimacy: 10, style: 'moody' },
  { id: 'bed_gold', coverage: 'goldChainJewelry', pose: 'bedMorning', env: 'bedroom', intimacy: '10+', style: 'fashion' },
  { id: 'penthouse_mesh', coverage: 'sheerMeshBodysuit', pose: 'windowGaze', env: 'penthouse', intimacy: 10, style: 'cinematic' },
  { id: 'boudoir_velvet', coverage: 'velvetBralette', pose: 'mirrorReflection', env: 'boudoir', intimacy: 9, style: 'moody' },
  { id: 'studio_crystal', coverage: 'crystalMeshGown', pose: 'floorArt', env: 'studio', intimacy: 10, style: 'fashion' },
  { id: 'loft_sheer', coverage: 'ivorySheerPanel', pose: 'chaiseRecline', env: 'loft', intimacy: 9, style: 'portrait' },
  { id: 'bedroom_lace', coverage: 'blackLaceBodice', pose: 'bedMorning', env: 'bedroom', intimacy: '10+', style: 'fashion' },
  { id: 'spa_tulle', coverage: 'silkTulleWrap', pose: 'sofaLounge', env: 'spa', intimacy: 9, style: 'cinematic' },
  { id: 'terrace_robe', coverage: 'champagneSilkRobe', pose: 'balconyDawn', env: 'terrace', intimacy: 10, style: 'cinematic' },
  { id: 'boudoir_pearls', coverage: 'pearlBodyDrape', pose: 'chaiseRecline', env: 'boudoir', intimacy: '10+', style: 'fashion' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-REALISTIC PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  // Optimized for maximum photorealism - direct language
  return `Award-winning ${HYPERREAL_MEERA}, ${pose}, in ${env}, ${coverage}. Professional photography with natural window light mixed with subtle fill, authentic skin texture with visible pores, natural hair detail with individual strands, realistic fabric texture and drape. Shot on Hasselblad X2D 100C with 85mm f/1.4 lens, shallow depth of field, natural color grading, no artificial smoothing. 8K photorealistic fine art photography.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DOWNLOAD HELPER - HANDLES ALL OUTPUT TYPES
// ═══════════════════════════════════════════════════════════════════════════════

async function downloadOutput(output) {
  let imageUrl;

  // Handle different output types from Replicate
  if (Array.isArray(output) && output.length > 0) {
    const item = output[0];
    if (typeof item === 'string' && item.startsWith('http')) {
      imageUrl = item;
    } else if (item && typeof item === 'object') {
      // FileOutput object - try to get URL
      if (item.url && typeof item.url === 'function') {
        imageUrl = item.url();
      } else if (item.url && typeof item.url === 'string') {
        imageUrl = item.url;
      } else if (item.href) {
        imageUrl = item.href;
      } else {
        // Try to convert to string
        imageUrl = String(item);
        if (!imageUrl.startsWith('http')) {
          return null;
        }
      }
    }
  } else if (typeof output === 'string' && output.startsWith('http')) {
    imageUrl = output;
  }

  if (!imageUrl || !imageUrl.startsWith('http')) {
    return null;
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-ADAPTIVE GENERATION ENGINE v2
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Coverage: ${variant.coverage} | Pose: ${variant.pose}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Intimacy: ${variant.intimacy} | Style: ${variant.style}`);

  // Style cascade
  const styles = [variant.style, 'fashion', 'moody', 'cinematic', 'portrait']
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, 4);

  for (const style of styles) {
    console.log(`[${new Date().toLocaleTimeString()}]    🎭 Style: ${style}`);

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

      const imageData = await downloadOutput(output);

      if (imageData) {
        const filename = `meera_hyperreal_${variant.id}_${style}_${Date.now()}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        fs.writeFileSync(filepath, imageData);
        const size = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);

        console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);
        return { variant: variant.id, filename, size, style, intimacy: variant.intimacy, success: true };
      } else {
        console.log(`[${new Date().toLocaleTimeString()}]    ⚠️ No valid image data`);
      }
    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ ${style}: ${error.message.substring(0, 50)}`);

      if (error.message.includes('429')) {
        await new Promise(r => setTimeout(r, 6000));
      }
    }

    await new Promise(r => setTimeout(r, 2500));
  }

  return { variant: variant.id, success: false, intimacy: variant.intimacy };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎨 LUCID ORIGIN - MEERA HYPER-REALISTIC COLLECTION 🎨                      ║
║                                                                              ║
║   Model: leonardoai/lucid-origin                                             ║
║   Engine: Auto-Adaptive Max-Skilled v2                                       ║
║   Focus: MAXIMUM PHOTOREALISM + CORRECT DETAILS                              ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera - Hyper-Realistic Fashion                     ║
║   ${VARIANTS.length} Variants (Intimacy 9 to 10+)                                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  console.log(`[${new Date().toLocaleTimeString()}] 🚀 Starting Hyper-Realistic Generation\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 4s...`);
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 HYPER-REALISTIC COLLECTION COMPLETE 🎨                           ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successful.length}/${VARIANTS.length}
  📊 Rate: ${((successful.length / VARIANTS.length) * 100).toFixed(0)}%
`);

  if (successful.length > 0) {
    console.log(`  GENERATED:`);
    successful.forEach(r => console.log(`     🎨 ${r.variant} (Int ${r.intimacy}, ${r.style}) - ${r.size} MB`));
  }

  if (failed.length > 0) {
    console.log(`\n  FAILED:`);
    failed.forEach(r => console.log(`     ❌ ${r.variant} (Int ${r.intimacy})`));
  }

  console.log(`\n  📁 Output: ${OUTPUT_DIR}`);

  // Save manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Lucid Origin - Meera Hyper-Realistic',
      model: 'leonardoai/lucid-origin',
      focus: 'Maximum Photorealism + Correct Details',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: VARIANTS.length, successful: successful.length }
    }, null, 2)
  );
}

main().catch(console.error);
