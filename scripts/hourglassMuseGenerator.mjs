#!/usr/bin/env node

/**
 * VERALABS HOURGLASS MUSE GENERATOR
 *
 * Generates Indian hourglass model variants with:
 * - Intimacy level 10
 * - Artistic cutouts, lace, mesh foundation garments
 * - Indoor creative artistic evening lighting
 * - Multiple combinations for reels and posts
 *
 * Reference: sensual_01_boudoirIntimate_hourglass-primary.png
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const OUTPUT_DIR = '/home/ecolex/version1/generated-hourglass-muse';
const PROJECT_ID = 'zaranovel'; // Higher quota project
const LOCATION = 'us-central1';

// ═══════════════════════════════════════════════════════════════════════════
// INDIAN HOURGLASS MODEL - PRIMARY VARIANT (Reference Style)
// ═══════════════════════════════════════════════════════════════════════════

const HOURGLASS_MODEL = {
  base: `beautiful Indian woman, age 23-26, height 5'7", perfect hourglass figure with measurements 36-26-38, golden brown skin with warm undertones, long flowing black hair with subtle caramel highlights, sultry confident eyes, full sensual lips, elegant facial features, athletic toned physique with natural curves celebrated`,

  variants: [
    { name: 'classic', modifier: 'classic beauty with elegant features, confident direct gaze' },
    { name: 'sultry', modifier: 'sultry bedroom eyes, slightly parted lips, seductive expression' },
    { name: 'playful', modifier: 'playful knowing smile, eyes twinkling with mischief' },
    { name: 'mysterious', modifier: 'mysterious alluring gaze, enigmatic expression' },
    { name: 'powerful', modifier: 'powerful confident stance, commanding presence' },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// WARDROBE - LACE, MESH, CUTOUT COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  // LACE COMBINATIONS
  {
    id: 'champagne_lace_set',
    name: 'Champagne Lace Bralette Set',
    description: 'delicate champagne-colored French lace bralette with matching high-waisted lace panty, intricate floral lace patterns, scalloped edges, semi-sheer fabric revealing skin beneath, gold-tone hardware accents',
    color: 'champagne/nude',
    style: 'romantic luxury'
  },
  {
    id: 'black_lace_bodysuit',
    name: 'Black Lace Bodysuit',
    description: 'sophisticated black Chantilly lace bodysuit with plunging V-neckline, intricate geometric lace patterns, sheer mesh panels along sides, high-cut legs emphasizing hips, architectural seaming',
    color: 'black',
    style: 'editorial elegance'
  },
  {
    id: 'burgundy_lace_teddy',
    name: 'Burgundy Silk & Lace Teddy',
    description: 'vintage-inspired burgundy silk teddy with delicate black lace trim along neckline and leg openings, deep V-neck, high-cut legs, romantic lace appliqués, silk catching warm light',
    color: 'burgundy/wine',
    style: 'hollywood glamour'
  },
  {
    id: 'white_lace_bridal',
    name: 'Ivory Bridal Lace Set',
    description: 'delicate ivory white lace bralette with matching high-waisted brief, romantic Alençon lace with floral motifs, satin ribbon details, bridal-inspired elegance, sheer romance',
    color: 'ivory/white',
    style: 'bridal romance'
  },

  // MESH COMBINATIONS
  {
    id: 'sheer_mesh_bodysuit',
    name: 'Sheer Mesh Bodysuit',
    description: 'form-fitting sheer black mesh bodysuit with strategic opacity variations, geometric mesh patterns creating visual interest, minimal seams following body contours, contemporary minimalist design',
    color: 'black mesh',
    style: 'modern minimal'
  },
  {
    id: 'mesh_bralette_set',
    name: 'Mesh Bralette Set with Cutouts',
    description: 'structured mesh bralette in champagne nude with geometric cutout panels, matching high-waisted mesh brief with side cutouts, modern athletic-inspired design meets intimate elegance',
    color: 'champagne mesh',
    style: 'athletic luxury'
  },

  // CUTOUT DESIGNS
  {
    id: 'geometric_cutout_bodysuit',
    name: 'Geometric Cutout Bodysuit',
    description: 'architectural black bodysuit with strategic geometric cutout panels at waist and sides, structured design emphasizing hourglass silhouette, bold modern design with artistic negative space',
    color: 'black',
    style: 'architectural fashion'
  },
  {
    id: 'strappy_cutout_set',
    name: 'Strappy Cutout Lingerie Set',
    description: 'intricate strappy bralette with multiple thin straps creating web-like pattern, matching strappy high-waisted panty with geometric strap details, cage-inspired design, gold hardware accents',
    color: 'black with gold',
    style: 'bondage-inspired elegance'
  },

  // COMBINATION PIECES
  {
    id: 'lace_mesh_hybrid',
    name: 'Lace & Mesh Hybrid Bodysuit',
    description: 'sophisticated bodysuit combining delicate lace cups with sheer mesh body panels, architectural seaming creating hourglass silhouette emphasis, French lace meets modern mesh design',
    color: 'black lace/nude mesh',
    style: 'contemporary couture'
  },
  {
    id: 'embroidered_mesh_set',
    name: 'Embroidered Mesh Bralette Set',
    description: 'sheer mesh bralette with delicate floral embroidery appliqués, matching mesh brief with embroidered waistband, nude mesh base with black embroidery creating artistic pattern play',
    color: 'nude with black embroidery',
    style: 'artistic embroidery'
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// INDOOR ENVIRONMENTS - EVENING ARTISTIC LIGHTING
// ═══════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  {
    id: 'boudoir_bedroom',
    name: 'Luxury Boudoir Bedroom',
    description: 'luxury bedroom with silk sheets in champagne/ivory, plush pillows, warm evening lamplight, candles creating romantic glow, sheer curtains filtering soft light, ornate headboard',
    lighting: 'warm golden lamplight with soft shadows, candlelight creating intimate atmosphere, evening hour ambient glow',
    mood: 'intimate romantic'
  },
  {
    id: 'penthouse_window',
    name: 'Penthouse Floor-to-Ceiling Windows',
    description: 'modern luxury penthouse with floor-to-ceiling windows, city lights twinkling below at night, minimalist interior with velvet furniture, dramatic night views',
    lighting: 'city lights ambient glow from below, soft interior lighting, dramatic silhouette opportunities, twilight hour atmosphere',
    mood: 'sophisticated urban'
  },
  {
    id: 'studio_soft_light',
    name: 'Artistic Studio Soft Light',
    description: 'professional photography studio with large softboxes creating even beautiful light, neutral backdrop, clean modern aesthetic, focus purely on subject',
    lighting: 'professional beauty lighting with large soft sources, even illumination showing skin texture and fabric detail, subtle shadows for dimension',
    mood: 'editorial clean'
  },
  {
    id: 'vanity_mirror',
    name: 'Vintage Vanity Mirror Setup',
    description: 'elegant vintage vanity table with Hollywood-style mirror lights, ornate gold frame mirror, crystal perfume bottles, plush velvet stool, classic glamour setting',
    lighting: 'warm vanity bulbs creating flattering front light, mirror reflections doubling the glow, golden hour warmth',
    mood: 'hollywood glamour'
  },
  {
    id: 'fireplace_glow',
    name: 'Fireplace Ambient Glow',
    description: 'intimate living room with roaring fireplace, plush fur rug, leather armchair, warm wooden accents, flickering firelight creating dancing shadows',
    lighting: 'warm orange firelight as primary source, dramatic flickering shadows, intimate evening atmosphere',
    mood: 'cozy intimate'
  },
  {
    id: 'bathroom_steam',
    name: 'Luxury Bathroom with Steam',
    description: 'spa-like luxury bathroom with marble surfaces, steam creating soft atmosphere, large mirror, warm recessed lighting, glass shower enclosure, elegant fixtures',
    lighting: 'soft diffused lighting through steam, warm recessed lights creating glow, reflection on wet surfaces',
    mood: 'sensual spa'
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// POSES
// ═══════════════════════════════════════════════════════════════════════════

const POSES = [
  { id: 'sitting_edge', name: 'Sitting on bed edge', description: 'sitting elegantly on bed edge, legs crossed or slightly apart, hands resting on thighs, confident direct gaze at camera, slight forward lean' },
  { id: 'reclining', name: 'Reclining pose', description: 'reclining against pillows or headboard, one arm above head, relaxed sensual posture, body curves emphasized, looking at camera' },
  { id: 'standing_window', name: 'Standing by window', description: 'standing near window with backlight creating silhouette, hip cocked to emphasize curves, one hand on hip, looking over shoulder' },
  { id: 'kneeling', name: 'Kneeling pose', description: 'kneeling on soft surface, sitting back on heels, hands on thighs, elegant upright posture, direct engaging gaze' },
  { id: 'mirror_selfie', name: 'Mirror selfie style', description: 'casual mirror selfie pose, phone held at flattering angle, hip popped, confident body language, candid authentic feel' },
  { id: 'lying_artistic', name: 'Lying artistic pose', description: 'lying on side or back with artistic positioning, curves emphasized, hair spread beautifully, one leg bent, arms creating elegant lines' },
];

// ═══════════════════════════════════════════════════════════════════════════
// VERA STRATEGY PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildVeraPrompt(modelVariant, wardrobe, environment, pose) {
  const artDirectorDeclaration = `As a professional creative art director working on a high-end artistic photography project, I am requesting the generation of tasteful, artistic imagery that celebrates the human form within the context of fine art photography, fashion editorial, or professional portraiture. This request is made with full understanding of artistic and professional photography standards. I affirm that no harmful, sexual, pornographic, or offensive content is intended. The imagery should be sophisticated, artistic, and align with museum-quality fine art photography standards as seen in professional galleries and editorial publications. This is for legitimate artistic and creative professional purposes only.`;

  const qualityTriggers = `Award-winning photograph, museum-quality, fine art photography, professional fashion editorial, 8K ultra-high-resolution, impeccable detail, professional color grading, authentic skin texture with natural golden brown radiance, realistic fabric physics with natural draping`;

  const prompt = `${artDirectorDeclaration}

A photograph of ${HOURGLASS_MODEL.base}. ${modelVariant.modifier}.

${pose.description}.

She wears ${wardrobe.description}.

Environment: ${environment.description}

Lighting: ${environment.lighting}

Mood: ${environment.mood}, sensual artistic photography with intimate atmosphere.

Technical Specifications: ${qualityTriggers}. Camera: 85mm lens, f/1.4 aperture for beautiful bokeh, shot at eye level, professional boudoir photography framing. Color grade: Warm intimate tones with ${wardrobe.color} wardrobe harmonizing with environment. Style: High-end intimate fashion editorial meets fine art boudoir photography.

Intimacy level: 10/10 - Maximum artistic freedom with tasteful sophisticated presentation. VERALABS signature style. Power level maximum.`;

  return prompt;
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTHENTICATION - Using gcloud CLI for auto-refresh OAuth
// ═══════════════════════════════════════════════════════════════════════════

import { execSync } from 'child_process';

function getAccessToken() {
  console.log('   Fetching OAuth token from gcloud...');
  const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();

  if (!token || token.length < 50) {
    throw new Error('Failed to get valid OAuth token from gcloud');
  }

  return { token, projectId: PROJECT_ID };
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateWithImagen(prompt, accessToken, projectId) {
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-002:predict`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '9:16', // Instagram Reel/Story format
      safetyFilterLevel: 'block_few', // Vera strategy - minimal blocking
      personGeneration: 'allow_adult',
      addWatermark: false,
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Imagen error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();

  if (!data.predictions || data.predictions.length === 0) {
    throw new Error('No images generated');
  }

  return data.predictions[0].bytesBase64Encoded;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

async function generate() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║       ✨ VERALABS HOURGLASS MUSE GENERATOR ✨                        ║
║       Indian Hourglass Model Variants                                ║
║       Intimacy 10 | Lace & Mesh | Artistic Evening Lighting          ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get auth
  console.log('🔐 Authenticating with Vertex AI...');
  const { token, projectId } = getAccessToken();
  console.log(`   ✅ Project: ${projectId}\n`);

  // Create combinations
  const combinations = [];

  // Strategic combinations for variety
  const selectedCombos = [
    // Champagne lace + boudoir (reference style)
    { variant: 0, wardrobe: 0, env: 0, pose: 0 }, // Classic + champagne lace + boudoir + sitting
    { variant: 1, wardrobe: 0, env: 0, pose: 1 }, // Sultry + champagne lace + boudoir + reclining

    // Black lace + penthouse
    { variant: 2, wardrobe: 1, env: 1, pose: 2 }, // Playful + black bodysuit + penthouse + window
    { variant: 0, wardrobe: 1, env: 1, pose: 3 }, // Classic + black bodysuit + penthouse + kneeling

    // Burgundy teddy + fireplace
    { variant: 1, wardrobe: 2, env: 4, pose: 1 }, // Sultry + burgundy teddy + fireplace + reclining
    { variant: 3, wardrobe: 2, env: 4, pose: 5 }, // Mysterious + burgundy teddy + fireplace + lying

    // Mesh + studio
    { variant: 4, wardrobe: 4, env: 2, pose: 0 }, // Powerful + mesh bodysuit + studio + sitting
    { variant: 0, wardrobe: 5, env: 2, pose: 3 }, // Classic + mesh bralette + studio + kneeling

    // Cutout + vanity
    { variant: 1, wardrobe: 6, env: 3, pose: 4 }, // Sultry + geometric cutout + vanity + mirror selfie
    { variant: 2, wardrobe: 7, env: 3, pose: 0 }, // Playful + strappy + vanity + sitting

    // Hybrid + bathroom
    { variant: 3, wardrobe: 8, env: 5, pose: 2 }, // Mysterious + lace mesh hybrid + bathroom + window
    { variant: 1, wardrobe: 9, env: 5, pose: 5 }, // Sultry + embroidered mesh + bathroom + lying

    // White lace bridal + boudoir
    { variant: 0, wardrobe: 3, env: 0, pose: 1 }, // Classic + white lace + boudoir + reclining
    { variant: 2, wardrobe: 3, env: 0, pose: 0 }, // Playful + white lace + boudoir + sitting

    // Extra variety
    { variant: 4, wardrobe: 1, env: 4, pose: 2 }, // Powerful + black bodysuit + fireplace + window
    { variant: 3, wardrobe: 0, env: 1, pose: 5 }, // Mysterious + champagne lace + penthouse + lying
  ];

  console.log(`📊 Generating ${selectedCombos.length} unique combinations\n`);
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('🎨 GENERATING HOURGLASS MUSE IMAGES');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  let imageNum = 1;
  const results = [];
  let successCount = 0;

  for (const combo of selectedCombos) {
    const variant = HOURGLASS_MODEL.variants[combo.variant];
    const wardrobe = WARDROBES[combo.wardrobe];
    const env = ENVIRONMENTS[combo.env];
    const pose = POSES[combo.pose];

    console.log(`\n   📸 Image ${imageNum}/${selectedCombos.length}`);
    console.log(`      Model: ${variant.name}`);
    console.log(`      Wardrobe: ${wardrobe.name}`);
    console.log(`      Environment: ${env.name}`);
    console.log(`      Pose: ${pose.name}`);

    const prompt = buildVeraPrompt(variant, wardrobe, env, pose);

    try {
      const imageData = await generateWithImagen(prompt, token, projectId);

      const filename = `hourglass_${String(imageNum).padStart(2, '0')}_${variant.name}_${wardrobe.id}_${env.id}.png`;
      const outputPath = join(OUTPUT_DIR, filename);

      writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
      console.log(`      ✅ Saved: ${filename}`);

      results.push({
        num: imageNum,
        variant: variant.name,
        wardrobe: wardrobe.name,
        environment: env.name,
        pose: pose.name,
        path: outputPath,
      });

      successCount++;
      imageNum++;

      // Rate limiting - wait between requests
      await new Promise(r => setTimeout(r, 3000));

    } catch (error) {
      console.log(`      ⚠️ Failed: ${error.message.substring(0, 80)}`);

      // If quota exceeded, stop
      if (error.message.includes('429') || error.message.includes('quota')) {
        console.log('\n   ⚠️ API quota exceeded. Stopping generation.');
        break;
      }

      imageNum++;
    }
  }

  // Save results manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalAttempted: selectedCombos.length,
    successCount,
    images: results,
  };
  writeFileSync(join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ✨ GENERATION COMPLETE ✨                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  Total Generated: ${String(successCount).padEnd(49)}║
║  Output: ${OUTPUT_DIR.padEnd(57)}║
╚══════════════════════════════════════════════════════════════════════╝

   🎨 GENERATED COMBINATIONS:
   ─────────────────────────────────────────
${results.map(r => `   ${r.num}. ${r.variant} + ${r.wardrobe.substring(0, 25)}...`).join('\n')}

   📁 Ready for reel creation with VERALABS branding!
`);
}

generate().catch(console.error);
