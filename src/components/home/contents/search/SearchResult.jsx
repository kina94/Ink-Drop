import React, { useState, useEffect } from 'react'
import BookBasicInfo from '../../common/book/BookBasicInfo'
import BookList from '../../common/book/BookList'
import BookSave from '../../common/book/BookSave'

function BookResult(props) {
    const [isToggle, setIsToggle] = useState(false)
    const [selectedBook, setSelectedBook] = useState([])
    const [saveBook, setSaveBook] = useState({})

    // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
    const onClickBook = (e) => {
        const id = e.target.closest('li').id
        const book = props.books[id]
        setIsToggle(true)
        setSelectedBook(book)
    }

    // 모달 없애기
    const handleModalClose = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setIsToggle(false)
            }
        })
        window.addEventListener('click', (e) => {
            try {
                if (e.target.className === 'book-info') {
                    setIsToggle(false)
                }
                if (e.target.closest('button').className === 'close') {
                    setIsToggle(false)
                }
            } catch {
                return
            }

        })
    }

    useEffect(() => {
        handleModalClose()
    }, [])

    return (
        <>
            <span>{props.message}</span>
            {
                props.books.length===0 ? <p>없어</p> :
                Object.keys(props.books).map((key,index)=>{
                    return <BookList book={props.books[key]} index={index}
                    clickEvent={onClickBook}></BookList>
                })
            }

            {
                isToggle ?
                    <div className='book-info'>
                        <div className='content-wrapper'>
                            <BookBasicInfo selectedBook={selectedBook} />
                            <BookSave userInfo={props.userInfo} selectedBook={selectedBook}></BookSave>
                        </div>
                    </div> : null
            }
        </>
    )
}
export default BookResult