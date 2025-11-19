/**
 * Artistic Midnight Models Collection
 * Fine-art photography with sensual midnight aesthetics
 * Masterclass cinematographic techniques for Instagram models
 */

export interface ArtisticPose {
  name: string;
  description: string;
  intimacyLevel: number;
  bodyLanguage: string;
  eyeContact: string;
  mood: string;
  artisticReference?: string;
}

export interface CinematicSetting {
  location: string;
  atmosphere: string;
  timeOfDay: string;
  lighting: string;
  colorGrading: string;
  props?: string[];
  textureDetails: string;
}

export interface MidnightModelVariant {
  id: string;
  name: string;
  baseModel: string;
  setting: CinematicSetting;
  poses: ArtisticPose[];
  wardrobe: {
    style: string;
    details: string;
    coverage: string;
    texture: string;
    color: string;
  };
  photography: {
    technique: string;
    lens: string;
    aperture: string;
    iso: string;
    shutter: string;
    focusPoint: string;
  };
  artisticDirection: string;
  moodKeywords: string[];
}

// Enhanced Intimate Poses for Levels 9-10
export const INTIMATE_ARTISTIC_POSES: ArtisticPose[] = [
  {
    name: "Midnight Reverie",
    description: "Reclining with arched back on silk sheets, one arm draped overhead, fingers delicately tracing collarbone, legs elegantly intertwined",
    intimacyLevel: 9,
    bodyLanguage: "Languid yet tension-filled, creating elegant S-curves with the body",
    eyeContact: "Half-lidded gaze directly at viewer, mysterious and inviting",
    mood: "Dreamlike sensuality with artistic vulnerability",
    artisticReference: "Inspired by Helmut Newton's iconic bedroom photography"
  },
  {
    name: "Shadow Dance",
    description: "Standing against textured wall, body turned three-quarters, one shoulder bare, hand pressed against wall creating dynamic shadows",
    intimacyLevel: 9,
    bodyLanguage: "Sculptural pose emphasizing natural curves through light and shadow play",
    eyeContact: "Over-shoulder glance with penetrating intensity",
    mood: "Film noir sensuality with artistic edge",
    artisticReference: "Ellen von Unwerth's provocative fashion photography"
  },
  {
    name: "Silk Cascade",
    description: "Seated on bed edge, leaning back on hands, silk fabric draped artistically, one leg extended, creating diagonal composition",
    intimacyLevel: 10,
    bodyLanguage: "Confident yet vulnerable, emphasizing length and grace",
    eyeContact: "Direct, unflinching connection with camera",
    mood: "Raw elegance with understated power",
    artisticReference: "Mario Testino's intimate celebrity portraits"
  },
  {
    name: "Golden Hour Embrace",
    description: "Lying on side, knees drawn up, arms wrapped around self, bathed in warm window light filtering through sheer curtains",
    intimacyLevel: 9,
    bodyLanguage: "Self-embracing pose suggesting both protection and revelation",
    eyeContact: "Soft, contemplative gaze past camera",
    mood: "Vulnerable intimacy with poetic grace",
    artisticReference: "Annie Leibovitz's artistic nude studies"
  },
  {
    name: "Velvet Dreams",
    description: "Kneeling on plush surface, back arched, hands running through hair, creating flowing movement and dynamic silhouette",
    intimacyLevel: 10,
    bodyLanguage: "Fluid motion captured in stillness, emphasizing natural grace",
    eyeContact: "Eyes closed in moment of private ecstasy",
    mood: "Sensual abandon with artistic restraint",
    artisticReference: "Peter Lindbergh's emotional fashion photography"
  },
  {
    name: "Mirror's Edge",
    description: "Reflected pose with hand touching mirror surface, creating dual perspective, playing with reality and reflection",
    intimacyLevel: 9,
    bodyLanguage: "Interactive pose with environment, creating visual narrative",
    eyeContact: "Gazing at own reflection, creating introspective moment",
    mood: "Self-discovery with sensual undertones",
    artisticReference: "Francesca Woodman's conceptual self-portraits"
  },
  {
    name: "Moonlit Silhouette",
    description: "Standing by window, backlit creating rim lighting, sheer fabric creating ethereal glow, arms raised in graceful arc",
    intimacyLevel: 10,
    bodyLanguage: "Statuesque pose emphasizing form through strategic lighting",
    eyeContact: "Profile view with downcast eyes",
    mood: "Ethereal sensuality with artistic mystery",
    artisticReference: "Paolo Roversi's dreamlike fashion imagery"
  },
  {
    name: "Intimate Whisper",
    description: "Close-up composition, lying down, hair spread like halo, one hand near lips in hushing gesture, other draped across body",
    intimacyLevel: 10,
    bodyLanguage: "Minimal movement, maximum emotional impact through subtle gestures",
    eyeContact: "Intense direct gaze with slight smile",
    mood: "Secret-sharing intimacy with playful sensuality",
    artisticReference: "Mert & Marcus provocative beauty shots"
  }
];

// 10 New Artistic Instagram Model Variants
export const MIDNIGHT_ARTISTIC_MODELS: MidnightModelVariant[] = [
  {
    id: "midnight_floor_artist",
    name: "Midnight Floor Artist",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Polished wooden floor of artist loft",
      atmosphere: "Moody with scattered candles creating warm pools of light",
      timeOfDay: "2 AM - Deep night",
      lighting: "Multiple candle sources creating Rembrandt lighting, golden hour warmth",
      colorGrading: "Deep browns, amber highlights, shadow-rich contrast",
      props: ["Scattered rose petals", "Vintage books", "Wine glass", "Silk scarves"],
      textureDetails: "Reflective wood grain, soft fabric textures, skin glow from candlelight"
    },
    poses: [INTIMATE_ARTISTIC_POSES[0], INTIMATE_ARTISTIC_POSES[3], INTIMATE_ARTISTIC_POSES[7]],
    wardrobe: {
      style: "Minimalist silk slip",
      details: "Delicate lace trim, adjustable straps, thigh-length",
      coverage: "Strategic, artistic coverage",
      texture: "Liquid silk that catches light",
      color: "Champagne with pearl shimmer"
    },
    photography: {
      technique: "Chiaroscuro with selective focus",
      lens: "85mm f/1.2",
      aperture: "f/1.4 for dreamy bokeh",
      iso: "1600 for grain texture",
      shutter: "1/60s handheld for organic feel",
      focusPoint: "Eyes with gradual falloff"
    },
    artisticDirection: "Channel the intimacy of Nan Goldin's personal photography with the technical mastery of fashion editorials",
    moodKeywords: ["candlelit", "intimate", "golden", "shadow-play", "vulnerable", "artistic nude"]
  },
  {
    id: "balcony_moonlight_muse",
    name: "Balcony Moonlight Muse",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Private balcony overlooking city lights",
      atmosphere: "Cool moonlight mixing with warm interior glow",
      timeOfDay: "Midnight under full moon",
      lighting: "Natural moonlight as key, warm tungsten spill from interior",
      colorGrading: "Blue-silver moonlight, warm amber contrasts, deep blacks",
      props: ["Flowing sheer curtains", "Champagne flute", "Fairy lights"],
      textureDetails: "Wind-blown fabric, skin luminescence, architectural shadows"
    },
    poses: [INTIMATE_ARTISTIC_POSES[1], INTIMATE_ARTISTIC_POSES[6]],
    wardrobe: {
      style: "Gossamer robe partially open",
      details: "Floor-length with dramatic flow, delicate embroidery",
      coverage: "Artistic draping with strategic reveals",
      texture: "Weightless chiffon that moves with wind",
      color: "Midnight blue with silver threads"
    },
    photography: {
      technique: "Environmental portrait with city bokeh",
      lens: "35mm f/1.4",
      aperture: "f/2.0 for environmental context",
      iso: "3200 for available light",
      shutter: "1/125s to freeze fabric movement",
      focusPoint: "Face with city lights as bokeh"
    },
    artisticDirection: "Blend film noir aesthetics with contemporary fashion photography, creating cinematic tension",
    moodKeywords: ["moonlit", "mysterious", "urban romance", "ethereal", "windswept", "cinematic"]
  },
  {
    id: "private_chamber_poetess",
    name: "Private Chamber Poetess",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Victorian-style private reading room",
      atmosphere: "Intimate warmth with rich textures and deep shadows",
      timeOfDay: "Late evening, 11 PM",
      lighting: "Single ornate lamp creating dramatic side lighting",
      colorGrading: "Rich burgundy, deep emerald, gold accents",
      props: ["Antique books", "Velvet cushions", "Pearl necklace", "Fountain pen"],
      textureDetails: "Velvet upholstery, aged leather, soft skin contrast"
    },
    poses: [INTIMATE_ARTISTIC_POSES[2], INTIMATE_ARTISTIC_POSES[4]],
    wardrobe: {
      style: "Vintage-inspired negligee with modern cut",
      details: "Corset-style bodice, flowing skirt portion",
      coverage: "Romantic yet revealing",
      texture: "Satin with lace overlay",
      color: "Deep burgundy with black lace"
    },
    photography: {
      technique: "Painterly portrait style",
      lens: "50mm f/1.2",
      aperture: "f/1.8 for subject separation",
      iso: "800 for fine grain",
      shutter: "1/100s for sharpness",
      focusPoint: "Face with selective focus on details"
    },
    artisticDirection: "Create Pre-Raphaelite painting aesthetic with photographic precision",
    moodKeywords: ["literary", "sensual intellect", "vintage glamour", "mysterious", "sophisticated"]
  },
  {
    id: "library_midnight_scholar",
    name: "Library Midnight Scholar",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Ancient library after hours",
      atmosphere: "Dusty light beams, knowledge and sensuality merger",
      timeOfDay: "1 AM - Deep silence",
      lighting: "Reading lamp pools, moonlight through tall windows",
      colorGrading: "Sepia tones, deep shadows, warm highlights",
      props: ["Open manuscripts", "Reading glasses", "Leather-bound books", "Ink well"],
      textureDetails: "Aged paper, leather bindings, smooth skin contrast"
    },
    poses: [INTIMATE_ARTISTIC_POSES[5], INTIMATE_ARTISTIC_POSES[0]],
    wardrobe: {
      style: "Unbuttoned oxford shirt, nothing else",
      details: "Oversized fit, rolled sleeves, partially open",
      coverage: "Suggestive academic chic",
      texture: "Crisp cotton with natural wrinkles",
      color: "Classic white with shadows"
    },
    photography: {
      technique: "Documentary style with fashion edge",
      lens: "24mm f/1.4 for environment",
      aperture: "f/2.8 for depth",
      iso: "2000 for texture",
      shutter: "1/50s handheld",
      focusPoint: "Environmental with subject anchor"
    },
    artisticDirection: "Intellectual sensuality meets fashion editorial, channeling Sofia Coppola's visual style",
    moodKeywords: ["intellectual", "forbidden", "after-hours", "mysterious", "scholarly seduction"]
  },
  {
    id: "alley_noir_siren",
    name: "Alley Noir Siren",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Narrow urban alley with neon reflections",
      atmosphere: "Film noir meets modern urban photography",
      timeOfDay: "3 AM - City's darkest hour",
      lighting: "Neon signs, street lamp, wet pavement reflections",
      colorGrading: "High contrast, cyan-orange split, deep blacks",
      props: ["Vintage motorcycle", "Leather jacket", "Cigarette (unlit)", "Rain puddles"],
      textureDetails: "Wet surfaces, brick texture, leather, skin glow"
    },
    poses: [INTIMATE_ARTISTIC_POSES[1], INTIMATE_ARTISTIC_POSES[6]],
    wardrobe: {
      style: "Leather jacket over delicate lingerie",
      details: "Oversized jacket slipping off shoulder",
      coverage: "Tough exterior, vulnerable interior",
      texture: "Worn leather, delicate lace contrast",
      color: "Black leather, burgundy lace"
    },
    photography: {
      technique: "Street photography meets fashion",
      lens: "35mm f/1.4",
      aperture: "f/2.0 for environmental story",
      iso: "6400 for available light",
      shutter: "1/60s for slight motion",
      focusPoint: "Face with environmental context"
    },
    artisticDirection: "Wong Kar-wai cinematography meets high fashion editorial",
    moodKeywords: ["urban", "noir", "dangerous beauty", "neon-lit", "mysterious", "rebel"]
  },
  {
    id: "wooden_cabin_recluse",
    name: "Wooden Cabin Recluse",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Secluded mountain cabin, fireplace glow",
      atmosphere: "Intimate warmth against winter cold",
      timeOfDay: "Midnight snowfall",
      lighting: "Fireplace as key light, candles for fill",
      colorGrading: "Warm oranges, deep browns, cool window light",
      props: ["Bear fur rug", "Wine bottle", "Acoustic guitar", "Throw blankets"],
      textureDetails: "Wood grain, fur texture, skin warmth, fabric softness"
    },
    poses: [INTIMATE_ARTISTIC_POSES[3], INTIMATE_ARTISTIC_POSES[4], INTIMATE_ARTISTIC_POSES[7]],
    wardrobe: {
      style: "Oversized knit sweater, bare legs",
      details: "Off-shoulder drape, thigh-length",
      coverage: "Cozy yet suggestive",
      texture: "Chunky knit with natural stretch",
      color: "Cream with natural shadows"
    },
    photography: {
      technique: "Natural light portrait with fire glow",
      lens: "85mm f/1.4",
      aperture: "f/1.8 for intimacy",
      iso: "1600 for warmth",
      shutter: "1/100s for sharpness",
      focusPoint: "Eyes with fire reflections"
    },
    artisticDirection: "Terrence Malick's natural light philosophy meets intimate portraiture",
    moodKeywords: ["cozy", "fireside", "winter romance", "secluded", "warm", "natural"]
  },
  {
    id: "rooftop_sunrise_goddess",
    name: "Rooftop Sunrise Goddess",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Urban rooftop at golden hour",
      atmosphere: "First light breaking over cityscape",
      timeOfDay: "5:30 AM - Magic hour",
      lighting: "Golden sunrise as backlight, blue hour ambiance",
      colorGrading: "Gold-pink sunrise, purple-blue shadows",
      props: ["Yoga mat", "Flowing fabric", "Morning coffee", "Potted plants"],
      textureDetails: "Concrete texture, fabric flow, skin glow, urban landscape"
    },
    poses: [INTIMATE_ARTISTIC_POSES[6], INTIMATE_ARTISTIC_POSES[2]],
    wardrobe: {
      style: "Sheer yoga wrap",
      details: "Flowing, draped asymmetrically",
      coverage: "Artistic transparency with strategic layers",
      texture: "Gossamer fabric catching light",
      color: "Nude with gold shimmer"
    },
    photography: {
      technique: "Backlit portrait with rim lighting",
      lens: "135mm f/2.0",
      aperture: "f/2.8 for sharpness",
      iso: "400 for clean shadows",
      shutter: "1/500s for sun flare control",
      focusPoint: "Silhouette with rim light detail"
    },
    artisticDirection: "Yoga photography meets high fashion, channeling Richard Avedon's minimalism",
    moodKeywords: ["dawn", "ethereal", "urban goddess", "golden", "peaceful", "transcendent"]
  },
  {
    id: "vintage_bathroom_venus",
    name: "Vintage Bathroom Venus",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Clawfoot tub in vintage bathroom",
      atmosphere: "Steam, candles, and marble textures",
      timeOfDay: "11 PM bath ritual",
      lighting: "Candles around tub, soft overhead",
      colorGrading: "Creamy whites, soft pinks, golden highlights",
      props: ["Rose petals in water", "Champagne glass", "Vintage perfume bottles", "Silk robe"],
      textureDetails: "Water reflections, porcelain, marble, wet skin"
    },
    poses: [INTIMATE_ARTISTIC_POSES[0], INTIMATE_ARTISTIC_POSES[7]],
    wardrobe: {
      style: "Nothing but strategic foam and water",
      details: "Natural coverage from bath elements",
      coverage: "Artistic nude with environmental elements",
      texture: "Wet skin, foam, water droplets",
      color: "Natural skin tones with water highlights"
    },
    photography: {
      technique: "Classic beauty photography",
      lens: "50mm f/1.4",
      aperture: "f/2.0 for detail",
      iso: "1000 for candlelight",
      shutter: "1/125s for water movement",
      focusPoint: "Face with water droplets"
    },
    artisticDirection: "Degas' bathers meets modern beauty photography",
    moodKeywords: ["bathing", "classical", "venus", "intimate", "luxurious", "sensual"]
  },
  {
    id: "artist_studio_muse",
    name: "Artist Studio Muse",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Painter's studio with canvases",
      atmosphere: "Creative chaos, paint splashes, artistic energy",
      timeOfDay: "2 AM creative session",
      lighting: "North light window, work lights, candle accents",
      colorGrading: "Painterly colors, rich pigments, natural light",
      props: ["Paint brushes", "Canvas", "Paint-stained shirt", "Wine", "Sketches"],
      textureDetails: "Paint textures, canvas, wood, skin contrast"
    },
    poses: [INTIMATE_ARTISTIC_POSES[2], INTIMATE_ARTISTIC_POSES[5]],
    wardrobe: {
      style: "Paint-splattered men's shirt",
      details: "Oversized, unbuttoned, paint marks",
      coverage: "Artistic casualness",
      texture: "Soft cotton with paint texture",
      color: "White with colorful paint splatters"
    },
    photography: {
      technique: "Environmental portrait with artistic elements",
      lens: "35mm f/1.8",
      aperture: "f/2.8 for environment",
      iso: "1600 for mood",
      shutter: "1/60s for authenticity",
      focusPoint: "Subject within artistic environment"
    },
    artisticDirection: "Lucian Freud's raw honesty meets fashion photography",
    moodKeywords: ["artistic", "creative", "bohemian", "raw", "authentic", "muse"]
  },
  {
    id: "secret_garden_nymph",
    name: "Secret Garden Nymph",
    baseModel: "Instagram Bedroom Selfie Model",
    setting: {
      location: "Hidden garden conservatory at night",
      atmosphere: "Mystical with moonlight through glass",
      timeOfDay: "Midnight in full moon",
      lighting: "Moonlight through glass ceiling, fairy lights",
      colorGrading: "Green-blue moonlight, warm accent lights",
      props: ["Hanging plants", "Vintage fountain", "Flower crown", "Silk hammock"],
      textureDetails: "Leaves, water, glass reflections, natural textures"
    },
    poses: [INTIMATE_ARTISTIC_POSES[3], INTIMATE_ARTISTIC_POSES[6]],
    wardrobe: {
      style: "Botanical-printed sheer wrap",
      details: "Nature-inspired, flowing, organic",
      coverage: "One with nature aesthetic",
      texture: "Sheer with botanical prints",
      color: "Forest green with gold accents"
    },
    photography: {
      technique: "Fairy tale photography with fashion edge",
      lens: "85mm f/1.2",
      aperture: "f/1.4 for magic",
      iso: "2000 for available light",
      shutter: "1/125s for sharpness",
      focusPoint: "Face with botanical bokeh"
    },
    artisticDirection: "Tim Walker's fantasy meets sensual portraiture",
    moodKeywords: ["mystical", "garden", "nymph", "moonlit", "fantasy", "natural beauty"]
  }
];

// Masterclass Photography Techniques
export const MASTERCLASS_TECHNIQUES = {
  lightingSetups: {
    "Rembrandt": {
      description: "Single light source creating triangle of light on cheek",
      setup: "45-degree angle, slightly above eye level",
      mood: "Dramatic, classical, intimate",
      equipment: "Single key light, optional fill"
    },
    "Butterfly": {
      description: "Light directly above creating butterfly shadow under nose",
      setup: "Centered above, slightly forward",
      mood: "Glamorous, fashion, beauty",
      equipment: "Beauty dish or softbox above"
    },
    "Split": {
      description: "Light from side creating half-lit face",
      setup: "90-degree angle to subject",
      mood: "Mysterious, dramatic, film noir",
      equipment: "Single hard light source"
    },
    "Loop": {
      description: "Slight shadow of nose on cheek",
      setup: "30-45 degrees, slightly above",
      mood: "Natural, flattering, versatile",
      equipment: "Softbox or window light"
    },
    "Rim": {
      description: "Backlight creating outline glow",
      setup: "Behind subject, slightly above",
      mood: "Ethereal, dreamy, artistic",
      equipment: "Strong backlight, optional fill"
    }
  },

  colorGrading: {
    "Cinematic Orange-Teal": {
      highlights: "Warm orange push",
      shadows: "Cool teal/cyan",
      mood: "Hollywood, dramatic, modern",
      application: "Split-toning in post"
    },
    "Film Noir": {
      highlights: "Crisp whites",
      shadows: "Deep crushed blacks",
      mood: "Mysterious, vintage, dramatic",
      application: "High contrast, desaturated"
    },
    "Golden Hour": {
      highlights: "Honey gold",
      shadows: "Purple-pink",
      mood: "Romantic, warm, nostalgic",
      application: "Warm overall, lifted shadows"
    },
    "Moonlight": {
      highlights: "Cool silver",
      shadows: "Deep blue",
      mood: "Mysterious, cold, elegant",
      application: "Cool overall, preserved highlights"
    }
  },

  compositionRules: {
    "Golden Ratio": "1.618 proportional placement for natural harmony",
    "Leading Lines": "Use architectural elements to guide eye to subject",
    "Negative Space": "Emphasize subject through minimalist surroundings",
    "Frame Within Frame": "Use environmental elements to create depth",
    "Diagonal Method": "Create dynamic tension through diagonal elements",
    "Symmetry Break": "Perfect symmetry with single breaking element"
  }
};

// Function to generate complete artistic prompt
export function generateArtisticMidnightPrompt(
  model: MidnightModelVariant,
  pose: ArtisticPose,
  technique: keyof typeof MASTERCLASS_TECHNIQUES.lightingSetups
): string {
  const lighting = MASTERCLASS_TECHNIQUES.lightingSetups[technique];

  return `Masterclass fine-art photography: ${model.artisticDirection}

Model: Stunning Indian Instagram influencer, 36-26-38 measurements, 5'7" height, golden-bronze complexion with radiant skin

Setting: ${model.setting.location}
Atmosphere: ${model.setting.atmosphere}
Time: ${model.setting.timeOfDay}

Pose: ${pose.name} - ${pose.description}
Body Language: ${pose.bodyLanguage}
Eye Contact: ${pose.eyeContact}
Intimacy Level: ${pose.intimacyLevel}/10
Mood: ${pose.mood}

Wardrobe: ${model.wardrobe.style}
Details: ${model.wardrobe.details}
Coverage: ${model.wardrobe.coverage}
Texture: ${model.wardrobe.texture}
Color: ${model.wardrobe.color}

Lighting Technique: ${technique} lighting - ${lighting.description}
Setup: ${lighting.setup}
Lighting Mood: ${lighting.mood}

Photography Specifications:
- Technique: ${model.photography.technique}
- Lens: ${model.photography.lens}
- Aperture: ${model.photography.aperture}
- ISO: ${model.photography.iso}
- Shutter: ${model.photography.shutter}
- Focus: ${model.photography.focusPoint}

Color Grading: ${model.setting.colorGrading}
Texture Details: ${model.setting.textureDetails}

Artistic Keywords: ${model.moodKeywords.join(", ")}

${pose.artisticReference ? `Inspiration: ${pose.artisticReference}` : ""}

Technical Quality: 8K resolution, medium format quality, professional retouching, cinematic color grade, fine art print quality`;
}

// Integration helper for main modes
export function getArtisticModelPresets() {
  return MIDNIGHT_ARTISTIC_MODELS.map(model => ({
    id: model.id,
    name: model.name,
    category: "Artistic Midnight Collection",
    generatePrompt: (poseIndex: number = 0, lightingTechnique: keyof typeof MASTERCLASS_TECHNIQUES.lightingSetups = "Rembrandt") => {
      const pose = model.poses[poseIndex] || model.poses[0];
      return generateArtisticMidnightPrompt(model, pose, lightingTechnique);
    },
    poses: model.poses,
    settings: model.setting,
    wardrobe: model.wardrobe,
    photography: model.photography
  }));
}

// Export for Imagen Gallery Integration
export function getImagenArtisticPresets() {
  return MIDNIGHT_ARTISTIC_MODELS.reduce((acc, model) => {
    model.poses.forEach((pose, index) => {
      Object.keys(MASTERCLASS_TECHNIQUES.lightingSetups).forEach(lighting => {
        acc.push({
          id: `${model.id}_${index}_${lighting}`,
          title: `${model.name} - ${pose.name} (${lighting})`,
          prompt: generateArtisticMidnightPrompt(
            model,
            pose,
            lighting as keyof typeof MASTERCLASS_TECHNIQUES.lightingSetups
          ),
          category: "Artistic Midnight",
          tags: [...model.moodKeywords, lighting.toLowerCase(), `intimacy-${pose.intimacyLevel}`],
          thumbnail: `artistic_${model.id}_thumb.jpg`
        });
      });
    });
    return acc;
  }, [] as any[]);
}

// Moodboard Generator for Vera Mode
export function generateArtisticMoodboard(theme: string) {
  const relevantModels = MIDNIGHT_ARTISTIC_MODELS.filter(model =>
    model.moodKeywords.some(keyword => keyword.includes(theme.toLowerCase()))
  );

  return {
    theme: `Artistic Midnight: ${theme}`,
    models: relevantModels,
    colorPalette: extractColorPalette(relevantModels),
    techniques: MASTERCLASS_TECHNIQUES,
    poses: INTIMATE_ARTISTIC_POSES.filter(pose =>
      pose.mood.toLowerCase().includes(theme.toLowerCase()) ||
      pose.intimacyLevel >= 9
    ),
    description: `Fine-art photography collection exploring ${theme} through
                  masterclass techniques and intimate artistic expression.
                  Each image crafted to invoke emotional response and artistic appreciation.`
  };
}

function extractColorPalette(models: MidnightModelVariant[]) {
  const colors = new Set<string>();
  models.forEach(model => {
    const grading = model.setting.colorGrading.split(",");
    grading.forEach(color => colors.add(color.trim()));
  });
  return Array.from(colors);
}

export default {
  INTIMATE_ARTISTIC_POSES,
  MIDNIGHT_ARTISTIC_MODELS,
  MASTERCLASS_TECHNIQUES,
  generateArtisticMidnightPrompt,
  getArtisticModelPresets,
  getImagenArtisticPresets,
  generateArtisticMoodboard
};