import React, { useState } from "react";
import styles from "./MySelectModal.module.scss";
import ModalTopBar from "../tapBar/ModalTopBar";

function MySelectModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseWindow = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <main className={styles.container}>
        <ModalTopBar onClose={handleCloseWindow}>
          나의 기업 선택하기
        </ModalTopBar>
      </main>
    )
  );
}

export default MySelectModal;
