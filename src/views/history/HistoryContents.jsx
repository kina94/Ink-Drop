import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarView from "../../components/home/contents/history/CalendarView";
import ChartView from "../../components/home/contents/history/ChartView";

function HistoryContents() {
  const savedBooks = useSelector(store=>store.bookReducer.savedBooks)
  const [completeBooks, setCompleteBooks] = useState([])

  const getCompleteBooks = async () => {
    if (savedBooks != null) {
      const processedBooks = Object.keys(savedBooks).filter(key => savedBooks[key].type === 'complete')
        .map(key => savedBooks[key])
      setCompleteBooks(processedBooks)
    }
  }

  useEffect(() => {
    getCompleteBooks()
  }, [savedBooks])
  
  return (
    <>
      <CalendarView completeBooks={completeBooks} />
      <ChartView completeBooks={completeBooks} />
    </>
  );
}

export default HistoryContents;
