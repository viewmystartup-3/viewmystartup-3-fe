import React, { useState, useEffect } from "react";
import styles from "./InvestModal.module.scss";
import eyeIcon from "../../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../../assets/btn_visibility_off.png";
import ModalTopBar from "../topBar/ModalTopBar";
import { useParams } from "react-router-dom";
import { RoundOutlineButton, SimpleButton } from "../../buttons/Buttons";
import { getCompanyById } from "../../../api/company.api";
import { createInvestment } from "../../../api/investment.api";

const InvestModal = ({ isOpen, onClose, onInvestSuccess, targetCompany }) => {
  const { id: urlId } = useParams();
  const [company, setCompany] = useState(null); // 기업 정보
  const [name, setName] = useState(""); // 투자자 이름
  const [amount, setAmount] = useState(""); // 투자 금액
  const [comment, setComment] = useState(""); // 투자 코멘트
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (targetCompany) {
      setCompany(targetCompany);
    } else if (urlId) {
      const fetchCompany = async () => {
        try {
          const data = await getCompanyById(urlId);
          setCompany(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchCompany();
    }
  }, [targetCompany, urlId]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // 비밀번호 표시 상태 토글
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState); // 비밀번호 확인 표시 상태 토글
  };

  const handleInvest = async () => {
    let isValid = true;

    // 비밀번호와 비밀번호 확인이 비어있을 경우
    if (!password) {
      setPasswordError("비밀번호는 필수 입력 사항입니다.");
      isValid = false;
    } else {
      setPasswordError(""); // 비밀번호 오류 메시지 초기화
    }

    if (!confirmPassword) {
      setConfirmPasswordError("비밀번호 확인은 필수 입력 사항입니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // 비밀번호가 일치하지 않으면
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    if (!isValid) {
      return; // 유효하지 않으면 투자 진행을 안함
    }

    try {
      const newInvestment = await createInvestment(company.id, {
        investorName: name,
        investedAmount: parseFloat(amount), // 금액을 float으로 변환
        comment,
        accessCode: password,
      });

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

  // 비밀번호 입력 시 오류 메시지 초기화
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(""); // 비밀번호가 입력되면 오류 메시지 제거
    }
  };

  // 비밀번호 확인 입력 시 오류 메시지 초기화
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) {
      setConfirmPasswordError("");
    }
  };

  // 모달이 닫힐 때 입력 필드를 초기화
  const handleClose = () => {
    setName("");
    setAmount("");
    setComment("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError(""); // 비밀번호 오류 초기화
    setConfirmPasswordError("");
    onClose();
  };

  if (!isOpen || !company) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

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
                <p className={styles.name}>{company.companyName}</p>

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
                onChange={handlePasswordChange} // 상태 업데이트 및 오류 메시지 초기화
                className={`${styles.input} ${
                  passwordError ? styles.error : ""
                }`}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon} // 눈 아이콘 변경
                  alt="Toggle Password Visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {/* 비밀번호 오류 메시지 표시 */}
            {passwordError && (
              <p className={styles.errorMessage}>{passwordError}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호 확인</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`${styles.input} ${
                  confirmPasswordError ? styles.error : ""
                }`}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src={showConfirmPassword ? eyeOffIcon : eyeIcon}
                  alt="Toggle Confirm Password Visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {/* 비밀번호 확인 오류 메시지 표시 */}
            {confirmPasswordError && (
              <p className={styles.errorMessage}>{confirmPasswordError}</p>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <RoundOutlineButton
              className={styles.cancelButton}
              onCancel={handleClose}
            >
              취소
            </RoundOutlineButton>
            <SimpleButton
              size="mdChange"
              className={styles.investButton}
              onClick={handleInvest}
            >
              투자하기
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestModal;
