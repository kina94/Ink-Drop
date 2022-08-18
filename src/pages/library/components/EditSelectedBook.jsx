import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../../../modules/actions";
import { setSelectedBook } from "../../../modules/book";

function EditSavedBook() {
  const selectedBook = useSelector((store) => store.bookReducer.selectedBook);
  const dispatch = useDispatch();

  const updateBookContents = (newBook) => {
    dispatch(setSelectedBook(newBook));
    dispatch(toggleActions.toggleModifyMode(false));
  };
  
  return <div>EditBook</div>;
}

export default EditSavedBook;
