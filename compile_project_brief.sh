#!/bin/bash

# ============================================================================
# LaTeX Compilation Script for Visual Novel Project Brief
# ============================================================================

echo "🎨 Compiling Visual Novel Project Brief..."

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "❌ pdflatex not found. Installing texlive..."
    echo "Run: sudo apt-get install texlive-full"
    exit 1
fi

# Compile the LaTeX document (run twice for TOC)
pdflatex -interaction=nonstopmode VISUAL_NOVEL_PROJECT_BRIEF.tex
pdflatex -interaction=nonstopmode VISUAL_NOVEL_PROJECT_BRIEF.tex

# Clean up auxiliary files
rm -f *.aux *.log *.out *.toc

echo "✅ PDF generated: VISUAL_NOVEL_PROJECT_BRIEF.pdf"
echo "📄 You can now share this with modeling agencies!"
