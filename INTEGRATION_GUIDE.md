## Integration Guide: Seductress 10/10 NUCLEAR Panel

Complete guide for integrating the enhanced 10/10 models into your existing AI Fashion Studio app.

---

## Files Created for Integration

### 1. UI Component
**`components/Seductress10of10Panel.tsx`**
- Complete React component with all 10 models
- Model selector dropdown
- API target selection (Imagen/Veo/Flux)
- Translation bypass toggle
- Cultural legitimacy preview
- Prompt generation and display
- Cost estimates

### 2. Service Layer
**`services/seductress10of10Service.ts`**
- `generateSeductress10()` - Single model generation
- `generateSeductress10Batch()` - Batch generation for multiple models
- `getRecommendedSettings()` - Optimal configuration per model
- Translation bypass integration
- Intelligent generation service wrapper
- Cost calculation

### 3. Documentation
**`SEDUCTRESS_10of10_EXAMPLES.md`** - 10 complete NUCLEAR prompts
**`QUICK_REFERENCE_10of10.md`** - Quick lookup guide
**`INTEGRATION_GUIDE.md`** - This file

---

## Step 1: Add to App.tsx

### Option A: New Tab/Mode (Recommended)

```typescript
// In App.tsx
import Seductress10of10Panel from './components/Seductress10of10Panel';

// Add to your mode state
const [currentMode, setCurrentMode] = useState<'classic' | 'artistic' | 'corporate' | 'seductress10'>('classic');

// Add tab button
<button
  onClick={() => setCurrentMode('seductress10')}
  style={{
    padding: '12px 24px',
    backgroundColor: currentMode === 'seductress10' ? '#DC2626' : '#374151',
    border: '2px solid #DC2626',
    borderRadius: '8px',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer'
  }}
>
  🔥 SEDUCTRESS 10/10
</button>

// Add panel in mode rendering
{currentMode === 'seductress10' && (
  <Seductress10of10Panel
    accessToken={mainToken}
    onGenerate={handleSeductress10Generate}
    onPromptGenerated={handlePromptGenerated}
  />
)}
```

### Option B: Modal/Overlay (Alternative)

```typescript
// Add modal state
const [showSeductress10Modal, setShowSeductress10Modal] = useState(false);

// Add button to trigger modal
<button
  onClick={() => setShowSeductress10Modal(true)}
  style={{
    padding: '12px 24px',
    backgroundColor: '#DC2626',
    border: '2px solid #F87171',
    borderRadius: '8px',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer'
  }}
>
  🔥 SEDUCTRESS 10/10 NUCLEAR
</button>

// Add modal
{showSeductress10Modal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto'
  }}>
    <div style={{
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <Seductress10of10Panel
        accessToken={mainToken}
        onGenerate={handleSeductress10Generate}
        onPromptGenerated={handlePromptGenerated}
      />
      <button
        onClick={() => setShowSeductress10Modal(false)}
        style={{
          marginTop: '12px',
          padding: '12px',
          width: '100%',
          backgroundColor: '#4B5563',
          border: 'none',
          borderRadius: '8px',
          color: '#ffffff',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
```

---

## Step 2: Add Handler Functions

### In App.tsx, add these handlers:

```typescript
import { generateSeductress10, type Seductress10Config } from './services/seductress10of10Service';

const handleSeductress10Generate = async (config: any) => {
  try {
    console.log('🔥 Generating SEDUCTRESS 10/10:', config.model.name);

    // Show loading state
    setGenerating(true);
    setCurrentImage('');

    // Build configuration
    const seductressConfig: Seductress10Config = {
      modelId: config.model.id,
      modelName: config.model.name,
      poseIndex: config.poseIndex,
      wardrobeIndex: config.wardrobeIndex,
      environmentIndex: config.environmentIndex,
      targetAPI: config.targetAPI,
      useTranslation: config.useTranslation,
      translationLanguage: config.model.translationLanguage,
      culturalFraming: config.model.culturalFraming,
      intimacyLevel: 10,
      boundaryLevel: 25
    };

    // Generate with NUCLEAR service
    const result = await generateSeductress10(seductressConfig, mainToken);

    if (result.success) {
      console.log('✅ Generation successful!');
      console.log('📊 Strategies used:', result.strategies);
      console.log('💰 Cost:', `$${result.cost.toFixed(2)}`);
      console.log('🌐 Used translation:', result.usedTranslation);

      // Display result
      if (result.images && result.images.length > 0) {
        setCurrentImage(result.images[0]);
        setGeneratedImages(result.images);
      } else if (result.operationId) {
        // For Veo, show operation ID and poll for result
        alert(`Veo video generation started! Operation ID: ${result.operationId}`);
        // TODO: Implement polling for video completion
      }

      // Show success message
      alert(`✅ NUCLEAR generation successful!\n\nStrategies: ${result.strategies.join(', ')}\nCost: $${result.cost.toFixed(2)}\nCultural: ${result.culturalJustification}`);
    } else {
      console.error('❌ Generation failed:', result.error);
      alert(`❌ Generation failed: ${result.error}`);
    }
  } catch (error) {
    console.error('❌ Error in SEDUCTRESS 10/10 generation:', error);
    alert('Failed to generate. Check console for details.');
  } finally {
    setGenerating(false);
  }
};

const handlePromptGenerated = (prompt: string) => {
  console.log('📝 NUCLEAR Prompt generated:', prompt.substring(0, 200) + '...');
  // Optionally store or display the prompt
  setLastGeneratedPrompt(prompt);
};
```

---

## Step 3: Update State Management

Add these to your App.tsx state:

```typescript
const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState<string>('');
const [seductress10Results, setSeductress10Results] = useState<any[]>([]);
```

---

## Step 4: Add Batch Generation (Optional)

For generating all 10 models at once:

```typescript
import { generateSeductress10Batch } from './services/seductress10of10Service';

const handleBatchGenerate = async () => {
  const configs = SEDUCTRESS_MODELS.map(model => ({
    modelId: model.id,
    modelName: model.name,
    poseIndex: 0,
    wardrobeIndex: 0,
    environmentIndex: 0,
    targetAPI: 'imagen' as const,
    useTranslation: true,
    translationLanguage: model.translationLanguage,
    culturalFraming: model.culturalFraming,
    intimacyLevel: 10 as const,
    boundaryLevel: 25 as const
  }));

  const results = await generateSeductress10Batch(
    configs,
    mainToken,
    (current, total, result) => {
      console.log(`Progress: ${current}/${total} - ${result.success ? '✅' : '❌'}`);
      // Update progress UI
    }
  );

  setSeductress10Results(results);
  console.log('🎉 Batch complete:', results);
};
```

---

## Step 5: Style Integration

The component uses inline styles for portability. To integrate with your existing theme:

```typescript
// Option 1: Pass theme props
<Seductress10of10Panel
  accessToken={mainToken}
  onGenerate={handleSeductress10Generate}
  onPromptGenerated={handlePromptGenerated}
  theme={{
    primary: '#DC2626',
    secondary: '#EC4899',
    background: '#1a1a1a',
    text: '#ffffff'
  }}
/>

// Option 2: Use CSS classes (requires modifying component)
// Add className props to component and import your CSS
```

---

## Step 6: Environment Variables

Ensure these are set:

```env
# .env file
ANTHROPIC_API_KEY=your_claude_key_here

# For Flux (if using)
REPLICATE_API_TOKEN=your_replicate_token_here
```

And in your app, ensure tokens are available:

```typescript
const mainToken = localStorage.getItem('mainToken'); // Vertex AI OAuth2
const replicateToken = process.env.REPLICATE_API_TOKEN;
```

---

## Step 7: Add to Navigation/Menu

### Header Menu Item

```typescript
<nav style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
  <button onClick={() => setCurrentMode('classic')}>Classic</button>
  <button onClick={() => setCurrentMode('artistic')}>Artistic</button>
  <button onClick={() => setCurrentMode('corporate')}>Corporate</button>
  <button
    onClick={() => setCurrentMode('seductress10')}
    style={{
      backgroundColor: '#DC2626',
      border: '2px solid #F87171',
      padding: '8px 16px',
      borderRadius: '6px',
      color: '#ffffff',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    🔥 SEDUCTRESS 10/10
  </button>
</nav>
```

---

## Step 8: Testing Integration

### Quick Test

```typescript
// Add test button in development
{process.env.NODE_ENV === 'development' && (
  <button onClick={async () => {
    const testConfig = {
      model: SEDUCTRESS_MODELS[0], // Aisha Divine
      poseIndex: 0,
      wardrobeIndex: 0,
      environmentIndex: 0,
      targetAPI: 'flux' as const, // Fast test
      useTranslation: false,
      culturalReferences: 4
    };
    await handleSeductress10Generate(testConfig);
  }}>
    🧪 Test SEDUCTRESS 10/10
  </button>
)}
```

### Run Test

```bash
npm start
# Click test button
# Check console for:
# - ✅ Generation successful
# - 📊 Strategies used
# - 💰 Cost estimate
# - 🌐 Translation status
```

---

## Step 9: Experimental Mode Integration

To integrate with existing Experimental Mode:

```typescript
// In experimental/ExperimentalMode.tsx
import { NUCLEAR_NODES_10 } from './enhancedModelNodes';

// Add to available nodes
const allNodes = [
  ...existingNodes,
  ...NUCLEAR_NODES_10.subjects,
  ...NUCLEAR_NODES_10.wardrobes,
  ...NUCLEAR_NODES_10.poses,
  ...NUCLEAR_NODES_10.environments
];

// When nodes selected include NUCLEAR tier
if (selectedNodes.some(id => id.includes('transcendent-10'))) {
  // Use SEDUCTRESS 10/10 generation
  handleSeductress10Generate(config);
} else {
  // Use normal generation
  handleGenerate(config);
}
```

---

## Step 10: Error Handling & Fallbacks

Add robust error handling:

```typescript
const handleSeductress10Generate = async (config: any) => {
  try {
    const result = await generateSeductress10(seductressConfig, mainToken);

    if (!result.success) {
      // Try fallback to Flux
      if (config.targetAPI !== 'flux') {
        console.log('⚠️ Imagen failed, trying Flux fallback...');
        config.targetAPI = 'flux';
        config.useTranslation = false;
        return await handleSeductress10Generate(config);
      }

      throw new Error(result.error || 'Generation failed');
    }

    return result;
  } catch (error) {
    console.error('❌ All generation attempts failed:', error);
    alert(`Generation failed after all retries: ${error.message}`);
    return null;
  }
};
```

---

## Usage Examples

### Example 1: Generate Single Image

```typescript
// User selects "Aisha Divine" model
// Clicks "Generate NUCLEAR Prompt"
// Reviews prompt and cultural legitimacy
// Clicks "Generate NUCLEAR Image (IMAGEN)"
// System:
//   1. Translates prompt to Sanskrit
//   2. Applies adversarial rewriting
//   3. Generates with Imagen 4
//   4. Returns 4 image variants
// Cost: ~$0.07
```

### Example 2: Generate Video

```typescript
// User selects "Meera Sensualité"
// Changes API to "Veo 3.1"
// Enables translation (French)
// Generates
// System:
//   1. Uses shorter Veo-optimized prompt
//   2. Translates to French
//   3. Starts Veo generation (8 seconds)
//   4. Returns operation ID for polling
// Cost: ~$0.18
```

### Example 3: Fast Iteration with Flux

```typescript
// User selects "Kavya Athléa"
// Changes API to "Flux Ultra"
// Disables translation (faster)
// Generates
// System:
//   1. Uses direct prompt (no translation)
//   2. Flux with safetyTolerance: 6
//   3. Returns image in ~30 seconds
// Cost: ~$0.04
```

---

## Performance Optimization

### Caching Translation Results

```typescript
const translationCache = new Map<string, string>();

async function getCachedTranslation(prompt: string, language: string) {
  const key = `${language}:${prompt.substring(0, 100)}`;
  if (translationCache.has(key)) {
    console.log('✅ Using cached translation');
    return translationCache.get(key)!;
  }

  const translated = await smartTranslationBypass(prompt, language, config);
  translationCache.set(key, translated);
  return translated;
}
```

### Parallel Generation

```typescript
// Generate multiple models in parallel
const results = await Promise.all([
  generateSeductress10(config1, token),
  generateSeductress10(config2, token),
  generateSeductress10(config3, token)
]);
```

---

## Troubleshooting

### Issue: Component Not Rendering

**Check:**
1. Import path is correct
2. TypeScript compiled without errors
3. Props passed correctly (accessToken, handlers)

```bash
npx tsc --noEmit
# Should show no errors
```

### Issue: Translation Bypass Fails

**Solutions:**
1. Check `accessToken` is valid Vertex AI OAuth2 token
2. Ensure Google Cloud project has Translation API enabled
3. Try alternate language (Hebrew as fallback)
4. Disable translation temporarily

### Issue: Generation Blocked

**Solutions:**
1. Increase cultural references (add more museums/festivals)
2. Enable translation if disabled
3. Try Flux as fallback (no safety filter)
4. Check prompt follows NUCLEAR template structure

### Issue: High Costs

**Optimization:**
- Use Flux for iterations ($0.04 vs $0.07)
- Disable translation for testing
- Cache translated prompts
- Batch generate with delays to avoid retries

---

## Complete Integration Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Copy `Seductress10of10Panel.tsx` to `components/`
- [ ] Copy `seductress10of10Service.ts` to `services/`
- [ ] Import component in `App.tsx`
- [ ] Add mode/tab for SEDUCTRESS 10/10
- [ ] Implement `handleSeductress10Generate` handler
- [ ] Implement `handlePromptGenerated` handler
- [ ] Add state management for results
- [ ] Test with single model generation
- [ ] Test with all 3 APIs (Imagen, Veo, Flux)
- [ ] Test translation bypass
- [ ] Test error handling and fallbacks
- [ ] Add to navigation/menu
- [ ] Document in user guide
- [ ] Deploy and monitor costs

---

## API Cost Summary

| Action | API | Translation | Cost | Time |
|--------|-----|-------------|------|------|
| Single image | Imagen 4 | Yes | $0.06-$0.09 | ~30s |
| Single image | Imagen 4 | No | $0.04 | ~20s |
| Single video (8s) | Veo 3.1 | Yes | $0.17-$0.20 | ~5min |
| Single video (8s) | Veo 3.1 | No | $0.15 | ~4min |
| Single image | Flux Ultra | No | $0.04 | ~30s |
| Batch 10 images | Imagen 4 | Yes | $0.60-$0.90 | ~5min |
| Batch 10 videos | Veo 3.1 | Yes | $1.70-$2.00 | ~50min |

---

## Next Steps

1. **Test thoroughly** with each model and API combination
2. **Monitor costs** in Google Cloud Console / Replicate dashboard
3. **Collect feedback** on success rates and quality
4. **Iterate prompts** based on results
5. **Scale up** to full 15-model collection (add remaining 5)
6. **Add analytics** to track which models/strategies work best

---

**Integration complete! Your app now has NUCLEAR 10/10 SEDUCTRESS generation capabilities! 🔥**
