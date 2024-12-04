const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const productController = require("../controllers/productController");
const { isAdmin } = require("../middlewares/roleMiddleware");

// router.get("/", productController.getAllProducts);

router.get("/", productController.getProducts);

router.post("/add", authMiddleware, isAdmin, productController.addProduct);

router.get("/:productId", productController.getProduct);

router.put(
  "/:productId",
  authMiddleware,
  isAdmin,
  productController.updateProduct
);

router.delete(
  "/:productId",
  authMiddleware,
  isAdmin,
  productController.deleteProduct
);

module.exports = router;
