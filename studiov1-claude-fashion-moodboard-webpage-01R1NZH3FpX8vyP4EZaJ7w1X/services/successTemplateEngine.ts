/**
 * SUCCESS TEMPLATE ENGINE
 *
 * This engine replicates the EXACT structure of the proven working Flux prompt.
 * Every character, space, punctuation mark, and formatting detail is preserved.
 *
 * KEY STRUCTURAL DETAILS PRESERVED:
 * - Double periods (..) at specific locations
 * - Double spaces after certain periods
 * - Period-comma combos (.,)
 * - Exact field label structure (subject: variant:)
 * - Measurement format with quotes (5'7", 40DD", 26", 44")
 * - Continuous text flow without line breaks
 * - Specific capitalization patterns
 */

export interface CorporatePowerTemplate {
  // Opening declaration
  styleDeclaration: string;
  intimacyLevel: number;
  powerDynamic: 'dominant' | 'submissive' | 'balanced';

  // Subject details
  modelHeight: string; // e.g., "5'7\""
  modelSpecialties: string[];
  measurements: {
    bust: string;   // e.g., "40DD\""
    waist: string;  // e.g., "26\""
    hips: string;   // e.g., "44\""
  };
  physicalDescription: string;
  complexion: string;
  facialFeatures: string;
  presence: string;

  // Pose and styling
  pose: string;
  hairColor: string;
  hairStyle: string;
  skinFinish: string;
  handNailDetails: string;
  nailArt: string;
  highHeels: string;

  // Wardrobe
  wardrobe: string;

  // Environment
  environment: string;

  // Lighting
  lighting: string;

  // Camera
  camera: {
    focalLength: string;
    aperture: string;
    distance: string;
    angle: string;
    framing: string;
  };

  // Post-processing
  colorGrade: string;

  // Style
  styleDescription: string;
  sensualityStyle: string;
  powerLevel: number;
  creativeContext: string;

  // Quality
  quality: string;

  // Technical details
  figureAndForm: string;
  skinMicroDetails: string;
  fabricPhysics: string;
  materialProperties: string[];
}

/**
 * SUCCESS PROMPT ENGINE
 * Generates prompts using the exact working template structure
 */
export class SuccessPromptEngine {
  /**
   * Helper function to join array items with proper "and" before last item
   * Examples:
   * ['A'] -> 'A'
   * ['A', 'B'] -> 'A and B'
   * ['A', 'B', 'C'] -> 'A, B, and C'
   */
  private static joinWithAnd(items: string[]): string {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;

    const allButLast = items.slice(0, -1);
    const last = items[items.length - 1];
    return `${allButLast.join(', ')}, and ${last}`;
  }

  /**
   * Generates a prompt using the EXACT structure from the working example
   * Preserves all punctuation anomalies, spacing, and formatting
   */
  static generateCorporatePowerPrompt(template: CorporatePowerTemplate): string {
    // Build specialties string with proper "and" conjunction
    const specialtiesStr = this.joinWithAnd(template.modelSpecialties);

    // Build subject description with EXACT structure
    const subjectVariant = `Elite Indian artistic model (height ${template.modelHeight}) specializing in ${specialtiesStr}. Possesses an exceptionally curvaceous figure (bust ${template.measurements.bust}, waist ${template.measurements.waist}, hips ${template.measurements.hips}) with pronounced wide hips and dramatic curves.  ${template.physicalDescription}. ${template.complexion}. ${template.facialFeatures}. ${template.presence}.,`;

    // Assemble the complete prompt with EXACT punctuation and spacing
    return `${template.styleDeclaration}. Intimacy ${template.intimacyLevel}/10, ${template.powerDynamic} power dynamic.. subject: variant: ${subjectVariant} pose: ${template.pose}, hair_color: ${template.hairColor}, hair_style: ${template.hairStyle}, skin_finish: ${template.skinFinish}, hand_and_nail_details: ${template.handNailDetails}, tattoos: none, piercings: none, body_art: none, nail_art: ${template.nailArt}, high_heels: ${template.highHeels}. wardrobe: ${template.wardrobe}.. environment: ${template.environment}. lighting: ${template.lighting}. camera: focal_length: ${template.camera.focalLength}, aperture: ${template.camera.aperture}, distance: ${template.camera.distance}, angle: ${template.camera.angle}, framing: ${template.camera.framing}. color_grade: ${template.colorGrade}. style: ${template.styleDescription}. ${template.sensualityStyle} sensuality style. Power level ${template.powerLevel}/10. ${template.creativeContext}.. quality: ${template.quality}. figure_and_form: ${template.figureAndForm}. skin_micro_details: ${template.skinMicroDetails}. fabric_physics: ${template.fabricPhysics}.. material_properties: ${template.materialProperties.join(', ')}.`;
  }

  /**
   * The original working template - preserved exactly as it succeeded
   */
  static getOriginalWorkingTemplate(): CorporatePowerTemplate {
    return {
      styleDeclaration: 'Corporate power photography in revealing style',
      intimacyLevel: 7,
      powerDynamic: 'submissive',

      modelHeight: '5\'7"',
      modelSpecialties: [
        'modern concept films',
        'private editorial art',
        'expressive erotic-art photography'
      ],
      measurements: {
        bust: '40DD"',
        waist: '26"',
        hips: '44"'
      },
      physicalDescription: 'Athletic sculptural form with strong shoulders and defined waist',
      complexion: 'Luminous dusky complexion with warm undertones',
      facialFeatures: 'Sharp angular bone structure, magnetic penetrating gaze, strong jawline',
      presence: 'creative presence',

      pose: 'Kneeling among fabric samples and design swatches',
      hairColor: 'jet black',
      hairStyle: 'Elegant flowing style with soft framing',
      skinFinish: 'Luminous professional finish with natural radiance',
      handNailDetails: 'Executive manicure with impeccable attention to detail',
      nailArt: 'Bold red executive polish',
      highHeels: 'Designer stiletto power heels',

      wardrobe: 'A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form',

      environment: 'Executive screening room with luxury seating',

      lighting: 'Professional studio-quality lighting',

      camera: {
        focalLength: '35mm',
        aperture: 'f/2.8',
        distance: '4 m',
        angle: 'High angle suggesting vulnerability within power',
        framing: 'Full body or wide medium shot showing environment and power'
      },

      colorGrade: 'Rich dramatic tones with sensual warmth',

      styleDescription: 'Corporate fine-art photography celebrating feminine executive power',
      sensualityStyle: 'creative',
      powerLevel: 8,
      creativeContext: 'Creative industry glamour with backstage access to power. Where artistic vision meets commercial empire, high-fashion meets high-stakes',

      quality: 'Ultra-high-end 8K corporate fashion photography with impeccable detail, professional retouching maintaining authentic texture',

      figureAndForm: 'Sophisticated form suggesting power through subtle feminine grace',

      skinMicroDetails: 'Premium high-resolution skin texture with executive-level retouching, maintaining authentic pores and natural radiance while perfecting professional appearance',

      fabricPhysics: 'Luxury corporate fabric with precise tailoring and strategic draping. Professional draping with subtle body-conscious elements',

      materialProperties: [
        'Luxury materials from environment: Acoustic panels with designer finish',
        'Polished concrete industrial floors',
        'Luxury velvet curtains and seating. Executive-level fabrics with premium light interaction and tactile richness'
      ]
    };
  }
}

/**
 * Verify the engine produces the exact working prompt
 */
export function verifyEngineAccuracy(): boolean {
  const template = SuccessPromptEngine.getOriginalWorkingTemplate();
  const generated = SuccessPromptEngine.generateCorporatePowerPrompt(template);

  const original = `Corporate power photography in revealing style. Intimacy 7/10, submissive power dynamic.. subject: variant: Elite Indian artistic model (height 5'7") specializing in modern concept films, private editorial art, expressive erotic-art photography. Possesses an exceptionally curvaceous figure (bust 40DD", waist 26", hips 44") with pronounced wide hips and dramatic curves.  Athletic sculptural form with strong shoulders and defined waist. Luminous dusky complexion with warm undertones. Sharp angular bone structure, magnetic penetrating gaze, strong jawline. creative presence., pose: Kneeling among fabric samples and design swatches, hair_color: jet black, hair_style: Elegant flowing style with soft framing, skin_finish: Luminous professional finish with natural radiance, hand_and_nail_details: Executive manicure with impeccable attention to detail, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer stiletto power heels. wardrobe: A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form.. environment: Executive screening room with luxury seating. lighting: Professional studio-quality lighting. camera: focal_length: 35mm, aperture: f/2.8, distance: 4 m, angle: High angle suggesting vulnerability within power, framing: Full body or wide medium shot showing environment and power. color_grade: Rich dramatic tones with sensual warmth. style: Corporate fine-art photography celebrating feminine executive power. creative sensuality style. Power level 8/10. Creative industry glamour with backstage access to power. Where artistic vision meets commercial empire, high-fashion meets high-stakes.. quality: Ultra-high-end 8K corporate fashion photography with impeccable detail, professional retouching maintaining authentic texture. figure_and_form: Sophisticated form suggesting power through subtle feminine grace. skin_micro_details: Premium high-resolution skin texture with executive-level retouching, maintaining authentic pores and natural radiance while perfecting professional appearance. fabric_physics: Luxury corporate fabric with precise tailoring and strategic draping. Professional draping with subtle body-conscious elements.. material_properties: Luxury materials from environment: Acoustic panels with designer finish, Polished concrete industrial floors, Luxury velvet curtains and seating. Executive-level fabrics with premium light interaction and tactile richness.`;

  // Compare character by character
  const match = generated === original;

  if (!match) {
    console.error('❌ ENGINE MISMATCH DETECTED');
    console.log('Generated length:', generated.length);
    console.log('Original length:', original.length);

    // Find first difference
    for (let i = 0; i < Math.max(generated.length, original.length); i++) {
      if (generated[i] !== original[i]) {
        console.log(`First diff at position ${i}:`);
        console.log(`Generated: "${generated.substring(i-20, i+20)}"`);
        console.log(`Original:  "${original.substring(i-20, i+20)}"`);
        break;
      }
    }
  } else {
    console.log('✅ ENGINE ACCURACY VERIFIED: 100% match with working prompt');
  }

  return match;
}
