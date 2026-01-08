import React, { useState, useCallback, useEffect } from 'react';
import { IndianModelArchetype, GenerationSettings } from '../types';
import { generateImage } from '../services';
import { optimizePrompt, generateConcept } from '../services';
import { INDIAN_MODEL_ARCHETYPES } from '../services/indianModelArchetypes';
import { ModelIcon, SparklesIcon, SettingsIcon } from './Icons';
import { ROLEPLAY_SCENARIOS, RolePlayScenario } from '../rolePlayConcepts';
import IndianHourglassMuseGallery from '../../components/IndianHourglassMuseGallery';
import {
  INDIAN_HOURGLASS_MUSE,
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  generateMusePrompt,
  PHOTOGRAPHY_STYLES,
  MUSE_COLLECTION_PRESETS
} from '../indianHourglassMuseCollection';
import { imagenMusePromptLibrary, MUSE_COLLECTION_INFO } from '../../concepts/imagenMusePromptLibrary';

const ControlCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col gap-4 h-full">
    <h3 className="flex items-center gap-2 font-bold text-lg text-cyan-300">
      {icon}
      <span>{title}</span>
    </h3>
    {children}
  </div>
);

const LabeledSelect: React.FC<{ id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; disabled: boolean; children: React.ReactNode; }> = ({ id, label, value, onChange, disabled, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
    <select id={id} value={value} onChange={onChange} disabled={disabled} className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-slate-200 [&>option]:bg-slate-900">
      {children}
    </select>
  </div>
);

const LabeledInput: React.FC<{ id: string; label: string; type: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled: boolean; min?: number; max?: number; step?: number; }> = ({ id, label, type, value, onChange, disabled, min, max, step }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
        <input type={type} id={id} value={value} onChange={onChange} disabled={disabled} min={min} max={max} step={step} className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" />
    </div>
);

const EnhancedImagen4GeneratorUI: React.FC = () => {
  // Existing state
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(INDIAN_MODEL_ARCHETYPES[0].id);
  const [concept, setConcept] = useState<string>('');
  const [authMethod, setAuthMethod] = useState<'apikey' | 'vertexai'>('apikey');
  const [settings, setSettings] = useState<GenerationSettings>({
    numImages: 1,
    aspectRatio: '9:16',
    imagenModel: 'imagen-4.0-generate-001',
  });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Role-Play Mode State
  const [rolePlayMode, setRolePlayMode] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Muse Mode State
  const [museMode, setMuseMode] = useState<boolean>(false);
  const [selectedMusePrompt, setSelectedMusePrompt] = useState<any>(null);
  const [museCategory, setMuseCategory] = useState<string>('all');
  const [intimacyFilter, setIntimacyFilter] = useState<[number, number]>([1, 10]);

  const selectedArchetype = INDIAN_MODEL_ARCHETYPES.find(a => a.id === selectedArchetypeId)!;

  // Check auth method on mount and when localStorage changes
  React.useEffect(() => {
    const checkAuthMethod = () => {
      const method = (localStorage.getItem('vera_auth_method') as 'apikey' | 'vertexai') || 'apikey';
      setAuthMethod(method);

      // Load saved model preference
      const savedModel = localStorage.getItem('vera_imagen_model') as GenerationSettings['imagenModel'];
      if (savedModel) {
        setSettings(prev => ({ ...prev, imagenModel: savedModel }));
      }
    };

    checkAuthMethod();

    // Listen for storage changes
    window.addEventListener('storage', checkAuthMethod);
    return () => window.removeEventListener('storage', checkAuthMethod);
  }, []);

  const handleSettingsChange = (field: keyof GenerationSettings, value: any) => {
    const newValue = field === 'numImages' ? Number(value) : value;
    setSettings(prev => ({
      ...prev,
      [field]: newValue,
    }));

    // Save model preference to localStorage
    if (field === 'imagenModel') {
      localStorage.setItem('vera_imagen_model', value);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!concept.trim() && !selectedMusePrompt) {
      setError("Please enter a concept for the scene or select a muse prompt.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      let finalPrompt: string;

      if (museMode && selectedMusePrompt) {
        // Use muse prompt directly
        finalPrompt = selectedMusePrompt.prompt;
      } else {
        // Use regular concept generation
        const optimizedConcept = await optimizePrompt(concept);
        finalPrompt = await generateConcept(selectedArchetype, optimizedConcept);
      }

      const imagePromises = Array.from({ length: settings.numImages }).map(() =>
        generateImage(finalPrompt, settings)
      );

      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [concept, selectedArchetype, settings, museMode, selectedMusePrompt]);

  // Handle role-play scenario selection
  useEffect(() => {
    if (rolePlayMode && selectedScenario) {
      const matchedArchetype = INDIAN_MODEL_ARCHETYPES.find(a => a.id === selectedScenario.modelId);
      if (matchedArchetype) {
        setSelectedArchetypeId(matchedArchetype.id);
      }
      // Set concept to current progression step
      if (selectedScenario.gameElements.progressionSteps[currentStep]) {
        setConcept(selectedScenario.gameElements.progressionSteps[currentStep]);
      }
    }
  }, [selectedScenario, currentStep, rolePlayMode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  const handleMuseGenerate = async (prompt: string, museSettings: any) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const mergedSettings = { ...settings, ...museSettings };
      const imagePromises = Array.from({ length: mergedSettings.numImages || 1 }).map(() =>
        generateImage(prompt, mergedSettings)
      );

      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter muse prompts based on category and intimacy
  const filteredMusePrompts = imagenMusePromptLibrary.filter(prompt => {
    const matchesCategory = museCategory === 'all' || prompt.category === museCategory;
    const matchesIntimacy = prompt.intimacyLevel >= intimacyFilter[0] &&
                           prompt.intimacyLevel <= intimacyFilter[1];
    return matchesCategory && matchesIntimacy;
  });

  const getIntimacyColor = (level: number) => {
    if (level <= 3) return 'text-green-400';
    if (level <= 5) return 'text-blue-400';
    if (level <= 7) return 'text-amber-400';
    if (level <= 9) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Mode Selector */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-300">Generation Mode</h2>
          <div className="flex gap-2">
            <button
              onClick={() => { setMuseMode(false); setRolePlayMode(false); }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                !museMode && !rolePlayMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => { setMuseMode(true); setRolePlayMode(false); }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                museMode
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ✨ Muse Collection
            </button>
            <button
              onClick={() => { setRolePlayMode(!rolePlayMode); setMuseMode(false); }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                rolePlayMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🎭 Role-Play
            </button>
          </div>
        </div>

        {/* Muse Mode Info */}
        {museMode && (
          <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👸</span>
              <div>
                <h3 className="font-semibold text-pink-300 mb-1">Indian Hourglass Muse Collection</h3>
                <p className="text-sm text-gray-300">
                  {MUSE_COLLECTION_INFO.model.name} • {MUSE_COLLECTION_INFO.model.measurements} • {MUSE_COLLECTION_INFO.model.height}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {MUSE_COLLECTION_INFO.totalPrompts} curated scenarios across {MUSE_LOCATIONS.length} locations with {MUSE_WARDROBE.length} wardrobe options
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Muse Mode Interface */}
      {museMode ? (
        <div className="space-y-6">
          {/* Integrated Muse Gallery */}
          <IndianHourglassMuseGallery
            onGenerateImage={handleMuseGenerate}
            mode="imagen"
          />

          {/* Quick Access Muse Prompts */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Quick Access Prompts</h3>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setMuseCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  museCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                All
              </button>
              {MUSE_COLLECTION_INFO.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setMuseCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                    museCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Intimacy Filter */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">
                Intimacy Filter: {intimacyFilter[0]} - {intimacyFilter[1]}
              </label>
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
                      px-2.5 py-1 rounded text-xs font-medium
                      ${level >= intimacyFilter[0] && level <= intimacyFilter[1]
                        ? `${getIntimacyColor(level)} bg-gray-700`
                        : 'text-gray-500 bg-gray-800'
                      }
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {filteredMusePrompts.slice(0, 8).map(prompt => (
                <div
                  key={prompt.id}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 hover:border-purple-500 transition-all cursor-pointer"
                  onClick={() => setSelectedMusePrompt(prompt)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-200 mb-1">{prompt.name}</h4>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`${getIntimacyColor(prompt.intimacyLevel)}`}>
                          Level {prompt.intimacyLevel}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{prompt.photographyStyle}</span>
                      </div>
                    </div>
                    {selectedMusePrompt?.id === prompt.id && (
                      <span className="text-purple-400">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Prompt Preview */}
            {selectedMusePrompt && (
              <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Selected: {selectedMusePrompt.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-3">{selectedMusePrompt.prompt}</p>
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate with This Prompt'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : rolePlayMode ? (
        // Role-Play Mode Interface (existing code)
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 p-6 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ROLEPLAY_SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setCurrentStep(0);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedScenario?.id === scenario.id
                    ? 'border-purple-500 bg-purple-900/30'
                    : 'border-purple-700/50 bg-purple-900/10 hover:border-purple-600'
                }`}
              >
                <div className="text-2xl mb-2">{scenario.icon}</div>
                <div className="text-sm font-semibold text-purple-300">{scenario.title}</div>
                <div className="text-xs text-gray-400 mt-1">{scenario.gameElements.difficulty}</div>
              </button>
            ))}
          </div>

          {selectedScenario && (
            <div className="mt-6 p-4 bg-purple-900/30 rounded-lg">
              <h4 className="font-bold text-purple-300 mb-2">Current Scene</h4>
              <p className="text-sm text-gray-300 mb-3">{selectedScenario.gameElements.progressionSteps[currentStep]}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-3 py-1 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-gray-300">
                  Step {currentStep + 1} of {selectedScenario.gameElements.progressionSteps.length}
                </span>
                <button
                  onClick={() => setCurrentStep(Math.min(selectedScenario.gameElements.progressionSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === selectedScenario.gameElements.progressionSteps.length - 1}
                  className="px-3 py-1 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Classic Mode Interface (existing code)
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ControlCard title="Model Selection" icon={<ModelIcon />}>
            <LabeledSelect
              id="archetype"
              label="Choose Indian Model Archetype"
              value={selectedArchetypeId}
              onChange={(e) => setSelectedArchetypeId(e.target.value)}
              disabled={isLoading}
            >
              {INDIAN_MODEL_ARCHETYPES.map(archetype => (
                <option key={archetype.id} value={archetype.id}>
                  {archetype.name} (Intimacy: {archetype.intimacyLevel}/10)
                </option>
              ))}
            </LabeledSelect>

            <div className="p-3 bg-slate-900/50 rounded-lg">
              <p className="text-sm text-slate-300">{selectedArchetype.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedArchetype.style.split(',').map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-cyan-900/30 text-cyan-400 rounded-full">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          </ControlCard>

          <ControlCard title="Generation Settings" icon={<SettingsIcon />}>
            <LabeledSelect
              id="model"
              label="Imagen Model Version"
              value={settings.imagenModel}
              onChange={(e) => handleSettingsChange('imagenModel', e.target.value)}
              disabled={isLoading}
            >
              <option value="imagen-4.0-generate-001">Imagen 4.0 (Latest)</option>
              <option value="imagen-3.0-generate-001">Imagen 3.0 (Stable)</option>
            </LabeledSelect>

            <LabeledSelect
              id="aspectRatio"
              label="Aspect Ratio"
              value={settings.aspectRatio}
              onChange={(e) => handleSettingsChange('aspectRatio', e.target.value)}
              disabled={isLoading}
            >
              <option value="1:1">1:1 (Square)</option>
              <option value="3:4">3:4 (Portrait)</option>
              <option value="4:3">4:3 (Landscape)</option>
              <option value="9:16">9:16 (Mobile)</option>
              <option value="16:9">16:9 (Widescreen)</option>
            </LabeledSelect>

            <LabeledInput
              id="numImages"
              label="Number of Images"
              type="number"
              value={settings.numImages}
              onChange={(e) => handleSettingsChange('numImages', e.target.value)}
              disabled={isLoading}
              min={1}
              max={4}
            />
          </ControlCard>
        </div>
      )}

      {/* Concept Input (for Classic and Role-Play modes) */}
      {!museMode && (
        <ControlCard title="Scene Concept" icon={<SparklesIcon />}>
          <textarea
            placeholder="Describe the scene, outfit, pose, and environment..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="w-full h-32 p-3 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || (!concept.trim() && !selectedMusePrompt)}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon />
                Generate Image
              </>
            )}
          </button>
        </ControlCard>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Generated Images Display */}
      {generatedImages.length > 0 && (
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">Generated Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Generated ${index + 1}`}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <a
                    href={image}
                    download={`generated-${index + 1}.png`}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-cyan-600 text-white rounded-lg transition-all duration-300"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImagen4GeneratorUI;