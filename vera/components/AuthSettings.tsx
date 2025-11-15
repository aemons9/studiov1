import React, { useState, useEffect } from 'react';

type AuthMethod = 'apikey' | 'vertexai';

interface AuthSettingsProps {
  onAuthMethodChange?: (method: AuthMethod) => void;
}

const AuthSettings: React.FC<AuthSettingsProps> = ({ onAuthMethodChange }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('apikey');
  const [projectId, setProjectId] = useState<string>('');
  const [oauthToken, setOauthToken] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Load saved settings on mount
  useEffect(() => {
    const savedMethod = localStorage.getItem('vera_auth_method') as AuthMethod;
    const savedProjectId = localStorage.getItem('vera_project_id') || '';
    const savedOauthToken = localStorage.getItem('vera_oauth_token') || '';

    if (savedMethod) {
      setAuthMethod(savedMethod);
    }
    setProjectId(savedProjectId);
    setOauthToken(savedOauthToken);

    // Check if Vertex AI credentials are saved
    if (savedMethod === 'vertexai' && savedProjectId && savedOauthToken) {
      setIsSaved(true);
    }
  }, []);

  const handleAuthMethodChange = (method: AuthMethod) => {
    setAuthMethod(method);
    localStorage.setItem('vera_auth_method', method);
    onAuthMethodChange?.(method);
    setIsSaved(false);
  };

  const handleSaveCredentials = () => {
    if (authMethod === 'vertexai') {
      if (!projectId.trim()) {
        alert('Please enter a Project ID');
        return;
      }
      if (!oauthToken.trim()) {
        alert('Please enter an OAuth Token');
        return;
      }

      localStorage.setItem('vera_project_id', projectId.trim());
      localStorage.setItem('vera_oauth_token', oauthToken.trim());
      setIsSaved(true);
      alert('Vertex AI credentials saved successfully!');
    }
  };

  const handleClearCredentials = () => {
    if (window.confirm('Clear all Vertex AI credentials? You will need to re-enter them to use Vertex AI.')) {
      localStorage.removeItem('vera_project_id');
      localStorage.removeItem('vera_oauth_token');
      setProjectId('');
      setOauthToken('');
      setIsSaved(false);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-4">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-100">
            Authentication Settings
            {authMethod === 'vertexai' && isSaved && (
              <span className="ml-2 text-xs text-green-400">✓ Configured</span>
            )}
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${showSettings ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showSettings && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Authentication Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAuthMethodChange('apikey')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  authMethod === 'apikey'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-cyan-500/50'
                }`}
              >
                <div className="font-semibold">API Key</div>
                <div className="text-xs mt-1">Veo 3.0 + Imagen 4</div>
              </button>
              <button
                onClick={() => handleAuthMethodChange('vertexai')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  authMethod === 'vertexai'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-purple-500/50'
                }`}
              >
                <div className="font-semibold">Vertex AI</div>
                <div className="text-xs mt-1">Veo 3.1 + Imagen 4 Ultra/Fast</div>
              </button>
            </div>
          </div>

          {authMethod === 'apikey' && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-cyan-300">
                  <p className="font-semibold mb-1">Using Google AI Studio API Key</p>
                  <p className="text-cyan-200/80">
                    API Key is managed by AI Studio. This provides access to Veo 3.0 and Imagen 4 (standard) via Generative Language API.
                  </p>
                </div>
              </div>
            </div>
          )}

          {authMethod === 'vertexai' && (
            <div className="space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm text-yellow-300">
                    <p className="font-semibold mb-1">⚠️ Browser Limitation Warning</p>
                    <p className="text-yellow-200/80 mb-2">
                      <strong>CORS Issue:</strong> Vertex AI cannot be called directly from the browser due to Google Cloud security policies. This method requires a backend proxy server.
                    </p>
                    <p className="text-yellow-200/80">
                      <strong>Recommendation:</strong> Use API Key authentication for browser-based access, or deploy with a backend server for Vertex AI support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-purple-300">
                    <p className="font-semibold mb-1">Vertex AI Authentication</p>
                    <p className="text-purple-200/80">
                      Enables Veo 3.1 preview and Imagen 4 Ultra/Fast variants. Separate from main mode credentials.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project ID
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="your-gcp-project-id"
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  OAuth Token
                </label>
                <textarea
                  value={oauthToken}
                  onChange={(e) => setOauthToken(e.target.value)}
                  placeholder="ya29.a0AfB_..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-xs"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Get token from: <code className="text-cyan-400">gcloud auth print-access-token</code>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveCredentials}
                  disabled={!projectId.trim() || !oauthToken.trim()}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Save Credentials
                </button>
                {isSaved && (
                  <button
                    onClick={handleClearCredentials}
                    className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg font-semibold hover:bg-red-600/30 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthSettings;
