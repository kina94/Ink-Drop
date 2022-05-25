import React, { useState } from 'react'
import BookSave from '../book/BookSave'

function SavedBookContents(props) {
    const [modifyMode, setModifyMode] = useState(false)
    const [selectedBook, setSelectedBook] = useState(props.selectedBook)

    // 좀 더 깔끔하게 만들 수 있는 방법 생각 필요
    const viewChangeByType = (type) => {
        switch (type) {
            case 'complete':
                return (
                    <div>
                        <p>독서 기간</p>
                        <div>
                            <div>
                                <span>시작일</span>
                                <span>{selectedBook.startDate}</span>
                            </div>
                            <div>
                                <span>종료일</span>
                                <span>{selectedBook.endDate}</span>
                            </div>
                        </div>
                        <div>
                            <p>리뷰</p>
                            <p>{selectedBook.review}</p>
                        </div>
                    </div>
                )
            case 'reading':
                return (<div>
                    <p>독서 기간</p>
                    <div>
                        <div>
                            <span>시작일</span>
                            <span>{selectedBook.startDate}</span>
                        </div>
                    </div>
                    <div>
                        <p>메모</p>
                        <p>{selectedBook.memo}</p>
                    </div>
                </div>)
            case 'want':
                return (
                    <div>
                        <p>메모</p>
                        <p>{selectedBook.memo}</p>
                    </div>
                )
        }
    }

    const onClickModify = () => setModifyMode(!modifyMode)
    const updateBookContents = (update) => setSelectedBook(update)
    return (
        <>
            {
                modifyMode ? <BookSave isModify={true}
                    selectedBook={selectedBook}
                    userInfo={props.userInfo}
                    onClickModify={onClickModify}
                    updateBookContents={updateBookContents}
                /> : viewChangeByType(selectedBook.type)}

            {
                !modifyMode && <button onClick={onClickModify}>수정</button>
            }
        </>
    )
}

export default SavedBookContents