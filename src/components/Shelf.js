import React from "react";
import Book from "./Book";

function Shelf({ shelfCategory, books, updateShelfCategory }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfCategory}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} updateShelfCategory={updateShelfCategory} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
