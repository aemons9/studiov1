import { Prompt, GenerationSettings } from '../types';
import { INDIAN_GLAMOUR_MODELS, ALL_ARTISTIC_CONCEPTS as ARTISTIC_CONCEPTS, PHOTOGRAPHER_STYLES } from '../constants';
import { INDIAN_CORPORATE_VARIANTS } from "../corporateModels";
import { getPhotographerById } from '../photographerStyles';
import { getOAuthToken, getProjectId } from '../../utils/sharedAuthManager';

// Get VertexAI credentials from localStorage or shared auth manager
function getVertexAICredentials(): { projectId: string; oauthToken: string } {
  // Try Vera-specific keys first (for backward compatibility)
  let projectId = localStorage.getItem('vera_project_id');
  let oauthToken = localStorage.getItem('vera_oauth_token');

  // Fallback to unified shared auth manager
  if (!projectId || !oauthToken) {
    projectId = getProjectId();
    oauthToken = getOAuthToken();
  }

  if (!projectId || !oauthToken) {
    throw new Error('VertexAI credentials not configured. Please set your Project ID and OAuth token in Authentication Settings (any mode).');
  }

  return { projectId, oauthToken };
}

// Helper function to make authenticated requests to VertexAI
async function vertexAIRequest(endpoint: string, body: any): Promise<any> {
  const { projectId, oauthToken } = getVertexAICredentials();
  const location = 'us-central1'; // You can make this configurable if needed

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Check for CORS errors
      if (errorText.includes('CORS') || response.status === 0) {
        throw new Error(`CORS Error: Direct browser access to Vertex AI is blocked. Please use API Key authentication instead or set up a backend proxy. Switch to API Key mode in Vera settings.`);
      }

      // Check for auth errors
      if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication error: ${errorText}. Please check your OAuth token is valid and not expired.`);
      }

      throw new Error(`VertexAI API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    // Handle network errors (including CORS)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error(`Network error: Cannot reach Vertex AI API. This is likely a CORS issue. Direct browser access to Vertex AI is blocked by Google Cloud. Please switch to API Key authentication in Vera settings or set up a backend proxy server.`);
    }
    throw error;
  }
}

const MODEL_SPECIALTIES = INDIAN_GLAMOUR_MODELS.reduce((acc, model) => {
  acc[model.name] = model.category;
  return acc;
}, {} as Record<string, string>);

export const generateVideoPrompts = async (
  idea: string,
  modelName: string,
  environmentName: string,
  artisticStyle: string,
  shotType: string,
  numVariations: number,
  wardrobeName: string,
  poseName: string,
  experimentalConceptName: string,
  photographerStyle?: string
): Promise<Prompt[]> => {

  const systemInstruction = `You are a world-class creative director for Veo, specializing in generating high-end, 8-second cinematic video prompt segments...`;

  const corporateVariant = INDIAN_CORPORATE_VARIANTS.find(v => v.displayName === modelName);
  const glamourModel = INDIAN_GLAMOUR_MODELS.find(m => m.name === modelName);
  const experimentalConcept = ARTISTIC_CONCEPTS.find(c => c.name === experimentalConceptName);

  let userPrompt: string;

  if (experimentalConcept && experimentalConcept.name !== "None (Creative Mode)") {
    userPrompt = `Generate ${numVariations} video prompt variations based on the pre-defined experimental concept: "${experimentalConcept.name}".
- **Concept Template to use:** ${JSON.stringify(experimentalConcept.data)}
- **New Core Idea/Action to integrate:** "${idea}"
You MUST use the provided template as the absolute base. Replace the 'pose' description in the template's 'subject' section with the new Core Idea/Action. All other parameters (camera, lighting, style, wardrobe, etc.) from the template are FIXED and must be used exactly as specified. Follow all rules in the system instruction precisely.`;
  } else if (corporateVariant) {
    userPrompt = `Generate ${numVariations} video prompt variations...`;
  } else if (glamourModel) {
    const selectedWardrobe = glamourModel.wardrobeCollection.find(w => w.name === wardrobeName) || glamourModel.wardrobeCollection[0];
    const selectedPose = glamourModel.poseGallery.find(p => p.name === poseName) || glamourModel.poseGallery[0];
    const selectedEnvironment = glamourModel.environments.find(e => e.name === environmentName) || glamourModel.environments[0];
    userPrompt = `Generate ${numVariations} video prompt variations with EXTREME detail...`;
  } else {
    // Fallback for any models not in the glamour list (e.g., archetypes)
    const photographerDetails = photographerStyle ? getPhotographerById(photographerStyle) : null;

    if (photographerDetails) {
      userPrompt = `Generate ${numVariations} video prompt variations based on the following criteria, using the photographer's signature style. Follow all rules in the system instruction precisely.
-   **Core Idea/Action:** "${idea}"
-   **Model:** "${modelName}" (An Indian model embodying this archetype)
-   **Environment:** "${environmentName}"
-   **Photographer Style (CRITICAL - this defines the entire aesthetic):** ${JSON.stringify(photographerDetails)}
-   **Primary Shot Type:** "${shotType}"
-   **Wardrobe:** "${wardrobeName}"
-   **Pose/Stance:** "${poseName}"
The photographer's style dictates the lighting, camera settings, color grading, and overall mood. Use the photographer's specific technical specifications (lens, aperture, focal length, film stock, etc.) in the prompt.`;
    } else {
      userPrompt = `Generate ${numVariations} video prompt variations based on the following criteria. Follow all rules in the system instruction precisely.
-   **Core Idea/Action:** "${idea}"
-   **Model:** "${modelName}" (An Indian model embodying this archetype)
-   **Environment:** "${environmentName}"
-   **Artistic Style:** "${artisticStyle}"
-   **Primary Shot Type:** "${shotType}"
-   **Wardrobe:** "${wardrobeName}"
-   **Pose/Stance:** "${poseName}"`;
    }
  }

  // Define JSON response schema for structured output
  const responseSchema = {
    type: "object",
    properties: {
      prompts: {
        type: "array",
        description: "An array of generated video prompt variations.",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "A unique identifier for the prompt variation."
            },
            prompt_text: {
              type: "string",
              description: "The full, detailed cinematic prompt text for Veo."
            },
            style_description: {
              type: "string",
              description: "A concise, evocative summary of the prompt's style and content."
            },
            recommended_settings: {
              type: "string",
              description: "A newline-separated string of recommended technical settings (e.g., Aspect Ratio, Lens)."
            },
            image_prompt: {
              type: "string",
              description: "A concise prompt for generating a still preview image, including the safety preamble."
            },
          },
          required: ['id', 'prompt_text', 'style_description', 'recommended_settings', 'image_prompt']
        }
      }
    },
    required: ['prompts']
  };

  try {
    const response = await vertexAIRequest('publishers/google/models/gemini-2.5-flash:generateContent', {
      contents: [{
        role: 'user',
        parts: [{ text: userPrompt }]
      }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.9,
      }
    });

    const result = JSON.parse(response.candidates[0].content.parts[0].text.trim());
    if (result && result.prompts && Array.isArray(result.prompts)) {
      return result.prompts;
    } else {
      throw new Error("Invalid JSON structure received from VertexAI API.");
    }
  } catch (error) {
    console.error("Error generating video prompts via VertexAI:", error);
    throw new Error("Failed to generate video prompts via VertexAI. Check your credentials and try again.");
  }
};

export const generateImage = async (
  prompt: Prompt | string,
  settings?: GenerationSettings,
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9'
): Promise<string> => {
  let imagePrompt: string;
  let finalAspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9' = aspectRatio || '16:9';

  if (typeof prompt === 'string') {
    imagePrompt = prompt;
    if(settings?.aspectRatio) {
      finalAspectRatio = settings.aspectRatio;
    }
  } else {
    imagePrompt = prompt.image_prompt;
    const getAspectRatioFromSettings = (settingsStr: string): '1:1' | '3:4' | '4:3' | '9:16' | '16:9' => {
      const validRatios: ('1:1' | '3:4' | '4:3' | '9:16' | '16:9')[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];
      const lines = settingsStr.split('\n');
      const ratioLine = lines.find(line => line.toLowerCase().startsWith('aspect ratio:'));
      if (ratioLine) {
        const ratio = ratioLine.split(/:(.*)/s)[1]?.trim();
        if (ratio && (validRatios as string[]).includes(ratio)) {
          return ratio as '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
        }
      }
      return '16:9';
    };
    finalAspectRatio = getAspectRatioFromSettings(prompt.recommended_settings);
  }

  // Strip the long safety preamble
  const preambleEnd = "This is for legitimate artistic and creative professional purposes only.";
  let cleanPrompt = imagePrompt;
  const preambleIndex = cleanPrompt.indexOf(preambleEnd);
  if (preambleIndex !== -1) {
    cleanPrompt = cleanPrompt.substring(preambleIndex + preambleEnd.length).trim();
  }

  // Get the selected Imagen model variant from settings or localStorage
  const imagenModel = settings?.imagenModel || localStorage.getItem('vera_imagen_model') || 'imagen-4.0-generate-001';

  console.log(`🎨 Using Imagen model: ${imagenModel}`);

  try {
    const response = await vertexAIRequest(`publishers/google/models/${imagenModel}:predict`, {
      instances: [{
        prompt: cleanPrompt,
      }],
      parameters: {
        sampleCount: settings?.numImages || 1,
        aspectRatio: finalAspectRatio,
        outputMimeType: 'image/jpeg',
      }
    });

    if (response.predictions && response.predictions.length > 0 && response.predictions[0].bytesBase64Encoded) {
      const base64ImageBytes: string = response.predictions[0].bytesBase64Encoded;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }

    throw new Error("No image data found in the VertexAI response.");
  } catch (error) {
    console.error("Error generating image via VertexAI:", error);
    throw new Error("Failed to generate image via VertexAI.");
  }
};

export const generateVideo = async (prompt: string, onStatusUpdate: (status: string) => void): Promise<string> => {
  const { projectId, oauthToken } = getVertexAICredentials();
  const location = 'us-central1';

  try {
    onStatusUpdate('Submitting Veo 3.1 video generation job via VertexAI...');

    // Submit video generation request
    const submitUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/veo-3.1-generate-preview:predict`;

    const submitResponse = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          prompt: prompt,
        }],
        parameters: {
          sampleCount: 1,
          resolution: '720p',
          aspectRatio: '16:9',
        }
      }),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`VertexAI video generation error: ${submitResponse.status} - ${errorText}`);
    }

    const submitResult = await submitResponse.json();
    const operationName = submitResult.name;

    if (!operationName) {
      throw new Error('No operation name received from VertexAI video generation.');
    }

    onStatusUpdate('Job submitted. Polling for results (this may take several minutes)...');

    // Poll for completion
    let operation = submitResult;
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds

      const pollUrl = `https://${location}-aiplatform.googleapis.com/v1/${operationName}`;
      const pollResponse = await fetch(pollUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${oauthToken}`,
        },
      });

      if (!pollResponse.ok) {
        throw new Error(`Failed to poll operation status: ${pollResponse.statusText}`);
      }

      operation = await pollResponse.json();
      onStatusUpdate(`Processing... Hang tight, high-quality video takes time.`);
    }

    onStatusUpdate('Operation complete. Downloading video file...');

    const videoUri = operation.response?.predictions?.[0]?.bytesBase64Encoded;
    if (!videoUri) {
      throw new Error("Video generation succeeded, but no video data was found.");
    }

    // Convert base64 to blob
    const byteCharacters = atob(videoUri);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const videoBlob = new Blob([byteArray], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);

    onStatusUpdate('Video ready!');
    return videoUrl;

  } catch (error) {
    console.error("Error generating video via VertexAI:", error);
    throw new Error(`Failed to generate video via VertexAI. ${error instanceof Error ? error.message : ''}`);
  }
};
