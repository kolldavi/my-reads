import React from 'react';
import ListAllShelves from './ListAllShelves';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
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

  //get search results
  getSearchResults = response => {
    const currentBooks = response.map(result => {
      for (let book of this.state.books) {
        if (result.id === book.id) {
          // set its shelf equal to the shelf of the already present book
          result.shelf = book.shelf;
        } else {
          //set its shelf to 'none' if book not on shelf
          result.shelf = 'none';
        }
      }
      return result;
    });
    this.setState({ results: currentBooks });
  };

  searchForBooks = query => {
    //if nothing searched set results to empty array
    if (query === '') {
      this.setState({ results: [] });
      return;
    }
    //search for books
    BooksAPI.search(query, 20).then(response => {
      //if has results handle then call getSearchResults method to handle response from sever
      if (response.length > 0) {
        this.getSearchResults(response);
      } else {
        //no curent results found
        this.setState({ results: [] });
      }
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) =>
            //render Search page
            <SearchBooks
              books={this.state.results}
              onSearchForBook={query => {
                this.searchForBooks(query);
              }}
              onMoveBook={(book, shelf) => {
                this.updateBook(book, shelf);
              }}
            />}
        />

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
