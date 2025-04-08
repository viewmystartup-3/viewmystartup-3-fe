import React, { useState } from "react";
import styles from "./Search.module.scss"; // 스타일 모듈을 import
import searchIcon from "../../../assets/ic_search.png";
import Hangul from "hangul-js"; // hangul-js 라이브러리 import

const Search = ({
  startups,
  onFilteredData,
  onClearSearch,
  isModal,
  companymodal,
}) => {
  const [isFocused, setIsFocused] = useState(false); // focus 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  // 초성만 추출하는 함수
  const getInitialConsonants = (text) => {
    return Hangul.d(text)
      .map((ch) => ch[0]) // 초성만 추출
      .join(""); // 초성들을 이어서 하나의 문자열로 반환
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // 검색어가 없을 경우 빈 배열을 반환
    if (value === "") {
      onFilteredData(isModal ? [] : startups);
      return;
    }

    // 검색어가 초성으로 입력된 경우
    const searchInitialConsonants = getInitialConsonants(value); // 검색어에서 초성만 추출

    // 데이터를 필터링하는 로직
    const filteredData = startups.filter((startup) => {
      if (companymodal || value === searchInitialConsonants) {
        // 회사명 초성 검색 로직 (모달에서만 초성 검색을 적용하는 부분을 수정)
        const startupNameInitialConsonants = getInitialConsonants(
          startup.companyName
        );

        // 초성 비교 로직
        let isMatch = true;
        let lastIndex = 0; // 초성이 이전 초성 이후에 등장하는지 확인하는 변수

        for (let i = 0; i < searchInitialConsonants.length; i++) {
          const currentChar = searchInitialConsonants[i];
          const index = startupNameInitialConsonants.indexOf(
            currentChar,
            lastIndex
          );

          if (index === -1) {
            isMatch = false; // 부분적으로 포함되지 않으면 매칭 실패
            break;
          }
          lastIndex = index + 1; // 다음 초성은 그 이후부터 검색
        }

        if (isMatch) return true; // 초성 일치하는 기업명
      } else {
        // 일반적인 검색 로직 (회사명, 카테고리)
        return (
          startup.companyName.toLowerCase().includes(value.toLowerCase()) || // 기업 명
          startup.description.toLowerCase().includes(value.toLowerCase()) || // 기업 소개
          startup.category.toLowerCase().includes(value.toLowerCase()) // 카테고리
        );
      }
    });

    // 부모 컴포넌트로 필터링된 데이터를 전달
    onFilteredData(filteredData);
  };

  // X 버튼 클릭 시 검색어 초기화 및 데이터 초기화
  const clearSearch = () => {
    setSearchTerm(""); // 검색어를 초기화
    onFilteredData(startups); // 원본 데이터로 초기화
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
