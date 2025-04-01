import React from "react";
import CompanySelectionModal from "./CompanySelectionModal";

export function MyCompanyModal() {
  return (
    <CompanySelectionModal
      title="나의 기업 선택하기"
      titleTypes={["latestCompany", "result"]}
    />
  );
}

export function OtherCompaniesModal() {
  return (
    <CompanySelectionModal
      title="비교할 기업 선택하기"
      titleTypes={["selectedCompany", "result"]}
    />
  );
}
