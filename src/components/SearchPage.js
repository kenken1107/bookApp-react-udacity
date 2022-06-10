import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

function SearchPage(props) {
  const { query, setQuery, mergedBooks, updateShelfCategory } = props;
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {mergedBooks.map((mergedBook) => (
            <li key={mergedBook.id}>
              <Book
                book={mergedBook}
                updateShelfCategory={updateShelfCategory}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
