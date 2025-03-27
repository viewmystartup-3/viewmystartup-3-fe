import React from "react";
import InvestmentList from "../../components/investmentList/InvestmentList";
import styles from "./ComparisonStatusPage.module.scss";
import ComparisonList from "../../components/comparisonList/ComparisonList";
const ComparisonStatusPage = () => {
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>비교 현황</h1>
        <div className={styles.filter}></div>
      </div>
      <ComparisonList />
    </div>
  );
};

export default ComparisonStatusPage;
