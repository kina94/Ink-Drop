import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import React from "react";

function BookCategoryButton(props) {
  const { option, selectedOption, onClick, name, clickEvent } = props;
  const switchButtonContent = (name) => {
    switch (name) {
      case "읽은 책":
        return (
          <span>
            <FontAwesomeIcon icon="fas fa-flag" id="icon" />
            {name}
          </span>
        );
      case "읽고 있는 책":
        return (
          <span>
            <FontAwesomeIcon id="icon" icon="fas fa-book-open" />
            {name}
          </span>
        );
      case "읽고 싶은 책":
        return (
          <span>
            <FontAwesomeIcon id="icon" icon="fas fa-heart" />
            {name}
          </span>
        );
    }
  };
  return (
    <StyledButton
      clickEvent={false}
      active={selectedOption === option}
      onClick={onClick}
    >
      {switchButtonContent(name)}
    </StyledButton>
  );
}

const StyledButton = styled.button`
cursor: ${(props) => (props.clickEvent ? "pointer;" : "auto;")}
min-width:100%;
margin-right: 10px;
  height: 100%;
  border: none;
  background-color: ${(props) =>
    props.active ? "var(--color-hotpink);" : "whitesmoke;"}
  border-radius: 10px;
  color: ${(props) => (props.active ? "white;" : "var(--color-black);")} 
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  &:hover {
    opacity: ${(props) => (props.clickEvent ? "0.8;" : "1;")}
  }
  #icon {
    padding-right: 5px;
    color: ${(props) => (props.active ? "white;" : "var(--color-black);")} 
  }
`;

export default BookCategoryButton;
