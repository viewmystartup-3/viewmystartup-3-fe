import React, { useState } from "react";
import { RoundButton } from "../../components/buttons/Buttons";
import MyCompanySection from "./MyCompanySection";
import style from "./MyPage.module.scss";
import CompareSection from "./CompareSection";

function MyPage() {
  const sampleCompany = {
    id: 1,
    name: "코드잇",
    category: "에듀워크",
    logo: "/images/logo.png",
  };

  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);

  const handleAddCompareCompany = () => {
    if (compareCompanies.length >= 5) {
      return;
    }
    const count = compareCompanies.length + 1;

    const newCompany = {
      id: Date.now(), // 고유 ID
      name: `코드잇 ${count}`, // 이름을 달리함
      category: "에듀워크",
      logo: "/images/logo.png",
    };

    setCompareCompanies([...compareCompanies, newCompany]);
  };

  return (
    <main>
      <MyCompanySection
        myCompany={myCompany}
        setMyCompany={setMyCompany}
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
