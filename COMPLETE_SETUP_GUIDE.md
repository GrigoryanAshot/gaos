# 🚀 Complete Setup Guide - Firebase + Cloudinary

## Quick 10-Minute Setup for GAOS Admin Panel

---

## 📦 What You're Setting Up

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Firebase Firestore** | Store product data (names, prices, descriptions) | 1GB database |
| **Cloudinary** | Store images (photos of furniture) | 25GB storage |

---

## ⚡ Step-by-Step Setup

### **PART 1: Cloudinary Setup (5 minutes)**

#### 1. Create Account
Go to: https://cloudinary.com/users/register/free
- Sign up with your email
- Verify email

#### 2. Get Cloud Name
- After login, you'll see **"Account Details"**
- Copy your **Cloud Name** (example: `dkf83jd9s`)

#### 3. Create Upload Preset
- Go to **Settings** (⚙️) → **Upload** tab
- Scroll to **"Upload presets"**
- Click **"Add upload preset"**
- Settings:
  ```
  Preset name: gaos_furniture
  Signing Mode: Unsigned ⚠️ (IMPORTANT!)
  Folder: gaos-furniture
  ```
- Click **Save**

#### 4. Update Your Code
Open `js/admin-database.js` (lines 15-17) and replace:

```javascript
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // 👈 Put your cloud name here
const CLOUDINARY_UPLOAD_PRESET = 'gaos_furniture'; // 👈 Must match preset name
```

**Example:**
```javascript
const CLOUDINARY_CLOUD_NAME = 'dkf83jd9s'; // Your actual cloud name
const CLOUDINARY_UPLOAD_PRESET = 'gaos_furniture';
```

✅ **Cloudinary is ready!**

---

### **PART 2: Firebase Setup (5 minutes)**

#### 1. Enable Firestore Database
Go to: https://console.firebase.google.com/project/gaos-website/firestore

- Click **"Create database"**
- Choose **"Start in test mode"** ⚠️
- Select location: **"europe-west"** (closest to Armenia)
- Click **"Enable"**
- Wait 1-2 minutes for setup

✅ **Firebase is ready!**

---

## 🧪 Test Your Setup

### **Test 1: Check Browser Console**
1. Open `admin.html` in browser
2. Press **F12** to open console
3. Look for:
   ```
   🚀 Initializing admin panel...
   ✅ Admin panel initialized
   ```

### **Test 2: Add a Test Item**
1. Go to **Collections** page
2. Click **"Add New Item"**
3. Fill in:
   - Item Name (English): **Test Chair**
   - Item Name (Armenian): **Թեստ Աթոռ**
   - Category: **Chairs**
4. Click **"Main Image"** → Select an image
5. Wait for: **✅ Image uploaded to Cloudinary!**
6. Click **"Save Item"**
7. Should see: **✅ Item added successfully!**

### **Test 3: Verify Data**

**Check Firebase:**
1. Go to: https://console.firebase.google.com/project/gaos-website/firestore
2. You should see **"furniture"** collection
3. Click on it → You should see your test item
4. Item should have `mainImage` field with Cloudinary URL

**Check Cloudinary:**
1. Go to: https://cloudinary.com/console/media_library
2. Open **"gaos-furniture"** folder
3. You should see your uploaded image

✅ **Everything works!**

---

## 📁 Project Structure

```
GAOS/
├── admin.html                  # Admin panel interface
├── index.html                  # Your main website
│
├── js/
│   ├── firebase-config.js      # Firebase connection
│   ├── admin-database.js       # Database & Cloudinary functions
│   └── admin-functions.js      # UI logic and event handlers
│
├── images/
│   └── flags/                  # Language switcher flags
│
└── Setup Guides/
    ├── CLOUDINARY_SETUP_GUIDE.md
    ├── FIREBASE_SETUP_GUIDE.md
    └── COMPLETE_SETUP_GUIDE.md  ← You are here
```

---

## 🎯 How to Use Admin Panel

### **Dashboard Page**
- View total items
- See items count per category
- Quick overview of your inventory

### **Collections Page**
- View all furniture items
- Filter by category
- Add new items
- Edit existing items
- Delete items

### **Categories Page**
- Manage product categories
- (Currently showing static data)

### **Settings Page**
- Update contact information
- Update social media links
- Update website info

---

## 💡 Common Tasks

### **Adding a New Furniture Item:**

1. **Collections** → **Add New Item**
2. Fill in details:
   - **English Name** - Required
   - **Armenian Name** - Required
   - **Category** - Required
   - **Price** - Optional
   - **Descriptions** - Optional
   - **Dimensions** - e.g., "120cm x 80cm x 75cm"
   - **Material** - e.g., "Oak wood, Steel"
3. **Upload Main Image:**
   - Click upload area
   - Select image (max 5MB)
   - Wait for upload confirmation
4. **Upload Gallery Images:** (Optional)
   - Click upload area
   - Select multiple images
   - Wait for upload
5. Click **Save Item**

### **Editing an Item:**

1. Go to **Collections**
2. Find your item (use category filters)
3. Click **Edit** button
4. Update fields you want to change
5. Upload new images if needed
6. Click **Save Changes**

### **Deleting an Item:**

1. Click **Delete** button on item card
2. Confirm deletion
3. Item removed from database
4. *Note: Image remains in Cloudinary (delete manually if needed)*

---

## 🔒 Important Security Notes

### **Current Status:**
⚠️ Your database is in **TEST MODE**
- Anyone can read/write to your database
- Good for development
- **NOT safe for production**

### **Before Going Live:**

1. **Add Firebase Security Rules**
2. **Add Admin Authentication** (login system)
3. **Switch Cloudinary to Signed Mode**

**I can help you with this when you're ready!**

---

## 📊 Free Tier Limits

### **What You Get Free:**

| Service | Storage | Bandwidth | Operations |
|---------|---------|-----------|------------|
| **Firebase Firestore** | 1 GB | 10 GB/month | 50K reads/day |
| **Cloudinary** | 25 GB | 25 GB/month | 25K transformations |

**Estimate for Furniture Website:**
- ~10,000 high-quality images on Cloudinary
- ~50,000 product views per month
- Perfect for small to medium business

### **Check Usage:**

**Firebase:**
https://console.firebase.google.com/project/gaos-website/usage

**Cloudinary:**
https://cloudinary.com/console/reports

---

## 🐛 Troubleshooting

### **Problem: "Permission denied" error**
**Solution:**
- Make sure Firestore is in "test mode"
- Go to Firebase → Firestore Database → Rules
- Should show: `allow read, write: if true;`

### **Problem: "Cloudinary is not defined"**
**Solution:**
- Check that Cloudinary script is in `admin.html`
- Should be BEFORE Firebase scripts:
```html
<script src="https://upload-widget.cloudinary.com/global/all.js"></script>
```

### **Problem: "Upload preset not found"**
**Solution:**
- Go to Cloudinary Settings → Upload
- Check preset name is exactly: `gaos_furniture`
- Make sure Signing Mode is **"Unsigned"**

### **Problem: Images don't upload**
**Solution:**
- Check your Cloud Name in `admin-database.js`
- Check browser console (F12) for errors
- Make sure image is under 5MB
- Try JPG or PNG format

### **Problem: Dashboard shows 0 items**
**Solution:**
- Make sure you've added at least one item
- Check Firestore Database has "furniture" collection
- Refresh the page

---

## ✅ Setup Checklist

**Cloudinary:**
- [ ] Created account
- [ ] Got Cloud Name
- [ ] Created upload preset `gaos_furniture`
- [ ] Preset is set to "Unsigned"
- [ ] Updated `CLOUDINARY_CLOUD_NAME` in code

**Firebase:**
- [ ] Enabled Firestore Database
- [ ] Database is in "test mode"
- [ ] Can see database in Firebase Console

**Testing:**
- [ ] Admin panel opens without errors
- [ ] Console shows "✅ Admin panel initialized"
- [ ] Can add a test item
- [ ] Test item appears in Collections
- [ ] Test item appears in Firestore Database
- [ ] Image appears in Cloudinary Media Library
- [ ] Dashboard shows correct count

---

## 🎉 You're Ready to Go!

Your admin panel is now fully functional with:
- ✅ Product management (add, edit, delete)
- ✅ Image uploads to Cloudinary
- ✅ Data storage in Firebase
- ✅ Multi-language support (Armenian, English, Russian)
- ✅ Category filtering
- ✅ Dashboard statistics

---

## 🚀 Next Steps (Optional)

After you're comfortable with the basics:

1. **Add Authentication** - Secure your admin panel with login
2. **Connect to Main Website** - Display products on `index.html`
3. **Add More Features:**
   - Bulk import/export
   - Product search
   - Image gallery lightbox
   - Product availability status
   - Sale prices
   - Product reviews

**I can help you implement any of these features!**

---

## 📞 Support

**Useful Links:**
- Firebase Console: https://console.firebase.google.com/
- Cloudinary Dashboard: https://cloudinary.com/console
- Firebase Documentation: https://firebase.google.com/docs/firestore
- Cloudinary Documentation: https://cloudinary.com/documentation

**Having issues?**
1. Check browser console (F12)
2. Read error messages carefully
3. Check the troubleshooting section above
4. Verify your configuration settings

---

**Happy furniture catalog management! 🪑🛋️✨**

