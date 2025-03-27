import React from "react";
import SelectBox from "../components/selectBox/SelectBox";
import axios from "axios";
import {
  basicSortOptions,
  myCompanySelectOptions,
  viewMyStartupOptions,
} from "../components/selectBox/sortOptions";

function Temporary() {
  return (
    <div>
      <h2>필터 박스 테스트</h2>
      <SelectBox
        size="small"
        options={basicSortOptions}
        defaultValue="investment_desc"
        onChange={(value) => {
          axios
            .get(
              `https://port-0-viewmystartup-3-m8ml2ohm3e1c28b1.sel4.cloudtype.app/api/companies?sort=${value}`
            )
            .then((res) => {
              console.log("정렬된 회사 목록:", res.data);
            });
        }}
      />
    </div>
  );
}

export default Temporary;
