import React, { useState } from "react";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";
import InvestModal from "../../components/investModal/InvestModal"; // InvestModal 임포트
import SuccessModal from "../../components/investModal/SuccessModal"; // SuccessModal 임포트

const CompanyDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // InvestModal 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 투자 완료 모달 상태

  // 모달 열기
  const openModal = () => setIsModalOpen(true); // InvestModal 열기
  const closeModal = () => setIsModalOpen(false); // InvestModal 닫기
  const closeSuccessModal = () => setIsSuccessModalOpen(false); // 투자 완료 모달 닫기

  // 투자 완료 후 모달 열기
  const handleInvestSuccess = () => {
    setIsModalOpen(false); // InvestModal 닫기
    setIsSuccessModalOpen(true); // 투자 완료 모달 열기

    // 투자 완료 모달 자동 닫기 (옵션)
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 3000); // 3초 후 모달 자동 닫기
  };

  return (
    <div>
      <CompanyDetails />

      <button onClick={openModal} style={buttonStyles}>
        나의 기업에 투자하기
      </button>

      {/* InvestModal 컴포넌트 */}
      <InvestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInvestSuccess={handleInvestSuccess}
      />

      {/* 투자 완료 모달 */}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
};

// 버튼 스타일을 inline 스타일로 지정 (선택 사항)
const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#f05a28",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default CompanyDetailPage;
