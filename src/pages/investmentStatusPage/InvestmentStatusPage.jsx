import React, { useState, useEffect } from "react";
import InvestmentList from "../../components/investmentList/InvestmentList";
import SelectBox from "../../components/selectBox/SelectBox";
import { viewMyStartupOptions } from "../../components/selectBox/sortOptions";
import axios from "axios";
import { dataUrl } from "../../env";
import Pagination from "../../components/pagination/pagination";
import styles from "../../styles/page.module.scss";

const InvestmentStatusPage = () => {
  const [selectedSortValue, setSelectedSortValue] = useState(
    "investmentAmount_desc"
  );
  const [investmentData, setInvestmentData] = useState([]); // 전체 투자 데이터 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 투자 데이터 상태
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

        // investmentAmount 값이 있는 항목만 필터링
        const filtered = res.data.filter(
          (investment) =>
            investment.investmentAmount != null &&
            investment.investmentAmount > 0
        );

        setFilteredData(filtered); // 필터링된 데이터를 상태에 저장
        setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // 필터링된 데이터로 페이지 수 계산
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
    return filteredData.slice(startIndex, endIndex); // 필터링된 데이터만 해당 페이지에 맞게 반환
  };

  // SelectBox에서 값이 변경되면 호출되는 함수
  const handleSelectChange = (newSortValue) => {
    setSelectedSortValue(newSortValue); // 선택된 값 상태 업데이트
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader2}>
        <h1 className={styles.headerText}>투자 현황</h1>
        <div className={styles.headerComponents}>
          <SelectBox
            size="large"
            options={viewMyStartupOptions}
            defaultValue={selectedSortValue}
            onChange={handleSelectChange} // 셀렉트박스에서 값이 변경되면 호출
          />
        </div>
      </div>
      {/* 필터링된 데이터만 InvestmentList로 전달 */}
      <InvestmentList startups={getCurrentPageData()} />

      {/* 페이지네이션 추가 */}
      <div className={styles.pagePagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default InvestmentStatusPage;
