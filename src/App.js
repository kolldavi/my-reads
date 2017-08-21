import React from 'react';
import ListAllShelves from './ListAllShelves';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  //get all books onload
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  //update book when changes shelf
  updateBook = (book, newShelf) => {
    book.shelf = newShelf;
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }));
  };
  render() {
    return (
      <div className="app">
        {console.log(this.state.books)}
        <Route path="/search" render={() => <SearchBooks />} />

        <Route
          exact
          path="/"
          render={() =>
            //render all books on shelves
            <ListAllShelves
              books={this.state.books}
              onMoveBook={(book, shelf) => {
                this.updateBook(book, shelf);
              }}
            />}
        />
      </div>
    );
  }
}
export default BooksApp;
