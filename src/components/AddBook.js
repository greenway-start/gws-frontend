import React from "react";

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avtor: "",
            name: "",
        };
        this.myForm = React.createRef();
    }

    render() {
        return (
            <form ref={this.myForm}>
                <input
                    placeholder="Автор"
                    onChange={(e) => this.setState({ avtor: e.target.value })}
                />
                <input
                    placeholder="Книга"
                    onChange={(e) => this.setState({ name: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => {
                        this.myForm.current.reset();
                        const bookAdd = {
                            avtor: this.state.avtor,
                            name: this.state.name,
                        };
                        if (this.props.book) {
                            bookAdd.id = this.props.book.id;
                        }
                        this.props.onAdd(bookAdd);
                    }}
                >
                    Добавить
                </button>
            </form>
        );
    }
}

export default AddBook;
