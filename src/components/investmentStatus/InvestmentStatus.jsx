import React, { useState, useEffect } from "react";
import styles from "./InvestmentStatus.module.scss";
import axios from "axios";
import { dataUrl } from "../../env";
import { useParams } from "react-router-dom";
import Pagination from "../pagination/pagination";
import InvestorActions from "../investActions/InvestActions";
import InvestModal from "../investModal/InvestModal";
import SuccessModal from "../investModal/SuccessModal";
import EditInvestModal from "../investModal/EditInvestModal";

const InvestmentStatus = () => {
  const { id } = useParams();
  const [allInvestments, setAllInvestments] = useState([]);
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeInvestorId, setActiveInvestorId] = useState(null);
  const itemsPerPage = 5;

  const fetchInvestment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${dataUrl}/api/companies/${id}/investments`
      );
      const sortedInvestments = response.data.sort(
        (a, b) => b.amount - a.amount
      );
      setAllInvestments(sortedInvestments);
      setTotalPages(Math.ceil(sortedInvestments.length / itemsPerPage));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteInvest = async (investorId) => {
    try {
      fetchInvestment();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setInvestment(allInvestments.slice(startIndex, endIndex));
  }, [currentPage, allInvestments]);

  useEffect(() => {
    fetchInvestment();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); // InvestModal 닫기
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  // 투자자 수정 함수 (InvestorActions에서 호출됨)
  const handleEditInvest = (investor) => {
    setSelectedInvestor(investor);
    setEditModal(true);
  };

  const handleInvestSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    fetchInvestment();
  };

  // 투자자 수정 성공 시 호출되는 함수
  const handleEditSuccess = (updatedInvestor) => {
    setAllInvestments((prevInvestments) =>
      prevInvestments.map((investor) =>
        investor.id === updatedInvestor.id ? updatedInvestor : investor
      )
    );
    setEditModal(false); // 수정 모달 닫기
  };

  const handleToggleOptions = (investorId) => {
    setActiveInvestorId((prev) => (prev === investorId ? null : investorId));
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>View My StartUP에서 받은 투자</p>
        <button className={styles.investBtn} onClick={openModal}>
          {" "}
          기업투자하기
        </button>
      </div>
      <div>
        <div className={styles.listContainer}>
          {loading ? (
            <p>로딩 중...</p>
          ) : investment.length > 0 ? (
            <>
              <p className={styles.title}>
                총 {allInvestments.reduce((acc, inv) => acc + inv.amount, 0)}억
                원
              </p>
              <div className={styles.listHeader}>
                <p className={styles.into}>투자자 이름</p>
                <p className={styles.into}>순위</p>
                <p className={styles.into}>투자 금액</p>
                <p className={styles.comment}>투자 코멘트</p>
              </div>
              {investment.map((inv, index) => (
                <div className={styles.container} key={inv.id}>
                  <p className={styles.into}>{inv.name}</p>
                  <p className={styles.into}>
                    {index + 1 + (currentPage - 1) * itemsPerPage}위
                  </p>
                  <p className={styles.into}>{inv.amount}억 원</p>
                  <p className={styles.commentTo}>
                    {inv.comment || "코멘트 없음"}
                  </p>
                  <InvestorActions
                    className={styles.into}
                    investor={inv}
                    onEdit={handleEditInvest}
                    onDelete={handleDeleteInvest}
                    activeInvestorId={activeInvestorId}
                    onToggleOptions={handleToggleOptions}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>아직 투자한 기업이 없어요.</p>
              <p>버튼을 눌러 기업에 투자해보세요!</p>
            </div>
          )}
        </div>
      </div>
      {investment.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <InvestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInvestSuccess={handleInvestSuccess}
      />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />

      {editModal &&
        selectedInvestor && ( // selectedInvestor가 있어야 모달이 열림
          <EditInvestModal
            isOpen={true}
            selectedInvestor={selectedInvestor} // 수정된 selectedInvestor 전달
            onClose={() => setEditModal(false)}
          />
        )}
    </div>
  );
};

export default InvestmentStatus;
