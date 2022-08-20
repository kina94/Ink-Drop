import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Book.css";

// 책 기본 정보 보여주기
function BookInformation() {
  const selectedBook = useSelector((store) => store.bookReducer.selectedBook);
  let { thumbnail, authors, contents, publisher, title, url } = selectedBook;
  return (
    <>
      <section>
        <img src={thumbnail} alt="thumbnail"></img>
        <p>
          {authors && authors.join(" ")} / {publisher}
        </p>
      </section>
      <section>
        <p>책 소개</p>
        <p id="contents">{contents}</p>
        <p>
          <a id="link" href={url} target="_blank">
            더 보러가기
          </a>
        </p>
      </section>
    </>
  );
}

export default BookInformation;
