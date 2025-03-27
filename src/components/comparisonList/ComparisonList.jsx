import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import styles from "./Comparison.module.scss"; // 파일명도 변경
import axios from "axios";
import { dataUrl } from "../../env";

const Comparison = () => {
  const [comparisonList, setComparisonList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 페이지 데이터 가져오기
  const fetchComparisonList = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get(`${dataUrl}/api/companies`, {
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      const data = response.data;

      // 데이터 형식 확인 후 처리
      if (data && data.data) {
        setComparisonList(data.data);
        setTotalCount(data.totalCount || 0);
        setTotalPages(data.totalPages || 1);

        setCurrentPageData(data.data);
      } else if (Array.isArray(data)) {
        setComparisonList(data);
        setTotalCount(data.length);
        setTotalPages(Math.ceil(data.length / 10));

        // 현재 페이지에 해당하는 데이터만 추출해서 상태에 저장
        setCurrentPageData(
          data.slice((currentPage - 1) * 10, currentPage * 10)
        );
      } else {
        console.error("Expected data format is missing.");
        setComparisonList([]); // 데이터가 없으면 빈 배열로 설정
        setCurrentPageData([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setComparisonList([]); // 에러 발생 시 빈 배열로 설정
      setCurrentPageData([]);
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  // 페이지 변경 시 데이터를 가져오는 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 페이지 변경
    }
  };

  // 페이지가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchComparisonList();
  }, [currentPage]); // currentPage가 변경될 때마다 호출

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
              {/* 순위 */}
              <div className={styles.nameWrapper}>
                <img
                  src={comparison.imageUrl || "/images/logo.png"}
                  alt={comparison.name}
                  className={styles.startupImage}
                />
                {/* 이미지 */}
                <p className={styles.name}>{comparison.name}</p>
                {/* 회사 이름 */}
              </div>
              <p className={styles.description}>{comparison.description}</p>
              {/* 회사 설명 */}
              <p className={styles.category}>{comparison.category}</p>
              {/* 카테고리 */}
              <p className={styles.info}>{comparison.comparedCompany}</p>
              {/* 나의 기업 선택 횟수 */}
              <p className={styles.info}>{comparison.selectedCompany}</p>
              {/* 비교 기업 선택 횟수 */}
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

export default Comparison;
