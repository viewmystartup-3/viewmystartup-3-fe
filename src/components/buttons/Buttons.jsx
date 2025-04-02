import React from "react";
import { useState } from "react";
import styles from "./Buttons.module.scss";
import checkIcon from "../../assets/ic_check.png";
import icCheckS from "../../assets/ic_check_s.png";
import { GrRotateLeft } from "react-icons/gr";
import { clsx } from "clsx";

// 안에 색이 차 있는 둥근 버튼
export function RoundButton({ children, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
    if (onClick) onClick();
  };

  return (
    <button
      className={clsx(styles.round, isActive && styles.active)}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}

// 둥근 버튼인데 살짝 작음
export function RoundSmallButton({ children, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
    if (onclick) onClick();
  };

  return (
    <button
      className={clsx(styles.roundSmall, isActive && styles.active)}
      onClick={handleButtonClick}
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
