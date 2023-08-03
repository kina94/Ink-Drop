import React, { memo } from "react";

import * as SC from "./Footer.styles.js";

const Footer = memo(() => {
  return (
    <SC.Footer>
      <SC.Copyright>
        다독다독은 포트폴리오용 웹사이트로 깃허브와 구글을 통해서만 로그인이
        가능하며, 로그인에 사용된 개인정보는 오직 인증만을 위해 사용됩니다.
      </SC.Copyright>
      <SC.Copyright>Copyrightⓒ2022 by kina</SC.Copyright>
    </SC.Footer>
  );
});

export default Footer;
