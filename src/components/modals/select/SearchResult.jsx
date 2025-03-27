import React, { useEffect, useState } from "react";
import styles from "./SearchResult.module.scss";
import SelectFrame from "./SelectFrame";
import axios from "axios";

function SearchResult({ searchName, titleType }) {
  const [companyList, setCompanyList] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://port-0-viewmystartup-3-m8ml2ohm3e1c28b1.sel4.cloudtype.app/api/companies"
        );
        console.log(response.data);
        setCompanyList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // 검색 설정
  const filteredCompanies = searchName
    ? companyList.filter(
        (company) => company.name && company.name.includes(searchName)
      )
    : [];

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
        {titleList[titleType]}({filteredCompanies.length})
      </h4>
      {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company, i) => (
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
