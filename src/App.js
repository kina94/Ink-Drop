import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/js/all.js";
import MainContainer from "./pages/MainContainer";
import { useEffect } from "react";
import SignIn from "views/SignIn";

function App({ userRepository, authService, bookRepository }) {
  useEffect(() => {
    document.querySelector(".app").style.height = window.innerHeight + "px";
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn authService={authService} />} />
          <Route
            path="/home/*"
            element={
              <MainContainer
                authService={authService}
                userRepository={userRepository}
                bookRepository={bookRepository}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
