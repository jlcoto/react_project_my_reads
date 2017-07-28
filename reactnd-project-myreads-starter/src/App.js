import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListReads from './ListReads.js'
import SearchBook from './SearchBook.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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


  render() {
    const { books } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook />
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
