import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SearchContainer from "./Search";
import LibraryContainer from "./Library";
import HistoryContainer from "./History";
import MobileNavbar from "../components/mobile/navbar/MobileNavbar";
import LoadingSpinner from "../common/utils/LoadingSpinner";
import MoveTop from "../components/home/common/move_top/MoveTop";
import LocalStorage from "../common/utils/local_storage";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../modules/actions";
import "./Container.css";
import Sidebar from "views/Sidebar";
import Header from "views/Header";

function Home(props) {
  const dispatch = useDispatch();
  const savedBooks = useSelector((store) => store.bookStore.savedBooks);
  const navigate = useNavigate();
  const location = useLocation();

  // 첫 로그인 시 유저 정보를 세팅합니다.
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.authService.onAuthChange(
      (user) => {
        if (user) {
          setUserInfo({
            ...userInfo,
            userId: user.uid, // 유저 토큰
            userName: user.displayName, // 유저 이름
            userEmail: user.email, // 유저 이메일
            photoURL: "",
          });
          userInfo.userId &&
            props.userRepository.setUserProfile(
              userInfo.userId,
              userInfo,
              props.userRepository.saveUserProfile(userInfo.userId, userInfo)
            );

          userInfo.userId &&
            props.userRepository.loadUserProfile(userInfo.userId, setUserInfo);
        } else {
          navigate("/");
        }
      },
      [userInfo.userId]
    );
  }, [props.authService, props.userRepository]);

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
    const books = await props.bookRepository.syncBooks(userInfo.userId);
    dispatch(bookActions.getSavedBooks(books));
    setIsLoading(false);
  };

  useEffect(() => {
    FetchSavedBooks();
  }, [userInfo.userId]);

  return (
    <section className="main">
      {isLoading && <LoadingSpinner />}
      <Header userInfo={userInfo} {...props} />
      <Sidebar />
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
                bookRepository={props.bookRepository}
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

export default Home;
