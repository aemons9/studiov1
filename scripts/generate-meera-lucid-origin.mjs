#!/usr/bin/env node
/**
 * MEERA LUCID ORIGIN GENERATION SCRIPT
 * =====================================
 * Leonardo AI Lucid Origin - Artistic high-quality visuals with improved prompt adherence
 *
 * Model: leonardoai/lucid-origin
 * Features: style presets, contrast control, ultra generation mode
 *
 * LOCKED MUSE: Meera - Indian Fit Hourglass Model
 * - Age: 27
 * - Measurements: 38D-27-40
 * - Height: 5'9"
 * - Hair: Long flowing jet-black
 * - Skin: Golden bronze luminous
 * - Eyes: Deep brown with dramatic lashes
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Configuration
const OUTPUT_DIR = './generated-lucid-origin-meera';
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error('❌ REPLICATE_API_TOKEN environment variable required');
  process.exit(1);
}

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA LOCKED MUSE DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_BASE = `Stunning Indian fine-art model (age 27, measurements 38D-27-40, height 5'9", fit hourglass figure with dramatic curves, long flowing jet-black hair with silk sheen, deep brown almond eyes with dramatic lashes, golden bronze luminous skin, sculpted defined waist, confident sensual presence)`;

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT VARIANTS - Different Intimacy Levels & Wardrobe Themes
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_PROMPTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 7 - ELEGANT LINGERIE EDITORIAL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Champagne Silk Boudoir",
    intimacy: 7,
    style: "fashion",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Luxury penthouse boudoir with floor-to-ceiling windows, champagne silk drapes, antique vanity mirror, warm ambient lighting. LIGHTING: Golden hour window light streaming through sheer curtains, soft diffused warmth wrapping around curves. WARDROBE: Elegant champagne silk camisole with delicate French lace trim, matching high-waisted silk shorts, bare feet. POSE: Seated at vanity mirror, one leg crossed over the other, looking over shoulder with confident knowing smile, hair cascading down back. MOOD: Intimate luxury, private elegance. PHOTOGRAPHY STYLE: Helmut Newton meets Irving Penn, dramatic shadows, classical composition. Shot with Hasselblad X2D, 85mm portrait lens, natural color science.`
  },
  {
    name: "Midnight Lace Study",
    intimacy: 7,
    style: "moody",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Private master bedroom, king-sized bed with charcoal silk sheets, single shaft of moonlight through window. LIGHTING: Dramatic chiaroscuro, moonlight creating sculptural shadows on curves, Rembrandt-quality light modeling. WARDROBE: Black French lace bodysuit with intricate floral patterns, sheer mesh panels, elegant coverage celebrating form. POSE: Reclining on bed, one arm above head, body creating elegant S-curve, direct confident gaze at camera. MOOD: Mysterious midnight intimacy. PHOTOGRAPHY STYLE: Caravaggio lighting, fine art nude tradition. Shot with Phase One IQ4, 110mm lens, museum-quality detail.`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 8 - BODY LACE & FOUNDATION ARTISTIC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Architectural Bodylace",
    intimacy: 8,
    style: "fashion",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Minimalist white studio space with geometric shadows, architectural clean lines, floating marble platform. LIGHTING: Dramatic rim lighting from behind creating body silhouette, soft fill from front, every curve sculpted by light. WARDROBE: Avant-garde architectural bodylace in ivory, geometric cutout patterns, strategic mesh panels, high-fashion foundation structure celebrating 38D-27-40 proportions. POSE: Standing contrapposto, weight on one leg creating natural hip tilt, arms creating elegant lines, expression of artistic confidence. MOOD: High fashion meets fine art sculpture. PHOTOGRAPHY STYLE: Richard Avedon minimalism, Irving Penn precision. Shot with Hasselblad, 80mm lens, 8K detail.`
  },
  {
    name: "Velvet Foundation Suite",
    intimacy: 8,
    style: "cinematic",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Luxurious velvet boudoir in deep burgundy, vintage chaise lounge, ornate gold mirror, soft candlelight ambiance. LIGHTING: Warm golden candlelight creating intimate atmosphere, multiple soft sources sculpting hourglass form, skin glowing with luminosity. WARDROBE: Premium foundation suit in blush pink, structured cups with delicate lace overlay, high-waisted shaping brief, garter details, celebrating natural curves with artistic restraint. POSE: Reclining on velvet chaise in classical odalisque pose, body creating sweeping curves from shoulder through hip, one hand resting on thigh, serene confident expression. MOOD: Baroque luxury meets modern sensuality. PHOTOGRAPHY STYLE: Old masters meets Helmut Newton. Shot with Phase One, 85mm, rich tonal depth.`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 9 - AVANT-GARDE INTIMATE ARTISTIC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Neon Noir Lingerie",
    intimacy: 9,
    style: "cinematic",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Underground luxury club private room, black walls, neon magenta and cyan accent lighting, velvet seating, mirrors creating infinite reflections. LIGHTING: Dramatic neon color wash, magenta from left, cyan from right, creating vibrant color contrast on golden bronze skin. WARDROBE: Sheer black mesh teddy with strategic satin panels, delicate straps crossing shoulders, minimal coverage celebrating dramatic hourglass silhouette. POSE: Standing with back against mirror, looking over shoulder at camera, one leg crossed in front, body language confident and commanding. MOOD: Underground glamour, forbidden luxury. PHOTOGRAPHY STYLE: Wong Kar-wai cinematography meets fashion editorial. Shot with Leica SL2, 50mm, cinematic color grading.`
  },
  {
    name: "Shadow Lace Intimate",
    intimacy: 9,
    style: "moody",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Private photography studio, black seamless backdrop, single dramatic spotlight creating pools of light and deep shadow. LIGHTING: Single hard light source from above-left creating dramatic Caravaggio shadows, form emerging from darkness, skin luminous against void. WARDROBE: Minimal black lace bralette with delicate strapping, matching low-rise lace brief, body art quality coverage, emphasis on sculptural form. POSE: Kneeling on black velvet, back arched creating dramatic S-curve, arms framing figure, head tilted back with eyes closed, expression of artistic surrender. MOOD: Fine art intimacy, body as sculpture. PHOTOGRAPHY STYLE: Edward Weston form studies, dramatic chiaroscuro. Shot with Hasselblad X2D, 100mm, 8K museum quality.`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CREATIVE ENVIRONMENTS - VARIED SETTINGS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Tropical Villa Retreat",
    intimacy: 8,
    style: "vibrant",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Luxury Bali villa, infinity pool edge, tropical jungle backdrop, golden sunrise filtering through palm fronds, natural stone and teak wood. LIGHTING: Warm tropical sunrise, golden hour light wrapping around curves, water reflections creating dancing highlights on skin. WARDROBE: Sheer sarong wrap in sunset coral, draped artistically around body, wet from pool, clinging and revealing curves, bikini foundation beneath. POSE: Emerging from infinity pool edge, arms supporting body, water droplets on golden bronze skin, hair slicked back, expression of serene pleasure. MOOD: Paradise luxury, natural sensuality. PHOTOGRAPHY STYLE: Slim Aarons meets Sports Illustrated. Shot with Sony A1, 70-200mm, vibrant tropical color science.`
  },
  {
    name: "Rooftop City Lights",
    intimacy: 8,
    style: "cinematic",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Mumbai high-rise penthouse rooftop, 40th floor, city lights sprawling below, modern furniture, vertical garden, cool night breeze. LIGHTING: City light pollution creating ambient glow, apartment interior warm spill, subtle rim light from behind, metropolitan magic hour. WARDROBE: Floor-length sheer robe in midnight blue with silver thread, flowing in breeze, elegant black lace foundation visible beneath, high fashion architecture. POSE: Standing at glass railing, silhouette against city lights, wind billowing robe, profile emphasized showing dramatic curves, expression contemplative and powerful. MOOD: Urban goddess, metropolitan romance. PHOTOGRAPHY STYLE: Dramatic shadows, cinematic wide composition. Shot with RED Komodo, anamorphic lens, cinematic color grade.`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARTISTIC EXPERIMENTAL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Crystal Prism Studio",
    intimacy: 8,
    style: "creative",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Experimental art studio, crystal prisms creating rainbow light fragments, geometric mirrors, white cyclorama with colored light projections. LIGHTING: Prismatic rainbow light fragments dancing across golden bronze skin, creating abstract color patterns, experimental light sculpture. WARDROBE: Avant-garde transparent crystalline bodysuit, iridescent material catching and refracting light, minimal coverage with maximum artistic impact, body as canvas for light. POSE: Contemporary dance movement frozen, arms extended creating geometric shapes, body twisted showing dramatic curves from multiple angles, expression of artistic ecstasy. MOOD: Experimental art, body as light sculpture. PHOTOGRAPHY STYLE: Nick Knight innovation meets fine art. Shot with Hasselblad, 80mm, maximum color saturation.`
  },
  {
    name: "Classical Marble Study",
    intimacy: 9,
    style: "monochrome",
    prompt: `Professional Fine Art Photography of ${MEERA_BASE}. LOCATION: Classical sculpture gallery, white marble columns, ancient Greek statues, diffused natural light from skylights, timeless museum atmosphere. LIGHTING: Soft diffused north light from gallery skylights, form modeled like marble sculpture, every curve defined by gentle gradation from highlight to shadow. WARDROBE: Minimal draping of white silk fabric, classical Greek style, fabric falling from one shoulder, strategic coverage through natural fabric physics, body as living sculpture. POSE: Standing in classical contrapposto beside marble Venus, mimicking goddess pose, weight shift creating elegant hip tilt, expression serene and timeless. MOOD: Living sculpture, classical beauty. PHOTOGRAPHY STYLE: Edward Weston meets Mapplethorpe, monochrome elegance. Shot with Phase One, 110mm, black and white conversion.`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SIMPLE DIRECT PROMPTS (Testing Prompt Adherence)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Simple Boudoir Portrait",
    intimacy: 7,
    style: "portrait",
    prompt: `photorealistic portrait of ${MEERA_BASE} wearing elegant black lace lingerie set, reclining on white silk sheets, soft natural window light, intimate bedroom setting, professional fine art photography, shot on Hasselblad X2D`
  },
  {
    name: "Simple Fashion Editorial",
    intimacy: 7,
    style: "fashion",
    prompt: `high fashion editorial photograph of ${MEERA_BASE} wearing sheer mesh bodysuit with strategic coverage, standing in minimalist white studio, dramatic side lighting, professional model pose, shot on Phase One IQ4 150MP`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(promptConfig, index) {
  const { name, intimacy, style, prompt } = promptConfig;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎨 [${index + 1}/${MEERA_PROMPTS.length}] ${name}`);
  console.log(`   Intimacy Level: ${intimacy}`);
  console.log(`   Style: ${style}`);
  console.log(`${'═'.repeat(70)}`);

  try {
    const input = {
      prompt: prompt,
      style: style || 'fashion',
      contrast: 'medium',
      num_images: 1,
      aspect_ratio: '3:4',  // Portrait orientation
      prompt_enhance: false, // Keep exact prompt for adherence
      generation_mode: 'ultra' // Maximum quality
    };

    console.log('🚀 Calling leonardoai/lucid-origin...');
    const startTime = Date.now();

    const output = await replicate.run("leonardoai/lucid-origin", { input });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`⏱️  Generation completed in ${duration}s`);

    if (output && output[0]) {
      // Create filename
      const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `meera-lucid-${safeName}-level${intimacy}-${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      // Write file
      await writeFile(filepath, output[0]);
      console.log(`✅ SUCCESS: ${filename}`);

      // Get URL if available
      if (typeof output[0].url === 'function') {
        console.log(`   URL: ${output[0].url()}`);
      }

      return { success: true, filename, name, intimacy };
    } else {
      console.log('⚠️  No output returned');
      return { success: false, name, intimacy, error: 'No output' };
    }

  } catch (error) {
    console.error(`❌ FAILED: ${error.message}`);
    return { success: false, name, intimacy, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║           MEERA LUCID ORIGIN - LEONARDO AI GENERATION SERIES                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  Model: leonardoai/lucid-origin                                              ║
║  Mode: Ultra Quality                                                         ║
║  Locked Muse: Meera (Indian, 38D-27-40, 5'9", Golden Bronze)                ║
║  Intimacy Range: 7-9                                                         ║
║  Themes: Lingerie, Bodylace, Foundation, Avant-Garde                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  const results = [];

  for (let i = 0; i < MEERA_PROMPTS.length; i++) {
    const result = await generateImage(MEERA_PROMPTS[i], i);
    results.push(result);

    // Small delay between requests
    if (i < MEERA_PROMPTS.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('📊 GENERATION SUMMARY');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  console.log(`📈 Success Rate: ${((successful.length / results.length) * 100).toFixed(0)}%`);

  if (failed.length > 0) {
    console.log('\n❌ Failed generations:');
    failed.forEach(f => console.log(`   - ${f.name}: ${f.error}`));
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);

  // Save manifest
  const manifest = {
    model: 'leonardoai/lucid-origin',
    muse: 'Meera - Indian Fit Hourglass',
    generated: new Date().toISOString(),
    results: results
  };

  await writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

main().catch(console.error);
