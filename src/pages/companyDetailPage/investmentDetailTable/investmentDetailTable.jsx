import React, { useState, useEffect } from "react";
import styles from "./investmentDetailTable.module.scss";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/UI modules/pagination/pagination";
import InvestorActions from "./tableModule/tableModule";
import InvestModal from "../../../components/modals/investModal/InvestModal";
import SuccessModal from "../../../components/modals/investModal/SuccessModal";
import EditInvestModal from "../../../components/modals/investModal/EditInvestModal";
import table from "../../../styles/table.module.scss";
import { SimpleButton } from "../../../components/buttons/Buttons";
import { getInvestmentByCompanyId } from "../../../api/investment.api";

const InvestmentStatus = () => {
  const { id } = useParams();
  const [allInvestments, setAllInvestments] = useState([]);
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeInvestorId, setActiveInvestorId] = useState(null);
  const itemsPerPage = 5;

  const fetchInvestment = async () => {
    setLoading(true);
    try {
      const data = await getInvestmentByCompanyId(id);
      const sortedInvestments = data.sort((a, b) => b.amount - a.amount);
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
        <SimpleButton
          size="xlg"
          className={styles.investBtn}
          onClick={openModal}
        >
          기업투자하기
        </SimpleButton>
      </div>
      <div>
        <div className={table.table}>
          {investment.length > 0 ? (
            <>
              <span className={styles.totalMoney}>
                총
                {allInvestments.reduce(
                  (acc, inv) => acc + inv.investedAmount,
                  0
                )}
                억 원
              </span>
              <div className={table.listHeader}>
                <span className={table.listtitle}>투자자 이름</span>
                <span className={table.listtitle}>순위</span>
                <span className={table.listtitle}>투자 금액</span>
                <span className={table.comment}>투자 코멘트</span>
                <span className={table.column}></span>
              </div>

              <div className={table.tableContents}>
                {investment.map((inv, index) => (
                  <div className={table.listContent} key={inv.id}>
                    <span className={table.listtitle}>{inv.investorName}</span>
                    <span className={table.listtitle}>
                      {index + 1 + (currentPage - 1) * itemsPerPage}위
                    </span>
                    <span className={table.listtitle}>
                      {inv.investedAmount}억 원
                    </span>
                    <div className={table.commentTo}>
                      {inv.comment || "코멘트 없음"}
                    </div>
                    <InvestorActions
                      investor={inv}
                      onEdit={handleEditInvest}
                      onDelete={handleDeleteInvest}
                      activeInvestorId={activeInvestorId}
                      onToggleOptions={handleToggleOptions}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span>아직 투자한 기업이 없어요.</span>
              <span>버튼을 눌러 기업에 투자해보세요!</span>
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

      {editModal && selectedInvestor && (
        <EditInvestModal
          isOpen={true}
          selectedInvestor={selectedInvestor}
          onClose={() => setEditModal(false)}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default InvestmentStatus;
