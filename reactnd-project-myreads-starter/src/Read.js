import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListReads from './ListReads.js';


class Read extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		showInBookShelf: PropTypes.func.isRequired
	}

	showBook = (book, shelf) => {
		this.props.showInBookShelf(book, shelf)
	}

	render () {

		const { books } = this.props
		let reads = books.filter((book) => book.shelf ===  'read')

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Read</h2>
	            <div className="bookshelf-books">
		            <ListReads books={reads}  onUpdateShelf={this.showBook.bind(this)}/>
	            </div>
			</div>
		)
	}
}


export default Read