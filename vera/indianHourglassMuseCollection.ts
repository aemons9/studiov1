/**
 * Indian Hourglass Muse Collection
 * Our Primary Model: Instagram Mirror Selfie Glam Indian Hourglass Model
 * Measurements: 36-26-38, Height: 5'7", Age: 23-26
 *
 * This collection represents the apex of modern Indian sensual artistry,
 * featuring realistic locations, progressive wardrobe systems, and
 * sophisticated artistic direction across multiple intimacy levels.
 */

export interface MuseLocation {
  id: string;
  name: string;
  category: 'urban' | 'nightlife' | 'private' | 'natural' | 'architectural' | 'transit' | 'cultural';
  description: string;
  lighting: string;
  atmosphere: string;
  props: string[];
  intimacyRange: [number, number]; // min, max intimacy levels suitable
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'golden_hour' | 'night' | 'late_night';
  realisticDetails: string;
}

export interface MuseWardrobe {
  id: string;
  name: string;
  category: 'casual' | 'club' | 'intimate' | 'artistic' | 'shadow_play' | 'environmental';
  intimacyLevel: number; // 1-10
  description: string;
  materials: string[];
  colors: string[];
  coverage: string;
  artisticNote: string;
  suitableLocations: string[]; // location IDs
}

export interface MusePose {
  id: string;
  name: string;
  description: string;
  intimacyLevel: number;
  bodyEmphasis: string[];
  mood: string;
}

// COMPREHENSIVE LOCATION TAXONOMY - MODERN INDIAN REALISM
export const MUSE_LOCATIONS: MuseLocation[] = [
  // URBAN NIGHTLIFE
  {
    id: 'pool_club_vip',
    name: 'Rooftop Pool Club VIP Section',
    category: 'nightlife',
    description: 'Exclusive rooftop pool club in Mumbai, infinity pool edge with city skyline, purple and gold LED underglow, floating lotus lights, VIP cabanas with sheer curtains',
    lighting: 'Underwater LEDs casting rippling cyan patterns, warm amber spotlights, Mumbai city glow backdrop',
    atmosphere: 'Luxurious, exclusive, sensual water reflections',
    props: ['Crystal champagne flutes', 'Floating pool loungers', 'Gold-trimmed towels', 'Hookah setup'],
    intimacyRange: [6, 9],
    timeOfDay: 'night',
    realisticDetails: 'Bandra-Kurla Complex skyline visible, humid Mumbai night air, sound of distant traffic mixed with lounge music'
  },
  {
    id: 'pool_table_club',
    name: 'Underground Pool Table Lounge',
    category: 'nightlife',
    description: 'Dimly lit billiards club in Connaught Place basement, vintage green felt tables, exposed brick walls with neon beer signs, smoke-hazed atmosphere',
    lighting: 'Single overhead lamp per table creating dramatic shadows, red neon accents, cigarette smoke diffusion',
    atmosphere: 'Mysterious, competitive, sultry underground vibe',
    props: ['Vintage cue sticks', 'Chalk cubes', 'Whiskey glasses', 'Leather corner seating'],
    intimacyRange: [5, 8],
    timeOfDay: 'late_night',
    realisticDetails: 'Delhi CP underground culture, vintage Kingfisher neon signs, worn wooden floors, background Hindi hip-hop'
  },
  {
    id: 'craft_bar_counter',
    name: 'Craft Cocktail Bar Counter',
    category: 'nightlife',
    description: 'Upscale Bangalore microbrewery bar, backlit bottles creating amber glow, polished mahogany counter, brass fixtures, artisanal cocktail preparation area',
    lighting: 'Backlit bottle display, warm Edison bulbs, brass pendant lights, mirror reflections doubling the glow',
    atmosphere: 'Sophisticated, intimate conversations, craft culture',
    props: ['Cocktail shakers', 'Craft beer flights', 'Bar stools', 'Mixology tools'],
    intimacyRange: [4, 7],
    timeOfDay: 'night',
    realisticDetails: 'Indiranagar craft scene, fusion music, bartender performing flair, aromatic bitters and citrus'
  },

  // URBAN ALLEYWAYS & STREETS
  {
    id: 'narrow_alley_lights',
    name: 'Old City Narrow Alleyway',
    category: 'urban',
    description: 'Chandni Chowk narrow gully at night, strings of warm bulbs overhead, weathered posters on walls, puddles reflecting lights, authentic old Delhi character',
    lighting: 'Hanging string lights creating patterns, shop sign glows, smartphone flash photography effect',
    atmosphere: 'Raw urban beauty, mysterious shadows, authentic street life',
    props: ['Vintage scooter', 'Metal shutters', 'Electrical wires overhead', 'Street vendor carts'],
    intimacyRange: [3, 6],
    timeOfDay: 'late_night',
    realisticDetails: 'Smell of street food lingering, distant temple bells, Hindi film posters, monsoon puddles'
  },
  {
    id: 'tier2_dimmed_alley',
    name: 'Tier-II City Dimmed Alleyway',
    category: 'urban',
    description: 'Narrow lane in Indore old market area, single streetlight creating long shadows, closed shop shutters with faded paint, empty chai stall, urban decay aesthetic',
    lighting: 'Single sodium vapor lamp, deep shadows, occasional window glow, moonlight accent',
    atmosphere: 'Quiet solitude, urban poetry, nostalgic melancholy',
    props: ['Abandoned bicycle', 'Closed paan shop', 'Plastic chairs', 'Faded movie posters'],
    intimacyRange: [4, 7],
    timeOfDay: 'late_night',
    realisticDetails: 'Indore Sarafa Bazaar after hours, lingering incense smell, distant train horn, stray cats'
  },
  {
    id: 'roadside_dhaba',
    name: 'Highway Dhaba After Hours',
    category: 'urban',
    description: 'NH1 roadside dhaba near Karnal, truck parking area, colorful LED strips on trucks, fog rolling in, authentic Punjabi highway culture',
    lighting: 'Truck headlights cutting through fog, dhaba tube lights, colored truck LEDs, fire from tandoor',
    atmosphere: 'Rustic highway romance, foggy mystery, trucker culture',
    props: ['Charpai beds', 'Tandoor oven', 'Truck art', 'Highway milestone'],
    intimacyRange: [3, 5],
    timeOfDay: 'late_night',
    realisticDetails: 'Punjab-Haryana border fog, truck horn sounds, dhaba radio playing Punjabi songs, smell of parathas'
  },

  // PRIVATE SPACES
  {
    id: 'luxury_apartment_balcony',
    name: 'High-Rise Apartment Balcony',
    category: 'private',
    description: 'Gurgaon Millennium City high-rise balcony, 32nd floor, glass railing, city lights sprawl, modern furniture, vertical garden wall',
    lighting: 'City light pollution glow, balcony accent lights, apartment interior spill, moon overhead',
    atmosphere: 'Urban luxury, private heights, metropolitan romance',
    props: ['Designer lounge chair', 'Potted bamboo', 'Wine glasses', 'Throw blankets'],
    intimacyRange: [5, 9],
    timeOfDay: 'night',
    realisticDetails: 'Cyber Hub lights visible, construction cranes with red lights, distant Metro line, cool breeze at height'
  },
  {
    id: 'minimalist_hostel_room',
    name: 'Minimalist Hostel Private Room',
    category: 'private',
    description: 'Zostel private room in Rishikesh, minimal decor, white walls, single window overlooking Ganges, yoga mat, bohemian traveler aesthetic',
    lighting: 'Soft window light, fairy lights on wall, candlelight, laptop screen glow',
    atmosphere: 'Backpacker intimacy, spiritual simplicity, travel romance',
    props: ['Backpack', 'Yoga mat', 'Incense holder', 'Travel journal', 'Acoustic guitar'],
    intimacyRange: [6, 8],
    timeOfDay: 'golden_hour',
    realisticDetails: 'Ganges sound in distance, temple bells, yoga center announcements, mountain breeze'
  },
  {
    id: 'secret_cave_lights',
    name: 'Secret Cave with Natural Light Holes',
    category: 'natural',
    description: 'Hidden cave near Hampi boulders, natural skylights creating light beams, ancient rock textures, mysterious shadows, archaeological mystery',
    lighting: 'Dramatic light shafts through ceiling holes, dust particles visible in beams, deep shadow contrasts',
    atmosphere: 'Ancient mystery, natural cathedral, primal beauty',
    props: ['Rock formations', 'Sandy floor', 'Scattered sunlight pools', 'Ancient carvings'],
    intimacyRange: [7, 10],
    timeOfDay: 'afternoon',
    realisticDetails: 'Hampi boulder landscape, Tungabhadra river nearby, bat sounds, cool cave temperature'
  },

  // ARCHITECTURAL SPACES
  {
    id: 'glass_elevator_night',
    name: 'Glass Elevator Shaft at Night',
    category: 'transit',
    description: 'Modern mall glass elevator in Phoenix Marketcity, see-through cabin, multiple floor views, neon mall lights creating patterns',
    lighting: 'Elevator cabin lights, mall atrium illumination, passing floor lights creating strobe effect',
    atmosphere: 'Vertical journey, transparent vulnerability, urban movement',
    props: ['Glass panels', 'Chrome fixtures', 'Emergency button', 'Floor indicator'],
    intimacyRange: [3, 6],
    timeOfDay: 'night',
    realisticDetails: 'Mumbai mall culture, passing shoppers on each floor, muzak playing, AC hum'
  },
  {
    id: 'spiral_staircase_heritage',
    name: 'Heritage Hotel Spiral Staircase',
    category: 'architectural',
    description: 'Converted haveli in Jaipur, ornate marble spiral staircase, brass railings, stained glass skylight, Rajasthani architectural details',
    lighting: 'Colored light through stained glass, brass sconce lights, natural light from above, dramatic shadows on curves',
    atmosphere: 'Royal heritage, architectural poetry, timeless elegance',
    props: ['Brass railings', 'Marble steps', 'Heritage paintings', 'Antique vases'],
    intimacyRange: [4, 7],
    timeOfDay: 'golden_hour',
    realisticDetails: 'Pink City heritage, peacock motifs, sandalwood incense, classical sitar from lobby'
  },
  {
    id: 'office_after_hours',
    name: 'Corporate Office After Hours',
    category: 'architectural',
    description: 'Cyber City Gurgaon tech office at night, empty workstations, city views through floor-to-ceiling windows, blue screen glows',
    lighting: 'Monitor glows, city lights through windows, emergency exit signs, cleaning crew distant lights',
    atmosphere: 'After-hours solitude, corporate sensuality, power dynamics',
    props: ['Executive chairs', 'Glass conference table', 'Whiteboard', 'Coffee machine'],
    intimacyRange: [5, 8],
    timeOfDay: 'late_night',
    realisticDetails: 'DLF Cyber City skyline, AC ventilation sounds, security camera red dots, elevator dings'
  },

  // NIGHTCLUB SPACES
  {
    id: 'vip_booth_purple',
    name: 'Nightclub VIP Booth',
    category: 'nightlife',
    description: 'Kitty Su Delhi VIP section, purple velvet booth, mirrored tables, champagne buckets, overlooking main dance floor',
    lighting: 'Purple LED strips, strobe flashes from dance floor, bottle service sparklers, UV black lights',
    atmosphere: 'Exclusive party luxury, bass vibrations, VIP energy',
    props: ['Velvet ropes', 'Champagne bottles', 'Mirrored tables', 'VIP wristbands'],
    intimacyRange: [6, 8],
    timeOfDay: 'late_night',
    realisticDetails: 'Lalit Hotel basement, Bollywood remixes, bottle service presentations, Delhi party crowd'
  },
  {
    id: 'empty_theatre_stage',
    name: 'Empty Theatre After Show',
    category: 'cultural',
    description: 'Prithvi Theatre Mumbai after performance, empty seats, stage lights still warm, red curtains, artistic solitude',
    lighting: 'Single ghost light on stage, exit sign glows, subtle spotlight, auditorium shadows',
    atmosphere: 'Theatrical romance, artistic solitude, performance afterglow',
    props: ['Red velvet seats', 'Stage props', 'Spotlight', 'Theater programs'],
    intimacyRange: [5, 8],
    timeOfDay: 'late_night',
    realisticDetails: 'Juhu artistic neighborhood, residual stage makeup smell, creaking wooden stage, Mumbai theatre culture'
  },

  // NATURAL LOCATIONS
  {
    id: 'suburban_lake_night',
    name: 'Suburban Lake at Night',
    category: 'natural',
    description: 'Powai Lake Mumbai at night, city lights reflecting on water, small wooden pier, distant hills silhouette, urban oasis',
    lighting: 'Moon reflection on water, distant city glow, rippling light patterns, fireflies',
    atmosphere: 'Natural urban escape, romantic solitude, water serenity',
    props: ['Wooden pier', 'Lake rocks', 'Scattered lotus', 'Park bench'],
    intimacyRange: [6, 9],
    timeOfDay: 'night',
    realisticDetails: 'Powai luxury towers in distance, gentle lake breeze, croaking frogs, occasional fish splash'
  },
  {
    id: 'mountain_cabin_wood',
    name: 'Himalayan Wooden Cabin',
    category: 'private',
    description: 'Manali wooden cabin interior, fireplace glow, fur rugs, pine wood walls, snow visible through windows, cozy mountain retreat',
    lighting: 'Fireplace warm glow, candles on wooden shelf, moonlight through window, ember shadows dancing',
    atmosphere: 'Mountain intimacy, wooden warmth, isolated comfort',
    props: ['Fur blankets', 'Fireplace', 'Wooden beams', 'Hot chocolate mugs'],
    intimacyRange: [7, 10],
    timeOfDay: 'night',
    realisticDetails: 'Himachal mountains, pine scent, crackling fire sounds, distant snowfall'
  },
  {
    id: 'monsoon_terrace',
    name: 'Monsoon Terrace Garden',
    category: 'natural',
    description: 'Pune rooftop during monsoon, rain creating curtains, wet marble floor, garden lights blurred by rain, petrichor atmosphere',
    lighting: 'Rain-diffused garden lights, lightning flashes, wet surface reflections, moody grey sky',
    atmosphere: 'Monsoon romance, rain intimacy, natural drama',
    props: ['Garden furniture', 'Potted plants', 'Rain chains', 'Wet marble'],
    intimacyRange: [5, 8],
    timeOfDay: 'afternoon',
    realisticDetails: 'Maharashtra monsoon, petrichor smell, thunder rumbles, chai steam from nearby kitchen'
  },

  // UNIQUE SPACES
  {
    id: 'art_gallery_closed',
    name: 'Art Gallery After Closing',
    category: 'cultural',
    description: 'Kala Ghoda art gallery after hours, spot-lit paintings, marble floors, minimalist white walls, artistic sanctuary',
    lighting: 'Individual painting spotlights, minimal ambient light, dramatic shadows between artworks',
    atmosphere: 'Artistic solitude, cultural sophistication, creative energy',
    props: ['Art installations', 'Sculpture pedestals', 'Gallery benches', 'Wine glasses from opening'],
    intimacyRange: [4, 7],
    timeOfDay: 'night',
    realisticDetails: 'South Mumbai art district, residual wine and perfume from gallery opening, AC hum, street art visible outside'
  },
  {
    id: 'vintage_cinema_projection',
    name: 'Vintage Cinema Projection Room',
    category: 'cultural',
    description: 'Regal Cinema projection room, old film reels, projector beam through dust, vintage Bollywood posters, cinematic nostalgia',
    lighting: 'Projector beam cutting through darkness, film strip backlights, control panel glows, dust particles visible',
    atmosphere: 'Cinematic nostalgia, hidden romance, vintage charm',
    props: ['Film reels', 'Projector', 'Old movie posters', 'Projectionist chair'],
    intimacyRange: [5, 8],
    timeOfDay: 'night',
    realisticDetails: 'Connaught Place cinema heritage, film reel clicking sounds, musty film smell, old Bollywood music'
  },
  {
    id: 'empty_stadium_lights',
    name: 'Cricket Stadium at Night',
    category: 'architectural',
    description: 'Wankhede Stadium empty at night, floodlights creating dramatic shadows, empty seats, pitch under lights, Mumbai skyline beyond',
    lighting: 'Stadium floodlights on quarter power, dramatic field shadows, city glow horizon, moon overhead',
    atmosphere: 'Grand emptiness, athletic romance, iconic solitude',
    props: ['Stadium seats', 'Pitch', 'Boundary ropes', 'Scoreboard'],
    intimacyRange: [3, 6],
    timeOfDay: 'night',
    realisticDetails: 'Marine Drive lights visible, sea breeze, echo in empty stadium, security patrol lights'
  }
];

// PROGRESSIVE WARDROBE SYSTEM WITH INTIMACY LEVELS
export const MUSE_WARDROBE: MuseWardrobe[] = [
  // LEVEL 1-3: CASUAL CHIC
  {
    id: 'high_waist_crop',
    name: 'High-Waisted Mini & Crop Top Base',
    category: 'casual',
    intimacyLevel: 3,
    description: 'High-waisted mini skirt in black leather-look fabric, paired with backless halter crop top, gold belly chain visible',
    materials: ['Faux leather', 'Cotton blend', 'Gold chain'],
    colors: ['Black', 'Gold', 'Skin tone'],
    coverage: 'Midriff exposed, back cutout, legs from mid-thigh',
    artisticNote: 'Foundation piece emphasizing hourglass silhouette with modern edge',
    suitableLocations: ['pool_club_vip', 'craft_bar_counter', 'luxury_apartment_balcony']
  },
  {
    id: 'mesh_layer_club',
    name: 'Mesh Overlay Club Ensemble',
    category: 'club',
    intimacyLevel: 4,
    description: 'Sheer mesh long-sleeve over bandeau, high-slit skirt with mesh panels, strategic opacity zones',
    materials: ['Power mesh', 'Spandex blend', 'Metallic thread'],
    colors: ['Black mesh', 'Silver accents', 'Nude undertones'],
    coverage: 'Strategic mesh transparency, bandeau coverage, high leg exposure',
    artisticNote: 'Plays with transparency and opacity, creating intrigue through layers',
    suitableLocations: ['vip_booth_purple', 'pool_table_club', 'glass_elevator_night']
  },

  // LEVEL 4-6: ELEVATED SENSUALITY
  {
    id: 'architectural_cutout',
    name: 'Architectural Cutout Dress',
    category: 'artistic',
    intimacyLevel: 5,
    description: 'Structured mini dress with geometric cutouts revealing waist, sides, and décolletage, asymmetric hemline',
    materials: ['Neoprene', 'Bonded fabric', 'Hidden zippers'],
    colors: ['Deep burgundy', 'Black', 'Gold hardware'],
    coverage: 'Strategic geometric reveals, maintaining structure while showing form',
    artisticNote: 'Architecture meets anatomy, structured revelation of curves',
    suitableLocations: ['office_after_hours', 'art_gallery_closed', 'spiral_staircase_heritage']
  },
  {
    id: 'liquid_metal_mini',
    name: 'Liquid Metal Chain Dress',
    category: 'club',
    intimacyLevel: 6,
    description: 'Chainmail-inspired mini dress, draped metal mesh creating fluid movement, halter neck, open back to waist',
    materials: ['Metal mesh', 'Silk lining', 'Chain details'],
    colors: ['Gunmetal', 'Silver', 'Gold undertones'],
    coverage: 'Semi-transparent metal mesh, strategic lining, dramatic back exposure',
    artisticNote: 'Liquid metal effect, catches light with every movement',
    suitableLocations: ['pool_club_vip', 'vip_booth_purple', 'empty_theatre_stage']
  },

  // LEVEL 7-8: ARTISTIC INTIMACY
  {
    id: 'shadow_lace_teddy',
    name: 'Shadow Lace Teddy with Sheer Robe',
    category: 'intimate',
    intimacyLevel: 7,
    description: 'Delicate lace teddy with strategic embroidery, floor-length sheer robe with lace trim, thigh-high stockings',
    materials: ['French lace', 'Silk chiffon', 'Satin ribbons'],
    colors: ['Black lace', 'Nude mesh', 'Pearl accents'],
    coverage: 'Lace creating shadow patterns, sheer overlay adding mystery',
    artisticNote: 'Classic boudoir elegance with modern minimalism',
    suitableLocations: ['minimalist_hostel_room', 'luxury_apartment_balcony', 'mountain_cabin_wood']
  },
  {
    id: 'strappy_geometric',
    name: 'Geometric Strap System',
    category: 'artistic',
    intimacyLevel: 8,
    description: 'Intricate system of elastic straps creating geometric patterns across body, minimal fabric at junction points',
    materials: ['Elastic strapping', 'Metal rings', 'Velvet patches'],
    colors: ['Black straps', 'Gold rings', 'Burgundy velvet'],
    coverage: 'Strategic coverage at key points, emphasis on negative space',
    artisticNote: 'Body as canvas, straps as brushstrokes creating living art',
    suitableLocations: ['secret_cave_lights', 'empty_theatre_stage', 'vintage_cinema_projection']
  },

  // LEVEL 9-10: MAXIMUM ARTISTIC EXPRESSION
  {
    id: 'light_shadow_play',
    name: 'Light and Shadow Composition',
    category: 'shadow_play',
    intimacyLevel: 9,
    description: 'Minimal metallic body chains, strategic light placement creating shadow patterns as primary coverage',
    materials: ['Body chains', 'Metallic paint', 'Light projection'],
    colors: ['Gold', 'Bronze', 'Natural shadows'],
    coverage: 'Shadows as clothing, chains accentuating movement',
    artisticNote: 'Light becomes the garment, shadows create the mystery',
    suitableLocations: ['secret_cave_lights', 'suburban_lake_night', 'monsoon_terrace']
  },
  {
    id: 'environmental_elements',
    name: 'Environmental Integration',
    category: 'environmental',
    intimacyLevel: 10,
    description: 'Body paint mimicking environment, natural elements as adornment, complete integration with location',
    materials: ['Body paint', 'Natural elements', 'Temporary tattoos'],
    colors: ['Environment-matched', 'Metallic accents', 'Natural tones'],
    coverage: 'Artistic paint and natural elements, celebrating form as art',
    artisticNote: 'Body as landscape, environment as extension of self',
    suitableLocations: ['secret_cave_lights', 'suburban_lake_night', 'mountain_cabin_wood']
  },

  // TRANSITIONAL PIECES
  {
    id: 'sheer_bodysuit_layer',
    name: 'Sheer Embroidered Bodysuit',
    category: 'intimate',
    intimacyLevel: 6,
    description: 'Full bodysuit in sheer mesh with strategic embroidery at curves, high-cut legs, plunging neckline',
    materials: ['Embroidered mesh', 'Stretch tulle', 'Satin trim'],
    colors: ['Nude mesh', 'Black embroidery', 'Gold thread'],
    coverage: 'Sheer with strategic embroidered coverage zones',
    artisticNote: 'Suggestion through transparency, embroidery as body art',
    suitableLocations: ['luxury_apartment_balcony', 'art_gallery_closed', 'office_after_hours']
  },
  {
    id: 'metallic_bikini_sarong',
    name: 'Metallic Bikini with Sheer Sarong',
    category: 'club',
    intimacyLevel: 5,
    description: 'Metallic triangle bikini top, matching bottom, flowing sheer sarong with gold thread, ankle chains',
    materials: ['Metallic lycra', 'Sheer organza', 'Gold thread'],
    colors: ['Bronze metallic', 'Gold', 'Sheer white'],
    coverage: 'Bikini coverage with artistic sarong draping',
    artisticNote: 'Beach glamour meets urban night, metallic catching club lights',
    suitableLocations: ['pool_club_vip', 'suburban_lake_night', 'monsoon_terrace']
  }
];

// SIGNATURE POSES FOR OUR MUSE
export const MUSE_POSES: MusePose[] = [
  {
    id: 'mirror_arch_signature',
    name: 'Signature Mirror Arch',
    description: 'Classic back arch while holding phone for mirror selfie, one hand on hip accentuating curves, slight shoulder roll',
    intimacyLevel: 6,
    bodyEmphasis: ['Back curve', 'Waist', 'Hip'],
    mood: 'Confident and playful'
  },
  {
    id: 'bedroom_door_lean',
    name: 'Bedroom Door Frame Lean',
    description: 'Leaning against door frame, one arm raised overhead, hip pushed out, looking over shoulder',
    intimacyLevel: 7,
    bodyEmphasis: ['Full silhouette', 'Curves', 'Legs'],
    mood: 'Inviting and mysterious'
  },
  {
    id: 'pool_edge_recline',
    name: 'Pool Edge Recline',
    description: 'Reclining by pool edge, one leg bent, water droplets on skin, hand running through wet hair',
    intimacyLevel: 8,
    bodyEmphasis: ['Full body', 'Legs', 'Décolletage'],
    mood: 'Luxurious and sensual'
  },
  {
    id: 'staircase_ascent',
    name: 'Staircase Ascent Pose',
    description: 'Mid-step on staircase, looking back over shoulder, hand on railing, fabric flowing with movement',
    intimacyLevel: 5,
    bodyEmphasis: ['Legs', 'Back', 'Profile'],
    mood: 'Elegant movement'
  },
  {
    id: 'balcony_silhouette',
    name: 'Balcony Rail Silhouette',
    description: 'Leaning forward on balcony railing, city lights behind, wind in hair, profile emphasized',
    intimacyLevel: 6,
    bodyEmphasis: ['Silhouette', 'Profile', 'Hair'],
    mood: 'Urban goddess'
  },
  {
    id: 'floor_goddess',
    name: 'Floor Goddess Stretch',
    description: 'On floor with legs extended, leaning back on hands, neck extended, pointing toes',
    intimacyLevel: 8,
    bodyEmphasis: ['Full body', 'Legs', 'Neck line'],
    mood: 'Artistic and powerful'
  },
  {
    id: 'window_light_play',
    name: 'Window Light Portrait',
    description: 'Standing by window, natural light creating shadows, one hand on glass, contemplative expression',
    intimacyLevel: 7,
    bodyEmphasis: ['Silhouette', 'Curves', 'Face'],
    mood: 'Intimate and thoughtful'
  },
  {
    id: 'club_booth_lounge',
    name: 'VIP Booth Lounge',
    description: 'Lounging in booth, one leg extended, holding champagne glass, confident direct gaze',
    intimacyLevel: 6,
    bodyEmphasis: ['Legs', 'Décolletage', 'Posture'],
    mood: 'Luxurious confidence'
  },
  {
    id: 'artistic_shadow_wall',
    name: 'Shadow Wall Art',
    description: 'Against wall with dramatic shadow, arms raised creating shapes, playing with light and form',
    intimacyLevel: 9,
    bodyEmphasis: ['Full form', 'Shadow play', 'Movement'],
    mood: 'Artistic expression'
  },
  {
    id: 'water_emergence',
    name: 'Water Emergence',
    description: 'Emerging from water, hair slicked back, water droplets visible, hands pushing hair back',
    intimacyLevel: 8,
    bodyEmphasis: ['Upper body', 'Neck', 'Arms'],
    mood: 'Fresh and vital'
  }
];

// PHOTOGRAPHY STYLES FOR DIFFERENT INTIMACY LEVELS
export const PHOTOGRAPHY_STYLES = {
  casual: {
    name: 'Lifestyle Documentary',
    description: 'Natural lighting, candid moments, Instagram-worthy casual shots',
    techniques: ['Natural light', 'Shallow depth of field', 'Warm color grading']
  },
  glamour: {
    name: 'High Fashion Editorial',
    description: 'Dramatic lighting, fashion magazine quality, bold compositions',
    techniques: ['Studio lighting', 'High contrast', 'Fashion angles']
  },
  artistic: {
    name: 'Fine Art Photography',
    description: 'Artistic nude aesthetic, museum-quality composition, emphasis on form as art',
    techniques: ['Dramatic shadows', 'Black and white options', 'Classical composition']
  },
  cinematic: {
    name: 'Cinematic Narrative',
    description: 'Movie still quality, story-telling through imagery, emotional depth',
    techniques: ['Cinematic color grading', 'Wide aspect ratios', 'Narrative elements']
  }
};

// MASTER PROMPT GENERATOR FUNCTION
export function generateMusePrompt(
  location: MuseLocation,
  wardrobe: MuseWardrobe,
  pose: MusePose,
  style: keyof typeof PHOTOGRAPHY_STYLES,
  customDetails?: string
): string {
  const photography = PHOTOGRAPHY_STYLES[style];

  return `Professional ${photography.name} photography of stunning Indian Instagram model (age 24, measurements 36-26-38, height 5'7", hourglass figure, long black hair with subtle highlights, brown eyes with dramatic lashes, golden brown skin tone, small lotus tattoo on shoulder blade).

LOCATION: ${location.name} - ${location.description}
LIGHTING: ${location.lighting}
TIME: ${location.timeOfDay === 'night' ? 'Night time' : location.timeOfDay === 'golden_hour' ? 'Golden hour' : location.timeOfDay}

WARDROBE: ${wardrobe.name} - ${wardrobe.description}
MATERIALS & COLORS: ${wardrobe.materials.join(', ')} in ${wardrobe.colors.join(', ')}

POSE: ${pose.name} - ${pose.description}
MOOD: ${pose.mood}

PHOTOGRAPHY STYLE: ${photography.techniques.join(', ')}
ATMOSPHERE: ${location.atmosphere}

${location.realisticDetails}

${customDetails || ''}

Shot with Hasselblad X2D 100C, ${style === 'artistic' ? '80mm portrait lens' : '50mm lens'}, natural color science, professional retouching maintaining natural skin texture`;
}

// COLLECTION PRESETS FOR QUICK ACCESS
export const MUSE_COLLECTION_PRESETS = {
  urban_nights: {
    name: 'Urban Nights Collection',
    description: 'City after dark, neon lights, urban sophistication',
    combinations: [
      { location: 'pool_club_vip', wardrobe: 'liquid_metal_mini', pose: 'pool_edge_recline' },
      { location: 'craft_bar_counter', wardrobe: 'high_waist_crop', pose: 'club_booth_lounge' },
      { location: 'narrow_alley_lights', wardrobe: 'mesh_layer_club', pose: 'bedroom_door_lean' }
    ]
  },
  intimate_spaces: {
    name: 'Intimate Spaces Collection',
    description: 'Private moments, soft lighting, personal narrative',
    combinations: [
      { location: 'luxury_apartment_balcony', wardrobe: 'shadow_lace_teddy', pose: 'balcony_silhouette' },
      { location: 'minimalist_hostel_room', wardrobe: 'sheer_bodysuit_layer', pose: 'window_light_play' },
      { location: 'mountain_cabin_wood', wardrobe: 'strappy_geometric', pose: 'floor_goddess' }
    ]
  },
  artistic_expression: {
    name: 'Artistic Expression Collection',
    description: 'Fine art photography, dramatic lighting, form as art',
    combinations: [
      { location: 'secret_cave_lights', wardrobe: 'light_shadow_play', pose: 'artistic_shadow_wall' },
      { location: 'empty_theatre_stage', wardrobe: 'architectural_cutout', pose: 'staircase_ascent' },
      { location: 'art_gallery_closed', wardrobe: 'strappy_geometric', pose: 'floor_goddess' }
    ]
  },
  natural_elements: {
    name: 'Natural Elements Collection',
    description: 'Nature integration, organic beauty, environmental art',
    combinations: [
      { location: 'suburban_lake_night', wardrobe: 'environmental_elements', pose: 'water_emergence' },
      { location: 'monsoon_terrace', wardrobe: 'metallic_bikini_sarong', pose: 'window_light_play' },
      { location: 'secret_cave_lights', wardrobe: 'light_shadow_play', pose: 'artistic_shadow_wall' }
    ]
  }
};

// EXPORT MAIN MUSE CONFIGURATION
export const INDIAN_HOURGLASS_MUSE = {
  id: 'indian_hourglass_muse',
  name: 'Indian Hourglass Instagram Muse',
  measurements: {
    bust: 36,
    waist: 26,
    hips: 38,
    height: "5'7\"",
    dress_size: 'M/L',
    shoe_size: 7
  },
  physical: {
    age: '23-26',
    ethnicity: 'Indian',
    skin_tone: 'Golden brown with warm undertones',
    hair: 'Long black hair with subtle caramel highlights, silky texture',
    eyes: 'Deep brown with dramatic natural lashes',
    distinguishing_features: [
      'Small lotus tattoo on shoulder blade',
      'Delicate nose ring (optional)',
      'Natural beauty mark near lips',
      'Perfectly arched eyebrows'
    ],
    body_type: 'Classic hourglass with athletic tone'
  },
  personality: {
    traits: ['Confident', 'Playful', 'Sophisticated', 'Adventurous'],
    style: 'Modern Indian glamour with international appeal',
    instagram_persona: 'Lifestyle influencer with artistic edge'
  },
  expertise: [
    'Mirror selfies',
    'Lifestyle content',
    'Fashion modeling',
    'Artistic photography',
    'Brand collaborations'
  ],
  locations: MUSE_LOCATIONS,
  wardrobe: MUSE_WARDROBE,
  poses: MUSE_POSES,
  collections: MUSE_COLLECTION_PRESETS
};