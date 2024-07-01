import React from "react";
import { Link } from "react-router-dom";
import logo from '../image/logo.png'; // Импорт логотипа

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" /> {/* Использование импортированного логотипа */}
                <h1>{title}</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/addBook">Добавить Книгу</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
