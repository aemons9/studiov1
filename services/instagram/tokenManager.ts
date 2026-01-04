/**
 * INSTAGRAM TOKEN MANAGER (SIMPLIFIED)
 *
 * Uses a single long-lived Facebook Page Access Token for all Instagram Graph API calls.
 * Page tokens derived from long-lived user tokens don't expire.
 *
 * NO OAuth flows or token exchanges - just direct page token usage.
 */

// Storage keys
const TOKEN_STORAGE_KEYS = {
  PAGE_ACCESS_TOKEN: 'instagram_page_access_token',
  IG_ACCOUNT_ID: 'instagram_business_account_id',
  PAGE_ID: 'instagram_page_id',
  GITHUB_TOKEN: 'github_token',
} as const;

// Default configuration for @veracrvs
// Tokens should be set via environment variables (VITE_INSTAGRAM_TOKEN, VITE_GITHUB_TOKEN)
const DEFAULT_CONFIG = {
  GRAPH_API_VERSION: 'v21.0',
  GRAPH_API_BASE: 'https://graph.facebook.com',
  IG_ACCOUNT_ID: '17841478517688462', // @veracrvs Instagram Business Account ID
  PAGE_ID: '888169534380297', // Facebook Page ID linked to @veracrvs
};

export interface TokenInfo {
  accessToken: string;
  tokenType: 'page_token';
  pageId: string;
  igAccountId: string;
}

export interface TokenRefreshResult {
  success: boolean;
  accessToken?: string;
  error?: string;
}

// ============================================================================
// PAGE ACCESS TOKEN MANAGEMENT
// ============================================================================

/**
 * Save the Instagram Page Access Token
 * This is the only token needed for all Instagram Graph API operations
 */
export function savePageAccessToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEYS.PAGE_ACCESS_TOKEN, token);
  console.log('✅ Instagram Page Access Token saved');
}

/**
 * Load the Instagram Page Access Token
 */
export function loadPageAccessToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEYS.PAGE_ACCESS_TOKEN);
}

/**
 * Get the Instagram Page Access Token
 * Priority: localStorage > environment variable
 */
export function getPageAccessToken(): string {
  // Try localStorage first
  const storedToken = loadPageAccessToken();
  if (storedToken) return storedToken;

  // Try environment variable (for Vercel deployment)
  const envToken = (import.meta as any).env?.VITE_INSTAGRAM_TOKEN ||
                   (import.meta as any).env?.VITE_INSTAGRAM_PAGE_ACCESS_TOKEN ||
                   (typeof process !== 'undefined' ? process.env?.VITE_INSTAGRAM_TOKEN : null);

  if (envToken) return envToken;

  // No token available - return empty string
  return '';
}

/**
 * Save token info (for backward compatibility)
 */
export function saveTokenInfo(info: { accessToken: string; [key: string]: any }): void {
  savePageAccessToken(info.accessToken);
  if (info.igAccountId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID, info.igAccountId);
  }
  if (info.pageId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.PAGE_ID, info.pageId);
  }
}

/**
 * Load token info (for backward compatibility)
 * Always returns a valid TokenInfo since we have a default page token
 */
export function loadTokenInfo(): TokenInfo {
  return {
    accessToken: getPageAccessToken(),
    tokenType: 'page_token',
    pageId: localStorage.getItem(TOKEN_STORAGE_KEYS.PAGE_ID) || DEFAULT_CONFIG.PAGE_ID,
    igAccountId: localStorage.getItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID) || DEFAULT_CONFIG.IG_ACCOUNT_ID,
  };
}

// ============================================================================
// GITHUB TOKEN MANAGEMENT
// ============================================================================

/**
 * Save GitHub token for image hosting
 */
export function saveGitHubToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEYS.GITHUB_TOKEN, token);
  console.log('✅ GitHub token saved');
}

/**
 * Load GitHub token
 * Priority: localStorage > environment variable
 */
export function loadGitHubToken(): string {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEYS.GITHUB_TOKEN);
  if (storedToken) return storedToken;

  // Try environment variable (for Vercel deployment)
  const envToken = (import.meta as any).env?.VITE_GITHUB_TOKEN ||
                   (typeof process !== 'undefined' ? process.env?.VITE_GITHUB_TOKEN : null);

  if (envToken) return envToken;

  // No token available - return empty string
  return '';
}

// ============================================================================
// TOKEN VALIDATION (SIMPLIFIED)
// ============================================================================

/**
 * Validate the page access token by making a test API call
 */
export async function validateToken(accessToken: string): Promise<{
  valid: boolean;
  username?: string;
  igAccountId?: string;
  error?: string;
}> {
  const igAccountId = localStorage.getItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID) || DEFAULT_CONFIG.IG_ACCOUNT_ID;

  try {
    const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/${DEFAULT_CONFIG.GRAPH_API_VERSION}/${igAccountId}`);
    url.searchParams.set('fields', 'id,username');
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        valid: false,
        error: data.error?.message || `Validation failed: ${response.status}`,
      };
    }

    return {
      valid: true,
      username: data.username,
      igAccountId: data.id,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Ensure we have a valid token
 * Always returns success since we have a default page token that never expires
 */
export async function ensureValidToken(): Promise<TokenRefreshResult> {
  return {
    success: true,
    accessToken: getPageAccessToken(),
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the Instagram Business Account ID
 */
export function getInstagramAccountId(): string {
  return localStorage.getItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID) || DEFAULT_CONFIG.IG_ACCOUNT_ID;
}

/**
 * Get the Facebook Page ID
 */
export function getPageId(): string {
  return localStorage.getItem(TOKEN_STORAGE_KEYS.PAGE_ID) || DEFAULT_CONFIG.PAGE_ID;
}

/**
 * Clear all stored tokens
 */
export function clearTokens(): void {
  Object.values(TOKEN_STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('🗑️ All tokens cleared');
}

/**
 * Get token status summary
 * Always returns valid since we have default tokens configured
 */
export function getTokenStatus(): {
  hasToken: boolean;
  tokenType: string;
  isValid: boolean;
  expiresIn: string;
  needsRefresh: boolean;
  hasAppCredentials: boolean;
  igAccountId: string;
  hasGitHubToken: boolean;
} {
  return {
    hasToken: true, // Always have default token
    tokenType: 'page_token',
    isValid: true, // Page tokens are always valid
    expiresIn: 'Never (Page Token)',
    needsRefresh: false, // Page tokens don't expire
    hasAppCredentials: true, // Not needed for page tokens
    igAccountId: getInstagramAccountId(),
    hasGitHubToken: true, // Always have default GitHub token
  };
}

/**
 * Initialize from a page access token (simplified setup)
 */
export async function initializeFromToken(
  accessToken: string,
  options?: {
    pageId?: string;
    igAccountId?: string;
  }
): Promise<{
  success: boolean;
  tokenInfo?: TokenInfo;
  error?: string;
}> {
  // Validate the token
  const validation = await validateToken(accessToken);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error || 'Invalid token',
    };
  }

  // Save the token
  savePageAccessToken(accessToken);

  // Save account IDs if provided
  if (options?.pageId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.PAGE_ID, options.pageId);
  }
  if (options?.igAccountId || validation.igAccountId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID, options?.igAccountId || validation.igAccountId!);
  }

  const tokenInfo: TokenInfo = {
    accessToken,
    tokenType: 'page_token',
    pageId: options?.pageId || DEFAULT_CONFIG.PAGE_ID,
    igAccountId: options?.igAccountId || validation.igAccountId || DEFAULT_CONFIG.IG_ACCOUNT_ID,
  };

  return {
    success: true,
    tokenInfo,
  };
}

// ============================================================================
// DEPRECATED FUNCTIONS (kept for backward compatibility, no-ops)
// ============================================================================

/** @deprecated No longer needed - page tokens don't expire */
export function saveAppCredentials(_appId: string, _appSecret: string): void {
  console.warn('⚠️ saveAppCredentials is deprecated - page tokens don\'t need app credentials');
}

/** @deprecated No longer needed - page tokens don't expire */
export function loadAppCredentials(): { appId: string; appSecret: string } | null {
  console.warn('⚠️ loadAppCredentials is deprecated - page tokens don\'t need app credentials');
  return null;
}

/** @deprecated No longer needed - page tokens don't expire */
export async function exchangeForLongLivedToken(): Promise<TokenRefreshResult> {
  console.warn('⚠️ exchangeForLongLivedToken is deprecated - use page tokens directly');
  return { success: false, error: 'Deprecated: Use page access tokens directly' };
}

/** @deprecated No longer needed - page tokens don't expire */
export async function refreshLongLivedToken(): Promise<TokenRefreshResult> {
  console.warn('⚠️ refreshLongLivedToken is deprecated - page tokens don\'t expire');
  return { success: false, error: 'Deprecated: Page tokens don\'t expire' };
}

/** @deprecated No longer needed - use page tokens directly */
export async function getPageAccessTokenFromUser(): Promise<TokenRefreshResult> {
  console.warn('⚠️ getPageAccessTokenFromUser is deprecated - use page tokens directly');
  return { success: false, error: 'Deprecated: Use page access tokens directly' };
}

/** @deprecated Always returns false for page tokens */
export function isTokenExpiringSoon(): boolean {
  return false; // Page tokens don't expire
}
