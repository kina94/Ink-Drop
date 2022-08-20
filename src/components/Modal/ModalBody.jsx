import React from "react";
import styled from "styled-components";

function ModalBody(props) {
  const { children } = props;
  return <ModalBodyWrapper>{children}</ModalBodyWrapper>;
}

const ModalBodyWrapper = styled.div`
  margin-top:3.5em;
    padding: 3em 35px 10px 35px;
    display:flex;
    color:var(--color-black);
    text-align:left;
  }
`;

export default ModalBody;
