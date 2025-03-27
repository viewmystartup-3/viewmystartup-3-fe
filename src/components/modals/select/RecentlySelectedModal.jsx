import React, { useState } from "react";
import styles from "./RecentlySelectedModal.module.scss";
import ModalTopBar from "../topBar/ModalTopBar";
import SearchResult from "./SearchResult";

function ResentlySelectedModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchName, setSearchName] = useState("");

  const handleCloseWindow = () => {
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    isOpen && (
      <main className={styles.container}>
        <ModalTopBar onClose={handleCloseWindow}>
          나의 기업 선택하기
        </ModalTopBar>
        <input type="search" value={searchName} onChange={handleSearchChange} />
        <SearchResult searchName={searchName} titleType="latestCompany" />
      </main>
    )
  );
}

export default ResentlySelectedModal;
