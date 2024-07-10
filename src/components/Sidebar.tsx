import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import LogoutButton from "./LogoutButton";
import logo from "../image/logo.png";

const Sidebar: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Список книг</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/books">Главная</Link></li>
          <li><Link to="/addBook">Добавить Книгу</Link></li>
          {!currentUser && (
            <>
              <li><Link to="/login">Вход</Link></li>
              <li><Link to="/register">Регистрация</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div className="user-info">
        {currentUser ? (
          <>
            <p>{currentUser.email}</p>
            <LogoutButton />
          </>
        ) : (
          <p>Вы не вошли в систему</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
