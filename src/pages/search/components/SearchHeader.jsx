import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllLocalStorageItems } from "../../../common/utils/local_storage";
import {
  initSearchBooks,
  setNewSearchPage,
  setSearchParamsQuery,
} from "../../../modules/book";
import "../styles/Search.css";

function SearchHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useSelector((store) => store.bookReducer.searchParams);

  //검색창
  const onChange = (e) => {
    dispatch(setSearchParamsQuery(e.target.value));
  };

  //새로운 검색 시 state 초기화
  const initSearch = () => {
    dispatch(setNewSearchPage());
    dispatch(initSearchBooks());
    removeAllLocalStorageItems();
  };

  //엔터 누르면 원하는 도서 검색
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      initSearch();
      navigate(query);
    }
  };

  return (
    <section className="search-input-container">
      <div className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        type="text"
        placeholder="도서명, 저자명으로 검색해보세요."
        onChange={onChange}
        onKeyPress={handleSearch}
      />
    </section>
  );
}

export default SearchHeader;
