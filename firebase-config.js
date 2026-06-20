import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeZ5hxPWIRVEqeTQt_b9HPNR2r64vzjkA",
  authDomain: "tmnp-gold-v7.firebaseapp.com",
  projectId: "tmnp-gold-v7",
  storageBucket: "tmnp-gold-v7.firebasestorage.app",
  messagingSenderId: "688112149967",
  appId: "1:688112149967:web:de4bea35b5e7357e8f5eba",
  measurementId: "G-8WVMRW9C7D"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
