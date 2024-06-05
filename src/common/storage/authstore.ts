import { makeAutoObservable } from "mobx";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

class AuthStore {
  email = "";
  private _password = "";
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

  setPassword(password: string) {
    this._password = password;
  }

  setError(error: string) {
    this.error = error;
  }

  async login() {
    this.setError("");
    if (!this.auth) {
      this.setError("Ошибка инициализации аутентификации.");
      return;
    }
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this._password);
      this.clearPassword();
    } catch (error) {
      this.setError("Ошибка входа. Проверьте ваш email и пароль.");
      console.error("Error logging in:", error);
    }
  }

  clearPassword() {
    this._password = "";
  }

  isAuthenticated(): boolean {
    return this.auth !== null && this.auth.currentUser !== null;
  }
}

export default AuthStore;
