/**
 * MASTERCLASS MODE - The Apex of AI-Driven Creative Direction
 *
 * A transcendent mode that elevates AI-assisted photography to fine art
 * Combining technical mastery with cultural authenticity
 */

import React, { useState, useCallback, useEffect } from 'react';
import { MasterClassModel, ModelCategory } from './models/modelTaxonomy';
import { MASTERCLASS_MODELS, getModelsByAesthetic } from './models/masterClassModels';
import { MasterPromptStrategy, MasterPromptConfig, MASTERCLASS_PRESETS } from './services/masterPromptStrategy';
import { generateImage } from '../services/geminiService';
import { getGeminiApiKey } from '../services/apiKeyManager';
import { MasterClassAuth } from './components/MasterClassAuth';

interface MasterClassModeProps {
  onExit: () => void;
}

type ViewMode = 'model-selection' | 'creative-direction' | 'wardrobe-styling' |
                'environment-design' | 'technical-setup' | 'generation' | 'gallery';

interface CreativeSession {
  model: MasterClassModel | null;
  narrativeIntent: string;
  emotionalTone: string;
  culturalContext: string;
  wardrobeSelection: any | null;
  location: any | null;
  lightingScheme: string;
  aspectRatio: '1:1' | '4:5' | '9:16' | '16:9' | '2:3' | '3:4';
  outputResolution: '4K' | '8K' | '12K';
  renderQuality: 'draft' | 'preview' | 'final' | 'masterpiece';
  platformTarget: 'instagram' | 'editorial' | 'gallery' | 'commercial' | 'artistic';
  images: Array<{ url: string; prompt: string; metadata: any }>;
  lastGeneratedPrompt: string | null;
}

const MasterClassMode: React.FC<MasterClassModeProps> = ({ onExit }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('model-selection');
  const [session, setSession] = useState<CreativeSession>({
    model: null,
    narrativeIntent: '',
    emotionalTone: '',
    culturalContext: '',
    wardrobeSelection: null,
    location: null,
    lightingScheme: 'Natural Light',
    aspectRatio: '4:5',
    outputResolution: '8K',
    renderQuality: 'masterpiece',
    platformTarget: 'artistic',
    images: [],
    lastGeneratedPrompt: null
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<ModelCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Authentication settings
  const [projectId, setProjectId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');

  // Load authentication settings from localStorage on mount
  useEffect(() => {
    const savedProjectId = localStorage.getItem('masterclass_projectId');
    const savedAccessToken = localStorage.getItem('masterclass_accessToken');

    if (savedProjectId) setProjectId(savedProjectId);
    if (savedAccessToken) setAccessToken(savedAccessToken);
  }, []);

  // Handle authentication updates
  const handleAuthUpdate = (newProjectId: string, newAccessToken: string) => {
    setProjectId(newProjectId);
    setAccessToken(newAccessToken);

    // Persist to localStorage
    localStorage.setItem('masterclass_projectId', newProjectId);
    localStorage.setItem('masterclass_accessToken', newAccessToken);

    console.log('🔐 MasterClass Auth Updated:', {
      projectId: newProjectId ? `${newProjectId.substring(0, 10)}...` : 'Not set',
      token: newAccessToken ? `${newAccessToken.substring(0, 10)}...` : 'Not set'
    });
  };

  // Filter models based on category and search
  const filteredModels = MASTERCLASS_MODELS.filter(model => {
    const matchesCategory = filterCategory === 'all' || model.category === filterCategory;
    const matchesSearch = !searchTerm ||
      model.archetype.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.physicalProfile.bodyArchitecture.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Apply preset configuration
  const applyPreset = (presetKey: string) => {
    const preset = MASTERCLASS_PRESETS[presetKey as keyof typeof MASTERCLASS_PRESETS];
    if (preset) {
      setSession(prev => ({
        ...prev,
        ...preset
      }));
      setSelectedPreset(presetKey);
    }
  };

  // Download image helper
  const handleDownloadImage = (imageUrl: string, filename?: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || `masterclass-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate prompt without creating image
  const handleGeneratePrompt = () => {
    if (!session.model) {
      setError('Please select a model first');
      return;
    }

    try {
      const strategy = new MasterPromptStrategy();
      const config: MasterPromptConfig = {
        model: session.model,
        narrativeIntent: session.narrativeIntent || 'Capturing timeless beauty',
        emotionalTone: session.emotionalTone || 'Elegant confidence',
        culturalContext: session.culturalContext,
        aspectRatio: session.aspectRatio,
        outputResolution: session.outputResolution,
        renderQuality: session.renderQuality,
        lightingScheme: session.lightingScheme,
        colorGradingProfile: 'Cinematic excellence',
        compositionalStrategy: 'Dynamic balance',
        wardrobeSelection: session.wardrobeSelection,
        location: session.location,
        timeOfDay: 'Golden hour',
        safetyLevel: 'artistic',
        platformTarget: session.platformTarget
      };

      const masterPrompt = strategy.generatePlatformOptimizedPrompt(config, session.platformTarget);
      setSession(prev => ({ ...prev, lastGeneratedPrompt: masterPrompt }));
      setError(null);

      console.log('📝 MasterClass Prompt Generated:', {
        model: session.model.archetype,
        promptLength: masterPrompt.length,
        platform: session.platformTarget
      });

      // Copy to clipboard
      navigator.clipboard.writeText(masterPrompt).then(() => {
        console.log('✅ Prompt copied to clipboard');
      });

      return masterPrompt;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Prompt generation failed');
      console.error('MasterClass prompt generation error:', err);
      return null;
    }
  };

  // Generate image with Master Strategy
  const handleGenerate = async () => {
    if (!session.model) {
      setError('Please select a model first');
      return;
    }

    if (!projectId || !accessToken) {
      setError('Please configure authentication settings first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Generate the prompt
      const masterPrompt = handleGeneratePrompt();
      if (!masterPrompt) return;

      console.log('🎭 MasterClass Generation:', {
        model: session.model.archetype,
        promptLength: masterPrompt.length,
        platform: session.platformTarget
      });

      // Generate using Imagen with authentication
      const images = await generateImage(masterPrompt, {
        numberOfImages: 1,
        aspectRatio: session.aspectRatio,
        personGeneration: 'allow_adult',
        safetyFilterLevel: session.renderQuality === 'masterpiece' ? 'block_few' : 'block_only_high',
        projectId,
        accessToken,
        vertexAuthMethod: 'oauth',
        provider: 'vertex-ai',
        modelId: 'imagen-4.0-generate-001'
      });

      console.log('🖼️ Images received:', images ? images.length : 0);

      // Add to gallery (images is an array of base64 strings)
      if (images && images.length > 0) {
        const imageUrl = `data:image/jpeg;base64,${images[0]}`;
        setSession(prev => ({
          ...prev,
          images: [...prev.images, {
            url: imageUrl,
            prompt: masterPrompt,
            metadata: {
              model: session.model?.archetype,
              timestamp: new Date().toISOString(),
              platform: session.platformTarget,
              quality: session.renderQuality
            }
          }]
        }));

        console.log('✅ Image added to gallery');

        // Switch to gallery view to show the generated image
        setViewMode('gallery');
      } else {
        throw new Error('No images returned from generation');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
      console.error('MasterClass generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Model selection view
  const renderModelSelection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
          Select Your Muse
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filterCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Categories
          </button>
          {Object.values(ModelCategory).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg transition ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200 mb-4"
        />

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredModels.map(model => (
            <div
              key={model.id}
              onClick={() => {
                setSession(prev => ({ ...prev, model }));
                setViewMode('creative-direction');
              }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                session.model?.id === model.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-gray-700 hover:border-purple-500/50 bg-gray-800/50'
              }`}
            >
              <h3 className="font-bold text-purple-300 mb-1">{model.archetype}</h3>
              <p className="text-xs text-gray-400 mb-2">{model.subcategory}</p>
              <div className="text-xs space-y-1">
                <p className="text-gray-300">
                  {model.physicalProfile.height} • {model.physicalProfile.measurements.bust}-{model.physicalProfile.measurements.waist}-{model.physicalProfile.measurements.hips}
                </p>
                <p className="text-gray-400 line-clamp-2">
                  {model.physicalProfile.bodyArchitecture}
                </p>
                <p className="text-purple-400">
                  {model.professionalMatrix.experienceLevel} • {model.professionalMatrix.artisticRange}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Creative direction view
  const renderCreativeDirection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-6 rounded-xl border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-4">
          Creative Direction
        </h2>

        {/* Presets */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-indigo-300 mb-2">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(MASTERCLASS_PRESETS).map(preset => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedPreset === preset
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {preset.replace(/_/g, ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Intent */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-indigo-300 mb-2">
            Narrative Intent - What story are we telling?
          </label>
          <textarea
            value={session.narrativeIntent}
            onChange={(e) => setSession(prev => ({ ...prev, narrativeIntent: e.target.value }))}
            placeholder="e.g., Capturing the duality of tradition and modernity..."
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200 h-20"
          />
        </div>

        {/* Emotional Tone */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-indigo-300 mb-2">
            Emotional Tone - What should viewers feel?
          </label>
          <input
            type="text"
            value={session.emotionalTone}
            onChange={(e) => setSession(prev => ({ ...prev, emotionalTone: e.target.value }))}
            placeholder="e.g., Nostalgic elegance with contemporary edge"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200"
          />
        </div>

        {/* Cultural Context */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-indigo-300 mb-2">
            Cultural Context (Optional)
          </label>
          <input
            type="text"
            value={session.culturalContext}
            onChange={(e) => setSession(prev => ({ ...prev, culturalContext: e.target.value }))}
            placeholder="e.g., Modern Indian woman navigating global identity"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200"
          />
        </div>

        {/* Platform Target */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-indigo-300 mb-2">Platform Target</label>
          <select
            value={session.platformTarget}
            onChange={(e) => setSession(prev => ({ ...prev, platformTarget: e.target.value as any }))}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200"
          >
            <option value="instagram">Instagram (Social Media)</option>
            <option value="editorial">Editorial (Magazine)</option>
            <option value="gallery">Gallery (Fine Art)</option>
            <option value="commercial">Commercial (Brand)</option>
            <option value="artistic">Artistic (Experimental)</option>
          </select>
        </div>

        <button
          onClick={() => setViewMode('wardrobe-styling')}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition"
        >
          Continue to Wardrobe →
        </button>
      </div>
    </div>
  );

  // Wardrobe styling view
  const renderWardrobeStyling = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 p-6 rounded-xl border border-pink-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-4">
          Wardrobe & Styling
        </h2>

        {session.model?.wardrobePhilosophy.signature.map((wardrobe, idx) => (
          <div
            key={idx}
            onClick={() => setSession(prev => ({ ...prev, wardrobeSelection: wardrobe }))}
            className={`p-4 mb-3 rounded-lg border-2 cursor-pointer transition-all ${
              session.wardrobeSelection === wardrobe
                ? 'border-pink-500 bg-pink-500/20'
                : 'border-gray-700 hover:border-pink-500/50 bg-gray-800/50'
            }`}
          >
            <h3 className="font-bold text-pink-300 mb-2">{wardrobe.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{wardrobe.philosophy}</p>
            <p className="text-xs text-gray-400">
              Key pieces: {wardrobe.keyPieces.join(', ')}
            </p>
            {wardrobe.culturalReference && (
              <p className="text-xs text-pink-400 mt-1">
                Reference: {wardrobe.culturalReference}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={() => setViewMode('environment-design')}
          className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition mt-4"
        >
          Continue to Environment →
        </button>
      </div>
    </div>
  );

  // Environment design view
  const renderEnvironmentDesign = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-900/20 to-green-900/20 p-6 rounded-xl border border-teal-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-300 mb-4">
          Environment & Location
        </h2>

        {session.model?.environmentalStages.map((stage, idx) => (
          <div
            key={idx}
            onClick={() => setSession(prev => ({ ...prev, location: stage }))}
            className={`p-4 mb-3 rounded-lg border-2 cursor-pointer transition-all ${
              session.location === stage
                ? 'border-teal-500 bg-teal-500/20'
                : 'border-gray-700 hover:border-teal-500/50 bg-gray-800/50'
            }`}
          >
            <h3 className="font-bold text-teal-300 mb-2">{stage.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{stage.atmosphere}</p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Category: {stage.category} • Light: {stage.lightQuality}</p>
              <p>Emotional: {stage.emotionalResonance}</p>
              {stage.culturalSignificance && (
                <p className="text-teal-400">Cultural: {stage.culturalSignificance}</p>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => setViewMode('technical-setup')}
          className="w-full py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold rounded-lg hover:opacity-90 transition mt-4"
        >
          Continue to Technical Setup →
        </button>
      </div>
    </div>
  );

  // Technical setup view
  const renderTechnicalSetup = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 p-6 rounded-xl border border-blue-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-4">
          Technical Specifications
        </h2>

        {/* Aspect Ratio */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-300 mb-2">Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-2">
            {['1:1', '4:5', '9:16', '16:9', '2:3', '3:4'].map(ratio => (
              <button
                key={ratio}
                onClick={() => setSession(prev => ({ ...prev, aspectRatio: ratio as any }))}
                className={`px-4 py-2 rounded-lg transition ${
                  session.aspectRatio === ratio
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-300 mb-2">Output Resolution</label>
          <div className="grid grid-cols-3 gap-2">
            {['4K', '8K', '12K'].map(res => (
              <button
                key={res}
                onClick={() => setSession(prev => ({ ...prev, outputResolution: res as any }))}
                className={`px-4 py-2 rounded-lg transition ${
                  session.outputResolution === res
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        {/* Render Quality */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-300 mb-2">Render Quality</label>
          <div className="grid grid-cols-2 gap-2">
            {['draft', 'preview', 'final', 'masterpiece'].map(quality => (
              <button
                key={quality}
                onClick={() => setSession(prev => ({ ...prev, renderQuality: quality as any }))}
                className={`px-4 py-2 rounded-lg transition ${
                  session.renderQuality === quality
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Scheme */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-300 mb-2">Lighting Scheme</label>
          <select
            value={session.lightingScheme}
            onChange={(e) => setSession(prev => ({ ...prev, lightingScheme: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-gray-200"
          >
            {session.model?.photographicSynergy.lightingMastery.map(light => (
              <option key={light.name} value={light.name}>{light.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setViewMode('generation')}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition"
        >
          Review & Generate →
        </button>
      </div>
    </div>
  );

  // Generation review view
  const renderGeneration = () => (
    <div className="space-y-6">
      {/* Authentication Warning */}
      {(!projectId || !accessToken) && (
        <div className="bg-red-900/30 border-2 border-red-500/50 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="font-bold text-red-300 mb-1">Authentication Required</h3>
              <p className="text-sm text-red-200">
                Please configure your Google Cloud project ID and OAuth token above to enable image generation.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                The authentication settings are shown at the top of this page. Expand them to add your credentials.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
          Final Review
        </h2>

        {/* Summary */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Model:</span>
            <span className="text-gray-200">{session.model?.archetype}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Narrative:</span>
            <span className="text-gray-200 text-right max-w-xs">{session.narrativeIntent || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Emotion:</span>
            <span className="text-gray-200">{session.emotionalTone || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Wardrobe:</span>
            <span className="text-gray-200">{session.wardrobeSelection?.name || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location:</span>
            <span className="text-gray-200">{session.location?.name || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Technical:</span>
            <span className="text-gray-200">
              {session.aspectRatio} • {session.outputResolution} • {session.renderQuality}
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Generated Prompt Display */}
        {session.lastGeneratedPrompt && (
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-purple-300">Generated Prompt</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(session.lastGeneratedPrompt || '');
                  console.log('✅ Prompt copied to clipboard');
                }}
                className="text-xs px-2 py-1 bg-purple-600/30 text-purple-300 rounded hover:bg-purple-600/50 transition"
              >
                📋 Copy
              </button>
            </div>
            <div className="text-xs text-gray-400 font-mono max-h-40 overflow-y-auto bg-black/30 p-3 rounded">
              {session.lastGeneratedPrompt}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              const prompt = handleGeneratePrompt();
              if (prompt) {
                alert('✅ Prompt generated and copied to clipboard!\n\nYou can now use it in any image generation tool.');
              }
            }}
            disabled={!session.model}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📝 Generate Prompt Only
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !projectId || !accessToken}
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? '🎨 Creating...' :
             (!projectId || !accessToken) ? '🔒 Auth Required' :
             '✨ Generate Image'}
          </button>
        </div>
      </div>
    </div>
  );

  // Gallery view
  const renderGallery = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/30">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
          MasterClass Gallery
        </h2>

        {session.images.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No images generated yet</p>
        ) : (
          <div className="space-y-6">
            {session.images.map((img, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 space-y-4">
                {/* Image Display */}
                <div className="relative">
                  <img
                    src={img.url}
                    alt={`Generation ${idx + 1}`}
                    className="w-full rounded-lg shadow-2xl"
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif"%3EImage Load Error%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-purple-300">{img.metadata.model}</p>
                    <p className="text-sm text-gray-400">
                      {img.metadata.platform} • {img.metadata.quality} • {new Date(img.metadata.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* Download Button */}
                    <button
                      onClick={() => handleDownloadImage(img.url, `masterclass-${img.metadata.model?.replace(/\s+/g, '-')}-${idx + 1}.jpg`)}
                      className="px-4 py-2 bg-green-600/30 text-green-300 rounded-lg hover:bg-green-600/50 transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download
                    </button>
                    {/* View Prompt Button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(img.prompt);
                        alert('Prompt copied to clipboard!');
                      }}
                      className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition"
                    >
                      📋 Copy Prompt
                    </button>
                  </div>
                </div>

                {/* Prompt Preview */}
                <details className="bg-gray-900/50 rounded-lg p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-400 hover:text-gray-300">
                    View Prompt ({img.prompt.length} characters)
                  </summary>
                  <div className="mt-2 text-xs text-gray-500 font-mono max-h-40 overflow-y-auto">
                    {img.prompt}
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setViewMode('generation')}
          className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition"
        >
          Generate Another
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-purple-500/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              MasterClass Mode
            </h1>
            <p className="text-sm text-gray-400 mt-1">The Apex of AI-Driven Creative Direction</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition"
          >
            Exit MasterClass
          </button>
        </div>
      </div>

      {/* Authentication Settings */}
      <div className="container mx-auto px-6 py-4">
        <MasterClassAuth
          projectId={projectId}
          accessToken={accessToken}
          onUpdate={handleAuthUpdate}
          isCollapsed={viewMode !== 'generation'}
        />
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-6 pb-4">
        <div className="flex space-x-2 mb-6">
          {[
            { mode: 'model-selection', label: 'Model', icon: '👤' },
            { mode: 'creative-direction', label: 'Direction', icon: '🎬' },
            { mode: 'wardrobe-styling', label: 'Wardrobe', icon: '👗' },
            { mode: 'environment-design', label: 'Environment', icon: '🏛️' },
            { mode: 'technical-setup', label: 'Technical', icon: '⚙️' },
            { mode: 'generation', label: 'Generate', icon: '✨' },
            { mode: 'gallery', label: 'Gallery', icon: '🖼️' }
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as ViewMode)}
              className={`flex-1 py-2 px-4 rounded-lg transition ${
                viewMode === mode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {viewMode === 'model-selection' && renderModelSelection()}
        {viewMode === 'creative-direction' && renderCreativeDirection()}
        {viewMode === 'wardrobe-styling' && renderWardrobeStyling()}
        {viewMode === 'environment-design' && renderEnvironmentDesign()}
        {viewMode === 'technical-setup' && renderTechnicalSetup()}
        {viewMode === 'generation' && renderGeneration()}
        {viewMode === 'gallery' && renderGallery()}
      </div>
    </div>
  );
};

export default MasterClassMode;