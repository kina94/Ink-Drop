import React from "react";
import { useParams } from "react-router-dom";
import SavedBookList from "./components/SavedBookList";
import animationData from "../../assets/animation/72170-books.json";
import ShowMessage from "../../components/home/common/alert/ShowMessage";
import LibrarySidebar from "./components/LibrarySidebar";

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
        <SavedBookList />
      )}
    </section>
  );
}

export default Library;
