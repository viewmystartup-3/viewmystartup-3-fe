import React, { useState, useEffect } from "react";
import StartupList from "../../components/startupList/StartupList";
import Search from "../../components/search/Search";
import styles from "../../styles/page.module.scss";
import SelectBox from "../../components/selectBox/SelectBox";
import { basicSortOptions } from "../../sortOptions.js";
import Pagination from "../../components/pagination/pagination"; // 페이지네이션 컴포넌트 임포트
import { getAllCompaniesSorted } from "../../api/company.api.js";

const Homepage = () => {
  const [startupList, setStartupList] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedSortValue, setSelectedSortValue] = useState(
    "totalInvestment_desc"
  ); // 선택된 정렬 값

  const itemsPerPage = 10;

  const fetchStartupList = async (sortOrder = "totalInvestment_desc") => {
    try {
      const data = await getAllCompaniesSorted(sortOrder);
      setStartupList(data); // 전체 데이터를 'startupList'에 저장
      setFilteredData(data); // 초기 데이터를 'filteredData'에 저장
      setTotalPages(Math.ceil(data.length / itemsPerPage)); // 전체 페이지 수 계산
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSortChange = (sortOrder) => {
    setSelectedSortValue(sortOrder);
    fetchStartupList(sortOrder); // 새로 정렬된 데이터를 가져옴
  };

  const handleFilteredData = (filteredData) => {
    setFilteredData(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchStartupList(selectedSortValue);
  }, []);

  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.headerText}>전체 스타트업 목록</h1>
        <div className={styles.headerComponents}>
          <Search startups={startupList} onFilteredData={handleFilteredData} />
          <SelectBox
            size="small"
            options={basicSortOptions}
            value={selectedSortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <StartupList startups={startupList} currentPageData={currentPageData} />
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

export default Homepage;
