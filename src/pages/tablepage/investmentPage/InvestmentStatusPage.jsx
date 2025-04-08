import React, { useState, useEffect } from "react";
import InvestmentTable from "./table/InvestmentTable";
import SelectBox from "../../../components/UI modules/selectBox/SelectBox";
import Pagination from "../../../components/UI modules/pagination/pagination";
import styles from "../../../styles/page.module.scss";
import { getAllCompaniesSorted } from "../../../api/company.api";
import { viewMyStartupOptions } from "../../../constants/sortOptions.js";

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

  // 정렬 함수
  const sortData = (data, sortValue) => {
    switch (sortValue) {
      case "investmentAmount_desc":
        return data.sort((a, b) => b.investmentAmount - a.investmentAmount);
      case "investmentAmount_asc":
        return data.sort((a, b) => a.investmentAmount - b.investmentAmount);
      case "realInvestmentAmount_desc":
        return data.sort(
          (a, b) => b.realInvestmentAmount - a.realInvestmentAmount
        );
      case "realInvestmentAmount_asc":
        return data.sort(
          (a, b) => a.realInvestmentAmount - b.realInvestmentAmount
        );
      default:
        return data;
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCompaniesSorted(selectedSortValue);
        setInvestmentData(data); // 전체 데이터를 상태에 저장
        const filtered = data.filter(
          (investment) =>
            investment.investmentAmount != null &&
            investment.investmentAmount > 0
        );
        const sortedData = sortData(filtered, selectedSortValue); // 정렬된 데이터를 저장
        setFilteredData(sortedData); // 필터링된 정렬된 데이터를 상태에 저장
        setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // 필터링된 데이터로 페이지 수 계산
      } catch (e) {
        console.error("서버 오류:", e);
        alert("요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    };
    fetchData();
  }, [selectedSortValue]); // selectedSortValue가 변경될 때마다 데이터를 다시 가져옴

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            onChange={handleSelectChange} // onChange 핸들러는 InvestmentStatusPage에서 처리
          />
        </div>
      </div>
      {/* 필터링된 데이터와 정렬된 투자 데이터를 InvestmentTable 전달 */}
      <InvestmentTable
        startups={filteredData} // 필터링되고 정렬된 데이터 전달
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

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
