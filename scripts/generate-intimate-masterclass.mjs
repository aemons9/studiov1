#!/usr/bin/env node
/**
 * VERALABS Intimate Masterclass Generator
 * Generates sensuous, artistic images with Indian hourglass muse model
 * Using Vertex AI Imagen 4.0 Ultra
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-intimate-masterclass';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// VERALABS Masterclass aesthetic constants
const BRAND_AESTHETIC = {
  colorPalette: 'warm golden tones, rich amber, deep burgundy, champagne highlights, soft cream shadows',
  lighting: 'dramatic chiaroscuro lighting with venetian blind shadows, golden hour warmth, studio rim lighting',
  mood: 'intimate, sensuous, artistic, museum-quality fine art',
  style: 'professional boudoir photography, Helmut Newton inspired, fine art nude aesthetic'
};

// Indian Hourglass Muse Model Definition
const MUSE_MODEL = {
  name: 'Indian Hourglass Goddess Muse',
  description: `Stunning Indian woman, late 20s, perfect hourglass figure with generous curves,
    voluptuous athletic build, flawless caramel skin with golden undertones,
    long flowing black hair with subtle waves, expressive dark almond eyes,
    full sensual lips, high cheekbones, elegant neck and shoulders,
    confident yet intimate presence, natural beauty with minimal makeup`,
  physique: 'generous hourglass curves, full bust, defined waist, rounded hips, toned athletic thighs, graceful feminine form'
};

// Intimate Session Themes - Fashion Editorial Style
const SESSION_THEMES = [
  {
    id: 'golden_touch',
    name: 'Golden Touch',
    collection: 'GOLDEN HOUR COLLECTION',
    description: 'Elegant golden hour fashion portraits',
    prompts: [
      {
        pose: 'Standing elegantly with one hand on hip, confident smile, looking directly at camera',
        wardrobe: 'luxurious champagne silk evening gown with draped neckline, elegant gold jewelry',
        lighting: 'warm golden hour sunlight streaming through windows, creating beautiful rim lighting',
        environment: 'luxurious penthouse with floor-to-ceiling windows, cream and gold interior design'
      },
      {
        pose: 'Seated gracefully on velvet chair, one leg crossed elegantly, hand resting on knee',
        wardrobe: 'elegant burgundy satin cocktail dress, delicate gold earrings, sophisticated style',
        lighting: 'soft studio lighting with warm golden tones, beautiful catchlights in eyes',
        environment: 'elegant photography studio with velvet drapes and gold accents'
      },
      {
        pose: 'Leaning against wall with arms crossed, confident expression, slight head tilt',
        wardrobe: 'cream cashmere sweater off one shoulder, gold chain necklace, effortlessly elegant',
        lighting: 'natural window light creating soft shadows, warm and inviting atmosphere',
        environment: 'minimalist white studio, clean modern aesthetic'
      }
    ]
  },
  {
    id: 'shadow_whispers',
    name: 'Shadow Whispers',
    collection: 'CHIAROSCURO COLLECTION',
    description: 'Dramatic light and shadow fashion editorial',
    prompts: [
      {
        pose: 'Standing in profile, elegant posture, one hand lightly touching neck, looking into distance',
        wardrobe: 'sophisticated black velvet evening gown with high slit, statement gold earrings',
        lighting: 'venetian blind shadows casting dramatic stripes, high contrast chiaroscuro effect',
        environment: 'minimalist studio with single window, dramatic noir atmosphere'
      },
      {
        pose: 'Seated on high stool, legs crossed elegantly, hands on knee, intense gaze at camera',
        wardrobe: 'tailored black blazer dress, minimal jewelry, powerful elegant look',
        lighting: 'single dramatic spotlight from side, creating sculptural shadows on face',
        environment: 'pure black backdrop, fashion editorial minimalism'
      },
      {
        pose: 'Walking forward mid-stride, confident posture, arms naturally at sides, direct eye contact',
        wardrobe: 'flowing black silk maxi dress, dramatic movement in fabric, elegant gold belt',
        lighting: 'dramatic rim lighting from behind, silhouette effect, editorial fashion',
        environment: 'dark studio with atmospheric haze, high fashion runway mood'
      }
    ]
  },
  {
    id: 'silk_surrender',
    name: 'Silk Surrender',
    collection: 'LIQUID LUXURY COLLECTION',
    description: 'Luxurious silk and satin fashion photography',
    prompts: [
      {
        pose: 'Standing gracefully wrapped in flowing fabric, hands gathering silk at chest, serene expression',
        wardrobe: 'flowing champagne silk kaftan with gold embroidery, elegant draping',
        lighting: 'soft studio lighting creating luminous fabric glow, beauty lighting on face',
        environment: 'minimalist white space, floating silk fabrics, ethereal atmosphere'
      },
      {
        pose: 'Reclining elegantly on daybed, one arm supporting head, relaxed confident expression',
        wardrobe: 'burgundy satin loungewear set, elegant pajama style, luxurious fabric',
        lighting: 'warm soft box lighting, fabric catching beautiful highlights',
        environment: 'luxury bedroom setting, silk pillows, cream and gold palette'
      },
      {
        pose: 'Twirling with fabric flowing outward, captured mid-motion, joyful expression',
        wardrobe: 'gold silk evening gown with flowing train, dramatic movement',
        lighting: 'dramatic side lighting emphasizing fabric movement and texture',
        environment: 'elegant ballroom setting, chandeliers, fashion editorial mood'
      }
    ]
  },
  {
    id: 'mirror_reflections',
    name: 'Mirror Reflections',
    collection: 'VANITY COLLECTION',
    description: 'Elegant moments of feminine self-appreciation',
    prompts: [
      {
        pose: 'Standing before mirror, adjusting elegant necklace, soft smile at reflection',
        wardrobe: 'elegant black cocktail dress, statement diamond necklace, sophisticated look',
        lighting: 'soft vanity lighting with warm golden glow, flattering beauty light',
        environment: 'vintage gilded mirror, elegant dressing room, classic glamour'
      },
      {
        pose: 'Seated at vanity, applying lipstick, captured mid-ritual, elegant feminine moment',
        wardrobe: 'cream silk blouse with pearl buttons, elegant minimal makeup look',
        lighting: 'natural window light mixed with warm vanity lights, romantic golden hour',
        environment: 'luxurious marble vanity, crystal perfume bottles, Parisian boudoir'
      },
      {
        pose: 'Profile view looking at mirror reflection, elegant neck and shoulders visible',
        wardrobe: 'backless champagne satin evening gown, elegant updo hairstyle, pearl earrings',
        lighting: 'dramatic rim lighting from behind, face beautifully lit by mirror reflection',
        environment: 'full length ornate mirror, elegant dark backdrop, theatrical lighting'
      }
    ]
  },
  {
    id: 'sensual_repose',
    name: 'Sensual Repose',
    collection: 'RELAXED ELEGANCE',
    description: 'Elegant moments of relaxation and confidence',
    prompts: [
      {
        pose: 'Reclining on chaise lounge, one arm behind head, relaxed confident expression',
        wardrobe: 'elegant cream cashmere wrap dress, minimal gold jewelry, effortless style',
        lighting: 'soft morning light through sheer curtains, warm and inviting',
        environment: 'luxurious living room, velvet furniture, cream and gold palette'
      },
      {
        pose: 'Lying on side propped on elbow, reading book, natural relaxed moment',
        wardrobe: 'comfortable silk pajama set in blush pink, elegant loungewear',
        lighting: 'soft natural light creating gentle shadows, cozy atmosphere',
        environment: 'elegant bedroom with fine linens, afternoon relaxation mood'
      },
      {
        pose: 'Curled up on armchair with cup of tea, feet tucked under, peaceful expression',
        wardrobe: 'oversized cream knit sweater, comfortable elegant casual',
        lighting: 'warm golden hour light through window, intimate cozy feeling',
        environment: 'cozy reading nook, floor-to-ceiling windows, cream tones'
      }
    ]
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (!data.success || !data.token) {
    throw new Error('Failed to get OAuth token');
  }
  return data.token;
}

function buildPrompt(theme, promptConfig) {
  // Build a tasteful, artistic prompt that works with Imagen's safety guidelines
  return `Professional fashion and beauty photography, elegant portrait.

Beautiful Indian woman in her late 20s with long dark hair, expressive eyes, elegant features,
wearing ${promptConfig.wardrobe}.

${promptConfig.pose}

Setting: ${promptConfig.environment}

Lighting: ${promptConfig.lighting}

Style: High-end fashion editorial photography, Vogue magazine quality,
elegant and sophisticated, warm golden color palette,
shot on professional medium format camera, shallow depth of field,
beautiful skin texture, magazine cover quality.

Mood: Confident, elegant, artistic, empowering feminine beauty.`;
}

async function generateImage(prompt, outputPath, oauthToken) {
  // Use standard Imagen 4.0 (higher quota) instead of Ultra
  const endpoint = `publishers/google/models/imagen-4.0-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: '9:16', // Instagram portrait format
      personGeneration: 'allow_adult',
      safetyFilterLevel: 'block_none',
      addWatermark: false
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Imagen API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  // Debug: log the response structure
  if (!result.predictions || result.predictions.length === 0) {
    console.log('      Response:', JSON.stringify(result, null, 2).slice(0, 500));
    throw new Error('No predictions in response - content may have been filtered');
  }

  const prediction = result.predictions[0];

  if (prediction.bytesBase64Encoded) {
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    return true;
  }

  // Check for RAI filtering
  if (prediction.raiFilteredReason) {
    throw new Error(`Content filtered: ${prediction.raiFilteredReason}`);
  }

  console.log('      Prediction structure:', Object.keys(prediction));
  throw new Error('No image data in prediction');
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║        🎨 INTIMATE MASTERCLASS IMAGE GENERATOR 🎨                        ║
║                                                                          ║
║     Indian Hourglass Muse • Sensuous Fine Art • Gallery Quality          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get OAuth token
  log('Authenticating with Vertex AI...');
  let oauthToken;
  try {
    oauthToken = await getOAuthToken();
    log('✅ OAuth token obtained');
  } catch (err) {
    console.error('❌ Failed to get OAuth token:', err.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const specificTheme = args[0];
  const maxImages = parseInt(args[1]) || 3; // Images per theme

  const themesToGenerate = specificTheme
    ? SESSION_THEMES.filter(t => t.id === specificTheme)
    : SESSION_THEMES;

  if (themesToGenerate.length === 0) {
    console.error(`❌ Theme not found: ${specificTheme}`);
    console.log('Available themes:', SESSION_THEMES.map(t => t.id).join(', '));
    process.exit(1);
  }

  const results = [];

  for (const theme of themesToGenerate) {
    console.log(`\n${'═'.repeat(70)}`);
    log(`🎨 GENERATING: ${theme.name}`);
    console.log(`${'═'.repeat(70)}`);
    log(`   Collection: ${theme.collection}`);
    log(`   Description: ${theme.description}`);

    // Create theme directory
    const themeDir = path.join(OUTPUT_DIR, theme.id);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    const promptsToGenerate = theme.prompts.slice(0, maxImages);

    for (let i = 0; i < promptsToGenerate.length; i++) {
      const promptConfig = promptsToGenerate[i];
      const prompt = buildPrompt(theme, promptConfig);
      const timestamp = Date.now();
      const outputPath = path.join(themeDir, `${theme.id}_${i + 1}_${timestamp}.jpg`);

      log(`   📸 Generating image ${i + 1}/${promptsToGenerate.length}...`);

      try {
        await generateImage(prompt, outputPath, oauthToken);
        log(`   ✅ Saved: ${path.basename(outputPath)}`);
        results.push({
          theme: theme.name,
          collection: theme.collection,
          path: outputPath,
          status: 'success'
        });

        // Small delay between generations
        await new Promise(r => setTimeout(r, 2000));

      } catch (err) {
        log(`   ❌ Failed: ${err.message}`);
        results.push({
          theme: theme.name,
          collection: theme.collection,
          error: err.message,
          status: 'failed'
        });
      }
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    GENERATION COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log(`\n  Generated images saved to: ${OUTPUT_DIR}`);
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'generation-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    model: MUSE_MODEL.name,
    results: results
  }, null, 2));
  log(`📋 Manifest saved: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
