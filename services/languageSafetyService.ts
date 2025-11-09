/**
 * CLOUD NATURAL LANGUAGE API SERVICE
 *
 * Uses Google Cloud Natural Language API to detect potentially problematic
 * language in prompts before submission to image generation APIs.
 *
 * This helps pre-screen prompts and apply Gemini refinement when needed.
 */

import type { GenerationSettings } from '../types';

export interface ToxicityAnalysis {
  toxicity: number; // 0.0 - 1.0
  categories: string[];
  needsRefinement: boolean;
}

/**
 * Analyze prompt for toxic/problematic language using Natural Language API
 */
export async function analyzePromptToxicity(
  prompt: string,
  settings: GenerationSettings
): Promise<ToxicityAnalysis> {
  const endpoint = 'https://language.googleapis.com/v1/documents:moderateText';

  const body = {
    document: {
      type: 'PLAIN_TEXT',
      content: prompt
    }
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
      console.warn('⚠️ Language API failed, skipping toxicity check');
      return { toxicity: 0, categories: [], needsRefinement: false };
    }

    const data = await response.json();

    // Extract moderation categories
    const categories = data.moderationCategories || [];
    const maxConfidence = Math.max(
      ...categories.map((c: any) => c.confidence || 0),
      0
    );

    const flaggedCategories = categories
      .filter((c: any) => c.confidence > 0.5)
      .map((c: any) => c.name);

    console.log('📊 Toxicity analysis:', {
      score: maxConfidence.toFixed(2),
      categories: flaggedCategories
    });

    return {
      toxicity: maxConfidence,
      categories: flaggedCategories,
      needsRefinement: maxConfidence > 0.6
    };
  } catch (error) {
    console.error('❌ Toxicity analysis error:', error);
    // Don't block generation on analysis failure
    return { toxicity: 0, categories: [], needsRefinement: false };
  }
}

/**
 * Check if prompt needs sanitization based on Natural Language API analysis
 */
export async function checkPromptSafety(
  prompt: string,
  settings: GenerationSettings
): Promise<{ safe: boolean; analysis: ToxicityAnalysis }> {
  const analysis = await analyzePromptToxicity(prompt, settings);

  if (analysis.needsRefinement) {
    console.warn('⚠️ High toxicity detected:', analysis.categories);
    console.warn('   Toxicity score:', analysis.toxicity.toFixed(2));
  }

  return {
    safe: !analysis.needsRefinement,
    analysis
  };
}
