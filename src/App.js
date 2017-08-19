import React from 'react';
import ListBookShelf from './ListBookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  updateBook = (book, newShelf) => {
    book.shelf = newShelf;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }));
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  render() {
    const books = this.state.books,
      shelfCategories = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBooks />} />

        <Route
          exact
          path="/"
          render={({ history }) =>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfCategories.map(category => {
                    let sortedBooks = books.filter(
                      book => book.shelf === category
                    );
                    return (
                      <ListBookShelf
                        key={category}
                        books={sortedBooks}
                        onChangeShelf={this.updateBook}
                        category={category}
                      />
                    );
                  })}
                </div>
              </div>
            </div>}
        />
      </div>
    );
  }
}
export default BooksApp;
