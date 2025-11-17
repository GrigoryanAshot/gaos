// Import Firebase functions (Firestore only - using Cloudinary for images)
import { 
  db, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy
} from './firebase-config.js';

// Cloudinary Configuration
// GET THESE FROM: https://console.cloudinary.com/
const CLOUDINARY_CLOUD_NAME = 'ddbbzjns1'; 
const CLOUDINARY_UPLOAD_PRESET = 'gaos_furniture'; 

// Cloudinary widget instance
let cloudinaryWidget = null;

// ======================
// FURNITURE ITEMS CRUD
// ======================

// Add New Furniture Item
export async function addFurnitureItem(itemData) {
  try {
    const docRef = await addDoc(collection(db, "furniture"), {
      nameEn: itemData.nameEn || '',
      nameHy: itemData.nameHy || '',
      nameRu: itemData.nameRu || '',
      category: itemData.category,
      type: itemData.type || '',
      typeEn: itemData.typeEn || '',
      typeHy: itemData.typeHy || '',
      typeRu: itemData.typeRu || '',
      price: itemData.price || null,
      descriptionEn: itemData.descriptionEn || '',
      descriptionHy: itemData.descriptionHy || '',
      descriptionRu: itemData.descriptionRu || '',
      dimensions: itemData.dimensions || '',
      material: itemData.material || '',
      mainImage: itemData.mainImage || '',
      galleryImages: itemData.galleryImages || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    });
    
    console.log("✅ Item added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Error adding item:", error);
    return { success: false, error: error.message };
  }
}

// Get All Furniture Items
export async function getAllFurniture() {
  try {
    const querySnapshot = await getDocs(collection(db, "furniture"));
    const items = [];
    
    querySnapshot.forEach((doc) => {
      items.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`✅ Retrieved ${items.length} items`);
    return items;
  } catch (error) {
    console.error("❌ Error getting items:", error);
    return [];
  }
}

// Get Furniture by Category
export async function getFurnitureByCategory(category) {
  try {
    const q = query(collection(db, "furniture"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const items = [];
    
    querySnapshot.forEach((doc) => {
      items.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`✅ Retrieved ${items.length} items in category: ${category}`);
    return items;
  } catch (error) {
    console.error("❌ Error getting items by category:", error);
    return [];
  }
}

// Get Single Furniture Item
export async function getFurnitureItem(itemId) {
  try {
    const items = await getAllFurniture();
    const item = items.find(i => i.id === itemId);
    return item || null;
  } catch (error) {
    console.error("❌ Error getting item:", error);
    return null;
  }
}

// Update Furniture Item
export async function updateFurnitureItem(itemId, updatedData) {
  try {
    const itemRef = doc(db, "furniture", itemId);
    await updateDoc(itemRef, {
      ...updatedData,
      updatedAt: new Date()
    });
    
    console.log("✅ Item updated:", itemId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating item:", error);
    return { success: false, error: error.message };
  }
}

// Delete Furniture Item
export async function deleteFurnitureItem(itemId) {
  try {
    // First get the item to log its images
    const item = await getFurnitureItem(itemId);
    
    if (item) {
      // Log images for manual deletion from Cloudinary if needed
      if (item.mainImage) {
        await deleteImageFromCloudinary(item.mainImage);
      }
      if (item.galleryImages && item.galleryImages.length > 0) {
        for (const imageUrl of item.galleryImages) {
          await deleteImageFromCloudinary(imageUrl);
        }
      }
    }
    
    // Delete the document from Firestore
    await deleteDoc(doc(db, "furniture", itemId));
    
    console.log("✅ Item deleted from database:", itemId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return { success: false, error: error.message };
  }
}

// ======================
// IMAGE UPLOAD - CLOUDINARY
// ======================

// Initialize Cloudinary Upload Widget
export function initCloudinaryWidget() {
  if (typeof cloudinary === 'undefined') {
    console.error('❌ Cloudinary library not loaded. Make sure to include the script in HTML.');
    return null;
  }
  
  cloudinaryWidget = cloudinary.createUploadWidget({
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    sources: ['local', 'url', 'camera'],
    multiple: false,
    maxFiles: 1,
    maxFileSize: 5000000, // 5MB
    clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
    folder: 'gaos-furniture',
    cropping: false,
    showSkipCropButton: true,
    styles: {
      palette: {
        window: "#FFFFFF",
        windowBorder: "#667eea",
        tabIcon: "#667eea",
        menuIcons: "#667eea",
        textDark: "#000000",
        textLight: "#FFFFFF",
        link: "#667eea",
        action: "#667eea",
        inactiveTabIcon: "#999999",
        error: "#F44235",
        inProgress: "#667eea",
        complete: "#43e97b",
        sourceBg: "#F4F4F5"
      }
    }
  }, (error, result) => {
    if (error) {
      console.error('❌ Cloudinary upload error:', error);
    }
  });
  
  return cloudinaryWidget;
}

// Upload Single Image using Cloudinary
export function uploadImageCloudinary(callback) {
  return new Promise((resolve, reject) => {
    if (!cloudinaryWidget) {
      cloudinaryWidget = initCloudinaryWidget();
    }
    
    if (!cloudinaryWidget) {
      reject(new Error('Cloudinary widget not initialized'));
      return;
    }
    
    // Open widget
    cloudinaryWidget.open();
    
    // Handle upload success
    cloudinaryWidget.on('success', (result) => {
      const imageUrl = result.info.secure_url;
      console.log('✅ Image uploaded to Cloudinary:', imageUrl);
      
      if (callback) callback(imageUrl);
      resolve({ success: true, url: imageUrl });
    });
    
    // Handle upload error
    cloudinaryWidget.on('error', (error) => {
      console.error('❌ Upload error:', error);
      reject({ success: false, error: error.message });
    });
  });
}

// Upload Multiple Images using Direct Upload
export async function uploadMultipleImagesCloudinary(files) {
  const urls = [];
  const errors = [];
  
  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'gaos-furniture');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      urls.push(data.secure_url);
      console.log('✅ Image uploaded:', data.secure_url);
      
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      errors.push(error.message);
    }
  }
  
  return { 
    success: errors.length === 0, 
    urls, 
    errors 
  };
}

// Delete Image from Cloudinary (optional - Cloudinary keeps images by default)
async function deleteImageFromCloudinary(imageUrl) {
  try {
    // Note: Deleting from Cloudinary requires admin API with secret key
    // For security, this should be done from a backend server
    // For now, we'll just log it
    console.log('ℹ️ Image URL removed from database:', imageUrl);
    console.log('💡 Tip: Delete unused images manually from Cloudinary dashboard');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ======================
// STATISTICS
// ======================

// Get Category Counts for Dashboard
export async function getCategoryCounts() {
  try {
    const allItems = await getAllFurniture();
    
    const counts = {
      total: allItems.length,
      new: 0,
      chairs: 0,
      'bar-chairs': 0,
      sofas: 0,
      tables: 0,
      outdoor: 0,
      'food-court': 0
    };
    
    allItems.forEach(item => {
      if (item.category && counts.hasOwnProperty(item.category)) {
        counts[item.category]++;
      }
    });
    
    console.log('✅ Category counts:', counts);
    return counts;
  } catch (error) {
    console.error('❌ Error getting counts:', error);
    return null;
  }
}

// ======================
// CATEGORIES MANAGEMENT
// ======================

// Add New Category
export async function addCategory(categoryData) {
  try {
    const docRef = await addDoc(collection(db, "categories"), {
      nameEn: categoryData.nameEn,
      nameHy: categoryData.nameHy,
      nameRu: categoryData.nameRu,
      slug: categoryData.slug,
      icon: categoryData.icon || 'fa-cube',
      iconImage: categoryData.iconImage || '',
      type: categoryData.type || '',
      descriptionEn: categoryData.descriptionEn || '',
      descriptionHy: categoryData.descriptionHy || '',
      descriptionRu: categoryData.descriptionRu || '',
      displayOrder: categoryData.displayOrder || 999,
      status: 'active',
      createdAt: new Date()
    });
    
    console.log("✅ Category added:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Error adding category:", error);
    return { success: false, error: error.message };
  }
}

// Get All Categories
export async function getAllCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    // Sort by display order
    categories.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
    
    return categories;
  } catch (error) {
    console.error("❌ Error getting categories:", error);
    return [];
  }
}

// Update Category
export async function updateCategory(categoryId, updatedData) {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, updatedData);
    
    console.log("✅ Category updated:", categoryId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return { success: false, error: error.message };
  }
}

// Delete Category
export async function deleteCategory(categoryId) {
  try {
    await deleteDoc(doc(db, "categories", categoryId));
    console.log("✅ Category deleted:", categoryId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return { success: false, error: error.message };
  }
}

// ======================
// SETTINGS MANAGEMENT
// ======================

// Update Site Settings
export async function updateSiteSettings(settings) {
  try {
    // Check if settings document exists
    const settingsSnapshot = await getDocs(collection(db, "settings"));
    
    if (settingsSnapshot.empty) {
      // Create new settings document
      await addDoc(collection(db, "settings"), {
        ...settings,
        updatedAt: new Date()
      });
    } else {
      // Update existing settings
      const settingsDoc = settingsSnapshot.docs[0];
      await updateDoc(doc(db, "settings", settingsDoc.id), {
        ...settings,
        updatedAt: new Date()
      });
    }
    
    console.log("✅ Settings updated");
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating settings:", error);
    return { success: false, error: error.message };
  }
}

// Get Site Settings
export async function getSiteSettings() {
  try {
    const querySnapshot = await getDocs(collection(db, "settings"));
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const settings = querySnapshot.docs[0].data();
    return settings;
  } catch (error) {
    console.error("❌ Error getting settings:", error);
    return null;
  }
}

// ======================
// TYPES MANAGEMENT
// ======================

// Add New Type
export async function addType(typeData) {
  try {
    const docRef = await addDoc(collection(db, "types"), {
      nameEn: typeData.nameEn || '',
      nameHy: typeData.nameHy || '',
      nameRu: typeData.nameRu || '',
      slug: typeData.slug || '',
      createdAt: new Date(),
      status: 'active'
    });
    
    console.log("✅ Type added:", docRef.id);
    return { success: true, id: docRef.id, data: { id: docRef.id, ...typeData } };
  } catch (error) {
    console.error("❌ Error adding type:", error);
    return { success: false, error: error.message };
  }
}

// Get All Types
export async function getAllTypes() {
  try {
    const querySnapshot = await getDocs(collection(db, "types"));
    const types = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'active') {
        types.push({ 
          id: doc.id, 
          ...data 
        });
      }
    });
    
    // Sort alphabetically by English name
    types.sort((a, b) => (a.nameEn || '').localeCompare(b.nameEn || ''));
    
    return types;
  } catch (error) {
    console.error("❌ Error getting types:", error);
    return [];
  }
}

// ======================
// SUBSCRIPTIONS CRUD
// ======================

// Add Subscription
export async function addSubscription(email) {
  try {
    // Check if email already exists
    const existingQuery = query(collection(db, "subscriptions"), where("email", "==", email));
    const existingDocs = await getDocs(existingQuery);
    
    if (!existingDocs.empty) {
      throw new Error("Email already subscribed");
    }
    
    const docRef = await addDoc(collection(db, "subscriptions"), {
      email: email,
      subscribedAt: new Date(),
      status: 'active'
    });
    
    console.log("✅ Subscription added:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding subscription:", error);
    throw error;
  }
}

// Get All Subscriptions
export async function getAllSubscriptions() {
  try {
    const q = query(collection(db, "subscriptions"), orderBy("subscribedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const subscriptions = [];
    querySnapshot.forEach((doc) => {
      subscriptions.push({
        id: doc.id,
        ...doc.data(),
        subscribedAt: doc.data().subscribedAt?.toDate ? doc.data().subscribedAt.toDate() : new Date(doc.data().subscribedAt)
      });
    });
    
    return subscriptions;
  } catch (error) {
    console.error("❌ Error getting subscriptions:", error);
    return [];
  }
}

// Export Subscriptions to Excel
export async function exportSubscriptionsToExcel() {
  try {
    const subscriptions = await getAllSubscriptions();
    
    // Create Excel data
    const excelData = subscriptions.map((sub, index) => ({
      'No.': index + 1,
      'Email': sub.email,
      'Subscribed Date': sub.subscribedAt.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }),
      'Subscribed Time': sub.subscribedAt.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      'Status': sub.status || 'active'
    }));
    
    return excelData;
  } catch (error) {
    console.error("❌ Error exporting subscriptions:", error);
    throw error;
  }
}

