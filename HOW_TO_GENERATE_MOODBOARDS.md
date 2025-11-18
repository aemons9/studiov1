# How to Generate VeraLabs Moodboard Preview Images

This guide explains how to generate the 7 professional fashion editorial images for the VeraLabs moodboard concepts.

## Quick Start

You have 3 options to generate the moodboard images:

### Option 1: Use the Main VeraLabs App (Recommended)

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev:all
   ```

2. **Open the app**: http://localhost:3000

3. **Navigate to the Moodboards tab** in Vera Mode

4. **For each concept**:
   - Click "Generate" button
   - The app will use the pre-built prompts
   - Wait for the image to generate
   - Right-click the generated image → "Save image as..."
   - Save to `public/moodboards/` with the appropriate filename:
     - `moodboard-001.png` - Silk Dawn Minimalism
     - `moodboard-002.png` - Monsoon Drape Poetry
     - `moodboard-003.png` - Bombay Noir Nights
     - `moodboard-004.png` - Delhi Rooftop Golden
     - `moodboard-005.png` - Goan Beach Bohemian
     - `moodboard-006.png` - Jaipur Palace Boudoir
     - `moodboard-007.png` - Kerala Monsoon Intimacy

5. **Update the TypeScript file** to reference the images (see below)

### Option 2: Use the Generator Helper Tool

1. **Open the generator tool**: http://localhost:3000/generate-moodboards.html

2. **This tool shows all 7 concepts** with placeholders

3. **Click "Generate This Concept"** for each one
   - It will open instructions to use the main app
   - Follow those instructions to generate via the main app
   - Save images as described above

4. **Track your progress** in the tool interface

### Option 3: Generate via API Script (Advanced)

If you want to automate the process:

1. **Set up Google Cloud credentials** for Imagen API

2. **Update the script** at `scripts/generateMoodboardImages.mjs`:
   - Add your Project ID
   - Configure the Imagen endpoint

3. **Run the script**:
   ```bash
   node scripts/generateMoodboardImages.mjs
   ```

4. **Images will be saved** automatically to `public/moodboards/`

## After Generating Images

Once you have all 7 images saved in `public/moodboards/`, update the TypeScript file:

### Edit `vera/moodboardConcepts.ts`

Add the `previewImage` field to each concept:

```typescript
export const MINIMALIST_SILK_DAWN: MoodboardConcept = {
  id: 'moodboard-001',
  name: 'Silk Dawn Minimalism',
  // ... other fields ...
  previewImage: '/moodboards/moodboard-001.png',  // ← Add this line
  // ... rest of the fields ...
};

export const MONSOON_DRAPE_EDITORIAL: MoodboardConcept = {
  id: 'moodboard-002',
  name: 'Monsoon Drape Poetry',
  // ... other fields ...
  previewImage: '/moodboards/moodboard-002.png',  // ← Add this line
  // ... rest of the fields ...
};

// ... repeat for all 7 concepts ...
```

## Concept Details

### The 7 Moodboard Concepts

| ID | Name | Filename | Aspect Ratio | Model |
|----|------|----------|--------------|-------|
| moodboard-001 | Silk Dawn Minimalism | moodboard-001.png | 4:5 | Imagen 4 |
| moodboard-002 | Monsoon Drape Poetry | moodboard-002.png | 4:5 | Imagen 4 |
| moodboard-003 | Bombay Noir Nights | moodboard-003.png | 9:16 | Imagen 4 |
| moodboard-004 | Delhi Rooftop Golden | moodboard-004.png | 4:5 | Imagen 4 |
| moodboard-005 | Goan Beach Bohemian | moodboard-005.png | 4:5 | Imagen 4 |
| moodboard-006 | Jaipur Palace Boudoir | moodboard-006.png | 3:4 | Imagen 4 |
| moodboard-007 | Kerala Monsoon Intimacy | moodboard-007.png | 4:5 | Imagen 4 |

## File Structure

```
/home/ecolex/version1/
├── public/
│   ├── moodboards/                    # ← Create this directory
│   │   ├── moodboard-001.png          # ← Save generated images here
│   │   ├── moodboard-002.png
│   │   ├── moodboard-003.png
│   │   ├── moodboard-004.png
│   │   ├── moodboard-005.png
│   │   ├── moodboard-006.png
│   │   └── moodboard-007.png
│   └── generate-moodboards.html       # Helper tool
├── vera/
│   ├── moodboardConcepts.ts           # Update previewImage paths here
│   └── components/
│       └── MoodboardConceptsUI.tsx    # Already updated to show images
└── scripts/
    └── generateMoodboardImages.mjs    # Automation script
```

## Tips for Best Results

### Generation Settings

- **Model**: Use Imagen 4 for all concepts (already configured in prompts)
- **Quality**: Set to highest quality setting
- **Aspect Ratio**: Use the specified ratio for each concept
- **Number of Images**: Generate 1 image per concept (can generate extras for variety)

### Prompt Selection

- Use the **Imagen prompts** (not Flux) - they include Art Director's Declarations
- The prompts are already optimized in `moodboardConcepts.ts`
- Don't modify the prompts - they're professionally crafted

### Image Quality

- Save as **PNG** format for best quality
- Use **original resolution** - don't compress
- Rename immediately after download to avoid confusion

## Troubleshooting

### API Key Issues

If generation fails:
1. Check your `.env` file has `GEMINI_API_KEY`
2. Verify the key is valid and has Imagen access
3. Check your Google Cloud quota

### Image Not Showing

If preview doesn't appear in the app:
1. Verify file is in `public/moodboards/`
2. Check filename matches exactly (e.g., `moodboard-001.png`)
3. Ensure `previewImage` path in TypeScript starts with `/moodboards/`
4. Restart dev server

### Generation Taking Too Long

- Imagen 4 can take 30-60 seconds per image
- Be patient - the prompts are very detailed
- Don't refresh or cancel mid-generation

## Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Verify all files are in correct locations
3. Ensure dev server is running
4. Try clearing browser cache

## Next Steps

After generating all images:

1. ✅ Images saved to `public/moodboards/`
2. ✅ TypeScript updated with `previewImage` paths
3. ✅ Dev server restarted
4. 🎨 View beautiful moodboard previews in the app!

The moodboard section will now display professional fashion editorial images featuring Indian models, making the experience much more visual and engaging.

---

**Note**: All concepts use professionally crafted prompts with Art Director's Declarations to ensure tasteful, museum-quality editorial results aligned with international fashion standards.
