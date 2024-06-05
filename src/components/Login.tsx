import React, { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../common/storage/authstore";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { auth, db } = useAuth();

  useEffect(() => {
    authStore.setAuth(auth);
    authStore.setDb(db);
  }, [auth, db]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await authStore.login();
    if (!authStore.error) {
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
          value={authStore.password}
          onChange={(e) => authStore.setPassword(e.target.value)}
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
