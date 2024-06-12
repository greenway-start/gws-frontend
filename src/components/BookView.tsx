import React, { useState } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import AddBook from "../pages/AddBook";
import { Book } from "../common/types/bookt";

interface BookProps {
  book: Book;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

const BookView = ({ book, onDelete, onEdit }: BookProps) => {
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
      {editForm && <AddBook book={book} onAdd={(updatedBook) => onEdit({ ...book, ...updatedBook })} />}
    </div>
  );
};

export default BookView;
