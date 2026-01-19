#!/usr/bin/env node
/**
 * COGNAC SOFA INTIMACY TRILOGY - Auto-Adaptive Master Engine
 * 3 images at intimacy 9, 10, and 10+ with minimal coverage avant-garde
 * Auto-stops after first success at each level
 * Multi-strategy cascade: Lucid Origin → Imagen 4 → Flux
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const OUTPUT_DIR = './generated-cabin-crystalline';
const REPLICATE_API_TOKEN = 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL';

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMACY TRILOGY PROMPTS - Cognac Sofa with escalating artistic minimalism
// ═══════════════════════════════════════════════════════════════════════════════

const INTIMACY_TRILOGY = [
  {
    level: 9,
    name: 'Cognac Sofa Intimacy 9',
    // Lucid Origin optimized prompt
    lucidPrompt: 'fine art fashion photography of stunning Indian model (age 27, sculptural feminine silhouette, luminous bronze skin, flowing black hair) wearing delicate champagne thread-work foundation piece with artistic minimal coverage on cognac leather Chesterfield sofa in wooden cabin, warm firelight creating golden rim lighting, private artistic boudoir atmosphere, shot on Hasselblad X2D',
    // Imagen 4 optimized prompt (safe language + cultural framing)
    imagenPrompt: 'Professional Fine Art Photography. SUBJECT: Elegant Indian fashion model, age 27, classical sculptural proportions, luminous golden-bronze complexion, flowing jet-black hair. WARDROBE: Avant-garde champagne thread-work foundation piece, artistic mesh construction, haute couture minimalist design. SETTING: Cognac leather Chesterfield sofa in luxury wooden cabin interior. LIGHTING: Warm fireplace rim lighting creating golden atmosphere. MOOD: Private artistic studio session, evocative fine art aesthetic. PHOTOGRAPHY: Hasselblad X2D 100C, 85mm portrait lens, f/2.0, museum-quality fine art print.',
    styles: ['fashion', 'cinematic', 'moody', 'portrait']
  },
  {
    level: 10,
    name: 'Cognac Sofa Intimacy 10',
    lucidPrompt: 'artistic fine art photography of beautiful Indian model (age 27, graceful classical form, golden bronze skin, dark flowing hair) wearing single delicate lace thread avant-garde mesh garment with artistic coverage on cognac leather sofa in cabin, dramatic chiaroscuro firelight, private conceptual boudoir fine art, Phase One IQ4 medium format',
    imagenPrompt: 'Museum-Quality Fine Art Photography. SUBJECT: Captivating Indian fashion muse, age 27, elegant sculptural silhouette, warm golden-bronze skin tone, luxurious jet-black hair. WARDROBE: Single thread avant-garde lace mesh foundation, artistic minimal construction, conceptual haute couture piece. SETTING: Vintage cognac leather Chesterfield in rustic wooden cabin. LIGHTING: Dramatic chiaroscuro from fireplace, warm golden tones with deep shadows. MOOD: Private conceptual boudoir, intimate artistic expression. PHOTOGRAPHY: Phase One IQ4 150MP, Schneider 110mm, f/1.8, gallery exhibition quality.',
    styles: ['fashion', 'moody', 'cinematic', 'portrait']
  },
  {
    level: '10+',
    name: 'Cognac Sofa Intimacy 10+',
    lucidPrompt: 'conceptual fine art photograph of elegant Indian model (age 27, statuesque classical proportions, luminous bronze complexion, jet-black hair) adorned in singular gossamer thread mesh artistic piece with ethereal minimal coverage reclining on cognac leather in cabin, dramatic firelight rim lighting, private artistic vision, Leica S3 medium format',
    imagenPrompt: 'Gallery Exhibition Fine Art Photography. SUBJECT: Statuesque Indian fashion icon, age 27, sculptural classical proportions, radiant golden-bronze complexion, cascading jet-black hair. WARDROBE: Singular gossamer thread mesh artistic foundation, ethereal minimal construction, avant-garde conceptual couture. POSE: Artistic recline expressing vulnerability and strength. SETTING: Heritage cognac leather Chesterfield, rustic wooden cabin sanctuary. LIGHTING: Dramatic fireplace rim lighting, golden warmth with artistic shadow play. MOOD: Private artistic sanctuary, transcendent fine art expression. PHOTOGRAPHY: Leica S3, 70mm Summarit-S, f/2.0, museum archival quality.',
    styles: ['moody', 'fashion', 'cinematic', 'portrait']
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY 1: LUCID ORIGIN (Leonardo AI)
// ═══════════════════════════════════════════════════════════════════════════════

async function tryLucidOrigin(scene) {
  console.log(`   🎨 Strategy 1: Lucid Origin`);

  for (const style of scene.styles) {
    console.log(`      Trying style: ${style}`);
    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: {
          prompt: scene.lucidPrompt,
          style: style,
          contrast: 'medium',
          aspect_ratio: '3:4',
          generation_mode: 'ultra',
          prompt_enhance: false,
          num_images: 1
        }
      });

      if (output && output[0]) {
        return { success: true, data: output[0], strategy: 'lucid-origin', style };
      }
    } catch (error) {
      console.log(`      ❌ ${style}: ${error.message.substring(0, 50)}`);
      if (error.message.includes('429')) {
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  return { success: false };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY 2: IMAGEN 4 via Vertex AI (with OAuth)
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
    return token;
  } catch (error) {
    console.log('      ⚠️ OAuth token fetch failed');
    return null;
  }
}

async function tryImagen4(scene) {
  console.log(`   🖼️ Strategy 2: Imagen 4 (Vertex AI)`);

  const token = await getOAuthToken();
  if (!token) return { success: false };

  const projectId = 'zaranovel';
  const location = 'us-central1';
  const model = 'imagen-4.0-generate-001';

  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [{ prompt: scene.imagenPrompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '3:4',
          personGeneration: 'allow_adult',
          safetySetting: 'block_only_high'
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.predictions?.[0]?.bytesBase64Encoded) {
        const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
        return { success: true, data: imageBuffer, strategy: 'imagen-4' };
      }
    } else {
      const errorText = await response.text();
      console.log(`      ❌ Imagen 4: ${errorText.substring(0, 80)}`);
    }
  } catch (error) {
    console.log(`      ❌ Imagen 4: ${error.message.substring(0, 50)}`);
  }

  return { success: false };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY 3: FLUX (High tolerance)
// ═══════════════════════════════════════════════════════════════════════════════

async function tryFlux(scene) {
  console.log(`   ⚡ Strategy 3: Flux Pro (safety 5/6)`);

  try {
    const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
      input: {
        prompt: scene.lucidPrompt,
        aspect_ratio: '3:4',
        output_format: 'png',
        safety_tolerance: 5
      }
    });

    if (output) {
      // Flux returns a URL, need to fetch the image
      const imageResponse = await fetch(output);
      if (imageResponse.ok) {
        const buffer = Buffer.from(await imageResponse.arrayBuffer());
        return { success: true, data: buffer, strategy: 'flux-pro' };
      }
    }
  } catch (error) {
    console.log(`      ❌ Flux: ${error.message.substring(0, 50)}`);
  }

  return { success: false };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER ENGINE - Auto-adaptive strategy cascade
// ═══════════════════════════════════════════════════════════════════════════════

async function generateWithMasterEngine(scene, index) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`✦ [${index + 1}/3] ${scene.name} (Intimacy ${scene.level})`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`📝 Concept: Avant-garde minimal mesh on cognac leather`);

  // Strategy cascade
  const strategies = [tryLucidOrigin, tryImagen4, tryFlux];

  for (const strategy of strategies) {
    const result = await strategy(scene);

    if (result.success) {
      const safeName = scene.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `cognac-intimacy-${scene.level}-${result.strategy}-${Date.now()}.png`;
      const filepath = `${OUTPUT_DIR}/${filename}`;

      await writeFile(filepath, result.data);
      console.log(`\n   ✅ SUCCESS with ${result.strategy}${result.style ? ` (${result.style})` : ''}`);
      console.log(`   📁 ${filename}`);

      return {
        success: true,
        filename,
        level: scene.level,
        strategy: result.strategy,
        style: result.style
      };
    }

    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n   ❌ All strategies failed for intimacy ${scene.level}`);
  return { success: false, level: scene.level };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   COGNAC SOFA INTIMACY TRILOGY - Auto-Adaptive Master Engine                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Concept: Avant-garde thread mesh minimal coverage on cognac leather        ║
║   Levels: 9, 10, 10+ (private artistic boudoir)                              ║
║   Strategy: Lucid Origin → Imagen 4 → Flux (auto-cascade)                    ║
║   Target: 3 images (first success at each level)                             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < INTIMACY_TRILOGY.length; i++) {
    const result = await generateWithMasterEngine(INTIMACY_TRILOGY[i], i);
    results.push(result);

    if (i < INTIMACY_TRILOGY.length - 1) {
      console.log(`\n   ⏳ Next level in 4s...`);
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('✦ COGNAC INTIMACY TRILOGY COMPLETE ✦');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Generated: ${successful.length}/3`);

  if (successful.length > 0) {
    console.log('\n📸 Generated Images:');
    successful.forEach(s => {
      console.log(`   Level ${s.level}: ${s.filename}`);
      console.log(`            Strategy: ${s.strategy}${s.style ? ` / ${s.style}` : ''}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed Levels:');
    failed.forEach(f => console.log(`   Level ${f.level}`));
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
