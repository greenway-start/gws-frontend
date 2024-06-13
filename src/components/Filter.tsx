import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EventContext } from "../common/types/bookt";

interface FilterProps {
  onFilterChange: (searchTerm: string, filterDate: string, sortOrder: "asc" | "desc") => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterDate, setFilterDate] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSearch = (e: any) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange(value, filterDate, sortOrder);
    };

    const handleFilterDateChange = (e: any) => {
        const value = e.target.value;
        setFilterDate(value);
        onFilterChange(searchTerm, value, sortOrder);
    };

    const handleSortOrderChange = (e: EventContext) => {
        const value = e.target.value;
        setSortOrder(value as "asc" | "desc");
        onFilterChange(searchTerm, filterDate, value as "asc" | "desc");
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
