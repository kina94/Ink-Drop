import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ShowMessage from "../components/home/common/alert/ShowMessage";
import LibrarySidebar from "../components/home/contents/library/LibrarySidebar";
import SavedBooksByCategory from "../components/home/contents/library/SavedBooksByCategory";
import animationData from "../assets/animation/72170-books.json";
import { useSelector } from "react-redux";

function Library() {
  const currentCategoryKey = useParams()["*"];
  return (
    <section className="library">
      <LibrarySidebar />
      {currentCategoryKey === "" ? (
        <ShowMessage
          value={"카테고리를 선택해주세요."}
          animationData={animationData}
          width={"200px"}
          height={"200px"}
        />
      ) : (
        <SavedBooksByCategory />
      )}
    </section>
  );
}

export default Library;
