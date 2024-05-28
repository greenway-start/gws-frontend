import React, { useState } from "react";
import { Book, BookCreate } from "../common/types";

interface AddBookProps {
  book?: Book;
  onAdd: (book: BookCreate) => void;
}

const AddBook: React.FC<AddBookProps> = ({ book, onAdd }) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [avtor, setAvtor] = useState(book?.avtor || "");
  const [name, setName] = useState(book?.name || "");
  const [publishDate, setPublishDate] = useState(book?.publishDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      title,
      author,
      avtor,
      name,
      publishDate
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <input
        type="text"
        value={avtor}
        onChange={(e) => setAvtor(e.target.value)}
        placeholder="Avtor"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        placeholder="Publish Date"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddBook;
