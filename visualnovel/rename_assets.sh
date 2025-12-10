#!/bin/bash
# Script to rename Visual Novel assets to match expected naming convention
# Run this from the visualnovel directory: bash rename_assets.sh

cd "$(dirname "$0")/assets"

echo "🔄 Renaming assets to match expected naming convention..."

# Backgrounds
cd backgrounds
[ -f "bg_art_gallery_daytime.png" ] && mv "bg_art_gallery_daytime.png" "bg_art_gallery.png" && echo "✅ Renamed bg_art_gallery_daytime.png → bg_art_gallery.png"
[ -f "bg_upscale_cafe.png" ] && echo "✅ bg_upscale_cafe.png already correct"
cd ..

# CG Images
cd cg
[ -f "cg_first_meeting_gallery.png" ] && mv "cg_first_meeting_gallery.png" "cg_first_meeting.png" && echo "✅ Renamed cg_first_meeting_gallery.png → cg_first_meeting.png"
[ -f "cg_intimate_moment .png" ] && mv "cg_intimate_moment .png" "cg_intimate_moment.png" && echo "✅ Renamed 'cg_intimate_moment .png' → cg_intimate_moment.png (removed space)"
[ -f "cg_viewing_photos.png" ] && echo "✅ cg_viewing_photos.png already correct"
[ -f "cg_studio_photoshoot.png" ] && echo "✅ cg_studio_photoshoot.png already correct"
[ -f "cg_boudoir_session.png" ] && echo "✅ cg_boudoir_session.png already correct"
cd ..

# Maps
cd maps
[ -f "city_map_overview.png" ] && mv "city_map_overview.png" "map_city_overview.png" && echo "✅ Renamed city_map_overview.png → map_city_overview.png"
[ -f "art_gallery_afternoon.png" ] && mv "art_gallery_afternoon.png" "map_location_gallery.png" && echo "✅ Renamed art_gallery_afternoon.png → map_location_gallery.png"
[ -f "photography_studio_day.png" ] && mv "photography_studio_day.png" "map_location_studio.png" && echo "✅ Renamed photography_studio_day.png → map_location_studio.png"
[ -f "zara_s_apartment_evening.png" ] && mv "zara_s_apartment_evening.png" "map_location_apartment.png" && echo "✅ Renamed zara_s_apartment_evening.png → map_location_apartment.png"
[ -f "trendy_cafe_morning.png" ] && mv "trendy_cafe_morning.png" "map_location_cafe.png" && echo "✅ Renamed trendy_cafe_morning.png → map_location_cafe.png"
[ -f "time_of_day_indicator_ui.png" ] && mv "time_of_day_indicator_ui.png" "map_time_indicator.png" && echo "✅ Renamed time_of_day_indicator_ui.png → map_time_indicator.png"
cd ..

# Sprites (these are already correct!)
echo "✅ Sprites already have correct names"

# UI (already correct!)
echo "✅ UI elements already have correct names"

echo ""
echo "✨ Done! All assets renamed to match expected naming convention."
echo "🔄 Now restart your dev server: npm run dev:vn"
