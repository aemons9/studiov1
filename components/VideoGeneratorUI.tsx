import React, { useState, useCallback } from 'react';
import { generateVideo } from '../services/videoGenerationService';
import VideoLoader from './VideoLoader';
import type { GenerationSettings } from '../types';

interface VideoGeneratorUIProps {
  generationSettings: GenerationSettings;
  initialPrompt?: string;
}

const VideoGeneratorUI: React.FC<VideoGeneratorUIProps> = ({ generationSettings, initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate a video.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const onStatusUpdate = (newStatus: string) => setStatus(newStatus);

      // Pass project ID and access token from generation settings
      const projectId = generationSettings.projectId;
      const accessToken = generationSettings.accessToken;

      const url = await generateVideo(prompt, onStatusUpdate, projectId, accessToken);
      setVideoUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Video generation error:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, generationSettings]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h2 className="text-2xl font-bold text-purple-300">
          Video Generation (Veo)
        </h2>
      </div>

      <p className="text-gray-400 text-sm -mt-2">
        Generate videos using Vertex AI Veo. You can use prompts generated from the main mode or enter your own.
      </p>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-300">
          Video Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your video prompt here... (Ctrl+Enter to generate)"
          rows={4}
          className="w-full p-4 text-base text-gray-200 bg-gray-900/70 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder:text-gray-500 resize-none"
          disabled={isLoading}
        />

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
        >
          {isLoading ? 'Generating Video...' : 'Generate Video'}
        </button>
      </div>

      {(isLoading || videoUrl || error) && (
        <div className="mt-4 aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-700">
          {isLoading && <VideoLoader status={status} />}
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              className="w-full h-full object-cover"
            />
          )}
          {error && (
            <div className="text-red-300 text-center p-4">
              <h3 className="font-bold text-lg">Generation Failed</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        <p>💡 <strong>Tip:</strong> Use the "Generate Prompt" button above to create optimized video prompts with safety strategies.</p>
        <p>🎬 <strong>Duration:</strong> Videos are approximately 5 seconds long in 9:16 aspect ratio.</p>
      </div>
    </div>
  );
};

export default VideoGeneratorUI;
