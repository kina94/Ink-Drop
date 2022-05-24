import React, { useState, useEffect } from 'react'
import { BookService } from '../../../service/book_service'
import SaveOptionButton from '../search/SaveOptionButton'


//책 저장
function BookSave(props) {
    const [selectedOption, setSelectedOption] = useState('complete')
    const [saveBook, setSaveBook] = useState(props.selectedBook)
    const [savedBooks, setSavedBooks] = useState()
    const option = {
        'complete': '읽은 책',
        'reading': '읽고 있는 책',
        'want': '읽고 싶은 책'
    }

    // 옵션 선택
    const onClickOption = (e) => {
        const id = e.target.id === selectedOption ? selectedOption : e.target.id
        setSelectedOption(id)
    }

    //input change
    const handleOptionInput = (e) => {
        setSaveBook({ ...saveBook, [e.target.id]: e.target.value })
    }

    /* 저장된 책 목록의 키값과 선택된 책의 키값을 비교 중복되지 않을 경우 저장
    함수 분리 필요*/
    const onClickSaveBook = () => {
        let bookKey = Object.keys(savedBooks).find(key => key === props.selectedBook.isbn)
        if (bookKey) {
            alert(`이미 저장된 책이에요. ${option[savedBooks[bookKey].type]}을 확인해보세요.`)
        } else {
            const newBook = { ...saveBook, 'type': selectedOption }
            BookService.saveBook(props.userInfo.userId, props.selectedBook.isbn, newBook)
            alert('책이 저장됐어요.')
            getSavedBooks()
        }
    }

    // 저장된 책 리스트 불러오기
    const getSavedBooks = async () => {
        const savedBookList = await BookService.syncBooks(props.userInfo.userId)
        setSavedBooks(savedBookList)
    }

    //선택된 옵션(읽은, 안 읽은, 읽고싶은)에 따른 하위 컨텐츠 리턴
    const selectedOptionContent = () => {
        switch (selectedOption) {
            case 'complete':
                return (
                    <>
                        '독서기간'
                        시작일 <input type='date' id='start-date' onChange={handleOptionInput} />
                        종료일 <input type='date' id='end-date' onChange={handleOptionInput} />
                        후기
                        <input type='text' id='review' onChange={handleOptionInput} autoFocus />
                    </>
                )
            case 'reading':
                return (
                    <>
                        '독서시작일'
                        <input type='date' id='start-date' onChange={handleOptionInput} />
                        '메모'
                        <input type='text' id='memo' onChange={handleOptionInput} autoFocus />
                    </>
                )
            case 'want':
                return (
                    <>
                        '메모'
                        <input type='text' id='memo' onChange={handleOptionInput} autoFocus />
                    </>
                )
        }
    }

    useEffect(() => {
        getSavedBooks()
    }, [])

    return (
        <div>
            <section className='button-container'>
                {
                    Object.keys(option).map((key, index) => {
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
            <button onClick={onClickSaveBook}>저장하기</button>
        </div>
    )
}

export default BookSave