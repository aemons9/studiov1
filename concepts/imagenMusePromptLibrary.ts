/**
 * IMAGEN 4 MUSE PROMPT LIBRARY
 *
 * Specialized collection for our Indian Hourglass Instagram Muse
 * All prompts feature the same model with varying locations, wardrobes, and intimacy levels
 * Based on comprehensive location taxonomy and progressive wardrobe system
 */

import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';
import {
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  MUSE_COLLECTION_PRESETS,
  generateMusePrompt,
  PHOTOGRAPHY_STYLES
} from '../vera/indianHourglassMuseCollection';

export interface ImagenMusePromptTemplate {
  id: string;
  name: string;
  category: 'urban_nights' | 'intimate_spaces' | 'artistic_expression' | 'natural_elements' | 'architectural' | 'nightlife';
  subcategory: string;
  intimacyLevel: number;
  prompt: string;
  aspectRatio: '3:4' | '4:3' | '1:1' | '16:9' | '9:16';
  personGeneration: 'allow_adult';
  safetyFilter: 'block_few' | 'block_only_high';
  location: string;
  wardrobe: string;
  pose: string;
  photographyStyle: keyof typeof PHOTOGRAPHY_STYLES;
}

/**
 * Generate comprehensive muse prompt library
 */
function generateMusePromptLibrary(): ImagenMusePromptTemplate[] {
  const prompts: ImagenMusePromptTemplate[] = [];

  // URBAN NIGHTS COLLECTION (Intimacy 3-7)
  const urbanNightsCombos = [
    { loc: 'pool_club_vip', ward: 'liquid_metal_mini', pose: 'pool_edge_recline', style: 'glamour' as const },
    { loc: 'pool_table_club', ward: 'mesh_layer_club', pose: 'club_booth_lounge', style: 'cinematic' as const },
    { loc: 'craft_bar_counter', ward: 'high_waist_crop', pose: 'bedroom_door_lean', style: 'casual' as const },
    { loc: 'narrow_alley_lights', ward: 'architectural_cutout', pose: 'staircase_ascent', style: 'artistic' as const },
    { loc: 'tier2_dimmed_alley', ward: 'metallic_bikini_sarong', pose: 'window_light_play', style: 'cinematic' as const },
    { loc: 'vip_booth_purple', ward: 'liquid_metal_mini', pose: 'club_booth_lounge', style: 'glamour' as const },
  ];

  urbanNightsCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style);
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_urban_${index + 1}`,
      name: `Urban Nights: ${location.name} - ${wardrobe.name}`,
      category: 'urban_nights',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: '3:4',
      personGeneration: 'allow_adult',
      safetyFilter: wardrobe.intimacyLevel > 6 ? 'block_few' : 'block_only_high',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  // INTIMATE SPACES COLLECTION (Intimacy 5-9)
  const intimateSpacesCombos = [
    { loc: 'luxury_apartment_balcony', ward: 'shadow_lace_teddy', pose: 'balcony_silhouette', style: 'artistic' as const },
    { loc: 'minimalist_hostel_room', ward: 'sheer_bodysuit_layer', pose: 'window_light_play', style: 'casual' as const },
    { loc: 'mountain_cabin_wood', ward: 'strappy_geometric', pose: 'floor_goddess', style: 'artistic' as const },
    { loc: 'office_after_hours', ward: 'architectural_cutout', pose: 'staircase_ascent', style: 'glamour' as const },
    { loc: 'vintage_cinema_projection', ward: 'shadow_lace_teddy', pose: 'artistic_shadow_wall', style: 'cinematic' as const },
  ];

  intimateSpacesCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style);
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_intimate_${index + 1}`,
      name: `Intimate Spaces: ${location.name} - ${wardrobe.name}`,
      category: 'intimate_spaces',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: '3:4',
      personGeneration: 'allow_adult',
      safetyFilter: 'block_few',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  // ARTISTIC EXPRESSION COLLECTION (Intimacy 7-10)
  const artisticCombos = [
    { loc: 'secret_cave_lights', ward: 'light_shadow_play', pose: 'artistic_shadow_wall', style: 'artistic' as const },
    { loc: 'empty_theatre_stage', ward: 'strappy_geometric', pose: 'floor_goddess', style: 'artistic' as const },
    { loc: 'art_gallery_closed', ward: 'architectural_cutout', pose: 'staircase_ascent', style: 'glamour' as const },
    { loc: 'empty_stadium_lights', ward: 'liquid_metal_mini', pose: 'balcony_silhouette', style: 'cinematic' as const },
    { loc: 'secret_cave_lights', ward: 'environmental_elements', pose: 'water_emergence', style: 'artistic' as const },
  ];

  artisticCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style,
      'Fine art photography emphasis with dramatic lighting and shadow play. Museum-quality artistic composition focusing on form, light, and shadow as primary elements.'
    );
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_artistic_${index + 1}`,
      name: `Artistic Expression: ${location.name}`,
      category: 'artistic_expression',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: '3:4',
      personGeneration: 'allow_adult',
      safetyFilter: 'block_few',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  // NATURAL ELEMENTS COLLECTION (Intimacy 6-10)
  const naturalCombos = [
    { loc: 'suburban_lake_night', ward: 'environmental_elements', pose: 'water_emergence', style: 'artistic' as const },
    { loc: 'monsoon_terrace', ward: 'metallic_bikini_sarong', pose: 'window_light_play', style: 'casual' as const },
    { loc: 'mountain_cabin_wood', ward: 'shadow_lace_teddy', pose: 'floor_goddess', style: 'artistic' as const },
    { loc: 'suburban_lake_night', ward: 'light_shadow_play', pose: 'artistic_shadow_wall', style: 'artistic' as const },
  ];

  naturalCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style,
      'Natural environmental integration with organic elements and atmospheric conditions. Emphasis on harmony between human form and natural surroundings.'
    );
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_natural_${index + 1}`,
      name: `Natural Elements: ${location.name}`,
      category: 'natural_elements',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: index % 2 === 0 ? '3:4' : '16:9',
      personGeneration: 'allow_adult',
      safetyFilter: 'block_few',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  // ARCHITECTURAL SPACES (Intimacy 4-8)
  const architecturalCombos = [
    { loc: 'glass_elevator_night', ward: 'mesh_layer_club', pose: 'staircase_ascent', style: 'cinematic' as const },
    { loc: 'spiral_staircase_heritage', ward: 'architectural_cutout', pose: 'staircase_ascent', style: 'glamour' as const },
    { loc: 'office_after_hours', ward: 'liquid_metal_mini', pose: 'bedroom_door_lean', style: 'glamour' as const },
  ];

  architecturalCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style,
      'Architectural photography emphasizing lines, geometry, and spatial relationships. Human form as complement to architectural elements.'
    );
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_arch_${index + 1}`,
      name: `Architectural: ${location.name}`,
      category: 'architectural',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: '3:4',
      personGeneration: 'allow_adult',
      safetyFilter: wardrobe.intimacyLevel > 6 ? 'block_few' : 'block_only_high',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  // NIGHTLIFE PREMIUM (Intimacy 5-9)
  const nightlifeCombos = [
    { loc: 'pool_club_vip', ward: 'liquid_metal_mini', pose: 'pool_edge_recline', style: 'glamour' as const },
    { loc: 'vip_booth_purple', ward: 'strappy_geometric', pose: 'club_booth_lounge', style: 'glamour' as const },
    { loc: 'craft_bar_counter', ward: 'architectural_cutout', pose: 'bedroom_door_lean', style: 'cinematic' as const },
    { loc: 'roadside_dhaba', ward: 'high_waist_crop', pose: 'window_light_play', style: 'casual' as const },
  ];

  nightlifeCombos.forEach((combo, index) => {
    const location = MUSE_LOCATIONS.find(l => l.id === combo.loc)!;
    const wardrobe = MUSE_WARDROBE.find(w => w.id === combo.ward)!;
    const pose = MUSE_POSES.find(p => p.id === combo.pose)!;

    const basePrompt = generateMusePrompt(location, wardrobe, pose, combo.style,
      'Nightlife photography with vibrant colors, dynamic lighting, and energetic atmosphere. Club culture and urban sophistication.'
    );
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${basePrompt}`;

    prompts.push({
      id: `muse_nightlife_${index + 1}`,
      name: `Nightlife: ${location.name}`,
      category: 'nightlife',
      subcategory: location.category,
      intimacyLevel: wardrobe.intimacyLevel,
      prompt: imagenPrompt,
      aspectRatio: '3:4',
      personGeneration: 'allow_adult',
      safetyFilter: wardrobe.intimacyLevel > 6 ? 'block_few' : 'block_only_high',
      location: location.id,
      wardrobe: wardrobe.id,
      pose: pose.id,
      photographyStyle: combo.style
    });
  });

  return prompts;
}

// Export the generated library
export const imagenMusePromptLibrary = generateMusePromptLibrary();

// Helper function to get prompts by intimacy range
export function getMusePromptsByIntimacy(minLevel: number, maxLevel: number): ImagenMusePromptTemplate[] {
  return imagenMusePromptLibrary.filter(p => p.intimacyLevel >= minLevel && p.intimacyLevel <= maxLevel);
}

// Helper function to get prompts by location category
export function getMusePromptsByLocationCategory(category: string): ImagenMusePromptTemplate[] {
  return imagenMusePromptLibrary.filter(p => p.subcategory === category);
}

// Export collection metadata
export const MUSE_COLLECTION_INFO = {
  totalPrompts: imagenMusePromptLibrary.length,
  categories: [
    { id: 'urban_nights', name: 'Urban Nights', icon: '🌃', color: 'purple', intimacyRange: [3, 7] },
    { id: 'intimate_spaces', name: 'Intimate Spaces', icon: '🏡', color: 'pink', intimacyRange: [5, 9] },
    { id: 'artistic_expression', name: 'Artistic Expression', icon: '🎨', color: 'amber', intimacyRange: [7, 10] },
    { id: 'natural_elements', name: 'Natural Elements', icon: '🌿', color: 'green', intimacyRange: [6, 10] },
    { id: 'architectural', name: 'Architectural', icon: '🏛️', color: 'blue', intimacyRange: [4, 8] },
    { id: 'nightlife', name: 'Nightlife', icon: '🎭', color: 'purple', intimacyRange: [5, 9] }
  ],
  model: {
    name: 'Indian Hourglass Instagram Muse',
    measurements: '36-26-38',
    height: "5'7\"",
    age: '23-26',
    ethnicity: 'Indian',
    signature: 'Mirror selfie glamour with hourglass silhouette'
  }
};