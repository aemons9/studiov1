/**
 * PROMPT PARSER SERVICE
 *
 * Extracts structured data from Flux prompts and converts them into PromptData format
 * for populating the JSON editor fields.
 */

import { PromptData } from '../types';

/**
 * Parse a Flux prompt string into structured PromptData
 */
export function parseFluxPromptToData(prompt: string): PromptData {
  const data: Partial<PromptData> = {};

  // Extract opening style declaration and intimacy
  const styleMatch = prompt.match(/^(.*?)\. Intimacy (\d+)\/10/);
  if (styleMatch) {
    data.shot = styleMatch[1];
  }

  // Extract subject details
  const subjectMatch = prompt.match(/subject: variant: (.*?)(?:,\s*pose:|$)/s);
  if (subjectMatch) {
    const subjectText = subjectMatch[1].trim();

    // Create subject object
    data.subject = {
      variant: subjectText,
      pose: extractField(prompt, 'pose'),
      hair_color: extractField(prompt, 'hair_color'),
      hair_style: extractField(prompt, 'hair_style'),
      skin_finish: extractField(prompt, 'skin_finish'),
      hand_and_nail_details: extractField(prompt, 'hand_and_nail_details'),
      tattoos: extractField(prompt, 'tattoos') || 'none',
      piercings: extractField(prompt, 'piercings') || 'none',
      body_art: extractField(prompt, 'body_art') || 'none',
      nail_art: extractField(prompt, 'nail_art'),
      high_heels: extractField(prompt, 'high_heels')
    };
  }

  // Extract wardrobe
  data.wardrobe = extractSection(prompt, 'wardrobe:', 'environment:');

  // Extract environment
  data.environment = extractSection(prompt, 'environment:', 'lighting:');

  // Extract lighting
  data.lighting = extractSection(prompt, 'lighting:', 'camera:');

  // Extract camera details
  const cameraSection = extractSection(prompt, 'camera:', 'color_grade:');
  if (cameraSection) {
    data.camera = {
      focal_length: extractCameraField(cameraSection, 'focal_length'),
      aperture: extractCameraField(cameraSection, 'aperture'),
      distance: extractCameraField(cameraSection, 'distance'),
      angle: extractCameraField(cameraSection, 'angle'),
      framing: extractCameraField(cameraSection, 'framing')
    };
  }

  // Extract color grade
  data.color_grade = extractSection(prompt, 'color_grade:', 'style:');

  // Extract style
  data.style = extractSection(prompt, 'style:', 'quality:');

  // Extract quality
  data.quality = extractSection(prompt, 'quality:', 'figure_and_form:');

  // Extract figure and form
  data.figure_and_form = extractSection(prompt, 'figure_and_form:', 'skin_micro_details:');

  // Extract skin micro details
  data.skin_micro_details = extractSection(prompt, 'skin_micro_details:', 'fabric_physics:');

  // Extract fabric physics
  data.fabric_physics = extractSection(prompt, 'fabric_physics:', 'material_properties:');

  // Extract material properties
  const materialSection = extractSection(prompt, 'material_properties:', null);
  data.material_properties = materialSection || '';

  return data as PromptData;
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
 * Extract a camera field value
 */
function extractCameraField(cameraSection: string, fieldName: string): string {
  const regex = new RegExp(`${fieldName}:\\s*([^,]+)`, 'i');
  const match = cameraSection.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Extract a section between two markers
 */
function extractSection(prompt: string, startMarker: string, endMarker: string | null): string {
  const startIndex = prompt.indexOf(startMarker);
  if (startIndex === -1) return '';

  const contentStart = startIndex + startMarker.length;

  if (endMarker === null) {
    // Extract to end of string
    return prompt.substring(contentStart).trim().replace(/\.\s*$/, '');
  }

  const endIndex = prompt.indexOf(endMarker, contentStart);
  if (endIndex === -1) return '';

  return prompt.substring(contentStart, endIndex).trim().replace(/\.\s*$/, '');
}

/**
 * Parse Quick Corporate Generator template into PromptData
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
      variant: `Elite Indian artistic model (height ${height}) specializing in modern concept films, private editorial art, and expressive erotic-art photography. Possesses an exceptionally curvaceous figure (bust ${measurements.bust}, waist ${measurements.waist}, hips ${measurements.hips}) with pronounced wide hips and dramatic curves. Athletic sculptural form with strong shoulders and defined waist. Luminous dusky complexion with warm undertones. Sharp angular bone structure, magnetic penetrating gaze, strong jawline.`,
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

    lighting: 'Professional studio-quality lighting',

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

    style: `Corporate fine-art photography celebrating feminine executive power. ${powerDynamic} sensuality style. Power level ${Math.min(10, intimacyLevel + 1)}/10. Creative industry glamour with backstage access to power.`,

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
    pose: extractField(prompt, 'pose'),
    environment: extractSection(prompt, 'environment:', 'lighting:'),
    wardrobe: extractSection(prompt, 'wardrobe:', 'environment:'),
    lighting: extractSection(prompt, 'lighting:', 'camera:'),
    cameraAngle: extractCameraField(extractSection(prompt, 'camera:', 'color_grade:'), 'angle'),
    colorGrade: extractSection(prompt, 'color_grade:', 'style:')
  };
}
