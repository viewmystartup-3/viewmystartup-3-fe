import React, { useState, useRef } from "react";
import styles from "./InvestActions.module.scss";
import listImg from "../../../assets/ic_kebab.png";
import { useParams } from "react-router-dom";
import ModalTopBar from "../../modals/topBar/ModalTopBar";
import eyeIcon from "../../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../../assets/btn_visibility_off.png";
import { createPortal } from "react-dom";
import {
  checkInvestmentPassword,
  deleteInvestment,
} from "../../../api/investment.api";
import { SimpleButton } from "../../buttons/Buttons";

const InvestorActions = ({
  investor,
  onEdit,
  onDelete,
  activeInvestorId,
  onToggleOptions,
}) => {
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordError, setEditPasswordError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorType, setErrorType] = useState("");

  const isActive = activeInvestorId === investor.id;
  const buttonRef = useRef(null);

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDelete = async () => {
    if (!password) {
      setPasswordError("비밀번호는 필수 입력 사항입니다.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await deleteInvestment(investor.id, password);
      if (response.status === 200) {
        setDeleteModal(false);
        setPassword("");
        onDelete(investor.id);
      }
    } catch (e) {
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
    if (!editPassword) {
      setEditPasswordError("비밀번호는 필수 입력 사항입니다.");
      return;
    } else {
      setEditPasswordError("");
    }

    try {
      const response = await checkInvestmentPassword(
        investor.id,
        editPassword
      );
      if (response.status === 200) {
        setEditModal(false);
        setEditPassword("");
        onEdit(investor);
      }
    } catch (e) {
      if (
        e.response &&
        (e.response.status === 401 || e.response.status === 403)
      ) {
        setEditPassword("");
        setErrorType("edit");
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
                      setPasswordError("");
                    }}
                  />
                </div>
                <div className={styles.passwordBox}>
                  <div>
                    <p className={styles.textHeader}>비밀번호</p>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해 주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${styles.input} ${
                          passwordError ? styles.inputError : ""
                        }`}
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
                    {passwordError && (
                      <p className={styles.errorText}>{passwordError}</p>
                    )}
                  </div>
                  <div className={styles.deleteBox}>
                    <SimpleButton
                      size="mdChange"
                      className={styles.deleteBtn}
                      onClick={handleDelete}
                    >
                      삭제하기
                    </SimpleButton>
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
                      setEditPasswordError("");
                    }}
                  />
                </div>
                <div className={styles.passwordBox}>
                  <div>
                    <p className={styles.textHeader}>비밀번호</p>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력해 주세요"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className={`${styles.input} ${
                          editPasswordError ? styles.inputError : ""
                        }`}
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
                    {editPasswordError && (
                      <p className={styles.errorText}>{editPasswordError}</p>
                    )}
                  </div>
                  <div className={styles.editBox}>
                    <SimpleButton
                      size="mdChange"
                      className={styles.editBtn}
                      onClick={handleEdit}
                    >
                      수정하기
                    </SimpleButton>
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
                      setEditPassword("");
                    }}
                  />
                  <p>
                    {errorType === "delete"
                      ? "잘못된 비밀번호로 삭제에 실패하셨습니다."
                      : "잘못된 비밀번호로 수정에 실패하셨습니다."}
                  </p>
                </div>
                <SimpleButton
                  size="mdChange"
                  className={styles.okBtn}
                  onClick={() => {
                    setErrorModal(false);
                    setPassword("");
                    setEditPassword("");
                  }}
                >
                  확인
                </SimpleButton>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default InvestorActions;
