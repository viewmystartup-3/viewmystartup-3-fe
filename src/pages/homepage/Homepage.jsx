import React, { useEffect, useState } from "react";
import { getAllCompaniesSorted } from "../../api/company.api.js";
import Pagination from "../../components/pagination/pagination"; // 페이지네이션 컴포넌트 임포트
import Search from "../../components/search/Search";
import SelectBox from "../../components/selectBox/SelectBox";
import StartupList from "../../components/startupList/StartupList";
import { basicSortOptions } from "../../sortOptions.js";
import styles from "../../styles/page.module.scss";

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

  // TODO: Page 컴포넌트화가 안 되어 있는 게 많이 아쉬움
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.headerText}>전체 스타트업 목록</h1>
        <div className={styles.headerComponents}>
          <div className={styles.Search}>
            <Search
              startups={startupList} // 전체 기업 목록을 전달
              onFilteredData={handleFilteredData} // 필터링된 데이터를 처리할 함수를 전달
            />
          </div>
          <SelectBox
            size="small"
            options={basicSortOptions}
            value={selectedSortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <StartupList
        startups={currentPageData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
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
