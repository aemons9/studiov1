#!/bin/bash

# VeraLabs Gallery Helper Script
# This script helps you manage your gallery images

echo "🎨 VeraLabs Gallery Helper"
echo "=========================="
echo ""

# Check if photo directory exists
if [ ! -d "photo" ]; then
    echo "📁 Creating photo directory..."
    mkdir -p photo
    echo "✅ Photo directory created!"
fi

# Count images in photo directory
image_count=$(find photo -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) | wc -l)

echo "📸 Images in gallery: $image_count"
echo ""

if [ $image_count -eq 0 ]; then
    echo "⚠️  No images found in the photo directory."
    echo ""
    echo "To add images to your gallery:"
    echo "  1. Copy your images (PNG, JPG, WEBP) to the 'photo' folder"
    echo "  2. Run this script again or start the server"
    echo ""
    echo "Example:"
    echo "  cp ~/Pictures/my-photo.jpg photo/"
    echo ""
else
    echo "📋 Your images:"
    find photo -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) -exec basename {} \;
    echo ""
fi

echo "🚀 What would you like to do?"
echo ""
echo "  1. Start the local server (http://localhost:8080)"
echo "  2. Scan and generate gallery data (gallery-data.json)"
echo "  3. Open photo directory"
echo "  4. View README"
echo "  5. Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Starting local server..."
        echo "   Landing page: http://localhost:8080/veralabs-landing-v2.html"
        echo "   Gallery:      http://localhost:8080/gallery.html"
        echo "   Moodboards:   http://localhost:8080/moodboards.html"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        node simple-server.js
        ;;
    2)
        echo ""
        echo "🔍 Scanning photo directory..."
        node load-gallery-images.js
        ;;
    3)
        echo ""
        echo "📁 Opening photo directory..."
        if command -v xdg-open > /dev/null; then
            xdg-open photo/
        elif command -v open > /dev/null; then
            open photo/
        else
            echo "Photo directory: $(pwd)/photo"
        fi
        ;;
    4)
        echo ""
        if [ -f GALLERY_README.md ]; then
            cat GALLERY_README.md
        else
            echo "README not found"
        fi
        ;;
    5)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo ""
        echo "❌ Invalid choice"
        ;;
esac
