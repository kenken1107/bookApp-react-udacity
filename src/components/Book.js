import React from "react";

function Book({ book, updateShelfCategory }) {
  const { title, publisher } = book;
  const bookImage = book.imageLinks.thumbnail
    ? book.imageLinks.thumbnail
    : "none";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookImage})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : "none"}
            onChange={(e) => updateShelfCategory(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{publisher}</div>
    </div>
  );
}

export default Book;
