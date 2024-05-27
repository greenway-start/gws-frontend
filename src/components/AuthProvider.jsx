import React, { createContext, useContext, useEffect, useState } from "react";
import initializeFirebase from "./firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initFirebase = async () => {
      const { auth, db } = await initializeFirebase();
      setAuth(auth);
      setDb(db);
    };

    initFirebase();
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        console.log('Auth state changed', user);
      });
      return () => unsubscribe();
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser, auth, db }}>
      {children}
    </AuthContext.Provider>
  );
};
