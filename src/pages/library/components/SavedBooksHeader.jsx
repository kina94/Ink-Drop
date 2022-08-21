import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SavedBooksHeader(props) {
  const isModalOpen = useSelector((store) => store.toggleReducer.modalToggle);
  const navigate = useNavigate();
  return (
    <div
      className={
        isModalOpen
          ? "saved-book-list-header mobile-hide"
          : "saved-book-list-header"
      }
    >
      <button
        className="saved-book-back"
        onClick={() => navigate("/home/library")}
      >
        <i id="icon" className="fas fa-chevron-left"></i>
      </button>
      {props.children}
    </div>
  );
}

export default SavedBooksHeader;
