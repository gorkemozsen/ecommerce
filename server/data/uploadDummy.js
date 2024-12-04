const fs = require("fs");
const path = require("path");
const { Products, sequelize } = require("../models");

async function uploadProducts() {
  try {
    // Veritabanı bağlantısını kontrol et
    await sequelize.authenticate();
    console.log("Database connection established.");

    // JSON dosyasını oku
    const filePath = path.join(__dirname, "../data/products.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(rawData);

    // Veritabanına toplu yükleme
    await Products.bulkCreate(products);
    console.log("Products successfully uploaded!");
  } catch (error) {
    console.error("Error uploading products:", error);
  } finally {
    // Veritabanı bağlantısını kapat
    await sequelize.close();
  }
}

// Scripti çalıştır
uploadProducts();
