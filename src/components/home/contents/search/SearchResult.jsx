import React, { useState, useEffect, useRef } from 'react'
import ShowMessage from '../../common/alert/ShowMessage'
import BookBasicInfo from '../../common/book/BookBasicInfo'
import BookList from '../../common/book/BookList'
import BookSave from '../../common/book/BookSave'
import Modal from '../../common/modal/Modal'
import animationData from '../../../../assets/animation/85557-empty.json'
import { useParams } from 'react-router-dom'

function BookResult(props) {
    const [isToggle, setIsToggle] = useState(false)
    const [selectedBook, setSelectedBook] = useState([])
    const params = useParams()
    const searchRef = useRef()

    // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
    const onClickBook = (e) => {
        const id = e.target.closest('li').id
        const book = props.books[id]
        setIsToggle(true)
        setSelectedBook(book)
    }

    const infiniteScroll = () => {
        const scrollHeight = document.querySelector('.content').scrollHeight
        const scrollTop = document.querySelector('.content').scrollTop
        const clientHeight = document.querySelector('.content').clientHeight
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
            props.FetchBooks(params.keyword, true)
        }
    }
    useEffect(() => {
        document.querySelector('.content').addEventListener('scroll', infiniteScroll)
        return () => document.querySelector('.content').removeEventListener('scroll', infiniteScroll)
    })

    return (
        <>
            {
                props.books && props.books.length === 0 ?
                    <ShowMessage animationData={animationData} width='400px' height='300px'
                        value='검색 결과를 찾을 수 없어요.'
                    /> :
                    <section className='show-search-result' ref={searchRef}>
                        <span>{props.message}</span>
                        <ul className='book-list'>
                            {
                                Object.keys(props.books).map((key, index) => {
                                    return (
                                        <BookList
                                        key={index}
                                        book={props.books[key]} index={index}
                                            clickEvent={onClickBook}></BookList>
                                    )
                                })
                            }
                        </ul>
                    </section>
            }
            <Modal isToggle={isToggle}
                setIsToggle={setIsToggle}>
                <BookBasicInfo selectedBook={selectedBook} />
                <BookSave
                    userInfo={props.userInfo}
                    selectedBook={selectedBook}
                    savedBooks={props.savedBooks}
                    onClickUpdateOrAdd={props.onClickUpdateOrAdd}
                ></BookSave>
            </Modal>
        </>
    )
}
export default BookResult