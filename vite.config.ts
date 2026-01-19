import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isDev = mode === 'development';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Note: /api proxy disabled because Vercel api folder conflicts
        // App.tsx uses getProxyBaseUrl() directly for dev mode
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        // Optimize for production
        minify: 'esbuild',
        target: 'es2015',
        rollupOptions: {
          output: {
            manualChunks: {
              // Core React libraries
              'react-vendor': ['react', 'react-dom'],

              // Google AI services
              'google-vendor': ['@google/genai', 'google-auth-library'],

              // Services by functionality
              'gemini-services': [
                './services/geminiService',
                './services/vertexImagenService',
                './vera/services/geminiService',
                './vera/services/vertexAiService',
              ],
              'generation-services': [
                './services/intelligentGenerationService',
                './services/replicateService',
                './services/videoGenerationService',
                './services/veoService',
              ],
              'utility-services': [
                './services/promptParser',
                './services/imagenOptimizer',
                './services/ultraOptimizer',
                './utils/sharedAuthManager',
              ],

              // Mode-specific chunks
              'visual-novel': [
                './visualnovel/RealVisualNovel',
                './visualnovel/VisualNovelAssetGenerator',
              ],
              'specialty-modes': [
                './experimental/ExperimentalMode',
                './artistic/ArtisticMode',
                './corporate/CorporateMode',
                './platinum/PlatinumMode',
                './roleplay/IndianRolePlayMode',
                './masterclass/MasterClassMode',
              ],
            }
          }
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
      }
    };
});
