/**
 * REPLICATE API PROXY SERVER
 *
 * This server proxies requests to Replicate API to avoid CORS issues.
 * Browsers cannot directly call Replicate API due to CORS restrictions.
 *
 * Usage:
 *   npm run proxy
 *
 * The proxy server runs on http://localhost:3001
 * Your Vite app runs on http://localhost:3000
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for all origins (dev only - restrict in production)
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Asset directory for Visual Novel
const ASSETS_DIR = path.join(__dirname, 'visualnovel', 'assets');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'replicate-proxy' });
});

// Proxy POST /predictions
app.post('/api/replicate/predictions', async (req, res) => {
  try {
    const { token, ...body } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required' });
    }

    console.log('🎨 Proxying Replicate prediction request...');

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Replicate API error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Prediction created:', data.id);
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy GET /predictions/:id
app.get('/api/replicate/predictions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required in Authorization header' });
    }

    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy GET /models/:owner/:name (for fetching model versions)
// Using a regex parameter to match the full path
app.get(/^\/api\/replicate\/models\/(.+)$/, async (req, res) => {
  try {
    // Extract model path from the regex capture group
    // e.g., "black-forest-labs/flux-1.1-pro-ultra"
    const model = req.params[0];
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required in Authorization header' });
    }

    console.log('🔍 Fetching model info:', model);

    const response = await fetch(`https://api.replicate.com/v1/models/${model}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Model fetch error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Model info fetched:', data.latest_version?.id?.substring(0, 12) + '...');
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy image downloads
app.get('/api/replicate/download', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Image URL required' });
    }

    console.log('📥 Downloading image via proxy:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ReplicateProxy/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`❌ Image fetch failed: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({
        error: 'Failed to download image',
        status: response.status,
        statusText: response.statusText
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    console.log(`✅ Image downloaded: ${buffer.length} bytes, type: ${contentType}`);

    res.set('Content-Type', contentType);
    res.send(buffer);
  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({
      error: 'Download error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

// ==========================================
// VISUAL NOVEL ASSET SAVING ENDPOINTS
// ==========================================

/**
 * POST /api/save-asset
 * Saves generated VN assets to file system
 */
app.post('/api/save-asset', async (req, res) => {
  try {
    const { assetId, type, base64Image, filename } = req.body;

    if (!assetId || !type || !base64Image || !filename) {
      return res.status(400).json({
        error: 'Missing required fields: assetId, type, base64Image, filename'
      });
    }

    // Determine subfolder based on asset type
    const subfolderMap = {
      'sprite': 'sprites',
      'character_sprite': 'sprites',
      'background': 'backgrounds',
      'cg': 'cg',
      'cg_image': 'cg',
      'cutscene_video': 'videos',
      'ui_element': 'ui',
      'bgm': 'bgm',
      'sfx': 'sfx',
      'location_map': 'maps'
    };

    const subfolder = subfolderMap[type] || 'misc';
    const targetDir = path.join(ASSETS_DIR, subfolder);

    // Ensure directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Clean base64 string (remove data URI prefix if present)
    let cleanBase64 = base64Image;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(cleanBase64, 'base64');

    // Save to file
    const filePath = path.join(targetDir, filename);
    await fs.writeFile(filePath, imageBuffer);

    console.log(`✅ Saved VN asset: ${subfolder}/${filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

    res.json({
      success: true,
      path: `visualnovel/assets/${subfolder}/${filename}`,
      size: imageBuffer.length
    });

  } catch (error) {
    console.error('❌ Failed to save VN asset:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/assets
 * Returns list of all saved VN assets
 */
app.get('/api/assets', async (req, res) => {
  try {
    const assets = {};
    const subfolders = ['sprites', 'backgrounds', 'cg', 'videos', 'ui', 'bgm', 'sfx', 'maps'];

    for (const subfolder of subfolders) {
      const dirPath = path.join(ASSETS_DIR, subfolder);

      try {
        const files = await fs.readdir(dirPath);
        assets[subfolder] = files;
      } catch (error) {
        // Directory doesn't exist yet
        assets[subfolder] = [];
      }
    }

    res.json(assets);

  } catch (error) {
    console.error('❌ Failed to list VN assets:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Unified Dev Server Started');
  console.log('====================================');
  console.log(`✅ Running on: http://localhost:${PORT}`);
  console.log('✅ CORS enabled for all origins');
  console.log('✅ Ready for Replicate API + VN Asset saving');
  console.log('');
  console.log('Endpoints:');
  console.log(`  GET  /health                           - Health check`);
  console.log('');
  console.log('  Replicate API Proxy:');
  console.log(`  POST /api/replicate/predictions        - Create prediction`);
  console.log(`  GET  /api/replicate/predictions/:id    - Poll prediction`);
  console.log(`  GET  /api/replicate/models/:model      - Get model info`);
  console.log(`  GET  /api/replicate/download?url=...   - Download image`);
  console.log('');
  console.log('  Visual Novel Assets:');
  console.log(`  POST /api/save-asset                   - Save VN asset to file system`);
  console.log(`  GET  /api/assets                       - List all saved VN assets`);
  console.log('');
});
