import React, { useEffect } from "react";
import styled from "styled-components";

function Modal(props) {
  const { modalOpen } = props;
  useEffect(() => {
    document.querySelector("#modal-content").scrollTo(0, 0);
  }, []);
  
  return (
    <ModalWrapper id='modal-wrapper' modalOpen={modalOpen}>
      <ContentWrapper id="modal-content" modalOpen={modalOpen}>
        {props.children}
      </ContentWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: ${(props) => (props.modalOpen ? 'block;' : 'none;')}
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
  display: ${(props) => (props.modalOpen ? 'block;' : 'none;')}
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
`;

export default Modal;
