import React, { useState, useCallback } from 'react';
import { Prompt } from '../types';
import { CopyIcon, CheckIcon, ImageIcon, VideoIcon } from './Icons';
import VideoLoader from './VideoLoader';

interface PromptCardProps {
  prompt: Prompt & { 
    imageUrl?: string; 
    isImageLoading?: boolean;
    videoUrl?: string;
    isVideoLoading?: boolean;
    videoStatus?: string;
    videoError?: string;
  };
  onGenerateVideo: (id: number, promptText: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onGenerateVideo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const fullTextToCopy = `
${prompt.style_description}

${prompt.prompt_text}

Recommended Veo Settings:
${prompt.recommended_settings}
    `;
    navigator.clipboard.writeText(fullTextToCopy.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  const renderSettings = () => {
    return prompt.recommended_settings
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((setting, index) => {
        const parts = setting.split(':');
        const key = parts[0]?.trim();
        const value = parts.slice(1).join(':').trim();
        return (
          <li key={index} className="flex justify-between items-center text-sm">
            <span className="text-slate-400">{key}:</span>
            <span className="text-slate-100 font-semibold">{value}</span>
          </li>
        );
      });
  };

  const renderMedia = () => {
    if (prompt.isVideoLoading) {
      return <VideoLoader status={prompt.videoStatus || 'Starting...'} />;
    }
    if (prompt.videoUrl) {
      return <video src={prompt.videoUrl} controls autoPlay loop className="w-full h-full object-cover" />;
    }
    if (prompt.videoError) {
      return (
        <div className="text-red-300 flex flex-col items-center justify-center text-center p-4 gap-2">
            <ImageIcon />
            <span className="font-bold">Video Generation Failed</span>
            <p className="text-xs text-red-400">{prompt.videoError}</p>
        </div>
      );
    }
    if (prompt.isImageLoading) {
      return <div className="w-full h-full bg-slate-700 animate-pulse"></div>;
    }
    if (prompt.imageUrl) {
      return <img src={prompt.imageUrl} alt={prompt.style_description} className="w-full h-full object-cover" />;
    }
    return (
      <div className="text-slate-500 flex flex-col items-center gap-2">
        <ImageIcon />
        <span>Image Generation Failed</span>
      </div>
    );
  };


  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl flex flex-col h-full shadow-lg hover:shadow-cyan-500/10 hover:border-slate-600 transition-all duration-300 overflow-hidden backdrop-blur-sm">
      
      <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
        {renderMedia()}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
           <h3 className="text-lg font-bold text-slate-100 mb-2">{prompt.style_description}</h3>
          
          <p className="text-sm font-semibold text-cyan-400 mt-4 mb-2">Generated Prompt</p>
          <div className="text-slate-300 font-mono text-xs leading-relaxed bg-slate-900/50 p-3 rounded-md max-h-48 overflow-y-auto border border-slate-700">
            {prompt.prompt_text}
          </div>

          <p className="text-sm font-semibold text-cyan-400 mt-4 mb-2">Recommended Veo Settings</p>
          <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700">
              <ul className="space-y-2">
                  {renderSettings()}
              </ul>
          </div>

        </div>
        <div className="mt-6 flex justify-between items-center gap-4">
          <button
            onClick={() => onGenerateVideo(prompt.id, prompt.prompt_text)}
            disabled={prompt.isVideoLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <VideoIcon />
            {prompt.isVideoLoading ? 'Generating...' : 'Generate Video'}
          </button>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 ${
              copied
                ? 'bg-green-600 text-white focus:ring-green-500 shadow-lg shadow-green-500/20'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 focus:ring-cyan-500'
            }`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
