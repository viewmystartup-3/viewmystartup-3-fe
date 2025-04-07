import React, { useState, useEffect } from "react";
import styles from "../../styles/table.module.scss";
import temporarilyImg from "../../assets/logo.png";
import clsx from "clsx";
import { Link } from "react-router-dom";

const StartupList = ({ startups, currentPageData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  // 전체 리스트에서 순위를 계산하는 함수
  const calculateRanking = (startup) => {
    // 전체 데이터에서 해당 스타트업의 순위를 찾는다
    const sortedStartups = [...startups].sort(
      (a, b) => b.totalInvestment - a.totalInvestment
    );
    return sortedStartups.findIndex((s) => s.id === startup.id) + 1;
  };

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

      <div className={styles.tableContents}>
        {loading ? (
          <p className={styles.dataMessage}>로딩 중...</p>
        ) : currentPageData.length > 0 ? (
          currentPageData.map((startup) => (
            <div className={styles.tableContent} key={startup.id}>
              <p className={styles.ranking}>{calculateRanking(startup)}위</p>
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
          <p className={styles.dataMessage}>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default StartupList;
