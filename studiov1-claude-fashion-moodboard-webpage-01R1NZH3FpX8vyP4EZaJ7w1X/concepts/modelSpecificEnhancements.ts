/**
 * MODEL-SPECIFIC ENHANCEMENT SYSTEM
 *
 * Maps each Indian model variant to custom presets for hair, poses, wardrobe,
 * and other attributes that complement their unique characteristics.
 */

import type { Subject, PromptData } from '../types';

export interface ModelEnhancement {
  modelName: string;
  hairOptions: HairOption[];
  poseOptions: PoseOption[];
  wardrobeOptions: WardrobeOption[];
  lightingOptions: LightingOption[];
  skinFinish: string;
  nailArt: string[];
  accessories: string[];
  makeupStyle: string;
}

interface HairOption {
  style: string;
  color: string;
  description: string;
}

interface PoseOption {
  name: string;
  description: string;
  mood: string;
}

interface WardrobeOption {
  name: string;
  description: string;
  style: string;
}

interface LightingOption {
  name: string;
  setup: string;
  mood: string;
}

export const modelEnhancements: ModelEnhancement[] = [
  {
    modelName: "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38",
    hairOptions: [
      { style: "Beach Waves", color: "dark brown with honey highlights", description: "loose glamorous beach waves" },
      { style: "High Ponytail", color: "jet black", description: "sleek high ponytail with face-framing strands" },
      { style: "Messy Bun", color: "dark brown", description: "effortless top knot with wispy tendrils" }
    ],
    poseOptions: [
      { name: "Selfie Pose", description: "One hand holding phone above, other hand touching hair, sultry expression", mood: "Confident, Flirty" },
      { name: "Mirror Shot", description: "Standing in front of mirror, back arched, looking over shoulder", mood: "Seductive, Playful" },
      { name: "Lounging Goddess", description: "Reclining on couch, one leg bent, hand on hip", mood: "Relaxed, Inviting" }
    ],
    wardrobeOptions: [
      { name: "Athleisure Chic", description: "High-waisted leggings with sports bra, showing toned midriff", style: "Casual Sexy" },
      { name: "Bodycon Dress", description: "Tight-fitting mini dress that hugs every curve", style: "Night Out" },
      { name: "Lingerie Set", description: "Lace bralette with matching high-waisted bottoms", style: "Intimate" }
    ],
    lightingOptions: [
      { name: "Ring Light Glow", setup: "Frontal ring light with soft fill", mood: "Instagram Perfect" },
      { name: "Golden Hour", setup: "Warm side light mimicking sunset", mood: "Natural Beauty" }
    ],
    skinFinish: "Dewy with highlight on cheekbones and collarbones",
    nailArt: ["Long stiletto in nude pink", "Chrome finish", "Ombre fade"],
    accessories: ["Gold hoops", "Delicate nose ring", "Ankle chain"],
    makeupStyle: "Full glam with winged liner and glossy lips"
  },

  {
    modelName: "College Fresher Influencer (Honey-Bronze) 34-25-36",
    hairOptions: [
      { style: "Natural Waves", color: "dark brown with caramel highlights", description: "soft natural waves with volume" },
      { style: "Half-Up Style", color: "dark brown", description: "half-up half-down with face-framing layers" },
      { style: "Braided Crown", color: "dark brown", description: "loose braided crown with flowing hair" }
    ],
    poseOptions: [
      { name: "Study Break", description: "Sitting cross-legged, books around, playful smile", mood: "Youthful, Energetic" },
      { name: "Campus Walk", description: "Walking pose, looking back at camera, natural smile", mood: "Fresh, Confident" },
      { name: "Dorm Room Casual", description: "On bed with laptop, relaxed and natural", mood: "Approachable, Real" }
    ],
    wardrobeOptions: [
      { name: "Crop Top & Jeans", description: "Fitted crop top with high-waisted jeans", style: "College Casual" },
      { name: "Summer Dress", description: "Flowy sundress with floral pattern", style: "Fresh & Feminine" },
      { name: "Oversized Hoodie", description: "Oversized college hoodie with shorts", style: "Cozy Cute" }
    ],
    lightingOptions: [
      { name: "Natural Window", setup: "Soft window light with natural shadows", mood: "Fresh & Real" },
      { name: "Campus Sunset", setup: "Warm backlight with soft fill", mood: "Youthful Energy" }
    ],
    skinFinish: "Natural glow with minimal makeup",
    nailArt: ["Short natural", "Pastel colors", "Simple designs"],
    accessories: ["Small studs", "Friendship bracelets", "Simple chain"],
    makeupStyle: "No-makeup makeup with glossy lips"
  },

  {
    modelName: "Bollywood Actress Fantasy (Porcelain-Bronze) 36-24-36",
    hairOptions: [
      { style: "Bollywood Waves", color: "jet black", description: "voluminous glamorous waves" },
      { style: "Classic Bun", color: "jet black", description: "elegant low bun with decorative pins" },
      { style: "Side Swept", color: "jet black", description: "dramatic side-swept Hollywood waves" }
    ],
    poseOptions: [
      { name: "Red Carpet", description: "Standing tall, one hand on hip, chin up, movie star presence", mood: "Glamorous, Confident" },
      { name: "Dramatic Recline", description: "Reclining on chaise, dramatic expression", mood: "Theatrical, Alluring" },
      { name: "Dance Pose", description: "Mid-movement dance pose with flowing fabric", mood: "Dynamic, Artistic" }
    ],
    wardrobeOptions: [
      { name: "Saree Glam", description: "Designer saree with modern draping", style: "Traditional Glamour" },
      { name: "Gown", description: "Floor-length evening gown with dramatic silhouette", style: "Red Carpet" },
      { name: "Lehenga", description: "Ornate lehenga with intricate embroidery", style: "Royal Elegance" }
    ],
    lightingOptions: [
      { name: "Studio Glamour", setup: "Three-point lighting with beauty dish", mood: "High Fashion" },
      { name: "Spotlight Drama", setup: "Single dramatic spotlight with rim light", mood: "Theatrical" }
    ],
    skinFinish: "Flawless with professional highlighting",
    nailArt: ["Classic red", "Gold accents", "Jeweled designs"],
    accessories: ["Statement earrings", "Maang tikka", "Bangles"],
    makeupStyle: "Full Bollywood glam with dramatic eyes"
  },

  {
    modelName: "Morning Routine Influencer (Golden-Honey) 35-26-37",
    hairOptions: [
      { style: "Messy Morning", color: "dark brown", description: "tousled bedhead texture" },
      { style: "Low Ponytail", color: "dark brown", description: "casual low ponytail" },
      { style: "Natural Flow", color: "dark brown", description: "air-dried natural texture" }
    ],
    poseOptions: [
      { name: "Morning Stretch", description: "Arms above head, natural stretch, genuine smile", mood: "Fresh, Natural" },
      { name: "Coffee Moment", description: "Holding mug, cozy and relaxed", mood: "Intimate, Real" },
      { name: "Window Gaze", description: "Looking out window, peaceful expression", mood: "Serene, Thoughtful" }
    ],
    wardrobeOptions: [
      { name: "Silk Robe", description: "Loosely tied silk robe", style: "Morning Luxury" },
      { name: "Oversized Tee", description: "Boyfriend's oversized t-shirt", style: "Casual Intimate" },
      { name: "Pajama Set", description: "Matching silk pajama set", style: "Comfortable Chic" }
    ],
    lightingOptions: [
      { name: "Morning Light", setup: "Soft natural morning light through window", mood: "Fresh Start" },
      { name: "Bathroom Glow", setup: "Soft vanity lighting", mood: "Getting Ready" }
    ],
    skinFinish: "Fresh natural glow, no makeup",
    nailArt: ["Natural bare", "Clear coat only", "Soft nude"],
    accessories: ["Minimal or none", "Simple studs", "Delicate chain"],
    makeupStyle: "Completely natural or minimal skincare glow"
  },

  {
    modelName: "Indian Cinematic Muse (Fair)",
    hairOptions: [
      { style: "Classic Waves", color: "dark brown", description: "old Hollywood glamour waves" },
      { style: "Sleek Straight", color: "jet black", description: "pin-straight with center part" },
      { style: "Artistic Updo", color: "dark brown", description: "sculptural updo with artistic elements" }
    ],
    poseOptions: [
      { name: "Cinematic Close-Up", description: "Face tilted, eyes connecting with camera, subtle expression", mood: "Emotional, Deep" },
      { name: "Profile Study", description: "Perfect profile shot, serene expression", mood: "Classical, Artistic" },
      { name: "Thoughtful Gaze", description: "Looking away from camera, lost in thought", mood: "Introspective, Moody" }
    ],
    wardrobeOptions: [
      { name: "Minimalist Black", description: "Simple black dress with clean lines", style: "Cinematic Elegance" },
      { name: "Artistic Draping", description: "Fabric draped artistically around form", style: "Fine Art" },
      { name: "Period Costume", description: "Vintage or period-appropriate attire", style: "Narrative Fashion" }
    ],
    lightingOptions: [
      { name: "Chiaroscuro", setup: "Dramatic light and shadow contrast", mood: "Cinematic Drama" },
      { name: "Soft Key", setup: "Single soft key light with subtle fill", mood: "Emotional Portrait" }
    ],
    skinFinish: "Luminous fair skin with subtle contouring",
    nailArt: ["Classic French", "Nude polish", "Minimalist design"],
    accessories: ["Pearl earrings", "Vintage brooch", "Delicate necklace"],
    makeupStyle: "Cinematic makeup emphasizing eyes and natural lips"
  },

  {
    modelName: "Indian Glamour Seductress (Dusky)",
    hairOptions: [
      { style: "Voluminous Curls", color: "jet black", description: "big, bouncy curls with volume" },
      { style: "Side Part Waves", color: "jet black", description: "deep side part with cascading waves" },
      { style: "Wet Look", color: "jet black", description: "slicked back wet-look style" }
    ],
    poseOptions: [
      { name: "Power Stance", description: "Standing with confidence, hands on hips, direct gaze", mood: "Dominant, Powerful" },
      { name: "Seductive Lean", description: "Leaning against wall, one leg bent, sultry expression", mood: "Alluring, Confident" },
      { name: "Floor Pose", description: "On floor, propped on hands, back arched", mood: "Sensual, Bold" }
    ],
    wardrobeOptions: [
      { name: "Bodysuit", description: "Form-fitting lace bodysuit", style: "Seductive Elegance" },
      { name: "Satin Slip", description: "Silk slip dress with lace details", style: "Bedroom Glamour" },
      { name: "Power Lingerie", description: "Structured lingerie with straps and hardware", style: "Dominant Feminine" }
    ],
    lightingOptions: [
      { name: "Moody Shadows", setup: "Low key lighting with deep shadows", mood: "Mysterious, Seductive" },
      { name: "Glamour Lighting", setup: "Beauty lighting with rim light", mood: "High Fashion" }
    ],
    skinFinish: "Glowing dusky skin with oil sheen",
    nailArt: ["Long red stilettos", "Black polish", "Gold designs"],
    accessories: ["Body chains", "Choker", "Ankle bracelet"],
    makeupStyle: "Smoky eyes with bold lips"
  },

  {
    modelName: "Indian Super-Seductress Artist (Dusky)",
    hairOptions: [
      { style: "Wild Curls", color: "jet black", description: "untamed natural curls" },
      { style: "Artistic Braids", color: "jet black", description: "intricate braided patterns" },
      { style: "Flowing Mane", color: "jet black with burgundy highlights", description: "long flowing hair with subtle color" }
    ],
    poseOptions: [
      { name: "Artistic Expression", description: "Dynamic pose showing movement and emotion", mood: "Expressive, Raw" },
      { name: "Classical Reference", description: "Pose inspired by classical art", mood: "Timeless, Sculptural" },
      { name: "Contemporary Dance", description: "Dance-inspired fluid movement", mood: "Dynamic, Graceful" }
    ],
    wardrobeOptions: [
      { name: "Artistic Minimal", description: "Minimal coverage with artistic elements", style: "Fine Art Nude" },
      { name: "Sheer Layers", description: "Multiple sheer fabric layers", style: "Ethereal Art" },
      { name: "Body Paint", description: "Artistic body paint as wardrobe", style: "Living Canvas" }
    ],
    lightingOptions: [
      { name: "Museum Quality", setup: "Gallery lighting with perfect balance", mood: "Fine Art" },
      { name: "Experimental", setup: "Creative lighting with colors or patterns", mood: "Avant-garde" }
    ],
    skinFinish: "Natural skin texture celebrated",
    nailArt: ["Artistic designs", "Metallic accents", "Natural length"],
    accessories: ["Artistic jewelry", "Body art", "Minimal adornment"],
    makeupStyle: "Editorial artistic makeup or completely natural"
  },

  {
    modelName: "Indian Fitness Athlete (Wheatish)",
    hairOptions: [
      { style: "High Ponytail", color: "dark brown", description: "sleek workout ponytail" },
      { style: "Braided Bun", color: "dark brown", description: "athletic braided bun" },
      { style: "Short Bob", color: "dark brown", description: "practical short athletic cut" }
    ],
    poseOptions: [
      { name: "Flex Pose", description: "Showing muscle definition, powerful stance", mood: "Strong, Confident" },
      { name: "Action Shot", description: "Mid-workout, dynamic movement", mood: "Energetic, Powerful" },
      { name: "Victory Pose", description: "Arms raised in triumph", mood: "Accomplished, Proud" }
    ],
    wardrobeOptions: [
      { name: "Sports Set", description: "Matching sports bra and shorts", style: "Athletic Performance" },
      { name: "Yoga Wear", description: "Form-fitting yoga pants with crop top", style: "Flexible Strength" },
      { name: "Competition Bikini", description: "Fitness competition style bikini", style: "Stage Ready" }
    ],
    lightingOptions: [
      { name: "Gym Lighting", setup: "Bright, even lighting showing definition", mood: "Energetic" },
      { name: "Outdoor Training", setup: "Natural sunlight for outdoor workout", mood: "Natural Power" }
    ],
    skinFinish: "Healthy glow with visible muscle definition",
    nailArt: ["Short natural", "Clear coat", "Simple colors"],
    accessories: ["Fitness tracker", "Sweatband", "Simple studs"],
    makeupStyle: "Waterproof minimal makeup"
  },

  {
    modelName: "Indian High-Fashion Mannequin (Olive)",
    hairOptions: [
      { style: "Severe Bun", color: "jet black", description: "tight, architectural bun" },
      { style: "Razor Bob", color: "jet black", description: "sharp geometric bob" },
      { style: "Slicked Back", color: "jet black", description: "completely slicked back" }
    ],
    poseOptions: [
      { name: "Editorial Stance", description: "Angular pose with sharp lines", mood: "Avant-garde, Aloof" },
      { name: "Runway Walk", description: "Mid-stride on runway", mood: "Professional, Fierce" },
      { name: "Geometric Pose", description: "Creating shapes with body", mood: "Artistic, Modern" }
    ],
    wardrobeOptions: [
      { name: "Avant-garde", description: "Experimental high fashion pieces", style: "Runway Couture" },
      { name: "Minimalist", description: "Clean lines and simple silhouettes", style: "Modern Minimal" },
      { name: "Structural", description: "Architectural clothing with rigid forms", style: "Conceptual Fashion" }
    ],
    lightingOptions: [
      { name: "Runway Spots", setup: "Multiple spotlights from above", mood: "Fashion Show" },
      { name: "Editorial Flash", setup: "Direct flash for high contrast", mood: "Magazine Editorial" }
    ],
    skinFinish: "Matte, poreless perfection",
    nailArt: ["Geometric designs", "Negative space", "Monochrome"],
    accessories: ["Statement pieces", "Architectural jewelry", "None"],
    makeupStyle: "Editorial bold or completely minimal"
  },

  {
    modelName: "Indian Femme Fatale (Dusky)",
    hairOptions: [
      { style: "Film Noir Waves", color: "jet black", description: "vintage 1940s waves" },
      { style: "Sharp Bob", color: "jet black", description: "sharp angled bob" },
      { style: "Victory Rolls", color: "jet black", description: "retro victory roll style" }
    ],
    poseOptions: [
      { name: "Mystery Pose", description: "Partially hidden in shadows, enigmatic expression", mood: "Mysterious, Dangerous" },
      { name: "Smoking Gun", description: "Classic noir pose with prop", mood: "Film Noir" },
      { name: "Venetian Blind", description: "Light through blinds creating patterns", mood: "Classic Cinema" }
    ],
    wardrobeOptions: [
      { name: "Noir Dress", description: "Classic black dress with vintage cut", style: "1940s Glamour" },
      { name: "Trench Coat", description: "Open trench coat over lingerie", style: "Detective Noir" },
      { name: "Pencil Skirt", description: "High-waisted pencil skirt with blouse", style: "Vintage Secretary" }
    ],
    lightingOptions: [
      { name: "Film Noir", setup: "High contrast with venetian blind shadows", mood: "Mysterious" },
      { name: "Single Source", setup: "One harsh light creating deep shadows", mood: "Dramatic" }
    ],
    skinFinish: "Matte with strong contouring",
    nailArt: ["Deep red", "Black", "Classic French"],
    accessories: ["Pearl necklace", "Vintage brooch", "Cigarette holder"],
    makeupStyle: "Classic red lips with winged liner"
  },

  {
    modelName: "Indian Bombshell Diva (Fair)",
    hairOptions: [
      { style: "Big Hair", color: "jet black", description: "voluminous teased hair" },
      { style: "Hollywood Curls", color: "dark brown", description: "perfect spiral curls" },
      { style: "Bouffant", color: "jet black", description: "classic bouffant style" }
    ],
    poseOptions: [
      { name: "Diva Pose", description: "Dramatic pose with arms extended", mood: "Theatrical, Grand" },
      { name: "Marilyn Moment", description: "Classic pin-up inspired pose", mood: "Playful, Flirty" },
      { name: "Stage Presence", description: "As if performing on stage", mood: "Star Quality" }
    ],
    wardrobeOptions: [
      { name: "Sequin Gown", description: "Full glamour sequined evening gown", style: "Vegas Showgirl" },
      { name: "Fur Coat", description: "Faux fur coat over glamorous lingerie", style: "Old Hollywood" },
      { name: "Cabaret", description: "Corset with feathers and rhinestones", style: "Burlesque" }
    ],
    lightingOptions: [
      { name: "Stage Lights", setup: "Multiple colored stage lights", mood: "Showtime" },
      { name: "Soft Focus", setup: "Diffused glamour lighting", mood: "Classic Hollywood" }
    ],
    skinFinish: "Radiant with shimmer highlights",
    nailArt: ["Rhinestone designs", "Glitter polish", "Extra long"],
    accessories: ["Diamond jewelry", "Tiara", "Feather boa"],
    makeupStyle: "Full glam with false lashes and glitter"
  },

  {
    modelName: "Indian Natural Allure (Wheatish)",
    hairOptions: [
      { style: "Loose Waves", color: "dark brown", description: "soft, touchable waves" },
      { style: "Side Braid", color: "dark brown", description: "loose side braid" },
      { style: "Natural Texture", color: "dark brown", description: "embracing natural hair texture" }
    ],
    poseOptions: [
      { name: "Girl Next Door", description: "Casual lean against wall, friendly smile", mood: "Approachable, Warm" },
      { name: "Garden Pose", description: "Among flowers or nature", mood: "Natural, Fresh" },
      { name: "Candid Laugh", description: "Natural laughing moment", mood: "Genuine, Happy" }
    ],
    wardrobeOptions: [
      { name: "Cotton Dress", description: "Simple cotton sundress", style: "Everyday Pretty" },
      { name: "Jeans & Tee", description: "Well-fitted jeans with cute top", style: "Casual Cute" },
      { name: "Comfort Set", description: "Matching comfort wear set", style: "Cozy Chic" }
    ],
    lightingOptions: [
      { name: "Natural Light", setup: "Soft natural daylight", mood: "Fresh, Real" },
      { name: "Golden Hour", setup: "Warm sunset lighting", mood: "Romantic, Soft" }
    ],
    skinFinish: "Natural healthy glow",
    nailArt: ["Short natural", "Soft pink", "Simple French"],
    accessories: ["Simple jewelry", "Watch", "Hair clips"],
    makeupStyle: "Natural makeup enhancing features"
  }
];

/**
 * Get model-specific enhancements based on model name
 */
export function getModelEnhancements(modelName: string): ModelEnhancement | undefined {
  return modelEnhancements.find(m => m.modelName === modelName);
}

/**
 * Apply model-specific enhancements to a Subject
 */
export function applyModelEnhancements(
  subject: Partial<Subject>,
  modelName: string,
  options?: {
    hairIndex?: number;
    poseIndex?: number;
    wardrobeIndex?: number;
    lightingIndex?: number;
  }
): Partial<Subject> {
  const enhancement = getModelEnhancements(modelName);

  if (!enhancement) {
    return subject;
  }

  const hairOption = enhancement.hairOptions[options?.hairIndex ?? 0];
  const poseOption = enhancement.poseOptions[options?.poseIndex ?? 0];

  return {
    ...subject,
    hair_color: hairOption?.color ?? subject.hair_color,
    hair_style: hairOption?.description ?? subject.hair_style,
    pose: poseOption?.description ?? subject.pose,
    skin_finish: enhancement.skinFinish,
    nail_art: enhancement.nailArt[0] ?? subject.nail_art,
    hand_and_nail_details: `${enhancement.nailArt[0]}, ${enhancement.makeupStyle}`
  };
}

/**
 * Generate a complete prompt with model-specific enhancements
 */
export function generateModelEnhancedPrompt(
  basePrompt: Partial<PromptData>,
  modelName: string,
  enhancementOptions?: {
    hairIndex?: number;
    poseIndex?: number;
    wardrobeIndex?: number;
    lightingIndex?: number;
    randomize?: boolean;
  }
): Partial<PromptData> {
  const enhancement = getModelEnhancements(modelName);

  if (!enhancement) {
    return basePrompt;
  }

  // If randomize is true, select random options
  const options = enhancementOptions?.randomize ? {
    hairIndex: Math.floor(Math.random() * enhancement.hairOptions.length),
    poseIndex: Math.floor(Math.random() * enhancement.poseOptions.length),
    wardrobeIndex: Math.floor(Math.random() * enhancement.wardrobeOptions.length),
    lightingIndex: Math.floor(Math.random() * enhancement.lightingOptions.length)
  } : enhancementOptions ?? {};

  const hairOption = enhancement.hairOptions[options.hairIndex ?? 0];
  const poseOption = enhancement.poseOptions[options.poseIndex ?? 0];
  const wardrobeOption = enhancement.wardrobeOptions[options.wardrobeIndex ?? 0];
  const lightingOption = enhancement.lightingOptions[options.lightingIndex ?? 0];

  return {
    ...basePrompt,
    subject: {
      ...basePrompt.subject,
      variant: basePrompt.subject?.variant ?? '',
      hair_color: hairOption?.color ?? basePrompt.subject?.hair_color ?? '',
      hair_style: hairOption?.description ?? basePrompt.subject?.hair_style ?? '',
      pose: poseOption?.description ?? basePrompt.subject?.pose ?? '',
      skin_finish: enhancement.skinFinish,
      nail_art: enhancement.nailArt[0] ?? basePrompt.subject?.nail_art ?? '',
      hand_and_nail_details: `${enhancement.nailArt[0]}, ${enhancement.makeupStyle}`,
      tattoos: basePrompt.subject?.tattoos ?? 'none',
      piercings: basePrompt.subject?.piercings ?? 'none',
      body_art: basePrompt.subject?.body_art ?? 'none',
      high_heels: basePrompt.subject?.high_heels ?? ''
    } as Subject,
    wardrobe: wardrobeOption?.description ?? basePrompt.wardrobe,
    lighting: `${lightingOption?.setup} - ${lightingOption?.mood}` ?? basePrompt.lighting,
    style: `${wardrobeOption?.style} | ${enhancement.makeupStyle}` ?? basePrompt.style
  };
}

/**
 * Get all available options for a specific model
 */
export function getModelOptions(modelName: string) {
  const enhancement = getModelEnhancements(modelName);

  if (!enhancement) {
    return null;
  }

  return {
    hair: enhancement.hairOptions.map(h => `${h.style} - ${h.color}`),
    poses: enhancement.poseOptions.map(p => `${p.name}: ${p.mood}`),
    wardrobe: enhancement.wardrobeOptions.map(w => `${w.name}: ${w.style}`),
    lighting: enhancement.lightingOptions.map(l => `${l.name}: ${l.mood}`),
    nailArt: enhancement.nailArt,
    accessories: enhancement.accessories
  };
}