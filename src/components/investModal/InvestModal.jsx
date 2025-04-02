import React, { useState, useEffect } from "react";

import styles from "./InvestModal.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataUrl } from "../../env";
import eyeIcon from "../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../assets/btn_visibility_off.png";
import ModalTopBar from "../modals/topBar/ModalTopBar";

const InvestModal = ({ isOpen, onClose, onInvestSuccess }) => {
  const [company, setCompany] = useState(null); // 기업 정보
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [name, setName] = useState(""); // 투자자 이름
  const [amount, setAmount] = useState(""); // 투자 금액
  const [comment, setComment] = useState(""); // 투자 코멘트
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 보이기/숨기기
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const { id } = useParams(); // URL에서 ID 가져오기

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`${dataUrl}/api/companies/${id}`);
      setCompany(response.data); // 기업 정보 설정
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching company with ID:", id);
      fetchCompanyDetails(); // 기업 정보 가져오기
    }
  }, [id]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // 비밀번호 표시 상태 토글
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState); // 비밀번호 확인 표시 상태 토글
  };

  const handleInvest = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${dataUrl}/api/companies/${id}/investments`,
        {
          name,
          amount: parseFloat(amount), // 금액을 float으로 변환
          comment,
          password,
        }
      );

      console.log("Investment successful:", response.data);

      // 투자 후 상태 초기화
      setName("");
      setAmount("");
      setComment("");
      setPassword("");
      setConfirmPassword("");

      onInvestSuccess();
    } catch (error) {
      console.error("Error making investment:", error);
    }
  };

  // 모달이 닫힐 때 입력 필드를 초기화
  const handleClose = () => {
    setName("");
    setAmount("");
    setComment("");
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <ModalTopBar onClose={handleClose}>기업에 투자하기</ModalTopBar>
        <div className={styles.form}>
          <p className={styles.companyInfo}>투자 기업 정보</p>
          {company && (
            <div className={styles.company}>
              <img
                src={company.imageUrl}
                alt={company.name}
                className={styles.image}
              />
              <div className={styles.companyDetail}>
                <p className={styles.name}>{company.name}</p>

                <p className={styles.category}>{company.category}</p>
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>투자자 이름</label>
            <input
              type="text"
              placeholder="투자자 이름을 입력해 주세요"
              value={name}
              onChange={(e) => setName(e.target.value)} // 상태 업데이트
              className={styles.input}
            />
          </div>

          {/* 투자 금액 */}
          <div className={styles.formGroup}>
            <label>투자 금액</label>
            <input
              type="number"
              placeholder="투자 금액을 입력해 주세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} // 상태 업데이트
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>투자 코멘트</label>
            <textarea
              placeholder="투자에 대한 코멘트를 입력해 주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)} // 상태 업데이트
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon} // 아이콘 변경
                  alt="Toggle Password Visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호 확인</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"} // 비밀번호 확인도 보이기/숨기기
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // 상태 업데이트
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src={showConfirmPassword ? eyeOffIcon : eyeIcon} // 아이콘 변경
                  alt="Toggle Confirm Password Visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={handleClose}>
              취소
            </button>
            <button className={styles.investButton} onClick={handleInvest}>
              투자하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestModal;
