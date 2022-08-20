import React, { useEffect, useState } from "react";

function useModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target.className === "modal") {
        setModalOpen(false);
      }
    });
  }, []);

  return { modalOpen, handleModalOpen, handleModalClose };
}

export default useModal;
