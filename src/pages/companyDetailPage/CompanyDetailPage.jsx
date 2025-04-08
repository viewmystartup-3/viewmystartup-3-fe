import React, { useEffect, useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { getCompanyById } from "../../api/company.api";
import InvestmentStatus from "./investmentDetailTable/investmentDetailTable";

const CompanyDetailPage = () => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  const fetchCompanyDetails = async () => {
    try {
      const data = await getCompanyById(id);
      setCompany(data);
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
      <div>
        <div className={styles.body}>
          <div className={styles.header}>
            <img
              src={company.imageUrl || logo}
              alt={company.name}
              className={styles.image}
            />

            <div>
              <p className={styles.name}>{company.companyName}</p>
              <p className={styles.category}>{company.category}</p>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <p className={styles.title}>누적 투자 금액</p>
              <p className={styles.value}>
                {company.realInvestmentAmount}억 원
              </p>
            </div>
            <div className={styles.stat}>
              <p className={styles.title}>매출액</p>
              <p className={styles.value}>{company.revenue}억 원</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.title}>고용 인원</p>
              <p className={styles.value}>{company.employeesNumber}명</p>
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

      <InvestmentStatus />
    </div>
  );
};

export default CompanyDetailPage;
