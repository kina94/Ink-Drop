import React from "react";
import { useDispatch, useSelector } from 'react-redux'

function SelectedBook() {
  const savedBooks = useSelector(store => store.bookReducer.savedBooks)

  //선택된 옵션(읽은, 안 읽은, 읽고싶은)에 따른 하위 컨텐츠 리턴
  const selectedOptionContent = () => {
    switch (selectedOption) {
      case "complete":
        return (
          <form>
            <i id="icon" className="fas fa-calendar-check"></i>
            <p>독서기간</p>
            <div className="option-container">
              <span>시작일</span>
              <input
                type="date"
                id="startDate"
                onChange={handleOptionInput}
                value={saveBook.startDate || dateValue}
              />
            </div>
            <div className="option-container">
              <span>종료일</span>
              <input
                type="date"
                id="endDate"
                onChange={handleOptionInput}
                value={saveBook.endDate || dateValue}
              />
            </div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>후기</p>
            <div className="option-container">
              <input
                type="text"
                id="review"
                onChange={handleOptionInput}
                value={saveBook.review || ""}
              />
            </div>
            <p style={{ width: "100%", textAlign: "center" }}>나의 평점은?</p>
            <Rating book={selectedBook} handleRate={handleRate}></Rating>
          </form>
        );
      case "reading":
        return (
          <form>
            <i id="icon" className="fas fa-calendar-check"></i>
            <p>독서기간</p>
            <div className="option-container">
              <span>시작일</span>
              <input
                type="date"
                id="startDate"
                onChange={handleOptionInput}
                value={saveBook.startDate || dateValue}
              />
            </div>
            <div></div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>메모</p>
            <div className="option-container">
              <input
                type="text"
                id="memo"
                onChange={handleOptionInput}
                value={saveBook.memo || ""}
              />
            </div>
          </form>
        );
      case "want":
        return (
          <div>
            <form>
              <i id="icon" className="fas fa-pencil"></i>
              <p>메모</p>
              <div className="option-container">
                <input
                  type="text"
                  id="memo"
                  onChange={handleOptionInput}
                  value={saveBook.memo || ""}
                />
              </div>
            </form>
          </div>
        );
    }
  };
  return (
    <section className="save-contents">
      <section className="option-button-container">
        {Object.keys(savedBookCategory).map((key, index) => {
          if (key === "all") return;
          return (
            <SaveOptionButton
              key={index}
              option={key}
              name={savedBookCategory[key]}
              onClick={onClickOption}
              selectedOption={selectedOption}
            />
          );
        })}
      </section>
      <section className="selected-display">
        {selectedOptionContent()}
        <div className="button-container">
          <button className="save" type="submit" onClick={onClickSaveBook}>
            저장하기
          </button>
        </div>
      </section>
    </section>
  );
}

export default SelectedBook;
