import { useLayoutEffect, useRef, useState } from "react";
import * as SC from "./Dropdown.styles";
import { useOutsideClick } from "common/hooks";

const Dropdown = ({
  button,
  menu,
  closeMouseLeave = false,
  closeOnClick = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posRight, setPosRight] = useState(false);
  const [posBottom, setPosBottom] = useState("auto");
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  const handleSetPosition = () => {
    if (!containerRef.current) return;
    const { right, bottom, height } =
      containerRef.current.getBoundingClientRect();
    const maxXPos = Math.ceil(200 + right);
    const maxYPos = Math.ceil(26 + bottom);
    setPosRight(maxXPos >= document.body.clientWidth);
    setPosBottom(
      maxYPos >= document.body.clientHeight ? `${height}px` : "auto"
    );
  };

  useLayoutEffect(() => {
    handleSetPosition();
  }, [menuOpen]);

  useOutsideClick({
    closeHandler: () => setMenuOpen(false),
    currentRef: containerRef,
  });

  console.log(menuOpen);
  return (
    <SC.Container
      ref={containerRef}
      onMouseLeave={() => {
        closeMouseLeave && setMenuOpen(false);
      }}
    >
      <SC.ButtonWrapper onClick={() => setMenuOpen(!menuOpen)}>
        {button}
      </SC.ButtonWrapper>
      {menuOpen && (
        <SC.MenuWrapper
          ref={menuRef}
          right={posRight}
          bottom={posBottom}
          onClick={() => closeOnClick && setMenuOpen(false)}
        >
          {menu}
        </SC.MenuWrapper>
      )}
    </SC.Container>
  );
};

export default Dropdown;
