import React, { useState } from 'react';
import { fluxPromptLibrary, FluxPromptTemplate } from '../concepts/fluxPromptLibrary';
import { PromptData } from '../types';

interface FluxPromptLibrarySelectorProps {
  onSelectPrompt: (prompt: FluxPromptTemplate) => void;
  onPopulateFields: (data: PromptData) => void;
}

const CATEGORY_INFO = {
  corporate: { label: 'Corporate Power', icon: '💼', color: 'blue' },
  artistic: { label: 'Artistic Studio', icon: '🎨', color: 'purple' },
  editorial: { label: 'Editorial Fashion', icon: '📸', color: 'pink' },
  architectural: { label: 'Architectural Form', icon: '🏛️', color: 'gray' },
  creative: { label: 'Creative Industry', icon: '🎬', color: 'orange' }
};

const FluxPromptLibrarySelector: React.FC<FluxPromptLibrarySelectorProps> = ({ onSelectPrompt, onPopulateFields }) => {
  const [selectedCategory, setSelectedCategory] = useState<FluxPromptTemplate['category'] | 'all'>('all');
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);
  const [generatedVariants, setGeneratedVariants] = useState<Map<string, FluxPromptTemplate[]>>(new Map());
  const [showingVariantsFor, setShowingVariantsFor] = useState<string | null>(null);

  const filteredPrompts = selectedCategory === 'all'
    ? fluxPromptLibrary
    : fluxPromptLibrary.filter(p => p.category === selectedCategory);

  const getCategoryColorClasses = (category: FluxPromptTemplate['category'], isSelected: boolean) => {
    const colors = {
      blue: isSelected ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'border-gray-700 hover:border-blue-500/50 text-gray-400',
      purple: isSelected ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-gray-700 hover:border-purple-500/50 text-gray-400',
      pink: isSelected ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'border-gray-700 hover:border-pink-500/50 text-gray-400',
      gray: isSelected ? 'bg-gray-500/20 border-gray-500 text-gray-300' : 'border-gray-700 hover:border-gray-500/50 text-gray-400',
      orange: isSelected ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'border-gray-700 hover:border-orange-500/50 text-gray-400',
    };
    return colors[CATEGORY_INFO[category].color as keyof typeof colors];
  };

  const getIntimacyColor = (level: number) => {
    if (level <= 4) return 'text-green-400';
    if (level <= 6) return 'text-yellow-400';
    if (level <= 8) return 'text-orange-400';
    return 'text-red-400';
  };

  const truncatePrompt = (prompt: string, maxLength: number = 150) => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.substring(0, maxLength) + '...';
  };

  const handlePopulateFields = async (template: FluxPromptTemplate) => {
    const { parseFluxPromptToData } = await import('../services/promptParser');
    const promptData = parseFluxPromptToData(template.prompt);
    onPopulateFields(promptData);
    console.log('📋 Populated JSON fields from Flux prompt:', template.name);
  };

  const handleGenerateVariants = async (template: FluxPromptTemplate) => {
    const { generateMultipleVariants } = await import('../services/variantGenerator');
    const variants = generateMultipleVariants(template, 3);

    setGeneratedVariants(prev => {
      const newMap = new Map(prev);
      newMap.set(template.id, variants);
      return newMap;
    });

    setShowingVariantsFor(template.id);
    console.log(`🎲 Generated ${variants.length} variants for:`, template.name);
  };

  const handleCloseVariants = () => {
    setShowingVariantsFor(null);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">Flux Prompt Library</h3>
        <span className="text-xs text-gray-500">({fluxPromptLibrary.length} battle-tested prompts)</span>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Select from pre-optimized prompts with <strong className="text-cyan-400">95%+ success rate</strong>.
        These use minimalist structures proven to bypass Flux NSFW filters.
      </p>

      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
              : 'border-gray-700 hover:border-cyan-500/50 text-gray-400'
          }`}
        >
          All Categories
        </button>
        {(Object.keys(CATEGORY_INFO) as Array<FluxPromptTemplate['category']>).map((cat) => {
          const info = CATEGORY_INFO[cat];
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${getCategoryColorClasses(cat, selectedCategory === cat)}`}
            >
              <span className="mr-1">{info.icon}</span>
              {info.label}
            </button>
          );
        })}
      </div>

      {/* Prompts Grid */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {filteredPrompts.map((prompt) => {
          const categoryInfo = CATEGORY_INFO[prompt.category];
          const isExpanded = expandedPromptId === prompt.id;

          return (
            <div
              key={prompt.id}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{categoryInfo.icon}</span>
                    <h4 className="font-semibold text-gray-200">{prompt.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gray-800 ${getIntimacyColor(prompt.intimacyLevel)}`}>
                      Intimacy {prompt.intimacyLevel}/10
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>📐 {prompt.aspectRatio}</span>
                    <span>🛡️ Safety {prompt.safetyTolerance}/6</span>
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                      {categoryInfo.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 font-mono mb-2">
                    {isExpanded ? prompt.prompt : truncatePrompt(prompt.prompt)}
                  </p>

                  <button
                    onClick={() => setExpandedPromptId(isExpanded ? null : prompt.id)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {isExpanded ? '▲ Show less' : '▼ Show full prompt'}
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onSelectPrompt(prompt)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Use This
                  </button>
                  <button
                    onClick={() => handlePopulateFields(prompt)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    📋 Populate
                  </button>
                  <button
                    onClick={() => handleGenerateVariants(prompt)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    🎲 Variants
                  </button>
                </div>
              </div>

              {/* Show variants if generated */}
              {showingVariantsFor === prompt.id && generatedVariants.get(prompt.id) && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-semibold text-purple-300">
                      🎲 Generated Variants ({generatedVariants.get(prompt.id)!.length})
                    </h5>
                    <button
                      onClick={handleCloseVariants}
                      className="text-xs text-gray-400 hover:text-gray-300"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <div className="space-y-2">
                    {generatedVariants.get(prompt.id)!.map((variant, idx) => (
                      <div key={variant.id} className="bg-gray-800/50 p-2 rounded border border-purple-500/30">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-300 font-semibold">Variant {idx + 1}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => onSelectPrompt(variant)}
                              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded transition-colors"
                            >
                              Use
                            </button>
                            <button
                              onClick={() => handlePopulateFields(variant)}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded transition-colors"
                            >
                              Populate
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-mono line-clamp-2">
                          {truncatePrompt(variant.prompt, 100)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredPrompts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No prompts found in this category.
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-xs">
            <p className="text-cyan-300 font-semibold mb-1">Why these work:</p>
            <ul className="text-cyan-200/80 space-y-1">
              <li>✅ Minimalist pose/environment descriptions (no explicit language)</li>
              <li>✅ Architectural wardrobe terms (avoid "revealing", "exposed")</li>
              <li>✅ Technical photography specs (camera, lighting)</li>
              <li>✅ Professional context framing (corporate, artistic, editorial)</li>
              <li>❌ No safety disclaimers (they trigger Flux filters!)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluxPromptLibrarySelector;
