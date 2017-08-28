import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListReads from './ListReads.js';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {

	static propTypes = {
		moveToMyRead: PropTypes.func.isRequired,
		booksInMyReads: PropTypes.array.isRequired
	}

	state = {query: '',
			booksFound: []}

	booksInShelf = () => (this.props.booksInMyReads.map((book) => book.id))

	updateQuery = (query) => {
		let booksInMyReads = this.props.booksInMyReads
		let booksInShelf = this.booksInShelf()
		let newQuery = query.trim();
		this.setState({query: newQuery})
		if (newQuery !== ''){
			BooksAPI.search(newQuery, 5).then((books) => {
				if (!books.error) {
					let booksToShow = []
						books.forEach(function(book){
							if(booksInShelf.indexOf(book.id)!==-1){
								booksToShow.push(booksInMyReads[booksInShelf.indexOf(book.id)])
							} else {
								booksToShow.push(book)
							}
						})
					this.setState({booksFound: booksToShow})
					}
				})
		} else if (newQuery === '') {
			this.setState({booksFound: []})
		}
	}

	selectBook = (book, shelf) => {
		this.props.moveToMyRead(book, shelf)
	}

	render() {
		const { query, booksFound } = this.state

		return(
			<div className="search-books">
        	    <div className="search-books-bar">
        	      <Link
        	      	className="close-search"
        	      	to="/">Close</Link>
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