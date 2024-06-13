import React from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../common/types/store";
import { useAuth } from "../hook/useAuth";
import { logout } from "../common/authActions";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
    const { auth } = useAuth();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("Logout button clicked");
        if (auth) {
            await dispatch(logout(auth));
            navigate("/login");
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Выйти
        </button>
    );
};

export default LogoutButton;
