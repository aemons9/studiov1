import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GenerationSettings } from '../types';
import { generateImage } from '../services';
import { 
  INDIAN_MODEL_ARCHETYPES, 
  generateArchetypePrompt, 
  blendArchetypes,
  ModelArchetype
} from '../services/archetypeGeneratorService';
import { ModelIcon, SparklesIcon, SettingsIcon, CopyIcon, CheckIcon } from './Icons';

const ControlCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
  <div className={`bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col gap-4 h-full ${className}`}>
    <h3 className="flex items-center gap-2 font-bold text-lg text-cyan-300">
      {icon}
      <span>{title}</span>
    </h3>
    {children}
  </div>
);

const LabeledSelect: React.FC<{ id: string; label: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; disabled: boolean; children: React.ReactNode; }> = ({ id, label, value, onChange, disabled, children }) => (
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

const ArchetypeBlenderUI: React.FC = () => {
    const [blendMode, setBlendMode] = useState<boolean>(false);
    const [primaryArchetypeId, setPrimaryArchetypeId] = useState<string>(INDIAN_MODEL_ARCHETYPES[0].id);
    const [secondaryArchetypeId, setSecondaryArchetypeId] = useState<string>(INDIAN_MODEL_ARCHETYPES[1].id);
    const [blendRatio, setBlendRatio] = useState<number>(0.5);
    const [wardrobe, setWardrobe] = useState<'traditional' | 'modern' | 'fusion' | 'minimal'>('modern');
    const [poseIndex, setPoseIndex] = useState<number>(0);
    const [intimacyLevel, setIntimacyLevel] = useState<number>(7);
    const [customDetails, setCustomDetails] = useState<string>('');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const [settings, setSettings] = useState<GenerationSettings>({
        numImages: 1,
        aspectRatio: '1:1', // Instagram-compatible square format
    });

    const primaryArchetype = useMemo(() => INDIAN_MODEL_ARCHETYPES.find(a => a.id === primaryArchetypeId), [primaryArchetypeId]);

    useEffect(() => {
        if (primaryArchetype) {
            setPoseIndex(0);
            setIntimacyLevel(
                Math.max(primaryArchetype.intimacyRange[0], Math.min(primaryArchetype.intimacyRange[1], intimacyLevel))
            );
        }
    }, [primaryArchetypeId]);


    const handleGeneratePrompt = useCallback(() => {
        setError(null);
        setGeneratedImage(null);
        let prompt = '';
        if (blendMode) {
            prompt = blendArchetypes(primaryArchetypeId, secondaryArchetypeId, blendRatio);
        } else {
            prompt = generateArchetypePrompt(primaryArchetypeId, {
                wardrobe,
                poseIndex,
                intimacyLevel,
                customDetails
            });
        }
        setGeneratedPrompt(prompt);
    }, [blendMode, primaryArchetypeId, secondaryArchetypeId, blendRatio, wardrobe, poseIndex, intimacyLevel, customDetails]);

    const handleGenerateImage = useCallback(async () => {
        if (!generatedPrompt) {
            setError("Please generate a prompt first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        try {
            const imageUrl = await generateImage(generatedPrompt, settings);
            setGeneratedImage(imageUrl);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Image generation failed: ${message}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [generatedPrompt, settings]);

    const handleCopy = useCallback(() => {
        if (!generatedPrompt) return;
        navigator.clipboard.writeText(generatedPrompt).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }, [generatedPrompt]);

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ControlCard title="Archetype Selection" icon={<ModelIcon />} className="lg:col-span-1">
                    <div className="flex items-center justify-between p-1 bg-slate-900/70 rounded-lg border-2 border-slate-700">
                        <button onClick={() => setBlendMode(false)} className={`flex-1 text-sm py-1.5 rounded-md transition-colors duration-300 ${!blendMode ? 'bg-cyan-500/80 text-white' : 'text-slate-300'}`}>Single</button>
                        <button onClick={() => setBlendMode(true)} className={`flex-1 text-sm py-1.5 rounded-md transition-colors duration-300 ${blendMode ? 'bg-cyan-500/80 text-white' : 'text-slate-300'}`}>Blend</button>
                    </div>

                    <LabeledSelect id="primary-archetype" label="Primary Archetype" value={primaryArchetypeId} onChange={e => setPrimaryArchetypeId(e.target.value)} disabled={isLoading}>
                        {INDIAN_MODEL_ARCHETYPES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </LabeledSelect>

                    {blendMode && (
                        <LabeledSelect id="secondary-archetype" label="Secondary Archetype" value={secondaryArchetypeId} onChange={e => setSecondaryArchetypeId(e.target.value)} disabled={isLoading}>
                            {INDIAN_MODEL_ARCHETYPES.filter(a => a.id !== primaryArchetypeId).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </LabeledSelect>
                    )}
                     {primaryArchetype && (
                        <div className="text-xs text-slate-400 p-3 bg-slate-900/50 rounded-lg border border-slate-700 space-y-2 mt-2">
                            <p><strong className='text-slate-200'>Category:</strong> {primaryArchetype.category}</p>
                            <p className='italic'>{primaryArchetype.description}</p>
                        </div>
                    )}
                </ControlCard>

                <ControlCard title="Creative Parameters" icon={<SparklesIcon />} className="lg:col-span-2">
                    {blendMode ? (
                         <div className="flex flex-col justify-center h-full">
                            <label htmlFor="blend-ratio" className="block text-sm font-medium text-slate-400 mb-1.5">Blend Ratio ({Math.round(blendRatio*100)}%)</label>
                             <input type="range" id="blend-ratio" min="0" max="1" step="0.05" value={blendRatio} onChange={e => setBlendRatio(Number(e.target.value))} disabled={isLoading} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <div className="text-xs text-slate-500 flex justify-between mt-1">
                                <span>100% Primary</span>
                                <span>100% Secondary</span>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <LabeledSelect id="wardrobe" label="Wardrobe Style" value={wardrobe} onChange={e => setWardrobe(e.target.value as any)} disabled={isLoading}>
                                <option value="modern">Modern</option>
                                <option value="traditional">Traditional</option>
                                <option value="fusion">Fusion</option>
                                <option value="minimal">Minimal</option>
                            </LabeledSelect>
                             <LabeledSelect id="pose" label="Pose Style" value={poseIndex} onChange={e => setPoseIndex(Number(e.target.value))} disabled={isLoading || !primaryArchetype}>
                                {primaryArchetype?.poseStyles.map((p, i) => <option key={i} value={i}>{p}</option>)}
                            </LabeledSelect>
                             <div className="sm:col-span-2">
                                <label htmlFor="intimacy-level" className="block text-sm font-medium text-slate-400 mb-1.5">Intimacy Level ({intimacyLevel})</label>
                                <input type="range" id="intimacy-level" min={primaryArchetype?.intimacyRange[0] || 1} max={primaryArchetype?.intimacyRange[1] || 10} step="1" value={intimacyLevel} onChange={e => setIntimacyLevel(Number(e.target.value))} disabled={isLoading || !primaryArchetype} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="custom-details" className="block text-sm font-medium text-slate-400 mb-1.5">Custom Details</label>
                                <textarea id="custom-details" value={customDetails} onChange={e => setCustomDetails(e.target.value)} placeholder="e.g., in a rainy alley, holding a red rose..." className="w-full h-24 p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none placeholder:text-slate-500" disabled={isLoading}></textarea>
                            </div>
                        </div>
                    )}
                </ControlCard>
            </div>

            <div className="text-center">
                 <button onClick={handleGeneratePrompt} disabled={isLoading} className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30">
                    {isLoading ? 'Working...' : 'Architect Prompt'}
                 </button>
            </div>

             {generatedPrompt && (
                <div className="relative">
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Generated Prompt</label>
                    <textarea value={generatedPrompt} readOnly className="w-full h-40 p-3 text-slate-300 font-mono text-xs leading-relaxed bg-slate-900/50 rounded-md border border-slate-700 resize-none"></textarea>
                    <button onClick={handleCopy} className={`absolute top-8 right-2 p-2 rounded-md transition-colors duration-200 ${copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                        {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                </div>
             )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <ControlCard title="Image Settings" icon={<SettingsIcon />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <LabeledSelect id="aspect-ratio-select" label="Aspect Ratio" value={settings.aspectRatio} onChange={(e) => setSettings(p => ({...p, aspectRatio: e.target.value as any}))} disabled={isLoading}>
                            <option value="9:16">Portrait (9:16)</option>
                            <option value="3:4">Portrait (3:4)</option>
                            <option value="1:1">Square (1:1)</option>
                            <option value="4:3">Landscape (4:3)</option>
                            <option value="16:9">Landscape (16:9)</option>
                        </LabeledSelect>
                    </div>
                </ControlCard>

                <div className="text-center">
                    <button onClick={handleGenerateImage} disabled={isLoading || !generatedPrompt} className="w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30">
                        {isLoading ? 'Generating Image...' : 'Generate Image'}
                    </button>
                </div>
            </div>

            {error && <div className="mt-4 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center my-16 text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-300 text-lg font-semibold">Imagen 4 is crafting your vision...</p>
                </div>
            )}

            {!isLoading && generatedImage && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Generated Image</span></h2>
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden shadow-lg max-w-xl mx-auto">
                        <img src={generatedImage} alt="Generated by Imagen 4" className="w-full h-full object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchetypeBlenderUI;