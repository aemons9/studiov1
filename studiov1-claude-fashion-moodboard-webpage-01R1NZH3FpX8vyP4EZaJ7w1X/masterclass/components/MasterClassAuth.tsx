/**
 * MASTERCLASS AUTHENTICATION COMPONENT
 * Simplified authentication settings for MasterClass Mode
 */

import React, { useState, useEffect } from 'react';

interface MasterClassAuthProps {
  projectId: string;
  accessToken: string;
  onUpdate: (projectId: string, accessToken: string) => void;
  isCollapsed?: boolean;
}

export const MasterClassAuth: React.FC<MasterClassAuthProps> = ({
  projectId,
  accessToken,
  onUpdate,
  isCollapsed = false
}) => {
  const [localProjectId, setLocalProjectId] = useState(projectId);
  const [localAccessToken, setLocalAccessToken] = useState(accessToken);
  const [showToken, setShowToken] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');

  // Check if settings are configured
  const isConfigured = localProjectId && localAccessToken;

  // Handle save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localProjectId !== projectId || localAccessToken !== accessToken) {
        setSaveStatus('saving');
        onUpdate(localProjectId, localAccessToken);
        setTimeout(() => setSaveStatus('saved'), 500);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [localProjectId, localAccessToken]);

  // Mark as unsaved when typing
  const handleProjectIdChange = (value: string) => {
    setLocalProjectId(value);
    setSaveStatus('unsaved');
  };

  const handleTokenChange = (value: string) => {
    setLocalAccessToken(value);
    setSaveStatus('unsaved');
  };

  const getOAuthToken = () => {
    alert(
      'To get an OAuth token:\n\n' +
      '1. Install Google Cloud SDK\n' +
      '2. Run: gcloud auth application-default print-access-token\n' +
      '3. Copy the token and paste it below\n\n' +
      'Note: Tokens expire after ~1 hour'
    );
  };

  const clearSettings = () => {
    if (confirm('Clear authentication settings?')) {
      handleProjectIdChange('');
      handleTokenChange('');
    }
  };

  if (isCollapsed) {
    return (
      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg p-3 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-purple-200">Authentication</span>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && (
              <span className="text-xs text-yellow-400">Saving...</span>
            )}
            {saveStatus === 'saved' && isConfigured && (
              <span className="text-xs text-green-400">✓ Configured</span>
            )}
            {!isConfigured && (
              <span className="text-xs text-red-400">Not configured</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg p-4 border border-purple-500/30 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-lg font-bold text-white">Authentication Settings</h3>
            <p className="text-xs text-purple-200">OAuth 2.0 for Vertex AI (Imagen)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saveStatus === 'saving' && (
            <span className="text-sm text-yellow-400 animate-pulse">Saving...</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-400">✓ Auto-saved</span>
          )}
          {saveStatus === 'unsaved' && (
            <span className="text-sm text-gray-400">...</span>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {isConfigured ? (
        <div className="flex items-center gap-2 p-2 bg-green-900/30 border border-green-500/30 rounded">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-green-300">Authentication configured - Ready to generate</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2 bg-red-900/30 border border-red-500/30 rounded">
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-red-300">Please configure authentication to generate images</span>
        </div>
      )}

      {/* Project ID Input */}
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2">
          Google Cloud Project ID
        </label>
        <input
          type="text"
          value={localProjectId}
          onChange={(e) => handleProjectIdChange(e.target.value)}
          placeholder="your-project-id"
          className="w-full bg-gray-900/80 text-white border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-400 transition-colors"
        />
        <p className="text-xs text-gray-400 mt-1">
          Your Google Cloud project ID with Vertex AI enabled
        </p>
      </div>

      {/* Access Token Input */}
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center justify-between">
          <span>Access Token</span>
          <button
            type="button"
            onClick={getOAuthToken}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            How to get token?
          </button>
        </label>
        <div className="relative">
          <textarea
            value={localAccessToken}
            onChange={(e) => handleTokenChange(e.target.value)}
            placeholder="ya29.a0..."
            rows={3}
            className="w-full bg-gray-900/80 text-white border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-400 font-mono text-xs transition-colors pr-10"
            style={{ resize: 'vertical' }}
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-2 top-2 text-purple-400 hover:text-purple-300 transition-colors"
            title={showToken ? 'Hide token' : 'Show token'}
          >
            {showToken ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ Token expires after ~1 hour. Run: <code className="bg-gray-800 px-1 rounded">gcloud auth application-default print-access-token</code>
        </p>
      </div>

      {/* Quick Setup Guide */}
      <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
        <p className="text-xs font-semibold text-white mb-2">Quick Setup:</p>
        <ol className="text-xs text-gray-300 space-y-1">
          <li>1. Install: <code className="bg-gray-800 px-1 rounded">gcloud</code></li>
          <li>2. Login: <code className="bg-gray-800 px-1 rounded">gcloud auth application-default login</code></li>
          <li>3. Get token: <code className="bg-gray-800 px-1 rounded">gcloud auth application-default print-access-token</code></li>
          <li>4. Paste token above</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={clearSettings}
          className="text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Clear Settings
        </button>
        <div className="text-xs text-gray-500">
          Settings auto-save after 1 second
        </div>
      </div>
    </div>
  );
};

export default MasterClassAuth;