import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/home/common/navbar/Navbar";
import SearchContainer from "../views/SearchContainer";
import LibraryContainer from "../views/LibraryContainer";
import HistoryContainer from "../views/HistoryContainer";
import Sidebar from "../components/home/common/sidebar/Sidebar";
import MobileNavbar from "../components/mobile/navbar/MobileNavbar";
import LoadingSpinner from "../common/utils/LoadingSpinner";
import MoveTop from "../components/home/common/move_top/MoveTop";
import LocalStorage from "../common/utils/local_storage";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../modules/actions";
import "./Container.css";
import { getSavedBooksFromDB } from "../service/bookService";
import { isNewUser, setNewUserToDB } from "../service/userService";
import { onAuthChange } from "../service/authService";
import { setUser } from "../modules/user";

function MainContainer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.userReducer.user);
  // 첫 로그인 시 유저 정보를 세팅합니다.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        const { uid, displayName, email } = user;
        const userInfo = { uid, displayName, email };
        isNewUser(uid) && setNewUserToDB(uid, userInfo);
        dispatch(setUser(userInfo));
      } else {
        navigate("/");
      }
    });
  }, []);

  const onClickSearchNav = () => {
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

  const getSavedUserBooks = async () => {
    setIsLoading(true);
    const books = await getSavedBooksFromDB(user.uid);
    dispatch(bookActions.getSavedBooks(books));
    setIsLoading(false);
  };

  useEffect(() => {
    getSavedUserBooks();
  }, [user.uid]);

  return (
    <section className="main">
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <Navbar />
      <Sidebar onClickSearchNav={onClickSearchNav} />
      <MobileNavbar onClickSearchNav={onClickSearchNav} {...props} />
      <MoveTop />
      <section className="content">
        <Routes>
          <Route
            path="search/*"
            element={<SearchContainer setIsLoading={setIsLoading} />}
          />
          <Route
            path="library/*"
            element={<LibraryContainer/>}
          />
          <Route
            path="history/*"
            element={<HistoryContainer/>}
          />
        </Routes>
      </section>
    </section>
  );
}

export default MainContainer;
