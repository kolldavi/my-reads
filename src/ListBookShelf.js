import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
class ListBookShelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, category } = this.props;

    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">
            {category}
          </h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(book =>
                <li key={book.id}>
                  <Book book={book} moveBook={this.props.onChangeShelf} />
                </li>
              )}
            </ol>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBookShelf;
