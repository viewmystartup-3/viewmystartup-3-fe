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

  useEffect(() => {
    const isSelected = (selectedCompanies || []).some(
      (selectedCompany) => selectedCompany.id === company.id
    );
    setIsItemSelected(isSelected);
  }, [selectedCompanies, company.id]);

  const handleButton = () => {
    console.log("버튼 클릭됨 ✅");
    console.log("onSelect is", onSelect); // ✅ 함수로 찍히는지?
    if (isItemSelected) {
      // 선택 해제
      if (onDeselect) {
        onDeselect(company);
        setIsItemSelected(false);
      }
    } else {
      // 선택 추가
      if (onSelect && !isItemSelected) {
        console.log("회사 선택됨 ✅", company); // 여기도 찍어보자
        onSelect(company); //선택한기업 전달달
        setIsItemSelected(true);
        onClose?.(); //모달닫기기
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
        <ModalButton isSelected={isItemSelected} onSelect={handleButton} />
      )}
    </section>
  );
}

export default SelectFrame;
