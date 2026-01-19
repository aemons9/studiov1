# VERALABS AI Studio - CLI Edition

A complete command-line interface mirroring all web app functionality.

## Quick Start

```bash
# Navigate to project folder
cd /home/ecolex/version1

# Run CLI
node veralabs-cli.mjs

# Or use shortcut
./veralabs
```

## Requirements

- **Proxy Server**: Must be running (`node proxy-server.js`)
- **OAuth Credentials**: Auto-refreshed via proxy
- **Instagram/GitHub Tokens**: Loaded from `.env.local`

## Output Directory

All generated images/videos save to:
```
/home/ecolex/version1/CLIimages/
```

## Available Modes

### 1. Main Generation Mode
- **Models**: Imagen 4, Imagen 4 Ultra
- **Features**: Multi-model generation, aspect ratio selection
- **Shortcut**: `m` or `1`

### 2. Vera Mode
- **Features**: Advanced prompt architect with Gemini 2.5
- **Photographer Styles**: Helmut Newton, Guy Bourdin, Peter Lindbergh
- **Models**: 8+ variants (Hourglass, Indian Glamour, Classic)
- **Shortcut**: `v` or `2`

### 3. Reels Studio Mode
- **Features**: Ken Burns effects, Helmut Newton color grading
- **Music**: Background music library integration
- **Branding**: VERALABS watermark overlay
- **Shortcut**: `r` or `3`

### 4. Instagram Mode
- **Features**: Direct publishing to Instagram
- **Capabilities**: Posts, Reels, Stories, Carousels
- **Shortcut**: `i` or `4`

### 5. Platinum Mode
- **Models**: Premium collection (Midnight Seductress, Fitness Bombshell, etc.)
- **Quality**: Ultra-high quality generations
- **Shortcut**: `p` or `5`

### 6. Roleplay Mode
- **Features**: Indian models gallery
- **Categories**: Glamour, Fashion, Editorial
- **Shortcut**: `6`

### 7. Artistic Mode
- **Features**: Fine art generation
- **Styles**: Avant-garde, conceptual, artistic nude
- **Shortcut**: `7`

### 8. Visual Novel Mode
- **Features**: Character sprites, backgrounds, CG events
- **Organization**: Automatic file categorization
- **Shortcut**: `vn` or `8`

### 9. Experimental Mode
- **Features**: Cutting-edge concepts
- **Testing**: Beta features and new models
- **Shortcut**: `ex` or `9`

### 10. MasterClass Mode
- **Models**: Elite collection
- **Quality**: Premium generations
- **Shortcut**: `10`

### 11. Corporate Mode
- **Features**: Professional headshots
- **Styles**: Business, executive, corporate
- **Shortcut**: `11`

### 12. Video Generation Mode
- **Model**: Veo 3.1
- **Duration**: 8-second videos
- **Quality**: 720p, 16:9 aspect ratio
- **Shortcut**: `12`

## Navigation

### Main Menu
- **Numbers 1-12**: Select mode by number
- **Letters**: Use shortcuts (m, v, r, i, p, etc.)
- **s**: System status
- **h**: Help & shortcuts
- **q**: Quit

### Within Modes
- **0**: Back to main menu (return from any mode)
- **Numbers**: Quick selection (1-12)
- **Enter**: Use defaults

## Quick Commands

### Quick Generation (Main Mode)
```
1 → Enter prompt → Enter → Done
```

### Vera Mode with Defaults
```
2 → 1 (Quick mode) → Enter idea → Done
```

### Video Generation
```
12 → Enter prompt → Wait 2-5 min → Done
```

## System Status

Check credentials and server status:
```
s → Shows OAuth, Instagram, GitHub, Proxy status
```

## File Naming Convention

Generated files use this format:
```
[mode]_[timestamp]_[id]_[index].jpg
```

Examples:
- `main_1767623456789_1.jpg`
- `vera_helmut-newton_1767623456789_2_1.jpg`
- `veo_1767623456789.mp4`

## Tips

1. **Keep Proxy Running**: The CLI requires proxy-server.js to be running
2. **OAuth Auto-Refresh**: Tokens refresh automatically via proxy
3. **Quick Mode**: Use shortcuts for faster workflow
4. **Batch Processing**: Generate multiple images in one session
5. **Default Values**: Press Enter to use recommended defaults

## Troubleshooting

### Proxy Server Offline
```bash
# Terminal 1: Start proxy
node proxy-server.js

# Terminal 2: Run CLI
node veralabs-cli.mjs
```

### OAuth Token Expired
The CLI auto-refreshes tokens via proxy. If this fails:
```bash
gcloud auth print-access-token
```

### Instagram/GitHub Tokens
Ensure `.env.local` contains:
```
INSTAGRAM_TOKEN=your_token
INSTAGRAM_ACCOUNT_ID=your_account_id
GITHUB_TOKEN=your_github_token
```

## Advanced Usage

### Environment Variables
```bash
# Custom output directory
CLI_OUTPUT_DIR=/path/to/output node veralabs-cli.mjs

# Custom proxy URL
PROXY_URL=http://localhost:3001 node veralabs-cli.mjs
```

### Batch Mode (Coming Soon)
Generate multiple images from a list:
```bash
# Create batch.txt with prompts
echo "Prompt 1" >> batch.txt
echo "Prompt 2" >> batch.txt

# Run batch
node veralabs-cli.mjs --batch batch.txt
```

## Version

**CLI Version**: 1.0.0
**Last Updated**: 2026-01-05
**Platform**: Ubuntu Linux
**Node Version**: 18+

## Support

For issues or feature requests, check:
- Project folder: `/home/ecolex/version1/`
- Context file: `CLAUDE_CODE_CONTEXT.md`
- Proxy server logs: Check terminal running `proxy-server.js`

---

**Note**: This CLI is a complete mirror of the web application. All features, models, and configurations are identical to the web version.
