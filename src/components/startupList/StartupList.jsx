import React from "react";
import styles from "./StartupList.module.scss";

const startupList = ({ loading, startupList }) => {
  return (
    <div className={styles.startuplistForm}>
      <div className={styles.startuplistHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.name}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.info}>카테고리</p>
        <p className={styles.info}>누적 투자 금액</p>
        <p className={styles.info}>매출액</p>
        <p className={styles.info}>고용 인원</p>
      </div>

      {/* 스타트업 목록 렌더링 */}
      <div className={styles.startuplistContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : startupList.length > 0 ? (
          startupList.map((startup, index) => (
            <div className={styles.startuplistContent} key={startup.id}>
              <p className={styles.ranking}>{index + 1}위</p>
              <p className={styles.name}>{startup.name}</p>
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

export default startupList;
