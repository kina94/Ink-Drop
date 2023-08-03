import { useCallback } from "react";

import * as SC from "./Header.styles";
import { Dropdown, Button } from "components";
import DEFAULT_IMAGE from "assets/images/default_logo.png";

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
            <img src={photoURL ? photoURL : DEFAULT_IMAGE} />
            <SC.UserSummary>
              <SC.Grade>다독이</SC.Grade>
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
              <SC.UserName>{userName}</SC.UserName>
              <span>{userEmail}</span>
            </SC.UserInfo>
            <Button variant="slate" onClick={logout}>
              Logout
            </Button>
          </SC.DropdownContent>
        }
      />
    </SC.Header>
  );
};

export default Header;
