import * as SC from "./Button.styles";

const Button = (props) => {
  const variant = props.variant || "primary";
  return {
    purple: <SC.Purple {...props}>{props.children}</SC.Purple>,
    pink: <SC.Pink {...props}> {props.children}</SC.Pink>,
    slate: <SC.Slate {...props}>{props.children}</SC.Slate>,
  }[variant];
};

export default Button;
