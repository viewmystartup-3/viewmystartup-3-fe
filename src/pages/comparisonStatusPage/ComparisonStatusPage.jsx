import React, { useState } from "react";
import axios from "axios";
import styles from "./ComparisonStatusPage.module.scss";
import ComparisonList from "../../components/comparisonList/ComparisonList";
import SelectBox from "../../components/selectBox/SelectBox";
import { myCompanySelectOptions } from "../../components/selectBox/sortOptions";
import { dataUrl } from "../../env.js";

const ComparisonStatusPage = () => {
  const [sortedCompanies, setSortedCompanies] = useState([]); // 정렬된 회사 목록 상태 추가
  const [selectedSortValue, setSelectedSortValue] = useState("investment_desc"); // 선택된 정렬 기준 상태 추가

  // axios 요청 함수
  const fetchSortedCompanies = (sortValue) => {
    axios
      .get(`${dataUrl}/api/companies?sort=${sortValue}`)
      .then((res) => {
        console.log("정렬된 회사 목록:", res.data);
        setSortedCompanies(res.data); // 받아온 데이터로 상태 업데이트
      })
      .catch((error) => {
        console.error(
          "정렬된 회사 목록을 가져오는 데 오류가 발생했습니다:",
          error
        );
      });
  };

  // SelectBox에서 값이 변경되면 호출되는 함수
  const handleSelectChange = (newSortValue) => {
    setSelectedSortValue(newSortValue); // 선택된 값 상태 업데이트
    fetchSortedCompanies(newSortValue); // 선택된 값으로 데이터를 다시 가져오기
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>비교 현황</h1>
        <SelectBox
          size="large"
          options={myCompanySelectOptions}
          defaultValue="investment_desc"
          onChange={handleSelectChange} // 셀렉트박스에서 값이 변경되면 호출
        />
      </div>
      <ComparisonList companies={sortedCompanies} />
    </div>
  );
};

export default ComparisonStatusPage;
