import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/utils/LoadingSpinner';
import CalendarView from '../components/home/contents/history/CalendarView';
import { BookService } from '../service/book_service';

function CalendarContainer(props) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [completeBooks, setCompleteBooks] = useState([])
  const navigate = useNavigate();

  const getCompleteBooks = async () => {
    setIsLoading(true)
    const books = await BookService.syncBooks(props.userInfo.userId)
    if (books != null) {
      const processedBooks = Object.keys(books).filter(key => books[key].type === 'complete')
        .map(key => books[key])
      setCompleteBooks(processedBooks)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getCompleteBooks()
  }, [props.userInfo.userId])

  return (
    <section className='history'>
      {
        isLoading && <LoadingSpinner></LoadingSpinner>
      }
      <CalendarView completeBooks={completeBooks} />
    </section>
  )
}

export default CalendarContainer