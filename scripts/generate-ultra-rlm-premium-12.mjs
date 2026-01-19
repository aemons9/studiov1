#!/usr/bin/env node

/**
 * ULTRA RLM PREMIUM 12-IMAGE GENERATION
 *
 * Generates 12 exclusive premium images for 10+ subscribers:
 * - 6x Midnight Chiaroscuro Crystalline variants
 * - 6x Candlelit Boudoir Intimate variants
 *
 * Framework: MIN COVERAGE + MAX ARTISTIC REVEAL
 * Intimacy: 10-10+ (exclusive premium)
 * Strategy: Ultra RLM (proven 5-6MB quality)
 * Quality: Museum-grade masterpieces
 */

import 'dotenv/config';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

const OUTPUT_DIR = './generated-ultra-rlm-premium-12';
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔄💎✨ ULTRA RLM PREMIUM 12-IMAGE GENERATION                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Collection: Exclusive 10+ Premium Subscriber Series                       ║
║   Framework: MIN COVERAGE + MAX ARTISTIC REVEAL                              ║
║   Quality: Museum-grade 5-6MB masterpieces                                   ║
║   Strategy: Ultra RLM (100% tested efficiency)                               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   6x Midnight Chiaroscuro Crystalline (intimacy 10+)                         ║
║   6x Candlelit Boudoir Intimate (intimacy 10+)                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

// ═══════════════════════════════════════════════════════════════════════════════
// OAUTH TOKEN MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

let cachedToken = null;
let tokenExpiry = 0;

async function getGcloudToken() {
  // Use cached token if still valid (expires in 50 min, cache for 45 min)
  if (cachedToken && Date.now() < tokenExpiry) {
    console.log('✅ OAuth token cached (expires in', Math.round((tokenExpiry - Date.now())/60000), 'min)');
    return cachedToken;
  }

  try {
    const response = await fetch('http://localhost:3001/api/gcloud-token');
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }
    const data = await response.json();
    console.log('🔑 Fetching fresh OAuth token from proxy...');

    cachedToken = data.token;
    tokenExpiry = Date.now() + (45 * 60 * 1000); // Cache for 45 minutes

    return data.token;
  } catch (error) {
    throw new Error(`Failed to fetch OAuth token: ${error.message}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA RLM COMPONENT GENERATION via Gemini 2.5 Flash
// ═══════════════════════════════════════════════════════════════════════════════

async function callVertexGemini(prompt, accessToken, maxRetries = 3) {
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.95,  // Slightly higher for creative variation
            maxOutputTokens: 4096
          }
        })
      });

      if ((response.status === 429 || response.status === 503) && attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 2000;
        console.log(`  ⏰ Rate limit (${response.status}), waiting ${waitTime/1000}s...`);
        await new Promise(r => setTimeout(r, waitTime));
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} ${errorText.substring(0, 200)}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      console.log(`  ⚠️ Gemini attempt ${attempt + 1} failed, retrying...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  throw new Error('Gemini API call failed after all retries');
}

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA-DETAILED COMPONENT GENERATORS (10+ INTIMACY FOCUSED)
// ═══════════════════════════════════════════════════════════════════════════════

async function generateUltraModel(conceptPrompt, intimacyLevel, accessToken) {
  const prompt = `You are a world-class fine art photography director specializing in intimate portraiture.

TASK: Generate ULTRA-DETAILED model description for PREMIUM EXCLUSIVE 10+ content.

CONCEPT: ${conceptPrompt}
INTIMACY: ${intimacyLevel}/10 (PREMIUM EXCLUSIVE)

CRITICAL REQUIREMENTS for 10+ PREMIUM CONTENT:

Stunning Indian fashion muse Meera, age 27, 5'8" tall,
fit athletic voluptuous hourglass figure with DRAMATIC SCULPTURAL CURVES,
bust 37DD with natural full form, dramatically cinched 27" waist creating extreme hourglass,
wide rounded hips 40" with pronounced feminine curves,
sun-kissed warm bronze complexion with NATURAL MATTE FINISH,
visible skin pores across shoulders, décolletage, and torso creating authentic texture,
fine vellus hair catching ambient light on arms and lower back,
authentic human skin with subtle natural variations and beauty marks,
striking Indian features with CAPTIVATING DARK MAGNETIC GAZE,
full sensual lips with natural rose undertone,
dramatic high cheekbones casting elegant shadows,
refined jawline and graceful neck line,
long flowing jet-black hair with natural body and lustrous sheen,
hair cascading down shoulders and back in loose waves,
confident commanding presence with intimate vulnerability,
natural luminosity without artificial enhancement,
exquisite feminine sculptural form worthy of classical art

OUTPUT: Complete hyper-detailed model (250-350 words, emphasis on natural curves and authentic skin texture).`;

  return await callVertexGemini(prompt, accessToken);
}

async function generateUltraWardrobe(conceptPrompt, intimacyLevel, accessToken) {
  const prompt = `You are a haute couture designer specializing in MINIMAL COVERAGE intimate apparel.

TASK: Generate ULTRA-DETAILED wardrobe for PREMIUM 10+ EXCLUSIVE content.

CONCEPT: ${conceptPrompt}
INTIMACY: ${intimacyLevel}/10 (MAX ARTISTIC REVEAL, MIN COVERAGE)

CRITICAL REQUIREMENTS for 10+ PREMIUM:

For intimacy 10+, use MINIMAL COVERAGE designs:
- "Barely-there crystalline mesh bralette" with geometric minimal structure
- "Gossamer thread micro-brief" with translucent sheer panels
- "Single delicate chain" draped across form as sculptural accent
- "Sheer translucent mesh" with embedded light-refracting crystals
- "Minimal architectural foundation" with strategic barely-there coverage
- "Ultra-fine gossamer textile" revealing sculptural form beneath
- "Crystalline thread design" creating geometric patterns while revealing natural curves

FABRIC SPECIFICATIONS:
- Sheer translucent mesh with 90% transparency
- Embedded micro-crystals catching every light angle
- Gossamer-weight textile with barely perceptible structure
- Light-refracting crystalline threads creating shimmer
- Minimal coverage revealing natural sculptural beauty
- Architectural seaming creating artistic geometric patterns
- Barely-there design celebrating feminine form

COLOR PALETTE:
- Crystalline silver-gray with metallic shimmer
- Champagne ivory with pearl iridescence
- Midnight black with subtle sheen
- Rose-gold with warm undertones

OUTPUT: Complete construction-level wardrobe (200-300 words, emphasis on MINIMAL COVERAGE and SHEER TRANSPARENCY).`;

  return await callVertexGemini(prompt, accessToken);
}

async function generateUltraEnvironment(conceptPrompt, intimacyLevel, accessToken) {
  const prompt = `You are a cinematographer specializing in INTIMATE EXCLUSIVE SETTINGS.

TASK: Generate ULTRA-DETAILED environment for PREMIUM 10+ content.

CONCEPT: ${conceptPrompt}
INTIMACY: ${intimacyLevel}/10 (EXCLUSIVE PRIVATE SETTING)

CRITICAL REQUIREMENTS for 10+ PREMIUM ENVIRONMENTS:

INTIMATE UNDERGROUND VIP PRIVATE CHAMBER:
- Dark charcoal-gray textured walls with hand-applied venetian plaster
- Sophisticated industrial-luxe aesthetic with premium materials
- Corner placement showing two walls meeting at 90-degree angle for depth
- Polished dark concrete floor with mirror-like sheen reflecting ambient light
- PLUSH OVERSIZED CREAM-WHITE FAUX FUR THROW as primary prop (key element)
- Warm amber Edison-style wall sconces (2700K) mounted strategically
- Multiple PILLAR CANDLES in background providing romantic 2000K accent glow
- Draped charcoal silk fabric adding textural depth
- Minimalist luxury with focus on intimate privacy
- Exclusive club atmosphere suggesting high-end private membership
- Warm intimate mood with sophisticated edge

MATERIAL DETAILS:
- Venetian plaster with subtle texture variations
- Premium faux fur with realistic texture and depth
- Polished concrete with professional finish
- Warm metal sconce fixtures with Edison bulbs
- Natural beeswax pillar candles
- Silk charcoal draping with elegant fall

OUTPUT: Complete material-specific environment (200-300 words, emphasis on INTIMATE EXCLUSIVE LUXURY).`;

  return await callVertexGemini(prompt, accessToken);
}

async function generateUltraPose(conceptPrompt, poseHint, intimacyLevel, accessToken) {
  const prompt = `You are a master photographer specializing in ARTISTIC INTIMATE PORTRAITURE.

TASK: Generate ULTRA-DETAILED pose for PREMIUM 10+ EXCLUSIVE content.

CONCEPT: ${conceptPrompt}
POSE HINT: ${poseHint}
INTIMACY: ${intimacyLevel}/10 (MAX ARTISTIC REVEAL)

CRITICAL REQUIREMENTS for 10+ PREMIUM POSES:

CLASSICAL ART-INSPIRED INTIMATE POSITIONING:
Reference: Venus de Milo, Odalisque (Ingres), Bouguereau's nudes, classical sculpture

RECLINING ARTISTIC POSES (10+ intimacy):
- Reclining on plush cream fur throw with DRAMATIC S-CURVE through torso
- One arm gracefully raised to hair in classical gesture (shoulder lifted, elbow elegant)
- Head tilted back with eyes CLOSED or half-lidded in serene ecstasy/meditation
- Torso LIFTED and ARCHED showing defined abs and sculptural hourglass form
- Spine creating beautiful pronounced curve from shoulders through hips
- One leg extended fully showing graceful line, other knee slightly bent
- Free arm draped elegantly along side or across torso
- Body positioned to showcase natural curves and feminine sculptural beauty
- Expression: serene confidence, intimate vulnerability, artistic surrender
- Overall impression: classical masterpiece celebrating human form

FACIAL EXPRESSION & DETAILS:
- Eyes closed or gazing softward with dreamy intimate expression
- Lips slightly parted in natural relaxation
- Head tilted to elongate neck line
- Peaceful serene expression suggesting intimate private moment

RELATIONSHIP TO ENVIRONMENT:
- Body positioned on fur throw as primary surface
- Natural interaction with prop (sinking into softness)
- Limbs creating elegant geometric lines against minimal background
- Sculptural form highlighted by strategic lighting angles

OUTPUT: Complete anatomically precise pose (200-300 words, emphasis on CLASSICAL ART REFERENCES and SCULPTURAL BEAUTY).`;

  return await callVertexGemini(prompt, accessToken);
}

async function generateUltraLighting(timeOfDay, mood, intimacyLevel, accessToken) {
  const prompt = `You are a master cinematographer specializing in INTIMATE CHIAROSCURO lighting.

TASK: Generate ULTRA-DETAILED lighting for PREMIUM 10+ content.

TIME: ${timeOfDay}
MOOD: ${mood}
INTIMACY: ${intimacyLevel}/10 (DRAMATIC INTIMATE)

CRITICAL REQUIREMENTS for 10+ PREMIUM LIGHTING:

DRAMATIC CHIAROSCURO TECHNIQUE (Caravaggio-inspired):

PRIMARY LIGHTING:
- Warm amber wall sconces at 2700K color temperature
- Positioned on walls creating DRAMATIC SIDE LIGHTING
- Strong directional light creating pronounced shadows
- Highlighting sculptural curves with rim lighting effect
- Gentle ambient fill preventing total darkness in shadows
- Light raking across skin revealing texture and form

SECONDARY ACCENT LIGHTING:
- Soft flickering candlelight at 2000K (romantic warm orange-gold)
- Multiple pillar candles in background creating depth
- Dancing flame highlights catching on crystalline mesh and skin
- Warm romantic glow adding intimacy and atmosphere

SHADOW PLAY (CRITICAL for 10+ content):
- DEEP RICH SHADOWS defining form and creating mystery
- Dramatic contrast between highlighted and shadowed areas
- Shadows following body contours emphasizing curves
- Chiaroscuro technique creating painterly Renaissance quality
- Gentle gradation from highlight to shadow (not harsh cutoff)

SKIN HIGHLIGHTING:
- Specular highlights on shoulders, collarbone, hip curves
- Diffuse glow across torso showing skin texture
- Rim lighting along body edges separating from background
- Natural skin luminosity enhanced by warm tones
- Visible pore texture in lit areas, smooth shadows

OVERALL ATMOSPHERE:
- ${timeOfDay === 'midnight' ? 'Deep mysterious midnight atmosphere with dramatic contrast' : 'Intimate evening warmth with romantic candlelight'}
- Low-light intimate setting suggesting exclusive privacy
- Dramatic painterly quality worthy of museum fine art
- Warm color palette (amber, gold, bronze tones)

OUTPUT: Complete technical lighting (200-300 words, emphasis on DRAMATIC CHIAROSCURO and SHADOW PLAY).`;

  return await callVertexGemini(prompt, accessToken);
}

function generateUltraCamera(intimacyLevel) {
  const cameras = [
    'Hasselblad X2D 100C with XCD 80mm f/1.9',
    'Phase One IQ4 150MP with Schneider Kreuznach 110mm LS f/2.8',
    'Leica S3 with Summarit-S 70mm f/2.5 ASPH'
  ];

  const camera = cameras[Math.floor(Math.random() * cameras.length)];

  return `Shot on ${camera} at f/2.0,
3/4 elevated angle showing full body and intimate environment,
ultra-shallow depth of field with creamy smooth bokeh,
medium format 100-megapixel sensor capturing exquisite skin detail,
8K ultra-detailed resolution showing authentic pore texture,
professional warm color grading with amber-gold tones,
subtle Kodak Portra 400 film grain for organic cinematic feel,
museum exhibition print quality with archival standards`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA PROMPT SYNTHESIS
// ═══════════════════════════════════════════════════════════════════════════════

function synthesizeUltraPrompt(components, intimacyLevel, conceptType) {
  const photographerRef = intimacyLevel >= 10
    ? 'Helmut Newton and Paolo Roversi'
    : 'Irving Penn and Peter Lindbergh';

  const qualityPrefix = `MASTERPIECE FINE ART BOUDOIR PHOTOGRAPH.
MUSEUM-QUALITY INTIMATE PORTRAITURE celebrating feminine sculptural form.
AWARD-WINNING GALLERY EXHIBITION quality for exclusive collectors.
In the tradition of ${photographerRef}.
PREMIUM EXCLUSIVE 10+ CONTENT for discerning subscribers.`;

  const realisticSkin = `PHOTOREALISTIC SKIN RENDERING (CRITICAL):
- Visible skin pores with natural texture variation across shoulders and torso
- Fine vellus hair catching light naturally on arms and lower back
- MATTE NATURAL SKIN FINISH with zero artificial oily sheen
- Subtle skin imperfections, beauty marks, and authentic human texture
- NO plastic AI appearance, NO airbrushed commercial look
- NO glossy magazine skin, maintain natural matte authenticity
- Medium format camera capturing every authentic detail
- Natural skin luminosity from ambient lighting, not post-processing`;

  const artisticDirection = `ARTISTIC DIRECTION - PREMIUM 10+ EXCLUSIVE:
${conceptType === 'midnight_chiaroscuro'
  ? 'Dramatic midnight chiaroscuro masterpiece with Renaissance painting quality.\nDeep shadows and brilliant highlights celebrating sculptural feminine beauty.\nCaravaggio-inspired lighting creating museum-worthy fine art.'
  : 'Intimate candlelit boudoir chamber with romantic warmth and privacy.\nSoft flickering candlelight creating dreamy atmospheric quality.\nClassical elegance meeting contemporary intimate fine art photography.'}

CONCEPTUAL FRAMEWORK:
Minimal coverage, maximum artistic reveal.
Sophisticated celebration of natural feminine form.
Classical art references (Venus, Odalisque, Renaissance nudes).
Intimate private moment captured with museum-quality artistry.
Exclusive premium content for refined artistic appreciation.`;

  return `${qualityPrefix}

MODEL:
${components.model}

WARDROBE (MIN COVERAGE, MAX REVEAL):
${components.wardrobe}

ENVIRONMENT SETTING (EXCLUSIVE INTIMATE):
${components.environment}

POSE (CLASSICAL ART-INSPIRED):
${components.pose}

LIGHTING (DRAMATIC ${conceptType === 'midnight_chiaroscuro' ? 'CHIAROSCURO' : 'CANDLELIT'}):
${components.lighting}

CAMERA (MEDIUM FORMAT MASTERPIECE):
${components.camera}

${artisticDirection}

${realisticSkin}

8K ULTRA-DETAILED RESOLUTION.
Subtle Kodak Portra 400 film grain aesthetic.
Professional warm amber color grading.
Hyper-realistic anatomically correct proportions.
Museum exhibition quality masterpiece.
Premium exclusive 10+ intimate fine art photography.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGEN 4 ULTRA GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

async function generateWithImagen4Ultra(prompt, accessToken) {
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const payload = {
    instances: [{
      prompt: prompt
    }],
    parameters: {
      aspectRatio: '3:4',
      sampleCount: 1,
      sampleImageSize: '2048',  // Maximum quality
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      outputOptions: {
        mimeType: 'image/png',
        compressionQuality: 100
      }
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Imagen 4 error: ${response.status} ${errorText.substring(0, 300)}`);
  }

  const data = await response.json();

  if (!data.predictions?.[0]?.bytesBase64Encoded) {
    throw new Error('No image data in response');
  }

  return data.predictions[0].bytesBase64Encoded;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 12 PREMIUM VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const PREMIUM_VARIANTS = [
  // ============ 6x MIDNIGHT CHIAROSCURO CRYSTALLINE ============
  {
    id: 'midnight_chiaroscuro_crystalline_v1',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in crystalline silver-gray mesh minimal lingerie in underground VIP chamber with dramatic chiaroscuro lighting',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'reclining with dramatic S-curve, one arm raised to hair, head tilted back, eyes closed in serene ecstasy'
  },
  {
    id: 'midnight_chiaroscuro_crystalline_v2',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in gossamer crystalline thread design in exclusive private chamber with Renaissance-inspired chiaroscuro',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'artistic recline on fur throw, torso arched, one leg extended, Venus-inspired classical pose'
  },
  {
    id: 'midnight_chiaroscuro_crystalline_v3',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in barely-there crystalline mesh bralette in intimate VIP room with dramatic shadow play',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'reclining Odalisque-inspired, one arm gracefully raised, spine curved elegantly, intimate expression'
  },
  {
    id: 'midnight_chiaroscuro_crystalline_v4',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in sheer translucent crystalline minimal foundation in underground chamber with Caravaggio lighting',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'classical reclining pose, both arms elegantly positioned, head tilted exposing neck, serene closed eyes'
  },
  {
    id: 'midnight_chiaroscuro_crystalline_v5',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in champagne ivory gossamer mesh micro-design in exclusive VIP setting with dramatic rim lighting',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'artistic recline with pronounced S-curve, one knee bent, free arm draped, Bouguereau-inspired elegance'
  },
  {
    id: 'midnight_chiaroscuro_crystalline_v6',
    type: 'midnight_chiaroscuro',
    concept: 'Indian model in rose-gold crystalline barely-there design in intimate chamber with painterly chiaroscuro',
    intimacy: 10,
    timeOfDay: 'midnight',
    poseHint: 'Venus de Milo inspired reclining, sculptural form highlighted, graceful arm gesture, peaceful expression'
  },

  // ============ 6x CANDLELIT BOUDOIR INTIMATE ============
  {
    id: 'candlelit_boudoir_intimate_v1',
    type: 'candlelit_boudoir',
    concept: 'Indian model in gossamer thread minimal lingerie in luxurious boudoir with warm romantic candlelight',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'intimate reclining pose with S-curve, one arm to hair, head back, dreamy candlelit expression'
  },
  {
    id: 'candlelit_boudoir_intimate_v2',
    type: 'candlelit_boudoir',
    concept: 'Indian model in sheer translucent mesh minimal design in private boudoir chamber with flickering candles',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'classical Odalisque recline, torso lifted and arched, leg extended, romantic serene face'
  },
  {
    id: 'candlelit_boudoir_intimate_v3',
    type: 'candlelit_boudoir',
    concept: 'Indian model in barely-there crystalline micro-foundation in intimate boudoir with ambient candleglow',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'artistic recline on fur, dramatic curve through spine, one arm raised elegantly, eyes closed peacefully'
  },
  {
    id: 'candlelit_boudoir_intimate_v4',
    type: 'candlelit_boudoir',
    concept: 'Indian model in champagne gossamer minimal mesh in luxe boudoir with warm candle accent lighting',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'Venus-inspired reclining, both arms gracefully positioned, sculptural form showcased, intimate vulnerability'
  },
  {
    id: 'candlelit_boudoir_intimate_v5',
    type: 'candlelit_boudoir',
    concept: 'Indian model in silver-gray sheer minimal thread design in exclusive boudoir with dancing candlelight',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'classical recline with pronounced hourglass curve, one knee bent, free arm draped, serene ecstasy'
  },
  {
    id: 'candlelit_boudoir_intimate_v6',
    type: 'candlelit_boudoir',
    concept: 'Indian model in midnight black gossamer barely-there in intimate boudoir with romantic candle glow',
    intimacy: 10,
    timeOfDay: 'evening',
    poseHint: 'Bouguereau-inspired artistic recline, torso arched showing sculptural form, peaceful closed eyes, elegant gesture'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN GENERATION LOOP
// ═══════════════════════════════════════════════════════════════════════════════

async function generatePremium12() {
  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];
  let successCount = 0;
  let failedCount = 0;
  const startTime = Date.now();

  for (const [index, variant] of PREMIUM_VARIANTS.entries()) {
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`[${index + 1}/12] ${variant.id}`);
    console.log(`  Type: ${variant.type} | Intimacy: ${variant.intimacy}/10`);

    try {
      // Get fresh token
      const accessToken = await getGcloudToken();

      // STEP 1: Generate ultra-detailed components
      console.log(`  🔄 Ultra RLM: Generating hyper-detailed components...`);
      const [model, wardrobe, environment, pose, lighting] = await Promise.all([
        generateUltraModel(variant.concept, variant.intimacy, accessToken),
        generateUltraWardrobe(variant.concept, variant.intimacy, accessToken),
        generateUltraEnvironment(variant.concept, variant.intimacy, accessToken),
        generateUltraPose(variant.concept, variant.poseHint, variant.intimacy, accessToken),
        generateUltraLighting(variant.timeOfDay, 'intimate dramatic', variant.intimacy, accessToken)
      ]);

      const camera = generateUltraCamera(variant.intimacy);

      const components = { model, wardrobe, environment, pose, lighting, camera };

      // STEP 2: Synthesize Ultra RLM prompt
      console.log(`  🔄 Ultra RLM: Synthesizing premium 10+ prompt...`);
      const ultraPrompt = synthesizeUltraPrompt(components, variant.intimacy, variant.type);
      console.log(`  ✅ Ultra RLM prompt (${ultraPrompt.length} chars)`);

      // STEP 3: Generate with Imagen 4 Ultra
      console.log(`  🎨 Generating with Imagen 4 Ultra...`);
      const imageData = await generateWithImagen4Ultra(ultraPrompt, accessToken);

      // Save image
      const filename = `ultra_rlm_premium_${variant.id}_${Date.now()}.png`;
      const filepath = `${OUTPUT_DIR}/${filename}`;
      const buffer = Buffer.from(imageData, 'base64');
      writeFileSync(filepath, buffer);

      const sizeMB = (buffer.length / 1024 / 1024).toFixed(2);
      console.log(`  ✅ ${filename} (${sizeMB} MB)`);

      results.push({
        variant: variant.id,
        type: variant.type,
        success: true,
        filename,
        sizeMB: parseFloat(sizeMB),
        intimacyLevel: variant.intimacy,
        promptLength: ultraPrompt.length
      });

      successCount++;

      // Wait between generations (except for last one)
      if (index < PREMIUM_VARIANTS.length - 1) {
        console.log(`\n⏳ Waiting 12s before next generation...`);
        await new Promise(r => setTimeout(r, 12000));
      }

    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      results.push({
        variant: variant.id,
        type: variant.type,
        success: false,
        error: error.message
      });
      failedCount++;

      // Still wait before next attempt
      if (index < PREMIUM_VARIANTS.length - 1) {
        console.log(`\n⏳ Waiting 12s before next generation...`);
        await new Promise(r => setTimeout(r, 12000));
      }
    }
  }

  // Final Summary
  const totalTime = ((Date.now() - startTime) / 60000).toFixed(1);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`\n🎉 GENERATION COMPLETE!\n`);

  if (successCount > 0) {
    console.log(`✅ SUCCESS: ${successCount}/12 (${Math.round(successCount/12*100)}%)`);

    const avgSize = (results.filter(r => r.success).reduce((sum, r) => sum + r.sizeMB, 0) / successCount).toFixed(2);
    const minSize = Math.min(...results.filter(r => r.success).map(r => r.sizeMB)).toFixed(2);
    const maxSize = Math.max(...results.filter(r => r.success).map(r => r.sizeMB)).toFixed(2);

    console.log(`📊 Quality: ${avgSize} MB avg (${minSize}-${maxSize} MB range)`);
    console.log(`⏱️  Total Time: ${totalTime} minutes`);

    console.log(`\n📸 Generated Images:\n`);

    // Group by type
    const midnight = results.filter(r => r.success && r.type === 'midnight_chiaroscuro');
    const candlelit = results.filter(r => r.success && r.type === 'candlelit_boudoir');

    if (midnight.length > 0) {
      console.log(`  🌙 MIDNIGHT CHIAROSCURO CRYSTALLINE (${midnight.length}):`);
      midnight.forEach((r, i) => {
        console.log(`     ${i + 1}. ${r.filename} (${r.sizeMB} MB)`);
      });
    }

    if (candlelit.length > 0) {
      console.log(`\n  🕯️  CANDLELIT BOUDOIR INTIMATE (${candlelit.length}):`);
      candlelit.forEach((r, i) => {
        console.log(`     ${i + 1}. ${r.filename} (${r.sizeMB} MB)`);
      });
    }
  }

  if (failedCount > 0) {
    console.log(`\n❌ FAILED: ${failedCount}/12`);
    console.log(`\nFailed variants:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.variant}: ${r.error}`);
    });
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`📄 Manifest: ${OUTPUT_DIR}/manifest-premium-12-${TIMESTAMP}.json`);

  // Save manifest
  writeFileSync(
    `${OUTPUT_DIR}/manifest-premium-12-${TIMESTAMP}.json`,
    JSON.stringify({
      results,
      successCount,
      failedCount,
      totalTime,
      avgSize: successCount > 0 ? (results.filter(r => r.success).reduce((sum, r) => sum + r.sizeMB, 0) / successCount).toFixed(2) : 0,
      timestamp: new Date().toISOString(),
      strategy: 'Ultra RLM',
      intimacyLevel: '10+',
      framework: 'MIN COVERAGE + MAX ARTISTIC REVEAL'
    }, null, 2)
  );

  console.log(`\n${'═'.repeat(70)}\n`);
}

generatePremium12().catch(console.error);
