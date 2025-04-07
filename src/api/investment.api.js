import axios from "./axiosInstance.api.js";

// 투자 삭제 요청 (비밀번호 포함)
export const deleteInvestment = async (companyId, investorId, password) => {
  return await axios.delete(
    `companies/${companyId}/investments/${investorId}`,
    {
      data: { password },
    }
  );
};

// 투자 수정 권한 확인 (비밀번호 포함)
export const checkInvestmentPassword = async (
  companyId,
  investorId,
  password
) => {
  return await axios.post(
    `/companies/${companyId}/investments/${investorId}/password`,
    { password }
  );
};

// 특정 회사의 투자 목록 조회
export const getInvestmentByCompanyId = async (companyId) => {
  const res = await axios.get(`/companies/${companyId}/investments`);
  return res.data;
};

//투자 정보 수정 (patch)
export const updateInvestment = async (companyId, investorId, updatedData) => {
  const res = await axios.patch(
    `/companies/${companyId}/investments/${investorId}`,
    updatedData
  );
  return res.data;
};

//새로운 투자 등록
export const createInvestment = async (companyId, investmentData) => {
  const res = await axios.post(
    `/companies/${companyId}/investments`,
    investmentData
  );
  return res.data;
};
