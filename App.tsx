import React, { useState, useCallback, useEffect } from 'react';
import type { PromptData, SavedPrompt, GenerationSettings, EnhancementStyle, GeneratedImageData, AnalysisSuggestion, GenerationStep, HistoryEntry, AdherenceLevel, CloudStorageConfig, StorageProvider, StorageSettings } from './types';
import { generateImage, enhancePrompt, weavePrompt, generateAndSaveImage, type StorageConfig } from './services/geminiService';
import { DEFAULT_BUCKET_NAME } from './services/cloudStorageService';
import { DEFAULT_DRIVE_FOLDER } from './services/googleDriveService';
import Header from './components/Header';
import PromptEditor from './components/PromptEditor';
import ImageDisplay from './components/ImageDisplay';
import LoadPromptModal from './components/LoadPromptModal';
import { ArtisticConcept } from './concepts/concepts';
import AnalysisModal from './components/AnalysisModal';
import HistoryModal from './components/HistoryModal';
import LockFieldsDropdown from './components/LockFieldsDropdown';
import MasterGenerationControl, { MasterGenerateOptions } from './components/MasterGenerationControl';
import GalleryModal from './components/GalleryModal';
import StorageConfigModal from './components/StorageConfigModal';

// All Mode Imports
import ExperimentalMode from './experimental/ExperimentalMode';
import { mapNodesToPromptData } from './experimental/nodeToPromptMapper';
import ArtisticMode from './artistic/ArtisticMode';
import CorporateMode from './corporate/CorporateMode';
import PlatinumSuite from './components/PlatinumSuite';

// Type Imports
import type { ArtisticGenerationConfig } from './artistic/types';
import type { CorporatePowerState } from './corporate/types';
import type { PlatinumModeState } from './platinum/types';
import type { DirectorOutput, ConceptVariation } from './services/platinumEngine';

// Supporting Imports
import { PlatinumPromptEngine } from './platinum/promptEngine';
import { CORPORATE_ROLES } from './corporate/corporateRoles';
import { OFFICE_ENVIRONMENTS } from './corporate/corporateEnvironments';
import { INDIAN_MODEL_ARCHETYPES, getModelArchetype } from './artistic/indianModels';
import { MASTER_STYLES, getMasterStyle } from './artistic/masterStyles';

const initialPromptJson = `{
  "shot": "Masterful portrait (4:5), capturing the interplay of light and emotion with profound depth.",
  "subject": {
    "variant": "Indian model with a modern, expressive face perfect for cinematic close-ups (height 5'8\\"). Possesses a slender but soft athletic form (bust 36C\\", waist 28\\", hips 38\\"). Her luminous fair skin tone interacts beautifully with dramatic chiaroscuro lighting, conveying deep emotion through a serene, direct gaze.",
    "pose": "Seated on an unseen surface, leaning slightly forward, one hand gently resting on her knee, creating a natural and engaging posture. The pose feels candid and unforced, inviting connection.",
    "hair_color": "dark",
    "hair_style": "long, loose waves with a few stray strands catching the light, styled with natural volume and texture",
    "skin_finish": "Natural, with a soft, healthy glow. Not overly matte or dewy, just authentic.",
    "hand_and_nail_details": "Hands are relaxed and anatomically correct, with graceful, natural finger placement. Nails are impeccably manicured with a clean, neutral polish, reflecting the soft light.",
    "tattoos": "none",
    "piercings": "none",
    "body_art": "none",
    "nail_art": "Impeccably manicured nails, clean with a neutral polish.",
    "high_heels": "not visible"
  },
  "wardrobe": "A simple, elegant, off-white linen blouse, with visible fabric texture and subtle creasing. The focus is on the subject's natural beauty, not the clothing.",
  "environment": "A minimalist artist's loft with a large, north-facing window just out of frame. The background is a textured, neutral-toned wall, providing depth without distraction.",
  "lighting": "Soft, directional window light (emulating a large octabox) that wraps around the subject's features, creating soft shadows that sculpt the face and form. A subtle reflector provides fill light to retain detail in the shadows.",
  "camera": {
    "focal_length": "85mm f/1.4 Portrait Lens",
    "aperture": "f/1.8",
    "distance": "1.5 m",
    "angle": "Eye-level, creating a direct and personal connection with the subject.",
    "framing": "Tight medium shot, from the mid-torso up, emphasizing facial expression, hand placement, and the texture of the wardrobe."
  },
  "color_grade": "Warm, natural tones with a painterly quality. Soft, luminous highlights and gentle contrast, preserving the full spectrum of realistic skin tones. Inspired by the color palette of classical portraiture.",
  "style": "Hyper-realistic fine-art portraiture, in the style of a master photographer like Annie Leibovitz. A profound focus on emotional depth, authenticity, and technical perfection.",
  "quality": "Shot on a Hasselblad X2D. Unmatched 8K detail. Extremely sharp focus on the eyes and hands. Every micro-detail, from fabric weave to skin pores, is rendered with absolute clarity.",
  "figure_and_form": "Natural form, emphasizing the realistic drape of fabric over the subject's physique. The lighting and pose are composed to be tasteful and artistic.",
  "skin_micro_details": "Authentic, high-resolution skin texture with visible pores, subtle freckles, and natural imperfections. A hint of subsurface scattering on the cheekbones where the light hits. No airbrushing, creating a raw and honest depiction of beauty.",
  "fabric_physics": "The linen blouse drapes naturally, with realistic creases and folds that follow the subject's form. The weave of the fabric is visible upon close inspection, showing subtle textile imperfections.",
  "material_properties": "The off-white linen has a soft, matte texture that absorbs light, contrasting with the subtle specular highlights on the subject's skin. No synthetic sheen."
}`;

const constructSimplePromptString = (data: PromptData): string => {
  const safeStringify = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${safeStringify(v)}`)
        .filter(Boolean)
        .join(', ');
    }
    return String(value);
  };

  return Object.entries(data)
    .map(([key, value]) => `${key}: ${safeStringify(value)}`)
    .filter(Boolean)
    .join('. ');
};

const PROMPTS_STORAGE_key = 'ai-image-studio-prompts';
const HISTORY_STORAGE_key = 'ai-image-studio-history';
const MAX_HISTORY_SIZE = 20;

type AppMode = 'classic' | 'experimental' | 'artistic' | 'corporate' | 'platinum';

const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptData>(JSON.parse(initialPromptJson));
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [promptHistory, setPromptHistory] = useState<HistoryEntry[]>([]);
  const [activeConcept, setActiveConcept] = useState<string>('custom');
  const [analysisSuggestions, setAnalysisSuggestions] = useState<AnalysisSuggestion[] | null>(null);
  const [wovenPrompt, setWovenPrompt] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<GenerationStep | null>(null);
  const [lockedFields, setLockedFields] = useState<string[]>([]);
  const [generationSettings, setGenerationSettings] = useState<GenerationSettings>({
    projectId: '', accessToken: '', numberOfImages: 1, aspectRatio: '9:16', personGeneration: 'allow_all',
    safetySetting: 'block_few', addWatermark: true, enhancePrompt: true, modelId: 'imagen-4.0-ultra-generate-001', seed: null,
    intimacyLevel: 6,
  });
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
  const [storageSettings, setStorageSettings] = useState<StorageSettings>({
    enableStorage: true,
    provider: 'google-drive',
    bucketName: DEFAULT_BUCKET_NAME,
    driveFolderName: DEFAULT_DRIVE_FOLDER,
    driveAccessToken: '',
  });

  // Mode state
  const [currentMode, setCurrentMode] = useState<AppMode>('classic');
  const [isPlatinumModalOpen, setIsPlatinumModalOpen] = useState(false);
  const [batchConcepts, setBatchConcepts] = useState<DirectorOutput[]>([]);

  const handlePromptChange = useCallback((newPromptData: PromptData) => {
    setPromptData(newPromptData);
  }, []);

  const resetGenerationState = () => {
    setGeneratedImages(null);
    setError(null);
    setWovenPrompt(null);
    setGenerationStep(null);
  };

  const addToHistory = useCallback((data: PromptData, settings: GenerationSettings) => {
    const newEntry: HistoryEntry = { timestamp: Date.now(), data, settings };
    setPromptHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_SIZE);
      try { localStorage.setItem(HISTORY_STORAGE_key, JSON.stringify(updated)); } catch (e) { console.error("Failed to save history:", e); }
      return updated;
    });
  }, []);

  const handleMasterGenerate = async (options: MasterGenerateOptions) => {
    resetGenerationState();
    setIsLoading(true);
    addToHistory(promptData, generationSettings);

    try {
      let finalPrompt: string;
      if (options.mode === 'simple') {
        setGenerationStep('simple');
        finalPrompt = constructSimplePromptString(promptData);
      } else if (options.mode === 'weave') {
        setGenerationStep('weaving');
        const weaveOptions = { adherence: options.adherence as AdherenceLevel | undefined, lockFields: lockedFields };
        finalPrompt = await weavePrompt(promptData, generationSettings, weaveOptions);
        setWovenPrompt(finalPrompt);
      } else {
        setGenerationStep('enhancing');
        const enhanced = await enhancePrompt(promptData, generationSettings, options.enhancementStyle || 'balanced', lockedFields);
        setPromptData(enhanced);
        setGenerationStep('weaving');
        const weaveOptions = { adherence: options.adherence as AdherenceLevel | undefined, lockFields: lockedFields };
        finalPrompt = await weavePrompt(enhanced, generationSettings, weaveOptions);
        setWovenPrompt(finalPrompt);
      }

      setGenerationStep('generating');
      const storageConfig = storageSettings.enableStorage
        ? { provider: storageSettings.provider, cloudStorage: storageSettings.provider === 'cloud-storage' ? { projectId: generationSettings.projectId || 'creatives-476816', bucketName: storageSettings.bucketName, accessToken: generationSettings.accessToken, region: 'us-east4' as const } : undefined, googleDrive: storageSettings.provider === 'google-drive' ? { accessToken: storageSettings.driveAccessToken || generationSettings.accessToken, folderName: storageSettings.driveFolderName } : undefined }
        : null;

      const result = await generateAndSaveImage(finalPrompt, generationSettings, promptData, activeConcept, storageConfig);
      const newImageData = result.images.map((b64, idx) => ({ url: `data:image/jpeg;base64,${b64}`, settings: { modelId: generationSettings.modelId, seed: generationSettings.seed, aspectRatio: generationSettings.aspectRatio }, metadata: result.metadata[idx] }));

      setGeneratedImages(newImageData);
      if (result.errors.length > 0) console.warn('Some storage uploads failed:', result.errors);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsLoading(false);
      setGenerationStep(null);
    }
  };

  // Mode handlers
  const handleExperimentalGenerate = async (nodeStates: any) => {
    const promptData = mapNodesToPromptData(nodeStates);
    setPromptData(promptData);
    await handleMasterGenerate({ mode: 'enhance-weave', enhancementStyle: 'creative', adherence: 'creative' });
  };

  const handleArtisticGenerate = async (config: ArtisticGenerationConfig) => {
    resetGenerationState();
    setIsLoading(true);

    try {
      // Use artistic prompt engine to build prompt
      const { ArtisticPromptEngine } = await import('./artistic/promptEngine');
      const engine = new ArtisticPromptEngine();
      const finalPrompt = engine.buildPrompt(config);

      setGenerationStep('generating');
      const images = await generateImage(finalPrompt, generationSettings);
      const newImageData = images.map(b64 => ({ url: `data:image/jpeg;base64,${b64}`, settings: { modelId: generationSettings.modelId, seed: generationSettings.seed, aspectRatio: generationSettings.aspectRatio } }));

      setGeneratedImages(newImageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsLoading(false);
      setGenerationStep(null);
    }
  };

  const handleCorporateGenerate = async (state: CorporatePowerState) => {
    resetGenerationState();
    setIsLoading(true);

    try {
      const { CorporatePromptEngine } = await import('./corporate/promptEngine');
      const engine = new CorporatePromptEngine();
      const finalPrompt = engine.buildPrompt(state);

      setGenerationStep('generating');
      const images = await generateImage(finalPrompt, generationSettings);
      const newImageData = images.map(b64 => ({ url: `data:image/jpeg;base64,${b64}`, settings: { modelId: generationSettings.modelId, seed: generationSettings.seed, aspectRatio: generationSettings.aspectRatio } }));

      setGeneratedImages(newImageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsLoading(false);
      setGenerationStep(null);
    }
  };

  // Platinum handlers
  const handleConceptGenerated = (concept: DirectorOutput) => {
    setPromptData(concept.promptData);
    setActiveConcept(concept.conceptName);
    setIsPlatinumModalOpen(false);
    console.log(`✨ Platinum concept generated: ${concept.conceptName}`);
  };

  const handleVariationsGenerated = (variations: ConceptVariation[]) => {
    console.log(`✨ Generated ${variations.length} variations`);
    const variantConcepts: DirectorOutput[] = variations.map(v => ({ conceptName: v.name, promptData: v.promptData, creativeRationale: v.changeSummary }));
    setBatchConcepts(variantConcepts);
    alert(`Generated ${variations.length} variations! Use the batch browser below to explore them.`);
  };

  const handleBatchGenerated = (concepts: DirectorOutput[]) => {
    console.log(`✨ Generated ${concepts.length} batch concepts`);
    setBatchConcepts(concepts);
    setIsPlatinumModalOpen(false);
    alert(`Generated ${concepts.length} concepts! Use the batch browser below to explore them.`);
  };

  const handlePlatinumGenerate = async (prompt: string, collectionSettings: any) => {
    resetGenerationState();
    setIsLoading(true);

    try {
      const mergedSettings = { ...generationSettings, safetySetting: collectionSettings.safetySetting || generationSettings.safetySetting, personGeneration: collectionSettings.personGeneration || generationSettings.personGeneration, aspectRatio: collectionSettings.aspectRatio || generationSettings.aspectRatio, numberOfImages: collectionSettings.numberOfImages || generationSettings.numberOfImages };

      setGenerationStep('generating');
      const images = await generateImage(prompt, mergedSettings);
      const newImageData = images.map(b64 => ({ url: `data:image/jpeg;base64,${b64}`, settings: { modelId: mergedSettings.modelId, seed: mergedSettings.seed, aspectRatio: mergedSettings.aspectRatio } }));

      setGeneratedImages(newImageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsLoading(false);
      setGenerationStep(null);
    }
  };

  // Utility handlers
  const handleConceptChange = (conceptName: string) => {
    setActiveConcept(conceptName);
  };

  const handleOpenLoadModal = () => {
    setIsLoadModalOpen(true);
  };

  const handleLoadSelectedPrompt = (prompt: SavedPrompt) => {
    setPromptData(prompt.data);
    setIsLoadModalOpen(false);
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem(PROMPTS_STORAGE_key, JSON.stringify(updated)); } catch (e) { console.error("Failed to update storage:", e); }
      return updated;
    });
  };

  const handleSavePrompt = () => {
    const name = prompt('Enter a name for this prompt:');
    if (!name) return;
    const newPrompt: SavedPrompt = { id: `${Date.now()}`, name, data: promptData, timestamp: Date.now() };
    setSavedPrompts(prev => {
      const updated = [...prev, newPrompt];
      try { localStorage.setItem(PROMPTS_STORAGE_key, JSON.stringify(updated)); } catch (e) { console.error("Failed to save prompts:", e); alert("Error: Could not save prompt."); }
      return updated;
    });
  };

  const handleCopyPrompt = () => {
    const promptString = JSON.stringify(promptData, null, 2);
    navigator.clipboard.writeText(promptString);
    alert('Prompt copied to clipboard!');
  };

  const handleResetPrompt = () => {
    if (window.confirm("Reset to initial prompt? This will discard current changes.")) {
      setPromptData(JSON.parse(initialPromptJson));
      setActiveConcept('custom');
    }
  };

  const handleOpenHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const handleLoadFromHistory = (entry: HistoryEntry) => {
    setPromptData(entry.data);
    setGenerationSettings(prev => ({...prev, ...entry.settings}));
    setIsHistoryModalOpen(false);
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear the entire prompt history? This cannot be undone.")) {
      try { localStorage.removeItem(HISTORY_STORAGE_key); setPromptHistory([]); setIsHistoryModalOpen(false); } catch (e) { console.error("Failed to clear history:", e); alert("Error: Could not clear history."); }
    }
  };

  const handleApplySuggestion = (suggestion: AnalysisSuggestion) => {
    console.log('Apply suggestion:', suggestion);
  };

  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem(PROMPTS_STORAGE_key);
      if (storedPrompts) setSavedPrompts(JSON.parse(storedPrompts));
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_key);
      if (storedHistory) setPromptHistory(JSON.parse(storedHistory));
    } catch (e) { console.error("Failed to load saved data:", e); }
  }, []);

  // Render mode-specific UI
  if (currentMode === 'experimental') {
    return (
      <ExperimentalMode
        onGenerate={handleExperimentalGenerate}
        onMigrateToMain={(promptData) => { setPromptData(promptData); setCurrentMode('classic'); }}
        onExit={() => setCurrentMode('classic')}
        generationSettings={generationSettings}
      />
    );
  }

  if (currentMode === 'artistic') {
    return (
      <ArtisticMode
        onGenerate={handleArtisticGenerate}
        onMigrateToMain={(promptData) => { setPromptData(promptData); setCurrentMode('classic'); }}
        onExit={() => setCurrentMode('classic')}
        generationSettings={generationSettings}
      />
    );
  }

  if (currentMode === 'corporate') {
    return (
      <CorporateMode
        onGenerate={handleCorporateGenerate}
        onMigrateToMain={(promptData) => { setPromptData(promptData); setCurrentMode('classic'); }}
        onExit={() => setCurrentMode('classic')}
        generationSettings={generationSettings}
      />
    );
  }

  // Classic Mode UI
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PromptEditor promptData={promptData} onPromptChange={handlePromptChange} isLoading={isLoading} generationSettings={generationSettings} onGenerationSettingsChange={setGenerationSettings} activeConcept={activeConcept} onConceptChange={handleConceptChange} />
          <div className="lg:sticky lg:top-8 self-start">
            <ImageDisplay imageData={generatedImages} isLoading={isLoading} error={error} wovenPrompt={wovenPrompt} generationStep={generationStep} />
          </div>
        </div>
      </main>

      {/* Platinum Batch Browser */}
      {batchConcepts.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-t border-purple-500">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <h3 className="text-lg font-bold text-purple-300">Platinum Batch ({batchConcepts.length} concepts)</h3>
              </div>
              <button onClick={() => setBatchConcepts([])} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">Clear</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {batchConcepts.map((concept, idx) => (
                <button key={idx} onClick={() => handleConceptGenerated(concept)} className="flex-shrink-0 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-purple-500/30 rounded-lg text-left transition-all">
                  <div className="text-sm font-semibold text-purple-300">{concept.conceptName}</div>
                  <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">{concept.creativeRationale}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode Switcher Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Mode Buttons */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button onClick={() => setCurrentMode('experimental')} className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-orange-700 transition-all">
              🧪 Experimental
            </button>
            <button onClick={() => setCurrentMode('artistic')} className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg shadow-md hover:from-pink-700 hover:to-rose-700 transition-all">
              🎨 Artistic
            </button>
            <button onClick={() => setCurrentMode('corporate')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all">
              💼 Corporate
            </button>
            <button onClick={() => setIsPlatinumModalOpen(true)} disabled={isLoading} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              💎 Platinum
            </button>
          </div>

          {/* Utility Buttons */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button onClick={handleOpenLoadModal} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Load
            </button>
            <button onClick={() => setIsStorageModalOpen(true)} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /></svg>Storage
            </button>
            <button onClick={() => setIsGalleryModalOpen(true)} disabled={isLoading || !generationSettings.projectId} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-indigo-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>Gallery
            </button>
            <button onClick={handleOpenHistoryModal} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>History
            </button>
            <button onClick={handleSavePrompt} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 014-4h4a4 4 0 014 4v2H7v-2z" /></svg>Save
            </button>
            <button onClick={handleCopyPrompt} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy
            </button>
            <button onClick={handleResetPrompt} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>Reset
            </button>
            <div className="flex-grow flex justify-center w-full sm:w-auto order-first sm:order-none gap-2 sm:gap-4">
              <MasterGenerationControl onGenerate={handleMasterGenerate} isLoading={isLoading} generationStep={generationStep} />
              <LockFieldsDropdown lockedFields={lockedFields} onLockedFieldsChange={setLockedFields} isBusy={isLoading} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoadPromptModal isOpen={isLoadModalOpen} onClose={() => setIsLoadModalOpen(false)} prompts={savedPrompts} onLoad={handleLoadSelectedPrompt} onDelete={handleDeletePrompt} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={promptHistory} onLoad={handleLoadFromHistory} onClear={handleClearHistory} />
      <AnalysisModal isOpen={!!analysisSuggestions && analysisSuggestions.length > 0} onClose={() => setAnalysisSuggestions(null)} suggestions={analysisSuggestions || []} onApply={handleApplySuggestion} />
      <StorageConfigModal isOpen={isStorageModalOpen} onClose={() => setIsStorageModalOpen(false)} settings={storageSettings} onSettingsChange={setStorageSettings} />
      <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} config={{ provider: storageSettings.provider, cloudStorage: storageSettings.provider === 'cloud-storage' ? { projectId: generationSettings.projectId || 'creatives-476816', bucketName: storageSettings.bucketName, accessToken: generationSettings.accessToken, region: 'us-east4' } : undefined, googleDrive: storageSettings.provider === 'google-drive' ? { accessToken: storageSettings.driveAccessToken || generationSettings.accessToken, folderName: storageSettings.driveFolderName } : undefined }} onSelectImage={(metadata) => { setPromptData(metadata.promptData); setGenerationSettings(prev => ({...prev, ...metadata.settings})); setActiveConcept(metadata.conceptName); }} />

      {/* Platinum Suite Modal */}
      {isPlatinumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border-2 border-purple-500 shadow-2xl">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-purple-500 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">💎 Platinum Suite</h2>
              <button onClick={() => setIsPlatinumModalOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">Close</button>
            </div>
            <div className="p-6">
              <PlatinumSuite currentPromptData={promptData} currentConceptName={activeConcept} settings={generationSettings} onConceptGenerated={handleConceptGenerated} onVariationsGenerated={handleVariationsGenerated} onBatchGenerated={handleBatchGenerated} onGenerate={handlePlatinumGenerate} onClose={() => setIsPlatinumModalOpen(false)} isLoading={isLoading} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
