import React, { useState } from "react";
import InvestmentList from "../../components/investmentList/InvestmentList";
import styles from "./InvestmentStatusPage.module.scss";
import SelectBox from "../../components/selectBox/SelectBox";
import { viewMyStartupOptions } from "../../components/selectBox/sortOptions";
import axios from "axios";
import { dataUrl } from "../../env";

const InvestmentStatusPage = () => {
  const [selectedSortValue, setSelectedSortValue] = useState("investment_desc");
  const [investmentData, setInvestmentData] = useState([]); // 데이터를 관리할 상태

  // SelectBox에서 값이 변경되면 호출되는 함수
  const handleSelectChange = (newSortValue) => {
    setSelectedSortValue(newSortValue); // 선택된 값 상태 업데이트

    // axios 요청을 보내고, 성공/실패 처리
    axios
      .get(`${dataUrl}/api/companies?sort=${newSortValue}`)
      .then((res) => {
        console.log("정렬된 회사 목록:", res.data);
        setInvestmentData(res.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        // 요청 실패 시 처리
        if (error.response) {
          console.error("서버 오류:", error.response.data);
        } else if (error.request) {
          console.error("응답을 받지 못했습니다:", error.request);
        } else {
          console.error("요청 설정 오류:", error.message);
        }
        alert("요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      });
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>투자 현황</h1>
        <SelectBox
          size="large"
          options={viewMyStartupOptions}
          defaultValue={selectedSortValue}
          onChange={handleSelectChange} // 셀렉트박스에서 값이 변경되면 호출
        />
      </div>
      <InvestmentList startups={investmentData} />{" "}
      {/* 가져온 데이터를 InvestmentList로 전달 */}
    </div>
  );
};

export default InvestmentStatusPage;
