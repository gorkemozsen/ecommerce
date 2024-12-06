const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const categoryController = require("../controllers/categoryController");

// Kategori ekleme
router.post("/add", authMiddleware, isAdmin, categoryController.addCategory);

// Kategori silme
router.delete(
  "/delete/:id",
  authMiddleware,
  isAdmin,
  categoryController.deleteCategory
);
// Kategori duzenleme
router.put(
  "/update/:id",
  authMiddleware,
  isAdmin,
  categoryController.updateCategory
);
// Tum Kategorileri getirme
router.get("/", authMiddleware, isAdmin, categoryController.getAllCategories);

// Belirli bir kategoriye ait ürünleri getirme
router.get("/:categoryId/products", categoryController.getProductsByCategory);

module.exports = router;
