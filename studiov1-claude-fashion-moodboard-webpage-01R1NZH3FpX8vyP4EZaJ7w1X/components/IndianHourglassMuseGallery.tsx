import React, { useState, useCallback, useMemo } from 'react';
import {
  INDIAN_HOURGLASS_MUSE,
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  generateMusePrompt,
  PHOTOGRAPHY_STYLES,
  MUSE_COLLECTION_PRESETS
} from '../vera/indianHourglassMuseCollection';
import { imagenMusePromptLibrary, MUSE_COLLECTION_INFO } from '../concepts/imagenMusePromptLibrary';

interface IndianHourglassMuseGalleryProps {
  onGenerateImage: (prompt: string, settings: any) => Promise<void>;
  mode?: 'main' | 'imagen' | 'experimental' | 'models' | 'platinum' | 'vera' | 'masterclass';
}

const IndianHourglassMuseGallery: React.FC<IndianHourglassMuseGalleryProps> = ({
  onGenerateImage,
  mode = 'main'
}) => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedWardrobe, setSelectedWardrobe] = useState<string | null>(null);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof PHOTOGRAPHY_STYLES>('glamour');
  const [intimacyFilter, setIntimacyFilter] = useState<[number, number]>([1, 10]);
  const [customDetails, setCustomDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'location' | 'wardrobe' | 'pose' | null>('location');

  // Filter locations based on intimacy range
  const filteredLocations = useMemo(() => {
    return MUSE_LOCATIONS.filter(loc => {
      const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchesIntimacy = loc.intimacyRange[0] <= intimacyFilter[1] && loc.intimacyRange[1] >= intimacyFilter[0];
      return matchesCategory && matchesIntimacy;
    });
  }, [selectedCategory, intimacyFilter]);

  // Filter wardrobe based on intimacy
  const filteredWardrobe = useMemo(() => {
    return MUSE_WARDROBE.filter(w =>
      w.intimacyLevel >= intimacyFilter[0] && w.intimacyLevel <= intimacyFilter[1]
    );
  }, [intimacyFilter]);

  // Filter poses based on intimacy
  const filteredPoses = useMemo(() => {
    return MUSE_POSES.filter(p =>
      p.intimacyLevel >= intimacyFilter[0] && p.intimacyLevel <= intimacyFilter[1]
    );
  }, [intimacyFilter]);

  // Generate prompt and trigger image generation
  const handleGenerate = useCallback(async () => {
    if (!selectedLocation || !selectedWardrobe || !selectedPose) {
      alert('Please select a location, wardrobe, and pose');
      return;
    }

    const location = MUSE_LOCATIONS.find(l => l.id === selectedLocation);
    const wardrobe = MUSE_WARDROBE.find(w => w.id === selectedWardrobe);
    const pose = MUSE_POSES.find(p => p.id === selectedPose);

    if (!location || !wardrobe || !pose) return;

    setIsGenerating(true);
    try {
      const prompt = generateMusePrompt(location, wardrobe, pose, selectedStyle, customDetails);

      const settings = {
        aspectRatio: '3:4',
        personGeneration: 'allow_adult',
        safetyFilter: wardrobe.intimacyLevel > 6 ? 'block_few' : 'block_only_high',
        model: 'imagen-3.0-generate-001',
        sampleCount: 1
      };

      await onGenerateImage(prompt, settings);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [selectedLocation, selectedWardrobe, selectedPose, selectedStyle, customDetails, onGenerateImage]);

  // Quick preset selection
  const handlePresetSelect = (presetKey: keyof typeof MUSE_COLLECTION_PRESETS) => {
    const preset = MUSE_COLLECTION_PRESETS[presetKey];
    if (preset.combinations.length > 0) {
      const combo = preset.combinations[0];
      setSelectedLocation(combo.location);
      setSelectedWardrobe(combo.wardrobe);
      setSelectedPose(combo.pose);
    }
  };

  // Get intimacy color
  const getIntimacyColor = (level: number) => {
    if (level <= 3) return 'text-green-400 bg-green-900/20';
    if (level <= 5) return 'text-blue-400 bg-blue-900/20';
    if (level <= 7) return 'text-amber-400 bg-amber-900/20';
    if (level <= 9) return 'text-orange-400 bg-orange-900/20';
    return 'text-red-400 bg-red-900/20';
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Indian Hourglass Muse Collection
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {INDIAN_HOURGLASS_MUSE.physical.ethnicity} • {INDIAN_HOURGLASS_MUSE.measurements.height} •
              {' '}{INDIAN_HOURGLASS_MUSE.measurements.bust}-{INDIAN_HOURGLASS_MUSE.measurements.waist}-{INDIAN_HOURGLASS_MUSE.measurements.hips}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Active Mode</span>
            <div className="text-sm font-semibold text-purple-400 capitalize">{mode}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Locations:</span>
            <span className="text-purple-400 font-semibold">{MUSE_LOCATIONS.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Wardrobe:</span>
            <span className="text-pink-400 font-semibold">{MUSE_WARDROBE.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Poses:</span>
            <span className="text-blue-400 font-semibold">{MUSE_POSES.length}</span>
          </div>
        </div>
      </div>

      {/* Intimacy Filter */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-300">Intimacy Level Filter</label>
          <span className="text-xs text-gray-500">
            Level {intimacyFilter[0]} - {intimacyFilter[1]}
          </span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
            <button
              key={level}
              onClick={() => {
                if (level === intimacyFilter[0]) {
                  setIntimacyFilter([1, intimacyFilter[1]]);
                } else if (level === intimacyFilter[1]) {
                  setIntimacyFilter([intimacyFilter[0], 10]);
                } else {
                  setIntimacyFilter([level, level]);
                }
              }}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${level >= intimacyFilter[0] && level <= intimacyFilter[1]
                  ? getIntimacyColor(level)
                  : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                }
              `}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(MUSE_COLLECTION_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetSelect(key as keyof typeof MUSE_COLLECTION_PRESETS)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-200 transition-colors text-left"
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-gray-400 mt-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === 'location' ? null : 'location')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">📍</span>
            Location Selection
            {selectedLocation && (
              <span className="text-xs px-2 py-0.5 bg-purple-900/30 text-purple-400 rounded">
                {MUSE_LOCATIONS.find(l => l.id === selectedLocation)?.name}
              </span>
            )}
          </h3>
          <span className="text-gray-500">
            {expandedSection === 'location' ? '▼' : '▶'}
          </span>
        </button>

        {expandedSection === 'location' && (
          <div className="bg-gray-800/30 rounded-lg p-4 space-y-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded text-xs ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                All
              </button>
              {['urban', 'nightlife', 'private', 'natural', 'architectural', 'cultural'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-xs capitalize ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {filteredLocations.map(location => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`
                    p-3 rounded-lg text-left transition-all
                    ${selectedLocation === location.id
                      ? 'bg-purple-600/20 border-purple-500 border'
                      : 'bg-gray-800/50 border-gray-700 border hover:bg-gray-700/50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-200">{location.name}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-2">{location.description}</div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                          {location.timeOfDay}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getIntimacyColor(location.intimacyRange[1])}`}>
                          Intimacy {location.intimacyRange[0]}-{location.intimacyRange[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wardrobe Selection */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === 'wardrobe' ? null : 'wardrobe')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">👗</span>
            Wardrobe Selection
            {selectedWardrobe && (
              <span className="text-xs px-2 py-0.5 bg-pink-900/30 text-pink-400 rounded">
                {MUSE_WARDROBE.find(w => w.id === selectedWardrobe)?.name}
              </span>
            )}
          </h3>
          <span className="text-gray-500">
            {expandedSection === 'wardrobe' ? '▼' : '▶'}
          </span>
        </button>

        {expandedSection === 'wardrobe' && (
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {filteredWardrobe.map(wardrobe => (
                <button
                  key={wardrobe.id}
                  onClick={() => setSelectedWardrobe(wardrobe.id)}
                  className={`
                    p-3 rounded-lg text-left transition-all
                    ${selectedWardrobe === wardrobe.id
                      ? 'bg-pink-600/20 border-pink-500 border'
                      : 'bg-gray-800/50 border-gray-700 border hover:bg-gray-700/50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-200">{wardrobe.name}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-2">{wardrobe.description}</div>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${getIntimacyColor(wardrobe.intimacyLevel)}`}>
                          Level {wardrobe.intimacyLevel}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                          {wardrobe.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pose Selection */}
      <div className="space-y-3">
        <button
          onClick={() => setExpandedSection(expandedSection === 'pose' ? null : 'pose')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">🕺</span>
            Pose Selection
            {selectedPose && (
              <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded">
                {MUSE_POSES.find(p => p.id === selectedPose)?.name}
              </span>
            )}
          </h3>
          <span className="text-gray-500">
            {expandedSection === 'pose' ? '▼' : '▶'}
          </span>
        </button>

        {expandedSection === 'pose' && (
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {filteredPoses.map(pose => (
                <button
                  key={pose.id}
                  onClick={() => setSelectedPose(pose.id)}
                  className={`
                    p-3 rounded-lg text-left transition-all
                    ${selectedPose === pose.id
                      ? 'bg-blue-600/20 border-blue-500 border'
                      : 'bg-gray-800/50 border-gray-700 border hover:bg-gray-700/50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-200">{pose.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{pose.description}</div>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${getIntimacyColor(pose.intimacyLevel)}`}>
                          Level {pose.intimacyLevel}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                          {pose.mood}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photography Style */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Photography Style</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PHOTOGRAPHY_STYLES).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setSelectedStyle(key as keyof typeof PHOTOGRAPHY_STYLES)}
              className={`
                p-3 rounded-lg text-left transition-all
                ${selectedStyle === key
                  ? 'bg-amber-600/20 border-amber-500 border'
                  : 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                }
              `}
            >
              <div className="font-medium text-sm text-gray-200">{style.name}</div>
              <div className="text-xs text-gray-400 mt-1 line-clamp-2">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Details */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Custom Details (Optional)</h3>
        <textarea
          value={customDetails}
          onChange={(e) => setCustomDetails(e.target.value)}
          placeholder="Add specific details, mood, or artistic direction..."
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!selectedLocation || !selectedWardrobe || !selectedPose || isGenerating}
        className={`
          w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
          ${!selectedLocation || !selectedWardrobe || !selectedPose || isGenerating
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
          }
        `}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Generating...
          </>
        ) : (
          <>
            <span>✨</span>
            Generate Muse Image
          </>
        )}
      </button>

      {/* Preview Panel */}
      {selectedLocation && selectedWardrobe && selectedPose && (
        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Preview Configuration</h4>
          <div className="space-y-2 text-xs">
            <div className="flex gap-2">
              <span className="text-gray-500">Location:</span>
              <span className="text-gray-300">{MUSE_LOCATIONS.find(l => l.id === selectedLocation)?.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Wardrobe:</span>
              <span className="text-gray-300">{MUSE_WARDROBE.find(w => w.id === selectedWardrobe)?.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Pose:</span>
              <span className="text-gray-300">{MUSE_POSES.find(p => p.id === selectedPose)?.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Style:</span>
              <span className="text-gray-300">{PHOTOGRAPHY_STYLES[selectedStyle].name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">Combined Intimacy:</span>
              <span className={`px-2 py-0.5 rounded ${
                getIntimacyColor(MUSE_WARDROBE.find(w => w.id === selectedWardrobe)?.intimacyLevel || 5)
              }`}>
                Level {MUSE_WARDROBE.find(w => w.id === selectedWardrobe)?.intimacyLevel || 5}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianHourglassMuseGallery;