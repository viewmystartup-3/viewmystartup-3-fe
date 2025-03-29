import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import style from "./Card.module.scss";

function CompanyCard({ logo, name, category, onRemove, className }) {
  return (
    <div className={`${className} ${style.card}`}>
      {onRemove && (
        <button className={style.removeBtn} onClick={onRemove}>
          <AiOutlineMinus />
        </button>
      )}
      <div className={style.logoWrapper}>
        <img src={logo} alt={`${name} 로고`} className={style.logo} />
      </div>
      <div className={style.name}>{name}</div>
      <div className={style.category}>{category}</div>
    </div>
  );
}

export default CompanyCard;
