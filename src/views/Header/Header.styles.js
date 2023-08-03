import { styled } from "styled-components";

export const Header = styled.header`
  width: 100%;
  background-color: var(--color-white);
  position: fixed;
  top: 0;
  z-index: 6;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: right;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;

  @media screen and (max-height: 1400px) and (max-width: 1024px) {
    display: none;
  }
`;

export const User = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  gap: 0.5rem;
  img {
    width: 4em;
    height: 3em;
    border-radius: 50%;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const UserSummary = styled.div`
  font-weight: bold;
`;

export const Grade = styled.span`
  color: var(--color-blue);
  font-size: 1.2rem;
`;

export const UserName = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: bold;
`;

export const DropdownContent = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 0.4rem;
  padding: 1.5rem 1rem;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 1.4rem;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid whitesmoke;
  padding: 0 1rem 1rem 1rem;
`;
