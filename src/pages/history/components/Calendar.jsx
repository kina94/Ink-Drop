import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import useModal from "../../../hooks/useModal";
import "../styles/Calendar.css";
import { ModalTitle } from "react-bootstrap";

function CalendarView(props) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [selectedDayBook, setSelectedDayBook] = useState([]);

  const endDate = props.completeBooks.map((item) => {
    return item.endDate;
  });

  const handleDateClick = () => {
    const date = moment(value).format("YYYY-MM-DD");
    const books = props.completeBooks.filter((item) => item.endDate === date);
    if (books.length === 0) {
      alert("해당 날짜에 읽으신 책이 없어요.");
      return;
    }
    setSelectedDayBook(books);
    handleModalOpen();
  };

  useEffect(() => {
    if (value != undefined) {
      handleDateClick();
    }
  }, [value]);

  return (
    <section className="calendar-view">
      <div className="title">
        <i id="icon" className="fa-solid fa-calendar-days" />
        <span>{user.displayName}님의 독서 캘린더</span>
        <div id="label">
          <div id="box"></div>책을 완독한 날
        </div>
      </div>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={({ date, view }) => {
          if (endDate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
      />

      <Modal modalOpen={modalOpen}>
        <ModalTitle handleModalClose={handleModalClose}>
          <span id="day">{moment(value).format("YYYY-MM-DD")}일에 읽은 책</span>
        </ModalTitle>
        <section className="day-read-book">
          <ul>
            {selectedDayBook.map((book, index) => {
              return (
                <li key={index}>
                  <div id="item">
                    <img
                      className="complete-book-img"
                      src={book.thumbnail}
                    ></img>
                  </div>
                  <div className="complete-book-contents">
                    <span>{book.title}</span>
                    <span>
                      {book.authors[0]} / {book.publisher}
                    </span>
                    <span>{book.review}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </Modal>
    </section>
  );
}

export default CalendarView;
