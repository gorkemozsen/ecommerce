const axios = require("axios");

const addressApiClient = axios.create({
  baseURL: "https://tradres.com.tr/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = addressApiClient;
