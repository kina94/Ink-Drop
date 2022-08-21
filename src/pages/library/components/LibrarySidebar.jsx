import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bookCategory } from "../../../common/utils/commonVar";
import "./SubSidebar.css";

function LibrarySidebar() {
  const currentMenu = useParams()["*"];
  const location = useLocation();
  const navigate = useNavigate();

  // 전체, 읽은책, 읽고 있는 책, 읽고 싶은 책 카테고리 선택
  const onClickCategory = (key) => {
    navigate(`/home/library/${key}`);
  };

  return (
    <section
      className={`sub-sidebar-container ${
        location.pathname != "/home/library" ? "hide" : ""
      }`}
    >
      <ul>
        {Object.keys(bookCategory).map((key, index) => (
          <li
            className={key === currentMenu ? "active" : ""}
            key={index}
            onClick={() => onClickCategory(key)}
          >
            {bookCategory[key]}
            <i id="icon" className="fa-solid fa-angle-right"></i>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LibrarySidebar;