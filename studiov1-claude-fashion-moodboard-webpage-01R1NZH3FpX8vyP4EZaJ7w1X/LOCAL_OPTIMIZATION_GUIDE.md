# Local Development Optimization Guide

**For:** `~/ai-image-studio` on ecolex-Precision-5490
**Environment:** Local Linux development setup

---

## Quick Wins (Do These Now!)

### 1. Enable Hot Module Replacement (HMR) Optimizations

**Edit `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Optimize dev server
  server: {
    port: 5173,
    host: true, // Allow network access
    strictPort: false,
    open: true, // Auto-open browser
    cors: true
  },

  // Enable faster rebuilds
  optimizeDeps: {
    include: ['react', 'react-dom']
  },

  // Build optimizations
  build: {
    target: 'esnext',
    minify: 'esbuild', // Faster than terser
    sourcemap: false, // Disable for faster builds

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'concepts': [
            './concepts/subjects',
            './concepts/concepts',
            './concepts/seductressPresets'
          ]
        }
      }
    }
  }
});
```

**Time:** 2 minutes
**Impact:** 30-40% faster dev server startup

---

### 2. Add Environment Variables (Stop Hardcoding Tokens!)

**Create `.env.local` in project root:**
```bash
cd ~/ai-image-studio
cat > .env.local <<'EOF'
# Vertex AI Configuration
VITE_PROJECT_ID=your-project-id
VITE_REGION=us-east4

# DO NOT commit actual tokens! This is for local dev only
# Get your token from: gcloud auth application-default print-access-token
VITE_VERTEX_AI_TOKEN=your-token-here
VITE_DRIVE_TOKEN=your-drive-token-here

# Storage Configuration
VITE_BUCKET_NAME=studiov-generated-images
VITE_DRIVE_FOLDER=StudioV Generated Images

# Feature Flags
VITE_ENABLE_CLOUD_STORAGE=true
VITE_ENABLE_DRIVE_STORAGE=true
EOF
```

**Add to `.gitignore`:**
```bash
echo "" >> .gitignore
echo "# Environment variables" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

**Update `App.tsx` to use environment variables:**
```typescript
// Load from environment instead of localStorage
const projectId = import.meta.env.VITE_PROJECT_ID || '';
const accessToken = import.meta.env.VITE_VERTEX_AI_TOKEN || localStorage.getItem('mainToken') || '';
```

**Time:** 5 minutes
**Impact:** No more hardcoded secrets, easier configuration

---

### 3. Create Development Scripts

**Edit `package.json`, add these scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",

    // NEW SCRIPTS
    "dev:fast": "vite --force", // Force rebuild deps
    "dev:host": "vite --host 0.0.0.0", // Access from phone/other devices
    "build:analyze": "vite build --mode analyze", // See bundle size
    "clean": "rm -rf node_modules/.vite dist", // Clean cache
    "fresh": "npm run clean && npm install && npm run dev", // Fresh start

    // Token management
    "token:set": "node scripts/setToken.js",
    "token:refresh": "gcloud auth application-default print-access-token"
  }
}
```

**Create `scripts/setToken.js`:**
```bash
mkdir -p ~/ai-image-studio/scripts
cat > ~/ai-image-studio/scripts/setToken.js <<'EOF'
#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔑 Fetching fresh access token from gcloud...');

try {
  const token = execSync('gcloud auth application-default print-access-token', {
    encoding: 'utf-8'
  }).trim();

  // Update .env.local
  const envPath = '.env.local';
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';

  // Replace or add token
  if (envContent.includes('VITE_VERTEX_AI_TOKEN=')) {
    envContent = envContent.replace(
      /VITE_VERTEX_AI_TOKEN=.*/,
      `VITE_VERTEX_AI_TOKEN=${token}`
    );
  } else {
    envContent += `\nVITE_VERTEX_AI_TOKEN=${token}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Token updated in .env.local');
  console.log('🔄 Restart dev server for changes to take effect');
} catch (error) {
  console.error('❌ Failed to get token. Run: gcloud auth application-default login');
  process.exit(1);
}
EOF

chmod +x ~/ai-image-studio/scripts/setToken.js
```

**Usage:**
```bash
cd ~/ai-image-studio

# Refresh your token (expires after 1 hour)
npm run token:set

# Start dev server with latest token
npm run dev

# Or access from phone/tablet on same network
npm run dev:host
```

**Time:** 10 minutes
**Impact:** Easy token management, no more manual copy-paste

---

### 4. Add Request Caching (Instant)

**Create `services/cache.ts`:**
```typescript
// Simple localStorage cache for API responses
export class LocalCache {
  private prefix = 'cache:';
  private ttl = 24 * 60 * 60 * 1000; // 24 hours

  get(key: string): any | null {
    try {
      const cached = localStorage.getItem(this.prefix + key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);

      // Check if expired
      if (Date.now() - timestamp > this.ttl) {
        this.delete(key);
        return null;
      }

      console.log('✅ Cache hit:', key);
      return data;
    } catch {
      return null;
    }
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to cache:', error);
    }
  }

  delete(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

export const cache = new LocalCache();
```

**Update `services/geminiService.ts`:**
```typescript
import { cache } from './cache';
import { createHash } from 'crypto';

// Helper to create cache key
function getCacheKey(data: any): string {
  return createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');
}

export async function weavePrompt(
  promptData: PromptData,
  settings: GenerationSettings,
  options: WeaveOptions = {}
): Promise<string> {
  // Try cache first
  const cacheKey = getCacheKey({ promptData, options });
  const cached = cache.get(`weave:${cacheKey}`);

  if (cached) {
    console.log('⚡ Using cached weave (saved 3-5 seconds + $0.001)');
    return cached;
  }

  // Cache miss - make API call
  const result = await weavePromptActual(promptData, settings, options);

  // Cache the result
  cache.set(`weave:${cacheKey}`, result);

  return result;
}

// Rename original function
async function weavePromptActual(...) {
  // ... original weave logic
}
```

**Add cache management UI:**
```typescript
// Add to your settings/toolbar
<button onClick={() => {
  cache.clear();
  alert('Cache cleared!');
}}>
  Clear Cache
</button>
```

**Time:** 15 minutes
**Impact:** Instant results for repeated prompts, save API costs

---

### 5. Optimize Image Loading (Local Storage)

**Create `services/imageCache.ts`:**
```typescript
// IndexedDB for storing generated images locally
class ImageCache {
  private dbName = 'studiov-images';
  private storeName = 'images';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
    });
  }

  async saveImage(id: string, base64: string, metadata: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const request = store.put({
        id,
        base64,
        metadata,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getImage(id: string): Promise<{ base64: string; metadata: any } | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({ base64: result.base64, metadata: result.metadata });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAllImages(): Promise<Array<{ id: string; metadata: any }>> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result.map(item => ({
          id: item.id,
          metadata: item.metadata
        })));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteImage(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const imageCache = new ImageCache();
```

**Update image generation to save locally:**
```typescript
// After generating image
const imageId = `img-${Date.now()}`;
await imageCache.saveImage(imageId, base64Image, {
  promptData,
  settings,
  conceptName,
  timestamp: Date.now()
});

// Later, load from local cache
const cached = await imageCache.getImage(imageId);
if (cached) {
  setGeneratedImages([{ url: `data:image/png;base64,${cached.base64}` }]);
}
```

**Time:** 20 minutes
**Impact:** Keep ALL generated images locally, even if cloud upload fails

---

### 6. Add Progress Indicators

**Create `components/ProgressBar.tsx`:**
```typescript
import React from 'react';

interface ProgressBarProps {
  stage: 'enhancing' | 'weaving' | 'generating' | 'uploading';
  progress: number; // 0-100
  timeElapsed: number; // seconds
  estimatedTotal?: number; // seconds
}

export default function ProgressBar({ stage, progress, timeElapsed, estimatedTotal }: ProgressBarProps) {
  const stageNames = {
    enhancing: '🎨 Enhancing prompt',
    weaving: '🪡 Weaving prompt',
    generating: '🎭 Generating image',
    uploading: '☁️ Uploading to storage'
  };

  const timeRemaining = estimatedTotal ? estimatedTotal - timeElapsed : null;

  return (
    <div className="w-full bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{stageNames[stage]}</span>
        <span className="text-sm text-gray-400">{progress}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>{timeElapsed}s elapsed</span>
        {timeRemaining !== null && (
          <span>~{Math.ceil(timeRemaining)}s remaining</span>
        )}
      </div>

      {/* Stage breakdown */}
      <div className="flex gap-2 text-xs mt-2">
        <div className={progress >= 0 ? 'text-green-500' : 'text-gray-500'}>
          ✓ Start
        </div>
        <div className={progress >= 25 ? 'text-green-500' : 'text-gray-500'}>
          {stage === 'enhancing' ? '→' : '✓'} Enhance
        </div>
        <div className={progress >= 50 ? 'text-green-500' : 'text-gray-500'}>
          {stage === 'weaving' ? '→' : progress >= 50 ? '✓' : '○'} Weave
        </div>
        <div className={progress >= 75 ? 'text-green-500' : 'text-gray-500'}>
          {stage === 'generating' ? '→' : progress >= 75 ? '✓' : '○'} Generate
        </div>
        <div className={progress === 100 ? 'text-green-500' : 'text-gray-500'}>
          {stage === 'uploading' ? '→' : progress === 100 ? '✓' : '○'} Upload
        </div>
      </div>
    </div>
  );
}
```

**Use in `App.tsx`:**
```typescript
const [progress, setProgress] = useState(0);
const [startTime, setStartTime] = useState(0);

async function handleGenerate() {
  setStartTime(Date.now());
  setProgress(0);

  // Stage 1: Enhancing (0-25%)
  setGenerationStep('enhancing');
  setProgress(5);
  const enhanced = await enhancePrompt(...);
  setProgress(25);

  // Stage 2: Weaving (25-50%)
  setGenerationStep('weaving');
  setProgress(30);
  const woven = await weavePrompt(...);
  setProgress(50);

  // Stage 3: Generating (50-75%)
  setGenerationStep('generating');
  setProgress(55);
  const images = await generateImage(...);
  setProgress(75);

  // Stage 4: Uploading (75-100%)
  setGenerationStep('uploading');
  await uploadImages(images);
  setProgress(100);
}

// In your render:
{isLoading && (
  <ProgressBar
    stage={generationStep}
    progress={progress}
    timeElapsed={Math.floor((Date.now() - startTime) / 1000)}
    estimatedTotal={25} // Average time
  />
)}
```

**Time:** 15 minutes
**Impact:** Much better UX, users know exactly what's happening

---

### 7. Add Keyboard Shortcuts

**Create `hooks/useKeyboardShortcuts.ts`:**
```typescript
import { useEffect } from 'react';

export function useKeyboardShortcuts(handlers: {
  onGenerate?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onReset?: () => void;
  onCopy?: () => void;
}) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + Enter = Generate
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlers.onGenerate?.();
      }

      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handlers.onSave?.();
      }

      // Ctrl/Cmd + O = Load/Open
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        handlers.onLoad?.();
      }

      // Ctrl/Cmd + R = Reset
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handlers.onReset?.();
      }

      // Ctrl/Cmd + C = Copy prompt
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !window.getSelection()?.toString()) {
        e.preventDefault();
        handlers.onCopy?.();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlers]);
}
```

**Use in `App.tsx`:**
```typescript
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  // ... existing code

  useKeyboardShortcuts({
    onGenerate: handleGenerate,
    onSave: handleSavePrompt,
    onLoad: handleOpenLoadModal,
    onReset: handleResetPrompt,
    onCopy: handleCopyPrompt,
  });

  return (
    <div>
      {/* Show shortcuts in UI */}
      <div className="text-xs text-gray-500 p-2">
        Shortcuts: Ctrl+Enter (Generate) | Ctrl+S (Save) | Ctrl+O (Load)
      </div>
      {/* ... rest of UI */}
    </div>
  );
}
```

**Time:** 10 minutes
**Impact:** Power users can work much faster

---

## Development Workflow Improvements

### 8. Add Local Testing Mode

**Create `.env.development`:**
```bash
# Development mode - use test data instead of real API calls
VITE_DEV_MODE=true
VITE_MOCK_API=false

# If VITE_MOCK_API=true, use mock responses for faster testing
```

**Create `services/mockService.ts`:**
```typescript
// Mock responses for faster local development
export const mockResponses = {
  enhance: (promptData: PromptData) => {
    // Return promptData with minor changes
    return { ...promptData, wardrobe: '[ENHANCED] ' + promptData.wardrobe };
  },

  weave: (promptData: PromptData) => {
    return `[MOCK WOVEN PROMPT] ${JSON.stringify(promptData).substring(0, 100)}...`;
  },

  generate: () => {
    // Return base64 of a placeholder image
    return [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Nb2NrIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
    ];
  }
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

**Update services to use mocks in dev mode:**
```typescript
// services/geminiService.ts
import { mockResponses, delay } from './mockService';

export async function enhancePrompt(...) {
  if (import.meta.env.VITE_MOCK_API === 'true') {
    await delay(500); // Simulate API delay
    return mockResponses.enhance(promptData);
  }

  // Real API call
  return enhancePromptActual(...);
}
```

**Time:** 20 minutes
**Impact:** Test UI/UX without burning API credits

---

### 9. Bundle Size Analysis

**Install analyzer:**
```bash
npm install --save-dev rollup-plugin-visualizer
```

**Update `vite.config.ts`:**
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ]
});
```

**Analyze:**
```bash
npm run build
# Opens browser with visual bundle analysis
```

**Time:** 5 minutes
**Impact:** See exactly what's making your bundle large

---

### 10. Git Hooks for Quality

**Install Husky:**
```bash
cd ~/ai-image-studio
npm install --save-dev husky
npx husky install
```

**Add pre-commit hook:**
```bash
npx husky add .husky/pre-commit "npm run check"
```

**Add check script to `package.json`:**
```json
{
  "scripts": {
    "check": "tsc --noEmit && echo '✅ TypeScript check passed'"
  }
}
```

**Time:** 5 minutes
**Impact:** Catch errors before committing

---

## Performance Monitoring (Local)

### 11. Add Performance Logging

**Create `services/performance.ts`:**
```typescript
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  start(label: string): () => void {
    const startTime = performance.now();

    return () => {
      const duration = performance.now() - startTime;

      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      this.metrics.get(label)!.push(duration);

      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    };
  }

  getStats(label: string) {
    const values = this.metrics.get(label) || [];
    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    return {
      count: values.length,
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
    };
  }

  report() {
    console.log('\n📊 Performance Report:');
    for (const [label, _values] of this.metrics) {
      const stats = this.getStats(label);
      console.log(`\n${label}:`);
      console.log(`  Calls: ${stats?.count}`);
      console.log(`  Avg: ${stats?.avg.toFixed(2)}ms`);
      console.log(`  P50: ${stats?.p50.toFixed(2)}ms`);
      console.log(`  P95: ${stats?.p95.toFixed(2)}ms`);
      console.log(`  Min: ${stats?.min.toFixed(2)}ms`);
      console.log(`  Max: ${stats?.max.toFixed(2)}ms`);
    }
  }
}

export const perf = new PerformanceMonitor();

// Usage
const end = perf.start('Image Generation');
await generateImage(...);
end();

// View report in console
perf.report();
```

**Time:** 10 minutes
**Impact:** Understand exactly where time is spent

---

## When You're Ready for Cloud

### 12. Deploy to Cloud (Later)

**Option A: Cloud Run (Recommended)**
```bash
cd ~/ai-image-studio

# Create Dockerfile
cat > Dockerfile <<'EOF'
FROM node:20-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Build and deploy
gcloud run deploy studiov \
  --source . \
  --region us-east4 \
  --allow-unauthenticated
```

**Option B: Firebase Hosting (Free)**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
npm run build
firebase deploy --only hosting
```

**Cost:**
- Cloud Run: ~$5/month
- Firebase Hosting: FREE for 10GB bandwidth/month

---

## Quick Reference Card

Create this cheat sheet for your desk:

```
╔═══════════════════════════════════════════════════════╗
║          AI Image Studio - Quick Reference            ║
╠═══════════════════════════════════════════════════════╣
║ DEVELOPMENT                                           ║
║  npm run dev          - Start dev server              ║
║  npm run dev:host     - Access from other devices     ║
║  npm run token:set    - Refresh access token          ║
║  npm run build        - Production build              ║
║                                                       ║
║ KEYBOARD SHORTCUTS                                    ║
║  Ctrl+Enter          - Generate image                 ║
║  Ctrl+S              - Save prompt                    ║
║  Ctrl+O              - Load prompt                    ║
║  Ctrl+R              - Reset prompt                   ║
║                                                       ║
║ MAINTENANCE                                           ║
║  npm run clean       - Clear cache                    ║
║  npm run fresh       - Clean reinstall                ║
║                                                       ║
║ DEBUGGING                                             ║
║  localStorage.clear()      - Clear all storage        ║
║  cache.clear()             - Clear API cache          ║
║  perf.report()             - View performance stats   ║
╚═══════════════════════════════════════════════════════╝
```

---

## Next Steps

### Today (30 minutes)
1. ✅ Create `.env.local` with your tokens
2. ✅ Update `vite.config.ts` with optimizations
3. ✅ Add caching to `geminiService.ts`
4. ✅ Test with `npm run dev`

### This Week (2-3 hours)
1. ✅ Implement progress indicators
2. ✅ Add keyboard shortcuts
3. ✅ Set up image caching (IndexedDB)
4. ✅ Add performance monitoring

### Next Week (When Ready)
1. ✅ Deploy to Firebase Hosting (free)
2. ✅ Share with users for feedback
3. ✅ Monitor usage and performance

---

## Need Help?

**Check logs:**
```bash
# Dev server console shows all logs
# Chrome DevTools > Console for client-side logs
# Chrome DevTools > Network for API calls
```

**Common issues:**
```bash
# Token expired
npm run token:set

# Cache issues
npm run clean && npm run dev

# Port in use
killall -9 node
npm run dev
```

**Get fresh token:**
```bash
gcloud auth application-default login
gcloud auth application-default print-access-token
```

---

*This guide focuses on LOCAL optimizations you can implement immediately without cloud infrastructure.*
