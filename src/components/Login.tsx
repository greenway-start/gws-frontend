import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../common/types/store";
import { login } from "../common/authActions";
import { useNavigate } from "react-router-dom";
import { initializeFirebase } from "../common/firebaseConfig";
import { useAuth } from "../hook/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { currentUser, error } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { auth } = initializeFirebase();
    dispatch(login(auth, email, password));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/books");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
    </div>
  );
};

export default Login;
