import React from "react";
import styles from "./SearchResult.module.scss";
import SelectFrame from "./SelectFrame";

function SearchResult({ companyList, titleType }) {
  // 제목 설정
  const titleList = {
    latestCompany: "최근 선택된 기업",
    selectedCompany: "선택한 기업",
    result: "검색 결과",
  };

  // 본문
  return (
    <section>
      <h4 className={styles.title}>
        {titleList[titleType]}({companyList.length})
      </h4>
      {companyList.length > 0 ? (
        companyList.map((company) => (
          <SelectFrame
            key={company.id}
            imageUrl={company.imageUrl}
            name={company.name}
            category={company.category}
          />
        ))
      ) : (
        <p className={styles.text}>검색 결과가 없습니다.</p>
      )}
    </section>
  );
}

export default SearchResult;
