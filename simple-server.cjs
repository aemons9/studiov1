#!/usr/bin/env node

/**
 * Simple Static File Server for VeraLabs
 *
 * This server serves static files and provides an API endpoint
 * to list images from the photo directory for the gallery.
 *
 * Usage:
 *   node simple-server.js
 *
 * Then open: http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PHOTO_DIR = path.join(__dirname, 'photo');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// MIME types
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

/**
 * Infer category from filename
 */
function inferCategory(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('editorial') || lower.includes('magazine')) return 'editorial';
    if (lower.includes('minimal') || lower.includes('simple')) return 'minimalist';
    if (lower.includes('couture') || lower.includes('luxury')) return 'couture';
    if (lower.includes('contemporary') || lower.includes('urban')) return 'contemporary';
    return 'editorial';
}

/**
 * Format filename to readable title
 */
function formatTitle(filename) {
    return filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Get gallery images from photo directory
 */
function getGalleryImages() {
    if (!fs.existsSync(PHOTO_DIR)) {
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
                category: inferCategory(file)
            });
        }
    });

    return images;
}

/**
 * Handle HTTP requests
 */
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // API endpoint for gallery images
    if (req.url === '/api/gallery-images') {
        const images = getGalleryImages();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(images));
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './veralabs-landing-v2.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🎨 VeraLabs Static Server');
    console.log('═'.repeat(50));
    console.log(`\n✅ Server running at http://localhost:${PORT}/`);
    console.log(`\n📄 Pages available:`);
    console.log(`   • Landing Page:  http://localhost:${PORT}/veralabs-landing-v2.html`);
    console.log(`   • Gallery:       http://localhost:${PORT}/gallery.html`);
    console.log(`   • Moodboards:    http://localhost:${PORT}/moodboards.html`);
    console.log(`\n📁 Photo directory: ${PHOTO_DIR}`);
    console.log(`\n🔌 API endpoints:`);
    console.log(`   • GET /api/gallery-images - List all gallery images`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});
