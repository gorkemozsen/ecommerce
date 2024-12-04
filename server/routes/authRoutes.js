const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authMiddleware, authController.logout);

router.get("/user", authMiddleware, authController.getUser);

// E-posta güncelleme
router.put("/update-email", authMiddleware, authController.updateEmail);

// Şifre güncelleme
router.put("/update-password", authMiddleware, authController.updatePassword);

// // Ad ve soyad güncelleme
// router.put("/update-name", authMiddleware, authController.updateName);

module.exports = router;
