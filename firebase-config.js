// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firestore Database
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Storage
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeZ5hxPWIRVEqeTQt_b9HPNR2r64vzjkA",
  authDomain: "tmnp-gold-v7.firebaseapp.com",
  projectId: "tmnp-gold-v7",
  storageBucket: "tmnp-gold-v7.firebasestorage.app",
  messagingSenderId: "688112149967",
  appId: "1:688112149967:web:de4bea35b5e7357e8f5eba",
  measurementId: "G-8WVMRW9C7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Export
export {
  app,
  auth,
  db,
  storage,
  analytics
};
