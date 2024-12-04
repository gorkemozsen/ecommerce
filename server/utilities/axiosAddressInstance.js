// api.js
const axios = require("axios");

// Axios instance oluşturma
const addressApiClient = axios.create({
  baseURL: "https://tradres.com.tr/api",
  timeout: 5000, // İsteğin zaman aşımı süresi (isteğe bağlı)
  headers: {
    "Content-Type": "application/json", // Varsayılan header (isteğe bağlı)
  },
});

module.exports = addressApiClient;
