import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeAllLocalStorageItems } from "../../../common/utils/local_storage";
import styles from "../styles/Sidebar.module.css";

const HomeSidebar = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  // 검색 메뉴 두 번 클릭 시 검색 기록 초기화
  const resetSavedSearchHistory = () => {
    removeAllLocalStorageItems();
    document.querySelector("input").value = "";
  };

  const getSavedSearchURL = (savedParams) => {
    const savedSearchURL = savedParams
      ? `/home/search/${savedParams.query}`
      : "/home/search";
    return savedSearchURL;
  };

  const handleSearchMenu = () => {
    if (currentPath.includes("search/")) {
      resetSavedSearchHistory();
      navigate("/home/search");
    } else {
      const savedParams = JSON.parse(localStorage.getItem("params"));
      navigate(getSavedSearchURL(savedParams));
    }
  };

  return (
    <aside className={styles.section}>
      <h1 className={styles.name} onClick={() => navigate("/home/search")}>
        <i
          className="fas fa-book"
          style={{
            color: "var(--color-pink)",
            paddingRight: "8px",
            fontSize: "35px",
          }}
        ></i>
        <span>다독다독</span>
      </h1>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={handleSearchMenu}>
          <i className="fa-solid fa-magnifying-glass" id={styles.icon}></i>책
          검색하기
        </li>
        <li className={styles.li} onClick={() => navigate("/home/library")}>
          <i className="fa-solid fa-list-check" id={styles.icon}></i>내 서재
        </li>
        <li className={styles.li} onClick={() => navigate("/home/history")}>
          <i className="fa-solid fa-calendar-days" id={styles.icon}></i>독서
          기록
        </li>
      </ul>
      <div className={styles.copyright}>
        <span>Copyright 2022 All rights reserved by KINA</span>
      </div>
    </aside>
  );
};

export default HomeSidebar;
