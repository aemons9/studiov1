/**
 * Centralized API Key Management
 * Fetches API key from server config endpoint (Vercel) or environment (local)
 */

let cachedApiKey: string | null = null;
let fetchPromise: Promise<string> | null = null;

async function fetchFromServer(): Promise<string | null> {
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const data = await response.json();
      return data.geminiApiKey || null;
    }
  } catch (error) {
    console.warn('⚠️ Could not fetch API key from server:', error);
  }
  return null;
}

export async function getGeminiApiKey(): Promise<string> {
  // Return cached if available
  if (cachedApiKey) {
    return cachedApiKey;
  }

  // If already fetching, wait for that promise
  if (fetchPromise) {
    return fetchPromise;
  }

  // Start fetching
  fetchPromise = (async () => {
    // Try server endpoint first (production/Vercel)
    const serverKey = await fetchFromServer();
    if (serverKey) {
      cachedApiKey = serverKey;
      console.log('✅ Using server-provided API key');
      return serverKey;
    }

    // Try environment variables (local development)
    const envKey = (import.meta as any).env?.GEMINI_API_KEY ||
                   (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : null);
    if (envKey) {
      cachedApiKey = envKey;
      console.log('✅ Using environment API key');
      return envKey;
    }

    // Try localStorage as last resort
    const stored = localStorage.getItem('vera_api_key') ||
                   localStorage.getItem('vertex_api_key');
    if (stored) {
      cachedApiKey = stored;
      console.log('✅ Using localStorage API key');
      return stored;
    }

    throw new Error('API Key not configured. Please set GEMINI_API_KEY in Vercel environment variables or in app settings.');
  })();

  return fetchPromise;
}

// Pre-fetch on module load
getGeminiApiKey().catch(() => {
  // Silently fail, will retry when actually needed
});
