import React, { useState } from "react";
import styles from "./InvestActions.module.scss";
import listImg from "../../assets/ic_kebab.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataUrl } from "../../env";
import ModalTopBar from "../modals/topBar/ModalTopBar";
import eyeIcon from "../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../assets/btn_visibility_off.png";

const InvestorActions = ({ investor, onEdit, onDelete }) => {
  const { id } = useParams();
  const [showOptions, setShowOptions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModal(true);
    setShowOptions(false);
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
        onDelete(investor.id)
      }
    } catch (e) {
      console.error(e);
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        setErrorModal(true);
        setDeleteModal(false);  
      }
    }
  };
  

  return (
    <div className={styles.body}>
      <button
        className={styles.optionsButton}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <img src={listImg} alt="옵션" />
      </button>

      {showOptions && (
        <div className={styles.optionsList}>
          <button className={styles.list} onClick={() => onEdit(investor)}>
            수정하기
          </button>
          <button className={styles.list} onClick={handleDeleteClick}>
            삭제하기
          </button>
        </div>
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
                        alt="Toggle Password Visibility"
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
                  setErrorModal(false); setPassword("");
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
