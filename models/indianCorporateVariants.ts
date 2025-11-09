/**
 * INDIAN CORPORATE MODEL VARIANTS
 *
 * Pre-configured model variants based on the successful working template.
 * Each variant maintains the exact prompt structure that has proven to work.
 */

import { CorporatePowerTemplate } from '../services/successTemplateEngine';

export interface IndianCorporateVariant {
  id: string;
  name: string;
  displayName: string;
  description: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  height: string;
  intimacyRange: [number, number];
  powerLevelRange: [number, number];
  specialties: string; // Exact string with proper formatting
  template: CorporatePowerTemplate;
}

/**
 * VARIANT 1: Executive Curves (40DD-26-44)
 * The original working configuration
 */
export const EXECUTIVE_CURVES: IndianCorporateVariant = {
  id: 'executive_curves_40DD-26-44',
  name: 'Executive Curves',
  displayName: 'Executive Curves (40DD-26-44)',
  description: 'The proven working configuration. Exceptionally curvaceous executive presence with dramatic curves and athletic form.',
  measurements: {
    bust: '40DD"',
    waist: '26"',
    hips: '44"'
  },
  height: '5\'7"',
  intimacyRange: [6, 9],
  powerLevelRange: [7, 10],
  specialties: 'modern concept films, private editorial art, and expressive erotic-art photography',
  template: {
    styleDeclaration: 'Corporate power photography in revealing style',
    intimacyLevel: 7,
    powerDynamic: 'submissive',

    modelHeight: '5\'7"',
    modelSpecialties: ['modern concept films', 'private editorial art', 'expressive erotic-art photography'],
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
  }
};

/**
 * VARIANT 2: Creative Director (38DD-28-42)
 * Slightly less dramatic curves, artistic leadership aesthetic
 */
export const CREATIVE_DIRECTOR: IndianCorporateVariant = {
  id: 'creative_director_38DD-28-42',
  name: 'Creative Director',
  displayName: 'Creative Director (38DD-28-42)',
  description: 'Artistic leadership presence with elegant curves and creative authority.',
  measurements: {
    bust: '38DD"',
    waist: '28"',
    hips: '42"'
  },
  height: '5\'8"',
  intimacyRange: [5, 8],
  powerLevelRange: [7, 9],
  specialties: 'fashion direction, creative leadership, and editorial conceptualization',
  template: {
    styleDeclaration: 'Corporate power photography in artistic style',
    intimacyLevel: 6,
    powerDynamic: 'balanced',

    modelHeight: '5\'8"',
    modelSpecialties: ['fashion direction', 'creative leadership', 'editorial conceptualization'],
    measurements: {
      bust: '38DD"',
      waist: '28"',
      hips: '42"'
    },
    physicalDescription: 'Elegant sculptural form with refined proportions and natural grace',
    complexion: 'Warm dusky complexion with golden undertones',
    facialFeatures: 'Refined features, expressive artistic gaze, sophisticated bone structure',
    presence: 'artistic presence',

    pose: 'Reviewing design boards with creative focus',
    hairColor: 'jet black',
    hairStyle: 'Professional updo with artistic looseness',
    skinFinish: 'Natural professional finish with subtle luminosity',
    handNailDetails: 'Creative professional manicure with artistic sensibility',
    nailArt: 'Deep burgundy polish with matte finish',
    highHeels: 'Designer block heels with architectural lines',

    wardrobe: 'Structured architectural blazer with deconstructed elements, creating professional sophistication with artistic edge',

    environment: 'Creative studio with mood boards and design materials',

    lighting: 'Natural window light with professional fill',

    camera: {
      focalLength: '50mm',
      aperture: 'f/2.8',
      distance: '3 m',
      angle: 'Eye level suggesting collaborative creative partnership',
      framing: 'Medium shot emphasizing creative process and environment'
    },

    colorGrade: 'Warm natural tones with artistic depth',

    styleDescription: 'Corporate creative photography celebrating artistic leadership',
    sensualityStyle: 'sophisticated',
    powerLevel: 7,
    creativeContext: 'Design studio authority with creative vision. Where artistic excellence meets executive decision-making',

    quality: 'High-end 8K creative industry photography with authentic detail and professional finish',

    figureAndForm: 'Elegant form expressing creative confidence and artistic authority',

    skinMicroDetails: 'Natural skin texture with professional retouching, authentic pores and healthy radiance',

    fabricPhysics: 'Structured tailored fabrics with architectural draping. Professional construction with creative elements',

    materialProperties: [
      'Creative materials from environment: Reclaimed wood work surfaces',
      'White architectural walls with texture',
      'Designer furniture with creative functionality. Professional fabrics with artistic sensibility'
    ]
  }
};

/**
 * VARIANT 3: Boardroom Authority (36C-27-38)
 * Classic executive proportions, commanding presence
 */
export const BOARDROOM_AUTHORITY: IndianCorporateVariant = {
  id: 'boardroom_authority_36C-27-38',
  name: 'Boardroom Authority',
  displayName: 'Boardroom Authority (36C-27-38)',
  description: 'Classic executive proportions with commanding boardroom presence and authoritative power.',
  measurements: {
    bust: '36C"',
    waist: '27"',
    hips: '38"'
  },
  height: '5\'9"',
  intimacyRange: [4, 7],
  powerLevelRange: [8, 10],
  specialties: 'executive leadership, strategic consulting, and corporate governance',
  template: {
    styleDeclaration: 'Corporate authority photography in professional style',
    intimacyLevel: 5,
    powerDynamic: 'dominant',

    modelHeight: '5\'9"',
    modelSpecialties: ['executive leadership', 'strategic consulting', 'corporate governance'],
    measurements: {
      bust: '36C"',
      waist: '27"',
      hips: '38"'
    },
    physicalDescription: 'Athletic executive form with commanding stature and confident posture',
    complexion: 'Fair luminous complexion with natural radiance',
    facialFeatures: 'Strong authoritative features, commanding gaze, executive presence',
    presence: 'executive presence',

    pose: 'Standing at boardroom table with confident authority',
    hairColor: 'jet black',
    hairStyle: 'Sleek professional styling with sharp executive lines',
    skinFinish: 'Professional polished finish with executive radiance',
    handNailDetails: 'Impeccable executive manicure with perfect precision',
    nailArt: 'Classic nude professional polish',
    highHeels: 'Sharp stiletto executive heels with commanding presence',

    wardrobe: 'Tailored power suit with structured authority, strategic design elements creating executive sophistication',

    environment: 'Glass-walled boardroom with city skyline views',

    lighting: 'Natural executive lighting with architectural shadows',

    camera: {
      focalLength: '50mm',
      aperture: 'f/4.0',
      distance: '3 m',
      angle: 'Eye level emphasizing authority and executive power',
      framing: 'Full body showing commanding presence and boardroom environment'
    },

    colorGrade: 'Cool professional tones with executive precision',

    styleDescription: 'Corporate executive photography celebrating boardroom authority',
    sensualityStyle: 'authoritative',
    powerLevel: 9,
    creativeContext: 'Executive boardroom power with strategic authority. Where corporate leadership meets decisive governance',

    quality: 'Premium 8K executive photography with impeccable professional detail',

    figureAndForm: 'Commanding executive form projecting authority through confident posture',

    skinMicroDetails: 'Executive-level skin retouching with professional polish and natural authenticity',

    fabricPhysics: 'Premium tailored suiting with executive precision. Sharp architectural lines with professional structure',

    materialProperties: [
      'Executive materials from environment: Polished marble conference table',
      'Floor-to-ceiling glass with city views',
      'Premium leather executive seating. Corporate fabrics with authoritative presence and professional finish'
    ]
  }
};

/**
 * All available variants
 */
export const INDIAN_CORPORATE_VARIANTS: IndianCorporateVariant[] = [
  EXECUTIVE_CURVES,
  CREATIVE_DIRECTOR,
  BOARDROOM_AUTHORITY
];

/**
 * Get variant by ID
 */
export function getVariantById(id: string): IndianCorporateVariant | undefined {
  return INDIAN_CORPORATE_VARIANTS.find(v => v.id === id);
}

/**
 * Get variants by intimacy range
 */
export function getVariantsByIntimacy(minIntimacy: number, maxIntimacy: number): IndianCorporateVariant[] {
  return INDIAN_CORPORATE_VARIANTS.filter(v =>
    v.intimacyRange[0] <= maxIntimacy && v.intimacyRange[1] >= minIntimacy
  );
}

/**
 * Get variants by power level
 */
export function getVariantsByPowerLevel(minPower: number, maxPower: number): IndianCorporateVariant[] {
  return INDIAN_CORPORATE_VARIANTS.filter(v =>
    v.powerLevelRange[0] <= maxPower && v.powerLevelRange[1] >= minPower
  );
}
