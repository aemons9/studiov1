/**
 * MASTER WARDROBE COLLECTION - Ultimate Sensual Artistry
 *
 * A transcendent collection of wardrobe options spanning from elegant to intimate
 * Each piece designed to celebrate the human form through artistic expression
 */

export interface MasterWardrobeItem {
  id: string;
  name: string;
  category: 'elegant' | 'sensual' | 'intimate' | 'artistic' | 'cultural' | 'avant-garde';
  intimacyLevel: number; // 1-10
  description: string;
  materials: string[];
  colorPalette: string[];
  styling: string;
  culturalContext?: string;
  artisticReference?: string;
  photographicNotes: string;
}

export const MASTER_WARDROBE_COLLECTION: MasterWardrobeItem[] = [
  // ELEGANT FOUNDATIONS (1-3 intimacy)
  {
    id: 'elegant-power-suit',
    name: 'Executive Power Suite',
    category: 'elegant',
    intimacyLevel: 2,
    description: 'Tailored architectural blazer with strategic cutouts, worn over minimalist foundation pieces',
    materials: ['Italian wool', 'Silk lining', 'Metal accents'],
    colorPalette: ['Midnight black', 'Charcoal', 'Pearl white'],
    styling: 'Sharp shoulders, cinched waist, strategic transparency panels',
    photographicNotes: 'Emphasizes power dynamics through silhouette'
  },
  {
    id: 'elegant-silk-ensemble',
    name: 'Liquid Silk Draping',
    category: 'elegant',
    intimacyLevel: 3,
    description: 'Flowing silk that clings and releases, creating dynamic movement',
    materials: ['Pure mulberry silk', 'Gossamer chiffon'],
    colorPalette: ['Champagne', 'Blush', 'Ivory'],
    styling: 'Bias-cut draping that follows natural curves',
    artisticReference: 'Madame Grès sculptural draping',
    photographicNotes: 'Captures light beautifully, creates ethereal glow'
  },

  // SENSUAL SOPHISTICATION (4-6 intimacy)
  {
    id: 'sensual-lace-composition',
    name: 'Architectural Lace Framework',
    category: 'sensual',
    intimacyLevel: 5,
    description: 'Delicate French lace forming geometric patterns across the silhouette, strategic coverage with artistic revelation',
    materials: ['Chantilly lace', 'Silk mesh', 'Pearl embellishments'],
    colorPalette: ['Noir', 'Nude', 'Burgundy'],
    styling: 'High-neck with open back, long sleeves with cutout details',
    artisticReference: 'La Perla haute couture',
    photographicNotes: 'Play with shadows through lace patterns'
  },
  {
    id: 'sensual-bodysuit-sculpture',
    name: 'Sculptural Bodysuit Creation',
    category: 'sensual',
    intimacyLevel: 6,
    description: 'Form-fitting architectural piece with strategic mesh panels and geometric cutouts',
    materials: ['Power mesh', 'Bonded crepe', 'Metallic accents'],
    colorPalette: ['Obsidian', 'Gold', 'Deep emerald'],
    styling: 'High-cut legs, plunging neckline, structured cups',
    photographicNotes: 'Emphasizes athletic elegance and strength'
  },
  {
    id: 'sensual-slip-dress',
    name: 'Midnight Slip Revelation',
    category: 'sensual',
    intimacyLevel: 5,
    description: 'Bias-cut slip dress with deep V-neck and thigh-high slit, minimal yet maximum impact',
    materials: ['Silk charmeuse', 'Delicate straps'],
    colorPalette: ['Black', 'Crimson', 'Midnight blue'],
    styling: 'Cowl back, adjustable straps, floor-length with movement',
    artisticReference: '1990s minimalism meets modern sensuality',
    photographicNotes: 'Catches light on curves, creates elegant shadows'
  },

  // INTIMATE ARTISTRY (7-8 intimacy)
  {
    id: 'intimate-corset-ensemble',
    name: 'Victorian Corset Reimagined',
    category: 'intimate',
    intimacyLevel: 7,
    description: 'Modern interpretation of classic corsetry with contemporary edge, worn as outerwear statement',
    materials: ['Structured satin', 'Steel boning', 'Silk ribbons'],
    colorPalette: ['Bordeaux', 'Black', 'Cream'],
    styling: 'Overbust design with intricate lacing, paired with flowing skirt',
    culturalContext: 'Victorian elegance meets contemporary feminism',
    photographicNotes: 'Emphasizes waist, creates dramatic silhouette'
  },
  {
    id: 'intimate-bralette-set',
    name: 'Delicate Framework Collection',
    category: 'intimate',
    intimacyLevel: 8,
    description: 'Minimalist bralette and high-waisted brief set with geometric strap details',
    materials: ['Soft modal', 'Elastic strapping', 'Gold hardware'],
    colorPalette: ['Nude tones', 'Black', 'Dusty rose'],
    styling: 'Triangle cups, adjustable strapping creating patterns',
    artisticReference: 'Inspired by Shibari artistic rope patterns',
    photographicNotes: 'Focus on negative space and line work'
  },
  {
    id: 'intimate-kimono-fusion',
    name: 'Silk Kimono Boudoir',
    category: 'intimate',
    intimacyLevel: 7,
    description: 'Flowing kimono-style robe with nothing underneath, artistic draping',
    materials: ['Japanese silk', 'Hand-painted details'],
    colorPalette: ['Cherry blossom pink', 'Jade', 'Ivory'],
    styling: 'Wide sleeves, open front, waist tie only',
    culturalContext: 'Japanese elegance meets boudoir photography',
    photographicNotes: 'Movement creates reveal and conceal dynamics'
  },

  // ARTISTIC EXPRESSIONS (Variable intimacy)
  {
    id: 'artistic-mesh-creation',
    name: 'Crystallized Mesh Artwork',
    category: 'artistic',
    intimacyLevel: 7,
    description: 'Full-body mesh adorned with strategic crystal placement, creating constellation patterns',
    materials: ['Invisible mesh', 'Swarovski crystals', 'Body adhesive'],
    colorPalette: ['Transparent', 'Crystal rainbow reflections'],
    styling: 'Crystals follow body meridians and energy points',
    artisticReference: 'Thierry Mugler cosmic couture',
    photographicNotes: 'Requires specific lighting to capture crystal refractions'
  },
  {
    id: 'artistic-paint-body',
    name: 'Living Canvas Creation',
    category: 'artistic',
    intimacyLevel: 9,
    description: 'Body paint creating the illusion of clothing, artistic expression on skin',
    materials: ['Professional body paint', 'Metallic pigments', 'Biodegradable glitter'],
    colorPalette: ['Gold leaf', 'Silver', 'Iridescent blues and greens'],
    styling: 'Painted corset design, geometric patterns',
    artisticReference: 'Inspired by Yves Klein body paintings',
    photographicNotes: 'Captures skin texture through paint'
  },

  // CULTURAL CELEBRATIONS (4-7 intimacy)
  {
    id: 'cultural-saree-modern',
    name: 'Contemporary Saree Draping',
    category: 'cultural',
    intimacyLevel: 4,
    description: 'Traditional saree with modern draping, revealing midriff and shoulders',
    materials: ['Banarasi silk', 'Gold zari work', 'Sequin border'],
    colorPalette: ['Royal purple', 'Emerald', 'Ruby red'],
    styling: 'Low-hip draping, backless blouse, single shoulder',
    culturalContext: 'Indian heritage meets contemporary fashion',
    photographicNotes: 'Movement of pallu creates dynamic shots'
  },
  {
    id: 'cultural-lehenga-choli',
    name: 'Bridal Lehenga Minimalist',
    category: 'cultural',
    intimacyLevel: 5,
    description: 'Cropped choli with low-waist lehenga, significant skin revelation',
    materials: ['Raw silk', 'Mirror work', 'Thread embroidery'],
    colorPalette: ['Blush pink', 'Mint green', 'Ivory'],
    styling: 'Butterfly back choli, low-rise lehenga, sheer dupatta',
    culturalContext: 'Modern Indian bridal wear',
    photographicNotes: 'Emphasizes waist and back architecture'
  },

  // AVANT-GARDE STATEMENTS (5-9 intimacy)
  {
    id: 'avant-garde-deconstructed',
    name: 'Deconstructed Couture',
    category: 'avant-garde',
    intimacyLevel: 8,
    description: 'Partially constructed garment showing the making process, strategic incompleteness',
    materials: ['Raw-edge silk', 'Exposed boning', 'Floating panels'],
    colorPalette: ['Black', 'White', 'Red accents'],
    styling: 'One-shoulder top, asymmetric hemline, floating elements',
    artisticReference: 'Rei Kawakubo deconstructionism',
    photographicNotes: 'Movement creates ever-changing silhouette'
  },
  {
    id: 'avant-garde-transparent',
    name: 'Transparency Study',
    category: 'avant-garde',
    intimacyLevel: 9,
    description: 'Completely sheer garments with strategic opaque panels',
    materials: ['Organza', 'Tulle', 'Strategic embroidery'],
    colorPalette: ['Nude', 'Black', 'White'],
    styling: 'Floor-length gown with minimal coverage zones',
    artisticReference: 'Iris van Herpen innovation',
    photographicNotes: 'Backlighting creates ethereal effects'
  },

  // INSTAGRAM AESTHETIC (6-8 intimacy)
  {
    id: 'instagram-athleisure',
    name: 'Luxury Athleisure Set',
    category: 'sensual',
    intimacyLevel: 6,
    description: 'High-fashion sports bra and bike shorts combo with cutout details',
    materials: ['Performance fabric', 'Mesh inserts', 'Logo bands'],
    colorPalette: ['All black', 'Neon accents', 'Nude tones'],
    styling: 'Underboob band, high-waisted shorts with side cutouts',
    artisticReference: 'Fenty x Savage athletic line',
    photographicNotes: 'Perfect for mirror selfies and gym aesthetics'
  },
  {
    id: 'instagram-loungewear',
    name: 'Bedroom Loungewear Luxe',
    category: 'intimate',
    intimacyLevel: 7,
    description: 'Oversized boyfriend shirt worn open with delicate underpinnings visible',
    materials: ['Cotton poplin', 'Lace trim', 'Silk shorts'],
    colorPalette: ['White', 'Soft pink', 'Gray'],
    styling: 'Unbuttoned shirt, lace bralette peek, silk sleep shorts',
    photographicNotes: 'Morning light, casual intimacy aesthetic'
  },
  {
    id: 'instagram-festival',
    name: 'Festival Goddess Ensemble',
    category: 'artistic',
    intimacyLevel: 7,
    description: 'Crochet top with flowing skirt, bohemian luxury aesthetic',
    materials: ['Hand-crochet', 'Flowing chiffon', 'Body chains'],
    colorPalette: ['Earth tones', 'Gold', 'Turquoise'],
    styling: 'Minimal coverage crochet, low-rise maxi skirt, body jewelry',
    culturalContext: 'Coachella meets high fashion',
    photographicNotes: 'Golden hour desert photography ideal'
  }
];

// Helper function to get wardrobe by intimacy level
export function getWardrobeByIntimacy(minLevel: number, maxLevel: number): MasterWardrobeItem[] {
  return MASTER_WARDROBE_COLLECTION.filter(
    item => item.intimacyLevel >= minLevel && item.intimacyLevel <= maxLevel
  );
}

// Helper function to get wardrobe by category
export function getWardrobeByCategory(category: string): MasterWardrobeItem[] {
  return MASTER_WARDROBE_COLLECTION.filter(item => item.category === category);
}

// Preset combinations for quick selection
export const WARDROBE_PRESETS = {
  executive_seduction: {
    name: 'Executive Seduction',
    items: ['elegant-power-suit', 'intimate-bralette-set'],
    description: 'Power meets vulnerability'
  },
  artistic_expression: {
    name: 'Artistic Expression',
    items: ['artistic-mesh-creation', 'artistic-paint-body'],
    description: 'Body as canvas'
  },
  cultural_modern: {
    name: 'Cultural Modern',
    items: ['cultural-saree-modern', 'cultural-lehenga-choli'],
    description: 'Heritage meets contemporary'
  },
  instagram_influencer: {
    name: 'Instagram Influencer',
    items: ['instagram-athleisure', 'instagram-loungewear', 'instagram-festival'],
    description: 'Social media ready aesthetics'
  },
  sensual_sophisticate: {
    name: 'Sensual Sophisticate',
    items: ['sensual-lace-composition', 'sensual-bodysuit-sculpture', 'sensual-slip-dress'],
    description: 'Elegant revelation'
  },
  intimate_artistry: {
    name: 'Intimate Artistry',
    items: ['intimate-corset-ensemble', 'intimate-kimono-fusion', 'avant-garde-transparent'],
    description: 'Ultimate artistic expression'
  }
};