import React from "react";
import ShowMessage from "../../../components/ShowMessage";
import BookCard from "../../../components/BookCard";
import SaveBook from "../../../components/SaveBook";
import Modal from "../../../components/Modal";
import animationData from "../../../assets/animation/85557-empty.json";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParamsAll, setSelectedBook } from "../../../modules/book";
import { useInfiniteScrollEffect } from "../../../common/utils/bookSearch";
import { useParams } from "react-router-dom";
import BookInformation from "../../../components/BookInformation";
import ModalTitle from "../../../components/Modal/ModalTitle";
import ModalBody from "../../../components/Modal/ModalBody";
import useModal from "../../../hooks/useModal";
let timeForThrottle;

function SearchResults() {
  const { modalOpen, handleModalClose, handleModalOpen } = useModal();
  const dispatch = useDispatch();
  const { "*": currentSearchQuery } = useParams();
  const { bookSearchResults: searchedBooks, searchParams } = useSelector(
    (store) => store.bookReducer
  );
  const selectedBook = useSelector((store) => store.bookReducer.selectedBook);
  const savedParams = JSON.parse(localStorage.getItem("params"));

  // 하단까지 스크롤 시 페이지 증가
  const addPageNum = () => {
    const nextPage = savedParams ? savedParams.page + 1 : searchParams.page + 1;
    const nextQuery = savedParams ? savedParams.query : searchParams.query;
    dispatch(setSearchParamsAll(nextQuery, nextPage));
  };

  useInfiniteScrollEffect((scrollHeight, scrollTop, clientHeight) => {
    if (
      Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
      scrollTop !== 0
    ) {
      if (!timeForThrottle) {
        timeForThrottle = setTimeout(() => {
          addPageNum();
          timeForThrottle = null;
        }, 300);
      }
    }
  });

  const handleBookClick = (book) => {
    handleModalOpen();
    dispatch(setSelectedBook(book));
  };

  return (
    <>
      {searchedBooks?.length === 0 ? (
        <ShowMessage
          animationData={animationData}
          width="400px"
          height="300px"
          value="검색 결과를 찾을 수 없어요."
        />
      ) : (
        <section className="show-search-result">
          <span>{`'${currentSearchQuery}'에 대한 검색 결과`}</span>
          <ul className="book-list">
            {Object.values(searchedBooks).map((book, index) => (
              <li key={index} onClick={() => handleBookClick(book)}>
                <BookCard book={book} index={index}></BookCard>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Modal modalOpen={modalOpen}>
        <ModalTitle handleModalClose={handleModalClose}>
          {selectedBook.title}
        </ModalTitle>
        <ModalBody>
          <BookInformation />
        </ModalBody>
        <SaveBook />
      </Modal>
    </>
  );
}
export default SearchResults;
