/**
 * MASTERCLASS MODELS - The Definitive Collection
 *
 * Each model represents a pinnacle of their category
 * Crafted with meticulous attention to cultural authenticity and aesthetic excellence
 */

import { MasterClassModel, ModelCategory } from './modelTaxonomy';
import { INSTAGRAM_MASTERCLASS_MODELS } from './instagramModels';

export const CORE_MASTERCLASS_MODELS: MasterClassModel[] = [
  // ============================================================================
  // GLAMOUR INDUSTRY ICONS
  // ============================================================================
  {
    id: 'glamour_bollywood_siren',
    archetype: 'The Bollywood Siren',
    category: ModelCategory.GLAMOUR,
    subcategory: 'Cinema Glamour',

    physicalProfile: {
      height: "5'8\"",
      measurements: {
        bust: "36C",
        waist: "26",
        hips: "38",
        shoulderWidth: "16",
        inseam: "34"
      },
      bodyArchitecture: "Classical hourglass with dancer's grace - sculpted through Kathak training, curves that speak in poetry",
      skinLuminosity: "Golden-bronze with inner radiance - skin that captures and reflects light like burnished metal",
      hairArchitecture: "Voluminous cascade of raven silk - hair that moves like liquid obsidian, catching light at every turn",
      facialGeometry: "Perfect symmetry with high cheekbones, aquiline nose, full lips - the mathematics of beauty",
      eyeNarrative: "Kohl-rimmed almonds holding centuries of stories - eyes that have seen epics and romances",
      distinguishingAesthetics: "Beauty mark above lip, swan-like neck, expressive hands that speak in mudras",
      ageRange: "24-30",
      movementSignature: "Every gesture is choreographed poetry - trained in classical dance, moves like flowing honey"
    },

    professionalMatrix: {
      experienceLevel: 'Iconic',
      specializations: ['Cinema Glamour', 'Song Sequences', 'Red Carpet', 'Brand Campaigns'],
      brandAssociations: ['Sabyasachi', 'Manish Malhotra', 'L\'Oréal Paris', 'Tanishq'],
      signatureStyles: ['Classical Glamour', 'Modern Maharani', 'Global Desi'],
      industryReputation: "The face that launched a thousand films - synonymous with timeless Indian beauty",
      artisticRange: "From devotional purity to femme fatale - encompasses every shade of femininity"
    },

    aestheticProfile: {
      colorPalette: ['Deep Reds', 'Royal Gold', 'Midnight Blue', 'Ivory', 'Emerald'],
      textureAffinity: ['Silk Chiffon', 'Velvet', 'Brocade', 'Gossamer', 'Liquid Satin'],
      lightingPreference: ['Golden Hour Romance', 'Cinematic Chiaroscuro', 'Soft Box Glamour'],
      environmentalHarmony: ['Palace Courtyards', 'Swiss Alps', 'Mumbai Skyline', 'Rajasthani Desert'],
      temporalMood: "Twilight - when day surrenders to night",
      seasonalResonance: ['Monsoon Romance', 'Spring Festivals']
    },

    creativeCapabilities: {
      emotionalSpectrum: ['Devotion', 'Passion', 'Melancholy', 'Celebration', 'Longing'],
      narrativeStrength: "Can convey entire love stories through a single glance",
      cinematicPresence: "Commands the frame - impossible to look away",
      editorialVersatility: "From Vogue India covers to temple calendar art",
      artisticCollaboration: "Elevates every photographer to poet status",
      culturalFluency: "Embodies 5000 years of Indian feminine ideals while remaining utterly contemporary"
    },

    wardrobePhilosophy: {
      signature: [
        {
          name: "The Iconic Saree",
          philosophy: "Six yards of pure poetry",
          keyPieces: ['Chiffon with gold border', 'Sequined georgette', 'Hand-woven Banarasi'],
          colorStory: "Jewel tones that echo precious stones",
          texturePlay: "Flowing fabrics that catch wind and light",
          silhouette: "Draped to accentuate curves while maintaining elegance",
          culturalReference: "Madhubala meets modern Mumbai",
          designerInspiration: "Sabyasachi\'s vintage glamour"
        }
      ],
      haute: [
        {
          designer: "Manish Malhotra",
          collection: "Timeless Glamour",
          pieces: ['Crystal-embedded lehenga', 'Velvet choli with pearl details'],
          narrative: "Where tradition meets red carpet",
          craftmanship: "3000 hours of hand embroidery",
          wearingPhilosophy: "Clothes as wearable heritage"
        }
      ],
      street: [],
      traditional: [
        {
          garment: "Anarkali",
          region: "Mughal India",
          occasion: "Festival celebrations",
          modernInterpretation: "Floor-length with contemporary cuts",
          craftsmanshipDetails: "Zardozi work with real gold thread",
          culturalSignificance: "Courtly elegance for the modern woman"
        }
      ],
      experimental: [],
      minimalist: []
    },

    environmentalStages: [
      {
        name: "Haveli Courtyard at Dusk",
        category: 'Cultural',
        atmosphere: "Nostalgic romance with dancing shadows",
        lightQuality: "Golden lanterns mixing with blue twilight",
        colorTemperature: "2700K warmth against 5600K sky",
        textureNarrative: "Weathered stone, silk cushions, brass vessels",
        spatialDynamics: "Intimate yet grand - personal palace",
        emotionalResonance: "Longing and belonging",
        timeOfDay: "Magic hour",
        culturalSignificance: "The eternal feminine in her domain"
      }
    ],

    photographicSynergy: {
      optimalLenses: ['85mm f/1.2 for portraits', '35mm f/1.4 for environmental', '135mm f/2 for compression'],
      signatureAngles: ['Low angle for regal presence', 'Through archways for framing', 'Profile for classical beauty'],
      lightingMastery: [
        {
          name: "Bollywood Glamour",
          philosophy: "Light her like she's the only star in the universe",
          keyLight: "Large octabox at 45 degrees",
          fillRatio: "2:1 for dimension",
          rimLight: "Golden backlight for halo effect",
          colorTemperature: "3200K for warmth",
          shadows: "Soft but present",
          highlights: "Glowing skin, sparkling eyes",
          mood: "Romantic nostalgia",
          cinematicReference: "Classic Yash Chopra films"
        }
      ],
      colorGradingPhilosophy: "Rich, saturated colors with creamy skin tones",
      compositionalHarmony: ['Rule of thirds', 'Leading lines with fabric', 'Negative space for breathing']
    }
  },

  // ============================================================================
  // ART SCHOOL AESTHETIC
  // ============================================================================
  {
    id: 'artschool_contemporary_muse',
    archetype: 'The Contemporary Muse',
    category: ModelCategory.ARTSCHOOL,
    subcategory: 'Conceptual Art',

    physicalProfile: {
      height: "5'10\"",
      measurements: {
        bust: "34B",
        waist: "25",
        hips: "36",
        shoulderWidth: "16.5"
      },
      bodyArchitecture: "Sculptural minimalism - body as negative space and form",
      skinLuminosity: "Matte perfection with subtle undertones - skin like fine paper",
      hairArchitecture: "Geometric bob or flowing asymmetry - hair as artistic statement",
      facialGeometry: "Angular beauty - sharp cheekbones, defined jaw, architectural",
      eyeNarrative: "Windows to conceptual universes - seeing beyond the visible",
      distinguishingAesthetics: "Distinctive nose, long fingers, collarbone prominence",
      ageRange: "22-28",
      movementSignature: "Studied stillness punctuated by explosive dynamism"
    },

    professionalMatrix: {
      experienceLevel: 'Established',
      specializations: ['Gallery Exhibitions', 'Art House Films', 'Conceptual Fashion', 'Performance Art'],
      brandAssociations: ['Raw Mango', 'Pero', 'Good Earth', 'Indigenous brands'],
      signatureStyles: ['Deconstructed Traditional', 'Minimalist Poetry', 'Textile Narrative'],
      industryReputation: "The thinking person's model - brings intellectual depth to visual arts",
      artisticRange: "From installation art to fashion week - bridges high art and commerce"
    },

    aestheticProfile: {
      colorPalette: ['Indigo', 'Ochre', 'Charcoal', 'Cream', 'Rust'],
      textureAffinity: ['Hand-woven Khadi', 'Raw Silk', 'Linen', 'Recycled Materials'],
      lightingPreference: ['Natural North Light', 'Museum Quality', 'Experimental Projections'],
      environmentalHarmony: ['Artist Studios', 'Abandoned Factories', 'Minimal Galleries', 'Ancient Ruins'],
      temporalMood: "Timeless - exists outside conventional time",
      seasonalResonance: ['Monsoon Minimalism', 'Winter Austerity']
    },

    creativeCapabilities: {
      emotionalSpectrum: ['Contemplation', 'Revolution', 'Silence', 'Disruption'],
      narrativeStrength: "Embodies abstract concepts - makes ideas visible",
      cinematicPresence: "Anti-glamour glamour - compels through intelligence",
      editorialVersatility: "From Artforum to Elle - speaks multiple visual languages",
      artisticCollaboration: "Challenges photographers to think beyond beauty",
      culturalFluency: "Deconstructs tradition to rebuild meaning"
    },

    wardrobePhilosophy: {
      signature: [
        {
          name: "Deconstructed Sari",
          philosophy: "Tradition unraveled and rewoven",
          keyPieces: ['Khadi with raw edges', 'Sari worn as sculpture'],
          colorStory: "Earth tones with unexpected neon",
          texturePlay: "Rough against smooth - tactile contradictions",
          silhouette: "Architectural draping",
          culturalReference: "Post-colonial fashion narrative"
        }
      ],
      haute: [],
      street: [
        {
          trend: "Conscious Fashion",
          interpretation: "Wearing ethics as aesthetics",
          keyElements: ['Upcycled textiles', 'Artisan collaborations'],
          culturalContext: "Sustainable Indian fashion movement",
          personalTwist: "Each piece tells a maker's story"
        }
      ],
      traditional: [],
      experimental: [
        {
          concept: "Body as Canvas",
          materials: ['Projected light', 'Temporary tattoos', 'Natural dyes'],
          construction: "Ephemeral fashion - exists only in the moment",
          movement: "Clothing that changes with motion",
          visualImpact: "Questions the boundary between body and dress",
          artisticReference: "Yayoi Kusama meets Indian textile tradition"
        }
      ],
      minimalist: [
        {
          principle: "Essential Beauty",
          colorScheme: ['White', 'Indigo', 'Black'],
          fabricChoice: "Single piece of fabric, infinite possibilities",
          silhouettePhilosophy: "Let the body speak",
          negativeSpace: "What's not there is as important",
          essentialElements: ['Perfect white shirt', 'Flowing pants', 'No jewelry']
        }
      ]
    },

    environmentalStages: [
      {
        name: "Abandoned Textile Mill",
        category: 'Architectural',
        atmosphere: "Industrial poetry - beauty in decay",
        lightQuality: "Shafts through broken windows",
        colorTemperature: "Natural daylight with dust particles",
        textureNarrative: "Rust, concrete, forgotten looms",
        spatialDynamics: "Vast emptiness with intimate corners",
        emotionalResonance: "Melancholy and possibility",
        culturalSignificance: "India's industrial heritage reimagined"
      }
    ],

    photographicSynergy: {
      optimalLenses: ['50mm f/1.4 for truth', '24mm f/2.8 for context'],
      signatureAngles: ['Eye level for equality', 'From above for pattern', 'Through objects for layers'],
      lightingMastery: [
        {
          name: "Gallery Light",
          philosophy: "Light as neutral observer",
          keyLight: "Large soft window",
          fillRatio: "1:1 for flatness",
          colorTemperature: "5500K daylight",
          shadows: "Soft, informational",
          highlights: "Controlled, never blown",
          mood: "Contemplative clarity"
        }
      ],
      colorGradingPhilosophy: "Desaturated reality with punctuated color",
      compositionalHarmony: ['Geometric balance', 'Tension through asymmetry', 'Breathing space']
    }
  },

  // ============================================================================
  // CINEMATIC UNIVERSE
  // ============================================================================
  {
    id: 'cinema_method_actress',
    archetype: 'The Method Actress',
    category: ModelCategory.CINEMA,
    subcategory: 'Parallel Cinema',

    physicalProfile: {
      height: "5'6\"",
      measurements: {
        bust: "35C",
        waist: "27",
        hips: "37"
      },
      bodyArchitecture: "Lived-in beauty - a body that tells stories",
      skinLuminosity: "Natural texture with character - real skin, real beauty",
      hairArchitecture: "Versatile - from village simplicity to urban sophistication",
      facialGeometry: "Expressive features that transform with emotion",
      eyeNarrative: "Eyes that have lived a thousand lives",
      distinguishingAesthetics: "Mobile features, expressive mouth, authentic presence",
      ageRange: "26-35",
      movementSignature: "Inhabited movement - every gesture comes from character"
    },

    professionalMatrix: {
      experienceLevel: 'Established',
      specializations: ['Character Portraits', 'Documentary Style', 'Social Realism', 'Period Drama'],
      brandAssociations: ['Film Festival Circuits', 'NGO Campaigns', 'Conscious Brands'],
      signatureStyles: ['Cinéma Vérité', 'Italian Neorealism', 'Parallel Cinema'],
      industryReputation: "The actor's model - brings truth to every frame",
      artisticRange: "From village woman to CEO - complete transformation"
    },

    aestheticProfile: {
      colorPalette: ['Earth Tones', 'Muted Primaries', 'Documentary Grays'],
      textureAffinity: ['Cotton', 'Worn Fabrics', 'Lived-in Textures'],
      lightingPreference: ['Available Light', 'Practical Sources', 'Raw Reality'],
      environmentalHarmony: ['Real Locations', 'Street Photography', 'Documentary Settings'],
      temporalMood: "Present tense - urgently now",
      seasonalResonance: ['All seasons as character']
    },

    creativeCapabilities: {
      emotionalSpectrum: ['Full human experience'],
      narrativeStrength: "Becomes the story",
      cinematicPresence: "Disappears into role",
      editorialVersatility: "From social documentary to high fashion story",
      artisticCollaboration: "Makes photographers into directors",
      culturalFluency: "Embodies every strata of Indian society"
    },

    wardrobePhilosophy: {
      signature: [
        {
          name: "Character Wardrobe",
          philosophy: "Clothes as lived experience",
          keyPieces: ['Whatever the character would wear'],
          colorStory: "Realistic to role",
          texturePlay: "Authentic to context",
          silhouette: "True to character",
          culturalReference: "Real India"
        }
      ],
      haute: [],
      street: [],
      traditional: [],
      experimental: [],
      minimalist: []
    },

    environmentalStages: [
      {
        name: "Mumbai Local Train",
        category: 'Urban',
        atmosphere: "Crowded authenticity",
        lightQuality: "Harsh fluorescents mixed with window light",
        colorTemperature: "Mixed sources",
        textureNarrative: "Worn metal, pressed bodies, life in motion",
        spatialDynamics: "Compressed humanity",
        emotionalResonance: "Shared journey",
        culturalSignificance: "The pulse of the city"
      }
    ],

    photographicSynergy: {
      optimalLenses: ['35mm f/2 for documentary feel', '50mm f/1.8 for intimacy'],
      signatureAngles: ['Observational', 'Candid', 'Within the action'],
      lightingMastery: [
        {
          name: "Available Light",
          philosophy: "Truth needs no enhancement",
          keyLight: "Whatever exists",
          fillRatio: "Natural",
          colorTemperature: "Mixed",
          shadows: "As they fall",
          highlights: "Blown if needed",
          mood: "Raw authenticity"
        }
      ],
      colorGradingPhilosophy: "Minimal processing - truth in color",
      compositionalHarmony: ['Found compositions', 'Environmental context', 'Decisive moments']
    }
  },

  // ============================================================================
  // INTERNATIONAL SUPERMODEL
  // ============================================================================
  {
    id: 'supermodel_global_icon',
    archetype: 'The Global Indian',
    category: ModelCategory.SUPERMODEL,
    subcategory: 'International Runways',

    physicalProfile: {
      height: "5'11\"",
      measurements: {
        bust: "34B",
        waist: "24",
        hips: "35",
        shoulderWidth: "17",
        inseam: "36"
      },
      bodyArchitecture: "Runway perfection - legs for days, perfect proportions",
      skinLuminosity: "Campaign-ready complexion - photographs flawlessly in any light",
      hairArchitecture: "Editorial versatility - from sleek to wild",
      facialGeometry: "International beauty - transcends geographic boundaries",
      eyeNarrative: "Penetrating gaze that sells dreams",
      distinguishingAesthetics: "The walk, gap-toothed smile, beauty mark constellation",
      ageRange: "20-28",
      movementSignature: "The billion-dollar stride - owns every runway"
    },

    professionalMatrix: {
      experienceLevel: 'Iconic',
      specializations: ['Runway', 'Campaigns', 'Editorials', 'Brand Ambassador'],
      brandAssociations: ['Chanel', 'Dior', 'Versace', 'Victoria\'s Secret'],
      signatureStyles: ['High Fashion', 'Commercial Glamour', 'Avant-Garde'],
      industryReputation: "The face that represents India globally",
      artisticRange: "From haute couture to mass market - universal appeal"
    },

    aestheticProfile: {
      colorPalette: ['International Neutrals', 'Bold Primaries', 'Metallic Accents'],
      textureAffinity: ['Couture Fabrics', 'Technical Materials', 'Luxury Basics'],
      lightingPreference: ['Studio Perfection', 'Ring Flash', 'Beauty Lighting'],
      environmentalHarmony: ['Fashion Capitals', 'Exotic Locations', 'Studio Infinity'],
      temporalMood: "Always on - 24/7 glamour",
      seasonalResonance: ['Fashion Week Seasons']
    },

    creativeCapabilities: {
      emotionalSpectrum: ['Aspiration', 'Confidence', 'Mystery', 'Accessibility'],
      narrativeStrength: "Sells the dream",
      cinematicPresence: "Commands global attention",
      editorialVersatility: "From Vogue to billboard",
      artisticCollaboration: "Makes photographers legends",
      culturalFluency: "Represents modern India to the world"
    },

    wardrobePhilosophy: {
      signature: [
        {
          name: "Runway Ready",
          philosophy: "Clothes as performance",
          keyPieces: ['Whatever\'s on the runway'],
          colorStory: "Seasonal trends",
          texturePlay: "Designer vision",
          silhouette: "Current collection",
          designerInspiration: "Direct from atelier"
        }
      ],
      haute: [
        {
          designer: "Sabyasachi",
          collection: "India Couture Week",
          pieces: ['Showstopper lehenga'],
          narrative: "Indian luxury goes global",
          craftmanship: "Museum-quality",
          wearingPhilosophy: "Heritage as high fashion"
        }
      ],
      street: [],
      traditional: [],
      experimental: [],
      minimalist: []
    },

    environmentalStages: [
      {
        name: "Paris Runway",
        category: 'Architectural',
        atmosphere: "Electric anticipation",
        lightQuality: "Theatrical spots",
        colorTemperature: "4000K clean",
        textureNarrative: "Polished runway, front row faces",
        spatialDynamics: "Linear focus",
        emotionalResonance: "Apex moment",
        culturalSignificance: "India on the world stage"
      }
    ],

    photographicSynergy: {
      optimalLenses: ['85mm f/1.2 for beauty', '24-70mm f/2.8 for versatility'],
      signatureAngles: ['Hero angles', 'Three-quarter turn', 'Over-shoulder gaze'],
      lightingMastery: [
        {
          name: "Fashion Week",
          philosophy: "Flawless at any angle",
          keyLight: "Beauty dish",
          fillRatio: "1:2",
          rimLight: "Separation from background",
          colorTemperature: "5600K perfect white",
          shadows: "Sculpted",
          highlights: "Controlled",
          mood: "Aspirational perfection"
        }
      ],
      colorGradingPhilosophy: "Clean, bright, commercially perfect",
      compositionalHarmony: ['Center frame dominance', 'Full length glory', 'Detail shots']
    }
  },

  // ============================================================================
  // DIGITAL NATIVE INFLUENCER
  // ============================================================================
  {
    id: 'influencer_viral_sensation',
    archetype: 'The Viral Virtuoso',
    category: ModelCategory.INFLUENCER,
    subcategory: 'Social Media Phenomenon',

    physicalProfile: {
      height: "5'7\"",
      measurements: {
        bust: "36D",
        waist: "26",
        hips: "38"
      },
      bodyArchitecture: "Instagram-perfect proportions - real body positivity meets aspiration",
      skinLuminosity: "Filter-friendly complexion - looks amazing in any light",
      hairArchitecture: "Tutorial-worthy - from beach waves to sleek straightness",
      facialGeometry: "Relatable beauty - girl next door with main character energy",
      eyeNarrative: "Direct connection - speaking to millions through the lens",
      distinguishingAesthetics: "Signature expressions, hand gestures, infectious smile",
      ageRange: "20-26",
      movementSignature: "Constantly in motion - every moment is content"
    },

    professionalMatrix: {
      experienceLevel: 'Established',
      specializations: ['Lifestyle Content', 'Fashion Hauls', 'Travel Diaries', 'Brand Collaborations'],
      brandAssociations: ['Nykaa', 'Myntra', 'Amazon Fashion', 'International brands'],
      signatureStyles: ['Accessible Glamour', 'Relatable Luxury', 'Trend Translation'],
      industryReputation: "The voice of young India - trendsetter and taste-maker",
      artisticRange: "From morning routine to red carpet - all life is content"
    },

    aestheticProfile: {
      colorPalette: ['Millennial Pink', 'Gen-Z Yellow', 'Instagram Blue', 'VSCO Tones'],
      textureAffinity: ['Fast Fashion', 'Sustainable Brands', 'Thrift Finds', 'Designer Dupes'],
      lightingPreference: ['Ring Light', 'Golden Hour', 'Natural Window Light'],
      environmentalHarmony: ['Aesthetic Cafes', 'Bedroom Studios', 'Travel Destinations', 'Event Spaces'],
      temporalMood: "Always golden hour somewhere",
      seasonalResonance: ['Trending Seasons']
    },

    creativeCapabilities: {
      emotionalSpectrum: ['Relatability', 'Aspiration', 'Authenticity', 'Fun'],
      narrativeStrength: "Life as content narrative",
      cinematicPresence: "Owns the frame - and the comments section",
      editorialVersatility: "From IGTV to magazine features",
      artisticCollaboration: "Turns photographers into content creators",
      culturalFluency: "Bridges traditional and modern India"
    },

    wardrobePhilosophy: {
      signature: [
        {
          name: "Trend Translation",
          philosophy: "High fashion made accessible",
          keyPieces: ['Statement pieces', 'Basics', 'Vintage finds'],
          colorStory: "Seasonal but personal",
          texturePlay: "Mix high and low",
          silhouette: "Flattering and fun",
          culturalReference: "Global trends with desi twist"
        }
      ],
      haute: [],
      street: [
        {
          trend: "Y2K Revival",
          interpretation: "Nostalgia with modern twist",
          keyElements: ['Low-rise', 'Butterfly clips', 'Platform shoes'],
          culturalContext: "Millennial memories",
          personalTwist: "Indian street style fusion"
        }
      ],
      traditional: [
        {
          garment: "Kurti",
          region: "Pan-India",
          occasion: "Everyday ethnic",
          modernInterpretation: "Kurti with jeans",
          craftsmanshipDetails: "Block prints, embroidery",
          culturalSignificance: "Modern Indian identity"
        }
      ],
      experimental: [],
      minimalist: []
    },

    environmentalStages: [
      {
        name: "Mirror Selfie Setup",
        category: 'Urban',
        atmosphere: "Curated authenticity",
        lightQuality: "Ring light plus natural",
        colorTemperature: "Warm and inviting",
        textureNarrative: "Aesthetic bedroom, fairy lights, plants",
        spatialDynamics: "Intimate yet public",
        emotionalResonance: "Relatable aspiration",
        culturalSignificance: "Digital generation's self-portrait"
      }
    ],

    photographicSynergy: {
      optimalLenses: ['28mm for selfies', '50mm f/1.8 for portraits'],
      signatureAngles: ['Slightly above', 'Mirror angles', 'Candid but aware'],
      lightingMastery: [
        {
          name: "Content Creator",
          philosophy: "Consistency across platforms",
          keyLight: "Ring light",
          fillRatio: "Flat but flattering",
          colorTemperature: "3200K warm",
          shadows: "Minimal",
          highlights: "Bright but not blown",
          mood: "Approachable perfection"
        }
      ],
      colorGradingPhilosophy: "Preset consistency - signature filter",
      compositionalHarmony: ['Rule of thirds', 'Negative space for text', 'Vertical orientation']
    }
  }
];

// Combine all models including Instagram variants
export const MASTERCLASS_MODELS: MasterClassModel[] = [
  ...CORE_MASTERCLASS_MODELS,
  ...INSTAGRAM_MASTERCLASS_MODELS
];

/**
 * SPECIALIZED MODEL COLLECTIONS
 */

// Designer Muses - Models who embody specific designer visions
export const DESIGNER_MUSES = MASTERCLASS_MODELS.filter(m =>
  m.category === ModelCategory.DESIGNER ||
  m.professionalMatrix.brandAssociations?.some(b =>
    ['Sabyasachi', 'Manish Malhotra', 'Raw Mango'].includes(b)
  )
);

// Cultural Icons - Models who represent Indian heritage  
export const CULTURAL_ICONS = MASTERCLASS_MODELS.filter(m =>
  m.category === ModelCategory.CULTURAL ||
  m.creativeCapabilities.culturalFluency.includes('heritage') ||
  m.creativeCapabilities.culturalFluency.includes('tradition')
);

// Art School Aesthetics - Models with artistic education background
export const ART_SCHOOL_MODELS = MASTERCLASS_MODELS.filter(m =>
  m.category === ModelCategory.ARTSCHOOL ||
  m.professionalMatrix.specializations.includes('Fine Art')
);

// Editorial Excellence - Models perfect for magazine covers
export const EDITORIAL_MODELS = MASTERCLASS_MODELS.filter(m =>
  m.category === ModelCategory.EDITORIAL ||
  m.professionalMatrix.artisticRange.includes('editorial')
);

/**
 * HELPER FUNCTIONS
 */

// Get models by specific aesthetic
export function getModelsByAesthetic(aesthetic: string): MasterClassModel[] {
  return MASTERCLASS_MODELS.filter(model =>
    model.aestheticProfile.temporalMood.toLowerCase().includes(aesthetic.toLowerCase()) ||
    model.creativeCapabilities.narrativeStrength.toLowerCase().includes(aesthetic.toLowerCase())
  );
}

// Get models by height range
export function getModelsByHeight(minHeight: string, maxHeight: string): MasterClassModel[] {
  const parseHeight = (h: string) => {
    const match = h.match(/(\d+)'(\d+)/);
    if (match) {
      return parseInt(match[1]) * 12 + parseInt(match[2]);
    }
    return 0;
  };

  const min = parseHeight(minHeight);
  const max = parseHeight(maxHeight);

  return MASTERCLASS_MODELS.filter(model => {
    const height = parseHeight(model.physicalProfile.height);
    return height >= min && height <= max;
  });
}

// Get models by experience level
export function getModelsByExperience(level: 'Emerging' | 'Established' | 'Iconic' | 'Legendary'): MasterClassModel[] {
  return MASTERCLASS_MODELS.filter(model =>
    model.professionalMatrix.experienceLevel === level
  );
}

// Calculate photographer-model synergy score
export function calculateSynergy(model: MasterClassModel, photographerStyle: string): number {
  // Calculate synergy score based on aesthetic alignment
  let synergyScore = 50; // Base score

  // Check lighting preference match
  if (model.photographicSynergy.lightingMastery.some(l =>
    l.name.toLowerCase().includes(photographerStyle.toLowerCase())
  )) {
    synergyScore += 30;
  }

  // Check style alignment
  if (model.professionalMatrix.signatureStyles.some(s =>
    s.toLowerCase().includes(photographerStyle.toLowerCase())
  )) {
    synergyScore += 20;
  }

  return Math.min(100, synergyScore);
}
