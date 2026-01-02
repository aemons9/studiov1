import React, { useState, useCallback, useEffect } from 'react';
import { Prompt } from './types';
import { generateVideoPrompts, generateImage, generateVideo } from './services';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import Imagen4GeneratorUI from './components/Imagen4GeneratorUI';
import ArchetypeBlenderUI from './components/ArchetypeBlenderUI';
import UltraOptimizerUI from './components/UltraOptimizerUI';
import VeoGeneratorUI from './components/VeoGeneratorUI';
import PromptCard from './components/PromptCard';
import Loader from './components/Loader';
import ApiKeySelector from './components/ApiKeySelector';
import AuthSettings from './components/AuthSettings';
import CustomPromptGenerator from './components/CustomPromptGenerator';
import MoodboardConceptsUI from './components/MoodboardConceptsUI';
import InstagramMoodboardsUI from './components/InstagramMoodboardsUI';
import {
  MODELS,
  ENVIRONMENTS,
  ARTISTIC_STYLES,
  SHOT_TYPES,
  DEFAULT_WARDROBE_OPTIONS,
  DEFAULT_POSE_OPTIONS,
  EXPERIMENTAL_CONCEPTS,
  INDIAN_GLAMOUR_MODELS,
  PHOTOGRAPHER_STYLES,
  ALL_ENVIRONMENTS,
  ENVIRONMENT_CATEGORIES
} from './constants';

type DisplayPrompt = Prompt & {
  imageUrl?: string;
  isImageLoading?: boolean;
  videoUrl?: string;
  isVideoLoading?: boolean;
  videoStatus?: string;
  videoError?: string;
};

interface VeraModeProps {
  onExit: () => void;
}

const VeraMode: React.FC<VeraModeProps> = ({ onExit }) => {
  // Shared State
  const [mode, setMode] = useState<'veo' | 'imagen4' | 'custom' | 'moodboard' | 'instagram'>('moodboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<DisplayPrompt[]>([]);
  const [hasVeoApiKey, setHasVeoApiKey] = useState<boolean>(false);

  // VEO Architect State
  const [idea, setIdea] = useState<string>('');
  const [model, setModel] = useState<string>(MODELS[0]);
  const [environment, setEnvironment] = useState<string>(ENVIRONMENTS[0]);
  const [wardrobe, setWardrobe] = useState<string>(DEFAULT_WARDROBE_OPTIONS[0]);
  const [pose, setPose] = useState<string>(DEFAULT_POSE_OPTIONS[0]);
  const [artisticStyle, setArtisticStyle] = useState<string>(ARTISTIC_STYLES[0].options[0]);
  const [shotType, setShotType] = useState<string>(SHOT_TYPES[0]);
  const [numVariations, setNumVariations] = useState<number>(3);
  const [experimentalConcept, setExperimentalConcept] = useState<string>(EXPERIMENTAL_CONCEPTS[0]);
  const [photographerStyle, setPhotographerStyle] = useState<string>('None');
  const [environmentCategory, setEnvironmentCategory] = useState<string>('All');

  const [wardrobeOptions, setWardrobeOptions] = useState<string[]>(DEFAULT_WARDROBE_OPTIONS);
  const [poseOptions, setPoseOptions] = useState<string[]>(DEFAULT_POSE_OPTIONS);
  const [environmentOptions, setEnvironmentOptions] = useState<string[]>(ENVIRONMENTS);

  // Imagen 4 Sub-mode state
  const [imagenMode, setImagenMode] = useState<'concept' | 'architect' | 'ultra'>('concept');

  const isCreativeMode = experimentalConcept === EXPERIMENTAL_CONCEPTS[0];

  useEffect(() => {
    // Debug logging for dropdowns
    console.log('🔍 Vera Constants Debug:');
    console.log('MODELS:', MODELS?.length, 'items -', MODELS?.slice(0, 2));
    console.log('ENVIRONMENTS:', ENVIRONMENTS?.length, 'items -', ENVIRONMENTS?.slice(0, 2));
    console.log('ARTISTIC_STYLES:', ARTISTIC_STYLES?.length, 'groups');
    console.log('SHOT_TYPES:', SHOT_TYPES?.length, 'items');
    console.log('EXPERIMENTAL_CONCEPTS:', EXPERIMENTAL_CONCEPTS?.length, 'items');
    console.log('INDIAN_GLAMOUR_MODELS:', INDIAN_GLAMOUR_MODELS?.length, 'items');
    console.log('DEFAULT_WARDROBE_OPTIONS:', DEFAULT_WARDROBE_OPTIONS?.length, 'items');
    console.log('DEFAULT_POSE_OPTIONS:', DEFAULT_POSE_OPTIONS?.length, 'items');

    if (MODELS?.length === 0) console.error('❌ MODELS array is EMPTY!');
    if (ENVIRONMENTS?.length === 0) console.error('❌ ENVIRONMENTS array is EMPTY!');

    // This is a check for a platform-specific feature for Veo API key selection.
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      window.aistudio.hasSelectedApiKey().then(setHasVeoApiKey);
    } else {
      // If the function doesn't exist, assume key is available for local dev.
      setHasVeoApiKey(true);
    }
  }, []);

  useEffect(() => {
    const selectedModel = INDIAN_GLAMOUR_MODELS.find(m => m.name === model);

    if (selectedModel) {
      const newWardrobeOptions = selectedModel.wardrobeCollection.map(w => w.name);
      const newPoseOptions = selectedModel.poseGallery.map(p => p.name);
      const newEnvironmentOptions = selectedModel.environments.map(e => e.name);

      setWardrobeOptions(newWardrobeOptions);
      setPoseOptions(newPoseOptions);
      setEnvironmentOptions(newEnvironmentOptions);

      setWardrobe(newWardrobeOptions[0] || DEFAULT_WARDROBE_OPTIONS[0]);
      setPose(newPoseOptions[0] || DEFAULT_POSE_OPTIONS[0]);
      setEnvironment(newEnvironmentOptions[0] || ENVIRONMENTS[0]);

    } else {
      setWardrobeOptions(DEFAULT_WARDROBE_OPTIONS);
      setPoseOptions(DEFAULT_POSE_OPTIONS);
      setEnvironmentOptions(ENVIRONMENTS);

      setWardrobe(DEFAULT_WARDROBE_OPTIONS[0]);
      setPose(DEFAULT_POSE_OPTIONS[0]);
      setEnvironment(ENVIRONMENTS[0]);
    }
  }, [model]);

  // Filter environments by category
  useEffect(() => {
    if (environmentCategory === 'All') {
      // Use all expanded environments
      const allEnvNames = ALL_ENVIRONMENTS.map(e => e.name);
      setEnvironmentOptions(allEnvNames);
      setEnvironment(allEnvNames[0] || ENVIRONMENTS[0]);
    } else if (ENVIRONMENT_CATEGORIES[environmentCategory]) {
      // Filter by category
      const categoryEnvs = ENVIRONMENT_CATEGORIES[environmentCategory];
      const categoryEnvNames = categoryEnvs.map(e => e.name);
      setEnvironmentOptions(categoryEnvNames);
      setEnvironment(categoryEnvNames[0] || ENVIRONMENTS[0]);
    }
  }, [environmentCategory]);

  const handleVeoGenerate = useCallback(async () => {
    if (!idea.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setPrompts([]);

    try {
      // Use photographer style if selected, otherwise use artisticStyle
      const styleToUse = photographerStyle !== 'None' ? photographerStyle : artisticStyle;

      const generatedPrompts = await generateVideoPrompts(
        idea,
        model,
        environment,
        styleToUse,
        shotType,
        numVariations,
        wardrobe,
        pose,
        experimentalConcept,
        photographerStyle !== 'None' ? photographerStyle : undefined
      );
      setPrompts(generatedPrompts.map(p => ({ ...p, isImageLoading: true })));

      await Promise.all(
        generatedPrompts.map(async (prompt, index) => {
          try {
            const imageUrl = await generateImage(prompt);
            setPrompts(prev => prev.map((p, i) => i === index ? { ...p, imageUrl, isImageLoading: false } : p));
          } catch (imgError) {
            console.error(`Failed to generate image for prompt ${index}:`, imgError);
            setPrompts(prev => prev.map((p, i) => i === index ? { ...p, isImageLoading: false } : p));
          }
        })
      );

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and ensure your API key is configured.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [idea, model, environment, artisticStyle, shotType, numVariations, isLoading, wardrobe, pose, experimentalConcept, photographerStyle]);

  const handleGenerateVideo = useCallback(async (promptId: number, promptText: string) => {
    if (!hasVeoApiKey) {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        setHasVeoApiKey(true); // Assume success to avoid race condition
      } else {
        alert("API Key selection is not available in this environment.");
        return;
      }
    }

    setPrompts(prev => prev.map(p => p.id === promptId ? { ...p, isVideoLoading: true, videoStatus: 'Initializing video generation...', videoUrl: undefined, videoError: undefined } : p));

    try {
      const onStatusUpdate = (status: string) => {
        setPrompts(prev => prev.map(p => p.id === promptId ? { ...p, videoStatus: status } : p));
      };
      const videoUrl = await generateVideo(promptText, onStatusUpdate);
      setPrompts(prev => prev.map(p => p.id === promptId ? { ...p, videoUrl, isVideoLoading: false } : p));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      if (errorMessage.includes("Requested entity was not found.")) {
        setHasVeoApiKey(false);
      }
      setPrompts(prev => prev.map(p => p.id === promptId ? { ...p, videoError: errorMessage, isVideoLoading: false } : p));
    }
  }, [hasVeoApiKey]);

  const handleSelectKey = useCallback(async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setHasVeoApiKey(true);
    }
  }, []);

  const getImagenButtonClass = (buttonMode: 'concept' | 'architect' | 'ultra') => {
    const base = "px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 flex-1";
    if (imagenMode === buttonMode) {
      return `${base} bg-cyan-500/80 text-white shadow-md shadow-cyan-500/10`;
    }
    return `${base} bg-slate-700/50 text-slate-300 hover:bg-slate-700`;
  };

  const showApp = hasVeoApiKey || mode !== 'veo';

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 selection:bg-cyan-400 selection:text-slate-900 relative">
       {!showApp && <ApiKeySelector onSelectKey={handleSelectKey} />}
       <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-[#0a0f1f] to-[#10162b]"></div>
       <div className="fixed inset-0 -z-10 h-full w-full bg-[url('https://res.cloudinary.com/dfhp1llal/image/upload/v1721245037/grid_vjexid.svg')] [background-position:calc(100%*var(--x,0))_calc(100%*var(--y,0))]"></div>

      <div className="max-w-7xl mx-auto relative z-10">{/* Added relative z-10 */}
        <Header mode={mode} setMode={setMode} onExit={onExit} />
        <div className="mt-6">
          <AuthSettings />
        </div>
        <main className="mt-8">
          {mode === 'veo' && (
            <div className="flex flex-col gap-12">
              <VeoGeneratorUI setHasVeoApiKey={setHasVeoApiKey} hasVeoApiKey={hasVeoApiKey} />
              <div className="w-full border-t border-slate-700/50 my-8"></div>
              <PromptInput
                idea={idea} setIdea={setIdea}
                model={model} setModel={setModel}
                environment={environment} setEnvironment={setEnvironment}
                wardrobe={wardrobe} setWardrobe={setWardrobe}
                pose={pose} setPose={setPose}
                artisticStyle={artisticStyle} setArtisticStyle={setArtisticStyle}
                shotType={shotType} setShotType={setShotType}
                numVariations={numVariations} setNumVariations={setNumVariations}
                experimentalConcept={experimentalConcept} setExperimentalConcept={setExperimentalConcept}
                photographerStyle={photographerStyle} setPhotographerStyle={setPhotographerStyle}
                environmentCategory={environmentCategory} setEnvironmentCategory={setEnvironmentCategory}
                wardrobeOptions={wardrobeOptions} poseOptions={poseOptions}
                environmentOptions={environmentOptions}
                onGenerate={handleVeoGenerate}
                isLoading={isLoading}
                isCreativeMode={isCreativeMode}
              />
            </div>
          )}

          {mode === 'imagen4' && (
              <div className="flex flex-col gap-8">
                <div className="p-1.5 bg-slate-800/40 border border-slate-700 rounded-lg flex justify-center gap-2 max-w-lg mx-auto">
                    <button onClick={() => setImagenMode('concept')} className={getImagenButtonClass('concept')}>
                        Concept Generator
                    </button>
                    <button onClick={() => setImagenMode('architect')} className={getImagenButtonClass('architect')}>
                        Archetype Architect
                    </button>
                    <button onClick={() => setImagenMode('ultra')} className={getImagenButtonClass('ultra')}>
                        Ultra Optimizer
                    </button>
                </div>
                {imagenMode === 'concept' && <Imagen4GeneratorUI />}
                {imagenMode === 'architect' && <ArchetypeBlenderUI />}
                {imagenMode === 'ultra' && <UltraOptimizerUI />}
              </div>
          )}

          {mode === 'custom' && (
            <div className="flex flex-col gap-8">
              <CustomPromptGenerator />
            </div>
          )}

          {mode === 'moodboard' && (
            <div className="flex flex-col gap-8">
              <MoodboardConceptsUI />
            </div>
          )}

          {mode === 'instagram' && (
            <div className="flex flex-col gap-8">
              <InstagramMoodboardsUI />
            </div>
          )}

          {mode === 'veo' && error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {mode === 'veo' && isLoading && <Loader />}
          {mode === 'veo' && !isLoading && prompts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center text-slate-100 mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Creative Results</span>
              </h2>
              <div className={`grid grid-cols-1 gap-8 ${prompts.length > 1 ? 'lg:grid-cols-2 2xl:grid-cols-3' : 'max-w-2xl mx-auto'}`}>
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onGenerateVideo={handleGenerateVideo} />
                ))}
              </div>
            </div>
          )}
        </main>
         <footer className="text-center mt-24 text-slate-500 text-sm">
            <p>Powered by Google Gemini, Veo & Imagen</p>
            <p>Vera Mode - Advanced Video & Image Generation</p>
        </footer>
      </div>
    </div>
  );
};

export default VeraMode;
