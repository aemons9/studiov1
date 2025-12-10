import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  loadAllVisualNovelAssets,
  getBackgroundForScene,
  getSpriteForExpression,
  getCGForScene,
  hasNewAssets,
  type LoadedAssets
} from './assetLoader';
import {
  SCENES,
  INITIAL_VARIABLES,
  type Scene,
  type Choice,
  type GameVariables,
  isChoiceAvailable,
  applyChoiceEffects,
  determineEnding
} from './chapterOneExpandedScenes';
import VariableTracker from './VariableTracker';
import { gameStateReducer, type ExtendedGameState, INITIAL_GAME_STATE } from './GameStateManager';
import './visualnovel.css';

// ============================================================================
// NEW STORY: Zara — Chapter 1: Light & Shadow
// Photography studio storyline with sophisticated variables and branching
// ============================================================================

interface RealVisualNovelProps {
  onExit: () => void;
}

const RealVisualNovel: React.FC<RealVisualNovelProps> = ({ onExit }) => {
  // Use the advanced game state reducer
  const [gameState, dispatch] = useReducer(gameStateReducer, INITIAL_GAME_STATE);

  const [showingChoices, setShowingChoices] = useState(false);
  const [sceneTransition, setSceneTransition] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Asset Loading
  const [loadedAssets, setLoadedAssets] = useState<LoadedAssets>(() => loadAllVisualNovelAssets());

  // Hot-reload assets
  useEffect(() => {
    const interval = setInterval(() => {
      const newAssets = loadAllVisualNovelAssets();
      if (hasNewAssets(loadedAssets, newAssets)) {
        console.log('🔄 New VN assets detected!');
        setLoadedAssets(newAssets);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [loadedAssets]);

  // Get current scene, beat, and dialogue
  const currentScene = SCENES[gameState.currentSceneId];
  const currentBeat = currentScene?.sceneFlow[gameState.currentBeatIndex];
  const currentDialogue = currentBeat?.dialogue?.[gameState.currentDialogueIndex];

  const isLastDialogueInBeat = currentBeat && currentBeat.dialogue && gameState.currentDialogueIndex >= currentBeat.dialogue.length - 1;
  const isLastBeat = currentScene && gameState.currentBeatIndex >= currentScene.sceneFlow.length - 1;

  // CG Image State
  const [showCG, setShowCG] = useState(false);
  const [cgImageUrl, setCgImageUrl] = useState<string | null>(null);

  // Production Features
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [skipMode, setSkipMode] = useState(false);
  const [textHistory, setTextHistory] = useState<Array<{speaker: string, line: string}>>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Text typing effect
  useEffect(() => {
    if (!currentDialogue) return;

    setIsTyping(true);
    setDisplayedText('');

    // Add to history
    setTextHistory(prev => [...prev, {
      speaker: currentDialogue.speaker,
      line: currentDialogue.line
    }]);

    const text = currentDialogue.line;
    let index = 0;
    const speed = skipMode ? 5 : 30; // Faster typing in skip mode

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);

        // Auto-advance after a delay if enabled
        if (autoAdvance && !showingChoices) {
          setTimeout(() => {
            advanceDialogue();
          }, 2000);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentDialogue, skipMode, autoAdvance, showingChoices]);

  // CG Image display effect - Show CG when beat has one
  useEffect(() => {
    if (!currentBeat) return;

    // Check if current beat has a CG image
    if (currentBeat.cg) {
      const cgUrl = getCGForScene(gameState.currentSceneId, loadedAssets);
      if (cgUrl) {
        console.log('🎨 Displaying CG:', currentBeat.cg, 'URL:', cgUrl);
        setCgImageUrl(cgUrl);
        setShowCG(true);
      } else {
        console.warn('⚠️ CG image not found:', currentBeat.cg);
        setShowCG(false);
      }
    } else {
      // No CG for this beat, hide it
      setShowCG(false);
      setCgImageUrl(null);
    }
  }, [currentBeat, gameState.currentSceneId, loadedAssets]);

  // Advance dialogue
  const advanceDialogue = useCallback(() => {
    if (isTyping) {
      // Skip typing
      setDisplayedText(currentDialogue?.line || '');
      setIsTyping(false);
      return;
    }

    if (isLastDialogueInBeat) {
      if (isLastBeat) {
        // Show choices if scene has them
        if (currentScene?.choices && currentScene.choices.length > 0) {
          setShowingChoices(true);
        } else {
          // No choices, check for ending
          const ending = determineEnding(gameState);
          if (ending) {
            console.log('📖 Ending reached:', ending.id);
            // TODO: Show ending screen
          }
        }
      } else {
        // Advance to next beat
        dispatch({ type: 'ADVANCE_BEAT' });
      }
    } else {
      // Advance to next dialogue in beat
      dispatch({ type: 'ADVANCE_DIALOGUE' });
    }
  }, [isTyping, isLastDialogueInBeat, isLastBeat, currentDialogue, currentBeat, gameState, dispatch]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!showingChoices && !showHistory) {
          advanceDialogue();
        }
      } else if (e.key === 'Escape') {
        if (showHistory) {
          setShowHistory(false);
        } else if (showQuickMenu) {
          setShowQuickMenu(false);
        } else {
          onExit();
        }
      } else if (e.key === 'h' || e.key === 'H') {
        // H key toggles history
        setShowHistory(!showHistory);
      } else if (e.key === 'q' || e.key === 'Q') {
        // Q key toggles quick menu
        setShowQuickMenu(!showQuickMenu);
      } else if (e.key === 'a' || e.key === 'A') {
        // A key toggles auto-advance
        setAutoAdvance(!autoAdvance);
      } else if (e.key === 'Control' && !skipMode) {
        // Hold Ctrl to skip
        setSkipMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setSkipMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [advanceDialogue, showingChoices, showHistory, showQuickMenu, autoAdvance, skipMode, onExit]);

  // Handle choice selection
  const selectChoice = (choice: Choice) => {
    setShowingChoices(false);

    // Apply effects
    if (choice.effects) {
      dispatch({ type: 'APPLY_EFFECTS', payload: choice.effects });
    }

    // Scene transition
    setSceneTransition(true);
    setTimeout(() => {
      dispatch({ type: 'SELECT_CHOICE', payload: choice });
      setTimeout(() => setSceneTransition(false), 50);
    }, 500);
  };

  // Get available choices (filtered by conditions) from scene, not beat
  const availableChoices = currentScene?.choices?.filter(choice =>
    isChoiceAvailable(choice, gameState)
  ) || [];

  // Get background
  const backgroundImage = currentScene?.background || getBackgroundForScene(gameState.currentSceneId, loadedAssets);

  // Get sprite based on scene and emotion
  const spriteEmotion = currentDialogue?.emotion || 'neutral';
  const spriteUrl = getSpriteForExpression(spriteEmotion as any, loadedAssets);

  if (!currentScene || !currentBeat || !currentDialogue) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Scene not found</h2>
          <p className="mb-4">Scene: {gameState.currentSceneId}</p>
          <button onClick={onExit} className="px-6 py-3 bg-purple-600 rounded-lg">Exit</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black text-white overflow-hidden"
      onClick={() => !showingChoices && advanceDialogue()}
    >
      {/* Scene Transition */}
      <div
        className={`absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-500 ${
          sceneTransition ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover transition-all duration-1000"
          style={{ filter: 'brightness(0.6)' }}
        />
      </div>

      {/* CG Image Overlay - Displays over background when scene has CG */}
      {showCG && cgImageUrl && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 animate-fade-in">
          <img
            src={cgImageUrl}
            alt="CG Illustration"
            className="max-w-[90%] max-h-[90%] object-contain shadow-2xl rounded-lg"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(138, 43, 226, 0.5))',
            }}
          />
          {/* CG dismiss hint */}
          <div className="absolute bottom-8 right-8 text-white/60 text-sm animate-pulse">
            Click to continue
          </div>
        </div>
      )}

      {/* Character Sprite */}
      {spriteUrl && currentDialogue.speaker === 'zara' && !showCG && (
        <div className="absolute bottom-0 right-1/4 pointer-events-none z-10" style={{ height: '60vh' }}>
          <img
            src={spriteUrl}
            alt={`Zara - ${spriteEmotion}`}
            className="sprite-character"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.9))',
              mixBlendMode: 'normal',
              imageRendering: 'high-quality',
            }}
          />
        </div>
      )}

      {/* Variable Tracker */}
      <VariableTracker
        variables={gameState}
        showDetailed={true}
        position="top-right"
      />

      {/* Dialogue Box */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-8 pb-8 pt-16">
          {/* Speaker Name */}
          {currentDialogue.speaker !== 'narrator' && (
            <div className="mb-2 ml-2">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-t-xl shadow-lg">
                <span className="font-bold text-lg tracking-wide">
                  {currentDialogue.speaker.charAt(0).toUpperCase() + currentDialogue.speaker.slice(1)}
                </span>
              </div>
            </div>
          )}

          {/* Dialogue Box */}
          <div className="bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-gray-900/95 backdrop-blur-md border-2 border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

            <div className="p-8 min-h-[140px] relative">
              <p className="text-xl leading-relaxed font-light text-white">
                {displayedText}
              </p>

              {/* Continue Indicator */}
              {!isTyping && !showingChoices && (
                <div className="absolute bottom-6 right-6">
                  <div className="animate-bounce">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Choices */}
          {showingChoices && availableChoices.length > 0 && (
            <div className="mt-6 space-y-4">
              {availableChoices.map((choice, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectChoice(choice);
                  }}
                  className="group w-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-500 hover:to-pink-500 border-2 border-purple-400/50 hover:border-purple-300 text-white font-semibold text-lg py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-left relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{choice.text}</span>

                  {/* Show effects preview */}
                  {choice.effects && (
                    <div className="text-sm opacity-70 mt-1">
                      {choice.effects.ZaraComfort && (
                        <span className="mr-3">💗 {choice.effects.ZaraComfort > 0 ? '+' : ''}{choice.effects.ZaraComfort}</span>
                      )}
                      {choice.effects.Trust && (
                        <span className="mr-3">🤝 {choice.effects.Trust > 0 ? '+' : ''}{choice.effects.Trust}</span>
                      )}
                      {choice.effects.ArtisticCohesion && (
                        <span>🎨 {choice.effects.ArtisticCohesion > 0 ? '+' : ''}{choice.effects.ArtisticCohesion}</span>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* UI Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-40">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExit();
          }}
          className="bg-black/60 hover:bg-black/80 border border-gray-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          ✕ Exit
        </button>
      </div>

      {/* Progress */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg z-40">
        <p className="text-sm text-purple-300">
          📖 {currentScene.title} | Scene {gameState.currentSceneId} | Beat {gameState.currentBeatIndex + 1}/{currentScene.sceneFlow.length}
        </p>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-xs text-gray-400 z-40">
        <p>🖱️ Click / Enter: Advance | H: History | Q: Menu | A: Auto | Ctrl: Skip | ESC: Exit</p>
        {autoAdvance && <p className="text-green-400 mt-1">▶ Auto-Advance ON</p>}
        {skipMode && <p className="text-yellow-400 mt-1">⏩ Skip Mode ON</p>}
      </div>

      {/* Quick Menu */}
      {showQuickMenu && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in" onClick={() => setShowQuickMenu(false)}>
          <div className="quick-menu bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-2 border-purple-500/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Quick Menu</h2>

            <div className="space-y-4">
              {/* Auto-Advance Toggle */}
              <button
                onClick={() => {
                  setAutoAdvance(!autoAdvance);
                  setShowQuickMenu(false);
                }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  autoAdvance
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {autoAdvance ? '▶ Auto-Advance: ON' : '⏸ Auto-Advance: OFF'}
              </button>

              {/* History Button */}
              <button
                onClick={() => {
                  setShowHistory(true);
                  setShowQuickMenu(false);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all"
              >
                📜 Text History
              </button>

              {/* Save Game */}
              <button
                onClick={() => {
                  dispatch({ type: 'SAVE_STATE' });
                  alert('Game saved successfully!');
                  setShowQuickMenu(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all"
              >
                💾 Save Game
              </button>

              {/* Load Game */}
              <button
                onClick={() => {
                  dispatch({ type: 'LOAD_STATE' });
                  alert('Game loaded!');
                  setShowQuickMenu(false);
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all"
              >
                📂 Load Game
              </button>

              {/* Exit to Title */}
              <button
                onClick={() => {
                  if (confirm('Return to title screen? Unsaved progress will be lost.')) {
                    onExit();
                  }
                }}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all"
              >
                🚪 Exit to Title
              </button>

              {/* Close Menu */}
              <button
                onClick={() => setShowQuickMenu(false)}
                className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 py-4 px-6 rounded-xl font-semibold text-lg transition-all"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text History Overlay */}
      {showHistory && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg z-50 overflow-hidden animate-fade-in" onClick={() => setShowHistory(false)}>
          <div className="h-full flex flex-col p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">📜 Text History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-black/40 rounded-2xl p-6 border border-purple-500/30">
              <div className="space-y-6">
                {textHistory.map((entry, index) => (
                  <div key={index} className="animate-slide-up">
                    {entry.speaker !== 'narrator' && (
                      <div className="text-purple-400 font-bold mb-2">
                        {entry.speaker.charAt(0).toUpperCase() + entry.speaker.slice(1)}
                      </div>
                    )}
                    <div className="text-white/90 text-lg leading-relaxed pl-4 border-l-2 border-purple-500/50">
                      {entry.line}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center text-gray-400 text-sm">
              Total lines: {textHistory.length} | Press ESC or H to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealVisualNovel;
