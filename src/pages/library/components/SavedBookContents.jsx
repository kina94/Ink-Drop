import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleActions } from '../../../modules/actions'
import { setSelectedBook, onClickBookDelete } from '../../../modules/book'
import BookSave from '../../../components/home/common/book/BookSave'
import SaveOptionButton from '../../../components/home/contents/search/SaveOptionButton'
import Rating from '../../../components/home/common/rating/Rating'

function SavedBookContents(props) {
    const user = useSelector(store=>store.userReducer.user)
    const dispatch = useDispatch()
    const selectedBook = useSelector(store => store.bookReducer.selectedBook)
    const isModifyMode = useSelector(store => store.toggleStore.modifyToggle)

    const onClickDelete = (e) => {
        if (window.confirm('정말 삭제하시겠어요?')) {
            dispatch(onClickBookDelete(e.target.id, user.uid))
            alert('삭제가 완료되었습니다.')
            dispatch(toggleActions.toggleModal(false))
        }
    }

    // 좀 더 깔끔하게 만들 수 있는 방법 생각 필요
    const viewChangeByType = (type) => {
        switch (type) {
            case 'complete':
                return (
                    <form id='saved-book-view'>
                        <section className='option-button-container'>
                            <SaveOptionButton id='complete' name='읽은 책'
                                onClick={(e) => e.preventDefault()}
                            />
                        </section>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container' id='option-saved'>
                            <span>시작일</span>
                            <span id='view'>{selectedBook.startDate}</span>
                        </div>
                        <div className='option-container' id='option-saved'>
                            <span>종료일</span>
                            <span id='view'>{selectedBook.endDate}</span>
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>후기</p>
                        <div className='option-container' id='option-saved'>
                            <span id='view'>{selectedBook.review}</span>
                        </div>
                        <p style={{ width: '100%', textAlign: 'center' }}>내가 남긴 평점</p>
                        <Rating
                        book={selectedBook}
                        stars={selectedBook.rate}
                        onClick={(e) => e.preventDefault()}
                        />
                    </form>
                )
            case 'reading':
                return (
                    <form>
                        <section className='option-button-container'>
                            <SaveOptionButton id='reading' name='읽고 있는 책'
                                onClick={(e) => e.preventDefault()}
                            />
                        </section>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container' id='option-saved'>
                            <span>시작일</span>
                            <span id='view'>{selectedBook.startDate}</span>
                        </div>
                        <div>
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>메모</p>
                        <div className='option-container' id='option-saved'>
                            <span id='view'>{selectedBook.memo}</span>
                        </div>
                    </form>
                )
            case 'want':
                return (
                    <div>
                        <form>
                        <section className='option-button-container'>
                            <SaveOptionButton id='want' name='읽고 싶은 책'
                                onClick={(e) => e.preventDefault()}
                            />
                        </section>
                            <i id='icon' className="fas fa-pencil"></i>
                            <p>메모</p>
                            <div className='option-container' id='option-saved'>
                                <span id='view'>{selectedBook.memo}</span>
                            </div>
                        </form>
                    </div>
                )
        }
    }

    const updateBookContents = (newBook) => {
        dispatch(setSelectedBook(newBook))
        dispatch(toggleActions.toggleModifyMode(false))
    }

    return (
        <>
            {
                isModifyMode ? <BookSave
                    selectedBook={selectedBook}
                    updateBookContents={updateBookContents}
                /> :
                    <section className='save-contents'>
                        <section className='selected-display'>
                            {viewChangeByType(selectedBook.type)}
                            <div className='button-container'>
                                <button className='modify' onClick={() => dispatch(toggleActions.toggleModifyMode(true))}>수정</button>
                                <button className='delete' id={selectedBook.isbn} onClick={onClickDelete}>삭제</button>
                            </div>
                        </section>
                    </section>
            }
        </>
    )
}

export default SavedBookContents