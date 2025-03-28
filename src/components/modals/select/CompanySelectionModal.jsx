import React, { useState, useEffect } from "react";
import styles from "./CompanySelectionModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import SearchResult from "./SearchResult";
import Search from "../../search/Search";
import axios from "axios";

function CompanySelectionModal({ title, addedComponent }) {
  const [isOpen, setIsOpen] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // 상단 바 x 눌러서 창 닫기
  const handleCloseWindow = () => {
    setIsOpen(false);
  };

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://port-0-viewmystartup-3-m8ml2ohm3e1c28b1.sel4.cloudtype.app/api/companies"
        );
        setCompanyList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    isOpen && (
      <main className={styles.container}>
        <ModalTopBar onClose={handleCloseWindow}>{title}</ModalTopBar>
        <Search
          startups={companyList}
          onFilteredData={setSearchResults}
          onClearSearch={() => setSearchResults(companyList.slice(0, 3))}
          isModal
        />
        <SearchResult companyList={searchResults} titleType="latestCompany" />
        {addedComponent && (
          <SearchResult companyList={searchResults} titleType="result" />
        )}
      </main>
    )
  );
}

export default CompanySelectionModal;
