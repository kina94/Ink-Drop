import Logo from "components/Logo";
import * as SC from "./Sidebar.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookActions } from "modules/actions";
import LocalStorage from "common/utils/local_storage";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const searchBook = () => {
    if (location.pathname.includes("search/")) {
      navigate("/home/search");
      LocalStorage.removeAllItems();
      document.querySelector("input").value = "";
    } else {
      dispatch(bookActions.initSearchParams());
      const savedParams = JSON.parse(localStorage.getItem("params"));
      const serachURL = savedParams
        ? `/home/search/${savedParams.query}`
        : "/home/search";
      navigate(serachURL);
    }
  };

  const menuList = [
    {
      label: "책 검색하기",
      value: "search",
      icon: "fa-solid fa-magnifying-glass",
    },
    { label: "내 서재", value: "library", icon: "fa-solid fa-list-check" },
    { label: "독서 기록", value: "history", icon: "fa-solid fa-calendar-days" },
  ];

  return (
    <SC.Sidebar>
      <Logo onClick={() => navigate("/home/search")} />
      <SC.MenuList>
        {menuList.map(({ label, value, icon }) => (
          <li
            onClick={() => {
              value === "search" ? searchBook() : navigate(`/home/${value}`);
            }}
          >
            <i className={icon} />
            {label}
          </li>
        ))}
      </SC.MenuList>

      <SC.Copyright>Copyright 2022 All rights reserved by KINA</SC.Copyright>
    </SC.Sidebar>
  );
};

export default Sidebar;
