import React from "react";
import SelectBox from "../../components/selectBox/SelectBox";
import axios from "axios";

const options = [
  { label: "누적 투자금액 높은순", value: "investment_desc" },
  { label: "누적 투자금액 낮은순", value: "investment_asc" },
  { label: "매출액 높은순", value: "revenue_desc" },
  { label: "매출액 낮은순", value: "revenue_asc" },
  { label: "고용 인원 많은순", value: "employee_desc" },
  { label: "고용 인원 적은순", value: "employee_asc" },
];

function Temporary() {
  return (
    <div>
      <SelectBox
        options={options}
        defaultValue="investment_desc"
        onChange={(value) => {
          axios.get(`http://localhost:5000/api/companies?sort=${value}`).then(res =>{
            console.log("정렬된 회사 목록:", res.data)
          })
        }}
      />
    </div>
  );
}

export default Temporary;
