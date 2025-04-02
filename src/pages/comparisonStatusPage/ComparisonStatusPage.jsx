import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/page.module.scss";
import ComparisonList from "../../components/comparisonList/ComparisonList";
import SelectBox from "../../components/selectBox/SelectBox";
import { myCompanySelectOptions } from "../../components/selectBox/sortOptions";
import { dataUrl } from "../../env.js";
import Pagination from "../../components/pagination/pagination"; // 페이지네이션 컴포넌트 임포트

const ComparisonStatusPage = () => {
  const [sortedCompanies, setSortedCompanies] = useState([]); // 정렬된 회사 목록 상태
  const [selectedSortValue, setSelectedSortValue] = useState(
    "selectedCompany_desc"
  ); // 선택된 정렬 기준 상태

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // axios 요청 함수 (정렬된 회사 목록을 가져오는 함수)
  const fetchSortedCompanies = (sortValue) => {
    axios
      .get(`${dataUrl}/api/companies?sort=${sortValue}`)
      .then((res) => {
        console.log("정렬된 회사 목록:", res.data);
        setSortedCompanies(res.data); // 받아온 데이터로 상태 업데이트
        setTotalPages(Math.ceil(res.data.length / 10)); // 전체 페이지 수 계산
      })
      .catch((error) => {
        console.error(
          "정렬된 회사 목록을 가져오는 데 오류가 발생했습니다:",
          error
        );
      });
  };

  // SelectBox에서 값이 변경되면 호출되는 함수
  const handleSelectChange = (newSortValue) => {
    setSelectedSortValue(newSortValue); // 선택된 값 상태 업데이트
    setCurrentPage(1); // 정렬 변경 시 페이지를 1로 리셋
    fetchSortedCompanies(newSortValue); // 선택된 값으로 데이터를 다시 가져오기
  };

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 페이지 변경
    }
  };

  useEffect(() => {
    fetchSortedCompanies(selectedSortValue); // 초기 데이터 불러오기
  }, [selectedSortValue]); // 선택된 값이 바뀔 때마다 데이터를 새로 요청

  // 현재 페이지에 맞는 데이터
  const currentPageData = sortedCompanies.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader2}>
        <h1 className={styles.headerText}>비교 현황</h1>
        <div className={styles.headerComponents}>
          <SelectBox
            size="large"
            options={myCompanySelectOptions}
            defaultValue={selectedSortValue}
            onChange={handleSelectChange} // 셀렉트박스에서 값이 변경되면 호출
          />
        </div>
      </div>
      {/* ComparisonList에 데이터와 페이지네이션 상태 전달 */}
      <ComparisonList companies={currentPageData} />

      {/* 페이지네이션 추가 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // 페이지 변경 함수
      />
    </div>
  );
};

export default ComparisonStatusPage;
