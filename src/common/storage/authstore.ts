import { makeAutoObservable } from "mobx";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

class AuthStore {
  email = "";
  error = "";
  auth: Auth | null = null;
  db: Firestore | null = null;

  constructor(auth: Auth | null, db: Firestore | null) {
    makeAutoObservable(this);
    this.auth = auth;
    this.db = db;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setError(error: string) {
    this.error = error;
  }

  async login(email: string, password: string) {
    this.setError("");
    if (!this.auth) {
      this.setError("Ошибка инициализации аутентификации.");
      return;
    }
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.setError("Ошибка входа. Проверьте ваш email и пароль.");
      console.error("Error logging in:", error);
    }
  }

  isAuthenticated(): boolean {
    return this.auth !== null && this.auth.currentUser !== null;
  }
}

export default AuthStore;
