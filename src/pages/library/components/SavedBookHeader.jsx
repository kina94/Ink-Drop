import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { bookCategory } from "../../../common/utils/commonVar";
import Rating from "../../../components/rating/Rating";
import styled from "styled-components";

function SavedBookHeader(props) {
  const { book } = props;
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
            <StyledBadge>
              <FontAwesomeIcon icon="fas fa-flag" id="icon" />
              {bookCategory[book.type]}
            </StyledBadge>
            <span>평점</span>
            <Rating
              fontSize="10px;"
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
            <StyledBadge>
              <FontAwesomeIcon id="icon" icon="fas fa-book-open" />
              {bookCategory[book.type]}
            </StyledBadge>
            <span>시작일</span>
            {book.startDate.slice(0, 10)}
            <span>
              <FontAwesomeIcon icon="fa-book-open-reader" />
            </span>
            {countDayFromStartReading(book.startDate)}일차
          </>
        );
      case "want":
        return (
          <>
            <StyledBadge>
              <FontAwesomeIcon id="icon" icon="fas fa-heart" />
              {bookCategory[book.type]}
            </StyledBadge>
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

  return <div className="saved-book-top">{switchHeaderContents(book)}</div>;
}

const StyledBadge = styled.div`
  color: var(--color-hotpink);
  font-weight: 700;
`;

export default SavedBookHeader;
