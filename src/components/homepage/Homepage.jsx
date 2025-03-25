import { useState, useEffect } from "react";
import Header from "../header/Header.jsx";
import StartupList from "../startupList/StartupList.jsx";
import { dataUrl } from "../../env.js";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const [startupList, setStartupList] = useState([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 페이지 데이터 가져오기
  const fetchStartupList = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetch(`${dataUrl}/api/companies`);
      const data = await response.json();

      if (Array.isArray(data)) {
        // 필터링 없이 전체 데이터 사용
        setStartupList(data);
      } else if (data && Array.isArray(data.companies)) {
        // 필터링 없이 전체 데이터 사용
        setStartupList(data.companies);
      } else {
        console.error("No companies data in response", data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  useEffect(() => {
    fetchStartupList(); // 데이터 가져오기
  }, []); // 컴포넌트가 마운트될 때 한번만 호출

  return (
    <div>
      <Header />
      <div className={styles.homepageForm}>
        <div className={styles.homepageHeader}>
          <h1>전체 스타트업 목록</h1>
          <div className={styles.headerComponents}>
            <div className={styles.componentSearch}>
              <input type="text" placeholder="검색어를 입력해주세요" />
            </div>
            <div className={styles.componentsFilter}>
              <select>
                <option value="High">매출액 높은순</option>
              </select>
            </div>
          </div>
        </div>
        {/* List 컴포넌트 */}
        <StartupList loading={loading} startupList={startupList} />
      </div>
    </div>
  );
};

export default Homepage;
