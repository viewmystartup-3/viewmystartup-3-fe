import React from "react";
import { Link } from "react-router-dom";
import pcLogo from "../../assets/pc_logo.png";
import mobileLogo from "../../assets/mobile_logo.png";
import "./Header.css";
import { BasicButton, RestartButton, RoundButton } from "../buttons/Buttons";

function Header() {
  return (
    <>
      <header>
        <Link to="/">
          <picture>
            <source srcSet={mobileLogo} alt="logo" media="(max-width: 743px)" />
            <img src={pcLogo} alt="logo" />
          </picture>
        </Link>
        <nav>
          <ul>
            <Link to="/" className="headerLink">
              <li>나의 기업 비교</li>
            </Link>
            <Link to="/" className="headerLink">
              <li>비교 현황</li>
            </Link>
            <Link to="/" className="headerLink">
              <li>투자 현황</li>
            </Link>
          </ul>
        </nav>
        <RoundButton>비교</RoundButton>
        <RestartButton>다시</RestartButton>
        <BasicButton>시작</BasicButton>
      </header>
      <div className="headerHeight"></div>
    </>
  );
}

export default Header;
