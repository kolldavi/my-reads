import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import SortBy from 'sort-by';
class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };
  //Item user searches for
  state = {
    query: ''
  };

  //get user query
  onSearchForBook = event => {
    event.preventDefault();
    let userQuery = event.target.value;
    this.setState({ query: userQuery });
    userQuery = userQuery.trim();
    this.props.onSearchForBook(userQuery);
  };

  //clears query string
  clearSearch = () => {
    this.setState({ query: '' });
    this.props.onQuery('');
  };

  render() {
    const { books, onMoveBook } = this.props;

    //sort books alphabetical by title
    books.sort(SortBy('title'));

    //current search term
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearSearch}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.onSearchForBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => {
              return (
                <li key={book.id}>
                  <Book key={book.id} book={book} onMoveBook={onMoveBook} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
