import React, { useState } from "react";
import style from "./MyCompanySection.module.scss";
import btnPlus from "../../assets/btn_plus.png";
import Card from "./Card";
import { MyCompanyModal } from "../../components/modals/select/Modals";
import { ResetButton } from "../../components/buttons/Buttons";

function MyCompanySection({
  myCompany,
  setMyCompany,
  showResetButton,
  onReset,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleSelectCompany = (company) => {
    const mappedCompany = {
      id: company.id,
      name: company.name,
      category: company.category,
      imageUrl: company.imageUrl,
    };

    // 모달 제어
    setMyCompany(mappedCompany); // 여기서 선택된 기업 외부 상태에 저장
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <section className={style.wrapper}>
      <div className={style.seungjun}>
        <h2 className={style.sectionTitle}>나의 기업을 선택해 주세요!</h2>

        {/* 전체 초기화 버튼 조건부 렌더링 */}
        {showResetButton && (
          <ResetButton onReset={onReset}>전체 초기화</ResetButton>
        )}
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
            <button
              className={style.cancelBtn}
              onClick={() => setMyCompany(null)}
            >
              선택 취소
            </button>
            <Card
              imageUrl={myCompany.imageUrl}
              name={myCompany.name}
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
        />
      )}
    </section>
  );
}

export default MyCompanySection;
