import React from "react";
import { useState } from "react";
import "./Buttons.css";
import icCheck from "../../assets/ic_check.png";
import icCheckS from "../../assets/ic_check_s.png";
import { GrRotateLeft } from "react-icons/gr";

// 안에 색이 차 있는 둥근 버튼
export function RoundButton({ children }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((previous) => !previous);
  };

  return (
    <button
      className={`roundButton ${isActive ? "active" : ""}`}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}

// 안에 색 없는 둥근 버튼
export function RoundOutlineButton({ children }) {
  return <button className="roundOutlineButton">{children}</button>;
}

// 초기화 버튼
export function RestartButton({ children }) {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive((previous) => !previous);
  };

  return (
    <button
      className={`restartButton ${isActive ? "active" : ""}`}
      onClick={handleButtonClick}
    >
      <GrRotateLeft className="restartIcon" />
      {children}
    </button>
  );
}

// modal창에 쓰는 선택 버튼
export function ModalButton({ children }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((previous) => !previous);
  };

  return (
    <button
      className={`modalButton ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <picture>
        <source srcSet={icCheckS} media="(max-width: 743px)" />
        <img src={icCheck} alt="체크 표시" className="checkIcon" />
      </picture>
      {children}
    </button>
  );
}

// modal창에 쓰는 선택 취소 버튼
export function ModalCancelButton({ children }) {
  return <button className="modalButton cancel">{children}</button>;
}
