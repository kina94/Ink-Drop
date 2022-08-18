import React from "react";
import BookList from "../home/common/book/BookList";
import BookHeader from "./BookHeader";

function LibraryContents(props) {
  const { filteredBooks } = props;
  return (
    <ul className="book-list">
      {filteredBooks.map((book, index) => (
        <>
          <BookHeader book={book} />
          <BookList key={index} selectedBook={book} index={index} />
        </>
      ))}
    </ul>
  );
}

export default LibraryContents;
