import React, { useState, useEffect } from "react";
import StartupList from "../../components/startupList/StartupList";
import Search from "../../components/search/Search";
import styles from "./Homepage.module.scss";
import axios from "axios";
import { dataUrl } from "../../env.js";

const Homepage = () => {
  const [startupList, setStartupList] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터

  // 데이터 가져오기
  const fetchStartupList = async () => {
    try {
      const response = await axios.get(`${dataUrl}/api/companies`);
      setStartupList(response.data); // 전체 데이터를 'startupList'에 저장
      setFilteredData(response.data); // 초기에 필터링된 데이터도 전체 데이터를 사용한다
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 필터링된 데이터를 상태에 설정하는 함수
  const handleFilteredData = (filteredData) => {
    setFilteredData(filteredData); // 'Search'에서 필터링된 데이터를 상태로 저장
  };

  useEffect(() => {
    fetchStartupList(); // 컴포넌트가 마운트 될 때 API를 통해서 목록을 가져온다
  }, []); // 컴포넌트가 처음 랜더링될 때만 호출된다

  return (
    <div>
      <div className={styles.homepageForm}>
        <div className={styles.homepageHeader}>
          <h1>전체 스타트업 목록</h1>
          <div className={styles.headerComponents}>
            <Search
              startups={startupList} // 전체 기업 목록을 전달
              onFilteredData={handleFilteredData} // 필터링된 데이터 데이터를 처리할 함수를 전달
            />
            <select>
              <option value="High">매출액 높은순</option>
            </select>
          </div>
        </div>
        <StartupList startups={filteredData} /> {/* 필터링된 데이터를 불러옴 */}
      </div>
    </div>
  );
};

export default Homepage;
