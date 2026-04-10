import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "PASTE_FROM_FIREBASE",
  authDomain: "jewel16-95f3f.firebaseapp.com",
  projectId: "jewel16-95f3f",
  storageBucket: "jewel16-95f3f.appspot.com",
  messagingSenderId: "PASTE",
  appId: "PASTE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
