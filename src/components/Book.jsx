import React, { useState } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import AddBook from "./AddBook";

const Book = ({ book, onDelete, onEdit }) => {
    const [editForm, setEditForm] = useState(false);

    const toggleEditForm = () => {
        setEditForm(!editForm);
    };

    return (
        <div className="book">
            <IoCloseCircleSharp 
                onClick={() => onDelete(book.id)} 
                className="delete-icon" 
                title="Delete Book"
            />
            <IoHammerSharp 
                onClick={toggleEditForm} 
                className="edit-icon" 
                title="Edit Book"
            />
            <h3>{book.avtor} {book.name}</h3>
            {editForm && <AddBook book={book} onAdd={onEdit} />}
        </div>
    );
};

export default Book;
