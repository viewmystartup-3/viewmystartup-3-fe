import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import styles from "./Comparison.module.scss";
import { Link } from "react-router-dom";

const ComparisonList = ({ companies }) => {
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 페이지 데이터 업데이트
  useEffect(() => {
    setLoading(true); // 로딩 시작
    const startIdx = (currentPage - 1) * 10;
    const endIdx = currentPage * 10;
    setCurrentPageData(companies.slice(startIdx, endIdx)); // 데이터 슬라이싱

    setTotalPages(Math.ceil(companies.length / 10)); // 총 페이지 수 계산
    setLoading(false); // 로딩 끝
  }, [companies, currentPage]); // companies나 currentPage가 변경될 때마다 실행

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 페이지 변경
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.listHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.headerName}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.category}>카테고리</p>
        <p className={styles.info}>나의 기업 선택 횟수</p>
        <p className={styles.info}>비교 기업 선택 횟수</p>
      </div>

      {/* 비교 목록 렌더링 */}
      <div className={styles.listContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : currentPageData.length > 0 ? (
          currentPageData.map((comparison, index) => (
            <div className={styles.listContent} key={comparison.id}>
              <p className={styles.ranking}>
                {(currentPage - 1) * 10 + index + 1}위
              </p>
              <Link
                to={`/companies/${comparison.id}`}
                className={styles.nameWrapper}
              >
                <img
                  src={comparison.imageUrl || "/images/logo.png"}
                  alt={comparison.name}
                  className={styles.startupImage}
                />
                <p className={styles.name}>{comparison.name}</p>
              </Link>
              <p className={styles.description}>{comparison.description}</p>
              <p className={styles.category}>{comparison.category}</p>
              <p className={styles.info}>{comparison.comparedCompany}</p>
              <p className={styles.info}>{comparison.selectedCompany}</p>
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p> // 데이터가 없을 때 메시지
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ComparisonList;
