import React from 'react'

//책 검색 결과
function BookList(props) {
    return (
        <ul className='book-list'>
            {
                props.books.length === 0 ? props.alertMessage :
                    props.books.map((book, index) => {
                        return (
                            <li key={index} id={index} onClick={props.clickEvent}>
                                <img src={book.thumbnail}></img>
                                <div>
                                    <p>{book.title}</p>
                                    <p>{book.authors}</p>
                                    <p>{book.publisher} / {book.price}원</p>
                                    <p>{book.contents}</p>
                                </div>
                            </li>
                        )
                    })
            }
        </ul>
    )
}

export default BookList