import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API temel URL'si
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // Varsayılan header
  },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
        console.log(
          "Authorization Header Eklendi:",
          config.headers.Authorization
        );
      } else {
        console.warn("Token Bulunamadı.");
      }
      return config;
    } catch (error) {
      console.error("Interceptor Hatası:", error.message);
      throw error;
    }
  },
  (error) => {
    console.error("Request Interceptor Error:", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global hata yönetimi
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
