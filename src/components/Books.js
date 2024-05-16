import React from "react";
import Book from "./Book";

class Books extends React.Component {
    render() {
        if (this.props.books.length > 0) {
            return (
                <div>
                    {this.props.books.map((el) => (
                        <Book
                            onEdit={this.props.onEdit}
                            onDelete={this.props.onDelete}
                            key={el.id}
                            book={el}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="book">
                    <h3>Книг нет</h3>
                </div>
            );
        }
    }
}

export default Books;
