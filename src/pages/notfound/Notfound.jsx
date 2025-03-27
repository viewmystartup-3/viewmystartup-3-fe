import React from "react";
import { Link } from "react-router-dom"; // Link를 사용하여 홈으로 돌아가는 링크 추가
import styles from "./Notfound.module.scss";

const Notfound = () => {
  return (
    <div className={styles.notfoundForm}>
      <h1 className={styles.header}>404 - 페이지를 찾을 수 없습니다</h1>
      <p className={styles.message}>요청하신 페이지가 존재하지 않습니다.</p>
      <Link to="/" className={styles.link}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default Notfound;
