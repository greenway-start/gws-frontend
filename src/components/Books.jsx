import React from "react";
import Book from "./Book";

const Books = ({ books, onEdit, onDelete }) => {
    if (books.length < 1) {
        return (
            <div className="book">
                <h3>Книг нет</h3>
            </div>
        );
    }

    return (
        <div>
            {books.map((el) => (
                <Book
                    key={el.id}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    book={el}
                />
            ))}
        </div>
    );
};

export default Books;


