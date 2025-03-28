import React, { useState, useEffect } from "react";
import styles from "./InvestmentStatus.module.scss";
import axios from "axios";
import { dataUrl } from "../../env";
import { useParams } from "react-router-dom";
import { RoundButton } from "../buttons/Buttons";

const InvestmentStatus = () => {
  const { id } = useParams();
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false);

  // 투자 데이터 가져오기
  const fetchInvestment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${dataUrl}/api/companies/${id}/investments`,
        {
          params: {
            page: 1,
            limit: 10,
          },
        }
      );

      const sortedInvestments = response.data.sort(
        (a, b) => b.amount - a.amount
      );
      setInvestment(sortedInvestments);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 불러오기
  useEffect(() => {
    fetchInvestment();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <p>View My StartUP에서 받은 투자</p>
        <RoundButton>기업투자하기기</RoundButton>
      </div>
      <div>
        <p>총 200억 원</p>
        <div>
          <p>투자자 이름</p>
          <p>순위</p>
          <p>투자 금액</p>
          <p>투자 코멘트</p>
          <p> </p>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : investment.length > 0 ? (
          investment.map((inv, index) => (
            <div key={inv.id}>
              <p>{inv.name}</p>
              <p>{index + 1}위</p>
              <p>{inv.amount} 원</p>
              <p>{inv.comment || "코멘트 없음"}</p>
            </div>
          ))
        ) : (
          <p>투자자가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default InvestmentStatus;
