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
// MODEL 6: ISHANI GLAMAZON (Maximum Glamour Diva Specialist)
// ============================================================================

export const MODEL_MAX_GLAMOUR_DIVA = {
  id: 'erotic-model-006',
  name: 'Ishani Glamazon',
  category: 'Maximum Glamour Diva Specialist',
  emphasis: 'Ultra-glamorous presence, bold commanding curves, luxury aesthetics',
  personalPhotographer: {
    name: 'Alessandro Lusso',
    specialty: 'Maximum glamour and luxury aesthetics mastery',
    style: 'Ultra-luxury glamour with bold sensual sophistication',
    intimacy: 10,
    lightingSignature: 'Dramatic luxury lighting with golden highlights and glamour glow',
    cameraPreference: '50mm f/1.4 for balanced glamour perfection',
    compositionStyle: 'Luxurious full-figure compositions with bold glamorous presence',
    intimacyApproach: 'Ultimate confidence-based glamour collaboration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },

  physicalTraits: {
    height: '5\'9"',
    figure: 'Perfect glamorous hourglass with bold commanding presence',
    bust: '38DD"',
    waist: '25"',
    hips: '40"',
    emphasis: 'Complete glamorous perfection with bold sensual confidence',
    skinTone: 'Luminous fair complexion with golden glamour glow',
    features: 'Striking glamorous beauty, bold expressive eyes, full sensual lips, high cheekbones',
    fitness: 'Perfectly toned with soft glamorous curves',
    specialties: 'Maximum glamour presentation, luxury aesthetics, bold confidence'
  },

  wardrobeCollection: [
    {
      id: 'glamour-gold-001',
      name: 'Golden Goddess Chains',
      description: 'Ultra-luxury golden body chains with strategic minimal coverage, designer jewelry creating glamorous minimal aesthetic with maximum bold reveals',
      coverage: 'minimal-luxury',
      intimacyLevel: 10,
      style: 'Maximum glamour luxury minimal',
      materials: '24k gold chains, luxury jewelry, minimal silk accents',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'glamour-diamond-001',
      name: 'Diamond Luxury Harness',
      description: 'Designer diamond-studded minimal harness with strategic luxury placement, bold glamorous aesthetic with maximum artistic reveals',
      coverage: 'minimal-luxury',
      intimacyLevel: 10,
      style: 'Ultra-luxury glamour minimal',
      materials: 'Diamond accents, platinum chains, luxury minimal design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'glamour-silk-001',
      name: 'Luxury Silk Minimal',
      description: 'Ultra-premium silk minimal design with golden accents, flowing luxury fabric with strategic bold reveals and glamorous sophistication',
      coverage: 'minimal-luxury',
      intimacyLevel: 10,
      style: 'Luxury glamour silk minimal',
      materials: 'Premium silk, golden thread, luxury minimal construction',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'glamour-full-power',
      name: 'Full Body Glamour Power',
      description: 'Commanding glamorous power stance, bold confident presence, luxury sophistication with complete glamorous confidence'
    },
    {
      id: 'glamour-luxury-recline',
      name: 'Luxury Reclined Glamour',
      description: 'Luxurious reclined positioning, glamorous elegance, bold sensual confidence with maximum sophistication'
    },
    {
      id: 'glamour-profile',
      name: 'Glamorous Profile Elegance',
      description: 'Side profile glamour emphasis, bold curves showcased, luxury aesthetic with commanding presence'
    },
    {
      id: 'glamour-intimate',
      name: 'Intimate Glamour Close',
      description: 'Close intimate glamour framing, bold sensual expression, luxury confidence with maximum allure'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// MODEL 7: MAYA MIDNIGHT (Midnight Mystique Seductress)
// ============================================================================

export const MODEL_MIDNIGHT_MYSTIQUE = {
  id: 'erotic-model-007',
  name: 'Maya Midnight',
  category: 'Midnight Mystique Seductress Specialist',
  emphasis: 'Dark mysterious midnight aesthetics, shadowy seduction, enigmatic allure',
  personalPhotographer: {
    name: 'Vincent Noche',
    specialty: 'Midnight photography and dark mysterious aesthetics',
    style: 'Shadowy seduction with midnight enigmatic artistry',
    intimacy: 10,
    lightingSignature: 'Dramatic low-key midnight lighting with mysterious shadows',
    cameraPreference: '85mm f/1.2 for intimate midnight mystery',
    compositionStyle: 'Dark mysterious framings with enigmatic midnight presence',
    intimacyApproach: 'Mysterious trust-based midnight intimacy',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },

  physicalTraits: {
    height: '5\'8"',
    figure: 'Mysteriously curved seductive silhouette',
    bust: '36D"',
    waist: '24"',
    hips: '37"',
    emphasis: 'Enigmatic curves with mysterious midnight allure',
    skinTone: 'Deep mocha with mysterious dark undertones',
    features: 'Intense mysterious eyes, enigmatic smile, dark sensual beauty',
    fitness: 'Sleek mysterious curves with shadowy definition',
    specialties: 'Midnight seduction, mysterious presence, dark enigmatic allure'
  },

  wardrobeCollection: [
    {
      id: 'midnight-shadow-001',
      name: 'Shadow Lace Midnight',
      description: 'Dark mysterious lace with shadowy patterns, midnight aesthetic with strategic enigmatic reveals and mysterious allure',
      coverage: 'minimal-mysterious',
      intimacyLevel: 10,
      style: 'Midnight mysterious minimal',
      materials: 'Black shadow lace, dark threads, mysterious minimal design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'midnight-velvet-001',
      name: 'Velvet Midnight Minimal',
      description: 'Luxurious black velvet minimal design with mysterious draping, midnight sophistication with enigmatic artistic reveals',
      coverage: 'minimal-mysterious',
      intimacyLevel: 10,
      style: 'Midnight velvet minimal',
      materials: 'Premium black velvet, shadow materials, mysterious construction',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'midnight-leather-001',
      name: 'Dark Leather Midnight Harness',
      description: 'Mysterious black leather minimal harness with midnight edge, shadowy aesthetic with strategic dark reveals',
      coverage: 'minimal-mysterious',
      intimacyLevel: 10,
      style: 'Midnight leather minimal',
      materials: 'Dark leather, black hardware, mysterious minimal aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'midnight-shadow-stance',
      name: 'Shadowy Midnight Stance',
      description: 'Mysterious standing pose in shadows, enigmatic presence, dark seductive confidence with midnight allure'
    },
    {
      id: 'midnight-recline',
      name: 'Midnight Reclined Mystery',
      description: 'Enigmatic reclined positioning, mysterious curves emphasized, shadowy midnight intimacy'
    },
    {
      id: 'midnight-silhouette',
      name: 'Dark Silhouette Profile',
      description: 'Mysterious silhouette emphasis, enigmatic curves outlined, midnight shadow artistry'
    },
    {
      id: 'midnight-intimate',
      name: 'Intimate Midnight Close',
      description: 'Close mysterious framing, dark enigmatic expression, midnight seductive intimacy'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// MODEL 8: RIYA POWERHOUSE (Bold Athletic Action Star)
// ============================================================================

export const MODEL_ACTION_BOMBSHELL = {
  id: 'erotic-model-008',
  name: 'Riya Powerhouse',
  category: 'Bold Athletic Action Star Specialist',
  emphasis: 'Powerful athletic action aesthetics, bold strength with curves',
  personalPhotographer: {
    name: 'Drake Momentum',
    specialty: 'Action photography and athletic power aesthetics',
    style: 'Bold action artistry with powerful athletic sensuality',
    intimacy: 10,
    lightingSignature: 'Dynamic action lighting with dramatic power emphasis',
    cameraPreference: '70mm f/2.0 for athletic power clarity',
    compositionStyle: 'Dynamic action compositions celebrating powerful curves',
    intimacyApproach: 'Empowering athletic confidence collaboration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },

  physicalTraits: {
    height: '5\'10"',
    figure: 'Powerful athletic hourglass with bold muscular definition',
    bust: '36C"',
    waist: '26"',
    hips: '39"',
    emphasis: 'Bold athletic power with sensual curved strength',
    skinTone: 'Warm bronze with athletic glow',
    features: 'Strong confident features, bold eyes, athletic powerful beauty',
    fitness: 'Highly athletic with visible bold muscular curves',
    specialties: 'Action star presence, athletic power, bold confident strength'
  },

  wardrobeCollection: [
    {
      id: 'action-tactical-001',
      name: 'Tactical Minimal Harness',
      description: 'Action-inspired tactical minimal harness with bold athletic aesthetic, strategic power emphasis with maximum athletic reveals',
      coverage: 'minimal-tactical',
      intimacyLevel: 10,
      style: 'Athletic action minimal',
      materials: 'Tactical materials, athletic straps, power aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'action-sport-001',
      name: 'Sport Minimal Bold',
      description: 'Athletic sport-inspired minimal design with bold power aesthetic, action star sensuality with strategic reveals',
      coverage: 'minimal-athletic',
      intimacyLevel: 10,
      style: 'Athletic bold minimal',
      materials: 'Performance materials, athletic construction, bold design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'action-leather-001',
      name: 'Action Leather Minimal',
      description: 'Bold action-style leather minimal with powerful aesthetic, athletic sensuality with strategic power reveals',
      coverage: 'minimal-action',
      intimacyLevel: 10,
      style: 'Action athletic minimal',
      materials: 'Action leather, tactical hardware, powerful construction',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'action-power-stance',
      name: 'Action Power Stance',
      description: 'Bold powerful action pose, athletic confidence, strong sensual presence with action star energy'
    },
    {
      id: 'action-dynamic',
      name: 'Dynamic Action Positioning',
      description: 'Athletic dynamic positioning, powerful curves emphasized, action star sensual strength'
    },
    {
      id: 'action-profile',
      name: 'Action Profile Power',
      description: 'Side athletic profile, powerful muscle definition visible, bold action star curves'
    },
    {
      id: 'action-ground',
      name: 'Ground Action Pose',
      description: 'Floor-based athletic positioning, powerful sensual curves, action star bold confidence'
    }
  ],

  environments: MODEL_UPPER_REVEAL.environments
};

// ============================================================================
// MODEL 9: NISHA VITALITY (Athletic Fitness Glamour Icon)
// ============================================================================

export const MODEL_FITNESS_VIXEN = {
  id: 'erotic-model-009',
  name: 'Nisha Vitality',
  category: 'Athletic Fitness Glamour Icon Specialist',
  emphasis: 'Fitness glamour fusion, athletic elegance with bold curves',
  personalPhotographer: {
    name: 'Marcus Vigor',
    specialty: 'Fitness glamour and athletic elegance photography',
    style: 'Athletic glamour fusion with fitness sensuality',
    intimacy: 10,
    lightingSignature: 'Clean fitness lighting with glamorous highlights',
    cameraPreference: '85mm f/2.0 for fitness glamour clarity',
    compositionStyle: 'Fitness glamour compositions with athletic curves',
    intimacyApproach: 'Empowering fitness confidence with glamour sensuality',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },

  physicalTraits: {
    height: '5\'9"',
    figure: 'Athletic glamour hourglass with fitness curves',
    bust: '36D"',
    waist: '24"',
    hips: '38"',
    emphasis: 'Fitness glamour with bold athletic curves',
    skinTone: 'Radiant golden bronze with healthy fitness glow',
    features: 'Vibrant fitness beauty, glamorous eyes, athletic confidence',
    fitness: 'Perfectly toned athletic glamour with bold curves',
    specialties: 'Fitness glamour fusion, athletic elegance, bold sensual strength'
  },

  wardrobeCollection: [
    {
      id: 'fitness-glam-001',
      name: 'Fitness Glamour Minimal',
      description: 'Athletic glamour minimal design with fitness aesthetic, bold curves emphasized with strategic glamorous reveals',
      coverage: 'minimal-fitness-glam',
      intimacyLevel: 10,
      style: 'Fitness glamour minimal',
      materials: 'Performance glamour materials, athletic aesthetic, bold design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'fitness-luxury-001',
      name: 'Luxury Athletic Minimal',
      description: 'Premium athletic minimal with glamour accents, fitness elegance with luxury bold reveals',
      coverage: 'minimal-luxury-athletic',
      intimacyLevel: 10,
      style: 'Luxury fitness minimal',
      materials: 'Premium athletic materials, glamour accents, luxury construction',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'fitness-bold-001',
      name: 'Bold Fitness Harness',
      description: 'Athletic harness with glamour boldness, fitness curves celebrated with strategic glamorous artistic reveals',
      coverage: 'minimal-bold-fitness',
      intimacyLevel: 10,
      style: 'Bold fitness glamour minimal',
      materials: 'Athletic harness materials, glamour hardware, bold fitness design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'fitness-glam-power',
      name: 'Fitness Glamour Power Stance',
      description: 'Athletic glamour power pose, fitness confidence, bold sensual strength with glamorous presence'
    },
    {
      id: 'fitness-stretch',
      name: 'Athletic Stretch Glamour',
      description: 'Fitness stretch positioning, glamorous curves emphasized, athletic sensual elegance'
    },
    {
      id: 'fitness-profile',
      name: 'Fitness Glamour Profile',
      description: 'Side athletic glamour profile, fitness curves defined, bold glamorous athletic beauty'
    },
    {
      id: 'fitness-floor',
      name: 'Floor Fitness Glamour',
      description: 'Floor-based fitness positioning, glamorous athletic curves, bold sensual fitness confidence'
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
  MODEL_ATHLETIC_GLAMOUR,
  MODEL_MAX_GLAMOUR_DIVA,
  MODEL_MIDNIGHT_MYSTIQUE,
  MODEL_ACTION_BOMBSHELL,
  MODEL_FITNESS_VIXEN
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
