import React, { useState, useCallback } from 'react';
import { generateImage } from '../services';
import type { GenerationSettings } from '../types';

const CustomPromptGenerator: React.FC = () => {
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [authMethod, setAuthMethod] = useState<'apikey' | 'vertexai'>('apikey');
  const [settings, setSettings] = useState<GenerationSettings>({
    numImages: 1,
    aspectRatio: '9:16',
    imagenModel: 'imagen-4.0-generate-001',
  });

  // Check auth method on mount
  React.useEffect(() => {
    const method = (localStorage.getItem('vera_auth_method') as 'apikey' | 'vertexai') || 'apikey';
    setAuthMethod(method);

    const savedModel = localStorage.getItem('vera_imagen_model') as GenerationSettings['imagenModel'];
    if (savedModel) {
      setSettings(prev => ({ ...prev, imagenModel: savedModel }));
    }

    // Listen for auth method changes
    const handleStorageChange = () => {
      const newMethod = (localStorage.getItem('vera_auth_method') as 'apikey' | 'vertexai') || 'apikey';
      setAuthMethod(newMethod);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!customPrompt.trim()) {
      setError('Please enter a prompt to generate');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const imagePromises = Array.from({ length: settings.numImages }).map(() =>
        generateImage(customPrompt, settings)
      );

      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Generation failed: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [customPrompt, settings]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  const handleSettingsChange = (field: keyof GenerationSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'imagenModel') {
      localStorage.setItem('vera_imagen_model', value);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            Custom Prompt Generator
          </h2>
        </div>

        <p className="text-slate-300 text-sm mb-6">
          Type any prompt directly and generate images. Perfect for quick tests or custom creative ideas.
        </p>

        {/* Prompt Input */}
        <div className="mb-6">
          <label htmlFor="custom-prompt" className="block text-sm font-medium text-slate-300 mb-2">
            Enter Your Custom Prompt
          </label>
          <textarea
            id="custom-prompt"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'A stunning Indian woman in elegant designer dress, professional photography, dramatic lighting...'"
            rows={6}
            className="w-full p-4 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none placeholder:text-slate-500"
            disabled={isLoading}
          />
          <p className="text-xs text-slate-400 mt-2">
            💡 <strong>Tip:</strong> Press Ctrl+Enter to generate quickly
          </p>
        </div>

        {/* Settings Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Aspect Ratio
            </label>
            <select
              value={settings.aspectRatio}
              onChange={(e) => handleSettingsChange('aspectRatio', e.target.value)}
              disabled={isLoading}
              className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-slate-200 [&>option]:bg-slate-900"
            >
              <option value="9:16">Portrait (9:16)</option>
              <option value="3:4">Portrait (3:4)</option>
              <option value="1:1">Square (1:1)</option>
              <option value="4:3">Landscape (4:3)</option>
              <option value="16:9">Landscape (16:9)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Number of Images
            </label>
            <input
              type="number"
              min={1}
              max={4}
              value={settings.numImages}
              onChange={(e) => handleSettingsChange('numImages', parseInt(e.target.value))}
              disabled={isLoading}
              className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {authMethod === 'vertexai' && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Imagen Model
              </label>
              <select
                value={settings.imagenModel || 'imagen-4.0-generate-001'}
                onChange={(e) => handleSettingsChange('imagenModel', e.target.value)}
                disabled={isLoading}
                className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-slate-200 [&>option]:bg-slate-900"
              >
                <option value="imagen-4.0-generate-001">Imagen 4 (Standard)</option>
                <option value="imagen-4.0-ultra-generate-001">Imagen 4 Ultra (Highest Quality)</option>
                <option value="imagen-4.0-fast-generate-001">Imagen 4 Fast (Lower Cost)</option>
              </select>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !customPrompt.trim()}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
          >
            {isLoading ? 'Generating...' : `Generate ${settings.numImages} Image(s)`}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Results Grid */}
      {generatedImages.length > 0 && (
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">Generated Images</h3>
          <div className={`grid gap-6 ${generatedImages.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-2xl mx-auto'}`}>
            {generatedImages.map((img, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                <img
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`Generated ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPromptGenerator;
