import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../hook/useAuth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth(); // Получаем экземпляр Auth из контекста

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        if (!auth) {
            setError("Система аутентификации не инициализирована");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/books"); // Перенаправление на страницу после успешной регистрации
        } catch (error: any) {
            setError("Ошибка регистрации: " + error.message);
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
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
                    placeholder="Пароль"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Подтвердите пароль"
                    required
                />
                <button type="submit">Зарегистрироваться</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
