import * as SC from "./Logo.styles";

const Logo = ({ onClick }) => {
  return (
    <SC.Logo onClick={onClick}>
      <i
        className="fas fa-book fa-xs"
        style={{ color: "var(--color-pink)", paddingRight: "8px" }}
      />
      다독다독
    </SC.Logo>
  );
};

export default Logo;
