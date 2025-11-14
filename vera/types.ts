// FIX: Removed incorrect import of 'IndianCorporateVariant' to resolve a circular dependency. The type is defined below.
export interface Prompt {
  id: number;
  prompt_text: string;
  style_description: string;
  recommended_settings: string;
  image_prompt: string;
}

export interface GenerationSettings {
  numImages: number;
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
}

export interface LegacyModel {
  id: string;
  name: string;
  description: string;
}

export interface IndianModelArchetype {
  id: string;
  name: string;
  description: string;
  physicalTraits: {
    height: string;
    figure: string;
    skinTone: string;
    facialFeatures: string;
  };
  styleContext: string;
  culturalElements: string[];
}

export interface WardrobeOption {
  id:string;
  name: string;
  category: 'lingerie-outerwear' | 'architectural-minimal' | 'strappy-geometric' | 'sheer-layers' | 'cutout-designs' | 'minimalist-boudoir' | 'office-power';
  coverageLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  artisticLanguage: string;
  suitableForIntimacy: number[];
  masterStyleFit: string[];
}

export interface CorporatePowerTemplate {
  styleDeclaration: string;
  intimacyLevel: number;
  powerDynamic: 'submissive' | 'balanced' | 'dominant';
  modelHeight: string;
  modelSpecialties: string[];
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  physicalDescription: string;
  complexion: string;
  facialFeatures: string;
  presence: string;
  pose: string;
  hairColor: string;
  hairStyle: string;
  skinFinish: string;
  handNailDetails: string;
  nailArt: string;
  highHeels: string;
  wardrobe: string;
  environment: string;
  lighting: string;
  camera: {
    focalLength: string;
    aperture: string;
    distance: string;
    angle: string;
    framing: string;
  };
  colorGrade: string;
  styleDescription: string;
  sensualityStyle: string;
  powerLevel: number;
  creativeContext: string;
  quality: string;
  figureAndForm: string;
  skinMicroDetails: string;
  fabricPhysics: string;
  materialProperties: string[];
}

export interface IndianCorporateVariant {
  id: string;
  name: string;
  displayName: string;
  description: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  height: string;
  intimacyRange: [number, number];
  powerLevelRange: [number, number];
  specialties: string;
  template: CorporatePowerTemplate;
}

// === NEW TYPES FOR EROTIC GLAMOUR & EXPERIMENTAL CONCEPTS ===

export interface Photographer {
  name: string;
  specialty: string;
  style: string;
  intimacy: number;
  lightingSignature: string;
  cameraPreference: string;
  compositionStyle: string;
  intimacyApproach: string;
  fluxSettings: Record<string, any>;
  imagenSettings: Record<string, any>;
}

export interface ModelWardrobe {
  id: string;
  name: string;
  description: string;
  coverage: string;
  intimacyLevel: number;
  style: string;
  materials: string;
  fluxOptimized: boolean;
  imagenOptimized: boolean;
  fabricDetails?: string;
}

export interface ModelPose {
  id: string;
  name: string;
  description: string;
  poseName?: string;
  aspectRatio?: string;
  framing?: string;
}

export interface ModelEnvironment {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  privacyLevel: number;
  luxuryLevel: number;
  lightingProfile: string;
  materialPalette: string[];
}

export interface GlamourModel {
  id: string;
  name: string;
  category: string;
  emphasis: string;
  personalPhotographer: Photographer;
  physicalTraits: {
    height: string;
    figure: string;
    bust: string;
    waist: string;
    hips: string;
    emphasis: string;
    skinTone: string;
    features: string;
    fitness: string;
    specialties: string;
  };
  wardrobeCollection: ModelWardrobe[];
  poseGallery: ModelPose[];
  environments: ModelEnvironment[];
}


export interface ArtisticConceptData {
  shot: string;
  subject: {
    variant: string;
    pose: string;
    hair_color: string;
    hair_style: string;
    skin_finish: string;
    hand_and_nail_details: string;
    tattoos: string;
    piercings: string;
    body_art: string;
    nail_art: string;
    high_heels: string;
  };
  wardrobe: string;
  environment: string;
  lighting: string;
  camera: {
    focal_length: string;
    aperture: string;
    distance: string;
    angle: string;
    framing: string;
  };
  color_grade: string;
  style: string;
  quality: string;
  figure_and_form: string;
  skin_micro_details: string;
  fabric_physics: string;
  material_properties: string;
}

export type PromptData = ArtisticConceptData;

export interface ArtisticConcept {
  name: string;
  data: ArtisticConceptData;
}