import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./pages/AddBook";
import { v4 as uuidv4 } from 'uuid';
import './scc/main.css';

const App = () => {
    const [books, setBooks] = useState([
        {
            id: uuidv4(),
            avtor: 'Alisher',
            name: 'street',
        },
    ]);

    const deleteBook = (id) => {
        setBooks(books.filter((el) => el.id !== id));
    };

    const addBook = (book) => {
        const newBook = { id: uuidv4(), ...book };
        setBooks([...books, newBook]);
    };

    const editBook = (book) => {
        const updatedBooks = books.map((el) =>
            el.id === book.id ? { ...book } : el
        );
        setBooks(updatedBooks);
    };

    return (
        <Router>
            <div>
                <Header title="Список книг" />
                <main>
                    <Routes>
                        <Route path="/" element={<Books books={books} onEdit={editBook} onDelete={deleteBook} />} />
                        <Route path="/addBook" element={<AddBook onAdd={addBook} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
