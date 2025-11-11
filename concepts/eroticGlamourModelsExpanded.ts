/**
 * EROTIC GLAMOUR MODELS - EXPANDED THEME COLLECTION
 *
 * 12 Additional Sensual-Bold Indian Model Variants (Models 016-027)
 * Theme-based specialists: Boudoir, Wet Look, Dance, Spa, Pool, Yoga, Leather Art,
 * Secretary, Nurse, Maid, Teacher, Bride
 * Each with complete physical traits, photographers, wardrobes, poses, environments
 * Optimized for both Flux and Imagen 4 generation
 */

// ============================================================================
// ADDITIONAL PHOTOGRAPHERS (10/10 Intimacy)
// ============================================================================

export const PHOTOGRAPHERS_EXPANDED = {
  BOUDOIR_MASTER: {
    name: 'Pierre Intimité',
    specialty: 'Boudoir intimacy and bedroom sensuality mastery',
    style: 'Intimate boudoir artistry with soft sensual elegance',
    intimacy: 10,
    lightingSignature: 'Soft diffused bedroom lighting with intimate warm glow',
    cameraPreference: '50mm f/1.4 for intimate bedroom perspective',
    compositionStyle: 'Intimate boudoir framing with soft sensual presence',
    intimacyApproach: 'Ultimate privacy-based bedroom intimacy',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  WET_ARTISAN: {
    name: 'Aqua Révélation',
    specialty: 'Wet look photography and water aesthetics specialist',
    style: 'Sensual wet artistry with aquatic elegance',
    intimacy: 10,
    lightingSignature: 'Glistening water lighting emphasizing wet skin and fabric',
    cameraPreference: '85mm f/1.8 for wet detail clarity',
    compositionStyle: 'Water-enhanced compositions celebrating wet curves',
    intimacyApproach: 'Vulnerable wet aesthetic collaboration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  DANCE_VIRTUOSO: {
    name: 'Tango Sensualité',
    specialty: 'Dance and movement erotica with athletic grace',
    style: 'Dynamic dance artistry with athletic sensual movement',
    intimacy: 10,
    lightingSignature: 'Dynamic colored stage lighting emphasizing movement',
    cameraPreference: '70mm f/2.0 for dance movement clarity',
    compositionStyle: 'Dynamic dance poses celebrating athletic sensuality',
    intimacyApproach: 'Performance-based sensual confidence',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  SPA_SERENITY: {
    name: 'Zen Luxe',
    specialty: 'Spa luxury and oil glow aesthetics specialist',
    style: 'Serene spa artistry with oil-enhanced sensuality',
    intimacy: 10,
    lightingSignature: 'Soft warm spa lighting emphasizing oil glow',
    cameraPreference: '85mm f/1.4 for intimate spa detail',
    compositionStyle: 'Relaxed spa compositions with oil-glistening curves',
    intimacyApproach: 'Serene trust-based spa intimacy',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  FANTASY_AUTEUR: {
    name: 'Eros Fantasy',
    specialty: 'Role-play fantasy and narrative erotica director',
    style: 'Fantasy role-play artistry with narrative seduction',
    intimacy: 10,
    lightingSignature: 'Dramatic fantasy lighting with narrative mood',
    cameraPreference: '50mm f/2.0 for fantasy storytelling',
    compositionStyle: 'Role-play narrative compositions with fantasy elements',
    intimacyApproach: 'Character-based fantasy collaboration',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  POWER_DYNAMICS: {
    name: 'Dominique Noir',
    specialty: 'Power dynamics and leather art specialist',
    style: 'Bold power exchange artistry with leather elegance',
    intimacy: 10,
    lightingSignature: 'Dramatic high-contrast lighting emphasizing power',
    cameraPreference: '85mm f/1.2 for intense intimate power',
    compositionStyle: 'Power dynamic framing with dominant presence',
    intimacyApproach: 'Trust-based power exchange artistry',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  }
};

// ============================================================================
// MODEL 16: BOUDOIR PHOTOGRAPHY SPECIALIST
// ============================================================================

export const MODEL_BOUDOIR_INTIMACY = {
  id: 'erotic-model-016',
  name: 'Diya Boudoir',
  category: 'Boudoir Photography Intimacy Specialist',
  emphasis: 'Intimate bedroom photography, silk aesthetics, private sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.BOUDOIR_MASTER,

  physicalTraits: {
    height: '5\'7"',
    figure: 'Soft curved hourglass with intimate elegance',
    bust: '38DD"',
    waist: '27"',
    hips: '40"',
    emphasis: 'Soft intimate curves with boudoir elegance and bedroom confidence',
    skinTone: 'Creamy fair complexion with rosy undertones',
    features: 'Dreamy bedroom eyes, soft sensual lips, intimate gentle beauty',
    fitness: 'Soft curves with feminine boudoir elegance',
    specialties: 'Boudoir poses, silk aesthetics, intimate bedroom photography, private sensuality'
  },

  wardrobeCollection: [
    {
      id: 'boudoir-silk-robe',
      name: 'Open Silk Robe Minimal',
      description: 'Luxury silk robe worn open with minimal coverage beneath, flowing fabric revealing curves, intimate boudoir aesthetic',
      coverage: 'minimal-boudoir',
      intimacyLevel: 10,
      style: 'Boudoir silk elegance',
      materials: 'Premium silk robe, minimal lace beneath, flowing elegance',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'boudoir-lace-minimal',
      name: 'Sheer Lace Boudoir Set',
      description: 'Ultra-sheer lace bralette and minimal bottom, intimate bedroom aesthetic with maximum artistic reveals',
      coverage: 'minimal-sheer',
      intimacyLevel: 10,
      style: 'Sheer boudoir lace',
      materials: 'Ultra-sheer lace, minimal coverage, intimate design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'boudoir-satin-minimal',
      name: 'Satin Sheet Drape',
      description: 'Strategic satin sheet draping revealing curves, artistic minimal coverage, intimate bedroom elegance',
      coverage: 'minimal-draped',
      intimacyLevel: 10,
      style: 'Draped boudoir satin',
      materials: 'Luxury satin sheets, artistic draping, intimate coverage',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'boudoir-bed-recline',
      poseName: 'Bed Reclined Intimacy',
      description: 'Reclined on bed with silk sheets, intimate gentle pose, bedroom sensuality with soft confidence',
      aspectRatio: '4:5',
      framing: 'Medium shot emphasizing boudoir intimacy'
    },
    {
      id: 'boudoir-sitting-edge',
      poseName: 'Bed Edge Sitting',
      description: 'Sitting on bed edge, legs crossed, intimate bedroom confidence, soft sensual presence',
      aspectRatio: '4:5',
      framing: 'Full body boudoir framing'
    },
    {
      id: 'boudoir-window-silhouette',
      poseName: 'Window Bedroom Silhouette',
      description: 'Standing by bedroom window, morning light silhouette, intimate vulnerability with elegant confidence',
      aspectRatio: '4:5',
      framing: 'Silhouette with soft bedroom lighting'
    },
    {
      id: 'boudoir-mirror-reflection',
      poseName: 'Mirror Reflection Intimacy',
      description: 'Bedroom mirror reflection pose, intimate self-admiration, soft sensual boudoir confidence',
      aspectRatio: '4:5',
      framing: 'Mirror composition with intimate framing'
    }
  ],

  environments: [
    {
      id: 'luxury-bedroom',
      name: 'Luxury Bedroom Suite',
      description: 'Opulent bedroom with silk sheets, soft lighting, intimate privacy, luxury furnishings',
      atmosphere: 'Ultimate intimate privacy with luxury bedroom elegance',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Soft diffused bedroom lighting with warm intimate glow',
      materialPalette: ['Silk sheets', 'Velvet drapes', 'Soft rugs', 'Luxury bedroom furnishings']
    },
    {
      id: 'minimalist-loft-bedroom',
      name: 'Modern Loft Bedroom',
      description: 'Minimalist loft bedroom with floor-to-ceiling windows, natural light, intimate modern aesthetic',
      atmosphere: 'Modern intimate privacy with natural light elegance',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Natural window light with soft bedroom ambiance',
      materialPalette: ['Modern bedding', 'Glass windows', 'Wood floors', 'Minimalist furniture']
    }
  ]
};

// ============================================================================
// MODEL 17: SHOWER/WET LOOK SPECIALIST
// ============================================================================

export const MODEL_WET_GODDESS = {
  id: 'erotic-model-017',
  name: 'Asha Aqua',
  category: 'Shower & Wet Look Specialist',
  emphasis: 'Wet skin aesthetics, water droplets, wet fabric cling, glass settings',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.WET_ARTISAN,

  physicalTraits: {
    height: '5\'8"',
    figure: 'Curved athletic with glistening wet aesthetics',
    bust: '36D"',
    waist: '25"',
    hips: '38"',
    emphasis: 'Wet skin beauty with water-enhanced curves and glistening sensuality',
    skinTone: 'Golden honey complexion glowing when wet',
    features: 'Sultry wet-look eyes, dewy lips, water-enhanced beauty',
    fitness: 'Toned curves accentuated by water and wet fabric',
    specialties: 'Wet skin photography, shower scenes, water droplet artistry, wet fabric cling'
  },

  wardrobeCollection: [
    {
      id: 'wet-white-minimal',
      name: 'Wet White Minimal Fabric',
      description: 'Ultra-thin white fabric clinging when wet, revealing curves through transparency, water-enhanced sensuality',
      coverage: 'minimal-wet',
      intimacyLevel: 10,
      style: 'Wet transparent minimal',
      materials: 'Ultra-thin wet fabric, transparent when wet, clinging design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'wet-mesh-minimal',
      name: 'Wet Mesh Body',
      description: 'Sheer mesh becoming transparent when wet, water droplets emphasizing curves, bold wet aesthetic',
      coverage: 'minimal-mesh',
      intimacyLevel: 10,
      style: 'Wet mesh transparent',
      materials: 'Sheer mesh, water-transparent design, wet artistry',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'wet-minimal-straps',
      name: 'Minimal Wet Straps',
      description: 'Strategic minimal straps with wet skin emphasis, water-glistening curves, artistic minimal coverage',
      coverage: 'minimal-straps',
      intimacyLevel: 10,
      style: 'Wet minimal straps',
      materials: 'Minimal wet-look straps, water-enhanced design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'wet-shower-glass',
      poseName: 'Shower Glass Silhouette',
      description: 'Behind glass shower door, water running over curves, artistic wet silhouette with steam and droplets',
      aspectRatio: '4:5',
      framing: 'Through glass emphasizing wet curves'
    },
    {
      id: 'wet-standing-drip',
      poseName: 'Standing Water Drip',
      description: 'Standing with water dripping from curves, hands in wet hair, sensual wet confidence',
      aspectRatio: '4:5',
      framing: 'Full body emphasizing water droplets'
    },
    {
      id: 'wet-sitting-water',
      poseName: 'Sitting in Water',
      description: 'Sitting in shallow water, wet fabric clinging to curves, sensual aquatic elegance',
      aspectRatio: '4:5',
      framing: 'Medium shot with water interaction'
    },
    {
      id: 'wet-back-shower',
      poseName: 'Back Wet Shower',
      description: 'Back view under shower water, spine and posterior curves enhanced by water, looking back over shoulder',
      aspectRatio: '4:5',
      framing: 'Back view emphasizing wet curves'
    }
  ],

  environments: [
    {
      id: 'luxury-glass-shower',
      name: 'Luxury Glass Shower',
      description: 'Modern glass shower with rainfall head, steam, water aesthetics, luxury spa feel',
      atmosphere: 'Intimate wet luxury with glass and water',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Backlit steam with water glistening highlights',
      materialPalette: ['Glass shower', 'Chrome fixtures', 'White marble', 'Steam mist']
    },
    {
      id: 'infinity-pool',
      name: 'Infinity Edge Pool',
      description: 'Luxury infinity pool with sunset views, water reflections, aquatic elegance',
      atmosphere: 'Outdoor wet luxury with water and sky',
      privacyLevel: 9,
      luxuryLevel: 10,
      lightingProfile: 'Golden hour water reflections with glistening highlights',
      materialPalette: ['Pool water', 'Wet stone', 'Sunset sky', 'Reflective surfaces']
    }
  ]
};

// ============================================================================
// MODEL 18: DANCE/POLE ART SPECIALIST
// ============================================================================

export const MODEL_DANCE_SEDUCTRESS = {
  id: 'erotic-model-018',
  name: 'Kira Movement',
  category: 'Dance & Pole Art Specialist',
  emphasis: 'Athletic dance moves, pole artistry, dynamic performance, flexible sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.DANCE_VIRTUOSO,

  physicalTraits: {
    height: '5\'9"',
    figure: 'Athletic dancer with flexible curved strength',
    bust: '36C"',
    waist: '24"',
    hips: '37"',
    emphasis: 'Athletic dancer curves with flexible strength and performance confidence',
    skinTone: 'Warm bronze with athletic glow',
    features: 'Intense performance eyes, confident smile, athletic dancer beauty',
    fitness: 'Highly athletic dancer with flexible toned curves',
    specialties: 'Pole dance artistry, flexible poses, performance sensuality, dance movement'
  },

  wardrobeCollection: [
    {
      id: 'dance-minimal-performance',
      name: 'Performance Dance Minimal',
      description: 'Minimal athletic dance wear with strategic coverage, performance aesthetic with bold reveals',
      coverage: 'minimal-athletic',
      intimacyLevel: 10,
      style: 'Athletic dance minimal',
      materials: 'Performance materials, athletic cut, minimal coverage',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'dance-sequin-minimal',
      name: 'Sequin Stage Minimal',
      description: 'Sparkling minimal sequin design for stage performance, bold reveals with glamorous performance aesthetic',
      coverage: 'minimal-stage',
      intimacyLevel: 10,
      style: 'Stage performance minimal',
      materials: 'Sequin accents, minimal performance fabric, stage glamour',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'dance-leather-harness',
      name: 'Dance Harness Athletic',
      description: 'Athletic leather harness for pole performance, strategic movement-friendly design with bold aesthetic',
      coverage: 'minimal-harness',
      intimacyLevel: 10,
      style: 'Athletic performance harness',
      materials: 'Performance leather, athletic harness, bold design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'dance-pole-climb',
      poseName: 'Pole Climb Athletic',
      description: 'Climbing pole with athletic strength, curves emphasized by dynamic movement, performance confidence',
      aspectRatio: '4:5',
      framing: 'Full body emphasizing athletic pole artistry'
    },
    {
      id: 'dance-leg-extension',
      poseName: 'High Leg Extension',
      description: 'Dramatic leg extension showing flexibility, athletic curves emphasized, dance performance confidence',
      aspectRatio: '4:5',
      framing: 'Dynamic angle capturing flexibility'
    },
    {
      id: 'dance-floor-split',
      poseName: 'Floor Split Performance',
      description: 'Full split position on floor, flexible athletic curves, performance sensuality with confidence',
      aspectRatio: '4:5',
      framing: 'Floor angle emphasizing flexibility'
    },
    {
      id: 'dance-pole-invert',
      poseName: 'Inverted Pole Hold',
      description: 'Upside-down pole hold, athletic strength emphasized, curves in dynamic inverted position',
      aspectRatio: '4:5',
      framing: 'Dynamic inverted angle'
    }
  ],

  environments: [
    {
      id: 'pole-studio',
      name: 'Professional Pole Studio',
      description: 'Dance studio with poles, mirrors, stage lighting, performance atmosphere',
      atmosphere: 'Athletic performance with dramatic stage presence',
      privacyLevel: 9,
      luxuryLevel: 8,
      lightingProfile: 'Dramatic colored stage lighting with spotlights',
      materialPalette: ['Chrome poles', 'Wood floor', 'Mirrors', 'Stage lights']
    },
    {
      id: 'private-stage',
      name: 'Private VIP Stage',
      description: 'Intimate VIP stage with dramatic lighting, luxury atmosphere, private performance space',
      atmosphere: 'Private performance luxury with intimate stage',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Dramatic VIP stage lighting with intimate atmosphere',
      materialPalette: ['Luxury stage', 'Velvet drapes', 'Dramatic lighting', 'VIP furnishings']
    }
  ]
};

// ============================================================================
// MODEL 19: MASSAGE/SPA SPECIALIST
// ============================================================================

export const MODEL_SPA_SERENITY = {
  id: 'erotic-model-019',
  name: 'Serena Zen',
  category: 'Massage & Spa Luxury Specialist',
  emphasis: 'Oil-glistening skin, spa luxury, towel minimal, massage table aesthetics',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.SPA_SERENITY,

  physicalTraits: {
    height: '5\'8"',
    figure: 'Soft curves with serene elegant presence',
    bust: '38D"',
    waist: '26"',
    hips: '39"',
    emphasis: 'Oil-enhanced curves with spa serenity and luxury elegance',
    skinTone: 'Rich caramel glowing with oil sheen',
    features: 'Serene relaxed eyes, gentle smile, spa luxury beauty',
    fitness: 'Soft toned curves with spa elegance',
    specialties: 'Oil photography, spa settings, towel minimal, massage aesthetics'
  },

  wardrobeCollection: [
    {
      id: 'spa-towel-minimal',
      name: 'Strategic Towel Drape',
      description: 'Luxury towel strategically draped revealing oil-glistening curves, spa minimal aesthetic',
      coverage: 'minimal-towel',
      intimacyLevel: 10,
      style: 'Spa towel minimal',
      materials: 'Luxury spa towel, strategic draping, minimal coverage',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'spa-oil-minimal',
      name: 'Oil-Enhanced Minimal',
      description: 'Minimal coverage with oil-glistening skin emphasis, spa luxury with artistic minimal design',
      coverage: 'minimal-oil',
      intimacyLevel: 10,
      style: 'Oil spa minimal',
      materials: 'Massage oil, minimal fabric, glistening aesthetics',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'spa-silk-wrap',
      name: 'Silk Spa Wrap Minimal',
      description: 'Luxury silk spa wrap with minimal coverage, oil-enhanced curves, elegant spa aesthetic',
      coverage: 'minimal-wrap',
      intimacyLevel: 10,
      style: 'Silk spa wrap',
      materials: 'Premium silk wrap, spa luxury, minimal coverage',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'spa-massage-table',
      poseName: 'Massage Table Recline',
      description: 'Reclined on massage table with oil-glistening curves, serene spa confidence, luxury relaxation',
      aspectRatio: '4:5',
      framing: 'Medium shot emphasizing oil-enhanced curves'
    },
    {
      id: 'spa-towel-sitting',
      poseName: 'Towel-Draped Sitting',
      description: 'Sitting with towel minimally draped, spa serenity, oil-enhanced skin glow',
      aspectRatio: '4:5',
      framing: 'Sitting pose with spa elegance'
    },
    {
      id: 'spa-back-oil',
      poseName: 'Oil Back Massage',
      description: 'Back view with oil-glistening spine and curves, spa luxury, serene confidence',
      aspectRatio: '4:5',
      framing: 'Back view emphasizing oil aesthetics'
    },
    {
      id: 'spa-stone-zen',
      poseName: 'Hot Stone Zen',
      description: 'Reclined with hot stones, oil-enhanced curves, spa luxury serenity',
      aspectRatio: '4:5',
      framing: 'Spa setting with luxury elements'
    }
  ],

  environments: [
    {
      id: 'luxury-spa-room',
      name: 'Luxury Spa Suite',
      description: 'Private spa room with massage table, soft lighting, candles, luxury spa atmosphere',
      atmosphere: 'Serene spa luxury with ultimate privacy',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Soft warm spa lighting with candlelight glow',
      materialPalette: ['Massage table', 'Spa linens', 'Candles', 'Natural wood']
    },
    {
      id: 'outdoor-spa-oasis',
      name: 'Outdoor Spa Oasis',
      description: 'Private outdoor spa with natural views, tropical plants, serene luxury atmosphere',
      atmosphere: 'Natural spa luxury with outdoor serenity',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Natural soft daylight with gentle shadows',
      materialPalette: ['Natural stone', 'Tropical plants', 'Spa elements', 'Water features']
    }
  ]
};

// ============================================================================
// MODEL 20: SWIMMING/POOL SPECIALIST
// ============================================================================

export const MODEL_POOL_GODDESS = {
  id: 'erotic-model-020',
  name: 'Marina Aquatic',
  category: 'Swimming & Pool Lifestyle Specialist',
  emphasis: 'Wet swimwear, poolside elegance, water interaction, aquatic sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.WET_ARTISAN,

  physicalTraits: {
    height: '5\'10"',
    figure: 'Athletic swimmer with elegant curves',
    bust: '36C"',
    waist: '25"',
    hips: '37"',
    emphasis: 'Athletic aquatic curves with swimmer elegance and poolside confidence',
    skinTone: 'Sun-kissed golden with healthy glow',
    features: 'Vibrant eyes, athletic smile, aquatic beauty',
    fitness: 'Athletic swimmer with toned elegant curves',
    specialties: 'Poolside photography, wet swimwear, water interaction, aquatic elegance'
  },

  wardrobeCollection: [
    {
      id: 'pool-minimal-suit',
      name: 'Minimal Pool Swimwear',
      description: 'Ultra-minimal swimwear with strategic coverage, poolside sensuality with athletic elegance',
      coverage: 'minimal-swim',
      intimacyLevel: 10,
      style: 'Minimal poolside athletic',
      materials: 'Performance swimwear, minimal coverage, athletic cut',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'pool-string-minimal',
      name: 'String Swimwear Bold',
      description: 'String-tie minimal swimwear with bold reveals, poolside confidence with maximum artistic coverage',
      coverage: 'minimal-string',
      intimacyLevel: 10,
      style: 'String pool minimal',
      materials: 'String-tie design, minimal fabric, bold poolside aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'pool-wet-sheer',
      name: 'Wet Sheer Pool Cover',
      description: 'Sheer pool cover-up becoming transparent when wet, artistic minimal coverage with water aesthetics',
      coverage: 'minimal-sheer-wet',
      intimacyLevel: 10,
      style: 'Wet sheer poolside',
      materials: 'Sheer wet fabric, transparent when wet, poolside elegance',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'pool-edge-sitting',
      poseName: 'Pool Edge Sitting',
      description: 'Sitting on pool edge with legs in water, athletic confidence, aquatic elegance',
      aspectRatio: '4:5',
      framing: 'Pool setting emphasizing curves and water'
    },
    {
      id: 'pool-floating-back',
      poseName: 'Floating Back Relax',
      description: 'Floating on back in pool, relaxed aquatic elegance, wet curves emphasized',
      aspectRatio: '4:5',
      framing: 'Overhead pool angle'
    },
    {
      id: 'pool-emerging-water',
      poseName: 'Emerging from Water',
      description: 'Emerging from pool with water cascading, athletic confidence, wet sensual presence',
      aspectRatio: '4:5',
      framing: 'Dynamic water emergence angle'
    },
    {
      id: 'pool-lounge-wet',
      poseName: 'Pool Lounge Wet',
      description: 'Reclined on pool lounge with wet curves, sun-kissed aquatic elegance',
      aspectRatio: '4:5',
      framing: 'Poolside lounge setting'
    }
  ],

  environments: [
    {
      id: 'infinity-resort-pool',
      name: 'Resort Infinity Pool',
      description: 'Luxury resort pool with infinity edge, ocean views, tropical paradise',
      atmosphere: 'Luxury aquatic paradise with resort elegance',
      privacyLevel: 9,
      luxuryLevel: 10,
      lightingProfile: 'Golden hour natural light with water reflections',
      materialPalette: ['Pool water', 'Wet stone', 'Tropical views', 'Luxury resort elements']
    },
    {
      id: 'private-villa-pool',
      name: 'Private Villa Pool',
      description: 'Exclusive private pool with lush surroundings, intimate luxury, ultimate privacy',
      atmosphere: 'Private pool luxury with ultimate intimacy',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Natural daylight with pool reflections',
      materialPalette: ['Private pool', 'Lush plants', 'Villa architecture', 'Luxury furnishings']
    }
  ]
};

// ============================================================================
// MODEL 21: YOGA/FLEXIBILITY SPECIALIST
// ============================================================================

export const MODEL_YOGA_FLEXIBILITY = {
  id: 'erotic-model-021',
  name: 'Leela Flexibility',
  category: 'Yoga & Flexibility Artistry Specialist',
  emphasis: 'Flexible poses, yoga aesthetics, form-fitting athletic, stretching sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.DANCE_VIRTUOSO,

  physicalTraits: {
    height: '5\'7"',
    figure: 'Flexible athletic with elegant yoga curves',
    bust: '34C"',
    waist: '24"',
    hips: '36"',
    emphasis: 'Flexible athletic curves with yoga elegance and stretching confidence',
    skinTone: 'Warm honey with healthy yoga glow',
    features: 'Serene focused eyes, peaceful smile, yoga beauty',
    fitness: 'Highly flexible with toned yoga curves',
    specialties: 'Yoga poses, flexibility artistry, stretching photography, athletic elegance'
  },

  wardrobeCollection: [
    {
      id: 'yoga-minimal-form',
      name: 'Form-Fitting Yoga Minimal',
      description: 'Ultra form-fitting minimal yoga wear emphasizing curves during poses, athletic sensuality with flexibility',
      coverage: 'minimal-form-fit',
      intimacyLevel: 10,
      style: 'Yoga athletic minimal',
      materials: 'Performance yoga fabric, form-fitting, minimal coverage',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'yoga-sports-minimal',
      name: 'Minimal Sports Yoga',
      description: 'Minimal athletic sports bra and bottom, yoga aesthetic with bold reveals during flexible poses',
      coverage: 'minimal-athletic',
      intimacyLevel: 10,
      style: 'Athletic yoga minimal',
      materials: 'Athletic sports materials, minimal design, flexibility-friendly',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'yoga-mesh-minimal',
      name: 'Mesh Yoga Minimal',
      description: 'Sheer mesh yoga wear with strategic coverage, flexibility emphasized with artistic transparency',
      coverage: 'minimal-mesh',
      intimacyLevel: 10,
      style: 'Mesh yoga minimal',
      materials: 'Sheer athletic mesh, minimal coverage, yoga aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'yoga-deep-backbend',
      poseName: 'Deep Backbend Arch',
      description: 'Dramatic backbend emphasizing spine curve and chest, flexible confidence, yoga artistry',
      aspectRatio: '4:5',
      framing: 'Side angle capturing flexibility'
    },
    {
      id: 'yoga-splits-ground',
      poseName: 'Ground Splits Flexibility',
      description: 'Full splits on ground, flexibility emphasized, yoga confidence with graceful sensuality',
      aspectRatio: '4:5',
      framing: 'Floor angle emphasizing split flexibility'
    },
    {
      id: 'yoga-warrior-pose',
      poseName: 'Warrior Pose Power',
      description: 'Powerful warrior yoga pose, athletic curves emphasized, confident yoga strength',
      aspectRatio: '4:5',
      framing: 'Dynamic yoga pose framing'
    },
    {
      id: 'yoga-upward-dog',
      poseName: 'Upward Dog Arch',
      description: 'Upward facing dog with arched back, chest and curves emphasized, yoga elegance',
      aspectRatio: '4:5',
      framing: 'Low angle capturing yoga arch'
    }
  ],

  environments: [
    {
      id: 'yoga-studio-natural',
      name: 'Natural Light Yoga Studio',
      description: 'Bright yoga studio with natural light, wood floors, serene atmosphere',
      atmosphere: 'Peaceful yoga practice with natural elegance',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Soft natural daylight with gentle shadows',
      materialPalette: ['Wood floors', 'Yoga mats', 'Natural light', 'Minimalist decor']
    },
    {
      id: 'outdoor-yoga-rooftop',
      name: 'Rooftop Yoga Oasis',
      description: 'Private rooftop with yoga setup, city views, morning light, serene practice space',
      atmosphere: 'Outdoor yoga luxury with city backdrop',
      privacyLevel: 9,
      luxuryLevel: 9,
      lightingProfile: 'Morning golden light with urban views',
      materialPalette: ['Rooftop deck', 'Yoga props', 'City skyline', 'Natural elements']
    }
  ]
};

// ============================================================================
// MODEL 22: LEATHER/BDSM ART SPECIALIST
// ============================================================================

export const MODEL_POWER_DYNAMICS = {
  id: 'erotic-model-022',
  name: 'Dominique Power',
  category: 'Leather Art & Power Dynamics Specialist',
  emphasis: 'Artistic bondage aesthetics, power dynamics, leather elegance, dominant presence',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.POWER_DYNAMICS,

  physicalTraits: {
    height: '5\'11"',
    figure: 'Powerful hourglass with commanding presence',
    bust: '38D"',
    waist: '26"',
    hips: '39"',
    emphasis: 'Powerful curves with dominant presence and leather aesthetics',
    skinTone: 'Fair porcelain with dramatic contrast potential',
    features: 'Intense commanding eyes, strong features, dominant beauty',
    fitness: 'Strong toned with powerful feminine curves',
    specialties: 'Power dynamics photography, leather artistry, dominant poses, bondage aesthetics'
  },

  wardrobeCollection: [
    {
      id: 'leather-harness-minimal',
      name: 'Leather Harness Dominant',
      description: 'Strategic leather harness with minimal coverage, power aesthetic with bold dominant reveals',
      coverage: 'minimal-leather',
      intimacyLevel: 10,
      style: 'Dominant leather minimal',
      materials: 'Premium black leather, metal hardware, power design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'leather-corset-minimal',
      name: 'Minimal Leather Corset',
      description: 'Dramatic leather corset with minimal bottom, power dynamics aesthetic with commanding presence',
      coverage: 'minimal-corset',
      intimacyLevel: 10,
      style: 'Corset power minimal',
      materials: 'Structured leather corset, minimal bottom, dramatic hardware',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'leather-chain-minimal',
      name: 'Chain Leather Minimal',
      description: 'Leather and chain combination minimal design, artistic bondage aesthetic with power emphasis',
      coverage: 'minimal-chain-leather',
      intimacyLevel: 10,
      style: 'Chain leather power',
      materials: 'Black leather, metal chains, power dynamics design',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'leather-standing-dominant',
      poseName: 'Standing Dominant Power',
      description: 'Powerful standing pose with commanding presence, dominant confidence, leather aesthetic',
      aspectRatio: '4:5',
      framing: 'Full body emphasizing power presence'
    },
    {
      id: 'leather-throne-sitting',
      poseName: 'Throne Sitting Command',
      description: 'Sitting on throne-like chair with dominant posture, commanding presence, power aesthetics',
      aspectRatio: '4:5',
      framing: 'Seated power angle'
    },
    {
      id: 'leather-whip-holding',
      poseName: 'Whip Holding Dominance',
      description: 'Holding whip with confident dominant pose, power dynamics emphasized, commanding beauty',
      aspectRatio: '4:5',
      framing: 'Dynamic dominant framing'
    },
    {
      id: 'leather-chains-artistic',
      poseName: 'Artistic Chain Positioning',
      description: 'Artistic positioning with chains as props, power dynamics aesthetic, dominant confidence',
      aspectRatio: '4:5',
      framing: 'Artistic angle with chain elements'
    }
  ],

  environments: [
    {
      id: 'dungeon-luxury',
      name: 'Luxury Dungeon Suite',
      description: 'Upscale dungeon setting with leather furniture, dramatic lighting, power dynamics atmosphere',
      atmosphere: 'Luxury power exchange with dramatic presence',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Dramatic high-contrast lighting with deep shadows',
      materialPalette: ['Black leather furniture', 'Metal fixtures', 'Dramatic lighting', 'Power props']
    },
    {
      id: 'industrial-space',
      name: 'Industrial Power Space',
      description: 'Industrial loft with chains, leather elements, dramatic urban atmosphere',
      atmosphere: 'Urban power dynamics with industrial edge',
      privacyLevel: 10,
      luxuryLevel: 7,
      lightingProfile: 'Harsh industrial lighting with dramatic shadows',
      materialPalette: ['Exposed brick', 'Metal chains', 'Industrial elements', 'Urban grit']
    }
  ]
};

// ============================================================================
// MODEL 23: SECRETARY/OFFICE SPECIALIST
// ============================================================================

export const MODEL_SECRETARY_FANTASY = {
  id: 'erotic-model-023',
  name: 'Priyanka Professional',
  category: 'Secretary & Office Fantasy Specialist',
  emphasis: 'Corporate seduction, desk encounters, professional attire reveals, office scenarios',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.FANTASY_AUTEUR,

  physicalTraits: {
    height: '5\'8"',
    figure: 'Professional hourglass with corporate elegance',
    bust: '38DD"',
    waist: '27"',
    hips: '39"',
    emphasis: 'Professional curves with corporate seduction and office confidence',
    skinTone: 'Warm caramel with professional polish',
    features: 'Intelligent eyes with glasses, professional beauty, seductive confidence',
    fitness: 'Toned professional with elegant business curves',
    specialties: 'Office scenarios, professional attire, corporate seduction, desk photography'
  },

  wardrobeCollection: [
    {
      id: 'office-unbuttoned-minimal',
      name: 'Unbuttoned Office Minimal',
      description: 'Professional blouse unbuttoned revealing minimal lace beneath, corporate seduction with strategic office reveals',
      coverage: 'minimal-office',
      intimacyLevel: 10,
      style: 'Corporate seduction minimal',
      materials: 'Professional blouse open, minimal lace beneath, office aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'office-pencil-minimal',
      name: 'Minimal Pencil Skirt',
      description: 'Ultra-short pencil skirt with professional top partially open, corporate boldness with office sensuality',
      coverage: 'minimal-corporate',
      intimacyLevel: 10,
      style: 'Office bold minimal',
      materials: 'Short pencil skirt, open blouse, professional aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'office-lingerie-business',
      name: 'Business Lingerie Reveal',
      description: 'Professional blazer with minimal lingerie beneath, corporate confidence with bold office reveals',
      coverage: 'minimal-business',
      intimacyLevel: 10,
      style: 'Business lingerie minimal',
      materials: 'Professional blazer, minimal lingerie, corporate seduction',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'office-desk-sitting',
      poseName: 'Desk Sitting Seduction',
      description: 'Sitting on desk edge with legs crossed, professional seduction, corporate confidence',
      aspectRatio: '4:5',
      framing: 'Office desk setting emphasizing curves'
    },
    {
      id: 'office-leaning-forward',
      poseName: 'Desk Leaning Professional',
      description: 'Leaning over desk with professional reveal, corporate seduction, office confidence',
      aspectRatio: '4:5',
      framing: 'Over desk angle emphasizing professional curves'
    },
    {
      id: 'office-standing-professional',
      poseName: 'Standing Professional Command',
      description: 'Standing in office with professional confidence, corporate seduction, commanding presence',
      aspectRatio: '4:5',
      framing: 'Office setting with professional elegance'
    },
    {
      id: 'office-chair-recline',
      poseName: 'Office Chair Recline',
      description: 'Reclined in office chair with professional seduction, corporate confidence, desk setting',
      aspectRatio: '4:5',
      framing: 'Office chair setting'
    }
  ],

  environments: [
    {
      id: 'executive-office',
      name: 'Executive Office Suite',
      description: 'Luxury executive office with desk, leather furniture, floor-to-ceiling windows, corporate elegance',
      atmosphere: 'Corporate seduction with executive luxury',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Dramatic desk lamp with city lights ambiance',
      materialPalette: ['Executive desk', 'Leather chair', 'City windows', 'Corporate luxury']
    },
    {
      id: 'conference-room',
      name: 'Private Conference Room',
      description: 'Boardroom with large table, dramatic lighting, professional corporate atmosphere',
      atmosphere: 'Corporate power with boardroom seduction',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Overhead corporate lighting with dramatic shadows',
      materialPalette: ['Conference table', 'Executive chairs', 'Glass walls', 'Corporate decor']
    }
  ]
};

// ============================================================================
// MODEL 24: NURSE/MEDICAL FANTASY SPECIALIST
// ============================================================================

export const MODEL_NURSE_FANTASY = {
  id: 'erotic-model-024',
  name: 'Nurse Naina',
  category: 'Nurse & Medical Fantasy Specialist',
  emphasis: 'Clinical chic, white aesthetics, medical scenarios, caring sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.FANTASY_AUTEUR,

  physicalTraits: {
    height: '5\'7"',
    figure: 'Caring hourglass with medical elegance',
    bust: '36D"',
    waist: '26"',
    hips: '38"',
    emphasis: 'Caring curves with medical fantasy and clinical confidence',
    skinTone: 'Fair complexion with healthy glow',
    features: 'Caring compassionate eyes, gentle smile, medical beauty',
    fitness: 'Toned caring with feminine medical curves',
    specialties: 'Medical scenarios, clinical aesthetics, caring poses, white sensuality'
  },

  wardrobeCollection: [
    {
      id: 'nurse-minimal-uniform',
      name: 'Minimal Nurse Uniform',
      description: 'Ultra-short nurse uniform with strategic reveals, medical fantasy aesthetic with bold minimal coverage',
      coverage: 'minimal-medical',
      intimacyLevel: 10,
      style: 'Medical fantasy minimal',
      materials: 'White medical fabric, minimal uniform, fantasy design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'nurse-lingerie-medical',
      name: 'Medical Lingerie White',
      description: 'White lingerie with medical accessories, clinical fantasy with sensual minimal coverage',
      coverage: 'minimal-clinical',
      intimacyLevel: 10,
      style: 'Clinical lingerie minimal',
      materials: 'White lingerie, medical props, fantasy aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'nurse-lab-coat-minimal',
      name: 'Lab Coat Minimal Reveal',
      description: 'White lab coat worn open revealing minimal white lingerie, medical fantasy with bold reveals',
      coverage: 'minimal-lab-coat',
      intimacyLevel: 10,
      style: 'Lab coat fantasy minimal',
      materials: 'White lab coat open, minimal beneath, medical aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'nurse-standing-caring',
      poseName: 'Standing Caring Nurse',
      description: 'Standing with caring confident pose, medical fantasy aesthetic, gentle sensual presence',
      aspectRatio: '4:5',
      framing: 'Medical setting emphasizing caring curves'
    },
    {
      id: 'nurse-leaning-exam',
      poseName: 'Exam Table Leaning',
      description: 'Leaning over exam table, medical fantasy, caring sensuality with clinical confidence',
      aspectRatio: '4:5',
      framing: 'Clinical setting with caring angle'
    },
    {
      id: 'nurse-sitting-edge',
      poseName: 'Exam Table Sitting',
      description: 'Sitting on exam table edge, medical fantasy confidence, caring sensual presence',
      aspectRatio: '4:5',
      framing: 'Medical table setting'
    },
    {
      id: 'nurse-stethoscope-pose',
      poseName: 'Stethoscope Medical Fantasy',
      description: 'Holding stethoscope with caring confidence, medical fantasy aesthetic, gentle sensuality',
      aspectRatio: '4:5',
      framing: 'Close medical prop framing'
    }
  ],

  environments: [
    {
      id: 'private-clinic',
      name: 'Private Clinic Room',
      description: 'Clean private medical room with exam table, medical equipment, clinical atmosphere',
      atmosphere: 'Clinical fantasy with private care',
      privacyLevel: 10,
      luxuryLevel: 7,
      lightingProfile: 'Clean clinical lighting with soft medical ambiance',
      materialPalette: ['Medical equipment', 'White surfaces', 'Clinical décor', 'Exam table']
    },
    {
      id: 'luxury-medical-spa',
      name: 'Luxury Medical Spa',
      description: 'Upscale medical spa with luxury aesthetics, clean white design, spa-medical fusion',
      atmosphere: 'Luxury medical care with spa elegance',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Soft luxury lighting with clinical cleanliness',
      materialPalette: ['Luxury spa elements', 'Medical aesthetics', 'White luxury', 'Premium furnishings']
    }
  ]
};

// ============================================================================
// MODEL 25: MAID/SERVICE FANTASY SPECIALIST
// ============================================================================

export const MODEL_MAID_FANTASY = {
  id: 'erotic-model-025',
  name: 'Maid Meera',
  category: 'Maid & Service Fantasy Specialist',
  emphasis: 'French maid aesthetics, service roles, domestic scenarios, playful sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.FANTASY_AUTEUR,

  physicalTraits: {
    height: '5\'6"',
    figure: 'Petite hourglass with playful curves',
    bust: '36D"',
    waist: '25"',
    hips: '37"',
    emphasis: 'Playful curves with service fantasy and maid confidence',
    skinTone: 'Warm honey with playful glow',
    features: 'Playful flirty eyes, mischievous smile, service beauty',
    fitness: 'Petite toned with feminine playful curves',
    specialties: 'Maid scenarios, service poses, domestic fantasy, playful sensuality'
  },

  wardrobeCollection: [
    {
      id: 'maid-french-minimal',
      name: 'French Maid Minimal',
      description: 'Ultra-short French maid outfit with minimal coverage, service fantasy with bold playful reveals',
      coverage: 'minimal-maid',
      intimacyLevel: 10,
      style: 'French maid minimal',
      materials: 'Black and white maid uniform, minimal coverage, playful design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'maid-apron-minimal',
      name: 'Minimal Apron Service',
      description: 'Tiny apron with minimal lingerie beneath, service fantasy aesthetic with maximum reveals',
      coverage: 'minimal-apron',
      intimacyLevel: 10,
      style: 'Apron service minimal',
      materials: 'Tiny apron, minimal lingerie, service fantasy design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'maid-lace-uniform',
      name: 'Lace Maid Fantasy',
      description: 'Lace maid uniform with minimal coverage, playful service aesthetic with bold sensual design',
      coverage: 'minimal-lace-maid',
      intimacyLevel: 10,
      style: 'Lace maid fantasy',
      materials: 'Black lace uniform, minimal coverage, fantasy maid aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'maid-bending-over',
      poseName: 'Bending Service Pose',
      description: 'Bending over as if cleaning, service fantasy with playful curves emphasized, mischievous confidence',
      aspectRatio: '4:5',
      framing: 'Domestic setting emphasizing playful curves'
    },
    {
      id: 'maid-dusting-reach',
      poseName: 'Reaching Up Service',
      description: 'Reaching up with duster, service fantasy, curves emphasized with playful maid confidence',
      aspectRatio: '4:5',
      framing: 'Reaching angle with domestic props'
    },
    {
      id: 'maid-serving-tray',
      poseName: 'Serving Tray Pose',
      description: 'Holding serving tray with service confidence, maid fantasy aesthetic, playful sensual presence',
      aspectRatio: '4:5',
      framing: 'Service pose with maid elegance'
    },
    {
      id: 'maid-kneeling-clean',
      poseName: 'Kneeling Service Position',
      description: 'Kneeling as if cleaning, service fantasy, playful curves emphasized with maid confidence',
      aspectRatio: '4:5',
      framing: 'Kneeling domestic angle'
    }
  ],

  environments: [
    {
      id: 'luxury-mansion',
      name: 'Luxury Mansion Interior',
      description: 'Upscale mansion with elegant furnishings, luxury domestic atmosphere, service fantasy setting',
      atmosphere: 'Luxury domestic service with elegant surroundings',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Elegant mansion lighting with warm luxury ambiance',
      materialPalette: ['Luxury furniture', 'Elegant decor', 'Premium surfaces', 'Mansion elegance']
    },
    {
      id: 'penthouse-suite',
      name: 'Penthouse Suite Service',
      description: 'Modern penthouse with floor-to-ceiling windows, luxury service atmosphere, urban elegance',
      atmosphere: 'Modern luxury service with city views',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Modern luxury lighting with city backdrop',
      materialPalette: ['Modern furnishings', 'Glass windows', 'Urban luxury', 'Penthouse elegance']
    }
  ]
};

// ============================================================================
// MODEL 26: TEACHER/AUTHORITY SPECIALIST
// ============================================================================

export const MODEL_TEACHER_AUTHORITY = {
  id: 'erotic-model-026',
  name: 'Professor Pooja',
  category: 'Teacher & Authority Fantasy Specialist',
  emphasis: 'Glasses elegance, desk authority, educational scenarios, intellectual sensuality',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.FANTASY_AUTEUR,

  physicalTraits: {
    height: '5\'9"',
    figure: 'Intellectual hourglass with authoritative elegance',
    bust: '38D"',
    waist: '26"',
    hips: '38"',
    emphasis: 'Intellectual curves with authoritative presence and teacher confidence',
    skinTone: 'Warm caramel with intellectual glow',
    features: 'Intelligent eyes with glasses, authoritative beauty, seductive wisdom',
    fitness: 'Toned intellectual with elegant authoritative curves',
    specialties: 'Teacher scenarios, desk authority, intellectual poses, educational fantasy'
  },

  wardrobeCollection: [
    {
      id: 'teacher-professional-minimal',
      name: 'Professional Teacher Minimal',
      description: 'Professional outfit with strategic reveals, teacher fantasy with authoritative bold coverage',
      coverage: 'minimal-professional',
      intimacyLevel: 10,
      style: 'Teacher authority minimal',
      materials: 'Professional attire partially open, minimal beneath, authority aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'teacher-skirt-minimal',
      name: 'Minimal Teacher Skirt',
      description: 'Short pencil skirt with professional top partially unbuttoned, teacher fantasy with bold reveals',
      coverage: 'minimal-authority',
      intimacyLevel: 10,
      style: 'Authority skirt minimal',
      materials: 'Short skirt, unbuttoned blouse, professional seduction',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'teacher-lingerie-blazer',
      name: 'Blazer Lingerie Authority',
      description: 'Professional blazer with minimal lingerie beneath, intellectual fantasy with authoritative reveals',
      coverage: 'minimal-intellectual',
      intimacyLevel: 10,
      style: 'Intellectual lingerie minimal',
      materials: 'Professional blazer, minimal lingerie, authority aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'teacher-desk-leaning',
      poseName: 'Desk Leaning Authority',
      description: 'Leaning back against desk with authoritative confidence, teacher fantasy, intellectual sensuality',
      aspectRatio: '4:5',
      framing: 'Classroom desk setting with authority'
    },
    {
      id: 'teacher-blackboard-pointing',
      poseName: 'Blackboard Authority Pose',
      description: 'Pointing at blackboard with authoritative presence, teacher fantasy, intellectual confidence',
      aspectRatio: '4:5',
      framing: 'Classroom setting with educational props'
    },
    {
      id: 'teacher-sitting-desk',
      poseName: 'Desk Sitting Professional',
      description: 'Sitting on desk with crossed legs, teacher authority, intellectual sensual confidence',
      aspectRatio: '4:5',
      framing: 'Desk sitting with authority angle'
    },
    {
      id: 'teacher-glasses-adjustment',
      poseName: 'Glasses Adjustment Intellectual',
      description: 'Adjusting glasses with intellectual confidence, teacher fantasy aesthetic, authoritative beauty',
      aspectRatio: '4:5',
      framing: 'Close framing with glasses emphasis'
    }
  ],

  environments: [
    {
      id: 'private-classroom',
      name: 'Private Classroom After Hours',
      description: 'Empty classroom with desk, blackboard, educational atmosphere, after-hours privacy',
      atmosphere: 'Educational fantasy with after-hours intimacy',
      privacyLevel: 10,
      luxuryLevel: 7,
      lightingProfile: 'Classroom lighting with after-hours mood',
      materialPalette: ['Teacher desk', 'Blackboard', 'Classroom furniture', 'Educational props']
    },
    {
      id: 'university-office',
      name: 'Professor Office Suite',
      description: 'Private university office with bookshelves, desk, intellectual atmosphere, academic luxury',
      atmosphere: 'Academic authority with intellectual elegance',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Warm office lighting with academic ambiance',
      materialPalette: ['Bookshelves', 'Professor desk', 'Academic decor', 'Office elegance']
    }
  ]
};

// ============================================================================
// MODEL 27: BRIDE/WEDDING NIGHT SPECIALIST
// ============================================================================

export const MODEL_BRIDE_FANTASY = {
  id: 'erotic-model-027',
  name: 'Bride Rhea',
  category: 'Bride & Wedding Night Specialist',
  emphasis: 'Bridal lingerie, wedding night, romantic luxury, virginal elegance',
  personalPhotographer: PHOTOGRAPHERS_EXPANDED.BOUDOIR_MASTER,

  physicalTraits: {
    height: '5\'7"',
    figure: 'Romantic hourglass with bridal elegance',
    bust: '36D"',
    waist: '25"',
    hips: '38"',
    emphasis: 'Romantic curves with bridal elegance and wedding night confidence',
    skinTone: 'Luminous fair with bridal glow',
    features: 'Romantic dreamy eyes, soft sensual lips, bridal beauty',
    fitness: 'Soft elegant curves with romantic bridal femininity',
    specialties: 'Wedding night scenarios, bridal lingerie, romantic poses, virginal fantasy'
  },

  wardrobeCollection: [
    {
      id: 'bride-white-lingerie',
      name: 'White Bridal Lingerie',
      description: 'Delicate white bridal lingerie with lace and minimal coverage, wedding night aesthetic with romantic reveals',
      coverage: 'minimal-bridal',
      intimacyLevel: 10,
      style: 'Bridal romantic minimal',
      materials: 'White lace bridal lingerie, minimal coverage, romantic design',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'bride-veil-minimal',
      name: 'Veil and Minimal White',
      description: 'Wedding veil with minimal white lingerie, bridal fantasy with innocent sensual reveals',
      coverage: 'minimal-veil',
      intimacyLevel: 10,
      style: 'Veil bridal minimal',
      materials: 'Wedding veil, minimal white lingerie, bridal aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    },
    {
      id: 'bride-silk-robe-minimal',
      name: 'Bridal Silk Robe Open',
      description: 'White silk bridal robe worn open revealing minimal white lingerie, wedding night elegance with romantic reveals',
      coverage: 'minimal-bridal-robe',
      intimacyLevel: 10,
      style: 'Bridal robe minimal',
      materials: 'White silk robe, minimal lingerie, romantic wedding aesthetic',
      fluxOptimized: true,
      imagenOptimized: true
    }
  ],

  poseGallery: [
    {
      id: 'bride-bed-sitting',
      poseName: 'Bridal Bed Sitting',
      description: 'Sitting on bed in bridal lingerie, wedding night confidence, romantic innocent sensuality',
      aspectRatio: '4:5',
      framing: 'Bedroom bridal setting'
    },
    {
      id: 'bride-veil-portrait',
      poseName: 'Veil Portrait Bride',
      description: 'Portrait with wedding veil, bridal beauty, romantic innocent confidence with sensual elegance',
      aspectRatio: '4:5',
      framing: 'Close bridal portrait with veil'
    },
    {
      id: 'bride-window-silhouette',
      poseName: 'Bridal Window Silhouette',
      description: 'Standing by window in bridal lingerie, romantic silhouette, wedding night elegance',
      aspectRatio: '4:5',
      framing: 'Silhouette with romantic lighting'
    },
    {
      id: 'bride-bed-reclined',
      poseName: 'Reclined Bridal Romance',
      description: 'Reclined on bed in white bridal lingerie, wedding night sensuality, romantic innocent confidence',
      aspectRatio: '4:5',
      framing: 'Bedroom reclined with bridal elegance'
    }
  ],

  environments: [
    {
      id: 'honeymoon-suite',
      name: 'Luxury Honeymoon Suite',
      description: 'Opulent honeymoon suite with romantic lighting, rose petals, silk sheets, wedding night atmosphere',
      atmosphere: 'Romantic wedding night with luxury intimacy',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Soft romantic lighting with candlelight glow',
      materialPalette: ['Silk sheets', 'Rose petals', 'Romantic candles', 'Luxury honeymoon furnishings']
    },
    {
      id: 'villa-bridal-suite',
      name: 'Villa Bridal Suite',
      description: 'Private villa suite with ocean views, romantic atmosphere, wedding night luxury',
      atmosphere: 'Destination wedding night with romantic luxury',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'Romantic evening light with soft intimate ambiance',
      materialPalette: ['Ocean views', 'Luxury bedding', 'Romantic decor', 'Villa elegance']
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const EROTIC_GLAMOUR_MODELS_EXPANDED = [
  MODEL_BOUDOIR_INTIMACY,
  MODEL_WET_GODDESS,
  MODEL_DANCE_SEDUCTRESS,
  MODEL_SPA_SERENITY,
  MODEL_POOL_GODDESS,
  MODEL_YOGA_FLEXIBILITY,
  MODEL_POWER_DYNAMICS,
  MODEL_SECRETARY_FANTASY,
  MODEL_NURSE_FANTASY,
  MODEL_MAID_FANTASY,
  MODEL_TEACHER_AUTHORITY,
  MODEL_BRIDE_FANTASY
];
