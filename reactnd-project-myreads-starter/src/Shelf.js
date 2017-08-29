import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListReads from './ListReads.js';


class Shelf extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfTitle: PropTypes.string.isRequired,
		showInBookShelf: PropTypes.func.isRequired
	}

	showBook = (book, shelf) => {
		this.props.showInBookShelf(book, shelf)
	}

	render () {

		const { books, shelfTitle } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title"> {shelfTitle} </h2>
	            <div className="bookshelf-books">
		            <ListReads books={books}  onUpdateShelf={this.showBook.bind(this)}/>
	            </div>
			</div>
		)
	}
}


export default Shelf