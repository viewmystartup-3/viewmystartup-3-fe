import React from "react";
import style from "./MyCompanySection.module.scss";
import btnPlus from "../../assets/btn_plus.png";
import CompanyCard from "./Card";

function MyCompanySection({ myCompany, setMyCompany, onAddClick }) {
  return (
    <section className={style.wrapper}>
      <h2 className={style.sectionTitle}>나의 기업을 선택해 주세요!</h2>

      <div>
        {/* 선택전상태 */}
        {!myCompany ? (
          <div className={style.outerBox}>
            <div className={style.selectBox}>
              <button className={style.plusImgBtn} onClick={onAddClick}>
                <img src={btnPlus} alt="기업 추가 버튼" />
                <span className={style.plusTxt}>기업 추가</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={style.selectedBox}>
            <button className={style.cancelBtn} onClick={() => setMyCompany(null)}>선택 취소</button>
            <CompanyCard
              logo={myCompany.logo}
              name={myCompany.name}
              category={myCompany.category}
              className={style.myCard} // ← 스타일 다르게 주고 싶으면 여기서 조절
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default MyCompanySection;
