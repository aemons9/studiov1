#!/usr/bin/env node

/**
 * VeraLabs Gallery Image Loader
 *
 * This script scans the /photo folder for images (PNG, JPG, JPEG, WEBP)
 * and generates a JSON file that the gallery page can use to display them.
 *
 * Usage:
 *   node load-gallery-images.js
 *
 * Or with npm:
 *   npm run load-gallery
 */

const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, 'photo');
const OUTPUT_FILE = path.join(__dirname, 'gallery-data.json');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Category keywords for auto-classification
const CATEGORY_KEYWORDS = {
    editorial: ['editorial', 'magazine', 'vogue', 'fashion'],
    minimalist: ['minimal', 'simple', 'clean', 'modern'],
    couture: ['couture', 'haute', 'luxury', 'gown', 'dress'],
    contemporary: ['contemporary', 'urban', 'street', 'modern']
};

/**
 * Infer category from filename
 */
function inferCategory(filename) {
    const lower = filename.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(keyword => lower.includes(keyword))) {
            return category;
        }
    }

    // Default category
    return 'editorial';
}

/**
 * Format filename to readable title
 */
function formatTitle(filename) {
    return filename
        .replace(/\.[^/.]+$/, '') // Remove extension
        .replace(/[-_]/g, ' ')    // Replace hyphens and underscores with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize words
}

/**
 * Scan photo directory for images
 */
function scanPhotoDirectory() {
    if (!fs.existsSync(PHOTO_DIR)) {
        console.error(`❌ Photo directory not found: ${PHOTO_DIR}`);
        console.log(`📁 Creating photo directory...`);
        fs.mkdirSync(PHOTO_DIR, { recursive: true });
        console.log(`✅ Photo directory created. Please add your images to: ${PHOTO_DIR}`);
        return [];
    }

    const files = fs.readdirSync(PHOTO_DIR);
    const images = [];

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();

        if (SUPPORTED_EXTENSIONS.includes(ext)) {
            images.push({
                src: `/photo/${file}`,
                filename: file,
                title: formatTitle(file),
                category: inferCategory(file),
                extension: ext.substring(1),
                size: getFileSize(path.join(PHOTO_DIR, file))
            });
        }
    });

    return images;
}

/**
 * Get human-readable file size
 */
function getFileSize(filepath) {
    const stats = fs.statSync(filepath);
    const bytes = stats.size;

    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Save gallery data to JSON file
 */
function saveGalleryData(images) {
    const data = {
        generatedAt: new Date().toISOString(),
        totalImages: images.length,
        categories: {
            editorial: images.filter(img => img.category === 'editorial').length,
            minimalist: images.filter(img => img.category === 'minimalist').length,
            couture: images.filter(img => img.category === 'couture').length,
            contemporary: images.filter(img => img.category === 'contemporary').length
        },
        images: images
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    return data;
}

/**
 * Main execution
 */
function main() {
    console.log('🎨 VeraLabs Gallery Image Loader\n');
    console.log(`📁 Scanning directory: ${PHOTO_DIR}`);

    const images = scanPhotoDirectory();

    if (images.length === 0) {
        console.log('\n⚠️  No images found in the photo directory.');
        console.log(`📸 Please add images (${SUPPORTED_EXTENSIONS.join(', ')}) to: ${PHOTO_DIR}`);

        // Create empty data file
        saveGalleryData([]);
        console.log(`\n✅ Empty gallery data file created: ${OUTPUT_FILE}`);
        return;
    }

    const data = saveGalleryData(images);

    console.log(`\n✅ Found ${images.length} image(s):`);
    console.log(`   • Editorial: ${data.categories.editorial}`);
    console.log(`   • Minimalist: ${data.categories.minimalist}`);
    console.log(`   • Couture: ${data.categories.couture}`);
    console.log(`   • Contemporary: ${data.categories.contemporary}`);

    console.log(`\n💾 Gallery data saved to: ${OUTPUT_FILE}`);
    console.log('\n📋 Image list:');

    images.forEach((img, index) => {
        console.log(`   ${index + 1}. ${img.title} (${img.category}) - ${img.size}`);
    });

    console.log('\n🌐 You can now view your gallery at: gallery.html');
}

// Run the script
main();
