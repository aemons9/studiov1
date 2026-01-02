/**
 * INSTAGRAM TOKEN MANAGER
 *
 * Handles automatic token refresh for Instagram/Facebook Graph API.
 *
 * Token Types:
 * - Short-lived User Token: 1-2 hours (from OAuth login)
 * - Long-lived User Token: 60 days (exchanged from short-lived)
 * - Page Access Token: Never expires when derived from long-lived user token
 *
 * Strategy:
 * 1. Exchange short-lived token for long-lived token
 * 2. Refresh long-lived token before expiry (within 60 days)
 * 3. Get permanent page access token for Instagram publishing
 */

// Storage keys
const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: 'instagram_access_token',
  TOKEN_TYPE: 'instagram_token_type',
  TOKEN_EXPIRY: 'instagram_token_expiry',
  USER_ID: 'instagram_user_id',
  PAGE_ID: 'instagram_page_id',
  IG_ACCOUNT_ID: 'instagram_business_account_id',
  APP_ID: 'instagram_app_id',
  APP_SECRET: 'instagram_app_secret',
  GITHUB_TOKEN: 'github_token',
  LAST_REFRESH: 'instagram_last_refresh',
} as const;

export interface TokenInfo {
  accessToken: string;
  tokenType: 'short_lived' | 'long_lived' | 'page_token';
  expiresAt?: number; // Unix timestamp
  userId?: string;
  pageId?: string;
  igAccountId?: string;
}

export interface TokenRefreshResult {
  success: boolean;
  accessToken?: string;
  expiresIn?: number;
  tokenType?: string;
  error?: string;
}

// Default configuration
const DEFAULT_CONFIG = {
  GRAPH_API_VERSION: 'v21.0',
  GRAPH_API_BASE: 'https://graph.facebook.com',
  IG_ACCOUNT_ID: '17841478517688462',
  PAGE_ID: '888169534380297',
  APP_ID: '2812661588942942',
};

/**
 * Save token info to localStorage
 */
export function saveTokenInfo(info: TokenInfo): void {
  localStorage.setItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN, info.accessToken);
  localStorage.setItem(TOKEN_STORAGE_KEYS.TOKEN_TYPE, info.tokenType);

  if (info.expiresAt) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.TOKEN_EXPIRY, info.expiresAt.toString());
  }
  if (info.userId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.USER_ID, info.userId);
  }
  if (info.pageId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.PAGE_ID, info.pageId);
  }
  if (info.igAccountId) {
    localStorage.setItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID, info.igAccountId);
  }

  localStorage.setItem(TOKEN_STORAGE_KEYS.LAST_REFRESH, Date.now().toString());
}

/**
 * Load token info from localStorage
 */
export function loadTokenInfo(): TokenInfo | null {
  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
  if (!accessToken) return null;

  const tokenType = localStorage.getItem(TOKEN_STORAGE_KEYS.TOKEN_TYPE) as TokenInfo['tokenType'] || 'short_lived';
  const expiryStr = localStorage.getItem(TOKEN_STORAGE_KEYS.TOKEN_EXPIRY);

  return {
    accessToken,
    tokenType,
    expiresAt: expiryStr ? parseInt(expiryStr, 10) : undefined,
    userId: localStorage.getItem(TOKEN_STORAGE_KEYS.USER_ID) || undefined,
    pageId: localStorage.getItem(TOKEN_STORAGE_KEYS.PAGE_ID) || DEFAULT_CONFIG.PAGE_ID,
    igAccountId: localStorage.getItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID) || DEFAULT_CONFIG.IG_ACCOUNT_ID,
  };
}

/**
 * Save app credentials (needed for token exchange)
 */
export function saveAppCredentials(appId: string, appSecret: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEYS.APP_ID, appId);
  localStorage.setItem(TOKEN_STORAGE_KEYS.APP_SECRET, appSecret);
}

/**
 * Load app credentials
 */
export function loadAppCredentials(): { appId: string; appSecret: string } | null {
  const appId = localStorage.getItem(TOKEN_STORAGE_KEYS.APP_ID);
  const appSecret = localStorage.getItem(TOKEN_STORAGE_KEYS.APP_SECRET);

  if (!appId || !appSecret) return null;
  return { appId, appSecret };
}

/**
 * Save GitHub token
 */
export function saveGitHubToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEYS.GITHUB_TOKEN, token);
}

/**
 * Load GitHub token
 */
export function loadGitHubToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEYS.GITHUB_TOKEN);
}

/**
 * Check if token is expired or will expire soon (within 7 days)
 */
export function isTokenExpiringSoon(expiresAt?: number): boolean {
  if (!expiresAt) return true; // Unknown expiry, assume needs refresh

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  return Date.now() > (expiresAt - sevenDaysMs);
}

/**
 * Exchange short-lived token for long-lived token
 * Requires App ID and App Secret
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string,
  appId: string,
  appSecret: string
): Promise<TokenRefreshResult> {
  const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/${DEFAULT_CONFIG.GRAPH_API_VERSION}/oauth/access_token`);
  url.searchParams.set('grant_type', 'fb_exchange_token');
  url.searchParams.set('client_id', appId);
  url.searchParams.set('client_secret', appSecret);
  url.searchParams.set('fb_exchange_token', shortLivedToken);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        success: false,
        error: data.error?.message || `Failed to exchange token: ${response.status}`,
      };
    }

    const expiresAt = Date.now() + (data.expires_in * 1000);

    // Save the new token
    saveTokenInfo({
      accessToken: data.access_token,
      tokenType: 'long_lived',
      expiresAt,
    });

    return {
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Refresh a long-lived token
 * Long-lived tokens can be refreshed to get a new long-lived token
 */
export async function refreshLongLivedToken(
  currentToken: string,
  appId: string,
  appSecret: string
): Promise<TokenRefreshResult> {
  const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/${DEFAULT_CONFIG.GRAPH_API_VERSION}/oauth/access_token`);
  url.searchParams.set('grant_type', 'fb_exchange_token');
  url.searchParams.set('client_id', appId);
  url.searchParams.set('client_secret', appSecret);
  url.searchParams.set('fb_exchange_token', currentToken);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        success: false,
        error: data.error?.message || `Failed to refresh token: ${response.status}`,
      };
    }

    const expiresAt = Date.now() + (data.expires_in * 1000);

    // Save the refreshed token
    saveTokenInfo({
      accessToken: data.access_token,
      tokenType: 'long_lived',
      expiresAt,
    });

    return {
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Get page access token from user token
 * Page tokens derived from long-lived user tokens don't expire
 */
export async function getPageAccessToken(
  userToken: string,
  pageId: string = DEFAULT_CONFIG.PAGE_ID
): Promise<TokenRefreshResult> {
  const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/${DEFAULT_CONFIG.GRAPH_API_VERSION}/${pageId}`);
  url.searchParams.set('fields', 'access_token,name');
  url.searchParams.set('access_token', userToken);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        success: false,
        error: data.error?.message || `Failed to get page token: ${response.status}`,
      };
    }

    // Save the page token (no expiry for page tokens from long-lived user tokens)
    saveTokenInfo({
      accessToken: data.access_token,
      tokenType: 'page_token',
      pageId: pageId,
      igAccountId: DEFAULT_CONFIG.IG_ACCOUNT_ID,
    });

    return {
      success: true,
      accessToken: data.access_token,
      tokenType: 'page_token',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Validate current token and get user/page info
 */
export async function validateToken(accessToken: string): Promise<{
  valid: boolean;
  userId?: string;
  userName?: string;
  tokenType?: string;
  expiresAt?: number;
  scopes?: string[];
  error?: string;
}> {
  const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/debug_token`);
  url.searchParams.set('input_token', accessToken);
  url.searchParams.set('access_token', accessToken);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error || !data.data?.is_valid) {
      return {
        valid: false,
        error: data.error?.message || data.data?.error?.message || 'Invalid token',
      };
    }

    const tokenData = data.data;

    return {
      valid: true,
      userId: tokenData.user_id,
      tokenType: tokenData.type,
      expiresAt: tokenData.expires_at ? tokenData.expires_at * 1000 : undefined,
      scopes: tokenData.scopes,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Get Instagram Business Account ID from Page
 */
export async function getInstagramAccountId(
  accessToken: string,
  pageId: string = DEFAULT_CONFIG.PAGE_ID
): Promise<{ success: boolean; igAccountId?: string; username?: string; error?: string }> {
  const url = new URL(`${DEFAULT_CONFIG.GRAPH_API_BASE}/${DEFAULT_CONFIG.GRAPH_API_VERSION}/${pageId}`);
  url.searchParams.set('fields', 'instagram_business_account{id,username}');
  url.searchParams.set('access_token', accessToken);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        success: false,
        error: data.error?.message || `Failed to get IG account: ${response.status}`,
      };
    }

    const igAccount = data.instagram_business_account;
    if (!igAccount) {
      return {
        success: false,
        error: 'No Instagram Business Account linked to this page',
      };
    }

    // Save the IG account ID
    localStorage.setItem(TOKEN_STORAGE_KEYS.IG_ACCOUNT_ID, igAccount.id);

    return {
      success: true,
      igAccountId: igAccount.id,
      username: igAccount.username,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Auto-refresh token if needed
 * Returns the current valid token or refreshes if expiring
 */
export async function ensureValidToken(): Promise<TokenRefreshResult> {
  const tokenInfo = loadTokenInfo();

  if (!tokenInfo) {
    return {
      success: false,
      error: 'No token stored. Please configure Instagram access token.',
    };
  }

  // Page tokens don't expire
  if (tokenInfo.tokenType === 'page_token') {
    return {
      success: true,
      accessToken: tokenInfo.accessToken,
      tokenType: 'page_token',
    };
  }

  // Check if token needs refresh
  if (tokenInfo.expiresAt && !isTokenExpiringSoon(tokenInfo.expiresAt)) {
    return {
      success: true,
      accessToken: tokenInfo.accessToken,
      tokenType: tokenInfo.tokenType,
      expiresIn: Math.floor((tokenInfo.expiresAt - Date.now()) / 1000),
    };
  }

  // Try to refresh
  const credentials = loadAppCredentials();
  if (!credentials) {
    return {
      success: false,
      error: 'Token expiring soon but no app credentials for refresh. Please configure App ID and Secret.',
    };
  }

  console.log('🔄 Auto-refreshing Instagram token...');

  if (tokenInfo.tokenType === 'long_lived') {
    return refreshLongLivedToken(tokenInfo.accessToken, credentials.appId, credentials.appSecret);
  } else {
    return exchangeForLongLivedToken(tokenInfo.accessToken, credentials.appId, credentials.appSecret);
  }
}

/**
 * Initialize tokens from manual input (for first-time setup)
 */
export async function initializeFromToken(
  accessToken: string,
  options?: {
    appId?: string;
    appSecret?: string;
    pageId?: string;
  }
): Promise<{
  success: boolean;
  tokenInfo?: TokenInfo;
  error?: string;
}> {
  // First validate the token
  const validation = await validateToken(accessToken);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error || 'Invalid token',
    };
  }

  // Save app credentials if provided
  if (options?.appId && options?.appSecret) {
    saveAppCredentials(options.appId, options.appSecret);
  }

  // Determine token type based on expiry
  let tokenType: TokenInfo['tokenType'] = 'short_lived';
  if (!validation.expiresAt) {
    tokenType = 'page_token'; // No expiry = page token
  } else {
    const timeUntilExpiry = validation.expiresAt - Date.now();
    if (timeUntilExpiry > 24 * 60 * 60 * 1000) {
      tokenType = 'long_lived'; // More than 24 hours = long-lived
    }
  }

  const tokenInfo: TokenInfo = {
    accessToken,
    tokenType,
    expiresAt: validation.expiresAt,
    userId: validation.userId,
    pageId: options?.pageId || DEFAULT_CONFIG.PAGE_ID,
    igAccountId: DEFAULT_CONFIG.IG_ACCOUNT_ID,
  };

  saveTokenInfo(tokenInfo);

  // Try to get IG account info
  const igInfo = await getInstagramAccountId(accessToken, tokenInfo.pageId);
  if (igInfo.success && igInfo.igAccountId) {
    tokenInfo.igAccountId = igInfo.igAccountId;
    saveTokenInfo(tokenInfo);
  }

  return {
    success: true,
    tokenInfo,
  };
}

/**
 * Clear all stored tokens
 */
export function clearTokens(): void {
  Object.values(TOKEN_STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Get token status summary
 */
export function getTokenStatus(): {
  hasToken: boolean;
  tokenType?: string;
  isValid: boolean;
  expiresIn?: string;
  needsRefresh: boolean;
  hasAppCredentials: boolean;
  igAccountId?: string;
} {
  const tokenInfo = loadTokenInfo();
  const credentials = loadAppCredentials();

  if (!tokenInfo) {
    return {
      hasToken: false,
      isValid: false,
      needsRefresh: true,
      hasAppCredentials: !!credentials,
    };
  }

  const needsRefresh = tokenInfo.tokenType !== 'page_token' &&
    isTokenExpiringSoon(tokenInfo.expiresAt);

  let expiresIn: string | undefined;
  if (tokenInfo.expiresAt) {
    const msUntil = tokenInfo.expiresAt - Date.now();
    if (msUntil > 0) {
      const days = Math.floor(msUntil / (24 * 60 * 60 * 1000));
      const hours = Math.floor((msUntil % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      expiresIn = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
    } else {
      expiresIn = 'Expired';
    }
  } else if (tokenInfo.tokenType === 'page_token') {
    expiresIn = 'Never (Page Token)';
  }

  return {
    hasToken: true,
    tokenType: tokenInfo.tokenType,
    isValid: !needsRefresh || tokenInfo.tokenType === 'page_token',
    expiresIn,
    needsRefresh,
    hasAppCredentials: !!credentials,
    igAccountId: tokenInfo.igAccountId,
  };
}
