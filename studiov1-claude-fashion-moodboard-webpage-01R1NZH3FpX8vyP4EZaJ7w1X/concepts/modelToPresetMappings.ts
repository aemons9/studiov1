/**
 * CRITICAL MODEL TO PRESET MAPPING SYSTEM
 * Maps Instagram models and variants to specific presets for poses, wardrobe, hair, and other attributes
 * This is a critical mapping with no room for error
 */

import type { Subject, PromptData } from '../types';
import { SEDUCTRESS_POSES } from './seductressPoses';
import { sensualWardrobePresets } from './sensualWardrobeCollection';
import { INTIMATE_ARTISTIC_POSES, MIDNIGHT_ARTISTIC_MODELS, MASTERCLASS_TECHNIQUES } from './artisticMidnightModels';

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
  },

  // Artistic Midnight Collection - Fine-Art Photography Models
  {
    modelName: "Midnight Floor Artist (Golden-Bronze) 36-26-38",
    modelValue: "Elite Indian Instagram model (height 5'7\") specializing in intimate fine-art floor photography. Perfect hourglass measurements (bust 36\", waist 26\", hips 38\") with golden-bronze skin that glows in candlelight. Master of vulnerable floor poses creating Rembrandt-style chiaroscuro.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Midnight Reverie: Reclining on silk sheets, arched back, one arm overhead, fingers at collarbone",
      "Golden Hour Embrace: Lying on side, knees drawn up, self-embracing in warm window light",
      "Intimate Whisper: Close-up, hair spread like halo, hand near lips in hushing gesture"
    ],
    defaultWardrobe: [
      "Minimalist champagne silk slip with delicate lace trim",
      "Nothing but strategic silk scarves and rose petals",
      "Sheer robe partially open with artistic draping"
    ],
    defaultHairStyles: {
      color: "Dark brown with honey highlights",
      styles: ["Tousled bedroom waves", "Hair spread dramatically", "Messy artistic flow"]
    },
    defaultNailArt: ["Nude pink stiletto", "Pearl shimmer", "French tips with gold accent"],
    defaultLighting: ["Multiple candle sources creating Rembrandt lighting", "Golden hour through sheer curtains", "Chiaroscuro with selective focus"],
    defaultMakeup: "Dewy skin with golden highlights, nude glossy lips, smoky bedroom eyes",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Delicate gold body chain", "Anklet", "Multiple subtle rings"]
  },
  {
    modelName: "Balcony Moonlight Muse (Golden-Bronze) 36-26-38",
    modelValue: "Indian Instagram influencer (height 5'7\") expert in moonlit balcony photography. Curvaceous figure (bust 36\", waist 26\", hips 38\") with luminescent golden-bronze skin. Creates cinematic tension with city lights backdrop.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Shadow Dance: Standing against wall, three-quarters turn, creating dynamic shadows",
      "Moonlit Silhouette: Backlit by window, arms raised in graceful arc",
      "Urban goddess leaning on balcony rail with city bokeh"
    ],
    defaultWardrobe: [
      "Gossamer midnight blue robe with silver threads",
      "Flowing sheer curtain wrapped artistically",
      "Delicate lingerie with moonlight transparency"
    ],
    defaultHairStyles: {
      color: "Dark brown with subtle highlights",
      styles: ["Wind-blown waves", "Loose romantic updo", "Cascading over shoulder"]
    },
    defaultNailArt: ["Midnight blue with silver tips", "Galaxy nail art", "Chrome finish"],
    defaultLighting: ["Natural moonlight with warm tungsten spill", "City lights bokeh", "Blue-silver contrast"],
    defaultMakeup: "Luminous skin with silver highlights, smoky eyes, nude glossy lips",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Delicate silver jewelry", "Moon pendant necklace", "Minimal earrings"]
  },
  {
    modelName: "Private Chamber Poetess (Golden-Bronze) 36-26-38",
    modelValue: "Sophisticated Indian model (height 5'7\") channeling Pre-Raphaelite beauty. Classic measurements (bust 36\", waist 26\", hips 38\") with warm golden-bronze complexion.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Silk Cascade: Seated on bed edge, leaning back, silk draped artistically",
      "Velvet Dreams: Kneeling on plush surface, hands through hair, arched back",
      "Victorian repose among velvet cushions and antique books"
    ],
    defaultWardrobe: [
      "Vintage burgundy negligee with black lace overlay",
      "Corset-style bodice with flowing skirt",
      "Victorian-inspired intimate apparel"
    ],
    defaultHairStyles: {
      color: "Rich dark brown",
      styles: ["Pre-Raphaelite waves", "Romantic Gibson girl updo", "Loose Victorian curls"]
    },
    defaultNailArt: ["Deep burgundy", "Victorian lace pattern", "Pearl accents"],
    defaultLighting: ["Single ornate lamp with dramatic side lighting", "Candlelit ambiance", "Painterly window light"],
    defaultMakeup: "Porcelain skin, rosy cheeks, deep berry lips, romantic eyes",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Pearl necklace", "Vintage cameo", "Antique rings"]
  },
  {
    modelName: "Library Midnight Scholar (Golden-Bronze) 36-26-38",
    modelValue: "Indian Instagram model (height 5'7\") embodying intellectual seduction. Perfect proportions (bust 36\", waist 26\", hips 38\") with radiant golden-bronze skin.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Reading while reclining, oversized shirt falling off shoulder",
      "Sitting cross-legged among books, contemplative gaze",
      "Standing between bookshelves, reaching for high shelf"
    ],
    defaultWardrobe: [
      "Unbuttoned white oxford shirt, nothing else",
      "Oversized sweater falling off shoulder",
      "Academic blazer with intimate twist"
    ],
    defaultHairStyles: {
      color: "Dark brown with natural highlights",
      styles: ["Messy scholarly bun", "Tousled intellectual waves", "Hair tucked behind ear while reading"]
    },
    defaultNailArt: ["Natural nude", "Clear gloss", "Subtle French"],
    defaultLighting: ["Reading lamp pools with moonlight", "Dusty light beams through tall windows", "Warm library ambiance"],
    defaultMakeup: "Natural intellectual beauty with subtle enhancement",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Reading glasses", "Simple gold chain", "Vintage watch"]
  },
  {
    modelName: "Alley Noir Siren (Golden-Bronze) 36-26-38",
    modelValue: "Urban Indian influencer (height 5'7\") mastering film noir aesthetics. Hourglass figure (bust 36\", waist 26\", hips 38\") with golden-bronze skin catching neon reflections.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Leaning against brick wall under neon sign",
      "Smoking pose with unlit cigarette, mysterious glance",
      "Walking away, looking over shoulder"
    ],
    defaultWardrobe: [
      "Leather jacket over burgundy lace lingerie",
      "Little black dress with dangerous edge",
      "Biker aesthetic with feminine contrast"
    ],
    defaultHairStyles: {
      color: "Jet black with blue undertones",
      styles: ["Sleek noir waves", "Messy rebel texture", "Wet-look slicked back"]
    },
    defaultNailArt: ["Black chrome", "Blood red stiletto", "Dark burgundy"],
    defaultLighting: ["Neon signs with wet pavement reflections", "Street lamp drama", "High contrast urban lighting"],
    defaultMakeup: "Smoky eyes, pale nude lips, defined cheekbones, film noir aesthetic",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Leather choker", "Multiple silver rings", "Chain necklace"]
  },
  {
    modelName: "Wooden Cabin Recluse (Golden-Bronze) 36-26-38",
    modelValue: "Indian Instagram model (height 5'7\") specializing in cozy intimate settings. Natural curves (bust 36\", waist 26\", hips 38\") with warm golden-bronze glow enhanced by firelight.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Curled up by fireplace on fur rug",
      "Standing by window watching snowfall, wrapped in blanket",
      "Lounging on wooden bench with wine glass"
    ],
    defaultWardrobe: [
      "Oversized cream knit sweater, bare legs",
      "Plaid flannel shirt unbuttoned",
      "Cozy cashmere wrap"
    ],
    defaultHairStyles: {
      color: "Warm brown with caramel highlights",
      styles: ["Loose cozy waves", "Messy bun with tendrils", "Natural tousled texture"]
    },
    defaultNailArt: ["Natural nude", "Warm terracotta", "Cozy beige"],
    defaultLighting: ["Fireplace glow with candle accents", "Warm tungsten cabin lights", "Natural winter light through windows"],
    defaultMakeup: "Natural glow with warm tones, rosy cheeks from cold, nude lips",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Chunky knit socks", "Simple gold jewelry", "Wooden beads"]
  },
  {
    modelName: "Rooftop Sunrise Goddess (Golden-Bronze) 36-26-38",
    modelValue: "Indian wellness influencer (height 5'7\") capturing dawn's first light. Yoga-toned figure (bust 36\", waist 26\", hips 38\") with golden-bronze skin creating perfect rim lighting.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Warrior pose silhouetted against sunrise",
      "Meditation position with flowing fabric",
      "Graceful stretch with arms reaching skyward"
    ],
    defaultWardrobe: [
      "Sheer yoga wrap with nude undertones",
      "Flowing goddess dress catching light",
      "Athletic wear with artistic draping"
    ],
    defaultHairStyles: {
      color: "Sun-kissed brown",
      styles: ["High messy bun", "Flowing in morning breeze", "Braided crown"]
    },
    defaultNailArt: ["Natural pink", "Gold shimmer", "Sunrise gradient"],
    defaultLighting: ["Golden sunrise backlight", "Rim lighting creating halo", "Blue hour ambiance"],
    defaultMakeup: "Dewy fresh skin, golden highlights, natural beauty enhanced",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Yoga mala beads", "Minimal gold jewelry", "Anklets"]
  },
  {
    modelName: "Vintage Bathroom Venus (Golden-Bronze) 36-26-38",
    modelValue: "Classic beauty Indian model (height 5'7\") recreating Degas-inspired bathing scenes. Statuesque measurements (bust 36\", waist 26\", hips 38\") with wet golden-bronze skin creating artistic reflections.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Reclining in clawfoot tub with rose petals",
      "Stepping out of bath with vintage robe",
      "Applying perfume at vanity mirror"
    ],
    defaultWardrobe: [
      "Natural coverage from bath foam and water",
      "Vintage silk robe falling open",
      "Towel wrap with artistic arrangement"
    ],
    defaultHairStyles: {
      color: "Wet dark brown",
      styles: ["Wet hair swept up", "Damp waves over shoulder", "Pinned up with tendrils"]
    },
    defaultNailArt: ["Classic red", "Pearl white", "Rose gold"],
    defaultLighting: ["Soft candles around tub", "Window light through steam", "Vintage vanity lighting"],
    defaultMakeup: "Fresh dewy skin, flushed cheeks, nude pink lips, wet look",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Pearl earrings", "Vintage perfume bottle", "Gold chain"]
  },
  {
    modelName: "Artist Studio Muse (Golden-Bronze) 36-26-38",
    modelValue: "Bohemian Indian model (height 5'7\") embodying creative energy. Artist's dream figure (bust 36\", waist 26\", hips 38\") with golden-bronze skin contrasting paint splatters.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Posing for invisible artist, classical stance",
      "Painting at easel, shirt slipping off shoulder",
      "Lying among canvases and sketches"
    ],
    defaultWardrobe: [
      "Paint-splattered men's white shirt",
      "Artist smock with nothing underneath",
      "Bohemian wrap with paint marks"
    ],
    defaultHairStyles: {
      color: "Natural brown with sun streaks",
      styles: ["Messy artist bun with paintbrush", "Wild creative waves", "Half-up bohemian style"]
    },
    defaultNailArt: ["Paint-stained natural", "Colorful artistic design", "Bare natural"],
    defaultLighting: ["North light window", "Multiple work lights", "Dramatic artist studio lighting"],
    defaultMakeup: "Natural beauty with paint smudges, raw authentic look",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Paint-covered apron strings", "Artistic jewelry", "Bohemian rings"]
  },
  {
    modelName: "Secret Garden Nymph (Golden-Bronze) 36-26-38",
    modelValue: "Mystical Indian influencer (height 5'7\") creating fairy-tale narratives. Nature-perfect curves (bust 36\", waist 26\", hips 38\") with golden-bronze skin luminous in moonlight.",
    measurements: {
      height: "5'7\"",
      bust: "36\"",
      waist: "26\"",
      hips: "38\""
    },
    defaultPoses: [
      "Dancing among hanging plants in conservatory",
      "Resting in silk hammock surrounded by flowers",
      "Kneeling by fountain with mystical gesture"
    ],
    defaultWardrobe: [
      "Botanical-printed sheer wrap",
      "Flower petals and strategic leaves",
      "Fairy-tale gossamer gown"
    ],
    defaultHairStyles: {
      color: "Dark brown with natural highlights",
      styles: ["Flower crown with loose waves", "Braided with flowers", "Wild nymph texture"]
    },
    defaultNailArt: ["Natural with flower art", "Green and gold", "Mystical designs"],
    defaultLighting: ["Moonlight through glass ceiling", "Fairy lights creating magic", "Filtered green light through leaves"],
    defaultMakeup: "Ethereal glow, natural flush, dewy skin, fairy-tale beauty",
    ageRange: "22-26",
    skinTone: "golden-bronze",
    accessories: ["Flower crown", "Vine anklets", "Natural crystal pendant"]
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