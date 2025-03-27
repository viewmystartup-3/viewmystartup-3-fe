import React, { useState } from "react";
import styles from "./Search.module.scss"; // 스타일 모듈을 import
import searchIcon from "../../assets/ic_search.png";

const Search = ({ startups, onFilteredData, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false); // focus 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // 검색어에 따라서 데이터를 필터링
    const filteredData = startups.filter((startup) => {
      return (
        startup.name.toLowerCase().includes(value.toLowerCase()) || // 기업명
        startup.description.toLowerCase().includes(value.toLowerCase()) || // 기업소개
        startup.category.toLowerCase().includes(value.toLowerCase()) || // 카테고리
        startup.totalInvestment.toString().includes(value) || // 누적 투자 금액
        startup.revenue.toString().includes(value) || // 매출액
        startup.employees.toString().includes(value) // 고용 인원
      );
    });

    // 부모 컴포넌트로 필터링된 데이터를 전달
    onFilteredData(filteredData);
  };

  // X 버튼 클릭 시 검색어 초기화 및 데이터 초기화
  const clearSearch = () => {
    setSearchTerm(""); // 검색어를 초기화
    onFilteredData(startups); // 필터링된 데이터를 전체 기업 목록으로 초기화
    onClearSearch(); // 추가적인 초기화 작업이 필요하면 부모 컴포넌트로 전달
  };

  // 포커스 상태 변경 시 아이콘 및 입력창 이동
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.componentSearch}>
        <img
          src={searchIcon}
          alt="Search"
          className={
            isFocused || searchTerm
              ? styles.searchIconRight // 포커스가 되거나 검색어가 있을 때 아이콘 이동
              : styles.searchIconLeft
          }
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어를 입력해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={isFocused || searchTerm ? styles.focusRight : ""}
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
