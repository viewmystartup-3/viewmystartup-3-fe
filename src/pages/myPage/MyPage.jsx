import React, { useState } from "react";
import { RoundButton, ResetButton } from "../../components/buttons/Buttons";
import MyCompanySection from "./MyCompanySection";
import style from "./MyPage.module.scss";
import CompareSection from "./CompareSection";

function MyPage() {
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);

  const showResetButton = myCompany && compareCompanies.length > 0;

  //초기화
  const handleReset = () => {
    setMyCompany(null);
    setCompareCompanies([]);
  };
  // 비교 기업 추가 (1~5개까지 중복 방지)
  const handleAddCompareCompany = (company) => {
    setCompareCompanies((prev) => {
      if (prev.length >= 5 || prev.some((c) => c.id === company.id)) {
        return prev;
      }
      return [...prev, company];
    });
  };
  // 비교 기업 제거 수영가야해ㅐ해해해해해해해
  const handleRemoveCompareCompany = (id) => {
    setCompareCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main>
      <MyCompanySection
        myCompany={myCompany}
        setMyCompany={setMyCompany}
        showResetButton={showResetButton}
        onReset={handleReset}
      />

      {/* 나의 기업을 선택하면 비교 영역 노출 */}
      {myCompany && (
        <CompareSection
          compareCompanies={compareCompanies}
          onAddCompareCompany={handleAddCompareCompany}
          onRemove={handleRemoveCompareCompany}
        />
      )}

      {/* 기업 비교하기 버튼 (활성 조건: 최소 1개 선택 시) */}
      <div className={style.compareBtn}>
        <RoundButton disabled={compareCompanies.length === 0}>
          기업 비교하기
        </RoundButton>
      </div>
    </main>
  );
}

export default MyPage;
