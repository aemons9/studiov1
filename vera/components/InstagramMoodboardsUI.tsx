import React, { useState } from 'react';
import { INSTAGRAM_MOODBOARDS, INSTAGRAM_CATEGORIES, type InstagramMoodboard } from '../instagramMoodboards';
import { generateImage } from '../services';
import type { GenerationSettings } from '../types';

const InstagramMoodboardsUI: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConcept, setSelectedConcept] = useState<InstagramMoodboard | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '9:16'>('1:1'); // Instagram-compatible square format
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredConcepts = selectedCategory === 'all'
    ? INSTAGRAM_MOODBOARDS
    : INSTAGRAM_CATEGORIES[selectedCategory as keyof typeof INSTAGRAM_CATEGORIES]?.concepts || [];

  const handleGenerate = async (concept: InstagramMoodboard) => {
    try {
      setIsLoading(true);
      setError(null);
      setGeneratedImages([]);

      // Map aspect ratios to Imagen 4 supported values
      let imagenAspectRatio: '1:1' | '9:16' | '16:9' | '4:3' | '3:4' = '3:4';
      if (aspectRatio === '1:1') imagenAspectRatio = '1:1';
      else if (aspectRatio === '9:16') imagenAspectRatio = '9:16';
      else imagenAspectRatio = '3:4'; // Map 4:5 to 3:4

      const settings: GenerationSettings = {
        numImages: 1,
        aspectRatio: imagenAspectRatio,
        imagenModel: 'imagen-4.0-generate-001',
      };

      console.log('🎨 Generating Instagram moodboard:', concept.name, 'Aspect:', imagenAspectRatio);

      const imageUrl = await generateImage(concept.imagenPrompt, settings);
      setGeneratedImages([imageUrl]);

      setTimeout(() => {
        document.getElementById('instagram-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
      console.error('Instagram generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard!`);
  };

  const getViralBadgeColor = (potential: string) => {
    switch (potential) {
      case 'Extreme': return 'bg-red-600';
      case 'Very High': return 'bg-orange-500';
      case 'High': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-900 p-6 rounded-lg border border-pink-700">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">📱</span>
          <h2 className="text-3xl font-bold text-white">Instagram Viral Moodboards</h2>
          <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-bold">NEW!</span>
        </div>
        <p className="text-pink-200 text-sm mb-3">
          Bold, sensual, glamorous concepts for viral Instagram content • Indian influencer aesthetics • Maximum engagement
        </p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 bg-pink-800 text-pink-200 rounded text-xs">Viral-Optimized</span>
          <span className="px-2 py-1 bg-purple-800 text-purple-200 rounded text-xs">Instagram-Ready</span>
          <span className="px-2 py-1 bg-indigo-800 text-indigo-200 rounded text-xs">High Engagement</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
        {/* Category Filter */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm text-gray-400 font-semibold">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 text-sm flex-1 min-w-[200px]"
          >
            <option value="all">All Instagram Concepts ({INSTAGRAM_MOODBOARDS.length})</option>
            {Object.entries(INSTAGRAM_CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.name} ({cat.concepts.length})
              </option>
            ))}
          </select>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm text-gray-400 font-semibold">Format:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setAspectRatio('4:5')}
              className={`px-4 py-2 rounded font-medium text-sm transition-all ${
                aspectRatio === '4:5'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              📱 Instagram Post (4:5)
            </button>
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`px-4 py-2 rounded font-medium text-sm transition-all ${
                aspectRatio === '9:16'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              📹 Story/Reel (9:16)
            </button>
            <button
              onClick={() => setAspectRatio('1:1')}
              className={`px-4 py-2 rounded font-medium text-sm transition-all ${
                aspectRatio === '1:1'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🖼️ Square (1:1)
            </button>
          </div>
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredConcepts.map((concept) => (
          <div
            key={concept.id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-pink-700 overflow-hidden hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/30 transform hover:-translate-y-1"
          >
            {/* Preview Area */}
            <div className="relative h-48 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex items-center justify-center">
              {concept.previewImage ? (
                <img
                  src={concept.previewImage}
                  alt={concept.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-6xl mb-2">
                    {concept.viralCategory.includes('Influencer') && '📱'}
                    {concept.viralCategory.includes('Lifestyle') && '🌟'}
                    {concept.viralCategory.includes('Fashion') && '👗'}
                  </div>
                  <p className="text-white text-sm opacity-70">Instagram-Ready Concept</p>
                </div>
              )}

              {/* Viral Potential Badge */}
              <div className={`absolute top-2 right-2 ${getViralBadgeColor(concept.viralPotential)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                🔥 {concept.viralPotential}
              </div>

              {/* Intimacy Level */}
              <div className="absolute top-2 left-2 bg-black/80 text-pink-400 px-2 py-1 rounded text-xs border border-pink-500/50">
                Intimacy {concept.intimacyLevel}/10
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{concept.name}</h3>
                <p className="text-xs text-pink-400 font-semibold">{concept.instagramTheme}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-300 line-clamp-2">{concept.description}</p>

              {/* Measurements */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Measurements:</span>
                <span className="text-pink-400 font-semibold">{concept.measurements}</span>
              </div>

              {/* Archetype */}
              <div className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs inline-block">
                {concept.influencerArchetype}
              </div>

              {/* Viral Hooks */}
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Viral Hooks:</p>
                <div className="flex flex-wrap gap-1">
                  {concept.viralHooks.slice(0, 3).map((hook, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {hook}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleGenerate(concept)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-bold hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-lg hover:shadow-xl"
                >
                  {isLoading ? '⏳ Generating...' : '✨ Generate'}
                </button>
                <button
                  onClick={() => setSelectedConcept(selectedConcept?.id === concept.id ? null : concept)}
                  className="px-4 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  {selectedConcept?.id === concept.id ? '🔼 Less' : '🔽 More'}
                </button>
              </div>

              {/* Expanded Details */}
              {selectedConcept?.id === concept.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                  {/* Caption */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-500 uppercase">Caption Idea</p>
                      <button
                        onClick={() => copyToClipboard(concept.captionIdea, 'Caption')}
                        className="text-xs text-pink-400 hover:text-pink-300"
                      >
                        📋 Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-300 bg-gray-800 p-2 rounded">{concept.captionIdea}</p>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-500 uppercase">Hashtags</p>
                      <button
                        onClick={() => copyToClipboard(concept.hashtags.join(' '), 'Hashtags')}
                        className="text-xs text-pink-400 hover:text-pink-300"
                      >
                        📋 Copy
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {concept.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-blue-400 bg-gray-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Target Audience</p>
                    <p className="text-sm text-gray-300">{concept.targetAudience}</p>
                  </div>

                  {/* Engagement Style */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Engagement Style</p>
                    <p className="text-sm text-gray-300">{concept.engagementStyle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {/* Generated Results */}
      {generatedImages.length > 0 && (
        <div id="instagram-results" className="space-y-4">
          <div className="bg-gradient-to-r from-pink-900 to-purple-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">✨ Your Instagram-Ready Image</h3>
            <p className="text-pink-200 text-sm">Perfect for viral engagement! Download and post 📱</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {generatedImages.map((imageUrl, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden border border-pink-700">
                <img
                  src={imageUrl}
                  alt="Generated Instagram content"
                  className="w-full h-auto"
                />
                <div className="p-4 space-y-2">
                  <a
                    href={imageUrl}
                    download={`veralabs-instagram-${Date.now()}.png`}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-bold text-center hover:from-pink-500 hover:to-purple-500 transition-all"
                  >
                    💾 Download for Instagram
                  </a>
                  <p className="text-xs text-gray-400 text-center">
                    Pro tip: Post during peak engagement times for maximum virality! 🚀
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-lg border border-indigo-700">
        <h4 className="text-lg font-bold text-white mb-3">📈 Pro Tips for Maximum Viral Engagement</h4>
        <ul className="space-y-2 text-sm text-indigo-200">
          <li>✨ Post during peak times: 7-9 AM, 12-2 PM, 6-8 PM, 10 PM-12 AM</li>
          <li>🔥 Use all hashtags provided + trending ones</li>
          <li>💬 Engage with comments in first hour for algorithm boost</li>
          <li>📱 Share to Stories with interactive stickers</li>
          <li>🎯 Tag relevant accounts and locations</li>
          <li>💫 Post consistently for algorithmic favor</li>
        </ul>
      </div>
    </div>
  );
};

export default InstagramMoodboardsUI;
