/* 버튼 사용 설명
- Round, RoundSmall:
  1) 공통: onClick 추가 필요
  2-1) 클릭하면 버튼이 사라질(다른 페이지로 넘어갈) 때 = disabled 없이 그냥 쓰면 됨
  2-2) 회색→주황색 색이 바뀔 때 = isDisabled 변수로 조건을 걸고, 버튼의 prop으로 disabled를 줄 것

- 
 */

import React from "react";
import { useState } from "react";
import styles from "./Buttons.module.scss";
import checkIcon from "../../assets/ic_check.png";
import icCheckS from "../../assets/ic_check_s.png";
import { GrRotateLeft } from "react-icons/gr";
import { clsx } from "clsx";

// 색깔 안 변하는 기본 버튼
export function SimpleButton({ children, onClick }) {
  const handleButtonClick = () => {
    if (onClick) onClick();
  };

  return (
    <button className={simple} onClick={handleButtonClick}>
      {children}
    </button>
  );
}

// 안에 색이 차 있는 둥근 버튼
export function RoundButton({ children, onClick, disabled }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    if (isActive || disabled) return;
    setIsActive(true);
    onClick();
  };

  return (
    <button
      className={clsx(styles.round, isActive && styles.active)}
      onClick={handleButtonClick}
      disabled={isActive}
    >
      {children}
    </button>
  );
}

// 둥근 버튼인데 살짝 작음
export function RoundSmallButton({ children, onClick, disabled }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    if (isActive || disabled) return;
    setIsActive(true);
    onClick();
  };

  return (
    <button
      className={clsx(styles.roundSmall, isActive && styles.active)}
      onClick={handleButtonClick}
      disabled={isActive}
    >
      {children}
    </button>
  );
}

// 초기화 버튼
export function ResetButton({ children, onReset }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
    if (onReset) onReset();
  };

  return (
    <button
      className={clsx(styles.restart, isActive && styles.active)}
      onClick={handleButtonClick}
    >
      <GrRotateLeft className={styles.restartIcon} />
      {children}
    </button>
  );
}

// 투자 모달창 닫는 버튼(일반 + Outline 버튼)
export function RoundOutlineButton({ children, onCancel }) {
  return (
    <button className={styles.roundOutline} onClick={onCancel}>
      {children}
    </button>
  );
}

// 모달창에 쓰는 선택 버튼
export function ModalButton({ isSelected = false, onSelect, disabled }) {
  const handleButtonClick = () => {
    if (isSelected || disabled) return;
    if (onSelect) onSelect();
  };

  return (
    <button
      className={clsx(styles.modalButton, isSelected && styles.active)}
      onClick={handleButtonClick}
      disabled={isSelected || disabled}
    >
      <picture>
        <source srcSet={icCheckS} media="(max-width: 744px)" />
        <img src={checkIcon} alt="체크 표시" className={styles.checkIcon} />
      </picture>
      {isSelected ? "선택완료" : "선택하기"}
    </button>
  );
}

// modal창에 쓰는 선택 해제 버튼
export function ModalCancelButton({ children, onDeselect }) {
  return (
    <button
      className={clsx(styles.modalButton, styles.cancel)}
      onClick={onDeselect}
    >
      {children}
    </button>
  );
}
