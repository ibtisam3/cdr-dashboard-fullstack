import axios from "axios";

const API_URL = "http://localhost:3001/api/cdr";

export const fetchCallData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return [];
  }

  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Backend response data:", response.data);

    
    return Array.isArray(response.data.records) ? response.data.records : [];
  } catch (err) {
    console.error("Axios error:", err.response ? err.response.data : err.message);
    return [];
  }
};