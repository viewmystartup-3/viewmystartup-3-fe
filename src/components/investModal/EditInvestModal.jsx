import React, { useState, useEffect } from "react";
import styles from "./InvestModal.module.scss"; // 기존 스타일 사용
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataUrl } from "../../env";
import eyeIcon from "../../assets/btn_visibility_on.png";
import eyeOffIcon from "../../assets/btn_visibility_off.png";
import ModalTopBar from "../modals/topBar/ModalTopBar";

const EditInvestModal = ({
  isOpen,
  onClose,
  selectedInvestor,
  onEditSuccess,
}) => {
  const [company, setCompany] = useState(null); // 기업 정보
  const [name, setName] = useState(""); // 투자자 이름
  const [amount, setAmount] = useState(""); // 투자 금액
  const [comment, setComment] = useState(""); // 투자 코멘트
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 보이기/숨기기
  const [password, setPassword] = useState(""); // 비밀번호 상태 (입력 필드로만 사용)
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태

  const { id } = useParams(); // URL에서 ID 가져오기

  // 기업 정보 가져오기
  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`${dataUrl}/api/companies/${id}`);
      setCompany(response.data); // 기업 정보 설정
    } catch (e) {
      console.error(e);
    }
  };

  // 투자자 정보 수정하기
  useEffect(() => {
    if (selectedInvestor) {
      setName(selectedInvestor.name);
      setAmount(selectedInvestor.amount);
      setComment(selectedInvestor.comment);
      setPassword(""); // 비밀번호는 입력란을 비워두고 사용자가 새로 입력하도록
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
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // PATCH 요청을 통해 투자 수정
      const response = await axios.patch(
        `${dataUrl}/api/companies/${id}/investments/${selectedInvestor.id}`,
        {
          amount: parseFloat(amount), // 금액 수정
          comment: comment, // 코멘트 수정
          password: password, // 비밀번호 (새로 입력한 비밀번호만 보내기)
        }
      );

      console.log("Investment updated successfully:", response.data);

      // 수정 후 onEditSuccess 호출하여 상태 갱신
      onEditSuccess(response.data); // 서버에서 반환된 수정된 데이터를 전달

      // 상태 초기화
      setName("");
      setAmount("");
      setComment("");
      setPassword(""); // 비밀번호 필드 초기화
      setConfirmPassword(""); // 비밀번호 확인 초기화

      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Error updating investment:", error);
      alert("투자 정보 수정에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setName("");
    setAmount("");
    setComment("");
    setPassword(""); // 비밀번호 초기화
    setConfirmPassword(""); // 비밀번호 확인 초기화
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <ModalTopBar onClose={handleClose}>투자 정보 수정</ModalTopBar>
        <div className={styles.form}>
          {/* 투자 기업 정보 섹션 추가 */}
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
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
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
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className={styles.formGroup}>
            <label>비밀번호 확인</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
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
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={handleClose}>
              취소
            </button>
            <button className={styles.investButton} onClick={handleEditInvest}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvestModal;
