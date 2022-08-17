import React from "react";
import { useDispatch } from "react-redux";
import { toggleActions } from "../../../../modules/actions";
import { setSelectedBook } from "../../../../modules/book";

//책 검색 결과
function BookList(props) {
  const { selectedBook, index } = props;
  const dispatch = useDispatch();

  const handleBookClick = () => {
    dispatch(toggleActions.toggleModal(true));
    dispatch(setSelectedBook(selectedBook));
  };

  return (
    <li id={index} onClick={handleBookClick}>
      <img src={selectedBook.thumbnail} loading="lazy"></img>
      <div>
        <p className="title">{selectedBook.title}</p>
        <p className="authors">{selectedBook.authors.join(" ")}</p>
        <p className="infos">
          {selectedBook.publisher} / {selectedBook.price}원
        </p>
        <p className="contents">{selectedBook.contents}</p>
      </div>
    </li>
  );
}

export default BookList;
