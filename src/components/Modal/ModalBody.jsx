import React from "react";
import styled from "styled-components";

function ModalBody(props) {
  const { children } = props;
  return <ModalBodyWrapper>{children}</ModalBodyWrapper>;
}

const ModalBodyWrapper = styled.section`
  margin-top:3.5em;
    padding: 3em 35px 10px 35px;
    display:flex;
    flex-direction:column;
    color:var(--color-black);
    text-align:left;
    @media screen and (max-height: 1400px) and (max-width: 1024px) {
      padding: 0 10px;
    }
  }
`;

export default ModalBody;
