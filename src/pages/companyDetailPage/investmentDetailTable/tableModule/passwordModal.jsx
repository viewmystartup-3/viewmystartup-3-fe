import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./tableModule.module.scss";
import ModalTopBar from "../../../../components/modals/topBar/ModalTopBar";
import eyeIcon from "../../../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../../../assets/btn_visibility_off.png";
import { SimpleButton } from "../../../../components/buttons/Buttons";

const PasswordModal = ({ isOpen, onClose, onSubmit, title, actionText }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // 모달이 열리거나 닫힐 때 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setShowPassword(false);
      setError("");
    }
  }, [isOpen]);

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 확인 버튼 클릭 시 처리
  const handleSubmit = () => {
    if (!password) {
      setError("비밀번호는 필수 입력 사항입니다.");
      return;
    }
    setError("");
    onSubmit(password);
  };

  // 모달 닫기 처리
  const handleClose = () => {
    setError("");
    setPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div>
      <div className={styles.overlay} onClick={handleClose} />

      <div className={styles.passwordModal}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>{title}</p>
            <ModalTopBar onClose={handleClose} />
          </div>

          <div className={styles.passwordBox}>
            <div>
              <p className={styles.textHeader}>비밀번호</p>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // 입력 시 에러 메시지 초기화
                    if (error) setError("");
                  }}
                  className={`input ${error ? styles.inputError : ""}`}
                  autoFocus // 모달 열릴 때 자동 포커스
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? eyeOffIcon : eyeIcon}
                    alt="비밀번호 보기 토글"
                    className={styles.eyeIcon}
                  />
                </button>
              </div>

              {error && <p className={styles.errorText}>{error}</p>}
            </div>

            <div className={styles.actionBox}>
              <SimpleButton
                size="mdChange"
                className={styles.actionBtn}
                onClick={handleSubmit}
              >
                {actionText}
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PasswordModal;
