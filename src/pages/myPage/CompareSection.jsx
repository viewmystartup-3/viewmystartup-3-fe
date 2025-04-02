import React, { useState } from "react";
import { RoundSmallButton } from "../../components/buttons/Buttons";
import style from "./CompareSection.module.scss";
import Card from "./Card";
import { OtherCompaniesModal } from "../../components/modals/select/Modals";

function CompareSection({ compareCompanies, onRemove, onAddCompareCompany }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleSelectCompany = (company) => {
    const mappedCompany = {
      id: company.id,
      name: company.name,
      category: company.category,
      imageUrl: company.imageUrl,
    };

    // 모달 제어
    onAddCompareCompany(mappedCompany); // 부모(MyPage)로 전달
    // setIsModalOpen(false); // 모달 닫기
  };

  return (
    <section className={style.section}>
      <div className={style.comparePart}>
        <h2 className={style.sectionTitle}>
          어떤 기업이 궁금하세요? <span>(최대 5개)</span>
        </h2>
        <RoundSmallButton
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          기업 추가하기
        </RoundSmallButton>
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
            {console.log("🔍 compareCompanies:", compareCompanies)}

            {compareCompanies.map((company) => {
              return (
                <Card
                  key={company.id}
                  id={company.id}
                  imageUrl={company.imageUrl}
                  name={company.name}
                  category={company.category}
                  onRemove={() => onRemove(company.id)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <OtherCompaniesModal
          selectedCompanies={compareCompanies}
          onSelect={handleSelectCompany}
          onDeselect={(company) => onRemove(company.id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}

export default CompareSection;
