import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const Filter = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange(value, filterDate, sortOrder);
    };

    const handleFilterDateChange = (e) => {
        const value = e.target.value;
        setFilterDate(value);
        onFilterChange(searchTerm, value, sortOrder);
    };

    const handleSortOrderChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        onFilterChange(searchTerm, filterDate, value);
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setFilterDate("");
        setSortOrder("asc");
        onFilterChange("", "", "asc");
    };

    return (
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
            <Button variant="primary" type="button" onClick={handleResetFilters}>
                Сбросить фильтры
            </Button>
        </Form>
    );
};

export default Filter;
