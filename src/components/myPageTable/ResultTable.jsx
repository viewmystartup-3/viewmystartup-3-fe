import React, { useState, useEffect, useMemo } from "react";
import styles from "./Table.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import RawTable from "./RawTable.jsx";
import axios from "axios";
import { dataUrl } from "../../env.js";

function ResultTable({ myCompany, compareCompanies }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("totalInvestment_desc");

  const callCompanies = useMemo(() => {
    if (!myCompany) return [];
    return [myCompany, ...compareCompanies.slice(0, 5)];
  }, [myCompany, compareCompanies]);

  const selectedCompanyIds = useMemo(() => {
    return callCompanies
      .map((company) => company?.id)
      .filter((id) => id !== undefined && id !== null);
  }, [callCompanies]);

  useEffect(() => {
    if (selectedCompanyIds.length === 0) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataUrl}/api/companies`, {
          params: { sort: sortBy, ids: selectedCompanyIds.join(",") },
        });

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
      <RawTable
        startups={loadedData}
        hideRanking={true}
        isMyCompanyData={(startup) => startup.id === myCompany.id}
        tableType="result" // tableType을 result로 설정
      />
    </section>
  );
}

export default ResultTable;
