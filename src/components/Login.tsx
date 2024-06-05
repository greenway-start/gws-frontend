import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "../common/storage/authstore";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { auth, db } = useAuth();
  const [password, setPassword] = useState<string>("");

  const authStore = new AuthStore(auth, db); // Создаем экземпляр с инициализацией

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    authStore.setPassword(password);  // Устанавливаем пароль в authStore
    await authStore.login();
    if (authStore.isAuthenticated()) {
      navigate("/books");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={authStore.email}
          onChange={(e) => authStore.setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}  // Используем локальное состояние
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {authStore.error && <p style={{ color: 'red' }}>{authStore.error}</p>}
    </div>
  );
};

export default observer(Login);
