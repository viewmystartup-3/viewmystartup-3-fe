import React, { useState, useEffect } from "react";
import styles from "../../../../styles/table.module.scss";
import temporarilyImg from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

const ComparisonTable = ({ companies, totalCompanies, currentPage }) => {
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 데이터가 변경될 때 로딩 상태 업데이트
  useEffect(() => {
    if (companies && companies.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [companies]); // companies 데이터가 변경될 때마다 로딩 상태 갱신

  // 페이지네이션을 고려한 순위 계산
  const getRank = (index) => (currentPage - 1) * 10 + index + 1;

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <span className={styles.ranking}>순위</span>
        <span className={styles.name}>기업 명</span>
        <span className={styles.description}>기업 소개</span>
        <span className={styles.info}>카테고리</span>
        <span className={styles.investmentAndSelection}>
          나의 기업 선택 횟수
        </span>
        <span className={styles.investmentAndSelection}>
          비교 기업 선택 횟수
        </span>
      </div>

      {/* 비교 목록 렌더링 */}
      <div className={styles.tableContents}>
        {loading ? (
          <span className={styles.dataMessage}>로딩 중...</span> // 로딩 중일 때 메시지
        ) : companies.length > 0 ? (
          companies.map((comparison, index) => (
            <div className={styles.tableContent} key={comparison.id}>
              <span className={styles.ranking}>{getRank(index)}위</span>
              <Link
                to={`/companies/${comparison.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={comparison.imageUrl || `${temporarilyImg}`}
                  alt={comparison.name}
                  className={styles.image}
                />
                <span className={styles.name}>{comparison.companyName}</span>
              </Link>
              <span className={styles.description}>
                {comparison.description}
              </span>
              <span className={styles.info}>{comparison.category}</span>
              <span className={styles.investmentAndSelection}>
                {comparison.selectedNumber}
              </span>
              <span className={styles.investmentAndSelection}>
                {comparison.comparedNumber}
              </span>
            </div>
          ))
        ) : (
          <span className={styles.dataMessage}>아직 비교 현황이 없어요.</span> // 데이터가 없을 때 메시지
        )}
      </div>
    </div>
  );
};

export default ComparisonTable;
