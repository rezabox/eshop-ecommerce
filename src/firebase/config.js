import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRfEjTjz5dI6Te9JqmlRJwAaOFGB_GDrI",
    authDomain: "e-commerce-c7d54.firebaseapp.com",
    projectId: "e-commerce-c7d54",
    storageBucket: "e-commerce-c7d54.appspot.com",
    messagingSenderId: "396551620726",
    appId: "1:396551620726:web:a92c08a177ab997aa9b757"
  };
  


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
