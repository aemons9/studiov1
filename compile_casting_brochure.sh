#!/bin/bash

# ============================================================================
# LaTeX Compilation Script for Zara Model Casting Brochure
# ============================================================================

echo "📸 Compiling Zara Model Casting Brochure..."

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "❌ pdflatex not found. Please install texlive:"
    echo "   Ubuntu/Debian: sudo apt-get install texlive-full"
    echo "   macOS: brew install --cask mactex"
    exit 1
fi

# Compile the LaTeX document (run twice for TOC and references)
pdflatex -interaction=nonstopmode ZARA_MODEL_CASTING_BROCHURE.tex
pdflatex -interaction=nonstopmode ZARA_MODEL_CASTING_BROCHURE.tex

# Clean up auxiliary files
rm -f *.aux *.log *.out *.toc

echo ""
echo "✅ PDF generated: ZARA_MODEL_CASTING_BROCHURE.pdf"
echo "📄 Ready to share with models and agencies!"
echo ""
echo "💡 TIP: You can also use Overleaf.com to compile online"
