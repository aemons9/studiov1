# VeraLabs Gallery & Moodboards Setup Guide

## Overview

Your VeraLabs v2 website now includes two new beautiful sections:

1. **Gallery** (`gallery.html`) - Modern photo gallery with elegant masonry layout
2. **Moodboards** (`moodboards.html`) - Curated moodboards with color palette displays

Both pages feature the same sophisticated creamy minimalist design as your landing page.

## 📁 Project Structure

```
studiov1/
├── veralabs-landing-v2.html    # Landing page (updated with new links)
├── gallery.html                # Photo gallery page
├── moodboards.html             # Moodboards with color palettes
├── photo/                      # Place your images here (PNG, JPG)
├── load-gallery-images.js      # Script to scan photo folder
├── simple-server.js            # Local development server
└── GALLERY_README.md           # This file
```

## 🚀 Quick Start

### Option 1: Using the Simple Server (Recommended)

The simple server automatically loads images from the `/photo` folder:

```bash
# Start the server
node simple-server.js

# Then open in your browser:
# http://localhost:8080/veralabs-landing-v2.html
# http://localhost:8080/gallery.html
# http://localhost:8080/moodboards.html
```

### Option 2: Using Your Existing Server

If you already have a server running, just add your images to the `/photo` folder and the gallery will automatically detect them.

## 📸 Adding Images to the Gallery

1. **Add images to the `/photo` folder**:
   - Supported formats: PNG, JPG, JPEG, WEBP, GIF
   - Any filename will work

2. **Images are auto-categorized** based on filename:
   - Files containing "editorial", "magazine" → Editorial category
   - Files containing "minimal", "simple" → Minimalist category
   - Files containing "couture", "luxury" → Couture category
   - Files containing "contemporary", "urban" → Contemporary category

3. **Example filenames**:
   ```
   editorial-fashion-1.jpg
   minimal-portrait-2.png
   couture-dress-evening.jpg
   contemporary-urban-style.png
   ```

## 🎨 Features

### Gallery Page
- ✨ Modern masonry grid layout
- 🔍 Lightbox view with keyboard navigation (← → Esc)
- 🏷️ Category filtering (All, Editorial, Minimalist, Couture, Contemporary)
- 📱 Fully responsive design
- 🎭 Smooth hover animations
- ⚡ Lazy loading for performance

### Moodboards Page
- 🎨 Beautiful color palette displays
- 🖱️ Click color swatches to copy hex codes
- 📋 Pre-populated with 6 curated moodboards
- 🌈 Consistent with landing page design
- ✨ Elegant card hover effects

## 🛠️ Scripts

### load-gallery-images.js

Scans the `/photo` folder and generates `gallery-data.json`:

```bash
node load-gallery-images.js
```

This creates a JSON file with all your images and their metadata.

### simple-server.js

Starts a local development server with API endpoint for gallery images:

```bash
node simple-server.js
```

Features:
- Serves all static files (HTML, CSS, JS, images)
- API endpoint: `/api/gallery-images` (returns JSON list of images)
- Auto-categorizes images
- MIME type handling for all formats

## 🎯 Navigation

The landing page has been updated with links to the new sections:

- **Main Navigation**: Gallery | Moodboards links added
- **Hero CTA Buttons**: "View Gallery" and "Explore Moodboards"
- **Footer Links**: Updated to include new pages

## 🎨 Design Consistency

All pages use the same design system:

### Color Palette
- Cream White: `#FAF8F5`
- Ivory: `#F7F3ED`
- Champagne: `#E8DFD3`
- Nude Beige: `#D4C4B0`
- Warm Taupe: `#B8A28E`
- Soft Charcoal: `#3E3A37`
- Deep Espresso: `#1C1917`
- Pale Gold: `#D4AF37` (accent)

### Typography
- Editorial: Playfair Display (serif)
- Modern: Inter (sans-serif)
- Luxury: Bodoni Moda (serif)

## 📝 Customization

### Adding More Moodboards

Edit `moodboards.html` and add new moodboard cards:

```html
<div class="moodboard-card" style="--index: 6;">
    <div class="moodboard-image">
        <div class="moodboard-badge">Your Season</div>
        <!-- Your image or placeholder -->
    </div>
    <div class="moodboard-content">
        <h3 class="moodboard-title">Your Title</h3>
        <p class="moodboard-description">Your description</p>
        <div class="moodboard-meta">
            <span class="meta-tag">Tag 1</span>
            <span class="meta-tag">Tag 2</span>
        </div>
        <div class="color-palette">
            <div class="palette-label">Color Palette</div>
            <div class="palette-colors">
                <div class="color-swatch" style="background: #COLOR1;" data-color="#COLOR1"></div>
                <div class="color-swatch" style="background: #COLOR2;" data-color="#COLOR2"></div>
                <!-- Add more colors -->
            </div>
        </div>
    </div>
</div>
```

### Changing Gallery Layout

In `gallery.html`, modify the CSS grid:

```css
.gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
}
```

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Images not showing?

1. Check that images are in `/photo` folder
2. Verify file extensions are supported (jpg, png, jpeg, webp, gif)
3. Make sure server is running (`node simple-server.js`)
4. Check browser console for errors (F12)

### Gallery shows "No Images Yet"?

1. Add images to `/photo` folder
2. Refresh the page
3. Make sure filenames don't have special characters

### Server won't start?

1. Check if port 8080 is available
2. Try a different port by editing `simple-server.js`:
   ```javascript
   const PORT = 3000; // Change to any available port
   ```

## 📞 Support

For issues or questions:
- Check browser console (F12) for errors
- Verify file paths and permissions
- Ensure Node.js is installed

## ✨ Next Steps

1. Add your fashion photography to `/photo` folder
2. Start the server: `node simple-server.js`
3. Open the pages and enjoy your beautiful gallery!
4. Customize moodboards with your brand colors
5. Share with clients and showcase your work

---

**Enjoy your new VeraLabs Gallery & Moodboards!** 🎨✨
