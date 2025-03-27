import React, { useState } from "react";
import styles from "./SelectFrame.module.scss";
import { ModalButton } from "../../buttons/Buttons";

function SelectFrame({ imageUrl, name, category }) {
  const [isItemSelected, setIsItemSeleted] = useState(false);

  const handleButton = () => {
    setIsItemSeleted((prev) => !prev);
  };

  return (
    <section className={styles.container}>
      <div className={styles.companyContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageUrl} alt={name} />
        </div>
        <p className={styles.title}>{name}</p>
        <p className={styles.category}>{category}</p>
      </div>
      <ModalButton isSelected={isItemSelected} onSelect={handleButton} />
    </section>
  );
}

export default SelectFrame;
