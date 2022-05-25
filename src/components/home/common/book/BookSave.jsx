import React, { useState, useEffect } from 'react'
import { BookService } from '../../../../service/book_service'
import SaveOptionButton from '../search/SaveOptionButton'
import { option } from '../../../../common/utils/common_var'
import { Navigate, useNavigate } from 'react-router-dom'


//책 저장 및 수정
function BookSave(props) {
    const [selectedOption, setSelectedOption] = useState(props.selectedBook.type || 'complete')
    const [saveBook, setSaveBook] = useState(props.selectedBook)
    const [savedBooks, setSavedBooks] = useState(null)

    useEffect(() => {
        if (props.isModify) { //수정인 경우
            setSaveBook(props.selectedBook)
        } else {
            getSavedBooks()
        }
    }, [])

    // 옵션 선택
    const onClickOption = (e) => {
        const id = e.target.id === selectedOption ? selectedOption : e.target.id
        setSelectedOption(id)
        setSaveBook({
            ...saveBook,
            startDate: '',
            endDate: '',
            memo: '',
            review: '',
        })
    }

    //input change
    const handleOptionInput = (e) => {
        setSaveBook({ ...saveBook, [e.target.id]: e.target.value })
    }

    // 저장된 책 리스트 불러오기
    const getSavedBooks = async () => {
        const savedBookList = await BookService.syncBooks(props.userInfo.userId)
        setSavedBooks(savedBookList)
    }

    /* 저장된 책 목록의 키값과 선택된 책의 키값을 비교 중복되지 않을 경우 저장.
    함수 분리 필요*/
    const onClickSaveBook = () => {
        let bookKey = null
        if (savedBooks) {
            bookKey = Object.keys(savedBooks).find(key => key === props.selectedBook.isbn)
        }
        
        if (bookKey) {
            alert(`이미 저장된 책이에요. ${option[savedBooks[bookKey].type]}을 확인해보세요.`)
        } else {
            const newBook = { ...saveBook, 'type': selectedOption }
            BookService.saveBook(props.userInfo.userId, props.selectedBook.isbn, newBook)
            alert('저장을 완료했어요.')
            if(props.isModify){
                props.updateBookContents(newBook)
                props.onClickModify()
            }
        }
    }


    //선택된 옵션(읽은, 안 읽은, 읽고싶은)에 따른 하위 컨텐츠 리턴
    const selectedOptionContent = () => {
        switch (selectedOption) {
            case 'complete':
                return (
                    <form>
                        '독서기간'
                        시작일 <input type='date' id='startDate' onChange={handleOptionInput}
                            value={saveBook.startDate || ''}
                        />
                        종료일 <input type='date' id='endDate' onChange={handleOptionInput}
                            value={saveBook.endDate || ''}
                        />
                        후기
                        <input type='text' id='review' onChange={handleOptionInput}
                            value={saveBook.review || ''}
                            autoFocus />
                    </form>
                )
            case 'reading':
                return (
                    <form>
                        '독서시작일'
                        <input type='date' id='startDate' onChange={handleOptionInput}
                            value={saveBook.startDate || ''}
                        />
                        '메모'
                        <input type='text' id='memo' onChange={handleOptionInput} autoFocus
                            value={saveBook.memo || ''}
                        />
                    </form>
                )
            case 'want':
                return (
                    <form>
                        '메모'
                        <input type='text' id='memo' onChange={handleOptionInput}
                            value={saveBook.memo || ''}
                            autoFocus />
                    </form>
                )
        }
    }
    return (
        <div>
            <section className='button-container'>
                {
                    Object.keys(option).map((key, index) => {
                        if (key === 'all') return
                        return (
                            <SaveOptionButton key={index} option={key} name={option[key]}
                                onClick={onClickOption} selectedOption={selectedOption} />
                        )
                    })
                }
            </section>
            <section className='selected-display'>
                {selectedOptionContent()}
            </section>
            <button type='submit' onClick={onClickSaveBook}>저장하기</button>
        </div>
    )
}

export default BookSave