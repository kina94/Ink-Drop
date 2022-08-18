import React from "react";
import { useDispatch } from "react-redux";
import { toggleActions } from "../modules/actions";
import { setSelectedBook } from "../modules/book";

//책 검색 결과
function BookCard(props) {
  const { book, index } = props;
  const dispatch = useDispatch();

  const handleBookClick = () => {
    dispatch(toggleActions.toggleModal(true));
    dispatch(setSelectedBook(book));
  };

  return (
    <div className='book-card' id={index} onClick={handleBookClick}>
      <img src={book.thumbnail} loading="lazy"></img>
      <div>
        <p className="title">{book.title}</p>
        <p className="authors">{book.authors.join(" ")}</p>
        <p className="infos">
          {book.publisher} / {book.price}원
        </p>
        <p className="contents">{book.contents}</p>
      </div>
    </div>
  );
}

export default BookCard;
