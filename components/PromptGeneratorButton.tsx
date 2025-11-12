/**
 * PROMPT GENERATOR BUTTON COMPONENT
 *
 * Reusable component for AI-powered prompt generation
 * Supports both Imagen 4 and Flux optimization strategies
 */

import React, { useState } from 'react';
import type { PromptData } from '../types';
import { generateOptimizedPrompt, type PromptModel } from '../services/aiPromptGenerator';

interface PromptGeneratorButtonProps {
  promptData: PromptData;
  accessToken: string;
  onPromptGenerated?: (prompt: string, model: PromptModel) => void;
  disabled?: boolean;
  className?: string;
}

export default function PromptGeneratorButton({
  promptData,
  accessToken,
  onPromptGenerated,
  disabled = false,
  className = ''
}: PromptGeneratorButtonProps) {
  const [selectedModel, setSelectedModel] = useState<PromptModel>('imagen4');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!accessToken) {
      setError('Access token required. Please configure in settings.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedPrompt('');

    try {
      const prompt = await generateOptimizedPrompt(promptData, {
        model: selectedModel,
        accessToken
      });

      setGeneratedPrompt(prompt);
      setShowPrompt(true);

      if (onPromptGenerated) {
        onPromptGenerated(prompt, selectedModel);
      }
    } catch (err: any) {
      console.error('Error generating prompt:', err);
      setError(err.message || 'Failed to generate prompt');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  const handleClose = () => {
    setShowPrompt(false);
    setError('');
  };

  return (
    <>
      {/* Main Button with Model Selector */}
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Model Selector */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as PromptModel)}
          disabled={disabled || isGenerating}
          className="px-3 py-2 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-white text-sm font-semibold rounded-lg border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="imagen4">Imagen 4</option>
          <option value="flux">Flux</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={disabled || isGenerating}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-300">❌ {error}</p>
        </div>
      )}

      {/* Prompt Display Modal */}
      {showPrompt && generatedPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-2 border-purple-500/30 rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generated {selectedModel === 'imagen4' ? 'Imagen 4' : 'Flux'} Prompt
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  AI-optimized prompt ready to use ({generatedPrompt.length} characters)
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Prompt Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-black/40 border border-purple-500/20 rounded-lg p-4">
                <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>

              {/* Model-Specific Tips */}
              <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">
                  {selectedModel === 'imagen4' ? '🎨 Imagen 4 Optimizations' : '⚡ Flux Optimizations'}
                </h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  {selectedModel === 'imagen4' ? (
                    <>
                      <li>✅ Includes Art Director declaration for RAI bypass</li>
                      <li>✅ Verbose technical details (8K, fabric physics, skin micro-details)</li>
                      <li>✅ Professional context framing with photographer references</li>
                      <li>✅ Emphasis on natural detail and authentic texture</li>
                      <li>✅ Architectural/sculptural language for intimate elements</li>
                    </>
                  ) : (
                    <>
                      <li>✅ Concise fine art photography framing</li>
                      <li>✅ Minimal safety language (verbose declarations trigger filters)</li>
                      <li>✅ Chiaroscuro lighting and compositional focus</li>
                      <li>✅ Natural fashion/editorial language</li>
                      <li>✅ Museum-quality composition emphasis</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-6 border-t border-purple-500/30">
              <div className="text-xs text-gray-500">
                Model: <span className="font-semibold text-purple-400">
                  {selectedModel === 'imagen4' ? 'Imagen 4 (Vertex AI)' : 'Flux (Replicate)'}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyToClipboard}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  📋 Copy to Clipboard
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
