import React from "react";
import styles from "./SelectFrame.module.scss";
import { ModalButton, ModalCancelButton } from "../../buttons/Buttons";

function SelectFrame({
  company,
  onSelect,
  onDeselect,
  titleType,
  selectedCompanies,
}) {
  const isItemSelected = (selectedCompanies || []).some(
    (selectedCompany) => selectedCompany.id === company.id
  );

  const isDisabled = (selectedCompanies.length ?? 0) >= 5 && !isItemSelected; // 5개 초과되면 버튼 비활성화

  const handleButton = () => {
    if (isDisabled && !isItemSelected) return;

    if (isItemSelected) {
      onDeselect(company);
    } else {
      onSelect(company);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.companyContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={company.imageUrl}
            alt={company.companyName}
          />
        </div>
        <p className={styles.title}>{company.companyName}</p>
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
