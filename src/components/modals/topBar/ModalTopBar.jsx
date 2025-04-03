import React from "react";
import xImg from "../../../assets/ic_delete.png"
import styles from "./ModalTopBar.module.scss";

function ModalTopBar({ children, onClose }) {
  return (
    <section className={styles.topBar}>
      <h3 className={styles.titleText}>{children}</h3>
      <button className={styles.xButton} onClick={onClose}>
        <img src={xImg}/>
      </button>
    </section>
  );
}

export default ModalTopBar;
