import React, { useState, useEffect } from "react";
import styles from "./StartupList.module.scss";
import { dataUrl } from "../../env.js";
import Pagination from "../pagination/pagination.jsx";

const StartupList = () => {
  const [startupList, setStartupList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 페이지 데이터 가져오기
  const fetchStartupList = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetch(
        `${dataUrl}/api/companies?page=${currentPage}&limit=10`
      );
      const data = await response.json();

      // 데이터 형식 확인 후 처리
      if (data && data.data) {
        setStartupList(data.data); // 전체 기업 목록 저장
        setTotalCount(data.totalCount || 0); // 총 ID 수
        setTotalPages(data.totalPages || 1); // 총 페이지 수

        // 현재 페이지에 해당하는 데이터만 추출해서 상태에 저장
        setCurrentPageData(data.data);
      } else if (Array.isArray(data)) {
        setStartupList(data); // data가 바로 배열일 경우 처리
        setTotalCount(data.length); // 배열 길이를 총 기업 수로 설정
        setTotalPages(Math.ceil(data.length / 10)); // 데이터에 맞게 페이지 수 계산

        // 현재 페이지에 해당하는 데이터만 추출해서 상태에 저장
        setCurrentPageData(
          data.slice((currentPage - 1) * 10, currentPage * 10)
        );
      } else {
        console.error("Expected data format is missing.");
        setStartupList([]); // 데이터가 없으면 빈 배열로 설정
        setCurrentPageData([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setStartupList([]); // 에러 발생 시 빈 배열로 설정
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
    fetchStartupList(); // 데이터 가져오기
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  return (
    <div className={styles.startuplistForm}>
      <div className={styles.startuplistHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.name}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.info}>카테고리</p>
        <p className={styles.info}>누적 투자 금액</p>
        <p className={styles.info}>매출액</p>
        <p className={styles.info}>고용 인원</p>
      </div>

      {/* 스타트업 목록 렌더링 */}
      <div className={styles.startuplistContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : currentPageData.length > 0 ? (
          currentPageData.map((startup, index) => (
            <div className={styles.startuplistContent} key={startup.id}>
              <p className={styles.ranking}>
                {(currentPage - 1) * 10 + index + 1}위
              </p>
              <p className={styles.name}>{startup.name}</p>
              <p className={styles.description}>{startup.description}</p>
              <p className={styles.info}>{startup.category}</p>
              <p className={styles.info}>{startup.totalInvestment}억 원</p>
              <p className={styles.info}>{startup.revenue}억 원</p>
              <p className={styles.info}>{startup.employees}명</p>
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p> // 데이터가 없을 때 메시지
        )}
      </div>

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StartupList;
