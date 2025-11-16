import React from 'react';

interface ApiKeySelectorProps {
  onSelectKey: () => void;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onSelectKey }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-8 max-w-lg text-center shadow-2xl shadow-cyan-500/10">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Veo Video Generation Requires API Key</h2>
        <p className="text-slate-300 mb-6">
          To generate videos with Veo, you must select a project with the Vertex AI API enabled. This is a necessary step for this advanced feature.
        </p>
        <p className="text-xs text-slate-500 mb-6">
          For more information on billing and project setup, please refer to the{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            official documentation
          </a>.
        </p>
        <button
          onClick={onSelectKey}
          className="w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
        >
          Select API Key / Project
        </button>
      </div>
    </div>
  );
};

export default ApiKeySelector;
