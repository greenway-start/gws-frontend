import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./pages/AddBook";
import useBook from './hook/useBook';
import './scc/main.css';

const App = () => {
    const { books, deleteBook, addBook, editBook } = useBook();

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