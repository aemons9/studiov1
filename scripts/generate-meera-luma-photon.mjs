#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 LUMA PHOTON - MEERA CREATIVE ARTISTIC COLLECTION 🎨                     ║
 * ║                                                                              ║
 * ║   Model: luma/photon (Replicate)                                             ║
 * ║   LOCKED MUSE: Meera (38D-27-40) - Creative High Quality Artistic           ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-luma-photon';
const MODEL = "luma/photon";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 LOCKED MEERA MUSE (Proven working format)
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_MEERA = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally fit curvaceous hourglass figure (38D-27-40) with warm golden-brown caramel skin with natural glow, captivating deep brown eyes with thick dark lashes, full lips with natural color, long flowing black hair styled beautifully, authentic natural beauty with no artificial enhancement, confident relaxed expression`;

// ═══════════════════════════════════════════════════════════════════════════════
// CREATIVE ARTISTIC VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  {
    id: 'amber_boudoir_velvet',
    pose: 'Fully reclined on caramel velvet chaise with body in languid flow, spine gently arched, one arm extended above head with fingers in hair, other hand on hip, head tilted back with sultry half-lidded gaze',
    hair: 'jet black long flowing waves with subtle volume, elegant and natural',
    wardrobe: 'avant-garde garment held in place by tension straps at the hips, for conceptual art, with crystal fringe accents catching warm amber light',
    environment: 'Luxurious private amber-toned boudoir chamber with warm honey-gold walls, ornate brass candelabras with flickering amber pillar candles, caramel velvet chaise with silk cushions',
    aspectRatio: '3:4'
  },
  {
    id: 'moonlit_terrace_silk',
    pose: 'Standing in classical contrapposto, weight shifted to one hip creating dramatic S-curve, one hand behind head, other tracing hip, profile illuminated by moonlight',
    hair: 'jet black flowing waves cascading over shoulders',
    wardrobe: 'gossamer silk wrap in champagne, barely there sheer fabric draped artistically, catching moonlight',
    environment: 'Penthouse terrace at midnight with full moon, city skyline glittering below, warm ambient uplighting, luxurious outdoor lounge',
    aspectRatio: '3:4'
  },
  {
    id: 'firelight_cabin_fur',
    pose: 'Lying on soft fur throw near crackling fireplace, body creating elegant S-curve, one leg bent, head propped on hand, warm firelight dancing on bronze skin',
    hair: 'jet black tousled waves, natural and sensual',
    wardrobe: 'delicate gold body chains draped across curves, thin metallic strands catching firelight',
    environment: 'Cozy mountain cabin with stone fireplace, warm crackling fire, soft fur throws, pine log walls, intimate golden glow',
    aspectRatio: '3:4'
  },
  {
    id: 'studio_sculptural_thread',
    pose: 'Artistic kneeling pose in profile, back dramatically arched, arms raised behind head creating sculptural silhouette, museum-quality figure study',
    hair: 'jet black sleek waves pulled to one side',
    wardrobe: 'single delicate thread as avant-garde lower coverage, artistic body adornment for conceptual fine art',
    environment: 'Minimalist fine art photography studio, soft diffused light from large windows, clean white backdrop, professional artistic setting',
    aspectRatio: '3:4'
  },
  {
    id: 'venetian_candlelight_lace',
    pose: 'Semi-reclined on ornate daybed, legs elegantly crossed, upper body propped on silk pillows, one shoulder exposed, mysterious gaze',
    hair: 'jet black voluminous waves with golden highlights from candlelight',
    wardrobe: 'delicate black Venetian lace micro-bralette only, intricate lacework barely covering, lower body draped with sheer fabric',
    environment: 'Opulent Venetian palazzo boudoir with antique mirrors, gold-framed art, dozens of flickering candles, deep crimson velvet drapes',
    aspectRatio: '3:4'
  },
  {
    id: 'spa_marble_pearls',
    pose: 'Lying on warm marble surface, body creating graceful curves, one arm behind head, legs artistically positioned, serene contemplative expression',
    hair: 'jet black wet-look waves swept back',
    wardrobe: 'multiple strands of lustrous pearls draped across body, elegant boudoir aesthetic',
    environment: 'Luxury spa suite with white Carrara marble, soft ethereal steam, warm ambient lighting, zen minimalist aesthetic',
    aspectRatio: '3:4'
  },
  {
    id: 'golden_hour_pool',
    pose: 'Standing at edge of infinity pool, back to camera, looking over shoulder sensuously, full silhouette visible against sunset',
    hair: 'jet black flowing waves with golden sunset highlights',
    wardrobe: 'minimal string bikini bottom only, thin strings as sole coverage, bust bare in fine art style',
    environment: 'Private infinity pool at golden hour, warm sunset reflecting on water, panoramic mountain vista, luxury resort ambiance',
    aspectRatio: '3:4'
  },
  {
    id: 'art_deco_crystal',
    pose: 'Standing in dramatic Art Deco pose, one arm raised elegantly, hip tilted, geometric angular positioning, sophisticated glamour',
    hair: 'jet black vintage Hollywood waves',
    wardrobe: 'crystalline spider-web mesh in silver, ultra-fine threads creating geometric pattern, haute couture conceptual',
    environment: 'Art Deco penthouse with black lacquer furniture, chrome accents, geometric mirrors, warm amber spotlights',
    aspectRatio: '3:4'
  },
  {
    id: 'japanese_onsen_mist',
    pose: 'Seated on edge of stone bath, legs in water, torso turned creating elegant lines, arms resting on edge, peaceful meditative expression',
    hair: 'jet black sleek waves pinned up elegantly',
    wardrobe: 'ultra-sheer gossamer wrap in white, fabric like morning mist, barely there coverage',
    environment: 'Private Japanese onsen at dawn, natural stone bath, soft steam rising, bamboo garden visible, warm lantern light',
    aspectRatio: '3:4'
  },
  {
    id: 'noir_shadow_robe',
    pose: 'Standing in doorway backlit, body silhouetted dramatically, one hand on door frame, mysterious film noir aesthetic',
    hair: 'jet black dramatic waves with noir lighting',
    wardrobe: 'open black silk robe untied, falling off shoulders, dramatic shadows concealing and revealing',
    environment: 'Film noir inspired bedroom, strong backlighting through venetian blinds, dramatic shadows, chiaroscuro lighting',
    aspectRatio: '3:4'
  },
  {
    id: 'botanical_garden_gossamer',
    pose: 'Lying among flowers and greenery, body creating natural organic curves, one arm reaching above, ethereal garden nymph aesthetic',
    hair: 'jet black flowing waves with flower petals',
    wardrobe: 'gossamer fabric in champagne, barely there sheer wrap, natural botanical aesthetic',
    environment: 'Private botanical conservatory at golden hour, exotic flowers, soft natural light, warm humid atmosphere',
    aspectRatio: '3:4'
  },
  {
    id: 'moroccan_riad_chains',
    pose: 'Reclining on colorful silk cushions, body in relaxed S-curve, one knee bent, arms positioned elegantly, exotic sensual ambiance',
    hair: 'jet black voluminous waves adorned with gold chains',
    wardrobe: 'multiple gold body chains layered across curves, Moroccan-inspired jewelry as sole coverage',
    environment: 'Luxurious Moroccan riad courtyard, colorful zellige tiles, ornate brass lanterns, silk cushions, warm sunset light',
    aspectRatio: '3:4'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  return `${LOCKED_MEERA}, pose: ${variant.pose}, hair_color: ${variant.hair}, skin_finish: Natural luminous glow with golden undertones, wardrobe: ${variant.wardrobe}, in a ${variant.environment}.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATE
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Aspect: ${variant.aspectRatio}`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        aspect_ratio: variant.aspectRatio,
        image_reference_weight: 0.85,
        style_reference_weight: 0.85
      }
    });

    // Luma Photon returns FileOutput object
    const filename = `meera_photon_${variant.id}_${Date.now()}.jpg`;
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
║   🎨 LUMA PHOTON - MEERA CREATIVE ARTISTIC COLLECTION 🎨                     ║
║                                                                              ║
║   Model: luma/photon (Replicate)                                             ║
║   High Quality • Creative Artistic • Cinematic Lighting                      ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera (38D-27-40)                                   ║
║   ${VARIANTS.length} Creative Artistic Variants                                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: Luma Photon\n`);

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
║          🎨 LUMA PHOTON CREATIVE COLLECTION COMPLETE 🎨                      ║
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
      collection: 'Luma Photon - Meera Creative Artistic',
      model: MODEL,
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
