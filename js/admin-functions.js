// Import database functions
import {
  addFurnitureItem,
  getAllFurniture,
  getFurnitureByCategory,
  getFurnitureItem,
  updateFurnitureItem,
  deleteFurnitureItem,
  initCloudinaryWidget,
  uploadImageCloudinary,
  uploadMultipleImagesCloudinary,
  getCategoryCounts,
  getAllCategories,
  addCategory,
  updateCategory,
  addType,
  getAllTypes,
  updateSiteSettings,
  getSiteSettings,
  getAllSubscriptions,
  exportSubscriptionsToExcel
} from './admin-database.js';

// Global variables
let currentDeleteId = null;
let currentEditId = null;
let uploadedMainImage = '';
let uploadedGalleryImages = [];
let currentFilter = 'all';
let currentCategoryEditId = null;
let currentCategoryImageUrl = '';
let currentAddCategoryImageUrl = '';

// ======================
// INITIALIZE
// ======================

document.addEventListener('DOMContentLoaded', async function() {
  console.log('🚀 Initializing admin panel...');
  
  // Initialize Cloudinary Widget
  initCloudinaryWidget();
  
  // Load dashboard statistics
  await loadDashboardCounts();
  
  // Load subscriptions count
  await loadSubscriptionsCount();
  
  // Load furniture items
  await loadFurnitureItems('all');
  
  // Load categories for dashboard images (non-blocking)
  loadDashboardCategories().catch(err => {
    console.error('Error loading category images:', err);
  });
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup Add Category Modal (extends openModal)
  setupAddCategoryModal();
  
  // Setup subscriptions listeners
  setupSubscriptionsListeners();
  
  console.log('✅ Admin panel initialized');
});

// ======================
// DASHBOARD
// ======================

async function loadDashboardCounts() {
  try {
    const counts = await getCategoryCounts();
    
    if (counts) {
      // Update stat cards using IDs for precise targeting
      const updateStat = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
          element.textContent = value || 0;
        }
      };
      
      // Update each stat card by ID
      updateStat('stat-total', counts.total);
      updateStat('stat-new', counts.new);
      updateStat('stat-chairs', counts.chairs);
      updateStat('stat-bar-chairs', counts['bar-chairs']);
      updateStat('stat-sofas', counts.sofas);
      updateStat('stat-tables', counts.tables);
      updateStat('stat-outdoor', counts.outdoor);
      updateStat('stat-food-court', counts['food-court']);
      
      console.log('✅ Dashboard counts updated:', counts);
    } else {
      console.warn('⚠️ No counts returned from getCategoryCounts()');
    }
  } catch (error) {
    console.error('❌ Error loading dashboard:', error);
  }
}

// Load categories and update dashboard with images
async function loadDashboardCategories() {
  try {
    const categories = await getAllCategories();
    
    // Map of category slugs to their icon images
    const categoryImageMap = {};
    categories.forEach(cat => {
      if (cat.iconImage) {
        categoryImageMap[cat.slug] = cat.iconImage;
      }
    });
    
    // Fallback local images
    const localImagePaths = {
      'chairs': 'images/icons/furniture-chairs.jpg',
      'bar-chairs': 'images/icons/furniture-bar.jpg',
      'sofas': 'images/icons/furniture-sofas.jpg',
      'tables': 'images/icons/furniture-tables.jpg',
      'outdoor': 'images/icons/furniture-outdoor.jpg',
      'food-court': 'images/icons/furniture-food-court.jpg',
      'new': 'images/icons/furniture-new.jpg'
    };
    
    // Update each category card with image
    const categorySlugs = ['chairs', 'bar-chairs', 'sofas', 'tables', 'outdoor', 'food-court'];
    
    categorySlugs.forEach(slug => {
      const categoryIcon = document.querySelector(`.category-icon.${slug}`);
      if (categoryIcon) {
        const imageUrl = categoryImageMap[slug] || localImagePaths[slug];
        
        if (imageUrl) {
          // Store original icon as fallback
          const originalIcon = categoryIcon.querySelector('i');
          const originalIconClass = originalIcon ? originalIcon.className : 'fa fa-cube';
          
          // Replace icon with image
          categoryIcon.innerHTML = `<img src="${imageUrl}" alt="${slug}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\'${originalIconClass}\'></i>'">`;
        }
      }
    });
    
    console.log('✅ Dashboard category images loaded');
  } catch (error) {
    console.error('❌ Error loading dashboard categories:', error);
  }
}

// ======================
// FURNITURE ITEMS
// ======================

async function loadFurnitureItems(category = 'all') {
  try {
    currentFilter = category;
    
    // Show loading
    showLoading();
    
    // Get items
    const items = category === 'all' 
      ? await getAllFurniture() 
      : await getFurnitureByCategory(category);
    
    // Display items
    displayFurnitureItems(items);
    
    // Hide loading
    hideLoading();
    
    console.log(`✅ Loaded ${items.length} items for category: ${category}`);
  } catch (error) {
    console.error('❌ Error loading items:', error);
    hideLoading();
    showNotification('Error loading items: ' + error.message, 'error');
  }
}

function displayFurnitureItems(items) {
  const grid = document.querySelector('.items-grid');
  
  if (!grid) {
    console.warn('Items grid not found');
    return;
  }
  
  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <i class="fa fa-inbox" style="font-size: 64px; color: #e0e0e0; margin-bottom: 20px;"></i>
        <h3 style="color: #666; margin-bottom: 10px;">No items found</h3>
        <p style="color: #999;">Click "Add New Item" to create your first furniture item.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = '';
  
  items.forEach(item => {
    const card = createItemCard(item);
    grid.appendChild(card);
  });
}

function createItemCard(item) {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.dataset.itemId = item.id;
  
  // Get current language
  const lang = localStorage.getItem('adminSelectedLanguage') || 'hy';
  const itemName = item[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || item.nameEn || 'Untitled';
  
  card.innerHTML = `
    <img src="${item.mainImage || 'images/placeholder.jpg'}" alt="${itemName}" class="item-image" onerror="this.src='images/placeholder.jpg'">
    <div class="item-details">
      <h3 class="item-name" title="${itemName}">${itemName}</h3>
      <span class="item-category">${getCategoryLabel(item.category)}</span>
      <div class="item-actions">
        <button class="btn-icon btn-edit" onclick="editItem('${item.id}')">
          <i class="fa fa-edit"></i> <span data-translate="Edit">Edit</span>
        </button>
        <button class="btn-icon btn-delete" onclick="confirmDeleteItem('${item.id}')">
          <i class="fa fa-trash"></i> <span data-translate="Delete">Delete</span>
        </button>
      </div>
    </div>
  `;
  
  return card;
}

function getCategoryLabel(category) {
  const labels = {
    'new': 'Նորույթներ',
    'chairs': 'Աթոռներ',
    'bar-chairs': 'Բարի աթոռներ',
    'sofas': 'Բազմոց-Բազկաթոռ',
    'tables': 'Սեղաններ',
    'outdoor': 'Դրսի կահույք',
    'food-court': 'Ֆուդ կորտի'
  };
  return labels[category] || category;
}

// ======================
// ADD ITEM
// ======================

async function handleAddItem(formData) {
  try {
    showLoading();
    
    // Get category from current filter (not from form)
    const category = currentFilter !== 'all' ? currentFilter : 'new';
    
    // Check if should add to "new" category
    const addToNew = document.getElementById('add-item-to-new')?.checked;
    
    // Get single name and use it for all languages
    const itemName = formData.get('name') || '';
    
    // Get descriptions if checkbox is checked
    const hasDescCheckbox = document.getElementById('add-item-has-description');
    const hasDescription = hasDescCheckbox ? hasDescCheckbox.checked : false;
    
    const itemData = {
      nameEn: itemName,
      nameHy: itemName,
      nameRu: itemName,
      category: category, // IMPORTANT: Keep category from currentFilter
      mainImage: uploadedMainImage,
      galleryImages: []
    };
    
    if (hasDescription) {
      const descEn = document.getElementById('add-item-description-en');
      const descHy = document.getElementById('add-item-description-hy');
      const descRu = document.getElementById('add-item-description-ru');
      itemData.descriptionEn = descEn ? descEn.value : '';
      itemData.descriptionHy = descHy ? descHy.value : '';
      itemData.descriptionRu = descRu ? descRu.value : '';
    }
    
    // Save item with correct category
    const result = await addFurnitureItem(itemData);
    
    // If checkbox is checked and category is not "new", create a SEPARATE item in "new" category
    // This ensures items stay in their assigned categories
    if (result.success && addToNew && category !== 'new') {
      const newItemData = {
        ...itemData,
        category: 'new' // Create separate item for "new" category
      };
      await addFurnitureItem(newItemData);
    }
    
    hideLoading();
    
    if (result.success) {
      showNotification('Item added successfully! ✅', 'success');
      closeModal('add-item-modal');
      
      // Reset form and images
      document.querySelector('#add-item-modal form').reset();
      uploadedMainImage = '';
      uploadedGalleryImages = [];
      // Reset description fields
      const hasDescCheckbox = document.getElementById('add-item-has-description');
      const descContainer = document.getElementById('add-item-description-container');
      if (hasDescCheckbox) hasDescCheckbox.checked = false;
      if (descContainer) descContainer.style.display = 'none';
      const descEn = document.getElementById('add-item-description-en');
      const descHy = document.getElementById('add-item-description-hy');
      const descRu = document.getElementById('add-item-description-ru');
      if (descEn) descEn.value = '';
      if (descHy) descHy.value = '';
      if (descRu) descRu.value = '';
      
      // Reload items and dashboard
      await loadFurnitureItems(currentFilter);
      await loadDashboardCounts();
    } else {
      showNotification('Error adding item: ' + result.error, 'error');
    }
  } catch (error) {
    hideLoading();
    console.error('❌ Error in handleAddItem:', error);
    showNotification('Error adding item: ' + error.message, 'error');
  }
}

// ======================
// EDIT ITEM
// ======================

async function handleEditItem(formData) {
  if (!currentEditId) return;
  try {
    showLoading();

    // Read from simplified form fields
    const nameSingle = (document.getElementById('edit-item-name') || {}).value || '';
    const hasDescCheckbox = document.getElementById('edit-item-has-description');
    const hasDescription = hasDescCheckbox ? hasDescCheckbox.checked : false;

    if (!nameSingle) {
      hideLoading();
      showNotification('Please enter item name', 'error');
      return;
    }

    const updatedData = {
      nameEn: nameSingle,
      nameHy: nameSingle,
      nameRu: nameSingle,
    };

    if (hasDescription) {
      const descEn = document.getElementById('edit-item-description-en');
      const descHy = document.getElementById('edit-item-description-hy');
      const descRu = document.getElementById('edit-item-description-ru');
      updatedData.descriptionEn = descEn ? descEn.value : '';
      updatedData.descriptionHy = descHy ? descHy.value : '';
      updatedData.descriptionRu = descRu ? descRu.value : '';
    } else {
      // Clear descriptions if unchecked
      updatedData.descriptionEn = '';
      updatedData.descriptionHy = '';
      updatedData.descriptionRu = '';
    }

    // Only include mainImage if uploaded in this session
    if (uploadedMainImage) {
      updatedData.mainImage = uploadedMainImage;
    }

    const result = await updateFurnitureItem(currentEditId, updatedData);

    hideLoading();

    if (result.success) {
      showNotification('Item updated successfully! ✅', 'success');
      closeModal('edit-item-modal');
      currentEditId = null;

      // Reload items
      await loadFurnitureItems(currentFilter);
    } else {
      showNotification('Error updating item: ' + result.error, 'error');
    }
  } catch (error) {
    hideLoading();
    console.error('❌ Error in handleEditItem:', error);
    showNotification('Error updating item: ' + error.message, 'error');
  }
}

// Override editItem to populate simplified modal
window.editItem = async function(itemId) {
  try {
    showLoading('Loading item...');
    currentEditId = itemId;

    // Fetch item details
    const item = await getFurnitureItem(itemId);

    if (!item) {
      hideLoading();
      showNotification('Item not found', 'error');
      return;
    }

    // Populate fields
    const preview = document.getElementById('edit-item-image-preview');
    if (preview) {
      const src = item.mainImage || '';
      if (src) {
        preview.src = src;
        preview.style.display = 'inline-block';
      } else {
        preview.style.display = 'none';
      }
    }

    const nameInput = document.getElementById('edit-item-name');
    if (nameInput) {
      nameInput.value = item.nameEn || item.nameHy || item.nameRu || '';
    }
    
    // Populate descriptions
    const hasDescCheckbox = document.getElementById('edit-item-has-description');
    const descContainer = document.getElementById('edit-item-description-container');
    const hasDescription = item.descriptionEn || item.descriptionHy || item.descriptionRu;
    
    if (hasDescCheckbox) {
      hasDescCheckbox.checked = !!hasDescription;
      if (descContainer) {
        descContainer.style.display = hasDescription ? 'block' : 'none';
      }
    }
    
    const dEn = document.getElementById('edit-item-description-en');
    const dHy = document.getElementById('edit-item-description-hy');
    const dRu = document.getElementById('edit-item-description-ru');
    if (dEn) dEn.value = item.descriptionEn || '';
    if (dHy) dHy.value = item.descriptionHy || '';
    if (dRu) dRu.value = item.descriptionRu || '';
    
    // Setup description checkbox toggle
    if (hasDescCheckbox) {
      const newCheckbox = hasDescCheckbox.cloneNode(true);
      hasDescCheckbox.parentNode.replaceChild(newCheckbox, hasDescCheckbox);
      newCheckbox.addEventListener('change', function() {
        const container = document.getElementById('edit-item-description-container');
        if (container) {
          container.style.display = this.checked ? 'block' : 'none';
        }
      });
    }

    // Reset uploaded images for new edit session
    uploadedMainImage = '';

    hideLoading();
    openModal('edit-item-modal');
  } catch (error) {
    hideLoading();
    console.error('❌ Error editing item:', error);
    showNotification('Error loading item: ' + error.message, 'error');
  }
}

// Bind new save button
;(function bindEditItemSimpleSave(){
  document.addEventListener('click', function(e){
    if (e.target && (e.target.id === 'save-item-simple-btn' || e.target.closest('#save-item-simple-btn'))) {
      e.preventDefault();
      handleEditItem(new FormData());
    }
  });
})();

// ======================
// DELETE ITEM
// ======================

window.confirmDeleteItem = function(itemId) {
  currentDeleteId = itemId;
  openModal('delete-modal');
}

async function handleDeleteItem() {
  if (!currentDeleteId) return;
  
  try {
    showLoading();
    
    const result = await deleteFurnitureItem(currentDeleteId);
    
    hideLoading();
    
    if (result.success) {
      showNotification('Item deleted successfully! ✅', 'success');
      closeModal('delete-modal');
      currentDeleteId = null;
      
      // Reload items and dashboard
      await loadFurnitureItems(currentFilter);
      await loadDashboardCounts();
    } else {
      showNotification('Error deleting item: ' + result.error, 'error');
    }
  } catch (error) {
    hideLoading();
    console.error('❌ Error in handleDeleteItem:', error);
    showNotification('Error deleting item: ' + error.message, 'error');
  }
}

// ======================
// IMAGE UPLOAD - CLOUDINARY
// ======================

async function handleImageUpload(event, isGallery = false) {
  console.log('🎬 handleImageUpload called', { isGallery, filesCount: event.target.files.length });
  
  const files = event.target.files;
  
  if (!files || files.length === 0) {
    console.warn('⚠️ No files selected');
    return;
  }
  
  try {
    console.log('📤 Starting upload to Cloudinary...');
    showLoading('Uploading image to Cloudinary...');
    
    if (isGallery) {
      console.log('📸 Uploading gallery images:', files.length);
      // Upload multiple images directly to Cloudinary
      const result = await uploadMultipleImagesCloudinary(Array.from(files));
      
      console.log('📥 Gallery upload result:', result);
      
      if (result.success) {
        uploadedGalleryImages = [...uploadedGalleryImages, ...result.urls];
        console.log('✅ Gallery images uploaded. Total:', uploadedGalleryImages.length);
        showNotification(`${result.urls.length} image(s) uploaded to Cloudinary! ✅`, 'success');
        
        // Update label
        const label = event.target.closest('.file-upload-label');
        if (label) {
          const textDiv = label.querySelector('div');
          if (textDiv) {
            textDiv.innerHTML = `<strong>${uploadedGalleryImages.length} image(s) uploaded ✓</strong>`;
          }
        }
      } else {
        console.error('❌ Gallery upload failed:', result.errors);
        showNotification('Error uploading images: ' + result.errors.join(', '), 'error');
      }
    } else {
      console.log('🖼️ Uploading single main image:', files[0].name);
      // Upload single image directly to Cloudinary
      const result = await uploadMultipleImagesCloudinary([files[0]]);
      
      console.log('📥 Main image upload result:', result);
      
      if (result.success && result.urls.length > 0) {
        uploadedMainImage = result.urls[0];
        console.log('✅ Main image uploaded:', uploadedMainImage);
        showNotification('Main image uploaded to Cloudinary! ✅', 'success');
        
        // Update label
        const label = event.target.closest('.file-upload-label');
        if (label) {
          const textDiv = label.querySelector('div');
          if (textDiv) {
            textDiv.innerHTML = `<strong>Image uploaded ✓</strong>`;
          }
        }
      } else {
        console.error('❌ Main image upload failed:', result.errors);
        showNotification('Error uploading image: ' + (result.errors[0] || 'Unknown error'), 'error');
      }
    }
    
    hideLoading();
  } catch (error) {
    hideLoading();
    console.error('❌ Exception in handleImageUpload:', error);
    showNotification('Error uploading image: ' + error.message, 'error');
  }
}

// ======================
// EVENT LISTENERS
// ======================

function setupEventListeners() {
  // Category filter tabs
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.dataset.category;
      
      // Update active state
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide Add New Item button
      const addButtonContainer = document.getElementById('add-item-button-container');
      if (addButtonContainer) {
        if (category === 'all') {
          addButtonContainer.style.display = 'none';
        } else {
          addButtonContainer.style.display = 'block';
        }
      }
      
      // Load items
      loadFurnitureItems(category);
    });
  });
  
  // Show Add New Item button on initial load if not "all"
  const activeTab = document.querySelector('.category-tab.active');
  if (activeTab) {
    const category = activeTab.dataset.category;
    const addButtonContainer = document.getElementById('add-item-button-container');
    if (addButtonContainer && category !== 'all') {
      addButtonContainer.style.display = 'block';
    }
  }
  
  // Add Item Form
  const addItemForm = document.querySelector('#add-item-modal form');
  if (addItemForm) {
    addItemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await handleAddItem(formData);
    });
  }
  
  // Note: openModal override is now handled in the categories section to support both add-item-modal and add-category-modal
  
  // Add New Type button functionality
  const addNewTypeBtn = document.getElementById('add-new-type-btn');
  if (addNewTypeBtn) {
    addNewTypeBtn.addEventListener('click', function() {
      const typeSelect = document.getElementById('add-item-type-select');
      const newTypeContainer = document.getElementById('add-item-type-new-container');
      if (typeSelect && newTypeContainer) {
        typeSelect.style.display = 'none';
        addNewTypeBtn.style.display = 'none';
        newTypeContainer.style.display = 'block';
        // Focus on first input
        const firstInput = document.getElementById('add-item-type-new-en');
        if (firstInput) firstInput.focus();
      }
    });
  }
  
  // Allow switching back from new type to select (when all fields are empty)
  const newTypeEnInput = document.getElementById('add-item-type-new-en');
  const newTypeHyInput = document.getElementById('add-item-type-new-hy');
  const newTypeRuInput = document.getElementById('add-item-type-new-ru');
  const newTypeContainer = document.getElementById('add-item-type-new-container');
  
  function checkIfNewTypeEmpty() {
    if (newTypeContainer && newTypeContainer.style.display !== 'none') {
      const en = newTypeEnInput?.value.trim() || '';
      const hy = newTypeHyInput?.value.trim() || '';
      const ru = newTypeRuInput?.value.trim() || '';
      
      if (!en && !hy && !ru) {
        const typeSelect = document.getElementById('add-item-type-select');
        const addNewTypeBtn = document.getElementById('add-new-type-btn');
        if (typeSelect && addNewTypeBtn) {
          newTypeContainer.style.display = 'none';
          typeSelect.style.display = 'block';
          addNewTypeBtn.style.display = 'block';
        }
      }
    }
  }
  
  if (newTypeEnInput) {
    newTypeEnInput.addEventListener('blur', checkIfNewTypeEmpty);
  }
  if (newTypeHyInput) {
    newTypeHyInput.addEventListener('blur', checkIfNewTypeEmpty);
  }
  if (newTypeRuInput) {
    newTypeRuInput.addEventListener('blur', checkIfNewTypeEmpty);
  }
  
  // Load types from Firebase types collection
  async function loadTypesIntoDropdown() {
    try {
      const types = await getAllTypes();
      const lang = localStorage.getItem('adminSelectedLanguage') || 'hy';
      
      const typeSelect = document.getElementById('add-item-type-select');
      if (typeSelect) {
        // Keep the "Select Type" option
        const firstOption = typeSelect.querySelector('option[value=""]');
        typeSelect.innerHTML = firstOption ? firstOption.outerHTML : '<option value="">Select Type</option>';
        
        // Add types from Firebase
        types.forEach(type => {
          const option = document.createElement('option');
          option.value = type.id;
          const typeName = type[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || type.nameEn || type.slug;
          option.textContent = typeName;
          option.dataset.typeEn = type.nameEn || '';
          option.dataset.typeHy = type.nameHy || '';
          option.dataset.typeRu = type.nameRu || '';
          typeSelect.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error loading types:', error);
    }
  }
  
  // Edit Item Form
  const editItemForm = document.querySelector('#edit-item-modal form');
  if (editItemForm) {
    editItemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await handleEditItem(formData);
    });
  }
  
  // Delete Item Button
  const deleteBtn = document.querySelector('#delete-modal .btn-admin-danger');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', handleDeleteItem);
  }
  
  // Image Upload - Main Image in Add Modal
  const mainImageInput = document.querySelector('#add-item-modal input[type="file"]:not([multiple])');
  if (mainImageInput) {
    console.log('✅ Main image input found');
    mainImageInput.addEventListener('change', (e) => {
      console.log('📁 File selected:', e.target.files[0]?.name);
      handleImageUpload(e, false);
    });
  } else {
    console.warn('⚠️ Main image input not found');
  }
  
  
  // Image Upload - Main Image in Edit Modal
  const editMainImageInput = document.querySelector('#edit-item-modal input[type="file"]:not([multiple])');
  if (editMainImageInput) {
    console.log('✅ Edit main image input found');
    editMainImageInput.addEventListener('change', async (e) => {
      console.log('📁 Edit file selected:', e.target.files[0]?.name);
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        showLoading('Uploading image...');
        const uploadRes = await uploadMultipleImagesCloudinary([file]);
        hideLoading();
        
        if (uploadRes && uploadRes.success && uploadRes.urls && uploadRes.urls.length > 0) {
          uploadedMainImage = uploadRes.urls[0];
          const preview = document.getElementById('edit-item-image-preview');
          if (preview) {
            preview.src = uploadedMainImage;
            preview.style.display = 'inline-block';
          }
          showNotification('Image uploaded successfully! ✅', 'success');
        } else {
          showNotification('Image upload failed', 'error');
        }
      } catch (err) {
        hideLoading();
        showNotification('Image upload failed: ' + err.message, 'error');
      }
    });
  }
  
}

// ======================
// CATEGORIES PAGE
// ======================

// Load and display categories
async function loadCategories() {
  try {
    const categories = await getAllCategories();
    const allItems = await getAllFurniture();
    const counts = await getCategoryCounts();
    
    const tbody = document.getElementById('categories-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (categories.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px;">
            <i class="fa fa-inbox" style="font-size: 48px; color: #e0e0e0; margin-bottom: 15px; display: block;"></i>
            <p style="color: #999;">No categories found</p>
          </td>
        </tr>
      `;
      return;
    }
    
    // Get current language
    const lang = localStorage.getItem('adminSelectedLanguage') || 'hy';
    
    categories.forEach(category => {
      const categoryName = category[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || category.nameEn || category.slug;
      const itemCount = counts && counts[category.slug] ? counts[category.slug] : 0;
      
      // Get icon - prefer Cloudinary URL, fallback to Font Awesome
      let iconHtml = '';
      if (category.iconImage) {
        iconHtml = `<img src="${category.iconImage}" alt="${categoryName}" class="category-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="category-icon" style="display: none; align-items: center; justify-content: center; font-size: 24px; color: #667eea;">
                      <i class="fa ${category.icon || 'fa-cube'}"></i>
                    </div>`;
      } else if (category.icon) {
        iconHtml = `<div class="category-icon" style="display: flex; align-items: center; justify-content: center; font-size: 24px; color: #667eea;">
                      <i class="fa ${category.icon}"></i>
                    </div>`;
      } else {
        iconHtml = `<div class="category-icon" style="display: flex; align-items: center; justify-content: center; font-size: 24px; color: #667eea;">
                      <i class="fa fa-cube"></i>
                    </div>`;
      }
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="category-icon-cell">
          ${iconHtml}
        </td>
        <td>
          <strong style="color: #333;">${categoryName}</strong>
        </td>
        <td>${itemCount} <span data-translate="items">items</span></td>
        <td>
          <span style="color: #43e97b; font-weight: 600;" data-translate="Active">Active</span>
        </td>
        <td>
          <button class="btn-admin btn-admin-primary" style="padding: 8px 16px;" onclick="editCategory('${category.id}')">
            <i class="fa fa-edit"></i> <span data-translate="Edit">Edit</span>
          </button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
    
    console.log(`✅ Loaded ${categories.length} categories`);
  } catch (error) {
    console.error('❌ Error loading categories:', error);
    const tbody = document.getElementById('categories-table-body');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px; color: #fa5252;">
            Error loading categories: ${error.message}
          </td>
        </tr>
      `;
    }
  }
}

// Make functions globally available
window.loadCategories = loadCategories;
window.editCategory = async function(categoryId) {
  try {
    showLoading('Loading category...');
    const categories = await getAllCategories();
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
      hideLoading();
      showNotification('Category not found', 'error');
      return;
    }

    currentCategoryEditId = categoryId;
    currentCategoryImageUrl = category.iconImage || '';

    const preview = document.getElementById('edit-category-image-preview');
    if (preview) {
      if (currentCategoryImageUrl) {
        preview.src = currentCategoryImageUrl;
        preview.style.display = 'inline-block';
      } else {
        preview.style.display = 'none';
      }
    }

    // Populate name
    const nameInputSingle = document.getElementById('edit-category-name');
    if (nameInputSingle) {
      nameInputSingle.value = category.nameEn || category.nameHy || category.nameRu || '';
    }
    
    // Load types into dropdowns
    await loadCategoryTypesAndDescriptions('edit');
    
    // Populate type
    const typeSelect = document.getElementById('edit-category-type-select');
    if (typeSelect && category.type) {
      typeSelect.value = category.type;
    }
    
    // Populate descriptions
    const hasDescCheckbox = document.getElementById('edit-category-has-description');
    const descContainer = document.getElementById('edit-category-description-container');
    const hasDescription = category.descriptionEn || category.descriptionHy || category.descriptionRu;
    
    if (hasDescCheckbox) {
      hasDescCheckbox.checked = !!hasDescription;
      if (descContainer) {
        descContainer.style.display = hasDescription ? 'block' : 'none';
      }
    }
    
    const descEn = document.getElementById('edit-category-description-en');
    const descHy = document.getElementById('edit-category-description-hy');
    const descRu = document.getElementById('edit-category-description-ru');
    if (descEn && category.descriptionEn) descEn.value = category.descriptionEn;
    if (descHy && category.descriptionHy) descHy.value = category.descriptionHy;
    if (descRu && category.descriptionRu) descRu.value = category.descriptionRu;
    
    // Setup description checkbox toggle
    if (hasDescCheckbox) {
      hasDescCheckbox.removeEventListener('change', handleEditCategoryDescriptionToggle);
      hasDescCheckbox.addEventListener('change', handleEditCategoryDescriptionToggle);
    }

    // Use file input for upload (direct to Cloudinary)
    const uploadBtn = document.getElementById('edit-category-upload-btn');
    if (uploadBtn) {
      // Remove previous listeners by cloning
      const newBtn = uploadBtn.cloneNode(true);
      uploadBtn.parentNode.replaceChild(newBtn, uploadBtn);
      
      // Create hidden file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);
      
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
          showLoading('Uploading image...');
          const uploadRes = await uploadMultipleImagesCloudinary([file]);
          hideLoading();
          
          if (uploadRes && uploadRes.success && uploadRes.urls && uploadRes.urls.length > 0) {
            currentCategoryImageUrl = uploadRes.urls[0];
            if (preview) {
              preview.src = currentCategoryImageUrl;
              preview.style.display = 'inline-block';
            }
            showNotification('Image uploaded successfully! ✅', 'success');
          } else {
            const errMsg = (uploadRes && uploadRes.errors && uploadRes.errors.length > 0) 
              ? uploadRes.errors[0] 
              : 'Upload failed. Please check your Cloudinary settings.';
            showNotification('Image upload failed: ' + errMsg, 'error');
          }
        } catch (err) {
          hideLoading();
          const msg = (err && err.message) ? err.message : 'Unknown error occurred';
          showNotification('Image upload failed: ' + msg, 'error');
        }
        
        // Reset input for next time
        fileInput.value = '';
      });
      
      newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
      });
    }

    hideLoading();
    openModal('edit-category-modal');
  } catch (error) {
    hideLoading();
    console.error(error);
    showNotification('Error loading category: ' + error.message, 'error');
  }
};

// Setup Add Category Modal - image upload (extends existing openModal)
// This function is called after setupEventListeners in DOMContentLoaded
function setupAddCategoryModal() {
  const originalOpenModal = window.openModal;
  window.openModal = function(modalId) {
    // Handle add-item-modal (existing functionality)
    if (modalId === 'add-item-modal') {
      // Show/hide "Add to New category" checkbox based on current filter
      const addToNewCheckbox = document.getElementById('add-to-new-category-checkbox');
      if (addToNewCheckbox) {
        if (currentFilter === 'new' || currentFilter === 'all') {
          addToNewCheckbox.style.display = 'none';
        } else {
          addToNewCheckbox.style.display = 'block';
        }
      }
      
      // Reset description checkbox
      const hasDescCheckbox = document.getElementById('add-item-has-description');
      const descContainer = document.getElementById('add-item-description-container');
      if (hasDescCheckbox) {
        const newCheckbox = hasDescCheckbox.cloneNode(true);
        hasDescCheckbox.parentNode.replaceChild(newCheckbox, hasDescCheckbox);
        newCheckbox.checked = false;
        newCheckbox.addEventListener('change', function() {
          const container = document.getElementById('add-item-description-container');
          if (container) {
            container.style.display = this.checked ? 'block' : 'none';
          }
        });
      }
      if (descContainer) {
        descContainer.style.display = 'none';
      }
      const descEn = document.getElementById('add-item-description-en');
      const descHy = document.getElementById('add-item-description-hy');
      const descRu = document.getElementById('add-item-description-ru');
      if (descEn) descEn.value = '';
      if (descHy) descHy.value = '';
      if (descRu) descRu.value = '';
    }
    
    // Handle add-category-modal (new functionality)
    if (modalId === 'add-category-modal') {
      // Reset form
      const nameInput = document.getElementById('add-category-name');
      const typeSelect = document.getElementById('add-category-type-select');
      const hasDescCheckbox = document.getElementById('add-category-has-description');
      const descContainer = document.getElementById('add-category-description-container');
      if (nameInput) nameInput.value = '';
      if (typeSelect) typeSelect.value = '';
      if (hasDescCheckbox) hasDescCheckbox.checked = false;
      if (descContainer) descContainer.style.display = 'none';
      const descEn = document.getElementById('add-category-description-en');
      const descHy = document.getElementById('add-category-description-hy');
      const descRu = document.getElementById('add-category-description-ru');
      if (descEn) descEn.value = '';
      if (descHy) descHy.value = '';
      if (descRu) descRu.value = '';
      currentAddCategoryImageUrl = '';
      
      // Load types into dropdowns
      loadCategoryTypesAndDescriptions('add');
      
      // Setup description checkbox toggle (remove old listener first)
      if (hasDescCheckbox) {
        const newCheckbox = hasDescCheckbox.cloneNode(true);
        hasDescCheckbox.parentNode.replaceChild(newCheckbox, hasDescCheckbox);
        newCheckbox.addEventListener('change', function() {
          const container = document.getElementById('add-category-description-container');
          if (container) {
            container.style.display = this.checked ? 'block' : 'none';
          }
        });
      }
      
      // Setup upload button
      const uploadBtn = document.getElementById('add-category-upload-btn');
      if (uploadBtn) {
        // Remove previous listeners by cloning
        const newBtn = uploadBtn.cloneNode(true);
        uploadBtn.parentNode.replaceChild(newBtn, uploadBtn);
        
        // Create hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        
        fileInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          
          try {
            showLoading('Uploading image...');
            const uploadRes = await uploadMultipleImagesCloudinary([file]);
            hideLoading();
            
            if (uploadRes && uploadRes.success && uploadRes.urls && uploadRes.urls.length > 0) {
              currentAddCategoryImageUrl = uploadRes.urls[0];
              showNotification('Image uploaded successfully! ✅', 'success');
            } else {
              const errMsg = (uploadRes && uploadRes.errors && uploadRes.errors.length > 0) 
                ? uploadRes.errors[0] 
                : 'Upload failed. Please check your Cloudinary settings.';
              showNotification('Image upload failed: ' + errMsg, 'error');
            }
          } catch (err) {
            hideLoading();
            const msg = (err && err.message) ? err.message : 'Unknown error occurred';
            showNotification('Image upload failed: ' + msg, 'error');
          }
          
          // Reset input for next time
          fileInput.value = '';
        });
        
        newBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          fileInput.click();
        });
      }
    }
    
    // Call original openModal if it exists
    if (originalOpenModal && typeof originalOpenModal === 'function') {
      originalOpenModal(modalId);
    } else {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    }
  };
}

// Load types into item type and description dropdowns
async function loadItemTypesAndDescriptions(mode = 'add') {
  try {
    const types = await getAllTypes();
    const lang = localStorage.getItem('adminSelectedLanguage') || 'hy';
    
    // Load type dropdown
    const typeSelect = document.getElementById(`${mode}-item-type-select`);
    if (typeSelect) {
      const firstOption = typeSelect.querySelector('option[value=""]');
      typeSelect.innerHTML = firstOption ? firstOption.outerHTML : '<option value="">Select Type</option>';
      
      types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        const typeName = type[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || type.nameEn || type.slug;
        option.textContent = typeName;
        option.dataset.typeEn = type.nameEn || '';
        option.dataset.typeHy = type.nameHy || '';
        option.dataset.typeRu = type.nameRu || '';
        typeSelect.appendChild(option);
      });
    }
    
    // Load description dropdowns (English, Armenian, Russian)
    const descEnSelect = document.getElementById(`${mode}-item-description-en`);
    const descHySelect = document.getElementById(`${mode}-item-description-hy`);
    const descRuSelect = document.getElementById(`${mode}-item-description-ru`);
    
    [descEnSelect, descHySelect, descRuSelect].forEach((select, index) => {
      if (select) {
        const firstOption = select.querySelector('option[value=""]');
        select.innerHTML = firstOption ? firstOption.outerHTML : '<option value="">Select Description</option>';
        
        types.forEach(type => {
          const option = document.createElement('option');
          option.value = type.id;
          let typeName = '';
          if (index === 0) typeName = type.nameEn || type.slug;
          else if (index === 1) typeName = type.nameHy || type.nameEn || type.slug;
          else typeName = type.nameRu || type.nameEn || type.slug;
          option.textContent = typeName;
          option.dataset.typeEn = type.nameEn || '';
          option.dataset.typeHy = type.nameHy || '';
          option.dataset.typeRu = type.nameRu || '';
          select.appendChild(option);
        });
      }
    });
  } catch (error) {
    console.error('Error loading types for item:', error);
  }
}

// Load types into category type and description dropdowns
async function loadCategoryTypesAndDescriptions(mode = 'add') {
  try {
    const types = await getAllTypes();
    const lang = localStorage.getItem('adminSelectedLanguage') || 'hy';
    
    // Load type dropdown
    const typeSelect = document.getElementById(`${mode}-category-type-select`);
    if (typeSelect) {
      const firstOption = typeSelect.querySelector('option[value=""]');
      typeSelect.innerHTML = firstOption ? firstOption.outerHTML : '<option value="">Select Type</option>';
      
      types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        const typeName = type[`name${lang === 'hy' ? 'Hy' : lang === 'en' ? 'En' : 'Ru'}`] || type.nameEn || type.slug;
        option.textContent = typeName;
        option.dataset.typeEn = type.nameEn || '';
        option.dataset.typeHy = type.nameHy || '';
        option.dataset.typeRu = type.nameRu || '';
        typeSelect.appendChild(option);
      });
    }
    
    // Load description dropdowns (English, Armenian, Russian)
    const descEnSelect = document.getElementById(`${mode}-category-description-en`);
    const descHySelect = document.getElementById(`${mode}-category-description-hy`);
    const descRuSelect = document.getElementById(`${mode}-category-description-ru`);
    
    [descEnSelect, descHySelect, descRuSelect].forEach((select, index) => {
      if (select) {
        const firstOption = select.querySelector('option[value=""]');
        select.innerHTML = firstOption ? firstOption.outerHTML : '<option value="">Select Description</option>';
        
        types.forEach(type => {
          const option = document.createElement('option');
          option.value = type.id;
          let typeName = '';
          if (index === 0) typeName = type.nameEn || type.slug;
          else if (index === 1) typeName = type.nameHy || type.nameEn || type.slug;
          else typeName = type.nameRu || type.nameEn || type.slug;
          option.textContent = typeName;
          option.dataset.typeEn = type.nameEn || '';
          option.dataset.typeHy = type.nameHy || '';
          option.dataset.typeRu = type.nameRu || '';
          select.appendChild(option);
        });
      }
    });
  } catch (error) {
    console.error('Error loading types for category:', error);
  }
}

// Bind save actions for add category
document.addEventListener('click', function(e) {
  if (e.target && (e.target.id === 'add-category-btn' || e.target.closest('#add-category-btn'))) {
    (async () => {
      try {
        showLoading('Adding category...');
        const nameSingle = (document.getElementById('add-category-name') || {}).value || '';
        const typeSelect = document.getElementById('add-category-type-select');
        const typeId = typeSelect ? typeSelect.value : '';
        const hasDescCheckbox = document.getElementById('add-category-has-description');
        const hasDescription = hasDescCheckbox ? hasDescCheckbox.checked : false;
        
        if (!nameSingle) {
          showNotification('Please enter category name', 'error');
          hideLoading();
          return;
        }
        
        // Generate slug from name
        const slug = nameSingle.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        const categoryData = {
          nameEn: nameSingle,
          nameHy: nameSingle,
          nameRu: nameSingle,
          slug: slug,
          icon: 'fa-cube',
          type: typeId || '',
        };
        
        if (hasDescription) {
          const descEn = document.getElementById('add-category-description-en');
          const descHy = document.getElementById('add-category-description-hy');
          const descRu = document.getElementById('add-category-description-ru');
          categoryData.descriptionEn = descEn ? descEn.value : '';
          categoryData.descriptionHy = descHy ? descHy.value : '';
          categoryData.descriptionRu = descRu ? descRu.value : '';
        }
        
        if (currentAddCategoryImageUrl) {
          categoryData.iconImage = currentAddCategoryImageUrl;
        }
        
        const result = await addCategory(categoryData);
        hideLoading();
        if (result && result.success) {
          showNotification('Category added successfully! ✅', 'success');
          closeModal('add-category-modal');
          currentAddCategoryImageUrl = '';
          await loadCategories();
          await loadDashboardCounts();
        } else {
          showNotification('Failed to add category: ' + (result ? result.error : 'Unknown error'), 'error');
        }
      } catch (err) {
        hideLoading();
        showNotification('Error: ' + err.message, 'error');
      }
    })();
  }
});

// Handle edit category description toggle
function handleEditCategoryDescriptionToggle() {
  const descContainer = document.getElementById('edit-category-description-container');
  if (descContainer) {
    descContainer.style.display = this.checked ? 'block' : 'none';
  }
}

// Bind save actions for edit category
document.addEventListener('click', function(e) {
  if (e.target && (e.target.id === 'save-category-btn' || e.target.closest('#save-category-btn'))) {
    (async () => {
      if (!currentCategoryEditId) return;
      try {
        showLoading('Saving category...');
        const nameSingle = (document.getElementById('edit-category-name') || {}).value || '';
        const typeSelect = document.getElementById('edit-category-type-select');
        const typeId = typeSelect ? typeSelect.value : '';
        const hasDescCheckbox = document.getElementById('edit-category-has-description');
        const hasDescription = hasDescCheckbox ? hasDescCheckbox.checked : false;
        
        if (!nameSingle) {
          showNotification('Please enter category name', 'error');
          hideLoading();
          return;
        }
        
        const update = {
          nameEn: nameSingle,
          nameHy: nameSingle,
          nameRu: nameSingle,
          type: typeId || '',
        };
        
        if (hasDescription) {
          const descEn = document.getElementById('edit-category-description-en');
          const descHy = document.getElementById('edit-category-description-hy');
          const descRu = document.getElementById('edit-category-description-ru');
          update.descriptionEn = descEn ? descEn.value : '';
          update.descriptionHy = descHy ? descHy.value : '';
          update.descriptionRu = descRu ? descRu.value : '';
        } else {
          // Clear descriptions if unchecked
          update.descriptionEn = '';
          update.descriptionHy = '';
          update.descriptionRu = '';
        }
        
        if (currentCategoryImageUrl) {
          update.iconImage = currentCategoryImageUrl;
        }
        
        const result = await updateCategory(currentCategoryEditId, update);
        hideLoading();
        if (result && result.success) {
          showNotification('Category updated ✅', 'success');
          closeModal('edit-category-modal');
          currentCategoryEditId = null;
          currentCategoryImageUrl = '';
          await loadCategories();
        } else {
          showNotification('Update failed', 'error');
        }
      } catch (err) {
        hideLoading();
        showNotification('Error: ' + err.message, 'error');
      }
    })();
  }
});

// ======================
// UTILITY FUNCTIONS
// ======================

function showLoading(message = 'Loading...') {
  document.body.style.cursor = 'wait';
  // You can add a loading overlay here
  console.log('⏳', message);
}

function hideLoading() {
  document.body.style.cursor = 'default';
}

function showNotification(message, type = 'info') {
  // Simple alert for now - you can replace with a better UI notification
  const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  alert(emoji + ' ' + message);
}

// ======================
// SUBSCRIPTIONS FUNCTIONS
// ======================

// Load subscriptions count
async function loadSubscriptionsCount() {
  try {
    const subscriptions = await getAllSubscriptions();
    const countElement = document.getElementById('subscriptions-count');
    if (countElement) {
      countElement.textContent = subscriptions.length;
    }
  } catch (error) {
    console.error('Error loading subscriptions count:', error);
  }
}

// Download subscriptions as Excel
async function downloadSubscriptionsExcel() {
  try {
    const statusElement = document.getElementById('subscriptions-status');
    if (statusElement) {
      statusElement.textContent = 'Loading subscriptions...';
    }
    
    const excelData = await exportSubscriptionsToExcel();
    
    if (excelData.length === 0) {
      if (statusElement) {
        statusElement.textContent = 'No subscriptions found.';
      }
      alert('No subscriptions found.');
      return;
    }
    
    // Create workbook
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Subscriptions');
    
    // Generate filename with current date
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0];
    const filename = `GAOS_Subscriptions_${dateStr}.xlsx`;
    
    // Download file
    XLSX.writeFile(wb, filename);
    
    if (statusElement) {
      statusElement.textContent = `✅ Downloaded ${excelData.length} subscriptions successfully!`;
      setTimeout(() => {
        statusElement.textContent = '';
      }, 5000);
    }
    
    console.log(`✅ Exported ${excelData.length} subscriptions to ${filename}`);
  } catch (error) {
    console.error('Error downloading subscriptions:', error);
    const statusElement = document.getElementById('subscriptions-status');
    if (statusElement) {
      statusElement.textContent = '❌ Error downloading subscriptions. Please try again.';
    }
    alert('Error downloading subscriptions. Please try again.');
  }
}

// Setup subscriptions event listeners
function setupSubscriptionsListeners() {
  const downloadBtn = document.getElementById('download-subscriptions-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadSubscriptionsExcel);
  }
}

// Make functions globally available
window.confirmDeleteItem = window.confirmDeleteItem || confirmDeleteItem;
window.editItem = window.editItem || editItem;

