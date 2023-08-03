import Dropdown from "components/Dropdown";
import * as SC from "./Header.styles";
import DEFAULT_IMAGE from "assets/images/default_logo.png";
import { useCallback } from "react";

const Header = (props) => {
  const { userName, userEmail, photoURL } = { ...props.userInfo };
  const logout = useCallback(() => {
    props.authService.logout();
  }, [props.authService]);

  return (
    <SC.Header>
      <Dropdown
        button={
          <SC.User>
            <SC.UserImage>
              <img src={photoURL ? photoURL : DEFAULT_IMAGE} />
            </SC.UserImage>
            <SC.UserSummary>
              <span>다독이</span>
              <SC.UserName>
                <span>{userName}</span>
                <i className="fa-solid fa-angle-down" />
              </SC.UserName>
            </SC.UserSummary>
          </SC.User>
        }
        menu={
          <SC.DropdownContent>
            <SC.UserInfo>
              <span>{userName}</span>
              <span>{userEmail}</span>
            </SC.UserInfo>
            <SC.LogoutButton onClick={logout}>Logout</SC.LogoutButton>
          </SC.DropdownContent>
        }
      />
    </SC.Header>
  );
};

export default Header;
