import React, { useState, useEffect } from "react";
import styles from "./InvestmentStatus.module.scss";
import axios from "axios";
import { dataUrl } from "../../env";
import { useParams } from "react-router-dom";
import { RoundButton } from "../buttons/Buttons";
import Pagination from "../pagination/pagination";

const InvestmentStatus = () => {
  const { id } = useParams();
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 투자 데이터 가져오기
  const fetchInvestment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${dataUrl}/api/companies/${id}/investments`,
        {
          params: {
            page: currentPage,
            limit: 2,
          },
        }
      );

      const sortedInvestments = response.data.sort(
        (a, b) => b.amount - a.amount
      );

      // 전체 투자자 수가 아니라, 페이지별로 가져오는 데이터 개수에 맞게 처리
      const totalInvestors = response.data.length;
      setTotalPages(Math.ceil(totalInvestors / 2)); // 페이지 계산

      // 페이지에 해당하는 데이터만 setInvestment
      const startIndex = (currentPage - 1) * 2;
      const endIndex = startIndex + 2;
      setInvestment(sortedInvestments.slice(startIndex, endIndex));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const investmentAmount = investment.reduce((acc, inv) => acc + inv.amount, 0);

  // 컴포넌트가 마운트될 때 데이터 불러오기
  useEffect(() => {
    fetchInvestment();
  }, [currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p className={styles.title}>View My StartUP에서 받은 투자</p>
        <RoundButton>기업투자하기</RoundButton>
      </div>
      <div>
        <p className={styles.title}>총 {investmentAmount.toString()}억 원</p>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <p className={styles.into}>투자자 이름</p>
            <p className={styles.into}>순위</p>
            <p className={styles.into}>투자 금액</p>
            <p className={styles.comment}>투자 코멘트</p>
          </div>
          {loading ? (
            <p>로딩 중...</p>
          ) : investment.length > 0 ? (
            investment.map((inv, index) => (
              <div className={styles.container} key={inv.id}>
                <p className={styles.into}>{inv.name}</p>
                <p className={styles.into}>{index + 1}위</p>
                <p className={styles.into}>{inv.amount}억 원</p>
                <p className={styles.commentTo}>
                  {inv.comment || "코멘트 없음"}
                </p>
              </div>
            ))
          ) : (
            <p>투자자가 없습니다.</p>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InvestmentStatus;
