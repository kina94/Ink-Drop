import React, { memo } from "react";
import * as SC from "./Header.styles.js";

const Header = memo(() => {
  return (
    <SC.Logo>
      <i
        className="fas fa-book fa-xs"
        style={{ color: "var(--color-pink)", paddingRight: "8px" }}
      />
      다독다독
    </SC.Logo>
  );
});

export default Header;
