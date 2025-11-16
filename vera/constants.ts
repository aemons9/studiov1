import { INDIAN_CORPORATE_VARIANTS } from './corporateModels';
import { EROTIC_GLAMOUR_MODELS as ORIGINAL_GLAMOUR_MODELS } from './eroticGlamourModels';
import { ARTISTIC_INTIMACY_MODELS } from './artisticIntimacyModels';
import { PLATINUM_MODELS } from './platinumModels';
import { ARTISTIC_CONCEPTS as ORIGINAL_CONCEPTS, NEW_ARTISTIC_CONCEPTS, ROLE_PLAY_CONCEPTS, SEDUCTRESS_MAX_CONCEPTS, SUPER_SEDUCTRESS_ARTIST_CONCEPTS } from './experimentalConcepts';
import { ENVIRONMENTS_CATALOG } from './environments';
import { WARDROBE_CATALOG } from './wardrobeCollection';
import { seductressMaxCollection } from './seductressMaxCollection';
import { corporateSeductionCollection } from './corporateSeduction';
import { PHOTOGRAPHER_STYLES } from './photographerStyles';
import { ALL_ENVIRONMENTS, ENVIRONMENT_CATEGORIES } from './environmentsExpanded';

// Combine models into the main export used by the app
export const INDIAN_GLAMOUR_MODELS = [...ORIGINAL_GLAMOUR_MODELS, ...ARTISTIC_INTIMACY_MODELS, ...PLATINUM_MODELS];

// New grouped structure for model selection dropdown
export const MODEL_ARCHETYPE_GROUPS = [
  {
    label: 'The Divas (Glamour Specialists)',
    description: 'Elite specialists embodying diverse archetypes of Indian beauty and sensuality, each with a unique backstory and style.',
    options: ORIGINAL_GLAMOUR_MODELS.map(model => ({ name: model.name, description: model.category })),
  },
  {
    label: 'The Vanguards (Dominance & Intimacy)',
    description: 'A new collection of models exploring the duality of sensual dominance and artistic intimacy.',
    options: ARTISTIC_INTIMACY_MODELS.map(model => ({ name: model.name, description: model.category })),
  },
  {
    label: 'The Executives (Corporate Power)',
    description: 'Commanding figures of the corporate world, embodying power, authority, and sophisticated sensuality in an executive setting.',
    options: INDIAN_CORPORATE_VARIANTS.map(variant => ({ name: variant.displayName, description: variant.description })),
  },
  {
    label: 'Platinum Collection (Evening Seduction)',
    description: '10 premium evening and midnight seduction specialists with unique environments and signature styles.',
    options: PLATINUM_MODELS.map(model => ({ name: model.name, description: model.category })),
  },
];

// Rebuild MODELS from the new source of truth for backward compatibility
const allModelOptions = MODEL_ARCHETYPE_GROUPS.flatMap(group => group.options);
export const MODELS = allModelOptions.map(opt => opt.name);

export const ENVIRONMENTS = ENVIRONMENTS_CATALOG.map(e => e.name);

export const ARTISTIC_STYLES = [
  { label: "Cinematic & Film", options: ["Cinematic Noir", "Vintage Film Grain", "Gritty Realism", "High-Fashion Editorial"] },
  { label: "Mood & Atmosphere", options: ["Romantic Glow", "Midnight Drama", "Ethereal Dreamscape", "Minimalist Serenity"] },
  { label: "Visual Style", options: ["Urban Contrast", "Luxury Opulence", "Cyberpunk Futurism", "Baroque Opulence", "Photorealistic"] },
  { label: "General Aesthetic", options: ["Natural Vitality"] }
];

export const SHOT_TYPES = ["Medium Shot", "Close-Up", "Wide Shot", "Full Body Shot", "Dynamic Tracking Shot", "Slow Zoom-In"];

// Default options for non-glamour models
export const DEFAULT_WARDROBE_OPTIONS = WARDROBE_CATALOG.map(item => item.name);
export const DEFAULT_POSE_OPTIONS = ["Confident Power Stance", "Seductive Recline", "Dynamic Action Pose", "Elegant Contemplation", "Playful Interaction", "Serene Stillness", "Sensual Movement", "Authoritative Presence", "Graceful Flexibility", "Intimate Gaze"];

// Combine all artistic concepts into a single source of truth
export const ALL_ARTISTIC_CONCEPTS = [...ORIGINAL_CONCEPTS, ...NEW_ARTISTIC_CONCEPTS, ...ROLE_PLAY_CONCEPTS, ...SEDUCTRESS_MAX_CONCEPTS, ...SUPER_SEDUCTRESS_ARTIST_CONCEPTS, ...seductressMaxCollection, ...corporateSeductionCollection];


// Experimental Concepts list for the dropdown
export const EXPERIMENTAL_CONCEPTS = ["None (Creative Mode)", ...ALL_ARTISTIC_CONCEPTS.map(c => c.name)];

// Export comprehensive collections from main mode
export { PHOTOGRAPHER_STYLES } from './photographerStyles';
export { ALL_ENVIRONMENTS, ENVIRONMENT_CATEGORIES } from './environmentsExpanded';