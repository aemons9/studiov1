import React, { useState, useCallback, useEffect } from 'react';
import { GenerationSettings } from '../types';
import { generateImage } from '../services/geminiService';
import { 
  Imagen4PromptOptimizer,
  IMAGEN4_PRESETS,
  Imagen4OptimizationConfig,
  OptimizationResult
} from '../services/imagenUltraOptimizer';
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
        <select id={id} value={value} onChange={onChange} disabled={disabled} className="w-full p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {children}
        </select>
    </div>
);

const UltraOptimizerUI: React.FC = () => {
    const [config, setConfig] = useState<Imagen4OptimizationConfig>(IMAGEN4_PRESETS.fashionEditorial);
    const [concept, setConcept] = useState<string>('A beautiful Indian model in a high-fashion editorial setting.');
    const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleConfigChange = <K extends keyof Imagen4OptimizationConfig>(key: K, value: Imagen4OptimizationConfig[K]) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handlePresetChange = (presetName: string) => {
        if (IMAGEN4_PRESETS[presetName]) {
            setConfig(IMAGEN4_PRESETS[presetName]);
        }
    };

    const handleOptimize = useCallback(() => {
        if (!concept.trim()) {
            setError("Please enter a concept.");
            return;
        }
        setError(null);
        setGeneratedImage(null);
        try {
            const optimizer = new Imagen4PromptOptimizer(config);
            const result = optimizer.optimize(concept);
            setOptimizationResult(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unknown error occurred during optimization.';
            setError(message);
        }
    }, [concept, config]);

    const handleGenerateImage = useCallback(async () => {
        if (!optimizationResult?.optimizedPrompt) {
            setError("Please optimize a prompt first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        try {
            const imageUrl = await generateImage(optimizationResult.optimizedPrompt, {
                numImages: 1,
                aspectRatio: '9:16'
            });
            setGeneratedImage(imageUrl);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Image generation failed: ${message}`);
        } finally {
            setIsLoading(false);
        }
    }, [optimizationResult]);

     const handleCopy = useCallback(() => {
        if (!optimizationResult?.optimizedPrompt) return;
        navigator.clipboard.writeText(optimizationResult.optimizedPrompt).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }, [optimizationResult]);

    const ScoreMeter: React.FC<{ score: number; label: string }> = ({ score, label }) => {
        const percentage = score * 100;
        let colorClass = 'bg-green-500';

        if (label === 'Risk Score') {
            if (percentage > 70) colorClass = 'bg-red-500';
            else if (percentage > 50) colorClass = 'bg-yellow-500';
        } else { // Quality Score
             if (percentage < 50) colorClass = 'bg-yellow-500';
             else if (percentage < 30) colorClass = 'bg-red-500';
        }


        return (
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                    <span className="text-sm font-bold text-slate-100">{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        )
    };


    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ControlCard title="Creative Concept" icon={<SparklesIcon />}>
                    <div className="flex flex-col h-full">
                        <label htmlFor="concept-textarea" className="block text-sm font-medium text-slate-400 mb-1.5">Describe your idea</label>
                        <textarea
                            id="concept-textarea"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            placeholder="e.g., 'A model in a palace', 'Cyberpunk warrior'..."
                            className="w-full flex-grow p-2.5 text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none placeholder:text-slate-500"
                            disabled={isLoading}
                        />
                    </div>
                </ControlCard>
                <ControlCard title="Optimizer Configuration" icon={<SettingsIcon />}>
                     <LabeledSelect id="preset-select" label="Quick-Start Presets" value={Object.keys(IMAGEN4_PRESETS).find(key => JSON.stringify(IMAGEN4_PRESETS[key]) === JSON.stringify(config)) || ''} onChange={(e) => handlePresetChange(e.target.value)} disabled={isLoading}>
                        <option value="">-- Custom --</option>
                        {Object.keys(IMAGEN4_PRESETS).map(key => <option key={key} value={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</option>)}
                    </LabeledSelect>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                        <LabeledSelect id="quality-preset" label="Quality Preset" value={config.qualityPreset} onChange={(e) => handleConfigChange('qualityPreset', e.target.value as any)} disabled={isLoading}>
                           {['standard', 'premium', 'gallery', 'masterpiece'].map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                        </LabeledSelect>
                        <LabeledSelect id="style-emphasis" label="Style Emphasis" value={config.styleEmphasis} onChange={(e) => handleConfigChange('styleEmphasis', e.target.value as any)} disabled={isLoading}>
                           {['photorealistic', 'cinematic', 'editorial', 'fine-art'].map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                        </LabeledSelect>
                         <LabeledSelect id="safety-mode" label="Safety Mode" value={config.safetyMode} onChange={(e) => handleConfigChange('safetyMode', e.target.value as any)} disabled={isLoading}>
                           {['conservative', 'balanced', 'artistic', 'boundary-pushing'].map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                        </LabeledSelect>
                        <div>
                            <label htmlFor="intimacy-level" className="block text-sm font-medium text-slate-400 mb-1.5">Intimacy ({config.intimacyLevel})</label>
                            <input type="range" id="intimacy-level" min="1" max="10" step="1" value={config.intimacyLevel} onChange={e => handleConfigChange('intimacyLevel', Number(e.target.value))} disabled={isLoading} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 mt-2.5" />
                        </div>
                    </div>
                </ControlCard>
            </div>
            
            <div className="text-center">
                 <button onClick={handleOptimize} disabled={isLoading} className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30">
                    Optimize Prompt
                 </button>
            </div>

            {optimizationResult && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700 rounded-xl p-5 relative">
                         <h3 className="text-lg font-bold text-cyan-300 mb-2">Optimized Prompt</h3>
                         <textarea value={optimizationResult.optimizedPrompt} readOnly className="w-full h-48 p-3 text-slate-300 font-mono text-xs leading-relaxed bg-slate-900/50 rounded-md border border-slate-700 resize-none"></textarea>
                         <button onClick={handleCopy} className={`absolute top-4 right-4 p-2 rounded-md transition-colors duration-200 ${copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                            {copied ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-cyan-300 mb-2">Analysis</h3>
                        <ScoreMeter score={optimizationResult.qualityScore} label="Quality Score"/>
                        <ScoreMeter score={optimizationResult.safetyScore} label="Risk Score"/>
                        {optimizationResult.warnings.length > 0 && (
                            <div className="text-xs text-yellow-400 border-t border-slate-700 pt-3">
                                <p className="font-bold mb-1">Warnings:</p>
                                <ul className="list-disc list-inside">
                                    {optimizationResult.warnings.map((w,i) => <li key={i}>{w}</li>)}
                                </ul>
                            </div>
                        )}
                         {optimizationResult.enhancements.length > 0 && (
                            <div className="text-xs text-cyan-400 border-t border-slate-700 pt-3">
                                <p className="font-bold mb-1">Enhancements:</p>
                                <ul className="list-disc list-inside">
                                    {optimizationResult.enhancements.map((e,i) => <li key={i}>{e}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="text-center">
                 <button onClick={handleGenerateImage} disabled={isLoading || !optimizationResult} className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30">
                    {isLoading ? 'Generating Image...' : 'Generate Image'}
                 </button>
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

export default UltraOptimizerUI;