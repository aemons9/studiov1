/**
 * Asset Server - Handles saving generated assets to file system
 * Run this alongside your Vite dev server: node assetServer.js
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

// Enable CORS for all localhost ports (dev mode)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ]
}));

app.use(express.json({ limit: '50mb' })); // Support large base64 images

// Asset directory
const ASSETS_DIR = path.join(__dirname, 'visualnovel', 'assets');

/**
 * POST /api/save-asset
 * Body: { assetId, type, base64Image, filename }
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
      'character_sprite': 'sprites',
      'sprite': 'sprites',
      'background': 'backgrounds',
      'cg_image': 'cg',
      'cg': 'cg',
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

    console.log(`✅ Saved asset: ${subfolder}/${filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

    res.json({
      success: true,
      path: `visualnovel/assets/${subfolder}/${filename}`,
      size: imageBuffer.length
    });

  } catch (error) {
    console.error('❌ Failed to save asset:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/assets
 * Returns list of all saved assets
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
    console.error('❌ Failed to list assets:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * DELETE /api/assets/:type/:filename
 * Delete a specific asset
 */
app.delete('/api/assets/:type/:filename', async (req, res) => {
  try {
    const { type, filename } = req.params;

    const subfolderMap = {
      'character_sprite': 'sprites',
      'sprite': 'sprites',
      'background': 'backgrounds',
      'cg_image': 'cg',
      'cg': 'cg',
      'cutscene_video': 'videos',
      'ui_element': 'ui',
      'bgm': 'bgm',
      'sfx': 'sfx',
      'location_map': 'maps'
    };

    const subfolder = subfolderMap[type];
    if (!subfolder) {
      return res.status(400).json({ error: 'Invalid asset type' });
    }

    const filePath = path.join(ASSETS_DIR, subfolder, filename);
    await fs.unlink(filePath);

    console.log(`🗑️ Deleted asset: ${subfolder}/${filename}`);

    res.json({ success: true });

  } catch (error) {
    console.error('❌ Failed to delete asset:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Asset Server running on http://localhost:${PORT}`);
  console.log(`📁 Saving assets to: ${ASSETS_DIR}`);
  console.log(`🔗 CORS enabled for all localhost ports (3000, 5173, 5174)`);
});
