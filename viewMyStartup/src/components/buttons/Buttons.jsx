import React from "react";
import "./Buttons.css";
import icRestart from "./../../assets/ic_restart.png";

export function RoundButton({ children }) {
  return <button className="roundButton">{children}</button>;
}

export function RestartButton({ children }) {
  return (
    <button className="restartButton">
      <img src={icRestart} alt="재시작 버튼 이미지" className="buttonImg" />
      {children}
    </button>
  );
}

export function BasicButton({ children }) {
  return <button className="basicButton">{children}</button>;
}
