/**
 * MASTERCLASS MODE - MODEL TAXONOMY
 *
 * A comprehensive taxonomy of Indian models spanning every creative industry
 * Each archetype represents a pinnacle of aesthetic and professional excellence
 *
 * Design Philosophy: Transcendent realism meeting artistic vision
 */

export interface MasterClassModel {
  id: string;
  archetype: string;
  category: ModelCategory;
  subcategory: string;

  // Physical Manifestation
  physicalProfile: {
    height: string;
    measurements: {
      bust: string;
      waist: string;
      hips: string;
      shoulderWidth?: string;
      inseam?: string;
    };
    bodyArchitecture: string; // The sculptural form
    skinLuminosity: string; // Beyond just tone - the quality of light reflection
    hairArchitecture: string; // Structure and flow dynamics
    facialGeometry: string; // The mathematical beauty of proportions
    eyeNarrative: string; // What story the eyes tell
    distinguishingAesthetics: string; // Unique visual signatures
    ageRange: string;
    movementSignature: string; // How they occupy space
  };

  // Professional Calibration
  professionalMatrix: {
    experienceLevel: 'Emerging' | 'Established' | 'Iconic' | 'Legendary';
    specializations: string[];
    brandAssociations?: string[];
    signatureStyles: string[];
    industryReputation: string;
    artisticRange: string; // Versatility spectrum
  };

  // Aesthetic Dimensions
  aestheticProfile: {
    colorPalette: string[]; // Colors that resonate with their essence
    textureAffinity: string[]; // Materials that complement their form
    lightingPreference: string[]; // How light loves them
    environmentalHarmony: string[]; // Spaces where they transcend
    temporalMood: string; // Time of day when they're most powerful
    seasonalResonance: string[]; // Seasons that amplify their presence
  };

  // Creative Dynamics
  creativeCapabilities: {
    emotionalSpectrum: string[]; // Range of emotions they embody
    narrativeStrength: string; // Storytelling capability
    cinematicPresence: string; // Screen magnetism
    editorialVersatility: string; // Magazine/campaign adaptability
    artisticCollaboration: string; // How they elevate creative teams
    culturalFluency: string; // Understanding of cultural narratives
  };

  // Wardrobe Architecture
  wardrobePhilosophy: {
    signature: WardrobeSignature[];
    haute: HauteCoutureProfile[];
    street: StreetStyleEvolution[];
    traditional: TraditionalElegance[];
    experimental: ExperimentalFashion[];
    minimalist: MinimalistAesthetics[];
  };

  // Environmental Stages
  environmentalStages: EnvironmentalStage[];

  // Photographic Synergy
  photographicSynergy: {
    optimalLenses: string[];
    signatureAngles: string[];
    lightingMastery: LightingScheme[];
    colorGradingPhilosophy: string;
    compositionalHarmony: string[];
  };
}

export enum ModelCategory {
  GLAMOUR = 'Glamour Industry',
  ARTSCHOOL = 'Art School Aesthetic',
  CINEMA = 'Cinematic Universe',
  SUPERMODEL = 'International Supermodel',
  INFLUENCER = 'Digital Native Influencer',
  DESIGNER = 'Designer Muse',
  EDITORIAL = 'Editorial Virtuoso',
  CULTURAL = 'Cultural Icon',
  AVANT_GARDE = 'Avant-Garde Visionary',
  CLASSICAL = 'Classical Beauty'
}

export interface WardrobeSignature {
  name: string;
  philosophy: string;
  keyPieces: string[];
  colorStory: string;
  texturePlay: string;
  silhouette: string;
  culturalReference?: string;
  designerInspiration?: string;
}

export interface HauteCoutureProfile {
  designer: string;
  collection: string;
  pieces: string[];
  narrative: string;
  craftmanship: string;
  wearingPhilosophy: string;
}

export interface StreetStyleEvolution {
  trend: string;
  interpretation: string;
  keyElements: string[];
  culturalContext: string;
  personalTwist: string;
}

export interface TraditionalElegance {
  garment: string;
  region: string;
  occasion: string;
  modernInterpretation: string;
  craftsmanshipDetails: string;
  culturalSignificance: string;
}

export interface ExperimentalFashion {
  concept: string;
  materials: string[];
  construction: string;
  movement: string;
  visualImpact: string;
  artisticReference: string;
}

export interface MinimalistAesthetics {
  principle: string;
  colorScheme: string[];
  fabricChoice: string;
  silhouettePhilosophy: string;
  negativeSpace: string;
  essentialElements: string[];
}

export interface EnvironmentalStage {
  name: string;
  category: 'Urban' | 'Natural' | 'Architectural' | 'Cultural' | 'Abstract' | 'Cinematic';
  atmosphere: string;
  lightQuality: string;
  colorTemperature: string;
  textureNarrative: string;
  spatialDynamics: string;
  emotionalResonance: string;
  timeOfDay?: string;
  seasonalContext?: string;
  culturalSignificance?: string;
  architecturalElements?: string[];
  naturalElements?: string[];
  props?: string[];
}

export interface LightingScheme {
  name: string;
  philosophy: string;
  keyLight: string;
  fillRatio: string;
  rimLight?: string;
  practicalLights?: string[];
  colorTemperature: string;
  shadows: string;
  highlights: string;
  mood: string;
  timeEmulation?: string;
  cinematicReference?: string;
}

// Photographer Archetypes for synergy
export interface PhotographerArchetype {
  style: string;
  vision: string;
  technicalSignature: string;
  emotionalApproach: string;
  culturalLens: string;
  artisticLineage: string;
  contemporaryRelevance: string;
}