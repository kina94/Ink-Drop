import React from "react";
import "./Modal.css";

function Modal(props) {
  const { modalOpen } = props;

  return (
    <div className={modalOpen ? "modal" : "modal modal-hide"}>
      <div className={modalOpen ? "content-wrapper" : "content-wrapper hide"}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
