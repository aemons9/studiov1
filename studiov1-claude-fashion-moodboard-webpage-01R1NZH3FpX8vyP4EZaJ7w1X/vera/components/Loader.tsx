import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24 text-center">
      <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-6 text-slate-300 text-xl font-semibold">The AI Architect is crafting your vision...</p>
      <p className="mt-2 text-slate-400">This can take a moment, especially for complex scenes.</p>
    </div>
  );
};

export default Loader;