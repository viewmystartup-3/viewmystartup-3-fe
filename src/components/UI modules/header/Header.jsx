import React from "react";
import { NavLink } from "react-router-dom";
import pcLogo from "../../../assets/pc_logo.png";
import mobileLogo from "../../../assets/mobile_logo.png";
import styles from "./Header.module.scss";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/">
          <picture>
            <source srcSet={mobileLogo} alt="logo" media="(max-width: 743px)" />
            <img src={pcLogo} alt="logo" />
          </picture>
        </NavLink>
        <nav>
          <ul className={styles.ul}>
            <li>
              <NavLink
                to="/my-company"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                나의 기업 비교
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comparison"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                비교 현황
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/investment"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                투자 현황
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className={styles.headerHeight}></div>
    </>
  );
}

export default Header;
