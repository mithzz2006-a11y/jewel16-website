import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNZA83__KERpYUhMoBz7YIxXoAUezDPus",
  authDomain: "jewel16-95f3f.firebaseapp.com",
  projectId: "jewel16-95f3f",
  storageBucket: "jewel16-95f3f.firebasestorage.app",
  messagingSenderId: "613112343850",
  appId: "1:613112343850:web:35b0ec24389b0c32b7c253",
  measurementId: "G-YTME7S1Y0G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
