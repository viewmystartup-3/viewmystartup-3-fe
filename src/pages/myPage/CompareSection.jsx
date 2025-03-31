import React from "react";
import { RoundButton } from "../../components/buttons/Buttons";
import style from "./CompareSection.module.scss";
import Card from "./Card";

function CompareSection({ compareCompanies, onRemove, onAddCompareCompany }) {
  return (
    <section className={style.section}>
      <div className={style.compareBtn}>
        <h2 className={style.sectionTitle}>
          어떤 기업이 궁금하세요? <span>(최대 5개)</span>
        </h2>
        <RoundButton
          onClick={() => {
            console.log("버튼눌림");
            onAddCompareCompany();
          }}
        >
          기업 추가하기
        </RoundButton>
      </div>

      <div>
        {compareCompanies.length === 0 ? (
          <div className={style.selectBox}>
            <p className={style.emptyMsg}>
              아직 추가한 기업이 없어요,
              <br />
              버튼을 눌러 기업을 추가해보세요!
            </p>
          </div>
        ) : (
          <div className={style.selectBox}>
            {compareCompanies.map((company) => {
              return (
                <Card
                  id={company.id}
                  logo={company.logo}
                  name={company.name}
                  category={company.category}
                  onRemove={() => onRemove(company.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default CompareSection;
