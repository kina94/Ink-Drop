import React from "react";
import ShowMessage from "../../components/home/common/alert/ShowMessage";
import BookBasicInfo from "../../components/home/common/book/BookBasicInfo";
import BookList from "../../components/home/common/book/BookList";
import BookSave from "../../components/home/common/book/BookSave";
import Modal from "../../components/home/common/modal/Modal";
import animationData from "../../assets/animation/85557-empty.json";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParamsAll } from "../../modules/book";
import { useInfiniteScrollEffect } from "../../common/utils/bookSearch";
let timeForThrottle;

function SearchContents(props) {
  const dispatch = useDispatch();
  const { bookSearchResults: searchedBooks, searchParams } = useSelector(
    (store) => store.bookReducer
  );
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
          <span>{props.message}</span>
          <ul className="book-list">
            {Object.values(searchedBooks).map((book, index) => {
              return (
                <BookList
                  key={index}
                  selectedBook={book}
                  index={index}
                ></BookList>
              );
            })}
          </ul>
        </section>
      )}
      <Modal>
        <BookBasicInfo/>
        <BookSave></BookSave>
      </Modal>
    </>
  );
}
export default SearchContents;
