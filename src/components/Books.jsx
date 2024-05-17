import React from "react";
import Book from "./Book";

const Books = ({ books, onEdit, onDelete }) => {
    return (
        <div>
            {books.length > 0 ? (
                books.map((el) => (
                    <Book
                        key={el.id}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        book={el}
                    />
                ))
            ) : (
                <div className="book">
                    <h3>Книг нет</h3>
                </div>
            )}
        </div>
    );
};

export default Books;
