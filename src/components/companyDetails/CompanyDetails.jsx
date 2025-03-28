import React, { useEffect, useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dataUrl } from "../../env";

const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.get(`${dataUrl}/api/companies/${id}`);
      setCompany(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching company with ID:", id);
      fetchCompanyDetails();
    }
  }, [id]);

  if (!company) {
    return null;
  }

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.header}>
          <img
            src={company.imageUrl}
            alt={company.name}
            className={styles.image}
          />

          <div>
            <p className={styles.name}>{company.name}</p>
            <p className={styles.category}>{company.category}</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.title}>누적 투자 금액</p>
            <p className={styles.value}>{company.totalInvestment}억 원</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.title}>매출액</p>
            <p className={styles.value}>{company.revenue}억 원</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.title}>고용 인원</p>
            <p className={styles.value}>{company.employees}명</p>
          </div>
        </div>

        <div className={styles.description}>
          <div className={styles.content}>
            <p className={styles.descriptionTitle}>기업 소개</p>
            <br />
            <p className={styles.descriptionText}>{company.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
