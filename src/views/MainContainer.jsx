import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../components/home/common/navbar/Navbar";
import SearchContainer from "./SearchContainer";
import LibraryContainer from "./LibraryContainer";
import HistoryContainer from "./HistoryContainer";
import Sidebar from "../components/home/common/sidebar/Sidebar";
import MobileNavbar from "../components/mobile/navbar/MobileNavbar";
import LoadingSpinner from "../common/utils/LoadingSpinner";
import MoveTop from "../components/home/common/move_top/MoveTop";
import LocalStorage from "../common/utils/local_storage";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../modules/actions";
import "./Container.css";
import { getSavedBooksFromDB } from "../service/bookService";
import {
  loadUserProfile,
  saveUserProfile,
  setUserProfile,
} from "../service/userService";
import { onAuthChange } from "../service/authService";

function MainContainer(props) {
  const dispatch = useDispatch();
  const savedBooks = useSelector((store) => store.bookStore.savedBooks);
  const navigate = useNavigate();
  const location = useLocation();

  // 첫 로그인 시 유저 정보를 세팅합니다.
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        setUserInfo({
          ...userInfo,
          userId: user.uid, // 유저 토큰
          userName: user.displayName, // 유저 이름
          userEmail: user.email, // 유저 이메일
          photoURL: "",
        });
        userInfo.userId &&
          setUserProfile(
            userInfo.userId,
            userInfo,
            saveUserProfile(userInfo.userId, userInfo)
          );

        userInfo.userId && loadUserProfile(userInfo.userId, setUserInfo);
      } else {
        navigate("/");
      }
    });
  }, [userInfo.userId]);

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

  const FetchSavedBooks = async () => {
    setIsLoading(true);
    const books = await getSavedBooksFromDB(userInfo.userId);
    dispatch(bookActions.getSavedBooks(books));
    setIsLoading(false);
  };

  useEffect(() => {
    FetchSavedBooks();
  }, [userInfo.userId]);

  return (
    <section className="main">
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <Navbar userInfo={userInfo} {...props} />
      <Sidebar onClickSearchNav={onClickSearchNav} />
      <MobileNavbar onClickSearchNav={onClickSearchNav} {...props} />
      <MoveTop />
      <section className="content">
        <Routes>
          <Route
            exact={true}
            path="search/*"
            element={
              <SearchContainer
                userInfo={userInfo}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            exact={true}
            path="library/*"
            element={<LibraryContainer userInfo={userInfo} />}
          />
          <Route
            exact={true}
            path="history/*"
            element={<HistoryContainer userInfo={userInfo} />}
          />
        </Routes>
      </section>
    </section>
  );
}

export default MainContainer;
