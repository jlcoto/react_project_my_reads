import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Shelf from './Shelf.js'
import SearchBook from './SearchBook.js';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveBook(book, shelf) {
    let changeShelf = []
    this.state.books.forEach((b) => {if (b.id === book.id) {
      b.shelf = shelf}
      changeShelf.push(b);
      })
    this.setState({books: changeShelf})
    BooksAPI.update(book, shelf)
  }

  addBook(book, shelf) {
    book.shelf = shelf
    let booksIds = this.state.books.map((book) => book.id)
    if (booksIds.indexOf(book.id) === -1) {
      this.setState({books: this.state.books.concat([book])})
    } else {
      this.moveBook(book, shelf)
    }
    BooksAPI.update(book, shelf)
  }


  render() {

    let { books } = this.state

    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf books={books.filter((book) => book.shelf ===  'currentlyReading')} shelfTitle={"Currently Reading"} showInBookShelf={this.moveBook.bind(this)}/>
                <Shelf books={books.filter((book) => book.shelf ===  'wantToRead')} shelfTitle={"Want to Read"} showInBookShelf={this.moveBook.bind(this)}/>
                <Shelf books={books.filter((book) => book.shelf ===  'read')} shelfTitle={"Read"} showInBookShelf={this.moveBook.bind(this)}/>
            </div>
            <div className="open-search">
              <Link to="add_book">Add a book</Link>
            </div>
          </div>)}/>
          <Route path="/add_book" render={() =>
            (<SearchBook moveToMyRead={this.addBook.bind(this)} booksInMyReads={books}/>)
          }/>
      </div>
    )
  }
}

export default BooksApp
