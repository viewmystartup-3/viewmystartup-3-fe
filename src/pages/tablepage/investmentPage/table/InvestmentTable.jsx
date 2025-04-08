import React, { useState, useEffect } from "react";
import styles from "../../../../styles/table.module.scss";
import temporarilyImg from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

const InvestmentTable = ({ startups, currentPage, itemsPerPage }) => {
  const [loading, setLoading] = useState(true);

  // 데이터가 변경되었을 때 다시 로딩 상태를 관리
  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  // 페이지 내의 데이터를 가져오는 함수
  const getPageRankings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return startups.slice(startIndex, endIndex);
  };

  const currentPageStartups = getPageRankings();

  // 순위 계산
  const getRank = (index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return startIndex + index + 1; // 페이지를 넘어갈 때도 전체 순위를 이어서 계산
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <span className={styles.ranking}>순위</span>
        <span className={styles.name}>기업 명</span>
        <span className={styles.description}>기업 소개</span>
        <span className={styles.info}>카테고리</span>
        <span className={styles.investmentAndSelection}>
          View My Startup 투자 금액
        </span>
        <span className={styles.investmentAndSelection}>
          실제 누적 투자 금액
        </span>
      </div>

      {/* 투자 목록 렌더링 */}
      <div className={styles.tableContents}>
        {loading ? (
          <span className={styles.dataMessage}>로딩중...</span> // 로딩 중일 때 메시지
        ) : currentPageStartups.length > 0 ? (
          currentPageStartups.map((investment, index) => (
            <div className={styles.tableContent} key={investment.id}>
              <span className={styles.ranking}>{getRank(index)}위</span>{" "}
              {/* 순위 계산 */}
              <Link
                to={`/companies/${investment.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={investment.imageUrl || `${temporarilyImg}`}
                  alt={investment.name}
                  className={styles.image}
                />
                <span className={styles.name}>{investment.companyName}</span>
              </Link>
              <span className={styles.description}>
                {investment.description}
              </span>
              <span className={styles.info}>{investment.category}</span>
              <span className={styles.investmentAndSelection}>
                {investment.investmentAmount}억 원
              </span>
              <span className={styles.investmentAndSelection}>
                {investment.realInvestmentAmount}억 원
              </span>
            </div>
          ))
        ) : (
          <span className={styles.dataMessage}>아직 투자 현황이 없어요.</span>
        )}
      </div>
    </div>
  );
};

export default InvestmentTable;
