import React, { useState, useEffect } from "react";
import styles from "./CompanySelectionModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import SearchResult from "./SearchResult";
import Search from "../../search/Search";
import axios from "axios";
import { dataUrl } from "../../../env";

function CompanySelectionModal({ title, titleTypes, onSelect, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // 상단 바 x 눌러서 창 닫기
  const handleCloseWindow = () => {
    setIsOpen(false);
    onClose?.();
  };

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

  // "선택하기" 버튼을 클릭하면 데이터가 넘어감
  const handleCompanySelect = (companyData) => {
    setSelectedCompanies((prev) => {
      if (prev.some((company) => company.id === companyData.id)) return prev;
      return [...prev, companyData];
    });

    //외부의 onSelect 콜백 호출출
    onSelect?.(companyData);

    //모달닫기
    onClose?.();
  };

  // "선택 해제" 버튼을 클릭하면 데이터 선택이 해제됨
  const handleCompanyDeselect = (companyData) => {
    setSelectedCompanies((prev) =>
      prev.filter((company) => company.id !== companyData.id)
    );
  };

  return (
    isOpen && (
      <main className={styles.container}>
        <ModalTopBar onClose={handleCloseWindow}>{title}</ModalTopBar>
        <Search
          startups={companyList}
          onFilteredData={setSearchResults}
          onClearSearch={() => setSearchResults(companyList.slice(0, 3))}
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
                onSelect={handleCompanySelect}
                onDeselect={handleCompanyDeselect}
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
                onSelect={handleCompanySelect}
                selectedCompanies={selectedCompanies}
              />
            );
          }

          // default = 검색결과
          return (
            <SearchResult
              key={type}
              companyList={searchResults}
              titleType={type}
              onSelect={handleCompanySelect}
              onDeselect={handleCompanyDeselect}
              selectedCompanies={selectedCompanies}
            />
          );
        })}
      </main>
    )
  );
}
export default CompanySelectionModal;
