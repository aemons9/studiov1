# VeraLabs - AI-Powered Fashion Editorial Landing Page

A sophisticated, minimalist landing page showcasing VeraLabs' AI-powered fashion editorial photography platform. Built with pure HTML, CSS, and vanilla JavaScript for maximum performance and simplicity.

## Features

### Design & Aesthetics
- **Minimalist Professional Design** - Clean, elegant interface with gold accent colors
- **Smooth Animations** - Intersection Observer API for scroll-triggered animations
- **Parallax Effects** - Subtle depth and movement on scroll
- **Responsive Layout** - Fully optimized for desktop, tablet, and mobile devices

### Interactive Elements
- **Modern Gallery** - State-of-the-art gallery with hover effects, zoom, and smooth transitions
- **Lightbox Modal** - Click to expand gallery items with elegant modal presentation
- **Staggered Animations** - Sequential fade-in effects for gallery items and feature cards
- **Smooth Scrolling** - Buttery smooth anchor link navigation
- **Dynamic Navbar** - Transforms on scroll with backdrop blur effect

### Technical Highlights
- **Pure Vanilla JavaScript** - No dependencies, fast loading
- **CSS Grid & Flexbox** - Modern, flexible layouts
- **CSS Custom Properties** - Easy theming with CSS variables
- **Intersection Observer** - Performant scroll animations
- **Mobile-First Responsive** - Optimized for all screen sizes
- **Accessible** - Semantic HTML with ARIA labels

## File Structure

```
veralabs-landing.html    # Complete standalone landing page
VERALABS_README.md       # This file
```

## Quick Start

### Option 1: Direct File Access
Simply open `veralabs-landing.html` in any modern web browser.

### Option 2: GitHub Pages Deployment

1. **Create a new GitHub repository:**
   ```bash
   git init veralabs-landing
   cd veralabs-landing
   ```

2. **Add the landing page:**
   ```bash
   # Copy veralabs-landing.html to the repository
   # Rename it to index.html for GitHub Pages
   cp veralabs-landing.html index.html
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: VeraLabs landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/veralabs-landing.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at: `https://YOUR_USERNAME.github.io/veralabs-landing/`

### Option 3: Local Development Server

If you want to test locally with a server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000/veralabs-landing.html`

## Customization Guide

### Colors
The color scheme is defined using CSS custom properties in the `:root` selector:

```css
:root {
    --primary-dark: #0a0a0a;      /* Main background */
    --secondary-dark: #1a1a1a;    /* Secondary background */
    --accent-gold: #d4af37;       /* Primary accent color */
    --accent-rose: #e8b4b8;       /* Secondary accent color */
    --text-primary: #ffffff;      /* Main text color */
    --text-secondary: #a0a0a0;    /* Secondary text color */
}
```

### Adding Real Gallery Images

To replace placeholder gallery items with actual images:

1. Find the gallery item placeholders:
```html
<div class="gallery-placeholder">
    <span class="gallery-placeholder-text">📸</span>
</div>
```

2. Replace with actual images:
```html
<img src="path/to/your/image.jpg" alt="Description" style="width: 100%; height: 100%; object-fit: cover;">
```

### Typography
The page uses system fonts for optimal performance. To use custom fonts:

1. Add font import in the `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&display=swap" rel="stylesheet">
```

2. Update the font-family in CSS:
```css
body {
    font-family: 'Playfair Display', serif;
}
```

## Integration with Your App

To integrate this landing page with your existing Vercel-deployed app:

### Option 1: Separate Landing Page
- Deploy this as a standalone site on a subdomain (e.g., `landing.veralabs.com`)
- Link to your main app with a CTA button pointing to `app.veralabs.com`

### Option 2: Same Deployment
1. Add the landing page to your existing repository
2. Update your Vercel routing in `vercel.json`:
```json
{
  "routes": [
    {
      "src": "/",
      "dest": "/veralabs-landing.html"
    },
    {
      "src": "/app",
      "dest": "/index.html"
    }
  ]
}
```

### Option 3: Replace Main Index
Simply rename `veralabs-landing.html` to replace your current `index.html` and deploy.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

All modern browsers with support for:
- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- CSS Backdrop Filter

## Performance Optimizations

- **No External Dependencies** - Zero HTTP requests for libraries
- **Inline CSS & JS** - Single file, no additional requests
- **Debounced Scroll Events** - Optimized scroll performance with requestAnimationFrame
- **Lazy Animations** - Elements animate only when in viewport
- **Optimized Transitions** - Hardware-accelerated CSS transforms

## Accessibility Features

- Semantic HTML5 structure
- ARIA labels for icon links
- Keyboard navigation support (Escape to close lightbox)
- Focus states for interactive elements
- Sufficient color contrast ratios
- Responsive text sizing

## Future Enhancements

Consider adding:
- [ ] Actual AI-generated images from your Replicate integration
- [ ] Contact form with backend integration
- [ ] Newsletter signup
- [ ] Case studies section
- [ ] Pricing plans
- [ ] Blog integration
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Advanced image filtering/sorting in gallery

## Connecting to Your AI Generation

To display actual generated images from your app:

1. Export images from your Replicate integration
2. Store them in a `/gallery` folder
3. Update the gallery HTML to reference actual image paths
4. Optionally: Create a JSON file with image metadata and load dynamically with JavaScript

Example dynamic gallery loading:
```javascript
fetch('/gallery/images.json')
  .then(response => response.json())
  .then(images => {
    images.forEach(img => {
      // Create gallery items dynamically
    });
  });
```

## Credits

- Design: Minimalist editorial aesthetic inspired by high-fashion magazines
- Technology: Vanilla HTML5, CSS3, JavaScript ES6+
- Icons: Unicode emoji (can be replaced with icon fonts or SVGs)

## License

This is a custom design for VeraLabs. Modify and use as needed for your project.

---

**Need Help?**
For questions or customization requests, refer to the inline code comments or standard web development documentation.

**Live Preview:** Once deployed, your site will showcase the future of AI-powered fashion editorial photography!
