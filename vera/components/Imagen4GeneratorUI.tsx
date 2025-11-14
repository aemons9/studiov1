import React, { useState, useCallback } from 'react';
import { IndianModelArchetype, GenerationSettings } from '../types';
import { generateImage } from '../services';
import { optimizePrompt, generateConcept } from '../services';
import { INDIAN_MODEL_ARCHETYPES } from '../services/indianModelArchetypes';
import { ModelIcon, SparklesIcon, SettingsIcon } from './Icons';

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


const Imagen4GeneratorUI: React.FC = () => {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(INDIAN_MODEL_ARCHETYPES[0].id);
  const [concept, setConcept] = useState<string>('');
  const [settings, setSettings] = useState<GenerationSettings>({
    numImages: 1,
    aspectRatio: '9:16',
  });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedArchetype = INDIAN_MODEL_ARCHETYPES.find(a => a.id === selectedArchetypeId)!;

  const handleSettingsChange = (field: keyof GenerationSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: field === 'numImages' ? Number(value) : value,
    }));
  };

  const handleGenerate = useCallback(async () => {
    if (!concept.trim()) {
      setError("Please enter a concept for the scene.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const optimizedConcept = await optimizePrompt(concept);
      const finalPrompt = await generateConcept(selectedArchetype, optimizedConcept);
      
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
  }, [concept, selectedArchetype, settings]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ControlCard title="Model Archetype" icon={<ModelIcon />}>
            <LabeledSelect id="archetype-select" label="Select Archetype" value={selectedArchetypeId} onChange={(e) => setSelectedArchetypeId(e.target.value)} disabled={isLoading}>
                {INDIAN_MODEL_ARCHETYPES.map(archetype => (
                    <option key={archetype.id} value={archetype.id}>{archetype.name}</option>
                ))}
            </LabeledSelect>
            <div className="text-xs text-slate-400 p-3 bg-slate-900/50 rounded-lg border border-slate-700 space-y-2">
                <p><strong className='text-slate-200'>Figure:</strong> {selectedArchetype.physicalTraits.figure}</p>
                <p><strong className='text-slate-200'>Style:</strong> {selectedArchetype.styleContext}</p>
                <p className='italic'>{selectedArchetype.description}</p>
            </div>
        </ControlCard>

        <ControlCard title="Creative Concept" icon={<SparklesIcon />}>
            <div className="flex flex-col h-full">
                <label htmlFor="concept-textarea" className="block text-sm font-medium text-slate-400 mb-1.5">Describe the Scene</label>
                <textarea
                    id="concept-textarea"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 'drinking chai on a rainy balcony', 'reading a book in a palace library'..."
                    className="w-full flex-grow p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none placeholder:text-slate-500"
                    disabled={isLoading}
                />
            </div>
        </ControlCard>

        <ControlCard title="Generation Settings" icon={<SettingsIcon />}>
            <LabeledSelect id="aspect-ratio-select" label="Aspect Ratio" value={settings.aspectRatio} onChange={(e) => handleSettingsChange('aspectRatio', e.target.value)} disabled={isLoading}>
                <option value="9:16">Portrait (9:16)</option>
                <option value="3:4">Portrait (3:4)</option>
                <option value="1:1">Square (1:1)</option>
                <option value="4:3">Landscape (4:3)</option>
                <option value="16:9">Landscape (16:9)</option>
            </LabeledSelect>
        </ControlCard>
      </div>
      
      <div className="mt-2 text-center">
          <button
              onClick={handleGenerate}
              disabled={isLoading || !concept.trim()}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              {isLoading ? 'Generating Images...' : `Generate ${settings.numImages} Image(s)`}
            </button>
      </div>

       {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
        )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center my-24 text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-300 text-xl font-semibold">Imagen 4 is crafting your masterpiece...</p>
            <p className="mt-2 text-slate-400">High-fidelity image generation can take a few moments.</p>
        </div>
      )}

      {!isLoading && generatedImages.length > 0 && (
         <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-slate-100 mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Generated Images</span>
              </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${settings.numImages === 1 && 'max-w-xl mx-auto'}`}>
                {generatedImages.map((src, index) => (
                    <div key={index} className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:border-slate-600 transition-all duration-300">
                        <img src={src} alt={`Generated image ${index + 1}`} className="w-full h-full object-contain" />
                    </div>
                ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default Imagen4GeneratorUI;