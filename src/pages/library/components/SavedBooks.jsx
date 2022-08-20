import React, { useEffect, useState } from "react";
import BookInformation from "../../../components/BookInformation";
import SelectedBook from "./SelectedBook";
import { savedBookCategory } from "../../../common/utils/common_var";
import { useNavigate, useParams } from "react-router-dom";
import ShowMessage from "../../../components/ShowMessage";
import animationData from "../../../assets/animation/85557-empty.json";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Library.css";
import SavedBookHeader from "./SavedBookHeader";
import BookCard from "../../../components/BookCard";
import SavedBooksHeader from "./SavedBooksHeader";
import useModal from "../../../hooks/useModal";
import ModalBody from "../../../components/Modal/ModalBody";
import ModalTitle from "../../../components/Modal/ModalTitle";
import { setSelectedBook } from "../../../modules/book";

function SavedBookList() {
  const dispatch = useDispatch()
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const { selectedBook, savedBooks } = useSelector(
    (store) => store.bookReducer
  );
  const user = useSelector((store) => store.userReducer.user);
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

  const handleBookClick = (book) => {
    handleModalOpen();
    dispatch(setSelectedBook(book));
  };
  
  return (
    <section className="saved-book-list">
      <SavedBooksHeader modalOpen={modalOpen}>
        {user.displayName}님의 {savedBookCategory[currentCategoryKey]} 목록 (
        {filteredBooks?.length}권){" "}
      </SavedBooksHeader>
      {!filteredBooks || filteredBooks.length === 0 ? (
        <ShowMessage
          value={"책 검색하기를 통해 책장을 채워주세요."}
          animationData={animationData}
          width={"200px"}
          height={"200px"}
        />
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book, index) => (
            <li key={index} onClick={()=>handleBookClick(book)}>
              <SavedBookHeader book={book} />
              <BookCard key={index} book={book} index={index} />
            </li>
          ))}
        </ul>
      )}
      <Modal modalOpen={modalOpen}>
        <ModalTitle handleModalClose={handleModalClose}>
          {selectedBook?.title}
        </ModalTitle>
        <ModalBody>
          <BookInformation />
        </ModalBody>
        <SelectedBook handleModalClose={handleModalClose} />
      </Modal>
    </section>
  );
}

export default SavedBookList;
