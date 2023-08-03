import { styled } from "styled-components";

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: var(--color-yellow);
  position: fixed;
  top: 0;
  z-index: 7;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 5px;
  gap: 2rem;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

export const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;

  li {
    display: flex;
    gap: 0.8rem;
    cursor: pointer;
    align-items: center;
    color: var(--color-brown);
    font-weight: bold;
    padding: 1.4rem 12.5rem 1.4rem 2.8rem;

    &:hover {
      background-color: var(--color-light-brown);
      color: white;

      > svg {
        color: var(--color-pink);
      }
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;
  font-size: 10px;
  color: var(--color-brown);
  width: 100%;
`;
