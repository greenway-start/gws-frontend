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

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

const initializeFirebase = (): { auth: Auth; db: Firestore } => {
  if (!firebaseApp) {
    console.log("Initializing Firebase App");
    console.log("Firebase Initialized Successfully with", { auth, db });

    firebaseApp = initializeApp(firebaseConfigData as FirebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    console.log("Firebase Initialized Successfully with", { auth, db });
  }
  return { auth: auth!, db: db! };
};

export { initializeFirebase };
