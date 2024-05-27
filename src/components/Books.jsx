// src/components/Books.jsx

import React, { useState, useEffect } from "react";
import Book from "./Book";
import Filter from "./Filter";

const Books = ({ books = [], onEdit, onDelete }) => {
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    const handleFilterChange = (searchTerm, filterDate, sortOrder) => {
        const filtered = books.filter(book =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.avtor.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.publishDate);
            const dateB = new Date(b.publishDate);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        const finalBooks = filterDate
            ? sorted.filter(book => new Date(book.publishDate).getFullYear() === parseInt(filterDate))
            : sorted;

        setFilteredBooks(finalBooks);
    };

    return (
        <div className="container">
            <Filter onFilterChange={handleFilterChange} />
            {filteredBooks.length === 0 ? (
                <p>Ничего не найдено</p>
            ) : (
                <div className="mt-3">
                    {filteredBooks.map(book => (
                        <Book key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Books;
