import React, { useState } from 'react'
import BookSave from '../../common/book/BookSave'

function SavedBookContents(props) {
    const [modifyMode, setModifyMode] = useState(false)
    const [selectedBook, setSelectedBook] = useState(props.selectedBook)

    // 좀 더 깔끔하게 만들 수 있는 방법 생각 필요
    const viewChangeByType = (type) => {
        switch (type) {
            case 'complete':
                return (
                    <form>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container'>
                            <span>시작일</span>
                            <span id='view'>{selectedBook.startDate}</span>
                        </div>
                        <div className='option-container'>
                            <span>종료일</span>
                            <span id='view'>{selectedBook.endDate}</span>
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>후기</p>
                        <div className='option-container'>
                            <span id='view'>{selectedBook.review}</span>
                        </div>
                    </form>
                )
            case 'reading':
                return (
                    <form>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container'>
                            <span>시작일</span>
                            <span id='view'>{selectedBook.startDate}</span>
                        </div>
                        <div>
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>메모</p>
                        <div className='option-container'>
                        <span id='view'>{selectedBook.memo}</span>
                        </div>
                    </form>
                )
            case 'want':
                return (
                    <div>
                    <form>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>메모</p>
                        <div className='option-container'>
                            <span id='view'>{selectedBook.memo}</span>
                        </div>
                    </form>
                    </div>
                )
        }
    }

    const onClickModify = () => setModifyMode(!modifyMode)
    const updateBookContents = (update) => {
        props.onClickUpdate(update)
        setSelectedBook(update)
    }
    return (
        <>
            {
                modifyMode ? <BookSave isModify={true}
                    selectedBook={selectedBook}
                    userInfo={props.userInfo}
                    onClickModify={onClickModify}
                    updateBookContents={updateBookContents}
                /> :
                    <section className='save-contents'>
                        <section className='selected-display'>
                            {viewChangeByType(selectedBook.type)}
                            <button onClick={onClickModify}>수정</button>
                        </section>
                    </section>
            }
        </>
    )
}

export default SavedBookContents