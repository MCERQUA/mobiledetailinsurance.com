const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imageDir = path.join(__dirname, '../images');
const outputDir = path.join(__dirname, '../images/optimized');
const sizes = {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200
};

async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function optimizeImage(filePath, filename) {
    // Skip if file is in optimized directory
    if (filePath.includes('optimized')) {
        return;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    
    // Create output directory structure
    const relativePath = path.relative(imageDir, path.dirname(filePath));
    const currentOutputDir = path.join(outputDir, relativePath);
    await ensureDir(currentOutputDir);
    
    try {
        // Always generate large, medium, and small versions
        const resizedLarge = path.join(currentOutputDir, `${name}-large.webp`);
        const resizedMedium = path.join(currentOutputDir, `${name}-medium.webp`);
        const resizedSmall = path.join(currentOutputDir, `${name}-small.webp`);
        const resizedThumbnail = path.join(currentOutputDir, `${name}-thumbnail.webp`);
        const originalSize = path.join(currentOutputDir, `${name}.webp`);

        // Generate large version (1200px)
        await image
            .resize(1200, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(resizedLarge);

        // Generate medium version (600px)
        await image
            .resize(600, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(resizedMedium);

        // Generate small version (300px)
        await image
            .resize(300, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(resizedSmall);

        // Generate thumbnail version (150px)
        await image
            .resize(150, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(resizedThumbnail);

        // Generate original size version
        await image
            .webp({ quality: 80 })
            .toFile(originalSize);
            
        console.log(`Optimized: ${path.relative(imageDir, filePath)}`);
    } catch (error) {
        console.error(`Failed to optimize ${filename}:`, error.message);
    }
}

async function processDirectory(directory) {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isDirectory() && !file.includes('optimized') && !file.includes('public')) {
            await processDirectory(filePath);
            continue;
        }
        
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
            continue;
        }
        
        await optimizeImage(filePath, file);
    }
}

// Clean up existing optimized images
async function cleanOutputDir() {
    try {
        await fs.rm(outputDir, { recursive: true, force: true });
        console.log('Cleaned output directory');
    } catch (error) {
        console.error('Error cleaning output directory:', error.message);
    }
}

// Main execution
(async () => {
    try {
        await cleanOutputDir();
        await ensureDir(outputDir);
        await processDirectory(imageDir);
        console.log('Image optimization complete');
    } catch (error) {
        console.error('Failed to optimize images:', error.message);
        process.exit(1);
    }
})();
