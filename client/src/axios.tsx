import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_BACKEND_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    Authorization: "",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("@fabwert_token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 403) {
      console.log("Error de servidor:", error);
    } else {
      console.log("Error de servidor:", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
