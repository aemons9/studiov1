/**
 * Unified OAuth Token Manager for VERALABS AI Studio
 *
 * Manages OAuth tokens and project IDs across all modes:
 * - Classic mode
 * - Vera mode
 * - Reels Studio
 * - Video generation
 *
 * Features:
 * - Auto-refresh from proxy server
 * - Token caching with expiry tracking
 * - Fallback to localStorage
 * - Unified API for all services
 */

const PROXY_BASE_URL = 'http://localhost:3001';

// Cache for OAuth token
interface TokenCache {
  token: string;
  fetchedAt: number;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;
let projectIdCache: string | null = null;

// Token expires in 1 hour, refresh 5 minutes before
const TOKEN_EXPIRY_MS = 55 * 60 * 1000; // 55 minutes

/**
 * Fetch fresh OAuth token from proxy server (gcloud CLI)
 */
async function fetchFreshToken(): Promise<string> {
  try {
    console.log('🔄 Fetching fresh OAuth token from proxy server...');

    const response = await fetch(`${PROXY_BASE_URL}/api/gcloud-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error('No token in response');
    }

    console.log('✅ Fresh OAuth token fetched successfully');

    // Update cache
    const now = Date.now();
    tokenCache = {
      token: data.token,
      fetchedAt: now,
      expiresAt: now + TOKEN_EXPIRY_MS
    };

    // Also save to localStorage as backup
    localStorage.setItem('vertex_oauth_token', data.token);
    localStorage.setItem('vertex_oauth_token_expiry', String(tokenCache.expiresAt));
    localStorage.setItem('vera_oauth_token', data.token); // For Vera mode compatibility

    return data.token;
  } catch (error) {
    console.error('❌ Failed to fetch fresh token:', error);
    throw error;
  }
}

/**
 * Fetch GCP project ID from proxy server
 */
async function fetchProjectId(): Promise<string> {
  try {
    console.log('🔄 Fetching GCP project ID from proxy server...');

    const response = await fetch(`${PROXY_BASE_URL}/api/gcloud-project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.projectId) {
      throw new Error('No project ID in response');
    }

    console.log('✅ GCP Project ID:', data.projectId);

    // Cache it
    projectIdCache = data.projectId;
    localStorage.setItem('vertex_project_id', data.projectId);
    localStorage.setItem('vera_project_id', data.projectId); // For Vera mode compatibility

    return data.projectId;
  } catch (error) {
    console.error('❌ Failed to fetch project ID:', error);
    throw error;
  }
}

/**
 * Check if cached token is still valid
 */
function isTokenValid(): boolean {
  if (!tokenCache) {
    // Try to load from localStorage
    const savedToken = localStorage.getItem('vertex_oauth_token');
    const savedExpiry = localStorage.getItem('vertex_oauth_token_expiry');

    if (savedToken && savedExpiry) {
      const expiresAt = parseInt(savedExpiry, 10);
      if (Date.now() < expiresAt) {
        tokenCache = {
          token: savedToken,
          fetchedAt: expiresAt - TOKEN_EXPIRY_MS,
          expiresAt: expiresAt
        };
        return true;
      }
    }
    return false;
  }

  return Date.now() < tokenCache.expiresAt;
}

/**
 * Get OAuth token - auto-refreshes if expired
 * This is the main function all services should use
 */
export async function getOAuthToken(): Promise<string> {
  // Check if we have a valid cached token
  if (isTokenValid() && tokenCache) {
    const remainingMs = tokenCache.expiresAt - Date.now();
    const remainingMin = Math.floor(remainingMs / 60000);
    console.log(`🔑 Using cached OAuth token (expires in ${remainingMin} minutes)`);
    return tokenCache.token;
  }

  // Need to fetch a fresh token
  return fetchFreshToken();
}

/**
 * Get GCP Project ID - fetches from proxy or uses cached value
 */
export async function getProjectId(): Promise<string> {
  // Check cache first
  if (projectIdCache) {
    return projectIdCache;
  }

  // Check localStorage
  const savedProjectId = localStorage.getItem('vertex_project_id') || localStorage.getItem('vera_project_id');
  if (savedProjectId) {
    projectIdCache = savedProjectId;
    return savedProjectId;
  }

  // Fetch from proxy server
  return fetchProjectId();
}

/**
 * Get both token and project ID in one call
 */
export async function getVertexAICredentials(): Promise<{ token: string; projectId: string }> {
  const [token, projectId] = await Promise.all([
    getOAuthToken(),
    getProjectId()
  ]);

  return { token, projectId };
}

/**
 * Force refresh the OAuth token
 * Use this when you get a 401 error
 */
export async function forceRefreshToken(): Promise<string> {
  console.log('🔄 Force refreshing OAuth token...');
  tokenCache = null;
  localStorage.removeItem('vertex_oauth_token');
  localStorage.removeItem('vertex_oauth_token_expiry');
  return fetchFreshToken();
}

/**
 * Clear all cached credentials
 */
export function clearCredentials(): void {
  tokenCache = null;
  projectIdCache = null;
  localStorage.removeItem('vertex_oauth_token');
  localStorage.removeItem('vertex_oauth_token_expiry');
  localStorage.removeItem('vertex_project_id');
  localStorage.removeItem('vera_oauth_token');
  localStorage.removeItem('vera_project_id');
  console.log('🧹 All cached credentials cleared');
}

/**
 * Check if proxy server is available
 */
export async function checkProxyHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${PROXY_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Initialize auth manager - call this on app startup
 * Pre-fetches token and project ID if proxy is available
 */
export async function initializeAuth(): Promise<{ success: boolean; error?: string }> {
  try {
    const proxyAvailable = await checkProxyHealth();

    if (!proxyAvailable) {
      console.warn('⚠️ Proxy server not available. Using manual credentials from localStorage.');
      return {
        success: false,
        error: 'Proxy server not available. Start it with: npm run proxy'
      };
    }

    // Pre-fetch credentials
    await getVertexAICredentials();

    console.log('✅ Auth manager initialized successfully');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Auth manager initialization failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Get token status for UI display
 */
export function getTokenStatus(): {
  hasToken: boolean;
  expiresIn: number | null;
  source: 'cache' | 'localStorage' | 'none'
} {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return {
      hasToken: true,
      expiresIn: Math.floor((tokenCache.expiresAt - Date.now()) / 60000),
      source: 'cache'
    };
  }

  const savedToken = localStorage.getItem('vertex_oauth_token');
  const savedExpiry = localStorage.getItem('vertex_oauth_token_expiry');

  if (savedToken && savedExpiry) {
    const expiresAt = parseInt(savedExpiry, 10);
    if (Date.now() < expiresAt) {
      return {
        hasToken: true,
        expiresIn: Math.floor((expiresAt - Date.now()) / 60000),
        source: 'localStorage'
      };
    }
  }

  return {
    hasToken: false,
    expiresIn: null,
    source: 'none'
  };
}

// Default export for convenience
export default {
  getOAuthToken,
  getProjectId,
  getVertexAICredentials,
  forceRefreshToken,
  clearCredentials,
  checkProxyHealth,
  initializeAuth,
  getTokenStatus
};
