import React, { useState, useRef } from "react"; // useRef 추가!
import styles from "./InvestActions.module.scss";
import listImg from "../../assets/ic_kebab.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataUrl } from "../../env";
import ModalTopBar from "../modals/topBar/ModalTopBar";
import eyeIcon from "../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../assets/btn_visibility_off.png";
import { createPortal } from "react-dom";

const InvestorActions = ({
  investor,
  onEdit,
  onDelete,
  activeInvestorId,
  onToggleOptions,
}) => {
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const isActive = activeInvestorId === investor.id;
  const buttonRef = useRef(null); // 옵션 버튼 참조

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleDelete = async () => {
    if (!investor || !investor.id) {
      console.error("삭제 실패");
      return;
    }
    try {
      const response = await axios.delete(
        `${dataUrl}/api/companies/${id}/investments/${investor.id}`,
        { data: { password } }
      );

      if (response.status === 200) {
        console.log("삭제 성공!");
        setDeleteModal(false);
        setPassword("");
        onDelete(investor.id);
      }
    } catch (e) {
      console.error(e);
      if (
        e.response &&
        (e.response.status === 401 || e.response.status === 403)
      ) {
        setErrorModal(true);
        setDeleteModal(false);
      }
    }
  };

  // 버튼 위치 가져오기
  const buttonRect = buttonRef.current?.getBoundingClientRect();

  return (
    <div className={styles.body}>
      <button
        ref={buttonRef} // 버튼 위치 참조 추가
        className={styles.optionsButton}
        onClick={() => onToggleOptions(investor.id)}
      >
        <img src={listImg} alt="옵션" />
      </button>

      {isActive &&
        createPortal(
          <div
            className={styles.optionsList}
            style={{
              position: "absolute",
              top: buttonRect
                ? `${buttonRect.bottom + window.scrollY}px`
                : "0px", // 버튼 아래로 위치
              left: buttonRect ? `${buttonRect.left}px` : "0px", // 버튼 왼쪽 정렬
              zIndex: 9999,
            }}
          >
            <button className={styles.list} onClick={() => onEdit(investor)}>
              수정하기
            </button>
            <button className={styles.list} onClick={handleDeleteClick}>
              삭제하기
            </button>
          </div>,
          document.body
        )}

      {deleteModal && (
        <div>
          <div className={styles.overlay} />
          <div className={styles.deleteModal}>
            <div className={styles.container}>
              <div className={styles.deleteHeader}>
                <p className={styles.ptage}>삭제 권한 인증</p>
                <ModalTopBar
                  onClose={() => {
                    setDeleteModal(false);
                    setPassword("");
                  }}
                />
              </div>
              <div className={styles.passwordBox}>
                <div>
                  <p>비밀번호</p>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해 주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={togglePasswordVisibility}
                    >
                      <img
                        src={showPassword ? eyeOffIcon : eyeIcon}
                        alt="비밀번호 보기"
                        className={styles.eyeIcon}
                      />
                    </button>
                  </div>
                </div>
                <div className={styles.deleteBox}>
                  <button className={styles.deleteBtn} onClick={handleDelete}>
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorModal && (
        <div>
          <div className={styles.overlay} />
          <div className={styles.errorModal}>
            <div className={styles.errorBox}>
              <div className={styles.okHeader}>
                <ModalTopBar
                  onClose={() => {
                    setErrorModal(false);
                    setPassword("");
                  }}
                />
                <p>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
              </div>
              <button
                className={styles.okBtn}
                onClick={() => {
                  setErrorModal(false);
                  setPassword("");
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorActions;
