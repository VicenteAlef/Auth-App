import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3003", // Ajuste para a porta do seu backend
});

// Interceptor para adicionar o Token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
