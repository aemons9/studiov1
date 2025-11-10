/**
 * IMAGEN 4 PROMPT LIBRARY
 *
 * Collection of optimized prompts for Google's Imagen 4 model
 * All prompts include Art Director safety declarations
 * Based on successful prompt structure for Vertex AI
 *
 * Key Differences from Flux:
 * - Starts with Art Director declaration
 * - Enhanced technical details (8K, skin texture, fabric physics)
 * - More verbose professional context
 * - Natural detail emphasis
 */

import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';
import { fluxPromptLibrary } from './fluxPromptLibrary';

export interface ImagenPromptTemplate {
  id: string;
  name: string;
  category: 'corporate' | 'artistic' | 'editorial' | 'architectural' | 'creative';
  intimacyLevel: number; // 1-10
  prompt: string;
  aspectRatio: '3:4' | '4:3' | '1:1' | '16:9' | '9:16'; // Imagen uses different ratios
  personGeneration: 'allow_adult';
  safetyFilter: 'block_few' | 'block_only_high';
}

/**
 * Helper to wrap prompt with art director declaration and enhance for Imagen
 */
function convertFluxToImagenPrompt(fluxPrompt: string): string {
  // Add technical enhancements for Imagen 4
  const enhanced = fluxPrompt
    .replace(/Ultra-high-end 8K/g, 'Ultra-premium 8K+ ultra-high-resolution')
    .replace(/Professional/g, 'Museum-quality professional')
    .replace(/fabric\s+/g, 'authentic fabric with realistic draping physics ')
    .replace(/skin texture/g, 'authentic skin texture with visible natural pores and subsurface scattering');

  // Add Imagen-specific technical details
  const technical = `\n\nTechnical Specifications: Ultra-high-resolution 8K+ capture with exceptional detail and clarity. Professional color grading maintaining authentic skin tones and natural material properties. Museum-quality archival standards with authentic texture preservation throughout. Realistic fabric physics following natural gravity and draping. Authentic skin micro-details with visible pores, no artificial smoothing or plastic appearance. Real human skin with all its beautiful natural variation.`;

  return `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${enhanced}${technical}`;
}

/**
 * Convert Flux aspect ratio to Imagen aspect ratio
 */
function convertAspectRatio(fluxRatio: string): '3:4' | '4:3' | '1:1' | '16:9' | '9:16' {
  const mapping: Record<string, any> = {
    '4:5': '3:4',
    '9:16': '9:16',
    '16:9': '16:9',
    '1:1': '1:1',
    '5:4': '4:3'
  };
  return mapping[fluxRatio] || '3:4';
}

/**
 * Generate Imagen library from Flux library
 * Automatically converts all Flux erotic concepts to Imagen format
 */
export const imagenPromptLibrary: ImagenPromptTemplate[] = fluxPromptLibrary
  .filter(template => template.id.startsWith('erotic-'))
  .map(template => ({
    id: template.id.replace('erotic-', 'imagen-erotic-'),
    name: `IMAGEN: ${template.name.replace('EROTIC: ', '')}`,
    category: template.category,
    intimacyLevel: template.intimacyLevel,
    aspectRatio: convertAspectRatio(template.aspectRatio),
    personGeneration: 'allow_adult' as const,
    safetyFilter: (template.intimacyLevel >= 9 ? 'block_few' : 'block_only_high') as 'block_few' | 'block_only_high',
    prompt: convertFluxToImagenPrompt(template.prompt)
  }));

/**
 * Helper function to get prompts by category
 */
export function getImagenPromptsByCategory(category: ImagenPromptTemplate['category']): ImagenPromptTemplate[] {
  return imagenPromptLibrary.filter(p => p.category === category);
}

/**
 * Helper function to get prompts by intimacy level
 */
export function getImagenPromptsByIntimacy(minLevel: number, maxLevel: number): ImagenPromptTemplate[] {
  return imagenPromptLibrary.filter(p => p.intimacyLevel >= minLevel && p.intimacyLevel <= maxLevel);
}

/**
 * Helper function to get prompt by ID
 */
export function getImagenPromptById(id: string): ImagenPromptTemplate | undefined {
  return imagenPromptLibrary.find(p => p.id === id);
}

/**
 * Get recommended safety filter for intimacy level
 */
export function getImagenRecommendedSafetyFilter(intimacyLevel: number): 'block_few' | 'block_only_high' {
  if (intimacyLevel <= 7) return 'block_only_high';
  return 'block_few';
}

/**
 * Convert Flux aspect ratio to Imagen aspect ratio (public helper)
 */
export function convertFluxToImagenAspectRatio(fluxRatio: string): string {
  return convertAspectRatio(fluxRatio);
}
