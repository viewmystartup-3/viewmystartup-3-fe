import { useState } from "react";
import styles from "./Search.module.scss";
import searchIcon from "../../assets/ic_search.png";

const Search = ({ onSearch, searchTerm, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false); // focus 상태

  // 검색어가 바뀔 때마다 실행되는 함수
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  // X 버튼 클릭 시 검색어 초기화
  const clearSearch = () => {
    onClearSearch();
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
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={handleSearch}
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
