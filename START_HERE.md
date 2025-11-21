# 🎨 VeraLabs - Start Here

## Quick Start (2 Steps!)

### 1. Start the Server

```bash
npm run gallery:server
```

Or use Node directly:
```bash
node simple-server.js
```

### 2. Open Your Browser

Go to: **http://localhost:8080/**

That's it! You'll see the VeraLabs landing page.

---

## 🧭 Navigation from Landing Page

Once the landing page loads, you can navigate to everything:

### From the Top Navigation Bar:
- **Atelier** - Design philosophy section (scrolls down)
- **Gallery** - Opens your photo gallery (new page)
- **Moodboards** - Opens moodboards with color palettes (new page)
- **Aesthetics** - Scrolls to aesthetic themes
- **Studio** - Scrolls to footer/contact

### From the Hero Buttons:
- **"View Gallery"** - Opens photo gallery
- **"Explore Moodboards"** - Opens moodboards

### From the Footer:
- **Gallery** link - Opens photo gallery
- **Moodboards** link - Opens moodboards

---

## 📸 Your Images

Images in the `photo/` folder will automatically appear in the gallery!

To check your images:
```bash
ls -lh photo/
```

---

## 🎯 All Pages Available

| Page | URL |
|------|-----|
| **Landing (Home)** | http://localhost:8080/ |
| **Gallery** | http://localhost:8080/gallery.html |
| **Moodboards** | http://localhost:8080/moodboards.html |

But you only need to open the landing page - everything else is accessible from there!

---

## ✨ Features

### Landing Page
- Beautiful hero section with CTA buttons
- Design philosophy showcase
- Curated moodboard previews
- Aesthetic themes display
- Complete navigation to all sections

### Gallery Page (Click "Gallery" from landing)
- Masonry grid layout
- Lightbox view (click any image)
- Category filters
- Keyboard navigation (← → Esc)
- Auto-loads images from `/photo` folder

### Moodboards Page (Click "Moodboards" from landing)
- 6 curated moodboards
- Interactive color palettes
- Click color swatches to copy hex codes
- Elegant hover animations

---

## 🚀 One-Line Start

```bash
npm run gallery:server && open http://localhost:8080/
```

Or on Linux:
```bash
npm run gallery:server && xdg-open http://localhost:8080/
```

---

## 🔍 Troubleshooting

### Server won't start?
```bash
# Check if port 8080 is in use
lsof -i :8080

# Use a different port by editing simple-server.js
# Change: const PORT = 8080;
# To:     const PORT = 3000;
```

### Images not showing in gallery?
```bash
# Verify images are in photo folder
ls photo/

# Make sure they're PNG, JPG, JPEG, WEBP, or GIF
```

### Navigation links not working?
- Make sure the server is running
- Check browser console (F12) for errors
- Verify you're accessing via http://localhost:8080/ (not file://)

---

## 📱 Mobile & Desktop

Everything is fully responsive:
- Desktop: Full navigation and layouts
- Tablet: Adapted grid layouts
- Mobile: Hamburger menu, single column layouts

---

## 🎨 Design System

All pages use consistent:
- **Colors**: Creamy minimalist palette
- **Fonts**: Playfair Display, Inter, Bodoni Moda
- **Style**: Luxury transitions and elegant animations

---

## 💡 Tips

1. **Always start from the landing page** (http://localhost:8080/)
2. **Add images to `/photo` folder** - they appear automatically
3. **Use category keywords in filenames** for auto-categorization:
   - `editorial-fashion-1.jpg` → Editorial category
   - `minimal-portrait-2.png` → Minimalist category
   - `couture-dress-3.jpg` → Couture category

4. **Click color swatches** on moodboards to copy hex codes
5. **Use keyboard shortcuts** in gallery lightbox:
   - `→` Next image
   - `←` Previous image
   - `Esc` Close lightbox

---

## 🎉 You're All Set!

```bash
# Start the server
npm run gallery:server

# Open http://localhost:8080/
# Navigate from there to Gallery and Moodboards
# Enjoy your beautiful VeraLabs website! ✨
```

---

**Questions?** Check the full docs:
- `QUICKSTART.md` - Quick reference
- `GALLERY_README.md` - Detailed documentation
