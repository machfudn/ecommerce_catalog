import axios from "axios";
import { getToken, logout } from "./Auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// INTERCEPT REQUEST → SISIPKAN TOKEN
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPT RESPONSE → AUTO LOGOUT JIKA TOKEN INVALID / EXPIRED
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    // JANGAN logout jika request login
    if (status === 401 && !url.includes("/login")) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;
