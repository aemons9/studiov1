/**
 * CRITICAL MODEL TO PRESET MAPPING SYSTEM
 * Maps Instagram models and variants to specific presets for poses, wardrobe, hair, and other attributes
 * This is a critical mapping with no room for error
 */

import type { Subject, PromptData } from '../types';
import { SEDUCTRESS_POSES } from './seductressPoses';
import { sensualWardrobePresets } from './sensualWardrobeCollection';

export interface ModelPresetMapping {
  modelName: string;
  modelValue: string;
  measurements: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
  defaultPoses: string[];
  defaultWardrobe: string[];
  defaultHairStyles: {
    color: string;
    styles: string[];
  };
  defaultNailArt: string[];
  defaultLighting: string[];
  defaultMakeup: string;
  ageRange: string;
  skinTone: string;
  accessories: string[];
}

export const INSTAGRAM_MODEL_MAPPINGS: ModelPresetMapping[] = [
  {
    modelName: "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38",
    modelValue: "Indian Instagram influencer model (height 5'7\"), with curvaceous hourglass figure and exact measurements (bust 36\", waist 26\", hips 38\"). Features radiant golden-bronze complexion with sun-kissed glow. Bold influencer beauty: sultry bedroom eyes with dramatic lashes and winged liner, glossy plump lips, contoured cheekbones, perfect Instagram face. Age 22-26. Modern Indian social media star with bold confidence.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Mirror Selfie: Standing in front of full-length mirror, phone raised, one hand on hip, back arched",
      "Bed Lounging: Reclining on bed with white sheets, one arm above head, sultry expression",
      "Leaning Against Wall: One shoulder against wall, hip popped, looking over shoulder at camera"
    ],
    defaultWardrobe: [
      "High-waisted leggings with matching sports bra showing toned midriff",
      "Bodycon mini dress that hugs every curve perfectly",
      "Lace bralette with high-waisted bottoms in matching set",
      "Oversized boyfriend shirt unbuttoned, nothing underneath"
    ],
    defaultHairStyles: {
      color: "dark brown with honey highlights",
      styles: [
        "loose glamorous beach waves",
        "sleek high ponytail with face-framing strands",
        "messy top knot with wispy tendrils"
      ]
    },
    defaultNailArt: [
      "Long stiletto nails in nude pink",
      "Chrome mirror finish",
      "Ombre fade from nude to white"
    ],
    defaultLighting: [
      "Ring light for perfect Instagram glow",
      "Golden hour warm side light",
      "Soft window light with sheer curtains"
    ],
    defaultMakeup: "Full glam with winged liner, false lashes, glossy nude lips, contoured cheekbones with highlighter",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Gold hoops", "Delicate nose ring", "Multiple ear piercings", "Ankle chain"]
  },

  {
    modelName: "College Fresher Influencer (Honey-Bronze) 34-25-36",
    modelValue: "Indian college girl influencer (height 5'6\"), balanced curvy-athletic figure with measurements (bust 34\", waist 25\", hips 36\"), natural curves with youthful energy. Fresh honey-bronze complexion with natural radiance. College girl beauty: bright confident eyes with natural makeup, fresh glossy lips, genuine smile, accessible beauty with edge. Age 19-22.",
    measurements: {
      height: "5'6\"",
      bust: "34\"",
      waist: "25\"",
      hips: "36\""
    },
    defaultPoses: [
      "Study Session: Cross-legged on bed with books, playful smile, pen in hand",
      "Campus Walk: Mid-stride, looking back at camera with natural laugh",
      "Dorm Room Mirror: Taking mirror selfie in casual outfit"
    ],
    defaultWardrobe: [
      "Crop top with high-waisted denim shorts",
      "Oversized college hoodie with bike shorts",
      "Sundress with floral pattern",
      "Tank top with yoga pants"
    ],
    defaultHairStyles: {
      color: "dark brown with subtle caramel highlights",
      styles: [
        "natural soft waves",
        "half-up half-down style",
        "messy bun with face-framing pieces"
      ]
    },
    defaultNailArt: [
      "Short natural nails with clear polish",
      "Pastel pink or blue",
      "Simple white French tips"
    ],
    defaultLighting: [
      "Natural daylight from dorm window",
      "Warm sunset on campus",
      "Soft desk lamp for late night study"
    ],
    defaultMakeup: "No-makeup makeup look with tinted moisturizer, mascara, lip gloss",
    ageRange: "19-22",
    skinTone: "honey-bronze",
    accessories: ["Small studs", "Friendship bracelets", "Simple chain necklace", "Smart watch"]
  },

  {
    modelName: "Bollywood Actress Fantasy (Porcelain-Bronze) 36-24-36",
    modelValue: "Indian actress-style influencer model (height 5'8\"), perfect hourglass figure with measurements (bust 36\", waist 24\", hips 36\"), tiny waist with full curves. Flawless porcelain-bronze complexion with luminous radiance. Bollywood actress beauty: dramatic sultry eyes with heavy kohl and winged liner, glossy red lips, perfectly contoured face, high cheekbones, movie star presence. Age 24-28.",
    measurements: {
      height: "5'8\"",
      bust: "36\"",
      waist: "24\"",
      hips: "36\""
    },
    defaultPoses: [
      "Red Carpet Stance: One hand on hip, chin up, movie star presence",
      "Dramatic Recline: On chaise lounge, draped in silk, theatrical expression",
      "Dance Movement: Mid-twirl with flowing fabric, graceful arms"
    ],
    defaultWardrobe: [
      "Designer saree with modern draping and backless blouse",
      "Floor-length sequined gown with thigh-high slit",
      "Ornate lehenga with intricate embroidery",
      "Silk slip dress with lace details"
    ],
    defaultHairStyles: {
      color: "jet black",
      styles: [
        "voluminous Bollywood waves",
        "elegant low bun with decorative pins",
        "side-swept Hollywood glamour waves"
      ]
    },
    defaultNailArt: [
      "Classic red polish",
      "Gold accents on accent nails",
      "Jeweled designs with rhinestones"
    ],
    defaultLighting: [
      "Three-point studio lighting",
      "Dramatic spotlight with rim light",
      "Soft glamour lighting with reflectors"
    ],
    defaultMakeup: "Full Bollywood glam with dramatic smoky eyes, heavy kohl, false lashes, red lips, contoured face",
    ageRange: "24-28",
    skinTone: "porcelain-bronze",
    accessories: ["Statement earrings", "Maang tikka", "Gold bangles", "Anklets"]
  },

  {
    modelName: "Morning Routine Influencer (Golden-Honey) 35-26-37",
    modelValue: "Indian lifestyle influencer (height 5'7\"), curvaceous figure with measurements (bust 35\", waist 26\", hips 37\"), natural feminine curves. Warm golden-honey complexion with fresh morning glow. Natural morning beauty: genuine warm eyes with minimal/no makeup, natural brows, fresh lips, authentic real skin. Age 23-27.",
    measurements: {
      height: "5'7\"",
      bust: "35\"",
      waist: "26\"",
      hips: "37\""
    },
    defaultPoses: [
      "Morning Stretch: Arms above head, arching back, genuine yawn",
      "Coffee in Bed: Holding mug, cozy blanket, content smile",
      "Bathroom Mirror: Getting ready routine, natural expression"
    ],
    defaultWardrobe: [
      "Silk robe loosely tied",
      "Oversized white t-shirt",
      "Matching pajama set in soft colors",
      "Cozy loungewear set"
    ],
    defaultHairStyles: {
      color: "dark brown",
      styles: [
        "messy morning bedhead",
        "loose low ponytail",
        "natural air-dried texture"
      ]
    },
    defaultNailArt: [
      "Natural bare nails",
      "Clear coat only",
      "Soft nude polish"
    ],
    defaultLighting: [
      "Soft morning light through curtains",
      "Bathroom vanity lighting",
      "Natural window light"
    ],
    defaultMakeup: "Completely natural or just skincare glow with moisturizer",
    ageRange: "23-27",
    skinTone: "golden-honey",
    accessories: ["Minimal jewelry", "Simple studs", "Delicate chain"]
  }
];

/**
 * Get complete preset mapping for a specific model
 */
export function getModelPresetMapping(modelName: string): ModelPresetMapping | undefined {
  return INSTAGRAM_MODEL_MAPPINGS.find(m => m.modelName === modelName);
}

/**
 * Apply model preset to PromptData
 */
export function applyModelPreset(
  promptData: Partial<PromptData>,
  modelName: string,
  options?: {
    poseIndex?: number;
    wardrobeIndex?: number;
    hairStyleIndex?: number;
    lightingIndex?: number;
    randomize?: boolean;
  }
): Partial<PromptData> {
  const mapping = getModelPresetMapping(modelName);

  if (!mapping) {
    console.warn(`No preset mapping found for model: ${modelName}`);
    return promptData;
  }

  const opts = options?.randomize ? {
    poseIndex: Math.floor(Math.random() * mapping.defaultPoses.length),
    wardrobeIndex: Math.floor(Math.random() * mapping.defaultWardrobe.length),
    hairStyleIndex: Math.floor(Math.random() * mapping.defaultHairStyles.styles.length),
    lightingIndex: Math.floor(Math.random() * mapping.defaultLighting.length)
  } : options ?? {};

  const selectedPose = mapping.defaultPoses[opts.poseIndex ?? 0];
  const selectedWardrobe = mapping.defaultWardrobe[opts.wardrobeIndex ?? 0];
  const selectedHairStyle = mapping.defaultHairStyles.styles[opts.hairStyleIndex ?? 0];
  const selectedLighting = mapping.defaultLighting[opts.lightingIndex ?? 0];
  const selectedNailArt = mapping.defaultNailArt[0];

  return {
    ...promptData,
    shot: `Full body Instagram shot (9:16 vertical), capturing ${mapping.modelName}`,
    subject: {
      variant: mapping.modelValue,
      pose: selectedPose,
      hair_color: mapping.defaultHairStyles.color,
      hair_style: selectedHairStyle,
      nail_art: selectedNailArt,
      high_heels: mapping.modelName.includes("Bollywood") ? "High heels" : "Barefoot or minimal",
      tattoos: "none",
      piercings: mapping.accessories.includes("nose ring") ? "Delicate nose ring" : "none",
      body_art: "none",
      skin_finish: `${mapping.skinTone} complexion with natural glow`,
      hand_and_nail_details: `${selectedNailArt}, ${mapping.defaultMakeup}`
    },
    wardrobe: selectedWardrobe,
    environment: mapping.modelName.includes("College") ?
      "Modern college dorm room with fairy lights and posters" :
      mapping.modelName.includes("Morning") ?
      "Cozy bedroom with soft morning light" :
      mapping.modelName.includes("Bollywood") ?
      "Luxurious studio with dramatic backdrops" :
      "Trendy apartment with Instagram-worthy decor",
    lighting: selectedLighting,
    camera: {
      focal_length: "35mm",
      aperture: "f/1.8",
      distance: "2 meters",
      angle: "Eye level",
      framing: "Full body with some environment"
    },
    color_grade: mapping.skinTone.includes("golden") ? "Warm and inviting" : "Vibrant and saturated",
    style: `Instagram Influencer Aesthetic | ${mapping.defaultMakeup}`,
    quality: "Shot on iPhone 15 Pro Max, Instagram-ready quality, natural skin texture",
    figure_and_form: `Measurements: ${mapping.measurements.bust}-${mapping.measurements.waist}-${mapping.measurements.hips}, ${mapping.measurements.height} tall`,
    skin_micro_details: "Natural skin texture with authentic pores and subtle imperfections for realistic Instagram look",
    fabric_physics: "Fabric drapes naturally following the curves and movement",
    material_properties: "Materials interact realistically with lighting"
  };
}

/**
 * Validate model preset combination for any discrepancies
 */
export function validateModelPreset(promptData: Partial<PromptData>, modelName: string): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const mapping = getModelPresetMapping(modelName);

  if (!mapping) {
    errors.push(`Model "${modelName}" not found in preset mappings`);
    return { isValid: false, errors, warnings };
  }

  // Validate measurements are correctly included
  if (promptData.subject?.variant && !promptData.subject.variant.includes(mapping.measurements.bust)) {
    warnings.push(`Model variant may not include correct bust measurement: ${mapping.measurements.bust}`);
  }

  // Validate age range
  if (promptData.subject?.variant && !promptData.subject.variant.includes("Age")) {
    warnings.push(`Model variant should include age range: ${mapping.ageRange}`);
  }

  // Validate skin tone consistency
  if (promptData.subject?.skin_finish && !promptData.subject.skin_finish.toLowerCase().includes(mapping.skinTone.replace('-', ' '))) {
    warnings.push(`Skin finish doesn't match model's skin tone: ${mapping.skinTone}`);
  }

  // Check for pose compatibility
  if (promptData.subject?.pose) {
    const poseFound = mapping.defaultPoses.some(p =>
      promptData.subject?.pose?.toLowerCase().includes(p.toLowerCase().split(':')[0])
    );
    if (!poseFound) {
      warnings.push("Pose may not be optimized for this model variant");
    }
  }

  // Validate wardrobe appropriateness
  if (promptData.wardrobe && mapping.modelName.includes("College") && promptData.wardrobe.includes("evening gown")) {
    warnings.push("Wardrobe may not match college influencer aesthetic");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get all model names for UI dropdown
 */
export function getAllModelNames(): string[] {
  return INSTAGRAM_MODEL_MAPPINGS.map(m => m.modelName);
}

/**
 * Generate a test prompt to verify mapping
 */
export function generateTestPrompt(modelName: string): string {
  const mapping = getModelPresetMapping(modelName);
  if (!mapping) {
    return `Error: Model ${modelName} not found`;
  }

  const testPrompt = applyModelPreset({}, modelName, { randomize: false });
  const validation = validateModelPreset(testPrompt, modelName);

  let result = `MODEL: ${modelName}\n`;
  result += `MEASUREMENTS: ${mapping.measurements.bust}-${mapping.measurements.waist}-${mapping.measurements.hips} at ${mapping.measurements.height}\n`;
  result += `AGE: ${mapping.ageRange}\n`;
  result += `SKIN TONE: ${mapping.skinTone}\n\n`;

  result += `GENERATED PROMPT:\n`;
  result += `Subject: ${testPrompt.subject?.variant?.substring(0, 150)}...\n`;
  result += `Pose: ${testPrompt.subject?.pose}\n`;
  result += `Wardrobe: ${testPrompt.wardrobe}\n`;
  result += `Hair: ${testPrompt.subject?.hair_color} - ${testPrompt.subject?.hair_style}\n`;
  result += `Makeup: ${mapping.defaultMakeup}\n\n`;

  result += `VALIDATION:\n`;
  result += `Valid: ${validation.isValid}\n`;
  if (validation.errors.length > 0) {
    result += `Errors: ${validation.errors.join(', ')}\n`;
  }
  if (validation.warnings.length > 0) {
    result += `Warnings: ${validation.warnings.join(', ')}\n`;
  }

  return result;
}