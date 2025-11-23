/**
 * Visual Novel Mode - Type Definitions
 * Comprehensive types for VN asset generation
 */

export interface VNCharacter {
  id: string;
  name: string;
  description: string;
  baseModel: string;
  expressions: VNExpression[];
  poses: VNPose[];
  outfits: VNOutfit[];
}

export interface VNExpression {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

export interface VNPose {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

export interface VNOutfit {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

export interface VNBackground {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface VNAssetRequest {
  character: VNCharacter;
  expression: VNExpression;
  pose: VNPose;
  outfit: VNOutfit;
  background?: VNBackground;
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
}

export interface VNGeneratedAsset {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  character: string;
  expression: string;
  pose: string;
}
