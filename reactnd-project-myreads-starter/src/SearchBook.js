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
				console.log(booksInShelf)
				if (!books.error) {
						let newBooks = books.filter(function(book) {
							console.log(booksInShelf.indexOf(book.id) !==-1)
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




		// this.setState((state) => ({booksFound: state.booksFound.filter((book) => !booksInShelf.includes(book))}))



	render() {

		const { moveToMyRead, booksInMyReads} = this.props
		const { query, booksFound } = this.state




		return(
			<div className="search-books">
        	    <div className="search-books-bar">
        	      <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
        	      <div className="search-books-input-wrapper">
        	        {/*
        	        //   NOTES: The search from BooksAPI is limited to a particular set of search terms.
        	        //   You can find these search terms here:x
        	        //   https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        	        //   However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        	        //   you don't find a specific author or title. Every search is limited by search terms.
        	        // */}
        	        <input
        	        	type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(e) => this.updateQuery(e.target.value)}/>

        	      </div>
        	    </div>
        	    <div className="search-books-results">
        	    	<ListReads books={booksFound} onUpdateShelf={(book, shelf) => moveToMyRead(book, shelf)}/>
        	    </div>
        	</div>)
	}

}

export default SearchBook