import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestmentByCompanyId } from "../../api/investment.api";
import table from "../../styles/table.module.scss";
import { SimpleButton } from "../buttons/Buttons";
import InvestorActions from "../investActions/InvestActions";
import EditInvestModal from "../investModal/EditInvestModal";
import InvestModal from "../investModal/InvestModal";
import SuccessModal from "../investModal/SuccessModal";
import Pagination from "../pagination/pagination";
import styles from "./InvestmentStatus.module.scss";

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
      prevInvestments.map(
        (investor) =>
          investor.id === updatedInvestor.id ? updatedInvestor : investor // TODO: Optimistic Update(낙관적 업데이트)를 구현하려고 한 거라면 좋지만, 그렇지 않다면 그냥 서버에서 새로운 데이터 받아오기
      )
    );
    setEditModal(false); // 수정 모달 닫기
  };

  const handleToggleOptions = (investorId) => {
    setActiveInvestorId((prev) => (prev === investorId ? null : investorId));
  };

  // TODO: 모달을 전역적으로 관리하고 사용하는 방법을 배워 보자

  // TODO: 인라인으로 길게 작성하지 말고 밖으로 빼자
  const totalAmount = allInvestments.reduce((acc, inv) => acc + inv.amount, 0);

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
              <p className={styles.totalMoney}>총 {totalAmount}억 원</p>
              <div className={table.listHeader}>
                <p className={table.listtitle}>투자자 이름</p>
                <p className={table.listtitle}>순위</p>
                <p className={table.listtitle}>투자 금액</p>
                <p className={table.comment}>투자 코멘트</p>
                <p className={table.column}></p>
              </div>

              <div className={table.tableContents}>
                {investment.map((inv, index) => (
                  <div className={table.listContent} key={inv.id}>
                    <p className={table.listtitle}>{inv.name}</p>
                    <p className={table.listtitle}>
                      {index + 1 + (currentPage - 1) * itemsPerPage}위
                    </p>
                    <p className={table.listtitle}>{inv.amount}억 원</p>
                    <p className={table.commentTo}>
                      {inv.comment || "코멘트 없음"}
                    </p>
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
