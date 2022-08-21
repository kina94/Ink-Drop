import React from "react";
import styled from "styled-components";

function Button(props) {
  const { children, variant, onClick } = props;
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  height: 100%;
  margin: 0 0 0 6px;
  width: 150px;
  background-color: ${(props) => {
    if (props.variant === "puple") {
      return "var(--color-blue);";
    }
    if (props.variant === "grey") {
      return "#708090;";
    }
  }};
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
