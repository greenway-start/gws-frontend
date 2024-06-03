import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { loadBooksFromLocalStorage, saveBooksToLocalStorage } from '../common/storage/bookStorage';
import { Book, BookCreate } from '../common/types/BOOK';

const useBook = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const initialBooks = loadBooksFromLocalStorage() || [];
        setBooks(initialBooks);
    }, []);

    useEffect(() => {
        saveBooksToLocalStorage(books);
    }, [books]);

    const deleteBook = (id: string) => {
        const updatedBooks = books.filter((el) => el.id !== id);
        setBooks(updatedBooks);
    };

    const addBook = (book: BookCreate) => {
        const newBook: Book = { id: uuidv4(), ...book } as Book
        setBooks([...books, newBook]);
    };

    const editBook = (book: Book) => {
        const updatedBooks = books.map((el) =>
            el.id === book.id ? { ...book } : el
        );
        setBooks(updatedBooks);
    };

    return { books, deleteBook, addBook, editBook };
};

export default useBook;
