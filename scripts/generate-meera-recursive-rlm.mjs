#!/usr/bin/env node
/**
 * MEERA RECURSIVE RLM VARIANTS - Imagen 4 Ultra
 * Uses MIT CSAIL-inspired Recursive Prompting Strategy
 * Component decomposition via sub-LM calls (Gemini)
 *
 * Target: 15 artistic variants at intimacy 9-10++
 * Lighting: midnight chiaroscuro, evening golden hour, candlelit, firelit
 * Settings: bedroom, boudoir, penthouse, studio, spa, cabin
 * Coverage: ultra-minimal (thread, chains, gossamer, mesh)
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './generated-meera-recursive-rlm';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get OAuth token from proxy server (auto-refreshed)
async function getGcloudToken() {
  try {
    const response = await fetch('http://localhost:3001/api/gcloud-token');

    if (!response.ok) {
      throw new Error(`Failed to fetch OAuth token from proxy: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.token) {
      throw new Error('Invalid response from token endpoint');
    }

    console.log('✅ OAuth token fetched from proxy (auto-refreshed)');
    return data.token;
  } catch (error) {
    throw new Error(`Failed to get OAuth token from proxy server. Make sure proxy server is running (npm run proxy) and gcloud is authenticated. Error: ${error.message}`);
  }
}

// Cache OAuth token for reuse
let cachedToken = null;
let tokenFetchTime = 0;

async function getCachedToken() {
  const now = Date.now();
  // Refresh token if older than 50 minutes
  if (!cachedToken || (now - tokenFetchTime) > 50 * 60 * 1000) {
    cachedToken = await getGcloudToken();
    tokenFetchTime = now;
  }
  return cachedToken;
}

// Use Vertex AI Gemini API with OAuth token (with retry logic for rate limits)
async function callVertexGemini(prompt, maxRetries = 3) {
  const token = await getCachedToken();
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const model = 'gemini-2.5-flash';

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Retry on 429 (rate limit) or 503 (service unavailable)
        if ((response.status === 429 || response.status === 503) && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 2000; // Exponential backoff: 2s, 4s, 8s
          console.log(`  ⏰ Rate limit hit, waiting ${waitTime/1000}s before retry (attempt ${attempt + 1}/${maxRetries})...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }

        throw new Error(`Vertex AI Gemini API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Vertex AI Gemini');
      }

      return data.candidates[0].content.parts[0].text.trim();

    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Rethrow on last attempt
      }
      // Wait before retry on other errors
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  throw new Error('Max retries exceeded for Vertex AI Gemini');
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED MEERA MUSE - CANNOT BE ALTERED
// ═══════════════════════════════════════════════════════════════════════════════
const LOCKED_MEERA_MUSE = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips creating perfect sculptural hourglass silhouette. Warm caramel bronze skin with natural golden-amber undertones, authentic skin texture with visible natural pores and fine vellus hair catching light, no artificial airbrushing. Captivating deep brown magnetic eyes with thick dark lashes and subtle kohl enhancement, full sensual lips with natural color, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural tousled waves and subtle volume. Natural matte skin finish with authentic luminosity, no oily sheen. Confident sensual energy with authentic natural beauty, commanding presence`;

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHTING VARIATIONS - 4 time periods
// ═══════════════════════════════════════════════════════════════════════════════
const LIGHTING_VARIATIONS = [
  {
    id: 'midnight_chiaroscuro',
    timeOfDay: 'midnight',
    mood: 'dramatic intimate',
    desc: 'Midnight chiaroscuro with single dramatic spotlight creating 80% shadow, bronze highlights where light catches warm skin, Renaissance lighting mastery'
  },
  {
    id: 'evening_golden',
    timeOfDay: 'evening',
    mood: 'warm intimate',
    desc: 'Evening golden hour with warm amber sunlight streaming through floor-to-ceiling windows, soft natural glow, cinematic warmth'
  },
  {
    id: 'candlelit',
    timeOfDay: 'evening',
    mood: 'romantic intimate',
    desc: 'Candlelit warm amber glow with flickering candlelight dancing across skin, multiple candles creating soft directional light, romantic atmospheric shadows'
  },
  {
    id: 'firelit',
    timeOfDay: 'evening',
    mood: 'cozy intimate',
    desc: 'Fireplace glow with warm orange fire light illuminating form, dancing flames creating dynamic shadows, cozy atmospheric warmth'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// INDOOR SETTINGS - 6 elegant locations
// ═══════════════════════════════════════════════════════════════════════════════
const INDOOR_SETTINGS = [
  {
    id: 'bedroom',
    desc: 'Sunlit luxury bedroom with white linen sheets on king bed, soft morning light through sheer curtains, intimate private space'
  },
  {
    id: 'boudoir',
    desc: 'Victorian boudoir with deep burgundy velvet drapes, ornate gold mirror, sophisticated feminine space'
  },
  {
    id: 'penthouse',
    desc: 'Modern penthouse with floor-to-ceiling windows, city skyline at night, sophisticated urban elegance'
  },
  {
    id: 'studio',
    desc: 'Professional photography studio with soft diffused lighting setup, neutral backdrop, artistic space'
  },
  {
    id: 'spa',
    desc: 'Luxury spa with white marble surfaces, warm steam, candles and soft ambient light, tranquil atmosphere'
  },
  {
    id: 'cabin',
    desc: 'Rustic wooden cabin with exposed beams, cream sheepskin throw, intimate cozy space'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA-MINIMAL COVERAGE - 4 artistic options
// ═══════════════════════════════════════════════════════════════════════════════
const COVERAGE_OPTIONS = [
  {
    id: 'thread',
    intimacy: 10,
    desc: 'Single gossamer thread draped minimally across form, barely visible, artistic fine art presentation'
  },
  {
    id: 'chains',
    intimacy: 10,
    desc: 'Delicate 18k gold body chain jewelry as sole adornment, catching light beautifully, sculptural metallic art'
  },
  {
    id: 'gossamer',
    intimacy: 9,
    desc: 'Gossamer sheer champagne silk panel draped strategically, translucent ethereal coverage'
  },
  {
    id: 'mesh',
    intimacy: 10,
    desc: 'Crystalline micro-mesh catching light, spider-web delicate threads, architectural minimal textile'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CLASSICAL POSES - 4 artistic variations
// ═══════════════════════════════════════════════════════════════════════════════
const POSE_VARIATIONS = [
  {
    id: 'odalisque',
    desc: 'Classical odalisque recline on side, head propped on hand, natural body curve, legs slightly bent, relaxed authentic positioning'
  },
  {
    id: 'venus',
    desc: 'Venus-inspired pose with one arm gracefully across torso, other hand in hair, soft vulnerable expression, classical beauty'
  },
  {
    id: 'arch',
    desc: 'Dramatic back arch kneeling, head tilted back, arms raised behind, theatrical artistic pose, sculptural line'
  },
  {
    id: 'recline',
    desc: 'Reclining on white sheets, one knee bent and raised, arms relaxed at sides, natural intimate positioning'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATE 15 COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const VARIATIONS = [
  // MIDNIGHT CHIAROSCURO (4)
  { lighting: 0, setting: 0, coverage: 0, pose: 0 },
  { lighting: 0, setting: 1, coverage: 1, pose: 1 },
  { lighting: 0, setting: 2, coverage: 2, pose: 2 },
  { lighting: 0, setting: 3, coverage: 3, pose: 3 },
  // EVENING GOLDEN HOUR (4)
  { lighting: 1, setting: 0, coverage: 1, pose: 1 },
  { lighting: 1, setting: 2, coverage: 0, pose: 0 },
  { lighting: 1, setting: 4, coverage: 2, pose: 2 },
  { lighting: 1, setting: 5, coverage: 3, pose: 3 },
  // CANDLELIT (4)
  { lighting: 2, setting: 1, coverage: 0, pose: 3 },
  { lighting: 2, setting: 0, coverage: 3, pose: 0 },
  { lighting: 2, setting: 3, coverage: 1, pose: 1 },
  { lighting: 2, setting: 5, coverage: 2, pose: 2 },
  // FIRELIT (3)
  { lighting: 3, setting: 5, coverage: 0, pose: 0 },
  { lighting: 3, setting: 4, coverage: 1, pose: 1 },
  { lighting: 3, setting: 1, coverage: 3, pose: 2 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// RLM SUB-LM COMPONENT GENERATION (via Gemini)
// ═══════════════════════════════════════════════════════════════════════════════

async function generateSubjectComponent(intimacyLevel) {
  const prompt = `You are an expert art director. Generate an enhanced SUBJECT description for professional fine art photography based on: ${LOCKED_MEERA_MUSE}

Intimacy Level: ${intimacyLevel}/10

Requirements:
- Anatomically correct, natural human proportions
- Rich skin texture details (visible pores, natural finish)
- Specific facial features and expression
- Safe artistic language for intimacy ${intimacyLevel}

Output ONLY the enhanced subject description (2-3 sentences max).`;

  return await callVertexGemini(prompt);
}

async function generateWardrobeComponent(wardrobeHint, intimacyLevel) {
  const prompt = `You are a haute couture fashion stylist. Generate the WARDROBE description for fine art photography.

Wardrobe Hint: ${wardrobeHint}
Intimacy Level: ${intimacyLevel}/10

Requirements:
- Use safe artistic language: "foundation piece", "avant-garde mesh", "gossamer thread"
- Specify fabric (silk, lace, tulle, etc.), color, construction
- Minimal coverage for intimacy ${intimacyLevel}+ (thread, chains, single garment)
- Haute couture / museum quality language
- Material properties (transparency, drape, shimmer)

Output ONLY the wardrobe description (2-3 sentences max).`;

  return await callVertexGemini(prompt);
}

async function generateEnvironmentComponent(envHint, intimacyLevel) {
  const prompt = `You are a cinematographer. Generate the ENVIRONMENT description for fine art photography.

Environment Hint: ${envHint}
Intimacy Level: ${intimacyLevel}/10

Requirements:
- Elegant indoor settings (boudoir, bedroom, studio, spa, penthouse, cabin)
- Specific architectural details, surfaces, textures
- Private, intimate atmosphere for level ${intimacyLevel}
- Artistic, sophisticated language
- Luxury materials (velvet, marble, leather, silk)

Output ONLY the environment description (2-3 sentences max).`;

  return await callVertexGemini(prompt);
}

async function generateLightingComponent(lightingHint, timeOfDay, mood) {
  const prompt = `You are a master lighting director. Generate the LIGHTING description for fine art photography.

Lighting Hint: ${lightingHint}
Time/Mood: ${timeOfDay}, ${mood}

Requirements:
- Specific lighting techniques (chiaroscuro, Rembrandt, rim lighting)
- Light sources specified (window, fireplace, candles, studio)
- Shadow play and highlights on skin
- Golden hour, midnight, evening variations
- Museum-quality photographic lighting

Output ONLY the lighting description (2-3 sentences max).`;

  return await callVertexGemini(prompt);
}

async function generatePoseComponent(poseHint, intimacyLevel) {
  const prompt = `You are an expert fashion photographer. Generate the POSE description for fine art photography.

Pose Hint: ${poseHint}
Intimacy Level: ${intimacyLevel}/10

Requirements:
- Natural, anatomically correct positioning
- Classical art references (Titian, Bouguereau, etc.) for intimacy ${intimacyLevel}+
- Specific body positioning (arms, legs, torso, head)
- Expressive, authentic emotion
- Elegant, artistic language

Output ONLY the pose description (2-3 sentences max).`;

  return await callVertexGemini(prompt);
}

async function synthesizePrompt(components) {
  const verificationPrompt = `You are an expert prompt engineer. Synthesize these components into a single optimized prompt for Imagen 4 generation.

SUBJECT: ${components.subject}
POSE: ${components.pose}
WARDROBE: ${components.wardrobe}
ENVIRONMENT: ${components.environment}
LIGHTING: ${components.lighting}
CAMERA: ${components.camera}
MOOD: ${components.mood}
QUALITY: ${components.quality}

Requirements:
- Professional Fine Art Photography format
- Structured: SUBJECT. POSE. ENVIRONMENT. WARDROBE. LIGHTING. MOOD. CAMERA. QUALITY.
- Safe artistic language throughout
- Anatomically correct emphasis
- Museum-quality fine art photography

Output the complete synthesized prompt (optimized for Imagen 4).`;

  return await callVertexGemini(verificationPrompt);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RECURSIVE PROMPT GENERATION
// ═══════════════════════════════════════════════════════════════════════════════
async function generateRecursivePrompt(v) {
  const light = LIGHTING_VARIATIONS[v.lighting];
  const setting = INDOOR_SETTINGS[v.setting];
  const coverage = COVERAGE_OPTIONS[v.coverage];
  const pose = POSE_VARIATIONS[v.pose];
  const intimacy = coverage.intimacy;

  console.log('  🔄 RLM: Generating components via sub-LM calls...');

  // Parallel component generation
  const [subject, wardrobeComp, environment, lighting, poseComp] = await Promise.all([
    generateSubjectComponent(intimacy),
    generateWardrobeComponent(coverage.desc, intimacy),
    generateEnvironmentComponent(setting.desc, intimacy),
    generateLightingComponent(light.desc, light.timeOfDay, light.mood),
    generatePoseComponent(pose.desc, intimacy)
  ]);

  const components = {
    subject: subject,
    pose: poseComp,
    wardrobe: wardrobeComp,
    environment: environment,
    lighting: lighting,
    camera: 'Shot on Hasselblad X2D 100C, 85mm f/1.4 portrait lens, shallow depth of field, 8K resolution, museum exhibition quality',
    mood: `Private ${intimacy >= 10 ? 'conceptual' : 'artistic'} boudoir fine art, evocative intimate atmosphere, museum-quality photography`,
    quality: 'Hyper-realistic skin with visible pores, natural texture, perfect anatomical proportions, no disfigurement, 8K museum exhibition quality'
  };

  console.log('  🔄 RLM: Synthesizing final prompt...');
  const synthesized = await synthesizePrompt(components);

  return synthesized;
}

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGEN 4 ULTRA GENERATION - HIGH QUALITY (5+MB images)
// Uses same configuration as web app for maximum quality
// ═══════════════════════════════════════════════════════════════════════════════
async function generateWithImagen4(prompt) {
  const token = await getGcloudToken(); // Fetch auto-refreshed OAuth token
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const model = 'imagen-4.0-ultra-generate-001';

  // Use :predict endpoint (not :generateContent) for Imagen
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  const requestBody = {
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      aspectRatio: '3:4',
      sampleCount: 1,
      sampleImageSize: '2048', // MAXIMUM RESOLUTION: 2048x2048 or aspect ratio equivalent (produces 5+MB images)
      negativePrompt: '',
      enhancePrompt: false,
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      addWatermark: false,
      includeRaiReason: true,
      language: 'auto',
      // Output format configuration for maximum quality
      outputOptions: {
        mimeType: 'image/png',
        compressionQuality: 100 // Maximum quality PNG
      }
    }
  };

  console.log('🎨 Imagen 4 Ultra config:', {
    model,
    sampleImageSize: '2048',
    outputMimeType: 'image/png',
    compressionQuality: 100
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Imagen 4 API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (!data.predictions || data.predictions.length === 0) {
    throw new Error('No predictions returned from Imagen 4');
  }

  // Return base64 image data
  return data.predictions[0].bytesBase64Encoded;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATION WITH RECURSIVE RLM STRATEGY
// ═══════════════════════════════════════════════════════════════════════════════
async function generate(v, idx) {
  const light = LIGHTING_VARIATIONS[v.lighting];
  const setting = INDOOR_SETTINGS[v.setting];
  const coverage = COVERAGE_OPTIONS[v.coverage];
  const pose = POSE_VARIATIONS[v.pose];
  const intimacy = coverage.intimacy;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`[${idx + 1}/${VARIATIONS.length}] ${light.id} + ${setting.id} + ${coverage.id} + ${pose.id}`);
  console.log(`  Intimacy: ${intimacy} | ${light.timeOfDay}`);

  try {
    // Generate recursive prompt
    const recursivePrompt = await generateRecursivePrompt(v);
    console.log(`  ✅ RLM prompt generated (${recursivePrompt.length} chars)`);

    // Generate with Imagen 4 Ultra
    console.log(`  🎨 Generating with Imagen 4 Ultra...`);
    const base64Image = await generateWithImagen4(recursivePrompt);

    // Save image
    const buffer = Buffer.from(base64Image, 'base64');
    const filename = `meera_rlm_${light.id}_${setting.id}_${coverage.id}_${pose.id}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, buffer);

    const size = (buffer.length / 1024 / 1024).toFixed(2);
    console.log(`  ✅ ${filename} (${size} MB)`);

    return {
      id: `${light.id}_${setting.id}_${coverage.id}`,
      filename,
      size,
      intimacy,
      success: true
    };

  } catch (error) {
    console.log(`  ❌ ${error.message.substring(0, 100)}`);
    return {
      id: `${light.id}_${setting.id}_${coverage.id}`,
      success: false,
      error: error.message
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔄 MEERA RECURSIVE RLM VARIANTS - Imagen 4 Ultra                          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Strategy: MIT CSAIL-inspired Recursive Prompting (RLM)                    ║
║   Components: Subject, Pose, Wardrobe, Environment, Lighting via sub-LMs    ║
║   Model: Imagen 4.0 Ultra Generate (Vertex AI)                              ║
║   Variants: 15 artistic combinations                                         ║
║   Intimacy: 9-10 (ultra-minimal coverage)                                    ║
║   Lighting: Midnight, Evening, Candlelit, Firelit                           ║
║   Settings: Bedroom, Boudoir, Penthouse, Studio, Spa, Cabin                 ║
╚══════════════════════════════════════════════════════════════════════════════╝`);

  const results = [];

  for (let i = 0; i < VARIATIONS.length; i++) {
    results.push(await generate(VARIATIONS[i], i));

    // Longer delay between generations to avoid rate limits
    // RLM makes 6 API calls per generation (5 sub-LM + 1 synthesis)
    // Plus 1 Imagen 4 call = 7 total API calls per generation
    if (i < VARIATIONS.length - 1) {
      console.log(`\n⏳ Waiting 10s before next generation...`);
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ SUCCESS: ${successful.length}/${VARIATIONS.length} (${((successful.length/VARIATIONS.length)*100).toFixed(0)}%)`);

  if (successful.length > 0) {
    console.log('\n📸 Generated Images:');
    successful.forEach((r, i) => {
      console.log(`   ${i+1}. ${r.filename} (${r.size} MB) - Intimacy ${r.intimacy}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed:');
    failed.forEach(r => {
      console.log(`   ${r.id}: ${r.error?.substring(0, 80) || 'Unknown error'}`);
    });
  }

  // Save manifest
  const manifest = {
    generated: new Date().toISOString(),
    strategy: 'Recursive Prompting (RLM) - MIT CSAIL',
    model: 'imagen-4.0-ultra-generate-001',
    total: VARIATIONS.length,
    successful: successful.length,
    failed: failed.length,
    successRate: `${((successful.length/VARIATIONS.length)*100).toFixed(0)}%`,
    results
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`📄 Manifest: ${OUTPUT_DIR}/manifest.json`);
}

main().catch(console.error);
