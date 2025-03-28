import React, { useState, useEffect } from "react";
import InvestmentList from "../../components/investmentList/InvestmentList";
import SelectBox from "../../components/selectBox/SelectBox";
import { viewMyStartupOptions } from "../../components/selectBox/sortOptions";
import axios from "axios";
import { dataUrl } from "../../env";
import Pagination from "../../components/pagination/pagination";
import styles from "./InvestmentStatusPage.module.scss";

const InvestmentStatusPage = () => {
  const [selectedSortValue, setSelectedSortValue] = useState(
    "investmentAmount_desc"
  );
  const [investmentData, setInvestmentData] = useState([]); // 전체 투자 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // 페이지당 아이템 수
  const itemsPerPage = 10;

  // 컴포넌트가 처음 렌더링될 때 기본 데이터를 가져오는 useEffect
  useEffect(() => {
    // 초기 정렬 상태에 맞는 데이터를 가져옵니다.
    axios
      .get(`${dataUrl}/api/companies?sort=${selectedSortValue}`)
      .then((res) => {
        setInvestmentData(res.data); // 전체 데이터를 상태에 저장
        setTotalPages(Math.ceil(res.data.length / itemsPerPage)); // 전체 페이지 수 계산
      })
      .catch((error) => {
        console.error("서버 오류:", error);
        alert("요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      });
  }, [selectedSortValue]); // 정렬 기준이 변경될 때마다 데이터를 다시 가져옵니다.

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 데이터만 가져오는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return investmentData.slice(startIndex, endIndex); // 해당 페이지 데이터 반환
  };

  // SelectBox에서 값이 변경되면 호출되는 함수
  const handleSelectChange = (newSortValue) => {
    setSelectedSortValue(newSortValue); // 선택된 값 상태 업데이트
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>투자 현황</h1>
        <SelectBox
          size="large"
          options={viewMyStartupOptions}
          defaultValue={selectedSortValue}
          onChange={handleSelectChange} // 셀렉트박스에서 값이 변경되면 호출
        />
      </div>
      {/* 투자 데이터 리스트를 InvestmentList로 전달 */}
      <InvestmentList startups={getCurrentPageData()} />

      {/* 페이지네이션 추가 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InvestmentStatusPage;
