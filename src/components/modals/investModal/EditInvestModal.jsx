import React, { useState, useEffect } from "react";
import styles from "./InvestModal.module.scss";
import { useParams } from "react-router-dom";
import eyeIcon from "../../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../../assets/btn_visibility_off.png";
import ModalTopBar from "../topBar/ModalTopBar";
import { RoundOutlineButton, SimpleButton } from "../../buttons/Buttons";
import { getCompanyById } from "../../../api/company.api";
import { updateInvestment } from "../../../api/investment.api";

const EditInvestModal = ({
  isOpen,
  onClose,
  selectedInvestor,
  onEditSuccess,
}) => {
  const [company, setCompany] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 확인 오류 메시지

  const { id } = useParams();

  // 기업 정보 가져오기
  const fetchCompanyDetails = async () => {
    try {
      const data = await getCompanyById(id);
      setCompany(data); // 기업 정보 설정
    } catch (e) {
      console.error(e);
    }
  };

  // 투자자 정보 수정하기
  useEffect(() => {
    if (selectedInvestor) {
      setName(selectedInvestor.investorName);
      setAmount(selectedInvestor.investedAmount);
      setComment(selectedInvestor.comment);
      setPassword("");
    }
    fetchCompanyDetails(); // 기업 정보 가져오기
  }, [selectedInvestor, id]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleEditInvest = async () => {
    let isValid = true;

    // 새로운 비밀번호가 입력되지 않았을 때 기존 비밀번호 사용하지 않고, 비밀번호 필드를 생략
    const finalPassword = password || null;

    // 비밀번호를 변경하려는 경우, 확인 과정
    if (password && !confirmPassword) {
      setConfirmPasswordError("비밀번호 확인은 필수 입력 사항입니다.");
      isValid = false;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError(""); // 오류 메시지 초기화
    }

    if (!isValid) {
      return;
    }

    // 서버로 보낼 데이터 객체 생성
    const requestData = {
      investorName: name,
      investedAmount: parseFloat(amount),
      comment,
    };

    // 만약 새로운 비밀번호가 있다면 추가한다.
    if (finalPassword) {
      requestData.accessCode = finalPassword;
    }

    try {
      const updatedData = {
        investorName: name, //투자자 이름 수정
        investedAmount: parseFloat(amount), // 금액 수정
        comment, // 코멘트 수정
        accessCode: password, // 비밀번호 수정
      };

      // PATCH 요청을 통해 투자 수정
      const updated = await updateInvestment(selectedInvestor.id, updatedData);

      // 수정 후 onEditSuccess 호출하여 상태 갱신
      onEditSuccess(updated);

      // 상태 초기화
      setName("");
      setAmount("");
      setComment("");
      setPassword("");
      setConfirmPassword("");

      onClose();
    } catch (error) {
      alert("투자 정보 수정에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setName("");
    setAmount("");
    setComment("");
    setPassword(""); // 비밀번호 초기화
    setConfirmPassword(""); // 비밀번호 확인 초기화
    setPasswordError(""); // 비밀번호 오류 초기화
    setConfirmPasswordError(""); // 비밀번호 확인 오류 초기화
    onClose();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(""); // 비밀번호 입력 시 오류 메시지 제거
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) {
      setConfirmPasswordError("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <ModalTopBar onClose={handleClose}>투자 정보 수정</ModalTopBar>
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
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>투자 금액</label>
            <input
              type="number"
              placeholder="투자 금액을 입력해 주세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>투자 코멘트</label>
            <textarea
              placeholder="투자에 대한 코멘트를 입력해 주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea}
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className={styles.formGroup}>
            <label>비밀번호</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="새로운 비밀번호를 입력해 주세요"
                value={password}
                onChange={handlePasswordChange} // 비밀번호 입력 시 오류 메시지 초기화
                className={`${styles.input} ${
                  passwordError ? styles.error : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.eyeButton}
              >
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  alt="Toggle Password Visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {passwordError && (
              <p className={styles.errorMessage}>{passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 입력*/}
          <div className={styles.formGroup}>
            <label>비밀번호 확인</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="새로운 비밀번호를 다시 한 번 입력해 주세요"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // 비밀번호 확인 입력 시 오류 메시지 초기화
                className={`${styles.input} ${
                  confirmPasswordError ? styles.error : ""
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={styles.eyeButton}
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
              onClick={handleEditInvest}
            >
              수정하기
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvestModal;
