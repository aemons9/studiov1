/**
 * COMPREHENSIVE VERA MODE MODEL COLLECTION
 * Includes both Erotic Glamour Models and Artistic Mode Archetypes
 */

import type { IndianModelArchetype } from './types';
import { INDIAN_GLAMOUR_MODELS } from './indianGlamourModels';

// ============================================================================
// ARTISTIC MODE INDIAN MODEL ARCHETYPES
// High-fashion editorial models with diverse aesthetics
// ============================================================================

export const ARTISTIC_MODE_ARCHETYPES: IndianModelArchetype[] = [
  {
    id: 'modern-power',
    name: 'Modern Power Icon',
    description: 'Contemporary high-fashion model with commanding presence and sophisticated urban aesthetic',
    physicalTraits: {
      height: '5\'9"',
      figure: 'Athletic sculptural form with strong shoulders and defined waist',
      skinTone: 'Luminous dusky complexion with warm undertones',
      facialFeatures: 'Sharp angular bone structure, magnetic penetrating gaze, strong jawline'
    },
    styleContext: 'Contemporary high-fashion editorial, urban minimalism, power dressing',
    culturalElements: ['Modern Indian cosmopolitan aesthetic', 'Global fashion sensibility']
  },

  {
    id: 'ethereal-classic',
    name: 'Ethereal Classical Beauty',
    description: 'Timeless elegant model embodying classical Indian grace with contemporary refinement',
    physicalTraits: {
      height: '5\'7"',
      figure: 'Graceful hourglass silhouette with feminine curves',
      skinTone: 'Radiant fair to wheatish complexion with subtle glow',
      facialFeatures: 'Soft romantic features, expressive almond eyes, delicate bone structure'
    },
    styleContext: 'Romantic fine-art portraiture, luxury fashion, timeless elegance',
    culturalElements: ['Classical Indian grace', 'Bollywood golden-era aesthetic', 'Royal heritage influence']
  },

  {
    id: 'bold-contemporary',
    name: 'Bold Contemporary Muse',
    description: 'Avant-garde fashion model with striking features and fearless artistic expression',
    physicalTraits: {
      height: '5\'10"',
      figure: 'Statuesque athletic build with dramatic proportions',
      skinTone: 'Rich deep complexion with flawless matte finish',
      facialFeatures: 'Dramatic high cheekbones, intense expressive eyes, bold presence'
    },
    styleContext: 'Avant-garde high fashion, experimental editorial, artistic statement pieces',
    culturalElements: ['Contemporary Indian art influence', 'Global runway aesthetic']
  },

  {
    id: 'sensual-sophisticated',
    name: 'Sensual Sophisticate',
    description: 'Refined model embodying confident sensuality with sophisticated high-fashion edge',
    physicalTraits: {
      height: '5\'8"',
      figure: 'Curvaceous hourglass form with commanding proportions',
      skinTone: 'Warm caramel to dusky tone with natural radiance',
      facialFeatures: 'Captivating magnetic gaze, full expressive lips, sculpted features'
    },
    styleContext: 'High-fashion erotic art, luxury lingerie editorial, confident feminine power',
    culturalElements: ['Khajuraho artistic heritage', 'Modern cosmopolitan sensuality']
  },

  {
    id: 'editorial-chameleon',
    name: 'Editorial Chameleon',
    description: 'Versatile high-fashion model with adaptable presence and striking bone structure',
    physicalTraits: {
      height: '5\'9"',
      figure: 'Lean athletic build with model proportions',
      skinTone: 'Medium to dusky complexion with healthy glow',
      facialFeatures: 'Versatile features, strong bone structure, transformative presence'
    },
    styleContext: 'Versatile editorial fashion, runway adaptability, commercial high-fashion',
    culturalElements: ['Pan-Indian aesthetic diversity', 'Global market versatility']
  },

  {
    id: 'art-house-icon',
    name: 'Art House Icon',
    description: 'Conceptual fashion model with unique beauty and artistic gravitas',
    physicalTraits: {
      height: '5\'8"',
      figure: 'Sculptural proportions with artistic presence',
      skinTone: 'Distinctive complexion ranging from fair to deep tones',
      facialFeatures: 'Unconventional striking beauty, intense artistic presence, memorable bone structure'
    },
    styleContext: 'Fine-art fashion photography, gallery exhibition quality, conceptual editorial',
    culturalElements: ['Contemporary Indian art movements', 'Global art-fashion fusion']
  }
];

// ============================================================================
// COMBINED MODEL COLLECTION
// All models available in Vera mode
// ============================================================================

export const ALL_VERA_MODELS: IndianModelArchetype[] = [
  ...INDIAN_GLAMOUR_MODELS.map(model => ({
    id: model.id,
    name: model.name,
    description: `${model.category} - ${model.emphasis}`,
    physicalTraits: {
      height: model.physicalTraits.height,
      figure: model.physicalTraits.figure,
      skinTone: model.physicalTraits.skinTone,
      facialFeatures: model.physicalTraits.features
    },
    styleContext: `Glamour photography specializing in ${model.emphasis}`,
    culturalElements: ['Indian glamour aesthetics', 'Premium sensual photography']
  })),
  ...ARTISTIC_MODE_ARCHETYPES
];

// Helper functions
export function getModelById(id: string): IndianModelArchetype | undefined {
  return ALL_VERA_MODELS.find(model => model.id === id);
}

export function getGlamourModels(): IndianModelArchetype[] {
  return ALL_VERA_MODELS.filter(model =>
    model.id.startsWith('erotic-model-')
  );
}

export function getArtisticModels(): IndianModelArchetype[] {
  return ARTISTIC_MODE_ARCHETYPES;
}

export function getRandomModel(category?: 'glamour' | 'artistic'): IndianModelArchetype {
  const models = category === 'glamour' ? getGlamourModels() :
                  category === 'artistic' ? getArtisticModels() :
                  ALL_VERA_MODELS;
  return models[Math.floor(Math.random() * models.length)];
}

export { INDIAN_GLAMOUR_MODELS };
