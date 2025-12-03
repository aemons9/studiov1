import React from 'react';
import type { RiskAnalysis } from '../types';

interface RiskAnalysisPreviewProps {
  analysis: RiskAnalysis | null;
  isLoading: boolean;
  onApplyEnhancements: (enhancements: { original: string; replacement: string }[]) => void;
}

const ProgressBar: React.FC<{ value: number; color: string }> = ({ value, color }) => (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value * 100}%` }}></div>
    </div>
);


const RiskAnalysisPreview: React.FC<RiskAnalysisPreviewProps> = ({ analysis, isLoading, onApplyEnhancements }) => {
    if (isLoading) {
        return (
            <div className="text-center text-gray-400 p-4">
                <svg className="animate-spin h-6 w-6 text-gray-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-sm">Analyzing prompt...</p>
            </div>
        );
    }
    
    if (!analysis) {
        return (
            <div className="text-center text-gray-500 p-4 border-2 border-dashed border-gray-700 rounded-lg">
                <p>Provide GCP credentials to enable real-time risk analysis.</p>
            </div>
        );
    }

    // Defensive checks for undefined values
    const riskScore = analysis.riskScore ?? 0.5;
    const successProbability = analysis.successProbability ?? 0.5;
    const appliedEnhancements = analysis.appliedEnhancements ?? [];
    const recommendedApi = analysis.recommendedApi ?? 'Imagen';
    const reasoning = analysis.reasoning ?? 'Risk analysis in progress...';

    const riskColor = riskScore > 0.7 ? 'bg-red-500' : riskScore > 0.4 ? 'bg-yellow-500' : 'bg-green-500';
    const successColor = successProbability > 0.7 ? 'bg-green-500' : successProbability > 0.4 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-300">Risk Score</span>
                        <span className="text-sm font-bold">{riskScore.toFixed(2)}</span>
                    </div>
                    <ProgressBar value={riskScore} color={riskColor} />
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-300">Success Probability</span>
                        <span className="text-sm font-bold">{(successProbability * 100).toFixed(0)}%</span>
                    </div>
                    <ProgressBar value={successProbability} color={successColor} />
                </div>
            </div>
            
             <div className="text-center">
                <p className="text-sm text-gray-400">Recommended API:
                    <span className="font-bold text-lg text-fuchsia-400 ml-2">{recommendedApi}</span>
                </p>
            </div>

            <details className="text-sm">
                <summary className="cursor-pointer text-gray-400 hover:text-white">Analysis Details</summary>
                <p className="mt-2 p-3 bg-gray-800 rounded-md text-gray-300">{reasoning}</p>
            </details>

            {appliedEnhancements.length > 0 && (
                 <div className="p-3 bg-amber-900/30 border border-amber-700/50 rounded-lg space-y-3">
                    <div className="flex justify-between items-center gap-3">
                       <div className="flex-grow">
                         <p className="font-semibold text-amber-300">Safety Suggestions Available</p>
                         <p className="text-xs text-amber-400">Apply these to improve generation success.</p>
                       </div>
                        <button
                          onClick={() => onApplyEnhancements(appliedEnhancements)}
                          className="px-4 py-2 bg-sky-600 text-white font-semibold text-sm rounded-md hover:bg-sky-500 transition-colors flex-shrink-0"
                        >
                            Apply
                        </button>
                    </div>
                    <details className="text-sm">
                        <summary className="cursor-pointer text-gray-400 hover:text-white">
                            View {appliedEnhancements.length} suggestions...
                        </summary>
                        <div className="mt-2 p-3 bg-gray-800 rounded-md max-h-32 overflow-y-auto">
                            <ul className="space-y-1">
                                {appliedEnhancements.map((e, i) => (
                                    <li key={i} className="font-mono text-xs">
                                        <span className="text-red-400">{e.original}</span>
                                        <span className="text-gray-500"> → </span>
                                        <span className="text-green-400">{e.replacement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                 </div>
            )}
        </div>
    );
};

export default RiskAnalysisPreview;