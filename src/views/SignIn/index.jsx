import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import * as SC from "./SignIn.styles";
import LocalStorage from "common/utils/local_storage";

const SignIn = ({ authService }) => {
  const navigate = useNavigate();

  const goToHome = (userId) => {
    navigate("/home/search", { state: { id: userId } });
  };

  const onLogin = (event) => {
    LocalStorage.removeAllItems();
    authService //
      .login(event.currentTarget.value)
      .then((data) => goToHome(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToHome(user.id);
    });
  }, []);

  return (
    <SC.SignIn>
      <Header />
      <SC.Contents>
        <div>
          <SC.Title>Sign In</SC.Title>
          <SC.SubTitle>다독다독과 함께 독서 습관을 길러보세요.</SC.SubTitle>
        </div>

        <SC.SubmitContainer>
          <SC.SubmitTitle>Login With</SC.SubmitTitle>
          <SC.SignInOptions>
            <li>
              <SC.SignInButton onClick={onLogin} value="Google">
                <i className="fa-brands fa-google"></i>
              </SC.SignInButton>
            </li>
            <li>
              <SC.SignInButton onClick={onLogin} value="Github">
                <i className="fa-brands fa-github"></i>
              </SC.SignInButton>
            </li>
          </SC.SignInOptions>
        </SC.SubmitContainer>

        <Footer></Footer>
      </SC.Contents>
      <SC.Canvas />
    </SC.SignIn>
  );
};

export default SignIn;
