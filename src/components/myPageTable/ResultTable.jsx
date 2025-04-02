import React from "react";
import styles from "./ResultTable.module.scss";
import SelectBox from "../../components/selectBox/SelectBox";
import { basicSortOptions } from "../../components/selectBox/sortOptions";

function ResultTable() {
  return (
    <section className={styles.form}>
      <div className={styles.header}>
        <h4 className={styles.title}>비교 결과 확인하기</h4>
        <SelectBox options={basicSortOptions} />
      </div>
    </section>
  );
}

export default ResultTable;
