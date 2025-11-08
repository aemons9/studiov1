import type { CalculatedLevels, LevelCategory, VisualNode, NodeEffects } from '../types';
import { getNodeById } from './nodeDefinitions';

// ===========================================================================
// LEVEL CATEGORY DEFINITIONS (1-25 Scales)
// ===========================================================================

export const intimacyCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Professional Distance', description: 'Corporate headshots, formal portraits' },
  { min: 4, max: 6, label: 'Editorial Closeness', description: 'Fashion editorial, medium shots' },
  { min: 7, max: 9, label: 'Personal Connection', description: 'Intimate portraits, emotional engagement' },
  { min: 10, max: 12, label: 'Private Intimacy', description: 'Boudoir, personal art, tactile details' },
  { min: 13, max: 15, label: 'Deep Intimacy', description: 'Micro-details dominant, visceral closeness' },
  { min: 16, max: 18, label: 'Ultimate Intimacy', description: 'Form study, artistic boundaries crossed' },
  { min: 19, max: 21, label: 'Sacred Intimacy', description: 'Kamasutra-inspired, temple art tradition' },
  { min: 22, max: 25, label: 'Transcendent Intimacy', description: 'Complete artistic freedom, masterwork' },
];

export const seductionCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Professional Confidence', description: 'Power dressing, no seduction' },
  { min: 4, max: 6, label: 'Subtle Allure', description: 'Confident magnetism, editorial elegance' },
  { min: 7, max: 9, label: 'Intentional Attraction', description: 'Seductive gaze, magnetic presence' },
  { min: 10, max: 12, label: 'Active Seduction', description: 'Night of passion, provocative poses' },
  { min: 13, max: 15, label: 'Bold Seduction', description: 'Confident boundary-crossing, passionate intent' },
  { min: 16, max: 18, label: 'Cinematic Seduction', description: 'Tinto Brass level, narrative seduction' },
  { min: 19, max: 21, label: 'Uninhibited Seduction', description: 'Fearless expression, complete agency' },
  { min: 22, max: 25, label: 'Ultimate Seduction', description: 'Transcendent passion, artistic eroticism' },
];

export const eroticismCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Non-Erotic', description: 'Pure fashion, zero sensual charge' },
  { min: 4, max: 6, label: 'Sensual Sophistication', description: 'High-fashion sensuality, elegant allure' },
  { min: 7, max: 9, label: 'Erotic Undertones', description: 'Sensual art, soft eroticism' },
  { min: 10, max: 12, label: 'Explicit Eroticism', description: 'Night of passion, lustful expression' },
  { min: 13, max: 15, label: 'Bold Erotic Art', description: 'Helmut Newton level, provocative high-art' },
  { min: 16, max: 18, label: 'Cinematic Erotica', description: 'Art-house erotic cinema, Tinto Brass' },
  { min: 19, max: 21, label: 'Sacred Eroticism', description: 'Khajuraho tradition, divine sensuality' },
  { min: 22, max: 25, label: 'Transcendent Erotica', description: 'Ultimate artistic expression, masterwork' },
];

export const professionalismCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Corporate Professional', description: 'Business, mainstream publishable' },
  { min: 4, max: 6, label: 'High-Fashion Editorial', description: 'Vogue, Harper\'s Bazaar level' },
  { min: 7, max: 9, label: 'Art Magazine', description: 'Dazed, i-D, artistic editorial' },
  { min: 10, max: 12, label: 'Gallery-Worthy', description: 'Fine-art photography, museum exhibition' },
  { min: 13, max: 15, label: 'Private Collection', description: 'Exclusive, invite-only exhibition' },
  { min: 16, max: 18, label: 'Intimate Portfolio', description: 'Artist\'s personal work, select clientele' },
  { min: 19, max: 21, label: 'Sacred Art', description: 'Temple tradition, cultural masterwork' },
  { min: 22, max: 25, label: 'Ultimate Masterwork', description: 'Once-in-lifetime artistic achievement' },
];

export const powerCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Corporate Dominance', description: 'CEO, boardroom power' },
  { min: 4, max: 6, label: 'Fashion Power', description: 'Editorial confidence, runway command' },
  { min: 7, max: 9, label: 'Magnetic Control', description: 'Subject controls frame, powerful presence' },
  { min: 10, max: 12, label: 'Balanced Power', description: 'Confident vulnerability, equal partnership' },
  { min: 13, max: 15, label: 'Sensual Vulnerability', description: 'Confident submission, artistic openness' },
  { min: 16, max: 18, label: 'Intimate Surrender', description: 'Trusting vulnerability, emotional depth' },
  { min: 19, max: 21, label: 'Sacred Vulnerability', description: 'Spiritual openness, divine femininity' },
  { min: 22, max: 25, label: 'Transcendent Balance', description: 'Power and vulnerability unified' },
];

export const abstractionCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Photographic Literalism', description: 'Documentary style, realistic' },
  { min: 4, max: 6, label: 'Editorial Realism', description: 'Fashion photography, polished reality' },
  { min: 7, max: 9, label: 'Artistic Interpretation', description: 'Creative framing, painterly quality' },
  { min: 10, max: 12, label: 'Abstract Elements', description: 'Sculptural forms, chiaroscuro dominance' },
  { min: 13, max: 15, label: 'Symbolic Art', description: 'Form as landscape, metaphorical' },
  { min: 16, max: 18, label: 'Pure Abstraction', description: 'Geometry, light/shadow, minimal form' },
  { min: 19, max: 21, label: 'Conceptual Masterwork', description: 'Idea-driven, philosophical art' },
  { min: 22, max: 25, label: 'Transcendent Vision', description: 'Beyond literal, spiritual expression' },
];

export const boundaryCategories: LevelCategory[] = [
  { min: 1, max: 3, label: 'Conservative/Safe', description: 'Mainstream, publishable anywhere' },
  { min: 4, max: 6, label: 'Editorial Boundaries', description: 'High-fashion limits, tasteful' },
  { min: 7, max: 9, label: 'Artistic Exploration', description: 'Pushing editorial limits' },
  { min: 10, max: 12, label: 'Boundary Awareness', description: 'Approaching limits, artistic justification' },
  { min: 13, max: 15, label: 'Boundary Crossing', description: 'Beyond editorial, artistic defense required' },
  { min: 16, max: 18, label: 'Bold Transgression', description: 'Private collection, cultural legitimacy' },
  { min: 19, max: 21, label: 'Sacred Transgression', description: 'Temple art tradition, spiritual context' },
  { min: 22, max: 25, label: 'Ultimate Freedom', description: 'Complete artistic liberty, masterwork' },
];

// ===========================================================================
// CATEGORY LOOKUP FUNCTIONS
// ===========================================================================

export function getCategoryForLevel(level: number, categories: LevelCategory[]): LevelCategory {
  const category = categories.find(cat => level >= cat.min && level <= cat.max);
  return category || categories[categories.length - 1]; // Default to highest if out of range
}

export function getIntimacyCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, intimacyCategories);
}

export function getSeductionCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, seductionCategories);
}

export function getEroticismCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, eroticismCategories);
}

export function getProfessionalismCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, professionalismCategories);
}

export function getPowerCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, powerCategories);
}

export function getAbstractionCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, abstractionCategories);
}

export function getBoundaryCategory(level: number): LevelCategory {
  return getCategoryForLevel(level, boundaryCategories);
}

// ===========================================================================
// LEVEL CALCULATION ENGINE
// ===========================================================================

interface DimensionAccumulator {
  values: number[];
  ranges: Array<[number, number]>;
}

export function calculateLevelsFromNodes(selectedNodeIds: string[]): CalculatedLevels {
  // If no nodes selected, return base levels
  if (selectedNodeIds.length === 0) {
    return {
      intimacy: 1,
      seduction: 1,
      eroticism: 1,
      professionalism: 1,
      power: 1,
      abstraction: 1,
      boundary: 1,
    };
  }

  // Get selected nodes
  const selectedNodes = selectedNodeIds
    .map(id => getNodeById(id))
    .filter((node): node is VisualNode => node !== undefined);

  // Accumulate effects by dimension
  const accumulators: Record<keyof NodeEffects, DimensionAccumulator> = {
    intimacy: { values: [], ranges: [] },
    seduction: { values: [], ranges: [] },
    eroticism: { values: [], ranges: [] },
    professionalism: { values: [], ranges: [] },
    power: { values: [], ranges: [] },
    abstraction: { values: [], ranges: [] },
    boundary: { values: [], ranges: [] },
  };

  // Collect all effects
  selectedNodes.forEach(node => {
    Object.entries(node.effects).forEach(([dimension, range]) => {
      if (range) {
        const dim = dimension as keyof NodeEffects;
        accumulators[dim].ranges.push(range);
        // Use midpoint of range for averaging
        accumulators[dim].values.push((range[0] + range[1]) / 2);
      }
    });
  });

  // Calculate final levels
  const calculated: CalculatedLevels = {
    intimacy: calculateDimension(accumulators.intimacy),
    seduction: calculateDimension(accumulators.seduction),
    eroticism: calculateDimension(accumulators.eroticism),
    professionalism: calculateDimension(accumulators.professionalism),
    power: calculateDimension(accumulators.power),
    abstraction: calculateDimension(accumulators.abstraction),
    boundary: calculateDimension(accumulators.boundary),
  };

  return calculated;
}

function calculateDimension(accumulator: DimensionAccumulator): number {
  if (accumulator.values.length === 0) return 1; // Base level

  // Strategy: Use weighted average with bias toward higher values
  // This reflects that selecting multiple high-level nodes should push levels higher
  const sorted = [...accumulator.values].sort((a, b) => b - a); // Descending

  // Weight: first value 40%, second 30%, third 20%, rest 10%
  let weightedSum = 0;
  let totalWeight = 0;

  sorted.forEach((value, index) => {
    let weight = 0;
    if (index === 0) weight = 0.4;
    else if (index === 1) weight = 0.3;
    else if (index === 2) weight = 0.2;
    else weight = 0.1 / (sorted.length - 3 || 1); // Distribute 10% among remaining

    weightedSum += value * weight;
    totalWeight += weight;
  });

  const calculated = weightedSum / totalWeight;

  // Round and clamp to 1-25
  return Math.max(1, Math.min(25, Math.round(calculated)));
}

// ===========================================================================
// COMPATIBILITY & WARNINGS
// ===========================================================================

export interface LevelWarning {
  type: 'conflict' | 'boundary' | 'combination' | 'missing';
  severity: 'low' | 'medium' | 'high';
  message: string;
  affectedNodes: string[];
}

export function generateWarnings(selectedNodeIds: string[], levels: CalculatedLevels): LevelWarning[] {
  const warnings: LevelWarning[] = [];
  const selectedNodes = selectedNodeIds
    .map(id => getNodeById(id))
    .filter((node): node is VisualNode => node !== undefined);

  // Warning 1: High boundary levels
  if (levels.boundary >= 16) {
    warnings.push({
      type: 'boundary',
      severity: 'high',
      message: `PREMIUM TIER: Boundary level ${levels.boundary}/25 (${getBoundaryCategory(levels.boundary).label}). Requires artistic justification and cultural/cinematic legitimacy.`,
      affectedNodes: selectedNodeIds,
    });
  } else if (levels.boundary >= 13) {
    warnings.push({
      type: 'boundary',
      severity: 'medium',
      message: `High boundary level ${levels.boundary}/25 (${getBoundaryCategory(levels.boundary).label}). Ensure artistic framing and safety measures.`,
      affectedNodes: selectedNodeIds,
    });
  }

  // Warning 2: Conflicting intimacy and professionalism
  if (levels.intimacy >= 16 && levels.professionalism <= 6) {
    warnings.push({
      type: 'conflict',
      severity: 'medium',
      message: 'High intimacy with low professionalism may create jarring combination. Consider raising professionalism level.',
      affectedNodes: selectedNodeIds,
    });
  }

  // Warning 3: High eroticism without seduction
  if (levels.eroticism >= 13 && levels.seduction <= 8) {
    warnings.push({
      type: 'combination',
      severity: 'low',
      message: 'High eroticism with low seduction. Consider adding seductive pose or PassionWeave mode.',
      affectedNodes: selectedNodeIds,
    });
  }

  // Warning 4: Missing critical nodes
  const hasSubject = selectedNodes.some(n => n.category === 'subject');
  const hasEnvironment = selectedNodes.some(n => n.category === 'environment');

  if (!hasSubject) {
    warnings.push({
      type: 'missing',
      severity: 'high',
      message: 'No subject selected. Please select a subject/model node.',
      affectedNodes: [],
    });
  }

  if (!hasEnvironment) {
    warnings.push({
      type: 'missing',
      severity: 'medium',
      message: 'No environment selected. Will use default studio setting.',
      affectedNodes: [],
    });
  }

  // Warning 5: SeductiveWeave without appropriate levels
  const hasSeductiveWeave = selectedNodes.some(n => n.id === 'weave-seductive');
  if (hasSeductiveWeave && (levels.seduction < 10 || levels.eroticism < 10)) {
    warnings.push({
      type: 'combination',
      severity: 'medium',
      message: 'SeductiveWeave works best with seduction and eroticism levels ≥10. Consider adding seductive pose or wardrobe.',
      affectedNodes: ['weave-seductive'],
    });
  }

  return warnings;
}

// ===========================================================================
// LEVEL COLOR GRADIENTS
// ===========================================================================

export function getLevelColor(level: number, dimension: keyof CalculatedLevels): string {
  const percentage = level / 25;

  switch (dimension) {
    case 'intimacy':
      // Blue to red gradient
      return interpolateColor('#3B82F6', '#EF4444', percentage);
    case 'seduction':
      // Pink to crimson gradient
      return interpolateColor('#EC4899', '#DC2626', percentage);
    case 'eroticism':
      // Purple to magenta gradient
      return interpolateColor('#9333EA', '#D946EF', percentage);
    case 'professionalism':
      // Green to gold gradient
      return interpolateColor('#10B981', '#F59E0B', percentage);
    case 'power':
      // Gray to black gradient
      return interpolateColor('#9CA3AF', '#1F2937', percentage);
    case 'abstraction':
      // White to gray gradient
      return interpolateColor('#F3F4F6', '#6B7280', percentage);
    case 'boundary':
      // Yellow to orange to red gradient
      if (percentage < 0.5) {
        return interpolateColor('#FBBF24', '#F97316', percentage * 2);
      } else {
        return interpolateColor('#F97316', '#DC2626', (percentage - 0.5) * 2);
      }
    default:
      return '#6B7280';
  }
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
