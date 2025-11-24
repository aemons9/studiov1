#!/bin/bash
echo "🔐 Generating fresh OAuth token for Vertex AI..."
echo ""
echo "Run this command and copy the token:"
echo ""
echo "gcloud auth application-default print-access-token"
echo ""
echo "Then in your browser console (where the app is running), paste:"
echo ""
echo 'localStorage.setItem("mainToken", "YOUR_TOKEN_HERE");'
echo ""
echo "Then refresh the page!"
