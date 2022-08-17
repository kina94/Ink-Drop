import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import MainContainer from "../views/MainContainer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<MainContainer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
