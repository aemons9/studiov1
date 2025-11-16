import type { ModelEnvironment } from './types';

export const ENVIRONMENTS_CATALOG: ModelEnvironment[] = [
  {
    id: 'penthouse-suite',
    name: 'Luxury Penthouse Suite',
    description: 'A sprawling penthouse with floor-to-ceiling windows overlooking a sparkling city at night. Features modern, minimalist furniture, a marble fireplace, and a sense of opulent isolation.',
    atmosphere: 'Sophisticated, powerful, intimate, and luxurious.',
    privacyLevel: 10,
    luxuryLevel: 10,
    lightingProfile: 'Soft ambient light from the city below, mixed with the warm, flickering glow of the fireplace and strategically placed designer lamps.',
    materialPalette: ['Polished Marble', 'Plush Velvet', 'Smoked Glass', 'Dark Mahogany Wood']
  },
  {
    id: 'maharaja-palace',
    name: 'Opulent Maharaja\'s Palace',
    description: 'An immaculately restored room in a Rajasthani palace, featuring intricate archways, silk tapestries, a plush divan, and the soft light of ornate lanterns.',
    atmosphere: 'Historic, regal, sensual, and exotic.',
    privacyLevel: 9,
    luxuryLevel: 10,
    lightingProfile: 'Soft, diffused light filtering through carved jali screens, complemented by the warm, golden glow of numerous brass lanterns and candles.',
    materialPalette: ['Hand-carved Sandstone', 'Embroidered Silk', 'Polished Brass', 'Inlaid Mother-of-Pearl']
  },
  {
    id: 'neon-alley',
    name: 'Rain-Soaked Neon Alley',
    description: 'A narrow, gritty alley in a futuristic city, slick with rain. The scene is illuminated only by the vibrant, chaotic glow of neon signs reflecting off wet pavement.',
    atmosphere: 'Cyberpunk, mysterious, edgy, and cinematic.',
    privacyLevel: 7,
    luxuryLevel: 3,
    lightingProfile: 'High-contrast, colorful lighting from neon signs in cyan, magenta, and electric blue, creating dramatic highlights and deep, inky shadows.',
    materialPalette: ['Wet Asphalt', 'Corrugated Metal', 'Glowing Neon Tubes', 'Grime-covered Brick']
  },
  {
    id: 'art-gallery',
    name: 'Modern Art Gallery After Hours',
    description: 'A stark, minimalist art gallery, empty of visitors. Large, abstract canvases and dramatic sculptures create a backdrop of sophisticated creativity.',
    atmosphere: 'Chic, intellectual, sterile, and quietly intense.',
    privacyLevel: 8,
    luxuryLevel: 8,
    lightingProfile: 'Precisely controlled track lighting illuminating specific art pieces, creating pools of light and shadow on the polished concrete floors.',
    materialPalette: ['Polished Concrete', 'White Gallery Walls', 'Large-scale Canvas', 'Brushed Steel Sculptures']
  },
  {
    id: 'secluded-beach',
    name: 'Secluded Beach at Sunset',
    description: 'An untouched stretch of black sand beach as the sun dips below the horizon, casting the sky in fiery colors. Volcanic rock formations create dramatic silhouettes.',
    atmosphere: 'Primal, romantic, serene, and dramatic.',
    privacyLevel: 9,
    luxuryLevel: 7,
    lightingProfile: 'The warm, golden-hour light of a dramatic sunset, creating long shadows and a rich, saturated color palette.',
    materialPalette: ['Black Volcanic Sand', 'Weathered Driftwood', 'Turquoise Water', 'Basalt Rock Formations']
  },
   {
    id: 'industrial-loft',
    name: 'Industrial Loft with City Views',
    description: 'A spacious, open-plan loft in a converted warehouse, featuring exposed brick walls, large factory windows, and a mix of vintage and modern furnishings.',
    atmosphere: 'Urban, artistic, raw, and spacious.',
    privacyLevel: 8,
    luxuryLevel: 7,
    lightingProfile: 'Abundant natural light from massive windows during the day, transitioning to the warm tungsten glow of Edison bulbs and city lights at night.',
    materialPalette: ['Exposed Red Brick', 'Reclaimed Wood Beams', 'Polished Concrete Floors', 'Blackened Steel Frames']
  },
  {
    id: 'vintage-train',
    name: 'Vintage Orient Express Carriage',
    description: 'An opulent, restored train carriage from the 1920s, featuring polished wood paneling, velvet upholstery, and Art Deco details, moving through a misty landscape.',
    atmosphere: 'Nostalgic, mysterious, luxurious, and adventurous.',
    privacyLevel: 9,
    luxuryLevel: 9,
    lightingProfile: 'Soft, warm light from brass Art Deco sconces, creating an intimate and glamorous ambiance against the passing scenery.',
    materialPalette: ['Inlaid Marquetry Wood', 'Plush Velvet Seating', 'Polished Brass Fixtures', 'Etched Glass']
  },
  {
    id: 'photography-studio',
    name: 'Professional Photography Studio',
    description: 'Minimalist photography studio with seamless grey backdrop, polished concrete floor creating subtle reflections, vast negative space for fine art compositions.',
    atmosphere: 'Gallery-like fine art atmosphere with professional precision.',
    privacyLevel: 10,
    luxuryLevel: 8,
    lightingProfile: 'Dramatic hard light from high side angle creating sharp shadows. Rim light separating form from background with luminous edge.',
    materialPalette: ['Seamless Grey Backdrop', 'Polished Concrete', 'Professional Lighting Equipment', 'Negative Space']
  },
  {
    id: 'industrial-minimal',
    name: 'Industrial Minimalist Space',
    description: 'Raw industrial space with textured concrete walls, dramatic shadows, and cold ambient light creating stark, powerful atmosphere.',
    atmosphere: 'Urban edge with architectural power and theatrical drama.',
    privacyLevel: 9,
    luxuryLevel: 6,
    lightingProfile: 'Hard directional lighting creating strong definition and theatrical shadows. Rim light for dimensional depth.',
    materialPalette: ['Textured Concrete Walls', 'Raw Industrial Elements', 'Metal Surfaces', 'Dramatic Shadows']
  },
  {
    id: 'luxury-boudoir',
    name: 'Luxury Private Boudoir',
    description: 'Intimate luxury bedroom with ivory silk sheets, soft white walls, sheer curtains, and warm morning light creating private sanctuary.',
    atmosphere: 'Intimate, romantic, and dreamily vulnerable.',
    privacyLevel: 10,
    luxuryLevel: 10,
    lightingProfile: 'Soft natural window light creating dreamy luminous quality. Gentle wrap-around lighting with minimal shadows.',
    materialPalette: ['Ivory Silk Sheets', 'Soft White Walls', 'Sheer Curtains', 'Plush Pillows']
  },
  {
    id: 'art-deco-suite',
    name: 'Art Deco Hotel Suite',
    description: 'Opulent art deco hotel suite with rich burgundy velvet furniture, gold accents, dramatic shadows, and warm amber lighting from vintage fixtures.',
    atmosphere: 'Film noir luxury with classic Hollywood glamour.',
    privacyLevel: 10,
    luxuryLevel: 10,
    lightingProfile: 'Classic film noir lighting with hard dramatic side light and warm practical lights adding amber glow. Atmospheric haze.',
    materialPalette: ['Burgundy Velvet', 'Gold Art Deco Accents', 'Vintage Fixtures', 'Warm Amber Lighting']
  },
  {
    id: 'infinity-pool',
    name: 'Luxury Infinity Pool',
    description: 'Crystal clear infinity pool or shallow natural water with pristine white background, water creating refraction and ripples in bright natural light.',
    atmosphere: 'Ethereal, fresh, and naturally sensual.',
    privacyLevel: 9,
    luxuryLevel: 9,
    lightingProfile: 'Bright natural overhead light with water acting as secondary light source through refraction. Light bounces creating magical quality.',
    materialPalette: ['Crystal Clear Water', 'White Background', 'Water Ripples', 'Natural Light']
  },
  {
    id: 'white-studio-minimalist',
    name: 'Minimalist White Studio',
    description: 'Minimalist white studio with seamless background and warm golden hour sunlight streaming through large diffused windows creating ethereal atmosphere.',
    atmosphere: 'Heavenly, serene, and goddess-like.',
    privacyLevel: 10,
    luxuryLevel: 8,
    lightingProfile: 'Golden hour natural light creating luminous wrap-around glow with pronounced subsurface scattering. Light emanates from within.',
    materialPalette: ['Seamless White Background', 'Large Diffused Windows', 'Golden Sunlight', 'Ample Negative Space']
  },
  {
    id: 'wooden-cabin',
    name: 'Cozy Wooden Cabin',
    description: 'Minimalist wooden cabin with warm crackling fireplace, natural wood textures, and sheepskin rugs creating intimate rustic comfort.',
    atmosphere: 'Warm, intimate, and naturally sensual.',
    privacyLevel: 10,
    luxuryLevel: 7,
    lightingProfile: 'Warm flickering fireplace light creating soft deep shadows and intimate enveloping atmosphere with romantic filmic quality.',
    materialPalette: ['Natural Wood', 'Crackling Fireplace', 'Sheepskin Rug', 'Warm Textures']
  },
  {
    id: 'underground-club',
    name: 'Underground VIP Club',
    description: 'Exclusive underground club VIP room with velvet furniture, dramatic dark lighting, and soundproof privacy creating mysterious midnight atmosphere.',
    atmosphere: 'Mysterious, enigmatic, and darkly seductive.',
    privacyLevel: 10,
    luxuryLevel: 8,
    lightingProfile: 'Dramatic low-key club lighting with mysterious shadows and midnight enigmatic glow creating high-contrast mood.',
    materialPalette: ['Velvet Furniture', 'Dark Dramatic Lighting', 'Soundproof Privacy', 'Mysterious Atmosphere']
  }
];
