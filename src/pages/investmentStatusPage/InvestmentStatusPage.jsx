import React from "react";
import InvestmentList from "../../components/investmentList/InvestmentList";
import styles from "./InvestmentStatusPage.module.scss";
const InvestmentStatusPage = () => {
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>투자 현황</h1>
        <div className={styles.filter}></div>
      </div>
      <InvestmentList />
    </div>
  );
};

export default InvestmentStatusPage;
