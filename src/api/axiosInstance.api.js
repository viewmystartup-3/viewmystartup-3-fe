import axios from "axios";

const BASE_URL =
  "https://port-0-viewmystartup-3-m8ml2ohm3e1c28b1.sel4.cloudtype.app";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
