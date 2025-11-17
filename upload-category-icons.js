/**
 * Upload Category Icons to Cloudinary
 * 
 * Uploads category icon images and updates categories in Firebase
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
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
  api_key: '698995728343262',
  api_secret: 'jOCBPQ4FbHAuL3txh3IeA2SUuic'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Category icon mappings
const categoryIcons = {
  'new': 'images/icons/furniture-new.jpg',
  'chairs': 'images/icons/furniture-chairs.jpg',
  'bar-chairs': 'images/icons/furniture-bar.jpg',
  'sofas': 'images/icons/furniture-sofas.jpg',
  'tables': 'images/icons/furniture-tables.jpg',
  'outdoor': 'images/icons/furniture-outdoor.jpg',
  'food-court': 'images/icons/furniture-food-court.jpg'
};

console.log('🔥 Starting Category Icon Upload...\n');

async function uploadCategoryIcons() {
  try {
    // 1. Load all categories from database
    console.log('📡 Loading categories from Firebase...');
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    console.log(`✅ Loaded ${categories.length} categories\n`);
    
    let success = 0;
    let failed = 0;
    let skipped = 0;
    
    // 2. Process each category
    for (const category of categories) {
      const slug = category.slug;
      const localPath = categoryIcons[slug];
      
      if (!localPath) {
        console.log(`⚠️  ${category.nameEn}: No icon mapping found for slug "${slug}"`);
        skipped++;
        continue;
      }
      
      // Check if already has Cloudinary URL
      if (category.iconImage && category.iconImage.includes('cloudinary.com')) {
        console.log(`⏭️  ${category.nameEn}: Already has Cloudinary icon, skipping`);
        skipped++;
        continue;
      }
      
      // Check if file exists
      const fullPath = path.join(__dirname, localPath);
      if (!fs.existsSync(fullPath)) {
        console.log(`❌ ${category.nameEn}: Icon file not found: ${localPath}`);
        failed++;
        continue;
      }
      
      try {
        // Upload to Cloudinary
        console.log(`📤 Uploading icon: ${category.nameEn} (${path.basename(localPath)})...`);
        
        const result = await cloudinary.uploader.upload(fullPath, {
          folder: 'gaos-furniture/category-icons',
          resource_type: 'image',
          overwrite: false
        });
        
        // Update category in database
        await updateDoc(doc(db, "categories", category.id), {
          iconImage: result.secure_url,
          iconPath: localPath, // Keep original path for reference
          updatedAt: new Date()
        });
        
        console.log(`✅ ${category.nameEn}: Icon uploaded! ${result.secure_url}`);
        success++;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`❌ ${category.nameEn}: ERROR - ${error.message}`);
        failed++;
      }
    }
    
    // 3. Show summary
    console.log('\n====== UPLOAD COMPLETE ======');
    console.log(`✅ Successfully uploaded: ${success}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total categories: ${categories.length}`);
    console.log('\n🎉 Category icons uploaded successfully!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
  
  process.exit(0);
}

// Run it
uploadCategoryIcons();

