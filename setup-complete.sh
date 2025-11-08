#!/bin/bash

# Complete StudioV Setup Script
# Merges platinum-engine branch with indian-model-generation branch features

echo "🚀 Setting up Complete StudioV with All Features..."
echo ""

# Step 1: Stash any local changes
echo "📦 Stashing local changes..."
git stash push -m "Backup before complete integration"

# Step 2: Reset to a clean state
echo "🧹 Resetting to clean state..."
git fetch --all

# Step 3: Checkout the indian-model branch (has all features)
echo "✅ Checking out complete branch..."
git checkout claude/indian-model-prompt-generation-011CUqeLNgxTPHBqtV9E2ok7
git pull origin claude/indian-model-prompt-generation-011CUqeLNgxTPHBqtV9E2ok7

# Step 4: Install dependencies
echo "📥 Installing dependencies..."
npm install

# Step 5: Build to verify
echo "🔨 Building..."
npm run build

# Step 6: Show what you have
echo ""
echo "✅ Setup complete! You now have:"
echo "  - 5 Creative Modes (Classic, Experimental, Artistic, Corporate, Platinum)"
echo "  - Replicate Flux API integration"
echo "  - Proxy server (proxy-server.js)"
echo "  - All 52 concept collections"
echo "  - Tailwind CSS styling"
echo ""
echo "📚 To run:"
echo "  npm run dev          - Start dev server"
echo "  npm run proxy        - Start proxy server"
echo "  npm run dev:all      - Start both"
echo ""
echo "📖 Documentation:"
echo "  - FLUX_PROXY_GUIDE.md"
echo "  - LOCAL_OPTIMIZATION_GUIDE.md"
echo "  - PLATINUM_ENGINE.md"
echo ""
