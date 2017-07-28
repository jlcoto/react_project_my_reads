import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListReads extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired

	}


	render(){
		const { books, onUpdateShelf } = this.props




		return (
			<ol className="books-grid">
				{books.map((book) => (
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
		)
	}
}

export default ListReads


