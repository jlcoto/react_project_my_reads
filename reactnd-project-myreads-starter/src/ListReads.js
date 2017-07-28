import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListReads extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		shelf: PropTypes.string.isRequired,
		onUpdateShelf: PropTypes.func.isRequired

	}


	render(){
		const { books, shelf, onUpdateShelf } = this.props



		let filteredBooks = books.filter((book) => book.shelf ===  shelf );
		let title;



		if (shelf === 'currentlyReading') {
			title = 'Currently Reading';
		} else if (shelf === 'wantToRead') {
			title = 'Want to Read';
		} else {
			title = 'Read'
		}

		return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
          	<div className="bookshelf-books">
			<ol className="books-grid">
				{filteredBooks.map((book) => (
					<li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                            <div className="book-shelf-changer">
                            	<form onSubmit={this.handleSubmit}>
                              		<select value={book.shelf} onChange={(e) => onUpdateShelf(book, e.target.value)}>
                              		  <option value="none" disabled>Move to...</option>
                              		  <option value="currentlyReading">Currently Reading</option>
                              		  <option value="wantToRead">Want to Read</option>
                              		  <option value="read">Read</option>
                              		  <option value="none">None</option>
                              		</select>
                              	</form>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                </li>))}
			</ol>
			</div>
			</div>
		)
	}
}

export default ListReads


