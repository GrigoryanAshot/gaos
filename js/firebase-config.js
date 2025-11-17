// Import Firebase modules (Firestore only - using Cloudinary for images)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Your Firebase configuration (from Firebase Console)
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

// Export for use in other files
export { 
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
};

