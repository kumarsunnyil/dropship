import axios from "axios";
    const baseUrl = import.meta.env.VITE_API_URL;
    const apiLoginUrl = `${baseUrl}/auth/login`;
    const apiSignupUrl = `${baseUrl}/auth/register`;

const API = axios.create({
  baseURL: baseUrl,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginApi = async (username, password) =>
  API.post(apiLoginUrl, { username, password });

export const registerApi = async (username, password) =>
  API.post(apiSignupUrl, { username, password });
