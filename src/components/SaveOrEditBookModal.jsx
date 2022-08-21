import React, { useState } from "react";
import BookInformation from "./BookInformation";
import Modal from "./modal/Modal";
import ModalBody from "./modal/ModalBody";
import ModalTitle from "./modal/ModalTitle";
import ModalFooter from "./modal/ModalFooter";
import { bookCategory } from "../common/utils/common_var.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Rating from "./Rating";
import BookCategoryButton from "./BookCategoryButton";
import styled from "styled-components";
import Button from "./button/Button";
import { initSearchParams, onClickBookUpdateOrAdd } from "../modules/book";
import { setEditToggle, setModalToggle } from "../modules/toggle";
const TODAY = new Date().toISOString().substring(0, 10);

function SaveOrEditBookModal(props) {
  const isEditMode = useSelector((store) => store.toggleReducer.editToggle);
  const { savedBooks, selectedBook } = useSelector(
    (store) => store.bookReducer
  );
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState([]);

  useEffect(() => {
    setNewBook({
      ...selectedBook,
      type: !selectedBook.type ? "complete" : selectedBook.type,
    });
  }, [selectedBook]);

  const handleCategoryClick = (type) => {
    setNewBook({
      ...newBook,
      type: type,
      startDate: "",
      endDate: "",
      memo: "",
      review: "",
      rate: null,
    });
  };

  const handleRate = (rate) => {
    setNewBook({ ...newBook, rate: rate });
  };

  const onNewBookContentsChange = (e) => {
    setNewBook({ ...newBook, [e.target.id]: e.target.value });
  };

  const checkIsAlreadySavedBooks = () => {
    const isSaved = Object.keys(savedBooks).includes(selectedBook.isbn);
    return isSaved;
  };

  const handleSaveBookButton = () => {
    const saveNewBook = {
      ...newBook,
      endDate: newBook.endDate ? newBook.endDate : TODAY,
      startDate: newBook.startDate ? newBook.startDate : TODAY,
      addDate: isEditMode ? newBook.addDate : new Date().toISOString(),
    };

    if (!isEditMode && savedBooks) {
      if (checkIsAlreadySavedBooks()) {
        alert(`이미 저장된 책이에요. 내 서재를 확인해보세요.`);
      } else {
        alert(`저장이 완료되었습니다.`);
        dispatch(onClickBookUpdateOrAdd(user.uid, saveNewBook));
        dispatch(initSearchParams());
        dispatch(setModalToggle(false));
      }
    }

    if (isEditMode) {
      alert(`저장이 완료되었습니다.`);
      dispatch(onClickBookUpdateOrAdd(user.uid, saveNewBook));
      dispatch(setModalToggle(false));
      dispatch(setEditToggle(false));
    }
  };

  const ModalContentsBybookCategory = (bookCategory) => {
    switch (bookCategory) {
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
                onChange={onNewBookContentsChange}
                value={newBook.startDate || TODAY}
              />
            </div>
            <div className="option-container">
              <span>종료일</span>
              <input
                type="date"
                id="endDate"
                onChange={onNewBookContentsChange}
                value={newBook.endDate || TODAY}
              />
            </div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>후기</p>
            <div className="option-container">
              <input
                type="text"
                id="review"
                onChange={onNewBookContentsChange}
                value={newBook.review || ""}
              />
            </div>
            <p style={{ width: "100%", textAlign: "center" }}>나의 평점은?</p>
            <Rating
              book={selectedBook}
              stars={selectedBook.rate}
              handleRate={handleRate}
            ></Rating>
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
                onChange={onNewBookContentsChange}
                value={newBook.startDate || TODAY}
              />
            </div>
            <div></div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>메모</p>
            <div className="option-container">
              <input
                type="text"
                id="memo"
                onChange={onNewBookContentsChange}
                value={newBook.memo || ""}
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
                  onChange={onNewBookContentsChange}
                  value={newBook.memo || ""}
                />
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <Modal>
      <ModalTitle>{newBook.title}</ModalTitle>
      <ModalBody>
        <BookInformation />
        <OptionButtonWrapper>
          {Object.keys(bookCategory).map((key, index) => {
            if (key === "all") return;
            return (
              <li id={key} onClick={() => handleCategoryClick(key)}>
                <BookCategoryButton
                  key={index}
                  option={key}
                  name={bookCategory[key]}
                  selectedOption={newBook.type}
                />
              </li>
            );
          })}
        </OptionButtonWrapper>
        {ModalContentsBybookCategory(newBook.type)}
      </ModalBody>
      <ModalFooter>
        <Button variant="puple" onClick={handleSaveBookButton}>
          저장하기
        </Button>
        <Button variant="grey">취소하기</Button>
      </ModalFooter>
    </Modal>
  );
}

const OptionButtonWrapper = styled.ul`
  height: 50px;
  padding: 0;
  margin: 1em 0;
`;

export default SaveOrEditBookModal;
