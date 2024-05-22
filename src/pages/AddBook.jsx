import React, { useState, useRef } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = (props) => {
    const [avtor, setAvtor] = useState("");
    const [name, setName] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [errors, setErrors] = useState({ avtor: "", name: "", publishDate: "" });
    const myForm = useRef(null);

    const handleAddBook = () => {
        if (validateForm()) {
            myForm.current.reset();
            const bookAdd = {
                avtor: avtor,
                name: name,
                publishDate: publishDate
            };
            if (props.book) {
                bookAdd.id = props.book.id;
            }
            props.onAdd(bookAdd);
            setAvtor("");
            setName("");
            setPublishDate("");
            setErrors({ avtor: "", name: "", publishDate: "" });
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
                Добавить
            </Button>
        </Form>
    );
};

export default AddBook;