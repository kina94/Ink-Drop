import React, { useState, useEffect } from 'react'
import SaveOptionButton from '../../contents/search/SaveOptionButton'
import { option } from '../../../../common/utils/common_var'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions, toggleActions } from '../../../../modules/actions'
import Rating from '../rating/Rating'

//책 저장 및 수정
function BookSave(props) {
    const dispatch = useDispatch()
    const isModifyMode = useSelector(store => store.toggleStore.modifyToggle)
    const isModalShow = useSelector(store => store.toggleStore.modalToggle)
    const savedBooks = useSelector(store => store.bookStore.savedBooks)
    const selectedBook = useSelector(store => store.bookStore.selectedBook)
    const [selectedOption, setSelectedOption] = useState(!selectedBook.type ? 'complete' : selectedBook.type)
    const [saveBook, setSaveBook] = useState([])
    const dateValue = new Date().toISOString().substring(0, 10)

    useEffect(()=>{
        if(!isModalShow){
            setSelectedOption('complete')
        }
    },[isModalShow])

    useEffect(() => {
        setSaveBook(selectedBook)
    }, [selectedBook])

    // 옵션 선택
    const onClickOption = (e) => {
        const id = e.target.closest('button').id === selectedOption ? selectedOption : e.target.closest('button').id
        setSelectedOption(id)
        setSaveBook({
            ...saveBook,
            startDate: '',
            endDate: '',
            memo: '',
            review: '',
            rate: null,
        })
    }

    //input change
    const handleOptionInput = (e) => {
        setSaveBook({ ...saveBook, [e.target.id]: e.target.value })
    }

    //rate change
    const handleRate = (rate) =>{
        setSaveBook({ ...saveBook, rate: rate })
    }

    /* 저장된 책 목록의 키값과 선택된 책의 키값을 비교 중복되지 않을 경우 저장.
    함수 분리 필요*/
    const onClickSaveBook = () => {
        let bookKey = null
        if (savedBooks) {
            bookKey = Object.keys(savedBooks).find(key => key === selectedBook.isbn)
        }
        if (bookKey && !isModifyMode) {
            alert(`이미 저장된 책이에요. ${option[savedBooks[bookKey].type]}을 확인해보세요.`)
        } else {
            const newBook = {
                ...saveBook,
                'type': selectedOption,
                'endDate': saveBook.endDate ? saveBook.endDate : dateValue,
                'startDate': saveBook.startDate ? saveBook.startDate : dateValue,
                'addDate': isModifyMode ? saveBook.addDate : new Date().toISOString(),
            }
            dispatch(bookActions.onClickBookUpdateOrAdd(props.userInfo.userId, newBook))
            alert('저장을 완료했어요.')
            dispatch(bookActions.initSearchParams())
            if (isModifyMode) {
                props.updateBookContents(newBook)
            }
        }
    }


    //선택된 옵션(읽은, 안 읽은, 읽고싶은)에 따른 하위 컨텐츠 리턴
    const selectedOptionContent = () => {
        switch (selectedOption) {
            case 'complete':
                return (
                    <form>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container'>
                            <span>시작일</span>
                            <input type='date' id='startDate' onChange={handleOptionInput}
                                value={saveBook.startDate || dateValue} />
                        </div>
                        <div className='option-container'>
                            <span>종료일</span>
                            <input type='date' id='endDate' onChange={handleOptionInput}
                                value={saveBook.endDate || dateValue} />
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>후기</p>
                        <div className='option-container'>
                            <input type='text' id='review' onChange={handleOptionInput}
                                value={saveBook.review || ''} />
                        </div>
                        <p style={{ width: '100%', textAlign: 'center' }}>나의 평점은?</p>
                        <Rating
                        book={selectedBook}
                        stars={selectedBook.rate}
                        handleRate={handleRate}></Rating>
                    </form>
                )
            case 'reading':
                return (
                    <form>
                        <i id='icon' className="fas fa-calendar-check"></i>
                        <p>독서기간</p>
                        <div className='option-container'>
                            <span>시작일</span>
                            <input type='date' id='startDate' onChange={handleOptionInput}
                                value={saveBook.startDate || dateValue} />
                        </div>
                        <div>
                        </div>
                        <i id='icon' className="fas fa-pencil"></i>
                        <p>메모</p>
                        <div className='option-container'>
                            <input type='text' id='memo' onChange={handleOptionInput}
                                value={saveBook.memo || ''} />
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
                                <input type='text' id='memo' onChange={handleOptionInput}
                                    value={saveBook.memo || ''}
                                />
                            </div>
                        </form>
                    </div>
                )
        }
    }

    return (
        <section className='save-contents'>
            <section className='option-button-container'>
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
                <div className='button-container'>
                    <button className='save' type='submit' onClick={onClickSaveBook}>저장하기</button>
                </div>
            </section>
        </section>
    )
}

export default BookSave