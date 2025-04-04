import React from "react";
import styles from "./SuccessModal.module.scss";
import ModalTopBar from "../modals/topBar/ModalTopBar";


const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.successModal}>
      <div className={styles.modalContent}>
        <ModalTopBar
          className={styles.successTopbar}
          onClose={onClose}
        ></ModalTopBar>
        <p className={styles.successText}>투자가 완료되었어요!</p>
        <button onClick={onClose} className={styles.closeButton}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
