import InvestmentList from "../../components/investmentList/InvestmentList";
import styles from "../homepage/page.module.scss";

const InvestmentStatus = () => {
  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1>투자 목록</h1>
        <select>
          <option value="High">매출액 높은순</option>
        </select>
      </div>
      <InvestmentList />
    </div>
  );
};

export default InvestmentStatus;
