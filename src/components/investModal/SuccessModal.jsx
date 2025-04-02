import React from "react";
import styles from "./SuccessModal.module.scss"; // 스타일 파일 임포트

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>투자가 완료되었습니다</h2>
        <button onClick={onClose} className={styles.closeButton}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
