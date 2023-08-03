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
  display: flex;
  width: 100%;
  gap: 0.5rem;
  img {
    width: 4em;
    height: 3em;
    border-radius: 50%;
  }
`;

export const UserImage = styled.div``;

export const UserSummary = styled.div``;

export const UserName = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const DropdownContent = styled.div``;

export const UserInfo = styled.div``;

export const LogoutButton = styled.button``;
