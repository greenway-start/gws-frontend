import React, { useState, useEffect } from "react";
import BookView from "./BookView";
import Filter from "./Filter";
import { Book as BookType } from "../common/types/bookt";

interface BooksProps {
  books: BookType[];
  onEdit: (book: BookType) => void;
  onDelete: (id: string) => void;
}

const Books: React.FC<BooksProps> = ({ books = [], onEdit, onDelete }) => {
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleFilterChange = (searchTerm: string, filterDate: string, sortOrder: "asc" | "desc") => {
    const filtered = books.filter(book =>
      book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.avtor?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.publishDate || "").getTime();
      const dateB = new Date(b.publishDate || "").getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const finalBooks = filterDate
      ? sorted.filter(book => new Date(book.publishDate || "").getFullYear() === parseInt(filterDate))
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
            <BookView key={book.id} book={book} onEdit={(updatedBook: BookType) => onEdit({ ...book, ...updatedBook })} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
