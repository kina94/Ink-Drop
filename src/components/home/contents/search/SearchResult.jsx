import React, { useEffect } from "react";
import ShowMessage from "../../common/alert/ShowMessage";
import BookBasicInfo from "../../common/book/BookBasicInfo";
import BookList from "../../common/book/BookList";
import BookSave from "../../common/book/BookSave";
import Modal from "../../common/modal/Modal";
import animationData from "../../../../assets/animation/85557-empty.json";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedBooks, setSearchParamsAll } from "../../../../modules/book";
import { isEndOfPage, useInfiniteScrollEffect } from "../../../../common/utils/bookSearch";
import { callSearchBookApi } from "../../../../service/bookService";
import { useNavigate, useParams } from "react-router-dom";
let timeForThrottle;

function BookResult(props) {
  const dispatch = useDispatch();
  const { bookSearchResults: searchedBooks, searchParams } = useSelector(
    (store) => store.bookReducer
  );
  const navigate = useNavigate();
  const { "*": currentSearchQuery } = useParams();
  const user = useSelector((store) => store.userReducer.user);


  // 하단까지 스크롤 시 페이지 증가
  const addPageNum = () => {
    const nextPage = searchParams.page + 1;
    dispatch(setSearchParamsAll(searchParams.query, nextPage));
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
        <BookBasicInfo />
        <BookSave></BookSave>
      </Modal>
    </>
  );
}
export default BookResult;
