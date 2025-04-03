import React, { useState, useEffect, useMemo } from "react";
import styles from "./Table.module.scss";
import SelectBox from "../selectBox/SelectBox";
import { basicSortOptions } from "../selectBox/sortOptions";
import StartupList from "../startupList/StartupList";
import axios from "axios";
import { dataUrl } from "../../env.js";

// 위에서 받을 props (=적용할 데이터)
function ResultTable({ myCompany, compareCompanies }) {
  const [loadedData, setLoadedData] = useState([]);
  const [sortBy, setSortBy] = useState("totalInvestment_desc");

  // 기업 목록 불러옴
  const callCompanies = useMemo(() => {
    if (!myCompany) return [];

    // 내 기업이 첫 번째고, 비교 기업을 뒤에 추가함
    return [myCompany, ...compareCompanies.slice(0, 5)];
  }, [myCompany, compareCompanies]);

  // 기업 목록에서 id 추출
  const selectedCompanyIds = useMemo(() => {
    return callCompanies
      .map((company) => company?.id)
      .filter((id) => id !== undefined && id !== null); // undefined, null 제거
  }, [callCompanies]);

  useEffect(() => {
    if (selectedCompanyIds.length === 0) return;

    // 데이터 가져옴
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

  /*
  컴포넌트에 스타일 적용
  */

  // 화면
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
