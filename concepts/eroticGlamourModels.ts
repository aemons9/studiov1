/**
 * EROTIC GLAMOUR MODELS - Level 10 Intimacy Collection
 *
 * 5 specialized Indian glamour models with distinct emphasis and style
 * Each with personal photographer (10/10 intimacy), wardrobe fleet, pose gallery, environments
 * Optimized for both Flux and Imagen 4 generation
 */

import type { PromptData } from '../types';

// ============================================================================
// PERSONAL PHOTOGRAPHERS (10/10 Intimacy)
// ============================================================================

export const PHOTOGRAPHERS = {
  REVEAL_SPECIALIST: {
    name: 'Dante Révélation',
    specialty: 'Upper body reveal artistry and décolletage emphasis',
    style: 'Intimate artistic revelation with sensual sophistication',
    intimacy: 10,
    lightingSignature: 'Soft directional lighting emphasizing upper form contours',
    cameraPreference: '85mm f/1.4 for intimate upper body focus',
    compositionStyle: 'Close intimate framing celebrating upper feminine curves',
    intimacyApproach: 'Collaborative artistic intimacy with trust-based vulnerability',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  CURVES_MAESTRO: {
    name: 'Lorenzo Curvas',
    specialty: 'Lower body curves and hip emphasis mastery',
    style: 'Sculptural form celebration with curve worship',
    intimacy: 10,
    lightingSignature: 'Dramatic side lighting accentuating hip and thigh curves',
    cameraPreference: '70mm f/2.0 for full lower body sculptural detail',
    compositionStyle: 'Dynamic angles emphasizing hips, thighs, and posterior form',
    intimacyApproach: 'Empowering confidence through curve celebration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  SENSUAL_VISIONARY: {
    name: 'Rafael Sensualité',
    specialty: 'Overall bold physique and complete form celebration',
    style: 'Holistic sensual artistry with balanced full-body glamour',
    intimacy: 10,
    lightingSignature: 'Balanced lighting celebrating entire feminine form',
    cameraPreference: '50mm f/1.8 for natural full-body perspective',
    compositionStyle: 'Balanced full-figure compositions with bold sensuality',
    intimacyApproach: 'Complete trust-based artistic collaboration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  CINEMATIC_AUTEUR: {
    name: 'Marcello Eros',
    specialty: 'Erotic-art film and narrative role-play perfectionist',
    style: 'Cinematic erotic artistry with film noir sophistication',
    intimacy: 10,
    lightingSignature: 'Dramatic cinematic lighting with chiaroscuro technique',
    cameraPreference: '35mm f/2.0 for cinematic environmental storytelling',
    compositionStyle: 'Narrative-driven compositions with film-quality framing',
    intimacyApproach: 'Method-based intimate performance direction',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  ATHLETIC_ARTISAN: {
    name: 'Santiago Athléa',
    specialty: 'Natural glamour with athletic curves and fitness aesthetics',
    style: 'Athletic elegance with natural curved glamour',
    intimacy: 10,
    lightingSignature: 'Natural athletic lighting emphasizing muscle definition and curves',
    cameraPreference: '70mm f/2.8 for athletic form clarity',
    compositionStyle: 'Dynamic athletic poses celebrating curved fitness',
    intimacyApproach: 'Empowering confidence through athletic sensuality',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  }
};

// ============================================================================
// MODEL 1: UPPER BODY REVEAL EMPHASIS
// ============================================================================

export const MODEL_UPPER_REVEAL = {
  id: 'erotic-model-001',
  name: 'Aisha Décolletage',
  category: 'Upper Body Reveal Specialist',
  emphasis: 'Décolletage, bust, shoulders, upper curves',
  personalPhotographer: PHOTOGRAPHERS.REVEAL_SPECIALIST,

  physicalTraits: {
    height: '5\'10"',
    figure: 'Voluptuous upper-focused hourglass',
    bust: '40DD"',
    waist: '27"',
    hips: '38"',
    emphasis: 'Upper body curves with spectacular décolletage',
    skinTone: 'Warm honey complexion with golden undertones',
    features: 'Sultry bedroom eyes, full sensual lips, elegant neck and shoulders',
    fitness: 'Toned upper body with soft feminine curves',
    specialties: 'Upper body reveal artistry, shoulder work, neck elegance'
  },

  wardrobeCollection: [
    {
      id: 'upper-lace-001',
      name: 'Single Lace Thread Upper',
      description: 'Ultra-minimal single black lace thread creating geometric patterns across décolletage, framing breasts with artistic precision, delicate shoulder straps',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Minimalist art-nude lace',
      materials: 'Fine French lace thread, delicate patterns',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'upper-leather-001',
      name: 'Single Leather Thread Harness',
      description: 'Minimal black leather thread body harness emphasizing upper curves, strategic bands framing décolletage, shoulder statement',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Erotic-art leather minimal',
      materials: 'Supple black leather threads, silver hardware',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'upper-lingerie-001',
      name: 'Erotic-Art Single Thread Bralette',
      description: 'Architectural single thread bralette with minimal lace coverage, sheer mesh panels, provocative upper reveal design',
      coverage: 'minimal-revealing',
      intimacyLevel: 10,
      style: 'Erotic-art lingerie minimal',
      materials: 'Sheer mesh, single lace threads, minimal silk',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'upper-full-body',
      name: 'Full Body Upper Emphasis',
      description: 'Standing pose with torso twist emphasizing décolletage, hands behind head lifting chest, confident sensual gaze'
    },
    {
      id: 'upper-medium-shot',
      name: 'Medium Shot Upper Focus',
      description: 'Bust to mid-thigh framing, leaning forward with upper body emphasis, shoulder line creating elegant curves'
    },
    {
      id: 'upper-back-form',
      name: 'Back Form Upper Curves',
      description: 'Rear view with shoulder blades prominent, looking back over shoulder, upper back curves emphasized'
    },
    {
      id: 'upper-reclined',
      name: 'Reclined Upper Reveal',
      description: 'Reclined on surface with arched back, upper body elevated, décolletage fully revealed and emphasized'
    }
  ],

  environments: [
    {
      id: 'private-office',
      name: 'Private Secret Office',
      description: 'Luxurious private office with leather furniture, dramatic desk lighting, after-hours intimacy',
      atmosphere: 'Corporate seduction with midnight privacy',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Dramatic desk lamp and city lights creating intimate shadows',
      materialPalette: ['Leather executive chairs', 'Mahogany desk', 'Floor-to-ceiling windows', 'City night view']
    },
    {
      id: 'private-room',
      name: 'Private Intimate Room',
      description: 'Minimalist luxury bedroom with dramatic lighting, silk sheets, intimate midnight atmosphere',
      atmosphere: 'Ultimate privacy and sensual intimacy',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Soft bedside lighting with warm ambient glow',
      materialPalette: ['Silk sheets', 'Velvet drapes', 'Soft rugs', 'Minimal luxury furnishings']
    },
    {
      id: 'underground-garage',
      name: 'Underground Garage',
      description: 'Industrial underground parking with dramatic lighting, concrete textures, edgy urban atmosphere',
      atmosphere: 'Raw urban edge with dramatic contrasts',
      privacyLevel: 9,
      luxuryLevel: 6,
      lightingProfile: 'Harsh overhead lighting creating dramatic shadows and urban mood',
      materialPalette: ['Raw concrete', 'Metal surfaces', 'Industrial fixtures', 'Urban grit']
    },
    {
      id: 'minimalist-cabin',
      name: 'Minimalist Cabin',
      description: 'Remote cabin with floor-to-ceiling windows, natural wood, evening forest views, intimate isolation',
      atmosphere: 'Natural seduction with privacy and warmth',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Warm fireplace glow and evening twilight from windows',
      materialPalette: ['Natural wood', 'Stone fireplace', 'Glass windows', 'Warm textiles']
    }
  ]
};

// ============================================================================
// MODEL 2: LOWER BODY HIPS & CURVES FOCUS
// ============================================================================

export const MODEL_LOWER_CURVES = {
  id: 'erotic-model-002',
  name: 'Priya Curves',
  category: 'Lower Body Curves Specialist',
  emphasis: 'Hips, thighs, buttocks, leg lines',
  personalPhotographer: PHOTOGRAPHERS.CURVES_MAESTRO,

  physicalTraits: {
    height: '5\'8"',
    figure: 'Dramatically curved pear-shaped goddess',
    bust: '36C"',
    waist: '26"',
    hips: '46"',
    emphasis: 'Spectacular hip and thigh curves with prominent posterior',
    skinTone: 'Deep dusky complexion with rich warm tones',
    features: 'Expressive eyes, full lips, long elegant legs',
    fitness: 'Strong lower body with powerful curved muscles',
    specialties: 'Hip emphasis, thigh work, posterior celebration'
  },

  wardrobeCollection: [
    {
      id: 'lower-lace-001',
      name: 'Single Lace Thread Lower',
      description: 'Minimal single lace thread creating hip harness design, wrapping around hips and thighs with artistic precision, strategic posterior framing',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Minimalist art-nude lace',
      materials: 'Fine lace threads, delicate hip patterns',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'lower-leather-001',
      name: 'Single Leather Thread Hip Harness',
      description: 'Ultra-minimal black leather thread hip and thigh harness, strategic bands emphasizing curves, provocative posterior framing',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Erotic-art leather minimal',
      materials: 'Supple leather threads, metal hardware accents',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'lower-lingerie-001',
      name: 'Erotic-Art Single Thread Bottom',
      description: 'Architectural single thread minimal bottom with strategic lace placement, hip chains, ultra-revealing cut emphasizing curves',
      coverage: 'minimal-revealing',
      intimacyLevel: 10,
      style: 'Erotic-art lingerie minimal',
      materials: 'Sheer minimal fabric, lace threads, chain details',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'lower-full-body',
      name: 'Full Body Lower Emphasis',
      description: 'Standing with hip thrust, posterior emphasized, side profile showing full curve magnificence, confident stance'
    },
    {
      id: 'lower-medium-shot',
      name: 'Medium Shot Lower Focus',
      description: 'Hip to thigh framing, dynamic pose emphasizing curve lines, hand on hip accentuating shape'
    },
    {
      id: 'lower-back-form',
      name: 'Back Form Lower Curves',
      description: 'Posterior emphasis pose, looking back, spine curve leading to hip emphasis, dramatic lower body celebration'
    },
    {
      id: 'lower-reclined',
      name: 'Reclined Lower Reveal',
      description: 'Side reclined position, top leg raised, hip and thigh curves fully emphasized, sensual lower body focus'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments // Share same environments
};

// ============================================================================
// MODEL 3: OVERALL SENSUAL BOLD PHYSIQUE
// ============================================================================

export const MODEL_SENSUAL_BOLD = {
  id: 'erotic-model-003',
  name: 'Meera Sensualité',
  category: 'Overall Sensual Glamour Specialist',
  emphasis: 'Balanced full-body bold sensuality',
  personalPhotographer: PHOTOGRAPHERS.SENSUAL_VISIONARY,

  physicalTraits: {
    height: '5\'9"',
    figure: 'Perfect hourglass with balanced proportions',
    bust: '38D"',
    waist: '26"',
    hips: '40"',
    emphasis: 'Balanced full-body curves with overall glamour appeal',
    skinTone: 'Warm caramel with golden highlights',
    features: 'Striking beauty, magnetic presence, full sensual body confidence',
    fitness: 'Soft curves with toned elegance throughout',
    specialties: 'Full-body glamour, balanced sensuality, complete form celebration'
  },

  wardrobeCollection: [
    {
      id: 'bold-lace-001',
      name: 'Single Lace Thread Full Body',
      description: 'Comprehensive single lace thread body suit design, strategic placement across all curves, artistic geometric patterns celebrating entire form',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Minimalist art-nude lace',
      materials: 'Fine lace threads, full-body artistic patterns',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'bold-leather-001',
      name: 'Single Leather Thread Body Harness',
      description: 'Complete minimal leather thread body harness, strategic bands across bust, waist, and hips, cohesive full-body design',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Erotic-art leather minimal',
      materials: 'Black leather threads, full-body harness design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'bold-lingerie-001',
      name: 'Erotic-Art Single Thread Set',
      description: 'Matching minimal single thread bralette and bottom set, cohesive design celebrating full form, ultra-revealing artistic construction',
      coverage: 'minimal-revealing',
      intimacyLevel: 10,
      style: 'Erotic-art lingerie minimal',
      materials: 'Coordinated lace threads, sheer panels, minimal fabric',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'bold-full-body',
      name: 'Full Body Bold Stance',
      description: 'Confident standing pose, one hip thrust, full body visible, bold sensual presence, commanding glamour'
    },
    {
      id: 'bold-medium-shot',
      name: 'Medium Shot Sensual Balance',
      description: 'Torso to thigh framing, balanced pose showing curves, sensual confident expression, complete form emphasis'
    },
    {
      id: 'bold-back-form',
      name: 'Back Form Complete',
      description: 'Full back view, spine curve visible, looking back with bold confidence, complete posterior elegance'
    },
    {
      id: 'bold-reclined',
      name: 'Reclined Sensual Glory',
      description: 'Fully reclined with body extended, all curves visible, bold sensual confidence, glamour positioning'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// MODEL 4: ACTRESS EROTIC-ART FILM SPECIALIST
// ============================================================================

export const MODEL_EROTIC_ACTRESS = {
  id: 'erotic-model-004',
  name: 'Zara Cinématique',
  category: 'Erotic-Art Film & Role-Play Perfectionist',
  emphasis: 'Narrative storytelling, cinematic eroticism, character embodiment',
  personalPhotographer: PHOTOGRAPHERS.CINEMATIC_AUTEUR,

  physicalTraits: {
    height: '5\'7"',
    figure: 'Versatile actress physique with dramatic curves',
    bust: '38DD"',
    waist: '27"',
    hips: '39"',
    emphasis: 'Expressive theatrical body language and dramatic presence',
    skinTone: 'Fair complexion with dramatic lighting potential',
    features: 'Intensely expressive eyes, dramatic facial structure, cinematic beauty',
    fitness: 'Flexible and expressive with dramatic range',
    specialties: 'Erotic film roles, narrative embodiment, emotional vulnerability'
  },

  wardrobeCollection: [
    {
      id: 'actress-lace-001',
      name: 'Single Lace Thread Narrative',
      description: 'Story-driven single lace thread costume design, cinematic minimal aesthetic, dramatic artistic placement suggesting character vulnerability',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Cinematic art-nude lace',
      materials: 'Dramatic lace threads, narrative-driven placement',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'actress-leather-001',
      name: 'Single Leather Thread Character',
      description: 'Film noir inspired minimal leather thread harness, dramatic character-driven design, cinematic edginess with artistic minimal coverage',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Cinematic erotic-art leather',
      materials: 'Black leather threads, dramatic hardware',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'actress-lingerie-001',
      name: 'Erotic-Art Film Costume',
      description: 'Cinematic minimal lingerie with narrative purpose, single thread dramatic construction, film-quality erotic artistry',
      coverage: 'minimal-revealing',
      intimacyLevel: 10,
      style: 'Cinematic erotic-art lingerie',
      materials: 'Film-quality minimal fabrics, narrative-driven design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'actress-full-body',
      name: 'Full Body Cinematic Character',
      description: 'Narrative-driven full body pose, character embodiment, emotional vulnerability, cinematic dramatic presence'
    },
    {
      id: 'actress-medium-shot',
      name: 'Medium Shot Film Frame',
      description: 'Cinematic medium framing, intense expressive emotion, role-play authenticity, film-quality dramatic positioning'
    },
    {
      id: 'actress-back-form',
      name: 'Back Form Narrative',
      description: 'Rear view with emotional storytelling, vulnerable back exposure, cinematic dramatic lighting, character depth'
    },
    {
      id: 'actress-reclined',
      name: 'Reclined Film Scene',
      description: 'Cinematic reclined positioning, narrative vulnerability, erotic-art film aesthetic, emotional depth and sensuality'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// MODEL 5: NATURAL GLAMOUR CURVED ATHLETIC
// ============================================================================

export const MODEL_ATHLETIC_GLAMOUR = {
  id: 'erotic-model-005',
  name: 'Kavya Athléa',
  category: 'Natural Glamour Curved Athletic Specialist',
  emphasis: 'Athletic curves, fitness glamour, natural sensuality',
  personalPhotographer: PHOTOGRAPHERS.ATHLETIC_ARTISAN,

  physicalTraits: {
    height: '5\'11"',
    figure: 'Athletic hourglass with muscular definition',
    bust: '36C"',
    waist: '25"',
    hips: '38"',
    emphasis: 'Toned athletic curves with natural muscle definition',
    skinTone: 'Sun-kissed bronze with healthy glow',
    features: 'Strong jawline, athletic confidence, natural radiant beauty',
    fitness: 'Highly athletic with visible muscle tone and curves',
    specialties: 'Athletic sensuality, fitness glamour, natural curved strength'
  },

  wardrobeCollection: [
    {
      id: 'athletic-lace-001',
      name: 'Single Lace Thread Athletic',
      description: 'Sporty minimal single lace thread design, athletic aesthetic with artistic minimal coverage, emphasizing toned curves',
      coverage: 'minimal-artistic',
      intimacyLevel: 9,
      style: 'Athletic art-nude lace',
      materials: 'Performance lace threads, athletic aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'athletic-leather-001',
      name: 'Single Leather Thread Athletic Harness',
      description: 'Fitness-inspired minimal leather thread harness, athletic edge with erotic-art aesthetic, emphasizing muscular curves',
      coverage: 'minimal-artistic',
      intimacyLevel: 9,
      style: 'Athletic erotic-art leather',
      materials: 'Supple athletic leather threads, modern hardware',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'athletic-lingerie-001',
      name: 'Erotic-Art Athletic Minimal Set',
      description: 'Performance-inspired minimal lingerie with single thread construction, athletic glamour with natural sensuality, curved fitness aesthetic',
      coverage: 'minimal-revealing',
      intimacyLevel: 9,
      style: 'Athletic erotic-art lingerie',
      materials: 'Performance fabrics, minimal athletic design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'athletic-full-body',
      name: 'Full Body Athletic Power',
      description: 'Strong athletic stance, muscle definition visible, natural glamour confidence, powerful curved presence'
    },
    {
      id: 'athletic-medium-shot',
      name: 'Medium Shot Fitness Glamour',
      description: 'Dynamic athletic positioning, torso emphasis showing toned curves, natural sensual confidence'
    },
    {
      id: 'athletic-back-form',
      name: 'Back Form Athletic Curves',
      description: 'Back muscles defined, spine curve visible, athletic posterior emphasis, natural strength and sensuality'
    },
    {
      id: 'athletic-reclined',
      name: 'Reclined Athletic Glamour',
      description: 'Relaxed athletic positioning, natural curves emphasized, fitness glamour at rest, toned sensuality'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// EXPORTS
// ============================================================================

export const EROTIC_GLAMOUR_MODELS = [
  MODEL_UPPER_REVEAL,
  MODEL_LOWER_CURVES,
  MODEL_SENSUAL_BOLD,
  MODEL_EROTIC_ACTRESS,
  MODEL_ATHLETIC_GLAMOUR
];

export const LIGHTING_PRESETS = {
  AFTER_DARK: {
    name: 'After Dark Evening',
    description: 'Post-sunset evening lighting with dramatic shadows and warm ambient glow',
    temperature: '3200K warm tungsten',
    mood: 'Intimate seductive evening atmosphere'
  },
  MIDNIGHT_ENCOUNTER: {
    name: 'Midnight Encounter',
    description: 'Deep midnight lighting with dramatic low-key shadows and mysterious ambiance',
    temperature: '2800K deep warm',
    mood: 'Ultimate intimate midnight seduction'
  }
};
