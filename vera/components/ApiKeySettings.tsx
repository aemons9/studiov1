import React, { useState, useEffect } from 'react';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMethod = 'apikey' | 'vertexai';

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ isOpen, onClose }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('apikey');
  const [apiKey, setApiKey] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [oauthToken, setOauthToken] = useState<string>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing credentials from localStorage
    const storedMethod = localStorage.getItem('vera_auth_method') as AuthMethod | null;
    const storedApiKey = localStorage.getItem('vera_api_key');
    const storedProjectId = localStorage.getItem('vera_project_id');
    const storedOauthToken = localStorage.getItem('vera_oauth_token');

    if (storedMethod) {
      setAuthMethod(storedMethod);
    }
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    if (storedProjectId) {
      setProjectId(storedProjectId);
    }
    if (storedOauthToken) {
      setOauthToken(storedOauthToken);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (authMethod === 'apikey' && apiKey.trim()) {
      localStorage.setItem('vera_auth_method', 'apikey');
      localStorage.setItem('vera_api_key', apiKey.trim());
      // Clear VertexAI credentials
      localStorage.removeItem('vera_project_id');
      localStorage.removeItem('vera_oauth_token');
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    } else if (authMethod === 'vertexai' && projectId.trim() && oauthToken.trim()) {
      localStorage.setItem('vera_auth_method', 'vertexai');
      localStorage.setItem('vera_project_id', projectId.trim());
      localStorage.setItem('vera_oauth_token', oauthToken.trim());
      // Clear API key
      localStorage.removeItem('vera_api_key');
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('vera_auth_method');
    localStorage.removeItem('vera_api_key');
    localStorage.removeItem('vera_project_id');
    localStorage.removeItem('vera_oauth_token');
    setApiKey('');
    setProjectId('');
    setOauthToken('');
  };

  const isValidForm = authMethod === 'apikey'
    ? apiKey.trim()
    : (projectId.trim() && oauthToken.trim());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">
          Google AI Authentication
        </h2>

        <p className="text-slate-400 text-sm mb-4">
          Choose your authentication method to access Google AI models.
        </p>

        {/* Auth Method Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Authentication Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setAuthMethod('apikey')}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                authMethod === 'apikey'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold">API Key</div>
              <div className="text-xs mt-1">Veo 3.0, Imagen 4</div>
            </button>
            <button
              onClick={() => setAuthMethod('vertexai')}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                authMethod === 'vertexai'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold">VertexAI</div>
              <div className="text-xs mt-1">Veo 3.1, Imagen 4 Ultra</div>
            </button>
          </div>
        </div>

        {/* API Key Fields */}
        {authMethod === 'apikey' && (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Get your API key from{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Google AI Studio
              </a>
            </p>
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-slate-300 mb-2">
                API Key
              </label>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full p-3 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-mono text-sm"
              />
            </div>
          </div>
        )}

        {/* VertexAI Fields */}
        {authMethod === 'vertexai' && (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Get your Project ID and OAuth token from{' '}
              <a
                href="https://console.cloud.google.com/vertex-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Google Cloud Vertex AI
              </a>
            </p>
            <div>
              <label htmlFor="project-id" className="block text-sm font-medium text-slate-300 mb-2">
                Project ID
              </label>
              <input
                id="project-id"
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="my-project-id"
                className="w-full p-3 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-mono text-sm"
              />
            </div>
            <div>
              <label htmlFor="oauth-token" className="block text-sm font-medium text-slate-300 mb-2">
                OAuth Token
              </label>
              <textarea
                id="oauth-token"
                value={oauthToken}
                onChange={(e) => setOauthToken(e.target.value)}
                placeholder="ya29...."
                rows={3}
                className="w-full p-3 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-mono text-sm resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Generate token: <code className="bg-slate-900 px-1 rounded">gcloud auth print-access-token</code>
              </p>
            </div>
          </div>
        )}

        {saved && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-700 text-green-300 rounded-lg text-sm">
            ✓ Credentials saved successfully!
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!isValidForm}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-teal-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
