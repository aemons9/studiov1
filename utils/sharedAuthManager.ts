/**
 * Shared Authentication Manager
 * Provides unified OAuth/API Key management across ALL modes
 * Syncs between localStorage and GenerationSettings
 */

export interface AuthCredentials {
  authMethod: 'oauth' | 'apikey';
  projectId: string;
  oauthToken: string;
  apiKey: string;
  tokenTimestamp: number | null;
}

// Unified storage keys (shared across all modes)
const STORAGE_KEYS = {
  AUTH_METHOD: 'app_auth_method',
  PROJECT_ID: 'app_project_id',
  OAUTH_TOKEN: 'app_oauth_token',
  API_KEY: 'app_api_key',
  TOKEN_TIMESTAMP: 'app_oauth_token_timestamp',
  // Legacy vera keys for backward compatibility
  VERA_AUTH_METHOD: 'vera_auth_method',
  VERA_PROJECT_ID: 'vera_project_id',
  VERA_OAUTH_TOKEN: 'vera_oauth_token',
  VERA_TOKEN_TIMESTAMP: 'vera_oauth_token_timestamp',
};

/**
 * Get all auth credentials from localStorage
 */
export function getAuthCredentials(): AuthCredentials {
  // Try new unified keys first
  let authMethod = localStorage.getItem(STORAGE_KEYS.AUTH_METHOD) as 'oauth' | 'apikey' | null;
  let projectId = localStorage.getItem(STORAGE_KEYS.PROJECT_ID) || '';
  let oauthToken = localStorage.getItem(STORAGE_KEYS.OAUTH_TOKEN) || '';
  let apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  let tokenTimestamp = localStorage.getItem(STORAGE_KEYS.TOKEN_TIMESTAMP);

  // Fallback to legacy Vera keys if unified keys don't exist
  if (!authMethod || !oauthToken) {
    authMethod = (localStorage.getItem(STORAGE_KEYS.VERA_AUTH_METHOD) as 'oauth' | 'apikey') || 'apikey';
    projectId = projectId || localStorage.getItem(STORAGE_KEYS.VERA_PROJECT_ID) || '';
    oauthToken = oauthToken || localStorage.getItem(STORAGE_KEYS.VERA_OAUTH_TOKEN) || '';
    tokenTimestamp = tokenTimestamp || localStorage.getItem(STORAGE_KEYS.VERA_TOKEN_TIMESTAMP);

    // Migrate to new unified keys
    if (oauthToken) {
      saveAuthCredentials({
        authMethod,
        projectId,
        oauthToken,
        apiKey,
        tokenTimestamp: tokenTimestamp ? parseInt(tokenTimestamp) : null,
      });
    }
  }

  return {
    authMethod: authMethod || 'apikey',
    projectId,
    oauthToken,
    apiKey,
    tokenTimestamp: tokenTimestamp ? parseInt(tokenTimestamp) : null,
  };
}

/**
 * Save auth credentials to localStorage (both new and legacy keys)
 */
export function saveAuthCredentials(credentials: AuthCredentials): void {
  // Save to unified keys
  localStorage.setItem(STORAGE_KEYS.AUTH_METHOD, credentials.authMethod);
  localStorage.setItem(STORAGE_KEYS.PROJECT_ID, credentials.projectId);
  localStorage.setItem(STORAGE_KEYS.OAUTH_TOKEN, credentials.oauthToken);
  localStorage.setItem(STORAGE_KEYS.API_KEY, credentials.apiKey);
  if (credentials.tokenTimestamp) {
    localStorage.setItem(STORAGE_KEYS.TOKEN_TIMESTAMP, credentials.tokenTimestamp.toString());
  }

  // Also save to legacy Vera keys for backward compatibility
  localStorage.setItem(STORAGE_KEYS.VERA_AUTH_METHOD, credentials.authMethod === 'oauth' ? 'vertexai' : 'apikey');
  localStorage.setItem(STORAGE_KEYS.VERA_PROJECT_ID, credentials.projectId);
  localStorage.setItem(STORAGE_KEYS.VERA_OAUTH_TOKEN, credentials.oauthToken);
  if (credentials.tokenTimestamp) {
    localStorage.setItem(STORAGE_KEYS.VERA_TOKEN_TIMESTAMP, credentials.tokenTimestamp.toString());
  }

  // Dispatch storage event for cross-component sync
  window.dispatchEvent(new Event('storage'));
}

/**
 * Clear all auth credentials
 */
export function clearAuthCredentials(): void {
  // Clear unified keys
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });

  // Dispatch storage event
  window.dispatchEvent(new Event('storage'));
}

/**
 * Check if OAuth token is expired or expiring soon
 * Returns { isExpired: boolean, isExpiringSoon: boolean, minutesRemaining: number }
 */
export function checkTokenExpiration(): { isExpired: boolean; isExpiringSoon: boolean; minutesRemaining: number } {
  const credentials = getAuthCredentials();

  if (!credentials.tokenTimestamp || credentials.authMethod !== 'oauth') {
    return { isExpired: false, isExpiringSoon: false, minutesRemaining: 0 };
  }

  const tokenAge = Date.now() - credentials.tokenTimestamp;
  const oneHour = 60 * 60 * 1000;
  const fiftyMinutes = 50 * 60 * 1000;

  const minutesRemaining = Math.max(0, Math.floor((oneHour - tokenAge) / (60 * 1000)));

  return {
    isExpired: tokenAge > oneHour,
    isExpiringSoon: tokenAge > fiftyMinutes,
    minutesRemaining,
  };
}

/**
 * Get OAuth token for API calls (with automatic expiration warning)
 */
export function getOAuthToken(): string | null {
  const credentials = getAuthCredentials();

  if (credentials.authMethod !== 'oauth') {
    return null;
  }

  const { isExpired, isExpiringSoon } = checkTokenExpiration();

  if (isExpired) {
    console.warn('⚠️ OAuth token has expired! Please refresh your token.');
    return null;
  }

  if (isExpiringSoon) {
    console.warn('⏰ OAuth token expiring soon! Consider refreshing.');
  }

  return credentials.oauthToken || null;
}

/**
 * Get Project ID for Vertex AI calls
 */
export function getProjectId(): string | null {
  const credentials = getAuthCredentials();
  return credentials.projectId || null;
}

/**
 * Get API Key for Gemini API calls
 */
export function getApiKey(): string | null {
  const credentials = getAuthCredentials();
  return credentials.apiKey || null;
}

/**
 * Check if user is authenticated (has either OAuth or API key)
 */
export function isAuthenticated(): boolean {
  const credentials = getAuthCredentials();

  if (credentials.authMethod === 'oauth') {
    return !!(credentials.projectId && credentials.oauthToken && !checkTokenExpiration().isExpired);
  }

  return !!credentials.apiKey;
}

/**
 * Get current auth method
 */
export function getAuthMethod(): 'oauth' | 'apikey' {
  const credentials = getAuthCredentials();
  return credentials.authMethod;
}

/**
 * Update OAuth token timestamp (call when token is refreshed)
 */
export function updateTokenTimestamp(): void {
  const credentials = getAuthCredentials();
  credentials.tokenTimestamp = Date.now();
  saveAuthCredentials(credentials);
}
