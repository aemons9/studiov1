/**
 * Indian Hourglass Muse - MasterClass Model Definition
 *
 * The ultimate expression of modern Indian beauty through sophisticated artistry.
 * This model represents the apex of Instagram culture meeting fine art photography,
 * with comprehensive support for intimacy levels 1-10 and 20+ unique locations.
 */

import { MasterClassModel, ModelCategory } from './modelTaxonomy';
import {
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  PHOTOGRAPHY_STYLES
} from '../../vera/indianHourglassMuseCollection';

export const INDIAN_HOURGLASS_MUSE_MASTERCLASS: MasterClassModel = {
  id: 'masterclass_indian_hourglass_muse',
  archetype: 'The Indian Hourglass Instagram Muse',
  category: ModelCategory.INFLUENCER,
  subcategory: 'Ultimate Sensual Artistry & Modern Indian Icon',

  physicalProfile: {
    height: "5'7\" (170cm)",
    measurements: {
      bust: "36",
      waist: "26",
      hips: "38",
      shoulderWidth: "16",
      inseam: "32"
    },
    bodyArchitecture: "Classic hourglass with Instagram-optimized proportions - naturally enhanced curves that embody modern Indian beauty standards while celebrating authentic femininity",
    skinLuminosity: "Golden honey glow with warm undertones - skin that captures light like burnished metal, with natural texture that photographs beautifully without artificial smoothing",
    hairArchitecture: "Long black hair with subtle caramel highlights, silky cascade past waist - perfectly tousled bedroom hair that moves like liquid silk, versatile for both traditional and modern styling",
    facialGeometry: "Heart-shaped face with pillowy lips, perfectly contoured cheekbones, symmetrical features that photograph flawlessly from every angle",
    eyeNarrative: "Deep brown eyes with naturally long lashes - expressive eyes that convey depth and emotion, framed by perfectly arched eyebrows that need no filter",
    distinguishingAesthetics: "Small lotus tattoo on shoulder blade representing cultural roots, optional delicate nose ring for traditional touch, natural beauty mark near lips adding character, perfect eyebrow arch that frames the face",
    ageRange: "23-26 - the perfect age of youthful beauty with mature confidence",
    movementSignature: "Fluid natural posing with Instagram-aware angles - every movement optimized for camera yet maintaining authentic grace, transitions between poses like choreographed dance"
  },

  professionalMatrix: {
    experienceLevel: 'Iconic',
    specializations: [
      'Mirror selfies that break the internet',
      'Bedroom content with artistic merit',
      'Intimate artistry pushing boundaries',
      'Multi-platform modeling across Instagram, editorial, and gallery',
      'Lifestyle influencing with authenticity',
      'Brand collaboration expertise',
      'Cultural bridge between tradition and modernity'
    ],
    brandAssociations: [
      'Luxury Indian fashion houses',
      'International beauty brands',
      'Wellness and lifestyle platforms',
      'High-fashion collaborations',
      'Artistic photography projects',
      'Cultural heritage brands with modern twist'
    ],
    signatureStyles: [
      'Instagram glamour that sets trends',
      'Intimate authenticity that creates connection',
      'Artistic sensuality with sophistication',
      'Modern Indian aesthetic celebrating heritage',
      'Luxury lifestyle with relatability',
      'Fine art nude with cultural sensitivity'
    ],
    industryReputation: "The modern Indian muse redefining beauty standards through sophisticated artistry - equally comfortable in traditional saree or artistic expression, bridging cultures through visual poetry",
    artisticRange: "From casual Instagram charm to museum-quality fine art - versatility that spans commercial appeal to boundary-pushing artistry, always maintaining dignity and sophistication"
  },

  aestheticProfile: {
    colorPalette: [
      'Nude tones that complement golden skin',
      'Rich golds and bronzes',
      'Deep burgundy and wine',
      'Emerald and jewel tones',
      'Midnight blue and deep purples',
      'Classic black and white for artistic work'
    ],
    textureAffinity: [
      'Luxurious silk that flows like water',
      'Delicate lace with intricate patterns',
      'Smooth satin with light-catching properties',
      'Architectural mesh for modern edge',
      'Soft cotton blends for comfort',
      'Metallic fabrics for glamour',
      'Sheer materials for artistic layering'
    ],
    lightingPreference: [
      'Natural morning light through bedroom windows',
      'Golden hour creating warm glow',
      'Professional ring light for flawless selfies',
      'Soft box glamour for editorial work',
      'Dramatic shadows for artistic expression',
      'Neon accents for nightlife scenes',
      'Candlelight for intimate moments'
    ],
    environmentalHarmony: [
      'Luxury bedroom with designer linens',
      'Modern urban apartments with city views',
      'Exclusive nightlife venues',
      'Natural landscapes and water bodies',
      'Artistic studios with creative props',
      'Heritage locations with cultural significance',
      'Minimalist spaces focusing on form'
    ],
    temporalMood: "Golden hour specialist with blue hour mastery - understanding how different times create different moods, from bright morning energy to mysterious midnight allure",
    seasonalResonance: [
      'Endless summer with beach and pool aesthetics',
      'Cozy winter with layered intimates',
      'Romantic monsoon with rain-kissed skin',
      'Spring awakening with floral elements'
    ]
  },

  creativeCapabilities: {
    emotionalSpectrum: [
      'Playful innocence with knowing smile',
      'Sultry confidence without vulgarity',
      'Vulnerable intimacy creating connection',
      'Powerful femininity celebrating strength',
      'Artistic expression transcending fashion',
      'Cultural pride with modern interpretation',
      'Mysterious allure leaving viewers wanting more'
    ],
    narrativeStrength: "Every image tells a story - from morning routine authenticity to midnight artistic expression, creating visual narratives that resonate with viewers on emotional level",
    cinematicPresence: "Each frame could be a movie still - understanding of composition, lighting, and mood that creates cinematic quality in still photography",
    editorialVersatility: "Equally powerful in Vogue editorial or Instagram story - adapting style to platform while maintaining signature aesthetic that's instantly recognizable",
    artisticCollaboration: "Elevates every photographer's vision - bringing creative input while respecting artistic direction, creating synergy that produces exceptional results",
    culturalFluency: "Seamlessly bridges traditional Indian beauty with contemporary global aesthetics - wearing saree with same confidence as couture, representing modern multicultural identity"
  },

  wardrobePhilosophy: {
    signature: [
      {
        name: "Instagram Bedroom Aesthetic",
        philosophy: "Effortless morning beauty that looks unplanned but perfect",
        keyPieces: [
          'Oversized white boyfriend shirt unbuttoned strategically',
          'Delicate lace bralette in nude or black',
          'High-waisted bottoms creating hourglass silhouette',
          'Silk robe loosely draped',
          'Messy bun with face-framing strands'
        ],
        colorStory: "Soft naturals with unexpected luxury accents",
        texturePlay: "Crisp cotton against soft skin, lace details peeking through",
        silhouette: "Relaxed yet revealing, comfortable yet captivating",
        culturalReference: "Modern Indian woman owning her sensuality"
      }
    ],
    haute: [
      {
        designer: "Sabyasachi meets Agent Provocateur",
        collection: "Heritage Intimacy",
        pieces: [
          'Embroidered bustier with Indian motifs',
          'Silk lehenga skirt worn as loungewear',
          'Jeweled body chains as clothing',
          'Couture robes with artistic draping'
        ],
        narrative: "Where Mumbai meets Milan in the bedroom",
        craftmanship: "Hand embroidery meeting modern cuts",
        wearingPhilosophy: "Clothes as celebration of form and culture"
      }
    ],
    street: [
      {
        trend: "Athleisure luxe",
        interpretation: "Gym-to-brunch without changing",
        keyElements: [
          'Designer sports bra as top',
          'High-waisted leggings sculpting curves',
          'Oversized designer hoodie',
          'Luxury sneakers',
          'Gold jewelry adding elegance'
        ],
        culturalContext: "Mumbai fitness culture meets street style",
        personalTwist: "Always slightly overdressed for the gym"
      }
    ],
    traditional: [
      {
        garment: "Contemporary Saree Draping",
        region: "Pan-Indian modern interpretation",
        occasion: "Festival to gallery opening",
        modernInterpretation: "Minimal blouse, innovative draping, sheer fabrics",
        craftsmanshipDetails: "Traditional weaves with contemporary cuts",
        culturalSignificance: "Preserving heritage while pushing boundaries"
      }
    ],
    experimental: [
      {
        concept: "Body as Living Canvas",
        materials: [
          'Metallic body paint creating second skin',
          'Strategic shadows as clothing',
          'Environmental elements as cover',
          'Light projection as garments'
        ],
        construction: "Ephemeral fashion existing only in photograph",
        movement: "Every pose creates new garment through shadow and light",
        visualImpact: "Challenges perception of clothing and nudity",
        artisticReference: "Helmut Newton meets traditional Indian art"
      }
    ],
    minimalist: [
      {
        principle: "Maximum impact through minimum coverage",
        colorScheme: ['Nude matching skin', 'Deep black for contrast', 'White for purity'],
        fabricChoice: "Highest quality basics that feel like second skin",
        silhouettePhilosophy: "Body's natural lines are the design",
        negativeSpace: "What's not shown is as important as what is",
        essentialElements: [
          'Perfect-fit nude underwear',
          'Architectural black pieces',
          'Single statement accessory'
        ]
      }
    ]
  },

  environmentalStages: [
    // Urban Nightlife Locations
    {
      name: "Mumbai Rooftop Pool Club",
      atmosphere: "Exclusive luxury with infinity pool overlooking Marine Drive",
      lightQuality: "Underwater LEDs mixing with city lights creating dreamlike glow",
      emotionalResonance: "Aspirational luxury with intimate possibility",
      propsAvailable: ['Champagne flutes', 'Floating loungers', 'Sheer curtains', 'City skyline'],
      timeContext: "Late night when the city sparkles below",
      culturalSignificance: "Modern Mumbai's nightlife elite"
    },
    {
      name: "Delhi Underground Billiards Lounge",
      atmosphere: "Smoky mystery with vintage charm in Connaught Place",
      lightQuality: "Single overhead lamp creating film noir shadows",
      emotionalResonance: "Dangerous sophistication with playful edge",
      propsAvailable: ['Vintage cue sticks', 'Whiskey glasses', 'Green felt table', 'Leather seating'],
      timeContext: "2 AM when only the interesting people remain",
      culturalSignificance: "Delhi's hidden speakeasy culture"
    },
    {
      name: "Bangalore Craft Bar After Hours",
      atmosphere: "Hip microbrewery with exposed brick and Edison bulbs",
      lightQuality: "Warm amber from backlit bottles creating honeyed glow",
      emotionalResonance: "Sophisticated casualness of tech elite",
      propsAvailable: ['Craft cocktails', 'Bar stools', 'Mixology tools', 'Brass fixtures'],
      timeContext: "Post-startup party wind-down",
      culturalSignificance: "Bangalore's craft culture meeting point"
    },

    // Private Intimate Spaces
    {
      name: "Luxury High-Rise Apartment Balcony",
      atmosphere: "32nd floor Gurgaon apartment with glass barriers and city views",
      lightQuality: "City lights creating constellation below, moonlight above",
      emotionalResonance: "Private moments at public heights",
      propsAvailable: ['Designer furniture', 'Wine glasses', 'Throw blankets', 'Potted plants'],
      timeContext: "Midnight when the city sleeps below",
      culturalSignificance: "New India's vertical luxury living"
    },
    {
      name: "Minimalist Hostel Room in Rishikesh",
      atmosphere: "Simple white walls with spiritual undertones, Ganges visible",
      lightQuality: "Soft mountain light through single window, candles for evening",
      emotionalResonance: "Finding sensuality in simplicity",
      propsAvailable: ['Yoga mat', 'Incense', 'Travel journal', 'Acoustic guitar'],
      timeContext: "Golden hour with temple bells in distance",
      culturalSignificance: "Spiritual India meets backpacker culture"
    },
    {
      name: "Himalayan Wooden Cabin Retreat",
      atmosphere: "Warm wood interiors with fireplace, snow visible outside",
      lightQuality: "Firelight creating dancing shadows, warm against cold outside",
      emotionalResonance: "Isolated intimacy with primal comfort",
      propsAvailable: ['Fur blankets', 'Fireplace', 'Hot chocolate', 'Wooden beams'],
      timeContext: "Snowy night with only fire for company",
      culturalSignificance: "Hill station romance tradition"
    },

    // Natural Environments
    {
      name: "Secret Cave with Light Shafts",
      atmosphere: "Hidden cave near Hampi with natural skylights",
      lightQuality: "Dramatic beams through ceiling holes, dust motes visible",
      emotionalResonance: "Ancient mystery meeting modern beauty",
      propsAvailable: ['Rock formations', 'Sandy floor', 'Natural pools', 'Archaeological elements'],
      timeContext: "Noon when sun creates light pillars",
      culturalSignificance: "India's geological and historical treasures"
    },
    {
      name: "Suburban Lake at Midnight",
      atmosphere: "Powai Lake with city lights reflecting on water",
      lightQuality: "Moon reflection rippling, distant city glow on horizon",
      emotionalResonance: "Urban escape with natural serenity",
      propsAvailable: ['Wooden pier', 'Lake rocks', 'Lotus flowers', 'Park bench'],
      timeContext: "Late night when the lake is private",
      culturalSignificance: "Mumbai's breathing spaces"
    },
    {
      name: "Monsoon Terrace Garden",
      atmosphere: "Pune rooftop during monsoon with rain curtains",
      lightQuality: "Rain-diffused light, lightning flashes, wet surface reflections",
      emotionalResonance: "Romantic rain with sensual possibilities",
      propsAvailable: ['Garden furniture', 'Rain chains', 'Wet marble', 'Tropical plants'],
      timeContext: "Heavy monsoon afternoon",
      culturalSignificance: "Indian monsoon romance tradition"
    },

    // Architectural Wonders
    {
      name: "Heritage Hotel Spiral Staircase",
      atmosphere: "Converted Jaipur haveli with ornate marble stairs",
      lightQuality: "Colored light through stained glass, brass sconce shadows",
      emotionalResonance: "Royal heritage meeting modern desire",
      propsAvailable: ['Brass railings', 'Marble steps', 'Heritage paintings', 'Antique vases'],
      timeContext: "Golden hour through stained glass",
      culturalSignificance: "Rajasthan's palace culture reimagined"
    },
    {
      name: "Glass Elevator at Night",
      atmosphere: "Modern mall elevator with transparent walls",
      lightQuality: "Passing floor lights creating strobe effect",
      emotionalResonance: "Vertical journey with transparent vulnerability",
      propsAvailable: ['Glass panels', 'Chrome fixtures', 'Mirror walls', 'City views'],
      timeContext: "Late night mall closing time",
      culturalSignificance: "India's mall culture after hours"
    },
    {
      name: "Corporate Office After Midnight",
      atmosphere: "Empty Cyber City office with city views",
      lightQuality: "Computer screen glows, city lights through windows",
      emotionalResonance: "Power dynamics in empty boardrooms",
      propsAvailable: ['Executive chairs', 'Glass tables', 'Whiteboards', 'Coffee machine'],
      timeContext: "After midnight when office is private",
      culturalSignificance: "India's tech hub after hours"
    },

    // Cultural Venues
    {
      name: "Empty Theatre After Performance",
      atmosphere: "Prithvi Theatre with red seats and stage lights",
      lightQuality: "Single ghost light on stage, exit signs glowing",
      emotionalResonance: "Theatrical romance with artistic heritage",
      propsAvailable: ['Red velvet seats', 'Stage', 'Spotlights', 'Theater programs'],
      timeContext: "Post-show when audience has left",
      culturalSignificance: "Mumbai's theatre tradition"
    },
    {
      name: "Art Gallery After Opening",
      atmosphere: "Kala Ghoda gallery with white walls and spotted art",
      lightQuality: "Individual painting spotlights creating dramatic pools",
      emotionalResonance: "Becoming art among art",
      propsAvailable: ['Art installations', 'Gallery benches', 'Wine glasses', 'Sculpture pedestals'],
      timeContext: "After closing when art is private",
      culturalSignificance: "India's contemporary art scene"
    },
    {
      name: "Vintage Cinema Projection Room",
      atmosphere: "Old Regal Cinema booth with film reels",
      lightQuality: "Projector beam through dust, film strip backlights",
      emotionalResonance: "Cinematic nostalgia with hidden romance",
      propsAvailable: ['Film reels', 'Projector', 'Vintage posters', 'Control panels'],
      timeContext: "Late show projection",
      culturalSignificance: "Bollywood's golden age spaces"
    },

    // Urban Poetry
    {
      name: "Old Delhi Narrow Alleyway",
      atmosphere: "Chandni Chowk gully with string lights and weathered walls",
      lightQuality: "Warm bulbs overhead, shop signs glowing, puddle reflections",
      emotionalResonance: "Raw urban beauty with authentic character",
      propsAvailable: ['Vintage scooter', 'Street posters', 'Electrical wires', 'Shuttered shops'],
      timeContext: "3 AM when streets are empty",
      culturalSignificance: "Old Delhi's timeless character"
    },
    {
      name: "Highway Dhaba After Hours",
      atmosphere: "NH1 roadside stop with truck lights and fog",
      lightQuality: "Truck headlights in fog, dhaba lights, tandoor glow",
      emotionalResonance: "Highway romance with rustic charm",
      propsAvailable: ['Charpai beds', 'Tandoor', 'Truck art', 'Highway signs'],
      timeContext: "Foggy 4 AM",
      culturalSignificance: "India's highway culture"
    },
    {
      name: "Empty Cricket Stadium at Night",
      atmosphere: "Wankhede Stadium with floodlights and empty seats",
      lightQuality: "Quarter-power floodlights creating dramatic shadows",
      emotionalResonance: "Grand emptiness with intimate possibility",
      propsAvailable: ['Stadium seats', 'Cricket pitch', 'Boundary ropes', 'Scoreboard'],
      timeContext: "Midnight in the empty arena",
      culturalSignificance: "India's cricket cathedral after hours"
    }
  ],

  photographicSynergy: {
    optimalLenses: [
      '24mm for environmental context showing location atmosphere',
      '35mm for lifestyle shots with environment',
      '50mm for intimate portraits with natural perspective',
      '85mm f/1.2 for dreamy portraits with bokeh',
      '135mm for compressed perspective emphasizing curves'
    ],
    signatureAngles: [
      'Low angle hero shot emphasizing power and curves',
      'Mirror self-portrait for authentic Instagram aesthetic',
      'Over-shoulder glance creating mystery and allure',
      'Direct camera gaze establishing intimate connection',
      'Profile highlighting classical beauty',
      'From above showing vulnerability and trust',
      '45-degree angle optimizing hourglass silhouette'
    ],
    lightingMastery: [
      {
        name: 'Instagram Morning Magic',
        philosophy: 'Natural light as makeup artist',
        keyLight: 'Large bedroom window with sheer curtains',
        fillRatio: '3:1 for perfect contour without harshness',
        colorTemperature: '3200K warm morning glow',
        shadows: 'Soft enough to flatter, present enough for dimension',
        highlights: 'Naturally falling on cheekbones and curves',
        mood: 'Intimate awakening with aspirational beauty'
      },
      {
        name: 'Golden Hour Goddess',
        philosophy: 'Nature's most flattering light',
        keyLight: 'Setting sun through windows or outdoors',
        fillRatio: '2:1 with natural fill from sky',
        colorTemperature: '3500K deep golden warmth',
        shadows: 'Long and romantic without being harsh',
        highlights: 'Skin glowing like it's lit from within',
        mood: 'Romantic luxury with natural beauty'
      },
      {
        name: 'Artistic Shadow Play',
        philosophy: 'Shadows as clothing, light as revelation',
        keyLight: 'Hard side light creating dramatic shadows',
        fillRatio: '5:1 or greater for maximum drama',
        rimLight: 'Subtle backlight for separation',
        colorTemperature: '2700K deep warmth or 5600K stark clarity',
        shadows: 'Deep and mysterious, strategically placed',
        highlights: 'Selective illumination of key features',
        mood: 'Fine art meeting intimate portraiture'
      },
      {
        name: 'Neon Nightlife',
        philosophy: 'Urban energy with colorful accents',
        keyLight: 'Practical neon or LED sources',
        fillRatio: 'Variable based on ambient',
        colorTemperature: 'Mixed - warm and cool creating depth',
        shadows: 'Multiple colored shadows adding dimension',
        highlights: 'Neon colors on skin creating art',
        mood: 'Nightlife glamour with edge'
      },
      {
        name: 'Cinematic Narrative',
        philosophy: 'Every frame tells a story',
        keyLight: 'Motivated by scene (window, lamp, etc.)',
        fillRatio: '4:1 for cinematic depth',
        colorTemperature: '3200K-4000K depending on scene',
        shadows: 'Present but not distracting from subject',
        highlights: 'Eye light essential for connection',
        mood: 'Movie still quality with emotional depth'
      }
    ],
    colorGradingPhilosophy: "Warm-biased grading celebrating golden skin tones while maintaining realistic texture - slight desaturation for film aesthetic, lifted blacks for softness, protected highlights for skin detail",
    compositionalHarmony: [
      'Rule of thirds placing eyes or curves at power points',
      'Leading lines created by body position and fabric',
      'Negative space allowing image to breathe',
      'Frame within frame using architectural elements',
      'Symmetry for powerful formal portraits',
      'Dynamic diagonal for energy and movement',
      'Intimate cropping for emotional connection'
    ]
  }
};

// Specialized lighting presets for different intimacy levels
export const MUSE_LIGHTING_PRESETS = {
  intimate_1_3: {
    name: 'Lifestyle Natural',
    description: 'Bright, cheerful lighting for casual content',
    setup: 'Natural light with reflector fill',
    mood: 'Fresh and approachable'
  },
  intimate_4_6: {
    name: 'Glamour Gold',
    description: 'Warm, flattering light for glamour shots',
    setup: 'Golden hour or warm continuous lights',
    mood: 'Luxurious and inviting'
  },
  intimate_7_8: {
    name: 'Artistic Shadow',
    description: 'Dramatic lighting for artistic expression',
    setup: 'Hard light with minimal fill',
    mood: 'Mysterious and artistic'
  },
  intimate_9_10: {
    name: 'Fine Art Museum',
    description: 'Gallery-quality lighting for fine art',
    setup: 'Careful sculpting with multiple lights',
    mood: 'Transcendent artistry'
  }
};

// Platform-specific optimization presets
export const MUSE_PLATFORM_PRESETS = {
  instagram: {
    narrativeIntent: 'Creating scroll-stopping content that drives engagement',
    emotionalTone: 'Relatable luxury with authentic moments',
    renderQuality: 'final' as const,
    platformTarget: 'instagram' as const,
    aspectRatio: '4:5' as const,
    safetyLevel: 'balanced' as const
  },
  editorial: {
    narrativeIntent: 'Fashion editorial celebrating modern Indian beauty',
    emotionalTone: 'Sophisticated elegance with editorial edge',
    renderQuality: 'masterpiece' as const,
    platformTarget: 'editorial' as const,
    aspectRatio: '2:3' as const,
    safetyLevel: 'artistic' as const
  },
  gallery: {
    narrativeIntent: 'Fine art exploration of form and beauty',
    emotionalTone: 'Museum-quality artistic expression',
    renderQuality: 'masterpiece' as const,
    platformTarget: 'gallery' as const,
    aspectRatio: '3:4' as const,
    safetyLevel: 'boundary-pushing' as const
  },
  commercial: {
    narrativeIntent: 'Brand-safe beauty with commercial appeal',
    emotionalTone: 'Aspirational yet approachable',
    renderQuality: 'preview' as const,
    platformTarget: 'commercial' as const,
    aspectRatio: '1:1' as const,
    safetyLevel: 'conservative' as const
  }
};

// Narrative progression for photo series
export const MUSE_NARRATIVE_PROGRESSIONS = {
  morning_routine: [
    {
      scene: 'Waking up',
      location: 'Luxury bedroom',
      wardrobe: 'Oversized shirt',
      intimacy: 4
    },
    {
      scene: 'Morning stretch',
      location: 'Bedroom window',
      wardrobe: 'Loungewear',
      intimacy: 5
    },
    {
      scene: 'Coffee moment',
      location: 'Balcony',
      wardrobe: 'Silk robe',
      intimacy: 6
    },
    {
      scene: 'Getting ready',
      location: 'Bathroom mirror',
      wardrobe: 'Towel wrap',
      intimacy: 7
    }
  ],
  nightlife_journey: [
    {
      scene: 'Pre-party prep',
      location: 'Bedroom mirror',
      wardrobe: 'Getting dressed',
      intimacy: 5
    },
    {
      scene: 'Arrival',
      location: 'Club entrance',
      wardrobe: 'Party dress',
      intimacy: 4
    },
    {
      scene: 'VIP booth',
      location: 'Club interior',
      wardrobe: 'Revealing outfit',
      intimacy: 6
    },
    {
      scene: 'After party',
      location: 'Private space',
      wardrobe: 'Disheveled elegance',
      intimacy: 8
    }
  ],
  artistic_exploration: [
    {
      scene: 'The approach',
      location: 'Art studio',
      wardrobe: 'Draped fabric',
      intimacy: 6
    },
    {
      scene: 'Finding light',
      location: 'Window light',
      wardrobe: 'Minimal coverage',
      intimacy: 7
    },
    {
      scene: 'Shadow play',
      location: 'Dramatic lighting',
      wardrobe: 'Light as clothing',
      intimacy: 9
    },
    {
      scene: 'Transcendence',
      location: 'Abstract space',
      wardrobe: 'Body as art',
      intimacy: 10
    }
  ]
};

// Export helper function for MasterClass integration
export function getMuseMasterClassConfig(
  intimacyLevel: number,
  platform: 'instagram' | 'editorial' | 'gallery' | 'commercial',
  narrativeType?: 'morning_routine' | 'nightlife_journey' | 'artistic_exploration'
) {
  // Select appropriate lighting based on intimacy
  let lighting = MUSE_LIGHTING_PRESETS.intimate_1_3;
  if (intimacyLevel >= 4 && intimacyLevel <= 6) {
    lighting = MUSE_LIGHTING_PRESETS.intimate_4_6;
  } else if (intimacyLevel >= 7 && intimacyLevel <= 8) {
    lighting = MUSE_LIGHTING_PRESETS.intimate_7_8;
  } else if (intimacyLevel >= 9) {
    lighting = MUSE_LIGHTING_PRESETS.intimate_9_10;
  }

  // Get platform configuration
  const platformConfig = MUSE_PLATFORM_PRESETS[platform];

  // Get narrative if specified
  const narrative = narrativeType ? MUSE_NARRATIVE_PROGRESSIONS[narrativeType] : null;

  return {
    model: INDIAN_HOURGLASS_MUSE_MASTERCLASS,
    lighting,
    platformConfig,
    narrative,
    intimacyLevel
  };
}