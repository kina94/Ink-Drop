import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../common/utils/LoadingSpinner';
import CalendarView from '../components/home/contents/history/CalendarView';
import ChartView from '../components/home/contents/history/ChartView';

function CalendarContainer(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [completeBooks, setCompleteBooks] = useState([])

  const getCompleteBooks = async () => {
    setIsLoading(true)
    if (props.savedBooks != null) {
      const processedBooks = Object.keys(props.savedBooks).filter(key => props.savedBooks[key].type === 'complete')
        .map(key => props.savedBooks[key])
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