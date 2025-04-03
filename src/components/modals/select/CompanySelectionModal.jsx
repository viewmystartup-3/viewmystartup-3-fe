import React, { useState, useEffect, useRef } from "react";
import styles from "./CompanySelectionModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import SearchResult from "./SearchResult";
import Search from "../../search/Search";
import axios from "axios";
import { dataUrl } from "../../../env";

function CompanySelectionModal({
  title,
  titleTypes,
  selectedCompanies = [], // 외부 상태 받기
  onSelect, // 회사 선택
  onDeselect, // 회사 해제
  onClose, // 모달 닫기
  myCompany = null, // "나의 기업"에서 선택한 목록이 "다른 기업"에 뜨지 않게
}) {
  const [companyList, setCompanyList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const modalRef = useRef(null);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataUrl}/api/companies`);
        setCompanyList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // "나의 기업"에서 선택한 목록이 "다른 기업"에 뜨지 않게(=중복 제거)
  const filteredResults =
    title === "비교할 기업 선택하기" && myCompany !== null
      ? searchResults.filter((company) => {
          console.log("🔍 비교할 기업 ID:", company.id, typeof company.id);
          console.log("🔍 나의 기업 ID:", myCompany?.id, typeof myCompany?.id);
          return company.id !== myCompany.id;
        })
      : searchResults;

  // 상단 바 x 눌러서 창 닫음
  const handleCloseWindow = () => {
    onClose?.();
  };

  // 모달창 바깥을 클릭하면 창 닫힘
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseWindow();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCompanySelect = (company) => {
    if (title === "나의 기업 선택하기") {
      onSelect(company); // 단일 선택만 즉시 반영
      onClose(); // 단일 선택은 즉시 닫힘
    } else {
      // 비교 기업 선택일 경우엔 그냥 선택 목록에 반영만 (닫지 않음)
      onSelect(company); // 외부 상태 업데이트 (compareCompanies에 추가)
    }
  };

  return (
    <div className={styles.overlay}>
      <main
        ref={modalRef}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalTopBar onClose={handleCloseWindow}>{title}</ModalTopBar>

        <Search
          startups={companyList}
          onFilteredData={setSearchResults}
          onClearSearch={() => setSearchResults(companyList)}
          isModal
          companymodal
        />

        {titleTypes.map((type) => {
          // 검색창 입력 여부에 따라 "검색 결과"가 (안) 보이게
          if (type === "result" && filteredResults.length === 0) {
            return null;
          }

          // "비교할 기업 선택하기"에서 "선택한 기업"
          if (type === "selectedCompany") {
            if (selectedCompanies.length === 0) return null; // 선택한 기업이 없으면 감춰짐
            return (
              <SearchResult
                key={type}
                companyList={selectedCompanies}
                titleType={type}
                onSelect={handleCompanySelect}
                onDeselect={onDeselect}
                selectedCompanies={selectedCompanies}
              />
            );
          }

          // "나의 기업 선택하기"에서 "최근 비교한 기업"
          if (type === "latestCompany") {
            const latestCompanies = companyList.slice(0, 3); // 예시로 최근 3개
            if (latestCompanies.length === 0) return null; // 최근 비교한 기업이 없으면 감춰짐
            return (
              <SearchResult
                key={type}
                companyList={latestCompanies}
                titleType={type}
                onSelect={handleCompanySelect}
                onDeselect={onDeselect}
                selectedCompanies={selectedCompanies}
              />
            );
          }

          // default = 검색 결과
          return (
            <SearchResult
              key={type}
              companyList={filteredResults}
              titleType={type}
              onSelect={handleCompanySelect}
              onDeselect={onDeselect}
              selectedCompanies={selectedCompanies}
            />
          );
        })}
      </main>
    </div>
  );
}
export default CompanySelectionModal;
