import React, { useState } from 'react';
import { COMPLETE_ASSET_MANIFEST, getAssetsByPriority, getAssetsByType, getAssetStats, type AssetRequirement } from './assetManifest';
import type { GenerationSettings } from '../types';

interface VisualNovelAssetGeneratorProps {
  onExit: () => void;
  generationSettings: GenerationSettings;
  onGenerate: (prompt: string, settings: any) => Promise<void>;
}

const VisualNovelAssetGenerator: React.FC<VisualNovelAssetGeneratorProps> = ({
  onExit,
  generationSettings,
  onGenerate
}) => {
  const [selectedAsset, setSelectedAsset] = useState<AssetRequirement | null>(null);
  const [filterType, setFilterType] = useState<'all' | AssetRequirement['type']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const stats = getAssetStats();

  // Filter assets
  const filteredAssets = COMPLETE_ASSET_MANIFEST.filter(asset => {
    if (filterType !== 'all' && asset.type !== filterType) return false;
    if (filterPriority !== 'all' && asset.priority !== filterPriority) return false;
    return true;
  });

  const handleGenerateAsset = async (asset: AssetRequirement) => {
    setIsGenerating(true);
    setSelectedAsset(asset);

    try {
      // Determine which provider to use based on asset type
      const provider = generationSettings.provider || 'replicate-flux';

      // Build generation settings
      const settings: any = {
        provider,
        aspectRatio: asset.specifications.aspectRatio || '16:9',
        numberOfImages: 1,
      };

      if (asset.type === 'cutscene_video') {
        // Use Veo for videos
        alert('Video generation with Veo coming soon! For now, we\'ll generate a static preview image.');
        // TODO: Integrate Veo API here
      }

      // Add provider-specific settings
      if (provider === 'vertex-ai') {
        if (generationSettings.vertexAuthMethod !== 'oauth') {
          alert('⚠️ Imagen requires OAuth authentication. Please configure in settings or switch to Flux.');
          setIsGenerating(false);
          return;
        }

        settings.vertexAuthMethod = 'oauth';
        settings.projectId = generationSettings.projectId;
        settings.accessToken = generationSettings.accessToken;
        settings.modelId = generationSettings.modelId || 'imagen-4.0-generate-001';
        settings.personGeneration = 'allow_all';
        settings.safetySetting = 'block_few';
      } else {
        // Replicate Flux
        settings.replicateApiToken = generationSettings.replicateApiToken;
        settings.fluxModel = generationSettings.fluxModel || 'black-forest-labs/flux-1.1-pro-ultra';
        settings.fluxSafetyTolerance = 5;
        settings.fluxRawMode = true;
      }

      console.log(`🎨 Generating asset: ${asset.name}`, { provider, settings });

      await onGenerate(asset.prompt, settings);

      // Mark as generated (in real app, would save to file system)
      asset.generated = true;
      setGeneratedImages(prev => ({ ...prev, [asset.id]: 'generated' }));

    } catch (error) {
      console.error('Asset generation failed:', error);
      alert(`❌ Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/30';
      case 'high': return 'text-orange-400 bg-orange-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'low': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: AssetRequirement['type']) => {
    switch (type) {
      case 'character_sprite': return '🧍';
      case 'background': return '🖼️';
      case 'cg_image': return '✨';
      case 'cutscene_video': return '🎬';
      case 'ui_element': return '🎨';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎮 Visual Novel Asset Generator</h1>
            <p className="text-purple-300">Generate all assets for Chapter 1: The Golden Hour Connection</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
          >
            ← Back to Main
          </button>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
            <div className="text-4xl font-bold text-purple-400">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Assets</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-xl p-6">
            <div className="text-4xl font-bold text-green-400">{stats.generated}</div>
            <div className="text-sm text-gray-400">Generated</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6">
            <div className="text-4xl font-bold text-red-400">{stats.criticalRemaining}</div>
            <div className="text-sm text-gray-400">Critical Remaining</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-xl p-6">
            <div className="text-4xl font-bold text-blue-400">{Math.round(stats.progress)}%</div>
            <div className="text-sm text-gray-400">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Overall Progress</span>
            <span>{stats.generated} / {stats.total} assets</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 mb-6">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Asset Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2"
              >
                <option value="all">All Types</option>
                <option value="character_sprite">🧍 Character Sprites</option>
                <option value="background">🖼️ Backgrounds</option>
                <option value="cg_image">✨ CG Images</option>
                <option value="cutscene_video">🎬 Cutscene Videos</option>
                <option value="ui_element">🎨 UI Elements</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2"
              >
                <option value="all">All Priorities</option>
                <option value="critical">🔴 Critical</option>
                <option value="high">🟠 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Asset List */}
        <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4">
            Assets ({filteredAssets.length})
          </h3>

          <div className="space-y-3">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className={`bg-gray-800/50 border rounded-lg p-4 transition-all ${
                  selectedAsset?.id === asset.id
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getTypeIcon(asset.type)}</span>
                      <div>
                        <h4 className="font-bold text-lg">{asset.name}</h4>
                        <p className="text-sm text-gray-400">{asset.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(asset.priority)}`}>
                        {asset.priority}
                      </span>
                      <span className="text-xs text-gray-400">
                        {asset.specifications.width}x{asset.specifications.height} • {asset.specifications.format}
                      </span>
                      <span className="text-xs text-gray-400">
                        Used in: {asset.sceneUsage.join(', ')}
                      </span>
                    </div>

                    {/* Prompt Preview */}
                    {selectedAsset?.id === asset.id && (
                      <div className="mt-4 p-3 bg-black/40 rounded border border-gray-700">
                        <div className="text-xs text-gray-400 mb-1">Generation Prompt:</div>
                        <div className="text-sm text-gray-300">{asset.prompt}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {asset.generated || generatedImages[asset.id] ? (
                      <div className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold">
                        ✓ Generated
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-all"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleGenerateAsset(asset)}
                          disabled={isGenerating}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 rounded-lg text-sm font-bold transition-all disabled:cursor-not-allowed"
                        >
                          {isGenerating && selectedAsset?.id === asset.id ? (
                            <>⏳ Generating...</>
                          ) : (
                            <>🎨 Generate</>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4 text-yellow-400">⚡ Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                const critical = getAssetsByPriority('critical');
                alert(`Found ${critical.length} critical assets. Generate them one by one using the buttons above.`);
              }}
              className="px-6 py-4 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-all"
            >
              🔴 Generate All Critical ({stats.criticalRemaining} remaining)
            </button>
            <button
              onClick={() => {
                const sprites = getAssetsByType('character_sprite');
                alert(`Found ${sprites.length} character sprites. Generate them to bring Zara to life!`);
              }}
              className="px-6 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all"
            >
              🧍 Generate All Sprites (6 total)
            </button>
            <button
              onClick={() => {
                const backgrounds = getAssetsByType('background');
                alert(`Found ${backgrounds.length} background scenes. Generate them to build the world!`);
              }}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all"
            >
              🖼️ Generate All Backgrounds (5 total)
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4">📋 Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong>Start with Critical Assets:</strong> Generate the 🔴 critical priority assets first - these are essential for gameplay.</li>
            <li><strong>Character Sprites:</strong> Generate all 6 Zara sprites (neutral, smile, flirty, shy, studio outfit, boudoir outfit).</li>
            <li><strong>Background Scenes:</strong> Generate all 5 background locations (gallery, studio, bedroom, cafe, showroom).</li>
            <li><strong>CG Images:</strong> Generate special event images for key story moments.</li>
            <li><strong>Videos (Optional):</strong> Use Veo to generate cutscene videos for polished transitions.</li>
            <li><strong>Save Assets:</strong> After generating, save images to <code>/visualnovel/assets/</code> folder.</li>
            <li><strong>Update Visual Novel:</strong> Once all critical assets are generated, update the visual novel code to use real images instead of placeholders.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VisualNovelAssetGenerator;
