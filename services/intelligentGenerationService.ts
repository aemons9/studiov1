/**
 * INTELLIGENT GENERATION SERVICE
 *
 * Orchestrates all safety bypass strategies in a cascading fallback system.
 * This is the main entry point for image generation with maximum success rate.
 *
 * Cascade Strategy:
 * 1. Pre-screen with Natural Language API
 * 2. Route to Imagen or Flux based on intimacy level
 * 3. On Imagen block → Gemini adversarial rewrite + retry
 * 4. Still blocked → Flux with escalating safety tolerance
 * 5. Still blocked → Translation bypass (nuclear option)
 */

import type { PromptData, GenerationSettings } from '../types';
import { generateImage, adversarialRewrite } from './geminiService';
import { generateWithFluxRetry, getOptimalFluxSettings, type ReplicateConfig } from './replicateService';
import { checkPromptSafety } from './languageSafetyService';
import { smartTranslationBypass } from './translationBypass';
import { preparePromptForAPI, convertImagenToFlux } from './promptPreparation';

export interface GenerationResult {
  images: string[];
  usedApi: 'Imagen' | 'Flux';
  attempts: number;
  strategies: string[]; // Track which strategies were used
  finalPrompt: string; // The prompt that succeeded
}

/**
 * Generate images with maximum safety bypass intelligence
 */
export async function generateWithMaximumSafety(
  wovenPrompt: string,
  promptData: PromptData,
  settings: GenerationSettings
): Promise<GenerationResult> {
  const intimacyLevel = settings.intimacyLevel;
  const strategy = settings.safetyBypassStrategy || 'auto';
  let attempts = 0;
  const strategies: string[] = [];
  let currentPrompt = wovenPrompt;

  console.log('🎯 Starting intelligent generation cascade');
  console.log('🛡️ Strategy:', strategy.toUpperCase());
  console.log('📊 Intimacy level:', intimacyLevel);
  console.log('📝 Prompt length:', wovenPrompt.length, 'chars');

  // NUCLEAR IMAGEN MODE: Skip everything, go straight to translation + Imagen
  if (strategy === 'nuclear-imagen') {
    console.log('🔥 NUCLEAR IMAGEN MODE: Bypassing all pre-screening, using Translation + Imagen 4');
    return await executeNuclearImagenStrategy(currentPrompt, settings, intimacyLevel);
  }

  // NUCLEAR FLUX MODE: Skip everything, go straight to translation + Flux
  if (strategy === 'nuclear') {
    console.log('☢️ NUCLEAR FLUX MODE: Bypassing all safety checks, using Translation + Flux max');
    return await executeNuclearFluxStrategy(currentPrompt, settings, intimacyLevel);
  }

  // VERA STRATEGY MODE: Advanced Imagen 4 prompt optimization
  if (strategy === 'verastrategy') {
    console.log('✨ VERA STRATEGY MODE: Advanced Imagen 4 prompt optimization');
    return await executeVeraStrategy(currentPrompt, promptData, settings, intimacyLevel);
  }

  // ============================================================================
  // STEP 1: Pre-screen with Natural Language API
  // ============================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 STEP 1: Pre-screening with Natural Language API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const safetyCheck = await checkPromptSafety(currentPrompt, settings);

  if (safetyCheck.analysis.needsRefinement) {
    console.log('⚠️ High toxicity detected, applying Gemini refinement...');
    strategies.push('Natural Language API Pre-screening');

    try {
      currentPrompt = await adversarialRewrite(
        currentPrompt,
        `High toxicity: ${safetyCheck.analysis.categories.join(', ')}`,
        settings
      );
      strategies.push('Gemini Pre-emptive Rewrite');
      console.log('✅ Pre-emptive rewrite completed');
    } catch (error) {
      console.warn('⚠️ Pre-emptive rewrite failed, continuing with original');
    }
  } else {
    console.log('✅ Toxicity check passed');
  }

  // ============================================================================
  // STEP 2: Route based on intimacy level
  // ============================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔀 STEP 2: Smart routing based on intimacy level');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const preferFlux = intimacyLevel >= 7;

  if (preferFlux) {
    console.log('🎭 High intimacy level → Routing to Flux (more permissive)');
  } else {
    console.log('🎨 Moderate intimacy → Trying Imagen first (higher quality)');
  }

  // ============================================================================
  // STEP 3A: Try Imagen (if intimacy < 7)
  // ============================================================================
  if (!preferFlux) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎨 STEP 3A: Attempting Imagen generation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
      attempts++;
      const images = await generateImage(currentPrompt, settings);
      strategies.push('Imagen - Direct Success');

      console.log('✅ Imagen generation successful!');
      return {
        images,
        usedApi: 'Imagen',
        attempts,
        strategies,
        finalPrompt: currentPrompt
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('RAI_BLOCK') || errorMessage.includes('safety')) {
        console.warn('⚠️ Imagen blocked by safety filters');
        console.warn('📋 Block reason:', errorMessage);

        // Extract block reason
        const blockReason = errorMessage;

        // ============================================================================
        // STEP 3B: Adversarial Rewrite + Imagen Retry
        // ============================================================================
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✨ STEP 3B: Gemini adversarial rewrite + Imagen retry');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        try {
          attempts++;
          const rewrittenPrompt = await adversarialRewrite(currentPrompt, blockReason, settings);
          strategies.push('Gemini Adversarial Rewrite');
          currentPrompt = rewrittenPrompt;

          console.log('🔄 Retrying Imagen with rewritten prompt...');
          const images = await generateImage(rewrittenPrompt, settings);
          strategies.push('Imagen - Success After Rewrite');

          console.log('✅ Imagen retry successful after rewrite!');
          return {
            images,
            usedApi: 'Imagen',
            attempts,
            strategies,
            finalPrompt: rewrittenPrompt
          };
        } catch (retryError) {
          console.warn('⚠️ Imagen retry also blocked. Moving to Flux fallback...');
          strategies.push('Imagen - Failed After Rewrite');
        }

        // ============================================================================
        // STEP 3C: Translation Bypass (if likely to help)
        // ============================================================================
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🌍 STEP 3C: Checking if translation bypass could help');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        try {
          const translationResult = await smartTranslationBypass(currentPrompt, blockReason, settings);

          if (translationResult) {
            attempts++;
            strategies.push(`Translation Bypass - ${translationResult.language}`);

            console.log(`✅ Translation bypass successful via ${translationResult.language}!`);
            return {
              images: translationResult.images,
              usedApi: 'Imagen',
              attempts,
              strategies,
              finalPrompt: currentPrompt
            };
          }
        } catch (translationError) {
          console.warn('⚠️ Translation bypass failed. Proceeding to Flux...');
        }
      } else {
        // Non-safety error, rethrow
        throw error;
      }
    }
  }

  // ============================================================================
  // STEP 4: Flux Fallback (or primary for intimacy >= 7)
  // ============================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎭 STEP 4: Flux generation with escalating safety tolerance');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const replicateToken = localStorage.getItem('replicateToken');
  if (!replicateToken) {
    throw new Error(
      '❌ Replicate API token required for Flux generation.\n' +
      '💡 Set via browser console: localStorage.setItem("replicateToken", "YOUR_TOKEN")\n' +
      '🔗 Get your token at: https://replicate.com/account/api-tokens'
    );
  }

  const optimalSettings = getOptimalFluxSettings(intimacyLevel);

  // CRITICAL: Convert Imagen declaration to Flux format
  const fluxPrompt = convertImagenToFlux(currentPrompt);
  console.log('🔄 Converted prompt for Flux (removed Imagen declaration)');

  // Adjust safety tolerance based on strategy
  let safetyTolerance = optimalSettings.safetyTolerance || 4;
  if (strategy === 'aggressive') safetyTolerance = Math.min(6, safetyTolerance + 1);
  if (strategy === 'nuclear') safetyTolerance = 6;

  const fluxConfig: ReplicateConfig = {
    apiToken: replicateToken,
    model: optimalSettings.model || 'black-forest-labs/flux-1.1-pro-ultra',
    aspectRatio: settings.aspectRatio,
    numOutputs: settings.numberOfImages,
    seed: settings.seed || undefined,
    ...optimalSettings,
    safetyTolerance
  };

  console.log(`🎨 Flux config - Strategy: ${strategy}, Safety Tolerance: ${safetyTolerance}`);

  console.log('🎨 Flux model:', fluxConfig.model);
  console.log('🔒 Safety tolerance:', fluxConfig.safetyTolerance);
  console.log('📸 Raw mode:', fluxConfig.raw);

  try {
    attempts++;
    const images = await generateWithFluxRetry(fluxPrompt, fluxConfig, 3);
    strategies.push('Flux - Success');

    console.log('✅ Flux generation successful!');
    return {
      images,
      usedApi: 'Flux',
      attempts,
      strategies,
      finalPrompt: fluxPrompt
    };
  } catch (fluxError) {
    const errorMessage = fluxError instanceof Error ? fluxError.message : 'Unknown error';
    console.error('❌ Flux generation failed:', errorMessage);

    // Last resort: Translation bypass with Flux
    if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🌍 NUCLEAR OPTION: Translation bypass with Flux');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      try {
        const translationResult = await smartTranslationBypass(currentPrompt, errorMessage, settings);

        if (translationResult) {
          attempts++;
          strategies.push(`Translation Bypass - ${translationResult.language} (Flux fallback)`);

          console.log(`✅ Final fallback successful via ${translationResult.language}!`);
          return {
            images: translationResult.images,
            usedApi: 'Imagen',
            attempts,
            strategies,
            finalPrompt: currentPrompt
          };
        }
      } catch (finalError) {
        console.error('❌ All strategies exhausted');
        throw new Error(
          `All generation strategies failed.\n` +
          `Attempts: ${attempts}\n` +
          `Strategies tried: ${strategies.join(' → ')}\n` +
          `Final error: ${finalError instanceof Error ? finalError.message : 'Unknown error'}`
        );
      }
    }

    throw fluxError;
  }
}

/**
 * Nuclear Imagen Strategy: Direct translation bypass with Imagen 4 (no Flux)
 * Maximum bypass for Imagen without falling back to Flux
 */
async function executeNuclearImagenStrategy(
  prompt: string,
  settings: GenerationSettings,
  intimacyLevel: number
): Promise<GenerationResult> {
  const strategies: string[] = ['Nuclear Imagen Mode'];
  let attempts = 0;

  console.log('🔥 Nuclear Imagen: Trying all translation languages with Imagen 4');

  // Try translation bypass with all languages
  const languages: Array<'fr' | 'it' | 'es' | 'de'> = ['fr', 'it', 'es', 'de'];

  for (const lang of languages) {
    try {
      attempts++;
      console.log(`🌍 Attempting ${lang.toUpperCase()} translation...`);

      const { generateViaTranslation } = await import('./translationBypass');
      const result = await generateViaTranslation(prompt, settings, lang);

      strategies.push(`Translation ${result.language} → Imagen`);
      console.log(`✅ Success with ${result.language}!`);

      return {
        images: result.images,
        usedApi: 'Imagen',
        attempts,
        strategies,
        finalPrompt: prompt
      };
    } catch (error) {
      console.warn(`⚠️ ${lang.toUpperCase()} failed:`, error instanceof Error ? error.message : 'Unknown error');
      continue;
    }
  }

  // If all translations fail, try direct Imagen with adversarial rewrite
  try {
    attempts++;
    console.log('🔄 All translations failed, trying Gemini rewrite + Imagen...');

    const rewrittenPrompt = await adversarialRewrite(
      prompt,
      'Nuclear Imagen fallback - all translations blocked',
      settings
    );
    strategies.push('Gemini Adversarial Rewrite (fallback)');

    const images = await generateImage(rewrittenPrompt, settings);
    strategies.push('Imagen - Success after rewrite');

    return {
      images,
      usedApi: 'Imagen',
      attempts,
      strategies,
      finalPrompt: rewrittenPrompt
    };
  } catch (error) {
    throw new Error(
      `Nuclear Imagen strategy exhausted all options.\n` +
      `Attempts: ${attempts}\n` +
      `Strategies tried: ${strategies.join(' → ')}\n` +
      `Final error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Nuclear Flux Strategy: Direct translation bypass with Flux max tolerance
 * Original nuclear mode - skips Imagen entirely
 */
async function executeNuclearFluxStrategy(
  prompt: string,
  settings: GenerationSettings,
  intimacyLevel: number
): Promise<GenerationResult> {
  const strategies: string[] = ['Nuclear Flux Mode'];
  let attempts = 0;

  console.log('☢️ Nuclear Flux: Maximum bypass with Flux');

  const replicateToken = localStorage.getItem('replicateToken');
  if (!replicateToken) {
    throw new Error(
      '❌ Replicate API token required for Nuclear Flux mode.\n' +
      '💡 Set via browser console: localStorage.setItem("replicateToken", "YOUR_TOKEN")\n' +
      '🔗 Get your token at: https://replicate.com/account/api-tokens'
    );
  }

  // Try translation with Flux
  const languages: Array<'fr' | 'it' | 'es' | 'de'> = ['fr', 'it', 'es', 'de'];

  for (const lang of languages) {
    try {
      attempts++;
      console.log(`🌍 Attempting ${lang.toUpperCase()} translation with Flux max tolerance...`);

      const { translatePrompt } = await import('./translationBypass');
      const translation = await translatePrompt(prompt, lang, settings);

      // CRITICAL: Convert to Flux format
      const fluxPrompt = convertImagenToFlux(translation.translatedPrompt);

      const optimalSettings = getOptimalFluxSettings(intimacyLevel);
      const fluxConfig: ReplicateConfig = {
        apiToken: replicateToken,
        model: 'black-forest-labs/flux-1.1-pro-ultra',
        aspectRatio: settings.aspectRatio,
        numOutputs: settings.numberOfImages,
        seed: settings.seed || undefined,
        ...optimalSettings,
        safetyTolerance: 6 // Max tolerance
      };

      const images = await generateWithFluxRetry(fluxPrompt, fluxConfig, 3);
      strategies.push(`Translation ${lang.toUpperCase()} → Flux (6/6)`);

      console.log(`✅ Nuclear Flux success with ${lang.toUpperCase()}!`);

      return {
        images,
        usedApi: 'Flux',
        attempts,
        strategies,
        finalPrompt: translation.translatedPrompt
      };
    } catch (error) {
      console.warn(`⚠️ ${lang.toUpperCase()} failed:`, error instanceof Error ? error.message : 'Unknown error');
      continue;
    }
  }

  throw new Error(
    `Nuclear Flux strategy failed in all languages.\n` +
    `Attempts: ${attempts}\n` +
    `Strategies tried: ${strategies.join(' → ')}`
  );
}

/**
 * Vera Strategy: Advanced Imagen 4 prompt optimization
 * Uses quality triggers, cultural sensitivity, and intimacy-based wardrobe mappings
 */
async function executeVeraStrategy(
  prompt: string,
  promptData: PromptData,
  settings: GenerationSettings,
  intimacyLevel: number
): Promise<GenerationResult> {
  const strategies: string[] = ['Vera Strategy - Advanced Optimization'];
  let attempts = 0;

  console.log('✨ Vera Strategy: Applying advanced Imagen 4 optimization');

  // Quality triggers for Imagen 4
  const qualityTriggers = {
    masterpiece: ['award-winning photograph', 'museum-quality', 'professionally photographed'],
    gallery: ['fine art photography', 'gallery exhibition quality', 'artistic masterwork'],
    premium: ['high-end fashion photography', 'luxury editorial', 'professional studio lighting'],
    standard: ['professional photography', 'well-composed shot', 'proper lighting']
  };

  // Cultural sensitivity mappings
  const culturalDescriptors = {
    skinTone: intimacyLevel >= 8 ? 'sun-kissed bronze skin' :
              intimacyLevel >= 6 ? 'luminous caramel complexion' :
              intimacyLevel >= 4 ? 'golden-bronze skin tone' : 'warm complexion',
    features: intimacyLevel >= 8 ? 'striking Indian features with a captivating gaze' :
              intimacyLevel >= 6 ? 'stunning South Asian features, captivating gaze' :
              intimacyLevel >= 4 ? 'classic Indian beauty with expressive eyes' : 'elegant features',
    figure: intimacyLevel >= 8 ? 'dramatic statuesque curves' :
            intimacyLevel >= 6 ? 'sculpted hourglass figure' :
            intimacyLevel >= 4 ? 'elegant feminine form' : 'graceful silhouette'
  };

  // Wardrobe mappings based on intimacy level
  const wardrobeMappings = new Map<number, string[]>([
    [1, ['professional attire', 'business suit', 'formal dress']],
    [2, ['elegant dress', 'designer outfit', 'sophisticated ensemble']],
    [3, ['stylish casual wear', 'fashionable outfit', 'trendy clothing']],
    [4, ['form-fitting dress', 'elegant evening wear', 'cocktail attire']],
    [5, ['glamorous gown', 'high-fashion couture', 'red carpet dress']],
    [6, ['artistic fashion', 'avant-garde design', 'conceptual clothing']],
    [7, ['elegant evening wear', 'silk dress with strategic cutouts', 'backless gown']],
    [8, ['sheer overlay designs', 'lace and silk combination', 'haute couture elegance']],
    [9, ['minimalist high fashion', 'architectural fashion pieces', 'avant-garde statement pieces']],
    [10, ['fine art figure study with strategic shadows', 'artistic fabric draping with implied coverage']]
  ]);

  // Build optimized prompt
  let optimizedPrompt = prompt;

  // Add quality triggers based on intimacy level
  const qualityLevel = intimacyLevel >= 8 ? 'masterpiece' :
                       intimacyLevel >= 6 ? 'gallery' :
                       intimacyLevel >= 4 ? 'premium' : 'standard';
  const qualityPrefix = qualityTriggers[qualityLevel][0];

  // Enhance with cultural sensitivity
  optimizedPrompt = optimizedPrompt
    .replace(/\b(skin|complexion)\b/gi, culturalDescriptors.skinTone)
    .replace(/\b(face|features)\b/gi, culturalDescriptors.features)
    .replace(/\b(body|figure|physique)\b/gi, culturalDescriptors.figure);

  // Add wardrobe optimization if wardrobe is mentioned
  const intimacyRounded = Math.min(10, Math.max(1, Math.round(intimacyLevel)));
  const wardrobeOptions = wardrobeMappings.get(intimacyRounded) || wardrobeMappings.get(5)!;

  // Prepend quality trigger
  optimizedPrompt = `${qualityPrefix}, ${optimizedPrompt}`;

  console.log('📝 Original prompt length:', prompt.length);
  console.log('✨ Optimized prompt length:', optimizedPrompt.length);
  console.log('🎨 Quality level:', qualityLevel);
  console.log('📊 Intimacy level:', intimacyLevel);

  // Try direct Imagen generation with optimized prompt
  try {
    attempts++;
    console.log('🎨 Attempting Imagen 4 with Vera-optimized prompt...');
    const images = await generateImage(optimizedPrompt, settings);
    strategies.push('Imagen 4 - Vera Optimization Success');

    console.log('✅ Vera Strategy successful!');
    return {
      images,
      usedApi: 'Imagen',
      attempts,
      strategies,
      finalPrompt: optimizedPrompt
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('⚠️ Initial Vera-optimized attempt blocked:', errorMessage);

    // Try with Gemini rewrite maintaining Vera optimizations
    try {
      attempts++;
      console.log('🔄 Applying Gemini rewrite to Vera-optimized prompt...');
      const rewrittenPrompt = await adversarialRewrite(optimizedPrompt, errorMessage, settings);
      strategies.push('Gemini Rewrite + Vera Optimization');

      const images = await generateImage(rewrittenPrompt, settings);
      strategies.push('Imagen 4 - Success After Rewrite');

      console.log('✅ Vera Strategy successful after rewrite!');
      return {
        images,
        usedApi: 'Imagen',
        attempts,
        strategies,
        finalPrompt: rewrittenPrompt
      };
    } catch (retryError) {
      throw new Error(
        `Vera Strategy failed.\n` +
        `Attempts: ${attempts}\n` +
        `Strategies tried: ${strategies.join(' → ')}\n` +
        `Final error: ${retryError instanceof Error ? retryError.message : 'Unknown error'}`
      );
    }
  }
}

/**
 * Get a human-readable summary of the generation attempt
 */
export function getGenerationSummary(result: GenerationResult): string {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GENERATION SUCCESSFUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Final API: ${result.usedApi}
🔄 Total Attempts: ${result.attempts}
📊 Strategies Used: ${result.strategies.join(' → ')}
📝 Images Generated: ${result.images.length}

${result.strategies.length > 1 ? '⚡ Required fallback strategies to succeed' : '✨ Succeeded on first attempt'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}
