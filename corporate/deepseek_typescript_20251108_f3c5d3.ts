// Enhanced App.tsx with Corporate Integration
const App: React.FC = () => {
  // Existing state
  const [promptData, setPromptData] = useState<PromptData>(JSON.parse(initialPromptJson));
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Corporate power state
  const {
    corporateState,
    isCorporateMode,
    updateCorporateState,
    toggleCorporateMode
  } = useCorporatePower();

  // Enhanced generation handler
  const handleCorporateGeneration = async (options: CorporateGenerateOptions) => {
    if (!validateCorporateState(corporateState)) {
      setError('Please select both a corporate role and environment');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate corporate-optimized prompt
      const corporateEngine = new CorporatePromptEngine();
      const corporatePrompt = corporateEngine.generateCorporatePrompt(corporateState);
      
      // Validate corporate prompt
      const validation = await CorporateSafetyValidator.validate(corporatePrompt, corporateState);
      if (!validation.isValid) {
        setError(`Corporate safety validation failed: ${validation.issues.join(', ')}`);
        return;
      }

      // Apply corporate-specific generation settings
      const corporateSettings = getCorporateGenerationSettings(corporateState, options);
      
      // Execute generation
      const result = await executeCorporateGeneration(
        corporatePrompt, 
        corporateState, 
        corporateSettings
      );

      setGeneratedImages(result.images);
      addToCorporateHistory(corporateState, corporatePrompt, result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Corporate generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Corporate batch generation
  const handleCorporateBatchGenerate = async (configs: CorporatePowerState[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const batchResults = [];
      
      for (const config of configs) {
        const corporateEngine = new CorporatePromptEngine();
        const prompt = corporateEngine.generateCorporatePrompt(config);
        
        const result = await executeCorporateGeneration(prompt, config, {
          batchMode: true,
          qualityBoost: true
        });
        
        batchResults.push({ config, prompt, result });
      }

      setGeneratedImages(batchResults.flatMap(r => r.result.images));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Batch generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Corporate Mode Toggle */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={toggleCorporateMode}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isCorporateMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {isCorporateMode ? '🔄 Exit Corporate Mode' : '💼 Enter Corporate Mode'}
        </button>
      </div>

      {isCorporateMode ? (
        // Corporate Mode Interface
        <CorporateInterface
          corporateState={corporateState}
          onCorporateStateChange={updateCorporateState}
          onCorporateGenerate={handleCorporateGeneration}
          onBatchGenerate={handleCorporateBatchGenerate}
          isLoading={isLoading}
          generatedImages={generatedImages}
        />
      ) : (
        // Standard Mode Interface
        <StandardInterface
          promptData={promptData}
          onPromptChange={setPromptData}
          // ... existing props
        />
      )}
    </div>
  );
};