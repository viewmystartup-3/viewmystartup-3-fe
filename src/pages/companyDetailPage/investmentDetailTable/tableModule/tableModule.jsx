import React, { useState, useRef, useEffect } from "react";
import styles from "./tableModule.module.scss";
import listImg from "../../../../assets/ic_kebab.png";
import { createPortal } from "react-dom";
import {
  checkInvestmentPassword,
  deleteInvestment,
} from "../../../../api/investment.api";
import PasswordModal from "./passwordModal";
import ErrorModal from "./errorModal";

const tableModule = ({
  investor,
  onEdit,
  onDelete,
  activeInvestorId,
  onToggleOptions,
}) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const isActive = activeInvestorId === investor.id;

  const handlePasswordSubmit = async (password) => {
    try {
      // 삭제 모달
      if (modalType === "delete") {
        const response = await deleteInvestment(investor.id, password);
        if (response.status === 200) {
          setModalType(null);
          onDelete(investor.id);
        }
        // 수정 모달
      } else if (modalType === "edit") {
        const response = await checkInvestmentPassword(investor.id, password);
        if (response.status === 200) {
          setModalType(null);
          onEdit(investor);
        }
      }
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 401 || e.response.status === 403)
      ) {
        const action = modalType === "delete" ? "삭제" : "수정";
        setErrorMessage(`잘못된 비밀번호로 ${action}에 실패하셨습니다.`);
        setModalType("error");
      } else {
        setModalType("error");
      }
    }
  };

  // 열려 있는 모든 모달을 닫는 함수
  const closeModal = () => {
    setModalType(null);
    setErrorMessage(""); // 모달 닫을 때 에러 메시지도 초기화
  };

  //옵션이 빈 공간이 클릭되면 옵션이 닫히게
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onToggleOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onToggleOptions]);

  const buttonRect = buttonRef.current?.getBoundingClientRect();

  return (
    <div className="body">
      <button
        ref={buttonRef}
        className={styles.optionsButton}
        onClick={() => onToggleOptions(investor.id)}
      >
        <img src={listImg} alt="옵션" />
      </button>

      {/*수정/삭제 버튼*/}
      {isActive &&
        createPortal(
          <div
            ref={dropdownRef}
            className={styles.optionsList}
            style={{
              position: "absolute",
              top: buttonRect
                ? `${buttonRect.bottom + window.scrollY}px`
                : "0px",
              left: buttonRect ? `${buttonRect.left}px` : "0px",
              zIndex: 3,
            }}
          >
            <button
              className={styles.list}
              onClick={() => setModalType("edit")}
            >
              수정하기
            </button>

            <button
              className={styles.list}
              onClick={() => setModalType("delete")}
            >
              삭제하기
            </button>
          </div>,
          document.body
        )}

      {/* 비밀번호 확인 모달 */}
      <PasswordModal
        isOpen={modalType === "edit" || modalType === "delete"}
        onClose={closeModal}
        onSubmit={handlePasswordSubmit}
        title={modalType === "edit" ? "수정 권한 인증" : "삭제 권한 인증"}
        actionText={modalType === "edit" ? "수정하기" : "삭제하기"}
      />

      {/* 에러 메시지 표시 모달 */}
      <ErrorModal
        isOpen={modalType === "error"}
        onClose={closeModal}
        message={errorMessage}
      />
    </div>
  );
};

export default tableModule;
