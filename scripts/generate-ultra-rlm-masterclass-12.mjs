#!/usr/bin/env node

/**
 * ULTRA RLM MASTERCLASS - 12 Premium Image Generation
 *
 * This script generates 12 museum-quality images using the enhanced
 * Ultra RLM Masterclass engine with:
 * - EXACT environment patterns (REALISTIC BACKGROUNDS)
 * - TRUE 10+ minimal coverage wardrobes (NOT simple black covers)
 * - Wardrobe-environment mapping for compatible pairings
 * - Classical art pose references
 *
 * CRITICAL IMPROVEMENTS FROM USER FEEDBACK:
 * - Realistic indoor settings: wooden floor, candles, tub, lamps, bed
 * - Natural environments: caves with light entering from rocks
 * - TRUE 10+ wardrobe: single lace, open framework, mesh lingerie
 * - Shadow as strategic cover, avant-garde artistic designs
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ═══════════════════════════════════════════════════════════════════════════════
// EXACT PATTERNS FROM PROVEN SUCCESSFUL SCRIPTS
// ═══════════════════════════════════════════════════════════════════════════════

const EXACT_ENVIRONMENTS = {
  underground_vip_chamber: `Intimate underground VIP private room setting:
Dark charcoal-gray textured walls with authentic venetian plaster finish,
corner placement with two walls visible at 90-degree angle creating depth,
polished dark concrete floor with subtle reflective sheen,
PLUSH CREAM-WHITE FAUX FUR THROW on floor as primary prop,
warm amber wall sconces (2700K) mounted on walls creating soft ambient glow,
multiple pillar CANDLES placed in background providing romantic accent light,
gray cashmere blanket draped artistically near fur throw,
minimalist industrial-luxe aesthetic with textured surfaces,
deep shadows in corners creating intimate atmosphere`,

  candlelit_chamber: `Dark luxurious private chamber atmosphere:
Rich charcoal-gray venetian plaster walls with subtle texture variation,
multiple ornate brass candelabras with flickering amber candles throughout,
plush cream-white faux fur throw creating soft surface contrast,
silver-gray silk drapery pooled elegantly in background,
polished ebony wooden floor visible at edges,
warm candlelight (2000K) creating dancing highlights across surfaces,
deep baroque shadows in recessed alcoves,
intimate private boudoir atmosphere with romantic warmth`,

  wooden_cabin_fur: `Victorian-modern minimalist wooden cabin sanctuary:
Warm honey-toned knotty pine wood paneled walls with natural grain,
large plush cream-white sheepskin rug on polished wooden floor,
soft morning light filtering through muslin curtains,
Edison bulb pendant providing warm amber accent lighting,
raw wood beam visible crossing ceiling,
natural linen throw draped over vintage leather chair,
aromatic cedar wood accents creating organic warmth,
cozy intimate cabin atmosphere with natural materials`,

  marble_bath_sanctuary: `Opulent Carrara marble bathroom sanctuary:
Deep soaking clawfoot tub filled with milky water and rose petals,
dozens of brass candelabras creating warm golden glow,
white marble walls with subtle gray veining,
plush white towels draped over tub edge,
crystal chandelier reflection in water,
steam rising creating atmospheric haze,
luxurious spa atmosphere with romantic warmth`,

  natural_cave_intimate: `Secluded natural cave sanctuary:
Smooth weathered limestone cave walls with natural texture,
soft golden light entering through rock openings above,
natural pool of crystal clear water reflecting cave formations,
smooth flat rock surface with soft moss patches,
delicate stalactites catching filtered light,
white linen draped over natural rock formation,
dappled sunlight creating natural spotlight effect,
primordial intimate atmosphere with organic beauty`,

  penthouse_golden_hour: `Ultra-luxury penthouse suite at golden hour:
Floor-to-ceiling windows with panoramic city skyline view,
golden sunset light streaming through sheer curtains,
plush cream velvet chaise lounge as focal point,
champagne-colored silk sheets draped artistically,
Carrara marble flooring with subtle veining,
contemporary minimalist decor with gold accents,
soft ambient uplighting along baseboards,
sophisticated metropolitan atmosphere at magic hour`
};

const EXACT_WARDROBES = {
  crystalline_mesh_silver: `Silver-gray crystalline mesh minimal two-piece lingerie:
Structured mesh bralette with barely-there geometric underwire design,
delicate spaghetti straps (2mm width) in matching silver-gray,
high-waisted mesh brief with ultra-sheer translucent panels (90% transparency),
fabric embedded with tiny crystal particles catching ambient light,
architectural seaming creating diamond/geometric patterns,
barely-there opacity revealing sculptural form beneath,
gossamer textile with light-refracting crystalline threads woven throughout,
minimalist elegant design with haute couture construction`,

  bronze_chainmail_minimal: `Ultra-minimal bronze metallic chainmail bikini set:
Fine interlocking bronze metal rings in micro-scale pattern,
thin delicate chain straps connecting minimal coverage areas,
minimal triangle bralette coverage (3 inch width),
high-cut chainmail brief with open hip design,
warm bronze metallic finish catching candlelight,
skin visible through ring gaps creating textured effect,
single decorative chain draping across midriff,
architectural jewelry-inspired construction`,

  rose_gold_whisper: `Ultra-sheer rose gold metallic mesh slip:
Whisper-thin fabric barely visible against skin (95% transparency),
rose gold metallic threads creating subtle shimmer,
near-invisible minimal coverage chemise design,
delicate spaghetti straps (1mm rose gold chains),
fabric drapes naturally following body contours,
high side slits revealing leg from hip to ankle,
micro-mesh construction with metallic thread weave,
light refracts through creating warm glow on skin`,

  copper_cage_framework: `Architectural burnished copper strappy cage set:
Geometric cage-like design with open framework pattern,
thin metallic copper bands (3mm) creating architectural structure,
minimal triangular coverage at key areas only,
complex web pattern across torso creating artistic design,
high-cut brief with cage-style hip straps,
burnished copper finish with warm patina,
sculptural body jewelry aesthetic,
strategic open spaces creating negative space art`,

  gossamer_thread_minimal: `Gossamer thread barely-there foundation piece:
Ultra-fine silk threads (0.5mm) creating barely-visible web pattern,
single thread straps crossing strategically,
minimal coverage points connected by delicate thread network,
98% transparency with artistic thread placement,
threads catching light creating subtle sparkle,
foundation piece concept - structure without coverage,
avant-garde haute couture construction,
near-invisible minimal artistic design`,

  open_framework_avantgarde: `Open framework avant-garde lingerie sculpture:
Architectural wire framework in rose gold,
minimalist structure outlining form without covering,
strategic crystal accents at intersection points,
open geometric design (triangles, diamonds, curves),
thin straps (2mm) creating outline only,
no solid fabric - pure structural design,
body as canvas with framework as accent,
gallery-worthy intimate sculpture piece`
};

const CLASSICAL_POSES = {
  venus_recline: `Venus-inspired classical recline on cream fur throw,
lying on side with upper body propped elegantly on elbow,
head tilted with serene contemplative expression,
top leg bent at knee creating elegant S-curve silhouette,
free hand resting on hip accentuating dramatic curves,
spine creating beautiful flowing line from shoulders to hips,
classical sculpture reference (Titian's Venus of Urbino)`,

  odalisque_dramatic: `Odalisque-inspired dramatic recline,
reclining with torso twisted showing both back and front curves,
one arm raised adjusting flowing hair with graceful gesture,
head turned looking over shoulder with magnetic dark gaze,
back arched dramatically showing defined musculature,
legs extended with artistic bend creating elegant line,
Ingres' Grande Odalisque reference with exotic sensual mystery`,

  bouguereau_surrender: `Bouguereau-inspired artistic surrender pose,
reclining with arms extended gracefully above head,
eyes closed in expression of serene ecstasy,
torso lifted and arched showing sculptural form,
spine creating dramatic S-curve from shoulders to hips,
one knee bent creating triangular negative space,
nymph painting reference with romantic vulnerability`,

  kneeling_worship: `Kneeling artistic worship pose on fur throw,
knees slightly apart with torso upright,
slight backward lean with arms raised framing face,
head tilted back with eyes closed in transcendence,
back arched showing dramatic hourglass curves,
devotional art reference with spiritual sensuality`,

  seated_embrace: `Seated self-embrace artistic pose,
seated at edge of surface with elegant posture,
arms crossed gently embracing own sculptural form,
head bowed forward with contemplative expression,
spine curved in gentle forward lean,
legs crossed elegantly at ankle,
Renaissance Madonna reference with intimate reflection`,

  side_recline_curves: `Side recline emphasizing dramatic curves,
lying on side with full hourglass silhouette visible,
head propped on hand with elbow bent creating triangle,
top arm draped along body following contours,
hip raised creating dramatic curve at cinched waist,
legs stacked with slight knee bend,
classical reclining nude reference celebrating feminine form`
};

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT CONFIGURATIONS - 12 Masterpieces
// ═══════════════════════════════════════════════════════════════════════════════

const MASTERCLASS_VARIANTS = [
  // MIDNIGHT CHIAROSCURO CRYSTALLINE (6 images)
  {
    name: 'midnight_chiaroscuro_crystalline_v1',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'crystalline_mesh_silver',
    environmentKey: 'underground_vip_chamber',
    poseKey: 'venus_recline',
    intimacy: 10,
    lighting: 'Dramatic Caravaggio-style chiaroscuro with deep shadows and brilliant highlights'
  },
  {
    name: 'midnight_chiaroscuro_crystalline_v2',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'bronze_chainmail_minimal',
    environmentKey: 'candlelit_chamber',
    poseKey: 'odalisque_dramatic',
    intimacy: 10,
    lighting: 'Renaissance chiaroscuro with flickering candlelight creating dancing shadows'
  },
  {
    name: 'midnight_chiaroscuro_crystalline_v3',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'copper_cage_framework',
    environmentKey: 'underground_vip_chamber',
    poseKey: 'bouguereau_surrender',
    intimacy: 10,
    lighting: 'Rembrandt triangle lighting with deep shadow gradation'
  },
  {
    name: 'midnight_chiaroscuro_crystalline_v4',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'gossamer_thread_minimal',
    environmentKey: 'candlelit_chamber',
    poseKey: 'kneeling_worship',
    intimacy: 10,
    lighting: 'Dramatic spotlight effect with deep baroque shadows'
  },
  {
    name: 'midnight_chiaroscuro_crystalline_v5',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'rose_gold_whisper',
    environmentKey: 'underground_vip_chamber',
    poseKey: 'side_recline_curves',
    intimacy: 10,
    lighting: 'Painterly chiaroscuro with museum-quality shadow play'
  },
  {
    name: 'midnight_chiaroscuro_crystalline_v6',
    type: 'midnight_chiaroscuro',
    wardrobeKey: 'open_framework_avantgarde',
    environmentKey: 'candlelit_chamber',
    poseKey: 'seated_embrace',
    intimacy: 10,
    lighting: 'Gordon Willis-style dramatic shadow with single key light'
  },

  // CANDLELIT BOUDOIR INTIMATE (6 images)
  {
    name: 'candlelit_boudoir_intimate_v1',
    type: 'candlelit_boudoir',
    wardrobeKey: 'crystalline_mesh_silver',
    environmentKey: 'wooden_cabin_fur',
    poseKey: 'venus_recline',
    intimacy: 10,
    lighting: 'Warm romantic candlelight with soft amber glow'
  },
  {
    name: 'candlelit_boudoir_intimate_v2',
    type: 'candlelit_boudoir',
    wardrobeKey: 'gossamer_thread_minimal',
    environmentKey: 'marble_bath_sanctuary',
    poseKey: 'odalisque_dramatic',
    intimacy: 10,
    lighting: 'Flickering candle reflections on marble and water'
  },
  {
    name: 'candlelit_boudoir_intimate_v3',
    type: 'candlelit_boudoir',
    wardrobeKey: 'rose_gold_whisper',
    environmentKey: 'natural_cave_intimate',
    poseKey: 'bouguereau_surrender',
    intimacy: 10,
    lighting: 'Natural golden light entering through rock openings'
  },
  {
    name: 'candlelit_boudoir_intimate_v4',
    type: 'candlelit_boudoir',
    wardrobeKey: 'bronze_chainmail_minimal',
    environmentKey: 'penthouse_golden_hour',
    poseKey: 'side_recline_curves',
    intimacy: 10,
    lighting: 'Golden hour sunset streaming through windows'
  },
  {
    name: 'candlelit_boudoir_intimate_v5',
    type: 'candlelit_boudoir',
    wardrobeKey: 'copper_cage_framework',
    environmentKey: 'wooden_cabin_fur',
    poseKey: 'kneeling_worship',
    intimacy: 10,
    lighting: 'Warm Edison bulb glow with morning window light'
  },
  {
    name: 'candlelit_boudoir_intimate_v6',
    type: 'candlelit_boudoir',
    wardrobeKey: 'open_framework_avantgarde',
    environmentKey: 'marble_bath_sanctuary',
    poseKey: 'seated_embrace',
    intimacy: 10,
    lighting: 'Romantic candelabra glow with steam diffusion'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  try {
    const response = await fetch('http://localhost:3001/api/gcloud-token');
    const data = await response.json();
    if (data.token) return data.token;
    throw new Error('No token in response');
  } catch (error) {
    console.log('   Fetching fresh token via gcloud CLI...');
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
    return token;
  }
}

async function callGemini(prompt, token) {
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 4096 }
        })
      });

      if (response.status === 429 || response.status === 503) {
        console.log(`  ⚠️ Gemini attempt ${attempt + 1} failed, retrying...`);
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 2000));
        continue;
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return '';
}

async function generateImage(prompt, outputPath, token) {
  const projectId = 'zaranovel';
  const location = 'us-central1';
  // Use :predict endpoint (same as working generate-ultra-rlm-premium-12.mjs)
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        aspectRatio: '3:4',
        sampleCount: 1,
        sampleImageSize: '2048',
        personGeneration: 'allow_adult',
        safetySetting: 'block_few',
        outputOptions: {
          mimeType: 'image/png',
          compressionQuality: 100
        }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Imagen API error: ${response.status} ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  // Direct response - no polling needed with :predict endpoint
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    const imageData = data.predictions[0].bytesBase64Encoded;
    fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
    return true;
  }

  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTERCLASS PROMPT GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

async function generateMasterclassPrompt(variant, token) {
  const wardrobe = EXACT_WARDROBES[variant.wardrobeKey];
  const environment = EXACT_ENVIRONMENTS[variant.environmentKey];
  const pose = CLASSICAL_POSES[variant.poseKey];

  // Generate enhanced model description
  const modelPrompt = `Generate a HYPER-DETAILED model description for fine art boudoir photography.

OUTPUT EXACTLY (fill in creative variations):
Stunning Indian fashion muse Meera, age 27, standing 5'8" tall,
athletic yet voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD creating elegant fullness, cinched waist at 27" emphasizing hourglass,
wide feminine hips measuring 40" completing the classic proportions,
sun-kissed bronze complexion with NATURAL MATTE FINISH (NO artificial sheen),
visible skin pores with natural texture variation across shoulders and décolletage,
fine vellus hair catching ambient light along arms and midriff,
authentic human skin texture with subtle natural imperfections,
striking Indian features with deep captivating dark magnetic gaze,
full sensual lips slightly parted in serene contemplation,
dramatic high cheekbones casting subtle shadows,
defined elegant jawline leading to graceful neck,
long flowing jet-black hair with natural wave cascading past shoulders,
hair catching warm light creating subtle highlights,
commanding presence of luxury haute couture supermodel

Generate enhanced version (250 words). Maintain exact measurements 37DD-27"-40".`;

  const model = await callGemini(modelPrompt, token);

  // Assemble masterclass prompt
  const masterclassPrompt = `MASTERPIECE FINE ART BOUDOIR PHOTOGRAPH.
In the tradition of Helmut Newton and Paolo Roversi.
Museum-quality intimate portraiture celebrating feminine sculptural form.
Award-winning gallery exhibition quality print.
Premium exclusive 10+ intimate artistic content.

MODEL:
${model}

WARDROBE (MIN COVERAGE, MAX ARTISTIC REVEAL):
${wardrobe}

WARDROBE CRITICAL REQUIREMENTS:
- TRUE MINIMAL COVERAGE (NOT simple black top/bottom)
- Avant-garde artistic design elements visible
- Transparency revealing sculptural form (90%+ sheer)
- Crystalline/metallic elements catching ambient light

ENVIRONMENT SETTING (REALISTIC BACKGROUND):
${environment}

ENVIRONMENT CRITICAL REQUIREMENTS:
- REALISTIC VISIBLE BACKGROUND (NOT plain/empty)
- Specific textures: venetian plaster, wood, marble, fur visible
- Props present: candles, furniture, fabrics, decoratives
- Warm intimate lighting from visible sources

POSE (CLASSICAL ART-INSPIRED):
${pose}

LIGHTING (${variant.type.toUpperCase()}):
${variant.lighting}
Color temperature: 2000-2700K warm amber/candlelight range
Technical approach: ${variant.type === 'midnight_chiaroscuro' ? 'Dramatic chiaroscuro with deep shadows' : 'Soft romantic candlelight with warm glow'}

CAMERA (MEDIUM FORMAT):
Shot on Hasselblad X2D 100C with XCD 80mm f/1.9 at f/2.0,
3/4 elevated angle showing full body and environment,
ultra-shallow depth of field with creamy bokeh,
8K ultra-detailed capture showing authentic skin texture,
Kodak Portra 400 film grain aesthetic,
museum exhibition print quality

ARTISTIC DIRECTION - PREMIUM 10+ EXCLUSIVE:
Intimate private moment in exclusive VIP setting.
Sophisticated artistic celebration of feminine sculptural form.
Museum-quality fine art photography with emotional depth.
Classical Renaissance painting aesthetic meets contemporary fashion photography.
Emotional vulnerability combined with confident sensuality.

PHOTOREALISTIC SKIN RENDERING (CRITICAL):
- Visible skin pores with natural texture variation
- Fine vellus hair catching light naturally
- MATTE NATURAL SKIN FINISH - NO artificial oily sheen
- NO PLASTIC AI APPEARANCE - real human skin quality

TECHNICAL QUALITY ANCHORS:
8K ultra-detailed resolution.
Subtle Kodak Portra 400 film grain.
Professional warm color grading.
Museum exhibition quality masterpiece.

FINAL CRITICAL CHECKLIST:
✓ Model has exact measurements (37DD-27"-40") with natural matte skin
✓ Wardrobe is TRUE 10+ minimal coverage (avant-garde, sheer, architectural)
✓ Environment has REALISTIC BACKGROUND (props, textures, depth)
✓ Pose references classical art (Venus, Odalisque, Bouguereau)
✓ Lighting is dramatic (chiaroscuro or candlelit)`;

  return masterclassPrompt;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔄💎✨ ULTRA RLM MASTERCLASS - 12-IMAGE GENERATION                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Collection: Exclusive 10+ Premium Masterclass Series                       ║
║   Framework: MIN COVERAGE + MAX ARTISTIC REVEAL + REALISTIC BACKGROUNDS      ║
║   Quality: Museum-grade 5-6MB masterpieces                                   ║
║   Strategy: Ultra RLM MASTERCLASS (enhanced with EXACT patterns)             ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   CRITICAL IMPROVEMENTS:                                                     ║
║   ✓ REALISTIC BACKGROUNDS (wooden floor, candles, tub, caves, etc.)          ║
║   ✓ TRUE 10+ WARDROBE (chainmail, mesh, open framework, NOT black covers)    ║
║   ✓ Wardrobe-Environment compatible mapping                                  ║
║   ✓ Classical art pose references (Venus, Odalisque, Bouguereau)             ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   6x Midnight Chiaroscuro Crystalline (intimacy 10+)                         ║
║   6x Candlelit Boudoir Intimate (intimacy 10+)                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  // Create output directory
  const outputDir = './generated-ultra-rlm-masterclass-12';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Track results
  const results = [];
  const startTime = Date.now();

  // Cache token
  let token = null;
  let tokenExpiry = 0;

  for (let i = 0; i < MASTERCLASS_VARIANTS.length; i++) {
    const variant = MASTERCLASS_VARIANTS[i];

    console.log(`\n${'═'.repeat(70)}`);
    console.log(`[${i + 1}/${MASTERCLASS_VARIANTS.length}] ${variant.name}`);
    console.log(`  Type: ${variant.type} | Intimacy: ${variant.intimacy}/10`);
    console.log(`  Wardrobe: ${variant.wardrobeKey}`);
    console.log(`  Environment: ${variant.environmentKey}`);
    console.log(`  Pose: ${variant.poseKey}`);

    try {
      // Refresh token if needed
      if (!token || Date.now() > tokenExpiry) {
        console.log('🔑 Fetching fresh OAuth token...');
        token = await getOAuthToken();
        tokenExpiry = Date.now() + 45 * 60 * 1000; // 45 minutes
      } else {
        const minutesLeft = Math.round((tokenExpiry - Date.now()) / 60000);
        console.log(`✅ OAuth token cached (expires in ${minutesLeft} min)`);
      }

      // Generate masterclass prompt
      console.log('  🔄 MASTERCLASS: Generating hyper-detailed prompt...');
      const prompt = await generateMasterclassPrompt(variant, token);
      console.log(`  ✅ MASTERCLASS prompt (${prompt.length} chars)`);

      // Generate image
      console.log('  🎨 Generating with Imagen 4 Ultra...');
      const filename = `ultra_rlm_masterclass_${variant.name}_${Date.now()}.png`;
      const outputPath = path.join(outputDir, filename);

      const success = await generateImage(prompt, outputPath, token);

      if (success) {
        const stats = fs.statSync(outputPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`  ✅ ${filename} (${sizeMB} MB)`);
        results.push({
          name: variant.name,
          filename,
          size: sizeMB,
          status: 'success',
          wardrobe: variant.wardrobeKey,
          environment: variant.environmentKey,
          pose: variant.poseKey
        });
      } else {
        console.log(`  ❌ Failed: No image data in response`);
        results.push({
          name: variant.name,
          status: 'failed',
          error: 'No image data in response'
        });
      }

    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      results.push({
        name: variant.name,
        status: 'failed',
        error: error.message
      });
    }

    // Wait between generations
    if (i < MASTERCLASS_VARIANTS.length - 1) {
      console.log(`\n⏳ Waiting 12s before next generation...`);
      await new Promise(r => setTimeout(r, 12000));
    }
  }

  // Summary
  const endTime = Date.now();
  const totalMinutes = ((endTime - startTime) / 60000).toFixed(1);
  const successCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  const successResults = results.filter(r => r.status === 'success');
  const avgSize = successResults.length > 0
    ? (successResults.reduce((sum, r) => sum + parseFloat(r.size), 0) / successResults.length).toFixed(2)
    : 0;
  const sizes = successResults.map(r => parseFloat(r.size));
  const minSize = sizes.length > 0 ? Math.min(...sizes).toFixed(2) : 0;
  const maxSize = sizes.length > 0 ? Math.max(...sizes).toFixed(2) : 0;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`\n🎉 MASTERCLASS GENERATION COMPLETE!\n`);
  console.log(`✅ SUCCESS: ${successCount}/${MASTERCLASS_VARIANTS.length} (${Math.round(successCount / MASTERCLASS_VARIANTS.length * 100)}%)`);
  console.log(`📊 Quality: ${avgSize} MB avg (${minSize}-${maxSize} MB range)`);
  console.log(`⏱️  Total Time: ${totalMinutes} minutes`);

  // Group by type
  const midnightResults = successResults.filter(r => r.name.includes('midnight'));
  const candlelitResults = successResults.filter(r => r.name.includes('candlelit'));

  console.log(`\n📸 Generated Images:\n`);
  console.log(`  🌙 MIDNIGHT CHIAROSCURO CRYSTALLINE (${midnightResults.length}):`);
  midnightResults.forEach((r, i) => {
    console.log(`     ${i + 1}. ${r.filename} (${r.size} MB)`);
    console.log(`        Wardrobe: ${r.wardrobe}, Env: ${r.environment}`);
  });

  console.log(`\n  🕯️  CANDLELIT BOUDOIR INTIMATE (${candlelitResults.length}):`);
  candlelitResults.forEach((r, i) => {
    console.log(`     ${i + 1}. ${r.filename} (${r.size} MB)`);
    console.log(`        Wardrobe: ${r.wardrobe}, Env: ${r.environment}`);
  });

  if (failedCount > 0) {
    console.log(`\n❌ FAILED: ${failedCount}/${MASTERCLASS_VARIANTS.length}\n`);
    console.log('Failed variants:');
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`   ${r.name}: ${r.error}`);
    });
  }

  // Save manifest
  const manifest = {
    results,
    successCount,
    failedCount,
    totalTime: totalMinutes,
    avgSize,
    timestamp: new Date().toISOString(),
    strategy: 'Ultra RLM MASTERCLASS',
    intimacyLevel: '10+',
    framework: 'MIN COVERAGE + MAX ARTISTIC REVEAL + REALISTIC BACKGROUNDS',
    improvements: [
      'REALISTIC BACKGROUNDS (wooden floor, candles, tub, caves)',
      'TRUE 10+ WARDROBE (chainmail, mesh, open framework)',
      'Wardrobe-Environment compatible mapping',
      'Classical art pose references'
    ]
  };

  const manifestPath = path.join(outputDir, `manifest-masterclass-12-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n📁 Output: ${outputDir}`);
  console.log(`📄 Manifest: ${manifestPath}`);
  console.log(`\n${'═'.repeat(70)}`);
}

main().catch(console.error);
