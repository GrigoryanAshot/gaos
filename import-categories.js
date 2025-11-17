/**
 * Import Categories to Firebase
 * 
 * Creates proper category entries in Firebase with multilingual names
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Category definitions
const categories = [
  {
    slug: 'new',
    nameEn: 'New Arrivals',
    nameHy: 'Նորույթներ',
    nameRu: 'Новинки',
    icon: 'fa-star',
    displayOrder: 1,
    descriptionEn: 'Latest furniture arrivals',
    descriptionHy: 'Վերջին կահույքի ժամանումներ',
    descriptionRu: 'Последние поступления мебели'
  },
  {
    slug: 'chairs',
    nameEn: 'Chairs',
    nameHy: 'Աթոռներ',
    nameRu: 'Стулья',
    icon: 'fa-chair',
    displayOrder: 2,
    descriptionEn: 'Premium quality chairs',
    descriptionHy: 'Բարձրորակ աթոռներ',
    descriptionRu: 'Стулья премиум качества'
  },
  {
    slug: 'bar-chairs',
    nameEn: 'Bar Chairs',
    nameHy: 'Բարի աթոռներ',
    nameRu: 'Барные стулья',
    icon: 'fa-glass',
    displayOrder: 3,
    descriptionEn: 'Stylish bar and counter chairs',
    descriptionHy: 'Ոճային բարի և հաշվիչ աթոռներ',
    descriptionRu: 'Стильные барные и барные стулья'
  },
  {
    slug: 'sofas',
    nameEn: 'Sofas & Armchairs',
    nameHy: 'Բազմոց-Բազկաթոռ',
    nameRu: 'Диваны и кресла',
    icon: 'fa-couch',
    displayOrder: 4,
    descriptionEn: 'Comfortable sofas and armchairs',
    descriptionHy: 'Հարմարավետ բազմոցներ և բազկաթոռներ',
    descriptionRu: 'Удобные диваны и кресла'
  },
  {
    slug: 'tables',
    nameEn: 'Tables',
    nameHy: 'Սեղաններ',
    nameRu: 'Столы',
    icon: 'fa-table',
    displayOrder: 5,
    descriptionEn: 'Dining and coffee tables',
    descriptionHy: 'Ճաշասեղաններ և սրճարանային սեղաններ',
    descriptionRu: 'Обеденные и кофейные столы'
  },
  {
    slug: 'outdoor',
    nameEn: 'Outdoor Furniture',
    nameHy: 'Դրսի կահույք',
    nameRu: 'Уличная мебель',
    icon: 'fa-tree',
    displayOrder: 6,
    descriptionEn: 'Weather-resistant outdoor furniture',
    descriptionHy: 'Եղանակակայուն դրսի կահույք',
    descriptionRu: 'Устойчивая к погодным условиям уличная мебель'
  },
  {
    slug: 'food-court',
    nameEn: 'Food Court Furniture',
    nameHy: 'Ֆուդ կորտի կահույք',
    nameRu: 'Мебель для фуд-корта',
    icon: 'fa-utensils',
    displayOrder: 7,
    descriptionEn: 'Commercial food court furniture',
    descriptionHy: 'Առևտրային ֆուդ կորտի կահույք',
    descriptionRu: 'Коммерческая мебель для фуд-корта'
  }
];

console.log('🔥 Starting Category Import...\n');

async function importCategories() {
  try {
    // First, check if categories already exist
    console.log('📡 Checking existing categories...');
    const existingQuery = await getDocs(collection(db, "categories"));
    const existingSlugs = new Set();
    
    existingQuery.forEach((doc) => {
      existingSlugs.add(doc.data().slug);
    });
    
    console.log(`Found ${existingSlugs.size} existing categories\n`);
    
    let created = 0;
    let updated = 0;
    let skipped = 0;
    
    for (const category of categories) {
      try {
        // Check if category exists
        if (existingSlugs.has(category.slug)) {
          // Update existing
          const q = query(collection(db, "categories"), where("slug", "==", category.slug));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0];
            await updateDoc(doc(db, "categories", docRef.id), {
              ...category,
              updatedAt: new Date()
            });
            console.log(`✅ Updated: ${category.nameEn} (${category.nameHy})`);
            updated++;
          }
        } else {
          // Create new
          await addDoc(collection(db, "categories"), {
            ...category,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
          });
          console.log(`✅ Created: ${category.nameEn} (${category.nameHy})`);
          created++;
        }
      } catch (error) {
        console.log(`❌ Error with ${category.nameEn}: ${error.message}`);
        skipped++;
      }
    }
    
    // Summary
    console.log('\n====== IMPORT COMPLETE ======');
    console.log(`✅ Created: ${created}`);
    console.log(`🔄 Updated: ${updated}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`📊 Total: ${categories.length} categories`);
    console.log('\n🎉 Categories imported successfully!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
  
  process.exit(0);
}

// Run it
importCategories();

