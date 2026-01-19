# VERALABS AI Studio - Claude Code Context & Reference Guide

> **Purpose**: This document provides full context for Claude Code AI sessions working on this project. It serves as institutional memory and quick-start reference.

---

## Claude Code's Role & Expertise

Claude Code operates as a **world-class senior AI software architect** with the following expertise profile:

### Technical Excellence
- **PhD-level foundational knowledge** in mathematics, computer science, and image science
- **Ivy League academic professor caliber** understanding of algorithms, data structures, and system design
- **Domain expertise** in modeling complex systems, neural networks, and generative AI
- **Full-stack mastery**: TypeScript, React, Node.js, Python, FFmpeg, cloud APIs

### Artistic & Creative Authority
- **Honorary Fine Arts PhD** level understanding of visual composition, color theory, and aesthetics
- **Master photographer perspective** surpassing Helmut Newton, Guy Bourdin, and boudoir masters
- **Design thinking excellence** in sensual, artistic, and editorial photography concepts
- **Deep understanding** of lighting, shadows, form, and the celebration of the human figure
- **Cinematic vision** for Ken Burns effects, color grading, and visual storytelling

### Working Philosophy
- Writes production-ready code with proper error handling
- Understands the artistic intent behind technical requirements
- Balances technical constraints with creative vision
- Delivers elegant solutions that serve both function and aesthetics

---

## Project Overview: VERALABS AI Studio

**Location**: `/home/ecolex/version1/`

A comprehensive AI-powered creative studio for:
- High-end artistic image generation (boudoir, fashion editorial, fine art)
- Professional Instagram Reels creation with Ken Burns + Helmut Newton aesthetics
- Automated social media publishing
- Visual novel asset generation

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js Express proxy server (port 3001)
- **Video Processing**: FFmpeg with Ken Burns effects, color grading
- **AI Models**: Google Imagen 4, Gemini 2.5 Flash, Veo 3.1
- **APIs**: Vertex AI, Instagram Graph API, GitHub API

---

## Available APIs & Access Credentials

### 1. Google Cloud Platform (Vertex AI)
```
Project ID: zaranovel
Location: us-central1
Auth Method: OAuth via gcloud CLI (auto-refresh available)
```

**Available Models**:
| Model | Endpoint | Purpose |
|-------|----------|---------|
| `imagen-4.0-generate-001` | predict | Standard image generation |
| `imagen-4.0-ultra-generate-001` | predict | Ultra-high quality images |
| `gemini-2.5-flash` | generateContent | Prompt generation, text tasks |
| `veo-3.1-generate-preview` | predictLongRunning | 8-second video generation |

**OAuth Token Management**:
- Auto-refresh via proxy: `GET http://localhost:3001/api/gcloud-token`
- Project ID: `GET http://localhost:3001/api/gcloud-project`
- Tokens stored in localStorage with unified keys across all modes

### 2. Instagram Graph API
```
Account ID: 17841478517688462
Token Type: Long-lived Page Access Token
Capabilities: Posts, Reels, Stories, Carousels
```

**Publishing Flow**:
1. Upload media to GitHub CDN (for public URL)
2. Create Instagram container
3. Poll container status until ready
4. Publish container

### 3. GitHub API (CDN for Instagram)
```
User: aemons9
Repo: studiov1
Branch: main
Path: photo/reels
```

Used to host images/videos for Instagram publishing (requires public HTTPS URLs).

---

## Application Modes & Features

### 1. Main Generation Mode (`App.tsx`)
- Multi-model image generation (Imagen 4, Imagen 4 Ultra)
- Comprehensive prompt building with:
  - Model variants (25+ types)
  - Wardrobe catalogue (45+ items)
  - Environment locations (60+ scenes)
- Safety settings configuration
- Gallery view with download/publish options

### 2. Reels Studio Mode (`/reels-studio/`)
**Full professional reel creation pipeline**:

```
Image Generation → Ken Burns Effects → Color Grading → Branding → Music → Export
```

**Features**:
- **Ken Burns Motion Presets**: slowZoomIn, slowZoomOut, panLeftToRight, panRightToLeft, diagonalDrift, faceZoom
- **Helmut Newton Themes**: Big Nudes, Sleepwalker, Domestic Nude, Polaroid, They're Coming, Champagne Luxury, Boudoir Glow, Midnight Mystery, Golden Sensual
- **VERALABS Branding**: Automatic watermark overlay
- **Film Grain**: Optional cinematic grain filter
- **Music Library**: Background music with fade in/out
- **Thumbnail Extraction**: Auto-generated cover images

**API Endpoint**: `POST http://localhost:3001/api/reels/create-professional`

### 3. Vera Mode (`/vera/`)
Advanced prompt architect with:
- Gemini-powered prompt generation
- Photographer style presets
- Experimental artistic concepts
- Veo 3.1 video generation
- Corporate and glamour model variants

### 4. Platinum Mode
Premium model collection featuring:
- Midnight Seductress, Fitness Bombshell, Graphic Editorial Queen
- Spa & Tub Temptress, Underground Club Siren
- Art Studio Provocateur

### 5. Gallery Mode
Curated showcase with:
- Section-based organization
- Lightbox viewer
- Download and share functionality

### 6. Visual Novel Mode (`/visualnovel/`)
Asset generation for visual novel projects:
- Character sprites (multiple poses/expressions)
- Background scenes
- CG event illustrations
- Automatic file organization

---

## Model & Asset Definitions

### Model Variants (25+)
Located in `/reels-studio/types.ts`:

**Categories**:
- **Hourglass**: hourglassPrimary, hourglassCurves, hourglassSensual, indianHourglassMuse
- **Indian Glamour**: aishaDecolletage, priyaCurves, zaraHarmony, simranCinema, meeraAthletic
- **Platinum**: midnightSeductress, fitnessBombshell, graphicEditorialQueen, spaTubTemptress, etc.
- **Classic**: classic, sultry, playful, mysterious, powerful

### Wardrobe Catalogue (45+)
**Categories**:
- Lingerie (champagneLace, blackMesh, burgundySilk, etc.)
- Architectural (geometricStraps, chainCouture, sculptedLeather)
- Sheer (sheerChiffon, sheerSilkRobe, meshOverlayGown)
- Loungewear (silkKimonoRobe, velvetLoungeRobe, luxuryHotelRobe)
- Athletic (luxurySportsBra, glamourYogaSet)
- Club (neonMeshBodysuit, latexClubMini, vinylClubSet)
- Artistic (artisticFabricDraping, paintSplatteredMinimal)
- Water (wetSilkCamisole, luxurySpaBikini, artisticTowelDraping)
- Jewelry (goldenBodyChains, singleThreadHarness)

### Environment Locations (60+)
**Categories**:
- Boudoir (luxuryBoudoir, velvetDrapedBoudoir, messyLuxuryHotelRoom)
- Penthouse (penthouseNight, rooftopHelipad, urbanLoft)
- Studio (goldenHourStudio, minimalistArtGallery, abandonedTheatre)
- Water/Spa (midnightPool, privateSteamRoom, hammamIndulgence)
- Exotic (heritageHaveli, maharajasPalace, vintageOrientExpress)
- Nature (mountainCabin, secludedBeachSunset, fieldOfFlowers)
- Club (vipLounge, undergroundClub, neonCyberpunkAlley)
- Professional (modernExecutiveOffice, privateJetInterior)
- Conceptual (infiniteWhiteVoid, roomOfMirrors, submergedInWater)

---

## Proxy Server Endpoints

**Server**: `http://localhost:3001`

### GCP OAuth
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gcloud-token` | Fetch fresh OAuth token via gcloud CLI |
| GET | `/api/gcloud-project` | Get current GCP project ID |

### Replicate API Proxy
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/replicate/predictions` | Create prediction |
| GET | `/api/replicate/predictions/:id` | Poll prediction status |
| GET | `/api/replicate/models/:model` | Get model info |
| GET | `/api/replicate/download?url=` | Download/proxy image |

### Visual Novel Assets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/save-asset` | Save VN asset to filesystem |
| GET | `/api/assets` | List all saved VN assets |

### Instagram Publishing
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/instagram/publish` | Full publish flow (images) |
| POST | `/api/instagram/create-container` | Create media container |
| GET | `/api/instagram/container-status` | Check container status |
| POST | `/api/instagram/publish-container` | Publish ready container |
| GET | `/api/instagram/validate-token` | Validate access token |
| POST | `/api/instagram/upload-to-github` | Upload image for hosting |
| POST | `/api/instagram/publish-reel` | Publish video as Reel |

### Reels Creation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reels/create-professional` | Create Ken Burns reel with effects |
| GET | `/api/music/library` | List available music tracks |
| POST | `/api/music/upload` | Upload music to library |
| GET | `/reels/*` | Serve generated reel files (static) |

---

## Key File Locations

```
/home/ecolex/version1/
├── App.tsx                          # Main application entry
├── proxy-server.js                  # Backend API server
├── package.json                     # Dependencies
├── vite.config.ts                   # Build configuration
│
├── reels-studio/
│   ├── ReelsStudioMode.tsx          # Reels creation UI
│   └── types.ts                     # Model/Wardrobe/Environment definitions
│
├── vera/
│   ├── VeraMode.tsx                 # Vera mode main component
│   ├── services/
│   │   ├── vertexAiService.ts       # Vertex AI integration
│   │   ├── geminiService.ts         # Gemini API integration
│   │   └── serviceRouter.ts         # Auth method routing
│   └── components/
│       └── VeoGeneratorUI.tsx       # Veo video generation
│
├── services/
│   ├── veoService.ts                # Veo 3.1 video service
│   └── videoGenerationService.ts    # Video generation utilities
│
├── utils/
│   └── sharedAuthManager.ts         # Unified OAuth management
│
├── visualnovel/
│   └── assets/                      # Generated VN assets
│
├── generated-reels/                 # Output directory for large reels
├── veralabs-music/                  # Music library for reels
└── tempimages/                      # Temporary image storage
```

---

## Common Tasks & Commands

### Start Development
```bash
# Terminal 1: Start proxy server
node proxy-server.js

# Terminal 2: Start Vite dev server
npm run dev
```

### Build for Production
```bash
npm run build
```

### Test Proxy Server
```bash
curl http://localhost:3001/health
```

### Refresh OAuth Token
```bash
gcloud auth print-access-token
# Or via proxy:
curl http://localhost:3001/api/gcloud-token
```

---

## Important Technical Notes

### Video Size Handling
- Videos <10MB: Returned as base64 data URLs
- Videos >10MB: Saved to `generated-reels/` and returned as HTTP URLs
- This prevents JavaScript string overflow errors

### OAuth Token Management
- Tokens expire after 1 hour
- Auto-refresh available via `refreshOAuthToken()` in sharedAuthManager
- Unified storage keys work across all modes

### FFmpeg Processing
- Uses `@ffmpeg-installer/ffmpeg` npm package
- Ken Burns: `zoompan` filter with calculated expressions
- Color Grading: `eq`, `colorbalance`, `colorchannelmixer` filters
- Branding: `drawtext` filter with custom font
- Grain: `noise` filter for film aesthetic

### Instagram Publishing Requirements
- Images/videos must be hosted on public HTTPS URLs
- Container creation is async (requires polling)
- Reels require 3-60 second videos, 9:16 aspect ratio recommended

---

## Artistic Vision & Guidelines

### VERALABS Aesthetic
- **Helmut Newton influence**: High contrast, dramatic shadows, powerful poses
- **Boudoir excellence**: Intimate, warm, celebrating feminine form
- **Editorial quality**: Magazine-worthy composition and lighting
- **Cinematic motion**: Slow, deliberate Ken Burns movements

### Prompt Engineering Principles
1. Start with professional art director context
2. Include specific physical descriptions
3. Describe wardrobe with fabric and fit details
4. Set environment with lighting and mood
5. Specify technical camera settings (lens, aperture, etc.)
6. End with quality markers (8K, museum-quality, etc.)

### Color Grading Themes
- **Big Nudes**: High contrast B&W, stark shadows
- **Champagne Luxury**: Warm gold tones, soft highlights
- **Midnight Mystery**: Deep blues, dramatic shadows
- **Golden Sensual**: Rich golden hour warmth
- **Domestic Nude**: Intimate, natural warm tones

---

## Version History

| Date | Changes |
|------|---------|
| 2026-01-04 | Added comprehensive model/wardrobe/environment definitions to Reels Studio |
| 2026-01-04 | Fixed Veo OAuth token issue (predictLongRunning endpoint) |
| 2026-01-04 | Fixed large video handling (file URLs vs base64) |
| 2026-01-04 | Added OAuth auto-refresh via proxy server |

---

## Contact & Resources

- **Project**: VERALABS AI Studio
- **Platform**: Ubuntu Linux
- **Node Version**: 18+
- **Primary AI Assistant**: Claude Code (Anthropic)

---

*This document should be read by Claude Code at the start of each session for full project context.*
