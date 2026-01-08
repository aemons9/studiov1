# GitHub Pages Deployment Guide

## 🌐 Host Your VeraLabs Site on GitHub Pages

Follow these steps to deploy your website to GitHub Pages (free hosting!).

---

## 📋 Prerequisites

- Your code is pushed to GitHub
- You have admin access to the repository

---

## 🚀 Setup Steps

### 1. Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/aemons9/studiov1
2. Click on **Settings** (top right)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `claude/add-gallery-section-01MkqAhZWBi99MC5GsV5SWbb` (or `main` if you've merged)
   - Folder: `/ (root)`
5. Click **Save**

### 2. Wait for Deployment

- GitHub will build and deploy your site (takes 1-2 minutes)
- You'll see a message: "Your site is live at https://aemons9.github.io/studiov1/"

### 3. Access Your Site

Your VeraLabs website will be available at:

```
https://aemons9.github.io/studiov1/
```

Or with custom domain (if you set one up):
```
https://your-domain.com
```

---

## 🔧 Important: Update Image Data

Whenever you add new images to the `photo/` folder:

```bash
# Generate the updated gallery data
node load-gallery-images.cjs

# Commit and push
git add gallery-data.json
git commit -m "chore: Update gallery data"
git push
```

### Automatic Updates (Optional)

A GitHub Actions workflow has been set up to automatically update `gallery-data.json` when you push new images. It's located at:

`.github/workflows/update-gallery.yml`

This workflow runs automatically when:
- You push changes to the `photo/` folder
- You manually trigger it from GitHub Actions tab

---

## 📁 Files for GitHub Pages

### Required Files

These files make your site work on GitHub Pages:

1. **veralabs-index.html** - Entry point that redirects to landing page
2. **veralabs-landing-v2.html** - Main landing page
3. **gallery.html** - Photo gallery (now loads from gallery-data.json)
4. **moodboards.html** - Moodboards page
5. **gallery-data.json** - Static list of all images (auto-generated)
6. **photo/** - Your images directory

### GitHub Pages Configuration

The site is configured to work without a server:
- ✅ All pages are static HTML
- ✅ Gallery loads from `gallery-data.json` (no API needed)
- ✅ All paths are relative
- ✅ Images served directly from `/photo` folder

---

## 🎨 Using Your Site

Once deployed, navigate to:

```
https://aemons9.github.io/studiov1/
```

You'll see the VeraLabs landing page with working navigation to:
- Gallery (all 30 of your images!)
- Moodboards with color palettes
- All sections

---

## 🔄 Workflow

### Adding New Images

1. **Add images to photo folder**:
   ```bash
   cp ~/Pictures/new-image.jpg photo/
   ```

2. **Generate gallery data**:
   ```bash
   node load-gallery-images.cjs
   ```

3. **Commit and push**:
   ```bash
   git add photo/ gallery-data.json
   git commit -m "feat: Add new gallery images"
   git push
   ```

4. **Wait 1-2 minutes** - GitHub Pages will auto-update!

---

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., veralabs.com):

1. In GitHub repo Settings > Pages
2. Enter your custom domain
3. Add DNS records from your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: aemons9.github.io
   ```
4. Wait for DNS propagation (can take 24-48 hours)

---

## ✅ Verification

After deployment, verify everything works:

- [ ] Landing page loads: https://aemons9.github.io/studiov1/
- [ ] Navigation works (Gallery, Moodboards links)
- [ ] Gallery displays all 30 images
- [ ] Lightbox works (click any image)
- [ ] Category filters work
- [ ] Moodboards page loads
- [ ] Color swatches are clickable
- [ ] Mobile responsive

---

## 🐛 Troubleshooting

### Site shows 404?
- Check that GitHub Pages is enabled in Settings
- Verify the correct branch is selected
- Wait 2-3 minutes for deployment

### Images not showing?
- Run `node load-gallery-images.cjs` to regenerate gallery-data.json
- Commit and push the updated gallery-data.json
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Navigation links broken?
- All links should be relative (no leading `/`)
- Verify file names match exactly (case-sensitive)

### Gallery shows empty?
- Check that gallery-data.json exists and has images
- Open browser console (F12) and check for errors
- Verify images are in the `photo/` folder

---

## 📊 GitHub Pages Features

Your site benefits from:
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ CDN (fast loading worldwide)
- ✅ Auto-deploys on every push
- ✅ Custom domain support
- ✅ Built-in version control

---

## 🎉 You're Done!

Your VeraLabs website is now live on GitHub Pages!

**Share your link:**
```
https://aemons9.github.io/studiov1/
```

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions for Auto-Updates](https://docs.github.com/en/actions)

---

**Questions?** Check the console logs in your browser (F12) or review the GitHub Actions logs if the auto-update workflow fails.
