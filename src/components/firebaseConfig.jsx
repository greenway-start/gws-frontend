import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const loadFirebaseConfig = async () => {
  const response = await fetch('/firebaseConfig.json');
  return response.json();
};

const initializeFirebase = async () => {
  const firebaseConfig = await loadFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  console.log('Firebase initialized', { auth, db });

  return { auth, db };
};

export default initializeFirebase;
