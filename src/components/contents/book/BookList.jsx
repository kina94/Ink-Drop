import React from 'react'

//책 검색 결과
function BookList(props) {
    return (
        <ul className='book-list'>
            {
                <li key={props.index} id={props.index} onClick={props.clickEvent}>
                    <img src={props.book.thumbnail}></img>
                    <div>
                        <p>{props.book.title}</p>
                        <p>{props.book.authors}</p>
                        <p>{props.book.publisher} / {props.book.price}원</p>
                        <p>{props.book.contents}</p>
                    </div>
                </li>
            }
        </ul>
    )
}

export default BookList