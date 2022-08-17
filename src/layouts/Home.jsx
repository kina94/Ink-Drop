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
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../modules/actions";
import "./Container.css";
import { getSavedBooksFromDB } from "../service/bookService";
import { isNewUser, setNewUserToDB } from "../service/userService";
import { onAuthChange } from "../service/authService";
import { setUser } from "../modules/user";
import { removeAllLocalStorageItems } from "../common/utils/local_storage";

function MainContainer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        const { uid, displayName, email } = user;
        const userInfo = { uid, displayName, email };
        // 새로운 유저인 경우 DB에 세팅
        isNewUser(uid) && setNewUserToDB(uid, userInfo); 
        dispatch(setUser(userInfo));
      } else {
        navigate("/");
      }
    });
  }, []);


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
