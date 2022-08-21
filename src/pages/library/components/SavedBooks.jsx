import React, { useEffect, useState } from "react";
import SelectedBook from "./SelectedBook";
import { bookCategory } from "../../../common/utils/commonVar";
import { useParams } from "react-router-dom";
import AnimationMessage from "../../../components/lottie/AnimationMessage";
import animationData from "../../../assets/animation/85557-empty.json";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Library.css";
import SavedBookHeader from "./SavedBookHeader";
import BookCard from "../../../components/card/BookCard";
import SavedBooksHeader from "./SavedBooksHeader";
import { setSelectedBook } from "../../../modules/book";
import SaveOrEditBookModal from "../../../components/page/SaveOrEditBookModal";
import { setModalToggle } from "../../../modules/toggle";

function SavedBookList() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer.user);
  const currentCategoryKey = useParams()["*"];
  const isEditMode = useSelector((store) => store.toggleReducer.editToggle);
  const { savedBooks } = useSelector((store) => store.bookReducer);
  const [filteredBooks, setFilteredBooks] = useState();

  //현재 보고 있는 카테고리에 따라 savedBooks 필터
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

  // 추가한 날짜 순 정렬
  const sortBooksByAddDate = (books) => {
    return books.sort((a, b) => {
      if (a.addDate > b.addDate) return -1;
      else if (b.addDate > a.addDate) return 1;
      else return 0;
    });
  };

  const handleBookClick = (book) => {
    dispatch(setModalToggle(true));
    dispatch(setSelectedBook(book));
  };

  useEffect(() => {
    savedBooks != null && filteredBooksByCategory();
  }, [savedBooks, currentCategoryKey]);

  return (
    <section className="saved-book-list">
      <SavedBooksHeader>
        {user.displayName}님의 {bookCategory[currentCategoryKey]} 목록 (
        {filteredBooks?.length}권){" "}
      </SavedBooksHeader>
      {!filteredBooks || filteredBooks.length === 0 ? (
        <AnimationMessage
          value={"책 검색하기를 통해 책장을 채워주세요."}
          animationData={animationData}
          width={"200px"}
          height={"200px"}
        >
          책 검색하기를 통해 책장을 채워주세요.
        </AnimationMessage>
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book, index) => (
            <li key={index} onClick={() => handleBookClick(book)}>
              <SavedBookHeader book={book} />
              <BookCard key={index} book={book} index={index} />
            </li>
          ))}
        </ul>
      )}
      {isEditMode ? <SaveOrEditBookModal /> : <SelectedBook />}
    </section>
  );
}

export default SavedBookList;
