import React, { useState } from 'react';
import { INSTAGRAM_MOODBOARDS, InstagramMoodboard } from '../vera/instagramMoodboards';
import { PromptData } from '../types';

interface QuickInstagramGeneratorProps {
  onGenerate: (prompt: string, settings: { aspectRatio: '4:5' | '9:16' | '1:1', intimacyLevel: number }) => void;
  onPopulateFields: (data: PromptData) => void;
  isLoading: boolean;
}

export const QuickInstagramGenerator: React.FC<QuickInstagramGeneratorProps> = ({
  onGenerate,
  onPopulateFields,
  isLoading
}) => {
  const [selectedMoodboard, setSelectedMoodboard] = useState<InstagramMoodboard>(INSTAGRAM_MOODBOARDS[0]);
  const [useImagen, setUseImagen] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleGenerate = () => {
    const prompt = useImagen ? selectedMoodboard.imagenPrompt : selectedMoodboard.fluxPrompt;

    console.log('📸 Generated Instagram Moodboard Prompt:', {
      name: selectedMoodboard.name,
      category: selectedMoodboard.viralCategory,
      intimacyLevel: selectedMoodboard.intimacyLevel,
      useImagen,
      promptLength: prompt.length
    });

    onGenerate(prompt, {
      aspectRatio: selectedMoodboard.aspectRatio,
      intimacyLevel: selectedMoodboard.intimacyLevel
    });
  };

  const handlePopulate = async () => {
    const { parseFluxPromptToData } = await import('../services/promptParser');

    // Always use fluxPrompt for accurate field population
    const promptData = parseFluxPromptToData(selectedMoodboard.fluxPrompt);

    onPopulateFields(promptData);
    console.log('📋 Populated JSON fields from Instagram moodboard:', selectedMoodboard.name);
  };

  const getIntimacyColor = (level: number) => {
    if (level <= 4) return 'text-green-400';
    if (level <= 6) return 'text-yellow-400';
    if (level <= 8) return 'text-orange-400';
    return 'text-red-400';
  };

  const getViralPotentialColor = (potential: string) => {
    if (potential === 'Extreme') return 'text-red-400';
    if (potential === 'Very High') return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 rounded-lg p-5 border-2 border-pink-500/50 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">📸</div>
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            Instagram Viral Moodboards
          </h3>
          <p className="text-sm text-gray-400">
            Pre-configured <strong className="text-pink-400">Indian influencer concepts</strong> optimized for viral engagement
          </p>
        </div>
      </div>

      {/* Moodboard Selection */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-pink-300 mb-2">
          🎨 Moodboard Concept
        </label>
        <div className="grid grid-cols-1 gap-3">
          {INSTAGRAM_MOODBOARDS.map((moodboard) => (
            <button
              key={moodboard.id}
              onClick={() => setSelectedMoodboard(moodboard)}
              disabled={isLoading}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedMoodboard.id === moodboard.id
                  ? 'border-pink-500 bg-pink-500/20'
                  : 'border-gray-700 hover:border-pink-500/50 bg-gray-800/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-200">{moodboard.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gray-800 ${getIntimacyColor(moodboard.intimacyLevel)}`}>
                      {moodboard.intimacyLevel}/10
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gray-800 ${getViralPotentialColor(moodboard.viralPotential)}`}>
                      🔥 {moodboard.viralPotential}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{moodboard.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
                      📐 {moodboard.aspectRatio}
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
                      💃 {moodboard.measurements}
                    </span>
                    <span className="px-2 py-1 rounded bg-pink-900/30 text-pink-400">
                      {moodboard.viralCategory}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Moodboard Details */}
      <div className="mb-5 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <h4 className="text-sm font-bold text-pink-300 mb-3">Selected: {selectedMoodboard.name}</h4>

        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
          <div>
            <span className="text-gray-500">Category:</span>
            <span className="ml-2 text-gray-300">{selectedMoodboard.viralCategory}</span>
          </div>
          <div>
            <span className="text-gray-500">Theme:</span>
            <span className="ml-2 text-gray-300">{selectedMoodboard.instagramTheme}</span>
          </div>
          <div>
            <span className="text-gray-500">Archetype:</span>
            <span className="ml-2 text-gray-300">{selectedMoodboard.influencerArchetype}</span>
          </div>
          <div>
            <span className="text-gray-500">Engagement:</span>
            <span className="ml-2 text-gray-300">{selectedMoodboard.engagementStyle}</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-gray-500 text-xs">Viral Hooks:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedMoodboard.viralHooks.map((hook, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-pink-900/30 text-pink-300">
                {hook}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <span className="text-gray-500 text-xs">Hashtags:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedMoodboard.hashtags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="text-xs text-purple-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-gray-500 text-xs">Caption Idea:</span>
          <p className="text-xs text-gray-300 mt-1 italic">"{selectedMoodboard.captionIdea}"</p>
        </div>
      </div>

      {/* Model Selection (Imagen vs Flux) */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-pink-300 mb-2">
          🤖 Model Selection
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setUseImagen(true)}
            disabled={isLoading}
            className={`p-3 rounded-lg border-2 transition-all ${
              useImagen
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                : 'border-gray-700 hover:border-emerald-500/50 text-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">🎨</div>
              <div className="font-bold text-sm">Imagen 4</div>
              <div className="text-xs opacity-75">Google Vertex AI</div>
            </div>
          </button>
          <button
            onClick={() => setUseImagen(false)}
            disabled={isLoading}
            className={`p-3 rounded-lg border-2 transition-all ${
              !useImagen
                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                : 'border-gray-700 hover:border-purple-500/50 text-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">⚡</div>
              <div className="font-bold text-sm">Flux Pro Ultra</div>
              <div className="text-xs opacity-75">Replicate</div>
            </div>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <>⏳ Generating...</>
          ) : (
            <>🚀 Generate {useImagen ? 'Imagen' : 'Flux'}</>
          )}
        </button>
        <button
          onClick={handlePopulate}
          disabled={isLoading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📋 Populate Fields
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {showPreview ? '👁️ Hide' : '👁️ Preview'}
        </button>
      </div>

      {/* Prompt Preview */}
      {showPreview && (
        <div className="mt-4 p-4 bg-gray-900/80 rounded-lg border border-gray-700 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-pink-300">
              {useImagen ? 'Imagen 4 Prompt Preview' : 'Flux Prompt Preview'}
            </h4>
            <span className="text-xs text-gray-500">
              {(useImagen ? selectedMoodboard.imagenPrompt : selectedMoodboard.fluxPrompt).length} chars
            </span>
          </div>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
            {useImagen ? selectedMoodboard.imagenPrompt : selectedMoodboard.fluxPrompt}
          </pre>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-4 p-3 bg-pink-900/20 border border-pink-500/30 rounded-lg">
        <div className="flex gap-2">
          <div className="text-pink-400 text-xl flex-shrink-0">💡</div>
          <div className="text-xs text-pink-200/80">
            <p className="font-semibold mb-1">Instagram-Optimized Concepts:</p>
            <ul className="space-y-0.5">
              <li>✅ Viral bedroom mirror selfie aesthetics</li>
              <li>✅ Indian influencer models with 36-26-38+ measurements</li>
              <li>✅ Pre-configured lighting & environments</li>
              <li>✅ Intimacy levels 7-10 for bold content</li>
              <li>✅ Direct generate or populate for customization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInstagramGenerator;
