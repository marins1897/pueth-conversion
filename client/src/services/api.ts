import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const fetchRates = async (from?: string) => {
  const res = await axios.get(`${API_BASE}/api/rates`, {
    params: from ? { from } : {},
  });

  return res.data;
};

export const fetchLatestRate = async () => {
  const res = await axios.get(`${API_BASE}/api/rates/latest`);
  return res.data;
};
