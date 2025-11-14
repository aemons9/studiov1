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
  }
];
