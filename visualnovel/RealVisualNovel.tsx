import React, { useState, useEffect, useCallback } from 'react';
import {
  loadAllVisualNovelAssets,
  getBackgroundForScene,
  getSpriteForExpression,
  getCGForScene,
  hasNewAssets,
  type LoadedAssets
} from './assetLoader';

// ============================================================================
// TYPES
// ============================================================================

interface DialogueLine {
  speaker: string;
  text: string;
  expression?: 'neutral' | 'smile' | 'flirty' | 'surprised' | 'shy' | 'serious' | 'happy' | 'thinking';
  background?: string; // Change background for this line
  music?: string; // Background music
}

interface Choice {
  text: string;
  nextScene: string;
}

interface Scene {
  id: string;
  background: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
}

interface GameState {
  currentSceneId: string;
  currentLineIndex: number;
  textSpeed: number;
  autoPlay: boolean;
  history: { sceneId: string; lineIndex: number }[];
}

// ============================================================================
// GAME DATA - Chapter 1: The Golden Hour Connection
// ============================================================================

const SCENES: Record<string, Scene> = {
  intro: {
    id: 'intro',
    background: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=1920',
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The art gallery hums with conversation and clinking glasses. Golden hour light streams through tall windows.',
        expression: 'neutral'
      },
      {
        speaker: 'Narrator',
        text: 'You notice her immediately—Zara, the Instagram model whose feed you\'ve admired for months.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Oh! You\'re here for the exhibition too?',
        expression: 'smile'
      },
      {
        speaker: 'Zara',
        text: 'I\'m Zara. I love coming to these openings—there\'s something magical about seeing art in person, you know?',
        expression: 'happy'
      },
      {
        speaker: 'You',
        text: 'I know exactly what you mean. I\'m actually... well, I recognized you from Instagram.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Ha! I hope in a good way?',
        expression: 'flirty'
      },
      {
        speaker: 'You',
        text: 'Absolutely. Your aesthetic is incredible. The way you capture light and mood...',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Thank you... that actually means a lot. Most people just focus on, well...',
        expression: 'shy'
      },
      {
        speaker: 'Zara',
        text: '*gestures at herself with a self-deprecating smile* ...the obvious.',
        expression: 'smile'
      },
      {
        speaker: 'Narrator',
        text: 'She\'s even more stunning in person—her hourglass figure turns heads, but it\'s her eyes that captivate you. There\'s intelligence there, curiosity.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'So... what brings you here? Are you an artist? Collector? Or just a fellow appreciator of beautiful things?',
        expression: 'thinking'
      }
    ],
    choices: [
      {
        text: '📸 "I\'m a photographer. I\'d love to collaborate with you sometime."',
        nextScene: 'photographer_path'
      },
      {
        text: '👗 "I\'m actually a fashion stylist. Your wardrobe choices are always on point."',
        nextScene: 'stylist_path'
      },
      {
        text: '😊 "Just an appreciator. Though I\'d love to get to know you better."',
        nextScene: 'charm_path'
      }
    ]
  },

  photographer_path: {
    id: 'photographer_path',
    background: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=1920',
    dialogue: [
      {
        speaker: 'Zara',
        text: 'A photographer? Now you have my attention.',
        expression: 'happy'
      },
      {
        speaker: 'Zara',
        text: 'I work with photographers all the time, but most of them just want the same Instagram-friendly shots.',
        expression: 'serious'
      },
      {
        speaker: 'Zara',
        text: 'Bright colors, perfect poses, ring lights... It gets repetitive.',
        expression: 'thinking'
      },
      {
        speaker: 'You',
        text: 'That\'s not my style. I prefer natural light, real moments. Chiaroscuro—light and shadow telling a story.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*eyes light up* Yes! Like Caravaggio, right? That dramatic contrast?',
        expression: 'happy'
      },
      {
        speaker: 'You',
        text: 'Exactly. I\'d love to shoot you in that style. No ring lights, no filters. Just you, natural light, and shadows.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'That sounds... different. In a good way.',
        expression: 'smile'
      },
      {
        speaker: 'Zara',
        text: 'When were you thinking?',
        expression: 'flirty'
      }
    ],
    choices: [
      {
        text: '☀️ "Tomorrow afternoon? Golden hour at my studio."',
        nextScene: 'photographer_studio'
      },
      {
        text: '🌙 "How about an evening shoot? More dramatic lighting."',
        nextScene: 'photographer_evening'
      }
    ]
  },

  photographer_studio: {
    id: 'photographer_studio',
    background: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=1920',
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'The next day. Zara arrives at your studio wearing a simple white linen dress.',
        expression: 'neutral',
        background: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920'
      },
      {
        speaker: 'Zara',
        text: 'Wow, this space is beautiful. That north-facing window...',
        expression: 'happy'
      },
      {
        speaker: 'You',
        text: 'Perfect for soft, directional light. Ready to create some art?',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Let\'s do this. Show me how you see me.',
        expression: 'smile'
      },
      {
        speaker: 'Narrator',
        text: 'The shoot flows naturally. No forced poses, just movement and light. She trusts you, and it shows.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*after an hour* Can I see what you\'ve captured?',
        expression: 'thinking'
      },
      {
        speaker: 'You',
        text: '*shows camera screen*',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*gasps softly* Oh my god... I look like a painting.',
        expression: 'surprised'
      },
      {
        speaker: 'Zara',
        text: 'You actually made me look... artistic. Not just pretty. Beautiful AND meaningful.',
        expression: 'shy'
      },
      {
        speaker: 'You',
        text: 'That\'s because you ARE both. I just captured what was already there.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*meets your eyes* You know... I\'ve been thinking about doing something more personal. More intimate.',
        expression: 'flirty'
      },
      {
        speaker: 'Zara',
        text: 'A boudoir session. But artistic, like this. Would you... be interested?',
        expression: 'shy'
      }
    ],
    choices: [
      {
        text: '✨ "I\'d be honored. Let\'s create something beautiful together."',
        nextScene: 'boudoir_artistic'
      },
      {
        text: '🤔 "That\'s a big step. Let\'s build trust first with a few more sessions."',
        nextScene: 'build_trust'
      }
    ]
  },

  boudoir_artistic: {
    id: 'boudoir_artistic',
    background: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920',
    dialogue: [
      {
        speaker: 'Narrator',
        text: 'A week later. Your bedroom studio, dimly lit. Luxury white bedding, dramatic shadows.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*breathes deeply, nervous* I\'ve never done this before. Not like this.',
        expression: 'shy'
      },
      {
        speaker: 'You',
        text: 'We move at your pace. If you\'re uncomfortable at any point, we stop. This is about trust.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'I trust you. Show me how you see beauty.',
        expression: 'smile'
      },
      {
        speaker: 'Narrator',
        text: 'The session is electric. She reclines on the bed, minimal black lace, shadows playing across her curves.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'This feels... empowering. Like I\'m art, not just a pretty face.',
        expression: 'happy'
      },
      {
        speaker: 'You',
        text: '*capturing shots* You ARE art. Museum-quality.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Can you come closer? I want... more intimacy in the shots.',
        expression: 'flirty'
      },
      {
        speaker: 'Narrator',
        text: 'You move closer. The camera clicks. The air between you crackles with tension.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*whispers* Maybe... maybe we could take a break from shooting?',
        expression: 'shy'
      },
      {
        speaker: 'Narrator',
        text: '✨ BOUDOIR SESSION COMPLETE: Artistic Shadows ✨',
        expression: 'neutral'
      },
      {
        speaker: 'Narrator',
        text: 'Your relationship with Zara deepens. Trust built, intimacy earned, art created.',
        expression: 'neutral'
      }
    ],
    choices: [
      {
        text: '💕 Continue Story (Chapter 2 - Coming Soon)',
        nextScene: 'chapter2_preview'
      },
      {
        text: '🔄 Restart Chapter 1',
        nextScene: 'intro'
      }
    ]
  },

  stylist_path: {
    id: 'stylist_path',
    background: 'https://images.unsplash.com/photo-1558769132-cb1aea3c7c7e?w=1920',
    dialogue: [
      {
        speaker: 'Zara',
        text: 'A stylist! Oh, this is perfect timing.',
        expression: 'happy'
      },
      {
        speaker: 'Zara',
        text: 'I have a high-end fashion shoot next week and I\'m struggling with the wardrobe concept.',
        expression: 'thinking'
      },
      {
        speaker: 'You',
        text: 'What\'s the theme?',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'Luxury minimalism. Elegant but sensual. I want to show that you can be sexy without being obvious.',
        expression: 'serious'
      },
      {
        speaker: 'You',
        text: 'I love that. Silk, lace, clean lines. Let the fabric and fit do the talking.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*eyes widen* Yes! Exactly! Can you help me?',
        expression: 'happy'
      }
    ],
    choices: [
      {
        text: '✨ "Absolutely. Let\'s create something unforgettable."',
        nextScene: 'fashion_shoot'
      }
    ]
  },

  charm_path: {
    id: 'charm_path',
    background: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920',
    dialogue: [
      {
        speaker: 'Zara',
        text: '*laughs* Direct. I like that.',
        expression: 'flirty'
      },
      {
        speaker: 'Zara',
        text: 'Most people try to impress me with their connections or their camera gear.',
        expression: 'smile'
      },
      {
        speaker: 'You',
        text: 'I\'d rather just talk. Get to know the real you, not the Instagram you.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: 'The real me is... complicated. Are you sure you want to go there?',
        expression: 'thinking'
      },
      {
        speaker: 'You',
        text: 'Complicated is interesting. Perfect is boring.',
        expression: 'neutral'
      },
      {
        speaker: 'Zara',
        text: '*smiles genuinely* Okay. Let\'s grab coffee after this. I want to hear your story too.',
        expression: 'happy'
      }
    ],
    choices: [
      {
        text: '☕ "There\'s a great cafe nearby. Let\'s go."',
        nextScene: 'coffee_date'
      }
    ]
  },

  chapter2_preview: {
    id: 'chapter2_preview',
    background: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
    dialogue: [
      {
        speaker: 'Narrator',
        text: '📖 Chapter 2: Deeper Connections (Coming Soon)',
        expression: 'neutral'
      },
      {
        speaker: 'Narrator',
        text: 'Continue Zara\'s story with new choices, deeper intimacy, and more artistic collaborations.',
        expression: 'neutral'
      }
    ],
    choices: [
      {
        text: '🔄 Play Chapter 1 Again',
        nextScene: 'intro'
      }
    ]
  }
};

// Placeholder scenes for other paths
SCENES.photographer_evening = SCENES.photographer_studio;
SCENES.fashion_shoot = SCENES.boudoir_artistic;
SCENES.coffee_date = SCENES.boudoir_artistic;
SCENES.build_trust = SCENES.boudoir_artistic;

// ============================================================================
// COMPONENT
// ============================================================================

interface RealVisualNovelProps {
  onExit: () => void;
}

const RealVisualNovel: React.FC<RealVisualNovelProps> = ({ onExit }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'intro',
    currentLineIndex: 0,
    textSpeed: 50,
    autoPlay: false,
    history: []
  });

  const [showingChoices, setShowingChoices] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Asset Loading State
  const [loadedAssets, setLoadedAssets] = useState<LoadedAssets>(() => loadAllVisualNovelAssets());

  // Hot-reload: Check for new assets periodically
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Only set up hot-reload interval after component mount
    const setupHotReload = () => {
      interval = setInterval(() => {
        const newAssets = loadAllVisualNovelAssets();
        if (hasNewAssets(loadedAssets, newAssets)) {
          console.log('🔄 New assets detected! Reloading...');
          setLoadedAssets(newAssets);
        }
      }, 5000); // Check every 5 seconds
    };

    // Delay initial setup to avoid loading loop
    const timer = setTimeout(setupHotReload, 1000);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []); // Empty deps to run once on mount

  const currentScene = SCENES[gameState.currentSceneId];
  const currentLine = currentScene.dialogue[gameState.currentLineIndex];
  const isLastLine = gameState.currentLineIndex >= currentScene.dialogue.length - 1;

  // Text typing effect
  useEffect(() => {
    if (!currentLine) return;

    setIsTyping(true);
    setDisplayedText('');

    const text = currentLine.text;
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, gameState.textSpeed);

    return () => clearInterval(interval);
  }, [currentLine, gameState.textSpeed]);

  // Advance dialogue
  const advanceDialogue = useCallback(() => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      return;
    }

    if (isLastLine) {
      // Show choices if available
      if (currentScene.choices) {
        setShowingChoices(true);
      }
    } else {
      // Next line
      setGameState(prev => ({
        ...prev,
        currentLineIndex: prev.currentLineIndex + 1,
        history: [...prev.history, { sceneId: prev.currentSceneId, lineIndex: prev.currentLineIndex }]
      }));
    }
  }, [isTyping, isLastLine, currentLine, currentScene.choices]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!showingChoices) {
          advanceDialogue();
        }
      } else if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [advanceDialogue, showingChoices, onExit]);

  // Handle choice selection
  const selectChoice = (choice: Choice) => {
    setShowingChoices(false);
    setGameState(prev => ({
      ...prev,
      currentSceneId: choice.nextScene,
      currentLineIndex: 0,
      history: [...prev.history, { sceneId: prev.currentSceneId, lineIndex: prev.currentLineIndex }]
    }));
  };

  // Get background image - prioritize generated assets over hardcoded URLs
  const backgroundImage = currentLine?.background ||
    getBackgroundForScene(gameState.currentSceneId, loadedAssets);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black text-white overflow-hidden"
      onClick={() => !showingChoices && advanceDialogue()}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Character Sprite */}
      {currentLine?.expression && currentLine.speaker === 'Zara' && (
        (() => {
          const spriteUrl = getSpriteForExpression(currentLine.expression, loadedAssets);
          return spriteUrl ? (
            <div className="absolute bottom-0 right-1/4 max-h-[85%] w-auto pointer-events-none transition-opacity duration-500 flex items-end">
              <img
                src={spriteUrl}
                alt={`Zara - ${currentLine.expression}`}
                className="max-h-full w-auto object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8)) brightness(1.1) contrast(1.05)',
                  objectPosition: 'bottom center',
                  maxHeight: '85vh',
                  mixBlendMode: 'darken', // Better than multiply for white backgrounds
                  WebkitMaskImage: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))',
                  maskImage: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))'
                }}
              />
            </div>
          ) : null;
        })()
      )}

      {/* Dialogue Box */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-8">
        <div className="max-w-5xl mx-auto">
          {/* Character Name */}
          {currentLine && (
            <div className="mb-3">
              <span className="bg-purple-600/80 px-4 py-2 rounded-t-lg font-bold text-lg inline-block">
                {currentLine.speaker}
              </span>
            </div>
          )}

          {/* Dialogue Text */}
          <div className="bg-black/60 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-6 min-h-[120px] relative">
            <p className="text-xl leading-relaxed">
              {displayedText}
            </p>

            {/* Continue Indicator */}
            {!isTyping && !isLastLine && !showingChoices && (
              <div className="absolute bottom-4 right-4 animate-bounce">
                <span className="text-purple-400">▼</span>
              </div>
            )}
          </div>

          {/* Choices */}
          {showingChoices && currentScene.choices && (
            <div className="mt-6 space-y-3">
              {currentScene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectChoice(choice);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 border-2 border-purple-400 text-white font-semibold text-lg py-4 px-6 rounded-lg transition-all transform hover:scale-105 text-left"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* UI Controls - Top Right */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
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

      {/* Progress Indicator - Top Left */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg">
        <p className="text-sm text-purple-300">
          📖 Chapter 1: The Golden Hour Connection | Line {gameState.currentLineIndex + 1}/{currentScene.dialogue.length}
        </p>
      </div>

      {/* Controls Help - Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-xs text-gray-400">
        <p>🖱️ Click / ⌨️ Enter/Space: Advance | ESC: Exit</p>
      </div>
    </div>
  );
};

export default RealVisualNovel;
