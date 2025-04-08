import axios from "./axiosInstance.api.js";

//모든 기업 리스트 가져오기
export const getAllCompanies = async () => {
  const res = await axios.get("/companies");
  return res.data;
};

// 정렬 조건으로 전체 기업 목록 조회 (기본: 누적투자금액 높은순)
export const getAllCompaniesSorted = async (sort = "realInvestmentAmount_desc") => {
  const res = await axios.get(`/companies`, {
    params: { sort },
  });
  return res.data;
};

// 여러 ID 기반 기업 목록을 정렬 기준에 따라 조회
export const getCompaniesByIdsSorted = async (ids, sort) => {
  const res = await axios.get(`/companies`, {
    params: { ids: ids.join(","), sort },
  });
  return res.data;
};

// 특정 기업 정보 조회 by id
export const getCompanyById = async (id) => {
  const res = await axios.get(`/companies/${id}`);
  return res.data;
};

/** ----------------------------------
 *  기업 선택 카운트 증가 관련 API
 * ----------------------------------*/
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
