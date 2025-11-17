# ☁️ Cloudinary Setup Guide for GAOS Admin Panel

Complete step-by-step guide to set up Cloudinary for image storage.

---

## 🎯 Why Cloudinary?

✅ **25GB** free storage (vs 5GB Firebase Storage)  
✅ **25GB** free bandwidth per month  
✅ Automatic image optimization  
✅ Image transformations (resize, crop, filters)  
✅ Fast CDN delivery worldwide  
✅ Simple integration  

---

## 📋 Step-by-Step Setup

### **Step 1: Create Cloudinary Account**

1. Go to: https://cloudinary.com/users/register/free
2. Fill in your details:
   - Email
   - Password
   - Choose "I'm a developer" or "I'm a business owner"
3. Click **"Create Account"**
4. Verify your email address

---

### **Step 2: Get Your Cloud Name**

1. After logging in, you'll see your **Dashboard**
2. Look for the **"Account Details"** section (top-left)
3. Copy your **Cloud Name** (e.g., `dxxxxxx` or `your-business-name`)

Example:
```
Cloud name: gaos-furniture
```

---

### **Step 3: Create Upload Preset (Important!)**

This allows your website to upload images without exposing your API secret.

1. Go to **Settings** (gear icon, top-right)
2. Click **"Upload"** tab in the left sidebar
3. Scroll down to **"Upload presets"** section
4. Click **"Add upload preset"**
5. Configure the preset:
   - **Preset name**: `gaos_furniture`
   - **Signing Mode**: **Unsigned** ⚠️ (Important!)
   - **Folder**: `gaos-furniture` (optional but recommended)
   - **Access Mode**: Public
   - **Unique filename**: Yes (checked)
6. Click **"Save"**

**⚠️ Important:** Make sure **Signing Mode** is set to **"Unsigned"** - this allows uploads from your website.

---

### **Step 4: Update Your JavaScript Files**

Open `js/admin-database.js` and update lines 15-17:

```javascript
// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // 👈 Replace with your cloud name
const CLOUDINARY_UPLOAD_PRESET = 'gaos_furniture'; // 👈 Should match what you created
```

**Example:**
```javascript
const CLOUDINARY_CLOUD_NAME = 'gaos-furniture'; // Your actual cloud name
const CLOUDINARY_UPLOAD_PRESET = 'gaos_furniture'; // The preset you created
```

---

### **Step 5: Enable Firestore Database**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **"Gaos website"**
3. Click **"Build"** → **"Firestore Database"**
4. Click **"Create database"**
5. Choose **"Start in test mode"**
6. Select location: **"europe-west"**
7. Click **"Enable"**

---

### **Step 6: Test the Setup**

1. Open `admin.html` in your browser
2. Go to **Collections** page
3. Click **"Add New Item"** button
4. Fill in the form:
   - Item Name (English): Test Chair
   - Item Name (Armenian): Թեստ Աթոռ
   - Category: Chairs
5. Click on **"Main Image"** upload area
6. Select an image from your computer
7. Wait for upload (you'll see: ✅ Image uploaded to Cloudinary!)
8. Click **"Save Item"**

---

### **Step 7: Verify Images in Cloudinary**

1. Go to Cloudinary Dashboard
2. Click **"Media Library"** in the left sidebar
3. Open the **"gaos-furniture"** folder
4. You should see your uploaded image!

---

## 🗂️ How It Works

### **Data Flow:**

```
User selects image
    ↓
Image uploads to Cloudinary
    ↓
Cloudinary returns image URL
    ↓
URL saved in Firebase Firestore
    ↓
Admin panel displays image using URL
```

### **What's Stored Where:**

| Service | What It Stores | Example |
|---------|---------------|---------|
| **Firebase Firestore** | Text data + image URLs | `{ name: "Chair", mainImage: "https://cloudinary.com/..." }` |
| **Cloudinary** | Actual image files | chair.jpg (2MB) |

---

## 📊 Cloudinary Dashboard Overview

### **Media Library**
- View all uploaded images
- Search and filter images
- Delete unused images
- Organize in folders

### **Reports & Analytics**
- Storage usage
- Bandwidth usage
- Number of transformations
- View free tier limits

---

## 🔧 Configuration Options

### **Upload Preset Advanced Settings:**

You can customize your upload preset:

1. **Image Transformations:**
   - Auto-format: WebP for supported browsers
   - Auto-quality: Automatic quality optimization
   - Max file size: 5MB

2. **Folder Structure:**
   - Folder: `gaos-furniture`
   - Use unique filenames: Yes

3. **Security:**
   - Allowed formats: jpg, png, webp, gif
   - Max image width/height: No limit

---

## 🌐 Image Optimization Features

Cloudinary automatically optimizes images:

### **Original Upload:**
```
https://res.cloudinary.com/gaos-furniture/image/upload/chair.jpg
Size: 2MB, 2000x2000px
```

### **Optimized Thumbnail (Automatic):**
```
https://res.cloudinary.com/gaos-furniture/image/upload/w_300,h_300,c_fill/chair.jpg
Size: 50KB, 300x300px
```

### **Different Formats:**
```
https://res.cloudinary.com/gaos-furniture/image/upload/f_webp/chair.jpg
Converts to WebP format (smaller file size)
```

---

## 💰 Free Tier Limits

| Resource | Free Limit | What It Means |
|----------|-----------|---------------|
| **Storage** | 25 GB | Can store ~10,000 high-quality images |
| **Bandwidth** | 25 GB/month | ~50,000 image views per month |
| **Transformations** | 25,000/month | Resize, crop, optimize operations |
| **Images** | Unlimited | No limit on number of images |

**This is MORE than enough for a furniture website!**

---

## 🔒 Security Best Practices

### **Current Setup (Development):**
- ✅ Unsigned uploads (anyone can upload)
- ⚠️ Good for testing
- ❌ Not recommended for production

### **Production Setup (Later):**

1. **Enable Signed Uploads:**
   - Change upload preset to "Signed"
   - Use backend server to generate signatures
   - Prevents unauthorized uploads

2. **Add Upload Limits:**
   - Max file size: 5MB
   - Allowed formats: jpg, png, webp only
   - Rate limiting

3. **Content Moderation:**
   - Enable Cloudinary's AI moderation
   - Automatically reject inappropriate images

**I can help you implement this when you're ready for production!**

---

## 🐛 Troubleshooting

### **Problem: "Cloudinary is not defined"**
**Solution:**
- Make sure the Cloudinary script is loaded in `admin.html`
- Check that this line exists:
```html
<script src="https://upload-widget.cloudinary.com/global/all.js"></script>
```
- Make sure it comes BEFORE your Firebase scripts

---

### **Problem: "Upload preset not found"**
**Solution:**
- Check that you created the upload preset in Cloudinary
- Make sure the preset name matches exactly: `gaos_furniture`
- Make sure **Signing Mode** is set to **"Unsigned"**

---

### **Problem: "Upload fails with 403 error"**
**Solution:**
- Double-check your **Cloud Name** is correct
- Make sure upload preset is **Unsigned**
- Try creating a new upload preset

---

### **Problem: Images upload but don't show**
**Solution:**
- Check browser console (F12) for errors
- Make sure the image URL is saved to Firestore
- Check that the URL starts with `https://res.cloudinary.com/`

---

## 📱 Managing Your Images

### **Viewing Images:**
1. Go to Cloudinary Dashboard
2. Click **"Media Library"**
3. Browse your folders

### **Deleting Images:**
1. Find the image in Media Library
2. Click on it
3. Click the trash icon
4. Confirm deletion

**Note:** Deleting from admin panel only removes the database entry, not the image from Cloudinary. Delete unused images manually from Cloudinary dashboard.

---

## 🚀 Advanced Features (Optional)

### **1. Image Transformations**

Resize images on-the-fly:

```javascript
// Original
https://res.cloudinary.com/gaos/image/upload/chair.jpg

// Thumbnail (300x300)
https://res.cloudinary.com/gaos/image/upload/w_300,h_300,c_fill/chair.jpg

// Medium (800px wide)
https://res.cloudinary.com/gaos/image/upload/w_800/chair.jpg

// With watermark
https://res.cloudinary.com/gaos/image/upload/l_logo,o_50/chair.jpg
```

### **2. Image Effects**

```javascript
// Black and white
/e_grayscale/chair.jpg

// Blur background
/e_blur:1000,o_70/chair.jpg

// Auto-enhance
/e_auto_brightness/chair.jpg
```

### **3. Lazy Loading**

Cloudinary provides lazy loading placeholders:
```javascript
/q_auto,f_auto,e_blur:1000/chair.jpg  // Tiny blurred placeholder
```

---

## 📈 Monitoring Usage

### **Check Your Usage:**

1. Go to Cloudinary Dashboard
2. Click **"Reports"** in the left sidebar
3. View:
   - Storage used (out of 25GB)
   - Bandwidth used this month (out of 25GB)
   - Transformations used (out of 25,000)

### **Optimize Usage:**

1. Delete unused images regularly
2. Use appropriate image sizes
3. Enable auto-format (WebP)
4. Use progressive JPEGs

---

## ✅ Checklist

- [ ] Created Cloudinary account
- [ ] Copied Cloud Name
- [ ] Created unsigned upload preset: `gaos_furniture`
- [ ] Updated `CLOUDINARY_CLOUD_NAME` in `admin-database.js`
- [ ] Updated `CLOUDINARY_UPLOAD_PRESET` in `admin-database.js`
- [ ] Enabled Firestore Database in Firebase
- [ ] Tested image upload in admin panel
- [ ] Verified image appears in Cloudinary Media Library
- [ ] Image displays correctly in Collections page

---

## 🎉 You're All Set!

Your admin panel now uses:
- ☁️ **Cloudinary** for image storage (25GB free)
- 🔥 **Firebase Firestore** for database (1GB free)

This combination gives you:
- More storage space
- Better image optimization
- Faster loading times
- Professional CDN delivery

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console (F12) for errors
2. Verify your Cloud Name and Upload Preset
3. Make sure upload preset is "Unsigned"
4. Check Cloudinary usage limits

**Ready to start adding furniture items! 🪑🛋️📸**

