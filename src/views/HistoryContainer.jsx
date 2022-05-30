import React, { useEffect, useState } from 'react'
import CalendarView from '../components/home/contents/history/CalendarView';
import ChartView from '../components/home/contents/history/ChartView';

function CalendarContainer(props) {
  const [completeBooks, setCompleteBooks] = useState([])

  const getCompleteBooks = async () => {
    if (props.savedBooks != null) {
      const processedBooks = Object.keys(props.savedBooks).filter(key => props.savedBooks[key].type === 'complete')
        .map(key => props.savedBooks[key])
      setCompleteBooks(processedBooks)
    }
  }

  useEffect(() => {
    getCompleteBooks()
  }, [props.savedBooks])

  return (
    <section className='history'>
      <CalendarView completeBooks={completeBooks} userInfo={props.userInfo} />
      <ChartView completeBooks={completeBooks} userInfo={props.userInfo}/>
    </section>
  )
}

export default CalendarContainer