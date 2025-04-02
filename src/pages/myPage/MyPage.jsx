import React, { useState } from "react";
import { RoundButton } from "../../components/buttons/Buttons";
import MyCompanySection from "./MyCompanySection";
import style from "./MyPage.module.scss";
import CompareSection from "./CompareSection";

function MyPage() {
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);

  const showResetButton = myCompany && compareCompanies.length > 0;

  const handleAddCompareCompany = (company) => {
    if (compareCompanies.length >= 5) return;
    setCompareCompanies((prev) => [...prev, company]);
  };
  const handleReset = () => {
    setMyCompany(null);
    setCompareCompanies([]);
  };

  return (
    <main>
      <MyCompanySection
        myCompany={myCompany}
        setMyCompany={setMyCompany}
        showResetButton={showResetButton}
        onReset={handleReset}
      />

      {/* 선택 후 상태 */}
      {myCompany && (
        <CompareSection
          compareCompanies={compareCompanies}
          onRemove={(id) =>
            setCompareCompanies(compareCompanies.filter((c) => c.id !== id))
          }
          onAddCompareCompany={handleAddCompareCompany}
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
