import React, { useState, useEffect } from 'react'
import ShowMessage from '../../common/alert/ShowMessage'
import BookBasicInfo from '../../common/book/BookBasicInfo'
import BookList from '../../common/book/BookList'
import BookSave from '../../common/book/BookSave'
import animationData from '../../../../assets/animation/85557-empty.json'

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
            {
                props.books.length === 0 ?
                    <ShowMessage animationData={animationData} width='400px' height='300px'
                        value='검색 결과를 찾을 수 없어요.'
                    /> :
                    <section className='show-search-result'>
                        <span>{props.message}</span>
                        {
                            Object.keys(props.books).map((key, index) => {
                                return (

                                    <BookList book={props.books[key]} index={index}
                                        clickEvent={onClickBook}></BookList>
                                )
                            })
                        }
                    </section>
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