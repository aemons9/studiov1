#!/bin/bash

# StudioV Local Setup Script
# This script sets up StudioV for local development

echo "🚀 StudioV Local Setup"
echo "====================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to the target directory
TARGET_DIR="/home/ecolex/ai-image-studio"
echo "📂 Setting up in: $TARGET_DIR"
echo ""

# Clean up old installation
read -p "⚠️  Clean up existing backend/frontend folders? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Cleaning up old installation..."
    rm -rf "$TARGET_DIR/backend"
    rm -rf "$TARGET_DIR/frontend"
    echo "✅ Cleanup complete"
fi

echo ""
echo "📋 Next steps:"
echo "1. Copy your StudioV repository files to $TARGET_DIR"
echo "2. Run: cd $TARGET_DIR"
echo "3. Run: npm install"
echo "4. Run: npm run dev"
echo ""
echo "Done! 🎉"
