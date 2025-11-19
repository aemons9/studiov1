import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';
import type { GenerationSettings } from '../types';

interface QuickDirectGenerateProps {
  generationSettings: GenerationSettings;
  onGenerationComplete?: (imageUrls: string[]) => void;
}

const QuickDirectGenerate: React.FC<QuickDirectGenerateProps> = ({
  generationSettings,
  onGenerationComplete
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setGeneratedImage(null);

      console.log('🚀 Quick Direct Generate with safety strategies:', prompt);

      // Wrap prompt with Art Director's Declaration for safety
      const safePrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}\n\n${prompt}\n\nTechnical Specifications: Ultra-premium 8K+ ultra-high-resolution capture with exceptional detail and clarity. Professional color grading maintaining authentic skin tones and natural material properties. Museum-quality archival standards with authentic texture preservation throughout. Realistic fabric physics following natural gravity and draping. Authentic skin micro-details with visible pores, no artificial smoothing or plastic appearance. Real human skin with all its beautiful natural variation.`;

      // Generate with Imagen 4 using safety-wrapped prompt
      const imageUrls = await generateImage(safePrompt, {
        ...generationSettings,
        numberOfImages: 1,
        aspectRatio: '3:4',
        modelId: 'imagen-4.0-generate-001',
        personGeneration: 'allow_adult',
        safetySetting: 'block_few'
      });

      if (imageUrls && imageUrls.length > 0) {
        // Convert base64 to data URL for display
        const imageUrl = `data:image/png;base64,${imageUrls[0]}`;
        setGeneratedImage(imageUrl);
        if (onGenerationComplete) {
          onGenerationComplete(imageUrls);
        }
      } else {
        setError('Generation failed - no image returned');
      }
    } catch (err) {
      console.error('Quick generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">⚡</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Quick Direct Generate
            <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs font-bold">INSTANT</span>
          </h2>
          <p className="text-sm text-purple-200">
            Direct text-to-image with all safety strategies enabled automatically
          </p>
        </div>
      </div>

      {/* Safety Badge */}
      <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-green-300 text-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Safety Strategies Active:</span>
          <span className="text-xs">Art Director Declarations • Professional Context • Museum Quality Standards</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-purple-200 mb-2">
            Enter your prompt:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Example: Indian model in elegant evening gown at luxury hotel lobby..."
            className="w-full bg-gray-900/50 text-white border border-purple-500/50 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 resize-none"
            rows={3}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-400 mt-1">
            Tip: Press Ctrl+Enter to generate quickly
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating with Safety Strategies...
            </>
          ) : (
            <>
              ⚡ Generate Now
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generated Image Display */}
      {generatedImage && (
        <div className="mt-4 space-y-3">
          <div className="bg-gray-900/50 border border-purple-500/50 rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-auto"
            />
          </div>
          <a
            href={generatedImage}
            download={`veralabs-quick-${Date.now()}.png`}
            className="block w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            💾 Download Image
          </a>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-4 pt-4 border-t border-purple-500/30">
        <div className="text-xs text-gray-400 space-y-1">
          <p>✅ Automatic Art Director's Declaration included</p>
          <p>✅ Professional context framing applied</p>
          <p>✅ Museum-quality standards enforced</p>
          <p>✅ All safety strategies from main page active</p>
        </div>
      </div>
    </div>
  );
};

export default QuickDirectGenerate;
