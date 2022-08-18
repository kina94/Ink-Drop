import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LibraryHeader(props) {
  const navigate = useNavigate();
  const imModalShow = useSelector((store) => store.toggleStore.modalToggle);
  return (
    <div
      className={
        imModalShow
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

export default LibraryHeader;
