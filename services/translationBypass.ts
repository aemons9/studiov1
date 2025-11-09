/**
 * TRANSLATION BYPASS SERVICE
 *
 * Nuclear option for extremely blocked content.
 * Uses Cloud Translation API to translate prompts to languages with
 * looser safety filters (French, Italian, Spanish).
 *
 * ⚠️ WARNING: Use sparingly. This is the last resort when all else fails.
 */

import type { GenerationSettings } from '../types';
import { generateImage } from './geminiService';

export type BypassLanguage = 'fr' | 'it' | 'es' | 'de';

interface TranslationResult {
  translatedPrompt: string;
  language: string;
  languageName: string;
}

const LANGUAGE_NAMES: Record<BypassLanguage, string> = {
  'fr': 'French',
  'it': 'Italian',
  'es': 'Spanish',
  'de': 'German'
};

/**
 * Translate prompt to bypass language
 */
export async function translatePrompt(
  prompt: string,
  targetLanguage: BypassLanguage,
  settings: GenerationSettings
): Promise<TranslationResult> {
  const endpoint = 'https://translation.googleapis.com/language/translate/v2';

  const body = {
    q: prompt,
    target: targetLanguage,
    format: 'text',
    source: 'en'
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Translation failed: ${error}`);
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    console.log(`🌍 Translated to ${LANGUAGE_NAMES[targetLanguage]}:`, translatedText.substring(0, 150) + '...');

    return {
      translatedPrompt: translatedText,
      language: targetLanguage,
      languageName: LANGUAGE_NAMES[targetLanguage]
    };
  } catch (error) {
    console.error('❌ Translation error:', error);
    throw error;
  }
}

/**
 * Generate image using translation bypass
 * Tries multiple languages in order of permissiveness
 */
export async function generateViaTranslation(
  prompt: string,
  settings: GenerationSettings,
  preferredLanguage?: BypassLanguage
): Promise<{ images: string[], language: string }> {
  // Languages ordered by permissiveness (based on empirical testing)
  const languagePriority: BypassLanguage[] = preferredLanguage
    ? [preferredLanguage]
    : ['fr', 'it', 'es', 'de']; // French is generally most permissive

  let lastError: Error | null = null;

  for (const language of languagePriority) {
    try {
      console.log(`🌍 Attempting translation bypass with ${LANGUAGE_NAMES[language]}...`);

      // Translate prompt
      const translation = await translatePrompt(prompt, language, settings);

      // Generate with translated prompt
      const images = await generateImage(translation.translatedPrompt, settings);

      console.log(`✅ Translation bypass successful with ${LANGUAGE_NAMES[language]}!`);

      return {
        images,
        language: LANGUAGE_NAMES[language]
      };
    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ ${LANGUAGE_NAMES[language]} bypass failed:`, error.message);

      // Continue to next language
      if (error.message.includes('RAI_BLOCK')) {
        continue;
      } else {
        // Non-safety error, rethrow
        throw error;
      }
    }
  }

  // All languages failed
  throw new Error(`Translation bypass failed in all languages. Last error: ${lastError?.message}`);
}

/**
 * Check if translation bypass is likely to help
 * (Some content is universally blocked regardless of language)
 */
export function shouldAttemptTranslationBypass(blockReason: string): boolean {
  // Translation bypass is more effective for:
  // - Terminology issues (lingerie, intimate, etc.)
  // - Cultural/contextual misinterpretation

  // Less effective for:
  // - Explicit content violations
  // - Violence/gore

  const likelyToHelp = [
    'lingerie',
    'intimate',
    'sensual',
    'wardrobe',
    'figure',
    'form'
  ];

  const unlikelyToHelp = [
    'explicit',
    'violence',
    'gore',
    'child',
    'minor'
  ];

  const reasonLower = blockReason.toLowerCase();

  // Don't try translation for universally blocked content
  if (unlikelyToHelp.some(term => reasonLower.includes(term))) {
    return false;
  }

  // Translation might help for terminology issues
  return likelyToHelp.some(term => reasonLower.includes(term));
}

/**
 * Smart translation bypass that only attempts when likely to succeed
 */
export async function smartTranslationBypass(
  prompt: string,
  blockReason: string,
  settings: GenerationSettings
): Promise<{ images: string[], language: string } | null> {
  if (!shouldAttemptTranslationBypass(blockReason)) {
    console.log('⏭️ Translation bypass unlikely to help, skipping...');
    return null;
  }

  console.log('🌍 Translation bypass may help, attempting...');
  return await generateViaTranslation(prompt, settings);
}
