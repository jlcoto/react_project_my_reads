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
		let wantReads = books.filter((book) => book.shelf ===  'wantToRead')

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Want to Read</h2>
	            <div className="bookshelf-books">
		            <ListReads books={wantReads}  onUpdateShelf={this.showBook.bind(this)}/>
	            </div>
			</div>
		)
	}
}


export default WantRead