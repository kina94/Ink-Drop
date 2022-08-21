import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setEditToggle, setModalToggle } from "../../modules/toggle";

function ModalTitle(props) {
  const dispatch = useDispatch();

  const handleCloseButton = () => {
    dispatch(setModalToggle(false));
    dispatch(setEditToggle(false));
  };

  const { children } = props;

  return (
    <ModalTitleWrapper>
      <Title>{children}</Title>
      <CloseButton onClick={handleCloseButton}>
        <i className="fas fa-times"></i>
      </CloseButton>
    </ModalTitleWrapper>
  );
}

const ModalTitleWrapper = styled.section`
  padding: 15px;
  background-color: white;
  position: fixed;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 5px;
  top: 0;
  display: flex;
  color: var(--color-black);
  font-weight: bold;
  text-align: left;
  word-break: keep-all;
`;

const Title = styled.div`
  display: -webkit-box;
  word-wrap: break-word;
  font-size: 1.1em;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: var(--color-hotpink);
  height: 100%;
  text-align: right;
  &:hover {
    transform: scale(1.2);
  }
`;
export default ModalTitle;
