import React, { useState } from 'react';

interface MobileControlBarProps {
  isLoading: boolean;
  onLoad: () => void;
  onStorage: () => void;
  onGallery: () => void;
  onHistory: () => void;
  onSave: () => void;
  onCopy: () => void;
  onReset: () => void;
  onGenerateVideo: () => void;
  onMasterGenerate: () => void;
  onExperimental: () => void;
  onArtistic: () => void;
  onCorporate: () => void;
  onPlatinum: () => void;
  onRoleplay: () => void;
  onGalleryMode: () => void;
  onVideoMode: () => void;
  onVera: () => void;
  onMasterClass: () => void;
  onVisualNovel: () => void;
  onVNAssets: () => void;
  isGeneratingPrompt?: boolean;
  hasPrompt?: boolean;
  hasProjectId?: boolean;
}

const MobileControlBar: React.FC<MobileControlBarProps> = ({
  isLoading,
  onLoad,
  onStorage,
  onGallery,
  onHistory,
  onSave,
  onCopy,
  onReset,
  onGenerateVideo,
  onMasterGenerate,
  onExperimental,
  onArtistic,
  onCorporate,
  onPlatinum,
  onRoleplay,
  onGalleryMode,
  onVideoMode,
  onVera,
  onMasterClass,
  onVisualNovel,
  onVNAssets,
  isGeneratingPrompt = false,
  hasPrompt = true,
  hasProjectId = true
}) => {
  const [showUtilities, setShowUtilities] = useState(false);
  const [showModes, setShowModes] = useState(false);

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
      {/* Primary Actions Row - Always Visible */}
      <div className="p-3 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 sm:gap-3">
        {/* Main Generation Buttons - Full width on mobile, auto on desktop */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={onGenerateVideo}
            disabled={isLoading || isGeneratingPrompt || !hasPrompt}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg hover:from-purple-700 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              <path d="M14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
            <span className="hidden sm:inline">Generate Video Prompt</span>
            <span className="sm:hidden">Video</span>
          </button>

          <button
            onClick={onMasterGenerate}
            disabled={isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3z"/>
            </svg>
            <span className="hidden sm:inline">Master Generate</span>
            <span className="sm:hidden">Generate</span>
          </button>
        </div>
      </div>

      {/* Collapsible Utilities Section */}
      <div className="border-t border-gray-700">
        <button
          onClick={() => setShowUtilities(!showUtilities)}
          className="w-full px-4 py-2 flex items-center justify-between text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <span className="text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Utilities ({showUtilities ? 'Hide' : 'Show'})
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${showUtilities ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>

        {showUtilities && (
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 bg-gray-800/50">
            <button onClick={onLoad} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Load
            </button>

            <button onClick={onStorage} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
              Storage
            </button>

            <button onClick={onGallery} disabled={isLoading || !hasProjectId} className="flex flex-col items-center justify-center gap-1 p-2 bg-indigo-700 text-white font-medium text-xs rounded-lg hover:bg-indigo-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gallery
            </button>

            <button onClick={onHistory} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>

            <button onClick={onSave} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 014-4h4a4 4 0 014 4v2H7v-2z" />
              </svg>
              Save
            </button>

            <button onClick={onCopy} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>

            <button onClick={onReset} disabled={isLoading} className="flex flex-col items-center justify-center gap-1 p-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Collapsible Modes Section */}
      <div className="border-t border-gray-700">
        <button
          onClick={() => setShowModes(!showModes)}
          className="w-full px-4 py-2 flex items-center justify-between text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <span className="text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            Special Modes ({showModes ? 'Hide' : 'Show'})
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${showModes ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>

        {showModes && (
          <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-800/50">
            <button onClick={onExperimental} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🔬</span> Experimental
            </button>

            <button onClick={onArtistic} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-rose-500 text-white font-semibold text-xs rounded-lg hover:from-purple-400 hover:to-rose-400 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎨</span> Artistic
            </button>

            <button onClick={onCorporate} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold text-xs rounded-lg hover:from-indigo-400 hover:to-emerald-400 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>💼</span> Corporate
            </button>

            <button onClick={onPlatinum} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold text-xs rounded-lg hover:from-purple-500 hover:via-pink-400 hover:to-indigo-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>💎</span> Platinum
            </button>

            <button onClick={onRoleplay} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 text-white font-semibold text-xs rounded-lg hover:from-pink-500 hover:via-purple-400 hover:to-pink-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎭</span> Roleplay
            </button>

            <button onClick={onGalleryMode} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold text-xs rounded-lg hover:from-rose-400 hover:via-pink-400 hover:to-fuchsia-400 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎨</span> Gallery
            </button>

            <button onClick={onVideoMode} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold text-xs rounded-lg hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎬</span> Video
            </button>

            <button onClick={onVera} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white font-semibold text-xs rounded-lg hover:from-cyan-500 hover:via-teal-500 hover:to-emerald-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>✨</span> Vera
            </button>

            <button onClick={onMasterClass} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-semibold text-xs rounded-lg hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎭</span> MasterClass
            </button>
            <button onClick={onVisualNovel} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold text-xs rounded-lg hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>📖</span> Visual Novel
            </button>

            <button onClick={onVNAssets} disabled={isLoading} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white font-semibold text-xs rounded-lg hover:from-green-500 hover:via-teal-500 hover:to-cyan-500 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all active:scale-95">
              <span>🎨</span> VN Assets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileControlBar;
