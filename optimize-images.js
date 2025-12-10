/**
 * Image Optimization Script
 * This script will compress images to improve website performance
 * 
 * Installation: npm install sharp --save-dev
 * Usage: node optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SLIDER_IMAGES_DIR = './images';
const PARTNERS_DIR = './images/partners';
const QUALITY = 80; // JPEG quality (0-100, 80 is good balance)

async function optimizeJPEG(inputPath, outputPath, quality = QUALITY) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .jpeg({ 
        quality: quality, 
        progressive: true,
        mozjpeg: true // Use mozjpeg for better compression
      })
      .toFile(outputPath + '.tmp');
    
    const newSize = fs.statSync(outputPath + '.tmp').size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Only replace if we actually saved space
    if (newSize < originalSize) {
      fs.renameSync(outputPath + '.tmp', outputPath);
      console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    } else {
      fs.unlinkSync(outputPath + '.tmp');
      console.log(`⚠️ ${path.basename(inputPath)}: Already optimized (${(originalSize/1024).toFixed(0)}KB)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizePNG(inputPath, outputPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    // Try to optimize PNG with maximum compression
    await sharp(inputPath)
      .png({ 
        compressionLevel: 9,
        quality: 85,
        effort: 10, // Maximum effort for best compression
        palette: true // Use palette when possible
      })
      .toFile(outputPath + '.tmp');
    
    const newSize = fs.statSync(outputPath + '.tmp').size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Only replace if we actually saved space
    if (newSize < originalSize) {
      fs.renameSync(outputPath + '.tmp', outputPath);
      console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    } else {
      fs.unlinkSync(outputPath + '.tmp');
      console.log(`⚠️ ${path.basename(inputPath)}: Already optimized (${(originalSize/1024).toFixed(0)}KB)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeImages() {
  console.log('🖼️ Starting image optimization...\n');
  
  // Optimize slider images
  console.log('📸 Optimizing slider images...');
  const sliderImages = fs.readdirSync(SLIDER_IMAGES_DIR)
    .filter(file => (file.startsWith('slide1-') || file.startsWith('master-slides-')) && file.endsWith('.jpg'));
  
  for (const image of sliderImages) {
    const imagePath = path.join(SLIDER_IMAGES_DIR, image);
    await optimizeJPEG(imagePath, imagePath, 70); // 70 quality = great balance of size vs quality
  }
  
  // Optimize partner logos
  console.log('\n🤝 Optimizing partner logos...');
  const partnerLogos = fs.readdirSync(PARTNERS_DIR)
    .filter(file => file.endsWith('.png'));
  
  for (const logo of partnerLogos) {
    const logoPath = path.join(PARTNERS_DIR, logo);
    await optimizePNG(logoPath, logoPath);
  }
  
  console.log('\n✅ Optimization complete!');
  console.log('💡 Tip: Clear your browser cache (Ctrl+Shift+Delete) to see the speed improvements');
}

// Run optimization
optimizeImages().catch(console.error);

