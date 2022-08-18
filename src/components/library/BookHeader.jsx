import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { savedBookCategory } from "../../common/utils/common_var";
import Rating from "../home/common/rating/Rating";
import SaveOptionButton from "../home/contents/search/SaveOptionButton";

function BookHeader(props) {
  const countDayFromStartReading = (startDate) => {
    const setStartDate = new Date(startDate);
    const now = new Date();
    const distance = now.getTime() - setStartDate.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day + 1;
  };

  const switchHeaderContents = (book) => {
    switch (book.type) {
      case "complete":
        return (
          <>
            <span>평점</span>
            <Rating
              book={book}
              stars={book.rate}
              onClick={(e) => e.preventDefault()}
            ></Rating>
            <span>읽은 기간</span>
            {book.startDate.slice(0, 10)} ~ {book.endDate.slice(0, 10)}
          </>
        );
      case "reading":
        return (
          <>
            <span>시작일</span>
            {book.startDate.slice(0, 10)}
            <span>
              <FontAwesomeIcon icon="fa-book-open-reader" />
            </span>
            {countDayFromStartReading(book.startDate)}일차
          </>
        );
      default:
        return;
    }
  };

  return (
    <div className="saved-book-top">
      <SaveOptionButton
        name={savedBookCategory[props.book.type]}
        onClick={(e) => e.preventDefault()}
      />
      {switchHeaderContents(props.book)}
    </div>
  );
}

export default BookHeader;
