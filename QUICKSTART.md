# VeraLabs Gallery & Moodboards - Quick Start

## 🎯 What's New

Your VeraLabs v2 website now has:

1. **Modern Photo Gallery** - Elegant masonry layout with lightbox
2. **Curated Moodboards** - With interactive color palettes
3. **Dynamic Image Loading** - From local photo folder

## ⚡ Quick Start (3 Steps)

### 1. Add Your Images

```bash
# Copy your images to the photo folder
cp ~/Pictures/*.jpg photo/
```

Supported formats: PNG, JPG, JPEG, WEBP, GIF

### 2. Start the Server

```bash
# Using npm
npm run gallery:server

# Or directly with node
node simple-server.js
```

### 3. Open Your Browser

Navigate to:
- **Landing Page**: http://localhost:8080/veralabs-landing-v2.html
- **Gallery**: http://localhost:8080/gallery.html
- **Moodboards**: http://localhost:8080/moodboards.html

## 📝 NPM Scripts

```bash
npm run gallery:server   # Start local server on port 8080
npm run gallery:load     # Scan photo folder and generate JSON
npm run gallery:help     # Interactive helper menu
```

## 🎨 Features

### Gallery
- Masonry grid layout
- Lightbox with keyboard navigation (← → Esc)
- Category filtering
- Auto-categorization from filenames
- Responsive design

### Moodboards
- 6 pre-designed moodboards
- Interactive color palettes
- Click to copy hex codes
- Elegant hover effects

## 📂 File Structure

```
studiov1/
├── veralabs-landing-v2.html    ← Updated with new links
├── gallery.html                ← New photo gallery
├── moodboards.html             ← New moodboards page
├── photo/                      ← Add your images here
├── simple-server.js            ← Local dev server
├── load-gallery-images.js      ← Image scanner
└── GALLERY_README.md           ← Full documentation
```

## 🚀 Next Steps

1. Add images to `/photo` folder
2. Start server with `npm run gallery:server`
3. Customize moodboards with your brand colors
4. Share with clients!

## 📖 Full Documentation

See `GALLERY_README.md` for complete documentation, troubleshooting, and customization options.

---

**Need help?** Run `npm run gallery:help` for interactive assistance.
