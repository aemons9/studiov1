import React, { useState } from 'react';
import type { GenerationSettings } from '../types';

interface Scene {
  id: string;
  background: string;
  character: {
    name: string;
    expression: 'neutral' | 'smile' | 'flirty' | 'sultry' | 'surprised' | 'shy';
    pose: string;
  };
  dialogue: string;
  narrator?: string;
  choices: Choice[];
  autoGenerate?: boolean;
  promptTemplate?: string;
}

interface Choice {
  text: string;
  nextScene: string;
  intimacyChange?: number;
  relationshipChange?: number;
}

interface GameState {
  currentScene: string;
  intimacyLevel: number;
  relationshipLevel: number;
  choiceHistory: string[];
  generatedImages: string[];
}

interface VisualNovelModeProps {
  onGenerate: (prompt: string, settings: any) => Promise<void>;
  onExit: () => void;
  generationSettings: GenerationSettings;
}

const VisualNovelMode: React.FC<VisualNovelModeProps> = ({
  onGenerate,
  onExit,
  generationSettings
}) => {
  // Instagram fit hourglass selfie model character
  const modelName = 'Zara'; // Fit influencer with hourglass figure 36-26-38"

  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'intro',
    intimacyLevel: 3,
    relationshipLevel: 0,
    choiceHistory: [],
    generatedImages: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Define the visual novel scenes
  const scenes: Record<string, Scene> = {
    intro: {
      id: 'intro',
      background: 'Upscale urban loft with floor-to-ceiling windows, golden hour light streaming in',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Standing confidently by the window, one hand on hip'
      },
      dialogue: `Hey! I'm ${modelName}. I was just about to take some content for my Instagram... You know, the golden hour lighting here is absolutely perfect. *adjusts her athletic wear* Want to hang out while I shoot?`,
      choices: [
        {
          text: '📸 "I\'d love to! Your content is always stunning."',
          nextScene: 'photography_session',
          relationshipChange: 10
        },
        {
          text: '💪 "Mind if I join you for a workout first?"',
          nextScene: 'workout_together',
          relationshipChange: 5,
          intimacyChange: 5
        },
        {
          text: '😊 "Tell me more about your fitness journey."',
          nextScene: 'fitness_talk',
          relationshipChange: 15
        }
      ]
    },

    photography_session: {
      id: 'photography_session',
      background: 'Modern loft with professional ring light setup, urban sunset view',
      character: {
        name: modelName,
        expression: 'flirty',
        pose: 'Posing on a minimalist stool, athletic figure highlighted by perfect lighting'
      },
      dialogue: '*strikes a confident pose* "You have a great eye for angles. Most people don\'t understand how much work goes into making these shots look effortless." *adjusts her form-fitting outfit* "Should I try something more... artistic?"',
      narrator: 'She moves gracefully, her hourglass silhouette perfectly framed by the golden light.',
      autoGenerate: true,
      promptTemplate: `Fine-art photography of confident Indian Instagram model ${modelName} with fit hourglass figure (36-26-38") during golden hour photoshoot in modern loft. She wears form-fitting athletic luxury wear that accentuates her sculpted curves. Professional ring light setup, floor-to-ceiling windows with urban sunset. She strikes an artistic pose on minimalist furniture, exuding confidence and allure. Shot on Hasselblad, f/2.8, 85mm lens. Intimate eye-level perspective, medium shot emphasizing her athletic feminine form and natural beauty. Warm golden tones, soft highlights on skin, professional Instagram aesthetic. 8K detail, authentic skin texture, fabric physics showing natural draping over curves.`,
      choices: [
        {
          text: '📷 "Absolutely! Let\'s try a more intimate angle."',
          nextScene: 'intimate_shoot',
          intimacyChange: 15,
          relationshipChange: 10
        },
        {
          text: '✨ "You\'re already perfect as you are."',
          nextScene: 'genuine_moment',
          relationshipChange: 20
        },
        {
          text: '🎨 "How about we create something editorial-style?"',
          nextScene: 'editorial_concept',
          intimacyChange: 5,
          relationshipChange: 15
        }
      ]
    },

    workout_together: {
      id: 'workout_together',
      background: 'High-end home gym with mirrored walls, modern equipment, soft lighting',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Mid-workout, showing off her athletic form doing stretches'
      },
      dialogue: '*finishing a set* "I love that you\'re into fitness too! It\'s rare to find someone who appreciates the dedication it takes." *wipes her brow, sports outfit clinging to her curves* "Want to spot me on the next exercise?"',
      narrator: 'Her athletic prowess is mesmerizing - every movement showcasing her sculpted hourglass figure.',
      autoGenerate: true,
      promptTemplate: `Cinematic fitness photography of athletic Indian model ${modelName} with fit hourglass figure (36-26-38") in high-end home gym. She wears form-fitting designer activewear (sports bra and high-waist leggings) that highlights her sculpted curves. Mid-workout glow, natural lighting from large windows, mirrored walls reflecting her powerful feminine form. She performs stretches that showcase her flexibility and athletic build. Shot on Sony A7R V, f/2.0, 50mm. Eye-level intimate perspective, medium shot. Warm natural tones, slight sheen on skin from workout, professional fitness editorial aesthetic. 8K detail, authentic athletic body texture, fabric showing natural tension over curves.`,
      choices: [
        {
          text: '💪 "Of course! Let\'s push each other."',
          nextScene: 'intense_workout',
          intimacyChange: 20,
          relationshipChange: 15
        },
        {
          text: '😏 "I\'d rather watch your form... for technique."',
          nextScene: 'playful_flirt',
          intimacyChange: 25,
          relationshipChange: 10
        },
        {
          text: '🧘 "How about we cool down with some yoga?"',
          nextScene: 'yoga_session',
          intimacyChange: 30,
          relationshipChange: 20
        }
      ]
    },

    fitness_talk: {
      id: 'fitness_talk',
      background: 'Cozy corner of loft with comfortable seating, warm ambient lighting',
      character: {
        name: modelName,
        expression: 'shy',
        pose: 'Sitting cross-legged on plush sofa, relaxed posture'
      },
      dialogue: `*sits down beside you* "You know, it\'s nice when someone wants to know the real me, not just the Instagram persona." *smiles warmly* "I wasn\'t always this confident. Building my body was about building my mind too."`,
      choices: [
        {
          text: '❤️ "That\'s what makes you truly beautiful."',
          nextScene: 'heartfelt_connection',
          relationshipChange: 30
        },
        {
          text: '🌟 "Your dedication is inspiring."',
          nextScene: 'deeper_conversation',
          relationshipChange: 20
        },
        {
          text: '😊 "Show me your favorite workout routine?"',
          nextScene: 'workout_together',
          intimacyChange: 10
        }
      ]
    },

    intimate_shoot: {
      id: 'intimate_shoot',
      background: 'Softly lit bedroom corner with sheer curtains, romantic ambiance',
      character: {
        name: modelName,
        expression: 'sultry',
        pose: 'Reclining on luxury bedding, confident sensual pose'
      },
      dialogue: '*voice softer now* "I don\'t usually do shoots like this... but there\'s something about you that makes me feel safe." *adjusts position, her curves perfectly framed* "How do you want me?"',
      narrator: 'The atmosphere shifts - this is no longer just a photoshoot. The intimacy is palpable.',
      autoGenerate: true,
      promptTemplate: `Intimate boudoir photography of confident Indian model ${modelName} with fit hourglass figure (36-26-38") in softly lit luxury bedroom. She wears elegant minimal designer lingerie or high-fashion intimate wear that celebrates her sculpted athletic curves. Sheer white curtains diffuse golden hour light. She reclines on luxury white bedding with natural confidence and sensual grace. Shot on Hasselblad X2D, f/1.8, 85mm portrait lens. Intimate low angle, medium-close shot emphasizing her feminine form and authentic beauty. Warm romantic tones, soft highlights, dreamy bokeh. Fine-art aesthetic celebrating the female form. 8K ultra-detail, authentic skin texture with natural glow, fabric physics showing delicate draping. Tasteful, artistic, empowering.`,
      choices: [
        {
          text: '😍 "Just be yourself... you\'re breathtaking."',
          nextScene: 'romantic_moment',
          intimacyChange: 30,
          relationshipChange: 25
        },
        {
          text: '📸 "Let\'s create art that shows your strength."',
          nextScene: 'artistic_intimate',
          intimacyChange: 20,
          relationshipChange: 20
        },
        {
          text: '🌹 "Whatever makes you feel powerful."',
          nextScene: 'empowered_shoot',
          intimacyChange: 25,
          relationshipChange: 30
        }
      ]
    },

    romantic_moment: {
      id: 'romantic_moment',
      background: 'Dimly lit loft at twilight, city lights twinkling outside',
      character: {
        name: modelName,
        expression: 'shy',
        pose: 'Standing close, vulnerable yet confident'
      },
      dialogue: '*camera forgotten, stepping closer* "I think we both know this stopped being about the photos a while ago..." *her breath quickens slightly* "I feel something real here."',
      narrator: 'The tension between you is electric. Her usual Instagram confidence gives way to genuine vulnerability.',
      choices: [
        {
          text: '💋 *Close the distance between you*',
          nextScene: 'kiss_scene',
          intimacyChange: 40,
          relationshipChange: 40
        },
        {
          text: '❤️ "I feel it too... let\'s not rush this."',
          nextScene: 'slow_romance',
          relationshipChange: 50
        },
        {
          text: '🌙 "Let\'s enjoy this moment together."',
          nextScene: 'tender_evening',
          intimacyChange: 25,
          relationshipChange: 35
        }
      ]
    },

    ending_romance: {
      id: 'ending_romance',
      background: 'Sunrise through loft windows, peaceful morning light',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Content and relaxed, morning glow'
      },
      dialogue: `*intertwining fingers with yours* "You know what? I think I'm going to keep this moment off Instagram. Some things are just for us." *soft smile* "Thank you for seeing the real me."`,
      narrator: `${modelName} found something rare - someone who valued her for more than her stunning appearance. The connection you built transcended the superficial world of social media.`,
      choices: [
        {
          text: '🔄 Start New Story',
          nextScene: 'intro'
        },
        {
          text: '📸 View Generated Gallery',
          nextScene: 'gallery'
        },
        {
          text: '🚪 Exit Visual Novel',
          nextScene: 'exit'
        }
      ]
    }
  };

  const currentScene = scenes[gameState.currentScene];

  const handleChoice = async (choice: Choice) => {
    // Update game state
    const newIntimacy = Math.max(0, Math.min(100, gameState.intimacyLevel + (choice.intimacyChange || 0)));
    const newRelationship = Math.max(0, Math.min(100, gameState.relationshipLevel + (choice.relationshipChange || 0)));

    setGameState(prev => ({
      ...prev,
      intimacyLevel: newIntimacy,
      relationshipLevel: newRelationship,
      choiceHistory: [...prev.choiceHistory, choice.text]
    }));

    // Handle special scenes
    if (choice.nextScene === 'exit') {
      onExit();
      return;
    }

    if (choice.nextScene === 'gallery') {
      setShowStats(true);
      return;
    }

    // Move to next scene
    const nextScene = scenes[choice.nextScene];
    setGameState(prev => ({ ...prev, currentScene: choice.nextScene }));

    // Auto-generate image if scene has template
    if (nextScene?.autoGenerate && nextScene.promptTemplate) {
      setIsGenerating(true);
      try {
        await onGenerate(nextScene.promptTemplate, {
          provider: 'replicate-flux',
          aspectRatio: '9:16',
          intimacyLevel: newIntimacy / 10,
          fluxSafetyTolerance: Math.floor(newIntimacy / 20) + 2,
          fluxRawMode: true
        });
      } catch (error) {
        console.error('Generation failed:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const getIntimacyLabel = (level: number): string => {
    if (level < 20) return '😊 Friendly';
    if (level < 40) return '🥰 Close';
    if (level < 60) return '💕 Intimate';
    if (level < 80) return '🔥 Passionate';
    return '💋 Deep Connection';
  };

  const getRelationshipLabel = (level: number): string => {
    if (level < 20) return '👋 Acquaintance';
    if (level < 40) return '🤝 Friend';
    if (level < 60) return '💫 Special';
    if (level < 80) return '❤️ Romance';
    return '💍 Soulmate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h1 className="font-bold text-lg">Instagram Stories: {modelName}</h1>
              <p className="text-xs text-purple-300">Interactive Visual Novel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all flex items-center gap-2"
            >
              <span>📊</span>
              Stats
            </button>
            <button
              onClick={onExit}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-all"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {showStats && (
          <div className="border-t border-purple-500/30 bg-black/50 px-4 py-3">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{getIntimacyLabel(gameState.intimacyLevel)}</span>
                  <span className="text-xs text-purple-300">{gameState.intimacyLevel}/100</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500"
                    style={{ width: `${gameState.intimacyLevel}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{getRelationshipLabel(gameState.relationshipLevel)}</span>
                  <span className="text-xs text-purple-300">{gameState.relationshipLevel}/100</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${gameState.relationshipLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Scene Background Description */}
        <div className="mb-6 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/30">
          <p className="text-sm text-purple-200 italic">📍 {currentScene.background}</p>
        </div>

        {/* Character Display */}
        <div className="mb-6 p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="font-bold text-xl">{currentScene.character.name}</h2>
              <p className="text-xs text-purple-300">{currentScene.character.expression}</p>
            </div>
          </div>

          {/* Character Pose Description */}
          <div className="mb-4 p-3 bg-black/30 rounded-lg">
            <p className="text-sm text-gray-300 italic">✨ {currentScene.character.pose}</p>
          </div>

          {/* Narrator Text (if present) */}
          {currentScene.narrator && (
            <div className="mb-4 p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
              <p className="text-sm text-purple-200 italic">{currentScene.narrator}</p>
            </div>
          )}

          {/* Dialogue */}
          <div className="bg-black/50 p-4 rounded-xl">
            <p className="text-lg leading-relaxed">{currentScene.dialogue}</p>
          </div>

          {/* Auto-generation indicator */}
          {currentScene.autoGenerate && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
              <p className="text-sm text-purple-300 flex items-center gap-2">
                <span className="text-lg">📸</span>
                {isGenerating ? 'Generating scene visualization...' : 'Scene will be visualized with AI'}
              </p>
            </div>
          )}
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              disabled={isGenerating}
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <span className="text-left flex-1">{choice.text}</span>
                <div className="flex items-center gap-2 text-sm">
                  {choice.intimacyChange && choice.intimacyChange > 0 && (
                    <span className="text-pink-300">💕+{choice.intimacyChange}</span>
                  )}
                  {choice.relationshipChange && choice.relationshipChange > 0 && (
                    <span className="text-purple-300">❤️+{choice.relationshipChange}</span>
                  )}
                  <span className="text-xl">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Scene Counter */}
        <div className="mt-6 text-center">
          <p className="text-sm text-purple-400">
            Choices Made: {gameState.choiceHistory.length}
          </p>
        </div>
      </div>

      {/* Tutorial/Help */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="p-4 bg-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-2xl max-w-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span>
            How to Play
          </h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• Make choices to progress the story</li>
            <li>• Build intimacy and relationship levels</li>
            <li>• Scenes auto-generate AI visuals</li>
            <li>• Multiple paths and endings</li>
            <li className="text-pink-400">• Your choices matter!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisualNovelMode;
