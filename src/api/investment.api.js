import axios from "./axiosInstance.api.js";

// 투자 삭제 요청 (accessCode 포함)
export const deleteInvestment = async (investmentId, accessCode) => {
  return await axios.delete(`/investments/${investmentId}`, {
    data: { accessCode },
  });
};

// 투자 수정 권한 확인 (accessCode 포함)
export const checkInvestmentPassword = async (investmentId, accessCode) => {
  return await axios.post(`/investments/${investmentId}/accessCode`, {
    accessCode,
  });
};

// 특정 회사의 투자 목록 조회
export const getInvestmentByCompanyId = async (companyId) => {
  const res = await axios.get(`/investments`, {
    params: { companyId },
  });
  return res.data;
};

//투자 정보 수정 (patch)
export const updateInvestment = async (investmentId, updatedData) => {
  const res = await axios.patch(`/investments/${investmentId}`, updatedData);
  return res.data;
};

//새로운 투자 등록
export const createInvestment = async (companyId, investmentData) => {
  const res = await axios.post(`/investments`, investmentData, {
    params: { companyId },
  });
  return res.data;
};
