import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCategoryButton from "../../../components/BookCategoryButton";
import Rating from "../../../components/Rating";
import styled from "styled-components";
import Modal from "../../../components/modal/Modal";
import ModalTitle from "../../../components/modal/ModalTitle";
import ModalBody from "../../../components/modal/ModalBody";
import BookInformation from "../../../components/BookInformation";
import ModalFooter from "../../../components/modal/ModalFooter";
import Button from "../../../components/button/Button";
import { bookCategory } from "../../../common/utils/common_var";
import { setEditToggle, setModalToggle } from "../../../modules/toggle";
import { onClickBookDelete } from "../../../modules/book";

function SavedBookContents(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer.user);
  const selectedBook = useSelector((store) => store.bookReducer.selectedBook);

  const handleEditButton = () => {
    dispatch(setEditToggle(true));
  };

  const handleDeleteButton = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      dispatch(onClickBookDelete(selectedBook.id, user.uid));
      alert("삭제가 완료되었습니다.");
      dispatch(setModalToggle(false));
    }
  };

  // 좀 더 깔끔하게 만들 수 있는 방법 생각 필요
  const viewChangeByType = (type) => {
    switch (type) {
      case "complete":
        return (
          <form id="saved-book-view">
            <i id="icon" className="fas fa-calendar-check"></i>
            <p>독서기간</p>
            <div className="option-container" id="option-saved">
              <span>시작일</span>
              <span id="view">{selectedBook.startDate}</span>
            </div>
            <div className="option-container" id="option-saved">
              <span>종료일</span>
              <span id="view">{selectedBook.endDate}</span>
            </div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>후기</p>
            <div className="option-container" id="option-saved">
              <span id="view">{selectedBook.review}</span>
            </div>
            <p style={{ width: "100%", textAlign: "center" }}>내가 남긴 평점</p>
            <Rating
              book={selectedBook}
              stars={selectedBook.rate}
              onClick={(e) => e.preventDefault()}
            />
          </form>
        );
      case "reading":
        return (
          <form>
            <i id="icon" className="fas fa-calendar-check"></i>
            <p>독서기간</p>
            <div className="option-container" id="option-saved">
              <span>시작일</span>
              <span id="view">{selectedBook.startDate}</span>
            </div>
            <div></div>
            <i id="icon" className="fas fa-pencil"></i>
            <p>메모</p>
            <div className="option-container" id="option-saved">
              <span id="view">{selectedBook.memo}</span>
            </div>
          </form>
        );
      case "want":
        return (
          <div>
            <form>
              <section className="option-button-container"></section>
              <i id="icon" className="fas fa-pencil"></i>
              <p>메모</p>
              <div className="option-container" id="option-saved">
                <span id="view">{selectedBook.memo}</span>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <Modal>
      <ModalTitle>{selectedBook.title}</ModalTitle>
      <ModalBody>
        <BookInformation />
        <OptionButtonWrapper>
          <BookCategoryButton
            key={selectedBook.id}
            option={selectedBook.type}
            name={bookCategory[selectedBook.type]}
            selectedOption={selectedBook.type}
            onClick={(e) => e.preventDefault()}
          />
        </OptionButtonWrapper>
        {viewChangeByType(selectedBook.type)}
      </ModalBody>
      <ModalFooter>
        <Button variant="puple" onClick={handleEditButton}>
          수정하기
        </Button>
        <Button variant="grey" onClick={handleDeleteButton}>
          삭제하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const OptionButtonWrapper = styled.ul`
  height: 50px;
  padding: 0;
  margin: 1em 0;
`;

export default SavedBookContents;
