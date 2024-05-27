import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./pages/AddBook";
import useBook from './hook/useBook';
import './scc/main.css';
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";

const App = () => {
    const { books, deleteBook, addBook, editBook } = useBook();

    return (
        <AuthProvider>
            <Router>
                <div>
                    <Header title="Список книг" />
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/books"
                                element={
                                    <ProtectedRoute>
                                        <Books books={books} onEdit={editBook} onDelete={deleteBook} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/addBook"
                                element={
                                    <ProtectedRoute>
                                        <AddBook onAdd={addBook} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/books" />} />
                            <Route path="*" element={<Navigate to="/books" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
