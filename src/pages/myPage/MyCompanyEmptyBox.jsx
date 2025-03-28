import React from "react";
import btnPlus from "../../assets/btn_plus.png";
import style from "./MyCompanyEmptyBox.module.scss";

function MyCompanyEmptyBox() {
  return (
    <div className={style.outerBox}>
      <div className={style.selectBox}>
        <button className={style.plusImgBtn} onClick={handleAddClick}>
          <img src={btnPlus} alt="기업 추가 버튼" />
          <span className={style.plusTxt}>기업 추가</span>
        </button>
      </div>
    </div> 
  );
}

export default MyCompanyEmptyBox;
