/**
 * PROMPT PARSER SERVICE - ENHANCED
 *
 * Extracts structured data from Flux prompts and converts them into PromptData format
 * for populating the JSON editor fields. Ensures ALL fields are properly populated.
 */

import { PromptData } from '../types';

/**
 * Parse a Flux prompt string into structured PromptData
 * Now ensures ALL fields are populated with sensible defaults if missing
 */
export function parseFluxPromptToData(prompt: string): PromptData {
  // Extract shot/opening declaration
  const shotMatch = prompt.match(/^([^.]+\. Intimacy \d+\/10[^.]*\.\.)/);
  const shot = shotMatch ? shotMatch[1].replace(/\.\.$/, '.').trim() : 'Fine-art photography with cinematic depth.';

  // Extract subject variant (everything between "subject: variant:" and "pose:")
  const variantMatch = prompt.match(/subject:\s*variant:\s*([^,]+(?:,[^,]+)*?)\s*(?:,\s*)?pose:/s);
  const variant = variantMatch ? variantMatch[1].trim() : 'Elite artistic model with expressive presence.';

  // Extract individual subject fields
  const pose = extractField(prompt, 'pose') || 'Natural confident pose expressing grace and power';
  const hairColor = extractField(prompt, 'hair_color') || 'dark';
  const hairStyle = extractField(prompt, 'hair_style') || 'Elegant styled with natural volume';
  const skinFinish = extractField(prompt, 'skin_finish') || 'Natural with healthy glow';
  const handNailDetails = extractField(prompt, 'hand_and_nail_details') || 'Graceful natural placement with professional manicure';
  const tattoos = extractField(prompt, 'tattoos') || 'none';
  const piercings = extractField(prompt, 'piercings') || 'none';
  const bodyArt = extractField(prompt, 'body_art') || 'none';
  const nailArt = extractField(prompt, 'nail_art') || 'Natural neutral polish';
  const highHeels = extractField(prompt, 'high_heels') || 'not visible';

  // Extract wardrobe (between "wardrobe:" and either ".." or "environment:")
  const wardrobeMatch = prompt.match(/wardrobe:\s*([^]+?)(?:\.\.\s*environment:|environment:)/);
  const wardrobe = wardrobeMatch ? wardrobeMatch[1].trim().replace(/\.\s*$/, '') : 'Minimalist elegant attire with refined aesthetic';

  // Extract environment
  const envMatch = prompt.match(/environment:\s*([^.]+)\./);
  const environment = envMatch ? envMatch[1].trim() : 'Minimalist studio with professional lighting';

  // Extract lighting
  const lightingMatch = prompt.match(/lighting:\s*([^.]+)\./);
  const lighting = lightingMatch ? lightingMatch[1].trim() : 'Professional studio-quality lighting';

  // Extract camera details
  const cameraMatch = prompt.match(/camera:\s*focal_length:\s*([^,]+),\s*aperture:\s*([^,]+),\s*distance:\s*([^,]+),\s*angle:\s*([^,]+),\s*framing:\s*([^.]+)/);
  const camera = cameraMatch ? {
    focal_length: cameraMatch[1].trim(),
    aperture: cameraMatch[2].trim(),
    distance: cameraMatch[3].trim(),
    angle: cameraMatch[4].trim(),
    framing: cameraMatch[5].trim()
  } : {
    focal_length: '50mm',
    aperture: 'f/2.8',
    distance: '3 m',
    angle: 'Eye-level for direct connection',
    framing: 'Medium shot emphasizing form and presence'
  };

  // Extract color_grade
  const colorGradeMatch = prompt.match(/color_grade:\s*([^.]+)\./);
  const colorGrade = colorGradeMatch ? colorGradeMatch[1].trim() : 'Natural balanced tones with cinematic depth';

  // Extract style
  const styleMatch = prompt.match(/style:\s*([^.]+(?:\.[^.]+)*?)\.\s*(?:quality:|figure_and_form:|$)/);
  const style = styleMatch ? styleMatch[1].trim() : 'Fine-art photography celebrating natural beauty and artistic expression';

  // Extract quality
  const qualityMatch = prompt.match(/quality:\s*([^.]+)\./);
  const quality = qualityMatch ? qualityMatch[1].trim() : 'Professional 8K photography with exceptional detail';

  // Extract figure_and_form
  const figureMatch = prompt.match(/figure_and_form:\s*([^.]+)\./);
  const figureAndForm = figureMatch ? figureMatch[1].trim() : 'Natural form with artistic emphasis on composition';

  // Extract skin_micro_details
  const skinMatch = prompt.match(/skin_micro_details:\s*([^.]+)\./);
  const skinMicroDetails = skinMatch ? skinMatch[1].trim() : 'Natural authentic skin texture with professional finish';

  // Extract fabric_physics
  const fabricMatch = prompt.match(/fabric_physics:\s*([^.]+(?:\.[^.]+)*?)\.\s*(?:\.?\s*material_properties:|$)/);
  const fabricPhysics = fabricMatch ? fabricMatch[1].trim() : 'Natural fabric draping with realistic folds and texture';

  // Extract material_properties
  const materialMatch = prompt.match(/material_properties:\s*(.+?)\.?\s*$/s);
  const materialProperties = materialMatch ? materialMatch[1].trim().replace(/\.\s*$/, '') : 'Natural materials with authentic light interaction';

  return {
    shot,
    subject: {
      variant,
      pose,
      hair_color: hairColor,
      hair_style: hairStyle,
      skin_finish: skinFinish,
      hand_and_nail_details: handNailDetails,
      tattoos,
      piercings,
      body_art: bodyArt,
      nail_art: nailArt,
      high_heels: highHeels
    },
    wardrobe,
    environment,
    lighting,
    camera,
    color_grade: colorGrade,
    style,
    quality,
    figure_and_form: figureAndForm,
    skin_micro_details: skinMicroDetails,
    fabric_physics: fabricPhysics,
    material_properties: materialProperties
  };
}

/**
 * Extract a simple field value (e.g., "hair_color: jet black")
 */
function extractField(prompt: string, fieldName: string): string {
  const regex = new RegExp(`${fieldName}:\\s*([^,\\.]+)`, 'i');
  const match = prompt.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Parse Quick Corporate Generator template into PromptData
 * Ensures ALL fields are properly populated
 */
export function parseCorporateTemplateToData(
  variant: string,
  intimacyLevel: number,
  powerDynamic: string,
  pose: string,
  environment: string,
  wardrobe: string,
  measurements: { bust: string; waist: string; hips: string },
  height: string
): PromptData {
  return {
    shot: `Corporate power photography in revealing style. Intimacy ${intimacyLevel}/10, ${powerDynamic} power dynamic.`,

    subject: {
      variant: `Elite Indian artistic model (height ${height}) specializing in modern concept films, private editorial art, and expressive erotic-art photography. Possesses an exceptionally curvaceous figure (bust ${measurements.bust}, waist ${measurements.waist}, hips ${measurements.hips}) with pronounced wide hips and dramatic curves. Athletic sculptural form with strong shoulders and defined waist. Luminous dusky complexion with warm undertones. Sharp angular bone structure, magnetic penetrating gaze, strong jawline. Creative presence.`,
      pose: pose,
      hair_color: 'jet black',
      hair_style: 'Elegant flowing style with soft framing',
      skin_finish: 'Luminous professional finish with natural radiance',
      hand_and_nail_details: 'Executive manicure with impeccable attention to detail',
      tattoos: 'none',
      piercings: 'none',
      body_art: 'none',
      nail_art: intimacyLevel >= 7 ? 'Bold red executive polish' : 'Professional nude polish',
      high_heels: 'Designer stiletto power heels'
    },

    wardrobe: wardrobe,

    environment: environment,

    lighting: 'Professional studio-quality lighting with architectural precision',

    camera: {
      focal_length: '35mm',
      aperture: 'f/2.8',
      distance: '4 m',
      angle: powerDynamic === 'submissive'
        ? 'High angle suggesting vulnerability within power'
        : powerDynamic === 'dominant'
        ? 'Low angle emphasizing authority and power'
        : 'Eye level for balanced perspective',
      framing: 'Full body or wide medium shot showing environment and power'
    },

    color_grade: 'Rich dramatic tones with sensual warmth',

    style: `Corporate fine-art photography celebrating feminine executive power. ${powerDynamic} sensuality style. Power level ${Math.min(10, intimacyLevel + 1)}/10. Creative industry glamour with backstage access to power. Where artistic vision meets commercial empire, high-fashion meets high-stakes.`,

    quality: 'Ultra-high-end 8K corporate fashion photography with impeccable detail, professional retouching maintaining authentic texture',

    figure_and_form: 'Sophisticated form suggesting power through subtle feminine grace',

    skin_micro_details: 'Premium high-resolution skin texture with executive-level retouching, maintaining authentic pores and natural radiance while perfecting professional appearance',

    fabric_physics: 'Luxury corporate fabric with precise tailoring and strategic draping. Professional draping with subtle body-conscious elements.',

    material_properties: 'Luxury materials from environment: Acoustic panels with designer finish, Polished concrete industrial floors, Luxury velvet curtains and seating. Executive-level fabrics with premium light interaction and tactile richness.'
  };
}

/**
 * Extract key elements from a prompt for variant generation
 */
export interface PromptElements {
  category: string;
  intimacyLevel: number;
  pose: string;
  environment: string;
  wardrobe: string;
  lighting: string;
  cameraAngle: string;
  colorGrade: string;
}

export function extractPromptElements(prompt: string): PromptElements {
  // Extract intimacy level
  const intimacyMatch = prompt.match(/Intimacy (\d+)\/10/);
  const intimacyLevel = intimacyMatch ? parseInt(intimacyMatch[1]) : 7;

  // Extract category from style
  let category = 'corporate';
  if (prompt.includes('Artistic') || prompt.includes('artist')) category = 'artistic';
  else if (prompt.includes('Editorial') || prompt.includes('editorial')) category = 'editorial';
  else if (prompt.includes('Architectural') || prompt.includes('architectural')) category = 'architectural';
  else if (prompt.includes('Film') || prompt.includes('creative industry')) category = 'creative';

  return {
    category,
    intimacyLevel,
    pose: extractField(prompt, 'pose') || 'Natural confident pose',
    environment: prompt.match(/environment:\s*([^.]+)/)?.[1]?.trim() || 'Professional studio',
    wardrobe: prompt.match(/wardrobe:\s*([^.]+)/)?.[1]?.trim() || 'Elegant attire',
    lighting: prompt.match(/lighting:\s*([^.]+)/)?.[1]?.trim() || 'Professional lighting',
    cameraAngle: prompt.match(/angle:\s*([^,]+)/)?.[1]?.trim() || 'Eye-level',
    colorGrade: prompt.match(/color_grade:\s*([^.]+)/)?.[1]?.trim() || 'Natural balanced tones'
  };
}
