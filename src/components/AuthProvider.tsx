import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { initializeFirebase } from "../common/firebaseConfig";

interface AuthContextType {
  currentUser: User | null;
  auth: Auth | null;
  db: Firestore | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const { auth, db } = initializeFirebase();
    setAuth(auth);
    setDb(db);
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        console.log('Auth state changed', user);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, auth, db }}>
      {children}
    </AuthContext.Provider>
  );
};
