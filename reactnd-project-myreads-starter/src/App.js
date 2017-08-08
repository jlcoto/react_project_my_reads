import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import './App.css';
import ListReads from './ListReads.js';
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
    this.setState({books: this.state.books.concat([book])})
    BooksAPI.update(book, shelf)
  }


  render() {

    const { books } = this.state
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListReads books={books.filter((book) => book.shelf ===  'currentlyReading')}  onUpdateShelf={this.moveBook.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListReads books={books.filter((book) => book.shelf ===  'wantToRead')}  onUpdateShelf={this.moveBook.bind(this)}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListReads books={books.filter((book) => book.shelf ===  'read')} onUpdateShelf={this.moveBook.bind(this)}/>
                  </div>
                </div>
              </div>
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
