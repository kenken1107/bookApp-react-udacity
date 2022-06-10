import React from "react";
import Shelf from "./Shelf";

function Shelves({ books, updateShelfCategory }) {
  // categorise books
  const booksCurrentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const booksWantToRead = books.filter((book) => book.shelf === "wantToRead");
  const booksRead = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <Shelf
        shelfCategory={"Currently Reading"}
        books={booksCurrentlyReading}
        updateShelfCategory={updateShelfCategory}
      />
      <Shelf
        shelfCategory={"Want To Read"}
        books={booksWantToRead}
        updateShelfCategory={updateShelfCategory}
      />
      <Shelf
        shelfCategory={"Read"}
        books={booksRead}
        updateShelfCategory={updateShelfCategory}
      />
    </div>
  );
}

export default Shelves;
