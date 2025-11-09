/**
 * VARIANT GENERATOR SERVICE
 *
 * Generates logical variations of Flux prompts by combining different elements
 * while maintaining category consistency and style coherence.
 */

import { FluxPromptTemplate } from '../concepts/fluxPromptLibrary';

/**
 * Element libraries organized by category for logical consistency
 */
export const VARIANT_ELEMENTS = {
  corporate: {
    poses: [
      'Kneeling among fabric samples and design swatches',
      'Standing at boardroom table with confident authority',
      'Seated on executive desk edge',
      'Leaning against floor-to-ceiling glass window',
      'Adjusting designer presentation materials',
      'Positioned at corner office desk with city views',
      'Standing by architectural column with commanding presence',
      'Reviewing documents at standing desk'
    ],
    environments: [
      'Executive screening room with luxury seating',
      'Glass-walled boardroom with city skyline views',
      'Corner office with leather seating and art',
      'Luxury penthouse office with designer furniture',
      'Modern conference room with architectural lighting',
      'Private executive lounge with premium finishes',
      'CEO suite with floor-to-ceiling windows',
      'Executive library with mahogany shelving'
    ],
    wardrobes: [
      'A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form',
      'Structured architectural blazer with deconstructed elements, creating professional sophistication with artistic edge',
      'Tailored power suit with structured authority, strategic design elements creating executive sophistication',
      'Deconstructed blazer over minimal architectural foundation, asymmetric lines',
      'Premium tailored foundation with continuous draping, executive elegance',
      'Architectural suit jacket with precision tailoring and strategic reveals',
      'Minimalist executive piece with geometric cutouts and clean lines'
    ],
    lighting: [
      'Professional studio-quality lighting',
      'Natural executive lighting with architectural shadows',
      'Dramatic executive lighting emphasizing power and sensuality',
      'Late afternoon golden hour through floor-to-ceiling windows',
      'Professional studio lighting with hard shadows and highlights',
      'Natural window light with professional fill',
      'Three-point lighting creating dramatic depth'
    ],
    cameraAngles: [
      'High angle suggesting vulnerability within power',
      'Eye level emphasizing authority and executive power',
      'Low angle emphasizing authority and power',
      'Slight low angle for empowerment',
      'Slight high angle for editorial vulnerability',
      'Eye level for balanced perspective',
      'Cinematic eye level'
    ],
    colorGrades: [
      'Rich dramatic tones with sensual warmth',
      'Cool professional tones with executive precision',
      'Warm luxury tones with sophisticated depth',
      'High-contrast with deep blacks and bright whites',
      'Balanced natural color with cinematic depth',
      'Warm natural tones with artistic depth',
      'Cinematic color grading with rich shadows and warm highlights'
    ]
  },

  artistic: {
    poses: [
      'Sitting on workshop stool surrounded by materials',
      'Leaning against white gallery wall',
      'Seated on seamless paper backdrop',
      'Standing among creative materials with artistic focus',
      'Positioned near canvas with contemplative expression',
      'Adjusting studio lighting with natural movement'
    ],
    environments: [
      'Artist studio with canvases and natural light',
      'White cube gallery with track lighting and abstract art',
      'Photography studio with lighting equipment visible',
      'Creative loft with north-facing windows',
      'Gallery space with contemporary sculptures',
      'Workshop environment with artistic chaos'
    ],
    wardrobes: [
      'Oversized linen shirt partially unbuttoned, minimal foundation beneath, raw aesthetic',
      'Architectural draped fabric creating sculptural form, deconstructed design',
      'Draped silk fabric creating form-following lines, minimalist coverage',
      'Minimal artistic piece with organic draping',
      'Deconstructed garment with experimental construction',
      'Flowing fabric creating abstract sculptural forms'
    ],
    lighting: [
      'Soft north-facing window light creating gentle shadows',
      'Museum-quality track lighting with architectural shadows',
      'Single key light with dramatic chiaroscuro effect',
      'Natural atelier light with architectural quality',
      'Soft diffused natural light',
      'Directional natural light with artistic shadows'
    ],
    cameraAngles: [
      'Eye level documentary style',
      'Straight-on documentary approach',
      'Eye level intimate connection',
      'Natural documentary perspective',
      'Slight high angle documentary',
      'Eye level artistic observation'
    ],
    colorGrades: [
      'Muted natural tones with warm skin highlights',
      'High-contrast with deep blacks and bright whites',
      'Dramatic black and white with rich tonal range',
      'Natural with rich fabric colors and warm skin tones',
      'Desaturated tones with artistic depth',
      'Monochrome with subtle warm undertones'
    ]
  },

  editorial: {
    poses: [
      'Dynamic standing with architectural posture',
      'Reclining on designer furniture',
      'Standing with runway confidence',
      'Seated with editorial grace',
      'Leaning with fashion elegance',
      'Positioned with magazine sophistication'
    ],
    environments: [
      'Minimalist white studio with stark shadows',
      'Luxury penthouse with designer furniture',
      'Editorial studio with fashion lighting',
      'High-fashion loft with modern aesthetic',
      'Magazine studio with professional setup',
      'Designer showroom with architectural elements'
    ],
    wardrobes: [
      'Avant-garde architectural piece with geometric cutouts, haute couture construction',
      'Deconstructed couture piece with strategic coverage, editorial minimalism',
      'High-fashion sculptural garment with dramatic lines',
      'Couture piece with architectural integrity',
      'Editorial ensemble with geometric precision',
      'Fashion-forward design with strategic reveals'
    ],
    lighting: [
      'Dramatic fashion lighting with hard shadows and highlights',
      'Natural window light with editorial softness',
      'Professional editorial lighting setup',
      'High-fashion studio lighting',
      'Magazine-quality natural light',
      'Editorial soft light with subtle shadows'
    ],
    cameraAngles: [
      'Slight low angle for editorial power',
      'Slight high angle for editorial vulnerability',
      'Eye level editorial perspective',
      'Fashion photography angle',
      'Magazine editorial viewpoint',
      'High-fashion perspective'
    ],
    colorGrades: [
      'High-contrast editorial with punchy colors',
      'Warm editorial tones with rich depth',
      'Fashion-forward color with vibrant tones',
      'Editorial precision with balanced tones',
      'Magazine-quality color grading',
      'High-end editorial with refined palette'
    ]
  },

  architectural: {
    poses: [
      'Geometric positioning creating architectural lines',
      'Standing against concrete brutalist wall',
      'Positioned to create negative space',
      'Angular stance emphasizing form',
      'Structured positioning with geometric precision',
      'Standing in architectural composition'
    ],
    environments: [
      'White architectural space with geometric shadows',
      'Brutalist concrete architecture with raw textures',
      'Minimalist geometric environment',
      'Architectural interior with clean lines',
      'Brutalist structure with harsh geometry',
      'Geometric space with architectural elements'
    ],
    wardrobes: [
      'Architectural wire-frame piece creating negative space, sculptural design',
      'Minimal geometric piece creating stark contrast with concrete, sculptural minimalism',
      'Geometric construction with architectural integrity',
      'Minimalist piece with structural elements',
      'Wire-frame design creating spatial relationships',
      'Architectural garment with geometric precision'
    ],
    lighting: [
      'Directional architectural lighting creating sharp shadows and geometry',
      'Harsh architectural sunlight creating dramatic shadows',
      'Geometric lighting with architectural precision',
      'Structural light creating angular shadows',
      'Brutalist lighting with stark contrasts',
      'Architectural light with geometric patterns'
    ],
    cameraAngles: [
      'Straight-on architectural documentation',
      'Eye level architectural documentation',
      'Geometric perspective',
      'Architectural viewpoint',
      'Structural documentation angle',
      'Geometric composition perspective'
    ],
    colorGrades: [
      'High-contrast black and white with graphic quality',
      'Stark contrast with desaturated tones and rich blacks',
      'Monochrome with geometric emphasis',
      'Black and white with architectural precision',
      'Desaturated with structural emphasis',
      'High-contrast monochrome'
    ]
  },

  creative: {
    poses: [
      'Working at design table with fabric',
      'Seated in director\'s chair',
      'Reviewing creative materials with focus',
      'Standing at creative workspace',
      'Positioned among design elements',
      'Working with creative tools and materials'
    ],
    environments: [
      'Fashion atelier with fabrics and dress forms',
      'Film set with lighting rigs and equipment',
      'Creative studio with design materials',
      'Designer workspace with mood boards',
      'Production environment with professional gear',
      'Creative industry setting with artistic tools'
    ],
    wardrobes: [
      'Draped couture sample creating elegant coverage, design in progress',
      'Architectural draped piece suggesting costume design, cinematic aesthetic',
      'Designer sample with creative construction',
      'Creative industry ensemble with artistic flair',
      'Couture piece in development stage',
      'Fashion design sample with professional finish'
    ],
    lighting: [
      'Natural atelier light with architectural quality',
      'Cinematic three-point lighting creating dramatic depth',
      'Creative industry lighting setup',
      'Professional production lighting',
      'Film set lighting with cinematic quality',
      'Designer studio natural light'
    ],
    cameraAngles: [
      'Slight high angle documentary',
      'Cinematic eye level',
      'Creative industry perspective',
      'Documentary observation angle',
      'Film production viewpoint',
      'Design studio perspective'
    ],
    colorGrades: [
      'Natural with rich fabric colors and warm skin tones',
      'Cinematic color grading with rich shadows and warm highlights',
      'Creative industry color palette',
      'Film production color grading',
      'Designer aesthetic with rich tones',
      'Artistic color with professional depth'
    ]
  }
};

/**
 * Generate a variant of a Flux prompt template
 */
export function generatePromptVariant(
  baseTemplate: FluxPromptTemplate,
  variantIndex: number = 0
): FluxPromptTemplate {
  const category = baseTemplate.category as keyof typeof VARIANT_ELEMENTS;
  const elements = VARIANT_ELEMENTS[category];

  if (!elements) {
    console.warn(`No variant elements for category: ${category}`);
    return baseTemplate;
  }

  // Use variant index to create deterministic but varied combinations
  const seed = variantIndex + Date.now();

  // Select elements using modulo for deterministic selection
  const poseIndex = seed % elements.poses.length;
  const envIndex = (seed + 1) % elements.environments.length;
  const wardrobeIndex = (seed + 2) % elements.wardrobes.length;
  const lightingIndex = (seed + 3) % elements.lighting.length;
  const angleIndex = (seed + 4) % elements.cameraAngles.length;
  const colorIndex = (seed + 5) % elements.colorGrades.length;

  // Create new prompt with varied elements
  const variantPrompt = baseTemplate.prompt
    .replace(/pose: [^,]+,/, `pose: ${elements.poses[poseIndex]},`)
    .replace(/environment: [^.]+\./, `environment: ${elements.environments[envIndex]}.`)
    .replace(/wardrobe: [^.]+\.\./, `wardrobe: ${elements.wardrobes[wardrobeIndex]}..`)
    .replace(/lighting: [^.]+\./, `lighting: ${elements.lighting[lightingIndex]}.`)
    .replace(/angle: [^,]+,/, `angle: ${elements.cameraAngles[angleIndex]},`)
    .replace(/color_grade: [^.]+\./, `color_grade: ${elements.colorGrades[colorIndex]}.`);

  return {
    ...baseTemplate,
    id: `${baseTemplate.id}-variant-${variantIndex}`,
    name: `${baseTemplate.name} (Variant ${variantIndex + 1})`,
    prompt: variantPrompt
  };
}

/**
 * Generate multiple variants at once
 */
export function generateMultipleVariants(
  baseTemplate: FluxPromptTemplate,
  count: number = 3
): FluxPromptTemplate[] {
  const variants: FluxPromptTemplate[] = [];

  for (let i = 0; i < count; i++) {
    variants.push(generatePromptVariant(baseTemplate, i));
  }

  return variants;
}

/**
 * Ensure logical consistency between elements
 * (Future enhancement - can add rules like "corporate environment = executive wardrobe")
 */
export function validateVariantConsistency(
  category: string,
  pose: string,
  environment: string,
  wardrobe: string
): boolean {
  // For now, all combinations within a category are considered consistent
  // Future: Add specific rules per category
  return true;
}
