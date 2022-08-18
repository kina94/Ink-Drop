import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "./components/Calendar";
import BarChart from "./components/BarChart";

function History() {
  const savedBooks = useSelector((store) => store.bookReducer.savedBooks);
  const [completeBooks, setCompleteBooks] = useState([]);

  const getCompleteBooks = async () => {
    if (savedBooks != null) {
      const processedBooks = Object.values(savedBooks).filter(
        (book) => book.type === "complete"
      );
      setCompleteBooks(processedBooks);
    }
  };

  useEffect(() => {
    getCompleteBooks();
  }, [savedBooks]);

  return (
    <>
      <Calendar completeBooks={completeBooks} />
      <BarChart completeBooks={completeBooks} />
    </>
  );
}

export default History;
