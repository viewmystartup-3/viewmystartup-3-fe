import React, { useEffect, useState } from "react";
import style from "./MyCompanySection.module.scss";
import btnPlus from "../../assets/btn_plus.png";
import Card from "./Card";
import { MyCompanyModal } from "../../components/modals/select/Modals";
import {
  ResetButton,
  RoundSmallButton,
} from "../../components/buttons/Buttons";

function MyCompanySection({
  myCompany,
  setMyCompany,
  showResetButton,
  onReset,
  onResetCompareOnly,
  showResultTable,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleSelectCompany = (company) => {
    const mappedCompany = {
      id: company.id,
      companyName: company.companyName,
      category: company.category,
      imageUrl: company.imageUrl,
    };

    // 모달 제어
    setMyCompany(mappedCompany); // 여기서 선택된 기업 외부 상태에 저장
    setIsModalOpen(false); // 모달 닫기
  };

  // 최근 기록 저장(latestCompanies) <- localStorage 방식
  useEffect(() => {
    if (myCompany) {
      const store = JSON.parse(localStorage.getItem("latestCompanies") || "[]");

      // 중복 제거
      const updated = [
        myCompany,
        ...store.filter((company) => company.id !== myCompany.id),
      ];

      // 최대 3개까지 저장
      const limited = updated.slice(0, 3);

      localStorage.setItem("latestCompanies", JSON.stringify(limited));
    }
  }, [myCompany]);

  return (
    <section className={style.wrapper}>
      <div className={style.titleSection}>
        <h2 className={style.sectionTitle}>나의 기업을 선택해 주세요!</h2>

        {/* 전체 초기화 버튼 조건부 렌더링 */}
        {showResetButton ? (
          <ResetButton onReset={onReset}>전체 초기화</ResetButton>
        ) : showResultTable && myCompany ? (
          <div className={style.reCompareBtn}>
            <RoundSmallButton onClick={onResetCompareOnly}>
              다른 기업 비교하기
            </RoundSmallButton>
          </div>
        ) : null}
      </div>

      <div>
        {/* 선택전상태 */}
        {!myCompany ? (
          <div className={style.outerBox}>
            <div className={style.selectBox}>
              <button
                className={style.plusImgBtn}
                onClick={() => setIsModalOpen(true)} //버튼클릭시 모달 열고고
              >
                <img src={btnPlus} alt="기업 추가 버튼" />
                <span className={style.plusTxt}>기업 추가</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={style.selectedBox}>
            {!showResultTable && (
              <button
                className={style.cancelBtn}
                onClick={() => setMyCompany(null)}
              >
                선택 취소
              </button>
            )}
            <Card
              imageUrl={myCompany.imageUrl}
              name={myCompany.companyName}
              category={myCompany.category}
              className={style.myCard} // ← 스타일 다르게 주고 싶으면 여기서 조절
            />
          </div>
        )}
      </div>

      {/* 4. 모달 렌더링 */}
      {isModalOpen && (
        <MyCompanyModal
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectCompany} //myCompanyModal에서 선택한 기업 넘겨줄수 있도록!
          myCompany={myCompany}
        />
      )}
    </section>
  );
}

export default MyCompanySection;
