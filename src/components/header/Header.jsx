import React from "react";
import { Link } from "react-router-dom";
import pcLogo from "../../assets/pc_logo.png";
import mobileLogo from "../../assets/mobile_logo.png";
import styles from "./Header.module.scss";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <picture>
            <source srcSet={mobileLogo} alt="logo" media="(max-width: 743px)" />
            <img src={pcLogo} alt="logo" />
          </picture>
        </Link>
        <nav>
          <ul className={styles.ul}>
            <Link to="/" className={styles.link}>
              <li>나의 기업 비교</li>
            </Link>
            <Link to="/comparison" className={styles.link}>
              <li>비교 현황</li>
            </Link>
            <Link to="/investment" className={styles.link}>
              <li>투자 현황</li>
            </Link>
          </ul>
        </nav>
      </header>

      <div className={styles.headerHeight}></div>
    </>
  );
}

export default Header;
