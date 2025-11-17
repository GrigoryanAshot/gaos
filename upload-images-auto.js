/**
 * Automatic Bulk Image Uploader to Cloudinary
 * 
 * This script automatically:
 * 1. Reads all images from your local folders
 * 2. Uploads them to Cloudinary
 * 3. Updates Firebase database with new URLs
 * 
 * No manual file selection needed!
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn5xrA0ej00bdBzaJ5eG211kc_JxZB45U",
  authDomain: "gaos-website.firebaseapp.com",
  projectId: "gaos-website",
  storageBucket: "gaos-website.firebasestorage.app",
  messagingSenderId: "76567174713",
  appId: "1:76567174713:web:cd20e24a0ccfa3029677e8",
  measurementId: "G-KMR96XCGJD"
};

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'ddbbzjns1',
  api_key: '698995728343262',  // You'll need to get this from Cloudinary dashboard
  api_secret: 'jOCBPQ4FbHAuL3txh3IeA2SUuic'  // You'll need to get this from Cloudinary dashboard
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Statistics
const stats = {
  total: 0,
  success: 0,
  failed: 0,
  skipped: 0
};

console.log('🔥 Starting Automatic Image Upload...\n');

// Main function
async function uploadAllImages() {
  try {
    // 1. Load all items from database
    console.log('📡 Loading items from Firebase...');
    const querySnapshot = await getDocs(collection(db, "furniture"));
    const items = [];
    
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`✅ Loaded ${items.length} items from database\n`);
    stats.total = items.length;
    
    // 2. Process each item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const progress = `[${i + 1}/${items.length}]`;
      
      try {
        // Skip if already has Cloudinary URL
        if (item.mainImage && item.mainImage.includes('cloudinary.com')) {
          console.log(`${progress} ⏭️  ${item.nameEn}: Already on Cloudinary, skipping`);
          stats.skipped++;
          continue;
        }
        
        // Get local image path
        const localPath = item.mainImage;
        if (!localPath) {
          console.log(`${progress} ⚠️  ${item.nameEn}: No image path in database`);
          stats.skipped++;
          continue;
        }
        
        // Check if file exists
        const fullPath = path.join(__dirname, localPath);
        if (!fs.existsSync(fullPath)) {
          console.log(`${progress} ❌ ${item.nameEn}: File not found: ${localPath}`);
          stats.failed++;
          continue;
        }
        
        // Upload to Cloudinary
        console.log(`${progress} 📤 Uploading: ${item.nameEn} (${path.basename(localPath)})...`);
        
        const result = await cloudinary.uploader.upload(fullPath, {
          folder: 'gaos-furniture',
          resource_type: 'image',
          overwrite: false
        });
        
        // Update database
        await updateDoc(doc(db, "furniture", item.id), {
          mainImage: result.secure_url,
          updatedAt: new Date()
        });
        
        console.log(`${progress} ✅ ${item.nameEn}: SUCCESS! ${result.secure_url}`);
        stats.success++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`${progress} ❌ ${item.nameEn}: ERROR - ${error.message}`);
        stats.failed++;
      }
    }
    
    // 3. Show summary
    console.log('\n====== UPLOAD COMPLETE ======');
    console.log(`✅ Successfully uploaded: ${stats.success}`);
    console.log(`⏭️  Skipped (already uploaded): ${stats.skipped}`);
    console.log(`❌ Failed: ${stats.failed}`);
    console.log(`📊 Total processed: ${stats.total}`);
    console.log('\n🎉 All done! Check your admin panel!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
  
  process.exit(0);
}

// Run it
uploadAllImages();

