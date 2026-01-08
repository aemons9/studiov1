/**
 * Muse Prompt Strategies for MasterClass Mode
 *
 * Specialized prompt generation strategies for the Indian Hourglass Muse
 * Covering all intimacy levels with artistic sophistication
 */

import { MasterPromptStrategy, MasterPromptConfig } from './masterPromptStrategy';
import { INDIAN_HOURGLASS_MUSE_MASTERCLASS } from '../models/indianHourglassMuseMasterClass';
import {
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  generateMusePrompt
} from '../../vera/indianHourglassMuseCollection';

// Extended configuration for muse-specific prompts
export interface MusePromptConfig extends MasterPromptConfig {
  locationId?: string;
  wardrobeId?: string;
  poseId?: string;
  narrativeProgression?: 'morning_routine' | 'nightlife_journey' | 'artistic_exploration';
  environmentalBlend?: {
    primary: string;
    secondary: string;
    ratio: number;
  };
  lightingExperiment?: {
    type: 'natural' | 'studio' | 'artistic' | 'mixed';
    intensity: number;
    colorTemp: number;
  };
}

export class MuseMasterPromptStrategy extends MasterPromptStrategy {
  /**
   * Generate specialized prompts for the Indian Hourglass Muse
   */
  public generateMusePrompt(config: MusePromptConfig): string {
    // If specific muse elements are provided, use the dedicated generator
    if (config.locationId && config.wardrobeId && config.poseId) {
      const location = MUSE_LOCATIONS.find(l => l.id === config.locationId);
      const wardrobe = MUSE_WARDROBE.find(w => w.id === config.wardrobeId);
      const pose = MUSE_POSES.find(p => p.id === config.poseId);

      if (location && wardrobe && pose) {
        const basePrompt = generateMusePrompt(
          location,
          wardrobe,
          pose,
          'artistic',
          config.narrativeIntent
        );

        // Add MasterClass enhancements
        return this.enhanceWithMasterClassElements(basePrompt, config);
      }
    }

    // Otherwise use the standard MasterClass generation with muse model
    return this.generateMasterPrompt({
      ...config,
      model: INDIAN_HOURGLASS_MUSE_MASTERCLASS
    });
  }

  /**
   * Enhance base prompt with MasterClass artistic elements
   */
  private enhanceWithMasterClassElements(basePrompt: string, config: MusePromptConfig): string {
    let enhancedPrompt = this.artDirectorDeclaration + '\n\n' + basePrompt;

    // Add platform-specific optimizations
    if (config.platformTarget === 'instagram') {
      enhancedPrompt += '\n\nINSTAGRAM OPTIMIZATION: Composed for maximum engagement with viral potential. Every element designed to stop scrolling and drive saves. Authentic yet aspirational, relatable yet luxurious.';
    } else if (config.platformTarget === 'editorial') {
      enhancedPrompt += '\n\nEDITORIAL EXCELLENCE: Magazine-quality composition meeting Vogue standards. Fashion-forward while maintaining timeless appeal. Premium publication ready with artistic merit.';
    } else if (config.platformTarget === 'gallery') {
      enhancedPrompt += '\n\nGALLERY EXHIBITION: Museum-quality fine art photography. Challenging conventional beauty standards while celebrating form. Suitable for exhibition in contemporary art spaces.';
    }

    // Add technical specifications
    enhancedPrompt += `\n\nTECHNICAL MASTERY:
Resolution: ${config.outputResolution} capture with pristine detail
Aspect Ratio: ${config.aspectRatio} optimized for intended display
Quality: ${config.renderQuality} level execution
Color Science: Professional color grading with calibrated accuracy
Post-Processing: Minimal retouching preserving natural texture`;

    // Add lighting experiment if specified
    if (config.lightingExperiment) {
      enhancedPrompt += `\n\nLIGHTING EXPERIMENT:
Type: ${config.lightingExperiment.type} lighting setup
Intensity: ${config.lightingExperiment.intensity}% power
Color Temperature: ${config.lightingExperiment.colorTemp}K
Creating experimental interplay of light and shadow for artistic effect.`;
    }

    // Add environmental blend if specified
    if (config.environmentalBlend) {
      const loc1 = MUSE_LOCATIONS.find(l => l.id === config.environmentalBlend!.primary);
      const loc2 = MUSE_LOCATIONS.find(l => l.id === config.environmentalBlend!.secondary);
      if (loc1 && loc2) {
        enhancedPrompt += `\n\nENVIRONMENTAL FUSION:
Surreal blending of ${loc1.name} (${config.environmentalBlend.ratio}%) with ${loc2.name} (${100 - config.environmentalBlend.ratio}%)
Creating impossible dreamscape where reality bends to artistic vision.`;
      }
    }

    return enhancedPrompt;
  }

  /**
   * Generate narrative progression series
   */
  public generateNarrativeSeries(
    progression: 'morning_routine' | 'nightlife_journey' | 'artistic_exploration',
    baseConfig: Omit<MusePromptConfig, 'narrativeProgression'>
  ): string[] {
    const narratives = {
      morning_routine: [
        {
          narrative: 'Dawn awakening with soft morning light',
          location: 'luxury_apartment_balcony',
          wardrobe: 'high_waist_crop',
          pose: 'window_light_play',
          intimacy: 4
        },
        {
          narrative: 'Morning stretches catching golden rays',
          location: 'minimalist_hostel_room',
          wardrobe: 'sheer_bodysuit_layer',
          pose: 'floor_goddess',
          intimacy: 6
        },
        {
          narrative: 'Coffee contemplation on the balcony',
          location: 'luxury_apartment_balcony',
          wardrobe: 'shadow_lace_teddy',
          pose: 'balcony_silhouette',
          intimacy: 7
        },
        {
          narrative: 'Preparing for the day ahead',
          location: 'luxury_apartment_balcony',
          wardrobe: 'strappy_geometric',
          pose: 'mirror_arch_signature',
          intimacy: 8
        }
      ],
      nightlife_journey: [
        {
          narrative: 'Pre-party preparation and anticipation',
          location: 'luxury_apartment_balcony',
          wardrobe: 'liquid_metal_mini',
          pose: 'mirror_arch_signature',
          intimacy: 5
        },
        {
          narrative: 'Arrival at exclusive venue',
          location: 'pool_club_vip',
          wardrobe: 'liquid_metal_mini',
          pose: 'club_booth_lounge',
          intimacy: 6
        },
        {
          narrative: 'Peak party energy and glamour',
          location: 'vip_booth_purple',
          wardrobe: 'architectural_cutout',
          pose: 'club_booth_lounge',
          intimacy: 7
        },
        {
          narrative: 'After-hours intimate moments',
          location: 'luxury_apartment_balcony',
          wardrobe: 'shadow_lace_teddy',
          pose: 'bedroom_door_lean',
          intimacy: 9
        }
      ],
      artistic_exploration: [
        {
          narrative: 'Beginning the artistic journey',
          location: 'art_gallery_closed',
          wardrobe: 'architectural_cutout',
          pose: 'staircase_ascent',
          intimacy: 6
        },
        {
          narrative: 'Finding the perfect light',
          location: 'empty_theatre_stage',
          wardrobe: 'strappy_geometric',
          pose: 'artistic_shadow_wall',
          intimacy: 8
        },
        {
          narrative: 'Becoming one with shadows',
          location: 'secret_cave_lights',
          wardrobe: 'light_shadow_play',
          pose: 'artistic_shadow_wall',
          intimacy: 9
        },
        {
          narrative: 'Transcending physical form',
          location: 'secret_cave_lights',
          wardrobe: 'environmental_elements',
          pose: 'water_emergence',
          intimacy: 10
        }
      ]
    };

    const series = narratives[progression];
    return series.map(scene => {
      return this.generateMusePrompt({
        ...baseConfig,
        narrativeIntent: scene.narrative,
        locationId: scene.location,
        wardrobeId: scene.wardrobe,
        poseId: scene.pose
      });
    });
  }

  /**
   * Generate intimacy-appropriate prompts
   */
  public generateByIntimacyLevel(
    level: number,
    config: Omit<MusePromptConfig, 'wardrobeSelection'>
  ): string {
    // Select appropriate wardrobe for intimacy level
    const appropriateWardrobe = MUSE_WARDROBE.filter(w =>
      w.intimacyLevel >= level - 1 && w.intimacyLevel <= level + 1
    );

    // Select appropriate location for intimacy level
    const appropriateLocations = MUSE_LOCATIONS.filter(l =>
      l.intimacyRange[0] <= level && l.intimacyRange[1] >= level
    );

    // Select appropriate pose for intimacy level
    const appropriatePoses = MUSE_POSES.filter(p =>
      p.intimacyLevel >= level - 1 && p.intimacyLevel <= level + 1
    );

    // Pick random selections from appropriate options
    const selectedWardrobe = appropriateWardrobe[Math.floor(Math.random() * appropriateWardrobe.length)];
    const selectedLocation = appropriateLocations[Math.floor(Math.random() * appropriateLocations.length)];
    const selectedPose = appropriatePoses[Math.floor(Math.random() * appropriatePoses.length)];

    return this.generateMusePrompt({
      ...config,
      locationId: selectedLocation.id,
      wardrobeId: selectedWardrobe.id,
      poseId: selectedPose.id,
      safetyLevel: level <= 3 ? 'conservative' : level <= 6 ? 'balanced' : level <= 8 ? 'artistic' : 'boundary-pushing'
    });
  }
}

// Preset configurations for quick access
export const MUSE_MASTERCLASS_PRESETS = {
  // Instagram Viral Content
  instagram_morning_selfie: {
    narrativeIntent: 'Authentic morning beauty that breaks the algorithm',
    emotionalTone: 'Playful vulnerability with confident sensuality',
    culturalContext: 'Modern Indian woman owning her narrative',
    platformTarget: 'instagram' as const,
    renderQuality: 'final' as const,
    aspectRatio: '4:5' as const,
    locationId: 'luxury_apartment_balcony',
    wardrobeId: 'high_waist_crop',
    poseId: 'mirror_arch_signature'
  },

  instagram_nightlife_glamour: {
    narrativeIntent: 'Luxury nightlife content with viral appeal',
    emotionalTone: 'Confident glamour with mysterious allure',
    culturalContext: 'Mumbai party culture elevated',
    platformTarget: 'instagram' as const,
    renderQuality: 'final' as const,
    aspectRatio: '9:16' as const,
    locationId: 'pool_club_vip',
    wardrobeId: 'liquid_metal_mini',
    poseId: 'pool_edge_recline'
  },

  // Editorial Excellence
  editorial_fashion_story: {
    narrativeIntent: 'High-fashion editorial celebrating Indian beauty',
    emotionalTone: 'Sophisticated elegance with editorial edge',
    culturalContext: 'Global Indian aesthetic',
    platformTarget: 'editorial' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '2:3' as const,
    locationId: 'spiral_staircase_heritage',
    wardrobeId: 'architectural_cutout',
    poseId: 'staircase_ascent'
  },

  editorial_intimate_portrait: {
    narrativeIntent: 'Intimate portrait series with artistic merit',
    emotionalTone: 'Vulnerable strength with quiet power',
    culturalContext: 'Contemporary femininity',
    platformTarget: 'editorial' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '3:4' as const,
    locationId: 'minimalist_hostel_room',
    wardrobeId: 'shadow_lace_teddy',
    poseId: 'window_light_play'
  },

  // Gallery Art
  gallery_fine_art_nude: {
    narrativeIntent: 'Fine art exploration of form and beauty',
    emotionalTone: 'Transcendent artistry beyond conventional beauty',
    culturalContext: 'Universal feminine divinity',
    platformTarget: 'gallery' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '3:4' as const,
    locationId: 'secret_cave_lights',
    wardrobeId: 'light_shadow_play',
    poseId: 'artistic_shadow_wall'
  },

  gallery_environmental_art: {
    narrativeIntent: 'Human form as extension of nature',
    emotionalTone: 'Organic connection with environment',
    culturalContext: 'Ancient meets contemporary',
    platformTarget: 'gallery' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '16:9' as const,
    locationId: 'suburban_lake_night',
    wardrobeId: 'environmental_elements',
    poseId: 'water_emergence'
  },

  // Commercial Campaigns
  commercial_lifestyle: {
    narrativeIntent: 'Aspirational lifestyle with broad appeal',
    emotionalTone: 'Approachable luxury with warmth',
    culturalContext: 'Modern Indian success story',
    platformTarget: 'commercial' as const,
    renderQuality: 'preview' as const,
    aspectRatio: '1:1' as const,
    locationId: 'craft_bar_counter',
    wardrobeId: 'high_waist_crop',
    poseId: 'club_booth_lounge'
  },

  commercial_beauty: {
    narrativeIntent: 'Beauty campaign celebrating natural glow',
    emotionalTone: 'Confident radiance with authenticity',
    culturalContext: 'Inclusive beauty standards',
    platformTarget: 'commercial' as const,
    renderQuality: 'final' as const,
    aspectRatio: '4:5' as const,
    locationId: 'luxury_apartment_balcony',
    wardrobeId: 'metallic_bikini_sarong',
    poseId: 'balcony_silhouette'
  },

  // Artistic Experiments
  artistic_shadow_play: {
    narrativeIntent: 'Experimental exploration of light and form',
    emotionalTone: 'Mysterious sensuality with artistic depth',
    culturalContext: 'Transcending cultural boundaries',
    platformTarget: 'artistic' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '3:4' as const,
    locationId: 'empty_theatre_stage',
    wardrobeId: 'strappy_geometric',
    poseId: 'artistic_shadow_wall',
    lightingExperiment: {
      type: 'artistic' as const,
      intensity: 80,
      colorTemp: 2700
    }
  },

  artistic_cultural_fusion: {
    narrativeIntent: 'Heritage meets contemporary artistic expression',
    emotionalTone: 'Cultural pride with modern interpretation',
    culturalContext: 'Bridging tradition and modernity',
    platformTarget: 'artistic' as const,
    renderQuality: 'masterpiece' as const,
    aspectRatio: '2:3' as const,
    locationId: 'spiral_staircase_heritage',
    wardrobeId: 'architectural_cutout',
    poseId: 'staircase_ascent'
  }
};

// Helper function to get appropriate preset by intimacy and platform
export function getMusePreset(
  intimacyLevel: number,
  platform: 'instagram' | 'editorial' | 'gallery' | 'commercial' | 'artistic'
): typeof MUSE_MASTERCLASS_PRESETS[keyof typeof MUSE_MASTERCLASS_PRESETS] {
  const presets = Object.values(MUSE_MASTERCLASS_PRESETS).filter(p =>
    p.platformTarget === platform
  );

  // Select preset based on intimacy level
  if (intimacyLevel <= 4) {
    return presets.find(p => p.narrativeIntent.includes('lifestyle') || p.narrativeIntent.includes('morning'))
      || MUSE_MASTERCLASS_PRESETS.commercial_lifestyle;
  } else if (intimacyLevel <= 7) {
    return presets.find(p => p.narrativeIntent.includes('glamour') || p.narrativeIntent.includes('fashion'))
      || MUSE_MASTERCLASS_PRESETS.editorial_fashion_story;
  } else {
    return presets.find(p => p.narrativeIntent.includes('art') || p.narrativeIntent.includes('intimate'))
      || MUSE_MASTERCLASS_PRESETS.gallery_fine_art_nude;
  }
}

// Export main strategy instance
export const musePromptStrategy = new MuseMasterPromptStrategy();