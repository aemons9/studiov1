import React, { useState } from 'react';
import type { PromptData } from '../types';

interface PromptReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  rawPromptData: PromptData;
  finalPrompt: string;
  provider: string;
}

const PromptReviewModal: React.FC<PromptReviewModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  rawPromptData,
  finalPrompt,
  provider,
}) => {
  const [activeTab, setActiveTab] = useState<'final' | 'raw'>('final');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate stats
  const charCount = finalPrompt.length;
  const wordCount = finalPrompt.split(/\s+/).filter(w => w.length > 0).length;
  const estimatedTokens = Math.ceil(charCount / 4); // Rough estimate: 1 token ≈ 4 chars

  // Warning thresholds
  const isVeryLong = charCount > 10000;
  const isLong = charCount > 5000;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    onGenerate();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      aria-labelledby="prompt-review-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] transform transition-all border border-gray-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 id="prompt-review-modal-title" className="text-2xl font-bold text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Prompt Review - {provider === 'replicate-flux' ? 'Flux' : 'Vertex AI'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats Panel */}
        <div className="px-6 py-4 bg-gray-900/50 border-b border-gray-700">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Characters:</span>
              <span className={`font-mono font-bold ${isVeryLong ? 'text-red-400' : isLong ? 'text-yellow-400' : 'text-green-400'}`}>
                {charCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Words:</span>
              <span className="font-mono font-bold text-blue-400">{wordCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Est. Tokens:</span>
              <span className="font-mono font-bold text-purple-400">~{estimatedTokens.toLocaleString()}</span>
            </div>
            {isVeryLong && (
              <div className="ml-auto flex items-center gap-2 text-red-400 bg-red-900/20 px-3 py-1 rounded-md border border-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Very Long - May fail!</span>
              </div>
            )}
            {isLong && !isVeryLong && (
              <div className="ml-auto flex items-center gap-2 text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-md border border-yellow-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Long prompt</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-900/30">
          <button
            onClick={() => setActiveTab('final')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'final'
                ? 'text-purple-400 bg-gray-800'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            Final Prompt
            {activeTab === 'final' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'raw'
                ? 'text-purple-400 bg-gray-800'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            Raw Data (JSON)
            {activeTab === 'raw' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'final' ? (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Final Woven Prompt
                </h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                {finalPrompt}
              </p>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Raw Prompt Data (JSON)
              </h3>
              <pre className="text-gray-200 text-xs font-mono overflow-x-auto">
                {JSON.stringify(rawPromptData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-900/30">
          <div className="text-sm text-gray-400">
            {isVeryLong ? (
              <p className="text-red-400">⚠️ This prompt is very long and may fail. Consider unlocking some fields.</p>
            ) : isLong ? (
              <p className="text-yellow-400">⚠️ This prompt is long. It may work, but watch for timeout errors.</p>
            ) : (
              <p className="text-green-400">✓ Prompt length looks good!</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Proceed to Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptReviewModal;
