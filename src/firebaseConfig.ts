import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;
const fromEnv = (viteKey, craKey) => env[viteKey] ?? env[craKey] ?? "";

const firebaseConfig = {
  apiKey: fromEnv("VITE_API_KEY", "REACT_APP_API_KEY"),
  authDomain: fromEnv("VITE_AUTH_DOMAIN", "REACT_APP_AUTH_DOMAIN"),
  projectId: fromEnv("VITE_PROJECT_ID", "REACT_APP_PROJECT_ID"),
  storageBucket: fromEnv("VITE_STORAGE_BUCKET", "REACT_APP_STORAGE_BUCKET"),
  messagingSenderId: fromEnv(
    "VITE_MESSAGING_SENDER_ID",
    "REACT_APP_MESSAGING_SENDER_ID"
  ),
  appId: fromEnv("VITE_APP_ID", "REACT_APP_APP_ID"),
  measurementId: fromEnv("VITE_MEASUREMENT_ID", "REACT_APP_MEASUREMENT_ID"),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { storage, auth, firestore };
