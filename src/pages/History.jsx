import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarView from "../components/home/contents/history/CalendarView";
import ChartView from "../components/home/contents/history/ChartView";

function History(props) {
  const savedBooks = useSelector((store) => store.bookStore.savedBooks);
  const [completeBooks, setCompleteBooks] = useState([]);
  const getCompleteBooks = async () => {
    if (savedBooks != null) {
      const processedBooks = Object.keys(savedBooks)
        .filter((key) => savedBooks[key].type === "complete")
        .map((key) => savedBooks[key]);
      setCompleteBooks(processedBooks);
    }
  };

  useEffect(() => {
    getCompleteBooks();
  }, [savedBooks]);

  return (
    <section className="history">
      <CalendarView completeBooks={completeBooks} userInfo={props.userInfo} />
      <ChartView completeBooks={completeBooks} userInfo={props.userInfo} />
    </section>
  );
}

export default History;
