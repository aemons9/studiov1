/**
 * COMPREHENSIVE ENVIRONMENTS FOR VERA MODE
 * 42 environmental presets across 4 categories from main mode
 */

export interface EnvironmentPreset {
  id: string;
  name: string;
  description: string;
  category: 'Professional' | 'Artistic' | 'Intimate' | 'Conceptual';
  lighting?: string;
  mood?: string;
}

export const PROFESSIONAL_ENVIRONMENTS: EnvironmentPreset[] = [
  {
    id: 'modern-exec-office',
    name: 'Modern Executive Office',
    description: 'Sleek modern executive office at night, with glass walls, designer furniture (Eames chair), ambient glow from monitors and city skyline',
    category: 'Professional',
    lighting: 'Ambient city glow, cool LED accents',
    mood: 'Power, sophistication, luxury'
  },
  {
    id: 'corner-office-day',
    name: 'Corner Office (Day)',
    description: 'Sun-drenched corner office with panoramic floor-to-ceiling windows overlooking bustling city. Minimalist high-end decor',
    category: 'Professional',
    lighting: 'Bright natural daylight, soft shadows',
    mood: 'Success, authority, clarity'
  },
  {
    id: 'luxury-boardroom',
    name: 'Luxury Boardroom',
    description: 'State-of-the-art boardroom with long polished mahogany table, leather chairs, advanced teleconferencing equipment',
    category: 'Professional',
    lighting: 'Recessed ceiling lights, ambient professional',
    mood: 'Leadership, decision-making, power'
  },
  {
    id: 'law-library',
    name: 'Law Library',
    description: 'Classic grand law library with floor-to-ceiling bookshelves, green banker lamps, quiet studious atmosphere',
    category: 'Professional',
    lighting: 'Warm desk lamps, ambient reading light',
    mood: 'Intellectual, refined, classic'
  },
  {
    id: 'high-tech-server',
    name: 'High-Tech Server Room',
    description: 'Cool blue-lit server room with rows of humming server racks, futuristic and industrial-corporate feel',
    category: 'Professional',
    lighting: 'Blue LED indicators, cool ambient',
    mood: 'Technological, modern, sleek'
  },
  {
    id: 'arch-firm-studio',
    name: 'Architectural Firm Studio',
    description: 'Bright open-plan architectural studio filled with models, blueprints, drafting tables under skylights',
    category: 'Professional',
    lighting: 'Natural skylight, bright diffused',
    mood: 'Creative, professional, innovative'
  },
  {
    id: 'penthouse-minimalist',
    name: 'Penthouse Apartment (Minimalist)',
    description: 'Minimalist penthouse with stark white walls, polished concrete floors, designer furniture, stunning city view',
    category: 'Professional',
    lighting: 'Natural light, designer fixtures',
    mood: 'Luxury, minimalism, exclusivity'
  },
  {
    id: 'corporate-lobby',
    name: 'Corporate Lobby',
    description: 'Expansive marble-floored lobby of modern skyscraper with large abstract sculpture, sense of scale and power',
    category: 'Professional',
    lighting: 'High dramatic overhead, marble reflections',
    mood: 'Imposing, grand, corporate'
  },
  {
    id: 'private-jet',
    name: 'Private Jet Interior',
    description: 'Luxurious interior of private jet with cream leather seats, polished wood trim, soft ambient lighting',
    category: 'Professional',
    lighting: 'Soft ambient cabin lighting',
    mood: 'Elite, exclusive, luxury travel'
  },
  {
    id: 'rooftop-helipad',
    name: 'Rooftop Helipad',
    description: 'Concrete helipad on skyscraper roof at twilight, city lights sparkling below',
    category: 'Professional',
    lighting: 'Twilight sky, city lights below',
    mood: 'Dramatic, powerful, elevated'
  }
];

export const ARTISTIC_ENVIRONMENTS: EnvironmentPreset[] = [
  {
    id: 'minimalist-gallery',
    name: 'Minimalist Art Gallery',
    description: 'Sterile white-walled art gallery with high ceilings, polished concrete floors, single large abstract painting',
    category: 'Artistic',
    lighting: 'Track lighting, gallery spots',
    mood: 'Clean, refined, contemplative'
  },
  {
    id: 'gritty-urban-loft',
    name: 'Gritty Urban Loft',
    description: 'Raw gritty urban loft with exposed brick walls, visible pipes, large industrial windows, edgy creative feel',
    category: 'Artistic',
    lighting: 'Industrial windows, ambient street light',
    mood: 'Edgy, creative, raw'
  },
  {
    id: 'empty-dance-studio',
    name: 'Empty Dance Studio',
    description: 'Empty dance studio with sprung wooden floors, wall of mirrors, soft diffused light from large windows',
    category: 'Artistic',
    lighting: 'Soft natural window light, diffused',
    mood: 'Graceful, practice, movement'
  },
  {
    id: 'sculptor-atelier',
    name: 'Sculptor\'s Atelier',
    description: 'Cluttered but organized sculptor atelier filled with clay models, tools, armatures, scent of plaster and earth',
    category: 'Artistic',
    lighting: 'Natural overhead skylights, work lights',
    mood: 'Creative, tactile, artistic'
  },
  {
    id: 'baroque-ballroom',
    name: 'Baroque Palace Ballroom',
    description: 'Opulent grand ballroom in Baroque palace with gilded moldings, crystal chandeliers, polished marble floors',
    category: 'Artistic',
    lighting: 'Crystal chandelier, golden accents',
    mood: 'Opulent, grand, classical'
  },
  {
    id: 'museum-antiquity',
    name: 'Museum (Classical Antiquity)',
    description: 'Quiet museum hall surrounded by ancient Greek and Roman marble statues, timeless classical atmosphere',
    category: 'Artistic',
    lighting: 'Soft museum spotlights, ambient',
    mood: 'Timeless, classical, refined'
  },
  {
    id: 'abandoned-theatre',
    name: 'Abandoned Theatre',
    description: 'Dusty atmospheric stage of abandoned Art Deco theatre with decaying velvet seats and single ghost light',
    category: 'Artistic',
    lighting: 'Single ghost light, dusty atmosphere',
    mood: 'Nostalgic, atmospheric, dramatic'
  },
  {
    id: 'graffiti-alley',
    name: 'Graffiti-Covered Alley',
    description: 'Vibrant graffiti-covered alleyway in bustling city, full of color, texture, urban energy',
    category: 'Artistic',
    lighting: 'Ambient street light, neon reflections',
    mood: 'Urban, vibrant, energetic'
  },
  {
    id: 'modern-glasshouse',
    name: 'Modern Glasshouse/Conservatory',
    description: 'Large modern conservatory with steel/glass structure, filled with exotic oversized tropical plants and orchids',
    category: 'Artistic',
    lighting: 'Natural filtered through glass, botanical',
    mood: 'Lush, tropical, exotic'
  },
  {
    id: 'minimalist-concrete',
    name: 'Minimalist Concrete Studio',
    description: 'Minimalist studio with dark grey/black textured concrete wall, polished concrete floor with subtle reflections',
    category: 'Artistic',
    lighting: 'Directional studio lights, minimal',
    mood: 'Industrial, minimal, stark'
  },
  {
    id: 'artist-loft-north',
    name: 'Artist\'s Loft (North Light)',
    description: 'Classic artist loft with large north-facing window just out of frame, textured neutral-toned wall background',
    category: 'Artistic',
    lighting: 'Soft north light, diffused natural',
    mood: 'Creative, painterly, classic'
  }
];

export const INTIMATE_ENVIRONMENTS: EnvironmentPreset[] = [
  {
    id: 'luxury-hotel-night',
    name: 'Luxury Hotel (Night Cityscape)',
    description: 'Luxurious modern hotel room with floor-to-ceiling windows revealing dazzling night cityscape. Immaculate high-end furniture',
    category: 'Intimate',
    lighting: 'City lights, ambient room lamps',
    mood: 'Romantic, luxurious, sophisticated'
  },
  {
    id: 'messy-hotel-room',
    name: 'Messy Luxury Hotel Room',
    description: 'Dimly lit luxurious hotel room post-celebration, messy king bed with silk sheets, clothes draped over chair',
    category: 'Intimate',
    lighting: 'Dim ambient, intimate low light',
    mood: 'Sensual, aftermath, intimate'
  },
  {
    id: 'intimate-bedroom-morning',
    name: 'Intimate Bedroom (Morning Light)',
    description: 'Intimate bedroom with soft unmade cotton sheets, gentle morning light filtering through sheer curtain',
    category: 'Intimate',
    lighting: 'Soft morning sun, diffused through curtains',
    mood: 'Peaceful, intimate, gentle'
  },
  {
    id: 'private-library-fire',
    name: 'Private Library (Fireplace)',
    description: 'Cozy private library with dark wood paneling, crackling fireplace, comfortable leather armchairs',
    category: 'Intimate',
    lighting: 'Firelight, warm ambient reading lamps',
    mood: 'Cozy, intellectual, warm'
  },
  {
    id: 'luxury-bathroom-tub',
    name: 'Luxury Bathroom & Tub',
    description: 'Spacious luxurious bathroom with marble surfaces, large freestanding bathtub filled with water, soft ambient lighting',
    category: 'Intimate',
    lighting: 'Soft bathroom ambient, candles',
    mood: 'Luxurious, relaxing, sensual'
  },
  {
    id: 'secluded-cabin-woods',
    name: 'Secluded Cabin in Woods',
    description: 'Rustic yet modern cabin deep in woods with large window onto pine forest, warm inviting interior',
    category: 'Intimate',
    lighting: 'Warm interior, natural forest light',
    mood: 'Secluded, natural, cozy'
  },
  {
    id: 'private-gallery-space',
    name: 'Private Gallery Space',
    description: 'Private intimate studio sanctuary for personal reflection, soft textures, single comfortable chaise lounge',
    category: 'Intimate',
    lighting: 'Soft directional, contemplative',
    mood: 'Personal, reflective, private'
  },
  {
    id: 'rainy-window-nook',
    name: 'Rainy Window Nook',
    description: 'Comfortable window seat in high-rise apartment, rain streaking glass, city lights blurred in background',
    category: 'Intimate',
    lighting: 'Ambient city glow, rain diffusion',
    mood: 'Contemplative, atmospheric, cozy'
  },
  {
    id: 'velvet-boudoir',
    name: 'Velvet-Draped Boudoir',
    description: 'Classic boudoir with heavy velvet curtains, antique furniture, soft sensual private atmosphere',
    category: 'Intimate',
    lighting: 'Soft lamp glow, intimate shadows',
    mood: 'Sensual, classic, private'
  },
  {
    id: 'tuscan-villa-patio',
    name: 'Sun-Drenched Tuscan Villa Patio',
    description: 'Rustic stone patio of private Tuscan villa bathed in warm golden late afternoon light, overlooking rolling hills',
    category: 'Intimate',
    lighting: 'Golden hour, warm Mediterranean sun',
    mood: 'Romantic, luxurious, serene'
  }
];

export const CONCEPTUAL_ENVIRONMENTS: EnvironmentPreset[] = [
  {
    id: 'infinite-white-void',
    name: 'Infinite White Void',
    description: 'Infinite seamless white void/cyclorama where subject is only element, creating isolation and focus on form',
    category: 'Conceptual',
    lighting: 'Even diffused white, shadowless',
    mood: 'Minimal, isolated, pure'
  },
  {
    id: 'infinite-black-void',
    name: 'Infinite Black Void',
    description: 'Infinite light-absorbing black void where form is carved from darkness by carefully placed lighting',
    category: 'Conceptual',
    lighting: 'Selective dramatic, form-carving',
    mood: 'Dramatic, mysterious, sculptural'
  },
  {
    id: 'room-of-mirrors',
    name: 'Room of Mirrors',
    description: 'Room where walls, floor, ceiling covered in mirrors creating endless fragmented reflection of subject',
    category: 'Conceptual',
    lighting: 'Multidirectional reflected, complex',
    mood: 'Surreal, fragmented, infinite'
  },
  {
    id: 'submerged-water',
    name: 'Submerged in Water',
    description: 'Subject floating gracefully in clear still water, fabric billowing around, light refracting from surface',
    category: 'Conceptual',
    lighting: 'Refracted underwater, ethereal',
    mood: 'Ethereal, graceful, fluid'
  },
  {
    id: 'abstract-geometric',
    name: 'Abstract Geometric Set',
    description: 'Physical set of large monochromatic geometric shapes (cubes, spheres, pyramids) for subject interaction',
    category: 'Conceptual',
    lighting: 'Dramatic directional, shape-defining',
    mood: 'Abstract, geometric, architectural'
  },
  {
    id: 'single-color-flowers',
    name: 'Field of Single-Color Flowers',
    description: 'Endless surreal field of flowers all exact same vibrant color (scarlet poppies or cobalt blue irises)',
    category: 'Conceptual',
    lighting: 'Soft natural, color-saturating',
    mood: 'Surreal, monochromatic, dreamlike'
  },
  {
    id: 'cloudscape-sunset',
    name: 'Cloudscape at Sunset',
    description: 'Subject appears sitting/standing on solid bank of clouds during vibrant surreal sunset',
    category: 'Conceptual',
    lighting: 'Sunset colors, cloud diffusion',
    mood: 'Surreal, heavenly, fantastical'
  },
  {
    id: 'cyberpunk-alley',
    name: 'Neon-Lit Cyberpunk Alley',
    description: 'Narrow rain-slicked alley in futuristic cyberpunk city, illuminated by vibrant neon signs and holographic ads',
    category: 'Conceptual',
    lighting: 'Neon multicolored, reflective wet',
    mood: 'Futuristic, vibrant, urban'
  },
  {
    id: 'surrealist-desert',
    name: 'Surrealist Desert Landscape',
    description: 'Dreamlike desert landscape inspired by Dali/Tanguy with melting clocks, strange formations, dramatic painted sky',
    category: 'Conceptual',
    lighting: 'Surreal painted sky, dramatic',
    mood: 'Surreal, dreamlike, artistic'
  },
  {
    id: 'projected-universe',
    name: 'Projected Universe',
    description: 'Subject in dark room with images of nebulae and galaxies projected onto their form and surrounding walls',
    category: 'Conceptual',
    lighting: 'Projected cosmic patterns, dark ambient',
    mood: 'Cosmic, ethereal, sci-fi'
  }
];

export const ALL_ENVIRONMENTS = [
  ...PROFESSIONAL_ENVIRONMENTS,
  ...ARTISTIC_ENVIRONMENTS,
  ...INTIMATE_ENVIRONMENTS,
  ...CONCEPTUAL_ENVIRONMENTS
];

export function getEnvironmentById(id: string): EnvironmentPreset | undefined {
  return ALL_ENVIRONMENTS.find(env => env.id === id);
}

export function getEnvironmentsByCategory(category: 'Professional' | 'Artistic' | 'Intimate' | 'Conceptual'): EnvironmentPreset[] {
  return ALL_ENVIRONMENTS.filter(env => env.category === category);
}

export function getRandomEnvironment(category?: 'Professional' | 'Artistic' | 'Intimate' | 'Conceptual'): EnvironmentPreset {
  const pool = category ? getEnvironmentsByCategory(category) : ALL_ENVIRONMENTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const ENVIRONMENT_CATEGORIES = {
  Professional: PROFESSIONAL_ENVIRONMENTS,
  Artistic: ARTISTIC_ENVIRONMENTS,
  Intimate: INTIMATE_ENVIRONMENTS,
  Conceptual: CONCEPTUAL_ENVIRONMENTS
};
