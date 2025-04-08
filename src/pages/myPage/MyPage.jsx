import React, { useState } from "react";
import { RoundButton, SimpleButton } from "../../components/buttons/Buttons";
import MyCompanySection from "./MyCompanySection";
import style from "./MyPage.module.scss";
import CompareSection from "./CompareSection";
import ResultTable from "./myPageTable/ResultTable.jsx";
import RankingCheckTable from "./myPageTable/RankingCheckTable.jsx";
import InvestModal from "../../components/modals/investModal/InvestModal";
import SuccessModal from "../../components/modals/investModal/SuccessModal";
import { increaseCompanyCompareCount } from "../../api/company.api";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [showResultTable, setShowResultTable] = useState(false); // 표가 뜨게 하는 state //RankingCheckTable
  const [isModalOpen, setIsModalOpen] = useState(false); // InvestModal 상태
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 투자 완료 모달 상태

  const showResetButton =
    myCompany && compareCompanies.length > 0 && !showResultTable;

  // 모달 열기
  const openModal = () => setIsModalOpen(true); // InvestModal 열기
  const closeModal = () => setIsModalOpen(false); // InvestModal 닫기
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false); // 투자 완료 모달 닫기
    if (myCompany?.id) {
      navigate(`/companies/${myCompany.id}`);
    }
  };

  // 투자 완료 후 모달 열기
  const handleInvestSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

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

  // 비교하기 버튼 클릭하면 표(ResultTable)보이고 횟수증가
  const handleCompareButton = async () => {
    try {
      //1. API 호출로 선택 카운트 증가
      await increaseCompanyCompareCount({
        myCompanyId: myCompany.id,
        compareCompanyIds: compareCompanies.map((c) => c.id),
      });
      setShowResultTable(true);
    } catch (e) {
      console.error("기업 선택 카운트 증가 실패:", e);
    }
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
      {(myCompany || compareCompanies.length > 0) && !showResultTable && (
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
            isActive={compareCompanies.length > 0}
          >
            기업 비교하기
          </RoundButton>
        </div>
      )}

      {/* ResultTable 2개 불러오기 */}
      {showResultTable && (
        <>
          <ResultTable
            myCompany={myCompany}
            compareCompanies={compareCompanies}
          />
          <RankingCheckTable myCompany={myCompany} />

          <div className={style.investBtn}>
            <SimpleButton onClick={openModal} size="md">
              나의 기업에 투자하기
            </SimpleButton>
          </div>
        </>
      )}

      {/* 투자 모달들 */}
      <InvestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInvestSuccess={handleInvestSuccess}
        targetCompany={myCompany}
      />
      {/* 투자 완료 모달 */}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </main>
  );
}

export default MyPage;
