import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Calendar.css'

function CalendarView(props) {
  const [value, setValue] = useState()
  const [isToggle, setIsToggle] = useState(false)
  const [selectedDayBook, setSelectedDayBook] = useState([])

  const endDate = props.completeBooks.map(item => {
    return item.endDate
  })

  const onClickDate = () => {
    const date = moment(value).format('YYYY-MM-DD')
    const books = props.completeBooks.filter(item => item.endDate === date)
    setSelectedDayBook(books)
    setIsToggle(true)
  }

  /* 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
중복 사용되는 함수로 재사용성을 위해 분리 필요*/
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


  useEffect(() => {
    if (value != undefined) {
      onClickDate()
    }
  }, [value])

  return (
    <section className='calendar-view'>
      <Calendar onChange={setValue} value={value}
        tileClassName={({ date, view }) => {
          if (endDate.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            return 'highlight'
          }
        }} />

      {
        isToggle &&
        <div className='book-info'>
          <div className='content-wrapper'>
            {
              selectedDayBook.map(book => {
                return (
                  <>
                    <img className='complete-book-img' src={book.thumbnail}></img>
                    <div className='complete-book-contents'>
                      <span>{book.title}</span>
                      <span>{book.authors[0]} / {book.publisher}</span>
                      <span>{book.review}</span>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      }
    </section>
  )
}

export default CalendarView