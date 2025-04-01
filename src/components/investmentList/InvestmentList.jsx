import React, { useState, useEffect } from "react";
import styles from "./Investment.module.scss";
import { Link } from "react-router-dom";

const InvestmentList = ({ startups }) => {
  const [loading, setLoading] = useState(true);

  // 데이터가 변경되었을 때 다시 로딩 상태를 관리
  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  return (
    <div className={styles.form}>
      <div className={styles.listHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.headerName}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.category}>카테고리</p>
        <p className={styles.info}>View My Startup 투자 금액</p>
        <p className={styles.info}>실제 누적 투자 금액</p>
      </div>

      {/* 투자 목록 렌더링 */}
      <div className={styles.listContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : startups.length > 0 ? (
          startups.map((investment, index) => (
            <div className={styles.listContent} key={investment.id}>
              <p className={styles.ranking}>{index + 1}위</p>
              <Link
                to={`/companies/${investment.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={investment.imageUrl || "/images/logo.png"}
                  alt={investment.name}
                  className={styles.startupImage}
                />
                <p className={styles.name}>{investment.name}</p>
              </Link>
              <p className={styles.description}>{investment.description}</p>
              <p className={styles.category}>{investment.category}</p>
              <p className={styles.info}>{investment.investmentAmount}억 원</p>
              <p className={styles.info}>{investment.totalInvestment}억 원</p>
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p> // 데이터가 없을 때 메시지
        )}
      </div>
    </div>
  );
};

export default InvestmentList;
