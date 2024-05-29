import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
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
