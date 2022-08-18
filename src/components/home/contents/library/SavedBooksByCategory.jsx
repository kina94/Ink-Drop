import React, { useEffect, useState } from "react";
import BookList from "../../common/book/BookList";
import BookBasicInfo from "../../common/book/BookBasicInfo";
import SavedBookContents from "./SavedBookContents";
import { useNavigate } from "react-router-dom";
import { savedBookCategory } from "../../../../common/utils/common_var";
import { useParams } from "react-router-dom";
import ShowMessage from "../../common/alert/ShowMessage";
import animationData from "../../../../assets/animation/85557-empty.json";
import Modal from "../../common/modal/Modal";
import { useSelector } from "react-redux";
import Rating from "../../common/rating/Rating";
import SaveOptionButton from "../search/SaveOptionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Library.css";

// 카테고리에 저장된 책 보여주기
function SavedBooksByCategory() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer.user);
  const savedBooks = useSelector((store) => store.bookReducer.savedBooks);
  const imModalShow = useSelector((store) => store.toggleStore.modalToggle);
  const currentCategoryKey = useParams()["*"];
  const [filteredBooks, setFilteredBooks] = useState();

  const filteredBooksByCategory = () => {
    const savedBooksValue = Object.values(savedBooks);
    let books = [];
    currentCategoryKey !== "all"
      ? (books = savedBooksValue.filter(
          (book) => book.type === currentCategoryKey
        ))
      : (books = savedBooksValue);
    setFilteredBooks(sortBooksByAddDate(books));
  };

  const sortBooksByAddDate = (books) => {
    return books.sort((a, b) => {
      if (a.addDate > b.addDate) return -1;
      else if (b.addDate > a.addDate) return 1;
      else return 0;
    });
  };

  const countDayFromStartReading = (startDate) => {
    const setStartDate = new Date(startDate);
    const now = new Date();
    const distance = now.getTime() - setStartDate.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day + 1;
  };

  useEffect(() => {
    savedBooks != null && filteredBooksByCategory();
  }, [savedBooks]);

  const switchTopInfo = (book) => {
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
    <section className="saved-book-list">
      <div
        className={
          imModalShow
            ? "saved-book-list-header mobile-hide"
            : "saved-book-list-header"
        }
      >
        <button
          className="saved-book-back"
          onClick={() => navigate("/home/library")}
        >
          <i id="icon" className="fas fa-chevron-left"></i>
        </button>
        {user.displayName}님의 {savedBookCategory[currentCategoryKey]} 목록 (
        {filteredBooks?.length}권)
      </div>
      {!filteredBooks || filteredBooks.length === 0 ? (
        <ShowMessage
          value={"책 검색하기를 통해 책장을 채워주세요."}
          animationData={animationData}
          width={"200px"}
          height={"200px"}
        />
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book, index) => {
            return (
              <>
                <div className="saved-book-top">
                  <SaveOptionButton
                    name={savedBookCategory[book.type]}
                    onClick={(e) => e.preventDefault()}
                  />
                  {switchTopInfo(book)}
                </div>
                <BookList key={index} selectedBook={book} index={index} />
              </>
            );
          })}
        </ul>
      )}
      <Modal>
        <BookBasicInfo />
        <SavedBookContents />
      </Modal>
    </section>
  );
}

export default SavedBooksByCategory;
