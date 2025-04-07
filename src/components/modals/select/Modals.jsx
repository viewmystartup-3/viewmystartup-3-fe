import React from "react";
import CompanySelectionModal from "./CompanySelectionModal";

/**
 *
 * 나의 기업 선택 모달
 */
export function MyCompanyModal({ onSelect, onClose, myCompany }) {
  return (
    <CompanySelectionModal
      title="나의 기업 선택하기"
      titleTypes={["latestCompany", "result"]}
      onSelect={onSelect}
      onClose={onClose}
      myCompany={myCompany}
    />
  );
}

/**
 *
 * 비교할 기업 선택 모달
 */
export function OtherCompaniesModal({
  selectedCompanies,
  onSelect,
  onDeselect,
  onClose,
  myCompany,
}) {
  return (
    <CompanySelectionModal
      title="비교할 기업 선택하기"
      titleTypes={["selectedCompany", "result"]}
      selectedCompanies={selectedCompanies}
      onSelect={onSelect}
      onDeselect={onDeselect}
      onClose={onClose}
      myCompany={myCompany}
    />
  );
}
