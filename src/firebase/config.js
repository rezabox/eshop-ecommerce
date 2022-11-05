import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAHKQZkwOchGMBgtddoMVe6bZLngPr0uYs",
  authDomain: "e-shop-73f1f.firebaseapp.com",
  projectId: "e-shop-73f1f",
  storageBucket: "e-shop-73f1f.appspot.com",
  messagingSenderId: "1059948355042",
  appId: "1:1059948355042:web:9e5feae295ccabbd6badbb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;