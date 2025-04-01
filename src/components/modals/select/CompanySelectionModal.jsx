import React, { useState, useEffect, useRef } from "react";
import styles from "./CompanySelectionModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import SearchResult from "./SearchResult";
import Search from "../../search/Search";
import axios from "axios";
import { dataUrl } from "../../../env";

function CompanySelectionModal({ title, titleTypes, onSelect, onClose }) {
  const [companyList, setCompanyList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const modalRef = useRef(null);

  // 상단 바 x 눌러서 창 닫음
  const handleCloseWindow = () => {
    onClose();
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

  // 선택한 기업이 CompareSection으로 넘어감
  useEffect(() => {
    if (selectedCompanies.length > 0) {
      onSelect?.(selectedCompanies);
    }
  }, [selectedCompanies, onSelect]);

  // "선택하기" 버튼을 클릭하면 데이터가 넘어감
  const handleCompanySelection = (companyData) => {
    if (title === "나의 기업 선택하기") {
      onSelect(companyData);
      onClose();
      return;
    }

    setSelectedCompanies((prev) => {
      if (prev.length >= 5) return prev; // 최대 다섯 개까지만 선택 가능
      if (prev.some((company) => company.id === companyData.id)) return prev; // 선택 중복 방지

      return [...prev, companyData];
    });
  };

  // "선택 해제" 버튼을 클릭하면 데이터 선택이 해제됨
  const handleCompanyDeselection = (companyData) => {
    setSelectedCompanies((prev) =>
      prev.filter((company) => company.id !== companyData.id)
    );
  };

  return (
    <main ref={modalRef} className={styles.container}>
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
        if (type === "result" && searchResults.length === 0) {
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
              onSelect={handleCompanySelection}
              onDeselect={handleCompanyDeselection}
              selectedCompanies={selectedCompanies}
            />
          );
        }

        // "나의 기업 선택하기"에서 "최근 비교한 기업"
        if (type === "latestCompany") {
          const latestCompanies = selectedCompanies || [];
          if (latestCompanies.length === 0) return null; // 최근 비교한 기업이 없으면 감춰짐
          return (
            <SearchResult
              key={type}
              companyList={latestCompanies}
              titleType={type}
              onSelect={handleCompanySelection}
              selectedCompanies={selectedCompanies}
            />
          );
        }

        // default = 검색 결과
        return (
          <SearchResult
            key={type}
            companyList={searchResults}
            titleType={type}
            onSelect={handleCompanySelection}
            onDeselect={handleCompanyDeselection}
            selectedCompanies={selectedCompanies}
          />
        );
      })}
    </main>
  );
}
export default CompanySelectionModal;
