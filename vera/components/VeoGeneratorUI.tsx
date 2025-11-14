import React, { useState, useCallback } from 'react';
import { generateVideo } from '../services/geminiService';
import { VideoIcon, SparklesIcon } from './Icons';
import VideoLoader from './VideoLoader';

interface VeoGeneratorUIProps {
    setHasVeoApiKey: (value: boolean) => void;
    hasVeoApiKey: boolean;
}

const VeoGeneratorUI: React.FC<VeoGeneratorUIProps> = ({ setHasVeoApiKey, hasVeoApiKey }) => {
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate a video.');
            return;
        }

        if (!hasVeoApiKey) {
            if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
                await window.aistudio.openSelectKey();
                // We assume success and proceed. If it fails, the API call will error out.
            } else {
                setError("API Key selection is not available in this environment.");
                return;
            }
        }

        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        
        try {
            const onStatusUpdate = (newStatus: string) => setStatus(newStatus);
            const url = await generateVideo(prompt, onStatusUpdate);
            setVideoUrl(url);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            console.error(err);
            if (errorMessage.includes("Requested entity was not found.")) {
                setHasVeoApiKey(false); // Reset key state if it's invalid
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, hasVeoApiKey, setHasVeoApiKey]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleGenerate();
        }
    };

    return (
        <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl flex flex-col gap-4">
             <h2 className="flex items-center gap-2 text-2xl font-bold text-cyan-300 mb-2">
                <VideoIcon />
                Quick Video Generation (Veo)
            </h2>
            <p className="text-slate-400 -mt-4 mb-2">Directly generate a video from a text prompt. This bypasses the Prompt Architect below.</p>
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., A neon hologram of a cat driving at top speed"
                    className="w-full p-4 pr-48 text-lg text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 placeholder:text-slate-500"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="absolute top-1/2 right-4 -translate-y-1/2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
                >
                    {isLoading ? 'Generating...' : 'Generate Video'}
                </button>
            </div>

            {(isLoading || videoUrl || error) && (
                 <div className="mt-4 aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-700">
                    {isLoading && <VideoLoader status={status} />}
                    {videoUrl && <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />}
                    {error && (
                        <div className="text-red-300 text-center p-4">
                            <h3 className="font-bold text-lg">Generation Failed</h3>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    )}
                 </div>
            )}
        </div>
    );
};

export default VeoGeneratorUI;
