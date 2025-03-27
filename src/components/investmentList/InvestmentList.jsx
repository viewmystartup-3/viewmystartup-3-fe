import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import styles from "./Investment.module.scss";
import { dataUrl } from "../../env.js";
import axios from "axios";

const InvestmentList = () => {
  const [investmentList, setInvestmentList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 페이지 데이터 가져오기
  const fetchInvestmentList = async () => {
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
        setInvestmentList(data.data);
        setTotalCount(data.totalCount || 0);
        setTotalPages(data.totalPages || 1);

        setCurrentPageData(data.data);
      } else if (Array.isArray(data)) {
        setInvestmentList(data);
        setTotalCount(data.length);
        setTotalPages(Math.ceil(data.length / 10));

        // 현재 페이지에 해당하는 데이터만 추출해서 상태에 저장
        setCurrentPageData(
          data.slice((currentPage - 1) * 10, currentPage * 10)
        );
      } else {
        console.error("Expected data format is missing.");
        setInvestmentList([]); // 데이터가 없으면 빈 배열로 설정
        setCurrentPageData([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setInvestmentList([]); // 에러 발생 시 빈 배열로 설정
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
    fetchInvestmentList();
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  return (
    <div className={styles.form}>
      <div className={styles.listHeader}>
        <p className={styles.ranking}>순위</p>
        <p className={styles.headerName}>기업 명</p>
        <p className={styles.description}>기업 소개</p>
        <p className={styles.category}>카테고리</p>
        <p className={styles.info}>View My Startup 투자 금액</p>
        <p className={styles.info}>실제 누적 투자 금액</p>
      </div>

      {/* 투자 목록 렌더링 */}
      <div className={styles.listContents}>
        {loading ? (
          <p>로딩 중...</p> // 로딩 중일 때 메시지
        ) : currentPageData.length > 0 ? (
          currentPageData.map((investment, index) => (
            <div className={styles.listContent} key={investment.id}>
              <p className={styles.ranking}>
                {(currentPage - 1) * 10 + index + 1}위
              </p>
              {/* 순위 */}
              <div className={styles.nameWrapper}>
                <img
                  src={investment.imageUrl || "/images/logo.png"}
                  alt={investment.name}
                  className={styles.startupImage}
                />
                {/* 이미지 */}
                <p className={styles.name}>{investment.name}</p>
                {/* 회사 이름 */}
              </div>
              <p className={styles.description}>{investment.description}</p>
              {/* 회사 설명 */}
              <p className={styles.category}>{investment.category}</p>
              {/* 카테고리 */}
              <p className={styles.info}>
                {investment.myInvestmentAmount}억 원
              </p>
              {/* View My Startup 투자 금액 */}
              <p className={styles.info}>{investment.totalInvestment}억 원</p>
              {/* 실제 누적 투자 금액 */}
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

export default InvestmentList;
