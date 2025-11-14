import type { WardrobeOption } from './types';

export const WARDROBE_CATALOG: WardrobeOption[] = [
  // --- Lingerie & Outerwear ---
  {
    id: 'midnight-lace-bodysuit',
    name: 'Midnight Lace Bodysuit',
    category: 'lingerie-outerwear',
    coverageLevel: 2,
    description: 'An intricate bodysuit crafted from fine French Chantilly lace, featuring a daringly low neckline, high-cut legs, and a completely open back. The delicate floral patterns are strategically placed to both conceal and reveal.',
    artisticLanguage: 'Evokes themes of gothic romance, hidden desires, and nocturnal elegance. For scenes requiring a blend of sophistication and raw sensuality.',
    suitableForIntimacy: [7, 8, 9, 10],
    masterStyleFit: ['Cinematic Noir', 'Romantic Glow', 'Midnight Drama']
  },
  {
    id: 'crimson-silk-teddy',
    name: 'Crimson Silk Teddy',
    category: 'lingerie-outerwear',
    coverageLevel: 3,
    description: 'A bias-cut teddy made from liquid-like crimson silk charmeuse. It drapes loosely over the torso and features delicate spaghetti straps and eyelash lace trim along the bust and hem.',
    artisticLanguage: 'Represents passion, luxury, and classic glamour. Ideal for scenes that are both intimate and visually rich, suggesting a story of romance or seduction.',
    suitableForIntimacy: [6, 7, 8, 9],
    masterStyleFit: ['Vintage Film Grain', 'Romantic Glow', 'Luxury Opulence']
  },
  // --- Architectural & Minimal ---
  {
    id: 'geometric-cutout-bodysuit',
    name: 'Geometric Cutout Bodysuit',
    category: 'architectural-minimal',
    coverageLevel: 2,
    description: 'A high-fashion bodysuit made from a matte, scuba-like material. It features sharp, asymmetrical cutouts that create a play of negative space, highlighting the form beneath in a graphic, architectural manner.',
    artisticLanguage: 'Modern, edgy, and powerful. It transforms the body into a living sculpture. Perfect for futuristic, high-fashion, or avant-garde concepts.',
    suitableForIntimacy: [5, 6, 7, 8],
    masterStyleFit: ['High-Fashion Editorial', 'Urban Contrast', 'Cyberpunk Futurism']
  },
  {
    id: 'single-thread-harness',
    name: 'Single-Thread Body Harness',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'The most minimal of garments. A single, continuous thread of elasticated silk or fine leather that wraps around the body to create geometric patterns, emphasizing contours without concealing them.',
    artisticLanguage: 'A study in line and form. Represents the ultimate in artistic minimalism and body confidence. For fine-art concepts that celebrate the human figure.',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['Minimalist Serenity', 'High-Fashion Editorial', 'Baroque Opulence']
  },
  // --- Strappy & Geometric ---
  {
    id: 'bondage-inspired-harness',
    name: 'Strappy Geometric Harness',
    category: 'strappy-geometric',
    coverageLevel: 1,
    description: 'A complex harness of interconnected faux leather straps that frame the torso, waist, and hips. It features polished metal O-rings and buckles, creating a look that is both restrictive and empowering.',
    artisticLanguage: 'Conveys themes of power dynamics, control, and edgy sensuality. Excellent for dramatic, high-contrast scenes with a strong narrative element.',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['Gritty Realism', 'Midnight Drama', 'Urban Contrast']
  },
  // --- Sheer & Layers ---
  {
    id: 'ethereal-silk-chiffon-robe',
    name: 'Sheer Silk Chiffon Robe',
    category: 'sheer-layers',
    coverageLevel: 4,
    description: 'A floor-length, completely sheer robe made from the lightest silk chiffon. It has voluminous bishop sleeves and floats around the body, creating a hazy, dreamlike silhouette.',
    artisticLanguage: 'Dreamy, ethereal, and romantic. It suggests vulnerability and a sense of otherworldliness. Perfect for creating soft, atmospheric, and artistic scenes.',
    suitableForIntimacy: [4, 5, 6, 7],
    masterStyleFit: ['Ethereal Dreamscape', 'Romantic Glow', 'Minimalist Serenity']
  },
  // --- Cutout Designs ---
  {
    id: 'slashed-jersey-monokini',
    name: 'Slashed-Jersey Monokini',
    category: 'cutout-designs',
    coverageLevel: 2,
    description: 'A one-piece garment that looks like a swimsuit but is made from soft jersey. It features strategic "slashes" and cutouts held together by small metal rings, revealing slices of skin in an unexpected, artistic pattern.',
    artisticLanguage: 'Deconstructed, raw, and modern. Suggests a rebellious or primal energy. Ideal for edgy fashion shoots or character-driven concepts.',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['Gritty Realism', 'Urban Contrast', 'High-Fashion Editorial']
  },
  // --- Minimalist Boudoir ---
  {
    id: 'liquid-latex-catsuit',
    name: 'Liquid Latex Catsuit',
    category: 'minimalist-boudoir',
    coverageLevel: 5,
    description: 'A second-skin catsuit made from high-shine black latex. While it covers the entire body, its form-fitting nature and reflective surface highlight every curve and contour.',
    artisticLanguage: 'Futuristic, fetishistic, and powerful. Creates a sleek, almost inhuman silhouette. For bold, high-impact concepts that are visually striking.',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['Cyberpunk Futurism', 'High-Fashion Editorial', 'Midnight Drama']
  },
  // --- Premium Indian Sensual Collection ---
  {
    id: 'golden-chains-minimal',
    name: 'Golden Body Chains',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'Ultra-luxury golden body chains creating geometric patterns across décolletage, waist, and hips. Strategic minimal coverage emphasizing natural form with artistic precision.',
    artisticLanguage: 'Goddess aesthetic celebrating feminine power and beauty. Ultimate luxury with maximum artistic expression.',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['Luxury Opulence', 'Romantic Glow', 'Minimalist Serenity']
  },
  {
    id: 'leather-harness-architectural',
    name: 'Architectural Leather Harness',
    category: 'strappy-geometric',
    coverageLevel: 1,
    description: 'Intricate black leather harness with geometric straps creating graphic patterns. Strategic bands frame torso, waist, and hips with architectural precision.',
    artisticLanguage: 'Power, strength, and edgy sensuality. Transforms body into living sculpture with bold confidence.',
    suitableForIntimacy: [8, 9, 10],
    masterStyleFit: ['Gritty Realism', 'Urban Contrast', 'High-Fashion Editorial']
  },
  {
    id: 'mesh-minimal-thong',
    name: 'Delicate Mesh Thong Set',
    category: 'minimalist-boudoir',
    coverageLevel: 1,
    description: 'High-waisted black mesh thong with geometric details and matching sheer thigh-high stockings. Minimal fine art aesthetic sculpted by light.',
    artisticLanguage: 'Celebrates natural form through minimalism. Perfect for artistic nude studies emphasizing curves and light.',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['Minimalist Serenity', 'High-Fashion Editorial', 'Gritty Realism']
  },
  {
    id: 'silk-stockings-seamed',
    name: 'Vintage Seamed Stockings',
    category: 'lingerie-outerwear',
    coverageLevel: 3,
    description: 'Sheer black silk stockings with classic back seams and delicate lace tops. Pairs with corsetry for film noir glamour.',
    artisticLanguage: 'Classic Hollywood elegance and vintage seduction. Perfect for noir and romantic concepts.',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['Cinematic Noir', 'Vintage Film Grain', 'Romantic Glow']
  },
  {
    id: 'lace-bralette-intimate',
    name: 'Intimate Lace Bralette',
    category: 'lingerie-outerwear',
    coverageLevel: 2,
    description: 'Delicate black lace bralette with intricate floral patterns and matching high-waisted lace-trimmed briefs. Natural beauty emphasis.',
    artisticLanguage: 'Soft, vulnerable intimacy celebrating authentic beauty. Perfect for private boudoir moments.',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['Romantic Glow', 'Ethereal Dreamscape', 'Minimalist Serenity']
  },
  {
    id: 'corset-lace-ornate',
    name: 'Ornate Lace Corset',
    category: 'architectural-minimal',
    coverageLevel: 3,
    description: 'Black lace corset with intricate embroidery, structured boning, and dramatic waist cinching. Creates classic hourglass silhouette.',
    artisticLanguage: 'Vintage glamour meets sculptural form. Emphasizes curves while projecting power and sensuality.',
    suitableForIntimacy: [7, 8, 9],
    masterStyleFit: ['Cinematic Noir', 'Luxury Opulence', 'Vintage Film Grain']
  },
  {
    id: 'chiffon-robe-sheer',
    name: 'Sheer Black Chiffon Robe',
    category: 'sheer-layers',
    coverageLevel: 4,
    description: 'Floor-length completely sheer black chiffon robe with flowing movement. Creates hazy, mysterious silhouette worn open.',
    artisticLanguage: 'Mystery and elegance. Suggests vulnerability with sophistication. Perfect for noir and romantic scenes.',
    suitableForIntimacy: [6, 7, 8],
    masterStyleFit: ['Cinematic Noir', 'Romantic Glow', 'Ethereal Dreamscape']
  },
  {
    id: 'body-chain-minimal',
    name: 'Minimal Body Chain Design',
    category: 'architectural-minimal',
    coverageLevel: 1,
    description: 'Single continuous chain creating geometric patterns emphasizing chest, waist, and curves with artistic minimalism.',
    artisticLanguage: 'Ultimate body confidence and artistic expression. Jewelry as wardrobe celebrating natural form.',
    suitableForIntimacy: [9, 10],
    masterStyleFit: ['Minimalist Serenity', 'Luxury Opulence', 'High-Fashion Editorial']
  }
];
