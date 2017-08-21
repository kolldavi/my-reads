import React, { Component } from 'react';
import ListBookShelf from './ListBookShelf';
import { Link } from 'react-router-dom';

class ListAllShelves extends Component {
  //render all books on all shelves
  render() {
    const { books, onMoveBook } = this.props;
    const shelfCategories = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="list-books-content">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {//sort each book into category and render entire shelf
              shelfCategories.map(category => {
                let sortedBooks = books.filter(book => book.shelf === category);
                return (
                  <ListBookShelf
                    key={category}
                    books={sortedBooks}
                    onMoveBook={onMoveBook}
                    category={category}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListAllShelves;
