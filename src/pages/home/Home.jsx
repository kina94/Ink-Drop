import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomeHeader from "./components/HomeHeader";
import MoveTopButton from "./components/MoveTopButton";
import MobileNavbar from "./components/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import "./Container.css";
import { getSavedBooksFromDB } from "../../service/bookService";
import { isNewUser, setNewUserToDB } from "../../service/userService";
import { onAuthChange } from "../../service/authService";
import { setUser } from "../../modules/user";
import { setSavedBooks } from "../../modules/book";
import HomeSidebar from "./components/HomeSidebar";
import Search from "../search/Search";
import Library from "../library/Library";
import History from "../history/History";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { setModalToggle } from "../../modules/toggle";

function Home() {
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
    const response = await getSavedBooksFromDB(user.uid);
    dispatch(setSavedBooks(response));
    setIsLoading(false);
    console.log("abc");
  };

  useEffect(() => {
    getSavedUserBooks();
  }, [user.uid]);

  return (
    <section className="main">
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <HomeHeader />
      <HomeSidebar />
      {/* 수정필요 */}
      <MobileNavbar />
      <MoveTopButton />
      <section className="content">
        <Routes>
          <Route
            path="search/*"
            element={<Search setIsLoading={setIsLoading} />}
          />
          <Route path="library/*" element={<Library />} />
          <Route path="history/*" element={<History />} />
        </Routes>
      </section>
    </section>
  );
}

export default Home;
