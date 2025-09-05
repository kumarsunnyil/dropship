import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // get token from Zustand/localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
