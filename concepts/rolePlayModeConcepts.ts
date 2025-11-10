/**
 * ROLE-PLAY MODE CONCEPTS
 *
 * Pre-built role-playing scenarios based on the 9 specialized Indian glamour models
 * Each concept showcases midnight role-play photography with distinct themes
 */

import type { PromptData } from '../types';
import { EROTIC_GLAMOUR_MODELS } from './eroticGlamourModels';

// Helper to convert role-play selections into PromptData format
function createRolePlayConcept(
  modelId: string,
  wardrobeIndex: number,
  poseIndex: number,
  environmentIndex: number,
  intimacyLevel: number,
  conceptName: string
): PromptData {
  const model = EROTIC_GLAMOUR_MODELS.find(m => m.id === modelId);
  if (!model) throw new Error(`Model ${modelId} not found`);

  const wardrobe = model.wardrobeCollection[wardrobeIndex];
  const pose = model.poseGallery[poseIndex];
  const environment = model.environments[environmentIndex];
  const photographer = model.personalPhotographer;

  return {
    shot: `Midnight role-playing photography. Intimacy ${intimacyLevel}/10. ${photographer.style}.`,

    subject: {
      variant: `Elite Indian artistic model specializing in ${model.category}. Height ${model.physicalTraits.height}. Physical traits: ${model.physicalTraits.bust} bust, ${model.physicalTraits.waist} waist, ${model.physicalTraits.hips} hips. ${model.physicalTraits.skinTone}. Specializing in ${model.physicalTraits.specialties || model.category}.`,
      pose: `${pose.description}. ${pose.poseName}.`,
      hair_color: 'jet black',
      hair_style: 'Midnight glamour with flowing elegance',
      skin_finish: `${model.physicalTraits.skinTone} with natural luminosity`,
      hand_and_nail_details: 'Graceful positioning with glamorous manicure',
      tattoos: 'none',
      piercings: 'none',
      body_art: 'none',
      nail_art: 'Midnight glamour polish',
      high_heels: 'Designer stilettos'
    },

    wardrobe: `${wardrobe.description}. ${wardrobe.fabricDetails}.`,

    environment: `${environment.name}. ${environment.description}. ${environment.atmosphere}.`,

    lighting: `${photographer.lightingSignature}. ${environment.lightingProfile}.`,

    camera: {
      focal_length: photographer.cameraPreference.split(' ')[0],
      aperture: photographer.cameraPreference.match(/f\/[\d.]+/)?.[0] || 'f/2.0',
      distance: '3 m',
      angle: 'Eye level intimate perspective',
      framing: pose.framing || 'Medium shot emphasizing form'
    },

    color_grade: 'Midnight dramatic tones with sensual warmth and natural color balance',

    style: `${photographer.style}. Midnight encounter with ${model.name}. ${model.category} specialist with ${intimacyLevel}/10 intimacy. Collaborative artistic expression with trust-based intimacy.`,

    quality: 'Ultra-high-end 8K glamour photography with exceptional detail and natural authenticity',

    figure_and_form: `${model.emphasis}. Natural form celebrating feminine curves and presence`,

    skin_micro_details: 'Authentic skin texture with natural pores and subsurface scattering. Professional finish maintaining natural beauty',

    fabric_physics: `${wardrobe.fabricDetails}. Natural draping following gravity with realistic folds and texture`,

    material_properties: 'Authentic materials from environment with natural light interaction. Luxury fabrics with premium tactile quality'
  };
}

// Pre-built role-play concepts showcasing different combinations
export const rolePlayModeConcepts: { [key: string]: PromptData } = {
  // Upper Body Reveal Specialist (Aisha Décolletage) - Executive Midnight
  'roleplay-executive-reveal': createRolePlayConcept(
    'erotic-model-001', // Aisha Décolletage
    0, // First wardrobe (usually most revealing)
    0, // First pose (signature pose)
    0, // Private Secret Office
    10, // Maximum intimacy
    'Executive Midnight Reveal'
  ),

  // Lower Curves Specialist (Priya Curvature) - Intimate Room
  'roleplay-curves-intimate': createRolePlayConcept(
    'erotic-model-002', // Priya Curvature
    1, // Second wardrobe
    1, // Second pose
    1, // Private Intimate Room
    10,
    'Curves in Private Room'
  ),

  // Sensual Bold Specialist (Kavya Volupté) - Underground Edge
  'roleplay-bold-underground': createRolePlayConcept(
    'erotic-model-003', // Kavya Volupté
    0, // First wardrobe
    2, // Third pose
    2, // Underground Garage
    9,
    'Bold Underground Encounter'
  ),

  // Erotic Actress (Disha Cinéma) - Cabin Romance
  'roleplay-actress-cabin': createRolePlayConcept(
    'erotic-model-004', // Disha Cinéma
    2, // Third wardrobe
    3, // Fourth pose
    3, // Minimalist Cabin
    10,
    'Actress in Midnight Cabin'
  ),

  // Athletic Glamour (Isha Athléa) - Office Fitness
  'roleplay-athletic-office': createRolePlayConcept(
    'erotic-model-005', // Isha Athléa
    1, // Second wardrobe
    0, // First pose
    0, // Private Office
    8,
    'Athletic Glamour in Office'
  ),

  // Maximum Glamour Diva (Ishani Glamazon) - Luxury Room
  'roleplay-maxglam-luxury': createRolePlayConcept(
    'erotic-model-006', // Ishani Glamazon
    0, // First wardrobe (maximum glamour)
    1, // Second pose
    1, // Private Intimate Room
    10,
    'Maximum Glamour Luxury'
  ),

  // Midnight Mystique (Maya Midnight) - Underground Noir
  'roleplay-midnight-noir': createRolePlayConcept(
    'erotic-model-007', // Maya Midnight
    1, // Second wardrobe
    2, // Third pose
    2, // Underground Garage
    10,
    'Midnight Mystique Noir'
  ),

  // Action Bombshell (Riya Powerhouse) - Cabin Power
  'roleplay-action-power': createRolePlayConcept(
    'erotic-model-008', // Riya Powerhouse
    0, // First wardrobe
    0, // First pose (power pose)
    3, // Minimalist Cabin
    9,
    'Action Power in Cabin'
  ),

  // Fitness Vixen (Nisha Vitality) - Office Vitality
  'roleplay-fitness-office': createRolePlayConcept(
    'erotic-model-009', // Nisha Vitality
    2, // Third wardrobe
    3, // Fourth pose
    0, // Private Office
    8,
    'Fitness Vixen Office Scene'
  ),

  // Mixed combination concepts
  'roleplay-diva-garage': createRolePlayConcept(
    'erotic-model-006', // Ishani Glamazon
    2, // Third wardrobe
    0, // First pose
    2, // Underground Garage (contrasting environment)
    10,
    'Glamour Diva in Urban Edge'
  ),

  'roleplay-curves-cabin': createRolePlayConcept(
    'erotic-model-002', // Priya Curvature
    0, // First wardrobe
    3, // Fourth pose
    3, // Cabin (romantic setting)
    10,
    'Curves in Midnight Cabin'
  ),

  'roleplay-actress-office': createRolePlayConcept(
    'erotic-model-004', // Disha Cinéma
    1, // Second wardrobe
    1, // Second pose
    0, // Private Office (corporate cinematic)
    9,
    'Cinematic Office Scene'
  ),
};

export default rolePlayModeConcepts;
