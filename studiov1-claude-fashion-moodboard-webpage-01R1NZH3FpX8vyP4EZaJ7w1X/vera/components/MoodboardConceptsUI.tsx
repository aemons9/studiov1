import React, { useState } from 'react';
import { MOODBOARD_CONCEPTS, MOODBOARD_CATEGORIES, MoodboardConcept } from '../moodboardConcepts';
import { generateImage } from '../services';
import type { GenerationSettings } from '../types';

interface MoodboardConceptsUIProps {
  onGenerateImage?: (prompt: string, settings: Partial<GenerationSettings>) => Promise<void>;
  isLoading?: boolean;
}

const MoodboardConceptsUI: React.FC<MoodboardConceptsUIProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConcept, setSelectedConcept] = useState<MoodboardConcept | null>(null);
  const [promptType, setPromptType] = useState<'flux' | 'imagen'>('imagen');
  const [showDetails, setShowDetails] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<'apikey' | 'vertexai'>('apikey');

  const filteredConcepts = selectedCategory === 'all'
    ? MOODBOARD_CONCEPTS
    : MOODBOARD_CATEGORIES[selectedCategory as keyof typeof MOODBOARD_CATEGORIES]?.concepts || [];

  // Debug logging
  React.useEffect(() => {
    console.log('🎨 MoodboardConceptsUI Mounted');
    console.log('Total Concepts:', MOODBOARD_CONCEPTS.length);
    console.log('Filtered Concepts:', filteredConcepts.length);
    console.log('Categories:', Object.keys(MOODBOARD_CATEGORIES));
  }, [filteredConcepts]);

  // Check auth method on mount
  React.useEffect(() => {
    const method = (localStorage.getItem('vera_auth_method') as 'apikey' | 'vertexai') || 'apikey';
    setAuthMethod(method);
  }, []);

  const handleGenerateConcept = async (concept: MoodboardConcept) => {
    console.log('🎨 Generate button clicked for:', concept.name);

    try {
      setIsLoading(true);
      setError(null);
      setGeneratedImages([]);

      const prompt = promptType === 'flux' ? concept.fluxPrompt : concept.imagenPrompt;

      // Map aspect ratios to Imagen 4 supported values
      // 4:5 -> 3:4 (closest portrait ratio)
      let aspectRatio = concept.aspectRatio;
      if (aspectRatio === '4:5') {
        aspectRatio = '3:4';
      }

      const settings: GenerationSettings = {
        numImages: 1,
        aspectRatio: aspectRatio as any,
        imagenModel: 'imagen-4.0-generate-001',
      };

      console.log('🚀 Generating moodboard concept:', { concept: concept.name, promptType, aspectRatio, prompt: prompt.substring(0, 100) + '...' });

      const imageUrl = await generateImage(prompt, settings);
      // generateImage returns a single string, not an array
      setGeneratedImages([imageUrl]);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('moodboard-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Moodboard generation error:', err);
      setError(err.message || 'Failed to generate image. Please check your API key settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'minimalist-luxury': '#C9B8A3',
      'urban-contemporary': '#FFC857',
      'natural-glamour': '#84A59D',
      'artistic-sensuality': '#8B0000'
    };
    return colors[category] || '#d4af37';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-light text-white mb-2">Pre-Built Fashion Moodboards</h2>
        <p className="text-gray-400 text-sm">
          Professional editorial concepts featuring Indian models with diverse aesthetics
        </p>
      </div>

      {/* Settings Row */}
      <div className="flex gap-4 items-center bg-gray-900 p-4 rounded-lg border border-gray-700">
        {/* Prompt Type Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Model:</label>
          <select
            value={promptType}
            onChange={(e) => setPromptType(e.target.value as 'flux' | 'imagen')}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm"
          >
            <option value="imagen">Imagen 4 (Google)</option>
            <option value="flux">Flux Pro Ultra (Replicate)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm text-gray-400">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm flex-1"
          >
            <option value="all">All Concepts ({MOODBOARD_CONCEPTS.length})</option>
            {Object.entries(MOODBOARD_CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.name} ({cat.concepts.length})
              </option>
            ))}
          </select>
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded border border-gray-600 hover:bg-gray-700 text-sm"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredConcepts.map((concept) => (
          <div
            key={concept.id}
            className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/20"
          >
            {/* Concept Preview */}
            <div
              className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => setSelectedConcept(selectedConcept?.id === concept.id ? null : concept)}
            >
              {concept.previewImage ? (
                <>
                  {/* Preview Image */}
                  <img
                    src={concept.previewImage}
                    alt={concept.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-light">View Details</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Color Gradient Background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${concept.colorPalette[0]}, ${concept.colorPalette[2]})`
                    }}
                  />

                  {/* Concept Icon */}
                  <div className="relative text-6xl opacity-40">
                    {concept.category.includes('Minimalist') && '🌅'}
                    {concept.category.includes('Cultural') && '🌧️'}
                    {concept.category.includes('Urban') && (concept.name.includes('Bombay') ? '🌃' : '🌇')}
                    {concept.category.includes('Natural') && '🏖️'}
                    {concept.category.includes('Artistic') && (concept.name.includes('Palace') ? '👑' : '🌿')}
                  </div>
                </>
              )}

              {/* Intimacy Badge */}
              <div className="absolute top-2 right-2 bg-black/80 text-yellow-500 px-2 py-1 rounded text-xs border border-yellow-500/50">
                Editorial {concept.intimacyLevel}/10
              </div>
            </div>

            {/* Concept Info */}
            <div className="p-4 space-y-3">
              {/* Title & Category */}
              <div>
                <h3 className="text-lg font-light text-white mb-1">{concept.name}</h3>
                <p className="text-xs text-yellow-500 uppercase tracking-wider">{concept.category}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 line-clamp-2">{concept.description}</p>

              {/* Color Palette */}
              <div className="flex gap-2">
                {concept.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded border border-gray-600"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded border border-gray-700">
                  {concept.editorialStyle}
                </span>
                {concept.seasonalTheme && (
                  <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded border border-gray-700">
                    {concept.seasonalTheme}
                  </span>
                )}
              </div>

              {/* Expanded Details */}
              {showDetails && selectedConcept?.id === concept.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Aesthetic Inspiration</p>
                    <p className="text-sm text-gray-300">{concept.aestheticInspiration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Target Publication</p>
                    <p className="text-sm text-gray-300">{concept.targetPublication}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Model Archetype</p>
                    <p className="text-sm text-gray-300">{concept.modelArchetype}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Aspect Ratio</p>
                    <p className="text-sm text-gray-300">{concept.aspectRatio}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleGenerateConcept(concept)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-yellow-600 text-black rounded-lg font-bold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base shadow-lg hover:shadow-xl"
                >
                  {isLoading ? '⏳ Generating...' : '✨ Generate Image'}
                </button>
                <button
                  onClick={() => setSelectedConcept(selectedConcept?.id === concept.id ? null : concept)}
                  className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-base"
                >
                  {selectedConcept?.id === concept.id ? '🔼 Less' : '🔽 More'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Concept Detailed View */}
      {selectedConcept && showDetails && (
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-600 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-light text-white mb-2">{selectedConcept.name}</h3>
              <p className="text-yellow-500 uppercase text-sm tracking-wider">{selectedConcept.category}</p>
            </div>
            <button
              onClick={() => setSelectedConcept(null)}
              className="text-gray-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 uppercase text-xs mb-1">Editorial Style</p>
              <p className="text-white">{selectedConcept.editorialStyle}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs mb-1">Season/Theme</p>
              <p className="text-white">{selectedConcept.seasonalTheme || 'Timeless'}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs mb-1">Intimacy Level</p>
              <p className="text-white">{selectedConcept.intimacyLevel}/10 - Editorial</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-xs mb-1">Aspect Ratio</p>
              <p className="text-white">{selectedConcept.aspectRatio}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 uppercase text-xs mb-2">Full Prompt Preview ({promptType})</p>
            <div className="bg-gray-800 p-4 rounded border border-gray-700 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                {promptType === 'flux' ? selectedConcept.fluxPrompt : selectedConcept.imagenPrompt}
              </pre>
            </div>
          </div>

          <button
            onClick={() => handleGenerateConcept(selectedConcept)}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-yellow-600 text-black rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Generating Image...' : `Generate with ${promptType === 'flux' ? 'Flux Pro Ultra' : 'Imagen 4'}`}
          </button>
        </div>
      )}

      {/* Category Description */}
      {selectedCategory !== 'all' && (
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-white mb-2">
            {MOODBOARD_CATEGORIES[selectedCategory as keyof typeof MOODBOARD_CATEGORIES]?.name}
          </h4>
          <p className="text-sm text-gray-400">
            {MOODBOARD_CATEGORIES[selectedCategory as keyof typeof MOODBOARD_CATEGORIES]?.description}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-gray-900 p-12 rounded-lg border border-yellow-600 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-white font-medium">Generating Editorial Image...</p>
            <p className="text-sm text-gray-400">Using {promptType === 'flux' ? 'Flux Pro Ultra' : 'Imagen 4'} Model</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && !isLoading && (
        <div className="bg-red-900/50 border border-red-700 p-6 rounded-lg">
          <h3 className="text-red-300 font-bold mb-2">Generation Error</h3>
          <p className="text-red-200 text-sm">{error}</p>
          <p className="text-red-300 text-xs mt-2">Make sure you have configured your API key in Settings (⚙️)</p>
        </div>
      )}

      {/* Generated Images Results */}
      {generatedImages.length > 0 && !isLoading && (
        <div id="moodboard-results" className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-900/50 to-gray-900 p-6 rounded-lg border border-yellow-600">
            <h2 className="text-2xl font-light text-white mb-2">Generated Editorial Image</h2>
            <p className="text-gray-400 text-sm">Professional fashion moodboard concept successfully generated</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {generatedImages.map((imageUrl, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-yellow-600 transition-all">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={`Generated fashion editorial ${index + 1}`}
                    className="w-full h-auto"
                    style={{ maxHeight: '800px', objectFit: 'contain' }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a
                      href={imageUrl}
                      download={`veralabs-moodboard-${Date.now()}.png`}
                      className="px-4 py-2 bg-yellow-600 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm"
                    >
                      Download
                    </a>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Concept: {selectedConcept?.name || 'Professional Editorial'}</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 text-yellow-500 rounded border border-yellow-600/50">
                      {promptType === 'flux' ? 'Flux Pro Ultra' : 'Imagen 4'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Aspect Ratio: {selectedConcept?.aspectRatio} | Intimacy Level: {selectedConcept?.intimacyLevel}/10
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Generate Another Button */}
          <button
            onClick={() => {
              setGeneratedImages([]);
              setError(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Generate Another Concept
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodboardConceptsUI;
