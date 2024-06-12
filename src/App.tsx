// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Books from "./components/Books";
import AddBook from "./pages/AddBook";
import useBook from './hook/useBook';
import './scc/main.css';
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
    const { books, deleteBook, addBook, editBook } = useBook();

    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Sidebar />
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/books"
                                element={
                                    <ProtectedRoute>
                                        <>
                                            <Books books={books} onEdit={editBook} onDelete={deleteBook} />
                                        </>
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
                            <Route path="/*" element={<Navigate to="/books" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
