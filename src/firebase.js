import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_REAL_API_KEY",
  authDomain: "jewel16-95f3f.firebaseapp.com",
  projectId: "jewel16-95f3f",
  storageBucket: "jewel16-95f3f.appspot.com",
  messagingSenderId: "PASTE_ID",
  appId: "PASTE_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
