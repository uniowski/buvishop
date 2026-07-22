import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;
const requiredEnv = (key: keyof ImportMetaEnv) => {
  const value = env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const firebaseConfig = {
  apiKey: requiredEnv("VITE_API_KEY"),
  authDomain: requiredEnv("VITE_AUTH_DOMAIN"),
  projectId: requiredEnv("VITE_PROJECT_ID"),
  storageBucket: requiredEnv("VITE_STORAGE_BUCKET"),
  messagingSenderId: requiredEnv("VITE_MESSAGING_SENDER_ID"),
  appId: requiredEnv("VITE_APP_ID"),
  measurementId: env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { storage, auth, firestore };
