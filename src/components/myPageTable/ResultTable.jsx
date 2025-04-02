import React, { useState, useEffect } from "react";
import styles from "./ResultTable.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import StartupList from "../startupList/StartupList";
import axios from "axios";
import { dataUrl } from "../../env.js";

// 위에서 받을 props (=적용할 데이터)
function ResultTable({ myCompany, compareCompanies }) {
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (!myCompany) return;

    // 데이터 불러옴
    const fetchData = async (sortOrder = "totalInvestment_desc") => {
      try {
        const selectedCompanyIds = [myCompany, ...compareCompanies]
          .slice(0, 6)
          .map((company) => company.id);

        const response = await axios.get(`${dataUrl}/api/companies`, {
          params: { sort: sortOrder, ids: selectedCompanyIds.join(",") },
        });

        setLoadedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [myCompany, compareCompanies]);

  return (
    <section className={styles.form}>
      <div className={styles.header}>
        <h4 className={styles.title}>비교 결과 확인하기</h4>
        <SelectBox options={basicSortOptions} />
      </div>
      <StartupList startups={loadedData} />
    </section>
  );
}

export default ResultTable;
