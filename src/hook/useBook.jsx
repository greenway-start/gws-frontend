import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { loadBooksFromLocalStorage, saveBooksToLocalStorage } from '../storage/bookStorage';

const useBook = () => {
    const [books, setBooks] = useState(loadBooksFromLocalStorage);

    useEffect(() => {
        saveBooksToLocalStorage(books);
    }, [books]);

    const deleteBook = (id) => {
        const updatedBooks = books.filter((el) => el.id !== id);
        setBooks(updatedBooks);
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

    return { books, deleteBook, addBook, editBook };
};

export default useBook;