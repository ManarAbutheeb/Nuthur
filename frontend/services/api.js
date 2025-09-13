// frontend/services/api.js
import axios from "axios";

// نحدد عنوان السيرفر
const API = axios.create({
  baseURL: "http://localhost:5000", // backend
});

// نضيف التوكن في الهيدر تلقائياً
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

// 🟢 Auth APIs
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);

// 🟢 Reports APIs
export const createReport = (data) => API.post("/reports/create", data);
export const getReports = () => API.get("/reports");
export const updateReport = (id, data) => API.put(`/reports/update/${id}`, data);
export const deleteReport = (id) => API.delete(`/reports/delete/${id}`);
