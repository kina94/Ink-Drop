import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function Rating(props) {
  const { fontSize } = props;
  const { editToggle, modalToggle } = useSelector(
    (store) => store.toggleReducer
  );
  const initStars = new Array(5).fill(false);
  const savedStars = initStars.fill(true, 0, props.stars);
  const [clicked, setClicked] = useState(
    props.book && props.stars != undefined ? savedStars : initStars
  );

  const handleStarClick = (index) => {
    let update = [...clicked];
    for (let i = 0; i < 5; i++) {
      update[i] = i <= index ? true : false;
    }
    setClicked(update);
  };

  useEffect(() => {
    props.handleRate &&
      props.handleRate(clicked.filter((item) => item == true).length);
  }, [clicked]);

  useEffect(() => {
    if (!editToggle) {
      setClicked(savedStars);
    }
  }, [props.book]);

  useEffect(() => {
    if (!editToggle) {
      props.handleRate && setClicked(new Array(5).fill(false));
    }
  }, [modalToggle]);

  return (
    <RateWrapper>
      {clicked.map((item, index) => {
        return (
          <Star
            key={index}
            onClick={
              props.onClick ? props.onClick : () => handleStarClick(index)
            }
            fontSize={fontSize}
            clicked={clicked[index]}
          >
            <i id="rate-star" className="fas fa-star"></i>
          </Star>
        );
      })}
    </RateWrapper>
  );
}

const Star = styled.li`
  cursor: pointer;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (props.clicked ? "orange;" : "slategrey;")};
`;

const RateWrapper = styled.ul`
  padding: 0;
`;

export default Rating;
