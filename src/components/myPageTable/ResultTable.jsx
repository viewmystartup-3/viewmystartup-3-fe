import React, { useState, useEffect, useMemo } from "react";
import styles from "./ResultTable.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import StartupList from "../startupList/StartupList";
import axios from "axios";
import { dataUrl } from "../../env.js";

// 위에서 받을 props (=적용할 데이터)
function ResultTable({ myCompany, compareCompanies }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("totalInvestment_desc");

  // 기업 ID 목록 최적화
  const selectedCompanyIds = useMemo(() => {
    if (!myCompany) return [];
    return [myCompany, ...compareCompanies]
      .slice(0, 6)
      .map((company) => company.id);
  }, [myCompany, compareCompanies]);

  useEffect(() => {
    if (selectedCompanyIds.length === 0) return;

    // 데이터 불러옴
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataUrl}/api/companies`, {
          params: { sort: sortBy, ids: selectedCompanyIds.join(",") },
        });

        console.log("데이터 넘어오는지 확인:", response.data);
        setLoadedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sortBy, selectedCompanyIds]);

  return (
    <section className={styles.form}>
      <div className={styles.header}>
        <h4 className={styles.title}>비교 결과 확인하기</h4>
        <SelectBox options={basicSortOptions} onChange={setSortBy} />
      </div>
      <StartupList startups={loadedData} />
    </section>
  );
}

export default ResultTable;
