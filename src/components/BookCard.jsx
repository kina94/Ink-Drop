import React from "react";

//책 검색 결과
function BookCard(props) {
  const { book, index } = props;
  return (
    <div className='book-card' id={index}>
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
