import React, { useState } from "react";
import StartupList from "../../components/startupList/StartupList";
import Search from "../../components/search/Search";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  // 검색어 상태 업데이트
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 검색어 초기화
  const clearSearch = () => {
    setSearchTerm(""); // 검색어 초기화
  };

  return (
    <div>
      <div className={styles.homepageForm}>
        <div className={styles.homepageHeader}>
          <h1>전체 스타트업 목록</h1>
          <div className={styles.headerComponents}>
            <Search
              searchTerm={searchTerm}
              onSearch={handleSearch} // 검색어 변경 시 상태 업데이트
              onClearSearch={clearSearch} // X 버튼 클릭 시 검색어 초기화
            />
            <select>
              <option value="High">매출액 높은순</option>
            </select>
          </div>
        </div>
        {/* List 컴포넌트 */}
        <StartupList />
      </div>
    </div>
  );
};

export default Homepage;
