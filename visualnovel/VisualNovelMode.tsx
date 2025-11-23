import React, { useState } from 'react';
import type { GenerationSettings } from '../types';

interface Scene {
  id: string;
  chapter: number;
  background: string;
  character: {
    name: string;
    expression: 'neutral' | 'smile' | 'flirty' | 'sultry' | 'surprised' | 'shy' | 'passionate';
    pose: string;
  };
  dialogue: string;
  narrator?: string;
  choices: Choice[];
  autoGenerate?: boolean;
  promptTemplate?: string;
  preGeneratedImage?: string;
  unlockRequirements?: {
    creativity?: number;
    adornment?: number;
    intimacy?: number;
    relationship?: number;
  };
}

interface Choice {
  text: string;
  nextScene: string;
  intimacyChange?: number;
  relationshipChange?: number;
  creativityChange?: number;
  adornmentChange?: number;
  requiredStats?: {
    creativity?: number;
    adornment?: number;
  };
}

interface GameState {
  currentScene: string;
  currentChapter: number;
  intimacyLevel: number;
  relationshipLevel: number;
  creativityLevel: number;
  adornmentLevel: number;
  choiceHistory: string[];
  generatedImages: ImageGalleryItem[];
  unlockedBoudoirSessions: string[];
}

interface ImageGalleryItem {
  sceneId: string;
  title: string;
  imageUrl: string;
  timestamp: number;
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
  const modelName = 'Zara'; // Fit Instagram influencer with hourglass figure 36-26-38"

  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'chapter1_intro',
    currentChapter: 1,
    intimacyLevel: 0,
    relationshipLevel: 0,
    creativityLevel: 0,
    adornmentLevel: 0,
    choiceHistory: [],
    generatedImages: [],
    unlockedBoudoirSessions: []
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  // Pre-generated boudoir session images (placeholder paths - will be generated)
  const boudoirGallery = {
    'boudoir_golden_silk': '/gallery/boudoir/zara_golden_silk_1.jpg',
    'boudoir_lace_romance': '/gallery/boudoir/zara_lace_romance_1.jpg',
    'boudoir_artistic_shadows': '/gallery/boudoir/zara_artistic_shadows_1.jpg',
    'boudoir_intimate_minimal': '/gallery/boudoir/zara_intimate_minimal_1.jpg',
    'boudoir_luxury_bedroom': '/gallery/boudoir/zara_luxury_bedroom_1.jpg',
  };

  // CHAPTER 1: "The Golden Hour Connection"
  const scenes: Record<string, Scene> = {
    // ========== CHAPTER 1 INTRO ==========
    chapter1_intro: {
      id: 'chapter1_intro',
      chapter: 1,
      background: 'Upscale urban loft with floor-to-ceiling windows, golden hour light streaming in',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Standing by the window in fitted athletic wear, golden light highlighting her curves'
      },
      dialogue: `*turns from the window with a warm smile* "Oh! I didn't expect anyone else to be here this late. I'm ${modelName}." *adjusts her high-waist leggings* "I rent this loft sometimes for my Instagram shoots. The golden hour light here is... *gestures to the warm glow* ...absolutely perfect. Are you a photographer?"`,
      narrator: 'You notice her confident presence - a fitness influencer with an hourglass figure that the lighting accentuates beautifully.',
      autoGenerate: true,
      promptTemplate: `Fine-art portrait photography of confident Indian Instagram fitness model ${modelName} with fit hourglass figure (36-26-38") standing by floor-to-ceiling windows during golden hour. She wears form-fitting black athletic wear (sports bra and high-waist leggings) that highlights her sculpted curves. Warm sunset light streams through windows creating a beautiful rim light effect. Modern minimalist loft interior. She has a warm, welcoming smile with natural makeup. Long dark hair in a high ponytail. Shot on Canon R5, f/2.0, 50mm lens. Eye-level perspective, medium shot. Warm golden tones, soft highlights, professional Instagram aesthetic. 8K detail, authentic skin texture, fabric showing natural fit over athletic curves.`,
      choices: [
        {
          text: '📸 "I dabble in photography. Your aesthetic is incredible."',
          nextScene: 'ch1_photographer_path',
          relationshipChange: 10,
          creativityChange: 5
        },
        {
          text: '💫 "Actually, I\'m into styling and fashion. Your look is perfect."',
          nextScene: 'ch1_stylist_path',
          relationshipChange: 10,
          adornmentChange: 5
        },
        {
          text: '😊 "Just admiring the view... both the sunset and the company."',
          nextScene: 'ch1_charm_path',
          relationshipChange: 5,
          intimacyChange: 5
        }
      ]
    },

    // ========== PHOTOGRAPHER PATH ==========
    ch1_photographer_path: {
      id: 'ch1_photographer_path',
      chapter: 1,
      background: 'Modern loft with professional ring light, camera equipment visible',
      character: {
        name: modelName,
        expression: 'flirty',
        pose: 'Leaning against equipment table, interested and engaged'
      },
      dialogue: `*eyes light up* "Really? I'd love to see your work sometime!" *walks closer* "You know, my usual photographer canceled today. I was going to just do some selfies but..." *looks you over appraisingly* "...if you're free, maybe you could help me with this shoot? I have this vision for something more artistic than my usual content."`,
      creativityChange: 5,
      choices: [
        {
          text: '🎨 "I\'d love to! What\'s your artistic vision?"',
          nextScene: 'ch1_creative_shoot',
          creativityChange: 10,
          relationshipChange: 15
        },
        {
          text: '📷 "Sure! But let\'s start with what you know - your signature style."',
          nextScene: 'ch1_instagram_shoot',
          relationshipChange: 10
        },
        {
          text: '💡 "What if we explored something experimental?"',
          nextScene: 'ch1_experimental_shoot',
          creativityChange: 20,
          intimacyChange: 5,
          requiredStats: { creativity: 5 }
        }
      ]
    },

    ch1_creative_shoot: {
      id: 'ch1_creative_shoot',
      chapter: 1,
      background: 'Loft with dramatic lighting setup, artistic atmosphere',
      character: {
        name: modelName,
        expression: 'sultry',
        pose: 'Artistic pose with dramatic lighting, shadows accentuating her figure'
      },
      dialogue: `*strikes a pose* "I want to show that fitness isn't just about the body - it's art. The way muscles move, how fabric drapes over curves..." *holds pose confidently* "Capture the strength AND the sensuality. Can you do that?"`,
      narrator: 'She trusts your artistic eye. This could lead somewhere special...',
      autoGenerate: true,
      promptTemplate: `Artistic fine-art photography of Indian fitness model ${modelName} with hourglass figure (36-26-38") in dramatic chiaroscuro lighting. She wears elegant minimal black athletic wear. Dramatic side lighting creates beautiful shadows that sculpt her curves and muscular definition. Modern loft with dark background. Artistic pose showing strength and feminine grace. Shot on Hasselblad X2D, f/2.8, 85mm. Low angle emphasizing power. High contrast black and white aesthetic with selective color on skin tones. Museum-quality 8K detail, celebrating the female athletic form as art.`,
      creativityChange: 15,
      intimacyChange: 10,
      choices: [
        {
          text: '🎭 "Let\'s play with shadows and light - fine art style."',
          nextScene: 'ch1_shadows_unlock',
          creativityChange: 20,
          intimacyChange: 15
        },
        {
          text: '✨ "How about we highlight your best features with elegant poses?"',
          nextScene: 'ch1_elegant_poses',
          creativityChange: 10,
          adornmentChange: 10
        }
      ]
    },

    ch1_shadows_unlock: {
      id: 'ch1_shadows_unlock',
      chapter: 1,
      background: 'Dimly lit loft with professional lighting creating dramatic shadows',
      character: {
        name: modelName,
        expression: 'passionate',
        pose: 'Confident artistic pose, shadows and highlights creating museum-quality composition'
      },
      dialogue: `*after several shots* "Wow... these are incredible. You see me differently than anyone else has." *steps closer, her voice softer* "I've never felt this... artistic. This vulnerable, yet powerful." *bites lip* "I think... I think I'm ready to try something I've never done before. Would you shoot a boudoir session with me?"`,
      narrator: '✨ UNLOCK ACHIEVED: Artistic Shadows Boudoir Session',
      creativityChange: 25,
      intimacyChange: 20,
      choices: [
        {
          text: '💫 "I would be honored. Let\'s create art together."',
          nextScene: 'boudoir_artistic_shadows',
          intimacyChange: 30,
          creativityChange: 15,
          requiredStats: { creativity: 30 }
        },
        {
          text: '🎨 "Let\'s build up to that. I have more ideas first."',
          nextScene: 'ch1_building_trust',
          creativityChange: 10,
          relationshipChange: 20
        }
      ]
    },

    // ========== STYLIST PATH ==========
    ch1_stylist_path: {
      id: 'ch1_stylist_path',
      chapter: 1,
      background: 'Loft with wardrobe rack, accessories, styling area visible',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Examining outfits on a rack, looking excited'
      },
      dialogue: `*turns excitedly* "Oh my god, yes! I need a fresh perspective on my style." *pulls out various outfits* "I've been stuck in athleisure for months. Help me find something that shows my feminine side but still feels like ME. What catches your eye?"`,
      adornmentChange: 5,
      choices: [
        {
          text: '👗 "This silk piece would look stunning on you."',
          nextScene: 'ch1_silk_styling',
          adornmentChange: 15,
          intimacyChange: 5
        },
        {
          text: '💎 "Let me accessorize you - jewelry can transform everything."',
          nextScene: 'ch1_jewelry_session',
          adornmentChange: 20
        },
        {
          text: '🌹 "What about combining athletic and elegant - best of both?"',
          nextScene: 'ch1_fusion_style',
          adornmentChange: 10,
          creativityChange: 10
        }
      ]
    },

    ch1_silk_styling: {
      id: 'ch1_silk_styling',
      chapter: 1,
      background: 'Luxury styling area with full-length mirror, soft lighting',
      character: {
        name: modelName,
        expression: 'sultry',
        pose: 'Wearing elegant silk robe, admiring herself in mirror'
      },
      dialogue: `*runs hands over the silk fabric* "I feel... wow, I feel different. More feminine. More..." *turns to you* "...sensual?" *the silk drapes perfectly over her curves* "You have an incredible eye. This is making me see myself in a whole new light."`,
      narrator: 'The silk cascades over her hourglass figure beautifully. She looks transformed.',
      autoGenerate: true,
      promptTemplate: `Luxury fashion photography of Indian model ${modelName} with hourglass figure (36-26-38") wearing elegant champagne gold silk robe in upscale loft. The silk drapes naturally over her curves, tied at waist emphasizing her figure. Soft diffused lighting from large windows. She admires herself in a full-length ornate mirror. Bare feet, minimal makeup, natural elegance. Shot on Leica Q3, f/1.7, 50mm. Intimate perspective, medium shot. Warm golden tones, soft bokeh. High-end fashion editorial aesthetic. 8K detail, authentic silk texture and natural draping physics.`,
      adornmentChange: 20,
      intimacyChange: 15,
      choices: [
        {
          text: '✨ "The silk loves your curves. Want to try something more... intimate?"',
          nextScene: 'ch1_intimate_styling',
          adornmentChange: 25,
          intimacyChange: 25,
          requiredStats: { adornment: 25 }
        },
        {
          text: '📸 "This is perfect for a shoot. Let me capture this moment."',
          nextScene: 'ch1_silk_photoshoot',
          creativityChange: 15,
          adornmentChange: 10
        }
      ]
    },

    ch1_intimate_styling: {
      id: 'ch1_intimate_styling',
      chapter: 1,
      background: 'Private dressing area with luxury lingerie and accessories',
      character: {
        name: modelName,
        expression: 'shy',
        pose: 'Holding elegant lingerie pieces, looking vulnerable yet excited'
      },
      dialogue: `*voice barely above a whisper* "I've never shown this side of myself to anyone outside of... well, you know." *holds up delicate lace* "But with you, I feel safe to explore this. Will you help me feel beautiful in something this... revealing?"`,
      narrator: '✨ UNLOCK ACHIEVED: Golden Silk & Lace Boudoir Session',
      adornmentChange: 30,
      intimacyChange: 25,
      choices: [
        {
          text: '💕 "You\'re already beautiful. Let\'s celebrate that together."',
          nextScene: 'boudoir_golden_silk',
          intimacyChange: 40,
          adornmentChange: 20,
          requiredStats: { adornment: 40, intimacy: 30 }
        },
        {
          text: '🌹 "Take your time. We\'ll go at your pace."',
          nextScene: 'ch1_gentle_approach',
          relationshipChange: 30,
          adornmentChange: 15
        }
      ]
    },

    // ========== CHARM PATH ==========
    ch1_charm_path: {
      id: 'ch1_charm_path',
      chapter: 1,
      background: 'Cozy corner of loft with comfortable seating, intimate lighting',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Sitting relaxed on sofa, genuinely enjoying the conversation'
      },
      dialogue: `*laughs softly* "Smooth talker, huh?" *sits down and gestures for you to join* "You know what? Forget the shoot for a minute. Tell me about yourself. It's rare to meet someone who's not just... staring, you know?"`,
      relationshipChange: 15,
      choices: [
        {
          text: '💬 Share your passion for art and beauty',
          nextScene: 'ch1_deep_connection',
          relationshipChange: 20,
          creativityChange: 5
        },
        {
          text: '😊 Compliment her personality beyond her looks',
          nextScene: 'ch1_genuine_moment',
          relationshipChange: 25
        },
        {
          text: '😏 Flirt playfully while being respectful',
          nextScene: 'ch1_flirty_banter',
          intimacyChange: 10,
          relationshipChange: 10
        }
      ]
    },

    ch1_deep_connection: {
      id: 'ch1_deep_connection',
      chapter: 1,
      background: 'Intimate seating area, golden hour fading to twilight',
      character: {
        name: modelName,
        expression: 'shy',
        pose: 'Leaning in, genuinely engaged, vulnerable'
      },
      dialogue: `*listens intently* "That's... that's beautiful. Most people just see the Instagram persona. But you actually GET it - the artistry, the self-expression." *touches your arm gently* "I haven't felt this understood in... maybe ever."`,
      narrator: 'A genuine connection forms. She looks at you differently now.',
      relationshipChange: 30,
      intimacyChange: 10,
      choices: [
        {
          text: '❤️ "I see the real you, not just the image."',
          nextScene: 'ch1_real_connection',
          relationshipChange: 35,
          intimacyChange: 15
        },
        {
          text: '🎨 "Let me show you how I see you - through my lens."',
          nextScene: 'ch1_portrait_session',
          creativityChange: 15,
          relationshipChange: 20
        }
      ]
    },

    ch1_real_connection: {
      id: 'ch1_real_connection',
      chapter: 1,
      background: 'Twilight in the loft, city lights twinkling outside',
      character: {
        name: modelName,
        expression: 'passionate',
        pose: 'Sitting very close, eyes locked with yours'
      },
      dialogue: `*voice soft and sincere* "You know what? I want to do something I've never done. Not for Instagram, not for followers... just for us. For you." *takes your hand* "I want you to photograph me. The real me. No filters, no poses... just raw, honest, intimate."`,
      narrator: '✨ UNLOCK ACHIEVED: Intimate Minimalist Boudoir Session',
      relationshipChange: 40,
      intimacyChange: 30,
      choices: [
        {
          text: '💫 "I would love to capture the real you."',
          nextScene: 'boudoir_intimate_minimal',
          intimacyChange: 35,
          relationshipChange: 30,
          requiredStats: { relationship: 60, intimacy: 30 }
        },
        {
          text: '🌙 "Let\'s take it slow. This is special."',
          nextScene: 'ch1_slow_romance',
          relationshipChange: 35,
          intimacyChange: 20
        }
      ]
    },

    // ========== BOUDOIR SESSIONS (UNLOCKABLE) ==========
    boudoir_artistic_shadows: {
      id: 'boudoir_artistic_shadows',
      chapter: 1,
      background: 'Dimly lit bedroom with dramatic chiaroscuro lighting, luxury white bedding',
      character: {
        name: modelName,
        expression: 'passionate',
        pose: 'Artistic reclining pose on bed, draped in shadows and highlights'
      },
      dialogue: `*breathes deeply, nervous but trusting* "I've never been this vulnerable with a camera before. Show me how you see me... as art." *reclines on the bed, shadows playing across her curves* "Make me feel like a masterpiece."`,
      narrator: '🎨 BOUDOIR SESSION: Artistic Shadows - Museum-quality fine art celebrating the feminine form',
      autoGenerate: true,
      promptTemplate: `Fine-art boudoir photography of Indian model ${modelName} with hourglass figure (36-26-38") in dramatic chiaroscuro style. She reclines on luxury white bedding in dimly lit bedroom. Minimal elegant black lingerie or silk draping. Dramatic side lighting creates Renaissance-painting quality shadows and highlights across her sculpted curves. Hair loose, natural makeup. Vulnerable yet powerful expression. Shot on Hasselblad X2D, f/1.8, 85mm portrait lens. Low angle, medium-close composition. Black and white with subtle warm tones. Fine-art museum aesthetic celebrating the female form. 8K ultra detail, authentic skin texture, natural fabric draping physics. Tasteful, artistic, empowering.`,
      preGeneratedImage: '/gallery/boudoir/zara_artistic_shadows_1.jpg',
      unlockRequirements: {
        creativity: 30,
        intimacy: 20
      },
      creativityChange: 30,
      intimacyChange: 35,
      choices: [
        {
          text: '🎭 Continue with more artistic poses',
          nextScene: 'boudoir_shadows_continue',
          creativityChange: 15,
          intimacyChange: 15
        },
        {
          text: '💫 "These are perfect. You\'re stunning."',
          nextScene: 'ch1_aftermath_shadows',
          relationshipChange: 30
        }
      ]
    },

    boudoir_golden_silk: {
      id: 'boudoir_golden_silk',
      chapter: 1,
      background: 'Luxury bedroom with soft golden lighting, silk sheets and fabrics',
      character: {
        name: modelName,
        expression: 'sultry',
        pose: 'Draped in champagne silk, reclining elegantly on bed'
      },
      dialogue: `*runs fingers over the silk* "This feels incredible... like liquid gold on my skin." *looks at you with trust and desire* "I want you to capture every curve, every shadow where the silk meets my body. Make me feel like a goddess."`,
      narrator: '✨ BOUDOIR SESSION: Golden Silk & Lace - Luxury elegance meets sensual beauty',
      autoGenerate: true,
      promptTemplate: `Luxury boudoir photography of Indian model ${modelName} with hourglass figure (36-26-38") draped in champagne gold silk fabric in elegant bedroom. Soft diffused golden hour lighting through sheer curtains. She reclines on luxury white bedding with gold silk partially draped over her curves. Delicate gold lace lingerie visible beneath silk. Loose flowing hair, natural glowing makeup. Confident sensual expression. Shot on Leica SL3, f/1.4, 75mm APO lens. Intimate medium shot emphasizing curves and silk draping. Warm golden tones, soft bokeh, dreamy romantic atmosphere. High-end fashion boudoir aesthetic. 8K detail, authentic silk and lace physics, natural skin glow. Tasteful elegance.`,
      preGeneratedImage: '/gallery/boudoir/zara_golden_silk_1.jpg',
      unlockRequirements: {
        adornment: 40,
        intimacy: 30
      },
      adornmentChange: 35,
      intimacyChange: 40,
      choices: [
        {
          text: '✨ "The gold silk was made for you. More poses?"',
          nextScene: 'boudoir_silk_continue',
          adornmentChange: 20,
          intimacyChange: 15
        },
        {
          text: '💛 "Perfect. You\'re absolutely radiant."',
          nextScene: 'ch1_aftermath_silk',
          relationshipChange: 35
        }
      ]
    },

    boudoir_intimate_minimal: {
      id: 'boudoir_intimate_minimal',
      chapter: 1,
      background: 'Simple elegant bedroom with natural window light, white minimalist aesthetic',
      character: {
        name: modelName,
        expression: 'shy',
        pose: 'Natural intimate pose, minimal styling, raw honesty'
      },
      dialogue: `*no pretense, just genuine vulnerability* "No fancy lighting. No props. Just me, and you, and the trust between us." *simple white lingerie, natural light* "This is the real ${modelName}. Thank you for making me feel safe enough to show you."`,
      narrator: '💕 BOUDOIR SESSION: Intimate Minimalist - Raw, honest, deeply personal',
      autoGenerate: true,
      promptTemplate: `Intimate minimalist boudoir photography of Indian model ${modelName} with hourglass figure (36-26-38") in natural window light. Simple elegant bedroom with white aesthetic. She wears minimal white lace lingerie or simple silk camisole. Natural loose hair, barely-there makeup, genuine vulnerable expression. Soft natural daylight from large window creates authentic intimate atmosphere. No artificial lighting. Shot on Leica Q3, f/2.0, 50mm summilux. Eye-level intimate perspective, medium shot. Soft natural tones, minimal editing, authentic aesthetic. Real emotions, genuine connection. 8K detail with authentic skin, natural fabric, honest beauty. Deeply personal and tasteful.`,
      preGeneratedImage: '/gallery/boudoir/zara_intimate_minimal_1.jpg',
      unlockRequirements: {
        relationship: 60,
        intimacy: 30
      },
      relationshipChange: 45,
      intimacyChange: 40,
      choices: [
        {
          text: '💕 "This is the most beautiful you\'ve ever been."',
          nextScene: 'ch1_romantic_moment',
          intimacyChange: 30,
          relationshipChange: 30
        },
        {
          text: '🌅 "Let\'s capture a few more while the light is perfect."',
          nextScene: 'boudoir_minimal_continue',
          intimacyChange: 20
        }
      ]
    },

    // ========== CHAPTER 1 ENDINGS ==========
    ch1_romantic_moment: {
      id: 'ch1_romantic_moment',
      chapter: 1,
      background: 'Bedroom at sunset, warm golden light, intimate atmosphere',
      character: {
        name: modelName,
        expression: 'passionate',
        pose: 'Standing close, wrapped in silk robe, looking into your eyes'
      },
      dialogue: `*camera forgotten, stepping closer* "I didn't expect this when I came here today. To feel this seen, this understood..." *her breath catches* "You've shown me a side of myself I didn't know existed. Thank you."`,
      narrator: 'The camera sits forgotten on the table. This moment is just for you both.',
      intimacyChange: 25,
      relationshipChange: 30,
      choices: [
        {
          text: '💋 Close the distance and kiss her',
          nextScene: 'ch1_kiss',
          intimacyChange: 50,
          relationshipChange: 40
        },
        {
          text: '❤️ "This is just the beginning."',
          nextScene: 'ch1_promise',
          relationshipChange: 50
        },
        {
          text: '🌙 "Let\'s not rush. We have time."',
          nextScene: 'ch1_slow_end',
          relationshipChange: 45,
          intimacyChange: 20
        }
      ]
    },

    ch1_kiss: {
      id: 'ch1_kiss',
      chapter: 1,
      background: 'Intimate bedroom setting, golden sunset light fading',
      character: {
        name: modelName,
        expression: 'passionate',
        pose: 'In your arms, breathless'
      },
      dialogue: `*pulls back slightly, breathless, forehead against yours* "I've never felt this with anyone... This is more than just attraction. It's... connection." *smiles softly* "Stay tonight?"`,
      narrator: 'The kiss changes everything. What started as a photoshoot has become something real, something intimate, something beautiful.',
      intimacyChange: 40,
      relationshipChange: 50,
      choices: [
        {
          text: '📖 Continue to Chapter 2',
          nextScene: 'chapter2_intro'
        },
        {
          text: '🎬 View Gallery & Stats',
          nextScene: 'stats_screen'
        },
        {
          text: '🔄 Restart Chapter 1',
          nextScene: 'chapter1_intro'
        }
      ]
    },

    ch1_promise: {
      id: 'ch1_promise',
      chapter: 1,
      background: 'Loft at twilight, city lights beginning to glow',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Sitting beside you, holding hands, content'
      },
      dialogue: `*squeezes your hand* "I'm not ready for this day to end. Can we do this again? Tomorrow? The next day?" *laughs softly* "I know we just met, but it feels like I've known you forever."`,
      narrator: '🌟 CHAPTER 1 COMPLETE - Connection forged, trust established, intimacy awakened. ${modelName} looks forward to seeing you again.',
      relationshipChange: 40,
      choices: [
        {
          text: '📖 Continue to Chapter 2',
          nextScene: 'chapter2_intro'
        },
        {
          text: '🎬 View Gallery & Stats',
          nextScene: 'stats_screen'
        },
        {
          text: '🔄 Replay Chapter 1',
          nextScene: 'chapter1_intro'
        }
      ]
    },

    stats_screen: {
      id: 'stats_screen',
      chapter: 1,
      background: 'Stats and Gallery Screen',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Portrait'
      },
      dialogue: 'View your journey statistics and unlocked gallery images.',
      choices: [
        {
          text: '📖 Continue to Chapter 2',
          nextScene: 'chapter2_intro'
        },
        {
          text: '🔄 Replay Chapter 1',
          nextScene: 'chapter1_intro'
        },
        {
          text: '🚪 Exit Visual Novel',
          nextScene: 'exit'
        }
      ]
    },

    chapter2_intro: {
      id: 'chapter2_intro',
      chapter: 2,
      background: 'Coming Soon',
      character: {
        name: modelName,
        expression: 'smile',
        pose: 'Teasing smile'
      },
      dialogue: '📖 Chapter 2: "Deeper Connections" - Coming Soon! Continue building your relationship with ${modelName} and unlock even more intimate boudoir sessions...',
      choices: [
        {
          text: '🔄 Replay Chapter 1',
          nextScene: 'chapter1_intro'
        },
        {
          text: '🚪 Exit for Now',
          nextScene: 'exit'
        }
      ]
    }
  };

  const currentScene = scenes[gameState.currentScene] || scenes.chapter1_intro;

  const handleChoice = async (choice: Choice) => {
    // Check if stat requirements are met
    if (choice.requiredStats) {
      if (choice.requiredStats.creativity && gameState.creativityLevel < choice.requiredStats.creativity) {
        alert(`🎨 This choice requires Creativity level ${choice.requiredStats.creativity}. Current: ${gameState.creativityLevel}`);
        return;
      }
      if (choice.requiredStats.adornment && gameState.adornmentLevel < choice.requiredStats.adornment) {
        alert(`✨ This choice requires Adornment level ${choice.requiredStats.adornment}. Current: ${gameState.adornmentLevel}`);
        return;
      }
    }

    // Update game state
    const newIntimacy = Math.max(0, Math.min(100, gameState.intimacyLevel + (choice.intimacyChange || 0)));
    const newRelationship = Math.max(0, Math.min(100, gameState.relationshipLevel + (choice.relationshipChange || 0)));
    const newCreativity = Math.max(0, Math.min(100, gameState.creativityLevel + (choice.creativityChange || 0)));
    const newAdornment = Math.max(0, Math.min(100, gameState.adornmentLevel + (choice.adornmentChange || 0)));

    setGameState(prev => ({
      ...prev,
      intimacyLevel: newIntimacy,
      relationshipLevel: newRelationship,
      creativityLevel: newCreativity,
      adornmentLevel: newAdornment,
      choiceHistory: [...prev.choiceHistory, choice.text]
    }));

    // Handle special scenes
    if (choice.nextScene === 'exit') {
      onExit();
      return;
    }

    // Move to next scene
    const nextScene = scenes[choice.nextScene];
    if (!nextScene) {
      console.error('Scene not found:', choice.nextScene);
      return;
    }

    // Check if this is a boudoir session unlock
    if (choice.nextScene.startsWith('boudoir_') && !gameState.unlockedBoudoirSessions.includes(choice.nextScene)) {
      setGameState(prev => ({
        ...prev,
        unlockedBoudoirSessions: [...prev.unlockedBoudoirSessions, choice.nextScene]
      }));
    }

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

        // Add to gallery
        setGameState(prev => ({
          ...prev,
          generatedImages: [
            ...prev.generatedImages,
            {
              sceneId: nextScene.id,
              title: `${modelName} - ${nextScene.id}`,
              imageUrl: nextScene.preGeneratedImage || '',
              timestamp: Date.now()
            }
          ]
        }));
      } catch (error) {
        console.error('Generation failed:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const getStatColor = (level: number): string => {
    if (level < 20) return 'from-gray-500 to-gray-600';
    if (level < 40) return 'from-blue-500 to-blue-600';
    if (level < 60) return 'from-purple-500 to-purple-600';
    if (level < 80) return 'from-pink-500 to-pink-600';
    return 'from-rose-500 to-red-600';
  };

  const getStatLabel = (stat: string, level: number): string => {
    if (stat === 'intimacy') {
      if (level < 20) return '😊 Friendly';
      if (level < 40) return '🥰 Close';
      if (level < 60) return '💕 Intimate';
      if (level < 80) return '🔥 Passionate';
      return '💋 Deep Connection';
    }
    if (stat === 'relationship') {
      if (level < 20) return '👋 Acquaintance';
      if (level < 40) return '🤝 Friend';
      if (level < 60) return '💫 Special';
      if (level < 80) return '❤️ Romance';
      return '💍 Soulmate';
    }
    if (stat === 'creativity') {
      if (level < 20) return '📷 Basic';
      if (level < 40) return '🎨 Artistic';
      if (level < 60) return '✨ Visionary';
      if (level < 80) return '🌟 Master';
      return '👑 Legendary';
    }
    if (stat === 'adornment') {
      if (level < 20) return '👕 Casual';
      if (level < 40) return '💅 Styled';
      if (level < 60) return '👗 Elegant';
      if (level < 80) return '💎 Luxurious';
      return '✨ Haute Couture';
    }
    return '';
  };

  if (showGallery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">🎨 Unlocked Gallery</h1>
            <button
              onClick={() => setShowGallery(false)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all"
            >
              ← Back to Story
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameState.generatedImages.map((img, idx) => (
              <div key={idx} className="bg-black/40 rounded-xl overflow-hidden border border-purple-500/30">
                <div className="aspect-[9/16] bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center">
                  <p className="text-gray-400">Image: {img.title}</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{img.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{new Date(img.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {gameState.unlockedBoudoirSessions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">✨ Unlocked Boudoir Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.unlockedBoudoirSessions.map((session, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-lg border border-pink-500/30">
                    <p className="font-semibold">🌟 {session.replace('boudoir_', '').replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h1 className="font-bold text-lg">Chapter {currentScene.chapter}: The Golden Hour Connection</h1>
              <p className="text-xs text-purple-300">Interactive Visual Novel starring {modelName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGallery(true)}
              className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              <span>🎨</span>
              Gallery ({gameState.generatedImages.length})
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              <span>📊</span>
              {showStats ? 'Hide' : 'Stats'}
            </button>
            <button
              onClick={onExit}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg transition-all text-sm"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {showStats && (
          <div className="border-t border-purple-500/30 bg-black/50 px-4 py-3">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Intimacy */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">💕 Intimacy</span>
                  <span className="text-xs text-purple-300">{gameState.intimacyLevel}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getStatColor(gameState.intimacyLevel)} transition-all duration-500`}
                    style={{ width: `${gameState.intimacyLevel}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{getStatLabel('intimacy', gameState.intimacyLevel)}</p>
              </div>

              {/* Relationship */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">❤️ Relationship</span>
                  <span className="text-xs text-purple-300">{gameState.relationshipLevel}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getStatColor(gameState.relationshipLevel)} transition-all duration-500`}
                    style={{ width: `${gameState.relationshipLevel}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{getStatLabel('relationship', gameState.relationshipLevel)}</p>
              </div>

              {/* Creativity */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">🎨 Creativity</span>
                  <span className="text-xs text-purple-300">{gameState.creativityLevel}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getStatColor(gameState.creativityLevel)} transition-all duration-500`}
                    style={{ width: `${gameState.creativityLevel}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{getStatLabel('creativity', gameState.creativityLevel)}</p>
              </div>

              {/* Adornment */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">✨ Adornment</span>
                  <span className="text-xs text-purple-300">{gameState.adornmentLevel}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getStatColor(gameState.adornmentLevel)} transition-all duration-500`}
                    style={{ width: `${gameState.adornmentLevel}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{getStatLabel('adornment', gameState.adornmentLevel)}</p>
              </div>
            </div>

            {/* Unlocked Boudoir Sessions */}
            {gameState.unlockedBoudoirSessions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-purple-500/20">
                <p className="text-xs font-semibold mb-2">🌟 Unlocked Boudoir Sessions:</p>
                <div className="flex flex-wrap gap-2">
                  {gameState.unlockedBoudoirSessions.map((session, idx) => (
                    <span key={idx} className="px-2 py-1 bg-pink-600/30 border border-pink-500/50 rounded-md text-[10px]">
                      {session.replace('boudoir_', '').replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Scene Background Description */}
        <div className="mb-4 p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/30">
          <p className="text-sm text-purple-200 italic">📍 {currentScene.background}</p>
        </div>

        {/* Character Display */}
        <div className="mb-6 p-4 md:p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-2xl">
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
            <p className="text-base md:text-lg leading-relaxed">{currentScene.dialogue}</p>
          </div>

          {/* Auto-generation indicator */}
          {currentScene.autoGenerate && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
              <p className="text-sm text-purple-300 flex items-center gap-2">
                <span className="text-lg">📸</span>
                {isGenerating ? 'Generating scene visualization...' : 'AI will visualize this scene'}
              </p>
            </div>
          )}
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {currentScene.choices.map((choice, index) => {
            const isLocked = choice.requiredStats && (
              (choice.requiredStats.creativity && gameState.creativityLevel < choice.requiredStats.creativity) ||
              (choice.requiredStats.adornment && gameState.adornmentLevel < choice.requiredStats.adornment)
            );

            return (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                disabled={isGenerating || isLocked}
                className={`w-full p-4 rounded-xl shadow-lg transition-all duration-300 transform ${
                  isLocked
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] active:scale-95'
                } disabled:cursor-not-allowed`}
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
                    {choice.creativityChange && choice.creativityChange > 0 && (
                      <span className="text-blue-300">🎨+{choice.creativityChange}</span>
                    )}
                    {choice.adornmentChange && choice.adornmentChange > 0 && (
                      <span className="text-yellow-300">✨+{choice.adornmentChange}</span>
                    )}
                    {isLocked && (
                      <span className="text-red-400">🔒</span>
                    )}
                    <span className="text-xl">→</span>
                  </div>
                </div>
                {isLocked && choice.requiredStats && (
                  <p className="text-xs text-red-300 mt-2 text-left">
                    Requires: {choice.requiredStats.creativity ? `🎨 Creativity ${choice.requiredStats.creativity}` : ''}
                    {choice.requiredStats.adornment ? `✨ Adornment ${choice.requiredStats.adornment}` : ''}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-purple-400">
            Choices Made: {gameState.choiceHistory.length} | Chapter: {currentScene.chapter}
          </p>
        </div>
      </div>

      {/* Tutorial/Help */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="p-4 bg-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-2xl max-w-xs">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Game Mechanics
          </h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• 💕 <strong>Intimacy:</strong> Trust & vulnerability</li>
            <li>• ❤️ <strong>Relationship:</strong> Connection depth</li>
            <li>• 🎨 <strong>Creativity:</strong> Artistic vision</li>
            <li>• ✨ <strong>Adornment:</strong> Style & elegance</li>
            <li className="text-pink-400 mt-2">• Unlock boudoir sessions by building stats!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisualNovelMode;
