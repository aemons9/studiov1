import React, { useState } from 'react';
import { Camera, Moon, Sun, Flame, Sparkles, Heart } from 'lucide-react';
import { getArtisticModelPresets, getImagenArtisticPresets, MASTERCLASS_TECHNIQUES } from '../concepts/artisticMidnightModels';

interface ArtisticMidnightGalleryProps {
  onSelectPrompt: (prompt: string) => void;
  mode?: 'imagen' | 'flux' | 'vera';
}

export const ArtisticMidnightGallery: React.FC<ArtisticMidnightGalleryProps> = ({
  onSelectPrompt,
  mode = 'imagen'
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedPose, setSelectedPose] = useState<number>(0);
  const [selectedLighting, setSelectedLighting] = useState<keyof typeof MASTERCLASS_TECHNIQUES.lightingSetups>('Rembrandt');
  const [intimacyLevel, setIntimacyLevel] = useState<number>(9);

  const artisticPresets = getArtisticModelPresets();
  const imagenPresets = getImagenArtisticPresets();

  const getLightingIcon = (lighting: string) => {
    switch (lighting) {
      case 'Rembrandt': return <Camera className="w-4 h-4" />;
      case 'Butterfly': return <Sparkles className="w-4 h-4" />;
      case 'Split': return <Moon className="w-4 h-4" />;
      case 'Loop': return <Sun className="w-4 h-4" />;
      case 'Rim': return <Flame className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  const handleGeneratePrompt = () => {
    const model = artisticPresets.find(p => p.id === selectedModel);
    if (model) {
      const prompt = model.generatePrompt(selectedPose, selectedLighting);
      onSelectPrompt(prompt);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Moon className="w-6 h-6 text-purple-400" />
          Artistic Midnight Collection
        </h2>
        <p className="text-gray-400">
          Fine-art photography with masterclass techniques and intimate artistic expression
        </p>
      </div>

      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Artistic Model
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {artisticPresets.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-3 rounded-lg border transition-all ${
                selectedModel === model.id
                  ? 'bg-purple-600 border-purple-400 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500'
              }`}
            >
              <div className="text-sm font-medium">{model.name.split('(')[0].trim()}</div>
              <div className="text-xs opacity-75 mt-1">
                {model.settings.location.split(' ').slice(0, 3).join(' ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedModel && (
        <>
          {/* Pose Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Pose (Intimacy Level)
            </label>
            <div className="space-y-2">
              {artisticPresets
                .find(p => p.id === selectedModel)
                ?.poses.map((pose, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPose(index)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedPose === index
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{pose.name}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {pose.mood}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{pose.intimacyLevel}/10</span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Lighting Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Masterclass Lighting Technique
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(MASTERCLASS_TECHNIQUES.lightingSetups).map(([key, setup]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLighting(key as keyof typeof MASTERCLASS_TECHNIQUES.lightingSetups)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedLighting === key
                      ? 'bg-purple-600 border-purple-400 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getLightingIcon(key)}
                    <span className="font-medium">{key}</span>
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {setup.mood}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photography Details */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Photography Specifications</h3>
            {artisticPresets.find(p => p.id === selectedModel) && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Lens:</span>
                  <span className="text-white ml-2">
                    {artisticPresets.find(p => p.id === selectedModel)?.photography.lens}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Aperture:</span>
                  <span className="text-white ml-2">
                    {artisticPresets.find(p => p.id === selectedModel)?.photography.aperture}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">ISO:</span>
                  <span className="text-white ml-2">
                    {artisticPresets.find(p => p.id === selectedModel)?.photography.iso}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Shutter:</span>
                  <span className="text-white ml-2">
                    {artisticPresets.find(p => p.id === selectedModel)?.photography.shutter}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Wardrobe Preview */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Wardrobe & Styling</h3>
            <div className="text-sm text-gray-400">
              <div className="mb-2">
                <span className="font-medium text-purple-400">Style:</span>{' '}
                {artisticPresets.find(p => p.id === selectedModel)?.wardrobe.style}
              </div>
              <div className="mb-2">
                <span className="font-medium text-purple-400">Details:</span>{' '}
                {artisticPresets.find(p => p.id === selectedModel)?.wardrobe.details}
              </div>
              <div>
                <span className="font-medium text-purple-400">Color:</span>{' '}
                {artisticPresets.find(p => p.id === selectedModel)?.wardrobe.color}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGeneratePrompt}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Generate Artistic Midnight Prompt
          </button>
        </>
      )}

      {/* Quick Presets for Imagen Mode */}
      {mode === 'imagen' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-white mb-4">Quick Artistic Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {imagenPresets.slice(0, 6).map(preset => (
              <button
                key={preset.id}
                onClick={() => onSelectPrompt(preset.prompt)}
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-all"
              >
                <div className="text-sm font-medium text-white">{preset.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {preset.tags.slice(0, 3).join(', ')}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisticMidnightGallery;