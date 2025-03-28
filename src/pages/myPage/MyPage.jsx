import React, { useState } from "react";
import btnPlus from "../../assets/btn_plus.png";
import { RoundButton } from "../../components/buttons/Buttons";
import style from "./MyCompanyEmptyBox.module.scss";
import CompanyCard from "./CompanyCard";

function MyPage() {
  const sampleCompany = {
    id: 1,
    name: "코드잇",
    category: "에듀워크",
    logo: "/images/logo.png",
  };

  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);

  const handleAddClick = () => {
    // TODO: 기업선택된거 안에 추가해야함.
    //예시용, 바로 기업 선택됨.
    setMyCompany(sampleCompany);
  };
  const handleAddCompareCompany = () => {
    if (compareCompanies.length >= 5) {
      return;
    }
    const newCompany = {
      ...sampleCompany,
      id: Date.now(),
    };

    setCompareCompanies([...compareCompanies, newCompany]);
  };

  return (
    <main className={style.wrapper}>
      <section>
        <h2 className={style.sectionTitle}>나의 기업을 선택해 주세요!</h2>

        <div>
          {/* 선택전상태 */}
          {!myCompany ? (
            <div className={style.outerBox}>
              <div className={style.selectBox}>
                <button className={style.plusImgBtn} onClick={handleAddClick}>
                  <img src={btnPlus} alt="기업 추가 버튼" />
                  <span className={style.plusTxt}>기업 추가</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img src={myCompany.logo} alt={myCompany.name} />
              <p>{myCompany.name}</p>
              <span>{myCompany.category}</span>
              <button onClick={() => setMyCompany(null)}>선택 취소</button>
            </div>
          )}

          {/* 선택 후 상태 */}
          {myCompany && (
            <section>
              <h2>어떤 기업이 궁금하세요?</h2>
              <div>
                {compareCompanies.length === 0 ? (
                  <p>
                    아직 추가한 기업이 없어요.
                    <br />
                    버튼을 눌러 기업을 추가해보세요!
                  </p>
                ) : (
                  <div>
                    {compareCompanies.map((company) => {
                      return (
                        <div key={company.id}>
                          <img src={company.logo} alt={company.name} />
                          <p>{company.name}</p>
                          <span>{company.category}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <RoundButton className={style.compareBtn} onClick={handleAddCompareCompany}>
                  기업 추가하기
                </RoundButton>
              </div>
            </section>
          )}
        </div>
      </section>

      {/* 기업 비교하기 버튼 (활성 조건: 최소 1개 선택 시) */}
      <div className={style.compareBtn}>
        <RoundButton disabled={compareCompanies.length === 0}>
          기업 비교하기
        </RoundButton>
      </div>
      <CompanyCard/>
    </main>
  );
}

export default MyPage;
