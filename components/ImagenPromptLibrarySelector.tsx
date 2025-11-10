import React, { useState } from 'react';
import { imagenPromptLibrary, ImagenPromptTemplate } from '../concepts/imagenPromptLibrary';
import { PromptData } from '../types';

interface ImagenPromptLibrarySelectorProps {
  onSelectPrompt: (prompt: ImagenPromptTemplate) => void;
  onPopulateFields: (data: PromptData) => void;
}

const CATEGORY_INFO = {
  corporate: { label: 'Corporate Power', icon: '💼', color: 'blue' },
  artistic: { label: 'Artistic Studio', icon: '🎨', color: 'purple' },
  editorial: { label: 'Editorial Fashion', icon: '📸', color: 'pink' },
  architectural: { label: 'Architectural Form', icon: '🏛️', color: 'gray' },
  creative: { label: 'Creative Industry', icon: '🎬', color: 'orange' }
};

const ImagenPromptLibrarySelector: React.FC<ImagenPromptLibrarySelectorProps> = ({ onSelectPrompt, onPopulateFields }) => {
  const [selectedCategory, setSelectedCategory] = useState<ImagenPromptTemplate['category'] | 'all'>('all');
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);

  const filteredPrompts = selectedCategory === 'all'
    ? imagenPromptLibrary
    : imagenPromptLibrary.filter(p => p.category === selectedCategory);

  const getCategoryColorClasses = (category: ImagenPromptTemplate['category'], isSelected: boolean) => {
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

  const truncatePrompt = (prompt: string, maxLength: number = 200) => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.substring(0, maxLength) + '...';
  };

  const handlePopulateFields = async (template: ImagenPromptTemplate) => {
    const { parseFluxPromptToData } = await import('../services/promptParser');
    // Extract the base prompt after the art director declaration
    const basePrompt = template.prompt.split('\n\n').slice(1).join('\n\n');
    const promptData = parseFluxPromptToData(basePrompt);
    onPopulateFields(promptData);
    console.log('📋 Populated JSON fields from Imagen prompt:', template.name);
  };

  const handleUsePrompt = (template: ImagenPromptTemplate) => {
    onSelectPrompt(template);
    console.log('🎨 Selected Imagen prompt:', template.name);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">Imagen 4 Prompt Library</h3>
        <span className="text-xs text-gray-500">({imagenPromptLibrary.length} optimized prompts)</span>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Select from Imagen 4-optimized prompts with <strong className="text-emerald-400">Art Director declarations</strong>.
        Enhanced with technical details for Google's Imagen 4 model.
      </p>

      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'border-gray-700 hover:border-emerald-500/50 text-gray-400'
          }`}
        >
          All Categories
        </button>
        {(Object.keys(CATEGORY_INFO) as Array<ImagenPromptTemplate['category']>).map((cat) => {
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
          // Extract first ~200 chars after art director declaration
          const promptPreview = prompt.prompt.split('\n\n').slice(1).join('\n\n');

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
                    <span>🎭 Art Director ✓</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400">
                      Imagen 4
                    </span>
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                      {categoryInfo.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 font-mono mb-2">
                    {isExpanded ? prompt.prompt : truncatePrompt(promptPreview)}
                  </p>

                  <button
                    onClick={() => setExpandedPromptId(isExpanded ? null : prompt.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {isExpanded ? '▲ Show less' : '▼ Show full prompt'}
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleUsePrompt(prompt)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Use This
                  </button>
                  <button
                    onClick={() => handlePopulateFields(prompt)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    📋 Populate
                  </button>
                </div>
              </div>
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
      <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-xs">
            <p className="text-emerald-300 font-semibold mb-1">Imagen 4 Optimizations:</p>
            <ul className="text-emerald-200/80 space-y-1">
              <li>✅ Art Director safety declarations (verbose professional context)</li>
              <li>✅ Enhanced 8K+ technical details and specifications</li>
              <li>✅ Skin micro-details emphasis (Imagen's strength)</li>
              <li>✅ Fabric physics and material properties</li>
              <li>✅ Natural detail language (no artificial smoothing)</li>
              <li>✅ Museum-quality archival standards framing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagenPromptLibrarySelector;
