import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Shelves from "./components/Shelves";

import * as BooksAPI from "./BooksAPI";
import SearchPage from "./components/SearchPage";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const [mergedBooks, setMergedBooks] = useState([]);

  const updateShelfCategory = (focusedBook, whereTo) => {
    const newBooks = books.map((book) => {
      if (book.id === focusedBook.id) {
        focusedBook.shelf = whereTo;
        return focusedBook;
      } else return book;
    });
    setBooks(newBooks);
    BooksAPI.update(focusedBook, whereTo); // これがないと、リフレッシュした時に変更が、mainページに反映されない
  };

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  // Get data for main page from udacity storage
  useEffect(() => {
    BooksAPI.getAll()
      .then((data) => {
        setBooks(data);
        setMapOfIdToBooks(createMapOfBooks(data));
      })
      .catch((err) => console.log("this is an error in the book API", err));
  }, []);

  // Get search result from query
  useEffect(() => {
    if (query) {
      BooksAPI.search(query).then((data) => {
        if (data.error) {
          setSearchedBooks([]);
        } else {
          const filteredData = data.filter(
            (d) => d.publisher !== undefined && d.imageLinks !== undefined
          );
          setSearchedBooks(filteredData);
        }
      });
    }
    // Upon Unmouting -> Reset previous query
    return () => {
      setSearchedBooks([]);
    };
  }, [query]);

  useEffect(() => {
    const combined = searchedBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(combined);
  }, [searchedBooks]);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          {/* Search Page */}
          <Route path="/search">
            <SearchPage
              query={query}
              setQuery={setQuery}
              mergedBooks={mergedBooks}
              updateShelfCategory={updateShelfCategory}
            />
          </Route>

          {/* Main Page */}
          <Route path="/">
            <div className="list-books">
              <Header />
              <Shelves
                books={books}
                updateShelfCategory={updateShelfCategory}
              />
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
