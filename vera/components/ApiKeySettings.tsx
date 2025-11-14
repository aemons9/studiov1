import React, { useState, useEffect } from 'react';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing API key from localStorage
    const stored = localStorage.getItem('vera_api_key');
    if (stored) {
      setApiKey(stored);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('vera_api_key', apiKey.trim());
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('vera_api_key');
    setApiKey('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">
          Google AI API Key
        </h2>

        <p className="text-slate-400 text-sm mb-4">
          Vera requires a Google AI API key to access Gemini, Imagen 4, and Veo 3.1 models.
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

        <div className="mb-4">
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

        {saved && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-700 text-green-300 rounded-lg text-sm">
            ✓ API Key saved successfully!
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-teal-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300"
          >
            Save Key
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
