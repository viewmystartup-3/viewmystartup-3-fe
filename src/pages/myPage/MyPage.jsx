import React, { useState } from "react";
import { RoundButton } from "../../components/buttons/Buttons";
import MyCompanySection from "./MyCompanySection";
import style from "./MyPage.module.scss";
import CompareSection from "./CompareSection";
import ResultTable from "../../components/myPageTable/ResultTable";
import RankingCheckTable from "../../components/myPageTable/RankingCheckTable";

function MyPage() {
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [showResultTable, setShowResultTable] = useState(false); // 표가 뜨게 하는 state //RankingCheckTable

  const showResetButton =
    myCompany && compareCompanies.length > 0 && !showResultTable;

  //초기화
  const handleReset = () => {
    setMyCompany(null);
    setCompareCompanies([]);
    setShowResultTable(false);
  };

  const handleResetCompareOnly = () => {
    setCompareCompanies([]);
    setShowResultTable(false);
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

  // 비교 기업 제거
  const handleRemoveCompareCompany = (id) => {
    setCompareCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  // 비교하기 버튼 클릭하면 표(ResultTable)가 보기에 함
  const handleCompareButton = () => {
    setShowResultTable(true);
  };

  return (
    <main>
      <MyCompanySection
        myCompany={myCompany}
        setMyCompany={setMyCompany}
        showResetButton={showResetButton}
        onReset={handleReset}
        onResetCompareOnly={handleResetCompareOnly}
        showResultTable={showResultTable}
      />

      {/* 나의 기업을 선택하면 비교 영역 노출 */}
      {myCompany && !showResultTable && (
        <CompareSection
          compareCompanies={compareCompanies}
          onAddCompareCompany={handleAddCompareCompany}
          onRemove={handleRemoveCompareCompany}
        />
      )}

      {/* 기업 비교하기 버튼 (활성 조건: 최소 1개 선택 시) */}
      {myCompany && !showResultTable && (
        <div className={style.compareBtn}>
          <RoundButton
            onClick={handleCompareButton}
            disabled={compareCompanies.length === 0}
          >
            기업 비교하기
          </RoundButton>
        </div>
      )}

      {/*  TODO: ResultTable 2개 불러오기 */}
      {showResultTable && (
        <>
          <ResultTable
            myCompany={myCompany}
            compareCompanies={compareCompanies}
          />
          {/* RankingCheckTable 불러오기
          <RankingCheckTable myCompany={myCompany} /> */}

          <div className={style.investBtn}>
            <RoundButton onClick={() => console.log("투자하기 클릭!")}>
              나의 기업에 투자하기
            </RoundButton>
          </div>
        </>
      )}

      {/* RankingCheckTable 불러오기 */}
      {showResultTable && <RankingCheckTable myCompany={myCompany} />}
    </main>
  );
}

export default MyPage;
