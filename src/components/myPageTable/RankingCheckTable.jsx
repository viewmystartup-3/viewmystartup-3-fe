import React, { useState, useEffect, useMemo } from "react";
import styles from "./Table.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import RawTable from "./RawTable.jsx";
import axios from "axios";
import { dataUrl } from "../../env.js";

function RankingCheckTable({ myCompany }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("totalInvestment_desc");

  useEffect(() => {
    if (!myCompany) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${dataUrl}/api/companies?sort=${sortBy}`
        );

        setLoadedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sortBy, myCompany]);

  const rankedCompanies = useMemo(() => {
    if (!myCompany || loadedData.length === 0) return [];

    const index = loadedData.findIndex(
      (company) => company.id === myCompany.id
    );
    if (index === -1) return [];

    const start = Math.max(0, index - 2);
    const end = Math.min(loadedData.length, index + 3);

    return loadedData.slice(start, end);
  }, [myCompany, loadedData]);

  return (
    <section className={styles.form}>
      <div className={styles.header}>
        <h4 className={styles.title}>기업 순위 확인하기</h4>
        <SelectBox options={basicSortOptions} onChange={setSortBy} />
      </div>
      <RawTable
        startups={rankedCompanies}
        isMyCompanyData={(startup) => startup.id === myCompany?.id}
        tableType="rankingCheck" // tableType을 rankingCheck로 설정
      />
    </section>
  );
}

export default RankingCheckTable;
