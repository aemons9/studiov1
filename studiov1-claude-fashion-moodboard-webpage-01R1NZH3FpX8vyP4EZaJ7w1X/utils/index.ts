/**
 * Utils module exports
 */

export {
  getOAuthToken,
  getProjectId,
  getVertexAICredentials,
  forceRefreshToken,
  clearCredentials,
  checkProxyHealth,
  initializeAuth,
  getTokenStatus
} from './sharedAuthManager';

export type { default as sharedAuthManager } from './sharedAuthManager';
