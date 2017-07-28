import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListReads from './ListReads.js'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

	state = {query: '',
			booksFound: []}

	updateQuery = (query) => {
		let newQuery = query.trim();
		this.setState({query: newQuery})


		if (newQuery !== ''){
			BooksAPI.search(newQuery, 5).then((books) => {
				if (!books.error) {
					books.map((book) => {
						return book.shelf = 'none';
					})
					this.setState({booksFound: books})
					}
				})
		} else if (newQuery === '') {
			this.setState({booksFound: []})
		}



	}

	moveToMyRead = (book, shelf) => {

	}




	render() {


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
        	    	<ListReads books={booksFound} onUpdateShelf={this.moveToMyRead.bind(this)}/>
        	    </div>
        	</div>)
	}

}

export default SearchBook