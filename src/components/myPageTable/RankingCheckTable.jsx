import React, { useState, useEffect, useMemo } from "react";
import styles from "./Table.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import StartupList from "../startupList/StartupList";
import axios from "axios";
import { dataUrl } from "../../env.js";

function RankingCheckTable({ myCompany }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("totalInvestment_desc");

  // 기업 데이터 불러오기
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

  // "내 기업"을 중심으로 index 추출
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

  // 화면
  return (
    <section className={styles.form}>
      <div className={styles.header}>
        <h4 className={styles.title}>기업 순위 확인하기</h4>
        <SelectBox options={basicSortOptions} onChange={setSortBy} />
      </div>
      <StartupList startups={rankedCompanies} />
    </section>
  );
}

export default RankingCheckTable;
