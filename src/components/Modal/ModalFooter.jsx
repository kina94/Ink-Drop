import React from "react";
import styled from "styled-components";

function ModalFooter(props) {
  return <ModalFooterWrapper>{props.children}</ModalFooterWrapper>;
}

const ModalFooterWrapper = styled.section`
  width: 100%;
  height: 65px;
  display: flex;
  border-radius: 10px;
  justify-content: right;
  margin: 30px 0 0 0;
  box-shadow: rgb(0 0 0 / 5%) 5px 3px 6px 5px;
  background-color: white;
  padding: 10px;
  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    position: fixed;
    border-radius: 0;
    margin: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
  }
`;

export default ModalFooter;
