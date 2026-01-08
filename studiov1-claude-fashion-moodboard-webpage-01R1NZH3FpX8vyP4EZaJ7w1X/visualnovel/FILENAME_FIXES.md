# Asset Filename Fixes

Based on `window.debugAssets()` output, these files need to be renamed:

## 🖼️ Backgrounds (backgrounds/)

| Current Name (WRONG) | Required Name (CORRECT) |
|---------------------|------------------------|
| `bg_art_gallery_daytime.png` | `bg_art_gallery.png` |
| `bg_photography_studio.png` | ✅ Already correct |
| `bg_luxury_bedroom.png` | ✅ Already correct |
| `bg_upscale_cafe.png` | ✅ Already correct |
| `bg_fashion_showroom.png` | ✅ Already correct |

## ✨ CG Images (cg/)

| Current Name (WRONG) | Required Name (CORRECT) |
|---------------------|------------------------|
| `cg_first_meeting_gallery.png` | `cg_first_meeting.png` |
| `cg_studio_photoshoot.png` | ✅ Already correct |
| `cg_viewing_photos.png` | ✅ Already correct |
| `cg_boudoir_session.png` | ✅ Already correct |
| `cg_intimate_moment .png` ⚠️ | `cg_intimate_moment.png` (remove space!) |

## 🗺️ Maps (maps/)

| Current Name (WRONG) | Required Name (CORRECT) |
|---------------------|------------------------|
| `city_map_overview.png` | `map_city_overview.png` |
| `art_gallery_afternoon.png` | `map_location_gallery.png` |
| `photography_studio_day.png` | `map_location_studio.png` |
| `zara_s_apartment_evening.png` | `map_location_apartment.png` |
| `trendy_cafe_morning.png` | `map_location_cafe.png` |
| `time_of_day_indicator_ui.png` | `map_time_indicator.png` |

## 🧍 Sprites (sprites/)
✅ All sprite filenames are already correct!
- `zara_neutral_full.png`
- `zara_smile_full.png`
- `zara_flirty_full.png`
- `zara_shy_full.png`
- `zara_studio_outfit.png`
- `zara_boudoir_outfit.png`

## 🎨 UI Elements (ui/)
✅ All UI filenames are already correct!
- `ui_dialogue_box.png`

---

## Quick Fix Options:

### Option 1: Run the rename script (recommended)
```bash
cd visualnovel
bash rename_assets.sh
```

### Option 2: Manual rename using file manager
Use your file manager to rename the files according to the table above.

### Option 3: Manual rename via terminal
```bash
cd visualnovel/assets

# Backgrounds
mv backgrounds/bg_art_gallery_daytime.png backgrounds/bg_art_gallery.png

# CG Images
mv cg/cg_first_meeting_gallery.png cg/cg_first_meeting.png
mv "cg/cg_intimate_moment .png" cg/cg_intimate_moment.png

# Maps
mv maps/city_map_overview.png maps/map_city_overview.png
mv maps/art_gallery_afternoon.png maps/map_location_gallery.png
mv maps/photography_studio_day.png maps/map_location_studio.png
mv maps/zara_s_apartment_evening.png maps/map_location_apartment.png
mv maps/trendy_cafe_morning.png maps/map_location_cafe.png
mv maps/time_of_day_indicator_ui.png maps/map_time_indicator.png
```

## After Renaming:
1. ⚠️ **IMPORTANT**: Restart your dev server to clear Vite cache
   ```bash
   # Press Ctrl+C to stop current server
   npm run dev:vn
   ```

2. Test in browser console:
   ```javascript
   window.debugAssets()
   ```

3. You should see:
   ```
   📦 Loaded Visual Novel Assets: {backgrounds: 5, sprites: 6, cg: 5, ui: 1, maps: 6}
   ```
   Instead of:
   ```
   📦 Loaded Visual Novel Assets: {backgrounds: 0, sprites: 5, cg: 0, ui: 1, maps: 0}
   ```
