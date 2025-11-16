import type { GlamourModel, Photographer, ModelEnvironment, ModelWardrobe, ModelPose } from './types';

/**
 * PLATINUM COLLECTION FOR VERA MODE
 * 10 Premium Model Variants - Adapted from platinum/platinumCollections.ts
 * Optimized for Evening/Midnight Seductive Photography
 *
 * Variants:
 * 1. Midnight Seductress - Classic evening elegance
 * 2. Fitness Bombshell - Athletic curves & lower body focus
 * 3. Graphic Editorial Queen - Nude art expert & maximum curves
 * 4. Private Boudoir Vixen - Intimate roleplay specialist
 * 5. Luxury Lounge Goddess - Penthouse sophistication
 * 6. Spa/Tub Temptress - Water photography specialist
 * 7. Rooftop Midnight Muse - Urban night seduction
 * 8. Hotel Suite Siren - Travel luxury encounters
 * 9. Underground Club Provocateur - Late night party neon vibes
 * 10. Art Studio Midnight - Creative artistic nude
 */

// ============================================================================
// PLATINUM PHOTOGRAPHERS
// ============================================================================

export const PLATINUM_PHOTOGRAPHERS: Record<string, Photographer> = {
  MARCO_NOIR: {
    name: 'Marco Noir',
    specialty: 'Evening seduction and intimate midnight sessions',
    style: 'Classic erotic elegance with midnight sophistication',
    intimacy: 10,
    lightingSignature: 'Dramatic low-key lighting with warm amber accents creating intimate midnight atmosphere',
    cameraPreference: '85mm f/1.4 for intimate portraits, 50mm f/1.2 for environmental seduction',
    compositionStyle: 'Close intimate framing emphasizing curves and seductive expression',
    intimacyApproach: 'Maximum intimacy with elegant seductive focus',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  VIKTOR_SCULPT: {
    name: 'Viktor Sculpt',
    specialty: 'Fitness photography with lower body focus and athletic sensuality',
    style: 'Athletic glamour with curve emphasis and fitness seduction',
    intimacy: 10,
    lightingSignature: 'Dramatic rim lighting emphasizing muscular definition and curves',
    cameraPreference: '70-200mm f/2.8 for curve emphasis, wide apertures for isolation',
    compositionStyle: 'Dynamic angles showcasing athletic physique and sculpted lower body',
    intimacyApproach: 'Athletic confidence with curve-focused seductive energy',
    fluxSettings: { safetyTolerance: 4, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  ALEJANDRO_PROVOCATEUR: {
    name: 'Alejandro Provocateur',
    specialty: 'Maximum curves emphasis with avant-garde erotic editorial',
    style: 'Graphic editorial with bold nude art and erotic movie cinematography',
    intimacy: 10,
    lightingSignature: 'High-contrast dramatic lighting with sculptural shadows on curves',
    cameraPreference: '50mm f/1.2 for cinematic depth, 85mm f/1.4 for curve detail',
    compositionStyle: 'Bold graphic framing emphasizing maximum curves with cinematic composition',
    intimacyApproach: 'Explicit artistic with bold erotic movie aesthetic',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  PIERRE_INTIME: {
    name: 'Pierre Intime',
    specialty: 'Private bedroom sessions with roleplay and intimate seduction',
    style: 'Intimate boudoir with romantic seductive atmosphere',
    intimacy: 10,
    lightingSignature: 'Soft warm lighting creating intimate romantic atmosphere',
    cameraPreference: '85mm f/1.4 for intimate portraits, 50mm f/1.2 for environmental intimacy',
    compositionStyle: 'Close intimate framing with romantic bedroom composition',
    intimacyApproach: 'Maximum intimate connection with romantic erotic focus',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  SEBASTIAN_LUXE: {
    name: 'Sebastian Luxe',
    specialty: 'High-end lounge photography with sophisticated intimate focus',
    style: 'Luxury sophistication with penthouse seduction and curve emphasis',
    intimacy: 10,
    lightingSignature: 'Soft luxury lighting with warm highlights on curves',
    cameraPreference: '50mm f/1.2 for environmental luxury, 85mm f/1.8 for intimate details',
    compositionStyle: 'Elegant environmental compositions showcasing luxury and curves',
    intimacyApproach: 'Sophisticated seduction with luxury curve emphasis',
    fluxSettings: { safetyTolerance: 4, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  AQUA_SENSUELLE: {
    name: 'Aqua Sensuelle',
    specialty: 'Tub and spa photography with wet fabric and water aesthetics',
    style: 'Water photography with wet elegance and spa seduction',
    intimacy: 10,
    lightingSignature: 'Soft diffused lighting with water reflections and steam atmosphere',
    cameraPreference: '85mm f/1.8 for wet portraits, macro for water detail',
    compositionStyle: 'Close intimate water compositions emphasizing wet curves',
    intimacyApproach: 'Intimate water photography with wet seductive focus',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  URBAN_NOIR: {
    name: 'Urban Noir',
    specialty: 'Rooftop midnight sessions with cityscape and urban elegance',
    style: 'Urban night photography with city seduction and midnight atmosphere',
    intimacy: 10,
    lightingSignature: 'City lights and ambient urban glow creating midnight atmosphere',
    cameraPreference: '35mm f/1.4 for environmental night, 85mm f/1.8 for intimate urban',
    compositionStyle: 'Environmental urban compositions with cityscape backdrop',
    intimacyApproach: 'Sophisticated urban seduction with night mystery',
    fluxSettings: { safetyTolerance: 4, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  VOYAGEUR_INTIME: {
    name: 'Voyageur Intime',
    specialty: 'Suite intimacy and hotel encounter photography',
    style: 'Hotel luxury photography with travel seduction and private encounters',
    intimacy: 10,
    lightingSignature: 'Soft hotel lighting with intimate travel atmosphere',
    cameraPreference: '50mm f/1.2 for hotel environments, 85mm f/1.4 for intimate portraits',
    compositionStyle: 'Hotel environmental compositions with intimate encounter focus',
    intimacyApproach: 'Private hotel seduction with travel elegance',
    fluxSettings: { safetyTolerance: 4, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  NEON_PROVOCATEUR: {
    name: 'Neon Provocateur',
    specialty: 'Club and party photography with UV and neon lighting',
    style: 'Underground club photography with neon vibes and late night seduction',
    intimacy: 10,
    lightingSignature: 'Neon and UV lighting creating vibrant late night atmosphere',
    cameraPreference: '35mm f/1.4 for club environments, fast shutter for party dynamics',
    compositionStyle: 'Dynamic club compositions with neon accents and party energy',
    intimacyApproach: 'Bold late night seduction with underground energy',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.5 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  ATELIER_MIDNIGHT: {
    name: 'Atelier Midnight',
    specialty: 'Studio art nude with provocateur aesthetic and creative intimacy',
    style: 'Artistic nude photography with creative midnight sessions and bold expression',
    intimacy: 10,
    lightingSignature: 'Dramatic studio lighting with artistic shadows for nude photography',
    cameraPreference: '85mm f/1.4 for nude art, 50mm f/1.2 for creative compositions',
    compositionStyle: 'Creative artistic compositions emphasizing form and provocateur expression',
    intimacyApproach: 'Artistic explicit with creative midnight focus',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  }
};

// ============================================================================
// PLATINUM ENVIRONMENTS
// ============================================================================

const PLATINUM_ENVIRONMENTS: Record<string, ModelEnvironment[]> = {
  MIDNIGHT_BEDROOM: [
    {
      id: 'midnight-bedroom',
      name: 'Midnight Bedroom Suite',
      description: 'Luxury bedroom with silk sheets, dramatic lighting, intimate midnight atmosphere',
      atmosphere: 'Intimate seductive with classic elegance',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Warm amber bedside lighting with dramatic shadows',
      materialPalette: ['Silk sheets', 'Velvet drapes', 'Warm wood furnishings']
    }
  ],
  PRIVATE_GYM: [
    {
      id: 'private-gym',
      name: 'Private Luxury Gym',
      description: 'High-end private gym with dramatic lighting for fitness glamour photography',
      atmosphere: 'Athletic confidence with seductive energy',
      privacyLevel: 9,
      luxuryLevel: 8,
      lightingProfile: 'Dramatic contrast lighting emphasizing athletic form',
      materialPalette: ['Polished steel equipment', 'Leather benches', 'Mirrored walls']
    }
  ],
  NOIR_STUDIO: [
    {
      id: 'noir-studio',
      name: 'Film Noir Studio',
      description: 'Cinematic studio with dramatic lighting for graphic editorial nude art',
      atmosphere: 'Bold erotic movie aesthetic with graphic editorial intensity',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'High-contrast noir lighting with dramatic shadows',
      materialPalette: ['Black seamless backdrop', 'Dramatic spotlights', 'Minimalist props']
    }
  ],
  PRIVATE_BOUDOIR: [
    {
      id: 'private-boudoir',
      name: 'Private Boudoir Suite',
      description: 'Intimate bedroom with luxury linens and romantic lighting for private sessions',
      atmosphere: 'Private intimate with roleplay seduction',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Soft warm bedside lighting with romantic shadows',
      materialPalette: ['Silk and satin linens', 'Soft textiles', 'Romantic candlelight']
    }
  ],
  PENTHOUSE_LOUNGE: [
    {
      id: 'penthouse-lounge',
      name: 'Penthouse Lounge',
      description: 'Luxury penthouse lounge with city views and sophisticated atmosphere',
      atmosphere: 'Sophisticated seduction with penthouse elegance',
      privacyLevel: 9,
      luxuryLevel: 10,
      lightingProfile: 'Warm ambient luxury lighting with city glow',
      materialPalette: ['Leather furniture', 'Marble surfaces', 'Floor-to-ceiling windows']
    }
  ],
  LUXURY_SPA: [
    {
      id: 'luxury-spa',
      name: 'Private Luxury Spa',
      description: 'High-end private spa with soaking tub and steam for water photography',
      atmosphere: 'Intimate spa seduction with wet temptress aesthetic',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Soft diffused spa lighting with water reflections',
      materialPalette: ['Marble surfaces', 'Water features', 'Soft towels']
    }
  ],
  ROOFTOP_TERRACE: [
    {
      id: 'rooftop-terrace',
      name: 'Private Rooftop Terrace',
      description: 'Luxury rooftop with city views for urban midnight photography',
      atmosphere: 'Urban night seduction with cityscape mystery',
      privacyLevel: 8,
      luxuryLevel: 9,
      lightingProfile: 'City ambient lighting with dramatic urban night atmosphere',
      materialPalette: ['Modern outdoor furniture', 'Glass railings', 'Urban skyline']
    }
  ],
  HOTEL_SUITE: [
    {
      id: 'hotel-suite',
      name: 'Luxury Hotel Suite',
      description: 'Five-star hotel suite with luxury amenities for private photography',
      atmosphere: 'Private hotel seduction with travel encounter elegance',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'Warm hotel lighting with intimate travel atmosphere',
      materialPalette: ['Luxury linens', 'Modern furniture', 'Hotel amenities']
    }
  ],
  VIP_CLUB: [
    {
      id: 'vip-club',
      name: 'VIP Underground Club',
      description: 'Private VIP section of underground club with neon and UV lighting',
      atmosphere: 'Bold late night club seduction with underground energy',
      privacyLevel: 7,
      luxuryLevel: 8,
      lightingProfile: 'Vibrant neon and UV lighting with late night club atmosphere',
      materialPalette: ['Neon lights', 'Dark surfaces', 'UV reactive elements']
    }
  ],
  MIDNIGHT_STUDIO: [
    {
      id: 'midnight-studio',
      name: 'Midnight Art Studio',
      description: 'Private art studio for midnight creative sessions and nude photography',
      atmosphere: 'Creative artistic with midnight provocateur energy',
      privacyLevel: 10,
      luxuryLevel: 8,
      lightingProfile: 'Dramatic studio lighting for artistic nude and creative midnight work',
      materialPalette: ['Art supplies', 'Dramatic backdrops', 'Studio lighting equipment']
    }
  ]
};

// ============================================================================
// SEDUCTIVE POSE GALLERY (Shared across platinum variants)
// ============================================================================

const SEDUCTIVE_POSES: ModelPose[] = [
  {
    id: 'seductive-recline',
    name: 'Seductive Recline',
    description: 'Reclining on silk sheets with arched back, sultry gaze, one hand behind head, curves emphasized',
    aspectRatio: '16:9',
    framing: 'Full body horizontal composition'
  },
  {
    id: 'midnight-silhouette',
    name: 'Midnight Silhouette',
    description: 'Standing silhouette against window with city lights, dramatic curves outlined, looking over shoulder',
    aspectRatio: '9:16',
    framing: 'Full body vertical with dramatic lighting'
  },
  {
    id: 'intimate-close',
    name: 'Intimate Close-Up',
    description: 'Close framing from shoulders to hips, direct seductive eye contact, intimate bedroom lighting',
    aspectRatio: '4:5',
    framing: 'Medium intimate shot'
  },
  {
    id: 'curve-emphasis',
    name: 'Curve Emphasis Pose',
    description: 'Standing with hip thrust, hand on hip accentuating waist-to-hip ratio, confident seductive stance',
    aspectRatio: '9:16',
    framing: 'Full body emphasizing curves'
  },
  {
    id: 'back-arch',
    name: 'Arched Back Seduction',
    description: 'Kneeling with dramatic back arch, looking back over shoulder, spine curve emphasized',
    aspectRatio: '4:5',
    framing: 'Three-quarter back view'
  },
  {
    id: 'seated-elegance',
    name: 'Seated Elegant Seduction',
    description: 'Seated on edge of bed/chair with legs crossed, leaning back on hands, elegant confidence',
    aspectRatio: '4:5',
    framing: 'Medium seated composition'
  }
];

// ============================================================================
// PLATINUM MODEL DEFINITIONS
// ============================================================================

export const MODEL_MIDNIGHT_SEDUCTRESS: GlamourModel = {
  id: 'platinum-001',
  name: 'Midnight Seductress',
  category: 'Classic Erotic Actress',
  emphasis: 'Timeless evening elegance with maximum seductive power, midnight photography specialist',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.MARCO_NOIR,
  physicalTraits: {
    height: '5\'9"',
    figure: 'Voluptuous hourglass with commanding presence',
    bust: '36D',
    waist: '26"',
    hips: '38"',
    emphasis: 'Maximum curves with spectacular décolletage and hourglass silhouette',
    skinTone: 'Warm caramel with radiant glow',
    features: 'Sultry expressive eyes, full lips, captivating magnetic gaze',
    fitness: 'Curvy-fit with soft feminine curves',
    specialties: 'Evening seduction photography, midnight intimate sessions, classic erotic art, silk and lace specialist'
  },
  wardrobeCollection: [
    {
      id: 'midnight-silk-001',
      name: 'Midnight Silk Slip',
      description: 'Bias-cut black silk slip with lace trim, dangerously low neckline, high slit revealing leg',
      coverage: 'minimal-elegant',
      intimacyLevel: 10,
      style: 'Classic midnight seduction',
      materials: 'Black silk charmeuse, French lace trim',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Liquid silk that clings to curves, delicate lace accents'
    },
    {
      id: 'midnight-lace-002',
      name: 'Lace Midnight Bodysuit',
      description: 'Sheer black lace bodysuit with strategic opaque panels, low back, high-cut legs',
      coverage: 'sheer-minimal',
      intimacyLevel: 10,
      style: 'Erotic elegance',
      materials: 'French Chantilly lace, sheer mesh',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Intricate lace patterns with transparent sections'
    }
  ],
  poseGallery: SEDUCTIVE_POSES,
  environments: PLATINUM_ENVIRONMENTS.MIDNIGHT_BEDROOM
};

export const MODEL_FITNESS_BOMBSHELL: GlamourModel = {
  id: 'platinum-002',
  name: 'Fitness Bombshell',
  category: 'Athletic Curves & Lower Body Focus',
  emphasis: 'Athletic fitness model with emphasized curves, sculpted lower body specialist, gym glamour expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.VIKTOR_SCULPT,
  physicalTraits: {
    height: '5\'8"',
    figure: 'Athletic bombshell with sculpted curves and toned lower body',
    bust: '34C',
    waist: '25"',
    hips: '40"',
    emphasis: 'Spectacular hip and thigh curves with prominent athletic posterior, lower body focus',
    skinTone: 'Deep dusky with athletic glow',
    features: 'Strong bone structure, intense eyes, fitness radiance',
    fitness: 'Athletic with powerful sculpted muscles and curves',
    specialties: 'Fitness glamour photography, athletic seduction, lower body emphasis, gym and studio sessions'
  },
  wardrobeCollection: [
    {
      id: 'fitness-sport-001',
      name: 'Athletic Minimal Sports Set',
      description: 'Minimal sports bra and high-cut athletic brief emphasizing curves, performance fabric with strategic cutouts',
      coverage: 'minimal-athletic',
      intimacyLevel: 9,
      style: 'Athletic glamour seduction',
      materials: 'Performance mesh, moisture-wicking fabric, strategic cutouts',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Technical athletic fabrics with curve-hugging fit'
    },
    {
      id: 'fitness-leather-002',
      name: 'Leather Athletic Harness',
      description: 'Black leather harness system with strategic bands emphasizing athletic curves and lower body',
      coverage: 'minimal-harness',
      intimacyLevel: 10,
      style: 'Athletic dominance',
      materials: 'Supple black leather, metal hardware',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Leather straps creating geometric patterns on athletic physique'
    }
  ],
  poseGallery: [
    {
      id: 'fitness-power-stance',
      name: 'Athletic Power Stance',
      description: 'Standing with legs apart, muscles flexed, hands on hips, emphasizing lower body curves and strength',
      aspectRatio: '9:16',
      framing: 'Full body athletic emphasis'
    },
    {
      id: 'fitness-lunge',
      name: 'Seductive Lunge',
      description: 'Deep lunge position emphasizing thigh and glute muscles, looking back over shoulder',
      aspectRatio: '16:9',
      framing: 'Side angle showcasing athletic curves'
    },
    {
      id: 'fitness-floor',
      name: 'Floor Athletic Pose',
      description: 'On hands and knees with back arched, emphasizing posterior and leg curves, intense gaze',
      aspectRatio: '16:9',
      framing: 'Low angle emphasizing lower body'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.PRIVATE_GYM
};

export const MODEL_GRAPHIC_EDITORIAL_QUEEN: GlamourModel = {
  id: 'platinum-003',
  name: 'Graphic Editorial Queen',
  category: 'Nude Art Expert & Erotic Movie Styled',
  emphasis: 'Maximum curves specialist, graphic editorial nude art expert, erotic movie aesthetic',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.ALEJANDRO_PROVOCATEUR,
  physicalTraits: {
    height: '5\'10"',
    figure: 'Statuesque bombshell with maximum curves, editorial nude art physique',
    bust: '38DD',
    waist: '27"',
    hips: '42"',
    emphasis: 'Maximum curves with dramatic bust and hip measurements, editorial nude perfection',
    skinTone: 'Radiant fair to wheatish with flawless finish',
    features: 'Dramatic high cheekbones, full expressive lips, editorial intensity',
    fitness: 'Bombshell physique with soft dramatic curves',
    specialties: 'Graphic nude art photography, editorial maximum curves, erotic cinema aesthetic, avant-garde bold expression'
  },
  wardrobeCollection: [
    {
      id: 'editorial-minimal-001',
      name: 'Avant-Garde Body Jewelry',
      description: 'Minimal gold body chains and geometric jewelry creating graphic patterns, strategic minimal coverage',
      coverage: 'minimal-jewelry',
      intimacyLevel: 10,
      style: 'Avant-garde nude art',
      materials: 'Gold body chains, geometric metal pieces',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Sculptural jewelry creating artistic body emphasis'
    },
    {
      id: 'editorial-graphic-002',
      name: 'Graphic Black Tape Art',
      description: 'Strategic black tape creating bold graphic patterns across maximum curves, erotic art aesthetic',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Erotic movie editorial',
      materials: 'Matte black tape, graphic patterns',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Bold tape patterns emphasizing curves with cinematic flair'
    }
  ],
  poseGallery: [
    {
      id: 'editorial-bold-stance',
      name: 'Bold Editorial Stance',
      description: 'Confident standing pose with dramatic curves on full display, intense editorial expression',
      aspectRatio: '9:16',
      framing: 'Full body editorial composition'
    },
    {
      id: 'editorial-cinematic',
      name: 'Cinematic Nude Pose',
      description: 'Reclining with dramatic lighting emphasizing maximum curves, film noir aesthetic',
      aspectRatio: '16:9',
      framing: 'Cinematic horizontal composition'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.NOIR_STUDIO
};

export const MODEL_PRIVATE_BOUDOIR_VIXEN: GlamourModel = {
  id: 'platinum-004',
  name: 'Private Boudoir Vixen',
  category: 'Intimate Roleplay & Bedroom Specialist',
  emphasis: 'Private boudoir photography expert, intimate roleplay specialist, bedroom seduction master',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.PIERRE_INTIME,
  physicalTraits: {
    height: '5\'7"',
    figure: 'Curvaceous with soft sensual proportions',
    bust: '36C',
    waist: '26"',
    hips: '37"',
    emphasis: 'Balanced curves with soft feminine sensuality, intimate appeal',
    skinTone: 'Soft luminous with intimate glow',
    features: 'Romantic soft features, inviting eyes, sensual lips',
    fitness: 'Curvy-fit with soft natural curves',
    specialties: 'Boudoir photography, intimate roleplay, bedroom seduction, private encounters'
  },
  wardrobeCollection: [
    {
      id: 'boudoir-lace-001',
      name: 'Romantic Lace Set',
      description: 'Delicate ivory lace bralette and matching panty with romantic details, vintage boudoir aesthetic',
      coverage: 'minimal-romantic',
      intimacyLevel: 10,
      style: 'Intimate boudoir romance',
      materials: 'Ivory lace, silk ribbons, delicate details',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Soft lace with romantic feminine details'
    },
    {
      id: 'boudoir-silk-002',
      name: 'Silk Robe & Lingerie',
      description: 'Flowing silk robe worn open over minimal lace lingerie, bedroom intimacy perfection',
      coverage: 'sheer-flowing',
      intimacyLevel: 10,
      style: 'Private bedroom seduction',
      materials: 'Silk charmeuse robe, lace lingerie',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Flowing silk creating intimate bedroom atmosphere'
    }
  ],
  poseGallery: [
    {
      id: 'boudoir-bed-recline',
      name: 'Intimate Bed Recline',
      description: 'Reclining on bed with one knee raised, silk sheets tangled, inviting bedroom gaze',
      aspectRatio: '16:9',
      framing: 'Intimate bedroom horizontal'
    },
    {
      id: 'boudoir-mirror',
      name: 'Mirror Reflection',
      description: 'Looking at reflection in mirror while adjusting lingerie, intimate private moment captured',
      aspectRatio: '4:5',
      framing: 'Creative mirror composition'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.PRIVATE_BOUDOIR
};

export const MODEL_LUXURY_LOUNGE_GODDESS: GlamourModel = {
  id: 'platinum-005',
  name: 'Luxury Lounge Goddess',
  category: 'Penthouse Seduction & Sophisticated Curves',
  emphasis: 'Penthouse luxury specialist, sophisticated curve emphasis, lounge seduction expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.SEBASTIAN_LUXE,
  physicalTraits: {
    height: '5\'9"',
    figure: 'Sophisticated hourglass with luxury presence',
    bust: '36D',
    waist: '27"',
    hips: '39"',
    emphasis: 'Balanced sophisticated curves with luxury presence and elegance',
    skinTone: 'Warm golden with luxurious radiance',
    features: 'Elegant sophisticated features, confident gaze, luxury presence',
    fitness: 'Toned with sophisticated curves',
    specialties: 'Penthouse photography, luxury lounge seduction, sophisticated intimacy, evening elegance'
  },
  wardrobeCollection: [
    {
      id: 'luxury-gown-001',
      name: 'Luxury Silk Gown',
      description: 'Floor-length silk gown with dangerously high slit and plunging neckline, penthouse elegance',
      coverage: 'full-revealing',
      intimacyLevel: 8,
      style: 'Penthouse sophistication',
      materials: 'Premium silk, elegant draping',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Flowing luxury silk with strategic reveals'
    },
    {
      id: 'luxury-lingerie-002',
      name: 'Gold Luxury Lingerie',
      description: 'Premium gold-accented lingerie set with designer details, sophisticated intimate luxury',
      coverage: 'minimal-luxury',
      intimacyLevel: 10,
      style: 'Luxury intimate wear',
      materials: 'Silk with gold accents, premium lace',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Designer luxury lingerie with sophisticated details'
    }
  ],
  poseGallery: [
    {
      id: 'lounge-recline',
      name: 'Luxury Lounge Recline',
      description: 'Reclining on leather lounge furniture with city views, sophisticated sensual confidence',
      aspectRatio: '16:9',
      framing: 'Environmental luxury composition'
    },
    {
      id: 'lounge-window',
      name: 'Penthouse Window Silhouette',
      description: 'Standing at floor-to-ceiling windows with city lights, sophisticated curves silhouetted',
      aspectRatio: '9:16',
      framing: 'Dramatic window silhouette'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.PENTHOUSE_LOUNGE
};

export const MODEL_SPA_TUB_TEMPTRESS: GlamourModel = {
  id: 'platinum-006',
  name: 'Spa & Tub Temptress',
  category: 'Water Photography & Wet Elegance',
  emphasis: 'Water photography specialist, spa and tub seduction, wet aesthetic expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.AQUA_SENSUELLE,
  physicalTraits: {
    height: '5\'8"',
    figure: 'Curvaceous with water photography ideal proportions',
    bust: '36C',
    waist: '26"',
    hips: '38"',
    emphasis: 'Balanced curves perfect for water photography and wet aesthetics',
    skinTone: 'Luminous with water-kissed glow',
    features: 'Sensual features perfect for wet photography, alluring eyes',
    fitness: 'Curvy-fit with soft curves',
    specialties: 'Water photography, spa and tub sessions, wet fabric aesthetics, bath seduction'
  },
  wardrobeCollection: [
    {
      id: 'spa-wet-001',
      name: 'Wet White Fabric',
      description: 'Minimal white fabric that becomes transparent when wet, clinging to curves in water',
      coverage: 'sheer-wet',
      intimacyLevel: 10,
      style: 'Wet water seduction',
      materials: 'Thin white cotton, water-reactive',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Fabric becomes transparent and clings when wet'
    },
    {
      id: 'spa-minimal-002',
      name: 'Spa Minimal Bikini',
      description: 'Ultra-minimal bikini in neutral tones for spa and water photography',
      coverage: 'minimal-spa',
      intimacyLevel: 9,
      style: 'Spa elegance',
      materials: 'Smooth performance fabric, minimal coverage',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Minimal spa bikini emphasizing wet curves'
    }
  ],
  poseGallery: [
    {
      id: 'spa-tub-soak',
      name: 'Tub Soak Seduction',
      description: 'Submerged in luxury tub with shoulders and curves visible, wet hair, steam atmosphere',
      aspectRatio: '16:9',
      framing: 'Water level composition'
    },
    {
      id: 'spa-wet-exit',
      name: 'Wet Exit Pose',
      description: 'Emerging from water with wet fabric clinging to curves, water droplets on skin',
      aspectRatio: '9:16',
      framing: 'Vertical wet aesthetic'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.LUXURY_SPA
};

export const MODEL_ROOFTOP_MIDNIGHT_MUSE: GlamourModel = {
  id: 'platinum-007',
  name: 'Rooftop Midnight Muse',
  category: 'Urban Night Seduction & Cityscape',
  emphasis: 'Urban rooftop specialist, midnight city photography, night seduction expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.URBAN_NOIR,
  physicalTraits: {
    height: '5\'9"',
    figure: 'Statuesque with urban sophistication',
    bust: '36C',
    waist: '27"',
    hips: '38"',
    emphasis: 'Balanced sophisticated curves with urban night appeal',
    skinTone: 'Radiant with urban night glow',
    features: 'Striking features perfect for night photography, mysterious allure',
    fitness: 'Toned athletic elegance',
    specialties: 'Rooftop photography, urban night sessions, cityscape seduction, midnight outdoor'
  },
  wardrobeCollection: [
    {
      id: 'rooftop-leather-001',
      name: 'Urban Leather Minimal',
      description: 'Black leather crop top and high-waisted minimal bottom, urban edge with midnight sophistication',
      coverage: 'minimal-urban',
      intimacyLevel: 9,
      style: 'Urban midnight seduction',
      materials: 'Black leather, urban edge details',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Urban leather with architectural minimal design'
    },
    {
      id: 'rooftop-mesh-002',
      name: 'Midnight Mesh Dress',
      description: 'Sheer black mesh dress revealing strategic minimal underneath, urban night mystery',
      coverage: 'sheer-revealing',
      intimacyLevel: 10,
      style: 'Urban night mystery',
      materials: 'Black mesh, minimal foundation',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Transparent mesh with urban midnight aesthetic'
    }
  ],
  poseGallery: [
    {
      id: 'rooftop-cityscape',
      name: 'Cityscape Silhouette',
      description: 'Standing on rooftop edge with city lights behind, mysterious silhouette, wind-blown hair',
      aspectRatio: '9:16',
      framing: 'Urban environmental portrait'
    },
    {
      id: 'rooftop-lean',
      name: 'Rooftop Railing Lean',
      description: 'Leaning against rooftop railing, city lights creating ambient glow, confident urban seduction',
      aspectRatio: '4:5',
      framing: 'Medium urban night shot'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.ROOFTOP_TERRACE
};

export const MODEL_HOTEL_SUITE_SIREN: GlamourModel = {
  id: 'platinum-008',
  name: 'Hotel Suite Siren',
  category: 'Travel Luxury & Private Encounters',
  emphasis: 'Hotel suite photography specialist, travel seduction, private encounter expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.VOYAGEUR_INTIME,
  physicalTraits: {
    height: '5\'8"',
    figure: 'Seductive traveler with alluring curves',
    bust: '36D',
    waist: '26"',
    hips: '38"',
    emphasis: 'Balanced alluring curves with sophisticated travel elegance',
    skinTone: 'Warm with travel-luxe radiance',
    features: 'Alluring sophisticated features, travel-ready elegance',
    fitness: 'Curvy-fit with soft elegance',
    specialties: 'Hotel photography, travel seduction, suite intimacy, private encounters'
  },
  wardrobeCollection: [
    {
      id: 'hotel-robe-001',
      name: 'Hotel Robe & Lingerie',
      description: 'Luxury hotel robe worn open over minimal lingerie, private encounter aesthetic',
      coverage: 'minimal-hotel',
      intimacyLevel: 10,
      style: 'Hotel suite intimacy',
      materials: 'Premium hotel robe, delicate lingerie',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Flowing robe revealing minimal lingerie beneath'
    },
    {
      id: 'hotel-travel-002',
      name: 'Travel Minimal Chic',
      description: 'Elegant minimal set perfect for hotel suite photography, sophisticated travel seduction',
      coverage: 'minimal-elegant',
      intimacyLevel: 9,
      style: 'Travel luxury',
      materials: 'Silk and lace, travel chic',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Sophisticated travel lingerie with elegant details'
    }
  ],
  poseGallery: [
    {
      id: 'hotel-bed',
      name: 'Hotel Bed Seduction',
      description: 'Reclining on hotel bed with luxury linens, one hand behind head, travel encounter aesthetic',
      aspectRatio: '16:9',
      framing: 'Hotel bedroom composition'
    },
    {
      id: 'hotel-window',
      name: 'Hotel Window View',
      description: 'Standing at hotel window in robe worn open, city or landscape view behind, private moment',
      aspectRatio: '9:16',
      framing: 'Hotel window environmental'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.HOTEL_SUITE
};

export const MODEL_UNDERGROUND_CLUB_PROVOCATEUR: GlamourModel = {
  id: 'platinum-009',
  name: 'Underground Club Provocateur',
  category: 'Late Night Party & Neon Vibes',
  emphasis: 'Underground club specialist, late night party photography, neon seduction expert',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.NEON_PROVOCATEUR,
  physicalTraits: {
    height: '5\'9"',
    figure: 'Bold party presence with striking curves',
    bust: '36C',
    waist: '26"',
    hips: '39"',
    emphasis: 'Balanced striking curves with bold party energy',
    skinTone: 'Radiant under UV and neon lights',
    features: 'Bold striking features perfect for club photography, intense gaze',
    fitness: 'Toned athletic club energy',
    specialties: 'Club photography, neon and UV aesthetics, late night sessions, party seduction'
  },
  wardrobeCollection: [
    {
      id: 'club-neon-001',
      name: 'Neon Minimal Club Wear',
      description: 'UV-reactive minimal clothing with neon accents, bold late night aesthetic',
      coverage: 'minimal-club',
      intimacyLevel: 9,
      style: 'Underground club seduction',
      materials: 'UV-reactive fabric, neon accents',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Neon materials that glow under UV lighting'
    },
    {
      id: 'club-leather-002',
      name: 'Club Leather Minimal',
      description: 'Black leather minimal set with metal hardware, underground party edge',
      coverage: 'minimal-edgy',
      intimacyLevel: 10,
      style: 'Late night provocateur',
      materials: 'Black leather, metal details',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Edgy leather with bold underground aesthetic'
    }
  ],
  poseGallery: [
    {
      id: 'club-dance',
      name: 'Club Dance Move',
      description: 'Dynamic dance pose with arms raised, body in motion, neon lights creating vibrant atmosphere',
      aspectRatio: '9:16',
      framing: 'Dynamic vertical club composition'
    },
    {
      id: 'club-vip',
      name: 'VIP Section Seduction',
      description: 'Seated in VIP booth with neon accent lighting, confident late night energy',
      aspectRatio: '4:5',
      framing: 'Club environmental portrait'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.VIP_CLUB
};

export const MODEL_ART_STUDIO_MIDNIGHT: GlamourModel = {
  id: 'platinum-010',
  name: 'Art Studio Midnight',
  category: 'Creative Midnight & Artistic Nude',
  emphasis: 'Art studio midnight sessions, creative nude photography, artistic provocateur',
  personalPhotographer: PLATINUM_PHOTOGRAPHERS.ATELIER_MIDNIGHT,
  physicalTraits: {
    height: '5\'10"',
    figure: 'Artistic muse with sculptural curves',
    bust: '36D',
    waist: '27"',
    hips: '39"',
    emphasis: 'Balanced sculptural curves perfect for artistic nude photography',
    skinTone: 'Flawless artistic with studio-perfect tone',
    features: 'Artistic striking features, creative intensity, provocateur presence',
    fitness: 'Toned artistic physique',
    specialties: 'Art nude photography, midnight creative sessions, studio provocateur, artistic bold expression'
  },
  wardrobeCollection: [
    {
      id: 'studio-paint-001',
      name: 'Paint-Covered Minimal',
      description: 'Minimal coverage with artistic paint accents, creative studio nude aesthetic',
      coverage: 'minimal-artistic',
      intimacyLevel: 10,
      style: 'Artistic nude provocation',
      materials: 'Minimal fabric, body paint accents',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Artistic minimal with creative paint elements'
    },
    {
      id: 'studio-drape-002',
      name: 'Artistic Fabric Drape',
      description: 'Strategic fabric draping creating artistic nude composition, creative midnight aesthetic',
      coverage: 'minimal-draped',
      intimacyLevel: 10,
      style: 'Studio art nude',
      materials: 'Artistic fabric draping',
      fluxOptimized: true,
      imagenOptimized: true,
      fabricDetails: 'Fabric used as artistic element in nude composition'
    }
  ],
  poseGallery: [
    {
      id: 'studio-canvas',
      name: 'Against Canvas Pose',
      description: 'Standing or reclining against large canvas, body becoming part of art, creative midnight lighting',
      aspectRatio: '4:5',
      framing: 'Artistic studio composition'
    },
    {
      id: 'studio-sculptural',
      name: 'Sculptural Form Pose',
      description: 'Artistic pose emphasizing body as sculpture, dramatic studio lighting creating shadows',
      aspectRatio: '9:16',
      framing: 'Vertical artistic nude'
    },
    ...SEDUCTIVE_POSES
  ],
  environments: PLATINUM_ENVIRONMENTS.MIDNIGHT_STUDIO
};

// ============================================================================
// EXPORTS
// ============================================================================

export const PLATINUM_MODELS: GlamourModel[] = [
  MODEL_MIDNIGHT_SEDUCTRESS,
  MODEL_FITNESS_BOMBSHELL,
  MODEL_GRAPHIC_EDITORIAL_QUEEN,
  MODEL_PRIVATE_BOUDOIR_VIXEN,
  MODEL_LUXURY_LOUNGE_GODDESS,
  MODEL_SPA_TUB_TEMPTRESS,
  MODEL_ROOFTOP_MIDNIGHT_MUSE,
  MODEL_HOTEL_SUITE_SIREN,
  MODEL_UNDERGROUND_CLUB_PROVOCATEUR,
  MODEL_ART_STUDIO_MIDNIGHT
];

export function getPlatinumModelById(id: string): GlamourModel | undefined {
  return PLATINUM_MODELS.find(m => m.id === id);
}

export function getAllPlatinumModels(): GlamourModel[] {
  return PLATINUM_MODELS;
}
