import React, { useState, useEffect, useMemo } from "react";
import styles from "./Table.module.scss";
import SelectBox from "./../../../components/UI modules/selectBox/SelectBox.jsx";
import RawTable from "./RawTable.jsx";
import { getCompaniesByIdsSorted } from "./../../../api/company.api.js";
import { basicSortOptions } from "../../../constants/sortOptions.js";

function ResultTable({ myCompany, compareCompanies }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("realInvestmentAmount_desc");

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
        const data = await getCompaniesByIdsSorted(selectedCompanyIds, sortBy);
        setLoadedData(data);
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
