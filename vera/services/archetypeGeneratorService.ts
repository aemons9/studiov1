/**
 * Indian Model Archetypes and Templates
 * Comprehensive collection of Indian model types for Imagen 4 generation
 */

export interface ModelArchetype {
  id: string;
  name: string;
  category: 'traditional' | 'modern' | 'fusion' | 'artistic' | 'fantasy';
  description: string;
  physicalTraits: {
    skinTone: string;
    hairType: string;
    eyeColor: string;
    height: string;
    bodyType: string;
    facialFeatures: string;
    distinctiveTraits: string;
  };
  defaultWardrobe: {
    traditional: string;
    modern: string;
    fusion: string;
    minimal: string;
  };
  poseStyles: string[];
  lightingPreferences: string[];
  culturalElements: string[];
  intimacyRange: [number, number]; // min-max intimacy level suitable
  promptTemplate: string;
}

export const INDIAN_MODEL_ARCHETYPES: ModelArchetype[] = [
  {
    id: 'elite-fashion-model',
    name: 'Elite Fashion Model',
    category: 'modern',
    description: 'High-end fashion model with editorial and runway experience',
    physicalTraits: {
      skinTone: 'luminous dusky to golden-bronze complexion with flawless finish',
      hairType: 'versatile - from sleek straight to voluminous waves, always camera-ready',
      eyeColor: 'hypnotic dark eyes with intense, magnetic gaze',
      height: '5\'7" to 5\'9" with perfect model proportions',
      bodyType: 'hourglass silhouette with toned curves (36-26-38 to 38-28-40 range)',
      facialFeatures: 'high cheekbones, full lips, defined jawline, photogenic from every angle',
      distinctiveTraits: 'commanding presence, versatile expressions, natural grace'
    },
    defaultWardrobe: {
      traditional: 'haute couture saree with contemporary draping',
      modern: 'high-fashion editorial pieces, designer collections',
      fusion: 'avant-garde Indo-western couture',
      minimal: 'architectural minimalist designs, body-conscious silhouettes'
    },
    poseStyles: [
      'dynamic editorial poses with fabric movement',
      'powerful stance with confident body language',
      'artistic recline emphasizing natural curves',
      'over-shoulder gaze with knowing expression'
    ],
    lightingPreferences: [
      'dramatic fashion lighting with strong contrasts',
      'Rembrandt lighting for depth',
      'rim lighting for body definition',
      'soft beauty lighting for portraits'
    ],
    culturalElements: ['statement jewelry', 'artistic bindis', 'contemporary interpretation of traditional elements'],
    intimacyRange: [5, 10],
    promptTemplate: 'Elite Indian fashion model with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Editorial lighting with artistic composition.'
  },

  {
    id: 'luxury-seductress',
    name: 'Luxury Muse',
    category: 'artistic',
    description: 'Sophisticated muse for luxury and artistic photography',
    physicalTraits: {
      skinTone: 'warm mahogany to caramel complexion with inner glow',
      hairType: 'long flowing hair - straight, waves, or tousled bedroom hair',
      eyeColor: 'sultry bedroom eyes with kohl-like intensity',
      height: '5\'6" to 5\'8" with elegant proportions',
      bodyType: 'voluptuous hourglass figure (38-27-39 typical), soft yet toned',
      facialFeatures: 'bee-stung lips, expressive eyes, classic features',
      distinctiveTraits: 'natural grace, confident presence, sophisticated allure'
    },
    defaultWardrobe: {
      traditional: 'silk saree with strategic draping, backless blouses',
      modern: 'luxury artistic garments, silk slip dresses',
      fusion: 'sheer overlays with strategic coverage',
      minimal: 'artistic draping with fabric, implied nude with shadows'
    },
    poseStyles: [
      'languid recline on luxurious fabrics',
      'arched back emphasizing curves',
      'artistic bedroom poses',
      'teasing over-shoulder glance'
    ],
    lightingPreferences: [
      'warm artistic lighting',
      'single source dramatic lighting',
      'candlelight or fireplace glow',
      'venetian blind shadows'
    ],
    culturalElements: ['ankle chains', 'waist chains', 'artistic jewelry placement'],
    intimacyRange: [7, 10],
    promptTemplate: 'Sophisticated Indian muse with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Dramatic lighting with an artistic atmosphere.'
  },

  {
    id: 'corporate-power',
    name: 'Corporate Power Beauty',
    category: 'modern',
    description: 'Executive beauty balancing power and elegance',
    physicalTraits: {
      skinTone: 'radiant complexion from fair to wheatish with professional glow',
      hairType: 'sleek professional styles - power bobs to elegant updos',
      eyeColor: 'sharp, intelligent eyes with confident direct gaze',
      height: '5\'5" to 5\'7" with commanding presence',
      bodyType: 'fit hourglass figure maintained through yoga and fitness',
      facialFeatures: 'sharp features, defined structure, sophisticated beauty',
      distinctiveTraits: 'power dressing with subtle elegance, alpha energy'
    },
    defaultWardrobe: {
      traditional: 'power sarees with modern blouses',
      modern: 'tailored suits with strategic unbuttoning',
      fusion: 'pencil skirts with silk blouses',
      minimal: 'crisp white shirts with subtle reveals'
    },
    poseStyles: [
      'power pose at executive desk',
      'confident standing with crossed arms',
      'seated cross-legged showing authority',
      'walking with purpose in heels'
    ],
    lightingPreferences: [
      'clean corporate lighting with edge',
      'window light in corner office',
      'dramatic boardroom lighting'
    ],
    culturalElements: ['luxury watches', 'minimal gold jewelry', 'power bindis'],
    intimacyRange: [4, 8],
    promptTemplate: 'Powerful Indian executive with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Corporate setting with sophisticated lighting.'
  },

  {
    id: 'artistic-muse',
    name: 'Artistic Muse',
    category: 'artistic',
    description: 'Artistic model for fine art and creative photography',
    physicalTraits: {
      skinTone: 'diverse - from porcelain to ebony, all with artistic quality',
      hairType: 'creative styling - natural to avant-garde',
      eyeColor: 'expressive eyes capable of conveying deep emotion',
      height: '5\'4" to 5\'8" with artistic proportions',
      bodyType: 'natural feminine form celebrated in art',
      facialFeatures: 'unique beauty, interesting rather than conventional',
      distinctiveTraits: 'comfortable with artistic nudity, expressive body language'
    },
    defaultWardrobe: {
      traditional: 'deconstructed traditional wear',
      modern: 'artistic draping and unconventional materials',
      fusion: 'experimental fashion as art',
      minimal: 'body paint, strategic shadows, artistic nude'
    },
    poseStyles: [
      'classical art poses referencing masters',
      'abstract body shapes and forms',
      'emotional and expressive positions',
      'interaction with light and shadow'
    ],
    lightingPreferences: [
      'chiaroscuro dramatic lighting',
      'experimental color gels',
      'natural light studies',
      'projection mapping on body'
    ],
    culturalElements: ['body art', 'temporary tattoos', 'artistic interpretation of tradition'],
    intimacyRange: [6, 10],
    promptTemplate: 'Artistic Indian muse with {skinTone}, {hairType}. {wardrobe}. {pose}. Fine art lighting with creative composition.'
  },

  {
    id: 'bollywood-seductress',
    name: 'Bollywood Starlet',
    category: 'modern',
    description: 'Glamorous Bollywood-style beauty with star power and glamour',
    physicalTraits: {
      skinTone: 'glowing golden to dusky complexion with star quality',
      hairType: 'voluminous Bollywood waves or sleek glamour styles',
      eyeColor: 'dramatic eyes with smoky makeup and intense expression',
      height: '5\'5" to 5\'8" with curves that command attention',
      bodyType: 'voluptuous figure (36-28-38) maintained through dance',
      facialFeatures: 'dramatic features, full lips, expressive face',
      distinctiveTraits: 'item girl energy, dance-ready body, magnetic charisma'
    },
    defaultWardrobe: {
      traditional: 'revealing lehenga cholis with plunging necklines',
      modern: 'bodycon dresses with high slits',
      fusion: 'saree with bikini blouse combinations',
      minimal: 'dance costumes with strategic coverage'
    },
    poseStyles: [
      'expressive dance poses mid-movement',
      'rain dance inspired poses',
      'leaning against walls with hip thrust',
      'hair flip with arched back'
    ],
    lightingPreferences: [
      'glamorous cinematic lighting',
      'colored gels for song sequences',
      'wet look lighting',
      'sparkle and shimmer effects'
    ],
    culturalElements: ['heavy jewelry', 'bindis as fashion', 'ankle bells', 'dramatic makeup'],
    intimacyRange: [6, 9],
    promptTemplate: 'Glamorous Bollywood starlet with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Cinematic lighting with star quality.'
  },

  {
    id: 'yoga-goddess',
    name: 'Yoga Goddess',
    category: 'fusion',
    description: 'Spiritual grace through yoga and wellness',
    physicalTraits: {
      skinTone: 'sun-kissed bronze with natural healthy glow',
      hairType: 'long natural hair, often in loose braids or flowing free',
      eyeColor: 'serene yet intense eyes with spiritual depth',
      height: '5\'3" to 5\'6" with flexible, toned body',
      bodyType: 'lean and toned with visible muscle definition, flexible curves',
      facialFeatures: 'natural beauty, minimal makeup, radiant from within',
      distinctiveTraits: 'incredible flexibility, peaceful yet powerful energy'
    },
    defaultWardrobe: {
      traditional: 'minimal yoga attire in earth tones',
      modern: 'form-fitting activewear',
      fusion: 'sports bra with flowing pants',
      minimal: 'artistic nude yoga poses'
    },
    poseStyles: [
      'advanced yoga poses showing flexibility',
      'graceful stretches and bends',
      'meditation poses with subtle power',
      'partner yoga positions'
    ],
    lightingPreferences: [
      'golden hour natural light',
      'soft morning light',
      'candlelit evening sessions',
      'silhouette against sunset'
    ],
    culturalElements: ['mala beads', 'spiritual tattoos', 'chakra jewelry', 'bindis'],
    intimacyRange: [5, 9],
    promptTemplate: 'Graceful yoga goddess with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Natural lighting with spiritual atmosphere.'
  },

  {
    id: 'intellectual-seductress',
    name: 'Intellectual Muse',
    category: 'artistic',
    description: 'Sophisticated beauty combining intelligence with elegance',
    physicalTraits: {
      skinTone: 'varied complexions all with refined, cultured appearance',
      hairType: 'elegant styles from sleek bobs to flowing intellectual waves',
      eyeColor: 'intelligent eyes behind designer glasses or with knowing gaze',
      height: '5\'4" to 5\'7" with graceful proportions',
      bodyType: 'feminine curves hidden under professional attire',
      facialFeatures: 'refined features, subtle smile, mysterious expression',
      distinctiveTraits: 'scholarly appeal, hidden elegance'
    },
    defaultWardrobe: {
      traditional: 'sarees with intellectual appeal',
      modern: 'pencil skirts with partially unbuttoned blouses',
      fusion: 'academic wear with surprising reveals',
      minimal: 'oversized shirts with nothing underneath'
    },
    poseStyles: [
      'reading in artistic positions',
      'glasses adjustment with a knowing look',
      'leaning over desk poses',
      'crossed legs while seated poses'
    ],
    lightingPreferences: [
      'library window light',
      'desk lamp dramatic lighting',
      'venetian blind shadows',
      'fireplace glow'
    ],
    culturalElements: ['intellectual accessories', 'minimal traditional jewelry', 'artistic bindis'],
    intimacyRange: [5, 9],
    promptTemplate: 'Intellectual Indian beauty with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Atmospheric lighting with sophisticated mood.'
  },

  {
    id: 'luxury-wife',
    name: 'Luxury Wife Material',
    category: 'modern',
    description: 'Trophy wife aesthetic with luxury and elegance',
    physicalTraits: {
      skinTone: 'pampered complexion from fair to golden with spa glow',
      hairType: 'salon-perfect hair in latest styles',
      eyeColor: 'dramatic eyes with expensive lash extensions',
      height: '5\'4" to 5\'7" with maintained figure',
      bodyType: 'cosmetically enhanced curves or natural perfection',
      facialFeatures: 'instagram-perfect features, full lips, contoured beauty',
      distinctiveTraits: 'high-maintenance beauty, trophy wife energy'
    },
    defaultWardrobe: {
      traditional: 'designer lehengas with modern cuts',
      modern: 'luxury brands, bodycon everything',
      fusion: 'poolside kaftans with bikinis',
      minimal: 'silk robes in bedroom settings'
    },
    poseStyles: [
      'poolside luxury poses',
      'shopping with attitude',
      'bedroom selfie positions',
      'showing off jewelry and body'
    ],
    lightingPreferences: [
      'soft glamour lighting',
      'poolside sunshine',
      'luxury hotel lighting',
      'ring light perfection'
    ],
    culturalElements: ['excessive gold jewelry', 'designer bindis', 'luxury brand accessories'],
    intimacyRange: [6, 9],
    promptTemplate: 'Luxury Indian wife aesthetic with {skinTone}, {hairType}. Wearing {wardrobe}. {pose}. Expensive setting with perfect lighting.'
  }
];

/**
 * Generate a complete prompt for a specific archetype
 */
export function generateArchetypePrompt(
  archetypeId: string,
  options: {
    wardrobe: 'traditional' | 'modern' | 'fusion' | 'minimal';
    poseIndex?: number;
    intimacyLevel: number;
    customDetails?: string;
  }
): string {
  const archetype = INDIAN_MODEL_ARCHETYPES.find(a => a.id === archetypeId);
  if (!archetype) throw new Error(`Archetype ${archetypeId} not found`);

  // Validate intimacy level
  const clampedIntimacy = Math.max(
    archetype.intimacyRange[0],
    Math.min(archetype.intimacyRange[1], options.intimacyLevel)
  );

  // Select pose
  const poseIndex = options.poseIndex ?? Math.floor(Math.random() * archetype.poseStyles.length);
  const pose = archetype.poseStyles[poseIndex];

  // Build the prompt
  let prompt = archetype.promptTemplate
    .replace('{skinTone}', archetype.physicalTraits.skinTone)
    .replace('{hairType}', archetype.physicalTraits.hairType)
    .replace('{wardrobe}', archetype.defaultWardrobe[options.wardrobe])
    .replace('{pose}', pose);

  // Add intimacy-specific details
  if (clampedIntimacy >= 7) {
    prompt += ' Dramatic artistic lighting with soft shadows. ';
  }
  if (clampedIntimacy >= 5) {
    prompt += ' Emphasizing natural beauty and graceful form. ';
  }

  // Add custom details
  if (options.customDetails) {
    prompt += ' ' + options.customDetails;
  }

  // Add technical quality
  prompt += ' Shot with 85mm lens, shallow depth of field. Professional photography, 8K quality.';

  return prompt;
}

/**
 * Get recommended archetypes for a given intimacy level
 */
export function getRecommendedArchetypes(intimacyLevel: number): ModelArchetype[] {
  return INDIAN_MODEL_ARCHETYPES.filter(
    archetype => 
      intimacyLevel >= archetype.intimacyRange[0] && 
      intimacyLevel <= archetype.intimacyRange[1]
  );
}

/**
 * Combine multiple archetypes for unique characters
 */
export function blendArchetypes(
  primaryId: string,
  secondaryId: string,
  blendRatio: number = 0.5
): string {
  const primary = INDIAN_MODEL_ARCHETYPES.find(a => a.id === primaryId);
  const secondary = INDIAN_MODEL_ARCHETYPES.find(a => a.id === secondaryId);
  
  if (!primary || !secondary) throw new Error('Archetype not found');

  const prompt = `Indian model blending ${Math.round(blendRatio * 100)}% ${primary.name} with ${Math.round((1 - blendRatio) * 100)}% ${secondary.name}. ` +
    `Skin tone: ${blendRatio >= 0.5 ? primary.physicalTraits.skinTone : secondary.physicalTraits.skinTone}. ` +
    `Features combining ${primary.description} and ${secondary.description}. ` +
    `Wearing fusion of ${primary.defaultWardrobe.fusion} and ${secondary.defaultWardrobe.fusion}.`;

  return prompt;
}