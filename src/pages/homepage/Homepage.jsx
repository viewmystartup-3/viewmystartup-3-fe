import React, { useState, useEffect } from "react";
import StartupList from "../../components/startupList/StartupList";
import Search from "../../components/search/Search";
import styles from "../../styles/page.module.scss";
import axios from "axios";
import { dataUrl } from "../../env.js";
import SelectBox from "../../components/selectBox/SelectBox";
import { basicSortOptions } from "../../components/selectBox/sortOptions.js";
import Pagination from "../../components/pagination/pagination"; // 페이지네이션 컴포넌트 임포트

const Homepage = () => {
  const [startupList, setStartupList] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedSortValue, setSelectedSortValue] = useState(
    "investmentAmount_desc"
  ); // 선택된 정렬 값

  // 페이지당 아이템 수
  const itemsPerPage = 10;

  // 데이터 가져오기
  const fetchStartupList = async (sortOrder = "investmentAmount_desc") => {
    try {
      const response = await axios.get(
        `${dataUrl}/api/companies?sort=${sortOrder}`
      );
      const data = response.data;
      setStartupList(data); // 전체 데이터를 'startupList'에 저장
      setFilteredData(data); // 초기 데이터를 'filteredData'에 저장
      setTotalPages(Math.ceil(data.length / itemsPerPage)); // 전체 페이지 수 계산
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 매출액 높은 순으로 필터링하는 함수
  const handleSortChange = (sortOrder) => {
    setSelectedSortValue(sortOrder); // 선택된 정렬값을 상태로 저장
    fetchStartupList(sortOrder); // 새로 정렬된 데이터를 가져옴
  };

  // 필터링된 데이터를 상태에 설정하는 함수
  const handleFilteredData = (filteredData) => {
    setFilteredData(filteredData); // 'Search'에서 필터링된 데이터를 상태로 저장
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage)); // 필터링된 데이터에 맞게 페이지 수 업데이트
  };

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page); // 현재 페이지 상태 업데이트
  };

  useEffect(() => {
    fetchStartupList(selectedSortValue); // 컴포넌트가 마운트될 때 기본 정렬로 데이터를 가져옴
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.headerText}>전체 스타트업 목록</h1>
        <div className={styles.headerComponents}>
          <Search
            startups={startupList} // 전체 기업 목록을 전달
            onFilteredData={handleFilteredData} // 필터링된 데이터를 처리할 함수를 전달
          />
          <SelectBox
            size="small"
            options={basicSortOptions}
            value={selectedSortValue} // 셀렉트 박스의 현재 값을 상태에서 가져옴
            onChange={handleSortChange} // 정렬 변경 시 처리할 함수 전달
          />
        </div>
      </div>

      {/* 스타트업 리스트 컴포넌트 */}
      <StartupList
        startups={filteredData}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* 페이지네이션 추가 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // 페이지 변경 시 처리할 함수 전달
      />
    </div>
  );
};

export default Homepage;
