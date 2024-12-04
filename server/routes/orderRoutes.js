const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", authMiddleware, isAdmin, orderController.getOrders);

router.put("/:orderId", authMiddleware, isAdmin, orderController.updateOrder);

module.exports = router;
