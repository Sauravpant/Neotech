import axios from "axios";

const environment = import.meta.env.VITE_ENV;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: environment === "production" ? `${BASE_URL}/api/v1` : "http://localhost:3000/api/v1",
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

