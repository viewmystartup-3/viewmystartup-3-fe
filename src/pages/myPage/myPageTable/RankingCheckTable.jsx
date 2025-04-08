import React, { useState, useEffect, useMemo } from "react";
import SelectBox from "./../../../components/UI modules/selectBox/SelectBox.jsx";
import RawTable from "./RawTable.jsx";
import { getAllCompaniesSorted } from "./../../../api/company.api.js";
import styles from "./Table.module.scss";
import { basicSortOptions } from "../../../constants/sortOptions.js";

function RankingCheckTable({ myCompany }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("realInvestmentAmount_desc");

  useEffect(() => {
    if (!myCompany) return;

    const fetchData = async () => {
      try {
        const data = await getAllCompaniesSorted(sortBy);
        setLoadedData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sortBy, myCompany]);

  // 순위 필터링
  const rankedCompanies = useMemo(() => {
    if (!myCompany || loadedData.length === 0) return [];

    const realIndex = loadedData.findIndex(
      (company) => company.id === myCompany.id
    );
    if (realIndex === -1) return [];

    const start = Math.max(0, realIndex - 2);
    const end = Math.min(loadedData.length, realIndex + 3);

    return loadedData
      .slice(start, end)
      .map((company, i) => ({ ...company, actualRanking: start + i + 1 }));
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
