import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfigData from './firebaseConfig.json';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface FirebaseInitialization {
  auth: Auth;
  db: Firestore;
}


const initializeFirebase = async (): Promise<FirebaseInitialization> => {
  const firebaseConfig = firebaseConfigData as FirebaseConfig 
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);
  const db: Firestore = getFirestore(app);

  console.log('Firebase initialized', { auth, db });

  return { auth, db };
};

export default initializeFirebase;
