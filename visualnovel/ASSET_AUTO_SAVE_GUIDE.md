# Visual Novel Asset Auto-Save System

## 🎯 Problem Solved

- ❌ **No more localStorage limits!** (was hitting 5-10 MB limit)
- ✅ **Auto-saves to file system** (unlimited size)
- ✅ **Auto-updates Visual Novel** when new assets generated
- ✅ **No manual file management** required

## 🚀 How to Use

### 1. Start Both Servers

Run this single command:

```bash
npm run dev:vn
```

This starts:
- **Asset Server** (http://localhost:3001) - Saves assets to file system
- **Vite Dev Server** (http://localhost:5173) - Your app

### 2. Generate Assets

1. Open app: http://localhost:5173
2. Navigate to Visual Novel → Asset Generator
3. Click "Generate" on any asset
4. **Asset auto-saves to `visualnovel/assets/`**
5. **Visual Novel auto-reloads with new asset!**

## 📁 File Structure

Assets are automatically saved to:

```
visualnovel/assets/
├── sprites/          # Character sprites
│   └── zara_neutral.png
├── backgrounds/      # Scene backgrounds
│   └── bg_art_gallery.png
├── cg/              # CG images
├── videos/          # Cutscene videos
├── ui/              # UI elements
├── bgm/             # Background music
├── sfx/             # Sound effects
└── maps/            # Location maps
```

## 🔄 How It Works

1. **Generate asset** in Asset Generator
2. **Backend API** (port 3001) saves image to `visualnovel/assets/`
3. **Vite hot-reload** detects new file
4. **Visual Novel** auto-loads new asset via `import.meta.glob`

## 🐛 Troubleshooting

### "Failed to save asset"

**Cause:** Asset Server not running

**Fix:**
```bash
# Terminal 1: Start Asset Server
npm run asset-server

# Terminal 2: Start Vite
npm run dev
```

Or use the combined command:
```bash
npm run dev:vn
```

### Asset not showing in Visual Novel

**Cause:** Filename mismatch

**Check:**
1. Asset saved to correct folder? (check console logs)
2. Filename matches expected format? (check `assetLoader.ts`)

**Debug:**
```javascript
// In browser console:
window.debugAssets()
```

This shows:
- ✅ Files found by Vite
- ❌ Expected files not found
- 📊 Asset counts

### Port 3001 already in use

**Fix:**
```bash
# Find and kill process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in assetServer.js:
const PORT = 3002; // Change this
```

## 🎨 API Endpoints

### POST /api/save-asset
Save generated asset to file system

**Body:**
```json
{
  "assetId": "zara_neutral",
  "type": "sprite",
  "base64Image": "data:image/png;base64,...",
  "filename": "zara_neutral.png"
}
```

**Response:**
```json
{
  "success": true,
  "path": "visualnovel/assets/sprites/zara_neutral.png",
  "size": 245678
}
```

### GET /api/assets
List all saved assets

**Response:**
```json
{
  "sprites": ["zara_neutral.png", "zara_happy.png"],
  "backgrounds": ["bg_art_gallery.png"],
  "cg": []
}
```

### DELETE /api/assets/:type/:filename
Delete specific asset

```bash
curl -X DELETE http://localhost:3001/api/assets/sprite/zara_neutral.png
```

## 📊 localStorage Migration

Old assets in localStorage? Clear them to free space:

```javascript
// In browser console:
localStorage.clear()
// Or keep tokens and clear only VN assets:
Object.keys(localStorage)
  .filter(k => k.startsWith('vn_asset_'))
  .forEach(k => localStorage.removeItem(k));
```

## 🔧 Advanced Configuration

### Change Asset Server Port

Edit `assetServer.js`:
```javascript
const PORT = 3002; // Change port
```

### Change Asset Directory

Edit `assetServer.js`:
```javascript
const ASSETS_DIR = path.join(__dirname, 'custom', 'path');
```

### Disable Auto-Save

In `VisualNovelAssetGenerator.tsx`, comment out:
```typescript
// saveAssetToFileSystem(asset, latestImage)
```

## 💡 Tips

1. **Use `npm run dev:vn`** - Starts everything you need
2. **Check console logs** - Shows save status and file paths
3. **Use `window.debugAssets()`** - Debug asset loading
4. **Keep Asset Server running** - Required for auto-save

## 🎯 What Changed

### Before (localStorage)
- ❌ 5-10 MB limit
- ❌ Manual file management
- ❌ No auto-update
- ❌ "QuotaExceeded" errors

### After (File System)
- ✅ Unlimited size
- ✅ Auto-save to disk
- ✅ Auto-update VN
- ✅ No errors!

---

**Ready to generate assets!** 🎨

```bash
npm run dev:vn
```
