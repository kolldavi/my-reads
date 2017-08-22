import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import ReactModal from 'react-modal';

class Book extends Component {
  //assign required prop-types to book component
  static PropTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };
  state = {
    displayModal: false
  };
  //updateBook using BookAPI
  updateBook = event => {
    const { book, onMoveBook } = this.props;
    let shelf = event.target.value;
    BooksAPI.update(book, shelf).then(() => {
      onMoveBook(book, shelf);
    });
  };

  // called when user hovers book cover thumbnail image and clicks to display modal with more info
  toggleModal = () => {
    if (this.state.displayModal) {
      this.setState({ displayModal: false });
    } else {
      this.setState({ displayModal: true });
    }
  };

  //render each book
  render() {
    const book = this.props.book;

    //if thumbnail or authors is unknown add default
    let thumbnail = book.imageLinks
      ? book.imageLinks.thumbnail
      : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
    let authors = book.authors ? book.authors : 'unknown';

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`
            }}
          >
            <div className="book-overlay" onClick={this.toggleModal}>
              <div className="get-more-info">
                <h3>more</h3>
              </div>
            </div>
          </div>
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
          {authors}
        </div>
        <ReactModal
          onRequestClose={this.toggleModal}
          isOpen={this.state.displayModal}
          contentLabel="Modal"
        >
          <h1 className="modal-header">
            {book.title}
          </h1>
          <div className="modal-book-info">
            <div
              className="modal-book-cover"
              style={{
                backgroundImage: `url('${thumbnail}')`,
                width: 128,
                height: 193
              }}
            />
            <div>
              <h3 className="modal-header">Published By</h3>
              <p className="modal-detail">
                {book.publisher}
              </p>
            </div>
            <div>
              <h3 className="modal-header">Date Published</h3>
              <p className="modal-detail">
                {book.publishedDate}
              </p>
            </div>
            <div>
              <h3 className="modal-header">Author(s)</h3>
              <p className="modal-detail">
                {authors}
              </p>
            </div>
          </div>
          <div className="modal-description-container">
            <h3 className="modal-description-detail-header">Description</h3>
            <p className="modal-book-detail">
              {book.description}
            </p>
          </div>
          <div className="close-button-container">
            <button className="close-modal-button" onClick={this.toggleModal}>
              close
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Book;
