# Visual Novel Assets

This folder contains all generated assets for the Visual Novel game.

## Folder Structure

```
assets/
├── sprites/          # Character sprites (Zara expressions)
├── backgrounds/      # Scene backgrounds (gallery, studio, bedroom, etc.)
├── cg/              # CG images (special event artwork)
├── videos/          # Cutscene videos
├── ui/              # UI elements (dialogue box, buttons)
├── bgm/             # Background music tracks
├── sfx/             # Sound effects
└── maps/            # Location maps for travel system
```

## Asset Naming Convention

All assets should follow the naming convention from `assetManifest.ts`:

### Character Sprites (sprites/)
- `zara_neutral_full.png` - Zara neutral expression
- `zara_smile_full.png` - Zara smiling
- `zara_flirty_full.png` - Zara flirty expression
- `zara_shy_full.png` - Zara shy expression
- `zara_studio_outfit.png` - Zara in studio outfit
- `zara_boudoir_outfit.png` - Zara in boudoir outfit

### Backgrounds (backgrounds/)
- `bg_art_gallery_daytime.png` - Art gallery background
- `bg_photography_studio.png` - Photography studio
- `bg_luxury_bedroom.png` - Luxury bedroom
- `bg_cafe_exterior.png` - Cafe exterior
- `bg_fashion_showroom.png` - Fashion showroom

### CG Images (cg/)
- `cg_first_meeting_gallery.png` - First meeting at gallery
- `cg_studio_photoshoot.png` - Studio photoshoot
- `cg_boudoir_session.png` - Boudoir session
- `cg_golden_hour_moment.png` - Golden hour moment
- `cg_intimate_connection.png` - Intimate connection

### Videos (videos/)
- `intro_golden_hour.mp4` - Opening sequence
- `transition_time_passage.mp4` - Time passage transition
- `ending_together.mp4` - Ending scene

### UI Elements (ui/)
- `dialogue_box.png` - Custom dialogue box
- `choice_button.png` - Choice button background

### Background Music (bgm/)
- `bgm_art_gallery_ambient.mp3` - Gallery ambient music
- `bgm_romantic_moment.mp3` - Romantic scenes
- `bgm_tension_building.mp3` - Tense moments
- `bgm_intimate_scene.mp3` - Intimate scenes
- `bgm_reflection_melancholy.mp3` - Reflective moments
- `bgm_ending_theme.mp3` - Ending theme

### Sound Effects (sfx/)
- `sfx_camera_shutter.wav` - Camera shutter
- `sfx_ui_click.wav` - UI click
- `sfx_notification.wav` - Notification sound
- `sfx_page_turn.wav` - Page turn/advance
- `sfx_choice_select.wav` - Choice selection
- `sfx_scene_transition.wav` - Scene transition
- `sfx_achievement.wav` - Achievement unlock

### Location Maps (maps/)
- `map_downtown_arts.png` - Downtown arts district
- `map_photography_studio_location.png` - Studio location
- `map_cafe_neighborhood.png` - Cafe neighborhood
- `map_luxury_condo.png` - Luxury condo
- `map_fashion_district.png` - Fashion district
- `map_city_overview.png` - City overview map

## How It Works

1. **Generation**: Use the Asset Generator UI to create assets
2. **Download**: Click "💾 Download" to save assets to your hard drive
3. **Organize**: Place downloaded files in the appropriate subfolder with correct filename
4. **Auto-Load**: Visual Novel automatically detects and loads file system assets
5. **Priority**: File system → localStorage → Unsplash fallback

## Asset Loading Priority

The Visual Novel checks for assets in this order:

1. **File System** (this folder) - Highest priority, unlimited size ✅
2. **localStorage** (browser) - Backup, ~5MB limit
3. **Unsplash URLs** - Placeholder fallbacks

## File Formats

- **Images**: PNG (sprites, backgrounds, CG, UI, maps)
- **Videos**: MP4 (cutscenes)
- **Audio**: MP3/WAV (BGM and SFX)

## Quick Start

```bash
# After generating and downloading assets from Asset Generator:
cd ~/version1/visualnovel/assets

# Move downloaded files to correct folders:
mv ~/Downloads/zara_neutral_full.png sprites/
mv ~/Downloads/bg_art_gallery_daytime.png backgrounds/
mv ~/Downloads/cg_first_meeting_gallery.png cg/

# Visual Novel will automatically detect and use them!
```

## Notes

- All critical assets are marked in `ASSET_GENERATION_PROMPTS.md`
- Start with 6 sprites + 5 backgrounds (11 critical visual assets)
- Game works even with incomplete asset sets
- Assets update automatically (hot-reload every 5 seconds)
