import React, { useState, useEffect } from "react";
import styles from "../../../styles/table.module.scss";
import temporarilyImg from "./../../../assets/logo.png";
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
        {!hideRanking && <span className={styles.ranking}>순위</span>}
        <span className={styles.name}>기업 명</span>
        <span className={styles.description}>기업 소개</span>
        <span className={clsx(styles.rawTableInfo, tableClass)}>카테고리</span>
        <span className={clsx(styles.rawTableInfo, tableClass)}>
          누적 투자 금액
        </span>
        <span className={clsx(styles.rawTableInfo, tableClass)}>매출액</span>
        <span className={clsx(styles.rawTableInfo, tableClass)}>고용 인원</span>
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
                  <span className={styles.ranking}>
                    {startup.actualRanking ? `${startup.actualRanking}위` : "-"}
                  </span>
                )}
                <Link
                  to={`/companies/${startup.id}`}
                  className={styles.nameWrapper}
                >
                  <img
                    src={startup.imageUrl || temporarilyImg}
                    alt={startup.companyName}
                    className={styles.image}
                  />
                  <span className={styles.name}>{startup.companyName}</span>
                </Link>
                <span className={styles.description}>
                  {startup.description}
                </span>
                <span className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.category}
                </span>
                <span className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.realInvestmentAmount}억 원
                </span>
                <span className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.revenue}억 원
                </span>
                <span className={clsx(styles.rawTableInfo, tableClass)}>
                  {startup.employeesNumber}명
                </span>
              </div>
            );
          })
        ) : (
          <span>데이터가 없습니다.</span>
        )}
      </div>
    </div>
  );
};

export default RawTable;
