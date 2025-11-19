import React, { useState, useCallback, useEffect } from 'react';
import {
  INDIAN_HOURGLASS_MUSE_MASTERCLASS,
  MUSE_LIGHTING_PRESETS,
  MUSE_PLATFORM_PRESETS,
  MUSE_NARRATIVE_PROGRESSIONS,
  getMuseMasterClassConfig
} from '../models/indianHourglassMuseMasterClass';
import {
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  PHOTOGRAPHY_STYLES,
  MUSE_COLLECTION_PRESETS
} from '../../vera/indianHourglassMuseCollection';
import {
  MuseMasterPromptStrategy,
  MusePromptConfig,
  MUSE_MASTERCLASS_PRESETS,
  getMusePreset
} from '../services/musePromptStrategies';
import { generateImage } from '../../services/imagenService';

interface MuseMasterClassUIProps {
  projectId: string;
  accessToken: string;
  onImageGenerated?: (image: string, metadata: any) => void;
  onError?: (error: string) => void;
}

type ViewMode = 'overview' | 'location' | 'wardrobe' | 'pose' | 'narrative' | 'technical' | 'generate' | 'gallery';

const MuseMasterClassUI: React.FC<MuseMasterClassUIProps> = ({
  projectId,
  accessToken,
  onImageGenerated,
  onError
}) => {
  // View state
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  // Selection state
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedWardrobe, setSelectedWardrobe] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [intimacyLevel, setIntimacyLevel] = useState<number>(5);
  const [platform, setPlatform] = useState<'instagram' | 'editorial' | 'gallery' | 'commercial' | 'artistic'>('instagram');
  const [narrativeType, setNarrativeType] = useState<keyof typeof MUSE_NARRATIVE_PROGRESSIONS | null>(null);

  // Technical settings
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '9:16' | '16:9' | '2:3' | '3:4'>('4:5');
  const [resolution, setResolution] = useState<'4K' | '8K' | '12K'>('8K');
  const [renderQuality, setRenderQuality] = useState<'draft' | 'preview' | 'final' | 'masterpiece'>('final');

  // Custom inputs
  const [narrativeIntent, setNarrativeIntent] = useState('');
  const [emotionalTone, setEmotionalTone] = useState('');
  const [culturalContext, setCulturalContext] = useState('');

  // Generated content
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string; metadata: any }>>([]);

  // Prompt strategy
  const promptStrategy = new MuseMasterPromptStrategy();

  // Filter options based on intimacy level
  const filteredLocations = MUSE_LOCATIONS.filter(loc =>
    loc.intimacyRange[0] <= intimacyLevel && loc.intimacyRange[1] >= intimacyLevel
  );
  const filteredWardrobe = MUSE_WARDROBE.filter(w =>
    Math.abs(w.intimacyLevel - intimacyLevel) <= 2
  );
  const filteredPoses = MUSE_POSES.filter(p =>
    Math.abs(p.intimacyLevel - intimacyLevel) <= 2
  );

  // Generate prompt based on current selections
  const generatePrompt = useCallback(() => {
    const config: MusePromptConfig = {
      model: INDIAN_HOURGLASS_MUSE_MASTERCLASS,
      narrativeIntent: narrativeIntent || 'Celebrating modern Indian beauty through sophisticated artistry',
      emotionalTone: emotionalTone || 'Confident sensuality with cultural authenticity',
      culturalContext: culturalContext || 'Modern Indian aesthetic bridging tradition and contemporary',
      aspectRatio,
      outputResolution: resolution,
      renderQuality,
      platformTarget: platform,
      lightingScheme: INDIAN_HOURGLASS_MUSE_MASTERCLASS.photographicSynergy.lightingMastery[0].name,
      colorGradingProfile: 'Warm-biased with film aesthetic',
      compositionalStrategy: 'Rule of thirds with emphasis on curves',
      wardrobeSelection: selectedWardrobe ? MUSE_WARDROBE.find(w => w.id === selectedWardrobe) : null,
      location: selectedLocation ? MUSE_LOCATIONS.find(l => l.id === selectedLocation) : null,
      timeOfDay: 'golden_hour',
      safetyLevel: intimacyLevel <= 3 ? 'conservative' : intimacyLevel <= 6 ? 'balanced' : intimacyLevel <= 8 ? 'artistic' : 'boundary-pushing',
      locationId: selectedLocation || undefined,
      wardrobeId: selectedWardrobe || undefined,
      poseId: selectedPose || undefined,
      narrativeProgression: narrativeType || undefined
    };

    const prompt = promptStrategy.generateMusePrompt(config);
    setGeneratedPrompt(prompt);
    return prompt;
  }, [
    selectedLocation, selectedWardrobe, selectedPose,
    intimacyLevel, platform, aspectRatio, resolution, renderQuality,
    narrativeIntent, emotionalTone, culturalContext, narrativeType
  ]);

  // Generate image
  const handleGenerateImage = async () => {
    if (!projectId || !accessToken) {
      onError?.('Missing authentication credentials');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = generatePrompt();

      const result = await generateImage(prompt, {
        numberOfImages: 1,
        aspectRatio,
        personGeneration: 'allow_adult',
        safetyFilterLevel: renderQuality === 'masterpiece' ? 'block_few' : 'block_only_high',
        projectId,
        accessToken,
        vertexAuthMethod: 'oauth',
        provider: 'vertex-ai',
        modelId: 'imagen-4.0-generate-001'
      });

      const newImage = {
        url: result,
        metadata: {
          model: 'Indian Hourglass Muse',
          intimacyLevel,
          platform,
          location: selectedLocation,
          wardrobe: selectedWardrobe,
          pose: selectedPose,
          timestamp: new Date().toISOString()
        }
      };

      setGeneratedImages([...generatedImages, newImage]);
      onImageGenerated?.(result, newImage.metadata);
      setCurrentView('gallery');
    } catch (error) {
      onError?.((error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply preset
  const applyPreset = (presetKey: keyof typeof MUSE_MASTERCLASS_PRESETS) => {
    const preset = MUSE_MASTERCLASS_PRESETS[presetKey];
    setNarrativeIntent(preset.narrativeIntent);
    setEmotionalTone(preset.emotionalTone);
    setCulturalContext(preset.culturalContext || '');
    setPlatform(preset.platformTarget);
    setRenderQuality(preset.renderQuality);
    setAspectRatio(preset.aspectRatio);

    if (preset.locationId) setSelectedLocation(preset.locationId);
    if (preset.wardrobeId) setSelectedWardrobe(preset.wardrobeId);
    if (preset.poseId) setSelectedPose(preset.poseId);
  };

  // Get intimacy color
  const getIntimacyColor = (level: number) => {
    if (level <= 3) return 'bg-green-600';
    if (level <= 5) return 'bg-blue-600';
    if (level <= 7) return 'bg-amber-600';
    if (level <= 9) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Indian Hourglass Muse - MasterClass Mode
              </h1>
              <p className="text-gray-400 mt-2">
                {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.measurements.bust}-
                {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.measurements.waist}-
                {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.measurements.hips} •{' '}
                {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.height} •{' '}
                {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.ageRange}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${getIntimacyColor(intimacyLevel)}`}>
              <span className="text-white font-semibold">Level {intimacyLevel}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['overview', 'location', 'wardrobe', 'pose', 'narrative', 'technical', 'generate', 'gallery'].map(view => (
              <button
                key={view}
                onClick={() => setCurrentView(view as ViewMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === view
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 min-h-[500px]">
          {/* Overview View */}
          {currentView === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Model Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Physical Profile</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.bodyArchitecture}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {INDIAN_HOURGLASS_MUSE_MASTERCLASS.physicalProfile.distinguishingAesthetics}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Professional Matrix</h3>
                    <div className="flex flex-wrap gap-2">
                      {INDIAN_HOURGLASS_MUSE_MASTERCLASS.professionalMatrix.specializations.map(spec => (
                        <span key={spec} className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Aesthetic Profile</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-500 text-xs">Color Palette</span>
                        <div className="flex gap-1 mt-1">
                          {INDIAN_HOURGLASS_MUSE_MASTERCLASS.aestheticProfile.colorPalette.slice(0, 3).map(color => (
                            <div key={color} className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-pink-600" title={color} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Lighting Preference</span>
                        <p className="text-gray-300 text-sm mt-1">
                          {INDIAN_HOURGLASS_MUSE_MASTERCLASS.aestheticProfile.lightingPreference[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Quick Presets</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(MUSE_MASTERCLASS_PRESETS).slice(0, 4).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => applyPreset(key as keyof typeof MUSE_MASTERCLASS_PRESETS)}
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors"
                        >
                          <div className="text-xs text-purple-400 font-medium">
                            {preset.platformTarget.toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-300 mt-1 line-clamp-2">
                            {preset.narrativeIntent}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Intimacy Level Selector */}
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Intimacy Level</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                    <button
                      key={level}
                      onClick={() => setIntimacyLevel(level)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        intimacyLevel === level
                          ? getIntimacyColor(level) + ' text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Location View */}
          {currentView === 'location' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-300">Location Selection</h2>
              <p className="text-gray-400">Choose from {filteredLocations.length} locations suitable for intimacy level {intimacyLevel}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                {filteredLocations.map(location => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedLocation === location.id
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-purple-300">{location.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{location.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-300">
                        {location.timeOfDay}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-purple-900/50 rounded text-purple-300">
                        {location.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wardrobe View */}
          {currentView === 'wardrobe' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-300">Wardrobe Selection</h2>
              <p className="text-gray-400">Choose from {filteredWardrobe.length} wardrobe options for intimacy level {intimacyLevel}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                {filteredWardrobe.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedWardrobe(item.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedWardrobe === item.id
                        ? 'border-pink-500 bg-pink-900/30'
                        : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-pink-300">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${getIntimacyColor(item.intimacyLevel)} text-white`}>
                        Level {item.intimacyLevel}
                      </span>
                      <span className="text-xs text-gray-400">{item.category}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Materials: {item.materials.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pose View */}
          {currentView === 'pose' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-300">Pose Selection</h2>
              <p className="text-gray-400">Choose from {filteredPoses.length} poses for intimacy level {intimacyLevel}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                {filteredPoses.map(pose => (
                  <button
                    key={pose.id}
                    onClick={() => setSelectedPose(pose.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPose === pose.id
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-blue-300">{pose.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{pose.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${getIntimacyColor(pose.intimacyLevel)} text-white`}>
                        Level {pose.intimacyLevel}
                      </span>
                      <span className="text-xs text-gray-400">{pose.mood}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Emphasis: {pose.bodyEmphasis.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Narrative View */}
          {currentView === 'narrative' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Narrative & Creative Direction</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Narrative Intent
                  </label>
                  <textarea
                    value={narrativeIntent}
                    onChange={(e) => setNarrativeIntent(e.target.value)}
                    placeholder="Describe the story and artistic vision..."
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Emotional Tone
                  </label>
                  <textarea
                    value={emotionalTone}
                    onChange={(e) => setEmotionalTone(e.target.value)}
                    placeholder="What emotions should this evoke..."
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                    rows={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cultural Context
                </label>
                <input
                  type="text"
                  value={culturalContext}
                  onChange={(e) => setCulturalContext(e.target.value)}
                  placeholder="Cultural elements to incorporate..."
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Narrative Progression
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(MUSE_NARRATIVE_PROGRESSIONS).map(([key, progression]) => (
                    <button
                      key={key}
                      onClick={() => setNarrativeType(key as keyof typeof MUSE_NARRATIVE_PROGRESSIONS)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        narrativeType === key
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                      }`}
                    >
                      <h4 className="font-semibold text-purple-300 capitalize">
                        {key.replace('_', ' ')}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2">
                        {progression.length} scenes from intimacy {progression[0].intimacy} to {progression[progression.length - 1].intimacy}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technical View */}
          {currentView === 'technical' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Technical Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Platform Target
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as typeof platform)}
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="editorial">Editorial</option>
                    <option value="gallery">Gallery</option>
                    <option value="commercial">Commercial</option>
                    <option value="artistic">Artistic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as typeof aspectRatio)}
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="1:1">1:1 Square</option>
                    <option value="4:5">4:5 Portrait</option>
                    <option value="9:16">9:16 Mobile</option>
                    <option value="16:9">16:9 Wide</option>
                    <option value="2:3">2:3 Classic</option>
                    <option value="3:4">3:4 Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resolution
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as typeof resolution)}
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-200 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                    <option value="12K">12K</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Render Quality
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {['draft', 'preview', 'final', 'masterpiece'].map(quality => (
                    <button
                      key={quality}
                      onClick={() => setRenderQuality(quality as typeof renderQuality)}
                      className={`p-3 rounded-lg border-2 capitalize transition-all ${
                        renderQuality === quality
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lighting Preset
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(MUSE_LIGHTING_PRESETS).map(([key, preset]) => (
                    <div
                      key={key}
                      className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
                    >
                      <h4 className="font-medium text-amber-300">{preset.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{preset.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{preset.setup}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Generate View */}
          {currentView === 'generate' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Review & Generate</h2>

              {/* Session Summary */}
              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-amber-400">Session Configuration</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Model:</span>
                    <p className="text-gray-300">Indian Hourglass Muse</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Intimacy Level:</span>
                    <p className="text-gray-300">Level {intimacyLevel}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Platform:</span>
                    <p className="text-gray-300 capitalize">{platform}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="text-gray-300">
                      {selectedLocation ? MUSE_LOCATIONS.find(l => l.id === selectedLocation)?.name : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Wardrobe:</span>
                    <p className="text-gray-300">
                      {selectedWardrobe ? MUSE_WARDROBE.find(w => w.id === selectedWardrobe)?.name : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Pose:</span>
                    <p className="text-gray-300">
                      {selectedPose ? MUSE_POSES.find(p => p.id === selectedPose)?.name : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Aspect Ratio:</span>
                    <p className="text-gray-300">{aspectRatio}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Resolution:</span>
                    <p className="text-gray-300">{resolution}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Quality:</span>
                    <p className="text-gray-300 capitalize">{renderQuality}</p>
                  </div>
                </div>

                {narrativeIntent && (
                  <div>
                    <span className="text-gray-500 text-sm">Narrative Intent:</span>
                    <p className="text-gray-300 text-sm mt-1">{narrativeIntent}</p>
                  </div>
                )}
              </div>

              {/* Generated Prompt */}
              {generatedPrompt && (
                <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-amber-400">Generated Prompt</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                      {generatedPrompt}
                    </pre>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={generatePrompt}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold text-white transition-colors"
                >
                  Generate Prompt Only
                </button>
                <button
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !projectId || !accessToken}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isGenerating || !projectId || !accessToken
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      ✨ Generate Image
                    </>
                  )}
                </button>
              </div>

              {!projectId || !accessToken && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm">
                    Authentication required. Please configure Google Cloud credentials in MasterClass settings.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gallery View */}
          {currentView === 'gallery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Generated Gallery</h2>

              {generatedImages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No images generated yet. Configure your session and generate your first masterpiece.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-auto"
                      />
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            Generated {new Date(image.metadata.timestamp).toLocaleString()}
                          </span>
                          <a
                            href={image.url}
                            download={`muse-masterclass-${index + 1}.jpg`}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm text-white"
                          >
                            Download
                          </a>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
                            {image.metadata.platform}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded text-white ${getIntimacyColor(image.metadata.intimacyLevel)}`}>
                            Level {image.metadata.intimacyLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {generatedImages.length > 0 && (
                <button
                  onClick={() => setCurrentView('generate')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold text-white transition-colors"
                >
                  Generate Another
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MuseMasterClassUI;