import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Book from "./Book";

const Books = ({ books, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterDateChange = (e) => {
        setFilterDate(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.avtor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBooks = filteredBooks.sort((a, b) => {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const finalBooks = filterDate
        ? sortedBooks.filter(book => new Date(book.publishDate).getFullYear() === parseInt(filterDate))
        : sortedBooks;

    return (
        <div className="container">
            <Form>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Поиск книги..."
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Фильтр по году публикации"
                        onChange={handleFilterDateChange}
                        value={filterDate}
                    />
                </InputGroup>
                <Form.Group className="mb-3">
                    <Form.Label>Сортировка</Form.Label>
                    <Form.Control as="select" onChange={handleSortOrderChange} value={sortOrder}>
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => { setSearchTerm(""); setFilterDate(""); }}>
                    Сбросить фильтры
                </Button>
            </Form>
            {finalBooks.length === 0 ? (
                <p>Ничего не найдено</p>
            ) : (
                <div className="mt-3">
                    {finalBooks.map(book => (
                        <Book key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
                    ))}

                    
                </div>
            )}
        </div>
    );
};

export default Books;
