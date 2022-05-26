import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/utils/LoadingSpinner';
import CalendarView from '../components/home/contents/history/CalendarView';
import ChartView from '../components/home/contents/history/ChartView';
import { BookService } from '../service/book_service';

function CalendarContainer(props) {
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
      <CalendarView completeBooks={completeBooks} userInfo={props.userInfo} />
      <ChartView completeBooks={completeBooks} userInfo={props.userInfo}/>
    </section>
  )
}

export default CalendarContainer