import React, { useEffect, useState } from "react";
import BookBasicInfo from "../../components/home/common/book/BookBasicInfo";
import SavedBookContents from "../../components/home/contents/library/SavedBookContents";
import { savedBookCategory } from "../../common/utils/common_var";
import { useParams } from "react-router-dom";
import ShowMessage from "../../components/home/common/alert/ShowMessage";
import animationData from "../../assets/animation/85557-empty.json";
import Modal from "../../components/home/common/modal/Modal";
import { useSelector } from "react-redux";
import "./Library.css";
import LibraryHeader from "../../components/header/LibraryHeader";
import BooksByCategory from "../../components/library/BooksByCategory";

function LibraryContents() {
  const user = useSelector((store) => store.userReducer.user);
  const savedBooks = useSelector((store) => store.bookReducer.savedBooks);
  const currentCategoryKey = useParams()["*"];
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

  useEffect(() => {
    savedBooks != null && filteredBooksByCategory();
  }, [savedBooks, currentCategoryKey]);

  return (
    <section className="saved-book-list">
      <LibraryHeader>
        {user.displayName}님의 {savedBookCategory[currentCategoryKey]} 목록 (
        {filteredBooks?.length}권)
      </LibraryHeader>
      {!filteredBooks || filteredBooks.length === 0 ? (
        <ShowMessage
          value={"책 검색하기를 통해 책장을 채워주세요."}
          animationData={animationData}
          width={"200px"}
          height={"200px"}
        />
      ) : (
        <BooksByCategory filteredBooks={filteredBooks}/>
      )}
      <Modal>
        <BookBasicInfo />
        <SavedBookContents />
      </Modal>
    </section>
  );
}

export default LibraryContents;
