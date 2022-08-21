import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setEditToggle, setModalToggle } from "../../modules/toggle";

function Modal(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const isModalOpen = useSelector((store) => store.toggleReducer.modalToggle);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(setModalToggle(false));
        dispatch(setEditToggle(false));
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target.id === "modal-wrapper") {
        dispatch(setModalToggle(false));
        dispatch(setEditToggle(false));
      }
    });
  }, []);

  useEffect(() => {
    document.querySelector("#modal-content").scrollTo(0, 0);
  }, []);

  return (
    <ModalWrapper id="modal-wrapper" isModalOpen={isModalOpen}>
      <ContentWrapper id="modal-content" isModalOpen={isModalOpen}>
        {children}
      </ContentWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: ${(props) => (props.isModalOpen ? "block;" : "none;")}
  overflow: hidden;
  z-index: 10;
  animation: fadein 0.5s forwards;
  position: fixed;
  left: 0;
  top: 0;
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  display: ${(props) => (props.isModalOpen ? "block;" : "none;")}
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 800px;
  max-height: 800px;
  overflow-y: auto;
  overflow-x: hidden;
  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    min-height: 100%;
    min-width: 100%;
    height: 100%;
    position: static;
    left: 0;
    top: 0;
    transform: none;
    border-radius: 0;
    padding: 2.5em 0 7em 0;
  }
`;

export default Modal;
