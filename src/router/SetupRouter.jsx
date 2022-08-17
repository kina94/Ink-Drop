import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../layouts/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*" element={<Home />}/>
        <Route path='/home' element={<Navigate to='/home/search' replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
