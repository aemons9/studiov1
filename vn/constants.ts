/**
 * Visual Novel Mode - Constants and Presets
 */

import type { VNCharacter, VNExpression, VNPose, VNOutfit, VNBackground } from './types';

export const VN_EXPRESSIONS: VNExpression[] = [
  { id: 'neutral', name: 'Neutral', description: 'Calm, neutral expression', promptModifier: 'with a calm, neutral facial expression' },
  { id: 'happy', name: 'Happy', description: 'Bright, cheerful smile', promptModifier: 'with a bright, cheerful smile' },
  { id: 'sad', name: 'Sad', description: 'Melancholic, sad expression', promptModifier: 'with a melancholic, sad expression' },
  { id: 'surprised', name: 'Surprised', description: 'Wide-eyed surprise', promptModifier: 'with wide-eyed surprise' },
  { id: 'angry', name: 'Angry', description: 'Intense, angry expression', promptModifier: 'with an intense, angry expression' },
  { id: 'shy', name: 'Shy', description: 'Blushing, shy demeanor', promptModifier: 'with a blushing, shy demeanor' },
];

export const VN_POSES: VNPose[] = [
  { id: 'standing_front', name: 'Standing Front', description: 'Standing facing forward', promptModifier: 'standing upright, facing forward' },
  { id: 'standing_side', name: 'Standing Side', description: 'Standing in profile', promptModifier: 'standing in profile view' },
  { id: 'sitting', name: 'Sitting', description: 'Sitting casually', promptModifier: 'sitting casually' },
  { id: 'arms_crossed', name: 'Arms Crossed', description: 'Arms crossed confidently', promptModifier: 'with arms crossed confidently' },
  { id: 'hand_on_hip', name: 'Hand on Hip', description: 'One hand on hip', promptModifier: 'with one hand resting on hip' },
];

export const VN_OUTFITS: VNOutfit[] = [
  { id: 'school_uniform', name: 'School Uniform', description: 'Traditional school uniform', promptModifier: 'wearing a traditional school uniform' },
  { id: 'casual', name: 'Casual', description: 'Casual everyday clothes', promptModifier: 'wearing casual everyday clothes' },
  { id: 'formal', name: 'Formal', description: 'Formal business attire', promptModifier: 'wearing formal business attire' },
  { id: 'traditional', name: 'Traditional', description: 'Traditional Indian attire', promptModifier: 'wearing elegant traditional Indian attire' },
];

export const VN_BACKGROUNDS: VNBackground[] = [
  {
    id: 'classroom',
    name: 'Classroom',
    description: 'Modern school classroom',
    prompt: 'modern school classroom background with desks, chalkboard, and windows showing daylight'
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Quiet library setting',
    prompt: 'quiet library background with wooden bookshelves and reading tables'
  },
  {
    id: 'cafe',
    name: 'Cafe',
    description: 'Cozy cafe interior',
    prompt: 'cozy cafe interior background with tables and warm lighting'
  },
  {
    id: 'park',
    name: 'Park',
    description: 'Outdoor park setting',
    prompt: 'outdoor park background with trees, benches, and natural scenery'
  },
];

export const DEFAULT_VN_CHARACTER: VNCharacter = {
  id: 'default_character',
  name: 'Visual Novel Character',
  description: 'A character for visual novel style artwork',
  baseModel: 'An anime-style character with expressive features',
  expressions: VN_EXPRESSIONS,
  poses: VN_POSES,
  outfits: VN_OUTFITS,
};
