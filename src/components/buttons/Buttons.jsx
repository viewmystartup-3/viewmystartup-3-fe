import React from "react";
import styles from "./Buttons.module.scss";
import checkIcon from "../../assets/ic_check.png";
import icCheckS from "../../assets/ic_check_s.png";
import { GrRotateLeft } from "react-icons/gr";
import { clsx } from "clsx";

// 색깔 안 변하는 기본 버튼(RoundSmallButton과 디자인 같고, padding은 RoundButton과 같음)
export function SimpleButton({ children, onClick }) {
  return (
    <button className={styles.simple} onClick={onClick}>
      {children}
    </button>
  );
}

// 안에 색이 차 있는 둥근 버튼
export function RoundButton({ children, onClick, isActive = false, disabled }) {
  return (
    <button
      className={clsx(styles.round, isActive && styles.active)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// 작고 둥근 버튼
export function RoundSmallButton({ children, onClick }) {
  return (
    <button className={styles.roundSmall} onClick={onClick}>
      {children}
    </button>
  );
}

// 초기화 버튼
export function ResetButton({ children, onReset }) {
  return (
    <button className={styles.restart} onClick={onReset}>
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
