// src/pages/AddBook.jsx

import React, { useState, useRef } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = ({ onAdd, book }) => {
    const [avtor, setAvtor] = useState(book ? book.avtor : "");
    const [name, setName] = useState(book ? book.name : "");
    const [publishDate, setPublishDate] = useState(book ? book.publishDate : "");
    const [errors, setErrors] = useState({ avtor: "", name: "", publishDate: "" });
    const myForm = useRef(null);

    const handleAddBook = () => {
        if (validateForm()) {
            const bookAdd = {
                avtor,
                name,
                publishDate
            };
            if (book) {
                bookAdd.id = book.id;
            }
            onAdd(bookAdd);
            setAvtor("");
            setName("");
            setPublishDate("");
            setErrors({ avtor: "", name: "", publishDate: "" });
            if (myForm.current) {
                myForm.current.reset();
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        let errors = { avtor: "", name: "", publishDate: "" };

        if (!/^[a-zA-Zа-яА-Я\s]*$/.test(avtor)) {
            errors.avtor = "Автор не должен содержать цифр.";
            valid = false;
        }

        if (name.length > 100) {
            errors.name = "Название книги не должно превышать 100 символов.";
            valid = false;
        }

        if (!/^\d{4}$/.test(publishDate)) {
            errors.publishDate = "Дата публикации должна быть годом (4 цифры).";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleAvtorChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Zа-яА-Я\s]*$/.test(value) || value === "") {
            setAvtor(value);
            setErrors({ ...errors, avtor: "" });
        } else {
            setErrors({ ...errors, avtor: "Автор не должен содержать цифр." });
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length <= 100) {
            setName(value);
            setErrors({ ...errors, name: "" });
        } else {
            setName(value);
            setErrors({ ...errors, name: "Название книги не должно превышать 100 символов." });
        }
    };

    const handlePublishDateChange = (e) => {
        const value = e.target.value;
        setPublishDate(value);
    };

    return (
        <Form ref={myForm}>
            <Form.Group controlId="formAvtor">
                <Form.Label>Автор</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите автора"
                    value={avtor}
                    onChange={handleAvtorChange}
                    isInvalid={!!errors.avtor}
                />
                {errors.avtor && <Form.Control.Feedback type="invalid">{errors.avtor}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group controlId="formName">
                <Form.Label>Книга</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите название книги"
                    value={name}
                    onChange={handleNameChange}
                    isInvalid={!!errors.name}
                />
                {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group controlId="formPublishDate">
                <Form.Label>Дата публикации (год)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите год публикации"
                    value={publishDate}
                    onChange={handlePublishDateChange}
                    isInvalid={!!errors.publishDate}
                />
                {errors.publishDate && <Form.Control.Feedback type="invalid">{errors.publishDate}</Form.Control.Feedback>}
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleAddBook}>
                {book ? "Обновить книгу" : "Добавить книгу"}
            </Button>
        </Form>
    );
};

export default AddBook;
