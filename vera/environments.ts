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
  }
];
