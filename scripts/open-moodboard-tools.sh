#!/bin/bash

# VeraLabs Moodboard Tools Launcher
# Opens the main app and generator tool in your default browser

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     VeraLabs Moodboard Image Generation Tools             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Opening tools in your browser..."
echo ""

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "⚠️  Warning: Dev server doesn't appear to be running!"
    echo "Please run: npm run dev:all"
    echo ""
    exit 1
fi

echo "✅ Dev server is running"
echo ""
echo "Opening:"
echo "  1. Main App (Vera Mode → Moodboards tab)"
echo "  2. Generator Helper Tool"
echo ""

# Open main app
if command -v xdg-open > /dev/null; then
    # Linux
    xdg-open http://localhost:3000 &
    sleep 2
    xdg-open http://localhost:3000/generate-moodboards.html &
elif command -v open > /dev/null; then
    # macOS
    open http://localhost:3000 &
    sleep 2
    open http://localhost:3000/generate-moodboards.html &
elif command -v start > /dev/null; then
    # Windows
    start http://localhost:3000 &
    sleep 2
    start http://localhost:3000/generate-moodboards.html &
else
    echo "Please manually open these URLs:"
    echo "  - http://localhost:3000"
    echo "  - http://localhost:3000/generate-moodboards.html"
fi

echo ""
echo "📖 For instructions, see: HOW_TO_GENERATE_MOODBOARDS.md"
echo ""
echo "Next steps:"
echo "  1. Navigate to Vera Mode → Moodboards tab"
echo "  2. Click 'Generate' for each of the 7 concepts"
echo "  3. Save generated images to public/moodboards/"
echo "  4. Update vera/moodboardConcepts.ts with image paths"
echo ""
