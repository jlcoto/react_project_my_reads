import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListReads from './ListReads.js';


class WantRead extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		showInBookShelf: PropTypes.func.isRequired
	}

	showBook = (book, shelf) => {
		this.props.showInBookShelf(book, shelf)
	}

	render () {

		const { books } = this.props
		let currentReads = books.filter((book) => book.shelf ===  'currentlyReading')

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Currently Reading</h2>
	            <div className="bookshelf-books">
		            <ListReads books={currentReads}  onUpdateShelf={this.showBook.bind(this)}/>
	            </div>
			</div>
		)
	}
}


export default WantRead