import React from "react";
import { createPortal } from "react-dom";
import styles from "./tableModule.module.scss";
import ModalTopBar from "../../../../components/modals/topBar/ModalTopBar";
import { SimpleButton } from "../../../../components/buttons/Buttons";

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <div>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.errorModal}>
        <div className={styles.errorHeader}>
          <div className={styles.backHeader}>
            <ModalTopBar onClose={onClose} />

            <p className={styles.errorMessage}>{message}</p>
          </div>
          <SimpleButton size="mdChange" onClick={onClose}>
            확인
          </SimpleButton>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ErrorModal;
