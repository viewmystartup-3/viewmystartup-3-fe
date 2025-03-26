import React from "react";
import styles from "./ModalTopBar.module.scss";

function ModalTopBar({ children, onClose }) {
  return (
    <section className={styles.topBar}>
      <h3 className={styles.titleText}>{children}</h3>
      <button className={styles.xButton} onClick={onClose}>
        X
      </button>
    </section>
  );
}

export default ModalTopBar;
