import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAChE1mSgIZXs9PG3n75Z1do1KtNXV_zRw",
  authDomain: "work-f4051.firebaseapp.com",
  projectId: "work-f4051",
  storageBucket: "work-f4051.appspot.com",
  messagingSenderId: "527211518096",
  appId: "1:527211518096:web:1bdfe2453bbc8f8b0da015",
  measurementId: "G-WHX89KXNWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
