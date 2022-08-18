import "./App.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  useEffect(() => {
    document.querySelector(".app").style.height = window.innerHeight + "px";
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={<Home />} />
          <Route
            path="/home"
            element={<Navigate to="/home/search" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
