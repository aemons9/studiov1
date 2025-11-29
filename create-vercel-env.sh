#!/bin/bash

# Script to create .env file for Vercel from service account key
# Usage: ./create-vercel-env.sh <path-to-service-account-key.json>

if [ -z "$1" ]; then
  echo "❌ Error: Please provide path to service account JSON file"
  echo "Usage: ./create-vercel-env.sh <path-to-key.json>"
  exit 1
fi

KEY_FILE="$1"

if [ ! -f "$KEY_FILE" ]; then
  echo "❌ Error: File not found: $KEY_FILE"
  exit 1
fi

echo "🔧 Creating .env file for Vercel..."
echo ""

# Read the JSON file and compact it to a single line
# This preserves the \n in the private_key field
COMPACT_JSON=$(cat "$KEY_FILE" | jq -c .)

# Extract project ID for verification
PROJECT_ID=$(echo "$COMPACT_JSON" | jq -r '.project_id')
CLIENT_EMAIL=$(echo "$COMPACT_JSON" | jq -r '.client_email')

# Create .env file
cat > .env.vercel <<EOF
# Vercel Environment Variables for GCP OAuth
# Import this file in Vercel Project Settings > Environment Variables

# Service Account JSON (single line, with \n preserved in private_key)
GOOGLE_APPLICATION_CREDENTIALS=$COMPACT_JSON

# GCP Project ID
GCP_PROJECT_ID=$PROJECT_ID
EOF

echo "✅ Created .env.vercel file!"
echo ""
echo "📋 Service account: $CLIENT_EMAIL"
echo "📋 Project ID: $PROJECT_ID"
echo ""
echo "📤 Next steps:"
echo "   1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables"
echo "   2. Click 'Import .env' button"
echo "   3. Select the .env.vercel file from this directory"
echo "   4. Make sure to select all environments (Production, Preview, Development)"
echo "   5. Click 'Import'"
echo "   6. Redeploy your project"
echo ""
echo "⚠️  Note: The .env.vercel file contains sensitive credentials!"
echo "   Do not commit it to git. It's already in .gitignore."
