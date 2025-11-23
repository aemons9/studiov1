/**
 * Visual Novel Mode Component
 * Character and asset generator for visual novel development
 */

import React, { useState } from 'react';
import type { GenerationSettings } from '../types';
import type { VNCharacter, VNExpression, VNPose, VNOutfit, VNBackground, VNGeneratedAsset } from './types';
import { VN_EXPRESSIONS, VN_POSES, VN_OUTFITS, VN_BACKGROUNDS, DEFAULT_VN_CHARACTER } from './constants';
import { generateImage } from '../services/geminiService';

interface VNModeProps {
  onExit: () => void;
  generationSettings: GenerationSettings;
}

const VNMode: React.FC<VNModeProps> = ({ onExit, generationSettings }) => {
  const [character, setCharacter] = useState<VNCharacter>(DEFAULT_VN_CHARACTER);
  const [selectedExpression, setSelectedExpression] = useState<VNExpression>(VN_EXPRESSIONS[0]);
  const [selectedPose, setSelectedPose] = useState<VNPose>(VN_POSES[0]);
  const [selectedOutfit, setSelectedOutfit] = useState<VNOutfit>(VN_OUTFITS[0]);
  const [selectedBackground, setSelectedBackground] = useState<VNBackground | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('3:4');
  const [generatedAssets, setGeneratedAssets] = useState<VNGeneratedAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const constructVNPrompt = (): string => {
    const parts: string[] = [];

    // Base character
    parts.push(character.baseModel);

    // Expression
    parts.push(selectedExpression.promptModifier);

    // Pose
    parts.push(selectedPose.promptModifier);

    // Outfit
    parts.push(selectedOutfit.promptModifier);

    // Background
    if (selectedBackground) {
      parts.push(`against ${selectedBackground.prompt}`);
    }

    // Visual Novel style directive
    parts.push('in visual novel character art style, anime aesthetic, clean lines, cel-shaded coloring, professional visual novel character sprite');

    return parts.join(', ');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = constructVNPrompt();
      console.log('🎨 Generating VN asset with prompt:', prompt);

      const images = await generateImage(prompt, {
        ...generationSettings,
        aspectRatio: aspectRatio,
        numberOfImages: 1,
      });

      if (images && images.length > 0) {
        const newAsset: VNGeneratedAsset = {
          id: Date.now().toString(),
          url: images[0],
          prompt: prompt,
          timestamp: new Date().toISOString(),
          character: character.name,
          expression: selectedExpression.name,
          pose: selectedPose.name,
        };

        setGeneratedAssets(prev => [newAsset, ...prev]);
      }
    } catch (err) {
      console.error('VN asset generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate VN asset');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <div>
              <h1 className="text-2xl font-bold">Visual Novel Mode</h1>
              <p className="text-sm text-gray-400">Character & Asset Generator</p>
            </div>
          </div>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit to Classic Mode
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Character Info */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>👤</span> Character
            </h2>
            <div>
              <p className="text-lg font-semibold text-purple-300">{character.name}</p>
              <p className="text-sm text-gray-400">{character.description}</p>
            </div>
          </div>

          {/* Expression Selector */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>😊</span> Expression
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {VN_EXPRESSIONS.map(expr => (
                <button
                  key={expr.id}
                  onClick={() => setSelectedExpression(expr)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedExpression.id === expr.id
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold">{expr.name}</div>
                  <div className="text-xs text-gray-300 mt-1">{expr.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pose Selector */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🧍</span> Pose
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {VN_POSES.map(pose => (
                <button
                  key={pose.id}
                  onClick={() => setSelectedPose(pose)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedPose.id === pose.id
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold">{pose.name}</div>
                  <div className="text-xs text-gray-300 mt-1">{pose.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Outfit Selector */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>👔</span> Outfit
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {VN_OUTFITS.map(outfit => (
                <button
                  key={outfit.id}
                  onClick={() => setSelectedOutfit(outfit)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedOutfit.id === outfit.id
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold">{outfit.name}</div>
                  <div className="text-xs text-gray-300 mt-1">{outfit.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Selector */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🏞️</span> Background (Optional)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setSelectedBackground(null)}
                className={`p-3 rounded-lg transition-all ${
                  selectedBackground === null
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                }`}
              >
                <div className="font-semibold">None</div>
              </button>
              {VN_BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg)}
                  className={`p-3 rounded-lg transition-all ${
                    selectedBackground?.id === bg.id
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold text-sm">{bg.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4">📐 Aspect Ratio</h2>
            <div className="flex gap-3 flex-wrap">
              {(['1:1', '3:4', '4:3', '9:16', '16:9'] as const).map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    aspectRatio === ratio
                      ? 'bg-purple-600 border-2 border-purple-400'
                      : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating VN Asset...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Character Asset
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-xl p-4">
              <p className="text-red-200"><strong>Error:</strong> {error}</p>
            </div>
          )}
        </div>

        {/* Preview & Gallery */}
        <div className="space-y-6">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4">🖼️ Generated Assets</h2>
            <div className="space-y-4">
              {generatedAssets.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>No assets generated yet</p>
                  <p className="text-sm mt-2">Configure your character and click generate!</p>
                </div>
              ) : (
                generatedAssets.map(asset => (
                  <div key={asset.id} className="bg-gray-900/50 rounded-lg overflow-hidden">
                    <img src={asset.url} alt={asset.character} className="w-full" />
                    <div className="p-3 space-y-1">
                      <p className="text-sm font-semibold text-purple-300">{asset.character}</p>
                      <p className="text-xs text-gray-400">{asset.expression} • {asset.pose}</p>
                      <p className="text-xs text-gray-500">{new Date(asset.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VNMode;
