import { Prompt, GenerationSettings } from '../types';
import * as GenAIService from './geminiService';
import * as VertexAIService from './vertexAiService';

type AuthMethod = 'apikey' | 'vertexai';

function getAuthMethod(): AuthMethod {
  const storedMethod = localStorage.getItem('vera_auth_method');
  return (storedMethod as AuthMethod) || 'apikey';
}

export const generateVideoPrompts = async (
  idea: string,
  modelName: string,
  environmentName: string,
  artisticStyle: string,
  shotType: string,
  numVariations: number,
  wardrobeName: string,
  poseName: string,
  experimentalConceptName: string
): Promise<Prompt[]> => {
  const authMethod = getAuthMethod();

  if (authMethod === 'vertexai') {
    return VertexAIService.generateVideoPrompts(
      idea,
      modelName,
      environmentName,
      artisticStyle,
      shotType,
      numVariations,
      wardrobeName,
      poseName,
      experimentalConceptName
    );
  } else {
    return GenAIService.generateVideoPrompts(
      idea,
      modelName,
      environmentName,
      artisticStyle,
      shotType,
      numVariations,
      wardrobeName,
      poseName,
      experimentalConceptName
    );
  }
};

export const generateImage = async (
  prompt: Prompt | string,
  settings?: GenerationSettings,
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9'
): Promise<string> => {
  const authMethod = getAuthMethod();

  if (authMethod === 'vertexai') {
    return VertexAIService.generateImage(prompt, settings, aspectRatio);
  } else {
    return GenAIService.generateImage(prompt, settings, aspectRatio);
  }
};

export const generateVideo = async (
  prompt: string,
  onStatusUpdate: (status: string) => void
): Promise<string> => {
  const authMethod = getAuthMethod();

  if (authMethod === 'vertexai') {
    return VertexAIService.generateVideo(prompt, onStatusUpdate);
  } else {
    return GenAIService.generateVideo(prompt, onStatusUpdate);
  }
};
