#!/usr/bin/env node
/**
 * MEERA RECURSIVE RLM - REMAINING 8 FAILED IMAGES
 * Generate only the images that failed in the first run
 * Uses optimized Imagen 4 Ultra configuration (5+MB images)
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
          const waitTime = Math.pow(2, attempt) * 3000; // Exponential backoff: 3s, 6s, 12s
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
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  throw new Error('Max retries exceeded for Vertex AI Gemini');
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED MEERA MUSE - CANNOT BE ALTERED
// ═══════════════════════════════════════════════════════════════════════════════
const LOCKED_MEERA_MUSE = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips creating perfect sculptural hourglass silhouette. Warm caramel bronze skin with natural golden-amber undertones, authentic skin texture with visible natural pores and fine vellus hair catching light, no artificial airbrushing. Captivating deep brown magnetic eyes with thick dark lashes and subtle kohl enhancement, full sensual lips with natural color, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural tousled waves and subtle volume. Natural matte skin finish with authentic luminosity, no oily sheen. Confident sensual energy with authentic natural beauty, commanding presence`;

// ═══════════════════════════════════════════════════════════════════════════════
// ONLY THE 8 FAILED VARIATIONS FROM FIRST RUN
// ═══════════════════════════════════════════════════════════════════════════════
const LIGHTING_VARIATIONS = {
  midnight_chiaroscuro: {
    id: 'midnight_chiaroscuro',
    timeOfDay: 'midnight',
    mood: 'dramatic intimate',
    desc: 'Midnight chiaroscuro with single dramatic spotlight creating 80% shadow, bronze highlights where light catches warm skin, Renaissance lighting mastery'
  },
  evening_golden: {
    id: 'evening_golden',
    timeOfDay: 'evening',
    mood: 'warm intimate',
    desc: 'Evening golden hour with warm amber sunlight streaming through floor-to-ceiling windows, soft natural glow, cinematic warmth'
  },
  candlelit: {
    id: 'candlelit',
    timeOfDay: 'evening',
    mood: 'romantic intimate',
    desc: 'Candlelit warm amber glow with flickering candlelight dancing across skin, multiple candles creating soft directional light, romantic atmospheric shadows'
  },
  firelit: {
    id: 'firelit',
    timeOfDay: 'evening',
    mood: 'cozy intimate',
    desc: 'Fireplace glow with warm orange fire light illuminating form, dancing flames creating dynamic shadows, cozy atmospheric warmth'
  }
};

const INDOOR_SETTINGS = {
  bedroom: { id: 'bedroom', desc: 'Sunlit luxury bedroom with white linen sheets on king bed, soft morning light through sheer curtains, intimate private space' },
  boudoir: { id: 'boudoir', desc: 'Victorian boudoir with deep burgundy velvet drapes, ornate gold mirror, sophisticated feminine space' },
  penthouse: { id: 'penthouse', desc: 'Modern penthouse with floor-to-ceiling windows, city skyline at night, sophisticated urban elegance' },
  studio: { id: 'studio', desc: 'Professional photography studio with soft diffused lighting setup, neutral backdrop, artistic space' },
  spa: { id: 'spa', desc: 'Luxury spa with white marble surfaces, warm steam, candles and soft ambient light, tranquil atmosphere' },
  cabin: { id: 'cabin', desc: 'Rustic wooden cabin with exposed beams, cream sheepskin throw, intimate cozy space' }
};

const COVERAGE_OPTIONS = {
  thread: { id: 'thread', intimacy: 10, desc: 'Single gossamer thread draped minimally across form, barely visible, artistic fine art presentation' },
  chains: { id: 'chains', intimacy: 10, desc: 'Delicate 18k gold body chain jewelry as sole adornment, catching light beautifully, sculptural metallic art' },
  gossamer: { id: 'gossamer', intimacy: 9, desc: 'Gossamer sheer champagne silk panel draped strategically, translucent ethereal coverage' },
  mesh: { id: 'mesh', intimacy: 10, desc: 'Crystalline micro-mesh catching light, spider-web delicate threads, architectural minimal textile' }
};

const POSE_VARIATIONS = {
  odalisque: { id: 'odalisque', desc: 'Classical odalisque recline on side, head propped on hand, natural body curve, legs slightly bent, relaxed authentic positioning' },
  venus: { id: 'venus', desc: 'Venus-inspired pose with one arm gracefully across torso, other hand in hair, soft vulnerable expression, classical beauty' },
  arch: { id: 'arch', desc: 'Dramatic back arch kneeling, head tilted back, arms raised behind, theatrical artistic pose, sculptural line' },
  recline: { id: 'recline', desc: 'Reclining on white sheets, one knee bent and raised, arms relaxed at sides, natural intimate positioning' }
};

// Only the 8 failed variations
const FAILED_VARIATIONS = [
  { lighting: 'midnight_chiaroscuro', setting: 'boudoir', coverage: 'chains', pose: 'venus' },
  { lighting: 'evening_golden', setting: 'bedroom', coverage: 'chains', pose: 'venus' },
  { lighting: 'evening_golden', setting: 'penthouse', coverage: 'thread', pose: 'odalisque' },
  { lighting: 'evening_golden', setting: 'spa', coverage: 'gossamer', pose: 'arch' },
  { lighting: 'evening_golden', setting: 'cabin', coverage: 'mesh', pose: 'recline' },
  { lighting: 'candlelit', setting: 'boudoir', coverage: 'thread', pose: 'recline' },
  { lighting: 'candlelit', setting: 'studio', coverage: 'chains', pose: 'venus' },
  { lighting: 'firelit', setting: 'spa', coverage: 'chains', pose: 'venus' }
];

// RLM SUB-LM COMPONENT GENERATION (same as main script)
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

async function generateRecursivePrompt(v) {
  const light = LIGHTING_VARIATIONS[v.lighting];
  const setting = INDOOR_SETTINGS[v.setting];
  const coverage = COVERAGE_OPTIONS[v.coverage];
  const pose = POSE_VARIATIONS[v.pose];
  const intimacy = coverage.intimacy;

  console.log('  🔄 RLM: Generating components via sub-LM calls...');

  // Parallel component generation with delays between calls
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

// IMAGEN 4 ULTRA GENERATION - HIGH QUALITY (5+MB images)
async function generateWithImagen4(prompt) {
  const token = await getCachedToken();
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const model = 'imagen-4.0-ultra-generate-001';

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  const requestBody = {
    instances: [{ prompt: prompt }],
    parameters: {
      aspectRatio: '3:4',
      sampleCount: 1,
      sampleImageSize: '2048', // MAXIMUM RESOLUTION (produces 5+MB images)
      negativePrompt: '',
      enhancePrompt: false,
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      addWatermark: false,
      includeRaiReason: true,
      language: 'auto',
      outputOptions: {
        mimeType: 'image/png',
        compressionQuality: 100
      }
    }
  };

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

  const prediction = data.predictions[0];

  // Check if blocked by safety filters
  if (prediction.raiFilteredReason) {
    throw new Error(`Blocked by safety filters: ${prediction.raiFilteredReason}`);
  }

  // Extract base64 image data
  if (prediction.bytesBase64Encoded) {
    return prediction.bytesBase64Encoded;
  } else if (prediction.mimeType && prediction.bytesBase64Encoded) {
    return prediction.bytesBase64Encoded;
  } else {
    console.error('❌ Unexpected API response structure:');
    console.error('Prediction keys:', Object.keys(prediction));
    console.error('Full prediction:', JSON.stringify(prediction, null, 2));
    throw new Error('No image data found in API response - check console for details');
  }
}

async function generate(v, idx) {
  const light = LIGHTING_VARIATIONS[v.lighting];
  const setting = INDOOR_SETTINGS[v.setting];
  const coverage = COVERAGE_OPTIONS[v.coverage];
  const pose = POSE_VARIATIONS[v.pose];
  const intimacy = coverage.intimacy;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`[${idx + 1}/${FAILED_VARIATIONS.length}] ${light.id} + ${setting.id} + ${coverage.id} + ${pose.id}`);
  console.log(`  Intimacy: ${intimacy} | ${light.timeOfDay}`);

  try {
    const recursivePrompt = await generateRecursivePrompt(v);
    console.log(`  ✅ RLM prompt generated (${recursivePrompt.length} chars)`);

    console.log(`  🎨 Generating with Imagen 4 Ultra (5+MB quality)...`);
    const base64Image = await generateWithImagen4(recursivePrompt);

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

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔄 MEERA RECURSIVE RLM - REMAINING 8 IMAGES                               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Strategy: MIT CSAIL-inspired Recursive Prompting (RLM)                    ║
║   Model: Imagen 4.0 Ultra Generate (sampleImageSize: 2048)                  ║
║   Quality: 5+MB PNG images (same as web app)                                ║
║   Total: 8 failed images from first run                                     ║
╚══════════════════════════════════════════════════════════════════════════════╝`);

  const results = [];

  for (let i = 0; i < FAILED_VARIATIONS.length; i++) {
    results.push(await generate(FAILED_VARIATIONS[i], i));

    if (i < FAILED_VARIATIONS.length - 1) {
      console.log(`\n⏳ Waiting 12s before next generation...`);
      await new Promise(r => setTimeout(r, 12000));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✅ SUCCESS: ${successful.length}/${FAILED_VARIATIONS.length} (${((successful.length/FAILED_VARIATIONS.length)*100).toFixed(0)}%)`);

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

  const manifest = {
    generated: new Date().toISOString(),
    strategy: 'Recursive Prompting (RLM) - MIT CSAIL (Remaining)',
    model: 'imagen-4.0-ultra-generate-001',
    sampleImageSize: '2048',
    total: FAILED_VARIATIONS.length,
    successful: successful.length,
    failed: failed.length,
    successRate: `${((successful.length/FAILED_VARIATIONS.length)*100).toFixed(0)}%`,
    results
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest-remaining.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`📄 Manifest: ${OUTPUT_DIR}/manifest-remaining.json`);
}

main().catch(console.error);
