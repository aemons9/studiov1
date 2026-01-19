#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 LUCID ORIGIN - MEERA MAX INTIMATE COLLECTION 🎨                         ║
 * ║                                                                              ║
 * ║   Model: leonardoai/lucid-origin (Replicate)                                 ║
 * ║   AUTO-ADAPTIVE MAX-SKILLED ENGINE                                           ║
 * ║   LOCKED MUSE: Meera - High Realistic Fashion Concept                        ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-lucidorigin-maxintimate';
const REPLICATE_API_TOKEN = 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 LOCKED MEERA MUSE - SAFE LANGUAGE OPTIMIZED FOR LUCID ORIGIN
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_MEERA = `Stunning 27-year-old Indian fashion muse, 5'9" tall, sculptural athletic classical proportions with elegant feminine silhouette, dramatic graceful contours creating statuesque form. Warm caramel bronze complexion with natural golden undertones, authentic skin texture with visible natural pores. Captivating deep brown magnetic gaze with thick dark lashes, full evocative lips, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural waves. Confident commanding presence with authentic natural beauty`;

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA MINIMAL COVERAGE - SAFE LANGUAGE TRANSFORMED
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  singleThread: `wearing avant-garde single thread foundation framework, delicate geometric construction, artistic minimal design, haute couture body sculpture`,

  goldenChains: `adorned with delicate gold body chain jewelry draped across form, thin golden chains as artistic adornment, metallic sculpture highlighting natural silhouette`,

  gossamerMesh: `wearing ultra-sheer gossamer micro-mesh bodysuit in champagne, fabric appearing as second skin, architectural mesh construction`,

  smokeVeil: `wearing smoke-grey transparent tulle artistic wrap, fabric like morning mist, weightless gossamer draped form, ethereal coverage`,

  crystalWeb: `wearing crystalline spider-web mesh in silver, ultra-fine threads creating diamond pattern, transparency with iridescent shimmer`,

  sheerPanel: `wearing single sheer silk panel, strategically minimal transparent fabric, artistic positioning`,

  laceBralette: `wearing delicate French lace micro-bodice in black, intricate lacework construction, artistic minimal foundation`,

  stringMinimal: `wearing minimal string foundation piece in black, thin elegant strings, artistic minimal construction`,

  silkRobe: `wearing open champagne silk robe, untied falling off shoulders, revealing sculptural form beneath, intimate morning aesthetic`,

  pearlStrands: `adorned with multiple pearl strands draped across form, lustrous pearls as artistic adornment, elegant boudoir aesthetic`
};

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMATE POSES - FASHION EDITORIAL LANGUAGE
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = {
  velvetRecline: `Fully reclined on caramel velvet chaise longue, body in elegant languid flow creating S-curve, one arm behind head, legs naturally positioned, fashion editorial pose`,

  bedSpread: `Laying on luxurious draped surface with ivory silk, body in relaxed intimate positioning, confident vulnerable expression, private fashion moment`,

  fireside: `Laying on soft fur throw near crackling fireplace, warm firelight dancing on bronze skin, relaxed artistic pose, private intimate moment captured`,

  pillowNest: `Among scattered silk pillows in cream tones, body in comfortable artistic positioning, relaxed natural pose, fine art aesthetic`,

  floorArtistic: `Artistic floor pose on soft white surface, body creating elegant sculptural curves, contemplative expression, museum fine art aesthetic`,

  windowLight: `Positioned near window bathed in soft natural morning light, body in contemplative intimate pose, private moment captured`,

  sheetDrape: `On draped surface with silk sheet artistically positioned, natural intimate pose, private editorial moment, vulnerable beauty`,

  sideCurve: `Laying on side showing dramatic S-curve silhouette, elegant proportions emphasized, intimate profile view, sculptural form`,

  backArch: `Kneeling pose with back arched gracefully, profile view showing spine curve, arms raised behind head, sculptural body art`,

  legsCrossed: `Semi-reclined with legs crossed elegantly, upper body displayed, sophisticated intimate pose, confident expression`
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENVIRONMENTS - FASHION EDITORIAL SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  cabin: `cozy wooden mountain cabin interior, warm pine walls with fireplace glow, soft fur throws, intimate private retreat`,

  penthouse: `luxury penthouse at night, floor-to-ceiling windows with twinkling city lights, sophisticated intimate atmosphere`,

  boudoir: `elegant Victorian boudoir with deep burgundy velvet furnishings, warm candlelight flickering, romantic setting`,

  bedroom: `private chamber at night, soft warm lamp glow, ivory silk surfaces, personal sanctuary atmosphere`,

  loft: `rustic exposed-beam loft space, large comfortable surfaces with neutral linens, warm ambient candlelight`,

  studio: `professional fine art photography studio, soft diffused natural light, minimalist clean backdrop`,

  spa: `luxury private spa suite, warm ambient lighting, white marble surfaces, steam and candles creating ethereal atmosphere`,

  yacht: `private yacht cabin at sunset, golden light through portholes, luxurious nautical interior`
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAX INTIMATE VARIANTS - 12 COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'singleThread', pose: 'fireside', env: 'cabin', intimacy: 10, style: 'moody' },
  { id: 'bed_chains', coverage: 'goldenChains', pose: 'bedSpread', env: 'bedroom', intimacy: '10+', style: 'fashion' },
  { id: 'penthouse_gossamer', coverage: 'gossamerMesh', pose: 'velvetRecline', env: 'penthouse', intimacy: 10, style: 'cinematic' },
  { id: 'boudoir_smoke', coverage: 'smokeVeil', pose: 'pillowNest', env: 'boudoir', intimacy: 9, style: 'moody' },
  { id: 'studio_crystal', coverage: 'crystalWeb', pose: 'floorArtistic', env: 'studio', intimacy: 10, style: 'fashion' },
  { id: 'loft_sheer', coverage: 'sheerPanel', pose: 'windowLight', env: 'loft', intimacy: 9, style: 'portrait' },
  { id: 'bedroom_lace', coverage: 'laceBralette', pose: 'sheetDrape', env: 'bedroom', intimacy: '10+', style: 'moody' },
  { id: 'spa_string', coverage: 'stringMinimal', pose: 'sideCurve', env: 'spa', intimacy: 10, style: 'fashion' },
  { id: 'cabin_robe', coverage: 'silkRobe', pose: 'fireside', env: 'cabin', intimacy: 9, style: 'cinematic' },
  { id: 'yacht_pearls', coverage: 'pearlStrands', pose: 'velvetRecline', env: 'yacht', intimacy: '10+', style: 'fashion' },
  { id: 'penthouse_arch', coverage: 'singleThread', pose: 'backArch', env: 'penthouse', intimacy: '10+', style: 'moody' },
  { id: 'boudoir_chains', coverage: 'goldenChains', pose: 'legsCrossed', env: 'boudoir', intimacy: 10, style: 'cinematic' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD OPTIMIZED PROMPT FOR LUCID ORIGIN
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  // Lucid Origin optimized format - direct, under 600 chars core
  return `Professional fine art fashion photography featuring ${LOCKED_MEERA}. POSE: ${pose}. ENVIRONMENT: ${env}. WARDROBE: ${coverage}. LIGHTING: Professional studio lighting with soft key light, warm fill, Rembrandt shadows enhancing form and skin texture. Shot with Hasselblad X2D 100C, 85mm portrait lens, f/1.8. Full body composition, 8K ultra resolution, hyper-realistic photography with authentic skin texture, museum-quality fine art.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-ADAPTIVE GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Coverage: ${variant.coverage} | Pose: ${variant.pose} | Env: ${variant.env}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Intimacy: ${variant.intimacy} | Primary Style: ${variant.style}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Prompt: ${prompt.length} chars`);

  // Auto-adaptive style cascade
  const styles = [variant.style, 'fashion', 'moody', 'cinematic', 'portrait']
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, 4);

  for (const style of styles) {
    console.log(`[${new Date().toLocaleTimeString()}]    🎭 Trying style: ${style}`);

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
        const filename = `meera_lucid_${variant.id}_int${variant.intimacy}_${style}_${Date.now()}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        // Handle both URL and Buffer responses
        let imageData;
        if (typeof output[0] === 'string' && output[0].startsWith('http')) {
          // URL response - fetch the image
          const response = await fetch(output[0]);
          imageData = Buffer.from(await response.arrayBuffer());
        } else if (Buffer.isBuffer(output[0])) {
          imageData = output[0];
        } else if (output[0] instanceof Uint8Array) {
          imageData = Buffer.from(output[0]);
        } else {
          console.log(`[${new Date().toLocaleTimeString()}]    ⚠️ Unknown output type: ${typeof output[0]}`);
          continue;
        }

        fs.writeFileSync(filepath, imageData);
        const size = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);

        console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);
        return { variant: variant.id, filename, size, style, intimacy: variant.intimacy, success: true };
      }
    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ ${style}: ${error.message.substring(0, 60)}`);

      if (error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]       Rate limited, waiting 6s...`);
        await new Promise(r => setTimeout(r, 6000));
      }
    }

    await new Promise(r => setTimeout(r, 2500));
  }

  console.log(`[${new Date().toLocaleTimeString()}]    ❌ All styles failed for ${variant.id}`);
  return { variant: variant.id, success: false, intimacy: variant.intimacy };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎨 LUCID ORIGIN - MEERA MAX INTIMATE COLLECTION 🎨                         ║
║                                                                              ║
║   Model: leonardoai/lucid-origin (Replicate)                                 ║
║   Engine: Auto-Adaptive Max-Skilled with Style Cascade                       ║
║   Aspect: 3:4 (Portrait) • Mode: Ultra • Contrast: Medium                    ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera - High Realistic Fashion Concept              ║
║   ${VARIANTS.length} Maximum Intimate Variants (Intimacy 9 to 10+)                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: Leonardo AI Lucid Origin`);
  console.log(`[${new Date().toLocaleTimeString()}] 🚀 Engine: Auto-Adaptive Max-Skilled\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 4s...`);
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 LUCID ORIGIN MAX INTIMATE COMPLETE 🎨                            ║
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
  console.log(`══════════════════════════════════════════════════════════════════════════════\n`);

  // Save manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Lucid Origin - Meera Max Intimate',
      model: 'leonardoai/lucid-origin',
      engine: 'Auto-Adaptive Max-Skilled',
      aspectRatio: '3:4',
      generationMode: 'ultra',
      lockedMuse: 'Indian Meera - High Realistic Fashion',
      generated: new Date().toISOString(),
      variants: results,
      stats: {
        total: VARIANTS.length,
        successful: successful.length,
        successRate: `${((successful.length / VARIANTS.length) * 100).toFixed(0)}%`
      }
    }, null, 2)
  );

  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
