import React, { useState, useEffect } from "react";
import StartupList from "../../components/startupList/StartupList";
import Search from "../../components/search/Search";
import styles from "./Homepage.module.scss";
import axios from "axios";
import { dataUrl } from "../../env.js";
import SelectBox from "../../components/selectBox/SelectBox";
import { basicSortOptions } from "../../components/selectBox/sortOptions.js";

const Homepage = () => {
  const [startupList, setStartupList] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터

  // 데이터 가져오기
  const fetchStartupList = async () => {
    try {
      const response = await axios.get(`${dataUrl}/api/companies`);
      setStartupList(response.data); // 전체 데이터를 'startupList'에 저장
      setFilteredData(response.data); // 초기에 필터링된 데이터도 전체 데이터를 사용
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 매출액 높은 순으로 필터링하는 함수
  const handleSortChange = async (sortOrder) => {
    try {
      const response = await axios.get(
        `${dataUrl}/api/companies?sort=${sortOrder}`
      );
      setFilteredData(response.data); // 정렬된 데이터를 필터링된 데이터로 설정
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  };

  // 필터링된 데이터를 상태에 설정하는 함수
  const handleFilteredData = (filteredData) => {
    setFilteredData(filteredData); // 'Search'에서 필터링된 데이터를 상태로 저장
  };

  useEffect(() => {
    fetchStartupList(); // 컴포넌트가 마운트될 때 API를 통해 목록을 가져옴
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  return (
    <div>
      <div className={styles.homepageForm}>
        <div className={styles.homepageHeader}>
          <h1>전체 스타트업 목록</h1>
          <div className={styles.headerComponents}>
            <Search
              startups={startupList} // 전체 기업 목록을 전달
              onFilteredData={handleFilteredData} // 필터링된 데이터를 처리할 함수를 전달
            />
            <SelectBox
              size="small"
              options={basicSortOptions}
              defaultValue="investment_desc"
              onChange={handleSortChange} // 정렬 변경 시 처리할 함수 전달
            />
          </div>
        </div>
        <StartupList startups={filteredData} /> {/* 필터링된 데이터를 불러옴 */}
      </div>
    </div>
  );
};

export default Homepage;
