import axios from "./axiosInstance.api.js";

// 특정 기업 정보 조회 by id
export const getCompanyById = async (id) => {
  const res = await axios.get(`/companies/${id}`);
  return res.data;
};

// 나의기업, 비교기업 선택 시 선택 횟수 증가
//  myCompanyId: 선택된 내 기업 ID
//  compareCompanyIds: 비교 대상으로 선택된 기업 ID 배열 (최대 5개)
export const increaseCompanyCompareCount = async ({
  myCompanyId,
  compareCompanyIds,
}) => {
  return await axios.post("/companies/increase-selection", {
    myCompanyId,
    compareCompanyIds,
  });
};