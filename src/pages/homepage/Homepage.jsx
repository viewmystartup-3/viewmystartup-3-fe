import React from "react";
import StartupList from "../../components/startupList/StartupList";
import styles from "../homepage/page.module.scss";

const Homepage = () => {
  return (
    <div>
      <div className={styles.form}>
        <div className={styles.header}>
          <h1>전체 스타트업 목록</h1>
          <div className={styles.components}>
            <input type="text" placeholder="검색어를 입력해주세요" />
            <select>
              <option value="High">매출액 높은순</option>
            </select>
          </div>
        </div>
        {/* List 컴포넌트 */}
        <StartupList />
      </div>
    </div>
  );
};

export default Homepage;
