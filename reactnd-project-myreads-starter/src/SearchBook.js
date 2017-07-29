import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListReads from './ListReads.js'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

	static propTypes = {
		moveToMyRead: PropTypes.func.isRequired,
		booksInMyReads: PropTypes.array.isRequired
	}

	state = {query: '',
			booksFound: []}

	booksInShelf = () => (this.props.booksInMyReads.map((book) => book.id))

	updateQuery = (query) => {
		let booksInShelf = this.booksInShelf()
		let newQuery = query.trim();
		this.setState({query: newQuery})
		if (newQuery !== ''){
			BooksAPI.search(newQuery, 5).then((books) => {
				if (!books.error) {
						let newBooks = books.filter(function(book) {
								return booksInShelf.indexOf(book.id) ===-1
							})
						newBooks.map((book) => {
							 return book.shelf = 'none';
							})
					this.setState({booksFound: newBooks})
					}
				})
		} else if (newQuery === '') {
			this.setState({booksFound: []})
		}
	}

	selectBook = (book, shelf) => {
		this.setState((state) => ({booksFound: state.booksFound.filter((b) => b.id !== book.id)}))
		this.props.moveToMyRead(book, shelf)
	}

	render() {

		const { query, booksFound } = this.state




		return(
			<div className="search-books">
        	    <div className="search-books-bar">
        	      <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
        	      <div className="search-books-input-wrapper">
        	        <input
        	        	type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(e) => this.updateQuery(e.target.value)}/>

        	      </div>
        	    </div>
        	    <div className="search-books-results">
        	    	<ListReads books={booksFound} onUpdateShelf={this.selectBook.bind(this)}/>
        	    </div>
        	</div>)
	}

}

export default SearchBook