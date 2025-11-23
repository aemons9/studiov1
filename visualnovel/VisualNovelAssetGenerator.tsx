import React, { useState, useEffect } from 'react';
import { COMPLETE_ASSET_MANIFEST, getAssetsByPriority, getAssetsByType, getAssetStats, type AssetRequirement } from './assetManifest';
import type { GenerationSettings, GeneratedImageData } from '../types';
import {
  saveAssetToFile,
  storeAssetInLocalStorage,
  loadAllAssetsFromLocalStorage,
  clearAllStoredAssets,
  getAssetFilename
} from './assetFileSaver';

interface VisualNovelAssetGeneratorProps {
  onExit: () => void;
  generationSettings: GenerationSettings;
  onGenerate: (prompt: string, settings: any) => Promise<void>;
  generatedImages: GeneratedImageData[] | null; // Images from App.tsx
}

const VisualNovelAssetGenerator: React.FC<VisualNovelAssetGeneratorProps> = ({
  onExit,
  generationSettings,
  onGenerate,
  generatedImages: latestGeneratedImages
}) => {
  // Debug: Log what we receive as props
  console.log('🎯 VisualNovelAssetGenerator received props:', {
    hasImages: !!latestGeneratedImages,
    imageCount: latestGeneratedImages?.length || 0,
    firstItemType: typeof latestGeneratedImages?.[0],
    firstItemIsObject: typeof latestGeneratedImages?.[0] === 'object',
    firstItemHasUrl: !!(latestGeneratedImages?.[0] as any)?.url
  });

  const [selectedAsset, setSelectedAsset] = useState<AssetRequirement | null>(null);
  const [filterType, setFilterType] = useState<'all' | AssetRequirement['type']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assetImageMap, setAssetImageMap] = useState<Record<string, string>>({});
  const [currentGeneratingAssetId, setCurrentGeneratingAssetId] = useState<string | null>(null);
  const [lastProcessedImageCount, setLastProcessedImageCount] = useState<number>(0);
  const [processedGenerations, setProcessedGenerations] = useState<Set<string>>(new Set());

  const baseStats = getAssetStats();

  // Override stats with actual generated count from assetImageMap
  const stats = {
    ...baseStats,
    generated: Object.keys(assetImageMap).length,
    progress: (Object.keys(assetImageMap).length / baseStats.total) * 100
  };

  // Load saved assets from localStorage on mount
  useEffect(() => {
    const savedAssets = loadAllAssetsFromLocalStorage();
    if (Object.keys(savedAssets).length > 0) {
      setAssetImageMap(savedAssets);
      console.log(`📂 Loaded ${Object.keys(savedAssets).length} saved assets from localStorage`);
    }
  }, []);

  // Capture newly generated images and associate them with the current asset
  useEffect(() => {
    // Only process if we have images AND an asset ID AND we haven't processed this generation yet
    if (latestGeneratedImages && latestGeneratedImages.length > 0 && currentGeneratingAssetId) {
      // Create a unique key for this generation
      const generationKey = `${currentGeneratingAssetId}-${latestGeneratedImages[0]?.url?.substring(0, 50)}`;

      // Skip if we've already processed this exact generation
      if (processedGenerations.has(generationKey)) {
        console.log(`⏭️ Skipping already processed generation for ${currentGeneratingAssetId}`);
        return;
      }

      console.log(`📊 Processing new generation for asset ${currentGeneratingAssetId}`);
      console.log(`🔍 Full images array:`, latestGeneratedImages);
      console.log(`🔍 Array length:`, latestGeneratedImages.length);

      // Generation just completed - store the latest image
      const latestImageData = latestGeneratedImages[latestGeneratedImages.length - 1];
      console.log(`🔍 Latest image data type:`, typeof latestImageData);

      // Check if latestImageData exists and has a url property
      if (!latestImageData || !latestImageData.url) {
        console.error('❌ Invalid image data received:', latestImageData);
        console.error('❌ Full array:', latestGeneratedImages);
        setCurrentGeneratingAssetId(null);
        return;
      }

      const latestImage = latestImageData.url; // Extract the base64 URL
      console.log(`✅ Captured generated image for asset ${currentGeneratingAssetId}:`, {
        imageLength: latestImage.length,
        assetId: currentGeneratingAssetId,
        startsWithData: latestImage.startsWith('data:')
      });

      // Find the asset
      const asset = COMPLETE_ASSET_MANIFEST.find(a => a.id === currentGeneratingAssetId);

      if (asset) {
        // Store in component state
        setAssetImageMap(prev => ({
          ...prev,
          [currentGeneratingAssetId]: latestImage
        }));

        // Auto-save to localStorage for persistence
        storeAssetInLocalStorage(asset, latestImage);
        console.log(`💾 Auto-saved ${asset.name} to localStorage`);
      }

      // Mark this generation as processed
      setProcessedGenerations(prev => new Set(prev).add(generationKey));
      setCurrentGeneratingAssetId(null);
    }
  }, [latestGeneratedImages, currentGeneratingAssetId, processedGenerations]);

  // Filter assets
  const filteredAssets = COMPLETE_ASSET_MANIFEST.filter(asset => {
    if (filterType !== 'all' && asset.type !== filterType) return false;
    if (filterPriority !== 'all' && asset.priority !== filterPriority) return false;
    return true;
  });

  const handleGenerateAsset = async (asset: AssetRequirement) => {
    setIsGenerating(true);
    setSelectedAsset(asset);

    // Store the current image count before generation
    const imageCountBefore = latestGeneratedImages?.length || 0;
    console.log(`🎨 Starting generation for ${asset.name}, current image count: ${imageCountBefore}`);

    setCurrentGeneratingAssetId(asset.id); // Track which asset we're generating

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
          setCurrentGeneratingAssetId(null);
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

      // Mark as generated (image will be captured by useEffect)
      asset.generated = true;

    } catch (error) {
      console.error('Asset generation failed:', error);
      alert(`❌ Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCurrentGeneratingAssetId(null);
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
      case 'bgm': return '🎵';
      case 'sfx': return '🔊';
      case 'location_map': return '🗺️';
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
                <option value="location_map">🗺️ Location Maps</option>
                <option value="cg_image">✨ CG Images</option>
                <option value="cutscene_video">🎬 Cutscene Videos</option>
                <option value="bgm">🎵 Background Music</option>
                <option value="sfx">🔊 Sound Effects</option>
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

                    {/* Image Preview */}
                    {assetImageMap[asset.id] && (
                      <div className="mt-4">
                        <div className="text-xs text-gray-400 mb-2">Generated Image Preview:</div>
                        <img
                          src={assetImageMap[asset.id].startsWith('data:') ? assetImageMap[asset.id] : `data:image/png;base64,${assetImageMap[asset.id]}`}
                          alt={asset.name}
                          className="w-full rounded-lg border border-gray-700 shadow-lg"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Size: {Math.round(assetImageMap[asset.id].length / 1024)} KB
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {assetImageMap[asset.id] ? (
                      <>
                        <div className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold text-center">
                          ✓ Generated
                        </div>
                        <button
                          onClick={() => saveAssetToFile(asset, assetImageMap[asset.id])}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-all"
                        >
                          💾 Download
                        </button>
                      </>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <button
              onClick={() => {
                const bgm = getAssetsByType('bgm');
                alert(`Found ${bgm.length} background music tracks. Use Lyria (Vertex AI) or Suno/Udio for generation!`);
              }}
              className="px-6 py-4 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-all"
            >
              🎵 Generate All BGM (6 tracks)
            </button>
            <button
              onClick={() => {
                const sfx = getAssetsByType('sfx');
                alert(`Found ${sfx.length} sound effects. Use free SFX libraries or AI generation!`);
              }}
              className="px-6 py-4 bg-teal-600 hover:bg-teal-500 rounded-lg font-bold transition-all"
            >
              🔊 Generate All SFX (7 sounds)
            </button>
            <button
              onClick={() => {
                const generatedCount = Object.keys(assetImageMap).length;
                if (generatedCount === 0) {
                  alert('No assets generated yet. Generate some assets first!');
                  return;
                }

                // Download all generated assets
                for (const asset of COMPLETE_ASSET_MANIFEST) {
                  if (assetImageMap[asset.id]) {
                    setTimeout(() => {
                      saveAssetToFile(asset, assetImageMap[asset.id]);
                    }, 100);
                  }
                }

                alert(`Downloading ${generatedCount} generated assets...`);
              }}
              disabled={Object.keys(assetImageMap).length === 0}
              className="px-6 py-4 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 rounded-lg font-bold transition-all disabled:cursor-not-allowed"
            >
              💾 Download All Generated ({Object.keys(assetImageMap).length})
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all stored assets? This cannot be undone!')) {
                  clearAllStoredAssets();
                  setAssetImageMap({});
                  alert('All stored assets cleared!');
                }
              }}
              disabled={Object.keys(assetImageMap).length === 0}
              className="px-6 py-4 bg-red-700 hover:bg-red-600 disabled:bg-gray-600 rounded-lg font-bold transition-all disabled:cursor-not-allowed"
            >
              🗑️ Clear All Stored
            </button>
          </div>
        </div>

        {/* Audio Generation Tools Info */}
        <div className="mt-6 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4 text-cyan-400">🎵 Audio Generation Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Background Music */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Background Music (BGM)</h4>

              <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                <h5 className="font-bold text-purple-300 mb-2">🎹 Lyria (Google Vertex AI)</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Google's music generation model - high-quality instrumental tracks
                </p>
                <p className="text-xs text-gray-400">
                  • Use Vertex AI console<br />
                  • Text-to-music generation<br />
                  • 2-5 minute tracks<br />
                  • Multiple genres/styles
                </p>
                <a
                  href="https://cloud.google.com/vertex-ai/generative-ai/docs/music/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 mt-2 block"
                >
                  View Lyria Docs →
                </a>
              </div>

              <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                <h5 className="font-bold text-blue-300 mb-2">🎼 Suno AI (Free Tier)</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Popular music generation tool with free credits
                </p>
                <p className="text-xs text-gray-400">
                  • 50 free credits/month<br />
                  • Text-to-music<br />
                  • Instrumental & vocal options<br />
                  • Download MP3
                </p>
                <a
                  href="https://suno.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 mt-2 block"
                >
                  Try Suno →
                </a>
              </div>

              <div className="p-4 bg-indigo-900/30 border border-indigo-500/30 rounded-lg">
                <h5 className="font-bold text-indigo-300 mb-2">🎧 Udio (Free)</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Alternative music generation with free tier
                </p>
                <p className="text-xs text-gray-400">
                  • Free daily generations<br />
                  • High-quality output<br />
                  • Genre control<br />
                  • Commercial use (paid tier)
                </p>
                <a
                  href="https://udio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 block"
                >
                  Try Udio →
                </a>
              </div>

              <div className="p-4 bg-gray-900/30 border border-gray-500/30 rounded-lg">
                <h5 className="font-bold text-gray-300 mb-2">🎹 Free Music Archives</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Royalty-free music libraries (no AI)
                </p>
                <p className="text-xs text-gray-400">
                  • YouTube Audio Library<br />
                  • Free Music Archive<br />
                  • Incompetech<br />
                  • CC0 Music
                </p>
              </div>
            </div>

            {/* Sound Effects */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Sound Effects (SFX)</h4>

              <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                <h5 className="font-bold text-green-300 mb-2">🔊 ElevenLabs Sound Effects</h5>
                <p className="text-sm text-gray-300 mb-2">
                  AI sound effect generation (limited free tier)
                </p>
                <p className="text-xs text-gray-400">
                  • Text-to-SFX<br />
                  • Professional quality<br />
                  • Quick generation<br />
                  • WAV format
                </p>
                <a
                  href="https://elevenlabs.io/sound-effects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-400 hover:text-green-300 mt-2 block"
                >
                  Try ElevenLabs SFX →
                </a>
              </div>

              <div className="p-4 bg-teal-900/30 border border-teal-500/30 rounded-lg">
                <h5 className="font-bold text-teal-300 mb-2">🎚️ Free SFX Libraries</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Download pre-made sound effects (recommended!)
                </p>
                <p className="text-xs text-gray-400">
                  • <strong>Freesound.org</strong> - Massive library<br />
                  • <strong>Zapsplat</strong> - UI sounds<br />
                  • <strong>Sonniss GDC</strong> - Game audio<br />
                  • <strong>BBC Sound Effects</strong> - Pro quality
                </p>
                <a
                  href="https://freesound.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:text-teal-300 mt-2 block"
                >
                  Browse Freesound →
                </a>
              </div>

              <div className="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <h5 className="font-bold text-yellow-300 mb-2">💡 Recommendation</h5>
                <p className="text-sm text-gray-300 mb-2">
                  For SFX, download from free libraries first!
                </p>
                <p className="text-xs text-gray-400">
                  Sound effects are hard to generate with AI and free libraries have everything you need. Search for:<br />
                  • "UI click sound"<br />
                  • "menu select chime"<br />
                  • "camera shutter"<br />
                  • "achievement unlock"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4">📋 Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong>Start with Critical Assets:</strong> Generate the 🔴 critical priority assets first - these are essential for gameplay.</li>
            <li><strong>Character Sprites (6 assets):</strong> Generate all Zara sprites using Imagen/Flux (neutral, smile, flirty, shy, studio outfit, boudoir outfit).</li>
            <li><strong>Background Scenes (5 assets):</strong> Generate all background locations using Imagen/Flux (gallery, studio, bedroom, cafe, showroom).</li>
            <li><strong>Background Music (6 tracks):</strong> Generate BGM using Lyria (Vertex AI), Suno, or Udio. See audio generation tools section below.</li>
            <li><strong>Sound Effects (7 sounds):</strong> Download from Freesound.org, Zapsplat, or generate with ElevenLabs SFX.</li>
            <li><strong>CG Images (5 assets):</strong> Generate special event images for key story moments using Imagen/Flux.</li>
            <li><strong>Videos (3 optional):</strong> Use Veo to generate cutscene videos for polished transitions.</li>
            <li><strong>Save Assets:</strong> Organize files into <code>/visualnovel/assets/</code> subfolders (sprites, backgrounds, bgm, sfx, cg, videos).</li>
            <li><strong>Update Visual Novel:</strong> Once all critical assets are generated, update the visual novel code to use real assets instead of placeholders.</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>💡 Tip:</strong> Total asset count is now <strong>41 assets</strong> (6 sprites + 5 backgrounds + 6 location maps + 5 CGs + 3 videos + 2 UI + 6 BGM + 7 SFX + 1 time UI).
              Start with the 11 critical visual assets (sprites + backgrounds), then add maps for travel system, then audio!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualNovelAssetGenerator;
