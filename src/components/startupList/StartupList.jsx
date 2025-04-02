import React, { useState, useEffect } from "react";
import styles from "../../styles/table.module.scss";
import temporarilyImg from "../../assets/logo.png";
import clsx from "clsx";
import { Link } from "react-router-dom";

const StartupList = ({ startups, currentPage }) => {
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 해당하는 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 페이지 데이터 업데이트
  useEffect(() => {
    const startIdx = (currentPage - 1) * 10;
    const endIdx = currentPage * 10;
    setCurrentPageData(startups.slice(startIdx, endIdx)); // 페이지별 데이터 갱신
    setLoading(false);
  }, [startups, currentPage]);

  return (
    <div className={styles.table}>
      <div className={clsx(styles.tableHeaderMT, styles.tableHeader)}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.name}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.info}>카테고리</p>
        <p className={styles.info}>누적 투자 금액</p>
        <p className={styles.info}>매출액</p>
        <p className={styles.info}>고용 인원</p>
      </div>

      {/* 스타트업 목록 렌더링 */}
      <div className={styles.tableContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : currentPageData.length > 0 ? (
          currentPageData.map((startup, index) => (
            <div className={styles.tableContent} key={startup.id}>
              <p className={styles.ranking}>
                {(currentPage - 1) * 10 + index + 1}위
              </p>
              <Link
                to={`/companies/${startup.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={startup.imageUrl || `${temporarilyImg}`}
                  alt={startup.name}
                  className={styles.image}
                />
                <p className={styles.name}>{startup.name}</p>
              </Link>
              <p className={styles.description}>{startup.description}</p>
              <p className={styles.info}>{startup.category}</p>
              <p className={styles.info}>{startup.totalInvestment}억 원</p>
              <p className={styles.info}>{startup.revenue}억 원</p>
              <p className={styles.info}>{startup.employees}명</p>
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p> // 데이터가 없을 때 메시지
        )}
      </div>
    </div>
  );
};

export default StartupList;
