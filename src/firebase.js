// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Replace these values with your actual Firebase project settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "jewel16-95f3f.firebaseapp.com",
  projectId: "jewel16-95f3f",
  storageBucket: "jewel16-95f3f.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Export Firestore database instance
export const db = getFirestore(app);
