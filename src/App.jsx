import React from "react";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import { v4 as uuidv4 } from 'uuid'; 
import './scc/main.css';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {
                    id: uuidv4(),
                    avtor: 'Alisher',
                    name: 'street',
                },
            ],
        };
    }

    deleteBook = (id) => {
        this.setState({
            books: this.state.books.filter((el) => el.id !== id),
        });
    }

    addBook = (book) => {
        const newBook = { id: uuidv4(), ...book };
        this.setState({ books: [...this.state.books, newBook] });
    }

    editBook = (book) => {
        const books = this.state.books.map((el) =>
            el.id === book.id ? { ...book } : el
        );
        this.setState({ books });
    }

    render() {
        <form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>    
        return (
            <div>
                <Header title="список книг" />
                <main>
                    <Books books={this.state.books} onEdit={this.editBook} onDelete={this.deleteBook} />
                </main>
                <aside>
                    <AddBook onAdd={this.addBook} />
                </aside>
            </div>
        );
    }
}

export default App;
