# 🔥 Firebase Setup Guide for GAOS Admin Panel

Complete step-by-step guide to connect your admin panel with Firebase database and storage.

---

## ✅ What You've Done So Far

- ✅ Created Firebase project: "Gaos website"
- ✅ Got Firebase configuration
- ✅ Created JavaScript files for database integration

---

## 📋 Next Steps to Complete Setup

### **Step 1: Enable Firestore Database**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **"Gaos website"**
3. In the left sidebar, click **"Build"** → **"Firestore Database"**
4. Click **"Create database"**
5. Choose **"Start in test mode"** (we'll add security later)
6. Select location: **"europe-west"** (closest to Armenia)
7. Click **"Enable"**

**Wait 1-2 minutes for setup to complete ⏳**

---

### **Step 2: Enable Firebase Storage (for Images)**

1. In the left sidebar, click **"Build"** → **"Storage"**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"**
5. Select same location: **"europe-west"**
6. Click **"Done"**

---

### **Step 3: Test Firebase Connection**

1. Open your project folder in your browser
2. Navigate to: `http://localhost/your-project/firebase-test.html`
   
   (If using a local server like XAMPP, Laragon, or Live Server)

3. Click **"Test Firebase Connection"** button
4. You should see: ✅ **Firebase Connected Successfully!**

**If you see an error:**
- Make sure Firestore Database is enabled
- Wait 1-2 minutes and try again
- Check browser console (F12) for detailed errors

---

### **Step 4: Test Adding an Item**

1. On the test page, click **"Test Add Item"**
2. You should see: ✅ **Item Added Successfully!**
3. Go to Firebase Console → Firestore Database
4. You should see a new collection called **"furniture"** with one test item

---

### **Step 5: Open Your Admin Panel**

1. Open `admin.html` in your browser
2. The dashboard should load with category counts
3. Click **"Collections"** in the sidebar
4. You should see the test item you added!

---

## 🎯 How to Use the Admin Panel

### **Adding New Furniture Items:**

1. Go to **Collections** page
2. Click **"Add New Item"** button
3. Fill in the form:
   - Item Name (English) - Required
   - Item Name (Armenian) - Required
   - Category - Select from dropdown
   - Price (Optional)
   - Descriptions
   - Dimensions
   - Material
   - **Main Image** - Click to upload (max 5MB)
   - **Gallery Images** - Click to upload multiple
4. Click **"Save Item"**

**Image Upload:**
- When you click the upload area, select an image from your computer
- Wait for "Image uploaded! ✅" message
- The image is uploaded to Firebase Storage
- Then the item data is saved to Firestore Database

---

### **Editing Items:**

1. Go to **Collections** page
2. Filter by category if needed
3. Click **"Edit"** button on any item card
4. Update the fields you want to change
5. Click **"Save Changes"**

---

### **Deleting Items:**

1. Click **"Delete"** button on any item card
2. Confirm the deletion
3. The item and its images will be deleted permanently

---

## 🗂️ Firebase Data Structure

### **Firestore Database Collections:**

#### **furniture** (main collection)
```javascript
{
  id: "auto-generated-id",
  nameEn: "Modern Chair",
  nameHy: "Ժամանակակից աթոռ",
  nameRu: "Современный стул",
  category: "chairs",
  price: "250",
  descriptionEn: "Description in English",
  descriptionHy: "Նկարագրություն հայերեն",
  descriptionRu: "Описание на русском",
  dimensions: "45cm x 50cm x 85cm",
  material: "Oak wood, Fabric",
  mainImage: "https://firebasestorage.googleapis.com/...",
  galleryImages: [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp,
  status: "active"
}
```

#### **categories** (optional - for future)
```javascript
{
  id: "auto-generated-id",
  nameEn: "Chairs",
  nameHy: "Աթոռներ",
  nameRu: "Стулья",
  slug: "chairs",
  icon: "fa-chair",
  displayOrder: 1,
  status: "active"
}
```

#### **settings** (optional - for future)
```javascript
{
  contactEmail: "info@gaos.am",
  contactPhone: "+374...",
  facebook: "...",
  instagram: "...",
  address: "..."
}
```

---

### **Firebase Storage Structure:**

```
gaos-website.appspot.com/
  └── furniture/
      ├── 1699123456789_chair1.jpg
      ├── 1699123456790_chair2.jpg
      ├── 1699123456791_sofa1.jpg
      └── ...
```

---

## 🔒 Security Rules (Important!)

**Current Status:** Your database is in **TEST MODE** (anyone can read/write)

**⚠️ Security Risk:** Test mode expires in 30 days and allows anyone to access your database.

### **Next Steps for Security:**

1. After testing, go to Firebase Console
2. Click **Firestore Database** → **Rules** tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to furniture items for everyone (for your website)
    match /furniture/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Protect categories
    match /categories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Protect settings
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. For **Storage**, go to **Storage** → **Rules** tab:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /furniture/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

### **Adding Admin Authentication (Recommended):**

This prevents unauthorized people from adding/editing items.

**I can help you add admin login later if needed!**

---

## 📊 Dashboard Statistics

The dashboard automatically shows:
- Total items count
- Items per category (Նորույթներ, Աթոռներ, etc.)

These numbers update automatically when you add/edit/delete items.

---

## 🌐 Connecting to Your Main Website (index.html)

To display furniture items on your main website:

1. Add the same Firebase scripts to `index.html`
2. Fetch items from Firestore
3. Display them dynamically

**Would you like me to help with this integration?**

---

## 🐛 Troubleshooting

### **Problem: "Firebase Connection Failed"**
**Solution:**
- Make sure Firestore Database is enabled in Firebase Console
- Wait 1-2 minutes after enabling
- Check that your `firebase-config.js` has the correct configuration

---

### **Problem: "Permission denied"**
**Solution:**
- Make sure you're in "test mode"
- Check Firestore Rules in Firebase Console
- Rules should allow read/write for testing

---

### **Problem: "Image upload fails"**
**Solution:**
- Make sure Firebase Storage is enabled
- Check image file size (max 5MB)
- Check file format (JPG, PNG, WEBP only)
- Make sure Storage Rules allow uploads

---

### **Problem: "Items not showing in Collections"**
**Solution:**
- Open browser console (F12) to see errors
- Check that items exist in Firestore Database
- Make sure you're on the Collections page
- Try refreshing the page

---

## 💾 Backup & Export

### **To Backup Your Data:**

1. Go to Firebase Console
2. Click **Firestore Database**
3. Click on **"Import/Export"** tab
4. Follow instructions to export to Google Cloud Storage

### **Alternative: Manual Export**

Use the Firebase Admin SDK to export data programmatically.

---

## 📈 Firebase Free Tier Limits

**Firestore Database:**
- 1 GB storage
- 50,000 reads per day
- 20,000 writes per day
- 20,000 deletes per day

**Storage:**
- 5 GB storage
- 1 GB upload per day
- 50,000 download operations per day

**This is MORE than enough for a furniture website!**

---

## 📞 Support

If you encounter any issues:

1. Check the browser console (F12) for error messages
2. Check Firebase Console for service status
3. Read error messages carefully - they usually tell you what's wrong
4. Make sure all services (Firestore & Storage) are enabled

---

## ✨ What's Next?

After the basic setup works, you can:

1. ✅ Add admin authentication (login/password)
2. ✅ Connect the admin panel to your main website
3. ✅ Add image optimization
4. ✅ Add more fields (colors, availability, etc.)
5. ✅ Add categories management
6. ✅ Add bulk import/export
7. ✅ Add analytics

---

## 🎉 You're All Set!

Once you complete Steps 1-5, your admin panel will be fully functional!

You can add, edit, and delete furniture items with images, and everything will be stored in Firebase.

**Need help? Let me know if you encounter any issues!**

