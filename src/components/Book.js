import React from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import AddBook from "./AddBook";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editForm: false,
        };
    }

    render() {
        const { book, onDelete, onEdit } = this.props;
        return (
            <div className="book">
                <IoCloseCircleSharp onClick={() => onDelete(book.id)} className="delete-icon" />
                <IoHammerSharp onClick={() => this.setState({ editForm: !this.state.editForm })} className="edit-icon" />
                <h3>{book.avtor} {book.name}</h3>
                {this.state.editForm && <AddBook book={book} onAdd={onEdit} />}
            </div>
        );
    }
}

export default Book;
