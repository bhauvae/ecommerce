import axios from "axios";
import { jwtDecode } from "jwt-decode";

// @ts-ignore
const BASE = import.meta.env.VITE_API_BASE;
// Set up the base URL
const api = axios.create({
  baseURL: BASE, // Your backend API's base URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;
      if (expiry_date > current_time) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
