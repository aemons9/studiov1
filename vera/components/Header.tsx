import React from 'react';

interface HeaderProps {
  mode: 'veo' | 'imagen4';
  setMode: (mode: 'veo' | 'imagen4') => void;
  onExit?: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode, onExit }) => {
  const getButtonClass = (buttonMode: 'veo' | 'imagen4') => {
    const base = "px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    if (mode === buttonMode) {
      return `${base} bg-cyan-500 text-white shadow-lg shadow-cyan-500/20`;
    }
    return `${base} bg-slate-700/50 text-slate-300 hover:bg-slate-700`;
  };

  return (
    <header className="text-center py-6 relative">
      <div className="absolute inset-x-0 top-0 h-32 -z-10 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
      {onExit && (
        <div className="absolute right-0 top-6">
          <button
            onClick={onExit}
            className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-800/40 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300"
          >
            ← Exit to Studio
          </button>
        </div>
      )}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100">
        Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">Architect</span>
      </h1>
      <p className="mt-3 text-lg font-semibold text-cyan-300 tracking-wider">Indian Glamour Edition</p>
      
      <div className="mt-8 flex justify-center gap-2">
        <button onClick={() => setMode('veo')} className={getButtonClass('veo')}>
          Veo Architect
        </button>
        <button onClick={() => setMode('imagen4')} className={getButtonClass('imagen4')}>
          Imagen 4 Architect
        </button>
      </div>

      <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
        {mode === 'veo' 
          ? "Visually architect stunning, cinematic video prompts for Google's Veo AI, featuring a curated collection of specialized Indian glamour models."
          : "Generate breathtaking, high-fidelity still images with Imagen 4, using a powerful prompt generation engine based on Indian model archetypes."
        }
      </p>
    </header>
  );
};

export default Header;