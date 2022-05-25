import React from 'react'

//책 검색 결과
function BookList(props) {
    return (
        <ul className='book-list'>
            {
                <li key={props.index} id={props.index} onClick={props.clickEvent}>
                    <img src={props.book.thumbnail}></img>
                    <div>
                        <p className='title'>{props.book.title}</p>
                        <p className='authors'>{props.book.authors.join(' ')}</p>
                        <p className='infos'>{props.book.publisher} / {props.book.price}원</p>
                        <p className='contents'>{props.book.contents}</p>
                    </div>
                </li>
            }
        </ul>
    )
}

export default BookList