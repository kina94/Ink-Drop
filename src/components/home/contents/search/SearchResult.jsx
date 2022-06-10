import React, { useEffect } from 'react'
import ShowMessage from '../../common/alert/ShowMessage'
import BookBasicInfo from '../../common/book/BookBasicInfo'
import BookList from '../../common/book/BookList'
import BookSave from '../../common/book/BookSave'
import Modal from '../../common/modal/Modal'
import animationData from '../../../../assets/animation/85557-empty.json'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions, toggleActions } from '../../../../modules/actions'

function BookResult(props) {
    const dispatch = useDispatch()
    const searchParams = useSelector(store => store.bookStore.searchParams)
    const searchBooks = useSelector(store => store.bookStore.searchResultBooks)
    const savedParams = JSON.parse(localStorage.getItem('params'))

    // 하단까지 스크롤 시 페이지 증가
    const addPageNum = () => {
        const nextPage = savedParams ? savedParams.page + 1 : searchParams.page + 1
        const nextQuery = savedParams ? savedParams.query : searchParams.query
        dispatch(bookActions.setSearchParamsAll(nextQuery, nextPage))
    }

    // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
    const onClickBook = (e) => {
        const id = e.target.closest('li').id
        const book = searchBooks[id]
        dispatch(toggleActions.toggleModal(true))
        dispatch(bookActions.getSelectedBook(book))
    }

    //무한스크롤
    const infiniteScroll = () => {
        const scrollHeight = document.querySelector('.content').scrollHeight
        const scrollTop = document.querySelector('.content').scrollTop
        const clientHeight = document.querySelector('.content').clientHeight
        document.querySelector('.book-list') && localStorage.setItem('scroll', scrollTop)
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && scrollTop != 0) {
            setTimeout(()=>{
                addPageNum()
            },1000)
        }
    }

    useEffect(() => {
        document.querySelector('.content').addEventListener('scroll', infiniteScroll)
        return () => {
            document.querySelector('.content') && document.querySelector('.content').removeEventListener('scroll', infiniteScroll)
        }
    })
    
    return (
        <>
            {
                searchBooks && searchBooks.length === 0 ?
                    <ShowMessage animationData={animationData} width='400px' height='300px'
                        value='검색 결과를 찾을 수 없어요.'
                    /> :
                    <section className='show-search-result'>
                        <span>{props.message}</span>
                        <ul className='book-list'>
                            {
                                Object.keys(searchBooks).map((key, index) => {
                                    return (
                                        <BookList
                                            key={index}
                                            book={searchBooks[key]} index={index}
                                            clickEvent={onClickBook}></BookList>
                                    )
                                })
                            }
                        </ul>
                    </section>
            }
            <Modal>
                <BookBasicInfo/>
                <BookSave userInfo={props.userInfo}
                ></BookSave>
            </Modal>
        </>
    )
}
export default BookResult