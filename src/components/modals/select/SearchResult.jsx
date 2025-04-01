import React, { useState, useEffect } from "react";
import styles from "./SearchResult.module.scss";
import SelectFrame from "./SelectFrame";
import Pagination from "../../pagination/pagination";

function SearchResult({
  companyList,
  titleType,
  onSelect,
  onDeselect,
  selectedCompanies,
  onClose,
}) {
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 해당하는 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 페이지 데이터 업데이트
  useEffect(() => {
    const startIdx = (currentPage - 1) * 10;
    const endIdx = currentPage * 10;
    setCurrentPageData(companyList.slice(startIdx, endIdx)); // 페이지별 데이터 갱신
    setTotalPages(Math.ceil(companyList.length / 10)); // 페이지 수 계산
  }, [companyList, currentPage]); // companyList와 currentPage가 변경될 때마다 실행

  // 제목 설정
  const titleList = {
    latestCompany: "최근 비교한 기업",
    selectedCompany: "선택한 기업",
    result: "검색 결과",
  };

  // 본문
  return (
    <section>
      <h4 className={styles.title}>
        {titleList[titleType]}({companyList.length})
      </h4>
      {currentPageData.length > 0 ? (
        currentPageData.map((company) => (
          <SelectFrame
            key={company.id || company.name}
            company={company}
            onSelect={onSelect}
            onDeselect={onDeselect}
            titleType={titleType}
            selectedCompanies={selectedCompanies}
            onClose={onClose}
          />
        ))
      ) : (
        <p className={styles.text}>검색 결과가 없습니다.</p>
      )}

      {/* 페이지네이션 컴포넌트 */}
      {titleType === "result" && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)} // 페이지 변경 함수
        />
      )}
    </section>
  );
}

export default SearchResult;
