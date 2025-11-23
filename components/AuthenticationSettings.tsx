import React, { useState } from 'react';
import type { GenerationSettings } from '../types';

interface AuthenticationSettingsProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
  onClose: () => void;
}

const AuthenticationSettings: React.FC<AuthenticationSettingsProps> = ({
  settings,
  onSettingsChange,
  onClose
}) => {
  const [authMethod, setAuthMethod] = useState<'oauth' | 'apikey'>(
    settings.vertexAuthMethod || 'apikey'
  );
  const [projectId, setProjectId] = useState(settings.projectId || '');
  const [accessToken, setAccessToken] = useState(settings.accessToken || '');
  const [apiKey, setApiKey] = useState(settings.vertexApiKey || '');
  const [replicateApiToken, setReplicateApiToken] = useState(settings.replicateApiToken || '');

  const handleSave = () => {
    onSettingsChange({
      ...settings,
      vertexAuthMethod: authMethod,
      projectId: authMethod === 'oauth' ? projectId : '',
      accessToken: authMethod === 'oauth' ? accessToken : '',
      vertexApiKey: authMethod === 'apikey' ? apiKey : settings.vertexApiKey,
      replicateApiToken: replicateApiToken,
    });
    onClose();
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

  const getApiKey = () => {
    window.open('https://aistudio.google.com/apikey', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-purple-500/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
            Authentication Settings
          </h2>
          <p className="text-sm text-purple-200 mt-2">
            Configure how you authenticate with Google's AI services
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Authentication Method Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-200">
              Authentication Method
            </label>

            {/* OAuth Option */}
            <div
              onClick={() => setAuthMethod('oauth')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                authMethod === 'oauth'
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-600 bg-gray-700/30 hover:border-purple-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={authMethod === 'oauth'}
                  onChange={() => setAuthMethod('oauth')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    OAuth 2.0 (Vertex AI)
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">
                      FULL ACCESS
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    Full access to all Imagen models and features
                  </p>
                  <div className="mt-2 text-xs text-gray-400">
                    ✅ Imagen 4 Ultra, Fast, Generate<br />
                    ✅ Custom aspect ratios (1:1, 3:4, 4:3, 9:16, 16:9)<br />
                    ✅ Multiple images per generation<br />
                    ✅ Advanced safety controls<br />
                    ⚠️ Requires Google Cloud Project + OAuth token (expires hourly)
                  </div>
                </div>
              </div>
            </div>

            {/* API Key Option */}
            <div
              onClick={() => setAuthMethod('apikey')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                authMethod === 'apikey'
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-600 bg-gray-700/30 hover:border-purple-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={authMethod === 'apikey'}
                  onChange={() => setAuthMethod('apikey')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    API Key (Gemini API)
                    <span className="px-2 py-0.5 bg-yellow-600 text-white text-xs rounded">
                      LIMITED - TEXT ONLY
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    Simple setup but limited functionality
                  </p>
                  <div className="mt-2 text-xs text-gray-400">
                    ✅ Easy setup with API key<br />
                    ✅ No OAuth needed<br />
                    ✅ Works for Gemini text features (rewrites, analysis)<br />
                    ❌ <span className="text-red-400 font-semibold">Cannot generate images</span><br />
                    💡 Use with Replicate Flux for image generation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OAuth Configuration */}
          {authMethod === 'oauth' && (
            <div className="space-y-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h3 className="font-semibold text-white">OAuth 2.0 Configuration</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Cloud Project ID
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="your-project-id"
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                  <span>Access Token</span>
                  <button
                    type="button"
                    onClick={getOAuthToken}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    How to get token?
                  </button>
                </label>
                <textarea
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="ya29.a0..."
                  rows={3}
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 font-mono text-xs"
                />
                <p className="text-xs text-yellow-400 mt-1">
                  ⚠️ Token expires after ~1 hour. Run: gcloud auth application-default print-access-token
                </p>
              </div>

              <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
                <p className="text-xs text-gray-400">
                  <strong className="text-white">Quick Setup:</strong><br />
                  1. Install: <code className="bg-gray-800 px-1">gcloud</code><br />
                  2. Run: <code className="bg-gray-800 px-1">gcloud auth application-default login</code><br />
                  3. Get token: <code className="bg-gray-800 px-1">gcloud auth application-default print-access-token</code>
                </p>
              </div>
            </div>
          )}

          {/* API Key Configuration */}
          {authMethod === 'apikey' && (
            <div className="space-y-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <h3 className="font-semibold text-white">Gemini API Key Configuration</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                  <span>Gemini API Key</span>
                  <button
                    type="button"
                    onClick={getApiKey}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Get API Key →
                  </button>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 font-mono text-sm"
                />
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
                <p className="text-sm text-red-300">
                  <strong>⚠️ Important Limitation:</strong><br />
                  The Gemini API does NOT support image generation. It only supports text generation.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  For image generation, either:<br />
                  • Use OAuth authentication above, OR<br />
                  • Use Replicate Flux (configured separately)
                </p>
              </div>

              <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
                <p className="text-xs text-gray-400">
                  <strong className="text-white">What this enables:</strong><br />
                  ✅ Gemini prompt rewrites<br />
                  ✅ Risk analysis<br />
                  ✅ Text-based AI features<br />
                  ❌ Image generation (use OAuth or Flux)
                </p>
              </div>
            </div>
          )}

          {/* Replicate Flux Configuration */}
          <div className="space-y-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <h3 className="font-semibold text-white flex items-center gap-2">
              ⚡ Replicate Flux Configuration
              <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded">
                SEPARATE PROVIDER
              </span>
            </h3>
            <p className="text-sm text-gray-300">
              Configure Replicate Flux for ultra-high quality image generation
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center justify-between">
                <span>Replicate API Token</span>
                <a
                  href="https://replicate.com/account/api-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Get API Token →
                </a>
              </label>
              <input
                type="password"
                value={replicateApiToken}
                onChange={(e) => setReplicateApiToken(e.target.value)}
                placeholder="r8_..."
                className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 font-mono text-sm"
              />
            </div>

            <div className="bg-gray-900/50 p-3 rounded border border-gray-700">
              <p className="text-xs text-gray-400">
                <strong className="text-white">What this enables:</strong><br />
                ⚡ Flux 1.1 Pro Ultra (highest quality)<br />
                ⚡ Flux Dev and Schnell models<br />
                ⚡ Image-to-image generation<br />
                ⚡ Safety tolerance controls<br />
                ⚡ Raw mode for maximum fidelity<br />
                💡 Works independently of Vertex AI/Gemini
              </p>
            </div>
          </div>

          {/* Current Status */}
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Current Configuration</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Auth Method:</span>
                <span className="text-white font-mono">
                  {settings.vertexAuthMethod === 'oauth' ? 'OAuth 2.0' : 'API Key'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Project ID:</span>
                <span className="text-white font-mono text-xs">
                  {settings.projectId || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Access Token:</span>
                <span className={`font-mono text-xs ${settings.accessToken ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.accessToken ? `${settings.accessToken.substring(0, 10)}...` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">API Key:</span>
                <span className={`font-mono text-xs ${settings.vertexApiKey ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.vertexApiKey ? `${settings.vertexApiKey.substring(0, 10)}...` : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">Replicate Token:</span>
                <span className={`font-mono text-xs ${settings.replicateApiToken ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.replicateApiToken ? `${settings.replicateApiToken.substring(0, 10)}...` : 'Not set'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationSettings;
