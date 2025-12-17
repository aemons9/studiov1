import {
  GameVariables,
  INITIAL_VARIABLES,
  Scene,
  Choice,
  SCENES,
  applyChoiceEffects,
  isChoiceAvailable,
  determineEnding
} from './chapterOneExpandedScenes';

// ============================================================================
// ENHANCED GAME STATE TYPES
// ============================================================================

export interface ExtendedGameState extends GameVariables {
  // Scene Navigation
  currentSceneId: string;
  currentBeatIndex: number;
  currentDialogueIndex: number;

  // UI State
  showingChoices: boolean;
  isTyping: boolean;
  displayedText: string;

  // History for back tracking
  history: GameStateSnapshot[];

  // Playthrough tracking
  playthroughStartTime: number;
  totalChoicesMade: number;
  scenesVisited: string[];

  // Auto-save
  lastSaveTime: number;
}

export interface GameStateSnapshot {
  variables: GameVariables;
  sceneId: string;
  beatIndex: number;
  dialogueIndex: number;
  timestamp: number;
}

export interface GameStateAction {
  type:
    | 'ADVANCE_DIALOGUE'
    | 'ADVANCE_BEAT'
    | 'SELECT_CHOICE'
    | 'CHANGE_SCENE'
    | 'UPDATE_VARIABLE'
    | 'APPLY_EFFECTS'
    | 'SET_TYPING'
    | 'SET_DISPLAYED_TEXT'
    | 'SHOW_CHOICES'
    | 'SAVE_STATE'
    | 'LOAD_STATE'
    | 'RESTART';
  payload?: any;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

export const INITIAL_GAME_STATE: ExtendedGameState = {
  // Variables from chapterOneExpandedScenes.ts
  ...INITIAL_VARIABLES,

  // Scene Navigation
  currentSceneId: 'scene_1_arrival',
  currentBeatIndex: 0,
  currentDialogueIndex: 0,

  // UI State
  showingChoices: false,
  isTyping: false,
  displayedText: '',

  // History
  history: [],

  // Playthrough tracking
  playthroughStartTime: Date.now(),
  totalChoicesMade: 0,
  scenesVisited: ['scene_1_arrival'],

  // Auto-save
  lastSaveTime: Date.now()
};

// ============================================================================
// STATE REDUCER
// ============================================================================

export const gameStateReducer = (
  state: ExtendedGameState,
  action: GameStateAction
): ExtendedGameState => {
  switch (action.type) {
    case 'ADVANCE_DIALOGUE': {
      const currentScene = SCENES[state.currentSceneId];
      const currentBeat = currentScene.sceneFlow[state.currentBeatIndex];

      if (!currentBeat.dialogue) {
        // No dialogue in this beat, advance to next beat
        return gameStateReducer(state, { type: 'ADVANCE_BEAT' });
      }

      const nextDialogueIndex = state.currentDialogueIndex + 1;

      if (nextDialogueIndex >= currentBeat.dialogue.length) {
        // Finished all dialogue in this beat, advance to next beat
        return gameStateReducer(state, { type: 'ADVANCE_BEAT' });
      }

      return {
        ...state,
        currentDialogueIndex: nextDialogueIndex,
        displayedText: '',
        isTyping: false
      };
    }

    case 'ADVANCE_BEAT': {
      const currentScene = SCENES[state.currentSceneId];
      const nextBeatIndex = state.currentBeatIndex + 1;

      if (nextBeatIndex >= currentScene.sceneFlow.length) {
        // Finished all beats, show choices if available
        return {
          ...state,
          showingChoices: currentScene.choices && currentScene.choices.length > 0,
          isTyping: false
        };
      }

      return {
        ...state,
        currentBeatIndex: nextBeatIndex,
        currentDialogueIndex: 0,
        displayedText: '',
        isTyping: false
      };
    }

    case 'SELECT_CHOICE': {
      const choice: Choice = action.payload;

      // Check if choice is available
      if (!isChoiceAvailable(choice, state)) {
        console.warn('Choice not available:', choice.id);
        return state;
      }

      // Create history snapshot before applying choice
      const snapshot: GameStateSnapshot = {
        variables: {
          ZaraComfort: state.ZaraComfort,
          Trust: state.Trust,
          ArtisticCohesion: state.ArtisticCohesion,
          IntimacyLevel: state.IntimacyLevel,
          selectedMode: state.selectedMode,
          WardrobeChoice: state.WardrobeChoice,
          BoudoirUnlocked: state.BoudoirUnlocked,
          RequiresNudityConsent: state.RequiresNudityConsent,
          Flag_LingerieUsed: state.Flag_LingerieUsed,
          Flag_ArtisticDrapeUsed: state.Flag_ArtisticDrapeUsed,
          Flag_MinimalCoverageUsed: state.Flag_MinimalCoverageUsed,
          Flag_BoudoirSessionDone: state.Flag_BoudoirSessionDone,
          currentScene: state.currentScene
        },
        sceneId: state.currentSceneId,
        beatIndex: state.currentBeatIndex,
        dialogueIndex: state.currentDialogueIndex,
        timestamp: Date.now()
      };

      // Apply choice effects to variables
      const updatedVariables = applyChoiceEffects(
        {
          ZaraComfort: state.ZaraComfort,
          Trust: state.Trust,
          ArtisticCohesion: state.ArtisticCohesion,
          IntimacyLevel: state.IntimacyLevel,
          selectedMode: state.selectedMode,
          WardrobeChoice: state.WardrobeChoice,
          BoudoirUnlocked: state.BoudoirUnlocked,
          RequiresNudityConsent: state.RequiresNudityConsent,
          Flag_LingerieUsed: state.Flag_LingerieUsed,
          Flag_ArtisticDrapeUsed: state.Flag_ArtisticDrapeUsed,
          Flag_MinimalCoverageUsed: state.Flag_MinimalCoverageUsed,
          Flag_BoudoirSessionDone: state.Flag_BoudoirSessionDone,
          currentScene: state.currentScene
        },
        choice.effects
      );

      // Get next scene ID
      const nextSceneId = choice.nextScene || getNextScene(choice.id);

      if (!nextSceneId) {
        console.error('No next scene found for choice:', choice.id);
        return state;
      }

      // Check if we've reached an ending
      const ending = determineEnding(updatedVariables);
      const isEnding = nextSceneId === 'ending' || !SCENES[nextSceneId];

      return {
        ...state,
        ...updatedVariables,
        currentSceneId: isEnding ? 'ending' : nextSceneId,
        currentBeatIndex: 0,
        currentDialogueIndex: 0,
        showingChoices: false,
        displayedText: '',
        isTyping: false,
        history: [...state.history, snapshot],
        totalChoicesMade: state.totalChoicesMade + 1,
        scenesVisited: state.scenesVisited.includes(nextSceneId)
          ? state.scenesVisited
          : [...state.scenesVisited, nextSceneId],
        lastSaveTime: Date.now()
      };
    }

    case 'CHANGE_SCENE': {
      const newSceneId = action.payload.sceneId;

      if (!SCENES[newSceneId] && newSceneId !== 'ending') {
        console.error('Scene not found:', newSceneId);
        return state;
      }

      return {
        ...state,
        currentSceneId: newSceneId,
        currentScene: newSceneId,
        currentBeatIndex: 0,
        currentDialogueIndex: 0,
        showingChoices: false,
        displayedText: '',
        isTyping: false,
        scenesVisited: state.scenesVisited.includes(newSceneId)
          ? state.scenesVisited
          : [...state.scenesVisited, newSceneId]
      };
    }

    case 'UPDATE_VARIABLE': {
      const { key, value } = action.payload;

      // Apply bounds checking
      let boundedValue = value;
      if (key === 'ZaraComfort' || key === 'ArtisticCohesion') {
        boundedValue = Math.max(0, Math.min(100, value));
      } else if (key === 'Trust') {
        boundedValue = Math.max(-20, Math.min(30, value));
      }

      return {
        ...state,
        [key]: boundedValue
      };
    }

    case 'APPLY_EFFECTS': {
      const effects = action.payload;
      const updatedVariables = applyChoiceEffects(
        {
          ZaraComfort: state.ZaraComfort,
          Trust: state.Trust,
          ArtisticCohesion: state.ArtisticCohesion,
          IntimacyLevel: state.IntimacyLevel,
          selectedMode: state.selectedMode,
          WardrobeChoice: state.WardrobeChoice,
          BoudoirUnlocked: state.BoudoirUnlocked,
          RequiresNudityConsent: state.RequiresNudityConsent,
          Flag_LingerieUsed: state.Flag_LingerieUsed,
          Flag_ArtisticDrapeUsed: state.Flag_ArtisticDrapeUsed,
          Flag_MinimalCoverageUsed: state.Flag_MinimalCoverageUsed,
          Flag_BoudoirSessionDone: state.Flag_BoudoirSessionDone,
          currentScene: state.currentScene
        },
        effects
      );

      return {
        ...state,
        ...updatedVariables
      };
    }

    case 'SET_TYPING': {
      return {
        ...state,
        isTyping: action.payload.isTyping
      };
    }

    case 'SET_DISPLAYED_TEXT': {
      return {
        ...state,
        displayedText: action.payload.text
      };
    }

    case 'SHOW_CHOICES': {
      return {
        ...state,
        showingChoices: action.payload.show
      };
    }

    case 'SAVE_STATE': {
      // Save to localStorage
      try {
        const saveData = {
          variables: {
            ZaraComfort: state.ZaraComfort,
            Trust: state.Trust,
            ArtisticCohesion: state.ArtisticCohesion,
            IntimacyLevel: state.IntimacyLevel,
            selectedMode: state.selectedMode,
            WardrobeChoice: state.WardrobeChoice,
            BoudoirUnlocked: state.BoudoirUnlocked,
            RequiresNudityConsent: state.RequiresNudityConsent,
            Flag_LingerieUsed: state.Flag_LingerieUsed,
            Flag_ArtisticDrapeUsed: state.Flag_ArtisticDrapeUsed,
            Flag_MinimalCoverageUsed: state.Flag_MinimalCoverageUsed,
            Flag_BoudoirSessionDone: state.Flag_BoudoirSessionDone,
            currentScene: state.currentScene
          },
          currentSceneId: state.currentSceneId,
          currentBeatIndex: state.currentBeatIndex,
          currentDialogueIndex: state.currentDialogueIndex,
          totalChoicesMade: state.totalChoicesMade,
          scenesVisited: state.scenesVisited,
          timestamp: Date.now()
        };

        localStorage.setItem('zara_chapter1_save', JSON.stringify(saveData));
        console.log('✅ Game saved successfully');
      } catch (error) {
        console.error('Failed to save game:', error);
      }

      return {
        ...state,
        lastSaveTime: Date.now()
      };
    }

    case 'LOAD_STATE': {
      // Load from localStorage or provided state
      try {
        const saveData = action.payload?.saveData ||
          JSON.parse(localStorage.getItem('zara_chapter1_save') || '{}');

        if (!saveData.variables) {
          console.warn('No save data found');
          return state;
        }

        console.log('✅ Game loaded successfully');

        return {
          ...state,
          ...saveData.variables,
          currentSceneId: saveData.currentSceneId || state.currentSceneId,
          currentScene: saveData.currentSceneId || state.currentScene,
          currentBeatIndex: saveData.currentBeatIndex || 0,
          currentDialogueIndex: saveData.currentDialogueIndex || 0,
          totalChoicesMade: saveData.totalChoicesMade || 0,
          scenesVisited: saveData.scenesVisited || [saveData.currentSceneId],
          displayedText: '',
          isTyping: false,
          showingChoices: false
        };
      } catch (error) {
        console.error('Failed to load game:', error);
        return state;
      }
    }

    case 'RESTART': {
      return {
        ...INITIAL_GAME_STATE,
        playthroughStartTime: Date.now(),
        history: []
      };
    }

    default:
      return state;
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Fallback function to determine next scene when not explicitly specified in choice
 * This should rarely be used - choices should specify nextScene explicitly
 */
const getNextScene = (choiceId: string): string | null => {
  // Parse choice ID to extract scene number and attempt to determine next scene
  // Format: choice_X_... where X is scene number
  const match = choiceId.match(/choice_(\d+)_/);
  if (match) {
    const currentSceneNum = parseInt(match[1], 10);
    const nextSceneNum = currentSceneNum + 1;
    const nextSceneId = `scene_${nextSceneNum}_`;

    // Check if next scene exists
    const possibleScenes = Object.keys(SCENES).filter(id => id.startsWith(nextSceneId));
    if (possibleScenes.length > 0) {
      return possibleScenes[0];
    }
  }

  console.error(`Cannot determine next scene for choice: ${choiceId}`);
  return null;
};

export const getCurrentDialogueLine = (state: ExtendedGameState) => {
  const scene = SCENES[state.currentSceneId];
  if (!scene) return null;

  const beat = scene.sceneFlow[state.currentBeatIndex];
  if (!beat || !beat.dialogue) return null;

  return beat.dialogue[state.currentDialogueIndex];
};

export const getCurrentBeat = (state: ExtendedGameState) => {
  const scene = SCENES[state.currentSceneId];
  if (!scene) return null;

  return scene.sceneFlow[state.currentBeatIndex];
};

export const getCurrentScene = (state: ExtendedGameState): Scene | null => {
  return SCENES[state.currentSceneId] || null;
};

export const getAvailableChoices = (state: ExtendedGameState): Choice[] => {
  const scene = SCENES[state.currentSceneId];
  if (!scene || !scene.choices) return [];

  return scene.choices.filter(choice => isChoiceAvailable(choice, state));
};

export const getCurrentAssets = (state: ExtendedGameState) => {
  const beat = getCurrentBeat(state);
  if (!beat) return null;

  return {
    background: beat.background,
    character: beat.character,
    cg: beat.cg
  };
};

export const isSceneComplete = (state: ExtendedGameState): boolean => {
  const scene = SCENES[state.currentSceneId];
  if (!scene) return true;

  return (
    state.currentBeatIndex >= scene.sceneFlow.length - 1 &&
    (!getCurrentBeat(state)?.dialogue ||
      state.currentDialogueIndex >= (getCurrentBeat(state)?.dialogue?.length || 0) - 1)
  );
};

export const getPlaythroughStats = (state: ExtendedGameState) => {
  const duration = Date.now() - state.playthroughStartTime;
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  return {
    duration: { minutes, seconds, total: duration },
    choicesMade: state.totalChoicesMade,
    scenesVisited: state.scenesVisited.length,
    totalScenes: Object.keys(SCENES).length,
    completionPercentage: Math.round(
      (state.scenesVisited.length / Object.keys(SCENES).length) * 100
    )
  };
};

export const canGoBack = (state: ExtendedGameState): boolean => {
  return state.history.length > 0;
};

export const goBack = (state: ExtendedGameState): ExtendedGameState => {
  if (!canGoBack(state)) return state;

  const lastSnapshot = state.history[state.history.length - 1];

  return {
    ...state,
    ...lastSnapshot.variables,
    currentSceneId: lastSnapshot.sceneId,
    currentScene: lastSnapshot.sceneId,
    currentBeatIndex: lastSnapshot.beatIndex,
    currentDialogueIndex: lastSnapshot.dialogueIndex,
    history: state.history.slice(0, -1),
    displayedText: '',
    isTyping: false,
    showingChoices: false
  };
};

// ============================================================================
// AUTO-SAVE FUNCTIONALITY
// ============================================================================

export const shouldAutoSave = (state: ExtendedGameState): boolean => {
  const AUTO_SAVE_INTERVAL = 60000; // 1 minute
  return Date.now() - state.lastSaveTime > AUTO_SAVE_INTERVAL;
};

export const autoSave = (state: ExtendedGameState): ExtendedGameState => {
  if (shouldAutoSave(state)) {
    return gameStateReducer(state, { type: 'SAVE_STATE' });
  }
  return state;
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  SCENES,
  INITIAL_VARIABLES
} from './chapterOneExpandedScenes';
