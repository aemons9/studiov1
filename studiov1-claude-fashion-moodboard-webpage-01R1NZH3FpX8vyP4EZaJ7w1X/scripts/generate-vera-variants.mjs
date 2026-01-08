#!/usr/bin/env node
/**
 * Generate Imagen 4 Ultra variants using Vertex AI
 * Uses the same auth flow as the web app
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get fresh credentials from gcloud CLI
function getCredentials() {
  const token = execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  const project = execSync('gcloud config get-value project 2>/dev/null', { encoding: 'utf-8' }).trim();
  return { token, project };
}

// Generate with Imagen 4 Ultra
async function generateImage(prompt, config, variantName) {
  const { token, project } = config;
  const location = 'us-central1';
  const model = 'imagen-4.0-ultra-generate-001';

  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:predict`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      aspectRatio: '3:4', // Portrait for fashion
      sampleCount: 1,
      sampleImageSize: '2048',
      negativePrompt: 'blurry, distorted, deformed, low quality, text, watermark, cartoon, anime',
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

  console.log(`\n🎨 Generating: ${variantName}`);
  console.log(`   Model: ${model}`);
  console.log(`   Project: ${project}`);
  console.log(`   Prompt length: ${prompt.length} chars`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error ${response.status}:`, errorText.substring(0, 500));
      return null;
    }

    const data = await response.json();

    if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
      const base64 = data.predictions[0].bytesBase64Encoded;
      const buffer = Buffer.from(base64, 'base64');

      // Save to file
      const outputDir = './generated-vera-variants';
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filename = `${variantName}_${Date.now()}.png`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, buffer);

      console.log(`   ✅ Saved: ${filepath} (${(buffer.length / 1024).toFixed(1)} KB)`);
      return filepath;
    } else if (data.predictions?.[0]?.raiFilteredReason) {
      console.log(`   ⚠️ Filtered: ${data.predictions[0].raiFilteredReason}`);
      return null;
    } else {
      console.log(`   ❌ No image returned`);
      console.log('   Response:', JSON.stringify(data, null, 2).substring(0, 500));
      return null;
    }
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return null;
  }
}

// Main prompt from user
const BASE_PROMPT = `An Indian fashion model (height 5'8"), with a sensual and curvaceous fit hourglass figure (bust 38DD", waist 27", hips 42"). Features a captivating, magnetic gaze, full lips, and a beautiful dusky skin tone that glows under soft light. Exudes an aura of confident, commanding seduction. A sensuous reclining pose on the office couch, one leg elegantly bent with foot tucked under, the other extended with an air of casual allure. One arm reaches sensuously along the couch back, the other placed gently on her stomach. Her inviting smile emanates a quiet, sensuous confidence. Hair: jet black, tousled, natural waves suggesting authenticity and ease, 'just finished work' aesthetic. Skin finish: Natural Glow. Hands & Nails: Natural & Unadorned with soft nude polish. Tattoos: none. Piercings: none. Body art: none. Nail art: Soft nude polish. High heels kicked off nearby, barefoot. Wardrobe: Undone professional: a partially unbuttoned silk mesh textured blouse in charcoal grey revealing a mini mesh delicate black lace foundation piece. High-waisted avant garde cuts based tailored foundation lower garment discarded with belt loosened and minimal coverage. The coverage is only due to the lace of garments thats not fully discarded creative natural draping in bust and inner thighs. Jacket discarded near the sofa. Environment: high intimacy, Private executive office with modern grey couch, contemporary art on walls, warm accent lighting, and the feeling of after-hours privacy. Lighting: Peter Lindbergh-inspired natural, soft lighting: ambient room light creates even, flattering illumination without drama, emphasizing authentic beauty and relaxed private intimate moment. Camera: 35mm lens, f/2.0 aperture, 2.5 m distance. Angle: Slightly high angle, intimate viewer perspective. Framing: Full body shot with couch dominating lower portion. Color Grade: Warm & Natural with soft shadows, authentic color grading suggesting real moment. Style: Private & Personal meets Peter Lindbergh's natural beauty philosophy. Quality: Shot on Canon EOS R5 for natural color science and beautiful skin tone rendering. Figure & Form: Natural Elegance: The relaxed pose and partially unbuttoned attire suggest authentic after-hours intimacy without affectation. Skin micro-details: Authentic skin texture with natural variations, freckles, and realistic beauty without retouching. Fabric physics: The silk blouse shows realistic wrinkles from wear. Tailored high waisted trousers display natural reveal with side cuts open curves placement for tight hip curves reveal with mesh overall fabric thonglike architecture. Material properties: mesh Soft silk, delicate lace, avant garde mesh high waisted open cut mini lower foundation, and fabric couch upholstery create comfortable material palette.`;

// Strategy variants
const VARIANTS = [
  {
    name: 'vera_strategy1_cinematic',
    prefix: 'Hyperrealistic cinematic photograph, museum-quality fine art portrait. ',
    suffix: ' Masterful composition with perfect lighting. Shot on Phase One IQ4 150MP for exceptional detail and tonal range.'
  },
  {
    name: 'vera_strategy2_editorial',
    prefix: 'High-end fashion editorial photograph for Vogue. ',
    suffix: ' Professional studio lighting with dramatic shadows. Shot on Hasselblad X2D with 90mm lens at f/2.8.'
  },
  {
    name: 'vera_strategy3_intimate',
    prefix: 'Intimate fine art boudoir photograph with soft natural lighting. ',
    suffix: ' Painterly quality with rich skin tones and beautiful bokeh. Shot on Leica M11 Monochrom with Noctilux 50mm f/0.95.'
  },
  {
    name: 'vera_strategy4_artistic',
    prefix: 'Fine art nude photography in the style of Helmut Newton meets Annie Leibovitz. ',
    suffix: ' Chiaroscuro lighting creating sculptural forms. Maximum artistic expression with museum-quality execution.'
  }
];

async function main() {
  console.log('🚀 VERALABS Imagen 4 Ultra Generation');
  console.log('=====================================');

  const credentials = getCredentials();
  console.log(`✅ Project: ${credentials.project}`);
  console.log(`✅ Token: ${credentials.token.substring(0, 20)}...`);

  const results = [];

  for (const variant of VARIANTS) {
    const fullPrompt = variant.prefix + BASE_PROMPT + variant.suffix;
    const result = await generateImage(fullPrompt, credentials, variant.name);
    results.push({ variant: variant.name, file: result });

    // Small delay between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n========== RESULTS ==========');
  results.forEach(r => {
    console.log(`${r.file ? '✅' : '❌'} ${r.variant}: ${r.file || 'Failed'}`);
  });
}

main().catch(console.error);
