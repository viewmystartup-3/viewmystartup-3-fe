import React from "react";
import styles from "./ModalTopBar.module.scss";
import icDelete from "./../../../assets/ic_delete.png";

function ModalTopBar({ children, onClose }) {
  return (
    <section className={styles.topBar}>
      <h3 className={styles.titleText}>{children}</h3>
      <button className={styles.xButton} onClick={onClose}>
        <img src={icDelete} />
      </button>
    </section>
  );
}

export default ModalTopBar;
