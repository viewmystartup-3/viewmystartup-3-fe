import React, { useState, useEffect } from "react";
import styles from "../../../../styles/table.module.scss";
import temporarilyImg from "../../../../assets/logo.png";
import clsx from "clsx";
import { Link } from "react-router-dom";

const HomepageTable = ({ startups, currentPage, itemsPerPage }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  // 페이지네이션을 고려한 순위 계산
  const getRank = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  return (
    <div className={styles.table}>
      <div className={clsx(styles.tableHeaderMT, styles.tableHeader)}>
        <span className={styles.ranking}>순위</span>
        <span className={styles.name}>기업 명</span>
        <span className={styles.description}>기업 소개</span>
        <span className={styles.info}>카테고리</span>
        <span className={styles.info}>누적 투자 금액</span>
        <span className={styles.info}>매출액</span>
        <span className={styles.info}>고용 인원</span>
      </div>

      {/* 스타트업 목록 렌더링 */}
      <div className={styles.tableContents}>
        {loading ? (
          <span className={styles.dataMessage}>로딩 중...</span> // 로딩 중일 때 메시지
        ) : startups.length > 0 ? (
          startups.map((startup, index) => (
            <div className={styles.tableContent} key={startup.id}>
              <span className={styles.ranking}>{getRank(index)}위</span>
              <Link
                to={`/companies/${startup.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={startup.imageUrl || `${temporarilyImg}`}
                  alt={startup.name}
                  className={styles.image}
                />
                <span className={styles.name}>{startup.companyName}</span>
              </Link>
              <span className={styles.description}>{startup.description}</span>
              <span className={styles.info}>{startup.category}</span>
              <span className={styles.info}>
                {startup.realInvestmentAmount}억 원
              </span>
              <span className={styles.info}>{startup.revenue}억 원</span>
              <span className={styles.info}>{startup.employeesNumber}명</span>
            </div>
          ))
        ) : (
          <span className={styles.dataMessage}>데이터가 없습니다.</span>
        )}
      </div>
    </div>
  );
};

export default HomepageTable;
