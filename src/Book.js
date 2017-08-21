import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  //assign required prop-types to book component
  static PropTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  //updateBook using BookAPI
  updateBook = event => {
    const { book, onMoveBook } = this.props;
    let shelf = event.target.value;
    BooksAPI.update(book, shelf).then(() => {
      onMoveBook(book, shelf);
    });
  };

  //render each book
  render() {
    const book = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks['thumbnail']})`
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.updateBook}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {book.authors}
        </div>
      </div>
    );
  }
}

export default Book;
