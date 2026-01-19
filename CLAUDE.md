# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VERALABS AI Studio - A full-stack React + Node.js creative platform for AI-powered image generation, professional Instagram Reels creation, and visual novel asset production.

**Location**: `/home/ecolex/version1/`

## Development Commands

```bash
# Install dependencies
npm install

# Start development (two terminals required)
npm run proxy          # Terminal 1: Backend server (port 3001)
npm run dev            # Terminal 2: Vite dev server (port 3000)

# Or run both simultaneously
npm run dev:all

# Visual novel development (includes asset server)
npm run dev:vn

# Production build
npm run build
npm run preview

# Deployment
npm run deploy         # GitHub Pages
npm run vercel:deploy  # Vercel
```

### Instagram Publishing Scripts

```bash
npm run auto:status           # Check publish queue status
npm run auto:publish:dry      # Dry run preview
npm run auto:quick            # Quick publish (first 5)
npm run auto:carousel         # Publish carousel content
npm run auto:carousel:preview # Preview next items
```

### Testing Proxy Server

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/gcloud-token
curl http://localhost:3001/api/gcloud-project
```

## Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS
- **Backend**: Express 5 proxy server (`proxy-server.js`)
- **Video**: FFmpeg via fluent-ffmpeg
- **AI**: Vertex AI (Imagen 4, Gemini 2.5, Veo 3.1)
- **APIs**: Instagram Graph API, GitHub API (CDN hosting)

### Application Modes

The app has 14+ UI modes controlled by React state:

| Mode | File | Purpose |
|------|------|---------|
| classic | App.tsx | Main generation interface |
| vera | vera/VeraMode.tsx | Advanced prompt architect with Veo |
| reels-studio | reels-studio/ReelsStudioMode.tsx | Ken Burns reels with color grading |
| platinum | platinum/PlatinumMode.tsx | Premium model variants |
| artistic | artistic/ArtisticMode.tsx | Fine art generation |
| corporate | corporate/CorporateMode.tsx | Business/glamour content |
| visualnovel | visualnovel/RealVisualNovel.tsx | VN game engine |
| vnassets | visualnovel/VisualNovelAssetGenerator.tsx | Sprite/background generation |
| instagram | instagram/InstagramMode.tsx | Social publishing |
| video | video/VideoGenerationMode.tsx | Veo 3.1 video creation |

### Key Services

| Service | File | Purpose |
|---------|------|---------|
| Gemini | services/geminiService.ts | Prompt generation, text tasks |
| Imagen | services/vertexImagenService.ts | Image generation |
| Veo | services/veoService.ts | Video generation |
| Instagram | services/instagram/*.ts | Publishing pipeline |
| Auth | utils/sharedAuthManager.ts | Unified OAuth management |

### Proxy Server Endpoints (Port 3001)

**OAuth**
- `GET /api/gcloud-token` - Fresh OAuth token
- `GET /api/gcloud-project` - GCP project ID

**Generation**
- `POST /api/replicate/predictions` - Create prediction
- `GET /api/replicate/predictions/:id` - Poll status

**Reels**
- `POST /api/reels/create-professional` - Create Ken Burns reel
- `GET /api/music/library` - Music tracks

**Instagram**
- `POST /api/instagram/publish` - Full publish flow
- `POST /api/instagram/create-container` - Media container
- `POST /api/instagram/publish-reel` - Video as Reel
- `POST /api/instagram/upload-to-github` - CDN hosting

**Visual Novel**
- `POST /api/save-asset` - Save VN asset
- `GET /api/assets` - List assets

## Configuration

### Environment Variables (.env.local)

```bash
# Required: One of these
GEMINI_API_KEY=your_key
# OR
GOOGLE_APPLICATION_CREDENTIALS={"type":"service_account",...}

# Optional
GCP_PROJECT_ID=zaranovel
VITE_INSTAGRAM_TOKEN=long_lived_token
VITE_INSTAGRAM_ACCOUNT_ID=17841478517688462
VITE_GITHUB_TOKEN=personal_access_token
VITE_GITHUB_USER=aemons9
VITE_GITHUB_REPO=studiov1
```

### GCP Configuration
- **Project ID**: zaranovel
- **Location**: us-central1
- **Models**: imagen-4.0-generate-001, imagen-4.0-ultra-generate-001, gemini-2.5-flash, veo-3.1-generate-preview

## Key Technical Details

### Video Size Handling
- Videos <10MB: Returned as base64 data URLs
- Videos >10MB: Saved to `generated-reels/` as file URLs

### FFmpeg Processing Chain
Ken Burns → Color Grading → Branding → Film Grain → Music → Export

### OAuth Tokens
- Expire after 1 hour
- Auto-refresh via `sharedAuthManager.ts`
- Unified localStorage keys across all modes

### Instagram Requirements
- Media must be on public HTTPS URLs (use GitHub CDN)
- Container creation is async (requires polling)
- Reels: 3-60 seconds, 9:16 aspect ratio

## Model & Asset Definitions

Located in `reels-studio/types.ts`:
- **25+ Model Variants**: Hourglass, Indian Glamour, Platinum, Classic categories
- **45+ Wardrobe Options**: Lingerie, Architectural, Sheer, Loungewear, Athletic, Club, Artistic
- **60+ Environments**: Boudoir, Penthouse, Studio, Water/Spa, Exotic, Nature, Club

## CLI Tool

A CLI replica exists at `veralabs-nexus-cli.mjs` with:
- All web app selectors extracted to `cli-data/all-selectors.json`
- 7 modes matching web functionality
- Edit/modify capability for presets

```bash
node veralabs-nexus-cli.mjs
```

## Additional Context

See `CLAUDE_CODE_CONTEXT.md` for extended documentation including:
- Detailed API endpoint specifications
- Artistic vision and prompt engineering guidelines
- Color grading theme definitions
- Version history
