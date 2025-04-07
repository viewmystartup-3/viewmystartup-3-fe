import React, { useState, useEffect } from "react";
import styles from "../../styles/table.module.scss";
import temporarilyImg from "../../assets/logo.png";
import { Link } from "react-router-dom";

const InvestmentList = ({ startups, totalData, currentPage, itemsPerPage }) => {
  const [loading, setLoading] = useState(true);

  // 데이터가 변경되었을 때 다시 로딩 상태를 관리
  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  // 전체 데이터에서 'investmentAmount'가 있는 항목만 필터링
  const filteredStartups = totalData.filter(
    (investment) =>
      investment.investmentAmount != null && investment.investmentAmount > 0
  );

  // 투자 금액에 따라 전체 데이터를 정렬
  const sortedStartups = filteredStartups.sort(
    (a, b) => b.investmentAmount - a.investmentAmount
  );

  // 페이지 내의 데이터를 가져오는 함수
  const getPageRankings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedStartups.slice(startIndex, endIndex);
  };

  const currentPageStartups = getPageRankings();

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.name}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.info}>카테고리</p>
        <p className={styles.investmentAndSelection}>
          View My Startup 투자 금액
        </p>
        <p className={styles.investmentAndSelection}>실제 누적 투자 금액</p>
      </div>

      {/* 투자 목록 렌더링 */}
      <div className={styles.tableContents}>
        {loading ? (
          <p className={styles.dataMessage}>로딩중...</p>
        ) : currentPageStartups.length > 0 ? (
          currentPageStartups.map((investment, index) => (
            <div className={styles.tableContent} key={investment.id}>
              <p className={styles.ranking}>
                {(currentPage - 1) * itemsPerPage + index + 1}위
              </p>
              <Link
                to={`/companies/${investment.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={investment.imageUrl || temporarilyImg}
                  alt={investment.name}
                  className={styles.image}
                />
                <p className={styles.name}>{investment.name}</p>
              </Link>
              <p className={styles.description}>{investment.description}</p>
              <p className={styles.info}>{investment.category}</p>
              <p className={styles.investmentAndSelection}>
                {investment.investmentAmount}억 원
              </p>
              <p className={styles.investmentAndSelection}>
                {investment.totalInvestment}억 원
              </p>
            </div>
          ))
        ) : (
          <p className={styles.dataMessage}>아직 투자 현황이 없어요.</p>
        )}
      </div>
    </div>
  );
};

export default InvestmentList;
