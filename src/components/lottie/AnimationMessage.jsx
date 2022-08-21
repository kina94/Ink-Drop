import React from "react";
import Lottie from "react-lottie";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

function AnimationMessage(props) {
  const currentPath = useLocation().pathname;
  const options = {
    animationData: props.animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <AnimationWrapper currentPath={currentPath}>
      <Lottie
        options={options}
        width={props.width}
        height={props.height}
      ></Lottie>
      {props.children}
    </AnimationWrapper>
  );
}

const AnimationWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) =>
    props.currentPath === "/home/library" ? "none;" : "flex;"};
  position: absolute;
  bottom: 1em;
  left: 7em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
  font-weight: bold;
  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    left: 0;
    bottom: 3em;
  }
`;

export default AnimationMessage;
