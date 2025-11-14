/**
 * Imagen 4 Ultra Prompt Optimizer
 * Advanced optimization for Indian model photography with Imagen 4.0
 */

import type { PromptData } from '../types';

export interface Imagen4OptimizationConfig {
  modelType: 'imagen-4.0-ultra-generate-001' | 'imagen-4.0-generate-001';
  intimacyLevel: number; // 1-10
  safetyMode: 'conservative' | 'balanced' | 'artistic' | 'boundary-pushing';
  qualityPreset: 'standard' | 'premium' | 'gallery' | 'masterpiece';
  ethnicityFocus: 'indian' | 'south-asian' | 'global';
  styleEmphasis: 'photorealistic' | 'cinematic' | 'editorial' | 'fine-art';
}

export interface OptimizationResult {
  optimizedPrompt: string;
  structuredData: PromptData;
  safetyScore: number; // 0-1, lower is safer
  qualityScore: number; // 0-1, higher is better
  warnings: string[];
  enhancements: string[];
}

/**
 * Core optimization strategies for Imagen 4
 */
export class Imagen4PromptOptimizer {
  private config: Imagen4OptimizationConfig;

  // Imagen 4 specific trigger words that enhance quality
  private readonly QUALITY_TRIGGERS = {
    masterpiece: ['award-winning photograph', 'museum-quality', 'professionally photographed'],
    gallery: ['fine art photography', 'gallery exhibition quality', 'artistic masterwork'],
    premium: ['high-end fashion photography', 'luxury editorial', 'professional studio lighting'],
    standard: ['professional photography', 'well-composed shot', 'proper lighting']
  };

  // Cultural sensitivity mappings for Indian models
  private readonly INDIAN_MODEL_DESCRIPTORS = {
    skinTone: {
      conservative: 'warm complexion',
      balanced: 'golden-bronze skin tone',
      artistic: 'luminous caramel complexion',
      'boundary-pushing': 'sun-kissed bronze skin'
    },
    features: {
      conservative: 'elegant features',
      balanced: 'classic Indian beauty with expressive eyes',
      artistic: 'stunning South Asian features, captivating gaze',
      'boundary-pushing': 'striking Indian features with a captivating gaze'
    },
    figure: {
      conservative: 'graceful silhouette',
      balanced: 'elegant feminine form',
      artistic: 'sculpted hourglass figure',
      'boundary-pushing': 'dramatic statuesque curves'
    }
  };

  // Imagen 4 safe wardrobe descriptions mapped to intimacy levels
  private readonly WARDROBE_MAPPINGS = new Map<number, string[]>([
    [1, ['professional attire', 'business suit', 'formal dress']],
    [2, ['elegant dress', 'designer outfit', 'sophisticated ensemble']],
    [3, ['stylish casual wear', 'fashionable outfit', 'trendy clothing']],
    [4, ['form-fitting dress', 'elegant evening wear', 'cocktail attire']],
    [5, ['glamorous gown', 'high-fashion couture', 'red carpet dress']],
    [6, ['artistic fashion', 'avant-garde design', 'conceptual clothing']],
    [7, ['elegant evening wear', 'silk dress with strategic cutouts', 'backless gown']],
    [8, ['sheer overlay designs', 'lace and silk combination', 'haute couture elegance']],
    [9, ['minimalist high fashion', 'architectural fashion pieces', 'avant-garde statement pieces']],
    [10, ['fine art figure study with strategic shadows', 'artistic fabric draping with implied coverage', 'fine art figure study']]
  ]);

  // Pose descriptions optimized for Imagen 4
  private readonly POSE_LIBRARY = {
    professional: [
      'confident standing pose with hands on hips',
      'seated executive pose at desk',
      'walking with purpose and authority'
    ],
    elegant: [
      'graceful seated pose with crossed legs',
      'standing with one hand on waist, slight hip tilt',
      'leaning against wall with sophisticated poise'
    ],
    artistic: [
      'dynamic fashion pose with fabric movement',
      'artistic recline on designer furniture',
      'dramatic silhouette against window light'
    ],
    sensual: [
      'elegant pose on silk fabrics',
      'arched back emphasizing natural curves',
      'dramatic over-shoulder gaze'
    ]
  };

  constructor(config: Imagen4OptimizationConfig) {
    this.config = config;
  }

  /**
   * Main optimization pipeline
   */
  public optimize(input: string | PromptData): OptimizationResult {
    // Convert input to structured data if needed
    const structuredData = typeof input === 'string' 
      ? this.parseToStructuredData(input)
      : input;

    // Apply Imagen 4 specific optimizations
    const optimized = this.applyOptimizations(structuredData);

    // Generate the final prompt string
    const promptString = this.generateOptimalPromptString(optimized);

    // Calculate safety and quality scores
    const safetyScore = this.calculateSafetyScore(optimized);
    const qualityScore = this.calculateQualityScore(optimized);

    // Generate warnings and enhancement notes
    const warnings = this.generateWarnings(optimized, safetyScore);
    const enhancements = this.documentEnhancements(structuredData, optimized);

    return {
      optimizedPrompt: promptString,
      structuredData: optimized,
      safetyScore,
      qualityScore,
      warnings,
      enhancements
    };
  }

  /**
   * Apply all Imagen 4 specific optimizations
   */
  private applyOptimizations(data: PromptData): PromptData {
    const optimized = JSON.parse(JSON.stringify(data)) as PromptData;

    // 1. Optimize subject description for Imagen 4
    optimized.subject = this.optimizeSubject(optimized.subject);

    // 2. Enhance wardrobe based on intimacy level
    optimized.wardrobe = this.optimizeWardrobe(optimized.wardrobe);

    // 3. Improve lighting for photorealism
    optimized.lighting = this.optimizeLighting(optimized.lighting);

    // 4. Add quality triggers to style
    optimized.style = this.enhanceStyle(optimized.style);

    // 5. Optimize camera settings
    optimized.camera = this.optimizeCamera(optimized.camera);

    // 6. Enhance overall quality descriptors
    optimized.quality = this.enhanceQuality(optimized.quality);

    // 7. Add Imagen 4 specific technical details
    optimized.shot = this.optimizeShot(optimized.shot);

    return optimized;
  }

  /**
   * Optimize subject description for Indian models
   */
  private optimizeSubject(subject: any): any {
    const { safetyMode } = this.config;
    
    // Use culturally appropriate descriptors
    const skinTone = this.INDIAN_MODEL_DESCRIPTORS.skinTone[safetyMode];
    const features = this.INDIAN_MODEL_DESCRIPTORS.features[safetyMode];
    const figure = this.INDIAN_MODEL_DESCRIPTORS.figure[safetyMode];

    // Build optimized variant description
    const variant = `Stunning Indian model with ${features}, ${skinTone}, and ${figure}. ` +
      `Professional fashion model physique with natural beauty. ` +
      `Age 24-28, height 5'7", perfectly proportioned for high fashion.`;

    // The original subject.pose contains the user's raw idea.
    const originalIdea = subject.pose;
    
    // Optimize pose based on intimacy level
    const poseCategory = this.getPoseCategory();
    const poses = this.POSE_LIBRARY[poseCategory];
    const libraryPose = poses[Math.floor(Math.random() * poses.length)];

    // Combine them intelligently
    const pose = `${originalIdea}, expressed through a pose of ${libraryPose}.`;

    return {
      ...subject,
      variant,
      pose,
      hair_style: this.optimizeHairStyle(subject.hair_style),
      skin_finish: 'Natural healthy glow with professional makeup, visible skin texture for realism'
    };
  }

  /**
   * Optimize wardrobe descriptions for safety
   */
  private optimizeWardrobe(wardrobe: string): string {
    const { intimacyLevel } = this.config;
    const wardrobeOptions = this.WARDROBE_MAPPINGS.get(
      Math.min(intimacyLevel, 10)
    ) || this.WARDROBE_MAPPINGS.get(5)!;

    // Add fabric and material details for realism
    const materials = this.getMaterials(intimacyLevel);
    const selectedWardrobe = wardrobeOptions[0];

    return `${selectedWardrobe} made of ${materials}. Impeccable tailoring with realistic fabric draping. ` +
      `Designer piece with attention to detail. Color palette: deep jewel tones or classic neutrals.`;
  }

  /**
   * Optimize lighting for Imagen 4's strengths
   */
  private optimizeLighting(lighting: string): string {
    const lightingTemplates = {
      masterpiece: 'Rembrandt lighting with golden hour warmth, subtle rim lighting for depth. ' +
        'Professional 3-point studio setup with key light at 45 degrees, fill light for shadow detail, ' +
        'and background separation light.',
      gallery: 'Museum-quality lighting with perfect exposure. Soft directional light from large octabox, ' +
        'creating gentle shadows that sculpt features. Subtle catch lights in eyes.',
      premium: 'High-end fashion photography lighting. Beauty dish main light with grid for control, ' +
        'strip boxes for edge definition, seamless backdrop lighting.',
      standard: 'Professional portrait lighting with softbox key light and reflector fill. ' +
        'Even illumination with natural shadow falloff.'
    };

    return lightingTemplates[this.config.qualityPreset];
  }

  /**
   * Enhance style with Imagen 4 triggers
   */
  private enhanceStyle(style: string): string {
    const triggers = this.QUALITY_TRIGGERS[this.config.qualityPreset];
    const styleEmphasis = this.getStyleEmphasis();

    return `${triggers.join(', ')}. ${styleEmphasis}. ${style}. ` +
      `Shot in the style of renowned fashion photographers like Mario Testino or Annie Leibovitz.`;
  }

  /**
   * Optimize camera settings for technical accuracy
   */
  private optimizeCamera(camera: any): any {
    const optimizedSettings = {
      focal_length: camera.focal_length || '85mm f/1.4',
      aperture: camera.aperture || 'f/2.8',
      distance: camera.distance || '2.5 meters',
      angle: this.optimizeCameraAngle(camera.angle),
      framing: this.optimizeFraming(camera.framing)
    };

    return optimizedSettings;
  }

    private optimizeShot(shot: string): string {
        return `${shot}, ultra-high-resolution, 8K, crystal clear detail, sharp focus.`;
    }

    private enhanceQuality(quality: string): string {
        return `Masterpiece quality, ${quality}, hyper-detailed, intricate details, flawless composition.`;
    }


  /**
   * Generate optimal prompt string for Imagen 4
   */
  private generateOptimalPromptString(data: PromptData): string {
    const sections = [];

    // Opening with quality triggers
    sections.push(this.QUALITY_TRIGGERS[this.config.qualityPreset].join(', '));

    // Main subject description
    sections.push(data.subject.variant);
    sections.push(`Pose: ${data.subject.pose}`);

    // Wardrobe and styling
    sections.push(`Wearing ${data.wardrobe}`);

    // Environment and setting
    sections.push(`Setting: ${data.environment}`);

    // Technical details
    sections.push(`Lighting: ${data.lighting}`);
    sections.push(`Camera: ${data.camera.focal_length} at ${data.camera.aperture}, ${data.camera.angle}`);

    // Quality and style
    sections.push(data.style);
    sections.push(data.quality);

    // Additional realism details
    sections.push('Photorealistic rendering with authentic skin texture and fabric physics.');
    sections.push('Professional color grading with cinematic depth.');

    return sections.join(' ');
  }

  /**
   * Calculate safety score (0-1, lower is safer)
   */
  private calculateSafetyScore(data: PromptData): number {
    let score = 0;

    // Check for risky keywords
    const riskyTerms = ['nude', 'naked', 'topless', 'lingerie', 'underwear', 'bra', 'panties', 'seductive', 'sensual', 'erotic'];
    const promptText = JSON.stringify(data).toLowerCase();
    
    riskyTerms.forEach(term => {
      if (promptText.includes(term)) score += 0.15;
    });

    // Adjust based on intimacy level
    score += (this.config.intimacyLevel - 5) * 0.05;

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Calculate quality score based on optimizations
   */
  private calculateQualityScore(data: PromptData): number {
    let score = 0.5; // Base score

    // Check for quality indicators
    if (data.style.includes('award-winning')) score += 0.1;
    if (data.lighting.includes('professional')) score += 0.1;
    if (data.camera.focal_length.includes('85mm')) score += 0.05;
    if (data.quality.includes('8K')) score += 0.1;
    if (data.subject.variant.includes('professional')) score += 0.05;

    // Quality preset bonus
    const presetBonus = {
      masterpiece: 0.2,
      gallery: 0.15,
      premium: 0.1,
      standard: 0
    };
    score += presetBonus[this.config.qualityPreset];

    return Math.min(1, score);
  }

  /**
   * Generate warnings based on content analysis
   */
  private generateWarnings(data: PromptData, safetyScore: number): string[] {
    const warnings: string[] = [];

    if (safetyScore > 0.7) {
      warnings.push('High risk content detected - may trigger safety filters');
    }
    if (safetyScore > 0.5) {
      warnings.push('Moderate risk - consider using more conservative descriptions');
    }
    if (this.config.intimacyLevel > 8) {
      warnings.push('Very high intimacy level - likely to be blocked by Imagen 4');
    }

    return warnings;
  }

  /**
   * Document what enhancements were made
   */
  private documentEnhancements(original: PromptData, optimized: PromptData): string[] {
    const enhancements: string[] = [];

    if (original.subject.variant !== optimized.subject.variant) {
      enhancements.push('Enhanced subject description for Indian model specificity');
    }
    if (original.wardrobe !== optimized.wardrobe) {
      enhancements.push('Optimized wardrobe for safety and realism');
    }
    if (original.lighting !== optimized.lighting) {
      enhancements.push('Professional lighting setup added');
    }
    if (original.style !== optimized.style) {
      enhancements.push('Added Imagen 4 quality triggers');
    }

    return enhancements;
  }

  // Helper methods
  private parseToStructuredData(prompt: string): PromptData {
    // A simple parser to integrate the user's concept.
    return {
      shot: 'Professional portrait',
      subject: {
        variant: 'Indian model',
        pose: prompt, // Use the user's prompt as the pose/action
        hair_color: 'black',
        hair_style: 'long flowing hair',
        nail_art: 'professional manicure',
        high_heels: 'designer heels',
        tattoos: 'none',
        piercings: 'traditional earrings',
        body_art: 'none',
        skin_finish: 'natural',
        hand_and_nail_details: 'elegant hands'
      },
      wardrobe: 'elegant dress',
      environment: 'luxury studio',
      lighting: 'professional lighting',
      camera: {
        focal_length: '85mm',
        aperture: 'f/2.8',
        distance: '3m',
        angle: 'eye level',
        framing: 'medium shot'
      },
      color_grade: 'warm tones',
      style: 'fashion photography',
      quality: 'high quality',
      figure_and_form: 'elegant posture',
      skin_micro_details: 'realistic skin',
      fabric_physics: 'natural draping',
      material_properties: 'silk and satin'
    };
  }

  private getPoseCategory(): 'professional' | 'elegant' | 'artistic' | 'sensual' {
    const { intimacyLevel } = this.config;
    if (intimacyLevel <= 3) return 'professional';
    if (intimacyLevel <= 5) return 'elegant';
    if (intimacyLevel <= 7) return 'artistic';
    return 'sensual';
  }

  private getMaterials(intimacyLevel: number): string {
    const materials = [
      'premium cotton and wool blend',
      'luxurious silk charmeuse',
      'flowing chiffon with subtle transparency',
      'delicate lace over satin',
      'sheer mesh with strategic coverage',
      'gossamer fabric with artistic draping'
    ];
    
    const index = Math.min(Math.floor((intimacyLevel - 1) / 2), materials.length - 1);
    return materials[index];
  }

  private optimizeHairStyle(original: string): string {
    const styles = [
      'sleek professional bun with face-framing strands',
      'elegant waves cascading over shoulders',
      'voluminous blowout with Hollywood glamour',
      'tousled beach waves with natural movement',
      'romantic updo with loose tendrils'
    ];
    
    return styles[Math.floor(Math.random() * styles.length)];
  }

  private optimizeCameraAngle(original: string): string {
    const angles = {
      low: 'slight low angle for empowerment and stature',
      eye: 'eye level for intimate connection',
      high: 'gentle high angle for vulnerability',
      dynamic: '3/4 angle for dimensionality'
    };

    if (original?.includes('low')) return angles.low;
    if (original?.includes('high')) return angles.high;
    if (original?.includes('dynamic')) return angles.dynamic;
    return angles.eye;
  }

  private optimizeFraming(original: string): string {
    const framings = {
      close: 'intimate close-up focusing on facial beauty',
      medium: 'medium shot from waist up, emphasizing pose and expression',
      full: 'full body shot showcasing outfit and posture',
      wide: 'environmental portrait with context'
    };

    if (original?.includes('close')) return framings.close;
    if (original?.includes('full')) return framings.full;
    if (original?.includes('wide')) return framings.wide;
    return framings.medium;
  }

  private getStyleEmphasis(): string {
    const emphasis = {
      photorealistic: 'Ultra-photorealistic rendering with lifelike detail',
      cinematic: 'Cinematic composition with dramatic depth of field',
      editorial: 'High-fashion editorial style with bold composition',
      'fine-art': 'Fine art photography with artistic interpretation'
    };

    return emphasis[this.config.styleEmphasis];
  }
}

/**
 * Preset configurations for common use cases
 */
export const IMAGEN4_PRESETS: {[key: string]: Imagen4OptimizationConfig} = {
  safePortrait: {
    modelType: 'imagen-4.0-generate-001',
    intimacyLevel: 3,
    safetyMode: 'conservative',
    qualityPreset: 'premium',
    ethnicityFocus: 'indian',
    styleEmphasis: 'photorealistic'
  },
  fashionEditorial: {
    modelType: 'imagen-4.0-generate-001',
    intimacyLevel: 5,
    safetyMode: 'balanced',
    qualityPreset: 'gallery',
    ethnicityFocus: 'indian',
    styleEmphasis: 'editorial'
  },
  artisticBeauty: {
    modelType: 'imagen-4.0-generate-001',
    intimacyLevel: 7,
    safetyMode: 'artistic',
    qualityPreset: 'masterpiece',
    ethnicityFocus: 'indian',
    styleEmphasis: 'fine-art'
  },
  boundaryPushing: {
    modelType: 'imagen-4.0-generate-001',
    intimacyLevel: 9,
    safetyMode: 'boundary-pushing',
    qualityPreset: 'masterpiece',
    ethnicityFocus: 'indian',
    styleEmphasis: 'fine-art'
  }
};