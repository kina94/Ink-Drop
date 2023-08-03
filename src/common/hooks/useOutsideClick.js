import { useEffect } from "react";

const useOutsideClick = ({ closeHandler, currentRef }) => {
  const outSideClick = (e) => {
    const insideElem = currentRef?.current;
    if (insideElem?.contains(e.target)) return;
    closeHandler(e);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", closeHandler);
    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("contextmenu", closeHandler);
      document.removeEventListener("mousedown", outSideClick);
    };
  }, []);
};

export default useOutsideClick;
