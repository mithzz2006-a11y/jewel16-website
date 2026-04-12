// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNZA83__KERpYUhMoBz7YIxXoAUezDPus",
  authDomain: "jewel16-95f3f.firebaseapp.com",
  projectId: "jewel16-95f3f",
  storageBucket: "jewel16-95f3f.appspot.com",
  messagingSenderId: "613112343850",
  appId: "1:613112343850:web:35b0ec24389b0c32b7c253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
