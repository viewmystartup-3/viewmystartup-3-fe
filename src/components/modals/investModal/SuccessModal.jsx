import React from "react";
import styles from "./InvestModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import { SimpleButton } from "../../buttons/Buttons";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.successContent}>
        <ModalTopBar
          className={styles.successTopbar}
          onClose={onClose}
        ></ModalTopBar>
        <p className={styles.successText}>투자가 완료되었어요!</p>
        <div className={styles.buttonContainer}>
          <SimpleButton size="lg" onClick={onClose}>
            확인
          </SimpleButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
