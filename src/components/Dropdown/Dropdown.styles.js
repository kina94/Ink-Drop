import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  position: relative;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MenuWrapper = styled.div`
  z-index: 20;
  position: absolute;
  right: ${(props) => props.right && 0};
  bottom: ${({ bottom }) => `${bottom}`};
`;
