import React, { useEffect } from "react";
import ShowMessage from "../../common/alert/ShowMessage";
import BookBasicInfo from "../../common/book/BookBasicInfo";
import BookList from "../../common/book/BookList";
import BookSave from "../../common/book/BookSave";
import Modal from "../../common/modal/Modal";
import animationData from "../../../../assets/animation/85557-empty.json";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../../../../modules/actions";
import { getSelectedBook, setSearchParamsAll } from "../../../../modules/book";
let timeForThrottle;

function BookResult(props) {
  const dispatch = useDispatch();
  const searchParams = useSelector((store) => store.bookReducer.searchParams);
  const searchedBooks = useSelector(
    (store) => store.bookReducer.bookSearchResults
  );

  // 하단까지 스크롤 시 페이지 증가
  const addPageNum = () => {
    const nextPage = searchParams.page + 1;
    dispatch(setSearchParamsAll(searchParams.query, nextPage));
  };

  // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
  const onClickBook = (e) => {
    const id = e.target.closest("li").id;
    const book = searchedBooks[id];
    dispatch(toggleActions.toggleModal(true));
    dispatch(getSelectedBook(book));
  };

  //무한스크롤
  const infiniteScroll = () => {
    if (!timeForThrottle) {
      timeForThrottle = setTimeout(() => {
        const scrollHeight = document.querySelector(".content").scrollHeight;
        const scrollTop = document.querySelector(".content").scrollTop;
        const clientHeight = document.querySelector(".content").clientHeight;
        document.querySelector(".book-list") &&
          localStorage.setItem("scroll", scrollTop);
        if (
          Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
          scrollTop != 0
        ) {
          addPageNum();
        }
        timeForThrottle = null;
      }, 1000);
    }
  };

  useEffect(() => {
    document
      .querySelector(".content")
      .addEventListener("scroll", infiniteScroll);
    return () => {
      document.querySelector(".content") &&
        document
          .querySelector(".content")
          .removeEventListener("scroll", infiniteScroll);
    };
  });

  return (
    <>
      {searchedBooks && searchedBooks.length === 0 ? (
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
            {Object.keys(searchedBooks).map((key, index) => {
              return (
                <BookList
                  key={index}
                  book={searchedBooks[key]}
                  index={index}
                  clickEvent={onClickBook}
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
