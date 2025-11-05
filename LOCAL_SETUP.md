# 🏠 Local Development Setup for StudioV

Complete guide to run StudioV locally on your machine with all features!

---

## 📋 Prerequisites

### 1. Install Node.js
```bash
# Check if you have Node.js installed
node --version
npm --version

# If not installed, install Node.js 18+ from:
# https://nodejs.org/
```

### 2. Verify Your System
```bash
# You should have:
cd /home/ecolex/ai-image-studio
ls -la
# Should show: backend, frontend folders (we'll replace these)
```

---

## 🚀 Step-by-Step Setup

### **Step 1: Clean Up Old Installation**

```bash
cd /home/ecolex/ai-image-studio

# Remove old backend/frontend folders (they're outdated)
rm -rf backend frontend

# Verify they're gone
ls -la
```

### **Step 2: Get the Latest StudioV Code**

You have two options:

**Option A: Clone from GitHub** (if you have the repo)
```bash
cd /home/ecolex/ai-image-studio
git clone https://github.com/aemons9/studiov.git .
```

**Option B: Manual Copy** (if code is in AI Studio)
1. Download your repository as a ZIP from GitHub
2. Extract to `/home/ecolex/ai-image-studio`
3. Make sure these files are at the root:
   - `package.json`
   - `vite.config.ts`
   - `index.html`
   - `App.tsx`
   - `components/` folder
   - `services/` folder
   - `concepts/` folder

### **Step 3: Install Dependencies**

```bash
cd /home/ecolex/ai-image-studio

# Install all npm packages
npm install

# This will install:
# - React 18
# - TypeScript
# - Vite (dev server)
# - All other dependencies
```

**Expected output:**
```
added 234 packages in 15s
```

### **Step 4: Configure for Local Development**

Create a `.env.local` file for your OAuth tokens:

```bash
# Create environment file
nano .env.local
```

**Add this content:**
```env
# Your OAuth tokens
VITE_MAIN_TOKEN=your_aemons_token_here
VITE_DRIVE_TOKEN=your_personal_token_here
VITE_PROJECT_ID=creatives-476816
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

### **Step 5: Update OAuth Redirect URI**

Since you're running locally, you need to update your OAuth credentials:

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Edit it and add these **Authorized redirect URIs**:
   ```
   http://localhost:5173
   http://localhost:5173/
   http://127.0.0.1:5173
   ```
4. Click **"SAVE"**

> **Note:** Vite dev server runs on port `5173` by default

### **Step 6: Start the Development Server**

```bash
cd /home/ecolex/ai-image-studio

# Start the dev server
npm run dev
```

**Expected output:**
```
  VITE v6.4.1  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### **Step 7: Open in Browser**

Open your browser and go to:
```
http://localhost:5173
```

You should see StudioV running! 🎉

### **Step 8: Add Your OAuth Tokens**

Press **F12** to open browser console, then paste:

```javascript
// Your existing tokens
localStorage.setItem("mainToken", "YOUR_AEMONS_TOKEN");
localStorage.setItem("driveToken", "YOUR_PERSONAL_TOKEN");
```

**Refresh the page** and you should see:
```
✅ Tokens loaded from localStorage
  • Work token (mainToken): Found
  • Drive token (driveToken): Found
```

---

## 🎯 Verify Everything Works

Test these features:

### ✅ Image Generation
1. Fill in a prompt
2. Click **"Generate"**
3. Should generate images using your aemons.com token

### ✅ Auto-Selector
1. Click the purple **"Auto"** button
2. Select an intimacy level
3. Prompt should auto-populate

### ✅ Gallery
1. Click **"Gallery"** button
2. Should show all generated images from Drive

### ✅ Google Drive Storage
1. Generate an image
2. Check your Google Drive for "StudioV Generated Images" folder
3. Images should be there

---

## 📁 Directory Structure

After setup, your folder should look like:

```
/home/ecolex/ai-image-studio/
├── node_modules/          # Installed packages (created by npm install)
├── dist/                  # Build output (created by npm run build)
├── components/            # React components
│   ├── GalleryModal.tsx
│   ├── PromptEditor.tsx
│   ├── SeductressAutoSelector.tsx
│   └── ...
├── services/              # API services
│   ├── geminiService.ts
│   ├── googleDriveService.ts
│   ├── storageService.ts
│   └── ...
├── concepts/              # Concept presets
│   ├── concepts.ts
│   ├── seductressAutoSelector.ts
│   └── ...
├── App.tsx                # Main app component
├── index.html             # HTML entry point
├── index.tsx              # TypeScript entry point
├── types.ts               # TypeScript types
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── .env.local             # Your tokens (don't commit!)
├── get-oauth-token.html   # OAuth token generator
├── QUICK_START.md         # Quick start guide
└── README.md              # Documentation
```

---

## 🔧 Common Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name

# Update dependencies
npm update
```

---

## 🐛 Troubleshooting

### Issue: "Port 5173 already in use"
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or change the port in vite.config.ts:
# server: { port: 3000 }
```

### Issue: "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Permission denied" on OAuth
- Make sure you added `http://localhost:5173` to authorized redirect URIs
- Clear browser cache and try again
- Check that your tokens haven't expired (1 hour lifespan)

### Issue: Risk analysis not working
- This is normal with personal tokens (needs Vertex AI permissions)
- Use your aemons.com token as `mainToken`
- The app works fine without risk analysis

### Issue: Images not saving to Drive
- Check that `driveToken` is set in localStorage
- Verify your personal account has Drive access
- Check browser console (F12) for errors

---

## 🔄 Updating to Latest Version

When you pull new changes from the repository:

```bash
cd /home/ecolex/ai-image-studio

# Pull latest changes
git pull origin main

# Reinstall dependencies (in case they changed)
npm install

# Restart dev server
npm run dev
```

---

## 🚀 Production Build

When you're ready to deploy:

```bash
# Build for production
npm run build

# The output will be in dist/ folder
# You can deploy this to any static hosting service

# Test the production build locally
npm run preview
```

---

## 📚 What You Get

All features are now available locally:

✅ **Image Generation** (Imagen 4.0 Ultra)
✅ **7-Level Auto-Selector** (Seductress Noir)
✅ **Gallery** (view all generated images)
✅ **Google Drive Storage** (2TB)
✅ **Cloud Storage** (paid option)
✅ **Risk Analysis** (optional)
✅ **Prompt Enhancement** (AI-powered)
✅ **Lock Fields** (preserve sections)
✅ **History & Saved Prompts**
✅ **Hot Reload** (changes update instantly)

---

## 🎯 Next Steps

1. **Clean up old folders**
2. **Copy StudioV files** to `/home/ecolex/ai-image-studio`
3. **Run `npm install`**
4. **Run `npm run dev`**
5. **Open `http://localhost:5173`**
6. **Add tokens via console**
7. **Start generating!** 🎨

---

## 💡 Pro Tips

- **Hot Reload:** Changes to code auto-update in browser (no refresh needed!)
- **Console Logs:** Press F12 to see all debug info
- **Token Refresh:** Tokens expire in ~1 hour, regenerate when needed
- **Network Access:** Use the Network URL to test on phone/tablet on same WiFi
- **Multiple Tabs:** You can open multiple tabs, they share localStorage

---

**Happy Local Development! 🎉**
