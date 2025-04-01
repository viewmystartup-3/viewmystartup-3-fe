import React, { useState, useEffect } from "react";
import styles from "./SelectFrame.module.scss";
import { ModalButton, ModalCancelButton } from "../../buttons/Buttons";

function SelectFrame({
  company,
  onSelect,
  onDeselect,
  titleType,
  selectedCompanies,
  onClose,
}) {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const isDisabled = selectedCompanies.length >= 5 && !isItemSelected; // 5개 초과되면 버튼 비활성화

  useEffect(() => {
    const isSelected = (selectedCompanies || []).some(
      (selectedCompany) => selectedCompany.id === company.id
    );
    setIsItemSelected(isSelected);
  }, [selectedCompanies, company.id]);

  const handleButton = () => {
    if (isDisabled && !isItemSelected) return;

    if (isItemSelected) {
      // 선택 해제
      if (onDeselect) {
        onDeselect(company);
        setIsItemSelected(false);
      }
    } else {
      // 선택 추가
      if (onSelect && !isItemSelected) {
        onSelect(company); //선택한 기업 전달
        setIsItemSelected(true);
        // onClose(); //모달창 닫기
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.companyContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={company.imageUrl}
            alt={company.name}
          />
        </div>
        <p className={styles.title}>{company.name}</p>
        <p className={styles.category}>{company.category}</p>
      </div>
      {titleType === "selectedCompany" ? (
        <ModalCancelButton onDeselect={handleButton}>
          선택 해제
        </ModalCancelButton>
      ) : (
        <ModalButton
          isSelected={isItemSelected}
          onSelect={handleButton}
          disabled={isDisabled}
        />
      )}
    </section>
  );
}

export default SelectFrame;
