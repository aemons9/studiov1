/**
 * VIDEO GENERATION SERVICE - Main Mode
 * Vertex AI Veo video generation for main mode prompts
 */

import { getOAuthToken, getProjectId, checkTokenExpiration } from '../utils/sharedAuthManager';

/**
 * Generate a video using Vertex AI Veo
 */
export async function generateVideo(
  prompt: string,
  onStatusUpdate: (status: string) => void,
  projectId?: string,
  accessToken?: string
): Promise<string> {
  // Check authentication method
  const vertexAuthMethod = localStorage.getItem('vertex_auth_method') || 'oauth';

  let authProjectId: string;
  let authToken: string;

  if (vertexAuthMethod === 'apikey') {
    // Use API Key method with Generative Language API
    // Try environment variable first, then localStorage
    const envKey = (import.meta as any).env?.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : null);
    const apiKey = envKey || localStorage.getItem('vertex_api_key');
    if (!apiKey) {
      throw new Error('API Key not configured. Please set GEMINI_API_KEY environment variable or configure in settings.');
    }

    return await generateVideoWithApiKey(prompt, apiKey, onStatusUpdate);
  } else {
    // Use OAuth method with Vertex AI (via sharedAuthManager for unified token storage)
    authProjectId = projectId || getProjectId() || '';
    authToken = accessToken || getOAuthToken() || '';

    if (!authProjectId || !authToken) {
      throw new Error('Project ID and Access Token are required for video generation. Please configure authentication.');
    }

    // Validate token is not expired
    const { isExpired, isExpiringSoon } = checkTokenExpiration();
    if (isExpired) {
      throw new Error('OAuth token has expired. Please reload the page to refresh your credentials.');
    }
    if (isExpiringSoon) {
      console.warn('⚠️ OAuth token will expire soon. Consider refreshing the page.');
    }

    return await generateVideoWithOAuth(prompt, authProjectId, authToken, onStatusUpdate);
  }
}

/**
 * Generate video using API Key (Generative Language API - Veo 3.0)
 */
async function generateVideoWithApiKey(
  prompt: string,
  apiKey: string,
  onStatusUpdate: (status: string) => void
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-001:generateContent?key=${apiKey}`;

  onStatusUpdate('🎬 Submitting video generation request...');

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Video generation failed: ${response.statusText}. ${errorText}`);
  }

  const result = await response.json();

  // Extract video URL from response
  if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.videoFile) {
    const videoFile = result.candidates[0].content.parts[0].videoFile;
    onStatusUpdate('✅ Video generated successfully!');

    // Convert to blob URL
    const videoUrl = videoFile.uri || videoFile.url;
    return videoUrl;
  }

  throw new Error('No video URL in response');
}

/**
 * Generate video using OAuth (Vertex AI - Veo 3.1 preview)
 */
async function generateVideoWithOAuth(
  prompt: string,
  projectId: string,
  accessToken: string,
  onStatusUpdate: (status: string) => void
): Promise<string> {
  const location = 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/veo-3.1-generate-preview:generateVideo`;

  onStatusUpdate('🎬 Submitting video generation request to Veo 3.1...');

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        parameters: {
          duration: '5s',
          aspectRatio: '9:16',
          quality: 'standard'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Check for auth errors
      if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication error: ${errorText}. Your OAuth token may be expired. Please refresh it.`);
      }

      // Check for CORS errors
      if (errorText.includes('CORS') || response.status === 0) {
        throw new Error(`CORS Error: Direct browser access to Vertex AI Veo is blocked. Please use API Key authentication or set up a backend proxy.`);
      }

      throw new Error(`Video generation failed: ${response.statusText}. ${errorText}`);
    }

    const operationData = await response.json();
    const operationName = operationData.name;

    if (!operationName) {
      throw new Error('No operation name returned from video generation request');
    }

    onStatusUpdate('⏳ Video generation in progress...');

    // Poll for completion
    const videoUrl = await pollVideoOperation(operationName, accessToken, onStatusUpdate);

    onStatusUpdate('✅ Video generated successfully!');
    return videoUrl;
  } catch (error) {
    // Handle network errors (including CORS)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error(`Network error: Cannot reach Vertex AI. This is likely a CORS issue. Direct browser access to Vertex AI is blocked. Please use API Key authentication or set up a backend proxy.`);
    }
    throw error;
  }
}

/**
 * Poll the operation status until video is ready
 */
async function pollVideoOperation(
  operationName: string,
  accessToken: string,
  onStatusUpdate: (status: string) => void
): Promise<string> {
  const pollUrl = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;
  const maxAttempts = 60; // 5 minutes max (5 second intervals)
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts++;

    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

    const response = await fetch(pollUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to poll operation: ${response.statusText}`);
    }

    const operation = await response.json();

    if (operation.done) {
      if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
      }

      // Extract video URL
      if (operation.response?.video?.uri) {
        const videoUri = operation.response.video.uri;

        // Fetch the video and convert to blob URL
        const videoBlob = await fetchVideoAsBlob(videoUri, accessToken);
        const blobUrl = URL.createObjectURL(videoBlob);
        return blobUrl;
      }

      throw new Error('No video URL in completed operation');
    }

    // Update status
    const progress = Math.min(95, Math.floor((attempts / maxAttempts) * 100));
    onStatusUpdate(`⏳ Generating video... ${progress}%`);
  }

  throw new Error('Video generation timed out');
}

/**
 * Fetch video from Google Cloud Storage and convert to Blob
 */
async function fetchVideoAsBlob(uri: string, accessToken: string): Promise<Blob> {
  // Validate token is not expired before downloading
  const { isExpired } = checkTokenExpiration();
  if (isExpired) {
    throw new Error('OAuth token expired. Cannot download video blob. Please reload the page.');
  }

  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch video: ${response.statusText}`);
  }

  return await response.blob();
}
