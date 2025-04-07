import React, { useState, useRef } from "react"; // useRef 추가!
import styles from "./InvestActions.module.scss";
import listImg from "../../assets/ic_kebab.png";
import { useParams } from "react-router-dom";
import ModalTopBar from "../modals/topBar/ModalTopBar";
import eyeIcon from "../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../assets/btn_visibility_off.png";
import { createPortal } from "react-dom";
import { checkInvestmentPassword, deleteInvestment } from "../../api/investment.api";

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
  const [passwordError, setPasswordError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editPassword, setEditPassword] = useState("");

  const isActive = activeInvestorId === investor.id;
  const buttonRef = useRef(null); // 옵션 버튼 참조

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteInvestment(id, investor.id, password);

      if (response.status === 200) {
        console.log("삭제 성공!");
        setDeleteModal(false);
        setPassword("");
        onDelete(investor.id);
      }
      if (!password) {
        setPasswordError("비밀번호는 필수 입력 사항입니다.");
      } else {
        setPasswordError(""); // 비밀번호 오류 메시지 초기화
      }
      setPassword("");
    } catch (e) {
      console.error(e);
      if (
        e.response &&
        (e.response.status === 401 || e.response.status === 403)
      ) {
        setErrorType("delete");
        setErrorModal(true);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit = async () => {
    try {
      console.log(id);
      console.log(investor.id);
      const response = await checkInvestmentPassword(id, investor.id, editPassword)

      if (response.status === 200) {
        setEditModal(false);
        setEditPassword("");
        onEdit(investor);
        console.log("성공~");
      }

      if (!password) {
        setPasswordError("비밀번호는 필수 입력 사항입니다.");
      } else {
        setPasswordError(""); // 비밀번호 오류 메시지 초기화
      }
      setPassword("");
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 401 || e.response.status === 403)
      ) {
        setEditPassword("");
        setErrorModal(true);
        setEditModal(false);
      }
    }
  };

  const buttonRect = buttonRef.current?.getBoundingClientRect();

  return (
    <div className={styles.body}>
      <button
        ref={buttonRef}
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
                : "0px",
              left: buttonRect ? `${buttonRect.left}px` : "0px",
            }}
          >
            <button className={styles.list} onClick={() => setEditModal(true)}>
              수정하기
            </button>
            <button className={styles.list} onClick={handleDeleteClick}>
              삭제하기
            </button>
          </div>,
          document.body
        )}

      {deleteModal &&
        createPortal(
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
          </div>,
          document.body
        )}
      {editModal &&
        createPortal(
          <div>
            <div className={styles.overlay} />
            <div className={styles.editModal}>
              <div className={styles.container}>
                <div className={styles.editHeader}>
                  <p className={styles.ptage}>수정 권한 인증</p>
                  <ModalTopBar
                    onClose={() => {
                      setEditModal(false);
                      setEditPassword("");
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
                        value={editPassword}
                        onChange={(e) => {
                          setEditPassword(e.target.value);
                        }}
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
                  <div className={styles.editBox}>
                    <button className={styles.editBtn} onClick={handleEdit}>
                      수정하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {errorModal &&
        createPortal(
          <div>
            <div className={styles.overlay} />
            <div className={styles.errorModal}>
              <div className={styles.errorHeader}>
                <div className={styles.backHeader}>
                  <ModalTopBar
                    onClose={() => {
                      setErrorModal(false);
                      setPassword("");
                    }}
                  />
                  <p>
                    {errorType === "delete"
                      ? "잘못된 비밀번호로 삭제에 실패하셨습니다."
                      : "잘못된 비밀번호로 수정에 실패하셨습니다."}
                  </p>
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
          </div>,
          document.body
        )}
    </div>
  );
};

export default InvestorActions;
