import React from "react";
import CompanySelectionModal from "./CompanySelectionModal";

/**
 *
 * 나의 기업 선택 모달
 */
export function MyCompanyModal({ onSelect, onClose }) {
  return (
    <CompanySelectionModal
      title="나의 기업 선택하기"
      titleTypes={["latestCompany", "result"]}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
}

/**
 *
 * 비교할 기업 선택 모달
 */
export function OtherCompaniesModal({ onSelect, onClose }) {
  return (
    <CompanySelectionModal
      title="비교할 기업 선택하기"
      titleTypes={["selectedCompany", "result"]}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
}
