/**
 * GLAMOUR WARDROBE CATALOG
 * Minimal artistic coverage options for high-fashion erotic art
 * All descriptions use architectural and sculptural language for safety
 */

export interface WardrobeOption {
  id: string;
  name: string;
  category: 'lingerie-outerwear' | 'architectural-minimal' | 'strappy-geometric' | 'sheer-layers' | 'cutout-designs' | 'minimalist-boudoir' | 'office-power';
  coverageLevel: 1 | 2 | 3 | 4 | 5; // 1 = most minimal, 5 = most coverage
  description: string;
  artisticLanguage: string; // Safety-mapped description
  suitableForIntimacy: number[]; // Which intimacy levels this works for
  masterStyleFit: string[]; // Which master styles this suits
}

export const GLAMOUR_WARDROBE_CATALOG: WardrobeOption[] = [
  // Lingerie as Outerwear (Newton style)
  {
    id: 'strappy-bodysuit-black',
    name: 'Architectural Black Strappy Bodysuit',
    category: 'strappy-geometric',
    coverageLevel: 2,
    description: 'Geometric strappy bodysuit with strategic cutouts, creating bold linear patterns across the form',
    artisticLanguage: 'Architectural foundation garment with geometric strap configuration creating sculptural lines and negative space patterns across the silhouette',
    suitableForIntimacy: [6, 7, 8, 9, 10],
    masterStyleFit: ['newton', 'ritts']
  },
  {
    id: 'lace-bralette-minimal',
    name: 'Delicate Lace Foundation Pieces',
    category: 'lingerie-outerwear',
    coverageLevel: 1,
    description: 'Minimal black lace bralette and high-waisted brief set, emphasizing sculptural form',
    artisticLanguage: 'Delicate lace foundation garments with intricate geometric patterns, minimal architectural construction emphasizing graceful sculptural lines',
    suitableForIntimacy: [7, 8, 9, 10],
    masterStyleFit: ['newton', 'roversi']
  },
  {
    id: 'silk-robe-open',
    name: 'Flowing Silk Robe Layer',
    category: 'sheer-layers',
    coverageLevel: 3,
    description: 'Luxurious silk robe worn open over minimal foundation garments',
    artisticLanguage: 'Flowing silk textile layer creating dynamic movement and sculptural draping, worn as an architectural element over minimal foundation pieces',
    suitableForIntimacy: [6, 7, 8, 9],
    masterStyleFit: ['roversi', 'newton']
  },

  // Architectural Minimal Designs
  {
    id: 'geometric-cutout-dress',
    name: 'Geometric Cutout Mini Dress',
    category: 'cutout-designs',
    coverageLevel: 2,
    description: 'Black mini dress with strategic geometric cutouts revealing sculptural form',
    artisticLanguage: 'Architectural mini garment with precisely placed geometric negative spaces, creating bold compositional interplay between fabric and form',
    suitableForIntimacy: [5, 6, 7, 8],
    masterStyleFit: ['newton', 'penn']
  },
  {
    id: 'mesh-bodycon',
    name: 'Transparent Mesh Bodycon',
    category: 'sheer-layers',
    coverageLevel: 1,
    description: 'Form-fitting transparent mesh dress revealing foundation garments beneath',
    artisticLanguage: 'Translucent mesh textile construction creating layered visual depth, revealing architectural foundation garments as design elements',
    suitableForIntimacy: [7, 8, 9, 10],
    masterStyleFit: ['newton', 'ritts']
  },
  {
    id: 'harness-bodysuit',
    name: 'Leather Harness Bodysuit',
    category: 'strappy-geometric',
    coverageLevel: 1,
    description: 'Minimal leather harness configuration with geometric strap placement',
    artisticLanguage: 'Sculptural leather harness construction with architectural strap geometry creating bold graphic lines across the form',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['newton']
  },

  // Sheer Layers
  {
    id: 'sheer-blouse-open',
    name: 'Sheer Silk Blouse',
    category: 'sheer-layers',
    coverageLevel: 3,
    description: 'Translucent silk blouse revealing foundation garments, worn unbuttoned',
    artisticLanguage: 'Translucent silk textile construction creating subtle reveal of architectural foundation pieces, strategic draping and negative space',
    suitableForIntimacy: [5, 6, 7, 8],
    masterStyleFit: ['roversi', 'penn']
  },
  {
    id: 'tulle-overlay',
    name: 'Voluminous Tulle Overlay',
    category: 'sheer-layers',
    coverageLevel: 4,
    description: 'Ethereal tulle layers creating soft romantic coverage with glimpses of form',
    artisticLanguage: 'Voluminous tulle textile creating soft-focus romantic layering, ethereal material interplay with gentle reveal of sculptural silhouette',
    suitableForIntimacy: [4, 5, 6, 7],
    masterStyleFit: ['roversi']
  },

  // Cutout Designs
  {
    id: 'monokini-sculptural',
    name: 'Sculptural Monokini',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'One-piece swimsuit design with dramatic cutouts creating bold negative space',
    artisticLanguage: 'Architectural one-piece garment with strategic negative space design, sculptural cutouts creating geometric compositional elements',
    suitableForIntimacy: [6, 7, 8, 9],
    masterStyleFit: ['ritts', 'newton']
  },
  {
    id: 'bandeau-brief-set',
    name: 'Minimalist Bandeau Set',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'Minimal bandeau top and brief set in architectural black',
    artisticLanguage: 'Minimal architectural foundation pieces with clean geometric lines, essential sculptural construction emphasizing form',
    suitableForIntimacy: [7, 8, 9, 10],
    masterStyleFit: ['penn', 'ritts']
  },

  // High Fashion Provocative
  {
    id: 'corset-modern',
    name: 'Contemporary Corset Structure',
    category: 'architectural-minimal',
    coverageLevel: 2,
    description: 'Modern corset with architectural boning and minimal coverage',
    artisticLanguage: 'Contemporary corset construction with architectural boning structure creating sculptural waist definition and geometric form emphasis',
    suitableForIntimacy: [6, 7, 8, 9],
    masterStyleFit: ['newton', 'penn']
  },
  {
    id: 'chain-mail-dress',
    name: 'Metallic Chain Mail Mini',
    category: 'sheer-layers',
    coverageLevel: 2,
    description: 'Metallic chain mail mini dress revealing form through the material',
    artisticLanguage: 'Metallic chain textile construction creating semi-transparent material layer, revealing sculptural form through geometric mesh pattern',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['newton', 'ritts']
  },

  // Barely There
  {
    id: 'string-bikini-luxury',
    name: 'Luxury String Bikini',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'Minimal string bikini in luxury fabric, emphasizing natural form',
    artisticLanguage: 'Essential minimal foundation garment with delicate structural elements, sculptural simplicity emphasizing natural form and proportion',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['ritts', 'newton']
  },
  {
    id: 'body-jewelry',
    name: 'Sculptural Body Jewelry',
    category: 'strappy-geometric',
    coverageLevel: 1,
    description: 'Metallic body chains and jewelry creating minimal artistic coverage',
    artisticLanguage: 'Sculptural metallic body adornment creating geometric patterns and linear elements, architectural jewelry as primary design focus',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['newton', 'ritts']
  },

  // Layered Sophistication
  {
    id: 'blazer-bra-combo',
    name: 'Power Blazer + Bralette',
    category: 'lingerie-outerwear',
    coverageLevel: 3,
    description: 'Tailored blazer worn over delicate bralette, mixing power and sensuality',
    artisticLanguage: 'Structured blazer construction paired with delicate foundation garment, creating architectural contrast between power tailoring and sculptural intimacy',
    suitableForIntimacy: [5, 6, 7, 8],
    masterStyleFit: ['newton', 'penn']
  },
  {
    id: 'coat-lingerie',
    name: 'Luxury Coat + Minimal Foundations',
    category: 'lingerie-outerwear',
    coverageLevel: 3,
    description: 'Long coat worn open revealing minimal foundation garments',
    artisticLanguage: 'Architectural coat construction worn open to reveal minimal foundation pieces, creating layered compositional depth and strategic negative space',
    suitableForIntimacy: [6, 7, 8, 9],
    masterStyleFit: ['newton', 'roversi']
  },

  // Statement Pieces
  {
    id: 'latex-catsuit',
    name: 'Architectural Latex Catsuit',
    category: 'architectural-minimal',
    coverageLevel: 4,
    description: 'Form-fitting latex catsuit creating second-skin effect',
    artisticLanguage: 'Architectural latex construction creating sculptural second-skin effect, high-gloss material emphasizing form as pure geometric sculpture',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['newton']
  },
  {
    id: 'feather-accents',
    name: 'Strategic Feather Accents',
    category: 'architectural-minimal',
    coverageLevel: 2,
    description: 'Minimal foundation garments with luxurious feather accents',
    artisticLanguage: 'Minimal architectural foundation with voluminous feather textile accents, creating soft textural contrast and sculptural movement',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['roversi', 'penn']
  },

  // === MINIMALIST BOUDOIR CONCEPTS ===
  {
    id: 'silk-square-minimal',
    name: 'Single Silk Square Drape',
    category: 'minimalist-boudoir',
    coverageLevel: 1,
    description: 'Single large square of raw-edged black silk, draped and held by tension',
    artisticLanguage: 'Reductionist textile study - singular raw-edged silk square creating dynamic draping through tension and gravity. The fabric maps topographical terrain while maintaining elegant negative space, held in place through natural physics rather than construction',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['penn', 'roversi']
  },
  {
    id: 'slip-single-strap',
    name: 'Asymmetrical Single-Strap Slip',
    category: 'minimalist-boudoir',
    coverageLevel: 2,
    description: 'Delicate silk slip suspended by single spaghetti strap, other strap loose',
    artisticLanguage: 'Minimalist architectural garment where one delicate strap creates entire structural narrative. Asymmetrical drape reveals one shoulder completely while creating diagonal line across form. The precarious balance between coverage and revelation',
    suitableForIntimacy: [8, 9],
    masterStyleFit: ['roversi', 'penn']
  },
  {
    id: 'wrap-charmeuse-black',
    name: 'Liquid Charmeuse Wrap',
    category: 'minimalist-boudoir',
    coverageLevel: 2,
    description: 'Long rectangle of stretch charmeuse in active wrapping motion',
    artisticLanguage: 'Kinetic textile study - flowing charmeuse captured mid-motion as it wraps the form. Strategic folding and tension create intelligent coverage while sections float away from skin, creating dynamic interplay between static form and moving fabric',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['roversi', 'newton']
  },
  {
    id: 'jewelry-pearl-collar',
    name: 'Pearl Collar & Wrist Cuffs Only',
    category: 'minimalist-boudoir',
    coverageLevel: 1,
    description: 'Wide baroque pearl collar and matching pearl cuffs - jewelry as entire wardrobe',
    artisticLanguage: 'Ultra-minimalist concept where adornment replaces clothing. Wide collar of irregular baroque pearls sits high on neck, matching cuffs on wrists. The three points of jewelry map the body through strategic absence, creating focus on quality of materials and perfection of form',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['penn', 'ritts']
  },
  {
    id: 'kimono-chiffon-sheer',
    name: 'Floor-Length Sheer Chiffon Kimono',
    category: 'minimalist-boudoir',
    coverageLevel: 3,
    description: 'Black chiffon kimono worn open, creating layers of transparency',
    artisticLanguage: 'Single-layer transparency study - floor-length chiffon kimono with minimal geometric embroidery. Falls open naturally creating multiple layers of varying opacity. Long sleeves drape like architectural wings. Backlight transforms fabric into glowing screen',
    suitableForIntimacy: [8, 9],
    masterStyleFit: ['roversi', 'penn']
  },
  {
    id: 'ribbon-satin-4inch',
    name: 'Continuous Satin Ribbon Mapping',
    category: 'minimalist-boudoir',
    coverageLevel: 1,
    description: '4-inch wide satin ribbon in continuous pattern mapping body contours',
    artisticLanguage: 'Cartographic minimalism - single continuous ribbon creates topographical map of form. Wraps in intricate pattern following natural contours without crossing intimate areas. Secured with single simple knot. The ribbon becomes visual pathway, decorative and architectural simultaneously',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['penn', 'newton']
  },
  {
    id: 'harness-leather-minimal',
    name: 'Single-Strap Leather Harness',
    category: 'minimalist-boudoir',
    coverageLevel: 1,
    description: 'Continuous leather strap in single loop creating three contact points',
    artisticLanguage: 'Reductionist constraint aesthetic - single continuous supple leather strap wraps in unbroken loop creating three architectural contact points: shoulder, opposite hip, across back. No hardware or buckles, just pure line and form. Wide enough for substance, thin enough for elegance',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['newton', 'ritts']
  },

  // === OFFICE POWER WARDROBE ===
  {
    id: 'blouse-silk-white',
    name: 'White Silk Blouse - Strategic Unbuttoning',
    category: 'office-power',
    coverageLevel: 3,
    description: 'Precisely tailored white silk blouse, unbuttoned to reveal geometric harness beneath',
    artisticLanguage: 'Corporate power textile in pure white silk, tailored for executive precision. Strategic unbuttoning reveals architectural black geometric harness beneath, creating dialogue between professional exterior and personal expression. The transformation of uniform into statement',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['newton', 'ritts']
  },
  {
    id: 'blazer-minimal-tailored',
    name: 'Tailored Blazer Worn Open',
    category: 'office-power',
    coverageLevel: 2,
    description: 'Custom-tailored black blazer worn open with nothing beneath',
    artisticLanguage: 'Architectural tailoring as sculpture - custom-fit blazer in luxurious fabric worn open to frame rather than conceal. Sleeves rolled to reveal elegant forearms. The garment creates powerful negative space and celebrates the intelligence of minimal coverage',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['newton', 'ritts', 'penn']
  },
  {
    id: 'transparent-suit-black',
    name: 'Transparent Black Power Suit',
    category: 'office-power',
    coverageLevel: 3,
    description: 'Sheer black power suit over structural lace bodysuit with architectural cutouts',
    artisticLanguage: 'Layered transparency concept - executive suit constructed from sheer technical fabric over structural lace foundation with geometric cutouts. Creates multiple planes of visibility, corporate armor peeled back to reveal personal power beneath. Modern power aesthetics redefined',
    suitableForIntimacy: [8, 9],
    masterStyleFit: ['newton', 'ritts']
  },
  {
    id: 'blazer-cashmere-minimal',
    name: 'Cashmere Blazer - Luxury Minimal',
    category: 'office-power',
    coverageLevel: 2,
    description: 'Black cashmere blazer worn open with single diamond necklace',
    artisticLanguage: 'Billionaire minimalism - custom black cashmere blazer of extraordinary quality worn open over nothing but strategic shadow and singular diamond necklace. Speaks of effortless power and unlimited resources. Corporate authority as personal luxury',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['newton', 'penn']
  },
  {
    id: 'bodysuit-tech-fabric',
    name: 'Liquid Silver Tech-Fabric Wrap',
    category: 'office-power',
    coverageLevel: 2,
    description: 'Responsive tech-fabric that displays data patterns and pulses with light',
    artisticLanguage: 'Cyber-sensuality concept - liquid silver technical fabric wrap dress that responds to environmental lighting. Surface displays data flow patterns that pulse with digital rhythm. Creates sculptural second skin that positions human form as ultimate technology',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['ritts', 'newton']
  },
  {
    id: 'jumpsuit-cutout-white',
    name: 'Structural White Jumpsuit with Geometric Cutouts',
    category: 'office-power',
    coverageLevel: 3,
    description: 'Architectural white jumpsuit with precise geometric cutouts mapping form',
    artisticLanguage: 'Architectural fashion construct - structural white jumpsuit with geometric cutout pattern that maps form against spatial grid. The ensemble becomes part of architectural design language, celebrating the relationship between human curves and environmental lines',
    suitableForIntimacy: [7, 8],
    masterStyleFit: ['ritts', 'penn']
  }
];

export function getWardrobeByCategory(category: WardrobeOption['category']): WardrobeOption[] {
  return GLAMOUR_WARDROBE_CATALOG.filter(w => w.category === category);
}

export function getWardrobeByIntimacy(intimacyLevel: number): WardrobeOption[] {
  return GLAMOUR_WARDROBE_CATALOG.filter(w => w.suitableForIntimacy.includes(intimacyLevel));
}

export function getWardrobeByStyle(masterStyle: string): WardrobeOption[] {
  return GLAMOUR_WARDROBE_CATALOG.filter(w => w.masterStyleFit.includes(masterStyle));
}

export function getWardrobeByCoverage(maxCoverage: 1 | 2 | 3 | 4 | 5): WardrobeOption[] {
  return GLAMOUR_WARDROBE_CATALOG.filter(w => w.coverageLevel <= maxCoverage);
}

export function getRandomWardrobe(intimacyLevel: number, masterStyle: string): WardrobeOption {
  const suitable = GLAMOUR_WARDROBE_CATALOG.filter(
    w => w.suitableForIntimacy.includes(intimacyLevel) && w.masterStyleFit.includes(masterStyle)
  );
  return suitable[Math.floor(Math.random() * suitable.length)] || GLAMOUR_WARDROBE_CATALOG[0];
}
