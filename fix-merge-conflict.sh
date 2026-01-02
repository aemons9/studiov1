#!/bin/bash

echo "🔧 Fixing merge conflict with photo files..."
echo ""

# Create backup directory
echo "📁 Creating backup directory..."
mkdir -p photo-backup

# Move conflicting files to backup
echo "📦 Backing up conflicting files..."
mv photo/minimal-10.jpeg photo-backup/ 2>/dev/null
mv photo/minimal-11.jpg photo-backup/ 2>/dev/null
mv photo/minimal-12.jpg photo-backup/ 2>/dev/null
mv photo/minimal-13.jpg photo-backup/ 2>/dev/null
mv photo/minimal-6.jpg photo-backup/ 2>/dev/null
mv photo/minimal-7.jpg photo-backup/ 2>/dev/null
mv photo/minimal-8.jpg photo-backup/ 2>/dev/null
mv photo/minimal-9.jpg photo-backup/ 2>/dev/null

echo "✅ Files backed up to photo-backup/"
echo ""

# Now pull the changes
echo "⬇️  Pulling latest changes..."
git pull origin claude/add-gallery-section-01MkqAhZWBi99MC5GsV5SWbb

echo ""
echo "✅ Pull complete!"
echo ""
echo "📋 Your local files are backed up in: photo-backup/"
echo "📸 Remote files are now in: photo/"
echo ""
echo "Next step: Compare files and keep the ones you want"

