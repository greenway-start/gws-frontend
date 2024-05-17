import React, { useState, useRef } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = (props) => {
    const [avtor, setAvtor] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({ avtor: "", name: "" });
    const myForm = useRef(null);

    const handleAddBook = () => {
        if (validateForm()) {
            myForm.current.reset();
            const bookAdd = {
                avtor: avtor,
                name: name,
            };
            if (props.book) {
                bookAdd.id = props.book.id;
            }
            props.onAdd(bookAdd);
            setAvtor("");
            setName("");
            setErrors({ avtor: "", name: "" });
        }
    };

    const validateForm = () => {
        let valid = true;
        let errors = { avtor: "", name: "" };

        if (!/^[a-zA-Zа-яА-Я\s]*$/.test(avtor)) {
            errors.avtor = "Автор не должен содержать цифр.";
            valid = false;
        }

        if (name.length > 100) {
            errors.name = "Название книги не должно превышать 100 символов.";
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

            <Button variant="primary" type="button" onClick={handleAddBook}>
                Добавить
            </Button>
        </Form>
    );
};

export default AddBook;
