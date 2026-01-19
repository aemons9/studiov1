#!/usr/bin/env node
/**
 * Lyria2 Music Generation Service via Vertex AI
 * Generates cinematic background music for reels
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, readFileSync } from 'fs';

const execAsync = promisify(exec);

/**
 * Get OAuth token from gcloud
 */
async function getOAuthToken() {
  try {
    const { stdout } = await execAsync('gcloud auth print-access-token');
    return stdout.trim();
  } catch (error) {
    throw new Error('Failed to get OAuth token. Make sure gcloud is authenticated.');
  }
}

/**
 * Get GCP project ID
 */
async function getProjectId() {
  try {
    const { stdout } = await execAsync('gcloud config get-value project');
    return stdout.trim();
  } catch (error) {
    throw new Error('Failed to get project ID. Make sure gcloud is configured.');
  }
}

/**
 * Generate music using Lyria2 via Vertex AI
 * @param {string} prompt - Music generation prompt
 * @param {number} durationSeconds - Duration in seconds (max 60)
 * @param {string} outputPath - Path to save the generated audio file
 */
export async function generateMusic(prompt, durationSeconds = 56, outputPath) {
  const projectId = await getProjectId();
  const oauthToken = await getOAuthToken();
  const location = 'us-central1';
  const modelId = 'lyria-2';

  console.log(`🎵 Generating music with Lyria2...`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  try {
    // Submit music generation job
    const submitUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predictLongRunning`;

    const submitResponse = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          prompt: prompt,
        }],
        parameters: {
          durationSeconds: durationSeconds.toString(),
          sampleCount: 1,
        }
      }),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`Lyria2 API error: ${submitResponse.status} - ${errorText}`);
    }

    const submitResult = await submitResponse.json();
    const operationName = submitResult.name;

    if (!operationName) {
      throw new Error('No operation name received from Lyria2.');
    }

    console.log('   ⏳ Job submitted. Polling for results...');

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes at 5 second intervals

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;

      const pollUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:fetchPredictOperation`;

      const pollResponse = await fetch(pollUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${oauthToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: operationName
        }),
      });

      if (!pollResponse.ok) {
        console.warn(`   Poll attempt ${attempts} failed`);
        continue;
      }

      const operation = await pollResponse.json();
      console.log(`   📊 Poll ${attempts}/${maxAttempts}: ${operation.done ? 'DONE' : 'Processing...'}`);

      if (operation.done === true) {
        if (operation.error) {
          throw new Error(`Music generation failed: ${operation.error.message}`);
        }

        const predictions = operation.response?.predictions;
        if (!predictions || predictions.length === 0) {
          throw new Error("No audio data found in response.");
        }

        const audioBase64 = predictions[0].bytesBase64Encoded;
        if (!audioBase64) {
          throw new Error("No audio data was found.");
        }

        // Save audio file
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        writeFileSync(outputPath, audioBuffer);

        console.log(`   ✅ Music saved: ${outputPath}\n`);
        return outputPath;
      }
    }

    throw new Error('Timeout: Music generation took too long.');

  } catch (error) {
    console.error(`❌ Error generating music: ${error.message}`);
    throw error;
  }
}

/**
 * Music prompts for different reel themes
 */
export const MUSIC_THEMES = {
  bigNudes: {
    name: 'Big Nudes - High Contrast B&W',
    prompt: 'Cinematic instrumental music, dramatic and sophisticated, deep bass with minimalist piano, noir jazz atmosphere, moody and intense, Helmut Newton aesthetic, elegant tension, slow tempo 80 BPM, high-end fashion vibes',
    caption: `Shadows speak louder than light 🖤

In the language of contrast, every curve becomes a story. High art meets raw emotion in this Helmut Newton-inspired visual symphony.

Where darkness defines beauty.

#BoudoirPhotography #FineArtNude #ArtisticNude #HelmutNewtonInspired #BlackAndWhitePhotography #HighContrast #NudeArtPhotography #ArtisticExpression #FashionPhotography #EditorialPhotography #BoldBeauty #ShadowPlay #ModernArt #ContemporaryArt #ArtCollector #MuseumQuality #FemininePower #ArtisticVision #VERALABS`
  },
  champagneLuxury: {
    name: 'Champagne Luxury',
    prompt: 'Luxurious orchestral music, warm golden tones, elegant strings and soft piano, opulent and refined, champagne celebration atmosphere, sophisticated French luxury, smooth tempo 90 BPM, high-class elegance',
    caption: `Golden hour never looked so divine ✨

Champagne whispers and silk shadows. This is luxury redefined—where every frame drips with timeless elegance and sophisticated allure.

Indulge in the art of the exquisite.

#LuxuryBoudoir #BoudoirPhotography #FineArt #ChampagneAesthetic #GoldenHour #HighEndPhotography #SensualArt #ElegantPhotography #LuxuryLifestyle #FashionEditorial #OpulentStyle #ArtisticPhotography #IntimatePortrait #BoudoirInspiration #WomenEmpowerment #FeminineElegance #GlamourPhotography #VERALABS`
  },
  goldenSensual: {
    name: 'Golden Sensual',
    prompt: 'Sensual ambient music, warm golden soundscape, ethereal vocals and acoustic guitar, intimate and dreamy, sunset glow atmosphere, romantic and tender, gentle tempo 75 BPM, emotional depth',
    caption: `Where light touches skin, magic happens 🌅

Bathed in golden whispers, each moment suspended in amber warmth. This is intimacy elevated to fine art—tender, powerful, unapologetically beautiful.

Feel the warmth.

#GoldenHourPhotography #BoudoirArt #SensualPhotography #IntimateArt #ArtisticBoudoir #FineArtPhotography #BoudoirInspiration #FeminineBeauty #GoldenLight #NaturalLight #EmotionalPhotography #VulnerableBeauty #ArtisticExpression #BoudoirSession #WomenEmpowerment #BodyPositive #IntimatePortrait #VERALABS`
  }
};
