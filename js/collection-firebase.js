/**
 * Firebase Integration for Collection Page
 * 
 * Loads categories and furniture items from Firebase
 * Replaces hardcoded galleryDatabase with dynamic data
 */

import { 
  db, 
  collection, 
  getDocs, 
  query, 
  where 
} from './firebase-config.js';

// Global variables
let galleryDatabase = {};
let categories = [];
let currentCategory = 'new';
let currentPage = 1;
const itemsPerPage = 20;
let isLoading = false;

// Get current language
function getCurrentLanguage() {
  const saved = localStorage.getItem('selectedLanguage') || 'hy';
  return saved;
}

// Load categories from Firebase
async function loadCategories() {
  try {
    console.log('📡 Loading categories from Firebase...');
    
    const querySnapshot = await getDocs(collection(db, "categories"));
    categories = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'active') {
        categories.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    // Sort by displayOrder
    categories.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
    
    console.log(`✅ Loaded ${categories.length} categories`);
    
    // Update category filter buttons
    updateCategoryFilters();
    
    // Update navbar category filters
    updateNavbarCategoryFilters();
    
    return categories;
  } catch (error) {
    console.error('❌ Error loading categories:', error);
    return [];
  }
}

// Update category filter buttons
function updateCategoryFilters() {
  const lang = getCurrentLanguage();
  
  categories.forEach(cat => {
    // Update main filter buttons
    const filterBtn = document.querySelector(`.label-gallery[data-filter=".${cat.slug}"]`);
    if (filterBtn) {
      const filterText = filterBtn.querySelector('.filter-text');
      if (filterText) {
        const name = cat[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || cat.nameEn || cat.slug;
        filterText.textContent = name;
      }
      
      // Update icon if available (use Cloudinary image)
      const filterIcon = filterBtn.querySelector('img.filter-icon');
      if (filterIcon && cat.iconImage) {
        filterIcon.src = cat.iconImage;
        filterIcon.alt = cat.nameEn || cat.slug;
        filterIcon.onerror = function() {
          // Fallback to local image if Cloudinary fails
          const localPaths = {
            'new': 'images/icons/furniture-new.jpg',
            'chairs': 'images/icons/furniture-chairs.jpg',
            'bar-chairs': 'images/icons/furniture-bar.jpg',
            'sofas': 'images/icons/furniture-sofas.jpg',
            'tables': 'images/icons/furniture-tables.jpg',
            'outdoor': 'images/icons/furniture-outdoor.jpg',
            'food-court': 'images/icons/furniture-food-court.jpg'
          };
          if (localPaths[cat.slug]) {
            this.src = localPaths[cat.slug];
          }
        };
      }
    }
    
    // Update navbar filters
    const navbarBtn = document.querySelector(`.navbar-filter-btn[data-filter=".${cat.slug}"]`);
    if (navbarBtn) {
      const name = cat[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || cat.nameEn || cat.slug;
      navbarBtn.textContent = name;
    }
  });
  
  console.log('✅ Category filters updated with Firebase data');
}

// Update navbar category filters
function updateNavbarCategoryFilters() {
  const lang = getCurrentLanguage();
  
  categories.forEach(cat => {
    const navbarBtn = document.querySelector(`.navbar-filter-btn[data-filter=".${cat.slug}"]`);
    if (navbarBtn) {
      const name = cat[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || cat.nameEn || cat.slug;
      navbarBtn.textContent = name;
    }
  });
}

// Load furniture items from Firebase
async function loadFurnitureItems() {
  try {
    console.log('📡 Loading furniture items from Firebase...');
    
    // Get current language at the START of the function to ensure we use the latest language
    const lang = getCurrentLanguage();
    console.log('🌍 Using language:', lang);
    
    const querySnapshot = await getDocs(collection(db, "furniture"));
    const items = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'active') {
        items.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    console.log(`✅ Loaded ${items.length} furniture items from Firebase`);
    
    // Log all items for debugging
    if (items.length > 0) {
      console.log('📦 Sample items:', items.slice(0, 3).map(item => ({
        id: item.id,
        category: item.category,
        nameEn: item.nameEn,
        nameHy: item.nameHy,
        nameRu: item.nameRu,
        typeEn: item.typeEn || '(no type)',
        typeHy: item.typeHy || '(no type)',
        typeRu: item.typeRu || '(no type)',
        hasImage: !!item.mainImage
      })));
    }
    
    // Organize by category
    galleryDatabase = {};
    items.forEach(item => {
      const category = item.category || 'new';
      if (!galleryDatabase[category]) {
        galleryDatabase[category] = [];
      }
      
      // Use the language we got at the start of the function
      const mainImage = item.mainImage && item.mainImage.trim() ? item.mainImage : 'images/placeholder.jpg';
      const nameField = `name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`;
      const title = item[nameField] || item.nameEn || item.nameHy || item.nameRu || 'Untitled';
      
      // Get type in current language (works for ALL categories)
      const typeField = `type${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`;
      const type = item[typeField] || item.typeEn || item.typeHy || item.typeRu || '';
      
      // Get creation date for sorting (newest first)
      const createdAt = item.createdAt ? (item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt)) : new Date(0);
      
      galleryDatabase[category].push({
        id: item.id,
        image: mainImage,
        title: title,
        description: type, // Use type as description (same for all categories)
        category: category,
        type: type, // Also store type separately for debugging
        createdAt: createdAt // Store for sorting
      });
    });
    
    // Sort items in each category by creation date (newest first)
    Object.keys(galleryDatabase).forEach(category => {
      galleryDatabase[category].sort((a, b) => {
        const dateA = a.createdAt || new Date(0);
        const dateB = b.createdAt || new Date(0);
        return dateB - dateA; // Descending order (newest first)
      });
    });
    
    // Make galleryDatabase available globally
    window.galleryDatabase = galleryDatabase;
    
    // Log category counts for debugging
    console.log('✅ Gallery database organized:', Object.keys(galleryDatabase).length, 'categories');
    Object.keys(galleryDatabase).forEach(cat => {
      const itemsInCategory = galleryDatabase[cat];
      const itemsWithType = itemsInCategory.filter(item => item.description && item.description.trim()).length;
      console.log(`  - ${cat}: ${itemsInCategory.length} items (${itemsWithType} with type)`);
    });
    
    // Render initial category
    renderGalleryItems(currentCategory);
    
    return galleryDatabase;
  } catch (error) {
    console.error('❌ Error loading furniture items:', error);
    return {};
  }
}

// Show loading state
function showGalleryLoading() {
  const galleryContainer = $('.wrap-gallery');
  if (!galleryContainer.length) return;
  
  galleryContainer.html(`
    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; width: 100%;">
      <div class="loading-spinner" style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <h3 style="color: #666; margin-bottom: 10px; font-size: 18px;">Loading items...</h3>
      <p style="color: #999; font-size: 14px;">Please wait while we search for items in this category.</p>
    </div>
  `);
}

// Show no items state
function showGalleryNoItems() {
  const galleryContainer = $('.wrap-gallery');
  if (!galleryContainer.length) return;
  
  galleryContainer.html(`
    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
      <i class="fa fa-inbox" style="font-size: 64px; color: #e0e0e0; margin-bottom: 20px;"></i>
      <h3 style="color: #666; margin-bottom: 10px;">No items found</h3>
      <p style="color: #999;">No furniture items in this category yet.</p>
    </div>
  `);
}

// Render gallery items (updated to work with Firebase data)
function renderGalleryItems(category, page = 1, append = false) {
  // Wait for jQuery
  if (typeof $ === 'undefined') {
    setTimeout(() => renderGalleryItems(category, page, append), 100);
    return;
  }
  
  const galleryContainer = $('.wrap-gallery');
  
  if (!galleryContainer.length) {
    console.warn('Gallery container not found');
    return;
  }
  
  // If not appending, clear existing items and reset pagination
  if (!append) {
    // Show loading state immediately when switching categories
    showGalleryLoading();
    currentPage = 1;
    currentCategory = category;
    $('.completion-message').remove();
    $('.loading-indicator').remove();
    
    // Use a small delay to ensure loading state is visible, then check for items
    setTimeout(() => {
      // Ensure gallery container has proper CSS
      galleryContainer.attr('style', 'display: flex !important; flex-wrap: wrap !important; justify-content: center !important; gap: 20px !important; padding: 20px !important; min-height: auto !important; height: auto !important;');
      
      // Use window.galleryDatabase (from Firebase or fallback)
      const db = window.galleryDatabase || galleryDatabase;
      const items = db[category] || [];
      
      console.log(`📊 Rendering category "${category}": ${items.length} items found`);
      console.log('📂 Available categories in database:', Object.keys(db));
      
      // Calculate items to show
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToShow = items.slice(startIndex, endIndex);
      
      console.log(`📄 Showing items ${startIndex + 1}-${Math.min(endIndex, items.length)} of ${items.length}`);
      
      // Clear loading state before rendering
      galleryContainer.empty();
      
      // If no items after search, show "No items" message
      if (items.length === 0) {
        console.warn(`⚠️ No items found for category "${category}"`);
        showGalleryNoItems();
        return;
      }
      
      // Render items
      if (itemsToShow.length > 0) {
        console.log('🎨 First item to show:', itemsToShow[0]);
        renderItemsToGallery(galleryContainer, itemsToShow, category);
      } else {
        // This shouldn't happen if items.length > 0, but just in case
        showGalleryNoItems();
      }
    }, 50); // Small delay to show loading state
    return;
  }
  
  // For append mode (loading more items), render directly
  const db = window.galleryDatabase || galleryDatabase;
  const items = db[category] || [];
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);
  
  renderItemsToGallery(galleryContainer, itemsToShow, category);
  
  // Update current page
  currentPage = page;
}

// Helper function to render items to gallery
function renderItemsToGallery(galleryContainer, itemsToShow, category) {
  itemsToShow.forEach(function(item, index) {
    console.log(`  - Item ${index + 1}: ${item.title} (${item.image})`);
    const galleryItem = `
      <div class="item-gallery isotope-item ${category}" style="display: flex !important; flex-direction: column !important; width: 300px !important; height: 375px !important; margin: 10px auto !important; border: 2px solid #ccc !important; background: white !important; align-items: center !important; justify-content: flex-start !important; padding: 0 !important;">
        <div class="gallery-image-container" style="width: 100% !important; height: 300px !important; overflow: hidden !important; display: flex !important; align-items: center !important; justify-content: center !important;">
          <img src="${item.image}" alt="${item.title}" style="width: 100% !important; height: 100% !important; object-fit: cover !important;" onerror="this.src='images/placeholder.jpg'">
        </div>
        <div class="gallery-text" style="width: 100% !important; padding: 10px 5px !important; text-align: left !important; display: block !important; flex-grow: 1 !important;">
          <h4 style="margin: 0 !important; font-size: 16px !important;">${item.title}</h4>
          ${item.description ? `<p style="margin: 5px 0 0 0 !important; font-size: 14px !important;">${item.description}</p>` : ''}
        </div>
      </div>
    `;
    galleryContainer.append(galleryItem);
  });
  console.log(`✅ Successfully rendered ${itemsToShow.length} items in container`);
}

// Load more items
function loadMoreItems() {
  if (isLoading) return;
  
  // Use window.galleryDatabase (from Firebase or fallback)
  const db = window.galleryDatabase || galleryDatabase;
  const items = db[currentCategory] || [];
  const totalItems = items.length;
  const currentItems = $('.item-gallery').length;
  
  // Check if there are more items to load
  if (currentItems < totalItems) {
    isLoading = true;
    
    // Add loading indicator
    var loadingIndicator = '<div class="loading-indicator" style="width: 100%; text-align: center; padding: 20px; font-size: 16px; color: #666; position: relative; z-index: 10;">բեռնվում են նոր ապրանքներ․․․</div>';
    $('.gallery-main-container').append(loadingIndicator);
    
    // Simulate loading delay
    setTimeout(function() {
      $('.loading-indicator').remove();
      renderGalleryItems(currentCategory, currentPage + 1, true);
      isLoading = false;
    }, 500);
  } else {
    // All items loaded
    if (!$('.completion-message').length) {
      var completionMessage = '<div class="completion-message" style="width: 100%; text-align: center; padding: 20px; font-size: 16px; color: #888; font-style: italic; position: relative; z-index: 10;">Բոլոր ապրանքները բեռնված են</div>';
      $('.gallery-main-container').append(completionMessage);
    }
  }
}

// Track current language to detect changes
let currentLanguage = getCurrentLanguage();

// Remove aggressive polling - rely on localStorage.setItem override and storage events instead
// This was causing constant reloads every 100ms
// const languagePollingInterval = setInterval(function() {
//   const savedLanguage = getCurrentLanguage();
//   if (savedLanguage !== currentLanguage) {
//     console.log('🌐 Language changed detected via early polling:', savedLanguage);
//     if (window.reloadItemsForNewLanguage) {
//       window.reloadItemsForNewLanguage(savedLanguage);
//     }
//   }
// }, 100);

// Prevent duplicate reloads
let isReloading = false;

// Function to reload items with new language (make it globally available)
window.reloadItemsForNewLanguage = async function(newLanguage) {
  // Prevent duplicate calls
  if (isReloading) {
    console.log('⏳ Reload already in progress, skipping...');
    return;
  }
  
  if (newLanguage !== currentLanguage) {
    isReloading = true;
    console.log('🌐 Reloading items for language:', newLanguage, '(was:', currentLanguage + ')');
    // Update currentLanguage BEFORE loading to ensure correct language is used
    currentLanguage = newLanguage;
    try {
      // Show loading indicator and clear gallery
      const galleryContainer = $('.wrap-gallery');
      if (galleryContainer.length) {
        galleryContainer.html('<div id="language-refresh-loader" style="width: 100%; text-align: center; padding: 40px; color: #666; font-size: 16px;">🔄 Refreshing items...</div>');
      }
      
      // Force reload items with new language (this will use getCurrentLanguage() which reads from localStorage)
      await loadFurnitureItems(); // Reload items with new language
      
      // Re-render immediately after loading (renderGalleryItems will clear the loader)
      renderGalleryItems(currentCategory); // Re-render current category
      console.log('✅ Items reloaded and re-rendered successfully for language:', newLanguage);
      
      // Log sample to verify language change
      const db = window.galleryDatabase || galleryDatabase;
      const items = db[currentCategory] || [];
      if (items.length > 0) {
        console.log('🔍 Sample item after refresh:', {
          title: items[0].title,
          description: items[0].description,
          type: items[0].type,
          language: newLanguage
        });
      }
      
      isReloading = false;
    } catch (error) {
      console.error('❌ Error reloading items:', error);
      $('#language-refresh-loader').remove();
      isReloading = false;
    }
  } else {
    console.log('⚠️ Language unchanged, skipping reload');
  }
};

const reloadItemsForNewLanguage = window.reloadItemsForNewLanguage;

// Set up language change detection BEFORE page initialization
// Override localStorage.setItem to detect language changes on same page
const originalSetItem = Storage.prototype.setItem;
let languageChangeTimeout = null;
Storage.prototype.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'selectedLanguage') {
    const newLang = value;
    console.log('🔍 localStorage.setItem called for selectedLanguage:', newLang);
    // Clear any pending timeout to avoid double calls
    if (languageChangeTimeout) {
      clearTimeout(languageChangeTimeout);
    }
    // Use a small delay to ensure the value is actually set
    languageChangeTimeout = setTimeout(() => {
      const savedLang = getCurrentLanguage();
      if (savedLang !== currentLanguage) {
        console.log('🌐 Language changed via localStorage.setItem:', savedLang);
        if (window.reloadItemsForNewLanguage) {
          window.reloadItemsForNewLanguage(savedLang);
        }
      }
    }, 100);
  }
};

// Listen for custom language change event globally (before page init)
let languageChangeEventTimeout = null;
window.addEventListener('languageChanged', async function(e) {
  console.log('📥 Language change event received:', e.detail);
  if (e.detail && e.detail.language) {
    const newLanguage = e.detail.language;
    // Clear any pending timeout to avoid double calls
    if (languageChangeEventTimeout) {
      clearTimeout(languageChangeEventTimeout);
    }
    // Small delay to ensure localStorage is updated
    languageChangeEventTimeout = setTimeout(async () => {
      if (window.reloadItemsForNewLanguage) {
        await window.reloadItemsForNewLanguage(newLanguage);
      }
    }, 150);
  }
}, true);

// Initialize when DOM is ready
async function initializeCollectionPage() {
  console.log('🚀 Initializing collection page with Firebase...');
  
  try {
    // Wait for jQuery to be ready
    if (typeof $ === 'undefined') {
      setTimeout(initializeCollectionPage, 100);
      return;
    }
    
    // Load categories and items from Firebase
    await loadCategories();
    await loadFurnitureItems();
    
    // Also listen for localStorage changes (cross-tab changes)
    window.addEventListener('storage', async function(e) {
      if (e.key === 'selectedLanguage' && e.newValue !== currentLanguage) {
        console.log('🌐 Language changed via storage event:', e.newValue);
        if (window.reloadItemsForNewLanguage) {
          await window.reloadItemsForNewLanguage(e.newValue);
        }
      }
    });
    
    // Language change detection is handled via localStorage.setItem override and storage events
    // Polling removed to prevent constant reloads
    
    // Override filter button functionality
    $('.label-gallery').off('click').on('click', function() {
      // Remove active class from all buttons
      $('.label-gallery').removeClass('is-actived');
      // Add active class to clicked button
      $(this).addClass('is-actived');
      
      // Get filter value
      var filterValue = $(this).attr('data-filter');
      var category = filterValue.replace('.', '');
      
      // Update URL hash
      if (category !== 'new') {
        window.location.hash = category;
      } else {
        window.location.hash = '';
      }
      
      // Synchronize navbar dropdown
      $('.navbar-category-filters .navbar-filter-btn').removeClass('is-active');
      $('.navbar-category-filters .navbar-filter-btn[data-filter="' + filterValue + '"]').addClass('is-active');
      
      // Update current category
      currentCategory = category;
      
      // Render items for selected category
      renderGalleryItems(category);
    });
    
    // Handle navbar category filters
    $('.navbar-category-filters .navbar-filter-btn').off('click').on('click', function() {
      $('.navbar-category-filters .navbar-filter-btn').removeClass('is-active');
      $(this).addClass('is-active');
      
      var filter = $(this).data('filter');
      var category = filter.replace('.', '');
      
      // Update URL hash
      if (category !== 'new') {
        window.location.hash = category;
      } else {
        window.location.hash = '';
      }
      
      // Scroll to gallery
      $('html, body').animate({
        scrollTop: 400
      }, 800);
      
      // Update current category
      currentCategory = category;
      
      // Trigger main filter
      $('.filter-buttons-wrapper .label-gallery[data-filter="' + filter + '"]').click();
    });
    
    // Handle URL hash for category navigation
    var urlHash = window.location.hash.substring(1);
    var hashToCategoryMap = {
      'chairs': 'chairs',
      'bar-chairs': 'bar-chairs',
      'sofas': 'sofas',
      'tables': 'tables',
      'outdoor': 'outdoor',
      'food-court': 'food-court',
      'new': 'new'
    };
    
    if (urlHash && hashToCategoryMap[urlHash]) {
      currentCategory = hashToCategoryMap[urlHash];
      
      // Activate the corresponding filter button
      $('.label-gallery').removeClass('is-actived');
      $('.label-gallery[data-filter=".' + currentCategory + '"]').addClass('is-actived');
      
      // Synchronize navbar dropdown
      $('.navbar-category-filters .navbar-filter-btn').removeClass('is-active');
      $('.navbar-category-filters .navbar-filter-btn[data-filter=".' + currentCategory + '"]').addClass('is-active');
    }
    
    // Also listen for hash changes
    $(window).on('hashchange', function() {
      var newHash = window.location.hash.substring(1);
      if (newHash && hashToCategoryMap[newHash]) {
        currentCategory = hashToCategoryMap[newHash];
        
        // Activate the corresponding filter button
        $('.label-gallery').removeClass('is-actived');
        $('.label-gallery[data-filter=".' + currentCategory + '"]').addClass('is-actived');
        
        // Synchronize navbar dropdown
        $('.navbar-category-filters .navbar-filter-btn').removeClass('is-active');
        $('.navbar-category-filters .navbar-filter-btn[data-filter=".' + currentCategory + '"]').addClass('is-active');
        
        // Render items
        renderGalleryItems(currentCategory);
      }
    });
    
    // Initialize with selected category
    console.log('🎯 Initializing with category:', currentCategory);
    renderGalleryItems(currentCategory);
    
    // Infinite scroll
    $(window).off('scroll.collection').on('scroll.collection', function() {
      var windowHeight = $(window).height();
      var documentHeight = $(document).height();
      var scrollTop = $(window).scrollTop();
      
      var currentItems = $('.item-gallery').length;
      var totalItems = window.galleryDatabase && window.galleryDatabase[currentCategory] ? window.galleryDatabase[currentCategory].length : 0;
      
      if (currentItems >= totalItems) {
        return;
      }
      
      if (currentItems < itemsPerPage) {
        return;
      }
      
      var distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      
      if (distanceFromBottom <= 600) {
        loadMoreItems();
      }
    });
    
    console.log('✅ Collection page initialized with Firebase!');
    
  } catch (error) {
    console.error('❌ Error initializing collection page:', error);
  }
}

// Force reload function (can be called from console)
window.reloadCollectionItems = async function() {
  console.log('🔄 Force reloading collection items...');
  await loadFurnitureItems();
  renderGalleryItems(currentCategory);
};

// Test language reload function (can be called from console)
window.testLanguageReload = async function(lang) {
  console.log('🧪 Testing language reload with:', lang);
  if (window.reloadItemsForNewLanguage) {
    await window.reloadItemsForNewLanguage(lang);
  } else {
    console.error('❌ reloadItemsForNewLanguage function not available');
  }
};

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCollectionPage);
} else {
  // DOM already ready
  setTimeout(initializeCollectionPage, 500); // Small delay to ensure jQuery is loaded
}

// Export for use in other scripts
window.loadFurnitureItems = loadFurnitureItems;
window.loadCategories = loadCategories;
window.renderGalleryItems = renderGalleryItems;
window.galleryDatabase = galleryDatabase;

