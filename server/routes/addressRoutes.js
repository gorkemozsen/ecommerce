const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const addressController = require("../controllers/addressController");

// Tüm adresleri getirme (admin yetkisi gerekebilir)
router.get("/", authMiddleware, isAdmin, addressController.getAllAddresses);

// Belirli bir kullanıcıya ait adresleri getirme
router.get(
  "/user/:userId",
  authMiddleware,
  isAdmin,
  addressController.getAddressesByUserId
);

// Kullanıcının kendi adreslerini getirme
router.get("/me", authMiddleware, addressController.getMyAddresses);

// Yeni adres oluşturma
router.post("/", authMiddleware, addressController.createAddress);

// Adresi güncelleme
router.put("/:addressId", authMiddleware, addressController.updateAddress);

// Adresi silme
router.delete("/:addressId", authMiddleware, addressController.deleteAddress);

// Illeri getirme
router.get("/cities", authMiddleware, addressController.getCities);

// Ilceleri getirme
router.get(
  "/districts/:cityName",
  authMiddleware,
  addressController.getDistricts
);

// Mahalle getirme
router.get(
  "/neighborhoods/:cityName/:districtName",
  authMiddleware,
  addressController.getNeighborhoods
);

// Sokak getirme
router.get(
  "/streets/:cityName/:neighborhoodName",
  authMiddleware,
  addressController.getStreets
);

module.exports = router;
