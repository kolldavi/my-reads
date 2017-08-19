import React from 'react';
import ListBookShelf from './ListBookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    results: []
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBooks />} />

        <Route exact path="/" render={() => <ListBookShelf />} />
      </div>
    );
  }
}
export default BooksApp;
