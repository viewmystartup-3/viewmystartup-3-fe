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
