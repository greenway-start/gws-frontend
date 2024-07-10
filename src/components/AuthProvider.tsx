import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { initializeFirebase } from "../common/firebaseConfig";

interface AuthContextType {
  currentUser: User | null;
  auth: Auth | null;
  db: Firestore | null;
}

// Define the initial value properly with the correct type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;  // Explicitly define the type for children
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { auth, db } = initializeFirebase();
      setAuth(auth);
      setDb(db);
      if (auth && db) {
        setInitialized(true);
        const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
        return () => unsubscribe();
      }
    };
    init();
  }, []);

  if (!isInitialized) {
    return <div>Инициализация системы...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, auth, db }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
