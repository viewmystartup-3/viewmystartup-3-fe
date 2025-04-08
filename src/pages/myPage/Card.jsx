import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import style from "./Card.module.scss";

function Card({ imageUrl, name, category, onRemove, className }) {
  console.log("🧩 Card props:", { imageUrl, name, category });
  return (
    <div className={`${className} ${style.card}`}>
      {onRemove && (
        <button className={style.removeBtn} onClick={onRemove}>
          <AiOutlineMinus />
        </button>
      )}
      <div className={style.logoWrapper}>
        <img
          src={imageUrl}
          alt={`${name} 로고`}
          className={style.logo}
        />
      </div>
      <div className={style.name}>{name}</div>
      <div className={style.category}>{category}</div>
    </div>
  );
}

export default Card;
