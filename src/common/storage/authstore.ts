import { makeAutoObservable } from "mobx";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

class AuthStore {
  email = "";
  password = "";
  error = "";
  auth: Auth | null = null;
  db: Firestore | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setError(error: string) {
    this.error = error;
  }

  setAuth(auth: Auth | null) {
    this.auth = auth;
  }

  setDb(db: Firestore | null) {
    this.db = db;
  }

  async login() {
    this.setError("");
    if (!this.auth) {
      this.setError("Ошибка инициализации аутентификации.");
      return;
    }
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
    } catch (error) {
      this.setError("Ошибка входа. Проверьте ваш email и пароль.");
      console.error("Error logging in:", error);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
