import React, { useState, useEffect } from "react";
import styles from "../../styles/table.module.scss";
import temporarilyImg from "../../assets/logo.png";
import clsx from "clsx";
import { Link } from "react-router-dom";

const RawTable = ({
  startups,
  hideRanking = false,
  isMyCompanyData = false,
  tableType = "default", // 새로운 prop 추가
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (startups.length > 0) {
      setLoading(false);
    }
  }, [startups]);

  // tableType에 따라 스타일 클래스 다르게 적용
  const tableClass =
    tableType === "rankingCheck"
      ? styles.rankingCheckTable
      : styles.resultTable;

  return (
    <div className={styles.table}>
      <div className={clsx(styles.tableHeader, tableClass)}>
        {!hideRanking && <p className={styles.ranking}>순위</p>}
        <p className={styles.name}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={clsx(styles.rawTableInfo, tableClass)}>카테고리</p>
        <p className={clsx(styles.rawTableInfo, tableClass)}>누적 투자 금액</p>
        <p className={clsx(styles.rawTableInfo, tableClass)}>매출액</p>
        <p className={clsx(styles.rawTableInfo, tableClass)}>고용 인원</p>
      </div>

      <div className={styles.tableContents}>
        {loading ? (
          <div>로딩 중...</div>
        ) : startups.length > 0 ? (
          startups.map((startup, index) => {
            const isSelected = isMyCompanyData(startup);

            return (
              <div
                className={clsx(styles.tableContent, {
                  [styles.selectedCompanyColor]: isSelected,
                })}
                key={startup.id}
              >
                {!hideRanking && (
                  <p className={styles.ranking}>{index + 1}위</p>
                )}
                <Link
                  to={`/companies/${startup.id}`}
                  className={styles.nameWrapper}
                >
                  <img
                    src={startup.imageUrl || temporarilyImg}
                    alt={startup.name}
                    className={styles.image}
                  />
                  <p className={styles.name}>{startup.name}</p>
                </Link>
                <p className={styles.description}>{startup.description}</p>
                <p className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.category}
                </p>
                <p className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.totalInvestment}억 원
                </p>
                <p className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.revenue}억 원
                </p>
                <p className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.employees}명
                </p>
              </div>
            );
          })
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RawTable;
